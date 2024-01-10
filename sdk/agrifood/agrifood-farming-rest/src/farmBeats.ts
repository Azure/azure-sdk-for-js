// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { FarmBeatsClient } from "./clientDefinitions";

/**
 * Initialize a new instance of `FarmBeatsClient`
 * @param $host type: string, server parameter
 * @param credentials type: TokenCredential, uniquely identify client credential
 * @param options type: ClientOptions, the parameter for all optional parameters
 */
export default function createClient(
  $host: string,
  credentials: TokenCredential,
  options: ClientOptions = {},
): FarmBeatsClient {
  const baseUrl = options.baseUrl ?? `${$host}`;
  options.apiVersion = options.apiVersion ?? "2022-11-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://farmbeats.azure.net/.default"],
    },
  };

  const userAgentInfo = `azsdk-js-agrifood-farming-rest/1.0.0-beta.2`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix,
    },
  };

  const client = getClient(baseUrl, credentials, options) as FarmBeatsClient;

  return client;
}
