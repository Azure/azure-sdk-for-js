// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { DataLakeSASPermissions } from "./DataLakeSASPermissions";
import { FileSystemSASPermissions } from "./FileSystemSASPermissions";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { SasIPRange, ipRangeToString } from "./SasIPRange";
import { SASProtocol } from "./SASQueryParameters";
import { SASQueryParameters } from "./SASQueryParameters";
import { UserDelegationKeyCredential } from "./credentials/UserDelegationKeyCredential";
import { SERVICE_VERSION } from "./utils/constants";
import { truncatedISO8061Date } from "./utils/utils.common";
import { UserDelegationKey } from "./models";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * DataLakeSASSignatureValues is used to help generating Blob and DataLake service SAS tokens for containers, blobs, filesystem, directories and files.
 *
 * @export
 * @class DataLakeSASSignatureValues
 */
export interface DataLakeSASSignatureValues {
  /**
   * The version of the service this SAS will target. If not specified, it will default to the version targeted by the
   * library.
   *
   * @type {string}
   * @memberof DataLakeSASSignatureValues
   */
  version?: string;

  /**
   * Optional. SAS protocols, HTTPS only or HTTPSandHTTP
   *
   * @type {SASProtocol}
   * @memberof DataLakeSASSignatureValues
   */
  protocol?: SASProtocol;

  /**
   * Optional. When the SAS will take effect.
   *
   * @type {Date}
   * @memberof DataLakeSASSignatureValues
   */
  startsOn?: Date;

  /**
   * Optional only when identifier is provided. The time after which the SAS will no longer work.
   *
   * @type {Date}
   * @memberof DataLakeSASSignatureValues
   */
  expiresOn?: Date;

  /**
   * Optional only when identifier is provided.
   * Please refer to either {@link ContainerSASPermissions} or {@link BlobSASPermissions} depending on the resource
   * being accessed for help constructing the permissions string.
   *
   * @type {DataLakeSASPermissions}
   * @memberof DataLakeSASSignatureValues
   */
  permissions?: DataLakeSASPermissions;

  /**
   * Optional. IP ranges allowed in this SAS.
   *
   * @type {SasIPRange}
   * @memberof DataLakeSASSignatureValues
   */
  ipRange?: SasIPRange;

  /**
   * The name of the file system the SAS user may access.
   *
   * @type {string}
   * @memberof DataLakeSASSignatureValues
   */
  fileSystemName: string;

  /**
   * Optional. The path name of the directory or file SAS user may access. Required if snapshotTime is provided.
   *
   * @type {string}
   * @memberof DataLakeSASSignatureValues
   */
  pathName?: string;

  /**
   * Optional. Snapshot timestamp string the SAS user may access. Only supported from API version 2018-11-09.
   *
   * @type {string}
   * @memberof IBlobSASSignatureValues
   */
  snapshotTime?: string;

  /**
   * Optional. The name of the access policy on the file system this SAS references if any.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
   *
   * @type {string}
   * @memberof DataLakeSASSignatureValues
   */
  identifier?: string;

  /**
   * Optional. The cache-control header for the SAS.
   *
   * @type {string}
   * @memberof DataLakeSASSignatureValues
   */
  cacheControl?: string;

  /**
   * Optional. The content-disposition header for the SAS.
   *
   * @type {string}
   * @memberof DataLakeSASSignatureValues
   */
  contentDisposition?: string;

  /**
   * Optional. The content-encoding header for the SAS.
   *
   * @type {string}
   * @memberof DataLakeSASSignatureValues
   */
  contentEncoding?: string;

  /**
   * Optional. The content-language header for the SAS.
   *
   * @type {string}
   * @memberof DataLakeSASSignatureValues
   */
  contentLanguage?: string;

  /**
   * Optional. The content-type header for the SAS.
   *
   * @type {string}
   * @memberof DataLakeSASSignatureValues
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
 * @example
 * ```js
 * // Generate service level SAS for a file system
 * const containerSAS = generateDataLakeSASQueryParameters({
 *     fileSystemName, // Required
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
 * // Fill in the required details before running the snippet.
 * @example
 * ```js
 * // Generate service level SAS for a file
 * const fileSAS = generateDataLakeSASQueryParameters({
 *     fileSystemName, // Required
 *     fileName, // Required
 *     permissions: DataLakeSASPermissions.parse("racwd"), // Required
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
 * @param {DataLakeSASSignatureValues} dataLakeSASSignatureValues
 * @param {StorageSharedKeyCredential} sharedKeyCredential
 * @returns {SASQueryParameters}
 */
export function generateDataLakeSASQueryParameters(
  dataLakeSASSignatureValues: DataLakeSASSignatureValues,
  sharedKeyCredential: StorageSharedKeyCredential
): SASQueryParameters;

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Creates an instance of SASQueryParameters.
 * WARNING: identifier will be ignored when generating user delegation SAS, permissions and expiresOn are required.
 *
 * @example
 * ```js
 * // Generate user delegation SAS for a file system
 * const userDelegationKey = await dataLakeServiceClient.getUserDelegationKey(startsOn, expiresOn);
 * const fileSystemSAS = generateDataLakeSASQueryParameters({
 *     fileSystemName, // Required
 *     permissions: FileSystemSASPermissions.parse("racwdl"), // Required
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
 * @param {DataLakeSASSignatureValues} dataLakeSASSignatureValues
 * @param {UserDelegationKey} userDelegationKey Return value of `blobServiceClient.getUserDelegationKey()`
 * @param {string} accountName
 * @returns {SASQueryParameters}
 */
export function generateDataLakeSASQueryParameters(
  dataLakeSASSignatureValues: DataLakeSASSignatureValues,
  userDelegationKey: UserDelegationKey,
  accountName: string
): SASQueryParameters;

export function generateDataLakeSASQueryParameters(
  dataLakeSASSignatureValues: DataLakeSASSignatureValues,
  sharedKeyCredentialOrUserDelegationKey: StorageSharedKeyCredential | UserDelegationKey,
  accountName?: string
): SASQueryParameters {
  const version = dataLakeSASSignatureValues.version
    ? dataLakeSASSignatureValues.version
    : SERVICE_VERSION;

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

  // Version 2018-11-09 adds support for the signed resource and signed blob snapshot time fields.
  // https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas#constructing-the-signature-string
  if (version >= "2018-11-09") {
    if (sharedKeyCredential !== undefined) {
      return generateBlobSASQueryParameters20181109(
        dataLakeSASSignatureValues,
        sharedKeyCredential
      );
    } else {
      return generateBlobSASQueryParametersUDK20181109(
        dataLakeSASSignatureValues,
        userDelegationKeyCredential!
      );
    }
  }

  if (version >= "2015-04-05") {
    if (sharedKeyCredential !== undefined) {
      return generateBlobSASQueryParameters20150405(
        dataLakeSASSignatureValues,
        sharedKeyCredential
      );
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
 * @param {DataLakeSASSignatureValues} dataLakeSASSignatureValues
 * @param {StorageSharedKeyCredential} sharedKeyCredential
 * @returns {SASQueryParameters}
 */
function generateBlobSASQueryParameters20150405(
  dataLakeSASSignatureValues: DataLakeSASSignatureValues,
  sharedKeyCredential: StorageSharedKeyCredential
): SASQueryParameters {
  if (
    !dataLakeSASSignatureValues.identifier &&
    !dataLakeSASSignatureValues.permissions &&
    !dataLakeSASSignatureValues.expiresOn
  ) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiresOn' for DataLake SAS generation when 'identifier' is not provided."
    );
  }

  const version = dataLakeSASSignatureValues.version
    ? dataLakeSASSignatureValues.version
    : SERVICE_VERSION;
  let resource: string = "c";
  let verifiedPermissions: string | undefined;

  if (dataLakeSASSignatureValues.snapshotTime) {
    throw RangeError("'version' must be >= '2018-11-09' when provided 'snapshotTime'.");
  }

  // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
  if (dataLakeSASSignatureValues.permissions) {
    if (dataLakeSASSignatureValues.pathName) {
      verifiedPermissions = DataLakeSASPermissions.parse(
        dataLakeSASSignatureValues.permissions.toString()
      ).toString();
      resource = "b";
    } else {
      verifiedPermissions = FileSystemSASPermissions.parse(
        dataLakeSASSignatureValues.permissions.toString()
      ).toString();
    }
  }

  // Signature is generated on the un-url-encoded values.
  const stringToSign = [
    verifiedPermissions ? verifiedPermissions : "",
    dataLakeSASSignatureValues.startsOn
      ? truncatedISO8061Date(dataLakeSASSignatureValues.startsOn, false)
      : "",
    dataLakeSASSignatureValues.expiresOn
      ? truncatedISO8061Date(dataLakeSASSignatureValues.expiresOn, false)
      : "",
    getCanonicalName(
      sharedKeyCredential.accountName,
      dataLakeSASSignatureValues.fileSystemName,
      dataLakeSASSignatureValues.pathName
    ),
    dataLakeSASSignatureValues.identifier,
    dataLakeSASSignatureValues.ipRange ? ipRangeToString(dataLakeSASSignatureValues.ipRange) : "",
    dataLakeSASSignatureValues.protocol ? dataLakeSASSignatureValues.protocol : "",
    version,
    dataLakeSASSignatureValues.cacheControl ? dataLakeSASSignatureValues.cacheControl : "",
    dataLakeSASSignatureValues.contentDisposition
      ? dataLakeSASSignatureValues.contentDisposition
      : "",
    dataLakeSASSignatureValues.contentEncoding ? dataLakeSASSignatureValues.contentEncoding : "",
    dataLakeSASSignatureValues.contentLanguage ? dataLakeSASSignatureValues.contentLanguage : "",
    dataLakeSASSignatureValues.contentType ? dataLakeSASSignatureValues.contentType : ""
  ].join("\n");

  const signature = sharedKeyCredential.computeHMACSHA256(stringToSign);

  return new SASQueryParameters(
    version,
    signature,
    verifiedPermissions,
    undefined,
    undefined,
    dataLakeSASSignatureValues.protocol,
    dataLakeSASSignatureValues.startsOn,
    dataLakeSASSignatureValues.expiresOn,
    dataLakeSASSignatureValues.ipRange,
    dataLakeSASSignatureValues.identifier,
    resource,
    dataLakeSASSignatureValues.cacheControl,
    dataLakeSASSignatureValues.contentDisposition,
    dataLakeSASSignatureValues.contentEncoding,
    dataLakeSASSignatureValues.contentLanguage,
    dataLakeSASSignatureValues.contentType
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
 * @param {DataLakeSASSignatureValues} dataLakeSASSignatureValues
 * @param {StorageSharedKeyCredential} sharedKeyCredential
 * @returns {SASQueryParameters}
 */
function generateBlobSASQueryParameters20181109(
  dataLakeSASSignatureValues: DataLakeSASSignatureValues,
  sharedKeyCredential: StorageSharedKeyCredential
): SASQueryParameters {
  if (
    !dataLakeSASSignatureValues.identifier &&
    !dataLakeSASSignatureValues.permissions &&
    !dataLakeSASSignatureValues.expiresOn
  ) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiresOn' for Blob SAS generation when 'identifier' is not provided."
    );
  }

  const version = dataLakeSASSignatureValues.version
    ? dataLakeSASSignatureValues.version
    : SERVICE_VERSION;
  let resource: string = "c";
  let verifiedPermissions: string | undefined;

  if (
    dataLakeSASSignatureValues.pathName === undefined &&
    dataLakeSASSignatureValues.snapshotTime
  ) {
    throw RangeError("Must provide 'blobName' when provided 'snapshotTime'.");
  }

  // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
  if (dataLakeSASSignatureValues.permissions) {
    if (dataLakeSASSignatureValues.pathName) {
      verifiedPermissions = DataLakeSASPermissions.parse(
        dataLakeSASSignatureValues.permissions.toString()
      ).toString();
      resource = "b";
      if (dataLakeSASSignatureValues.snapshotTime) {
        resource = "bs";
      }
    } else {
      verifiedPermissions = FileSystemSASPermissions.parse(
        dataLakeSASSignatureValues.permissions.toString()
      ).toString();
    }
  }

  // Signature is generated on the un-url-encoded values.
  const stringToSign = [
    verifiedPermissions ? verifiedPermissions : "",
    dataLakeSASSignatureValues.startsOn
      ? truncatedISO8061Date(dataLakeSASSignatureValues.startsOn, false)
      : "",
    dataLakeSASSignatureValues.expiresOn
      ? truncatedISO8061Date(dataLakeSASSignatureValues.expiresOn, false)
      : "",
    getCanonicalName(
      sharedKeyCredential.accountName,
      dataLakeSASSignatureValues.fileSystemName,
      dataLakeSASSignatureValues.pathName
    ),
    dataLakeSASSignatureValues.identifier,
    dataLakeSASSignatureValues.ipRange ? ipRangeToString(dataLakeSASSignatureValues.ipRange) : "",
    dataLakeSASSignatureValues.protocol ? dataLakeSASSignatureValues.protocol : "",
    version,
    resource,
    dataLakeSASSignatureValues.snapshotTime,
    dataLakeSASSignatureValues.cacheControl ? dataLakeSASSignatureValues.cacheControl : "",
    dataLakeSASSignatureValues.contentDisposition
      ? dataLakeSASSignatureValues.contentDisposition
      : "",
    dataLakeSASSignatureValues.contentEncoding ? dataLakeSASSignatureValues.contentEncoding : "",
    dataLakeSASSignatureValues.contentLanguage ? dataLakeSASSignatureValues.contentLanguage : "",
    dataLakeSASSignatureValues.contentType ? dataLakeSASSignatureValues.contentType : ""
  ].join("\n");

  const signature = sharedKeyCredential.computeHMACSHA256(stringToSign);

  return new SASQueryParameters(
    version,
    signature,
    verifiedPermissions,
    undefined,
    undefined,
    dataLakeSASSignatureValues.protocol,
    dataLakeSASSignatureValues.startsOn,
    dataLakeSASSignatureValues.expiresOn,
    dataLakeSASSignatureValues.ipRange,
    dataLakeSASSignatureValues.identifier,
    resource,
    dataLakeSASSignatureValues.cacheControl,
    dataLakeSASSignatureValues.contentDisposition,
    dataLakeSASSignatureValues.contentEncoding,
    dataLakeSASSignatureValues.contentLanguage,
    dataLakeSASSignatureValues.contentType
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
 * @param {DataLakeSASSignatureValues} dataLakeSASSignatureValues
 * @param {UserDelegationKeyCredential} userDelegationKeyCredential
 * @returns {SASQueryParameters}
 */
function generateBlobSASQueryParametersUDK20181109(
  dataLakeSASSignatureValues: DataLakeSASSignatureValues,
  userDelegationKeyCredential: UserDelegationKeyCredential
): SASQueryParameters {
  if (!dataLakeSASSignatureValues.permissions || !dataLakeSASSignatureValues.expiresOn) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiresOn' for Blob SAS generation when generating user delegation SAS."
    );
  }

  const version = dataLakeSASSignatureValues.version
    ? dataLakeSASSignatureValues.version
    : SERVICE_VERSION;
  let resource: string = "c";
  let verifiedPermissions: string | undefined;

  if (
    dataLakeSASSignatureValues.pathName === undefined &&
    dataLakeSASSignatureValues.snapshotTime
  ) {
    throw RangeError("Must provide 'blobName' when provided 'snapshotTime'.");
  }

  // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
  if (dataLakeSASSignatureValues.permissions) {
    if (dataLakeSASSignatureValues.pathName) {
      verifiedPermissions = DataLakeSASPermissions.parse(
        dataLakeSASSignatureValues.permissions.toString()
      ).toString();
      resource = "b";
      if (dataLakeSASSignatureValues.snapshotTime) {
        resource = "bs";
      }
    } else {
      verifiedPermissions = FileSystemSASPermissions.parse(
        dataLakeSASSignatureValues.permissions.toString()
      ).toString();
    }
  }

  // Signature is generated on the un-url-encoded values.
  const stringToSign = [
    verifiedPermissions ? verifiedPermissions : "",
    dataLakeSASSignatureValues.startsOn
      ? truncatedISO8061Date(dataLakeSASSignatureValues.startsOn, false)
      : "",
    dataLakeSASSignatureValues.expiresOn
      ? truncatedISO8061Date(dataLakeSASSignatureValues.expiresOn, false)
      : "",
    getCanonicalName(
      userDelegationKeyCredential.accountName,
      dataLakeSASSignatureValues.fileSystemName,
      dataLakeSASSignatureValues.pathName
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
    dataLakeSASSignatureValues.ipRange ? ipRangeToString(dataLakeSASSignatureValues.ipRange) : "",
    dataLakeSASSignatureValues.protocol ? dataLakeSASSignatureValues.protocol : "",
    version,
    resource,
    dataLakeSASSignatureValues.snapshotTime,
    dataLakeSASSignatureValues.cacheControl,
    dataLakeSASSignatureValues.contentDisposition,
    dataLakeSASSignatureValues.contentEncoding,
    dataLakeSASSignatureValues.contentLanguage,
    dataLakeSASSignatureValues.contentType
  ].join("\n");

  const signature = userDelegationKeyCredential.computeHMACSHA256(stringToSign);

  return new SASQueryParameters(
    version,
    signature,
    verifiedPermissions,
    undefined,
    undefined,
    dataLakeSASSignatureValues.protocol,
    dataLakeSASSignatureValues.startsOn,
    dataLakeSASSignatureValues.expiresOn,
    dataLakeSASSignatureValues.ipRange,
    dataLakeSASSignatureValues.identifier,
    resource,
    dataLakeSASSignatureValues.cacheControl,
    dataLakeSASSignatureValues.contentDisposition,
    dataLakeSASSignatureValues.contentEncoding,
    dataLakeSASSignatureValues.contentLanguage,
    dataLakeSASSignatureValues.contentType,
    userDelegationKeyCredential.userDelegationKey
  );
}

function getCanonicalName(accountName: string, containerName: string, blobName?: string): string {
  // FileSystem: "/blob/account/fileSystemName"
  // File:       "/blob/account/fileSystemName/fileName"
  const elements: string[] = [`/blob/${accountName}/${containerName}`];
  if (blobName) {
    elements.push(`/${blobName}`);
  }
  return elements.join("");
}
