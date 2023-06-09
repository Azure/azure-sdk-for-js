// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";
import { BarContext } from "../../bar/rest/index.js";
import getClient from "../../bar/rest/index.js";

export interface BarClientOptions extends ClientOptions {}

export { BarContext } from "../../bar/rest/index.js";

/** Bar */
export function createBar(
  endpoint: string,
  options: BarClientOptions = {}
): BarContext {
  const baseUrl = endpoint;
  const clientContext = getClient(baseUrl, options);
  return clientContext;
}
