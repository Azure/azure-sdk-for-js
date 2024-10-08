// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenCredential } from "@azure/core-auth";
import { ClientOptions } from "@azure-rest/core-client";
import { HealthDataAIServicesContext } from "../rest/index.js";
import getClient from "../rest/index.js";

/** Optional parameters for the client. */
export interface HealthDataAIServicesClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  apiVersion?: string;
}

export { HealthDataAIServicesContext } from "../rest/index.js";

/** The Microsoft Azure management API provides create, read, update, and delete functionality for Microsoft HealthDataAIServices resources including deidServices */
export function createHealthDataAIServices(
  credential: TokenCredential,
  options: HealthDataAIServicesClientOptionalParams = {},
): HealthDataAIServicesContext {
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentPrefix = prefixFromOptions ? `${prefixFromOptions} azsdk-js-api` : "azsdk-js-api";

  const clientContext = getClient(credential, {
    ...options,
    userAgentOptions: { userAgentPrefix },
  });
  return clientContext;
}
