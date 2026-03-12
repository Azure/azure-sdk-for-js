// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as Logger from "../src/index.js";
import { describe, it, assert } from "vitest";

const testLogger = Logger.createClientLogger("test");

describe("AzureLogger", function () {
  it("is not enabled", () => {
    // AzureLogger is only used to enable a way to redirect logs.
    // This test ensures logs aren't redirected to the root logger.
    // Log redirection works because all the client loggers inherit from the root logger.
    Logger.setLogLevel("verbose");
    assert.isFalse(Logger.AzureLogger.enabled);
  });
});

describe("setLogLevel", () => {
  it("enables all relevant loggers for verbose setting", () => {
    Logger.setLogLevel("verbose");
    assert.isTrue(testLogger.verbose.enabled);
    assert.isTrue(testLogger.info.enabled);
    assert.isTrue(testLogger.warning.enabled);
    assert.isTrue(testLogger.error.enabled);
  });

  it("enables all relevant loggers for info setting", () => {
    Logger.setLogLevel("info");
    assert.isFalse(testLogger.verbose.enabled);
    assert.isTrue(testLogger.info.enabled);
    assert.isTrue(testLogger.warning.enabled);
    assert.isTrue(testLogger.error.enabled);
  });

  it("enables all relevant loggers for warning setting", () => {
    Logger.setLogLevel("warning");
    assert.isFalse(testLogger.verbose.enabled);
    assert.isFalse(testLogger.info.enabled);
    assert.isTrue(testLogger.warning.enabled);
    assert.isTrue(testLogger.error.enabled);
  });

  it("enables all relevant loggers for warning setting", () => {
    Logger.setLogLevel("error");
    assert.isFalse(testLogger.verbose.enabled);
    assert.isFalse(testLogger.info.enabled);
    assert.isFalse(testLogger.warning.enabled);
    assert.isTrue(testLogger.error.enabled);
  });

  it("clears all relevant loggers when undefined", () => {
    Logger.setLogLevel("verbose");
    assert.isTrue(testLogger.verbose.enabled);
    assert.isTrue(testLogger.info.enabled);
    assert.isTrue(testLogger.warning.enabled);
    assert.isTrue(testLogger.error.enabled);

    Logger.setLogLevel(undefined);
    assert.isFalse(testLogger.verbose.enabled);
    assert.isFalse(testLogger.info.enabled);
    assert.isFalse(testLogger.warning.enabled);
    assert.isFalse(testLogger.error.enabled);
  });

  it("throws when setting to an unknown log level", () => {
    assert.throws(() => {
      Logger.setLogLevel("debug" as any);
    }, /Unknown log level/);
  });
});

describe("ClientLoggers", () => {
  it("logs to parent loggers", () => {
    Logger.setLogLevel("verbose");

    const oldLog = Logger.AzureLogger.log.bind(Logger.AzureLogger);
    let called = false;

    Logger.AzureLogger.log = () => {
      called = true;
    };

    testLogger.info("hello");
    assert.isTrue(called);

    Logger.AzureLogger.log = oldLog;
  });
});
