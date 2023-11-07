// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";
import { EventGridContext } from "../rest/index";
import { TokenCredential } from "@azure/core-auth";
import getClient from "../rest/index";

export interface EventGridClientOptions extends ClientOptions {}

export { EventGridContext } from "../rest/index";

/** Azure Messaging EventGrid Client */
export function createEventGrid(
  endpoint: string,
  credential: any | TokenCredential,
  options: EventGridClientOptions = {}
): EventGridContext {
  const baseUrl = endpoint;
  const clientContext = getClient(baseUrl, credential, options);
  return clientContext;
}
