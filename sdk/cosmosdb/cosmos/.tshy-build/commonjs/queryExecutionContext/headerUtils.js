"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestChargeIfAny = getRequestChargeIfAny;
exports.getInitialHeader = getInitialHeader;
exports.mergeHeaders = mergeHeaders;
exports.decodeAndParseJSONString = decodeAndParseJSONString;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const index_js_1 = require("../common/index.js");
const queryMetrics_js_1 = require("../queryMetrics/queryMetrics.js");
/** @hidden */
// TODO: docs
function getRequestChargeIfAny(headers) {
    if (typeof headers === "number") {
        return headers;
    }
    else if (typeof headers === "string") {
        return parseFloat(headers);
    }
    if (headers) {
        const rc = headers[index_js_1.Constants.HttpHeaders.RequestCharge];
        if (rc) {
            return parseFloat(rc);
        }
        else {
            return 0;
        }
    }
    else {
        return 0;
    }
}
/**
 * @hidden
 */
function getInitialHeader() {
    const headers = {};
    headers[index_js_1.Constants.HttpHeaders.RequestCharge] = 0;
    headers[index_js_1.Constants.HttpHeaders.QueryMetrics] = {};
    return headers;
}
/**
 * @hidden
 */
// TODO: The name of this method isn't very accurate to what it does
function mergeHeaders(headers, toBeMergedHeaders) {
    if (headers[index_js_1.Constants.HttpHeaders.RequestCharge] === undefined) {
        headers[index_js_1.Constants.HttpHeaders.RequestCharge] = 0;
    }
    if (headers[index_js_1.Constants.HttpHeaders.QueryMetrics] === undefined) {
        headers[index_js_1.Constants.HttpHeaders.QueryMetrics] = queryMetrics_js_1.QueryMetrics.zero;
    }
    if (!toBeMergedHeaders) {
        return;
    }
    headers[index_js_1.Constants.HttpHeaders.RequestCharge] += getRequestChargeIfAny(toBeMergedHeaders);
    if (toBeMergedHeaders[index_js_1.Constants.HttpHeaders.IsRUPerMinuteUsed]) {
        headers[index_js_1.Constants.HttpHeaders.IsRUPerMinuteUsed] =
            toBeMergedHeaders[index_js_1.Constants.HttpHeaders.IsRUPerMinuteUsed];
    }
    if (index_js_1.Constants.HttpHeaders.QueryMetrics in toBeMergedHeaders) {
        const headerQueryMetrics = headers[index_js_1.Constants.HttpHeaders.QueryMetrics];
        const toBeMergedHeaderQueryMetrics = toBeMergedHeaders[index_js_1.Constants.HttpHeaders.QueryMetrics];
        for (const partitionId in toBeMergedHeaderQueryMetrics) {
            if (headerQueryMetrics[partitionId]) {
                const combinedQueryMetrics = headerQueryMetrics[partitionId].add([
                    toBeMergedHeaderQueryMetrics[partitionId],
                ]);
                headerQueryMetrics[partitionId] = combinedQueryMetrics;
            }
            else {
                headerQueryMetrics[partitionId] = toBeMergedHeaderQueryMetrics[partitionId];
            }
        }
    }
    if (index_js_1.Constants.HttpHeaders.IndexUtilization in toBeMergedHeaders) {
        headers[index_js_1.Constants.HttpHeaders.IndexUtilization] =
            toBeMergedHeaders[index_js_1.Constants.HttpHeaders.IndexUtilization];
    }
    if (index_js_1.Constants.HttpHeaders.CorrelatedActivityId in toBeMergedHeaders) {
        headers[index_js_1.Constants.HttpHeaders.CorrelatedActivityId] =
            toBeMergedHeaders[index_js_1.Constants.HttpHeaders.CorrelatedActivityId];
    }
}
/** @hidden */
function decodeAndParseJSONString(inputString) {
    try {
        if (!inputString || inputString === "") {
            return "{}";
        }
        const decodedString = decodeURIComponent(inputString);
        const parsedString = JSON.parse(decodedString);
        const indexMetrics = JSON.stringify(parsedString);
        return indexMetrics;
    }
    catch (e) {
        console.error("Error parsing JSON file:", e.message);
    }
}
//# sourceMappingURL=headerUtils.js.map