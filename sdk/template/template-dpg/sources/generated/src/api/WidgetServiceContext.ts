// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { WidgetServiceContext } from "../rest/index.js";
import getClient from "../rest/index.js";
import { ClientOptions } from "@azure-rest/core-client";

export { WidgetServiceContext } from "../rest/index.js";

/** */
export function createWidgetService(
  endpoint: string,
  options: ClientOptions = {}
): WidgetServiceContext {
  const baseUrl = endpoint;
  const clientContext = getClient(baseUrl, options);
  return clientContext;
}
