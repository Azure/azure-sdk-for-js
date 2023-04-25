// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { KeyCredential } from "@azure/core-auth";
import { MapsSearchClient } from "./clientDefinitions";

/**
 * Initialize a new instance of the class MapsSearchClient class.
 * @param credentials type: KeyCredential
 */
export default function createClient(
  credentials: KeyCredential,
  options: ClientOptions = {}
): MapsSearchClient {
  const baseUrl = options.baseUrl ?? `https://atlas.microsoft.com`;
  options.apiVersion = options.apiVersion ?? "1.0";
  options = {
    ...options,
    credentials: {
      apiKeyHeaderName: "subscription-key"
    }
  };

  const userAgentInfo = `azsdk-js-maps-search-rest/1.0.0-beta.1`;
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

  const client = getClient(baseUrl, credentials, options) as MapsSearchClient;

  return client;
}
