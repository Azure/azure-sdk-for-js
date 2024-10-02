// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { ContainerServiceClient } from "./clientDefinitions";
import { customizedApiVersionPolicy } from "./customizedApiVersionPolicy";

export default function createClient(
  credentials: TokenCredential,
  options: ClientOptions = {},
): ContainerServiceClient {
  const baseUrl = options.baseUrl ?? "https://management.azure.com";
  options.apiVersion = options.apiVersion ?? "2022-05-02-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://management.azure.com/.default"],
    },
  };

  const userAgentInfo = `azsdk-js-arm-containerservice-rest/1.0.0-beta.1`;
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

  const client = getClient(baseUrl, credentials, options) as ContainerServiceClient;

  // Considering the container service backend only supports the old version so we need to add customized policy
  client.pipeline.removePolicy({
    name: "ApiVersionPolicy",
  });
  client.pipeline.addPolicy(customizedApiVersionPolicy(options));
  return client;
}
