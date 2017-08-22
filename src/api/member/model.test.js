import { Member } from '.'

let member

beforeEach(async () => {
  member = await Member.create({ id: 'test', name: 'test', position: 'test', pic: 'test', email: 'test', labels: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = member.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(member.id)
    expect(view.name).toBe(member.name)
    expect(view.position).toBe(member.position)
    expect(view.pic).toBe(member.pic)
    expect(view.email).toBe(member.email)
    expect(view.labels).toBe(member.labels)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = member.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(member.id)
    expect(view.name).toBe(member.name)
    expect(view.position).toBe(member.position)
    expect(view.pic).toBe(member.pic)
    expect(view.email).toBe(member.email)
    expect(view.labels).toBe(member.labels)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
