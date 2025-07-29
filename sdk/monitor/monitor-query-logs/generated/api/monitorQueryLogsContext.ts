// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import { Versions } from "../models/models.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface MonitorQueryLogsContext extends Client {
  /** The service API version. */
  apiVersion: Versions;
}

/** Optional parameters for the client. */
export interface MonitorQueryLogsClientOptionalParams extends ClientOptions {
  /** The service API version. */
  apiVersion?: string;
}

export function createMonitorQueryLogs(
  credential: TokenCredential,
  options: MonitorQueryLogsClientOptionalParams = {},
): MonitorQueryLogsContext {
  const endpointParam = options.endpointParam ?? "https://api.loganalytics.io";
  const apiVersion = options.apiVersion ?? "v1";
  const endpointUrl = options.endpoint ?? `${endpointParam}/${apiVersion}`;
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-monitor-query-logs/1.0.0`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-api ${userAgentInfo}`
    : `azsdk-js-api ${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: {
      scopes: options.credentials?.scopes ?? [
        "https://api.loganalytics.io/.default",
      ],
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  clientContext.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  return { ...clientContext, apiVersion } as MonitorQueryLogsContext;
}
