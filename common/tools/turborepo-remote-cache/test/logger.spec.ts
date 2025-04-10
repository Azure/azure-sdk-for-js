// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as Logger from "../src/util/logger.js";
import { describe, it, assert } from "vitest";

const testLogger = Logger.createClientLogger("test");

describe("CacheLogger", function () {
  it("is not enabled", () => {
    // CacheLogger is only used to enable a way to redirect logs.
    // This test ensures logs aren't redirected to the root logger.
    // Log redirection works because all the client loggers inherit from the root logger.
    Logger.setLogLevel("verbose");
    assert.ok(!Logger.CacheLogger.enabled);
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
      Logger.setLogLevel("debug" as never);
    }, /Unknown log level/);
  });
});

describe("ClientLoggers", () => {
  it("logs to parent loggers", () => {
    Logger.setLogLevel("verbose");

    const oldLog = Logger.CacheLogger.log.bind(Logger.CacheLogger);
    let called = false;

    Logger.CacheLogger.log = () => {
      called = true;
    };

    testLogger.info("hello");
    assert.ok(called);

    Logger.CacheLogger.log = oldLog;
  });
});
