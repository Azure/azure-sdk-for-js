// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { CommunicationSignalingClient } from "@azure/communication-signaling";
export const getSignalingClient = (credential, logger, options) => {
    var _a, _b, _c, _d;
    return new CommunicationSignalingClient(credential, logger, {
        resourceEndpoint: (_a = options === null || options === void 0 ? void 0 : options.resourceEndpoint) !== null && _a !== void 0 ? _a : undefined,
        gatewayApiVersion: (_b = options === null || options === void 0 ? void 0 : options.gatewayApiVersion) !== null && _b !== void 0 ? _b : undefined,
        additionalPolicies: (_c = options === null || options === void 0 ? void 0 : options.additionalPolicies) !== null && _c !== void 0 ? _c : undefined,
        userAgentOptions: (_d = options === null || options === void 0 ? void 0 : options.userAgentOptions) !== null && _d !== void 0 ? _d : undefined,
    });
};
//# sourceMappingURL=signalingClient-browser.mjs.map