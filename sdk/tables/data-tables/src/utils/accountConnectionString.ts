// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientParamsFromConnectionString, ConnectionString } from "./internalModels";
import { AzureNamedKeyCredential } from "@azure/core-auth";
import { TableServiceClientOptions } from "..";

/**
 * Gets client parameters from an Account Connection String
 * Only supported in Node.js not supported for Browsers
 * @param extractedCreds - parsed connection string
 * @param options - TablesServiceClient options
 */
export function fromAccountConnectionString(
  extractedCreds: ConnectionString,
  options: TableServiceClientOptions = {}
): ClientParamsFromConnectionString {
  const sharedKeyCredential = new AzureNamedKeyCredential(
    extractedCreds.accountName!,
    extractedCreds.accountKey
  );

  return {
    url: extractedCreds.url,
    options,
    credential: sharedKeyCredential,
  };
}

export function getAccountConnectionString(
  accountName: string,
  accountKey: string,
  defaultEndpointsProtocol: string,
  endpointSuffix?: string,
  tableEndpoint?: string
): ConnectionString {
  if (!tableEndpoint) {
    // TableEndpoint is not present in the Account connection string
    // Can be obtained from `${defaultEndpointsProtocol}://${accountName}.table.${endpointSuffix}`
    const protocol = defaultEndpointsProtocol.toLowerCase();
    if (protocol !== "https" && protocol !== "http") {
      throw new Error(
        "Invalid DefaultEndpointsProtocol in the provided Connection String. Expecting 'https' or 'http'"
      );
    }
    if (!endpointSuffix) {
      throw new Error("Invalid EndpointSuffix in the provided Connection String");
    }
    tableEndpoint = `${defaultEndpointsProtocol}://${accountName}.table.${endpointSuffix}`;
  }

  if (!accountName) {
    throw new Error("Invalid AccountName in the provided Connection String");
  } else if (accountKey.length === 0) {
    throw new Error("Invalid AccountKey in the provided Connection String");
  }

  return {
    kind: "AccountConnString",
    url: tableEndpoint,
    accountName,
    accountKey,
  };
}
