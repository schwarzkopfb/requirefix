/**
 * Created by schwarzkopfb on 15/7/31.
 */

// initialize requirefix and set the desired postfix. it'll replace the built-in require() function
// we need to do it only once in our application (probably in the main module)

require('../requirefix').postfix = '-compiled'

// load '../test/test1-compiled.js'

require('../test/test1')