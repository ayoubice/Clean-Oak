import { success, notFound } from '../../services/response/'
import { Survey } from '../survey/'
import { Answer } from '../answer/'
import { analyze } from './controller'

var http = require('http');
var pdf = require('html-pdf');
var path = require("path");
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

export const generate = ({ querymen: { query, select, cursor } }, res, next) =>  {
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
