"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports._getSAPVirtualInstancesOperations = _getSAPVirtualInstancesOperations;
const operations_js_1 = require("../../api/sapVirtualInstances/operations.js");
function _getSAPVirtualInstances(context) {
    return {
        getAvailabilityZoneDetails: (location, body, options) => (0, operations_js_1.getAvailabilityZoneDetails)(context, location, body, options),
        getDiskConfigurations: (location, body, options) => (0, operations_js_1.getDiskConfigurations)(context, location, body, options),
        getSapSupportedSku: (location, body, options) => (0, operations_js_1.getSapSupportedSku)(context, location, body, options),
        getSizingRecommendations: (location, body, options) => (0, operations_js_1.getSizingRecommendations)(context, location, body, options),
        stop: (resourceGroupName, sapVirtualInstanceName, options) => (0, operations_js_1.stop)(context, resourceGroupName, sapVirtualInstanceName, options),
        start: (resourceGroupName, sapVirtualInstanceName, options) => (0, operations_js_1.start)(context, resourceGroupName, sapVirtualInstanceName, options),
        listBySubscription: (options) => (0, operations_js_1.listBySubscription)(context, options),
        listByResourceGroup: (resourceGroupName, options) => (0, operations_js_1.listByResourceGroup)(context, resourceGroupName, options),
        delete: (resourceGroupName, sapVirtualInstanceName, options) => (0, operations_js_1.$delete)(context, resourceGroupName, sapVirtualInstanceName, options),
        update: (resourceGroupName, sapVirtualInstanceName, properties, options) => (0, operations_js_1.update)(context, resourceGroupName, sapVirtualInstanceName, properties, options),
        create: (resourceGroupName, sapVirtualInstanceName, resource, options) => (0, operations_js_1.create)(context, resourceGroupName, sapVirtualInstanceName, resource, options),
        get: (resourceGroupName, sapVirtualInstanceName, options) => (0, operations_js_1.get)(context, resourceGroupName, sapVirtualInstanceName, options),
    };
}
function _getSAPVirtualInstancesOperations(context) {
    return Object.assign({}, _getSAPVirtualInstances(context));
}
//# sourceMappingURL=index.js.map