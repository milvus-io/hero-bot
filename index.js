const core = require('@actions/core');
const { mainTread } = require('./src/main.js');

async function run() {
  const option = {
    // required inputs
    token: core.getInput('token', { required: true }),
    sourcesRepos: core.getInput('repos', { required: true }).split(';'),
    targetFile: core.getInput('targetFile', { required: true }),

    // optional inputs
    orderKey: core.getInput('orderKey'),
    isAscend: core.getBooleanInput('isAscend'),
    userTypeBlackList: core.getInput('userTypeBlackList').split(","),
    width: core.getInput('width'),
    showTotal: core.getBooleanInput('showTotal'),
    customUserConfig: core.getInput('customUserConfig'),
  }
  mainTread(option);
}
run();