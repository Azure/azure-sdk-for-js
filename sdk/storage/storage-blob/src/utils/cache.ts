// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DefaultHttpsClient } from "@azure/core-https";
import { IHttpClient } from "../Pipeline";

const _defaultHttpClient = new DefaultHttpsClient();

export function getCachedDefaultHttpClient(): IHttpClient {
  return _defaultHttpClient;
}
