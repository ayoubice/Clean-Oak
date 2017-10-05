import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Answer } from '.'
import { Survey } from '../survey/'

export const create = ({ bodymen: { body } }, res, next) =>
  Answer.create(body)
    .then((answer) => answer.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Answer.find(query, select, cursor)
    .then((answers) => answers.map((answer) => answer.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Answer.findById(params.id)
    .then(notFound(res))
    .then((answer) => answer ? answer.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Answer.findById(params.id)
    .then(notFound(res))
    .then((answer) => answer ? Answer.findOneAndUpdate({ '_id': params.id}, body,{ new: true }) : null)
    .then((answer) => answer ? answer.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Answer.findById(params.id)
    .then(notFound(res))
    .then((answer) => answer ? answer.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const analyze = ({ querymen: { query, select, cursor } }, res, next) => 
  Answer.find(query, select)
    .then((answers) => {
      Survey.findById(query.survey)
        .then(notFound(res))
        .then((survey) => {
            //total of recipent
            var recipents = []
            survey.list.forEach(function(list, key) {
                list.members.forEach(function(member, key) {
                  recipents.push(member.id)
                })
            })
            //console.log(recipents)

            //get completion
            var totalMembers = 0
            var totalAnswers = answers.length
            var totalQuestions = survey.elements.length
            var completion = 0
            survey.list.forEach(function(list, key) {
                totalMembers = totalMembers + list.members.length
            });
            totalQuestions = survey.type == "s_360" ? totalQuestions * totalMembers : totalQuestions;
            completion = (((totalAnswers) / (totalMembers * totalQuestions))*100).toFixed(0)
            //console.log('totalAnswers / TOTAL', totalAnswers, totalMembers * totalQuestions);

            //building charts data
            var labels ={};
              survey.elements.forEach(function(element, key) {
                labels[element._id] = []
                element.items.forEach(function(item, key) {
                  labels[element._id].push(item.value)
                })
              })

            //if (survey.type != 's_360') {
              var data = {};
              data.overall = {"members":[], "data" : {}, "respondents" : []}
              //overall
              data.overall.data = (survey.type != 's_360') ? getData(survey, labels, answers) : get360Data(survey, labels, answers, recipents)
              data.overall.respondents = survey.respondents
              data.overall.members = recipents

              //by list
              data.lists = {}
              var respondents = []
              var counter = 0
              survey.list.forEach(function(list, key) {
                    
                    data.lists[list.id] = {"members":[], "data" : {}, "respondents" : []}
                    list.members.forEach(function(member, key) {
                      data.lists[list.id].members.push(member.id+'')
                    })

                    respondents = []
                    data.lists[list.id].members.forEach(function(member, key) {
                      if (survey.respondents.indexOf(member) != -1)
                        respondents.push(member);
                    })
                    data.lists[list.id].respondents = respondents

                    Answer.find( { "survey" : survey.id, "asked.id" : { $in : data.lists[list.id].members } }
                      ).then((teamAnswers) => {
                          //console.log("teams name  " + teamAnswers);
                            data.lists[list.id].data = (survey.type != 's_360') ? getData(survey, labels, teamAnswers) : get360Data(survey, labels, answers, data.lists[list.id].members)
                            counter++
                            if (survey.list.length == counter) {
                                res.json({
                                recipents: recipents.length,
                                completion:completion,
                                labels:labels,
                                data: data,
                                answers:answers
                              })

                              success(res)
                            }
                        })
                    
                  });

           /* } else { //360 case


            }*/
            

            

            



            

            

            //console.log(survey)
            //console.log(answers)
        })
    })

export const getData = (survey, labels, answers) => {
  var data = {}
  survey.elements.forEach(function(element, key) {
              data[element._id] = []
              //console.log("element._id", element._id);
              labels[element._id].forEach(function(label, key) {
                  data[element._id][key] = data[element._id][key] ? data[element._id][key] : 0
                  answers.forEach(function(answer, k) {
                    if(answer.value == label && answer.question._id == element._id)
                      data[element._id][key] = data[element._id][key] + 1
                  })
               }) 
            })
  return data
}

export const get360Data = (survey, labels, answers, members) => {
  var data = {}
  members.forEach(function(member) {
    data[member] = {}
    members.forEach(function(m) {
      data[member][m] = {}
    })
    }
  )
  //console.log("answers.length", answers.length);
  answers.forEach(function(answer, a) {
    //console.log("answer.asked------>", answer.asked)
    survey.elements.forEach(function(element, e) {
      if(answer.question._id == element._id) {
        labels[element._id].forEach(function(label, key) { 
          if(answer.value == label) {
            //var ident = answer.asked.id + "_" + answer.evaluated.id + "_" + element._id 
            if (data[answer.asked.id] && data[answer.asked.id][answer.evaluated.id])
              data[answer.asked.id][answer.evaluated.id][element._id]=key+1
            //data[ident]
          }

        })

      }

    })

  })
  return data

}
