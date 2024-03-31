// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { diag } from "@opentelemetry/api";
import { ConnectionStringParser } from "../utils/connectionStringParser";
import { AzureMonitorExporterOptions } from "../config";
import {
  DEFAULT_BREEZE_ENDPOINT,
  ENV_CONNECTION_STRING,
  ENV_DISABLE_STATSBEAT,
} from "../Declarations/Constants";

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

    if (connectionString) {
      const parsedConnectionString = ConnectionStringParser.parse(connectionString);
      this.instrumentationKey =
        parsedConnectionString.instrumentationkey || this.instrumentationKey;
      this.endpointUrl = parsedConnectionString.ingestionendpoint?.trim() || this.endpointUrl;
      this.aadAudience = parsedConnectionString.aadaudience;
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
    this.trackStatsbeat = !this.isStatsbeatExporter && !process.env[ENV_DISABLE_STATSBEAT];

    diag.debug("AzureMonitorExporter was successfully setup");
  }
}
