// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ConnectionString } from "./internalModels";
import { TableServiceClientOptions } from "..";

/**
 * Gets client parameters from an Account Connection String
 * Only supported in Node.js not supported for Browsers
 * @param _extractedCreds - parsed connection string
 * @param _options - TablesServiceClient options
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export function fromAccountConnectionString(
  _connectionString: ConnectionString,
  _options?: TableServiceClientOptions
) {
  throw new Error("Account connection string is only supported in Node.js environment");
}

export function getAccountConnectionString(
  _accountName: string,
  _accountKey: string,
  _defaultEndpointsProtocol: string,
  _endpointSuffix?: string,
  _tableEndpoint?: string
): ConnectionString {
  throw new Error("Account connection string is only supported in Node.js environment");
}
