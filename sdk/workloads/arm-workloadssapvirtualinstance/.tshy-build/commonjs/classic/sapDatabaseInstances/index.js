"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports._getSAPDatabaseInstancesOperations = _getSAPDatabaseInstancesOperations;
const operations_js_1 = require("../../api/sapDatabaseInstances/operations.js");
function _getSAPDatabaseInstances(context) {
    return {
        stop: (resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options) => (0, operations_js_1.stop)(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options),
        start: (resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options) => (0, operations_js_1.start)(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options),
        list: (resourceGroupName, sapVirtualInstanceName, options) => (0, operations_js_1.list)(context, resourceGroupName, sapVirtualInstanceName, options),
        delete: (resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options) => (0, operations_js_1.$delete)(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options),
        update: (resourceGroupName, sapVirtualInstanceName, databaseInstanceName, properties, options) => (0, operations_js_1.update)(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, properties, options),
        create: (resourceGroupName, sapVirtualInstanceName, databaseInstanceName, resource, options) => (0, operations_js_1.create)(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, resource, options),
        get: (resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options) => (0, operations_js_1.get)(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options),
    };
}
function _getSAPDatabaseInstancesOperations(context) {
    return Object.assign({}, _getSAPDatabaseInstances(context));
}
//# sourceMappingURL=index.js.map