// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { ClientOptions } from "@azure-rest/core-client";
import { AssistantsContext } from "../rest/index.js";
import getClient from "../rest/index.js";

export interface AssistantsClientOptions extends ClientOptions {}

export { AssistantsContext } from "../rest/index.js";

/** Azure OpenAI APIs for Assistants. */
export function createAssistants(
  endpointParam: string,
  credential: KeyCredential | TokenCredential,
  options: AssistantsClientOptions = {},
): AssistantsContext {
  const clientContext = getClient(endpointParam, credential, options);
  return clientContext;
}
