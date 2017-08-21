import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export List, { schema } from './model'

const router = new Router()
const { id, name, status, members } = schema.tree

/**
 * @api {post} /lists Create list
 * @apiName CreateList
 * @apiGroup List
 * @apiParam id List's id.
 * @apiParam name List's name.
 * @apiParam status List's status.
 * @apiParam members List's members.
 * @apiSuccess {Object} list List's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 List not found.
 */
router.post('/',
  body({ id, name, status, members }),
  create)

/**
 * @api {get} /lists Retrieve lists
 * @apiName RetrieveLists
 * @apiGroup List
 * @apiUse listParams
 * @apiSuccess {Object[]} lists List of lists.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /lists/:id Retrieve list
 * @apiName RetrieveList
 * @apiGroup List
 * @apiSuccess {Object} list List's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 List not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /lists/:id Update list
 * @apiName UpdateList
 * @apiGroup List
 * @apiParam id List's id.
 * @apiParam name List's name.
 * @apiParam status List's status.
 * @apiParam members List's members.
 * @apiSuccess {Object} list List's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 List not found.
 */
router.put('/:id',
  body({ id, name, status, members }),
  update)

/**
 * @api {delete} /lists/:id Delete list
 * @apiName DeleteList
 * @apiGroup List
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 List not found.
 */
router.delete('/:id',
  destroy)

export default router
