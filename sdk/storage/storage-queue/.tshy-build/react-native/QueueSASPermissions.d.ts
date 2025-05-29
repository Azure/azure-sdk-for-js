/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * This is a helper class to construct a string representing the permissions granted by a ServiceSAS to a Queue. Setting
 * a value to true means that any SAS which uses these permissions will grant permissions for that operation. Once all
 * the values are set, this should be serialized with toString and set as the permissions field on a
 * {@link QueueSASSignatureValues} object. It is possible to construct the permissions string without this class, but
 * the order of the permissions is particular and this class guarantees correctness.
 */
export declare class QueueSASPermissions {
    /**
     * Creates a {@link QueueSASPermissions} from the specified permissions string. This method will throw an
     * Error if it encounters a character that does not correspond to a valid permission.
     *
     * @param permissions -
     */
    static parse(permissions: string): QueueSASPermissions;
    /**
     * Specifies Read access granted.
     */
    read: boolean;
    /**
     * Specifies Add access granted.
     */
    add: boolean;
    /**
     * Specifies Update access granted.
     */
    update: boolean;
    /**
     * Specifies Process access granted.
     */
    process: boolean;
    /**
     * Converts the given permissions to a string. Using this method will guarantee the permissions are in an
     * order accepted by the service.
     *
     * @returns A string which represents the QueueSASPermissions
     */
    toString(): string;
}
//# sourceMappingURL=QueueSASPermissions.d.ts.map