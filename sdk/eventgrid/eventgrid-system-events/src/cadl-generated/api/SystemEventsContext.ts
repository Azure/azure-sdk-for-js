// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";
import { SystemEventsContext } from "../rest/index";
import getClient from "../rest/index";

export interface SystemEventsClientOptions extends ClientOptions {}

export { SystemEventsContext } from "../rest/index";

/** Azure Messaging EventGrid SystemEvents */
export function createSystemEvents(
  endpoint: string,
  options: SystemEventsClientOptions = {},
): SystemEventsContext {
  const clientContext = getClient(endpoint, options);
  return clientContext;
}
