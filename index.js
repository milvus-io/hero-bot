const core = require('@actions/core');
const github = require('@actions/github');
const { orderArray } = require('./util');
const { updateFile } = require('./updateFile');

async function run() {
    try {

        // required inputs
        const token = core.getInput('token');
        const sourcesRepos = core.getInput('repos').split(";");
        const target = core.getInput('targetRepo');

        // optional inputs
        const orderKey = core.getInput('orderKey') || 'login';
        const isAscend = core.getInput('isAscend') || true;
        const userTypeBlackList = (core.getInput('userTypeBlackList') || 'Bot').split(",");
        const filePath = core.getInput('filePath') || 'README.md';
        const width = core.getInput('width') || '40px';
        const showTotal = core.getInput('showTotal') || true;

        const repos = sourcesRepos.reduce((acc, cur) => {
            const owner = cur.split("/")[0];
            const repos = cur.split("/")[1] && cur.split("/")[1].split(",");

            if (!owner || !Array.isArray(repos)) {
                throw new Error(`error target repo path set for ${owner}`);
            }
            return acc.concat(repos.map(repo => `${owner}/${repo}`));
        }, []);

        const [targetOwner, targetRepo] = target.split("/");
        if (!targetOwner || !targetRepo) {
            throw new Error(`error target repo path set ${targetRepo}`);
        }

        const octokit = github.getOctokit(token);
        const contributors = [];
        for (let i = 0; i < repos.length; i++) {
            const [owner, repo] = repos[i].split("/");
            if (!owner || !repo) {
                throw new Error(`error repo path set ${repos[i]}`);
            }

            // recursion get contributor unitl last page (100 per page)
            let page = 1;
            getTotalContributor = async (totalCons = []) => {
                const { status, data } = await octokit.rest.repos.listContributors({
                    owner,
                    repo,
                    page,
                    per_page: 100,
                });
                if (status === 200 && data && data.length) {
                    page++;
                    totalCons = totalCons.concat(data);
                    return await getTotalContributor(totalCons);
                }
                if (status !== 200) {
                    throw new Error(`Network error while fetching ${owner} ${repo} contributors`);
                }
                return totalCons;
            }
            let total = await getTotalContributor();
            console.log(`got ${total.length} contributors from ${repos[i]}`);

            // remove duplicate by id
            const ids = contributors.map(contri => contri.id);
            if (userTypeBlackList.length) {
                total = total.filter(element => !userTypeBlackList.includes(element.type))
            }
            total.forEach(element => {
                if (!ids.includes(element.id)) {
                    contributors.push(element);
                }
            });
        }

        // order by orderKey
        orderArray(contributors, orderKey, isAscend);

        console.log(`${contributors.length} contributors from ${repos.toString()} in total`);
        console.log(`orderd by ${orderKey}, ${isAscend ? 'ascend' : 'descend'}`);

        await updateFile({ token, contributors, filePath, width, showTotal, targetOwner, targetRepo });
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();