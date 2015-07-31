/**
 * Created by schwarzkopfb on 15/7/31.
 */

'use strict';

var test1 = {
    greeting: function greeting() {
        var name = arguments.length <= 0 || arguments[0] === undefined ? 'Balazs' : arguments[0];
        var lang = arguments.length <= 1 || arguments[1] === undefined ? 'en' : arguments[1];

        switch (lang) {
            case 'sv':
                return 'Välkommen ' + name + '!';

            case 'it':
                return 'Bienvenue ' + name + '!';

            case 'sl':
                return 'Dobrodošli ' + name + '!';

            case 'haw':
                return 'Aloha ' + name + '!';

            case 'hu':
                return 'Szia ' + name + '!';

            case 'en':
            default:
                return 'Hello ' + name + '!';
        }
    }
};

module.exports = test1;

//# sourceMappingURL=test1-compiled.js.map