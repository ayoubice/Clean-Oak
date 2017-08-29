import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, send, update, destroy } from './controller'
import { schema } from './model'
export Survey, { schema } from './model'

const router = new Router()
const { name, description, elements, status, list } = schema.tree

/**
 * @api {post} /surveys Create survey
 * @apiName CreateSurvey
 * @apiGroup Survey
 * @apiParam name Survey's name.
 * @apiParam description Survey's description.
 * @apiParam elements Survey's elements.
 * @apiParam status Survey's status.
 * @apiSuccess {Object} survey Survey's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Survey not found.
 */
router.post('/',
  body({ name, description, elements, status, list }),
  create)

/**
 * @api {get} /surveys Retrieve surveys
 * @apiName RetrieveSurveys
 * @apiGroup Survey
 * @apiUse listParams
 * @apiSuccess {Object[]} surveys List of surveys.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /surveys/:id Retrieve survey
 * @apiName RetrieveSurvey
 * @apiGroup Survey
 * @apiSuccess {Object} survey Survey's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Survey not found.
 */
router.get('/:id',
  show)

/**
 * @api {get} /surveys/:id/email Send the survery to members
 * @apiName SendSurvey
 * @apiGroup Survey
 * @apiSuccess {Object} survey Survey's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Survey not found.
 */
router.get('/:id/email',
  send)


/**
 * @api {put} /surveys/:id Update survey
 * @apiName UpdateSurvey
 * @apiGroup Survey
 * @apiParam name Survey's name.
 * @apiParam description Survey's description.
 * @apiParam elements Survey's elements.
 * @apiParam status Survey's status.
 * @apiSuccess {Object} survey Survey's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Survey not found.
 */
router.put('/:id',
  body({ description, elements, status, list }),
  update)

/**
 * @api {delete} /surveys/:id Delete survey
 * @apiName DeleteSurvey
 * @apiGroup Survey
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Survey not found.
 */
router.delete('/:id',
  destroy)

export default router
