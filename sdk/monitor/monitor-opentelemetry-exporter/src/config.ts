// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { TokenCredential } from "@azure/core-auth";
import type { ServiceApiVersion } from "./Declarations/Constants.js";
import type { ClientOptions } from "@azure-rest/core-client";

/**
 * Optional parameters for the Application Insights client.
 * Includes legacy client options for backward compatibility.
 */
export interface ApplicationInsightsClientOptionalParams extends ClientOptions {
  /**
   * Legacy base URI option retained for backward compatibility.
   * @deprecated This property is deprecated and will be removed soon, please use endpoint instead
   */
  baseUri?: string;
  /**
   * Authentication scopes retained for backward compatibility.
   */
  credentialScopes?: string | string[];
  /**
   * Legacy request content type option retained for backward compatibility.
   */
  requestContentType?: string;
  /**
   * Credential used to authenticate the request.
   */
  credential?: TokenCredential;
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
