"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformFromRestModel = transformFromRestModel;
exports.transformIntoRestModel = transformIntoRestModel;
/**
 * @internal
 * Transforming SIP trunks REST model to SDK model
 */
function transformFromRestModel(trunks) {
    const result = [];
    if (trunks) {
        Object.keys(trunks).forEach((fqdn) => {
            const port = trunks[fqdn].sipSignalingPort;
            result.push({ fqdn: fqdn, sipSignalingPort: port });
        });
    }
    return result;
}
/**
 * @internal
 * Transforming SIP trunks SDK model to REST model
 */
function transformIntoRestModel(trunks) {
    const result = {};
    trunks.forEach((trunk) => {
        result[trunk.fqdn] = { sipSignalingPort: trunk.sipSignalingPort };
    });
    return result;
}
//# sourceMappingURL=mappers.js.map