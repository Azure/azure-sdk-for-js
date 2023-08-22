// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";
import { OpenAIContext } from "../rest/index.js";
import { KeyCredential } from "@azure/core-auth";
import { TokenCredential } from "@azure/core-auth";
import getClient from "../rest/index.js";

export interface OpenAIClientOptions extends ClientOptions {}

export { OpenAIContext } from "../rest/index.js";

/** Azure OpenAI APIs for completions and search */
export function createOpenAI(
  endpoint: string,
  credential: KeyCredential | TokenCredential,
  options: OpenAIClientOptions = {}
): OpenAIContext {
  const baseUrl = endpoint;
  const clientContext = getClient(baseUrl, credential, options);
  return clientContext;
}
