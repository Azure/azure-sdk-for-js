// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createWeightsAndBiases, } from "./api/index.js";
import { _getInstancesOperations } from "./classic/instances/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
export class WeightsAndBiasesClient {
    constructor(credential, subscriptionId, options = {}) {
        var _a;
        const prefixFromOptions = (_a = options === null || options === void 0 ? void 0 : options.userAgentOptions) === null || _a === void 0 ? void 0 : _a.userAgentPrefix;
        const userAgentPrefix = prefixFromOptions
            ? `${prefixFromOptions} azsdk-js-client`
            : `azsdk-js-client`;
        this._client = createWeightsAndBiases(credential, subscriptionId, Object.assign(Object.assign({}, options), { userAgentOptions: { userAgentPrefix } }));
        this.pipeline = this._client.pipeline;
        this.instances = _getInstancesOperations(this._client);
        this.operations = _getOperationsOperations(this._client);
    }
}
//# sourceMappingURL=weightsAndBiasesClient.js.map