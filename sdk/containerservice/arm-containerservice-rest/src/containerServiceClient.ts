// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { ContainerServiceClient } from "./clientDefinitions";

export default function createClient(
  credentials: TokenCredential,
  options: ClientOptions = {}
): ContainerServiceClient {
  const baseUrl = options.baseUrl ?? "https://management.azure.com";
  options.apiVersion = options.apiVersion ?? "2022-05-02-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["user_impersonation"]
    }
  };

  const userAgentInfo = `azsdk-js-arm-containerservice-rest/1.0.0-beta.1`;
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

  const client = getClient(
    baseUrl,
    credentials,
    options
  ) as ContainerServiceClient;

  return client;
}
