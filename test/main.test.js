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
          Name: 'SAMPLE_KEY',
          Value: 'this is a sample key',
        }),
      ])
    )
  })

  it(`All nested params will be fetched if set "recursive" true
    - slash(/) charater will be replaced with underbar(_) character`, async () => {
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
        expect.objectContaining({
          Name: 'sample_SAMPLE_KEY',
          Value: 'this is a sample key',
        }),
        expect.objectContaining({
          Name: 'sample_nested_NESTED_KEY',
          Value: 'this is a nested value',
        }),
      ])
    )
  })

  it(`Default seperater(_) can be overrided specific one`, async () => {
    const result = await main.fetchParamsByPath({
      path: '/sample',
      recursive: true,
      separator: '&&',
    })
    expect(result).toHaveLength(2)
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Name: 'SAMPLE_KEY',
          Value: 'this is a sample key',
        }),
        expect.objectContaining({
          Name: 'nested&&NESTED_KEY',
          Value: 'this is a nested value',
        }),
      ])
    )
  })
})
