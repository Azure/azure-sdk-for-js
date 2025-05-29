import { QueueSASPermissions } from "./QueueSASPermissions.js";
import type { StorageSharedKeyCredential } from "@azure/storage-blob";
import type { SasIPRange } from "./SasIPRange.js";
import type { SASProtocol } from "./SASQueryParameters.js";
import { SASQueryParameters } from "./SASQueryParameters.js";
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * QueueSASSignatureValues is used to help generating Queue service SAS tokens for queues.
 */
export interface QueueSASSignatureValues {
    /**
     * The version of the service this SAS will target. If not specified, it will default to the version targeted by the
     * library.
     */
    version?: string;
    /**
     * Optional. SAS protocols, HTTPS only or HTTPSandHTTP
     */
    protocol?: SASProtocol;
    /**
     * Optional. When the SAS will take effect.
     */
    startsOn?: Date;
    /**
     * Optional only when identifier is provided. The time after which the SAS will no longer work.
     */
    expiresOn?: Date;
    /**
     * Optional only when identifier is provided.
     * Please refer to {@link QueueSASPermissions}
     * being accessed for help constructing the permissions string.
     */
    permissions?: QueueSASPermissions;
    /**
     * Optional. IP ranges allowed in this SAS.
     */
    ipRange?: SasIPRange;
    /**
     * The name of the queue the SAS user may access.
     */
    queueName: string;
    /**
     * Optional. The name of the access policy on the queue this SAS references if any.
     *
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
     */
    identifier?: string;
}
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Creates an instance of SASQueryParameters.
 *
 * Only accepts required settings needed to create a SAS. For optional settings please
 * set corresponding properties directly, such as permissions, startsOn and identifier.
 *
 * WARNING: When identifier is not provided, permissions and expiresOn are required.
 * You MUST assign value to identifier or expiresOn & permissions manually if you initial with
 * this constructor.
 *
 * @param queueSASSignatureValues -
 * @param sharedKeyCredential -
 */
export declare function generateQueueSASQueryParameters(queueSASSignatureValues: QueueSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
export declare function generateQueueSASQueryParametersInternal(queueSASSignatureValues: QueueSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): {
    sasQueryParameters: SASQueryParameters;
    stringToSign: string;
};
//# sourceMappingURL=QueueSASSignatureValues.d.ts.map