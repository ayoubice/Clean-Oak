import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Member } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Member.create(body)
    .then((member) => member.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Member.find(query, select, cursor)
    .then((members) => members.map((member) => member.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Member.findById(params.id)
    .then(notFound(res))
    .then((member) => member ? member.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Member.findById(params.id)
    .then(notFound(res))
    .then((member) => member ? _.merge(member, body).save() : null)
    .then((member) => member ? member.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Member.findById(params.id)
    .then(notFound(res))
    .then((member) => member ? member.remove() : null)
    .then(success(res, 204))
    .catch(next)
