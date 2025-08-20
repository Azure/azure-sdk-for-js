// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QueueSASPermissions } from "./QueueSASPermissions.js";
import { StorageSharedKeyCredential, UserDelegationKeyCredential } from "@azure/storage-common";
import type { SasIPRange } from "./SasIPRange.js";
import { ipRangeToString } from "./SasIPRange.js";
import type { SASProtocol } from "./SASQueryParameters.js";
import { SASQueryParameters } from "./SASQueryParameters.js";
import { SERVICE_VERSION } from "./utils/constants.js";
import { truncatedISO8061Date } from "./utils/utils.common.js";
import { UserDelegationKey } from "./generatedModels.js";

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
   * @see https://learn.microsoft.com/rest/api/storageservices/establishing-a-stored-access-policy
   */
  identifier?: string;
  
  /**
   * Optional. Beginning in version 2025-07-05, this value specifies the Entra ID of the user would is authorized to
   * use the resulting SAS URL.  The resulting SAS URL must be used in conjunction with an Entra ID token that has been
   * issued to the user specified in this value.
   */
  delegatedUserObjectId?: string;
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
  userDelegationKey: UserDelegationKey,
  accountName: string,
): SASQueryParameters;

export function generateQueueSASQueryParameters(
  queueSASSignatureValues: QueueSASSignatureValues,
  sharedKeyCredential: StorageSharedKeyCredential,
): SASQueryParameters;

export function generateQueueSASQueryParameters(
  queueSASSignatureValues: QueueSASSignatureValues,
  sharedKeyCredentialOrUserDelegationKey: StorageSharedKeyCredential | UserDelegationKey,
  accountName?: string,
): SASQueryParameters {
  return generateQueueSASQueryParametersInternal(queueSASSignatureValues, 
    sharedKeyCredentialOrUserDelegationKey,
    accountName,)
    .sasQueryParameters;
}

export function generateQueueSASQueryParametersInternal(
  queueSASSignatureValues: QueueSASSignatureValues,
  sharedKeyCredentialOrUserDelegationKey: StorageSharedKeyCredential | UserDelegationKey,
  accountName?: string,
): { sasQueryParameters: SASQueryParameters; stringToSign: string } {
  const version = queueSASSignatureValues.version ? queueSASSignatureValues.version : SERVICE_VERSION;
  
  const sharedKeyCredential =
    sharedKeyCredentialOrUserDelegationKey instanceof StorageSharedKeyCredential
      ? sharedKeyCredentialOrUserDelegationKey
      : undefined;
  let userDelegationKeyCredential: UserDelegationKeyCredential | undefined;

  if (sharedKeyCredential === undefined && accountName !== undefined) {
    userDelegationKeyCredential = new UserDelegationKeyCredential(
      accountName,
      sharedKeyCredentialOrUserDelegationKey as UserDelegationKey,
    );
  }

  if (sharedKeyCredential !== undefined) {
    return generateQueueSASQueryParametersDefault(queueSASSignatureValues, sharedKeyCredential!);
  } else {
    if (version >= "2025-07-05") {
      return generateQueueSASQueryParametersUDK20250705(
        queueSASSignatureValues,
        userDelegationKeyCredential!,
        accountName!,
      );
    } else {
      throw new RangeError(
        "'version' must be >= '2025-07-05' when generating user delegation SAS using user delegation key.",
      );
    }
  }
}

function generateQueueSASQueryParametersDefault(
  queueSASSignatureValues: QueueSASSignatureValues,
  sharedKeyCredential: StorageSharedKeyCredential,
): { sasQueryParameters: SASQueryParameters; stringToSign: string } {
  if (
    !queueSASSignatureValues.identifier &&
    !(queueSASSignatureValues.permissions && queueSASSignatureValues.expiresOn)
  ) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiresOn' for Queue SAS generation when 'identifier' is not provided.",
    );
  }

  const version = queueSASSignatureValues.version
    ? queueSASSignatureValues.version
    : SERVICE_VERSION;
  let verifiedPermissions: string | undefined;

  // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
  if (queueSASSignatureValues.permissions) {
    verifiedPermissions = QueueSASPermissions.parse(
      queueSASSignatureValues.permissions.toString(),
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

  return {
    sasQueryParameters: new SASQueryParameters(
      version,
      signature,
      verifiedPermissions,
      undefined,
      undefined,
      queueSASSignatureValues.protocol,
      queueSASSignatureValues.startsOn,
      queueSASSignatureValues.expiresOn,
      queueSASSignatureValues.ipRange,
      queueSASSignatureValues.identifier,
    ),
    stringToSign: stringToSign,
  };
}

function generateQueueSASQueryParametersUDK20250705(
  queueSASSignatureValues: QueueSASSignatureValues,
  userDelegationKeyCredential: UserDelegationKeyCredential,
  accountName: string,
): { sasQueryParameters: SASQueryParameters; stringToSign: string } {

  if (!(queueSASSignatureValues.permissions && queueSASSignatureValues.expiresOn)) {
    throw new RangeError(
      "Must provide 'permissions' and 'expiresOn' for Blob SAS generation when generating user delegation SAS.",
    );
  }

  const version = queueSASSignatureValues.version ? queueSASSignatureValues.version : SERVICE_VERSION;
  let verifiedPermissions: string | undefined;

  // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
  if (queueSASSignatureValues.permissions) {
    verifiedPermissions = QueueSASPermissions.parse(
      queueSASSignatureValues.permissions.toString(),
    ).toString();
  }
  const resource: string = "q";

  // Signature is generated on the un-url-encoded values.
  const stringToSign = [
    verifiedPermissions ? verifiedPermissions : "",
    queueSASSignatureValues.startsOn
      ? truncatedISO8061Date(queueSASSignatureValues.startsOn, false)
      : "",
    queueSASSignatureValues.expiresOn
      ? truncatedISO8061Date(queueSASSignatureValues.expiresOn, false)
      : "",
    getCanonicalName(accountName, queueSASSignatureValues.queueName),
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
    undefined, // shared key delegation signed tenant id.
    queueSASSignatureValues.delegatedUserObjectId, 
    queueSASSignatureValues.ipRange ? ipRangeToString(queueSASSignatureValues.ipRange) : "",
    queueSASSignatureValues.protocol ? queueSASSignatureValues.protocol : "",
    version,
    resource
  ].join("\n");

  const signature = userDelegationKeyCredential.computeHMACSHA256(stringToSign);

  return {
    sasQueryParameters: new SASQueryParameters(
      version,
      signature,
      verifiedPermissions,
      undefined,
      undefined,
      queueSASSignatureValues.protocol,
      queueSASSignatureValues.startsOn,
      queueSASSignatureValues.expiresOn,
      queueSASSignatureValues.ipRange,
      queueSASSignatureValues.identifier,
      resource,
      userDelegationKeyCredential.userDelegationKey,
      undefined
    ),
    stringToSign: stringToSign,
  };
}

function getCanonicalName(accountName: string, queueName: string): string {
  // Queue: "/queue/account/queueName"
  return `/queue/${accountName}/${queueName}`;
}
