// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import type { TokenCredential } from "@azure/core-auth";
import type { PurviewAccountRestClient } from "./clientDefinitions";

export function PurviewAccountClient(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {},
): PurviewAccountRestClient {
  const baseUrl = options.baseUrl ?? `${endpoint}`;
  options.apiVersion = options.apiVersion ?? "2019-11-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://purview.azure.net/.default"],
    },
  };

  return getClient(baseUrl, credentials, options) as PurviewAccountRestClient;
}
