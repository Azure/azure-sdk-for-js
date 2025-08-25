// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiagLogLevel } from "@opentelemetry/api";
import { Logger } from "$internal/shared/logging/logger.js";
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
});
