// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DefaultHttpClient } from "@azure/core-http";
import { IHttpClient } from "../Pipeline";

const _defaultHttpClient = new DefaultHttpClient();

export function getCachedDefaultHttpClient(): IHttpClient {
  return _defaultHttpClient;
}
