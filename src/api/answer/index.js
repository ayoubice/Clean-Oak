import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy, analyze } from './controller'
import { schema } from './model'
export Answer, { schema } from './model'

var querymen = require('querymen');

const router = new Router()
const { id, value, comment, survey, question, evaluated, asked, incognito } = schema.tree

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
  body({ id, value, comment, survey, question, evaluated, asked, incognito }),
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
  querymen.middleware({
	  survey: {
	    type: String,
	    paths: ['survey']
	  },
	  question: {
	    type: String,
	    paths: ['question._id']
	  },
	  evaluated: {
	    type: String,
	    paths: ['evaluated.id']
	  },
	  asked: {
	    type: String,
	    paths: ['asked.id']
	  },
	  askedMembers: {
	    type: [String],
	    paths: ['asked.id'],
	    operator: '$in'
	  },
	  ids: {
	    type: [String],
	    paths: ['_id'],
	    operator: '$in'
	  }
	}), 
  index)

router.get('/analyze',
  querymen.middleware({
	  survey: {
	    type: String,
	    paths: ['survey']
	  }
	}),
  analyze)

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
  body({ id, value, comment, survey, question, evaluated, asked, incognito }),
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
