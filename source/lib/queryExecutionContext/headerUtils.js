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

var Base = require("../base")
    , Constants = require("../constants")
    , assert = require("assert")
    , util = require("util");

//SCRIPT START
var HeaderUtils = Base.defineClass(
    undefined, undefined,
    {
        getRequestChargeIfAny: function (headers) {
            if (typeof (headers) == 'number') {
                return headers;
            } else if (typeof (headers) == 'string') {
                return parseFloat(headers);
            }

            if (headers) {
                var rc = headers[Constants.HttpHeaders.RequestCharge];
                if (rc) {
                    return parseFloat(rc);
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        },

        getInitialHeader: function () {
            var headers = {};
            headers[Constants.HttpHeaders.RequestCharge] = 0;
            return headers;
        },

        mergeHeaders: function (headers, toBeMergedHeaders) {
            if (headers[Constants.HttpHeaders.RequestCharge] == undefined) {
                headers[Constants.HttpHeaders.RequestCharge] = 0;
            }
            if (!toBeMergedHeaders) {
                return;
            }
            headers[Constants.HttpHeaders.RequestCharge] += this.getRequestChargeIfAny(toBeMergedHeaders);
            if (toBeMergedHeaders[Constants.HttpHeaders.IsRUPerMinuteUsed]) {
                headers[Constants.HttpHeaders.IsRUPerMinuteUsed] = toBeMergedHeaders[Constants.HttpHeaders.IsRUPerMinuteUsed];
            }
        }
    }
);
//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = HeaderUtils;
}