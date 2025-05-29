"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWidgetService = createWidgetService;
const tslib_1 = require("tslib");
const core_auth_1 = require("@azure/core-auth");
const widgetServiceClient_js_1 = tslib_1.__importDefault(require("../rest/widgetServiceClient.js"));
function createWidgetService(endpoint, credentialOrOptions, options = {}) {
    const baseUrl = endpoint;
    if ((0, core_auth_1.isTokenCredential)(credentialOrOptions)) {
        return (0, widgetServiceClient_js_1.default)(baseUrl, credentialOrOptions, options);
    }
    else {
        return (0, widgetServiceClient_js_1.default)(baseUrl, credentialOrOptions);
    }
}
//# sourceMappingURL=WidgetServiceContext.js.map