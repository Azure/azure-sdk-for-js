// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential, isTokenCredential } from "@azure/core-auth";

import { ServiceFabricClient } from "./clientDefinitions";

function createClient(
  endpoint: string,
  credentials: TokenCredential,
  options?: ClientOptions
): ServiceFabricClient;
function createClient(endpoint: string, options?: ClientOptions): ServiceFabricClient;
function createClient(
  endpoint: string,
  credentialsOrOptions?: TokenCredential | ClientOptions,
  opts?: ClientOptions
): ServiceFabricClient {
  let options: ClientOptions | undefined;
  let credential: TokenCredential | undefined;

  if (isTokenCredential(credentialsOrOptions)) {
    credential = credentialsOrOptions;
    options = opts ?? {};
  } else {
    options = credentialsOrOptions ?? {};
  }

  const baseUrl = options.baseUrl ?? `${endpoint}`;
  options.apiVersion = options.apiVersion ?? "8.1";
  options = {
    ...options,
    credentials: {
      scopes: ["https://servicefabric.azure.net/.default"],
    },
  };

  const userAgentInfo = `azsdk-js-service-fabric-rest/1.0.0-beta.1`;
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

  const client = getClient(baseUrl, credential, options) as ServiceFabricClient;

  return client;
}

export default createClient;
