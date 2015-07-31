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
// so we can pass overridePrefix and overridePostfix arguments to override pre- and post fixing option per call

var t1 = require('../test/test1', null, '-compiled'), // loads '../test/test1-compiled.js'
    t2 = require('../test'),                          // loads '../test/index.js'
    t3 = require('../test/test1', null, '-compiled'), // loads '../test/test1-compiled.js'
    t4 = require('../test/st1', 'te', '-compiled'),   // loads '../test/test1-compiled.js'
    t5 = require('../test')                           // loads '../test/index.js'