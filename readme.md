# anderson [![Build Status](https://travis-ci.org/bukinoshita/anderson.svg?branch=master)](https://travis-ci.org/bukinoshita/anderson)

> Checks your node dependencies for contraband licenses

_Feel free to contribute to this project to improve the code._

## Install

```
$ npm install --save anderson
```


## Usage
```js
const anderson = require('anderson')

anderson()

/*
[{
    name: 'chalk',
    version: '^2.0.1',
    contraband: false,
    license: 'MIT'
  },
  {
    name: 'log-symbols',
    version: '^1.0.2',
    contraband: false,
    license: 'MIT'
  },
  {
    name: 'meow',
    version: '^3.7.0',
    contraband: false,
    license: 'MIT'
}]
*/
// => [dependency1, dependency2, ...]
```

_You need to add a `.anderson.yml` file in your project, check example [here](https://github.com/bukinoshita/anderson/blob/master/.anderson.yml)._

_anderson is heavily inspired on [anderson](https://github.com/contraband/anderson)_


## API

### anderson([options])

returns a `promise`

#### options

Type: `object`

##### dev

Type: `boolean`<br/>
Default: false

If `true` it will check dev-dependencies

##### peer

Type: `boolean`<br/>
Default: false

If `true` it will check peer-dependencies


## Related

- [anderson-cli](https://github.com/bukinoshita/anderson-cli) — CLI of this module


## License

MIT © [Bu Kinoshita](https://bukinoshita.io)
