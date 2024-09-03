// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureLogLevel, AzureLogger, createClientLogger, setLogLevel } from "@azure/logger";
import { diag, DiagLogger, DiagLogLevel } from "@opentelemetry/api";
import { DiagFileConsoleLogger } from "./diagFileConsoleLogger";

export class Logger {
  private static instance: Logger;
  private diagLevel: DiagLogLevel;
  private azureLogger: AzureLogger;
  private openTelemetryLogger: DiagLogger;
  private logToAzureLogger: boolean;
  private logToOpenTelemetry: boolean;

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  constructor() {
    this.azureLogger = createClientLogger("@azure/monitor-opentelemetry");
    this.openTelemetryLogger = diag.createComponentLogger({
      namespace: "@azure/monitor-opentelemetry",
    });
    this.logToOpenTelemetry = true;
    this.logToAzureLogger = false;
    const otelLogLevelEnv =
      process.env.APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL || process.env.OTEL_LOG_LEVEL;
    this.diagLevel = DiagLogLevel.WARN; // Default
    switch (otelLogLevelEnv) {
      case "ALL":
        this.diagLevel = DiagLogLevel.ALL;
        break;
      case "DEBUG":
        this.diagLevel = DiagLogLevel.DEBUG;
        break;
      case "ERROR":
        this.diagLevel = DiagLogLevel.ERROR;
        break;
      case "INFO":
        this.diagLevel = DiagLogLevel.INFO;
        break;
      case "NONE":
        this.diagLevel = DiagLogLevel.NONE;
        break;
      case "VERBOSE":
        this.diagLevel = DiagLogLevel.VERBOSE;
        break;
      case "WARN":
        this.diagLevel = DiagLogLevel.WARN;
        break;
    }
    // Set OpenTelemetry Logger
    const fileConsoleLogger = new DiagFileConsoleLogger();
    diag.setLogger(fileConsoleLogger, {
      logLevel: this.diagLevel,
      suppressOverrideMessage: true,
    });

    const azureLogLevelEnv = process.env.APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL;
    switch (azureLogLevelEnv) {
      // Application Insights levels
      case "VERBOSE":
        setLogLevel("verbose");
        break;
      case "INFO":
        setLogLevel("info");
        break;
      case "WARN":
        setLogLevel("warning");
        break;
      case "ERROR":
        setLogLevel("error");
        break;
      default:
        setLogLevel((process.env.AZURE_LOG_LEVEL as AzureLogLevel) || "warning");
        break;
    }
    // Override Azure logger
    AzureLogger.log = (...args) => {
      fileConsoleLogger.logMessage(...args);
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public error(message?: any, ...args: any[]): void {
    if (this.logToAzureLogger) {
      this.azureLogger.error(message, args);
    }
    if (this.logToOpenTelemetry) {
      this.openTelemetryLogger.error(message, args);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public warn(message?: any, ...args: any[]): void {
    if (this.logToAzureLogger) {
      this.azureLogger.warning(message, args);
    }
    if (this.logToOpenTelemetry) {
      this.openTelemetryLogger.warn(message, args);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public info(message?: any, ...args: any[]): void {
    if (this.logToAzureLogger) {
      this.azureLogger.info(message, args);
    }
    if (this.logToOpenTelemetry) {
      this.openTelemetryLogger.info(message, args);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public debug(message?: any, ...args: any[]): void {
    if (this.logToAzureLogger) {
      this.azureLogger.verbose(message, args);
    }
    if (this.logToOpenTelemetry) {
      this.openTelemetryLogger.debug(message, args);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public verbose(message?: any, ...args: any[]): void {
    if (this.logToAzureLogger) {
      this.azureLogger.verbose(message, args);
    }
    if (this.logToOpenTelemetry) {
      this.openTelemetryLogger.verbose(message, args);
    }
  }

  public setLogToAzureLogger(value: boolean): void {
    this.logToAzureLogger = value;
  }

  public setLogToOpenTelemetry(value: boolean): void {
    this.logToOpenTelemetry = value;
  }
}
