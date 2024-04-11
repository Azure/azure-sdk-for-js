// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { ClientOptions } from "@azure-rest/core-client";
import { EventGridContext } from "../rest/index";
import getClient from "../rest/index";

export interface EventGridClientOptions extends ClientOptions {}

export { EventGridContext } from "../rest/index";

/** Azure Messaging EventGrid Client */
export function createEventGrid(
  endpoint: string,
  credential: KeyCredential | TokenCredential,
  options: EventGridClientOptions = {},
): EventGridContext {
  const clientContext = getClient(endpoint, credential, options);
  return clientContext;
}
