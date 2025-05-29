// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { stop, start, list, $delete, update, create, get, } from "../../api/sapCentralServerInstances/operations.js";
function _getSAPCentralServerInstances(context) {
    return {
        stop: (resourceGroupName, sapVirtualInstanceName, centralInstanceName, options) => stop(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, options),
        start: (resourceGroupName, sapVirtualInstanceName, centralInstanceName, options) => start(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, options),
        list: (resourceGroupName, sapVirtualInstanceName, options) => list(context, resourceGroupName, sapVirtualInstanceName, options),
        delete: (resourceGroupName, sapVirtualInstanceName, centralInstanceName, options) => $delete(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, options),
        update: (resourceGroupName, sapVirtualInstanceName, centralInstanceName, properties, options) => update(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, properties, options),
        create: (resourceGroupName, sapVirtualInstanceName, centralInstanceName, resource, options) => create(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, resource, options),
        get: (resourceGroupName, sapVirtualInstanceName, centralInstanceName, options) => get(context, resourceGroupName, sapVirtualInstanceName, centralInstanceName, options),
    };
}
export function _getSAPCentralServerInstancesOperations(context) {
    return Object.assign({}, _getSAPCentralServerInstances(context));
}
//# sourceMappingURL=index.js.map