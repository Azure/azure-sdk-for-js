/*
The MIT License (MIT)
Copyright (c) 2014 Microsoft Corporation

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
     * @property {object} globalEndpointManager                        - The GlobalEndpointManager instance.
     * @property {int} _maxRetryAttemptCount                           - Max number of retry attempts to perform.
     * @property {int} _currentRetryAttemptCount                       - Current retry attempt count.
     * @property {int} _retryAfterInMilliseconds                       - Retry interval in milliseconds.
*/
var EndpointDiscoveryRetryPolicy = Base.defineClass(
    /**
     * @constructor EndpointDiscoveryRetryPolicy
     * @param {object} globalEndpointManager                           - The GlobalEndpointManager instance.
    */
    function (globalEndpointManager) {
        this.globalEndpointManager = globalEndpointManager;
        this._maxRetryAttemptCount = EndpointDiscoveryRetryPolicy.maxRetryAttemptCount;
        this._currentRetryAttemptCount = 0;
        this._retryAfterInMilliseconds = EndpointDiscoveryRetryPolicy.retryAfterInMilliseconds;
    }, 
    {
        /**
         * Applies the retry policy for the created request object.
         * @param {object} body - a dictionary containing 'buffer' and 'stream' keys to hold corresponding buffer or stream body, null otherwise.
         * @param {function} createRequestObjectFunc - function that creates the request object.
         * @param {object} connectionPolicy - an instance of ConnectionPolicy that has the connection configs.
         * @param {RequestOptions} requestOptions - The request options.
         * @param {function} callback - the callback that will be called when the response is retrieved and processed.
        */
        apply: function (body, createRequestObjectFunc, connectionPolicy, requestOptions, callback) {
            var that = this;
            var httpsRequest = createRequestObjectFunc(connectionPolicy, requestOptions, function (err, response, headers) {
                // Check if it 's a write-forbidden exception, which has StatusCode=403 and SubStatus=3 and whether EnableEndpointDiscovery is set to True
                if (err) {
                    if (that._currentRetryAttemptCount < that._maxRetryAttemptCount && err.code === 403 && err.substatus === 3 && that.globalEndpointManager.enableEndpointDiscovery) {
                        that._currentRetryAttemptCount++;
                        console.log("Write region was changed, refreshing the regions list from database account and will retry the request.");
                        that.globalEndpointManager.refreshEndpointList(function (writeEndpoint, readEndpoint) {
                            that.globalEndpointManager.setWriteEndpoint(writeEndpoint);
                            that.globalEndpointManager.setReadEndpoint(readEndpoint);
                            
                            setTimeout(function () {
                                that.apply(body, createRequestObjectFunc, connectionPolicy, requestOptions, callback);
                            }, that._retryAfterInMilliseconds);
                        });
                    }
                    else {
                        console.log("Operation will NOT be retried or has maxed out the retry count.", err);
                        // This is a test hook to call a callback after the retry counts have been exhausted
                        if (EndpointDiscoveryRetryPolicy.retryFinishCallback) {
                            EndpointDiscoveryRetryPolicy.retryFinishCallback(that._currentRetryAttemptCount, that._maxRetryAttemptCount, function () {
                                callback(err, response, headers);
                                return;
                            });
                        } else {
                            callback(err, response, headers);
                            return;
                        }
                    }
                } else {
                    callback(undefined, response, headers);
                    return;
                }
            });
            
            if (httpsRequest) {
                if (body["stream"] !== null) {
                    body["stream"].pipe(httpsRequest);
                } else if (body["buffer"] !== null) {
                    httpsRequest.write(body["buffer"]);
                    httpsRequest.end();
                } else {
                    httpsRequest.end();
                }
            }
        }
    },
    {
        maxRetryAttemptCount : 120,
        retryAfterInMilliseconds : 1000,
        retryFinishCallback: undefined
    }
);
//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = EndpointDiscoveryRetryPolicy;
}