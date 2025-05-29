"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports._getSAPApplicationServerInstancesOperations = _getSAPApplicationServerInstancesOperations;
const operations_js_1 = require("../../api/sapApplicationServerInstances/operations.js");
function _getSAPApplicationServerInstances(context) {
    return {
        stop: (resourceGroupName, sapVirtualInstanceName, applicationInstanceName, options) => (0, operations_js_1.stop)(context, resourceGroupName, sapVirtualInstanceName, applicationInstanceName, options),
        start: (resourceGroupName, sapVirtualInstanceName, applicationInstanceName, options) => (0, operations_js_1.start)(context, resourceGroupName, sapVirtualInstanceName, applicationInstanceName, options),
        list: (resourceGroupName, sapVirtualInstanceName, options) => (0, operations_js_1.list)(context, resourceGroupName, sapVirtualInstanceName, options),
        delete: (resourceGroupName, sapVirtualInstanceName, applicationInstanceName, options) => (0, operations_js_1.$delete)(context, resourceGroupName, sapVirtualInstanceName, applicationInstanceName, options),
        update: (resourceGroupName, sapVirtualInstanceName, applicationInstanceName, properties, options) => (0, operations_js_1.update)(context, resourceGroupName, sapVirtualInstanceName, applicationInstanceName, properties, options),
        create: (resourceGroupName, sapVirtualInstanceName, applicationInstanceName, resource, options) => (0, operations_js_1.create)(context, resourceGroupName, sapVirtualInstanceName, applicationInstanceName, resource, options),
        get: (resourceGroupName, sapVirtualInstanceName, applicationInstanceName, options) => (0, operations_js_1.get)(context, resourceGroupName, sapVirtualInstanceName, applicationInstanceName, options),
    };
}
function _getSAPApplicationServerInstancesOperations(context) {
    return Object.assign({}, _getSAPApplicationServerInstances(context));
}
//# sourceMappingURL=index.js.map