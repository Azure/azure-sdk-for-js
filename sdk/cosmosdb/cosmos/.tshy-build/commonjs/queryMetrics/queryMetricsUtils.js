"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDelimitedString = parseDelimitedString;
exports.timeSpanFromMetrics = timeSpanFromMetrics;
exports.isNumeric = isNumeric;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const timeSpan_js_1 = require("./timeSpan.js");
/**
 * @hidden
 */
function parseDelimitedString(delimitedString) {
    if (delimitedString == null) {
        throw new Error("delimitedString is null or undefined");
    }
    const metrics = {};
    const headerAttributes = delimitedString.split(";");
    for (const attribute of headerAttributes) {
        const attributeKeyValue = attribute.split("=");
        if (attributeKeyValue.length !== 2) {
            throw new Error("recieved a malformed delimited string");
        }
        const attributeKey = attributeKeyValue[0];
        const attributeValue = parseFloat(attributeKeyValue[1]);
        metrics[attributeKey] = attributeValue;
    }
    return metrics;
}
/**
 * @hidden
 */
function timeSpanFromMetrics(metrics /* TODO: any */, key) {
    if (key in metrics) {
        return timeSpan_js_1.TimeSpan.fromMilliseconds(metrics[key]);
    }
    return timeSpan_js_1.TimeSpan.zero;
}
/**
 * @hidden
 */
function isNumeric(input) {
    return !isNaN(parseFloat(input)) && isFinite(input);
}
//# sourceMappingURL=queryMetricsUtils.js.map