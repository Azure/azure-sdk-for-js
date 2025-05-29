// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { stop, start, list, $delete, update, create, get, } from "../../api/sapDatabaseInstances/operations.js";
function _getSAPDatabaseInstances(context) {
    return {
        stop: (resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options) => stop(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options),
        start: (resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options) => start(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options),
        list: (resourceGroupName, sapVirtualInstanceName, options) => list(context, resourceGroupName, sapVirtualInstanceName, options),
        delete: (resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options) => $delete(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options),
        update: (resourceGroupName, sapVirtualInstanceName, databaseInstanceName, properties, options) => update(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, properties, options),
        create: (resourceGroupName, sapVirtualInstanceName, databaseInstanceName, resource, options) => create(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, resource, options),
        get: (resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options) => get(context, resourceGroupName, sapVirtualInstanceName, databaseInstanceName, options),
    };
}
export function _getSAPDatabaseInstancesOperations(context) {
    return Object.assign({}, _getSAPDatabaseInstances(context));
}
//# sourceMappingURL=index.js.map