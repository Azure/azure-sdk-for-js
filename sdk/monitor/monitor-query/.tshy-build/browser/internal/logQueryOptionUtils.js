// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export function getLogQueryEndpoint(options) {
    if (!options.endpoint) {
        throw new Error("options.endpoint is required");
    }
    const url = new URL(options.endpoint);
    url.pathname = "/v1";
    return url.toString();
}
//# sourceMappingURL=logQueryOptionUtils.js.map