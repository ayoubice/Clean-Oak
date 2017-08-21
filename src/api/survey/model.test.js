import { Survey } from '.'

let survey

beforeEach(async () => {
  survey = await Survey.create({ name: 'test', description: 'test', elements: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = survey.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(survey.id)
    expect(view.name).toBe(survey.name)
    expect(view.description).toBe(survey.description)
    expect(view.elements).toBe(survey.elements)
    expect(view.status).toBe(survey.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = survey.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(survey.id)
    expect(view.name).toBe(survey.name)
    expect(view.description).toBe(survey.description)
    expect(view.elements).toBe(survey.elements)
    expect(view.status).toBe(survey.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
