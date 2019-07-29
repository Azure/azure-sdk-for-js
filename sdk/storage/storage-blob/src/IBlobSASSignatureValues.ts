import { BlobSASPermissions } from "./BlobSASPermissions";
import { ContainerSASPermissions } from "./ContainerSASPermissions";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { IIPRange, ipRangeToString } from "./IIPRange";
import { SASProtocol, SASQueryParameters } from "./SASQueryParameters";
import { SERVICE_VERSION } from "./utils/constants";
import { truncatedISO8061Date } from "./utils/utils.common";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * IBlobSASSignatureValues is used to help generating Blob service SAS tokens for containers or blobs.
 *
 * @export
 * @class IBlobSASSignatureValues
 */
export interface IBlobSASSignatureValues {
  /**
   * The version of the service this SAS will target. If not specified, it will default to the version targeted by the
   * library.
   *
   * @type {string}
   * @memberof IBlobSASSignatureValues
   */
  version?: string;

  /**
   * Optional. SAS protocols, HTTPS only or HTTPSandHTTP
   *
   * @type {SASProtocol}
   * @memberof IBlobSASSignatureValues
   */
  protocol?: SASProtocol;

  /**
   * Optional. When the SAS will take effect.
   *
   * @type {Date}
   * @memberof IBlobSASSignatureValues
   */
  startTime?: Date;

  /**
   * Optional only when identifier is provided. The time after which the SAS will no longer work.
   *
   * @type {Date}
   * @memberof IBlobSASSignatureValues
   */
  expiryTime?: Date;

  /**
   * Optional only when identifier is provided.
   * Please refer to either {@link ContainerSASPermissions} or {@link BlobSASPermissions} depending on the resource
   * being accessed for help constructing the permissions string.
   *
   * @type {string}
   * @memberof IBlobSASSignatureValues
   */
  permissions?: string;

  /**
   * Optional. IP ranges allowed in this SAS.
   *
   * @type {IIPRange}
   * @memberof IBlobSASSignatureValues
   */
  ipRange?: IIPRange;

  /**
   * The name of the container the SAS user may access.
   *
   * @type {string}
   * @memberof IBlobSASSignatureValues
   */
  containerName: string;

  /**
   * Optional. The blob name of the SAS user may access. Required if snapshotTime is provided.
   *
   * @type {string}
   * @memberof IBlobSASSignatureValues
   */
  blobName?: string;

  /**
   * Optional. Snapshot timestamp string the SAS user may access. Only supported from API version 2018-11-09.
   *
   * @type {string}
   * @memberof IBlobSASSignatureValues
   */
  snapshotTime?: string;

  /**
   * Optional. The name of the access policy on the container this SAS references if any.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
   *
   * @type {string}
   * @memberof IBlobSASSignatureValues
   */
  identifier?: string;

  /**
   * Optional. The cache-control header for the SAS.
   *
   * @type {string}
   * @memberof IBlobSASSignatureValues
   */
  cacheControl?: string;

  /**
   * Optional. The content-disposition header for the SAS.
   *
   * @type {string}
   * @memberof IBlobSASSignatureValues
   */
  contentDisposition?: string;

  /**
   * Optional. The content-encoding header for the SAS.
   *
   * @type {string}
   * @memberof IBlobSASSignatureValues
   */
  contentEncoding?: string;

  /**
   * Optional. The content-language header for the SAS.
   *
   * @type {string}
   * @memberof IBlobSASSignatureValues
   */
  contentLanguage?: string;

  /**
   * Optional. The content-type header for the SAS.
   *
   * @type {string}
   * @memberof IBlobSASSignatureValues
   */
  contentType?: string;
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Creates an instance of SASQueryParameters.
 *
 * Only accepts required settings needed to create a SAS. For optional settings please
 * set corresponding properties directly, such as permissions, startTime and identifier.
 *
 * WARNING: When identifier is not provided, permissions and expiryTime are required.
 * You MUST assign value to identifier or expiryTime & permissions manually if you initial with
 * this constructor.
 *
 * @export
 * @param {IBlobSASSignatureValues} blobSASSignatureValues
 * @param {SharedKeyCredential} sharedKeyCredential
 * @returns {SASQueryParameters}
 */
export function generateBlobSASQueryParameters(
  blobSASSignatureValues: IBlobSASSignatureValues,
  sharedKeyCredential: SharedKeyCredential
): SASQueryParameters {
  const version = blobSASSignatureValues.version ? blobSASSignatureValues.version : SERVICE_VERSION;

  // Version 2018-11-09 adds support for the signed resource and signed blob snapshot time fields.
  // https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas#constructing-the-signature-string
  if (version >= "2018-11-09") {
    return generateBlobSASQueryParameters20181109(blobSASSignatureValues, sharedKeyCredential);
  } else {
    return generateBlobSASQueryParameters20150405(blobSASSignatureValues, sharedKeyCredential);
  }
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 * IMPLEMENTATION FOR API VERSION FROM 2015-04-05 AND BEFORE 2018-11-09.
 * 
 * Creates an instance of SASQueryParameters.
 *
 * Only accepts required settings needed to create a SAS. For optional settings please
 * set corresponding properties directly, such as permissions, startTime and identifier.
 *
 * WARNING: When identifier is not provided, permissions and expiryTime are required.
 * You MUST assign value to identifier or expiryTime & permissions manually if you initial with
 * this constructor.
 *
 * @param {IBlobSASSignatureValues} blobSASSignatureValues
 * @param {SharedKeyCredential} sharedKeyCredential
 * @returns {SASQueryParameters}
 */
function generateBlobSASQueryParameters20150405(
  blobSASSignatureValues: IBlobSASSignatureValues,
  sharedKeyCredential: SharedKeyCredential
): SASQueryParameters {
  if (
    !blobSASSignatureValues.identifier &&
    (!blobSASSignatureValues.permissions && !blobSASSignatureValues.expiryTime)
  ) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiryTime' for Blob SAS generation when 'identifier' is not provided."
    );
  }

  const version = blobSASSignatureValues.version ? blobSASSignatureValues.version : SERVICE_VERSION;
  let resource: string = "c";
  let verifiedPermissions: string | undefined;

  if (blobSASSignatureValues.snapshotTime) {
    throw RangeError("'version' must be >= '2018-11-09' when provided 'snapshotTime'.");
  }

  // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
  if (blobSASSignatureValues.permissions) {
    if (blobSASSignatureValues.blobName) {
      verifiedPermissions = BlobSASPermissions.parse(blobSASSignatureValues.permissions).toString();
      resource = "b";
    } else {
      verifiedPermissions = ContainerSASPermissions.parse(
        blobSASSignatureValues.permissions
      ).toString();
    }
  }

  // Signature is generated on the un-url-encoded values.
  const stringToSign = [
    verifiedPermissions ? verifiedPermissions : "",
    blobSASSignatureValues.startTime
      ? truncatedISO8061Date(blobSASSignatureValues.startTime, false)
      : "",
    blobSASSignatureValues.expiryTime
      ? truncatedISO8061Date(blobSASSignatureValues.expiryTime, false)
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
    blobSASSignatureValues.startTime,
    blobSASSignatureValues.expiryTime,
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
 * set corresponding properties directly, such as permissions, startTime and identifier.
 *
 * WARNING: When identifier is not provided, permissions and expiryTime are required.
 * You MUST assign value to identifier or expiryTime & permissions manually if you initial with
 * this constructor.
 *
 * @param {IBlobSASSignatureValues} blobSASSignatureValues
 * @param {SharedKeyCredential} sharedKeyCredential
 * @returns {SASQueryParameters}
 */
function generateBlobSASQueryParameters20181109(
  blobSASSignatureValues: IBlobSASSignatureValues,
  sharedKeyCredential: SharedKeyCredential
): SASQueryParameters {
  if (
    !blobSASSignatureValues.identifier &&
    (!blobSASSignatureValues.permissions && !blobSASSignatureValues.expiryTime)
  ) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiryTime' for Blob SAS generation when 'identifier' is not provided."
    );
  }

  const version = blobSASSignatureValues.version ? blobSASSignatureValues.version : SERVICE_VERSION;
  let resource: string = "c";
  let verifiedPermissions: string | undefined;

  if (blobSASSignatureValues.blobName === undefined && blobSASSignatureValues.snapshotTime) {
    throw RangeError("Must provide 'blobName' when provided 'snapshotTime'.");
  }

  // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
  if (blobSASSignatureValues.permissions) {
    if (blobSASSignatureValues.blobName) {
      verifiedPermissions = BlobSASPermissions.parse(blobSASSignatureValues.permissions).toString();
      resource = "b";
      if (blobSASSignatureValues.snapshotTime) {
        resource = "bs";
      }
    } else {
      verifiedPermissions = ContainerSASPermissions.parse(
        blobSASSignatureValues.permissions
      ).toString();
    }
  }

  // Signature is generated on the un-url-encoded values.
  const stringToSign = [
    verifiedPermissions ? verifiedPermissions : "",
    blobSASSignatureValues.startTime
      ? truncatedISO8061Date(blobSASSignatureValues.startTime, false)
      : "",
    blobSASSignatureValues.expiryTime
      ? truncatedISO8061Date(blobSASSignatureValues.expiryTime, false)
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
    blobSASSignatureValues.snapshotTime,
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
    blobSASSignatureValues.startTime,
    blobSASSignatureValues.expiryTime,
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

function getCanonicalName(accountName: string, containerName: string, blobName?: string): string {
  // Container: "/blob/account/containerName"
  // Blob:      "/blob/account/containerName/blobName"
  const elements: string[] = [`/blob/${accountName}/${containerName}`];
  if (blobName) {
    elements.push(`/${blobName}`);
  }
  return elements.join("");
}
