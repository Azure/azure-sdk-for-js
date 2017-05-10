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
    , aggregators = require('./aggregators');

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
            this.executionContext.nextItem(function (err, item, headers) {
                if (err) {
                    return callback(err, undefined, headers);
                }
                if (item === undefined) {
                    return callback(undefined, undefined, headers);
                }
                callback(undefined, item["payload"], headers);
            });
        },

        /**
         * Retrieve the current element on the OrderByEndpointComponent.
         * @memberof OrderByEndpointComponent
         * @instance
         * @param {callback} callback - Function to execute for the current element. the function takes two parameters error, element.
         */
        current: function(callback) {
            this.executionContext.current(function (err, item, headers) {
                if (err) {
                    return callback(err, undefined, headers);
                }
                if (item === undefined) {
                    return callback(undefined, undefined, headers);
                }
                callback(undefined, item["payload"], headers);
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
                return callback(undefined, undefined, undefined);
            }
            this.topCount--;
            this.executionContext.nextItem(function (err, item, headers) {
                callback(err, item, headers);
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
            this.executionContext.current(function (err, item, headers) {
                return callback(err, item, headers);
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

var AggregateEndpointComponent = Base.defineClass(
    /**
     * Represents an endpoint in handling aggregate queries.
     * @constructor AggregateEndpointComponent
     * @param { object } executionContext - Underlying Execution Context
     * @ignore
     */
    function (executionContext, aggregateOperators) {
        this.executionContext = executionContext;
        this.localAggregators = [];
        var that = this;
        aggregateOperators.forEach(function (aggregateOperator) {
            switch (aggregateOperator) {
                case 'Average':
                    that.localAggregators.push(new aggregators.AverageAggregator());
                    break;
                case 'Count':
                    that.localAggregators.push(new aggregators.CountAggregator());
                    break;
                case 'Max':
                    that.localAggregators.push(new aggregators.MaxAggregator());
                    break;
                case 'Min':
                    that.localAggregators.push(new aggregators.MinAggregator());
                    break;
                case 'Sum':
                    that.localAggregators.push(new aggregators.SumAggregator());
                    break;
            }
        });
    },
    {
        /**
        * Populate the aggregated values
        * @ignore 
        */
        _getAggregateResult: function (callback) {
            this.toArrayTempResources = [];
            this.aggregateValues = [];
            this.aggregateValuesIndex = -1;
            var that = this;

            this._getQueryResults(function (err, resources) {
                if (err) {
                    return callback(err, undefined);
                }

                resources.forEach(function (resource) {
                    that.localAggregators.forEach(function (aggregator) {
                        var itemValue = undefined;
                        // Get the value of the first property if it exists
                        if (resource && Object.keys(resource).length > 0) {
                            var key = Object.keys(resource)[0];
                            itemValue = resource[key];
                        }
                        aggregator.aggregate(itemValue);
                    });
                });

                // Get the aggregated results
                that.localAggregators.forEach(function (aggregator) {
                    that.aggregateValues.push(aggregator.getResult());
                });

                return callback(undefined, that.aggregateValues);
            });
        },

        /**
        * Get the results of queries from all partitions
        * @ignore 
        */
        _getQueryResults: function (callback) {
            var that = this;

            this.executionContext.nextItem(function (err, item) {
                if (err) {
                    return callback(err, undefined);
                }
                
                if (item === undefined) {
                    // no more results
                    return callback(undefined, that.toArrayTempResources);
                }

                that.toArrayTempResources = that.toArrayTempResources.concat(item);
                return that._getQueryResults(callback);
            });

        },

        /**
        * Execute a provided function on the next element in the AggregateEndpointComponent.
        * @memberof AggregateEndpointComponent
        * @instance
        * @param {callback} callback - Function to execute for each element. the function takes two parameters error, element.
        */
        nextItem: function (callback) {
            var that = this;
            var _nextItem = function (err, resources) {
                if (err || that.aggregateValues.length <= 0) {
                    return callback(undefined, undefined);
                }

                var resource = that.aggregateValuesIndex < that.aggregateValues.length
                    ? that.aggregateValues[++that.aggregateValuesIndex]
                    : undefined;

                return callback(undefined, resource);
            };

            if (that.aggregateValues == undefined) {
                that._getAggregateResult(function (err, resources) {
                    return _nextItem(err, resources);
                });
            }
            else {
                return _nextItem(undefined, that.aggregateValues);
            }
        },

        /**
         * Retrieve the current element on the AggregateEndpointComponent.
         * @memberof AggregateEndpointComponent
         * @instance
         * @param {callback} callback - Function to execute for the current element. the function takes two parameters error, element.
         */
        current: function (callback) {
            var that = this;
            if (that.aggregateValues == undefined) {
                that._getAggregateResult(function (err, resources) {
                    return callback(undefined, that.aggregateValues[that.aggregateValuesIndex]);
                });
            }
            else {
                return callback(undefined, that.aggregateValues[that.aggregateValuesIndex]);
            }
        },

        /**
         * Determine if there are still remaining resources to processs.
         * @memberof AggregateEndpointComponent
         * @instance
         * @returns {Boolean} true if there is other elements to process in the AggregateEndpointComponent.
         */
        hasMoreResults: function () {
            return this.aggregateValues != null && this.aggregateValuesIndex < this.aggregateValues.length - 1;
        }
    }
);
//SCRIPT END

if (typeof exports !== "undefined") {
    exports.OrderByEndpointComponent = OrderByEndpointComponent;
    exports.TopEndpointComponent = TopEndpointComponent;
    exports.AggregateEndpointComponent = AggregateEndpointComponent;
}