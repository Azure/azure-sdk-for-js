"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports._getInstancesOperations = _getInstancesOperations;
const operations_js_1 = require("../../api/instances/operations.js");
function _getInstances(context) {
    return {
        listBySubscription: (options) => (0, operations_js_1.listBySubscription)(context, options),
        listByResourceGroup: (resourceGroupName, options) => (0, operations_js_1.listByResourceGroup)(context, resourceGroupName, options),
        delete: (resourceGroupName, instancename, options) => (0, operations_js_1.$delete)(context, resourceGroupName, instancename, options),
        update: (resourceGroupName, instancename, properties, options) => (0, operations_js_1.update)(context, resourceGroupName, instancename, properties, options),
        createOrUpdate: (resourceGroupName, instancename, resource, options) => (0, operations_js_1.createOrUpdate)(context, resourceGroupName, instancename, resource, options),
        get: (resourceGroupName, instancename, options) => (0, operations_js_1.get)(context, resourceGroupName, instancename, options),
    };
}
function _getInstancesOperations(context) {
    return Object.assign({}, _getInstances(context));
}
//# sourceMappingURL=index.js.map