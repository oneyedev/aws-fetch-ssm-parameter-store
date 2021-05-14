const core = require('@actions/core')
const main = require('./src/main')

async function run() {
  try {
    const entries = await main.fetchParamsByPath({
      path: core.getInput('path'),
      recursive: core.getInput('recursive') === 'true',
      replacePathWithEmpty: core.getInput('recursive') === 'true',
    })
    const mask = core.getInput('mask') === 'true'
    for (const { Name, Value } of entries) {
      core.exportVariable(Name, Value)
      if (mask) {
        core.setSecret(Value)
      }
    }
    core.startGroup(`${entries.length} parameters are fetched and exported `)
    core.info(entries.map(({ Name, Value }) => `${Name}:${Value}`).join('\n'))
    core.endGroup()
  } catch (error) {
    core.setFailed(error.message)
  }
}
run()
