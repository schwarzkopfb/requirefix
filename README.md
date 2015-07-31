# Requirefix

## What's Requirefix?

Requirefix is a lightweight extension for Node.js's `require()` function. This extension allows you to load a module with its automatically postfixed name.

### The Problem

If you're using js-to-js transpilers or pre-processors like [Babel](https://babeljs.io/) or [Traceur](https://github.com/google/traceur-compiler) for your Node.js source code, you'll early face the problem you have two versions of the same file: an original and a compiled with different names.
`server.js` and `server-compiled.js` for example. It not seems like a good design decision to insert `-compiled` into the module names in your `require()` calls.

### The Solution

Requirefix extends Node's built-in `require()` function with an extra behaviour. You can specify one or more prefix and postfix for the module paths you try to require. This way you can simply include modules without worrying about the pre-processed and original file version names.

## Usage

Add it to your application's main module to override `module.require()` globally: 

```js

require('requirefix').postfix = '-compiled' // override module.require() and set the desired postfix in one line

// here we're using requirefix() instead of the original module.require()
// try to load './myCompiledModule-compiled.js' and './myCompiledModule.js'
var myCompiledModule = require('./myCompiledModule')

```

If you don't want to override `module.require()` globally, but you want yo use it as a drop in replacement, that's not a problem:
 
```js

var rfx = require('requirefix')

rfx.dropIn  = true // tell requirefix to restore global.require() and module.require() to the original, built-in require() function 
rfx.postfix = '-compiled' // set the desired postfix

require = rfx.bind(module) // override module.require() only for this module

// here we're using requirefix() instead of the original module.require()
// try to load './myCompiledModule-compiled.js' and './myCompiledModule.js'
var myCompiledModule = require('./myCompiledModule')

```

You can specify multiple postfixes at the same time:

```js

require('requirefix').postfix = [ '-compiled', '.min' ]

// try to load './myCompiledModule-compiled.js', './myCompiledModule.min.js' and './myCompiledModule.js'
var myCompiledModule = require('./myCompiledModule') 

```

Prefixes are also supported:

```js

var rfx = require('requirefix')

rfx.prefix  = '_' // auto-prefix with an underscore, because we mark private modules with it, for example
//rfx.prefix = [ '_', '__' ] // multiple prefixes are also supported
rfx.postfix = '-compiled'
//rfx.postfix = [ '-compiled', '.min' ] // or even multiple pre- and post fixes at the same time
 
// try to load:
// * './lib/_myCompiledModule-compiled'
// * './lib/_myCompiledModule'
// * './lib/myCompiledModule-compiled'
// * './lib/myCompiledModule'
var myCompiledModule = require('./lib/myCompiledModule')

```

For more information see the [examples](https://github.com/schwarzkopfb/requirefix/blob/master/examples).

## Installation

With npm:

    npm --save i requirefix
    
With git:
    
    git clone git://github.com/schwarzkopfb/requirefix.git
    cd requirefix
    npm test
    
## Performance

Requirefix adds minimal and hardly measurable overhead to the module-loading process.

## License

[MIT license](https://github.com/schwarzkopfb/requirefix/blob/master/LICENSE).