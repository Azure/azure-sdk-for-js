// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { ClientOptions } from "@azure-rest/core-client";
import { ChatProtocolContext } from "../rest/index.js";
import getClient from "../rest/index.js";

export interface ChatProtocolClientOptions extends ClientOptions {}

export { ChatProtocolContext } from "../rest/index.js";

/** Azure APIs for the Azure Chat protocol. */
export function createChatProtocol(
  endpoint: string,
  credential: KeyCredential | TokenCredential,
  options: ChatProtocolClientOptions = {}
): ChatProtocolContext {
  const clientContext = getClient(endpoint, credential, options);
  return clientContext;
}
