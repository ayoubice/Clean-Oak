import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Answer, { schema } from './model'

const router = new Router()
const { id, value, comment, survey, question, memberEvaluated, memberAsked } = schema.tree

/**
 * @api {post} /answers Create answer
 * @apiName CreateAnswer
 * @apiGroup Answer
 * @apiParam id Answer's id.
 * @apiParam text Answer's text.
 * @apiParam type Answer's type.
 * @apiParam required Answer's required.
 * @apiParam tags Answer's tags.
 * @apiSuccess {Object} answer Answer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Answer not found.
 */
router.post('/',
  body({ id, value, comment, survey, question, memberEvaluated, memberAsked }),
  create)

/**
 * @api {get} /answers Retrieve answers
 * @apiName RetrieveAnswers
 * @apiGroup Answer
 * @apiUse listParams
 * @apiSuccess {Object[]} answers List of answers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /answers/:id Retrieve answer
 * @apiName RetrieveAnswer
 * @apiGroup Answer
 * @apiSuccess {Object} answer Answer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Answer not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /answers/:id Update answer
 * @apiName UpdateAnswer
 * @apiGroup Answer
 * @apiParam id Answer's id.
 * @apiParam text Answer's text.
 * @apiParam type Answer's type.
 * @apiParam required Answer's required.
 * @apiParam tags Answer's tags.
 * @apiSuccess {Object} answer Answer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Answer not found.
 */
router.put('/:id',
  body({ id, value, comment, survey, question, memberEvaluated, memberAsked }),
  update)

/**
 * @api {delete} /answers/:id Delete answer
 * @apiName DeleteAnswer
 * @apiGroup Answer
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Answer not found.
 */
router.delete('/:id',
  destroy)

export default router
