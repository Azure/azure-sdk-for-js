// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NamedKeyCredential } from "@azure/core-auth";
import { computeHMACSHA256 } from "../utils/computeHMACSHA256";
import { SERVICE_VERSION } from "../utils/constants";
import { truncatedISO8061Date } from "../utils/truncateISO8061Date";
import { AccountSasPermissions, accountSasPermissionsToString } from "./accountSasPermissions";
import {
  accountSasResourceTypesFromString,
  accountSasResourceTypesToString
} from "./accountSasResourceTypes";
import { accountSasServicesFromString, accountSasServicesToString } from "./accountSasServices";
import { SasIPRange, ipRangeToString } from "./sasIPRange";
import { SasProtocol, SasQueryParameters } from "./sasQueryParameters";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * AccountSASSignatureValues is used to generate a Shared Access Signature (SAS) for an Azure Storage account. Once
 * all the values here are set appropriately, call {@link generateAccountSasQueryParameters} to obtain a representation
 * of the SAS which can actually be applied to table urls. Note: that both this class and {@link SasQueryParameters}
 * exist because the former is mutable and a logical representation while the latter is immutable and used to generate
 * actual REST requests.
 *
 * @see https://docs.microsoft.com/azure/storage/common/storage-dotnet-shared-access-signature-part-1
 * for more conceptual information on SAS
 *
 * @see https://docs.microsoft.com/rest/api/storageservices/constructing-an-account-sas
 * for descriptions of the parameters, including which are required
 */
export interface AccountSasSignatureValues {
  /**
   * If not provided, this defaults to the service version targeted by this version of the library.
   */
  version?: string;

  /**
   * Optional. SAS protocols allowed.
   */
  protocol?: SasProtocol;

  /**
   * Optional. When the SAS will take effect.
   */
  startsOn?: Date;

  /**
   * The time after which the SAS will no longer work.
   */
  expiresOn: Date;

  /**
   * Specifies which operations the SAS user may perform. Please refer to {@link AccountSasPermissions} for help
   * constructing the permissions string.
   */
  permissions: AccountSasPermissions;

  /**
   * Optional. IP range allowed.
   */
  ipRange?: SasIPRange;

  /**
   * The values that indicate the services accessible with this SAS. Please refer to {@link AccountSasServices} to
   * construct this value.
   */
  services: string;

  /**
   * The values that indicate the resource types accessible with this SAS. Please refer
   * to {@link AccountSasResourceTypes} to construct this value.
   */
  resourceTypes: string;
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Generates a {@link SasQueryParameters} object which contains all SAS query parameters needed to make an actual
 * REST request.
 *
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
 *
 * @param accountSasSignatureValues -
 * @param sharedKeyCredential -
 */
export function generateAccountSasQueryParameters(
  accountSasSignatureValues: AccountSasSignatureValues,
  credential: NamedKeyCredential
): SasQueryParameters {
  const version = accountSasSignatureValues.version
    ? accountSasSignatureValues.version
    : SERVICE_VERSION;

  const parsedPermissions = accountSasPermissionsToString(accountSasSignatureValues.permissions);
  const parsedServices = accountSasServicesToString(
    accountSasServicesFromString(accountSasSignatureValues.services)
  );
  // to and from string to guarantee the correct order of resoruce types is generated
  const parsedResourceTypes = accountSasResourceTypesToString(
    accountSasResourceTypesFromString(accountSasSignatureValues.resourceTypes)
  );

  const stringToSign = [
    credential.name,
    parsedPermissions,
    parsedServices,
    parsedResourceTypes,
    accountSasSignatureValues.startsOn
      ? truncatedISO8061Date(accountSasSignatureValues.startsOn, false)
      : "",
    truncatedISO8061Date(accountSasSignatureValues.expiresOn, false),
    accountSasSignatureValues.ipRange ? ipRangeToString(accountSasSignatureValues.ipRange) : "",
    accountSasSignatureValues.protocol ? accountSasSignatureValues.protocol : "",
    version,
    "" // Account SAS requires an additional newline character
  ].join("\n");

  const signature: string = computeHMACSHA256(stringToSign, credential.key);

  return new SasQueryParameters(version, signature, {
    permissions: parsedPermissions.toString(),
    services: parsedServices,
    resourceTypes: parsedResourceTypes,
    protocol: accountSasSignatureValues.protocol,
    startsOn: accountSasSignatureValues.startsOn,
    expiresOn: accountSasSignatureValues.expiresOn,
    ipRange: accountSasSignatureValues.ipRange
  });
}
