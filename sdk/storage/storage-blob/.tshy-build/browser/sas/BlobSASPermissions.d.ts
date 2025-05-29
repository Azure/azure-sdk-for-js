/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * This is a helper class to construct a string representing the permissions granted by a ServiceSAS to a blob. Setting
 * a value to true means that any SAS which uses these permissions will grant permissions for that operation. Once all
 * the values are set, this should be serialized with toString and set as the permissions field on a
 * {@link BlobSASSignatureValues} object. It is possible to construct the permissions string without this class, but
 * the order of the permissions is particular and this class guarantees correctness.
 */
export declare class BlobSASPermissions {
    /**
     * Creates a {@link BlobSASPermissions} from the specified permissions string. This method will throw an
     * Error if it encounters a character that does not correspond to a valid permission.
     *
     * @param permissions -
     */
    static parse(permissions: string): BlobSASPermissions;
    /**
     * Creates a {@link BlobSASPermissions} from a raw object which contains same keys as it
     * and boolean values for them.
     *
     * @param permissionLike -
     */
    static from(permissionLike: BlobSASPermissionsLike): BlobSASPermissions;
    /**
     * Specifies Read access granted.
     */
    read: boolean;
    /**
     * Specifies Add access granted.
     */
    add: boolean;
    /**
     * Specifies Create access granted.
     */
    create: boolean;
    /**
     * Specifies Write access granted.
     */
    write: boolean;
    /**
     * Specifies Delete access granted.
     */
    delete: boolean;
    /**
     * Specifies Delete version access granted.
     */
    deleteVersion: boolean;
    /**
     * Specfies Tag access granted.
     */
    tag: boolean;
    /**
     * Specifies Move access granted.
     */
    move: boolean;
    /**
     * Specifies Execute access granted.
     */
    execute: boolean;
    /**
     * Specifies SetImmutabilityPolicy access granted.
     */
    setImmutabilityPolicy: boolean;
    /**
     * Specifies that Permanent Delete is permitted.
     */
    permanentDelete: boolean;
    /**
     * Converts the given permissions to a string. Using this method will guarantee the permissions are in an
     * order accepted by the service.
     *
     * @returns A string which represents the BlobSASPermissions
     */
    toString(): string;
}
/**
 * A type that looks like a Blob SAS permission.
 * Used in {@link BlobSASPermissions} to parse SAS permissions from raw objects.
 */
export interface BlobSASPermissionsLike {
    /**
     * Specifies Read access granted.
     */
    read?: boolean;
    /**
     * Specifies Add access granted.
     */
    add?: boolean;
    /**
     * Specifies Create access granted.
     */
    create?: boolean;
    /**
     * Specifies Write access granted.
     */
    write?: boolean;
    /**
     * Specifies Delete access granted.
     */
    delete?: boolean;
    /**
     * Specifies Delete version access granted.
     */
    deleteVersion?: boolean;
    /**
     * Specfies Tag access granted.
     */
    tag?: boolean;
    /**
     * Specifies Move access granted.
     */
    move?: boolean;
    /**
     * Specifies Execute access granted.
     */
    execute?: boolean;
    /**
     * Specifies SetImmutabilityPolicy access granted.
     */
    setImmutabilityPolicy?: boolean;
    /**
     * Specifies that Permanent Delete is permitted.
     */
    permanentDelete?: boolean;
}
//# sourceMappingURL=BlobSASPermissions.d.ts.map