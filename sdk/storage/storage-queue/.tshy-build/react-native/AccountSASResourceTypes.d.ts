/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * This is a helper class to construct a string representing the resources accessible by an AccountSAS. Setting a value
 * to true means that any SAS which uses these permissions will grant access to that resource type. Once all the
 * values are set, this should be serialized with toString and set as the resources field on an
 * {@link AccountSASSignatureValues} object. It is possible to construct the resources string without this class, but
 * the order of the resources is particular and this class guarantees correctness.
 */
export declare class AccountSASResourceTypes {
    /**
     * Creates an {@link AccountSASResourceTypes} from the specified resource types string. This method will throw an
     * Error if it encounters a character that does not correspond to a valid resource type.
     *
     * @param resourceTypes -
     */
    static parse(resourceTypes: string): AccountSASResourceTypes;
    /**
     * Permission to access service level APIs granted.
     */
    service: boolean;
    /**
     * Permission to access container level APIs (Blob Containers, Tables, Queues, File Shares) granted.
     */
    container: boolean;
    /**
     * Permission to access object level APIs (Blobs, Table Entities, Queue Messages, Files) granted.
     */
    object: boolean;
    /**
     * Converts the given resource types to a string.
     *
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
     *
     */
    toString(): string;
}
//# sourceMappingURL=AccountSASResourceTypes.d.ts.map