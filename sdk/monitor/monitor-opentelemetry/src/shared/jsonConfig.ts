// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as fs from "fs";
import * as path from "path";
import { AzureMonitorOpenTelemetryOptions, InstrumentationOptions } from "./types";
import { AzureMonitorExporterOptions } from "@azure/monitor-opentelemetry-exporter";
import { Logger } from "./logging";

const ENV_CONFIGURATION_FILE = "APPLICATIONINSIGHTS_CONFIGURATION_FILE";

/**
 * Azure Monitor OpenTelemetry Client Configuration through JSON File
 * @internal
 */
export class JsonConfig implements AzureMonitorOpenTelemetryOptions {
  /** The rate of telemetry items tracked that should be transmitted (Default 1.0) */
  public samplingRatio?: number;
  /** Azure Monitor Exporter Configuration */
  public azureMonitorExporterConfig?: AzureMonitorExporterOptions;
  /**
   * Sets the state of performance tracking (enabled by default)
   * if true performance counters will be collected every second and sent to Azure Monitor
   */
  public enableAutoCollectPerformance?: boolean;
  /**
   * Sets the state of standard metrics tracking (enabled by default)
   * if true Standard metrics will be collected every minute and sent to Azure Monitor
   */
  public enableAutoCollectStandardMetrics?: boolean;
  /**
   * OpenTelemetry Instrumentations configuration included as part of Azure Monitor (azureSdk, http, mongoDb, mySql, postgreSql, redis, redis4)
   */
  public instrumentationOptions?: InstrumentationOptions;

  private static _instance: JsonConfig;

  /** Get Singleton instance */
  public static getInstance() {
    if (!JsonConfig._instance) {
      JsonConfig._instance = new JsonConfig();
    }
    return JsonConfig._instance;
  }

  /**
   * Initializes a new instance of the JsonConfig class.
   */
  constructor() {
    this._loadJsonFile();
  }

  private _loadJsonFile() {
    const configFileName = "applicationinsights.json";
    const rootPath = path.join(__dirname, "../../../../"); // Root of applicationinsights folder (__dirname = ../out)
    let tempDir = path.join(rootPath, configFileName); // default
    const configFile = process.env[ENV_CONFIGURATION_FILE];
    if (configFile) {
      if (path.isAbsolute(configFile)) {
        tempDir = configFile;
      } else {
        tempDir = path.join(rootPath, configFile); // Relative path to applicationinsights folder
      }
    }
    try {
      const jsonConfig: AzureMonitorOpenTelemetryOptions = JSON.parse(
        fs.readFileSync(tempDir, "utf8")
      );
      this.azureMonitorExporterConfig = jsonConfig.azureMonitorExporterConfig;
      this.samplingRatio = jsonConfig.samplingRatio;
      this.enableAutoCollectPerformance = jsonConfig.enableAutoCollectPerformance;
      this.enableAutoCollectStandardMetrics = jsonConfig.enableAutoCollectStandardMetrics;
      this.instrumentationOptions = jsonConfig.instrumentationOptions;
    } catch (err) {
      Logger.getInstance().info("Missing or invalid JSON config file: ", err);
    }
  }
}
