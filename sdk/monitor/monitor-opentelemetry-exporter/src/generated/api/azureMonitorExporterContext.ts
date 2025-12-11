// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import { Versions } from "../models/models.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";

/** OpenTelemetry Exporter for Azure Monitor */
export interface AzureMonitorExporterContext extends Client {
  /** The service API version. */
  apiVersion: Versions;
}

/** Optional parameters for the client. */
export interface AzureMonitorExporterClientOptionalParams extends ClientOptions {
  /** Application Insights' Breeze endpoint. */
  host?: string;
  /** The service API version. */
  apiVersion?: string;
}

/** OpenTelemetry Exporter for Azure Monitor */
export function createAzureMonitorExporter(
  options: AzureMonitorExporterClientOptionalParams = {},
): AzureMonitorExporterContext {
  const host = options.host ?? "https://dc.services.visualstudio.com";
  const apiVersion = options.apiVersion ?? "v2.1";
  const endpointUrl = options.endpoint ?? `${host}/${apiVersion}`;
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-monitor-opentelemetry-exporter/1.0.0-beta.1`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-api ${userAgentInfo}`
    : `azsdk-js-api ${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
  };
  const clientContext = getClient(endpointUrl, undefined, updatedOptions);
  clientContext.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  return { ...clientContext, apiVersion } as AzureMonitorExporterContext;
}
