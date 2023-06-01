// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";
import { Client } from "../../rest/foo/index.js";
import { createClient as getClient } from "../../rest/foo/index.js";

export interface FooClientOptions extends ClientOptions {}

export { Client } from "../../rest/foo/index.js";

/** Cadl Foo */
export function createFoo(
  endpoint: string,
  options: FooClientOptions = {}
): Client.FooContext {
  const baseUrl = endpoint;
  const clientContext = getClient(baseUrl, options);
  return clientContext;
}
