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
     * This class implements the resource throttle retry policy for requests.
     * @property {int} _maxRetryAttemptCount              - Max number of retries to be performed for a request.
     * @property {int} _fixedRetryIntervalInMilliseconds  - Fixed retry interval in milliseconds to wait between each retry ignoring the retryAfter returned as part of the response. 
     * @property {int} _maxWaitTimeInMilliseconds         - Max wait time in milliseconds to wait for a request while the retries are happening.
     * @property {int} currentRetryAttemptCount           - Current retry attempt count.
     * @property {int} cummulativeWaitTimeinMilliseconds  - Cummulative wait time in milliseconds for a request while the retries are happening.
*/
var ResourceThrottleRetryPolicy = Base.defineClass(
    /**
     * @constructor ResourceThrottleRetryPolicy
     * @param {int} maxRetryAttemptCount               - Max number of retries to be performed for a request.
     * @param {int} fixedRetryIntervalInMilliseconds   - Fixed retry interval in milliseconds to wait between each retry ignoring the retryAfter returned as part of the response.
     * @param {int} maxWaitTimeInSeconds               - Max wait time in seconds to wait for a request while the retries are happening.
    */
    function (maxRetryAttemptCount, fixedRetryIntervalInMilliseconds, maxWaitTimeInSeconds) {
        this._maxRetryAttemptCount = maxRetryAttemptCount;
        this._fixedRetryIntervalInMilliseconds = fixedRetryIntervalInMilliseconds;
        this._maxWaitTimeInMilliseconds = maxWaitTimeInSeconds * 1000;
        this.currentRetryAttemptCount = 0;
        this.cummulativeWaitTimeinMilliseconds = 0;
    }, 
    {
        /**
         * Determines whether the request should be retried or not.
         * @param {object} err - Error returned by the request.
         * @param {function} callback - The callback function which takes bool argument which specifies whether the request will be retried or not.
        */
        shouldRetry: function (err, callback) {
            if (err) {
                if (this.currentRetryAttemptCount < this._maxRetryAttemptCount) {
                    this.currentRetryAttemptCount++;
                    this.retryAfterInMilliseconds = 0;

                    if (this._fixedRetryIntervalInMilliseconds) {
                        this.retryAfterInMilliseconds = this._fixedRetryIntervalInMilliseconds;
                    } else if (err.retryAfterInMilliseconds) {
                        this.retryAfterInMilliseconds = err.retryAfterInMilliseconds;
                    }
    
                    if (this.cummulativeWaitTimeinMilliseconds < this._maxWaitTimeInMilliseconds) {
                        this.cummulativeWaitTimeinMilliseconds += this.retryAfterInMilliseconds;
                        return callback(true);
                    }
                }
            }
            return callback(false);
        }
    },
    {
        THROTTLE_STATUS_CODE: 429
    }
);
//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = ResourceThrottleRetryPolicy;
}