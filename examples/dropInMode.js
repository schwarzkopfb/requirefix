/**
 * Created by schwarzkopfb on 15/7/31.
 */

// initialize and configure requirefix
// we need to do it only once in our application (probably in the main module)

var rfx = require('../requirefix')

rfx.dropIn  = true // tell requirefix to restore global.require() and module.require() to the original, built-in require() function
rfx.postfix = '-compiled'

// load '../test/test1-compiled.js'

rfx(module, '../test/test1') // in dropIn mode it's required to pass current module context as the first argument

var rfx2 = rfx.bind(module) // or to bind its context to the current module context

rfx2('../test/test1')