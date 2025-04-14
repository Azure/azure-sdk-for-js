// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenCredential, isTokenCredential } from "@azure/core-auth";
import getClient from "../rest/widgetServiceClient.js";
import { ClientOptions } from "@azure-rest/core-client";
import { WidgetServiceContext } from "../../../generated/src/rest/clientDefinitions.js";

/**
 * This customization adds authentication to the client.
 */
export function createWidgetService(
  endpoint: string,
  options?: ClientOptions,
): WidgetServiceContext;
export function createWidgetService(
  endpoint: string,
  credential: TokenCredential,
  options?: ClientOptions,
): WidgetServiceContext;
export function createWidgetService(
  endpoint: string,
  credentialOrOptions?: TokenCredential | ClientOptions,
  options: ClientOptions = {},
): WidgetServiceContext {
  const baseUrl = endpoint;
  if (isTokenCredential(credentialOrOptions)) {
    return getClient(baseUrl, credentialOrOptions, options);
  } else {
    return getClient(baseUrl, credentialOrOptions);
  }
}
