import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Question } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Question.create(body)
    .then((question) => question.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Question.find(query, select, cursor)
    .then((questions) => questions.map((question) => question.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Question.findById(params.id)
    .then(notFound(res))
    .then((question) => question ? question.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Question.findById(params.id)
    .then(notFound(res))
    .then((question) => question ? _.merge(question, body).save() : null)
    .then((question) => question ? question.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Question.findById(params.id)
    .then(notFound(res))
    .then((question) => question ? question.remove() : null)
    .then(success(res, 204))
    .catch(next)
