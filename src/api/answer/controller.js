import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Answer } from '.'

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
    .then((answer) => answer ? _.merge(answer, body).save() : null)
    .then((answer) => answer ? answer.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Answer.findById(params.id)
    .then(notFound(res))
    .then((answer) => answer ? answer.remove() : null)
    .then(success(res, 204))
    .catch(next)
