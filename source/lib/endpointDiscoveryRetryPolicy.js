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

var Base = require("./base");

//SCRIPT START
/**
     * This class implements the retry policy for endpoint discovery.
     * @property {int} _maxRetryAttemptCount                           - Max number of retry attempts to perform.
     * @property {int} currentRetryAttemptCount                        - Current retry attempt count.
     * @property {object} globalEndpointManager                        - The GlobalEndpointManager instance.
     * @property {int} retryAfterInMilliseconds                        - Retry interval in milliseconds.
*/
var EndpointDiscoveryRetryPolicy = Base.defineClass(
    /**
     * @constructor EndpointDiscoveryRetryPolicy
     * @param {object} globalEndpointManager                           - The GlobalEndpointManager instance.
    */
    function (globalEndpointManager) {
        this._maxRetryAttemptCount = EndpointDiscoveryRetryPolicy.maxRetryAttemptCount;
        this.currentRetryAttemptCount = 0;
        this.globalEndpointManager = globalEndpointManager;
        this.retryAfterInMilliseconds = EndpointDiscoveryRetryPolicy.retryAfterInMilliseconds;
    }, 
    {
        /**
         * Determines whether the request should be retried or not.
         * @param {object} err - Error returned by the request.
         * @param {function} callback - The callback function which takes bool argument which specifies whether the request will be retried or not.
        */
        shouldRetry: function (err, callback) {
            if (err) {
                if (this.currentRetryAttemptCount < this._maxRetryAttemptCount && this.globalEndpointManager.enableEndpointDiscovery) {
                    this.currentRetryAttemptCount++;
                    console.log("Write region was changed, refreshing the regions list from database account and will retry the request.");
                    var that = this;
                    this.globalEndpointManager.refreshEndpointList(function (writeEndpoint, readEndpoint) {
                        that.globalEndpointManager.setWriteEndpoint(writeEndpoint);
                        that.globalEndpointManager.setReadEndpoint(readEndpoint);
                        callback(true);
                    });
                    return;
                }
            }
            return callback(false);
        }
    },
    {
        maxRetryAttemptCount : 120,
        retryAfterInMilliseconds : 1000,
        FORBIDDEN_STATUS_CODE : 403,
        WRITE_FORBIDDEN_SUB_STATUS_CODE : 3
    }
);
//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = EndpointDiscoveryRetryPolicy;
}