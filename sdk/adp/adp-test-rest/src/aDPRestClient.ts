// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { ADPRestClient } from "./clientDefinitions";

/**
 * Initialize a new instance of the class ADPRestClient class.
 * @param credentials type: TokenCredential
 */
export default function createClient(
  credentials: TokenCredential,
  options: ClientOptions = {}
): ADPRestClient {
  const baseUrl = options.baseUrl ?? "undefined";
  options.apiVersion = options.apiVersion ?? "2022-11-30-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://adp.azure.com/.default"],
    },
  };

  const userAgentInfo = `azsdk-js-adp-test-rest/1.0.0-beta.1`;
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

  const client = getClient(baseUrl, credentials, options) as ADPRestClient;

  return client;
}
