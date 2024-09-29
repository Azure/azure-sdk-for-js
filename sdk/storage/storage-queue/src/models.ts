// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * A collection of key-value string pairs.
 */
export interface Metadata {
  /**
   * A key-value string pair.
   */
  [propertyName: string]: string;
}

/**
 * Defines the known cloud audiences for Storage.
 */
export enum StorageQueueAudience {
  /**
   * The OAuth scope to use to retrieve an AAD token for Azure Storage.
   */
  StorageOAuthScopes = "https://storage.azure.com/.default",
}

/**
 * To get OAuth audience for a storage account for queue service.
 */
export function getQueueServiceAccountAudience(storageAccountName: string): string {
  return `https://${storageAccountName}.queue.core.windows.net/.default`;
}
