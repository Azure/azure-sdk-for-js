// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export const SDK_VERSION = "1.0.0-beta.9";
/**
 * @internal
 *
 * Cached values of environment variables that were fetched.
 */
export const environmentCache = new Map();
/**
 * Converts an environment variable to Boolean.
 * the strings "false" and "0" are treated as falsy values.
 *
 * @internal
 */
export function envVarToBoolean(key) {
    var _a;
    if (!environmentCache.has(key)) {
        loadEnvironmentVariable(key);
    }
    const value = ((_a = environmentCache.get(key)) !== null && _a !== void 0 ? _a : "").toLowerCase();
    return value !== "false" && value !== "0" && Boolean(value);
}
function loadEnvironmentVariable(key) {
    var _a;
    if (typeof process !== "undefined" && process.env) {
        const rawValue = (_a = process.env[key]) !== null && _a !== void 0 ? _a : process.env[key.toLowerCase()];
        environmentCache.set(key, rawValue);
    }
}
//# sourceMappingURL=configuration.js.map