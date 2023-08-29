// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";
import { SchemaRegistryContext } from "../rest/index.js";
import { TokenCredential } from "@azure/core-auth";
import getClient from "../rest/index.js";

export interface SchemaRegistryClientOptions extends ClientOptions {}

export { SchemaRegistryContext } from "../rest/index.js";

export function createSchemaRegistry(
  endpoint: string,
  credential: TokenCredential,
  options: SchemaRegistryClientOptions = {}
): SchemaRegistryContext {
  const baseUrl = endpoint;
  const clientContext = getClient(baseUrl, credential, options);
  return clientContext;
}
