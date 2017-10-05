import { Router } from 'express'
import { middleware as query } from 'querymen'
import { generate } from './controller'

const router = new Router()
var querymen = require('querymen');

/**
 * @api {post} /auth Authenticate
 * @apiName Authenticate
 * @apiGroup Auth
 * @apiPermission master
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiParam {String} access_token Master access_token.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Master access only or invalid credentials.
 */
router.get('/regular',
  querymen.middleware({
	  survey: {
	    type: String,
	    paths: ['survey']
	  },
	  survey_summary_labels: {
	    type: String,
	  },
	  survey_summary_data: {
	    type: String,
	  },
	  survey_type: {
	    type: String,
	  }

	}),
  generate)

export default router
