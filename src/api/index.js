import { Router } from 'express'
import user from './user'
import auth from './auth'
import passwordReset from './password-reset'
import question from './question'
import survey from './survey'
import member from './member'
import list from './list'
import answer from './answer'
import file from './file'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/users', user)
router.use('/auth', auth)
router.use('/password-resets', passwordReset)
router.use('/questions', question)
router.use('/surveys', survey)
router.use('/members', member)
router.use('/lists', list)
router.use('/answers', answer)
router.use('/files', file)

export default router
