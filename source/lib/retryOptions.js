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
    * Represents the Retry policy assocated with throttled requests in the Azure Cosmos DB database service.
    * @property {int} [MaxRetryAttemptCount]               - Max number of retries to be performed for a request. Default value 9.
    * @property {int} [FixedRetryIntervalInMilliseconds]   - Fixed retry interval in milliseconds to wait between each retry ignoring the retryAfter returned as part of the response.
    * @property {int} [MaxWaitTimeInSeconds]               - Max wait time in seconds to wait for a request while the retries are happening. Default value 30 seconds.
    */
    var RetryOptions = Base.defineClass(
        function RetryOptions(maxRetryAttemptCount, fixedRetryIntervalInMilliseconds, maxWaitTimeInSeconds) {
            this._maxRetryAttemptCount = maxRetryAttemptCount || 9;
            this._fixedRetryIntervalInMilliseconds = fixedRetryIntervalInMilliseconds;
            this._maxWaitTimeInSeconds = maxWaitTimeInSeconds || 30;

            Object.defineProperty(this, "MaxRetryAttemptCount", {
                    get: function () {
                        return this._maxRetryAttemptCount;
                    },
                    enumerable: true
            });

            Object.defineProperty(this, "FixedRetryIntervalInMilliseconds", {
                get: function () {
                    return this._fixedRetryIntervalInMilliseconds;
                },
                enumerable: true
            });

            Object.defineProperty(this, "MaxWaitTimeInSeconds", {
                get: function () {
                    return this._maxWaitTimeInSeconds;
                },
                enumerable: true
            });
        })
//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = RetryOptions;
}