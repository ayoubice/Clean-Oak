import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { Member } from '.'

const app = () => express(routes)

let member

beforeEach(async () => {
  member = await Member.create({})
})

test('POST /members 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ id: 'test', name: 'test', position: 'test', email: 'test', labels: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.pic).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.labels).toEqual('test')
})

test('GET /members 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /members/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${member.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(member.id)
})

test('GET /members/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /members/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${member.id}`)
    .send({ id: 'test', name: 'test', position: 'test', pic: 'test', email: 'test', labels: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(member.id)
  expect(body.id).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.position).toEqual('test')
  //expect(body.pic).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.labels).toEqual('test')
})

test('PUT /members/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ id: 'test', name: 'test', position: 'test', email: 'test', labels: 'test' })
  expect(status).toBe(404)
})

test('DELETE /members/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${member.id}`)
  expect(status).toBe(204)
})

test('DELETE /members/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
