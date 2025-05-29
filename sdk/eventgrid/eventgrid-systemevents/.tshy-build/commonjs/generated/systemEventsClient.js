"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemEventsClient = void 0;
const index_js_1 = require("./api/index.js");
class SystemEventsClient {
    /** Azure Messaging EventGrid SystemEvents */
    constructor(endpointParam, options = {}) {
        var _a;
        const prefixFromOptions = (_a = options === null || options === void 0 ? void 0 : options.userAgentOptions) === null || _a === void 0 ? void 0 : _a.userAgentPrefix;
        const userAgentPrefix = prefixFromOptions
            ? `${prefixFromOptions} azsdk-js-client`
            : `azsdk-js-client`;
        this._client = (0, index_js_1.createSystemEvents)(endpointParam, Object.assign(Object.assign({}, options), { userAgentOptions: { userAgentPrefix } }));
        this.pipeline = this._client.pipeline;
    }
}
exports.SystemEventsClient = SystemEventsClient;
//# sourceMappingURL=systemEventsClient.js.map