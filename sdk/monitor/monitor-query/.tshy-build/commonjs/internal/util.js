"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPreferHeader = formatPreferHeader;
/**
 * @internal
 */
function formatPreferHeader(args) {
    if (!args) {
        return undefined;
    }
    // https://datatracker.ietf.org/doc/html/rfc7240
    const pairs = [];
    if (args.serverTimeoutInSeconds != null) {
        pairs.push(`wait=${args.serverTimeoutInSeconds}`);
    }
    if (args.includeQueryStatistics) {
        pairs.push("include-statistics=true");
    }
    if (args.includeVisualization) {
        pairs.push("include-render=true");
    }
    if (pairs.length > 0) {
        return {
            Prefer: pairs.join(","),
        };
    }
    return undefined;
}
//# sourceMappingURL=util.js.map