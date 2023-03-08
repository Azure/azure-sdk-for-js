// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { BatchServiceClient } from "./clientDefinitions";

/**
 * Initialize a new instance of `BatchServiceClient`
 * @param endpoint type: string, The parameter endpoint
 * @param credentials type: TokenCredential, uniquely identify client credential
 * @param options type: ClientOptions, the parameter for all optional parameters
 */
export default function createClient(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): BatchServiceClient {
  const baseUrl = options.baseUrl ?? `${endpoint}`;
  options.apiVersion = options.apiVersion ?? "2022-10-01.16.0";
  options = {
    ...options,
    credentials: {
      scopes: ["https://batch.core.windows.net//.default"],
    },
  };

  const userAgentInfo = `azsdk-js-batch-rest/1.0.0-beta.1`;
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

  const client = getClient(baseUrl, credentials, options) as BatchServiceClient;

  return client;
}
