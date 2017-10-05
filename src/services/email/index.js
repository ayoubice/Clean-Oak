import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Survey } from '../../api/survey/'

var async = require("async");
var http = require("http");
var nodemailer = require("nodemailer");

// This will store emails needed to send.
// We can fetch it from DB (MySQL,Mongo) and store here.
var baseUrl = 'http://localhost:3000/#/viewer/'
var listofemails = []; 
var members = []; 
var surveyObj = {}
// Will store email sent successfully.
var success_members = [];
// Will store email whose sending is failed. 
var failure_members = [];

var transporter;

export const sendSurveyMail = (survey, res, next)  => {
      console.log('Start sending Email')
      if(survey) {
          //getting emails
          for (var i = 0; i < survey.list.length; i++) {
            for (var j = 0; j < survey.list[i].members.length; j++) {
              var member = {}

              var content = survey.text.replace(/\{\{SURVEY_LINK\}\}/g, baseUrl+survey.id+'/'+survey.list[i].members[j].id)
              
              if(survey.type != "s_incognito")
                content = content.replace(/\{\{MEMBER_NAME\}\}/g, survey.list[i].members[j].name)
              else
                content = content.replace(/\{\{MEMBER_NAME\}\}/g, '')

              member.id = survey.list[i].members[j].id
              member.email = survey.list[i].members[j].email
              member.html = content
              
              members.push(member);
            }
          }

          new massMailer(survey, res, next);
      }


};

function massMailer(survey, res, next) {
    var self = this;
    surveyObj = survey

    console.log("------------------>", members)

    listofemails = ["youshef@gmail.com","youssef@avito.ma"]; 
    transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          auth: {
            user: 'youssef@avito.ma',
            pass: 'msbblrohloooyjqm'
         },
          tls: {rejectUnauthorized: false},
          debug:true
        });
    // Fetch all the emails from database and push it in listofemails
        // Will do it later.
    self.invokeOperation(res);

    /*res.json({
                                success_members: success_members,
                                failure_members: failure_members
                              })*/
        res.statusCode = 200 
        return res.end()
};

/*function prepareMailingData(surveyId,member) {
  console.log('Start build Email content')
  const link = getSurveyLink(surveyId,member)
  return `
      Hey, Youssef. <br><br>
      here is the survey like : ${link}
      Survey team
    `
}*/



/* Invoking email sending operation at once */

massMailer.prototype.invokeOperation = function(res) {
    var self = this;
    async.each(members,self.SendEmail,function(){

        success_members.forEach(function(member) {
            surveyObj.sent.push(member.id)
          })
        failure_members.forEach(function(member) {
            surveyObj.notSent.push(member.id)
          })

        surveyObj.status = "Sent"
        Survey.findOneAndUpdate({ '_id': surveyObj.id}, surveyObj,{ new: true }, function(err, doc){
            if(err){
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
        });
        
        
        

    });
}

massMailer.prototype.SendEmail = function(Member,callback) {
    console.log("Sending email to " + Member.email);
    var self = this;
    var status = false;
    // waterfall will go one after another
    // So first email will be sent
    // Callback will jump us to next function
    // in that we will update DB
    // Once done that instance is done.
    // Once every instance is done final callback will be called.
    async.waterfall([
        function(callback) {                
            var mailOptions = {
                from: 'youssef@avito.ma',     
                to: Member.email,
                subject: surveyObj.subject, 
                html: Member.html
            };
            transporter.sendMail(mailOptions, function(error, info) {               
                if(error) {
                    console.log(error)
                    failure_members.push(Member);
                } else {
                    status = true;
                    success_members.push(Member);
                }
                callback(null,status,Member);
            });
        },
        function(statusCode,Member,callback) {
                console.log("Will update DB here for " + Member.email + "With " + statusCode);
                callback();
        }
        ],function(){
            //When everything is done return back to caller.
            callback();
    });
}