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
export declare enum StorageQueueAudience {
    /**
     * The OAuth scope to use to retrieve an AAD token for Azure Storage.
     */
    StorageOAuthScopes = "https://storage.azure.com/.default"
}
/**
 * To get OAuth audience for a storage account for queue service.
 */
export declare function getQueueServiceAccountAudience(storageAccountName: string): string;
//# sourceMappingURL=models.d.ts.map