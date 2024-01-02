// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const AZURE_MONITOR_OPENTELEMETRY_VERSION = "1.1.1";
export const AZURE_MONITOR_STATSBEAT_FEATURES = "AZURE_MONITOR_STATSBEAT_FEATURES";

/**
 * Default Web Snippet Source
 * @internal
 */
export const WEB_INSTRUMENTATION_DEFAULT_SOURCE = "https://js.monitor.azure.com/scripts/b/ai";

/**
 * Default Breeze endpoint.
 * @internal
 */
export const DEFAULT_BREEZE_ENDPOINT = "https://dc.services.visualstudio.com";
/**
 * Default Live Metrics endpoint.
 * @internal
 */
export const DEFAULT_LIVEMETRICS_ENDPOINT = "https://rt.services.visualstudio.com";

export enum StatsbeatFeature {
  NONE = 0,
  DISK_RETRY = 1,
  AAD_HANDLING = 2,
  WEB_SNIPPET = 4,
  DISTRO = 8,
}

export enum StatsbeatInstrumentation {
  NONE = 0,
  AZURE_CORE_TRACING = 1,
  MONGODB = 2,
  MYSQL = 4,
  REDIS = 8,
  POSTGRES = 16,
}
