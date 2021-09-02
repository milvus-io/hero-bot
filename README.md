# hero-bot
extract heros (contributor) from given repos and add hero avator icon in your markdown

## This branch only for dco usage, detail config refer to [here](https://github.com/milvus-io/milvus/blob/master/.github/workflows/all-contributors.yaml)
### Required inputs

| key | description | example value |
|  ---- | ---- | ---- |
| token | Personal access tokens with public_repo access ![image](https://user-images.githubusercontent.com/83750738/126748573-1de4a912-bf1a-4c2c-88ff-3032dce70f6a.png)  better stored in secret | `ghp_xxxx` |
| repos  | repos need to collection contributor, `/`to divide org and repo, `,` to seperate different repos in same org, `;` to seperate different orgs | `milvus-io/milvus,milvus.io;facebook/react,ax` |
| targetFile  | target file to add collection contributor | `README.md` |

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
```<!-- Do not remove start of hero-bot --><!-- Do not remove end of hero-bot -->``` 
anywhere you want. And contributors will be insert inside of if.

## Reference

Use [@actions/github](https://github.com/actions/toolkit/tree/main/packages/github) to fetch contributor from repo and files.  
Use [@octokit/plugin-create-or-update-text-file](https://github.com/octokit/
Use https://shields.io to generate badge. 
