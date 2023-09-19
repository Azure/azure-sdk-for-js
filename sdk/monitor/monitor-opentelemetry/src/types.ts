// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const AZURE_MONITOR_OPENTELEMETRY_VERSION = "1.0.0";
export const AZURE_MONITOR_STATSBEAT_FEATURES = "AZURE_MONITOR_STATSBEAT_FEATURES";

export enum StatsbeatFeature {
  DISK_RETRY = 0,
  AAD_HANDLING = 1,
  WEB_SNIPPET = 2,
  DISTRO = 4,
}

export enum StatsbeatInstrumentation {
  AZURE_CORE_TRACING = 0,
  MONGODB = 1,
  MYSQL = 2,
  REDIS = 4,
  POSTGRES = 8,
}
