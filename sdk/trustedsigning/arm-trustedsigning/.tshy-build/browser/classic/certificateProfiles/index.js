// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { get, create, $delete, listByCodeSigningAccount, revokeCertificate, } from "../../api/certificateProfiles/index.js";
export function getCertificateProfiles(context, subscriptionId) {
    return {
        get: (resourceGroupName, accountName, profileName, options) => get(context, subscriptionId, resourceGroupName, accountName, profileName, options),
        create: (resourceGroupName, accountName, profileName, resource, options) => create(context, subscriptionId, resourceGroupName, accountName, profileName, resource, options),
        delete: (resourceGroupName, accountName, profileName, options) => $delete(context, subscriptionId, resourceGroupName, accountName, profileName, options),
        listByCodeSigningAccount: (resourceGroupName, accountName, options) => listByCodeSigningAccount(context, subscriptionId, resourceGroupName, accountName, options),
        revokeCertificate: (resourceGroupName, accountName, profileName, body, options) => revokeCertificate(context, subscriptionId, resourceGroupName, accountName, profileName, body, options),
    };
}
export function getCertificateProfilesOperations(context, subscriptionId) {
    return Object.assign({}, getCertificateProfiles(context, subscriptionId));
}
//# sourceMappingURL=index.js.map