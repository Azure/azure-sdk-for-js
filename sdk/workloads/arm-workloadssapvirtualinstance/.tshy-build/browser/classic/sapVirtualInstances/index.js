// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getAvailabilityZoneDetails, getDiskConfigurations, getSapSupportedSku, getSizingRecommendations, stop, start, listBySubscription, listByResourceGroup, $delete, update, create, get, } from "../../api/sapVirtualInstances/operations.js";
function _getSAPVirtualInstances(context) {
    return {
        getAvailabilityZoneDetails: (location, body, options) => getAvailabilityZoneDetails(context, location, body, options),
        getDiskConfigurations: (location, body, options) => getDiskConfigurations(context, location, body, options),
        getSapSupportedSku: (location, body, options) => getSapSupportedSku(context, location, body, options),
        getSizingRecommendations: (location, body, options) => getSizingRecommendations(context, location, body, options),
        stop: (resourceGroupName, sapVirtualInstanceName, options) => stop(context, resourceGroupName, sapVirtualInstanceName, options),
        start: (resourceGroupName, sapVirtualInstanceName, options) => start(context, resourceGroupName, sapVirtualInstanceName, options),
        listBySubscription: (options) => listBySubscription(context, options),
        listByResourceGroup: (resourceGroupName, options) => listByResourceGroup(context, resourceGroupName, options),
        delete: (resourceGroupName, sapVirtualInstanceName, options) => $delete(context, resourceGroupName, sapVirtualInstanceName, options),
        update: (resourceGroupName, sapVirtualInstanceName, properties, options) => update(context, resourceGroupName, sapVirtualInstanceName, properties, options),
        create: (resourceGroupName, sapVirtualInstanceName, resource, options) => create(context, resourceGroupName, sapVirtualInstanceName, resource, options),
        get: (resourceGroupName, sapVirtualInstanceName, options) => get(context, resourceGroupName, sapVirtualInstanceName, options),
    };
}
export function _getSAPVirtualInstancesOperations(context) {
    return Object.assign({}, _getSAPVirtualInstances(context));
}
//# sourceMappingURL=index.js.map