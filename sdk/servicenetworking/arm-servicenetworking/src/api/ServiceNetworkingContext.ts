// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { ClientOptions } from "@azure-rest/core-client";
import { ServiceNetworkingContext } from "../rest/index.js";
import getClient from "../rest/index.js";

export interface ServiceNetworkingClientOptions extends ClientOptions {}

export { ServiceNetworkingContext } from "../rest/index.js";

/** Traffic Controller Provider management API. */
export function createServiceNetworking(
  credential: TokenCredential,
  options: ServiceNetworkingClientOptions = {},
): ServiceNetworkingContext {
  const clientContext = getClient(credential, options);
  return clientContext;
}
