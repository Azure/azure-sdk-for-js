// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { MapsRouteClient } from "./clientDefinitions";

export default function createClient(
  credentials: TokenCredential | KeyCredential,
  options: ClientOptions = {}
): MapsRouteClient {
  const baseUrl = options.baseUrl ?? "https://atlas.microsoft.com";
  options.apiVersion = options.apiVersion ?? "1.0";
  options = {
    ...options,
    credentials: {
      scopes: ["https://atlas.microsoft.com/.default"],
      apiKeyHeaderName: "Authorization"
    }
  };

  const userAgentInfo = `azsdk-js-maps-route-rest/1.0.0-beta.1`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix
    }
  };

  const client = getClient(baseUrl, credentials, options) as MapsRouteClient;

  return client;
}
