import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { FileSASPermissions } from "./FileSASPermissions";
import { IIPRange, ipRangeToString } from "./IIPRange";
import { SASProtocol, SASQueryParameters } from "./SASQueryParameters";
import { ShareSASPermissions } from "./ShareSASPermissions";
import { SERVICE_VERSION } from "./utils/constants";
import { truncatedISO8061Date } from "./utils/utils.common";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * IFileSASSignatureValues is used to help generating File service SAS tokens for shares or blobs.
 *
 * @export
 * @class IFileSASSignatureValues
 */

export interface IFileSASSignatureValues {
  /**
   * The version of the service this SAS will target. If not specified, it will default to the version targeted by the
   * library.
   *
   * @type {string}
   * @memberof IFileSASSignatureValues
   */
  version?: string;

  /**
   * Optional. SAS protocols, HTTPS only or HTTPSandHTTP
   *
   * @type {SASProtocol}
   * @memberof IFileSASSignatureValues
   */
  protocol?: SASProtocol;

  /**
   * Optional. When the SAS will take effect.
   *
   * @type {Date}
   * @memberof IFileSASSignatureValues
   */
  startTime?: Date;

  /**
   * Optional only when identifier is provided. The time after which the SAS will no longer work.
   *
   * @type {Date}
   * @memberof IFileSASSignatureValues
   */
  expiryTime?: Date;

  /**
   * Optional only when identifier is provided.
   * Please refer to either {@link ShareSASPermissions} or {@link FileSASPermissions} depending on the resource
   * being accessed for help constructing the permissions string.
   *
   * @type {string}
   * @memberof IFileSASSignatureValues
   */
  permissions?: string;

  /**
   * Optional. IP ranges allowed in this SAS.
   *
   * @type {IIPRange}
   * @memberof IFileSASSignatureValues
   */
  ipRange?: IIPRange;

  /**
   * The name of the share the SAS user may access.
   *
   * @type {string}
   * @memberof IFileSASSignatureValues
   */
  shareName: string;

  /**
   * Optional. The path of the file like, "directory/FileName" or "FileName".
   *
   * @type {string}
   * @memberof IFileSASSignatureValues
   */
  filePath?: string;

  /**
   * Optional. The name of the access policy on the share this SAS references if any.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
   *
   * @type {string}
   * @memberof IFileSASSignatureValues
   */
  identifier?: string;

  /**
   * Optional. The cache-control header for the SAS.
   *
   * @type {string}
   * @memberof IFileSASSignatureValues
   */
  cacheControl?: string;

  /**
   * Optional. The content-disposition header for the SAS.
   *
   * @type {string}
   * @memberof IFileSASSignatureValues
   */
  contentDisposition?: string;

  /**
   * Optional. The content-encoding header for the SAS.
   *
   * @type {string}
   * @memberof IFileSASSignatureValues
   */
  contentEncoding?: string;

  /**
   * Optional. The content-language header for the SAS.
   *
   * @type {string}
   * @memberof IFileSASSignatureValues
   */
  contentLanguage?: string;

  /**
   * Optional. The content-type header for the SAS.
   *
   * @type {string}
   * @memberof IFileSASSignatureValues
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
 * @param {IFileSASSignatureValues} fileSASSignatureValues
 * @param {SharedKeyCredential} sharedKeyCredential
 * @returns {SASQueryParameters}
 */
export function generateFileSASQueryParameters(
  fileSASSignatureValues: IFileSASSignatureValues,
  sharedKeyCredential: SharedKeyCredential
): SASQueryParameters {
  if (
    !fileSASSignatureValues.identifier &&
    (!fileSASSignatureValues.permissions && !fileSASSignatureValues.expiryTime)
  ) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiryTime' for File SAS generation when 'identifier' is not provided."
    );
  }

  const version = fileSASSignatureValues.version
    ? fileSASSignatureValues.version
    : SERVICE_VERSION;
  let resource: string = "s";
  let verifiedPermissions: string | undefined;

  // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
  if (fileSASSignatureValues.permissions) {
    if (fileSASSignatureValues.filePath) {
      verifiedPermissions = FileSASPermissions.parse(
        fileSASSignatureValues.permissions
      ).toString();
      resource = "f";
    } else {
      verifiedPermissions = ShareSASPermissions.parse(
        fileSASSignatureValues.permissions
      ).toString();
    }
  }

  // Signature is generated on the un-url-encoded values.
  const stringToSign = [
    verifiedPermissions,
    fileSASSignatureValues.startTime
      ? truncatedISO8061Date(fileSASSignatureValues.startTime, false)
      : "",
    fileSASSignatureValues.expiryTime
      ? truncatedISO8061Date(fileSASSignatureValues.expiryTime, false)
      : "",
    getCanonicalName(
      sharedKeyCredential.accountName,
      fileSASSignatureValues.shareName,
      fileSASSignatureValues.filePath
    ),
    fileSASSignatureValues.identifier,
    fileSASSignatureValues.ipRange
      ? ipRangeToString(fileSASSignatureValues.ipRange)
      : "",
    fileSASSignatureValues.protocol,
    version,
    fileSASSignatureValues.cacheControl,
    fileSASSignatureValues.contentDisposition,
    fileSASSignatureValues.contentEncoding,
    fileSASSignatureValues.contentLanguage,
    fileSASSignatureValues.contentType
  ].join("\n");

  const signature = sharedKeyCredential.computeHMACSHA256(stringToSign);

  return new SASQueryParameters(
    version,
    signature,
    verifiedPermissions,
    undefined,
    undefined,
    fileSASSignatureValues.protocol,
    fileSASSignatureValues.startTime,
    fileSASSignatureValues.expiryTime,
    fileSASSignatureValues.ipRange,
    fileSASSignatureValues.identifier,
    resource,
    fileSASSignatureValues.cacheControl,
    fileSASSignatureValues.contentDisposition,
    fileSASSignatureValues.contentEncoding,
    fileSASSignatureValues.contentLanguage,
    fileSASSignatureValues.contentType
  );
}

function getCanonicalName(
  accountName: string,
  shareName: string,
  filePath?: string
): string {
  // Share: "/file/account/sharename"
  // File:  "/file/account/sharename/filename"
  // File:  "/file/account/sharename/directoryname/filename"
  const elements: string[] = [`/file/${accountName}/${shareName}`];
  if (filePath) {
    elements.push(`/${filePath}`);
  }
  return elements.join("");
}
