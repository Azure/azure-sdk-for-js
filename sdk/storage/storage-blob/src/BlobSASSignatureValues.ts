// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { BlobSASPermissions } from "./BlobSASPermissions";
import { ContainerSASPermissions } from "./ContainerSASPermissions";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { SasIPRange, ipRangeToString } from "./SasIPRange";
import { SASProtocol } from "./SASQueryParameters";
import { SASQueryParameters } from "./SASQueryParameters";
import { UserDelegationKeyCredential } from "./credentials/UserDelegationKeyCredential";
import { UserDelegationKey } from "./BlobServiceClient";
import { SERVICE_VERSION } from "./utils/constants";
import { truncatedISO8061Date } from "./utils/utils.common";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * BlobSASSignatureValues is used to help generating Blob service SAS tokens for containers or blobs.
 *
 * @export
 * @class BlobSASSignatureValues
 */
export interface BlobSASSignatureValues {
  /**
   * The version of the service this SAS will target. If not specified, it will default to the version targeted by the
   * library.
   *
   * @type {string}
   * @memberof BlobSASSignatureValues
   */
  version?: string;

  /**
   * Optional. SAS protocols, HTTPS only or HTTPSandHTTP
   *
   * @type {SASProtocol}
   * @memberof BlobSASSignatureValues
   */
  protocol?: SASProtocol;

  /**
   * Optional. When the SAS will take effect.
   *
   * @type {Date}
   * @memberof BlobSASSignatureValues
   */
  startsOn?: Date;

  /**
   * Optional only when identifier is provided. The time after which the SAS will no longer work.
   *
   * @type {Date}
   * @memberof BlobSASSignatureValues
   */
  expiresOn?: Date;

  /**
   * Optional only when identifier is provided.
   * Please refer to either {@link ContainerSASPermissions} or {@link BlobSASPermissions} depending on the resource
   * being accessed for help constructing the permissions string.
   *
   * @type {BlobSASPermissions | ContainerSASPermissions}
   * @memberof BlobSASSignatureValues
   */
  permissions?: BlobSASPermissions | ContainerSASPermissions;

  /**
   * Optional. IP ranges allowed in this SAS.
   *
   * @type {SasIPRange}
   * @memberof BlobSASSignatureValues
   */
  ipRange?: SasIPRange;

  /**
   * The name of the container the SAS user may access.
   *
   * @type {string}
   * @memberof BlobSASSignatureValues
   */
  containerName: string;

  /**
   * Optional. The blob name of the SAS user may access. Required if snapshotTime or versionId is provided.
   *
   * @type {string}
   * @memberof BlobSASSignatureValues
   */
  blobName?: string;

  /**
   * Optional. Snapshot timestamp string the SAS user may access. Only supported from API version 2018-11-09.
   *
   * @type {string}
   * @memberof BlobSASSignatureValues
   */
  snapshotTime?: string;

  /**
   * Optional. VersionId of the blob version the SAS user may access. Only supported from API version 2019-10-10.
   *
   * @type {string}
   * @memberof BlobSASSignatureValues
   */
  versionId?: string;

  /**
   * Optional. The name of the access policy on the container this SAS references if any.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
   *
   * @type {string}
   * @memberof BlobSASSignatureValues
   */
  identifier?: string;

  /**
   * Optional. The cache-control header for the SAS.
   *
   * @type {string}
   * @memberof BlobSASSignatureValues
   */
  cacheControl?: string;

  /**
   * Optional. The content-disposition header for the SAS.
   *
   * @type {string}
   * @memberof BlobSASSignatureValues
   */
  contentDisposition?: string;

  /**
   * Optional. The content-encoding header for the SAS.
   *
   * @type {string}
   * @memberof BlobSASSignatureValues
   */
  contentEncoding?: string;

  /**
   * Optional. The content-language header for the SAS.
   *
   * @type {string}
   * @memberof BlobSASSignatureValues
   */
  contentLanguage?: string;

  /**
   * Optional. The content-type header for the SAS.
   *
   * @type {string}
   * @memberof BlobSASSignatureValues
   */
  contentType?: string;
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
 * ```js
 * // Generate service level SAS for a container
 * const containerSAS = generateBlobSASQueryParameters({
 *     containerName, // Required
 *     permissions: ContainerSASPermissions.parse("racwdl"), // Required
 *     startsOn: new Date(), // Required
 *     expiresOn: new Date(new Date().valueOf() + 86400), // Optional. Date type
 *     ipRange: { start: "0.0.0.0", end: "255.255.255.255" }, // Optional
 *     protocol: SASProtocol.HttpsAndHttp, // Optional
 *     version: "2016-05-31" // Optional
 *   },
 *   sharedKeyCredential // StorageSharedKeyCredential - `new StorageSharedKeyCredential(account, accountKey)`
 * ).toString();
 * ```
 *
 * Example using an identifier:
 *
 * ```js
 * // Generate service level SAS for a container with identifier
 * // startsOn & permissions are optional when identifier is provided
 * const identifier = "unique-id";
 * await containerClient.setAccessPolicy(undefined, [
 *   {
 *     accessPolicy: {
 *       expiresOn: new Date(new Date().valueOf() + 86400), // Date type
 *       permissions: ContainerSASPermissions.parse("racwdl").toString(),
 *       startsOn: new Date() // Date type
 *     },
 *     id: identifier
 *   }
 * ]);
 *
 * const containerSAS = generateBlobSASQueryParameters(
 *   {
 *     containerName, // Required
 *     identifier // Required
 *   },
 *   sharedKeyCredential // StorageSharedKeyCredential - `new StorageSharedKeyCredential(account, accountKey)`
 * ).toString();
 * ```
 *
 * Example using a blob name:
 *
 * ```js
 * // Generate service level SAS for a blob
 * const blobSAS = generateBlobSASQueryParameters({
 *     containerName, // Required
 *     blobName, // Required
 *     permissions: BlobSASPermissions.parse("racwd"), // Required
 *     startsOn: new Date(), // Required
 *     expiresOn: new Date(new Date().valueOf() + 86400), // Optional. Date type
 *     cacheControl: "cache-control-override", // Optional
 *     contentDisposition: "content-disposition-override", // Optional
 *     contentEncoding: "content-encoding-override", // Optional
 *     contentLanguage: "content-language-override", // Optional
 *     contentType: "content-type-override", // Optional
 *     ipRange: { start: "0.0.0.0", end: "255.255.255.255" }, // Optional
 *     protocol: SASProtocol.HttpsAndHttp, // Optional
 *     version: "2016-05-31" // Optional
 *   },
 *   sharedKeyCredential // StorageSharedKeyCredential - `new StorageSharedKeyCredential(account, accountKey)`
 * ).toString();
 * ```
 *
 * @export
 * @param {BlobSASSignatureValues} blobSASSignatureValues
 * @param {StorageSharedKeyCredential} sharedKeyCredential
 * @returns {SASQueryParameters}
 */
export function generateBlobSASQueryParameters(
  blobSASSignatureValues: BlobSASSignatureValues,
  sharedKeyCredential: StorageSharedKeyCredential
): SASQueryParameters;

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Creates an instance of SASQueryParameters.
 * WARNING: identifier will be ignored when generating user delegation SAS, permissions and expiresOn are required.
 *
 * Example usage:
 *
 * ```js
 * // Generate user delegation SAS for a container
 * const userDelegationKey = await blobServiceClient.getUserDelegationKey(startsOn, expiresOn);
 * const containerSAS = generateBlobSASQueryParameters({
 *     containerName, // Required
 *     permissions: ContainerSASPermissions.parse("racwdl"), // Required
 *     startsOn, // Required. Date type
 *     expiresOn, // Optional. Date type
 *     ipRange: { start: "0.0.0.0", end: "255.255.255.255" }, // Optional
 *     protocol: SASProtocol.HttpsAndHttp, // Optional
 *     version: "2018-11-09" // Must >= 2018-11-09 to generate user delegation SAS
 *   },
 *   userDelegationKey, // UserDelegationKey
 *   accountName
 * ).toString();
 * ```
 *
 * @export
 * @param {BlobSASSignatureValues} blobSASSignatureValues
 * @param {UserDelegationKey} userDelegationKey Return value of `blobServiceClient.getUserDelegationKey()`
 * @param {string} accountName
 * @returns {SASQueryParameters}
 */
export function generateBlobSASQueryParameters(
  blobSASSignatureValues: BlobSASSignatureValues,
  userDelegationKey: UserDelegationKey,
  accountName: string
): SASQueryParameters;

export function generateBlobSASQueryParameters(
  blobSASSignatureValues: BlobSASSignatureValues,
  sharedKeyCredentialOrUserDelegationKey: StorageSharedKeyCredential | UserDelegationKey,
  accountName?: string
): SASQueryParameters {
  const version = blobSASSignatureValues.version ? blobSASSignatureValues.version : SERVICE_VERSION;

  const sharedKeyCredential =
    sharedKeyCredentialOrUserDelegationKey instanceof StorageSharedKeyCredential
      ? sharedKeyCredentialOrUserDelegationKey
      : undefined;
  let userDelegationKeyCredential: UserDelegationKeyCredential | undefined;

  if (sharedKeyCredential === undefined && accountName !== undefined) {
    userDelegationKeyCredential = new UserDelegationKeyCredential(
      accountName,
      sharedKeyCredentialOrUserDelegationKey as UserDelegationKey
    );
  }

  if (sharedKeyCredential === undefined && userDelegationKeyCredential === undefined) {
    throw TypeError("Invalid sharedKeyCredential, userDelegationKey or accountName.");
  }

  // Version 2019-12-12 adds support for the blob tags permission.
  // Version 2018-11-09 adds support for the signed resource and signed blob snapshot time fields.
  // https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas#constructing-the-signature-string
  if (version >= "2018-11-09") {
    if (sharedKeyCredential !== undefined) {
      return generateBlobSASQueryParameters20181109(blobSASSignatureValues, sharedKeyCredential);
    } else {
      return generateBlobSASQueryParametersUDK20181109(
        blobSASSignatureValues,
        userDelegationKeyCredential!
      );
    }
  }

  if (version >= "2015-04-05") {
    if (sharedKeyCredential !== undefined) {
      return generateBlobSASQueryParameters20150405(blobSASSignatureValues, sharedKeyCredential);
    } else {
      throw new RangeError(
        "'version' must be >= '2018-11-09' when generating user delegation SAS using user delegation key."
      );
    }
  }

  throw new RangeError("'version' must be >= '2015-04-05'.");
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 * IMPLEMENTATION FOR API VERSION FROM 2015-04-05 AND BEFORE 2018-11-09.
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
 * @param {BlobSASSignatureValues} blobSASSignatureValues
 * @param {StorageSharedKeyCredential} sharedKeyCredential
 * @returns {SASQueryParameters}
 */
function generateBlobSASQueryParameters20150405(
  blobSASSignatureValues: BlobSASSignatureValues,
  sharedKeyCredential: StorageSharedKeyCredential
): SASQueryParameters {
  if (
    !blobSASSignatureValues.identifier &&
    !blobSASSignatureValues.permissions &&
    !blobSASSignatureValues.expiresOn
  ) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiresOn' for Blob SAS generation when 'identifier' is not provided."
    );
  }

  const version = blobSASSignatureValues.version ? blobSASSignatureValues.version : SERVICE_VERSION;
  let resource: string = "c";
  let verifiedPermissions: string | undefined;

  if (blobSASSignatureValues.snapshotTime) {
    throw RangeError("'version' must be >= '2018-11-09' when provided 'snapshotTime'.");
  }

  if (blobSASSignatureValues.versionId) {
    throw RangeError("'version' must be >= '2019-10-10' when provided 'versionId'.");
  }
  if (
    blobSASSignatureValues.permissions &&
    blobSASSignatureValues.permissions.deleteVersion &&
    version < "2019-10-10"
  ) {
    throw RangeError("'version' must be >= '2019-10-10' when provided 'x' permission.");
  }

  if (
    blobSASSignatureValues.permissions &&
    blobSASSignatureValues.permissions.tag &&
    version < "2019-12-12"
  ) {
    throw RangeError("'version' must be >= '2019-12-12' when provided 't' permission.");
  }

  if (blobSASSignatureValues.blobName) {
    resource = "b";
  }

  // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
  if (blobSASSignatureValues.permissions) {
    if (blobSASSignatureValues.blobName) {
      verifiedPermissions = BlobSASPermissions.parse(
        blobSASSignatureValues.permissions.toString()
      ).toString();
    } else {
      verifiedPermissions = ContainerSASPermissions.parse(
        blobSASSignatureValues.permissions.toString()
      ).toString();
    }
  }

  // Signature is generated on the un-url-encoded values.
  const stringToSign = [
    verifiedPermissions ? verifiedPermissions : "",
    blobSASSignatureValues.startsOn
      ? truncatedISO8061Date(blobSASSignatureValues.startsOn, false)
      : "",
    blobSASSignatureValues.expiresOn
      ? truncatedISO8061Date(blobSASSignatureValues.expiresOn, false)
      : "",
    getCanonicalName(
      sharedKeyCredential.accountName,
      blobSASSignatureValues.containerName,
      blobSASSignatureValues.blobName
    ),
    blobSASSignatureValues.identifier,
    blobSASSignatureValues.ipRange ? ipRangeToString(blobSASSignatureValues.ipRange) : "",
    blobSASSignatureValues.protocol ? blobSASSignatureValues.protocol : "",
    version,
    blobSASSignatureValues.cacheControl ? blobSASSignatureValues.cacheControl : "",
    blobSASSignatureValues.contentDisposition ? blobSASSignatureValues.contentDisposition : "",
    blobSASSignatureValues.contentEncoding ? blobSASSignatureValues.contentEncoding : "",
    blobSASSignatureValues.contentLanguage ? blobSASSignatureValues.contentLanguage : "",
    blobSASSignatureValues.contentType ? blobSASSignatureValues.contentType : ""
  ].join("\n");

  const signature = sharedKeyCredential.computeHMACSHA256(stringToSign);

  return new SASQueryParameters(
    version,
    signature,
    verifiedPermissions,
    undefined,
    undefined,
    blobSASSignatureValues.protocol,
    blobSASSignatureValues.startsOn,
    blobSASSignatureValues.expiresOn,
    blobSASSignatureValues.ipRange,
    blobSASSignatureValues.identifier,
    resource,
    blobSASSignatureValues.cacheControl,
    blobSASSignatureValues.contentDisposition,
    blobSASSignatureValues.contentEncoding,
    blobSASSignatureValues.contentLanguage,
    blobSASSignatureValues.contentType
  );
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 * IMPLEMENTATION FOR API VERSION FROM 2018-11-09.
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
 * @param {BlobSASSignatureValues} blobSASSignatureValues
 * @param {StorageSharedKeyCredential} sharedKeyCredential
 * @returns {SASQueryParameters}
 */
function generateBlobSASQueryParameters20181109(
  blobSASSignatureValues: BlobSASSignatureValues,
  sharedKeyCredential: StorageSharedKeyCredential
): SASQueryParameters {
  if (
    !blobSASSignatureValues.identifier &&
    !blobSASSignatureValues.permissions &&
    !blobSASSignatureValues.expiresOn
  ) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiresOn' for Blob SAS generation when 'identifier' is not provided."
    );
  }

  const version = blobSASSignatureValues.version ? blobSASSignatureValues.version : SERVICE_VERSION;
  let resource: string = "c";
  let verifiedPermissions: string | undefined;

  if (blobSASSignatureValues.versionId && version < "2019-10-10") {
    throw RangeError("'version' must be >= '2019-10-10' when provided 'versionId'.");
  }
  if (
    blobSASSignatureValues.permissions &&
    blobSASSignatureValues.permissions.deleteVersion &&
    version < "2019-10-10"
  ) {
    throw RangeError("'version' must be >= '2019-10-10' when provided 'x' permission.");
  }

  if (
    blobSASSignatureValues.permissions &&
    blobSASSignatureValues.permissions.tag &&
    version < "2019-12-12"
  ) {
    throw RangeError("'version' must be >= '2019-12-12' when provided 't' permission.");
  }

  if (blobSASSignatureValues.blobName === undefined && blobSASSignatureValues.snapshotTime) {
    throw RangeError("Must provide 'blobName' when provided 'snapshotTime'.");
  }

  if (blobSASSignatureValues.blobName === undefined && blobSASSignatureValues.versionId) {
    throw RangeError("Must provide 'blobName' when provided 'versionId'.");
  }

  let timestamp = blobSASSignatureValues.snapshotTime;
  if (blobSASSignatureValues.blobName) {
    resource = "b";
    if (blobSASSignatureValues.snapshotTime) {
      resource = "bs";
    } else if (blobSASSignatureValues.versionId) {
      resource = "bv";
      timestamp = blobSASSignatureValues.versionId;
    }
  }

  // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
  if (blobSASSignatureValues.permissions) {
    if (blobSASSignatureValues.blobName) {
      verifiedPermissions = BlobSASPermissions.parse(
        blobSASSignatureValues.permissions.toString()
      ).toString();
    } else {
      verifiedPermissions = ContainerSASPermissions.parse(
        blobSASSignatureValues.permissions.toString()
      ).toString();
    }
  }

  // Signature is generated on the un-url-encoded values.
  const stringToSign = [
    verifiedPermissions ? verifiedPermissions : "",
    blobSASSignatureValues.startsOn
      ? truncatedISO8061Date(blobSASSignatureValues.startsOn, false)
      : "",
    blobSASSignatureValues.expiresOn
      ? truncatedISO8061Date(blobSASSignatureValues.expiresOn, false)
      : "",
    getCanonicalName(
      sharedKeyCredential.accountName,
      blobSASSignatureValues.containerName,
      blobSASSignatureValues.blobName
    ),
    blobSASSignatureValues.identifier,
    blobSASSignatureValues.ipRange ? ipRangeToString(blobSASSignatureValues.ipRange) : "",
    blobSASSignatureValues.protocol ? blobSASSignatureValues.protocol : "",
    version,
    resource,
    timestamp,
    blobSASSignatureValues.cacheControl ? blobSASSignatureValues.cacheControl : "",
    blobSASSignatureValues.contentDisposition ? blobSASSignatureValues.contentDisposition : "",
    blobSASSignatureValues.contentEncoding ? blobSASSignatureValues.contentEncoding : "",
    blobSASSignatureValues.contentLanguage ? blobSASSignatureValues.contentLanguage : "",
    blobSASSignatureValues.contentType ? blobSASSignatureValues.contentType : ""
  ].join("\n");

  const signature = sharedKeyCredential.computeHMACSHA256(stringToSign);

  return new SASQueryParameters(
    version,
    signature,
    verifiedPermissions,
    undefined,
    undefined,
    blobSASSignatureValues.protocol,
    blobSASSignatureValues.startsOn,
    blobSASSignatureValues.expiresOn,
    blobSASSignatureValues.ipRange,
    blobSASSignatureValues.identifier,
    resource,
    blobSASSignatureValues.cacheControl,
    blobSASSignatureValues.contentDisposition,
    blobSASSignatureValues.contentEncoding,
    blobSASSignatureValues.contentLanguage,
    blobSASSignatureValues.contentType
  );
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 * IMPLEMENTATION FOR API VERSION FROM 2018-11-09.
 *
 * Creates an instance of SASQueryParameters.
 *
 * Only accepts required settings needed to create a SAS. For optional settings please
 * set corresponding properties directly, such as permissions, startsOn and identifier.
 *
 * WARNING: identifier will be ignored, permissions and expiresOn are required.
 *
 * @param {BlobSASSignatureValues} blobSASSignatureValues
 * @param {UserDelegationKeyCredential} userDelegationKeyCredential
 * @returns {SASQueryParameters}
 */
function generateBlobSASQueryParametersUDK20181109(
  blobSASSignatureValues: BlobSASSignatureValues,
  userDelegationKeyCredential: UserDelegationKeyCredential
): SASQueryParameters {
  if (!blobSASSignatureValues.permissions || !blobSASSignatureValues.expiresOn) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiresOn' for Blob SAS generation when generating user delegation SAS."
    );
  }

  const version = blobSASSignatureValues.version ? blobSASSignatureValues.version : SERVICE_VERSION;

  if (blobSASSignatureValues.versionId && version < "2019-10-10") {
    throw RangeError("'version' must be >= '2019-10-10' when provided 'versionId'.");
  }
  if (
    blobSASSignatureValues.permissions &&
    blobSASSignatureValues.permissions.deleteVersion &&
    version < "2019-10-10"
  ) {
    throw RangeError("'version' must be >= '2019-10-10' when provided 'x' permission.");
  }

  if (
    blobSASSignatureValues.permissions &&
    blobSASSignatureValues.permissions.tag &&
    version < "2019-12-12"
  ) {
    throw RangeError("'version' must be >= '2019-12-12' when provided 't' permission.");
  }

  let resource: string = "c";
  let verifiedPermissions: string | undefined;

  if (blobSASSignatureValues.blobName === undefined && blobSASSignatureValues.snapshotTime) {
    throw RangeError("Must provide 'blobName' when provided 'snapshotTime'.");
  }

  if (blobSASSignatureValues.blobName === undefined && blobSASSignatureValues.versionId) {
    throw RangeError("Must provide 'blobName' when provided 'versionId'.");
  }

  let timestamp = blobSASSignatureValues.snapshotTime;
  if (blobSASSignatureValues.blobName) {
    resource = "b";
    if (blobSASSignatureValues.snapshotTime) {
      resource = "bs";
    } else if (blobSASSignatureValues.versionId) {
      resource = "bv";
      timestamp = blobSASSignatureValues.versionId;
    }
  }

  // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
  if (blobSASSignatureValues.permissions) {
    if (blobSASSignatureValues.blobName) {
      verifiedPermissions = BlobSASPermissions.parse(
        blobSASSignatureValues.permissions.toString()
      ).toString();
    } else {
      verifiedPermissions = ContainerSASPermissions.parse(
        blobSASSignatureValues.permissions.toString()
      ).toString();
    }
  }

  // Signature is generated on the un-url-encoded values.
  const stringToSign = [
    verifiedPermissions ? verifiedPermissions : "",
    blobSASSignatureValues.startsOn
      ? truncatedISO8061Date(blobSASSignatureValues.startsOn, false)
      : "",
    blobSASSignatureValues.expiresOn
      ? truncatedISO8061Date(blobSASSignatureValues.expiresOn, false)
      : "",
    getCanonicalName(
      userDelegationKeyCredential.accountName,
      blobSASSignatureValues.containerName,
      blobSASSignatureValues.blobName
    ),
    userDelegationKeyCredential.userDelegationKey.signedObjectId,
    userDelegationKeyCredential.userDelegationKey.signedTenantId,
    userDelegationKeyCredential.userDelegationKey.signedStartsOn
      ? truncatedISO8061Date(userDelegationKeyCredential.userDelegationKey.signedStartsOn, false)
      : "",
    userDelegationKeyCredential.userDelegationKey.signedExpiresOn
      ? truncatedISO8061Date(userDelegationKeyCredential.userDelegationKey.signedExpiresOn, false)
      : "",
    userDelegationKeyCredential.userDelegationKey.signedService,
    userDelegationKeyCredential.userDelegationKey.signedVersion,
    blobSASSignatureValues.ipRange ? ipRangeToString(blobSASSignatureValues.ipRange) : "",
    blobSASSignatureValues.protocol ? blobSASSignatureValues.protocol : "",
    version,
    resource,
    timestamp,
    blobSASSignatureValues.cacheControl,
    blobSASSignatureValues.contentDisposition,
    blobSASSignatureValues.contentEncoding,
    blobSASSignatureValues.contentLanguage,
    blobSASSignatureValues.contentType
  ].join("\n");

  const signature = userDelegationKeyCredential.computeHMACSHA256(stringToSign);

  return new SASQueryParameters(
    version,
    signature,
    verifiedPermissions,
    undefined,
    undefined,
    blobSASSignatureValues.protocol,
    blobSASSignatureValues.startsOn,
    blobSASSignatureValues.expiresOn,
    blobSASSignatureValues.ipRange,
    blobSASSignatureValues.identifier,
    resource,
    blobSASSignatureValues.cacheControl,
    blobSASSignatureValues.contentDisposition,
    blobSASSignatureValues.contentEncoding,
    blobSASSignatureValues.contentLanguage,
    blobSASSignatureValues.contentType,
    userDelegationKeyCredential.userDelegationKey
  );
}

function getCanonicalName(accountName: string, containerName: string, blobName?: string): string {
  // Container: "/blob/account/containerName"
  // Blob:      "/blob/account/containerName/blobName"
  const elements: string[] = [`/blob/${accountName}/${containerName}`];
  if (blobName) {
    elements.push(`/${blobName}`);
  }
  return elements.join("");
}
