// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createSystemEvents, } from "./api/index.js";
export class SystemEventsClient {
    /** Azure Messaging EventGrid SystemEvents */
    constructor(endpointParam, options = {}) {
        var _a;
        const prefixFromOptions = (_a = options === null || options === void 0 ? void 0 : options.userAgentOptions) === null || _a === void 0 ? void 0 : _a.userAgentPrefix;
        const userAgentPrefix = prefixFromOptions
            ? `${prefixFromOptions} azsdk-js-client`
            : `azsdk-js-client`;
        this._client = createSystemEvents(endpointParam, Object.assign(Object.assign({}, options), { userAgentOptions: { userAgentPrefix } }));
        this.pipeline = this._client.pipeline;
    }
}
//# sourceMappingURL=systemEventsClient.js.map