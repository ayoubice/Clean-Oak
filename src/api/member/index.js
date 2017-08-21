import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Member, { schema } from './model'

const router = new Router()
const { id, firstname, pic, email, labels } = schema.tree

/**
 * @api {post} /members Create member
 * @apiName CreateMember
 * @apiGroup Member
 * @apiParam id Member's id.
 * @apiParam firstname Member's firstname.
 * @apiParam pic Member's pic.
 * @apiParam email Member's email.
 * @apiParam labels Member's labels.
 * @apiSuccess {Object} member Member's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Member not found.
 */
router.post('/',
  body({ id, firstname, pic, email, labels }),
  create)

/**
 * @api {get} /members Retrieve members
 * @apiName RetrieveMembers
 * @apiGroup Member
 * @apiUse listParams
 * @apiSuccess {Object[]} members List of members.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /members/:id Retrieve member
 * @apiName RetrieveMember
 * @apiGroup Member
 * @apiSuccess {Object} member Member's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Member not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /members/:id Update member
 * @apiName UpdateMember
 * @apiGroup Member
 * @apiParam id Member's id.
 * @apiParam firstname Member's firstname.
 * @apiParam pic Member's pic.
 * @apiParam email Member's email.
 * @apiParam labels Member's labels.
 * @apiSuccess {Object} member Member's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Member not found.
 */
router.put('/:id',
  body({ id, firstname, pic, email, labels }),
  update)

/**
 * @api {delete} /members/:id Delete member
 * @apiName DeleteMember
 * @apiGroup Member
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Member not found.
 */
router.delete('/:id',
  destroy)

export default router
