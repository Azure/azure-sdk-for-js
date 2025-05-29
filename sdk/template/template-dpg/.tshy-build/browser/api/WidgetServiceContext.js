// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isTokenCredential } from "@azure/core-auth";
import getClient from "../rest/widgetServiceClient.js";
export function createWidgetService(endpoint, credentialOrOptions, options = {}) {
    const baseUrl = endpoint;
    if (isTokenCredential(credentialOrOptions)) {
        return getClient(baseUrl, credentialOrOptions, options);
    }
    else {
        return getClient(baseUrl, credentialOrOptions);
    }
}
//# sourceMappingURL=WidgetServiceContext.js.map