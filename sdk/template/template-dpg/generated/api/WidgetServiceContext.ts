// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WidgetServiceContext } from "../rest/index.js";
import { ClientOptions } from "@azure-rest/core-client";
import getClient from "../rest/index.js";

export { WidgetServiceContext } from "../rest/index.js";

export interface WidgetServiceClientOptions extends ClientOptions {}

/** */
export function createWidgetService(
  endpoint: string,
  options: WidgetServiceClientOptions = {}
): WidgetServiceContext {
  const baseUrl = endpoint;
  const clientContext = getClient(baseUrl, options);
  return clientContext;
}
