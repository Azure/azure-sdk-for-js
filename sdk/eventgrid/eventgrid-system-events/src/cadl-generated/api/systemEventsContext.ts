// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";
import { SystemEventsContext } from "../rest/index";
import getClient from "../rest/index";

/** Optional parameters for the client. */
export interface SystemEventsClientOptionalParams extends ClientOptions {}

export { SystemEventsContext } from "../rest/index";

/** Azure Messaging EventGrid SystemEvents */
export function createSystemEvents(
  endpoint: string,
  options: SystemEventsClientOptionalParams = {},
): SystemEventsContext {
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentPrefix = prefixFromOptions ? `${prefixFromOptions} azsdk-js-api` : "azsdk-js-api";

  const clientContext = getClient(endpoint, {
    ...options,
    userAgentOptions: { userAgentPrefix },
  });
  return clientContext;
}
