// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";
import { ChatContext } from "../rest/index.js";
import getClient from "../rest/index.js";

export interface ChatClientOptions extends ClientOptions {}

export { ChatContext } from "../rest/index.js";

/** placeholder */
export function createChat(
  endpoint: string,
  options: ChatClientOptions = {}
): ChatContext {
  const baseUrl = endpoint;
  const clientContext = getClient(baseUrl, options);
  return clientContext;
}
