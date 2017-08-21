import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { Survey } from '.'

const app = () => express(routes)

let survey

beforeEach(async () => {
  survey = await Survey.create({})
})

test('POST /surveys 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ name: 'test', description: 'test', elements: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.elements).toEqual('test')
  expect(body.status).toEqual('test')
})

test('GET /surveys 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /surveys/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${survey.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(survey.id)
})

test('GET /surveys/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /surveys/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${survey.id}`)
    .send({ name: 'test', description: 'test', elements: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(survey.id)
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.elements).toEqual('test')
  expect(body.status).toEqual('test')
})

test('PUT /surveys/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ name: 'test', description: 'test', elements: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /surveys/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${survey.id}`)
  expect(status).toBe(204)
})

test('DELETE /surveys/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
