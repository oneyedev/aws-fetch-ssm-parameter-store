const { SSM } = require('aws-sdk')

class Options {
  constructor() {
    this.path = '/'
    this.recursive = false
    this.replacePathWithEmpty = false
  }
}

module.exports = {
  validateOptions(options = Options.prototype) {
    options.path = options.path || '/'
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
    if (options.path !== '/' && options.replacePathWithEmpty) {
      const prefix = options.path + '/'
      result.Parameters.forEach((p) => {
        p.Name = p.Name.substring(prefix.length)
      })
    }
    return result.Parameters
  },
}
