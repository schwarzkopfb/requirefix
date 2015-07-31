/**
 * Created by schwarzkopfb on 15/7/31.
 */

// initialize requirefix and set the desired pre- and post fix. it'll replace the built-in require() function
// we need to do it only once in our application (probably in the main module)

var rfx = require('../requirefix')

rfx.prefix  = 'te'
rfx.postfix = '-compiled'

// as the following example shows, requirefix will prefix the last part (file or directory name) of the given path

// load '../test/test1-compiled.js'

require('../test/st1') // '../test/' + PREFIX + 'st1' + POSTFIX = '../test/' + 'te' + 'st1' + '-compiled' = '../test/test1-compiled'