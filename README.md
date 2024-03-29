# maskify

> Mask sensitive data strings and only expose certain parts

[![CI status](https://github.com/andreruffert/maskify/workflows/CI/badge.svg)](https://github.com/andreruffert/maskify/actions?workflow=CI)
[![npm version](https://img.shields.io/npm/v/maskify.svg)](https://www.npmjs.com/package/maskify)
[![npm downloads](https://img.shields.io/npm/dm/maskify?logo=npm)](https://www.npmjs.com/package/maskify)

Useful to mask credit card numbers, secret tokens or any other data.

## Install

```
$ npm install maskify
```


## Usage


```js
import maskify from 'maskify';

// Example to mask a standard credit card number
maskify('4556-3646-0793-5616');
// => '4###-####-####-5616'

// By default only masks digits
maskify('A1234567BCDEFG89HI');
// => 'A#######BCDEFG89HI'

// By default does not mask short credit card numbers
maskify('54321');
// => '54321'

```


## API

### maskify(string, [options])

Returns a new masked string.

#### string
Type: `string`

#### options
Type: `object`

##### maskSymbol
Type: `string`           
Default: `#`

Symbol to mask the characters with.

##### matchPattern
Type: `regexObj`           
Default: `/^\d+$/`

Only mask characters matching the pattern and keep other characters unmasked.

##### visibleCharsStart
Type: `number`           
Default: `1`

Number of characters not to mask at the __start__ of the string (__`4`__ `###-####-####`)

##### visibleCharsEnd
Type: `number`           
Default: `4`

Number of characters not to mask at the __end__ of the string (`###-####-####` __`5616`__).

##### minChars
Type: `number`           
Default: `6`

Minimum characters of input string length to start masking.


## License

MIT © [André Ruffert](https://andreruffert.com)
