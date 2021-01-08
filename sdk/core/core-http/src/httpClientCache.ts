// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient } from "./httpClient";
import { DefaultHttpClient } from "./defaultHttpClient";

let cachedHttpClient: HttpClient | undefined;

export function getCachedDefaultHttpClient(): HttpClient {
  if (!cachedHttpClient) {
    cachedHttpClient = new DefaultHttpClient();
  }

  return cachedHttpClient;
}
