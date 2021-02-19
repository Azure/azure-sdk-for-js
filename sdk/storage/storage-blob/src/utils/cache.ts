// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createDefaultHttpsClient } from "@azure/core-https";
import { IHttpClient } from "../Pipeline";

const _defaultHttpClient = createDefaultHttpsClient();

export function getCachedDefaultHttpClient(): IHttpClient {
  return _defaultHttpClient;
}
