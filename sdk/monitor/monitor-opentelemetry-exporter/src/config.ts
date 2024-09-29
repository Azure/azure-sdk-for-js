// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { TokenCredential } from "@azure/core-auth";
import { ServiceApiVersion } from "./Declarations/Constants";
import { ApplicationInsightsClientOptionalParams } from "./generated";

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
