// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { KeyCredential } from "@azure/core-auth";
import { MapsRenderClient } from "./clientDefinitions";

/**
 * Initialize a new instance of the class MapsRenderClient class.
 * @param credentials type: KeyCredential
 */
export default function createClient(
  credentials: KeyCredential,
  options: ClientOptions = {}
): MapsRenderClient {
  const baseUrl = options.baseUrl ?? `https://atlas.microsoft.com`;
  options.apiVersion = options.apiVersion ?? "2024-04-01";
  options = {
    ...options,
    credentials: {
      apiKeyHeaderName: "subscription-key"
    }
  };

  const userAgentInfo = `azsdk-js-maps-render-rest/2.0.0-beta.1`;
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

  const client = getClient(baseUrl, credentials, options) as MapsRenderClient;

  return client;
}
