// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { ClientOptions } from "@azure-rest/core-client";
import { ModelClientContext } from "../rest/index.js";
import getClient from "../rest/index.js";

export interface ChatCompletionsClientOptions extends ClientOptions {
  /** The API version to use for this operation. */
  apiVersion?: string;
}

export { ModelClientContext } from "../rest/index.js";

export function createChatCompletions(
  endpoint: string,
  credential: KeyCredential | TokenCredential,
  options: ChatCompletionsClientOptions = {},
): ModelClientContext {
  const clientContext = getClient(endpoint, credential, options);
  return clientContext;
}
