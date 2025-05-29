// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants } from "../common/index.js";
import { QueryMetrics } from "../queryMetrics/queryMetrics.js";
/** @hidden */
// TODO: docs
export function getRequestChargeIfAny(headers) {
    if (typeof headers === "number") {
        return headers;
    }
    else if (typeof headers === "string") {
        return parseFloat(headers);
    }
    if (headers) {
        const rc = headers[Constants.HttpHeaders.RequestCharge];
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
export function getInitialHeader() {
    const headers = {};
    headers[Constants.HttpHeaders.RequestCharge] = 0;
    headers[Constants.HttpHeaders.QueryMetrics] = {};
    return headers;
}
/**
 * @hidden
 */
// TODO: The name of this method isn't very accurate to what it does
export function mergeHeaders(headers, toBeMergedHeaders) {
    if (headers[Constants.HttpHeaders.RequestCharge] === undefined) {
        headers[Constants.HttpHeaders.RequestCharge] = 0;
    }
    if (headers[Constants.HttpHeaders.QueryMetrics] === undefined) {
        headers[Constants.HttpHeaders.QueryMetrics] = QueryMetrics.zero;
    }
    if (!toBeMergedHeaders) {
        return;
    }
    headers[Constants.HttpHeaders.RequestCharge] += getRequestChargeIfAny(toBeMergedHeaders);
    if (toBeMergedHeaders[Constants.HttpHeaders.IsRUPerMinuteUsed]) {
        headers[Constants.HttpHeaders.IsRUPerMinuteUsed] =
            toBeMergedHeaders[Constants.HttpHeaders.IsRUPerMinuteUsed];
    }
    if (Constants.HttpHeaders.QueryMetrics in toBeMergedHeaders) {
        const headerQueryMetrics = headers[Constants.HttpHeaders.QueryMetrics];
        const toBeMergedHeaderQueryMetrics = toBeMergedHeaders[Constants.HttpHeaders.QueryMetrics];
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
    if (Constants.HttpHeaders.IndexUtilization in toBeMergedHeaders) {
        headers[Constants.HttpHeaders.IndexUtilization] =
            toBeMergedHeaders[Constants.HttpHeaders.IndexUtilization];
    }
    if (Constants.HttpHeaders.CorrelatedActivityId in toBeMergedHeaders) {
        headers[Constants.HttpHeaders.CorrelatedActivityId] =
            toBeMergedHeaders[Constants.HttpHeaders.CorrelatedActivityId];
    }
}
/** @hidden */
export function decodeAndParseJSONString(inputString) {
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