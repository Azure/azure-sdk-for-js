// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import type { ClientOptions } from "@azure-rest/core-client";
import type { TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import type { WidgetServiceContext } from "../rest/index.js";
import getClient from "../rest/widgetServiceClient.js";

export { WidgetServiceContext } from "../rest/index.js";

export interface WidgetServiceClientOptions extends ClientOptions {}

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
