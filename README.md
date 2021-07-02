# hero-bot
extract heros (contributor) from given repos and add hero avator icon in your markdown

## Usage

Here is an [example](https://github.com/milvus-io/milvus/blob/master/.github/workflows/all-contributors.yaml) yml for using hero-bot 

### Required inputs

| key | description | example value |
|  ---- | ---- | ---- |
| token | Personal access tokens for access your repo, better stored in secret | `ghp_xxxx` |
| repos  | repos need to collection contributor, `/`to divide org and repo, `,` to seperate different repos in same org, `;` to seperate different orgs | `milvus-io/milvus,milvus.io;facebook/react,ax` |
| target  | target path to add collection contributor | `milvus-io/milvus/README.md` |

### Optional inputs

| key | description | default value | available value |
|  ---- | ---- | ---- | ---- |
| orderKey | contributor is ordered by this key, will always be `login` if customUserConfig is set| `login` | `login` or `contributions` |
| isAscend | ascend or descend | `True` | `True` or `False` |
| userTypeBlackList | filter out user type | `Bot` | `""`,`Bot`,`User` or `Bot,User` |
| width | width of contributor avator icon | `40px` | proper value for avator icon |
| showTotal | show total number badge | `True` | `True` or `False` |
| customUserConfig | custom user list config file path | `""` | config `avatar_url`, `html_url` and `login`  in an array |

### Customize position

Contributors add to end of file in default.

To customize position, add 
```<br><!-- Do not remove start of hero-bot --><br><br><!-- Do not remove end of hero-bot --><br>``` 
anywhere you want. And contributors will be insert inside of if.

## Reference

Use [@actions/github](https://github.com/actions/toolkit/tree/main/packages/github) to fetch contributor from repo and files
Use [@octokit/plugin-create-or-update-text-file](https://github.com/octokit/plugin-create-or-update-text-file.js) to update file  
Use https://shields.io to generate badge
