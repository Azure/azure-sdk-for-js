// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientParamsFromConnectionString, ConnectionString } from "./internalModels.js";
import type { TableServiceClientOptions } from "../index.js";

/**
 * Gets client parameters from an Account Connection String
 * Only supported in Node.js not supported for Browsers
 * @param _extractedCreds - parsed connection string
 * @param _options - TablesServiceClient options
 */
export function fromAccountConnectionString(
  _connectionString: ConnectionString,
  _options?: TableServiceClientOptions,
): ClientParamsFromConnectionString {
  throw new Error("Account connection string is only supported in Node.js environment");
}

export function getAccountConnectionString(
  _accountName: string,
  _accountKey: string,
  _defaultEndpointsProtocol: string,
  _endpointSuffix?: string,
  _tableEndpoint?: string,
): ConnectionString {
  throw new Error("Account connection string is only supported in Node.js environment");
}
