// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { DiagLogLevel } from "@opentelemetry/api";
import { Logger } from "../../../../../src/shared/logging/logger";
import sinon from "sinon";

describe("#Logger", () => {
  describe("#SetLogLevel", () => {
    let sinonSandbox: sinon.SinonSandbox;
    let originalEnv: NodeJS.ProcessEnv;
    beforeEach(() => {
      sinonSandbox = sinon.createSandbox();
      originalEnv = process.env;
      // @ts-ignore Need to set the static Looger instance to undefined to reset the singleton
      Logger["_instance"] = undefined;
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it("should set ALL logLevel", () => {
      process.env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "ALL";
      assert.strictEqual(Logger.getInstance()["_diagLevel"], DiagLogLevel.ALL);
    });

    it("should set DEBUG logLevel", () => {
      process.env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "DEBUG";
      assert.strictEqual(Logger.getInstance()["_diagLevel"], DiagLogLevel.DEBUG);
      const debugStub = sinonSandbox.stub(Logger.getInstance()["_internalLogger"], "logMessage");
      Logger.getInstance().debug("test");
      assert.ok(debugStub.calledOnce);
    });

    it("should set ERROR logLevel", () => {
      process.env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "ERROR";
      assert.strictEqual(Logger.getInstance()["_diagLevel"], DiagLogLevel.ERROR);
      const errorStub = sinonSandbox.stub(Logger.getInstance()["_internalLogger"], "logMessage");
      Logger.getInstance().error("test");
      assert.ok(errorStub.calledOnce);
    });

    it("should set INFO logLevel", () => {
      process.env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "INFO";
      assert.strictEqual(Logger.getInstance()["_diagLevel"], DiagLogLevel.INFO);
      const infoStub = sinonSandbox.stub(Logger.getInstance()["_internalLogger"], "logMessage");
      Logger.getInstance().info("test");
      assert.ok(infoStub.calledOnce);
    });

    it("should set NONE logLevel", () => {
      process.env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "NONE";
      assert.strictEqual(Logger.getInstance()["_diagLevel"], DiagLogLevel.NONE);
    });

    it("should set VERBOSE logLevel", () => {
      process.env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "VERBOSE";
      assert.strictEqual(Logger.getInstance()["_diagLevel"], DiagLogLevel.VERBOSE);
      const verboseStub = sinonSandbox.stub(Logger.getInstance()["_internalLogger"], "logMessage");
      Logger.getInstance().verbose("test");
      assert.ok(verboseStub.calledOnce);
    });

    it("should set WARN logLevel", () => {
      process.env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "WARN";
      assert.strictEqual(Logger.getInstance()["_diagLevel"], DiagLogLevel.WARN);
      const warnStub = sinonSandbox.stub(Logger.getInstance()["_internalLogger"], "logMessage");
      Logger.getInstance().warn("test");
      assert.ok(warnStub.calledOnce);
    });
  });
});
