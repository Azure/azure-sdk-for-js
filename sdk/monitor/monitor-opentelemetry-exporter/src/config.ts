// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { TokenCredential } from "@azure/core-auth";
import type { ServiceApiVersion } from "./Declarations/Constants.js";
import type { ClientOptions } from "@azure-rest/core-client";

/**
 * Optional parameters for the Application Insights client.
 */
export interface ApplicationInsightsClientOptionalParams extends ClientOptions {
  /**
   * Legacy base URI override.
   *
   * @deprecated Use `endpoint` instead. This option is not supported by the TypeSpec-generated client.
   */
  baseUri?: string;
  /**
   * Authentication scopes for Microsoft Entra ID.
   *
   * @deprecated Use `credentials.scopes` instead.
   */
  credentialScopes?: string | string[];
  /**
   * Legacy default request content type.
   *
   * @deprecated This option is not supported by the TypeSpec-generated client.
   */
  requestContentType?: string;
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
