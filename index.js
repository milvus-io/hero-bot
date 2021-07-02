import core from '@actions/core';
import mainTread from './src/main.js';

async function run() {
  const option = {
    // required inputs
    token: core.getInput('token', { required: true }),
    sourcesRepos: core.getMultilineInput('repos', { required: true }),
    target: core.getInput('target', { required: true }),

    // optional inputs
    orderKey: core.getInput('orderKey') || 'login',
    isAscend: core.getBooleanInput('isAscend'),
    userTypeBlackList: (core.getInput('userTypeBlackList') || 'Bot').split(","),
    width: core.getInput('width') || '40px',
    showTotal: core.getInput('showTotal') || true,
    customUserConfig: core.getInput('customUserConfig'),
  }
  mainTread(option);
}
run();