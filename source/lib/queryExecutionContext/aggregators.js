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
    , DocumentProducer = require("./documentProducer")

//SCRIPT START
var AverageAggregator = Base.defineClass(

    /**
     * Represents an aggregator for AVG operator.
     * @constructor AverageAggregator
     * @ignore
     */
    function () {
    },
    {
        /**
        * Add the provided item to aggregation result.
        * @memberof AverageAggregator
        * @instance
        * @param other
        */
        aggregate: function (other) {
            if (other == null || other.sum == null) {
                return;
            }
            if (this.sum == null) {
                this.sum = 0.0;
                this.count = 0;
            }
            this.sum += other.sum;
            this.count += other.count;
        },

        /**
        * Get the aggregation result.
        * @memberof AverageAggregator
        * @instance
        */
        getResult: function () {
            if (this.sum == null || this.count <= 0) {
                return undefined;
            }
            return this.sum / this.count;
        }

    }
);

var CountAggregator = Base.defineClass(

    /**
     * Represents an aggregator for COUNT operator.
     * @constructor CountAggregator
     * @ignore
     */
    function () {
        this.value = 0;
    },
    {
        /**
        * Add the provided item to aggregation result.
        * @memberof CountAggregator
        * @instance
        * @param other
        */
        aggregate: function (other) {
            this.value += other;
        },

        /**
        * Get the aggregation result.
        * @memberof CountAggregator
        * @instance
        */
        getResult: function () {
            return this.value;
        }

    }
);

var MinAggregator = Base.defineClass(

    /**
     * Represents an aggregator for MIN operator.
     * @constructor MinAggregator
     * @ignore
     */
    function () {
        this.value = undefined;
        this.comparer = new DocumentProducer.OrderByDocumentProducerComparator("Ascending");
    },
    {
        /**
        * Add the provided item to aggregation result.
        * @memberof MinAggregator
        * @instance
        * @param other
        */
        aggregate: function (other) {
            if (this.value == undefined) {
                this.value = other;
            }
            else {
                var otherType = other == null ? 'NoValue' : typeof (other);
                if (this.comparer.compareValue(other, otherType, this.value, typeof (this.value)) < 0) {
                    this.value = other;
                }
            }
        },

        /**
        * Get the aggregation result.
        * @memberof MinAggregator
        * @instance
        */
        getResult: function () {
            return this.value;
        }

    }
);

var MaxAggregator = Base.defineClass(

    /**
     * Represents an aggregator for MAX operator.
     * @constructor MaxAggregator
     * @ignore
     */
    function () {
        this.value = undefined;
        this.comparer = new DocumentProducer.OrderByDocumentProducerComparator("Ascending");
    },
    {
        /**
        * Add the provided item to aggregation result.
        * @memberof MaxAggregator
        * @instance
        * @param other
        */
        aggregate: function (other) {
            if (this.value == undefined) {
                this.value = other;
            }
            else if (this.comparer.compareValue(other, typeof (other), this.value, typeof (this.value)) > 0) {
                this.value = other;
            }
        },

        /**
        * Get the aggregation result.
        * @memberof MaxAggregator
        * @instance
        */
        getResult: function () {
            return this.value;
        }

    }
);

var SumAggregator = Base.defineClass(

    /**
     * Represents an aggregator for SUM operator.
     * @constructor SumAggregator
     * @ignore
     */
    function () {
    },
    {
        /**
        * Add the provided item to aggregation result.
        * @memberof SumAggregator
        * @instance
        * @param other
        */
        aggregate: function (other) {
            if (other == undefined) {
                return;
            }
            if (this.sum == undefined) {
                this.sum = other;
            }
            else {
                this.sum += other;
            }
        },

        /**
        * Get the aggregation result.
        * @memberof SumAggregator
        * @instance
        */
        getResult: function () {
            return this.sum;
        }

    }
);
 //SCRIPT END

if (typeof exports !== "undefined") {
    exports.AverageAggregator = AverageAggregator;
    exports.CountAggregator = CountAggregator;
    exports.MinAggregator = MinAggregator;
    exports.MaxAggregator = MaxAggregator;
    exports.SumAggregator = SumAggregator;
}
