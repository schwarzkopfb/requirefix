/**
 * Created by schwarzkopfb on 15/7/24.
 */

var fs        = require('fs'),
    path      = require('path'),
    dropIn    = false,
    prefixes  = [],
    postfixes = [],
    Module    = require('module'),
    _require  = Module.prototype.require

function requirefix(context, moduleNameOrPath, overridePrefixes, overridePostfixes) {
    if(!(context instanceof Object)) {
        overridePostfixes = overridePrefixes
        overridePrefixes  = moduleNameOrPath
        moduleNameOrPath  = context
        context           = this
    }

    var m          = moduleNameOrPath.substring(0, 3),
        _prefixes  = overridePrefixes  || prefixes,
        _postfixes = overridePostfixes || postfixes

    if(!Array.isArray(_prefixes))
        _prefixes = [ _prefixes ]

    if(!Array.isArray(_postfixes))
        _postfixes = [ _postfixes ]

    if(m === '../' || (m = m.substring(0, 2)) === './' || (m === '..' && (m += '/')) || (m.length === 1 && m === '.' && (m += '/'))) {
        var i, j, l, l2, s, f,
            ext = path.extname(moduleNameOrPath)

        if (!ext) {
            var found, modulePath = path.resolve(path.dirname(context.filename) + '/' + moduleNameOrPath)

            // check all the registered file extensions first

            for(var extension in Module._extensions)
                if(Module._extensions.hasOwnProperty(extension))
                    try {
                        if(fs.statSync(modulePath + extension).isFile()) {
                            found = true
                            break // prefer file against directory if exists
                        }
                    }
                    catch(ex) {}

            // if no file found, then check directory

            try {
                if (!found && fs.statSync(modulePath).isDirectory())
                    moduleNameOrPath += (moduleNameOrPath[ moduleNameOrPath.length - 1 ] === '/' ? '' : '/') + 'index'
            }
            catch(ex) {}
        }

        if(ext in Module._extensions)
            moduleNameOrPath = path.dirname(moduleNameOrPath) + '/' + path.basename(moduleNameOrPath, ext)
        else
            ext = ''

        // try all the prefix/postfix combinations
        for (i = 0, l = _prefixes.length; i < l; i++) {
            for (j = 0, l2 = _postfixes.length; j < l2; j++) {
                try {
                    f = m.length
                    s = moduleNameOrPath.lastIndexOf('/') + 1

                    if(s < f)
                        s = f - 1

                    return _require.call(context, m + moduleNameOrPath.substring(f, s) + _prefixes[i] + moduleNameOrPath.substring(s) + _postfixes[j] + ext)
                }
                catch (ex) {}
            }
        }

        // try prefixes without postfixes
        for (i = 0, l = _prefixes.length; i < l; i++) {
            try {
                f = m.length
                s = moduleNameOrPath.lastIndexOf('/') + 1

                if(s < f)
                    s = f - 1

                return _require.call(context, m + moduleNameOrPath.substring(f, s) + _prefixes[i] + moduleNameOrPath.substring(s))
            }
            catch (ex) {}
        }

        // try postfixes without prefixes
        for (i = 0, l = _postfixes.length; i < l; i++) {
            try {
                return _require.call(context, moduleNameOrPath + _postfixes[i] + ext)
            }
            catch (ex) {}
        }

        return _require.call(context, moduleNameOrPath)
    }
    else
        return _require.call(context, moduleNameOrPath)
}

Object.defineProperties(requirefix, {
    dropIn: {
        enumerable: true,

        get: function () {
            return dropIn
        },

        set: function (value) {
            dropIn = !!value

            if (value) {
                Module.prototype.require = _require
                global.require           = _require
            }
            else {
                Module.prototype.require = requirefix
                global.require           = requirefix
            }
        }
    },

    prefix: {
        enumerable: true,

        get: function () {
            return prefixes
        },

        set: function (value) {
            if(!value) {
                prefixes = []
                return value
            }

            if(!Array.isArray(value))
                value = [ value ]

            return prefixes = value
        }
    },

    postfix: {
        enumerable: true,

        get: function () {
            return postfixes
        },

        set: function (value) {
            if(!value) {
                postfixes = []
                return value
            }

            if(!Array.isArray(value))
                value = [ value ]

            return postfixes = value
        }
    },

    require: {
        enumerable: true,
        value:      _require
    }
})

global.require = global.requirefix = module.exports = Module.prototype.require = requirefix