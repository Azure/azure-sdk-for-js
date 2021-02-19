// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DEFAULT_BREEZE_API_VERSION,
  DEFAULT_BREEZE_ENDPOINT,
  ServiceApiVersion
} from "./Declarations/Constants";

const DEFAULT_BATCH_SEND_RETRY_INTERVAL_MS = 60_000;
const DEFAULT_MAX_CONSECUTIVE_FAILURES_BEFORE_WARNING = 10;

/**
 * Provides configuration options for AzureMonitorTraceExporter.
 */
export interface AzureExporterConfig {
  /**
   * Azure Connection String.
   */
  connectionString?: string;
  /**
   * Azure service API version.
   */
  apiVersion?: ServiceApiVersion;
}

/**
 * Internal Azure exporter configuration
 * @internal
 */
export interface AzureExporterInternalConfig {
  instrumentationKey: string;
  batchSendRetryIntervalMs: number;
  maxConsecutiveFailuresBeforeWarning: number;
  endpointUrl: string;
  apiVersion: ServiceApiVersion;
}

/**
 * Internal default Azure exporter configuration
 * @internal
 */
export const DEFAULT_EXPORTER_CONFIG: AzureExporterInternalConfig = {
  instrumentationKey: "",
  endpointUrl: DEFAULT_BREEZE_ENDPOINT,
  batchSendRetryIntervalMs: DEFAULT_BATCH_SEND_RETRY_INTERVAL_MS,
  maxConsecutiveFailuresBeforeWarning: DEFAULT_MAX_CONSECUTIVE_FAILURES_BEFORE_WARNING,
  apiVersion: DEFAULT_BREEZE_API_VERSION
};
