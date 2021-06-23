const { Octokit } = require("@octokit/core");
const {
    createOrUpdateTextFile,
} = require("@octokit/plugin-create-or-update-text-file");

const startPlaceHolder = '<br><!-- Do not remove start of hero-bot --><br>';
const endPlaceHolder = '<br><!-- Do not remove end of hero-bot --><br>';

const updateFile = async ({ token, contributors, filePath, width, showTotal, targetOwner, targetRepo }) => {
    const MyOctokit = Octokit.plugin(createOrUpdateTextFile);
    const octokit = new MyOctokit({ auth: token });

    const { updated, data } = await octokit.createOrUpdateTextFile({
        owner: targetOwner,
        repo: targetRepo,
        path: filePath,
        content: ({ exists, content }) => {
            if (!exists) return null;
            let contributerIcons = contributors.map(element => {
                return `<a href="${element.html_url}"><img src="${element.avatar_url}" class="avatar-user" width="${width}" /></a>`
            })

            let returnContent = "";
            returnContent = returnContent.concat(startPlaceHolder);

            if (showTotal) {
                returnContent = returnContent.concat(`<img src="https://img.shields.io/badge/Total-${contributerIcons.length}-orange"><br>`);
            }
            returnContent = returnContent.concat(contributerIcons.join('')).concat(endPlaceHolder);
            const startOffset = content.indexOf(startPlaceHolder);
            const endOffset = content.indexOf(endPlaceHolder);
            if (startOffset == -1) {
                // add contributor
                return `${content}${returnContent}`;
            } else {
                // update contributor
                const replacement = content.slice(startOffset, endOffset + endPlaceHolder.length);
                return content.replace(replacement, returnContent);
            }
        },
        message: `update ${filePath}`,
    });
}

module.exports = {
    updateFile,
}