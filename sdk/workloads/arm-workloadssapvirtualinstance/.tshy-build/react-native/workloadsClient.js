// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createWorkloads } from "./api/index.js";
import { _getSAPApplicationServerInstancesOperations, } from "./classic/sapApplicationServerInstances/index.js";
import { _getSAPDatabaseInstancesOperations, } from "./classic/sapDatabaseInstances/index.js";
import { _getSAPCentralServerInstancesOperations, } from "./classic/sapCentralServerInstances/index.js";
import { _getSAPVirtualInstancesOperations, } from "./classic/sapVirtualInstances/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
export class WorkloadsClient {
    /** Workloads client provides access to various workload operations. */
    constructor(credential, subscriptionId, options = {}) {
        var _a;
        const prefixFromOptions = (_a = options === null || options === void 0 ? void 0 : options.userAgentOptions) === null || _a === void 0 ? void 0 : _a.userAgentPrefix;
        const userAgentPrefix = prefixFromOptions
            ? `${prefixFromOptions} azsdk-js-client`
            : `azsdk-js-client`;
        this._client = createWorkloads(credential, subscriptionId, Object.assign(Object.assign({}, options), { userAgentOptions: { userAgentPrefix } }));
        this.pipeline = this._client.pipeline;
        this.sapApplicationServerInstances = _getSAPApplicationServerInstancesOperations(this._client);
        this.sapDatabaseInstances = _getSAPDatabaseInstancesOperations(this._client);
        this.sapCentralServerInstances = _getSAPCentralServerInstancesOperations(this._client);
        this.sapVirtualInstances = _getSAPVirtualInstancesOperations(this._client);
        this.operations = _getOperationsOperations(this._client);
    }
}
//# sourceMappingURL=workloadsClient.js.map