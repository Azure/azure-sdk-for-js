// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import { KnownMonitorAudience, KnownVersions } from "../models/models.js";
import type { Client, ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import type { TokenCredential } from "@azure/core-auth";

/** Azure Monitor data collection client. */
export interface LogsIngestionContext extends Client {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion: string;
}

/** Optional parameters for the client. */
export interface LogsIngestionClientOptions extends ClientOptions {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;

  /**
   * The Audience to use for authentication with Microsoft Entra ID. The
   * audience is not considered when using a shared key.
   * {@link KnownMonitorAudience} can be used interchangeably with audience
   */
  audience?: string;
}

/** Azure Monitor data collection client. */
export function createLogsIngestion(
  endpoint: string,
  tokenCredential: TokenCredential,
  options: LogsIngestionClientOptions = {},
): LogsIngestionContext {
  const endpointUrl = options.endpoint ?? options.baseUrl ?? String(endpoint);
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-monitor-ingestion/1.2.0`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-api ${userAgentInfo}`
    : `azsdk-js-api ${userAgentInfo}`;
  const scope: string = options?.audience
    ? `${options.audience}/.default`
    : `${KnownMonitorAudience.AzurePublicCloud}/.default`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: {
      scopes: scope ? [scope] : options.credentials?.scopes,
    },
  };
  const clientContext = getClient(endpointUrl, tokenCredential, updatedOptions);
  clientContext.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  const apiVersion = options.apiVersion ?? "2023-01-01";
  clientContext.pipeline.addPolicy({
    name: "ClientApiVersionPolicy",
    sendRequest: (req, next) => {
      // Use the apiVersion defined in request url directly
      // Append one if there is no apiVersion and we have one at client options
      const url = new URL(req.url);
      if (!url.searchParams.get("api-version")) {
        req.url = `${req.url}${
          Array.from(url.searchParams.keys()).length > 0 ? "&" : "?"
        }api-version=${apiVersion}`;
      }

      return next(req);
    },
  });
  return { ...clientContext, apiVersion } as LogsIngestionContext;
}
