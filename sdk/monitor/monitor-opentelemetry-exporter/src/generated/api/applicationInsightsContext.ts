// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import pkgJson from "@azure/monitor-opentelemetry-exporter/package.json" with { type: "json" };
import { Versions } from "../models/models.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

/** OpenTelemetry Exporter for Azure Monitor */
export interface ApplicationInsightsContext extends Client {
  /** Application Insights' Breeze host. */
  host?: string;
  /** The service API version. */
  apiVersion?: Versions;
}

/** Optional parameters for the client. */
export interface ApplicationInsightsClientOptionalParams extends ClientOptions {
  /** Application Insights' Breeze host. */
  host?: string;
  /** The service API version. */
  apiVersion?: string;
  /** @deprecated Use `credentials.scopes` instead. */
  credentialScopes?: string | string[];
}

/** OpenTelemetry Exporter for Azure Monitor */
export function createApplicationInsights(
  credential: any | TokenCredential,
  options: ApplicationInsightsClientOptionalParams = {},
): ApplicationInsightsContext {
  const host = options.host ?? "https://dc.services.visualstudio.com";
  const apiVersion = options.apiVersion ?? "v2.1";
  const endpointUrl = options.endpoint ?? `${host}/${apiVersion}`;
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-monitor-opentelemetry-exporter/${pkgJson.version}`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} ${userAgentInfo}`
    : `${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: {
      ...options.loggingOptions,
      logger: options.loggingOptions?.logger ?? logger.info,
    },
    credentials: {
      scopes: options.credentials?.scopes ??
        (typeof options.credentialScopes === "string"
          ? [options.credentialScopes]
          : options.credentialScopes) ?? ["https://monitor.azure.com/.default"],
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  return { ...clientContext, apiVersion, host } as ApplicationInsightsContext;
}
