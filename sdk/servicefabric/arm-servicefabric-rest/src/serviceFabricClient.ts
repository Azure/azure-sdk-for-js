// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { ServiceFabricClient } from "./clientDefinitions";
import { customizedApiVersionPolicy } from "./customizedApiVersionPolicy";

export default function createClient(
  credentials: TokenCredential,
  options: ClientOptions = {},
): ServiceFabricClient {
  const baseUrl = options.baseUrl ?? "https://management.azure.com";
  options.apiVersion = options.apiVersion ?? "2021-06-01";
  options = {
    ...options,
    credentials: {
      scopes: ["https://management.azure.com/.default"],
    },
  };

  const userAgentInfo = `azsdk-js-arm-servicefabric-rest/1.0.0-beta.1`;
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

  const client = getClient(baseUrl, credentials, options) as ServiceFabricClient;
  // Considering ApiVersionPolicy in core has bugs so we replace with our customized one
  client.pipeline.removePolicy({
    name: "ApiVersionPolicy",
  });
  client.pipeline.addPolicy(customizedApiVersionPolicy(options));

  return client;
}
