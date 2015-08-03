/**
 * Created by schwarzkopfb on 15/7/31.
 */

var assert = require('assert'),
    rfx    = require('..')

assert(rfx instanceof Function, 'requirefix() must be a Function')

assert('prefix'  in rfx, 'requirefix.prefix must be exposed')
assert('postfix' in rfx, 'requirefix.postfix must be exposed')
assert('dropIn'  in rfx, 'requirefix.dropIn must be exposed')
assert('require' in rfx, 'requirefix.require() must be exposed')

assert(rfx.require instanceof Function, 'requirefix.require() must be a Function')

assert.equal(rfx.dropIn, false, 'requirefix.dropIn must be false by default')

assert(Array.isArray(rfx.prefix), 'requirefix.prefix must be an array')
assert(Array.isArray(rfx.postfix), 'requirefix.postfix must be an array')

assert.notEqual(global.require, rfx.require, 'Module.prototype.require() must be overwritten in replacement mode')
assert.equal(global.require, rfx, 'Module.prototype.require() must be overwritten in replacement mode')

rfx.dropIn = true

assert.notEqual(global.require, rfx, 'Module.prototype.require() must be restored in dropIn mode')

var test

assert.throws(
    function () {
        test = rfx(module, './test1')
    },

    'requirefix(moduleContext, moduleName) should fail without a correct postfix'
)

rfx.postfix = '-compiled'

assert.doesNotThrow(
    function () {
        test = rfx(module, './test1')
    },

    'requirefix(moduleContext, moduleName) should not fail'
)

assert.throws(
    function () {
        test = rfx('./test1')
    },

    'requirefix(moduleName) should fail without a moduleContext in dropIn mode'
)

rfx.dropIn = false

assert.doesNotThrow(
    function () {
        test = require('./test1')
    },

    'global.require(moduleName) should not fail in replacement mode'
)

assert.throws(
    function () {
        test = require(module, './test1')
    },

    'global.require(moduleContext, moduleName) should fail in replacement mode'
)

assert.doesNotThrow(
    function () {
        test = require('./test1', 'test', 'test')
    },

    'global.require(moduleName, overridePrefix, overridePostfix) should ignore incorrect pre- and post fixes in replacement mode'
)

assert.throws(
    function () {
        test = rfx(module, './test1', 'test', 'test')
    },

    'requirefix(moduleContext, moduleName, overridePrefix, overridePostfix) should fail with incorrect pre- and post fixes'
)

rfx.prefix = 'te'

assert.doesNotThrow(
    function () {
        test = require('./st1')
    },

    'global.require(moduleName) should should not fail with correct pre- and postfixes in replacement mode'
)

assert('greeting' in test, "test module's exports object must be correct")
assert.equal(test.greeting('World'), 'Hello World!', "test module's exports object must be correct")
assert.equal(test.greeting(undefined, 'haw'), 'Aloha Balazs!', "test module's exports object must be correct")