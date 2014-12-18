'use strict';

var Client  = require('./documentclient')

if (typeof exports !== "undefined") {
    exports.DocumentClient = Client.DocumentClient;
    exports.DocumentBase = Client.DocumentBase;
    exports.Base = Client.Base;
}