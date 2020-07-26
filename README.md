# signme

Library for work with [sign.me](https://sign.me) service to sign files.

## How to install

### npm package

For install npm-package use `npm i signme` or `yarn add signme`.

### in browser

Just download file (`singme.js` or `signme.min.js`) from [this page](https://github.com/scientistnik/signme/releases) and insert the tag in your html:

```html
<script src="signme.js"></script>
...
<script>
  const SignMe = signme.default
  ...
</script>
```

## How to use

Sign files use browser:

```js
import SignMe from "signme";

const signme = new SignMe({ apiKey: "<api key>" });

const filesToSign = [
  {
    filet: Buffer.from("Hello").toString("base64"),
    fname: "hello.html",
  },
];

const uuid = await signme.sendFiles(filesToSign);
// open link in browser for confirm signing:
// https://server_name/signapi/multijson/<uuid>
```

or without browser:

```js
import SignMe from "signme";

const signme = new SignMe({
  apiKey: "<api key>",
  userPhone: "<phone>",
  password: "<password>",
});

const filesToSign = [
  {
    filet: Buffer.from("Hello").toString("base64"),
    fname: "hello.html",
  },
];

const uuid = await signme.sendFiles(filesToSign);

await signme.sign(uuid);
```

Get link to signature file:

```js
import md5 from "md5";

const response = await signme.check(md5("Hello"));
const downloadLink = response.signature_1.pkcs7;
```

## Build from source

Download from github, install dependencies:

```shell
$ git clone git@github.com:scientistnik/signme.git
$ cd signme
$ yarn
```

build package:

```shell
$ yarn build
```

If you need build for browser:

```shell
$ yarn browserify
```

To start tests, you need to create `.env`-file (see `.env-template` example) where set your API-key.

Run tests:

```shell
$ yarn test
```

## Contributing

Bug reports and pull requests are welcome on GitHub.

## License

The package is available as open source under the terms of the [MIT License](https://github.com/scientistnik/signme/blob/master/LICENSE).
