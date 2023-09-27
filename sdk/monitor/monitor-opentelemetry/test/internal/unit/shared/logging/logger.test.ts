// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { DiagLogLevel } from "@opentelemetry/api";
import { Logger } from "../../../../../src/shared/logging/logger";

describe("#Logger", () => {
  describe("#SetLogLevel", () => {
    let originalEnv: NodeJS.ProcessEnv;
    beforeEach(() => {
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
    });

    it("should set ERROR logLevel", () => {
      process.env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "ERROR";
      assert.strictEqual(Logger.getInstance()["_diagLevel"], DiagLogLevel.ERROR);
    });

    it("should set INFO logLevel", () => {
      process.env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "INFO";
      assert.strictEqual(Logger.getInstance()["_diagLevel"], DiagLogLevel.INFO);
    });

    it("should set NONE logLevel", () => {
      process.env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "NONE";
      assert.strictEqual(Logger.getInstance()["_diagLevel"], DiagLogLevel.NONE);
    });

    it("should set VERBOSE logLevel", () => {
      process.env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "VERBOSE";
      assert.strictEqual(Logger.getInstance()["_diagLevel"], DiagLogLevel.VERBOSE);
    });

    it("should set WARN logLevel", () => {
      process.env["APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL"] = "WARN";
      assert.strictEqual(Logger.getInstance()["_diagLevel"], DiagLogLevel.WARN);
    });
  });
});
