// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableServiceClientOptions } from "..";
import { ConnectionString } from "./connectionString";
import { SharedKeyCredential } from "../SharedKeyCredential";

/**
 * Gets client parameters from an Account Connection String
 * Only supported in Node.js not supported for Browsers
 * @param extractedCreds parsed connection string
 * @param options TablesServiceClient options
 */
export function fromAccountConnectionString(
  extractedCreds: ConnectionString,
  options?: TableServiceClientOptions
) {
  const sharedKeyCredential = new SharedKeyCredential(
    extractedCreds.accountName!,
    extractedCreds.accountKey
  );
  const optionsWithCredentials: TableServiceClientOptions = {
    ...options,
    requestPolicyFactories: (defaultFactories) => [...defaultFactories, sharedKeyCredential]
  };

  return {
    url: extractedCreds.url,
    options: optionsWithCredentials
  };
}
