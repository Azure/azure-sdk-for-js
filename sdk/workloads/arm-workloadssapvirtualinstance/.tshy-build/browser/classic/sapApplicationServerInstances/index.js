// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { stop, start, list, $delete, update, create, get, } from "../../api/sapApplicationServerInstances/operations.js";
function _getSAPApplicationServerInstances(context) {
    return {
        stop: (resourceGroupName, sapVirtualInstanceName, applicationInstanceName, options) => stop(context, resourceGroupName, sapVirtualInstanceName, applicationInstanceName, options),
        start: (resourceGroupName, sapVirtualInstanceName, applicationInstanceName, options) => start(context, resourceGroupName, sapVirtualInstanceName, applicationInstanceName, options),
        list: (resourceGroupName, sapVirtualInstanceName, options) => list(context, resourceGroupName, sapVirtualInstanceName, options),
        delete: (resourceGroupName, sapVirtualInstanceName, applicationInstanceName, options) => $delete(context, resourceGroupName, sapVirtualInstanceName, applicationInstanceName, options),
        update: (resourceGroupName, sapVirtualInstanceName, applicationInstanceName, properties, options) => update(context, resourceGroupName, sapVirtualInstanceName, applicationInstanceName, properties, options),
        create: (resourceGroupName, sapVirtualInstanceName, applicationInstanceName, resource, options) => create(context, resourceGroupName, sapVirtualInstanceName, applicationInstanceName, resource, options),
        get: (resourceGroupName, sapVirtualInstanceName, applicationInstanceName, options) => get(context, resourceGroupName, sapVirtualInstanceName, applicationInstanceName, options),
    };
}
export function _getSAPApplicationServerInstancesOperations(context) {
    return Object.assign({}, _getSAPApplicationServerInstances(context));
}
//# sourceMappingURL=index.js.map