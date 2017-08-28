import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { Answer } from '.'

const app = () => express(routes)

let answer

beforeEach(async () => {
  answer = await Answer.create({})
})

test('POST /answers 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ id: 'test', value: 'test', survey: 'test', question: 'test', memberEvaluated: 'test', memberAsked: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual('test')
  expect(body.value).toEqual('test')
  expect(body.survey).toEqual('test')
  expect(body.question).toEqual('test')
  expect(body.memberEvaluated).toEqual('test')
  expect(body.memberAsked).toEqual('test')
})

test('GET /answers 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /answers/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${answer.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(answer.id)
})

test('GET /answers/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /answers/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${answer.id}`)
    .send({ id: 'test', text: 'test', type: 'test', required: 'test', tags: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(answer.id)
  expect(body.id).toEqual('test')
  expect(body.value).toEqual('test')
  expect(body.survey).toEqual('test')
  expect(body.question).toEqual('test')
  expect(body.memberEvaluated).toEqual('test')
  expect(body.memberAsked).toEqual('test')
})

test('PUT /answers/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ id: 'test', value: 'test', survey: 'test', question: 'test', memberEvaluated: 'test', memberAsked: 'test' })
  expect(status).toBe(404)
})

test('DELETE /answers/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${answer.id}`)
  expect(status).toBe(204)
})

test('DELETE /answers/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
