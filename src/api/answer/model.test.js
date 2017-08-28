import { Answer } from '.'

let answer

beforeEach(async () => {
  answer = await Answer.create({ id: 'test', value: 'test', survey: 'test', question: 'test', memberEvaluated: 'test', memberAsked: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = answer.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(answer.id)
    expect(view.id).toBe(answer.id)
    expect(view.value).toBe(answer.value)
    expect(view.survey).toBe(answer.survey)
    expect(view.question).toBe(answer.question)
    expect(view.memberEvaluated).toBe(answer.memberEvaluated)
    expect(view.memberAsked).toBe(answer.memberAsked)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = answer.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(answer.id)
    expect(view.id).toBe(answer.id)
    expect(view.value).toBe(answer.value)
    expect(view.survey).toBe(answer.survey)
    expect(view.question).toBe(answer.question)
    expect(view.memberEvaluated).toBe(answer.memberEvaluated)
    expect(view.memberAsked).toBe(answer.memberAsked)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
