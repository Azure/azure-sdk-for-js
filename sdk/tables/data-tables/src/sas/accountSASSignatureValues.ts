// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NamedKeyCredential } from "@azure/core-auth";
import { computeHMACSHA256 } from "../utils/computeHMACSHA256";
import { SERVICE_VERSION } from "../utils/constants";
import { truncatedISO8061Date } from "../utils/truncateISO8061Date";
import { AccountSASPermissions } from "./accountSASPermissions";
import { AccountSASResourceTypes } from "./accountSASResourceTypes";
import { AccountSASServices } from "./accountSASServices";
import { ipRangeToString, SasIPRange } from "./sasIPRange";
import { SASProtocol, SASQueryParameters } from "./sasQueryParameters";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * AccountSASSignatureValues is used to generate a Shared Access Signature (SAS) for an Azure Storage account. Once
 * all the values here are set appropriately, call {@link generateAccountSASQueryParameters} to obtain a representation
 * of the SAS which can actually be applied to table urls. Note: that both this class and {@link SASQueryParameters}
 * exist because the former is mutable and a logical representation while the latter is immutable and used to generate
 * actual REST requests.
 *
 * @see https://docs.microsoft.com/azure/storage/common/storage-dotnet-shared-access-signature-part-1
 * for more conceptual information on SAS
 *
 * @see https://docs.microsoft.com/rest/api/storageservices/constructing-an-account-sas
 * for descriptions of the parameters, including which are required
 */
export interface AccountSASSignatureValues {
  /**
   * If not provided, this defaults to the service version targeted by this version of the library.
   */
  version?: string;

  /**
   * Optional. SAS protocols allowed.
   */
  protocol?: SASProtocol;

  /**
   * Optional. When the SAS will take effect.
   */
  startsOn?: Date;

  /**
   * The time after which the SAS will no longer work.
   */
  expiresOn: Date;

  /**
   * Specifies which operations the SAS user may perform. Please refer to {@link AccountSASPermissions} for help
   * constructing the permissions string.
   */
  permissions: AccountSASPermissions;

  /**
   * Optional. IP range allowed.
   */
  ipRange?: SasIPRange;

  /**
   * The values that indicate the services accessible with this SAS. Please refer to {@link AccountSASServices} to
   * construct this value.
   */
  services: string;

  /**
   * The values that indicate the resource types accessible with this SAS. Please refer
   * to {@link AccountSASResourceTypes} to construct this value.
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
 * @param accountSASSignatureValues -
 * @param sharedKeyCredential -
 */
export function generateAccountSASQueryParameters(
  accountSASSignatureValues: AccountSASSignatureValues,
  credential: NamedKeyCredential
): SASQueryParameters {
  const version = accountSASSignatureValues.version
    ? accountSASSignatureValues.version
    : SERVICE_VERSION;

  const parsedPermissions = AccountSASPermissions.parse(
    accountSASSignatureValues.permissions.toString()
  );
  const parsedServices = AccountSASServices.parse(accountSASSignatureValues.services).toString();
  const parsedResourceTypes = AccountSASResourceTypes.parse(
    accountSASSignatureValues.resourceTypes
  ).toString();

  const stringToSign = [
    credential.name,
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

  const signature: string = computeHMACSHA256(stringToSign, credential.key);

  return new SASQueryParameters(version, signature, {
    permissions: parsedPermissions.toString(),
    services: parsedServices,
    resourceTypes: parsedResourceTypes,
    protocol: accountSASSignatureValues.protocol,
    startsOn: accountSASSignatureValues.startsOn,
    expiresOn: accountSASSignatureValues.expiresOn,
    ipRange: accountSASSignatureValues.ipRange
  });
}
