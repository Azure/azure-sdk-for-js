// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { PurviewCatalogLike } from "./clientDefinitions";

export default function PurviewCatalog(
  Endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): PurviewCatalogLike {
  const baseUrl = options.baseUrl ?? `${Endpoint}/catalog/api`;
  options.apiVersion = options.apiVersion ?? "2021-05-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://purview.azure.net/.default"],
    },
  };

  const client = getClient(baseUrl, credentials, options) as PurviewCatalogLike;

  return client;
}
