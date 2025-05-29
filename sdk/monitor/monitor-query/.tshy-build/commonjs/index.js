"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnownMonitorMetricsQueryAudience = exports.KnownMonitorLogsQueryAudience = exports.KnownMonitorAudience = exports.MetricsClient = exports.Durations = exports.MetricsQueryClient = exports.LogsQueryResultStatus = exports.LogsQueryClient = void 0;
//
// Curated exports
//
var logsQueryClient_js_1 = require("./logsQueryClient.js");
Object.defineProperty(exports, "LogsQueryClient", { enumerable: true, get: function () { return logsQueryClient_js_1.LogsQueryClient; } });
var publicLogsModels_js_1 = require("./models/publicLogsModels.js");
Object.defineProperty(exports, "LogsQueryResultStatus", { enumerable: true, get: function () { return publicLogsModels_js_1.LogsQueryResultStatus; } });
var metricsQueryClient_js_1 = require("./metricsQueryClient.js");
Object.defineProperty(exports, "MetricsQueryClient", { enumerable: true, get: function () { return metricsQueryClient_js_1.MetricsQueryClient; } });
var constants_js_1 = require("./models/constants.js");
Object.defineProperty(exports, "Durations", { enumerable: true, get: function () { return constants_js_1.Durations; } });
var metricsClient_js_1 = require("./metricsClient.js");
Object.defineProperty(exports, "MetricsClient", { enumerable: true, get: function () { return metricsClient_js_1.MetricsClient; } });
var constants_js_2 = require("./constants.js");
Object.defineProperty(exports, "KnownMonitorAudience", { enumerable: true, get: function () { return constants_js_2.KnownMonitorAudience; } });
Object.defineProperty(exports, "KnownMonitorLogsQueryAudience", { enumerable: true, get: function () { return constants_js_2.KnownMonitorLogsQueryAudience; } });
Object.defineProperty(exports, "KnownMonitorMetricsQueryAudience", { enumerable: true, get: function () { return constants_js_2.KnownMonitorMetricsQueryAudience; } });
//# sourceMappingURL=index.js.map