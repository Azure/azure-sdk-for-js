// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { ClientOptions } from "@azure-rest/core-client";
import { EventGridContext } from "../rest/index";
import getClient from "../rest/index";

export interface EventGridClientOptions extends ClientOptions {
  /** The API version to use for this operation. */
  apiVersion?: string;
}

export { EventGridContext } from "../rest/index";

/** Azure Messaging EventGrid Client */
export function createEventGrid(
  endpointParam: string,
  credential: KeyCredential | TokenCredential,
  options: EventGridClientOptions = {},
): EventGridContext {
  const clientContext = getClient(endpointParam, credential, options);
  return clientContext;
}
