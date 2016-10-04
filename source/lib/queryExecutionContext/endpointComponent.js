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

var Base = require("../base");

//SCRIPT START
var OrderByEndpointComponent = Base.defineClass(

    /**
     * Represents an endpoint in handling an order by query. For each processed orderby result it returns 'payload' item of the result
     * @constructor OrderByEndpointComponent
     * @param {object} executionContext              - Underlying Execution Context
     * @ignore
     */
    function (executionContext) {
        this.executionContext = executionContext;
    },
    {
         /**
         * Execute a provided function on the next element in the OrderByEndpointComponent.
         * @memberof OrderByEndpointComponent
         * @instance
         * @param {callback} callback - Function to execute for each element. the function takes two parameters error, element.
         */
        nextItem: function (callback) {
            this.executionContext.nextItem(function (err, item) {
                if (err) {
                    return callback(err, undefined);
                }
                if (item === undefined) {
                    return callback(undefined, undefined);
                }
                callback(undefined, item["payload"]);
            });
        },

        /**
         * Retrieve the current element on the OrderByEndpointComponent.
         * @memberof OrderByEndpointComponent
         * @instance
         * @param {callback} callback - Function to execute for the current element. the function takes two parameters error, element.
         */
        current: function(callback) {
            this.executionContext.current(function (err, item) {
                if (err) {
                    return callback(err, undefined);
                }
                if (item === undefined) {
                    return callback(undefined, undefined);
                }
                callback(undefined, item["payload"]);
            });
        },

        /**
         * Determine if there are still remaining resources to processs.
         * @memberof OrderByEndpointComponent
         * @instance
         * @returns {Boolean} true if there is other elements to process in the OrderByEndpointComponent.
         */
        hasMoreResults: function () {
            return this.executionContext.hasMoreResults();
        },
    }
);

var TopEndpointComponent = Base.defineClass(
    /**
     * Represents an endpoint in handling top query. It only returns as many results as top arg specified.
     * @constructor TopEndpointComponent
     * @param { object } executionContext - Underlying Execution Context
     * @ignore
     */
    function (executionContext, topCount) {
        this.executionContext = executionContext;
        this.topCount = topCount;
    },
    {

        /**
        * Execute a provided function on the next element in the TopEndpointComponent.
        * @memberof TopEndpointComponent
        * @instance
        * @param {callback} callback - Function to execute for each element. the function takes two parameters error, element.
        */
        nextItem: function (callback) {
            if (this.topCount <= 0) {
                return callback(undefined, undefined);
            }
            this.topCount--;
            this.executionContext.nextItem(function (err, item) {
                callback(err, item);
            });
        },

        /**
         * Retrieve the current element on the TopEndpointComponent.
         * @memberof TopEndpointComponent
         * @instance
         * @param {callback} callback - Function to execute for the current element. the function takes two parameters error, element.
         */
        current: function (callback) {
            if (this.topCount <= 0) {
                return callback(undefined, undefined);
            }
            this.executionContext.current(function (err, item) {
                return callback(err, item);
            });
        },

        /**
         * Determine if there are still remaining resources to processs.
         * @memberof TopEndpointComponent
         * @instance
         * @returns {Boolean} true if there is other elements to process in the TopEndpointComponent.
         */
        hasMoreResults: function () {
            return (this.topCount > 0 && this.executionContext.hasMoreResults());
        },
    }
);
//SCRIPT END

if (typeof exports !== "undefined") {
    exports.OrderByEndpointComponent = OrderByEndpointComponent;
    exports.TopEndpointComponent = TopEndpointComponent;
}