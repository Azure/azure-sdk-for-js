"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SumAggregator = exports.MinAggregator = exports.MaxAggregator = exports.CountAggregator = exports.AverageAggregator = void 0;
exports.createAggregator = createAggregator;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const AverageAggregator_js_1 = require("./AverageAggregator.js");
Object.defineProperty(exports, "AverageAggregator", { enumerable: true, get: function () { return AverageAggregator_js_1.AverageAggregator; } });
const CountAggregator_js_1 = require("./CountAggregator.js");
Object.defineProperty(exports, "CountAggregator", { enumerable: true, get: function () { return CountAggregator_js_1.CountAggregator; } });
const MaxAggregator_js_1 = require("./MaxAggregator.js");
Object.defineProperty(exports, "MaxAggregator", { enumerable: true, get: function () { return MaxAggregator_js_1.MaxAggregator; } });
const MinAggregator_js_1 = require("./MinAggregator.js");
Object.defineProperty(exports, "MinAggregator", { enumerable: true, get: function () { return MinAggregator_js_1.MinAggregator; } });
const SumAggregator_js_1 = require("./SumAggregator.js");
Object.defineProperty(exports, "SumAggregator", { enumerable: true, get: function () { return SumAggregator_js_1.SumAggregator; } });
const StaticValueAggregator_js_1 = require("./StaticValueAggregator.js");
const MakeListAggregator_js_1 = require("./MakeListAggregator.js");
const MakeSetAggregator_js_1 = require("./MakeSetAggregator.js");
function createAggregator(aggregateType) {
    switch (aggregateType) {
        case "Average":
            return new AverageAggregator_js_1.AverageAggregator();
        case "Count":
            return new CountAggregator_js_1.CountAggregator();
        case "Max":
            return new MaxAggregator_js_1.MaxAggregator();
        case "Min":
            return new MinAggregator_js_1.MinAggregator();
        case "Sum":
            return new SumAggregator_js_1.SumAggregator();
        case "MakeList":
            return new MakeListAggregator_js_1.MakeListAggregator();
        case "MakeSet":
            return new MakeSetAggregator_js_1.MakeSetAggregator();
        default:
            return new StaticValueAggregator_js_1.StaticValueAggregator();
    }
}
//# sourceMappingURL=index.js.map