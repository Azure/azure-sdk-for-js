import { AccountSASPermissions } from "./AccountSASPermissions.js";
import type { StorageSharedKeyCredential } from "../credentials/StorageSharedKeyCredential.js";
import type { SasIPRange } from "./SasIPRange.js";
import type { SASProtocol } from "./SASQueryParameters.js";
import { SASQueryParameters } from "./SASQueryParameters.js";
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * AccountSASSignatureValues is used to generate a Shared Access Signature (SAS) for an Azure Storage account. Once
 * all the values here are set appropriately, call {@link generateAccountSASQueryParameters} to obtain a representation
 * of the SAS which can actually be applied to blob urls. Note: that both this class and {@link SASQueryParameters}
 * exist because the former is mutable and a logical representation while the latter is immutable and used to generate
 * actual REST requests.
 *
 * @see https://learn.microsoft.com/en-us/azure/storage/common/storage-dotnet-shared-access-signature-part-1
 * for more conceptual information on SAS
 *
 * @see https://learn.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
 * for descriptions of the parameters, including which are required
 */
export interface AccountSASSignatureValues {
    /**
     * If not provided, this defaults to the service version targeted by this version of the library.
     */
    version?: string;
    /**
     * Optional. SAS protocols allowed.
     */
    protocol?: SASProtocol;
    /**
     * Optional. When the SAS will take effect.
     */
    startsOn?: Date;
    /**
     * The time after which the SAS will no longer work.
     */
    expiresOn: Date;
    /**
     * Specifies which operations the SAS user may perform. Please refer to {@link AccountSASPermissions} for help
     * constructing the permissions string.
     */
    permissions: AccountSASPermissions;
    /**
     * Optional. IP range allowed.
     */
    ipRange?: SasIPRange;
    /**
     * The values that indicate the services accessible with this SAS. Please refer to {@link AccountSASServices} to
     * construct this value.
     */
    services: string;
    /**
     * The values that indicate the resource types accessible with this SAS. Please refer
     * to {@link AccountSASResourceTypes} to construct this value.
     */
    resourceTypes: string;
    /**
     * Optional. Encryption scope to use when sending requests authorized with this SAS URI.
     */
    encryptionScope?: string;
}
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Generates a {@link SASQueryParameters} object which contains all SAS query parameters needed to make an actual
 * REST request.
 *
 * @see https://learn.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
 *
 * @param accountSASSignatureValues -
 * @param sharedKeyCredential -
 */
export declare function generateAccountSASQueryParameters(accountSASSignatureValues: AccountSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
export declare function generateAccountSASQueryParametersInternal(accountSASSignatureValues: AccountSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): {
    sasQueryParameters: SASQueryParameters;
    stringToSign: string;
};
//# sourceMappingURL=AccountSASSignatureValues.d.ts.map