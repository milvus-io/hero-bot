const core = require('@actions/core');
const fs = require('fs');

const startPlaceHolder = '<!-- Do not remove start of hero-bot -->';
const endPlaceHolder = '<!-- Do not remove end of hero-bot -->';

const updateFile = ({ contributors, width, showTotal, targetFile, workingDir
}) => {
  try {
    core.info(`start to update ${targetFile}`);
    core.info(workingDir);
    let content = fs.readFileSync(`${workingDir}/${targetFile}`, { encoding: "utf8" });
    let newContent = `${startPlaceHolder}\n`;

    if (showTotal) {
      core.info(`total badge will be shown`);
      newContent = `${newContent}<img src="https://img.shields.io/badge/all--contributors-${contributerIcons.length}-orange"><br>\n`;
    }

    let contributerIcons = contributors.map(element => {
      return `<a href="${element.html_url}"><img src="${element.avatar_url}" width="${width}" /></a>\n`
    })
    core.info(`${contributerIcons.length} contributors will be added`);
    newContent = `${newContent}${contributerIcons.join('')}${endPlaceHolder}`;

    const startOffset = content.indexOf(startPlaceHolder);
    const endOffset = content.indexOf(endPlaceHolder);
    if (startOffset === -1 && endOffset === -1) {
      // add contributor
      content = `${content}${newContent}`;
      core.exportVariable('updated', true);
    } else if (content.indexOf(newContent) == -1) {
      // update contributor
      const replacement = content.slice(startOffset, endOffset + endPlaceHolder.length);
      content = content.replace(replacement, newContent);
      core.exportVariable('updated', true);
    } else {
      core.info("contributors not changed, won't update file");
      core.exportVariable('updated', false);
    }
    fs.writeFileSync(`${workingDir}/${targetFile}`, content);
    core.info(`file write successfully`);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  updateFile,
}