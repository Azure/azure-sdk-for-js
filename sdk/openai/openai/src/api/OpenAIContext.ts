// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { ClientOptions } from "@azure-rest/core-client";
import { OpenAIContext } from "../rest/index.js";
import getClient from "../rest/index.js";

export interface OpenAIClientOptions extends ClientOptions {
  /** The API version to use for this operation. */
  apiVersion?: string;
}

export { OpenAIContext } from "../rest/index.js";

export function createOpenAI(
  endpointParam: string,
  credential: KeyCredential | TokenCredential,
  options: OpenAIClientOptions = {},
): OpenAIContext {
  const clientContext = getClient(endpointParam, credential, options);
  return clientContext;
}
