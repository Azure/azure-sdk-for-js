// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { AccountSASPermissions } from "./AccountSASPermissions";
import { AccountSASResourceTypes } from "./AccountSASResourceTypes";
import { AccountSASServices } from "./AccountSASServices";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { SasIPRange, ipRangeToString } from "./SasIPRange";
import { SASProtocol, SASQueryParameters } from "./SASQueryParameters";
import { SERVICE_VERSION } from "./utils/constants";
import { truncatedISO8061Date } from "./utils/utils.common";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * AccountSASSignatureValues is used to generate a Shared Access Signature (SAS) for an Azure Storage account. Once
 * all the values here are set appropriately, call {@link generateAccountSASQueryParameters} to obtain a representation
 * of the SAS which can actually be applied to blob urls. Note: that both this class and {@link SASQueryParameters}
 * exist because the former is mutable and a logical representation while the latter is immutable and used to generate
 * actual REST requests.
 *
 * @see https://docs.microsoft.com/en-us/azure/storage/common/storage-dotnet-shared-access-signature-part-1
 * for more conceptual information on SAS
 *
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
 * for descriptions of the parameters, including which are required
 *
 * @export
 * @class AccountSASSignatureValues
 */
export interface AccountSASSignatureValues {
  /**
   * If not provided, this defaults to the service version targeted by this version of the library.
   *
   * @type {string}
   * @memberof AccountSASSignatureValues
   */
  version?: string;

  /**
   * Optional. SAS protocols allowed.
   *
   * @type {SASProtocol}
   * @memberof AccountSASSignatureValues
   */
  protocol?: SASProtocol;

  /**
   * Optional. When the SAS will take effect.
   *
   * @type {Date}
   * @memberof AccountSASSignatureValues
   */
  startsOn?: Date;

  /**
   * The time after which the SAS will no longer work.
   *
   * @type {Date}
   * @memberof AccountSASSignatureValues
   */
  expiresOn: Date;

  /**
   * Specifies which operations the SAS user may perform. Please refer to {@link AccountSASPermissions} for help
   * constructing the permissions string.
   *
   * @type {AccountSASPermissions}
   * @memberof AccountSASSignatureValues
   */
  permissions: AccountSASPermissions;

  /**
   * Optional. IP range allowed.
   *
   * @type {SasIPRange}
   * @memberof AccountSASSignatureValues
   */
  ipRange?: SasIPRange;

  /**
   * The values that indicate the services accessible with this SAS. Please refer to {@link AccountSASServices} to
   * construct this value.
   *
   * @type {string}
   * @memberof AccountSASSignatureValues
   */
  services: string;

  /**
   * The values that indicate the resource types accessible with this SAS. Please refer
   * to {@link AccountSASResourceTypes} to construct this value.
   *
   * @type {string}
   * @memberof AccountSASSignatureValues
   */
  resourceTypes: string;
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Generates a {@link SASQueryParameters} object which contains all SAS query parameters needed to make an actual
 * REST request.
 *
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
 *
 * @param {AccountSASSignatureValues} accountSASSignatureValues
 * @param {StorageSharedKeyCredential} sharedKeyCredential
 * @returns {SASQueryParameters}
 * @memberof AccountSASSignatureValues
 */
export function generateAccountSASQueryParameters(
  accountSASSignatureValues: AccountSASSignatureValues,
  sharedKeyCredential: StorageSharedKeyCredential
): SASQueryParameters {
  const version = accountSASSignatureValues.version
    ? accountSASSignatureValues.version
    : SERVICE_VERSION;

  if (
    accountSASSignatureValues.permissions &&
    accountSASSignatureValues.permissions.deleteVersion &&
    version < "2019-10-10"
  ) {
    throw RangeError("'version' must be >= '2019-10-10' when provided 'x' permission.");
  }

  if (
    accountSASSignatureValues.permissions &&
    accountSASSignatureValues.permissions.tag &&
    version < "2019-12-12"
  ) {
    throw RangeError("'version' must be >= '2019-12-12' when provided 't' permission.");
  }

  if (
    accountSASSignatureValues.permissions &&
    accountSASSignatureValues.permissions.filter &&
    version < "2019-12-12"
  ) {
    throw RangeError("'version' must be >= '2019-12-12' when provided 'f' permission.");
  }

  const parsedPermissions = AccountSASPermissions.parse(
    accountSASSignatureValues.permissions.toString()
  );
  const parsedServices = AccountSASServices.parse(accountSASSignatureValues.services).toString();
  const parsedResourceTypes = AccountSASResourceTypes.parse(
    accountSASSignatureValues.resourceTypes
  ).toString();

  const stringToSign = [
    sharedKeyCredential.accountName,
    parsedPermissions,
    parsedServices,
    parsedResourceTypes,
    accountSASSignatureValues.startsOn
      ? truncatedISO8061Date(accountSASSignatureValues.startsOn, false)
      : "",
    truncatedISO8061Date(accountSASSignatureValues.expiresOn, false),
    accountSASSignatureValues.ipRange ? ipRangeToString(accountSASSignatureValues.ipRange) : "",
    accountSASSignatureValues.protocol ? accountSASSignatureValues.protocol : "",
    version,
    "" // Account SAS requires an additional newline character
  ].join("\n");

  const signature: string = sharedKeyCredential.computeHMACSHA256(stringToSign);

  return new SASQueryParameters(
    version,
    signature,
    parsedPermissions.toString(),
    parsedServices,
    parsedResourceTypes,
    accountSASSignatureValues.protocol,
    accountSASSignatureValues.startsOn,
    accountSASSignatureValues.expiresOn,
    accountSASSignatureValues.ipRange
  );
}
