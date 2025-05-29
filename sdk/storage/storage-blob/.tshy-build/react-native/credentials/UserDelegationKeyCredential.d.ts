import type { UserDelegationKey } from "../BlobServiceClient.js";
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * UserDelegationKeyCredential is only used for generation of user delegation SAS.
 * @see https://learn.microsoft.com/en-us/rest/api/storageservices/create-user-delegation-sas
 */
export declare class UserDelegationKeyCredential {
    /**
     * Azure Storage account name; readonly.
     */
    readonly accountName: string;
    /**
     * Azure Storage user delegation key; readonly.
     */
    readonly userDelegationKey: UserDelegationKey;
    /**
     * Key value in Buffer type.
     */
    private readonly key;
    /**
     * Creates an instance of UserDelegationKeyCredential.
     * @param accountName -
     * @param userDelegationKey -
     */
    constructor(accountName: string, userDelegationKey: UserDelegationKey);
    /**
     * Generates a hash signature for an HTTP request or for a SAS.
     *
     * @param stringToSign -
     */
    computeHMACSHA256(stringToSign: string): string;
}
//# sourceMappingURL=UserDelegationKeyCredential.d.ts.map