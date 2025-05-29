/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * This is a helper class to construct a string representing the services accessible by an AccountSAS. Setting a value
 * to true means that any SAS which uses these permissions will grant access to that service. Once all the
 * values are set, this should be serialized with toString and set as the services field on an
 * {@link AccountSASSignatureValues} object. It is possible to construct the services string without this class, but
 * the order of the services is particular and this class guarantees correctness.
 */
export declare class AccountSASServices {
    /**
     * Creates an {@link AccountSASServices} from the specified services string. This method will throw an
     * Error if it encounters a character that does not correspond to a valid service.
     *
     * @param services -
     */
    static parse(services: string): AccountSASServices;
    /**
     * Permission to access blob resources granted.
     */
    blob: boolean;
    /**
     * Permission to access file resources granted.
     */
    file: boolean;
    /**
     * Permission to access queue resources granted.
     */
    queue: boolean;
    /**
     * Permission to access table resources granted.
     */
    table: boolean;
    /**
     * Converts the given services to a string.
     *
     */
    toString(): string;
}
//# sourceMappingURL=AccountSASServices.d.ts.map