const { SSM } = require('aws-sdk')

class Options {
  constructor() {
    this.path = ''
    this.recursive = false
    this.separator = ''
  }
}

module.exports = {
  validateOptions(options = Options.prototype) {
    options.path = options.path || '/'
    options.separator = options.separator || '_'
  },

  async fetchParamsByPath(options = new Options()) {
    this.validateOptions(options)
    const ssm = new SSM()
    const result = await ssm
      .getParametersByPath({
        Path: options.path,
        Recursive: options.recursive,
      })
      .promise()
    const regex = /\//g
    const prefix = options.path === '/' ? 1 : options.path.length + 1
    result.Parameters.forEach((p) => {
      if (p.Name.startsWith('/')) {
        p.Name = p.Name.substring(prefix).replace(regex, options.separator)
      }
    })
    return result.Parameters
  },
}
