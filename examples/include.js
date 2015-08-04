/**
 * Created by schwarzkopfb on 15/7/31.
 */

// include requirefix. it'll replace the built-in require() function
// we need to do it only once in our application (probably in the main module)

var rfx = require('../requirefix')

// set global postfix option
rfx.postfix = '.min'

// override module.require() with the drop in replacement function
// and bind its first argument to module context object
require = rfx.bind(module)

// here we're using requirefix() instead of the original module.require(),
// so we can pass overridePrefix and overridePostfix arguments to override pre- and post fixing options per call

var t1 = require('../test/test1', null, '-compiled'), // try to load '../test/test1-compiled.js' and '../test/test1.js'
    t2 = require('../test'),                          // try to load '../test/index.min.js' and '../test/index.js'
    t3 = require('../test/test1', null, '-compiled'), // try to load '../test/test1-compiled.js' and '../test/test1.js'
    t4 = require('../test/st1', 'te', [ '-compiled', '.min' ]),   // try to load '../test/test1-compiled.js', '../test/test1.compiled.js' and '../test/test1.js'
    t5 = require('../test')                           // try to load '../test/index.min.js' and '../test/index.js'