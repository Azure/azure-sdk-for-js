// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";
import { FooContext } from "../../foo/rest/index.js";
import getClient from "../../foo/rest/index.js";

export interface FooClientOptions extends ClientOptions {}

export { FooContext } from "../../foo/rest/index.js";

/** Cadl Foo */
export function createFoo(
  endpoint: string,
  options: FooClientOptions = {}
): FooContext {
  const baseUrl = endpoint;
  const clientContext = getClient(baseUrl, options);
  return clientContext;
}
