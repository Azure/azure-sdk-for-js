// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as Logger from "../src";
import { assert } from "chai";

const testLogger = Logger.createClientLogger("test");

describe("AzureLogger", function () {
  it("is not enabled", () => {
    // AzureLogger is only used to enable a way to redirect logs.
    // This test ensures logs aren't redirected to the root logger.
    // Log redirection works because all the client loggers inherit from the root logger.
    Logger.setLogLevel("verbose");
    assert.ok(!Logger.AzureLogger.enabled);
  });
});

describe("setLogLevel", () => {
  it("enables all relevant loggers for verbose setting", () => {
    Logger.setLogLevel("verbose");
    assert.ok(testLogger.verbose.enabled);
    assert.ok(testLogger.info.enabled);
    assert.ok(testLogger.warning.enabled);
    assert.ok(testLogger.error.enabled);
  });

  it("enables all relevant loggers for info setting", () => {
    Logger.setLogLevel("info");
    assert.ok(!testLogger.verbose.enabled);
    assert.ok(testLogger.info.enabled);
    assert.ok(testLogger.warning.enabled);
    assert.ok(testLogger.error.enabled);
  });

  it("enables all relevant loggers for warning setting", () => {
    Logger.setLogLevel("warning");
    assert.ok(!testLogger.verbose.enabled);
    assert.ok(!testLogger.info.enabled);
    assert.ok(testLogger.warning.enabled);
    assert.ok(testLogger.error.enabled);
  });

  it("enables all relevant loggers for warning setting", () => {
    Logger.setLogLevel("error");
    assert.ok(!testLogger.verbose.enabled);
    assert.ok(!testLogger.info.enabled);
    assert.ok(!testLogger.warning.enabled);
    assert.ok(testLogger.error.enabled);
  });

  it("clears all relevant loggers when undefined", () => {
    Logger.setLogLevel("verbose");
    assert.ok(testLogger.verbose.enabled);
    assert.ok(testLogger.info.enabled);
    assert.ok(testLogger.warning.enabled);
    assert.ok(testLogger.error.enabled);

    Logger.setLogLevel(undefined);
    assert.ok(!testLogger.verbose.enabled);
    assert.ok(!testLogger.info.enabled);
    assert.ok(!testLogger.warning.enabled);
    assert.ok(!testLogger.error.enabled);
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
    assert.ok(called);

    Logger.AzureLogger.log = oldLog;
  });
});
