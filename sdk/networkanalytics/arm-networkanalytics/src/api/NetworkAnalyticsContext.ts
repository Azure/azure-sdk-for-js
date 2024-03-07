// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { ClientOptions } from "@azure-rest/core-client";
import { NetworkAnalyticsContext } from "../rest/index.js";
import getClient from "../rest/index.js";

export interface NetworkAnalyticsClientOptions extends ClientOptions {}

export { NetworkAnalyticsContext } from "../rest/index.js";

export function createNetworkAnalytics(
  credential: TokenCredential,
  options: NetworkAnalyticsClientOptions = {},
): NetworkAnalyticsContext {
  const clientContext = getClient(credential, options);
  return clientContext;
}
