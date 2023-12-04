// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const AZURE_MONITOR_OPENTELEMETRY_VERSION = "1.1.1";
export const AZURE_MONITOR_STATSBEAT_FEATURES = "AZURE_MONITOR_STATSBEAT_FEATURES";

export const WEB_INSTRUMENTATION_DEFAULT_SOURCE = "https://js.monitor.azure.com/scripts/b/ai";
export const WEB_INSTRUMENTATION_DEPRECATED_SOURCE = "https://az416426.vo.msecnd.net/scripts/b/ai";

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
