[![Coverage Status](https://coveralls.io/repos/github/martinheidegger/require-implementation/badge.svg)](https://coveralls.io/github/martinheidegger/require-implementation)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# require-implementation 

Package that helps you to be okay if some dependency is missing.

## Usage

```javascript
const impl = require('require-implementation')

try {
  // Let the user know what action you would like to take.
  const math = impl('Trying to do some math.')
    // ... then require what ever package could
    //     installed immediatly.
    .require('math')
} catch (e) {
  // You can filter other errors by checking for the code
  e.code === 'EPACKAGEMISSING'

  // In recommended packages 
  e.recommendedPackages == ['math']

  e.message === 'EPACKAGEMISSING: Trying to do some math.\n'+
                'This error can be easily fixed by running ONE of the following commands:\n'+
                '- npm install math --save'
}

```

In case there are multiple options:

```javascript
const impl = require('require-implementation')
try {
  // requireFirst lets people know that each of the 
  const mathSet = impl('Trying to do some math.').requireFirst(['math', 'mathjs'])

  // You can find out which was ldaded by taking the name
  mathSet.name === 'math' || mathSet.name === 'mathjs'

  // The required package can be found in .pkg
  const math = mathSet.pkg
} catch (e) {
  // Same error as above
}
```

## License
ISC