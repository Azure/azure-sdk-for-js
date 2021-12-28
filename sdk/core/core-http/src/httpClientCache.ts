// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DefaultHttpClient } from "./defaultHttpClient";
import { HttpClient } from "./httpClient";

let cachedHttpClient: HttpClient | undefined;

export function getCachedDefaultHttpClient(): HttpClient {
  if (!cachedHttpClient) {
    cachedHttpClient = new DefaultHttpClient();
  }

  return cachedHttpClient;
}
