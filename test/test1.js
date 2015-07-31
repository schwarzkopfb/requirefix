/**
 * Created by schwarzkopfb on 15/7/31.
 */

// some ES6 code compiled with Babel (http://babeljs.io) into './test1-compiled.js'

var test1 = {
    greeting(name = 'Balazs', lang = 'en') {
        switch(lang) {
            case 'sv':
                return `Välkommen ${name}!`

            case 'it':
                return `Bienvenue ${name}!`

            case 'sl':
                return `Dobrodošli ${name}!`

            case 'haw':
                return `Aloha ${name}!`

            case 'hu':
                return `Szia ${name}!`

            case 'en':
            default:
                return `Hello ${name}!`
        }
    }
}

module.exports = test1