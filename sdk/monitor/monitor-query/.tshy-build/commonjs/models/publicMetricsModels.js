"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetricByName = getMetricByName;
exports.createMetricsQueryResult = createMetricsQueryResult;
function getMetricByName(metricName) {
    return this.metrics.find((it) => it.name === metricName);
}
function createMetricsQueryResult(metricsQueryResultData) {
    return Object.assign(Object.assign({}, metricsQueryResultData), { getMetricByName });
}
//# sourceMappingURL=publicMetricsModels.js.map