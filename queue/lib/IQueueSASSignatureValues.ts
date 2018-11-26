import { QueueSASPermissions } from "./QueueSASPermissions";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { IIPRange, ipRangeToString } from "./IIPRange";
import { SASProtocol } from "./SASQueryParameters";
import { SASQueryParameters } from "./SASQueryParameters";
import { SERVICE_VERSION } from "./utils/constants";
import { truncatedISO8061Date } from "./utils/utils.common";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * IQueueSASSignatureValues is used to help generating Queue service SAS tokens for queues.
 *
 * @export
 * @class IQueueSASSignatureValues
 */
export interface IQueueSASSignatureValues {
  /**
   * The version of the service this SAS will target. If not specified, it will default to the version targeted by the
   * library.
   *
   * @type {string}
   * @memberof IQueueSASSignatureValues
   */
  version?: string;

  /**
   * Optional. SAS protocols, HTTPS only or HTTPSandHTTP
   *
   * @type {SASProtocol}
   * @memberof IQueueSASSignatureValues
   */
  protocol?: SASProtocol;

  /**
   * Optional. When the SAS will take effect.
   *
   * @type {Date}
   * @memberof IQueueSASSignatureValues
   */
  startTime?: Date;

  /**
   * Optional only when identifier is provided. The time after which the SAS will no longer work.
   *
   * @type {Date}
   * @memberof IQueueSASSignatureValues
   */
  expiryTime?: Date;

  /**
   * Optional only when identifier is provided.
   * Please refer to {@link QueueSASPermissions}
   * being accessed for help constructing the permissions string.
   *
   * @type {string}
   * @memberof IQueueSASSignatureValues
   */
  permissions?: string;

  /**
   * Optional. IP ranges allowed in this SAS.
   *
   * @type {IIPRange}
   * @memberof IQueueSASSignatureValues
   */
  ipRange?: IIPRange;

  /**
   * The name of the queue the SAS user may access.
   *
   * @type {string}
   * @memberof IQueueSASSignatureValues
   */
  queueName: string;

  /**
   * Optional. The name of the access policy on the queue this SAS references if any.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
   *
   * @type {string}
   * @memberof IQueueSASSignatureValues
   */
  identifier?: string;
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
 * @param {IQueueSASSignatureValues} queueSASSignatureValues
 * @param {SharedKeyCredential} sharedKeyCredential
 * @returns {SASQueryParameters}
 */
export function generateQueueSASQueryParameters(
  queueSASSignatureValues: IQueueSASSignatureValues,
  sharedKeyCredential: SharedKeyCredential
): SASQueryParameters {
  if (
    !queueSASSignatureValues.identifier &&
    (!queueSASSignatureValues.permissions && !queueSASSignatureValues.expiryTime)
  ) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiryTime' for Queue SAS generation when 'identifier' is not provided."
    );
  }

  const version = queueSASSignatureValues.version
    ? queueSASSignatureValues.version
    : SERVICE_VERSION;
  let verifiedPermissions: string | undefined;

  // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
  if (queueSASSignatureValues.permissions) {
      verifiedPermissions = QueueSASPermissions.parse(
        queueSASSignatureValues.permissions
      ).toString();
  }

  // Signature is generated on the un-url-encoded values.
  const stringToSign = [
    verifiedPermissions ? verifiedPermissions : "",
    queueSASSignatureValues.startTime
      ? truncatedISO8061Date(queueSASSignatureValues.startTime, false)
      : "",
    queueSASSignatureValues.expiryTime
      ? truncatedISO8061Date(queueSASSignatureValues.expiryTime, false)
      : "",
    getCanonicalName(
      sharedKeyCredential.accountName,
      queueSASSignatureValues.queueName
    ),
    queueSASSignatureValues.identifier,
    queueSASSignatureValues.ipRange
      ? ipRangeToString(queueSASSignatureValues.ipRange)
      : "",
    queueSASSignatureValues.protocol ? queueSASSignatureValues.protocol : "",
    version
  ].join("\n");

  const signature = sharedKeyCredential.computeHMACSHA256(stringToSign);

  return new SASQueryParameters(
    version,
    signature,
    verifiedPermissions,
    undefined,
    undefined,
    queueSASSignatureValues.protocol,
    queueSASSignatureValues.startTime,
    queueSASSignatureValues.expiryTime,
    queueSASSignatureValues.ipRange,
    queueSASSignatureValues.identifier
  );
}

function getCanonicalName(
  accountName: string,
  queueName: string
): string {
  // Queue: "/queue/account/queueName"
  return `/queue/${accountName}/${queueName}`;
}
