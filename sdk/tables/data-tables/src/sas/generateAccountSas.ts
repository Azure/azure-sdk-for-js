// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NamedKeyCredential, isNamedKeyCredential } from "@azure/core-auth";
import { AccountSasPermissions, accountSasPermissionsFromString } from "./accountSasPermissions";
import {
  AccountSasServices,
  accountSasServicesFromString,
  accountSasServicesToString
} from "./accountSasServices";
import { generateAccountSasQueryParameters } from "./accountSasSignatureValues";
import { SasIPRange } from "./sasIPRange";
import { SasProtocol } from "./sasQueryParameters";

/**
 * Generates a Table Account Shared Access Signature (SAS) URI based on the client properties
 * and parameters passed in. The SAS is signed by the shared key credential of the client.
 *
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-account-sas
 *
 * @param options - Optional parameters.
 * @returns An account SAS token
 */
export function generateAccountSas(
  credential: NamedKeyCredential,
  options: AccountSasOptions = {}
): string {
  const {
    expiresOn,
    permissions = accountSasPermissionsFromString("rl"),
    resourceTypes = "sco",
    services = accountSasServicesFromString("t"),
    ...rest
  } = options;
  if (!isNamedKeyCredential(credential)) {
    throw RangeError(
      "Can only generate the account SAS when the client is initialized with a shared key credential"
    );
  }

  let expiry = expiresOn;

  if (expiry === undefined) {
    const now = new Date();
    expiry = new Date(now.getTime() + 3600 * 1000);
  }

  const sas = generateAccountSasQueryParameters(
    {
      permissions,
      expiresOn: expiry,
      resourceTypes,
      services: accountSasServicesToString(services),
      ...rest
    },
    credential
  ).toString();

  return sas;
}

/**
 * Options to configure {@link generateAccountSas} operation.
 */
export interface AccountSasOptions {
  /**
   * The time at which the shared access signature becomes invalid. Default to an hour later if not provided.
   */
  expiresOn?: Date;
  /**
   * Specifies the list of permissions to be associated with the SAS.
   */
  permissions?: AccountSasPermissions;
  /**
   * Specifies the resource types associated with the shared access signature.
   */
  resourceTypes?: string;
  /**
   * The version of the service this SAS will target. If not specified, it will default to the version targeted by the
   * library.
   */
  version?: string;

  /**
   * SAS protocols allowed.
   */
  protocol?: SasProtocol;

  /**
   * When the SAS will take effect.
   */
  startsOn?: Date;
  /**
   * IP range allowed.
   */
  ipRange?: SasIPRange;
  /**
   * Account services
   */
  services?: AccountSasServices;
}
