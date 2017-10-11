import { success, notFound } from '../../services/response/'
import { Survey } from '../survey/'
import { Answer } from '../answer/'
import { analyze } from './controller'

var http = require('http');
var pdf = require('html-pdf');
var path = require("path");
var excel = require('node-excel-export');
var async = require("async");
//nunjucks templating 
var nunjucks = require('nunjucks');

var report_options =
{
    "format": "A4",
    "orientation": "landscape",
    "border": {
        "top": "10px",
        "right": "2px",
        "bottom": "2px",
        "left": "10px"
    },
    "height": "595px",        // allowed units: mm, cm, in, px
  	"width": "842px",				//1240 x 1754
    "quality": "100"
};

//configure the template engine.
nunjucks.configure(path.resolve(__dirname, 'templates/'), {
    autoescape: true,
    //express: app,
    tags: {
	    blockStart: '<%',
	    blockEnd: '%>',
	    variableStart: '<$',
	    variableEnd: '$>',
	    commentStart: '<#',
	    commentEnd: '#>'
	  }
});

export const generatePdf = ({ querymen: { query, select, cursor } }, res, next) =>  {
      console.log('request made....print 1 ');
      Survey.findById(query.survey)
        .then(notFound(res))
        .then((survey) => {

        	
		    var obj = {}
		    obj.survey_type = query.survey_type
		    obj.survey_summary_labels = query.survey_summary_labels.split(",") 
		    obj.survey_summary_data = query.survey_summary_data.split(",") 

		    console.log("obj", obj)
        	

		    var renderedHtml =  nunjucks.render('regular.charts.tmpl.html',obj);
		    console.log("renderedHtml",renderedHtml);
		    pdf.create(renderedHtml,report_options).toStream(function(err, pdfStream){
		    	if (err) {   
			      // handle error and return a error response code
			      console.log("error",err)
			      //return res.sendStatus(500)
			    } else {
			      // send a status code of 200 OK
			      res.statusCode = 200             

			      // once we are done reading end the response
			      pdfStream.on('end', () => {
			        // done reading
			        console.log("done reading")
			        return res.end()
			      })

			      // pipe the contents of the PDF directly to the response
			      pdfStream.pipe(res)
			    }
		        //console.log(pdfStream);
		        //stream.pipe(res);
		    });

       	})

    }

 export const generateXlsx = ({ querymen: { query, select, cursor } }, res, next) =>  {
      console.log('request made....print 1 ');
      Survey.findById(query.survey)
        .then(notFound(res))
        .then((survey) => {

        	//get360Data(survey);
			 
			const specification = getSpecification(survey) 

			var members = []
			var i = 0
			survey.list.forEach(function(list, key) {
	                list.members.forEach(function(member, key) {
	                  members[i] = member
	                  i++
	             })
	        })

	        var labels = []
			i = 0
			survey.elements.forEach(function(element, key) {
	                //var label = (element.tag && element.tag != '') ? element.tag : element.text
	                //labels[i] = {"id":element.id, "label":label}
	                labels[i] = element
	                i++
	        })
			 
			// The data set should have the following shape (Array of Objects) 
			// The order of the keys is irrelevant, it is also irrelevant if the 
			// dataset contains more fields as the report is build based on the 
			// specification provided above. But you should have all the fields 
			// that are listed in the report specification 
			Answer.find({'survey' : survey.id/*, 'question._id' : element.id, 'asked.id' : member.id+''*/})
          		.then((surveyAnswers) => {
          			
          			const dataset = getDataset(survey, surveyAnswers, members, labels)
			 
					var merges = []
					if(survey.type == 's_360')
						merges = getMerges(members, labels)
					 
					// Create the excel report. 
					// This function will return Buffer 
					const report = excel.buildExport(
					  [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report 
					    {
					      name: 'Report', // <- Specify sheet name (optional) 
					      //heading: heading, // <- Raw heading array (optional) 
					      merges: merges, // <- Merge cell ranges 
					      specification: specification, // <- Report specification 
					      data: dataset // <-- Report data 
					    }
					  ]
					);
					 
					// You can then return this straight 
					res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers) 
					return res.send(report);
          		})
			
		    

       	})

    }


	export const getMerges = (members, labels) => {

					// Define an array of merges. 1-1 = A:1 
					// The merges are independent of the data. 
					// A merge will overwrite all data _not_ in the top-left cell. 
					var merges = []
					var startingRow = 2
					var endingRow = 1
					for(var i = 0; i < members.length;i++){
						endingRow = endingRow + labels.length
						var merge = {start: { row: startingRow, column: 1 }, end: { row: endingRow, column: 1 }}
						merges.push(merge)
						startingRow =  endingRow + 1
					        
					  }
					  return merges;

	}

    export const getDataset = (survey, surveyAnswers, members, labels) => { 
		  
			var dataset = []
			console.log("member", members)

          	members.forEach(function(member, key) {
          	
          	
          	//async.each(members,self.getAnswers,function(){
          	if(survey.type == 's_360') {
	          	labels.forEach(function(element, key) {
	          			//getting asked answers
	          			var askedAnswers = []
	          			surveyAnswers.forEach(function(askAnsrs, key) {
	          				if((askAnsrs.question._id == element.id) && (askAnsrs.asked.id == member.id))
	          					askedAnswers.push(askAnsrs)
	          					
	          			})

	          			var row = {}
	          			row.member_asked = member.name
		          		askedAnswers.forEach(function(askAnsrs, key) {
		          				i++
		          				row['questions'] = (askAnsrs.question.tag && askAnsrs.question.tag != '') ? askAnsrs.question.tag : askAnsrs.question.text
		          				row['member_evaluated_'+askAnsrs.evaluated.id] = parseInt(askAnsrs.value)
		          					
		          				if(askedAnswers.length == i)
		          					dataset.push(row)
		          			})
	                 })
				} else {
					var askedAnswers = []
	          			surveyAnswers.forEach(function(askAnsrs, key) {
	          				if((askAnsrs.asked.id == member.id))
	          					askedAnswers.push(askAnsrs)
	          					
	          			})
	          			var row = {}
	          			row.member_asked = (survey.type == 's_incognito') ? 'unknown' : member.name
					askedAnswers.forEach(function(askAnsrs, key) {
		          				row['question_'+askAnsrs.question._id] = isNaN(parseInt(askAnsrs.value)) ? askAnsrs.value : parseInt(askAnsrs.value)
							})
							dataset.push(row)
				}
          	})
		return dataset
	}



    export const getSpecification = (survey) => {
    		const styles = getStyles()

    		//Here you specify the export structure 
			var specification = {
			  member_asked: { // <- the key should match the actual data key 
			    displayName: '', // <- Here you specify the column header 
			    headerStyle: styles.headerStyle, // <- Header style 
			    cellStyle: styles.askedStyle, // <- Header style 
			    width: 220 // <- width in pixels 
			  }
			}

    		//adding members
    		if(survey.type == 's_360') {

    			specification.questions = {
				    displayName: '',
				    headerStyle: styles.headerStyle,
				    cellStyle: styles.defaultStyle, 
				    width: 110 
				  }

	    		survey.list.forEach(function(list, key) {
	                list.members.forEach(function(member, key) {
	                	specification['member_evaluated_'+member.id ] = {
					    displayName: member.name,
					    headerStyle: styles.headerStyle,
					    cellStyle: styles.defaultStyle, 
					    width: 220 // <- width in pixels 
					  }
	                })
	            })
    		} else {
	    		survey.elements.forEach(function(element, key) {
	                	specification['question_'+element._id ] = {
					    displayName: element.text,
					    headerStyle: styles.headerStyle,
					    cellStyle: styles.defaultStyle, 
					    width: 220 // <- width in pixels 
					  }
	            })
    		}
    		
    		
			return specification
    }

    export const getStyles = () => {
	  
	  // You can define styles as json object 
	  // More info: https://github.com/protobi/js-xlsx#cell-styles 
	  const styles = {
			  headerStyle: {
			    font: {
			      color: {
			        rgb: 'FF000000'
			      },
			      sz: 14,
			      bold: true,
			      underline: true
			    },
			    border : {
			    	top : { style: 'thin', color: { rgb: "FF000000" } },
			    	bottom : { style: 'thin', color: { rgb: "FF000000" } },
			    	left : { style: 'thin', color: { rgb: "FF000000" } },
			    	right : { style: 'thin', color: { rgb: "FF000000" } }
			    }
			  },
			  askedStyle: {
			    font: {
			      color: {
			        rgb: 'FF000000'
			      },
			      sz: 14,
			      bold: true,
			      underline: true
			    },
			    alignment: {
			    	vertical : 'center',
			    	horizontal : 'center'
			    },
			    border : {
			    	top : { style: 'thin', color: { rgb: "FF000000" } },
			    	bottom : { style: 'thin', color: { rgb: "FF000000" } },
			    	left : { style: 'thin', color: { rgb: "FF000000" } },
			    	right : { style: 'thin', color: { rgb: "FF000000" } }
			    }
			  },
			  defaultStyle: {
			    border : {
			    	top : { style: 'thin', color: { rgb: "FF000000" } },
			    	bottom : { style: 'thin', color: { rgb: "FF000000" } },
			    	left : { style: 'thin', color: { rgb: "FF000000" } },
			    	right : { style: 'thin', color: { rgb: "FF000000" } }
			    }
			  }
			};
	  return styles

	}
