// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __rest } from "tslib";
import { logger } from "../logger.js";
import { getClient } from "@azure-rest/core-client";
/** Azure Messaging EventGrid SystemEvents */
export function createSystemEvents(endpointParam, options = {}) {
    var _a, _b, _c, _d, _e;
    const endpointUrl = (_b = (_a = options.endpoint) !== null && _a !== void 0 ? _a : options.baseUrl) !== null && _b !== void 0 ? _b : String(endpointParam);
    const prefixFromOptions = (_c = options === null || options === void 0 ? void 0 : options.userAgentOptions) === null || _c === void 0 ? void 0 : _c.userAgentPrefix;
    const userAgentInfo = `azsdk-js-eventgrid-systemevents/1.0.0-beta.1`;
    const userAgentPrefix = prefixFromOptions
        ? `${prefixFromOptions} azsdk-js-api ${userAgentInfo}`
        : `azsdk-js-api ${userAgentInfo}`;
    const _f = Object.assign(Object.assign({}, options), { userAgentOptions: { userAgentPrefix }, loggingOptions: { logger: (_e = (_d = options.loggingOptions) === null || _d === void 0 ? void 0 : _d.logger) !== null && _e !== void 0 ? _e : logger.info } }), { apiVersion: _ } = _f, updatedOptions = __rest(_f, ["apiVersion"]);
    const clientContext = getClient(endpointUrl, undefined, updatedOptions);
    clientContext.pipeline.removePolicy({ name: "ApiVersionPolicy" });
    if (options.apiVersion) {
        logger.warning("This client does not support client api-version, please change it at the operation level");
    }
    return clientContext;
}
//# sourceMappingURL=systemEventsContext.js.map