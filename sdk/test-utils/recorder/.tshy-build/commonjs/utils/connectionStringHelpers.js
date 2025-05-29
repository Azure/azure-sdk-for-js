"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRealAndFakePairs = getRealAndFakePairs;
/**
 * Returns the connection string parsed as JSON object.
 */
function getConnStringAsJSON(connectionString) {
    const keyValuePairs = {};
    const elements = connectionString.split(";").filter((e) => Boolean(e));
    for (const element of elements) {
        const trimmedElement = element.trim();
        const [elementKey, value] = getKeyValuePair(trimmedElement);
        keyValuePairs[elementKey] = value;
    }
    return keyValuePairs;
}
/**
 * Returns the key and value from `<key>=<value>` string.
 *
 * `a=b=c` => ["a", "b=c"]
 */
function getKeyValuePair(kvp) {
    // If the string is not in kvp format <key>=<value> return an empty array
    if (!kvp || kvp.indexOf("=") === -1) {
        return [];
    }
    return kvp.split(/=(.*)/).slice(0, 2);
}
/**
 * Get real and fake values mapped from the provided connection strings.
 *
 * Example:
 *  connectionString = "endpoint=secretive.azure.io;token=a1b2c3d4;secret=totally_secret"
 *  fakeConnString   = "endpoint=randomval.azure.io;token=mask_tok;secret=totally_faked"
 *
 *  // Ordering/spaces are not important
 *
 * Returns
 * ```
 * {
 *   "secretive.azure.io": "randomval.azure.io",
 *   "a1b2c3d4"          : "mask_tok",
 *   "totally_secret"    : "totally_faked"
 * }
 * ```
 */
function getRealAndFakePairs(connectionString, fakeConnString) {
    const realAndFakePairs = {};
    const fakeValues = getConnStringAsJSON(fakeConnString);
    const realValues = getConnStringAsJSON(connectionString);
    for (const key in fakeValues) {
        realAndFakePairs[realValues[key]] = fakeValues[key]; // "real value" : "fake value"
    }
    return realAndFakePairs;
}
//# sourceMappingURL=connectionStringHelpers.js.map