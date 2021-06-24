# hero-bot
extract heros (contributor) from given repos and add hero avator icon in your markdown

## usage

### required inputs

| key | description | example value |
|  ---- | ---- | ---- |
| token | Personal access tokens for access your repo, better stored in secret | `ghp_xxxx` |
| repos  | repos need to collection contributor, `/` to seperate repos, `;` to seperate orges | `'milvus-io/milvus,www.milvus.io;facebook/react,ax'` |
| targetRepo  | repo to add collection contributor | `'milvus-io/milvus'` |

### optional inputs

| key | description | default value | available value |
|  ---- | ---- | ---- | ---- |
| orderKey | contributor is ordered by this key | `'login'` | `"login"` or `"contributions"` |
| isAscend | ascend or descend | `true` | `true` or `false` |
| userTypeBlackList | filter out user type | `'Bot'` | `""`,`'Bot'`,`'User'` or `'Bot,User'` |
| filePath | path of file to add contributors | `'README.md'` | any file path exists in repo |
| width | width of contributor avator icon | `'40px'` | proper value for avator icon |
| showTotal | show total number badge | `true` | `true` or `false` |

### customize position

Contributors add to end of file in default.

To customize position, add 
```<br><!-- Do not remove start of hero-bot --><br><br><!-- Do not remove end of hero-bot --><br>``` 
anywhere you want. And contributors will be insert inside of if.

## Reference

Use @actions/github to fetch contributor
Use @octokit/plugin-create-or-update-text-file to update file
Use https://shields.io to generate badge


