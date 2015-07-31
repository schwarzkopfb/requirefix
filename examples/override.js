/**
 * Created by schwarzkopfb on 15/7/31.
 */

// initialize requirefix and set the desired postfix. it'll replace the built-in require() function
// we need to do it only once in our application (probably in the main module)

var rfx = require('../requirefix')

rfx.postfix = '.compiled'

// load '../test/test1-compiled.js'

rfx(module, '../test/test1', null, '-compiled') // override global postfix option per call

rfx(module, '../test/st1', 'te', '-compiled') // override global pre- and post fix option per call

try {
    require('../test/test1', null, '-compiled')
}
catch(ex) {
    // it'll try to load '../test/test1.compiled' and '../test/test1' instead of '../test/test1-compiled'

    // due to a limitation in Node's Module implementation
    // the replaced global.require() will ignore all the parameters except module name (or path)
    // so per call pre- and post fix option override is only available as a dropIn function replacement
    // for an easy and acceptable workaround see: ./include.js
}