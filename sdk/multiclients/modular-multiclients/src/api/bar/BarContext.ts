// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";
import { Client } from "../../rest/bar/index.js";
import { createClient as getClient } from "../../rest/bar/index.js";

export interface BarClientOptions extends ClientOptions {}

export { Client } from "../../rest/bar/index.js";

/** Bar */
export function createBar(
  endpoint: string,
  options: BarClientOptions = {}
): Client.BarContext {
  const baseUrl = endpoint;
  const clientContext = getClient(baseUrl, options);
  return clientContext;
}
