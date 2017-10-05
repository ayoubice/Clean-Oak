import { Question } from '.'

let question

beforeEach(async () => {
  question = await Question.create({ id: 'test', text: 'test', type: 'test', required: 'test', tags: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = question.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(question.id)
    expect(view.id).toBe(question.id)
    expect(view.text).toBe(question.text)
    expect(view.type).toBe(question.type)
    expect(view.required).toBe(question.required)
    expect(view.tag).toBe(question.tag)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = question.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(question.id)
    expect(view.id).toBe(question.id)
    expect(view.text).toBe(question.text)
    expect(view.type).toBe(question.type)
    expect(view.required).toBe(question.required)
    expect(view.tag).toBe(question.tag)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
