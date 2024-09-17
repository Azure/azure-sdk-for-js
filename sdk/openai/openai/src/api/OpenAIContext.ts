// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { ClientOptions } from "@azure-rest/core-client";
import { OpenAIContext } from "../rest/index.js";
import getClient from "../rest/index.js";

export interface OpenAIClientOptions extends ClientOptions {}

export { OpenAIContext } from "../rest/index.js";

export function createOpenAI(
  endpoint: string,
  credential: KeyCredential | TokenCredential,
  options: OpenAIClientOptions = {},
): OpenAIContext {
  const clientContext = getClient(endpoint, credential, options);
  return clientContext;
}
