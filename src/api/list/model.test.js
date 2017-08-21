import { List } from '.'

let list

beforeEach(async () => {
  list = await List.create({ id: 'test', name: 'test', status: 'test', members: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = list.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(list.id)
    expect(view.id).toBe(list.id)
    expect(view.name).toBe(list.name)
    expect(view.status).toBe(list.status)
    expect(view.members).toBe(list.members)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = list.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(list.id)
    expect(view.id).toBe(list.id)
    expect(view.name).toBe(list.name)
    expect(view.status).toBe(list.status)
    expect(view.members).toBe(list.members)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
