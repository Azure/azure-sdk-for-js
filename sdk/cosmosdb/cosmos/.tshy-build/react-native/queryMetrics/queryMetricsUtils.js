// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { TimeSpan } from "./timeSpan.js";
/**
 * @hidden
 */
export function parseDelimitedString(delimitedString) {
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
export function timeSpanFromMetrics(metrics /* TODO: any */, key) {
    if (key in metrics) {
        return TimeSpan.fromMilliseconds(metrics[key]);
    }
    return TimeSpan.zero;
}
/**
 * @hidden
 */
export function isNumeric(input) {
    return !isNaN(parseFloat(input)) && isFinite(input);
}
//# sourceMappingURL=queryMetricsUtils.js.map