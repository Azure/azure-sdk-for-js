// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * Defines the known cloud audiences for Storage.
 */
export var StorageQueueAudience;
(function (StorageQueueAudience) {
    /**
     * The OAuth scope to use to retrieve an AAD token for Azure Storage.
     */
    StorageQueueAudience["StorageOAuthScopes"] = "https://storage.azure.com/.default";
})(StorageQueueAudience || (StorageQueueAudience = {}));
/**
 * To get OAuth audience for a storage account for queue service.
 */
export function getQueueServiceAccountAudience(storageAccountName) {
    return `https://${storageAccountName}.queue.core.windows.net/.default`;
}
//# sourceMappingURL=models.js.map