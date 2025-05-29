"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports._getSAPCentralServerInstancesOperations = _getSAPCentralServerInstancesOperations;
const operations_js_1 = require("../../api/sapCentralServerInstances/operations.js");
function _getSAPCentralServerInstances(context) {
    return {
        stop: (resourceGroupName, sapVirtualInstanceName, centralInstanceName, options) => (0, operations_js_1.stop)(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, options),
        start: (resourceGroupName, sapVirtualInstanceName, centralInstanceName, options) => (0, operations_js_1.start)(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, options),
        list: (resourceGroupName, sapVirtualInstanceName, options) => (0, operations_js_1.list)(context, resourceGroupName, sapVirtualInstanceName, options),
        delete: (resourceGroupName, sapVirtualInstanceName, centralInstanceName, options) => (0, operations_js_1.$delete)(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, options),
        update: (resourceGroupName, sapVirtualInstanceName, centralInstanceName, properties, options) => (0, operations_js_1.update)(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, properties, options),
        create: (resourceGroupName, sapVirtualInstanceName, centralInstanceName, resource, options) => (0, operations_js_1.create)(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, resource, options),
        get: (resourceGroupName, sapVirtualInstanceName, centralInstanceName, options) => (0, operations_js_1.get)(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, options),
    };
}
function _getSAPCentralServerInstancesOperations(context) {
    return Object.assign({}, _getSAPCentralServerInstances(context));
}
//# sourceMappingURL=index.js.map