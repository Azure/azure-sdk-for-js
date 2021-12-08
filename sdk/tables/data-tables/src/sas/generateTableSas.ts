// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NamedKeyCredential, isNamedKeyCredential } from "@azure/core-auth";
import { tableSasPermissionsFromString } from "./tableSasPermisions";
import {
  TableSasSignatureValues,
  generateTableSasQueryParameters
} from "./tableSasSignatureValues";

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
  const { expiresOn, permissions = tableSasPermissionsFromString("rl"), ...rest } = options;

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

  const sas = generateTableSasQueryParameters(tableName, credential, {
    expiresOn: expiry,
    permissions,
    ...rest
  }).toString();

  return sas;
}
