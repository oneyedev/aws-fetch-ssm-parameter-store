require('dotenv').config()
const main = require('../src/main')

describe('Fetch params test', () => {
  it('Default path is root(/)', async () => {
    const result = await main.fetchParamsByPath()
    expect(result).toHaveLength(1)
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Name: 'SAMPLE_ROOT_KEY',
          Value: 'THIS IS A SAMPLE ROOT VALUE',
        }),
      ])
    )
  })

  it('Path can be specified', async () => {
    const result = await main.fetchParamsByPath({
      path: '/sample',
    })
    expect(result).toHaveLength(1)
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Name: '/sample/SAMPLE_KEY',
          Value: 'this is a sample key',
        }),
      ])
    )
  })

  it('Path string can be replaced with a empty string', async () => {
    const result = await main.fetchParamsByPath({
      path: '/sample',
      replacePathWithEmpty: true,
    })
    expect(result).toHaveLength(1)
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Name: 'SAMPLE_KEY',
          Value: 'this is a sample key',
        }),
      ])
    )
  })

  it('Root path string should be maintained', async () => {
    const result = await main.fetchParamsByPath({
      replacePathWithEmpty: true,
    })
    expect(result).toHaveLength(1)
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Name: 'SAMPLE_ROOT_KEY',
          Value: 'THIS IS A SAMPLE ROOT VALUE',
        }),
      ])
    )
  })

  it('All nested params will be fetched if set "recursive" true', async () => {
    const result = await main.fetchParamsByPath({
      recursive: true,
    })
    expect(result).toHaveLength(3)
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Name: 'SAMPLE_ROOT_KEY',
          Value: 'THIS IS A SAMPLE ROOT VALUE',
        }),
      ]),
      expect.objectContaining({
        Name: '/sample/SAMPLE_KEY',
        Value: 'this is a sample key',
      }),
      expect.objectContaining({
        Name: '/sample/nested/NESTED_KEY',
        Value: 'this is a nested value',
      })
    )
  })
})
