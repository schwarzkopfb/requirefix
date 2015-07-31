/**
 * Created by schwarzkopfb on 15/7/31.
 */

// initialize and configure requirefix. it'll not replace the built-in require() function
// we need to do it only once in our application (probably in the main module)

var rfx = require('../requirefix')

rfx.dropIn  = false
rfx.postfix = '-compiled'

// load '../test/test1-compiled.js'

rfx(module, '../test/test1') // in dropIn mode it's required to pass current module context as the first argument