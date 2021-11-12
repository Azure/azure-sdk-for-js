// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions, getClient } from "@azure-rest/core-client";
import { PurviewMetadataPoliciesRestClient } from "./clientDefinitions";
import { TokenCredential } from "@azure/core-auth";

export function PurviewMetadataPoliciesClient(
  Endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): PurviewMetadataPoliciesRestClient {
  const baseUrl = options.baseUrl ?? `${Endpoint}/policyStore`;
  options.apiVersion = options.apiVersion ?? "2021-07-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://purview.azure.net/.default"],
    },
  };

  return getClient(baseUrl, credentials, options) as PurviewMetadataPoliciesRestClient;
}
