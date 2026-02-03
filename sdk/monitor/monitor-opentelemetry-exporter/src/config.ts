// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { TokenCredential } from "@azure/core-auth";
import type { ServiceApiVersion } from "./Declarations/Constants.js";
import type { ServiceClientOptions } from "@azure/core-client";
import type { ClientOptions as RestClientOptions } from "@azure-rest/core-client";

// Public optional params must be a single symbol; extend both core client option shapes without exporting the generated name
/**
 * Optional parameters for the Application Insights client; extends both core client option shapes so
 * callers can pass pipeline and REST options (host/endpoint included for compatibility).
 */
export interface ApplicationInsightsClientOptionalParams
  extends ServiceClientOptions, RestClientOptions {
  /** Breeze endpoint: https://dc.services.visualstudio.com */
  host?: string;
  /** Overrides client endpoint. */
  endpoint?: string;
}

/**
 * Provides configuration options for AzureMonitorTraceExporter.
 */
export interface AzureMonitorExporterOptions extends ApplicationInsightsClientOptionalParams {
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
   * Token Credential
   */
  credential?: TokenCredential;
  /**
   * Directory to store retriable telemetry when it fails to export.
   */
  storageDirectory?: string;
  /**
   * Disable offline storage when telemetry cannot be exported.
   */
  disableOfflineStorage?: boolean;
}
