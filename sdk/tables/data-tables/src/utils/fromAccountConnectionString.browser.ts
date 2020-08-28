// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableServiceClientOptions } from "..";
import { ConnectionString } from "./connectionString";

/**
 * Gets client parameters from an Account Connection String
 * Only supported in Node.js not supported for Browsers
 * @param _extractedCreds parsed connection string
 * @param _options TablesServiceClient options
 */
export function fromAccountConnectionString(
  _connectionString: ConnectionString,
  _options?: TableServiceClientOptions
) {
  throw new Error("Account connection string is only supported in Node.js environment");
}
