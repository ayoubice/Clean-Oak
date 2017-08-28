import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Question, { schema } from './model'

const router = new Router()
const { id, alias, text, type, required,items, hasComment, commentLabel, tags } = schema.tree

/**
 * @api {post} /questions Create question
 * @apiName CreateQuestion
 * @apiGroup Question
 * @apiParam id Question's id.
 * @apiParam text Question's text.
 * @apiParam type Question's type.
 * @apiParam required Question's required.
 * @apiParam tags Question's tags.
 * @apiSuccess {Object} question Question's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Question not found.
 */
router.post('/',
  body({ id, alias, text, type, required, items, hasComment, commentLabel, tags }),
  create)

/**
 * @api {get} /questions Retrieve questions
 * @apiName RetrieveQuestions
 * @apiGroup Question
 * @apiUse listParams
 * @apiSuccess {Object[]} questions List of questions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /questions/:id Retrieve question
 * @apiName RetrieveQuestion
 * @apiGroup Question
 * @apiSuccess {Object} question Question's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Question not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /questions/:id Update question
 * @apiName UpdateQuestion
 * @apiGroup Question
 * @apiParam id Question's id.
 * @apiParam text Question's text.
 * @apiParam type Question's type.
 * @apiParam required Question's required.
 * @apiParam tags Question's tags.
 * @apiSuccess {Object} question Question's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Question not found.
 */
router.put('/:id',
  body({ id, alias, text, type, required, items, hasComment, commentLabel, tags }),
  update)

/**
 * @api {delete} /questions/:id Delete question
 * @apiName DeleteQuestion
 * @apiGroup Question
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Question not found.
 */
router.delete('/:id',
  destroy)

export default router
