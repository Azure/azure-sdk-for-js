"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipRangeToString = ipRangeToString;
/**
 * Generate SasIPRange format string. For example:
 *
 * "8.8.8.8" or "1.1.1.1-255.255.255.255"
 *
 * @param ipRange -
 */
function ipRangeToString(ipRange) {
    return ipRange.end ? `${ipRange.start}-${ipRange.end}` : ipRange.start;
}
//# sourceMappingURL=SasIPRange.js.map