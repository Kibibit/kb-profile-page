<p align="center">
  <a href="https://github.com/Kibibit/kb-login-page" target="blank"><img src="http://kibibit.io/kibibit-assets/kb-profile-apps/005-blocks.svg" width="150" ></a>
  <h2 align="center">
    @kibibit/kb-profile-page
  </h2>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@kibibit/kb-login-page"><img src="https://img.shields.io/npm/v/@kibibit/kb-login-page/latest.svg?style=for-the-badge&logo=npm&color=CB3837"></a>
</p>
<p align="center">
  <a href="https://salt.bountysource.com/teams/kibibit"><img src="https://img.shields.io/endpoint.svg?url=https://monthly-salt.now.sh/kibibit&style=flat-square"></a>
</p>
<p align="center">
  A simple profile page for deployments and containers
</p>
<hr>

should work with [lipp\/login-with](https://github.com/lipp/login-with)

This library **requires** three parameters: `kbCookieSecret`, `kbJwtSecret`, `kbApp`.

You can also pass the following optional parameters:
- `kbIcon`
- `kbCustomBg` - replace the particles default background
- `kbHideKibibit` - in order to use in **non-kibibit** projects, this will hide the kibibit logo

You can pass them either with environment variables or with passing it as cli arguments:

### ENVIRONMENT
```
KB_APP=example app
KB_ICON=<url to icon>
KB_CUSTOM_BG=<url to bg>
KB_HIDE_KIBIBIT=true|false
```

### CLI
```
node server.js --kbApp kb-coding-server --kbIcon https://image.flaticon.com/icons/svg/119/119595.svg --kbCustomBg http://hdwpro.com/wp-content/uploads/2017/03/Art-Background-Image.png
```

You can use whatever case you like, the application will convert it internally to camel case using lodash.

## Examples

<img src="https://github.com/Kibibit/kb-profile-page/blob/master/screenshots/screenshot01.png?raw=true" style="max-width: 100%;">

<img src="https://github.com/Kibibit/kb-profile-page/blob/master/screenshots/screenshot02.png?raw=true" style="max-width: 100%;">

## Contributors

Thanks goes to our contributors! ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

----

<div>Library logo is made by <a href="https://www.flaticon.com/authors/flat-icons" title="Flat Icons">Flat Icons</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
