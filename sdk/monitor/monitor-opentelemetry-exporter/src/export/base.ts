// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { diag } from "@opentelemetry/api";
import { ConnectionStringParser } from "../utils/connectionStringParser.js";
import type { AzureMonitorExporterOptions } from "../config.js";
import {
  ALLOWED_REDIRECT_DOMAIN_SUFFIX_GROUPS,
  DEFAULT_BREEZE_ENDPOINT,
  ENV_AZURE_MONITOR_AUTO_ATTACH,
  ENV_CONNECTION_STRING,
  isEnvVarTrue,
  LEGACY_ENV_DISABLE_STATSBEAT,
} from "../Declarations/Constants.js";
import { ConfigurationManager } from "../_configuration/configurationManager.js";
import type { ConfigurationProfileValues } from "../_configuration/configurationProfile.js";
import * as ai from "../utils/constants/applicationinsights.js";

/**
 * Azure Monitor OpenTelemetry Trace Exporter.
 */
export abstract class AzureMonitorBaseExporter {
  /**
   * Instrumentation key to be used for exported envelopes
   */
  protected instrumentationKey: string = "";
  /**
   * Ingestion Endpoint URL
   */
  protected endpointUrl: string = "";
  /**
   *Flag to determine if exporter will generate Statsbeat data
   */
  protected trackStatsbeat: boolean = false;
  /**
   * Instrumentation key to be used for exported envelopes
   */
  protected aadAudience: string | undefined;

  /**
   * Flag to determine if the Exporter is a Statsbeat Exporter
   */
  private isStatsbeatExporter: boolean;

  /**
   * Exporter internal configuration
   */
  private readonly options: AzureMonitorExporterOptions;

  /**
   * Initializes a new instance of the AzureMonitorBaseExporter class.
   * @param AzureMonitorExporterOptions - Exporter configuration.
   */
  constructor(options: AzureMonitorExporterOptions = {}, isStatsbeatExporter?: boolean) {
    this.options = options;
    this.instrumentationKey = "";
    this.endpointUrl = DEFAULT_BREEZE_ENDPOINT;
    const connectionString = this.options.connectionString || process.env[ENV_CONNECTION_STRING];
    this.isStatsbeatExporter = isStatsbeatExporter ? isStatsbeatExporter : false;
    let region = "";

    if (connectionString) {
      const parsedConnectionString = ConnectionStringParser.parse(connectionString);
      this.instrumentationKey =
        parsedConnectionString.instrumentationkey || this.instrumentationKey;
      this.endpointUrl = parsedConnectionString.ingestionendpoint?.trim() || this.endpointUrl;
      this.aadAudience = parsedConnectionString.aadaudience;
      region = parsedConnectionString.location || getRegion(this.endpointUrl);
    }

    // Instrumentation key is required
    if (!this.instrumentationKey) {
      const message =
        "No instrumentation key or connection string was provided to the Azure Monitor Exporter";
      diag.error(message);
      throw new Error(message);
    }
    if (!ConnectionStringParser.validateInstrumentationKey(this.instrumentationKey)) {
      const message = "Invalid instrumentation key was provided to the Azure Monitor Exporter";
      diag.error(message);
      throw new Error(message);
    }
    if (!this.isStatsbeatExporter) {
      ConfigurationManager.getInstance().initialize(
        createConfigurationProfile(this.instrumentationKey, region),
      );
    }
    this.trackStatsbeat = !this.isStatsbeatExporter && !process.env[LEGACY_ENV_DISABLE_STATSBEAT];

    diag.debug("AzureMonitorExporter was successfully setup");
  }
}

function createConfigurationProfile(
  instrumentationKey: string,
  region: string,
): Partial<ConfigurationProfileValues> {
  return {
    os: getOperatingSystem(),
    rp: getResourceProvider(),
    attach: isEnvVarTrue(ENV_AZURE_MONITOR_AUTO_ATTACH) ? "integratedauto" : "manual",
    version: ai.packageVersion,
    component: "ext",
    region,
    ikey: instrumentationKey,
  };
}

function getOperatingSystem(): string {
  switch (process.platform) {
    case "win32":
      return "windows";
    case "linux":
    case "darwin":
      return process.platform;
    default:
      return "unknown";
  }
}

function getResourceProvider(): string {
  if (process.env.FUNCTIONS_WORKER_RUNTIME) {
    return "fn";
  }
  if (process.env.WEBSITE_SITE_NAME) {
    return "appsvc";
  }
  if (process.env.AKS_ARM_NAMESPACE_ID || process.env.KUBERNETES_SERVICE_HOST) {
    return "aks";
  }
  return "unknown";
}

function getRegion(endpointUrl: string): string {
  try {
    const hostname = new URL(endpointUrl).hostname;
    const match = /^([a-z0-9]+)(?:-\d+)?\.in(\.applicationinsights\.[a-z.]+)$/i.exec(hostname);
    if (
      !match ||
      !ALLOWED_REDIRECT_DOMAIN_SUFFIX_GROUPS.some((suffixGroup) =>
        suffixGroup.includes(match[2].toLowerCase()),
      )
    ) {
      return "";
    }
    return match[1];
  } catch {
    return "";
  }
}
