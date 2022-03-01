// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { BlobSASPermissions } from "./BlobSASPermissions";
import { UserDelegationKey } from "../BlobServiceClient";
import { ContainerSASPermissions } from "./ContainerSASPermissions";
import { StorageSharedKeyCredential } from "../credentials/StorageSharedKeyCredential";
import { UserDelegationKeyCredential } from "../credentials/UserDelegationKeyCredential";
import { ipRangeToString, SasIPRange } from "./SasIPRange";
import { SASProtocol, SASQueryParameters } from "./SASQueryParameters";
import { SERVICE_VERSION } from "../utils/constants";
import { truncatedISO8061Date } from "../utils/utils.common";

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
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
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
 * ```js
 * // Generate service level SAS for a container
 * const containerSAS = generateBlobSASQueryParameters({
 *     containerName, // Required
 *     permissions: ContainerSASPermissions.parse("racwdl"), // Required
 *     startsOn: new Date(), // Optional
 *     expiresOn: new Date(new Date().valueOf() + 86400), // Required. Date type
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
 *     startsOn: new Date(), // Optional
 *     expiresOn: new Date(new Date().valueOf() + 86400), // Required. Date type
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
 * @param blobSASSignatureValues -
 * @param sharedKeyCredential -
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
 *     startsOn, // Optional. Date type
 *     expiresOn, // Required. Date type
 *     ipRange: { start: "0.0.0.0", end: "255.255.255.255" }, // Optional
 *     protocol: SASProtocol.HttpsAndHttp, // Optional
 *     version: "2018-11-09" // Must greater than or equal to 2018-11-09 to generate user delegation SAS
 *   },
 *   userDelegationKey, // UserDelegationKey
 *   accountName
 * ).toString();
 * ```
 *
 * @param blobSASSignatureValues -
 * @param userDelegationKey - Return value of `blobServiceClient.getUserDelegationKey()`
 * @param accountName -
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

  // Version 2020-12-06 adds support for encryptionscope in SAS.
  if (version >= "2020-12-06") {
    if (sharedKeyCredential !== undefined) {
      return generateBlobSASQueryParameters20201206(blobSASSignatureValues, sharedKeyCredential);
    } else {
      return generateBlobSASQueryParametersUDK20201206(
        blobSASSignatureValues,
        userDelegationKeyCredential!
      );
    }
  }

  // Version 2019-12-12 adds support for the blob tags permission.
  // Version 2018-11-09 adds support for the signed resource and signed blob snapshot time fields.
  // https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas#constructing-the-signature-string
  if (version >= "2018-11-09") {
    if (sharedKeyCredential !== undefined) {
      return generateBlobSASQueryParameters20181109(blobSASSignatureValues, sharedKeyCredential);
    } else {
      // Version 2020-02-10 delegation SAS signature construction includes preauthorizedAgentObjectId, agentObjectId, correlationId.
      if (version >= "2020-02-10") {
        return generateBlobSASQueryParametersUDK20200210(
          blobSASSignatureValues,
          userDelegationKeyCredential!
        );
      } else {
        return generateBlobSASQueryParametersUDK20181109(
          blobSASSignatureValues,
          userDelegationKeyCredential!
        );
      }
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
 * @param blobSASSignatureValues -
 * @param sharedKeyCredential -
 */
function generateBlobSASQueryParameters20150405(
  blobSASSignatureValues: BlobSASSignatureValues,
  sharedKeyCredential: StorageSharedKeyCredential
): SASQueryParameters {
  blobSASSignatureValues = SASSignatureValuesSanityCheckAndAutofill(blobSASSignatureValues);

  if (
    !blobSASSignatureValues.identifier &&
    !(blobSASSignatureValues.permissions && blobSASSignatureValues.expiresOn)
  ) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiresOn' for Blob SAS generation when 'identifier' is not provided."
    );
  }

  let resource: string = "c";
  if (blobSASSignatureValues.blobName) {
    resource = "b";
  }

  // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
  let verifiedPermissions: string | undefined;
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
    blobSASSignatureValues.version,
    blobSASSignatureValues.cacheControl ? blobSASSignatureValues.cacheControl : "",
    blobSASSignatureValues.contentDisposition ? blobSASSignatureValues.contentDisposition : "",
    blobSASSignatureValues.contentEncoding ? blobSASSignatureValues.contentEncoding : "",
    blobSASSignatureValues.contentLanguage ? blobSASSignatureValues.contentLanguage : "",
    blobSASSignatureValues.contentType ? blobSASSignatureValues.contentType : "",
  ].join("\n");

  const signature = sharedKeyCredential.computeHMACSHA256(stringToSign);

  return new SASQueryParameters(
    blobSASSignatureValues.version!,
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
 * @param blobSASSignatureValues -
 * @param sharedKeyCredential -
 */
function generateBlobSASQueryParameters20181109(
  blobSASSignatureValues: BlobSASSignatureValues,
  sharedKeyCredential: StorageSharedKeyCredential
): SASQueryParameters {
  blobSASSignatureValues = SASSignatureValuesSanityCheckAndAutofill(blobSASSignatureValues);

  if (
    !blobSASSignatureValues.identifier &&
    !(blobSASSignatureValues.permissions && blobSASSignatureValues.expiresOn)
  ) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiresOn' for Blob SAS generation when 'identifier' is not provided."
    );
  }

  let resource: string = "c";
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
  let verifiedPermissions: string | undefined;
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
    blobSASSignatureValues.version,
    resource,
    timestamp,
    blobSASSignatureValues.cacheControl ? blobSASSignatureValues.cacheControl : "",
    blobSASSignatureValues.contentDisposition ? blobSASSignatureValues.contentDisposition : "",
    blobSASSignatureValues.contentEncoding ? blobSASSignatureValues.contentEncoding : "",
    blobSASSignatureValues.contentLanguage ? blobSASSignatureValues.contentLanguage : "",
    blobSASSignatureValues.contentType ? blobSASSignatureValues.contentType : "",
  ].join("\n");

  const signature = sharedKeyCredential.computeHMACSHA256(stringToSign);

  return new SASQueryParameters(
    blobSASSignatureValues.version!,
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
 * IMPLEMENTATION FOR API VERSION FROM 2020-12-06.
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
 * @param blobSASSignatureValues -
 * @param sharedKeyCredential -
 */
function generateBlobSASQueryParameters20201206(
  blobSASSignatureValues: BlobSASSignatureValues,
  sharedKeyCredential: StorageSharedKeyCredential
): SASQueryParameters {
  blobSASSignatureValues = SASSignatureValuesSanityCheckAndAutofill(blobSASSignatureValues);

  if (
    !blobSASSignatureValues.identifier &&
    !(blobSASSignatureValues.permissions && blobSASSignatureValues.expiresOn)
  ) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiresOn' for Blob SAS generation when 'identifier' is not provided."
    );
  }

  let resource: string = "c";
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
  let verifiedPermissions: string | undefined;
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
    blobSASSignatureValues.version,
    resource,
    timestamp,
    blobSASSignatureValues.encryptionScope,
    blobSASSignatureValues.cacheControl ? blobSASSignatureValues.cacheControl : "",
    blobSASSignatureValues.contentDisposition ? blobSASSignatureValues.contentDisposition : "",
    blobSASSignatureValues.contentEncoding ? blobSASSignatureValues.contentEncoding : "",
    blobSASSignatureValues.contentLanguage ? blobSASSignatureValues.contentLanguage : "",
    blobSASSignatureValues.contentType ? blobSASSignatureValues.contentType : "",
  ].join("\n");

  const signature = sharedKeyCredential.computeHMACSHA256(stringToSign);

  return new SASQueryParameters(
    blobSASSignatureValues.version!,
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
    undefined,
    undefined,
    undefined,
    blobSASSignatureValues.encryptionScope
  );
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 * IMPLEMENTATION FOR API VERSION FROM 2018-11-09.
 *
 * Creates an instance of SASQueryParameters.
 *
 * Only accepts required settings needed to create a SAS. For optional settings please
 * set corresponding properties directly, such as permissions, startsOn.
 *
 * WARNING: identifier will be ignored, permissions and expiresOn are required.
 *
 * @param blobSASSignatureValues -
 * @param userDelegationKeyCredential -
 */
function generateBlobSASQueryParametersUDK20181109(
  blobSASSignatureValues: BlobSASSignatureValues,
  userDelegationKeyCredential: UserDelegationKeyCredential
): SASQueryParameters {
  blobSASSignatureValues = SASSignatureValuesSanityCheckAndAutofill(blobSASSignatureValues);

  // Stored access policies are not supported for a user delegation SAS.
  if (!blobSASSignatureValues.permissions || !blobSASSignatureValues.expiresOn) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiresOn' for Blob SAS generation when generating user delegation SAS."
    );
  }

  let resource: string = "c";
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
  let verifiedPermissions: string | undefined;
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
    blobSASSignatureValues.version,
    resource,
    timestamp,
    blobSASSignatureValues.cacheControl,
    blobSASSignatureValues.contentDisposition,
    blobSASSignatureValues.contentEncoding,
    blobSASSignatureValues.contentLanguage,
    blobSASSignatureValues.contentType,
  ].join("\n");

  const signature = userDelegationKeyCredential.computeHMACSHA256(stringToSign);
  return new SASQueryParameters(
    blobSASSignatureValues.version!,
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

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 * IMPLEMENTATION FOR API VERSION FROM 2020-02-10.
 *
 * Creates an instance of SASQueryParameters.
 *
 * Only accepts required settings needed to create a SAS. For optional settings please
 * set corresponding properties directly, such as permissions, startsOn.
 *
 * WARNING: identifier will be ignored, permissions and expiresOn are required.
 *
 * @param blobSASSignatureValues -
 * @param userDelegationKeyCredential -
 */
function generateBlobSASQueryParametersUDK20200210(
  blobSASSignatureValues: BlobSASSignatureValues,
  userDelegationKeyCredential: UserDelegationKeyCredential
): SASQueryParameters {
  blobSASSignatureValues = SASSignatureValuesSanityCheckAndAutofill(blobSASSignatureValues);

  // Stored access policies are not supported for a user delegation SAS.
  if (!blobSASSignatureValues.permissions || !blobSASSignatureValues.expiresOn) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiresOn' for Blob SAS generation when generating user delegation SAS."
    );
  }

  let resource: string = "c";
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
  let verifiedPermissions: string | undefined;
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
    blobSASSignatureValues.preauthorizedAgentObjectId,
    undefined, // agentObjectId
    blobSASSignatureValues.correlationId,
    blobSASSignatureValues.ipRange ? ipRangeToString(blobSASSignatureValues.ipRange) : "",
    blobSASSignatureValues.protocol ? blobSASSignatureValues.protocol : "",
    blobSASSignatureValues.version,
    resource,
    timestamp,
    blobSASSignatureValues.cacheControl,
    blobSASSignatureValues.contentDisposition,
    blobSASSignatureValues.contentEncoding,
    blobSASSignatureValues.contentLanguage,
    blobSASSignatureValues.contentType,
  ].join("\n");

  const signature = userDelegationKeyCredential.computeHMACSHA256(stringToSign);
  return new SASQueryParameters(
    blobSASSignatureValues.version!,
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
    userDelegationKeyCredential.userDelegationKey,
    blobSASSignatureValues.preauthorizedAgentObjectId,
    blobSASSignatureValues.correlationId
  );
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 * IMPLEMENTATION FOR API VERSION FROM 2020-12-06.
 *
 * Creates an instance of SASQueryParameters.
 *
 * Only accepts required settings needed to create a SAS. For optional settings please
 * set corresponding properties directly, such as permissions, startsOn.
 *
 * WARNING: identifier will be ignored, permissions and expiresOn are required.
 *
 * @param blobSASSignatureValues -
 * @param userDelegationKeyCredential -
 */
function generateBlobSASQueryParametersUDK20201206(
  blobSASSignatureValues: BlobSASSignatureValues,
  userDelegationKeyCredential: UserDelegationKeyCredential
): SASQueryParameters {
  blobSASSignatureValues = SASSignatureValuesSanityCheckAndAutofill(blobSASSignatureValues);

  // Stored access policies are not supported for a user delegation SAS.
  if (!blobSASSignatureValues.permissions || !blobSASSignatureValues.expiresOn) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiresOn' for Blob SAS generation when generating user delegation SAS."
    );
  }

  let resource: string = "c";
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
  let verifiedPermissions: string | undefined;
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
    blobSASSignatureValues.preauthorizedAgentObjectId,
    undefined, // agentObjectId
    blobSASSignatureValues.correlationId,
    blobSASSignatureValues.ipRange ? ipRangeToString(blobSASSignatureValues.ipRange) : "",
    blobSASSignatureValues.protocol ? blobSASSignatureValues.protocol : "",
    blobSASSignatureValues.version,
    resource,
    timestamp,
    blobSASSignatureValues.encryptionScope,
    blobSASSignatureValues.cacheControl,
    blobSASSignatureValues.contentDisposition,
    blobSASSignatureValues.contentEncoding,
    blobSASSignatureValues.contentLanguage,
    blobSASSignatureValues.contentType,
  ].join("\n");

  const signature = userDelegationKeyCredential.computeHMACSHA256(stringToSign);
  return new SASQueryParameters(
    blobSASSignatureValues.version!,
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
    userDelegationKeyCredential.userDelegationKey,
    blobSASSignatureValues.preauthorizedAgentObjectId,
    blobSASSignatureValues.correlationId,
    blobSASSignatureValues.encryptionScope
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

function SASSignatureValuesSanityCheckAndAutofill(
  blobSASSignatureValues: BlobSASSignatureValues
): BlobSASSignatureValues {
  const version = blobSASSignatureValues.version ? blobSASSignatureValues.version : SERVICE_VERSION;
  if (blobSASSignatureValues.snapshotTime && version < "2018-11-09") {
    throw RangeError("'version' must be >= '2018-11-09' when providing 'snapshotTime'.");
  }
  if (blobSASSignatureValues.blobName === undefined && blobSASSignatureValues.snapshotTime) {
    throw RangeError("Must provide 'blobName' when providing 'snapshotTime'.");
  }

  if (blobSASSignatureValues.versionId && version < "2019-10-10") {
    throw RangeError("'version' must be >= '2019-10-10' when providing 'versionId'.");
  }
  if (blobSASSignatureValues.blobName === undefined && blobSASSignatureValues.versionId) {
    throw RangeError("Must provide 'blobName' when providing 'versionId'.");
  }

  if (
    blobSASSignatureValues.permissions &&
    blobSASSignatureValues.permissions.setImmutabilityPolicy &&
    version < "2020-08-04"
  ) {
    throw RangeError("'version' must be >= '2020-08-04' when provided 'i' permission.");
  }

  if (
    blobSASSignatureValues.permissions &&
    blobSASSignatureValues.permissions.deleteVersion &&
    version < "2019-10-10"
  ) {
    throw RangeError("'version' must be >= '2019-10-10' when providing 'x' permission.");
  }

  if (
    blobSASSignatureValues.permissions &&
    blobSASSignatureValues.permissions.permanentDelete &&
    version < "2019-10-10"
  ) {
    throw RangeError("'version' must be >= '2019-10-10' when providing 'y' permission.");
  }

  if (
    blobSASSignatureValues.permissions &&
    blobSASSignatureValues.permissions.tag &&
    version < "2019-12-12"
  ) {
    throw RangeError("'version' must be >= '2019-12-12' when providing 't' permission.");
  }

  if (
    version < "2020-02-10" &&
    blobSASSignatureValues.permissions &&
    (blobSASSignatureValues.permissions.move || blobSASSignatureValues.permissions.execute)
  ) {
    throw RangeError("'version' must be >= '2020-02-10' when providing the 'm' or 'e' permission.");
  }

  if (
    version < "2021-04-10" &&
    blobSASSignatureValues.permissions &&
    (blobSASSignatureValues.permissions as ContainerSASPermissions).filterByTags
  ) {
    throw RangeError("'version' must be >= '2021-04-10' when providing the 'f' permission.");
  }

  if (
    version < "2020-02-10" &&
    (blobSASSignatureValues.preauthorizedAgentObjectId || blobSASSignatureValues.correlationId)
  ) {
    throw RangeError(
      "'version' must be >= '2020-02-10' when providing 'preauthorizedAgentObjectId' or 'correlationId'."
    );
  }

  if (blobSASSignatureValues.encryptionScope && version < "2020-12-06") {
    throw RangeError("'version' must be >= '2020-12-06' when provided 'encryptionScope' in SAS.");
  }

  blobSASSignatureValues.version = version;
  return blobSASSignatureValues;
}
