import { BlobSASPermissions } from "./BlobSASPermissions.js";
import type { UserDelegationKey } from "../BlobServiceClient.js";
import { ContainerSASPermissions } from "./ContainerSASPermissions.js";
import { StorageSharedKeyCredential } from "../credentials/StorageSharedKeyCredential.js";
import type { SasIPRange } from "./SasIPRange.js";
import type { SASProtocol } from "./SASQueryParameters.js";
import { SASQueryParameters } from "./SASQueryParameters.js";
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * BlobSASSignatureValues is used to help generating Blob service SAS tokens for containers or blobs.
 */
export interface BlobSASSignatureValues {
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
     * Please refer to either {@link ContainerSASPermissions} or {@link BlobSASPermissions} depending on the resource
     * being accessed for help constructing the permissions string.
     */
    permissions?: BlobSASPermissions | ContainerSASPermissions;
    /**
     * Optional. IP ranges allowed in this SAS.
     */
    ipRange?: SasIPRange;
    /**
     * The name of the container the SAS user may access.
     */
    containerName: string;
    /**
     * Optional. The blob name of the SAS user may access. Required if snapshotTime or versionId is provided.
     */
    blobName?: string;
    /**
     * Optional. Snapshot timestamp string the SAS user may access. Only supported from API version 2018-11-09.
     */
    snapshotTime?: string;
    /**
     * Optional. VersionId of the blob version the SAS user may access. Only supported from API version 2019-10-10.
     */
    versionId?: string;
    /**
     * Optional. The name of the access policy on the container this SAS references if any.
     *
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
     */
    identifier?: string;
    /**
     * Optional. Encryption scope to use when sending requests authorized with this SAS URI.
     */
    encryptionScope?: string;
    /**
     * Optional. The cache-control header for the SAS.
     */
    cacheControl?: string;
    /**
     * Optional. The content-disposition header for the SAS.
     */
    contentDisposition?: string;
    /**
     * Optional. The content-encoding header for the SAS.
     */
    contentEncoding?: string;
    /**
     * Optional. The content-language header for the SAS.
     */
    contentLanguage?: string;
    /**
     * Optional. The content-type header for the SAS.
     */
    contentType?: string;
    /**
     * Optional. Beginning in version 2020-02-10, specifies the Authorized AAD Object ID in GUID format. The AAD Object ID of a user
     * authorized by the owner of the user delegation key to perform the action granted by the SAS. The Azure Storage service will
     * ensure that the owner of the user delegation key has the required permissions before granting access but no additional permission
     * check for the user specified in this value will be performed. This is only used for User Delegation SAS.
     */
    preauthorizedAgentObjectId?: string;
    /**
     * Optional. Beginning in version 2020-02-10, this is a GUID value that will be logged in the storage diagnostic logs and can be used to
     * correlate SAS generation with storage resource access. This is only used for User Delegation SAS.
     */
    correlationId?: string;
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
 * Fill in the required details before running the following snippets.
 *
 * Example usage:
 *
 * ```ts snippet:GenerateBlobSASQueryParameters
 * import {
 *   StorageSharedKeyCredential,
 *   generateBlobSASQueryParameters,
 *   ContainerSASPermissions,
 *   SASProtocol,
 * } from "@azure/storage-blob";
 *
 * const account = "<account>";
 * const accountKey = "<accountkey>";
 * const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
 * const containerName = "<container name>";
 *
 * // Generate service level SAS for a container
 * const containerSAS = generateBlobSASQueryParameters(
 *   {
 *     containerName, // Required
 *     permissions: ContainerSASPermissions.parse("racwdl"), // Required
 *     startsOn: new Date(), // Optional
 *     expiresOn: new Date(new Date().valueOf() + 86400 * 1000), // Required. Date type
 *     ipRange: { start: "0.0.0.0", end: "255.255.255.255" }, // Optional
 *     protocol: SASProtocol.HttpsAndHttp, // Optional
 *     version: "2016-05-31", // Optional
 *   },
 *   sharedKeyCredential,
 * ).toString();
 * ```
 *
 * Example using an identifier:
 *
 * ```ts snippet:GenerateBlobSASQueryParametersWithIdentifier
 * import {
 *   StorageSharedKeyCredential,
 *   BlobServiceClient,
 *   ContainerSASPermissions,
 *   generateBlobSASQueryParameters,
 * } from "@azure/storage-blob";
 *
 * const account = "<account>";
 * const accountKey = "<accountkey>";
 * const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
 * const blobServiceClient = new BlobServiceClient(
 *   `https://${account}.blob.core.windows.net`,
 *   sharedKeyCredential,
 * );
 *
 * const containerName = "<container name>";
 * const containerClient = blobServiceClient.getContainerClient(containerName);
 *
 * // Generate service level SAS for a container with identifier
 * // startsOn & permissions are optional when identifier is provided
 * const identifier = "unique-id";
 * await containerClient.setAccessPolicy(undefined, [
 *   {
 *     accessPolicy: {
 *       expiresOn: new Date(new Date().valueOf() + 86400 * 1000), // Date type
 *       permissions: ContainerSASPermissions.parse("racwdl").toString(),
 *       startsOn: new Date(), // Date type
 *     },
 *     id: identifier,
 *   },
 * ]);
 *
 * const containerSAS = generateBlobSASQueryParameters(
 *   {
 *     containerName, // Required
 *     identifier, // Required
 *   },
 *   sharedKeyCredential,
 * ).toString();
 * ```
 *
 * Example using a blob name:
 *
 * ```ts snippet:GenerateBlobSASQueryParametersWithBlobName
 * import {
 *   StorageSharedKeyCredential,
 *   generateBlobSASQueryParameters,
 *   BlobSASPermissions,
 *   SASProtocol,
 * } from "@azure/storage-blob";
 *
 * const account = "<account>";
 * const accountKey = "<accountkey>";
 * const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
 *
 * const containerName = "<container name>";
 * const blobName = "<blob name>";
 *
 * // Generate service level SAS for a blob
 * const blobSAS = generateBlobSASQueryParameters(
 *   {
 *     containerName, // Required
 *     blobName, // Required
 *     permissions: BlobSASPermissions.parse("racwd"), // Required
 *     startsOn: new Date(), // Optional
 *     expiresOn: new Date(new Date().valueOf() + 86400 * 1000), // Required. Date type
 *     cacheControl: "cache-control-override", // Optional
 *     contentDisposition: "content-disposition-override", // Optional
 *     contentEncoding: "content-encoding-override", // Optional
 *     contentLanguage: "content-language-override", // Optional
 *     contentType: "content-type-override", // Optional
 *     ipRange: { start: "0.0.0.0", end: "255.255.255.255" }, // Optional
 *     protocol: SASProtocol.HttpsAndHttp, // Optional
 *     version: "2016-05-31", // Optional
 *   },
 *   sharedKeyCredential,
 * ).toString();
 * ```
 *
 * @param blobSASSignatureValues -
 * @param sharedKeyCredential -
 */
export declare function generateBlobSASQueryParameters(blobSASSignatureValues: BlobSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Creates an instance of SASQueryParameters.
 * WARNING: identifier will be ignored when generating user delegation SAS, permissions and expiresOn are required.
 *
 * Example usage:
 *
 * ```ts snippet:GenerateBlobSASQueryParametersWithUserDelegationKey
 * import {
 *   BlobServiceClient,
 *   generateBlobSASQueryParameters,
 *   ContainerSASPermissions,
 *   SASProtocol,
 * } from "@azure/storage-blob";
 * import { DefaultAzureCredential } from "@azure/identity";
 *
 * const account = "<account>";
 * const blobServiceClient = new BlobServiceClient(
 *   `https://${account}.blob.core.windows.net`,
 *   new DefaultAzureCredential(),
 * );
 *
 * const containerName = "<container name>";
 * const accountName = "<account name>";
 * const startsOn = new Date();
 * const expiresOn = new Date(new Date().valueOf() + 86400 * 1000);
 *
 * // Generate user delegation SAS for a container
 * const userDelegationKey = await blobServiceClient.getUserDelegationKey(startsOn, expiresOn);
 * const containerSAS = generateBlobSASQueryParameters(
 *   {
 *     containerName, // Required
 *     permissions: ContainerSASPermissions.parse("racwdl"), // Required
 *     startsOn, // Optional. Date type
 *     expiresOn, // Required. Date type
 *     ipRange: { start: "0.0.0.0", end: "255.255.255.255" }, // Optional
 *     protocol: SASProtocol.HttpsAndHttp, // Optional
 *     version: "2018-11-09", // Must greater than or equal to 2018-11-09 to generate user delegation SAS
 *   },
 *   userDelegationKey, // UserDelegationKey
 *   accountName,
 * ).toString();
 * ```
 *
 * @param blobSASSignatureValues -
 * @param userDelegationKey - Return value of `blobServiceClient.getUserDelegationKey()`
 * @param accountName -
 */
export declare function generateBlobSASQueryParameters(blobSASSignatureValues: BlobSASSignatureValues, userDelegationKey: UserDelegationKey, accountName: string): SASQueryParameters;
export declare function generateBlobSASQueryParametersInternal(blobSASSignatureValues: BlobSASSignatureValues, sharedKeyCredentialOrUserDelegationKey: StorageSharedKeyCredential | UserDelegationKey, accountName?: string): {
    sasQueryParameters: SASQueryParameters;
    stringToSign: string;
};
//# sourceMappingURL=BlobSASSignatureValues.d.ts.map