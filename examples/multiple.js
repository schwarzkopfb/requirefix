/**
 * Created by schwarzkopfb on 15/7/31.
 */

// initialize requirefix and set the desired postfixes. it'll replace the built-in require() function
// we need to do it only once in our application (probably in the main module)

require('../requirefix').postfix = [ '.min', '.compiled', '-compiled' ]

// load '../test/test1-compiled.js'

// requirefix will try to load:
// * '../test/test1.min.js'
// * '../test/test1.compiled.js'
// * '../test/test1-compiled.js'

require('../test/test1')

// it's also allowed to use multiple prefixes with multiple postfixes in the same time

requirefix.prefix = [ 'a', 'b', 'te' ] // worth to mention requirefix also exposes itself to global, so we can configure here like this

// requirefix will try to load:

// * '../test/ast1.min.js'
// * '../test/bst1.min.js'
// * '../test/test1.min.js'
//
// * '../test/ast1.compiled.js'
// * '../test/bst1.compiled.js'
// * '../test/test1.compiled.js'
//
// * '../test/ast1-compiled.js'
// * '../test/bst1-compiled.js'
// * '../test/test1-compiled.js'

require('../test/st1')