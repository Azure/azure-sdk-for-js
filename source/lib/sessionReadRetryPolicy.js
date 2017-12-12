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

var Base = require("./base")
    , Constants = require("./constants")
    , url = require("url");

//SCRIPT START
/**
     * This class implements the retry policy for session consistent reads.
     * @property {int} _maxRetryAttemptCount                           - Max number of retry attempts to perform.
     * @property {int} currentRetryAttemptCount                        - Current retry attempt count.
     * @property {object} globalEndpointManager                        - The GlobalEndpointManager instance.
     * @property {object} request                                      - The Http request information
     * @property {int} retryAfterInMilliseconds                        - Retry interval in milliseconds.
*/
var SessionReadRetryPolicy = Base.defineClass(
    /**
     * @constructor SessionReadRetryPolicy
     * @param {object} globalEndpointManager                           - The GlobalEndpointManager instance.
     * @property {object} request                                      - The Http request information
     */
    function (globalEndpointManager, request) {
        this._maxRetryAttemptCount = SessionReadRetryPolicy.maxRetryAttemptCount;
        this.currentRetryAttemptCount = 0;
        this.globalEndpointManager = globalEndpointManager;
        this.request = request;
        this.retryAfterInMilliseconds = SessionReadRetryPolicy.retryAfterInMilliseconds;
    },
    {
        /**
         * Determines whether the request should be retried or not.
         * @param {object} err - Error returned by the request.
         * @param {function} callback - The callback function which takes bool argument which specifies whether the request will be retried or not.
        */
        shouldRetry: function (err, callback) {
            if (err) {
                var that = this;
                if (this.currentRetryAttemptCount <= this._maxRetryAttemptCount
                    && (this.request.operationType == Constants.OperationTypes.Read ||
                        this.request.operationType == Constants.OperationTypes.Query)) {
                    that.globalEndpointManager.getReadEndpoint(function (readEndpoint) {
                        that.globalEndpointManager.getWriteEndpoint(function (writeEndpoint) {
                            if (readEndpoint !== writeEndpoint && that.request.endpointOverride == null) {
                                that.currentRetryAttemptCount++;
                                console.log("Read with session token not available in read region. Trying read from write region.");
                                that.request.endpointOverride = writeEndpoint;
                                var newUrl = url.parse(writeEndpoint);
                                return callback(true, newUrl);
                            } else {
                                console.log("Clear the the token for named base request");
                                that.request.client.clearSessionToken(that.request.path);
                                return callback(false);
                            }
                        });
                    });
                    return;
                }
            }
            return callback(false);
        }
    },
    {
        maxRetryAttemptCount: 1,
        retryAfterInMilliseconds: 0,
        NOT_FOUND_STATUS_CODE: 404,
        READ_SESSION_NOT_AVAILABLE_SUB_STATUS_CODE: 1002
    }
);
//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = SessionReadRetryPolicy;
}