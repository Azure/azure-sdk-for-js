// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { PurviewMetadataPoliciesRestClient } from "./clientDefinitions";

export function PurviewMetadataPolicies(
  Endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): PurviewMetadataPoliciesRestClient {
  const baseUrl = options.baseUrl ?? `${Endpoint}/policyStore`;
  options.apiVersion = options.apiVersion ?? "2021-07-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://purview.azure.net/.default"]
    }
  };

  const client = getClient(
    baseUrl,
    credentials,
    options
  ) as PurviewMetadataPoliciesRestClient;

  return client;
}
