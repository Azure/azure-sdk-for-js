/*
The MIT License (MIT)
Copyright (c) 2017 Microsoft Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

"use strict";

var Constants = require("./constants");
var os = require("os");
var util = require("util");
var semaphore = require("semaphore");
var Platform = {
    /** @ignore */
    getPlatformDefaultHeaders: function () {
        var defaultHeaders = {};
        defaultHeaders[Constants.HttpHeaders.UserAgent] = Platform.getUserAgent();
        return defaultHeaders;
    },
    /** @ignore */
    getDecodedDataLength: function (encodedData) {
        var buffer = new Buffer(encodedData, "base64");
        return buffer.length;
    },
    /** @ignore */
    getUserAgent: function () {
        // gets the user agent in the following format
        // "{OSName}/{OSVersion} Nodejs/{NodejsVersion} documentdb-nodejs-sdk/{SDKVersion}"
        // for example:
        // "linux/3.4.0+ Nodejs/v0.10.25 documentdb-nodejs-sdk/1.10.0"
        // "win32/10.0.14393 Nodejs/v4.4.7 documentdb-nodejs-sdk/1.10.0"
        var osName = Platform._getSafeUserAgentSegmentInfo(os.platform());
        var osVersion = Platform._getSafeUserAgentSegmentInfo(os.release());
        var nodejsVersion = Platform._getSafeUserAgentSegmentInfo(process.version);

        var userAgent = util.format("%s/%s Nodejs/%s %s/%s", osName, osVersion,
            nodejsVersion,
            Constants.SDKName, Constants.SDKVersion);

        return userAgent;
    },
    /** @ignore */
    _getSafeUserAgentSegmentInfo: function (s) {
        // catch null, undefined, etc
        if (typeof (s) !== 'string') {
            s = "unknown";
        }
        // remove all white spaces
        s = s.replace(/\s+/g, '');
        if (!s) {
            s = "unknown";
        }
        return s
    }
}

if (typeof exports !== "undefined") {
    module.exports = Platform;
}