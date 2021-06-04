// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNamedKeyCredential, NamedKeyCredential } from "@azure/core-auth";
import { AccountSASPermissions, accountSASPermissionsFromString } from "./accountSASPermissions";
import {
  AccountSASServices,
  accountSASServicesFromString,
  accountSASServicesToString
} from "./accountSASServices";
import { generateAccountSASQueryParameters } from "./accountSASSignatureValues";
import { SasIPRange } from "./sasIPRange";
import { SASProtocol } from "./sasQueryParameters";

/**
 * Generates a Table Account Shared Access Signature (SAS) URI based on the client properties
 * and parameters passed in. The SAS is signed by the shared key credential of the client.
 *
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-account-sas
 *
 * @param options - Optional parameters.
 * @returns An account SAS token
 */
export function generateAccountSAS(
  credential: NamedKeyCredential,
  options: AccountSASOptions = {}
): string {
  const {
    expiresOn,
    permissions = accountSASPermissionsFromString("rl"),
    resourceTypes = "sco",
    services = accountSASServicesFromString("t"),
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

  const sas = generateAccountSASQueryParameters(
    {
      permissions,
      expiresOn: expiry,
      resourceTypes,
      services: accountSASServicesToString(services),
      ...rest
    },
    credential
  ).toString();

  return sas;
}

/**
 * Options to configure {@link generateAccountSAS} operation.
 */
export interface AccountSASOptions {
  /**
   * The time at which the shared access signature becomes invalid. Default to an hour later if not provided.
   */
  expiresOn?: Date;
  /**
   * Specifies the list of permissions to be associated with the SAS.
   */
  permissions?: AccountSASPermissions;
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
  protocol?: SASProtocol;

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
  services?: AccountSASServices;
}
