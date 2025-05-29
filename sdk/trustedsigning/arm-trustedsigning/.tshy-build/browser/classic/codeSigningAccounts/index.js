// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { get, create, update, $delete, listByResourceGroup, listBySubscription, checkNameAvailability, } from "../../api/codeSigningAccounts/index.js";
export function getCodeSigningAccounts(context, subscriptionId) {
    return {
        get: (resourceGroupName, accountName, options) => get(context, subscriptionId, resourceGroupName, accountName, options),
        create: (resourceGroupName, accountName, resource, options) => create(context, subscriptionId, resourceGroupName, accountName, resource, options),
        update: (resourceGroupName, accountName, properties, options) => update(context, subscriptionId, resourceGroupName, accountName, properties, options),
        delete: (resourceGroupName, accountName, options) => $delete(context, subscriptionId, resourceGroupName, accountName, options),
        listByResourceGroup: (resourceGroupName, options) => listByResourceGroup(context, subscriptionId, resourceGroupName, options),
        listBySubscription: (options) => listBySubscription(context, subscriptionId, options),
        checkNameAvailability: (body, options) => checkNameAvailability(context, subscriptionId, body, options),
    };
}
export function getCodeSigningAccountsOperations(context, subscriptionId) {
    return Object.assign({}, getCodeSigningAccounts(context, subscriptionId));
}
//# sourceMappingURL=index.js.map