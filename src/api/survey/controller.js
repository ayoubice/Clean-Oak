import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Survey } from '.'

export const create = ({ body } , res, next) =>
  Survey.create(body)
    .then((survey) => survey.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Survey.find(query, select, cursor)
    .then((surveys) => surveys.map((survey) => survey.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Survey.findById(params.id)
    .then(notFound(res))
    .then((survey) => survey ? survey.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body }, res, next) =>
  Survey.findById(params.id)
    .then(notFound(res))
    .then((survey) => survey ? _.merge(survey, body).save() : null)
    .then((survey) => survey ? survey.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Survey.findById(params.id)
    .then(notFound(res))
    .then((survey) => survey ? survey.remove() : null)
    .then(success(res, 204))
    .catch(next)