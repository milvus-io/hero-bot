import core from '@actions/core';

import { orderArray, getRepoFromSourceRepo } from './util.js';
import { fetchContributors, fetchCustomUser } from './fetchContributors.js';
import updateFile from './updateFile.js';

const mainTread = async (option) => {
  try {
    const {
      token,
      sourcesRepos,
      target,

      orderKey,
      isAscend,
      userTypeBlackList,
      customUserConfig,
    } = option;

    const repos = getRepoFromSourceRepo(sourcesRepos);
    let contributors = await fetchContributors(token, repos, userTypeBlackList);

    // add custom contributors
    if (customUserConfig) {
      const customUser = await fetchCustomUser(token, customUserConfig);
      contributors = contributors.concat(customUser);
    }

    // orderKey will always be login when customUserConfig is set
    const rumtimeOrderKey = customUserConfig ? 'login' : orderKey;
    // order by orderKey
    orderArray(contributors, rumtimeOrderKey, isAscend);

    core.info(`${contributors.length} contributors from ${repos.toString()} in total filtered out by ${userTypeBlackList.toString()}`);
    core.info(`orderd by ${orderKey}, ${isAscend ? 'ascend' : 'descend'}`);

    Object.assign(option, {
      contributors,
    });
    await updateFile(option);
    core.info(`${contributors.length} contributors added into file ${target}`)
  } catch (error) {
    core.setFailed(error.message);
  }
}

export default mainTread;