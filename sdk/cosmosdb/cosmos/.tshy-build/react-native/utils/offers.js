// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export function validateOffer(body) {
    if (body.throughput) {
        if (body.maxThroughput) {
            console.log("should be erroring");
            throw new Error("Cannot specify `throughput` with `maxThroughput`");
        }
        if (body.autoUpgradePolicy) {
            throw new Error("Cannot specify autoUpgradePolicy with throughput. Use `maxThroughput` instead");
        }
    }
}
//# sourceMappingURL=offers.js.map