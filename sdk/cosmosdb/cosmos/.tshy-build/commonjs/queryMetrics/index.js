"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSpan = exports.RuntimeExecutionTimes = exports.QueryPreparationTimes = exports.QueryMetricsConstants = exports.QueryMetrics = exports.ClientSideMetrics = void 0;
const tslib_1 = require("tslib");
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var clientSideMetrics_js_1 = require("./clientSideMetrics.js");
Object.defineProperty(exports, "ClientSideMetrics", { enumerable: true, get: function () { return clientSideMetrics_js_1.ClientSideMetrics; } });
var queryMetrics_js_1 = require("./queryMetrics.js");
Object.defineProperty(exports, "QueryMetrics", { enumerable: true, get: function () { return queryMetrics_js_1.QueryMetrics; } });
var queryMetricsConstants_js_1 = require("./queryMetricsConstants.js");
Object.defineProperty(exports, "QueryMetricsConstants", { enumerable: true, get: function () { return tslib_1.__importDefault(queryMetricsConstants_js_1).default; } });
var queryPreparationTime_js_1 = require("./queryPreparationTime.js");
Object.defineProperty(exports, "QueryPreparationTimes", { enumerable: true, get: function () { return queryPreparationTime_js_1.QueryPreparationTimes; } });
var runtimeExecutionTimes_js_1 = require("./runtimeExecutionTimes.js");
Object.defineProperty(exports, "RuntimeExecutionTimes", { enumerable: true, get: function () { return runtimeExecutionTimes_js_1.RuntimeExecutionTimes; } });
var timeSpan_js_1 = require("./timeSpan.js");
Object.defineProperty(exports, "TimeSpan", { enumerable: true, get: function () { return timeSpan_js_1.TimeSpan; } });
//# sourceMappingURL=index.js.map