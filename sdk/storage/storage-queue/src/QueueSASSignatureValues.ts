// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { QueueSASPermissions } from "./QueueSASPermissions";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { SasIPRange, ipRangeToString } from "./SasIPRange";
import { SASProtocol } from "./SASQueryParameters";
import { SASQueryParameters } from "./SASQueryParameters";
import { SERVICE_VERSION } from "./utils/constants";
import { truncatedISO8061Date } from "./utils/utils.common";

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
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
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
export function generateQueueSASQueryParameters(
  queueSASSignatureValues: QueueSASSignatureValues,
  sharedKeyCredential: StorageSharedKeyCredential
): SASQueryParameters {
  if (
    !queueSASSignatureValues.identifier &&
    !(queueSASSignatureValues.permissions && queueSASSignatureValues.expiresOn)
  ) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiresOn' for Queue SAS generation when 'identifier' is not provided."
    );
  }

  const version = queueSASSignatureValues.version
    ? queueSASSignatureValues.version
    : SERVICE_VERSION;
  let verifiedPermissions: string | undefined;

  // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
  if (queueSASSignatureValues.permissions) {
    verifiedPermissions = QueueSASPermissions.parse(
      queueSASSignatureValues.permissions.toString()
    ).toString();
  }

  // Signature is generated on the un-url-encoded values.
  const stringToSign = [
    verifiedPermissions ? verifiedPermissions : "",
    queueSASSignatureValues.startsOn
      ? truncatedISO8061Date(queueSASSignatureValues.startsOn, false)
      : "",
    queueSASSignatureValues.expiresOn
      ? truncatedISO8061Date(queueSASSignatureValues.expiresOn, false)
      : "",
    getCanonicalName(sharedKeyCredential.accountName, queueSASSignatureValues.queueName),
    queueSASSignatureValues.identifier,
    queueSASSignatureValues.ipRange ? ipRangeToString(queueSASSignatureValues.ipRange) : "",
    queueSASSignatureValues.protocol ? queueSASSignatureValues.protocol : "",
    version,
  ].join("\n");

  const signature = sharedKeyCredential.computeHMACSHA256(stringToSign);

  return new SASQueryParameters(
    version,
    signature,
    verifiedPermissions,
    undefined,
    undefined,
    queueSASSignatureValues.protocol,
    queueSASSignatureValues.startsOn,
    queueSASSignatureValues.expiresOn,
    queueSASSignatureValues.ipRange,
    queueSASSignatureValues.identifier
  );
}

function getCanonicalName(accountName: string, queueName: string): string {
  // Queue: "/queue/account/queueName"
  return `/queue/${accountName}/${queueName}`;
}
