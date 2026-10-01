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

const xMsMetaPrefix = "x-ms-meta-";

/**
 * Converts a Metadata object to individual x-ms-meta-* HTTP headers.
 * @internal
 */
export function metadataToRawHeaders(metadata: Metadata | undefined): Record<string, string> {
  const metadataHeaders: Record<string, string> = {};
  if (metadata) {
    for (const key of Object.keys(metadata)) {
      metadataHeaders[`${xMsMetaPrefix}${key.toLowerCase()}`] = metadata[key];
    }
  }
  return metadataHeaders;
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
