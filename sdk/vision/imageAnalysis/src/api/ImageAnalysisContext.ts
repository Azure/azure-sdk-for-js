// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential } from "@azure/core-auth";
import { ClientOptions } from "@azure-rest/core-client";
import { ImageAnalysisContext } from "../rest/index.js";
import getClient from "../rest/index.js";

export interface ImageAnalysisClientOptions extends ClientOptions {}

export { ImageAnalysisContext } from "../rest/index.js";

export function createImageAnalysis(
  endpoint: string,
  credential: KeyCredential,
  options: ImageAnalysisClientOptions = {}
): ImageAnalysisContext {
  const clientContext = getClient(endpoint, credential, options);
  return clientContext;
}
