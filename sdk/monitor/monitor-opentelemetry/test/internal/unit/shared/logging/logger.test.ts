// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { DiagLogLevel } from "@opentelemetry/api";
import { Logger } from "../../../../../src/shared/logging/logger";
import sinon from "sinon";

describe("#Logger", () => {
  describe("#SetLogLevel", () => {
    let sinonSandbox: sinon.SinonSandbox;
    const originalEnv: NodeJS.ProcessEnv = process.env;
    beforeEach(() => {
      sinonSandbox = sinon.createSandbox();
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
      const azureStub = sinonSandbox.stub(Logger.getInstance()["azureLogger"], "verbose");
      const otelStub = sinonSandbox.stub(Logger.getInstance()["openTelemetryLogger"], "debug");
      Logger.getInstance().debug("test");
      assert.ok(azureStub.notCalled);
      assert.ok(otelStub.calledOnce);
      Logger.getInstance().setLogToAzureLogger(true);
      Logger.getInstance().setLogToOpenTelemetry(false);
      Logger.getInstance().debug("test");
      assert.ok(azureStub.calledOnce);
      assert.ok(otelStub.calledOnce);
    });

    it("should set ERROR logLevel", () => {
      const env = <{ [id: string]: string }>{};
      env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "ERROR";
      process.env = env;
      assert.strictEqual(Logger.getInstance()["diagLevel"], DiagLogLevel.ERROR);
      const azureStub = sinonSandbox.stub(Logger.getInstance()["azureLogger"], "error");
      const otelStub = sinonSandbox.stub(Logger.getInstance()["openTelemetryLogger"], "error");
      Logger.getInstance().error("test");
      assert.ok(azureStub.notCalled);
      assert.ok(otelStub.calledOnce);
      Logger.getInstance().setLogToAzureLogger(true);
      Logger.getInstance().setLogToOpenTelemetry(false);
      Logger.getInstance().error("test");
      assert.ok(azureStub.calledOnce);
      assert.ok(otelStub.calledOnce);
    });

    it("should set INFO logLevel", () => {
      const env = <{ [id: string]: string }>{};
      env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "INFO";
      process.env = env;
      assert.strictEqual(Logger.getInstance()["diagLevel"], DiagLogLevel.INFO);
      const azureStub = sinonSandbox.stub(Logger.getInstance()["azureLogger"], "info");
      const otelStub = sinonSandbox.stub(Logger.getInstance()["openTelemetryLogger"], "info");
      Logger.getInstance().info("test");
      assert.ok(azureStub.notCalled);
      assert.ok(otelStub.calledOnce);
      Logger.getInstance().setLogToAzureLogger(true);
      Logger.getInstance().setLogToOpenTelemetry(false);
      Logger.getInstance().info("test");
      assert.ok(azureStub.calledOnce);
      assert.ok(otelStub.calledOnce);
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
      const azureStub = sinonSandbox.stub(Logger.getInstance()["azureLogger"], "verbose");
      const otelStub = sinonSandbox.stub(Logger.getInstance()["openTelemetryLogger"], "verbose");
      Logger.getInstance().verbose("test");
      assert.ok(azureStub.notCalled);
      assert.ok(otelStub.calledOnce);
      Logger.getInstance().setLogToAzureLogger(true);
      Logger.getInstance().setLogToOpenTelemetry(false);
      Logger.getInstance().verbose("test");
      assert.ok(azureStub.calledOnce);
      assert.ok(otelStub.calledOnce);
    });

    it("should set WARN logLevel", () => {
      const env = <{ [id: string]: string }>{};
      env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "WARN";
      process.env = env;
      assert.strictEqual(Logger.getInstance()["diagLevel"], DiagLogLevel.WARN);
      const azureStub = sinonSandbox.stub(Logger.getInstance()["azureLogger"], "warning");
      const otelStub = sinonSandbox.stub(Logger.getInstance()["openTelemetryLogger"], "warn");
      Logger.getInstance().warn("test");
      assert.ok(azureStub.notCalled);
      assert.ok(otelStub.calledOnce);
      Logger.getInstance().setLogToAzureLogger(true);
      Logger.getInstance().setLogToOpenTelemetry(false);
      Logger.getInstance().warn("test");
      assert.ok(azureStub.calledOnce);
      assert.ok(otelStub.calledOnce);
    });
  });
});
