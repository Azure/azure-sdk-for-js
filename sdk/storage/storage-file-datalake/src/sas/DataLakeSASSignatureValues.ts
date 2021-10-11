// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { StorageSharedKeyCredential } from "../credentials/StorageSharedKeyCredential";
import { UserDelegationKeyCredential } from "../credentials/UserDelegationKeyCredential";
import { DataLakeSASPermissions } from "./DataLakeSASPermissions";
import { FileSystemSASPermissions } from "./FileSystemSASPermissions";
import { UserDelegationKey } from "../models";
import { ipRangeToString, SasIPRange } from "./SasIPRange";
import { SASProtocol, SASQueryParameters } from "./SASQueryParameters";
import { SERVICE_VERSION } from "../utils/constants";
import { truncatedISO8061Date } from "../utils/utils.common";
import { DirectorySASPermissions } from "./DirectorySASPermissions";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * DataLakeSASSignatureValues is used to help generating Blob and DataLake service SAS tokens for containers, blobs, filesystem, directories and files.
 */
export interface DataLakeSASSignatureValues {
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
   * Please refer to {@link FileSystemSASPermissions}, {@link DirectorySASPermissions} or {@link DataLakeSASPermissions} depending on the resource
   * being accessed for help constructing the permissions string.
   */
  permissions?: DataLakeSASPermissions | DirectorySASPermissions | FileSystemSASPermissions;

  /**
   * Optional. IP ranges allowed in this SAS.
   */
  ipRange?: SasIPRange;

  /**
   * The name of the file system the SAS user may access.
   */
  fileSystemName: string;

  /**
   * Optional. The path name of the directory or file SAS user may access. Required if snapshotTime is provided.
   */
  pathName?: string;

  /**
   * Optional. Beginning in version 2020-02-10, this value defines whether or not the {@link pathName} is a directory.
   * If this value is set to true, the Path is a Directory for a Directory SAS. If set to false or default, the Path
   * is a File Path for a File Path SAS.
   */
  isDirectory?: boolean;

  /**
   * Optional. Beginning in version 2020-02-10, indicate the depth of the directory specified in the canonicalizedresource field of the string-to-sign.
   * The depth of the directory is the number of directories beneath the root folder.
   */
  directoryDepth?: number;

  /**
   * Optional. Beginning in version 2020-02-10, specifies the Authorized AAD Object Id in GUID format. The AAD Object ID of a user
   * authorized by the owner of the user delegation key to perform the action granted by the SAS. The Azure Storage service will
   * ensure that the owner of the user delegation key has the required permissions before granting access but no additional permission
   * check for the user specified in this value will be performed. This cannot be used in conjuction with {@link agentObjectId}.
   * This is only used for User Delegation SAS.
   */
  preauthorizedAgentObjectId?: string;

  /**
   * Optional. Beginning in version 2020-02-10, specifies the Unauthorized AAD Object Id in GUID format. The AAD Object Id of a user that is assumed
   * to be unauthorized by the owner of the user delegation key. The Azure Storage Service will perform an additional POSIX ACL check to determine
   * if the user is authorized to perform the requested operation. This cannot be used in conjuction with {@link preauthorizedAgentObjectId}.
   * This is only used for User Delegation SAS.
   */
  agentObjectId?: string;

  /**
   * Optional. Beginning in version 2020-02-10, this is a GUID value that will be logged in the storage diagnostic logs and can be used to
   * correlate SAS generation with storage resource access. This is only used for User Delegation SAS.
   */
  correlationId?: string;

  /**
   * Optional. Snapshot timestamp string the SAS user may access. Only supported from API version 2018-11-09.
   */
  snapshotTime?: string;

  /**
   * Optional. The name of the access policy on the file system this SAS references if any.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
   */
  identifier?: string;

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
 * // Fill in the required details before running the snippet.
 * @example
 * ```js
 * // Generate service level SAS for a file
 * const fileSAS = generateDataLakeSASQueryParameters({
 *     fileSystemName, // Required
 *     fileName, // Required
 *     permissions: DataLakeSASPermissions.parse("racwd"), // Required
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
 * @param dataLakeSASSignatureValues -
 * @param sharedKeyCredential -
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
 * @param dataLakeSASSignatureValues -
 * @param userDelegationKey - Return value of `blobServiceClient.getUserDelegationKey()`
 * @param accountName -
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

  // Version 2020-12-06 adds support for encryptionscope in SAS.
  if (version >= "2020-12-06") {
    if (sharedKeyCredential !== undefined) {
      return generateBlobSASQueryParameters20201206(
        dataLakeSASSignatureValues,
        sharedKeyCredential
      );
    } else {
      return generateBlobSASQueryParametersUDK20201206(
        dataLakeSASSignatureValues,
        userDelegationKeyCredential!
      );
    }
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
      // Version 2020-02-10 delegation SAS signature construction includes preauthorizedAgentObjectId, agentObjectId, correlationId.
      if (version >= "2020-02-10") {
        return generateBlobSASQueryParametersUDK20200210(
          dataLakeSASSignatureValues,
          userDelegationKeyCredential!
        );
      } else {
        return generateBlobSASQueryParametersUDK20181109(
          dataLakeSASSignatureValues,
          userDelegationKeyCredential!
        );
      }
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
 * @param dataLakeSASSignatureValues -
 * @param sharedKeyCredential -
 */
function generateBlobSASQueryParameters20150405(
  dataLakeSASSignatureValues: DataLakeSASSignatureValues,
  sharedKeyCredential: StorageSharedKeyCredential
): SASQueryParameters {
  if (
    !dataLakeSASSignatureValues.identifier &&
    !(dataLakeSASSignatureValues.permissions && dataLakeSASSignatureValues.expiresOn)
  ) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiresOn' for DataLake SAS generation when 'identifier' is not provided."
    );
  }

  const version = dataLakeSASSignatureValues.version
    ? dataLakeSASSignatureValues.version
    : SERVICE_VERSION;

  dataLakeSASSignatureValues = SASSignatureValuesSanityCheckAndAutofill(
    dataLakeSASSignatureValues,
    version
  );

  let resource: string = "c";
  if (dataLakeSASSignatureValues.pathName) {
    resource = "b";
  }

  // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
  let verifiedPermissions: string | undefined;
  if (dataLakeSASSignatureValues.permissions) {
    if (dataLakeSASSignatureValues.pathName) {
      verifiedPermissions = DataLakeSASPermissions.parse(
        dataLakeSASSignatureValues.permissions.toString()
      ).toString();
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
 * @param dataLakeSASSignatureValues -
 * @param sharedKeyCredential -
 */
function generateBlobSASQueryParameters20181109(
  dataLakeSASSignatureValues: DataLakeSASSignatureValues,
  sharedKeyCredential: StorageSharedKeyCredential
): SASQueryParameters {
  if (
    !dataLakeSASSignatureValues.identifier &&
    !(dataLakeSASSignatureValues.permissions && dataLakeSASSignatureValues.expiresOn)
  ) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiresOn' for Blob SAS generation when 'identifier' is not provided."
    );
  }

  const version = dataLakeSASSignatureValues.version
    ? dataLakeSASSignatureValues.version
    : SERVICE_VERSION;

  dataLakeSASSignatureValues = SASSignatureValuesSanityCheckAndAutofill(
    dataLakeSASSignatureValues,
    version
  );

  let resource: string = "c";
  if (dataLakeSASSignatureValues.pathName) {
    if (dataLakeSASSignatureValues.isDirectory) {
      resource = "d";
    } else {
      resource = "b";
      if (dataLakeSASSignatureValues.snapshotTime) {
        resource = "bs";
      }
    }
  }

  // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
  let verifiedPermissions: string | undefined;
  if (dataLakeSASSignatureValues.permissions) {
    if (dataLakeSASSignatureValues.pathName) {
      if (dataLakeSASSignatureValues.isDirectory) {
        verifiedPermissions = DirectorySASPermissions.parse(
          dataLakeSASSignatureValues.permissions.toString()
        ).toString();
      } else {
        verifiedPermissions = DataLakeSASPermissions.parse(
          dataLakeSASSignatureValues.permissions.toString()
        ).toString();
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
    dataLakeSASSignatureValues.contentType,
    undefined,
    dataLakeSASSignatureValues.directoryDepth
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
 * @param dataLakeSASSignatureValues -
 * @param userDelegationKeyCredential -
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
  dataLakeSASSignatureValues = SASSignatureValuesSanityCheckAndAutofill(
    dataLakeSASSignatureValues,
    version
  );

  let resource: string = "c";
  if (dataLakeSASSignatureValues.pathName) {
    if (dataLakeSASSignatureValues.isDirectory) {
      resource = "d";
    } else {
      resource = "b";
      if (dataLakeSASSignatureValues.snapshotTime) {
        resource = "bs";
      }
    }
  }

  // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
  let verifiedPermissions: string | undefined;
  if (dataLakeSASSignatureValues.permissions) {
    if (dataLakeSASSignatureValues.pathName) {
      if (dataLakeSASSignatureValues.isDirectory) {
        verifiedPermissions = DirectorySASPermissions.parse(
          dataLakeSASSignatureValues.permissions.toString()
        ).toString();
      } else {
        verifiedPermissions = DataLakeSASPermissions.parse(
          dataLakeSASSignatureValues.permissions.toString()
        ).toString();
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
    userDelegationKeyCredential.userDelegationKey,
    dataLakeSASSignatureValues.directoryDepth,
    dataLakeSASSignatureValues.preauthorizedAgentObjectId,
    dataLakeSASSignatureValues.agentObjectId,
    dataLakeSASSignatureValues.correlationId
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
 * @param dataLakeSASSignatureValues -
 * @param userDelegationKeyCredential -
 */
function generateBlobSASQueryParametersUDK20200210(
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
  dataLakeSASSignatureValues = SASSignatureValuesSanityCheckAndAutofill(
    dataLakeSASSignatureValues,
    version
  );

  let resource: string = "c";
  if (dataLakeSASSignatureValues.pathName) {
    if (dataLakeSASSignatureValues.isDirectory) {
      resource = "d";
    } else {
      resource = "b";
      if (dataLakeSASSignatureValues.snapshotTime) {
        resource = "bs";
      }
    }
  }

  // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
  let verifiedPermissions: string | undefined;
  if (dataLakeSASSignatureValues.permissions) {
    if (dataLakeSASSignatureValues.pathName) {
      if (dataLakeSASSignatureValues.isDirectory) {
        verifiedPermissions = DirectorySASPermissions.parse(
          dataLakeSASSignatureValues.permissions.toString()
        ).toString();
      } else {
        verifiedPermissions = DataLakeSASPermissions.parse(
          dataLakeSASSignatureValues.permissions.toString()
        ).toString();
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
    dataLakeSASSignatureValues.preauthorizedAgentObjectId,
    dataLakeSASSignatureValues.agentObjectId,
    dataLakeSASSignatureValues.correlationId,
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
    userDelegationKeyCredential.userDelegationKey,
    dataLakeSASSignatureValues.directoryDepth,
    dataLakeSASSignatureValues.preauthorizedAgentObjectId,
    dataLakeSASSignatureValues.agentObjectId,
    dataLakeSASSignatureValues.correlationId
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
 * @param dataLakeSASSignatureValues -
 * @param sharedKeyCredential -
 */
function generateBlobSASQueryParameters20201206(
  dataLakeSASSignatureValues: DataLakeSASSignatureValues,
  sharedKeyCredential: StorageSharedKeyCredential
): SASQueryParameters {
  if (
    !dataLakeSASSignatureValues.identifier &&
    !(dataLakeSASSignatureValues.permissions && dataLakeSASSignatureValues.expiresOn)
  ) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiresOn' for Blob SAS generation when 'identifier' is not provided."
    );
  }

  const version = dataLakeSASSignatureValues.version
    ? dataLakeSASSignatureValues.version
    : SERVICE_VERSION;

  dataLakeSASSignatureValues = SASSignatureValuesSanityCheckAndAutofill(
    dataLakeSASSignatureValues,
    version
  );

  let resource: string = "c";
  if (dataLakeSASSignatureValues.pathName) {
    if (dataLakeSASSignatureValues.isDirectory) {
      resource = "d";
    } else {
      resource = "b";
      if (dataLakeSASSignatureValues.snapshotTime) {
        resource = "bs";
      }
    }
  }

  // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
  let verifiedPermissions: string | undefined;
  if (dataLakeSASSignatureValues.permissions) {
    if (dataLakeSASSignatureValues.pathName) {
      if (dataLakeSASSignatureValues.isDirectory) {
        verifiedPermissions = DirectorySASPermissions.parse(
          dataLakeSASSignatureValues.permissions.toString()
        ).toString();
      } else {
        verifiedPermissions = DataLakeSASPermissions.parse(
          dataLakeSASSignatureValues.permissions.toString()
        ).toString();
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
    "", // reserve for encryption scope
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
    dataLakeSASSignatureValues.contentType,
    undefined,
    dataLakeSASSignatureValues.directoryDepth
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
 * @param dataLakeSASSignatureValues -
 * @param userDelegationKeyCredential -
 */
function generateBlobSASQueryParametersUDK20201206(
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
  dataLakeSASSignatureValues = SASSignatureValuesSanityCheckAndAutofill(
    dataLakeSASSignatureValues,
    version
  );

  let resource: string = "c";
  if (dataLakeSASSignatureValues.pathName) {
    if (dataLakeSASSignatureValues.isDirectory) {
      resource = "d";
    } else {
      resource = "b";
      if (dataLakeSASSignatureValues.snapshotTime) {
        resource = "bs";
      }
    }
  }

  // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
  let verifiedPermissions: string | undefined;
  if (dataLakeSASSignatureValues.permissions) {
    if (dataLakeSASSignatureValues.pathName) {
      if (dataLakeSASSignatureValues.isDirectory) {
        verifiedPermissions = DirectorySASPermissions.parse(
          dataLakeSASSignatureValues.permissions.toString()
        ).toString();
      } else {
        verifiedPermissions = DataLakeSASPermissions.parse(
          dataLakeSASSignatureValues.permissions.toString()
        ).toString();
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
    dataLakeSASSignatureValues.preauthorizedAgentObjectId,
    dataLakeSASSignatureValues.agentObjectId,
    dataLakeSASSignatureValues.correlationId,
    dataLakeSASSignatureValues.ipRange ? ipRangeToString(dataLakeSASSignatureValues.ipRange) : "",
    dataLakeSASSignatureValues.protocol ? dataLakeSASSignatureValues.protocol : "",
    version,
    resource,
    dataLakeSASSignatureValues.snapshotTime,
    "", // reserve for encryption scope
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
    userDelegationKeyCredential.userDelegationKey,
    dataLakeSASSignatureValues.directoryDepth,
    dataLakeSASSignatureValues.preauthorizedAgentObjectId,
    dataLakeSASSignatureValues.agentObjectId,
    dataLakeSASSignatureValues.correlationId
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

function SASSignatureValuesSanityCheckAndAutofill(
  dataLakeSASSignatureValues: DataLakeSASSignatureValues,
  version: string
): DataLakeSASSignatureValues {
  if (
    version < "2020-02-10" &&
    (dataLakeSASSignatureValues.isDirectory || dataLakeSASSignatureValues.directoryDepth)
  ) {
    throw RangeError("'version' must be >= '2020-02-10' to support directory SAS.");
  }
  if (dataLakeSASSignatureValues.isDirectory && dataLakeSASSignatureValues.pathName === undefined) {
    throw RangeError("Must provide 'pathName' when 'isDirectory' is true.");
  }
  if (
    dataLakeSASSignatureValues.directoryDepth !== undefined &&
    (!Number.isInteger(dataLakeSASSignatureValues.directoryDepth) ||
      dataLakeSASSignatureValues.directoryDepth < 0)
  ) {
    throw RangeError("'directoryDepth' must be a non-negative interger.");
  }
  if (
    dataLakeSASSignatureValues.isDirectory &&
    dataLakeSASSignatureValues.directoryDepth === undefined
  ) {
    // calculate directoryDepth from pathName
    if (dataLakeSASSignatureValues.pathName === "/") {
      dataLakeSASSignatureValues.directoryDepth = 0;
    } else {
      dataLakeSASSignatureValues.directoryDepth = dataLakeSASSignatureValues.pathName
        ?.split("/")
        .filter((x) => x !== "").length;
    }
  }

  if (
    version < "2020-02-10" &&
    dataLakeSASSignatureValues.permissions &&
    (dataLakeSASSignatureValues.permissions.move ||
      dataLakeSASSignatureValues.permissions.execute ||
      dataLakeSASSignatureValues.permissions.manageOwnership ||
      dataLakeSASSignatureValues.permissions.manageAccessControl)
  ) {
    throw RangeError("'version' must be >= '2020-02-10' when providing m, e, o or p permission.");
  }

  if (
    version < "2020-02-10" &&
    (dataLakeSASSignatureValues.preauthorizedAgentObjectId ||
      dataLakeSASSignatureValues.agentObjectId ||
      dataLakeSASSignatureValues.correlationId)
  ) {
    throw RangeError(
      "'version' must be >= '2020-02-10' when providing 'preauthorizedAgentObjectId', 'agentObjectId' or 'correlationId'."
    );
  }
  if (
    dataLakeSASSignatureValues.preauthorizedAgentObjectId &&
    dataLakeSASSignatureValues.agentObjectId
  ) {
    throw RangeError(
      "'preauthorizedAgentObjectId' or 'agentObjectId' shouldn't be specified at the same time."
    );
  }

  if (dataLakeSASSignatureValues.snapshotTime && version < "2018-11-09") {
    throw RangeError("'version' must be >= '2018-11-09' when provided 'snapshotTime'.");
  }
  if (
    dataLakeSASSignatureValues.pathName === undefined &&
    dataLakeSASSignatureValues.snapshotTime
  ) {
    throw RangeError("Must provide 'blobName' when provided 'snapshotTime'.");
  }

  return dataLakeSASSignatureValues;
}
