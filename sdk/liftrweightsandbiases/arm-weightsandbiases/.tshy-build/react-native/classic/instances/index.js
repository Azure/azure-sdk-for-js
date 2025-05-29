// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { listBySubscription, listByResourceGroup, $delete, update, createOrUpdate, get, } from "../../api/instances/operations.js";
function _getInstances(context) {
    return {
        listBySubscription: (options) => listBySubscription(context, options),
        listByResourceGroup: (resourceGroupName, options) => listByResourceGroup(context, resourceGroupName, options),
        delete: (resourceGroupName, instancename, options) => $delete(context, resourceGroupName, instancename, options),
        update: (resourceGroupName, instancename, properties, options) => update(context, resourceGroupName, instancename, properties, options),
        createOrUpdate: (resourceGroupName, instancename, resource, options) => createOrUpdate(context, resourceGroupName, instancename, resource, options),
        get: (resourceGroupName, instancename, options) => get(context, resourceGroupName, instancename, options),
    };
}
export function _getInstancesOperations(context) {
    return Object.assign({}, _getInstances(context));
}
//# sourceMappingURL=index.js.map