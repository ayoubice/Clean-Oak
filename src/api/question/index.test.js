import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { Question } from '.'

const app = () => express(routes)

let question

beforeEach(async () => {
  question = await Question.create({})
})

test('POST /questions 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ id: 'test', text: 'test', type: 'test', required: 'test', tag: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual('test')
  expect(body.text).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.required).toEqual('test')
  expect(body.tag).toEqual('test')
})

test('GET /questions 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /questions/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${question.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(question.id)
})

test('GET /questions/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /questions/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${question.id}`)
    .send({ id: 'test', text: 'test', type: 'test', required: 'test', tag: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(question.id)
  expect(body.id).toEqual('test')
  expect(body.text).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.required).toEqual('test')
  expect(body.tag).toEqual('test')
})

test('PUT /questions/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ id: 'test', text: 'test', type: 'test', required: 'test', tag: 'test' })
  expect(status).toBe(404)
})

test('DELETE /questions/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${question.id}`)
  expect(status).toBe(204)
})

test('DELETE /questions/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
