// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { diag, DiagLogLevel } from "@opentelemetry/api";
import type { DiagLogger } from "@opentelemetry/api";
import { AzureLogger } from "@azure/logger";
import { Logger } from "../../../../../src/shared/logging/logger.js";
import { describe, assert, beforeEach, afterEach, it, vi, expect } from "vitest";

describe("#Logger", () => {
  describe("#SetLogLevel", () => {
    beforeEach(() => {
      // @ts-expect-error Need to set the static Looger instance to undefined to reset the singleton
      Logger["instance"] = undefined;
    });

    afterEach(() => {
      vi.unstubAllEnvs();
    });

    it("should set ALL logLevel", () => {
      vi.stubEnv("APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL", "ALL");
      assert.strictEqual(Logger.getInstance()["diagLevel"], DiagLogLevel.ALL);
    });

    it("should set DEBUG logLevel", () => {
      vi.stubEnv("APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL", "DEBUG");
      assert.strictEqual(Logger.getInstance()["diagLevel"], DiagLogLevel.DEBUG);
      const azureStub = vi.spyOn(Logger.getInstance()["azureLogger"], "verbose");
      const otelStub = vi.spyOn(Logger.getInstance()["openTelemetryLogger"], "debug");
      Logger.getInstance().debug("test");
      expect(azureStub).not.toHaveBeenCalled();
      expect(otelStub).toHaveBeenCalledTimes(1);
      Logger.getInstance().setLogToAzureLogger(true);
      Logger.getInstance().setLogToOpenTelemetry(false);
      Logger.getInstance().debug("test");
      expect(azureStub).toHaveBeenCalledTimes(1);
      expect(otelStub).toHaveBeenCalledTimes(1);
    });

    it("should set ERROR logLevel", () => {
      vi.stubEnv("APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL", "ERROR");
      assert.strictEqual(Logger.getInstance()["diagLevel"], DiagLogLevel.ERROR);
      const azureStub = vi.spyOn(Logger.getInstance()["azureLogger"], "error");
      const otelStub = vi.spyOn(Logger.getInstance()["openTelemetryLogger"], "error");
      Logger.getInstance().error("test");
      expect(azureStub).not.toHaveBeenCalled();
      expect(otelStub).toHaveBeenCalledTimes(1);
      Logger.getInstance().setLogToAzureLogger(true);
      Logger.getInstance().setLogToOpenTelemetry(false);
      Logger.getInstance().error("test");
      expect(azureStub).toHaveBeenCalledTimes(1);
      expect(otelStub).toHaveBeenCalledTimes(1);
    });

    it("should set INFO logLevel", () => {
      vi.stubEnv("APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL", "INFO");
      assert.strictEqual(Logger.getInstance()["diagLevel"], DiagLogLevel.INFO);
      const azureStub = vi.spyOn(Logger.getInstance()["azureLogger"], "info");
      const otelStub = vi.spyOn(Logger.getInstance()["openTelemetryLogger"], "info");
      Logger.getInstance().info("test");
      expect(azureStub).not.toHaveBeenCalled();
      expect(otelStub).toHaveBeenCalledTimes(1);
      Logger.getInstance().setLogToAzureLogger(true);
      Logger.getInstance().setLogToOpenTelemetry(false);
      Logger.getInstance().info("test");
      expect(azureStub).toHaveBeenCalledTimes(1);
      expect(otelStub).toHaveBeenCalledTimes(1);
    });

    it("should set NONE logLevel", () => {
      vi.stubEnv("APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL", "NONE");
      assert.strictEqual(Logger.getInstance()["diagLevel"], DiagLogLevel.NONE);
    });

    it("should set VERBOSE logLevel", () => {
      vi.stubEnv("APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL", "VERBOSE");
      assert.strictEqual(Logger.getInstance()["diagLevel"], DiagLogLevel.VERBOSE);
      const azureStub = vi.spyOn(Logger.getInstance()["azureLogger"], "verbose");
      const otelStub = vi.spyOn(Logger.getInstance()["openTelemetryLogger"], "verbose");
      Logger.getInstance().verbose("test");
      expect(azureStub).not.toHaveBeenCalled();
      expect(otelStub).toHaveBeenCalledTimes(1);
      Logger.getInstance().setLogToAzureLogger(true);
      Logger.getInstance().setLogToOpenTelemetry(false);
      Logger.getInstance().verbose("test");
      expect(azureStub).toHaveBeenCalledTimes(1);
      expect(otelStub).toHaveBeenCalledTimes(1);
    });

    it("should set WARN logLevel", () => {
      vi.stubEnv("APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL", "WARN");
      assert.strictEqual(Logger.getInstance()["diagLevel"], DiagLogLevel.WARN);
      const azureStub = vi.spyOn(Logger.getInstance()["azureLogger"], "warning");
      const otelStub = vi.spyOn(Logger.getInstance()["openTelemetryLogger"], "warn");
      Logger.getInstance().warn("test");
      expect(azureStub).not.toHaveBeenCalled();
      expect(otelStub).toHaveBeenCalledTimes(1);
      Logger.getInstance().setLogToAzureLogger(true);
      Logger.getInstance().setLogToOpenTelemetry(false);
      Logger.getInstance().warn("test");
      expect(azureStub).toHaveBeenCalledTimes(1);
      expect(otelStub).toHaveBeenCalledTimes(1);
    });
  });

  describe("#CustomDiagnosticLogger", () => {
    let originalAzureLoggerLog: typeof AzureLogger.log;

    beforeEach(() => {
      // @ts-expect-error Need to set the static Logger instance to undefined to reset the singleton
      Logger["instance"] = undefined;
      originalAzureLoggerLog = AzureLogger.log;
    });

    afterEach(() => {
      vi.unstubAllEnvs();
      AzureLogger.log = originalAzureLoggerLog;
    });

    it("should use custom DiagLogger for OpenTelemetry diagnostics when provided", () => {
      const customLogger: DiagLogger = {
        error: vi.fn(),
        warn: vi.fn(),
        info: vi.fn(),
        debug: vi.fn(),
        verbose: vi.fn(),
      };
      const diagSetLoggerSpy = vi.spyOn(diag, "setLogger");
      Logger.getInstance(customLogger);
      expect(diagSetLoggerSpy).toHaveBeenCalledWith(customLogger, {
        logLevel: DiagLogLevel.WARN,
        suppressOverrideMessage: true,
      });
      diagSetLoggerSpy.mockRestore();
    });

    it("should route AzureLogger.log through custom DiagLogger when provided", () => {
      const customLogger: DiagLogger = {
        error: vi.fn(),
        warn: vi.fn(),
        info: vi.fn(),
        debug: vi.fn(),
        verbose: vi.fn(),
      };
      Logger.getInstance(customLogger);
      AzureLogger.log("test azure log message");
      expect(customLogger.info).toHaveBeenCalledWith("test azure log message");
    });

    it("should use default DiagFileConsoleLogger when no custom logger is provided", () => {
      const diagSetLoggerSpy = vi.spyOn(diag, "setLogger");
      Logger.getInstance();
      expect(diagSetLoggerSpy).toHaveBeenCalledTimes(1);
      const loggerArg = diagSetLoggerSpy.mock.calls[0][0];
      // Should not be a plain object — should be a DiagFileConsoleLogger instance
      expect(loggerArg.constructor.name).toBe("DiagFileConsoleLogger");
      diagSetLoggerSpy.mockRestore();
    });

    it("should only create instance once even if getInstance is called again with a different logger", () => {
      const firstLogger: DiagLogger = {
        error: vi.fn(),
        warn: vi.fn(),
        info: vi.fn(),
        debug: vi.fn(),
        verbose: vi.fn(),
      };
      const secondLogger: DiagLogger = {
        error: vi.fn(),
        warn: vi.fn(),
        info: vi.fn(),
        debug: vi.fn(),
        verbose: vi.fn(),
      };
      const diagSetLoggerSpy = vi.spyOn(diag, "setLogger");
      Logger.getInstance(firstLogger);
      Logger.getInstance(secondLogger);
      // diag.setLogger should only have been called once (from first getInstance call)
      expect(diagSetLoggerSpy).toHaveBeenCalledTimes(1);
      expect(diagSetLoggerSpy).toHaveBeenCalledWith(firstLogger, {
        logLevel: DiagLogLevel.WARN,
        suppressOverrideMessage: true,
      });
      diagSetLoggerSpy.mockRestore();
    });

    it("should route AzureLogger.log with multiple arguments through custom DiagLogger", () => {
      const customLogger: DiagLogger = {
        error: vi.fn(),
        warn: vi.fn(),
        info: vi.fn(),
        debug: vi.fn(),
        verbose: vi.fn(),
      };
      Logger.getInstance(customLogger);
      AzureLogger.log("azure:@azure/monitor-opentelemetry:error", "some error message", {
        detail: "extra",
      });
      expect(customLogger.info).toHaveBeenCalledWith(
        "azure:@azure/monitor-opentelemetry:error",
        "some error message",
        { detail: "extra" },
      );
    });

    it("should use DiagFileConsoleLogger.logMessage for AzureLogger.log in default path", () => {
      const diagSetLoggerSpy = vi.spyOn(diag, "setLogger");
      Logger.getInstance();
      const fileConsoleLogger = diagSetLoggerSpy.mock.calls[0][0];
      const logMessageSpy = vi.spyOn(fileConsoleLogger as any, "logMessage");
      AzureLogger.log("test default path message");
      expect(logMessageSpy).toHaveBeenCalledWith("test default path message");
      logMessageSpy.mockRestore();
      diagSetLoggerSpy.mockRestore();
    });

    it("should respect environment log level with custom logger", () => {
      vi.stubEnv("APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL", "DEBUG");
      const customLogger: DiagLogger = {
        error: vi.fn(),
        warn: vi.fn(),
        info: vi.fn(),
        debug: vi.fn(),
        verbose: vi.fn(),
      };
      const diagSetLoggerSpy = vi.spyOn(diag, "setLogger");
      Logger.getInstance(customLogger);
      expect(diagSetLoggerSpy).toHaveBeenCalledWith(customLogger, {
        logLevel: DiagLogLevel.DEBUG,
        suppressOverrideMessage: true,
      });
      diagSetLoggerSpy.mockRestore();
    });

    it("should preserve default behavior when getInstance called without args from multiple call sites", () => {
      // Simulates the pattern: Logger.getInstance() called from config.ts, then from index.ts
      const diagSetLoggerSpy = vi.spyOn(diag, "setLogger");
      // First call (e.g., from InternalConfig error path) — no custom logger
      Logger.getInstance();
      // Subsequent calls from other files — singleton already exists
      Logger.getInstance();
      Logger.getInstance();
      // Constructor should only have run once
      expect(diagSetLoggerSpy).toHaveBeenCalledTimes(1);
      const loggerArg = diagSetLoggerSpy.mock.calls[0][0];
      expect(loggerArg.constructor.name).toBe("DiagFileConsoleLogger");
      diagSetLoggerSpy.mockRestore();
    });

    it("should not break when getInstance is called with undefined", () => {
      // Simulates useAzureMonitor(options) where options.diagnosticLogger is undefined
      const diagSetLoggerSpy = vi.spyOn(diag, "setLogger");
      Logger.getInstance(undefined);
      expect(diagSetLoggerSpy).toHaveBeenCalledTimes(1);
      const loggerArg = diagSetLoggerSpy.mock.calls[0][0];
      expect(loggerArg.constructor.name).toBe("DiagFileConsoleLogger");
      diagSetLoggerSpy.mockRestore();
    });
  });
});
