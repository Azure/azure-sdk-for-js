/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * This is a helper class to construct a string representing the permissions granted by an AccountSAS. Setting a value
 * to true means that any SAS which uses these permissions will grant permissions for that operation. Once all the
 * values are set, this should be serialized with toString and set as the permissions field on an
 * {@link AccountSASSignatureValues} object. It is possible to construct the permissions string without this class, but
 * the order of the permissions is particular and this class guarantees correctness.
 */
export declare class AccountSASPermissions {
    /**
     * Parse initializes the AccountSASPermissions fields from a string.
     *
     * @param permissions -
     */
    static parse(permissions: string): AccountSASPermissions;
    /**
     * Creates a {@link AccountSASPermissions} from a raw object which contains same keys as it
     * and boolean values for them.
     *
     * @param permissionLike -
     */
    static from(permissionLike: AccountSASPermissionsLike): AccountSASPermissions;
    /**
     * Permission to read resources and list queues and tables granted.
     */
    read: boolean;
    /**
     * Permission to write resources granted.
     */
    write: boolean;
    /**
     * Permission to delete blobs and files granted.
     */
    delete: boolean;
    /**
     * Permission to delete versions granted.
     */
    deleteVersion: boolean;
    /**
     * Permission to list blob containers, blobs, shares, directories, and files granted.
     */
    list: boolean;
    /**
     * Permission to add messages, table entities, and append to blobs granted.
     */
    add: boolean;
    /**
     * Permission to create blobs and files granted.
     */
    create: boolean;
    /**
     * Permissions to update messages and table entities granted.
     */
    update: boolean;
    /**
     * Permission to get and delete messages granted.
     */
    process: boolean;
    /**
     * Specfies Tag access granted.
     */
    tag: boolean;
    /**
     * Permission to filter blobs.
     */
    filter: boolean;
    /**
     * Permission to set immutability policy.
     */
    setImmutabilityPolicy: boolean;
    /**
     * Specifies that Permanent Delete is permitted.
     */
    permanentDelete: boolean;
    /**
     * Produces the SAS permissions string for an Azure Storage account.
     * Call this method to set AccountSASSignatureValues Permissions field.
     *
     * Using this method will guarantee the resource types are in
     * an order accepted by the service.
     *
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
     *
     */
    toString(): string;
}
/**
 * A type that looks like an account SAS permission.
 * Used in {@link AccountSASPermissions} to parse SAS permissions from raw objects.
 */
export interface AccountSASPermissionsLike {
    /**
     * Permission to read resources and list queues and tables granted.
     */
    read?: boolean;
    /**
     * Permission to write resources granted.
     */
    write?: boolean;
    /**
     * Permission to delete blobs and files granted.
     */
    delete?: boolean;
    /**
     * Permission to delete versions granted.
     */
    deleteVersion?: boolean;
    /**
     * Permission to list blob containers, blobs, shares, directories, and files granted.
     */
    list?: boolean;
    /**
     * Permission to add messages, table entities, and append to blobs granted.
     */
    add?: boolean;
    /**
     * Permission to create blobs and files granted.
     */
    create?: boolean;
    /**
     * Permissions to update messages and table entities granted.
     */
    update?: boolean;
    /**
     * Permission to get and delete messages granted.
     */
    process?: boolean;
    /**
     * Specfies Tag access granted.
     */
    tag?: boolean;
    /**
     * Permission to filter blobs.
     */
    filter?: boolean;
    /**
     * Permission to set immutability policy.
     */
    setImmutabilityPolicy?: boolean;
    /**
     * Specifies that Permanent Delete is permitted.
     */
    permanentDelete?: boolean;
}
//# sourceMappingURL=AccountSASPermissions.d.ts.map