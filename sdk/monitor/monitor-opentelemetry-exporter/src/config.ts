// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { TokenCredential } from "@azure/core-http";
import {
  DEFAULT_BREEZE_API_VERSION,
  DEFAULT_BREEZE_ENDPOINT,
  ServiceApiVersion,
} from "./Declarations/Constants";

const DEFAULT_BATCH_SEND_RETRY_INTERVAL_MS = 60_000;
const DEFAULT_MAX_CONSECUTIVE_FAILURES_BEFORE_WARNING = 10;

/**
 * Provides configuration options for AzureMonitorTraceExporter.
 */
export interface AzureExporterConfig {
  /**
   * Azure Monitor Connection String, if not provided the exporter will try to use environment variable APPLICATIONINSIGHTS_CONNECTION_STRING
   * Ex: "InstrumentationKey=00000000-0000-0000-0000-000000000000;IngestionEndpoint=https://dc.services.visualstudio.com"
   */
  connectionString?: string;
  /**
   * Azure service API version.
   */
  apiVersion?: ServiceApiVersion;
  /**
   * Azure Active Directory Credential
   */
  aadTokenCredential?: TokenCredential;
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
  aadTokenCredential?: TokenCredential;
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
  apiVersion: DEFAULT_BREEZE_API_VERSION,
};
