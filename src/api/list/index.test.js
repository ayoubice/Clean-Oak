import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { List } from '.'

const app = () => express(routes)

let list

beforeEach(async () => {
  list = await List.create({})
})

test('POST /lists 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ id: 'test', name: 'test', status: 'test', members: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.members).toEqual('test')
})

test('GET /lists 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /lists/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${list.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(list.id)
})

test('GET /lists/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /lists/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${list.id}`)
    .send({ id: 'test', name: 'test', status: 'test', members: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(list.id)
  expect(body.id).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.members).toEqual('test')
})

test('PUT /lists/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ id: 'test', name: 'test', status: 'test', members: 'test' })
  expect(status).toBe(404)
})

test('DELETE /lists/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${list.id}`)
  expect(status).toBe(204)
})

test('DELETE /lists/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
