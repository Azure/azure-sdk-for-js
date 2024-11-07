// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiagLogLevel } from "@opentelemetry/api";
import { Logger } from "../../../../../src/shared/logging/logger.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

describe("#Logger", () => {
  describe("#SetLogLevel", () => {
    const originalEnv: NodeJS.ProcessEnv = process.env;
    beforeEach(() => {
      // @ts-expect-error Need to set the static Looger instance to undefined to reset the singleton
      Logger["instance"] = undefined;
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it("should set ALL logLevel", () => {
      const env = <{ [id: string]: string }>{};
      env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "ALL";
      process.env = env;
      assert.strictEqual(Logger.getInstance()["diagLevel"], DiagLogLevel.ALL);
    });

    it("should set DEBUG logLevel", () => {
      const env = <{ [id: string]: string }>{};
      env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "DEBUG";
      process.env = env;
      assert.strictEqual(Logger.getInstance()["diagLevel"], DiagLogLevel.DEBUG);
      const azureStub = vi.spyOn(Logger.getInstance()["azureLogger"], "verbose");
      const otelStub = vi.spyOn(Logger.getInstance()["openTelemetryLogger"], "debug");
      Logger.getInstance().debug("test");
      expect(azureStub).not.toHaveBeenCalled();
      expect(otelStub).toHaveBeenCalled();
      Logger.getInstance().setLogToAzureLogger(true);
      Logger.getInstance().setLogToOpenTelemetry(false);
      Logger.getInstance().debug("test");
      expect(azureStub).toHaveBeenCalledOnce();
      expect(otelStub).toHaveBeenCalled();
    });

    it("should set ERROR logLevel", () => {
      const env = <{ [id: string]: string }>{};
      env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "ERROR";
      process.env = env;
      assert.strictEqual(Logger.getInstance()["diagLevel"], DiagLogLevel.ERROR);
      const azureStub = vi.spyOn(Logger.getInstance()["azureLogger"], "error");
      const otelStub = vi.spyOn(Logger.getInstance()["openTelemetryLogger"], "error");
      Logger.getInstance().error("test");
      expect(azureStub).not.toHaveBeenCalled();
      expect(otelStub).toHaveBeenCalled();
      Logger.getInstance().setLogToAzureLogger(true);
      Logger.getInstance().setLogToOpenTelemetry(false);
      Logger.getInstance().error("test");
      expect(azureStub).toHaveBeenCalledOnce();
      expect(otelStub).toHaveBeenCalled();
    });

    it("should set INFO logLevel", () => {
      const env = <{ [id: string]: string }>{};
      env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "INFO";
      process.env = env;
      assert.strictEqual(Logger.getInstance()["diagLevel"], DiagLogLevel.INFO);
      const azureStub = vi.spyOn(Logger.getInstance()["azureLogger"], "info");
      const otelStub = vi.spyOn(Logger.getInstance()["openTelemetryLogger"], "info");
      Logger.getInstance().info("test");
      expect(azureStub).not.toHaveBeenCalled();
      expect(otelStub).toHaveBeenCalled();
      Logger.getInstance().setLogToAzureLogger(true);
      Logger.getInstance().setLogToOpenTelemetry(false);
      Logger.getInstance().info("test");
      expect(azureStub).toHaveBeenCalledOnce();
      expect(otelStub).toHaveBeenCalled();
    });

    it("should set NONE logLevel", () => {
      const env = <{ [id: string]: string }>{};
      env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "NONE";
      process.env = env;
      assert.strictEqual(Logger.getInstance()["diagLevel"], DiagLogLevel.NONE);
    });

    it("should set VERBOSE logLevel", () => {
      const env = <{ [id: string]: string }>{};
      env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "VERBOSE";
      process.env = env;
      assert.strictEqual(Logger.getInstance()["diagLevel"], DiagLogLevel.VERBOSE);
      const azureStub = vi.spyOn(Logger.getInstance()["azureLogger"], "verbose");
      const otelStub = vi.spyOn(Logger.getInstance()["openTelemetryLogger"], "verbose");
      Logger.getInstance().verbose("test");
      expect(azureStub).not.toHaveBeenCalled();
      expect(otelStub).toHaveBeenCalled();
      Logger.getInstance().setLogToAzureLogger(true);
      Logger.getInstance().setLogToOpenTelemetry(false);
      Logger.getInstance().verbose("test");
      expect(azureStub).toHaveBeenCalledOnce();
      expect(otelStub).toHaveBeenCalled();
    });

    it("should set WARN logLevel", () => {
      const env = <{ [id: string]: string }>{};
      env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "WARN";
      process.env = env;
      assert.strictEqual(Logger.getInstance()["diagLevel"], DiagLogLevel.WARN);
      const azureStub = vi.spyOn(Logger.getInstance()["azureLogger"], "warning");
      const otelStub = vi.spyOn(Logger.getInstance()["openTelemetryLogger"], "warn");
      Logger.getInstance().warn("test");
      expect(azureStub).not.toHaveBeenCalled();
      expect(otelStub).toHaveBeenCalled();
      Logger.getInstance().setLogToAzureLogger(true);
      Logger.getInstance().setLogToOpenTelemetry(false);
      Logger.getInstance().warn("test");
      expect(azureStub).toHaveBeenCalledOnce();
      expect(otelStub).toHaveBeenCalled();
    });
  });
});
