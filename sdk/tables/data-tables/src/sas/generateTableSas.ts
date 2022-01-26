// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NamedKeyCredential, isNamedKeyCredential } from "@azure/core-auth";
import {
  TableSasSignatureValues,
  generateTableSasQueryParameters,
} from "./tableSasSignatureValues";
import { tableSasPermissionsFromString } from "./tableSasPermisions";

/**
 * Generates a Table Service Shared Access Signature (SAS) URI based on the client properties
 * and parameters passed in. The SAS is signed by the shared key credential of the client.
 *
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas
 *
 * @param options - Optional parameters.
 * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
 */
export function generateTableSas(
  tableName: string,
  credential: NamedKeyCredential,
  options: TableSasSignatureValues = {}
): string {
  let { expiresOn, permissions } = options;

  if (!isNamedKeyCredential(credential)) {
    throw RangeError(
      "Can only generate the account SAS when the client is initialized with a shared key credential"
    );
  }

  // expiresOn and permissions are optional if an identifier is provided
  // set defaults when no identifier and no values were provided
  if (!options.identifier) {
    if (!permissions) {
      permissions = tableSasPermissionsFromString("r");
    }

    if (expiresOn === undefined) {
      const now = new Date();
      expiresOn = new Date(now.getTime() + 3600 * 1000);
    }
  }

  const sas = generateTableSasQueryParameters(tableName, credential, {
    ...options,
    expiresOn,
    permissions,
  }).toString();

  return sas;
}
