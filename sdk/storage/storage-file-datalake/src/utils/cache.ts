// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DefaultHttpClient } from "@azure/core-http";

const _defaultHttpClient = new DefaultHttpClient();

export function getCachedDefaultHttpClient() {
  return _defaultHttpClient;
}
