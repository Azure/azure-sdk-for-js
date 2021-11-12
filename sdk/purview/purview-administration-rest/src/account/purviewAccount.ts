// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions, getClient } from "@azure-rest/core-client";
import { PurviewAccountRestClient } from "./clientDefinitions";
import { TokenCredential } from "@azure/core-auth";

export function PurviewAccountClient(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
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
