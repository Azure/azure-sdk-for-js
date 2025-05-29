"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeightsAndBiasesClient = void 0;
const index_js_1 = require("./api/index.js");
const index_js_2 = require("./classic/instances/index.js");
const index_js_3 = require("./classic/operations/index.js");
class WeightsAndBiasesClient {
    constructor(credential, subscriptionId, options = {}) {
        var _a;
        const prefixFromOptions = (_a = options === null || options === void 0 ? void 0 : options.userAgentOptions) === null || _a === void 0 ? void 0 : _a.userAgentPrefix;
        const userAgentPrefix = prefixFromOptions
            ? `${prefixFromOptions} azsdk-js-client`
            : `azsdk-js-client`;
        this._client = (0, index_js_1.createWeightsAndBiases)(credential, subscriptionId, Object.assign(Object.assign({}, options), { userAgentOptions: { userAgentPrefix } }));
        this.pipeline = this._client.pipeline;
        this.instances = (0, index_js_2._getInstancesOperations)(this._client);
        this.operations = (0, index_js_3._getOperationsOperations)(this._client);
    }
}
exports.WeightsAndBiasesClient = WeightsAndBiasesClient;
//# sourceMappingURL=weightsAndBiasesClient.js.map