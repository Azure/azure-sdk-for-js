"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkloadsClient = void 0;
const index_js_1 = require("./api/index.js");
const index_js_2 = require("./classic/sapApplicationServerInstances/index.js");
const index_js_3 = require("./classic/sapDatabaseInstances/index.js");
const index_js_4 = require("./classic/sapCentralServerInstances/index.js");
const index_js_5 = require("./classic/sapVirtualInstances/index.js");
const index_js_6 = require("./classic/operations/index.js");
class WorkloadsClient {
    /** Workloads client provides access to various workload operations. */
    constructor(credential, subscriptionId, options = {}) {
        var _a;
        const prefixFromOptions = (_a = options === null || options === void 0 ? void 0 : options.userAgentOptions) === null || _a === void 0 ? void 0 : _a.userAgentPrefix;
        const userAgentPrefix = prefixFromOptions
            ? `${prefixFromOptions} azsdk-js-client`
            : `azsdk-js-client`;
        this._client = (0, index_js_1.createWorkloads)(credential, subscriptionId, Object.assign(Object.assign({}, options), { userAgentOptions: { userAgentPrefix } }));
        this.pipeline = this._client.pipeline;
        this.sapApplicationServerInstances = (0, index_js_2._getSAPApplicationServerInstancesOperations)(this._client);
        this.sapDatabaseInstances = (0, index_js_3._getSAPDatabaseInstancesOperations)(this._client);
        this.sapCentralServerInstances = (0, index_js_4._getSAPCentralServerInstancesOperations)(this._client);
        this.sapVirtualInstances = (0, index_js_5._getSAPVirtualInstancesOperations)(this._client);
        this.operations = (0, index_js_6._getOperationsOperations)(this._client);
    }
}
exports.WorkloadsClient = WorkloadsClient;
//# sourceMappingURL=workloadsClient.js.map