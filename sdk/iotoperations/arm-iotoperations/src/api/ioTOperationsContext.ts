// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

/** Microsoft.IoTOperations Resource Provider management API. */
export interface IoTOperationsContext extends Client {
  /** The ID of the target subscription. The value must be an UUID. */
  subscriptionId: string;
}

/** Optional parameters for the client. */
export interface IoTOperationsClientOptionalParams extends ClientOptions {}

/** Microsoft.IoTOperations Resource Provider management API. */
export function createIoTOperations(
  credential: TokenCredential,
  subscriptionId: string,
  options: IoTOperationsClientOptionalParams = {},
): IoTOperationsContext {
  const endpointUrl = options.endpoint ?? options.baseUrl ?? "https://management.azure.com";
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-arm-iotoperations/1.0.0-beta.1`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-api ${userAgentInfo}`
    : `azsdk-js-api ${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: {
      scopes: options.credentials?.scopes ?? [`${endpointUrl}/.default`],
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  clientContext.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  if (options.apiVersion) {
    logger.warning(
      "This client does not support client api-version, please change it at the operation level",
    );
  }
  return { ...clientContext, subscriptionId } as IoTOperationsContext;
}
