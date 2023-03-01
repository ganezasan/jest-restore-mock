const originalRandom = Math.random

describe('Math.random', () => {
  let mockedRandom: jest.MockedFunction<() => number>

  beforeEach(() => {
    mockedRandom = jest.fn(() => 1) as unknown as jest.MockedFunction<typeof Math.random>
  })

  afterAll(() => {
    Math.random = originalRandom
  })

  it('mockRestore', () => {
    Math.random = mockedRandom
    expect(Math.random()).toBe(1)

    // リセット
    mockedRandom.mockRestore()

    // mockプロパティの値はリセットされる
    expect((Math.random as jest.MockedFunction<typeof Math.random>).mock.calls).toEqual([])
    expect((Math.random as jest.MockedFunction<typeof Math.random>).mock.results).toEqual([])
    expect(Math.random()).toBe(undefined) // モック化された関数はクリアされる
  })
  it('jest.resetAllMocks', () => {
    Math.random = mockedRandom
    expect(Math.random()).toBe(1)

    // リセット
    jest.restoreAllMocks()

    // mockプロパティの値はリセットされない
    expect((Math.random as jest.MockedFunction<typeof Math.random>).mock.calls).toEqual([[]])
    expect((Math.random as jest.MockedFunction<typeof Math.random>).mock.results).toEqual([{ type: 'return', value: 1 }])
    expect(Math.random()).toBe(1) // モック化された関数はクリアされない
  })
})
