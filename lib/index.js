'use strict';

var Client  = require('./documentclient')
  , Wrapper = require('./documentclientwrapper');


if (typeof exports !== "undefined") {
    exports.DocumentClientWrapper = Wrapper.DocumentClientWrapper;
    exports.DocumentClient = Client.DocumentClient;
    exports.DocumentBase = Client.DocumentBase;
}