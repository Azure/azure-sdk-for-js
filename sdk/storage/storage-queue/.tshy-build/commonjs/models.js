"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageQueueAudience = void 0;
exports.getQueueServiceAccountAudience = getQueueServiceAccountAudience;
/**
 * Defines the known cloud audiences for Storage.
 */
var StorageQueueAudience;
(function (StorageQueueAudience) {
    /**
     * The OAuth scope to use to retrieve an AAD token for Azure Storage.
     */
    StorageQueueAudience["StorageOAuthScopes"] = "https://storage.azure.com/.default";
})(StorageQueueAudience || (exports.StorageQueueAudience = StorageQueueAudience = {}));
/**
 * To get OAuth audience for a storage account for queue service.
 */
function getQueueServiceAccountAudience(storageAccountName) {
    return `https://${storageAccountName}.queue.core.windows.net/.default`;
}
//# sourceMappingURL=models.js.map