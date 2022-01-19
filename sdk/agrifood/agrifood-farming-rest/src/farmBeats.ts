// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { FarmBeatsRestClient } from "./clientDefinitions";

export default function FarmBeats(
  $host: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): FarmBeatsRestClient {
  const baseUrl = options.baseUrl ?? `${$host}`;
  options.apiVersion = options.apiVersion ?? "2021-03-31-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://farmbeats.azure.net/.default"],
    },
  };

  const client = getClient(baseUrl, credentials, options) as FarmBeatsRestClient;

  return client;
}
