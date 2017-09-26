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
  Answer.find(query, select, cursor)
    .then((answers) => {
      Survey.findById(query.survey)
        .then(notFound(res))
        .then((survey) => {
            //total of recipent
            var recipents = 0
            survey.list.forEach(function(list, key) {
                  recipents = recipents + list.members.length
                });
            console.log(recipents)
            //number of respondent
            var respondents = []
            answers.forEach(function(answer, key) {
              respondents.push(answer.asked.id)
            })
            //removing dupl
            respondents = respondents.filter(function(item, pos) {
              return respondents.indexOf(item) == pos;
            });
            console.log("respondents",respondents)

            //building charts data
            var labels =[];
            survey.elements.forEach(function(element, key) {
              labels[element._id] = []
              element.items.forEach(function(item, key) {
                labels[element._id].push(item.value)
              })
            })
            var data = {};
            survey.elements.forEach(function(element, key) {
              data[element._id] = []
              console.log("element._id", element._id);
              labels[element._id].forEach(function(label, key) {
                  data[element._id][key] = data[element._id][key] ? data[element._id][key] : 0
                  answers.forEach(function(answer, k) {
                    if(answer.value == label)
                      data[element._id][key] = data[element._id][key] + 1
                  })
               }) 
            })

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

            res.json({
              recipents: recipents,
              respondents: respondents,
              completion:completion,
              labels:labels,
              data: data,
              answers:answers
            })

            success(res)



            console.log("data",data)

            

            //console.log(survey)
            //console.log(answers)
        })
    })
