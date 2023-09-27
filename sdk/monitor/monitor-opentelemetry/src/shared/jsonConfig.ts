// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as fs from "fs";
import * as path from "path";
import { AzureMonitorOpenTelemetryOptions, InstrumentationOptions } from "./types";
import { AzureMonitorExporterOptions } from "@azure/monitor-opentelemetry-exporter";
import { Logger } from "./logging";

const ENV_CONFIGURATION_FILE = "APPLICATIONINSIGHTS_CONFIGURATION_FILE";
const ENV_CONTENT = "APPLICATIONINSIGHTS_CONFIGURATION_CONTENT";

/**
 * Azure Monitor OpenTelemetry Client Configuration through JSON File
 * @internal
 */
export class JsonConfig implements AzureMonitorOpenTelemetryOptions {
  /** The rate of telemetry items tracked that should be transmitted (Default 1.0) */
  public samplingRatio?: number;
  /** Azure Monitor Exporter Configuration */
  public azureMonitorExporterOptions?: AzureMonitorExporterOptions;
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
    let jsonString = "";
    const contentJsonConfig = process.env[ENV_CONTENT];
    // JSON string added directly in env variable
    if (contentJsonConfig) {
      jsonString = contentJsonConfig;
    }
    // JSON file
    else {
      let configFileName = "applicationinsights.json";
      let rootPath = path.join(__dirname, "../../../"); // Root of folder (__dirname = ../dist-esm/src)
      let tempDir = path.join(rootPath, configFileName); // default
      let configFile = process.env[ENV_CONFIGURATION_FILE];
      if (configFile) {
        if (path.isAbsolute(configFile)) {
          tempDir = configFile;
        } else {
          tempDir = path.join(rootPath, configFile); // Relative path to applicationinsights folder
        }
      }
      try {
        jsonString = fs.readFileSync(tempDir, "utf8");
      } catch (err) {
        Logger.getInstance().info("Failed to read JSON config file: ", err);
      }
    }
    try {
      const jsonConfig: AzureMonitorOpenTelemetryOptions = JSON.parse(jsonString);
      this.azureMonitorExporterOptions = jsonConfig.azureMonitorExporterOptions;
      this.samplingRatio = jsonConfig.samplingRatio;
      this.instrumentationOptions = jsonConfig.instrumentationOptions;
    } catch (err) {
      Logger.getInstance().info("Missing or invalid JSON config file: ", err);
    }
  }
}
