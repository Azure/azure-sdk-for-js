// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export function getMetricByName(metricName) {
    return this.metrics.find((it) => it.name === metricName);
}
export function createMetricsQueryResult(metricsQueryResultData) {
    return Object.assign(Object.assign({}, metricsQueryResultData), { getMetricByName });
}
//# sourceMappingURL=publicMetricsModels.js.map