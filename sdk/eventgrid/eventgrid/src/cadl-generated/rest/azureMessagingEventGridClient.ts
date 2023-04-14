// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { AzureMessagingEventGridClient } from "./clientDefinitions";

/**
 * Initialize a new instance of `AzureMessagingEventGridClient`
 * @param endpoint type: string, The host name of the namespace, e.g. namespaceName1.westus-1.eventgrid.azure.net
 * @param credentials type: TokenCredential|KeyCredential, uniquely identify client credential
 * @param options type: ClientOptions, the parameter for all optional parameters
 */
export default function createClient(
  endpoint: string,
  credentials: TokenCredential | KeyCredential,
  options: ClientOptions = {}
): AzureMessagingEventGridClient {
  const baseUrl = options.baseUrl ?? `${endpoint}`;
  options.apiVersion = options.apiVersion ?? "2023-06-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://eventgrid.azure.net/.default"],
      apiKeyHeaderName: "SharedAccessKey",
    },
  };

  const userAgentInfo = `azsdk-js-event-grid-modular-rest/1.0.0-beta.1`;
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

  const client = getClient(
    baseUrl,
    credentials,
    options
  ) as AzureMessagingEventGridClient;

  return client;
}
