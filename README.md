<div align="center">
  <img src=".storybook/logo-light.png" alt="Logo" style="max-width: 400px;">
  <br/>
  <em>Easily search and filter javascript arrays</em>
  <br/>
  <a href="https://francisashley.github.io/vue-data-screener/">Documentation</a>
</div>

## Features

- [x] storybook documentation
- [x] can be imported as a component from github into vue project
- [x] can highlight search query
- [x] data is paginated
- [ ] the theme looks like the Mozilla Firefox JSON viewer in dark mode
- [ ] can display images / text / links
- [ ] can add or remove table fields
- [ ] can resize table fields
- [ ] can sort by field
- [ ] can filter by all fields
- [ ] can filter by one field
- [ ] can style table, thead, tbody, tr, th, td
- [ ] can include row data dump
- [ ] is fully tested
- [ ] the content of each cell could be extendable like https://www.vuetable.com/guide/

## Install

This is a private github package so will need to:

1) Create an npm proxy to github
2) Provide an access token

Start by adding an .npmrc file to the root of the repo, containing:

```
@skystash:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGE_ACCESS_TOKEN}
```

Then provide the access token by setting `GITHUB_PACKAGE_ACCESS_TOKEN` at the shell level.

In Powershell, this looks like:

`[System.Environment]::SetEnvironmentVariable('GITHUB_PACKAGE_ACCESS_TOKEN','XYZ',[System.EnvironmentVariableTarget]::User)`

> Note: Powershell integration on vscode seams a lil broken.. so the variables will persist during the session but if you close the terminal or vscode and come back, the env vars are lost. It appears the only way to persistently load the latest powershell env vars in vscode is to restart the computer after updating the vars. Restarting the terminal or vscode does not fix.

Useful powershell resources: [Person having the restart issue](https://github.com/microsoft/vscode/issues/26048#issuecomment-539407696), [how to use powershell](https://mcpmag.com/articles/2019/03/28/environment-variables-in-powershell.aspx).

The access token can be generated at   https://github.com/settings/tokens by creating a token with `read:packages` checked.


## Basic usage

```js
<template>
  <vue-data-screener
    :data="[
      { type: 'fruit', name: 'Pears'},
      { type: 'fruit', name: 'Orange'},
      { type: 'vegetable', name: 'Brussels sprouts'}
    ]"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import VueDataScreener from '@skystash/vue-data-screener'

export default Vue.extend({
  components: {
    VueDataScreener,
  },
})
</script>
```

More documentation can be found on the [Chromatic](https://www.chromatic.com/builds?appId=61d4d292187f54004aba929a)

https://www.aaron-powell.com/posts/2020-11-06-deploy-to-github-packages-with-github-actions/

https://medium.com/evodeck/responsive-data-tables-with-css-grid-3c58ecf04723


# Dev note

Publish update:

```
> npm version patch
or 
> npm version minor
or 
> npm version major
or 
> npm version x.x.x

then

> npm publish
```
