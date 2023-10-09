// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const AZURE_MONITOR_OPENTELEMETRY_VERSION = "1.0.1";
export const AZURE_MONITOR_STATSBEAT_FEATURES = "AZURE_MONITOR_STATSBEAT_FEATURES";

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
