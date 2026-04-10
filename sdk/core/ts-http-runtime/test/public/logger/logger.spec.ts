// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { createClientLogger, setLogLevel, TypeSpecRuntimeLogger } from "../../../src/index.js";

const testLogger = createClientLogger("test");

describe("TypeSpecRuntimeLogger", function () {
  it("is not enabled", () => {
    // TypeSpecRuntimeLogger is only used to enable a way to redirect logs.
    // This test ensures logs aren't redirected to the root logger.
    // Log redirection works because all the client loggers inherit from the root logger.
    setLogLevel("verbose");
    assert.isFalse(TypeSpecRuntimeLogger.enabled);
  });
});

describe("setLogLevel", () => {
  it("enables all relevant loggers for verbose setting", () => {
    setLogLevel("verbose");
    assert.isTrue(testLogger.verbose.enabled);
    assert.isTrue(testLogger.info.enabled);
    assert.isTrue(testLogger.warning.enabled);
    assert.isTrue(testLogger.error.enabled);
  });

  it("enables all relevant loggers for info setting", () => {
    setLogLevel("info");
    assert.isFalse(testLogger.verbose.enabled);
    assert.isTrue(testLogger.info.enabled);
    assert.isTrue(testLogger.warning.enabled);
    assert.isTrue(testLogger.error.enabled);
  });

  it("enables all relevant loggers for warning setting", () => {
    setLogLevel("warning");
    assert.isFalse(testLogger.verbose.enabled);
    assert.isFalse(testLogger.info.enabled);
    assert.isTrue(testLogger.warning.enabled);
    assert.isTrue(testLogger.error.enabled);
  });

  it("enables all relevant loggers for warning setting", () => {
    setLogLevel("error");
    assert.isFalse(testLogger.verbose.enabled);
    assert.isFalse(testLogger.info.enabled);
    assert.isFalse(testLogger.warning.enabled);
    assert.isTrue(testLogger.error.enabled);
  });

  it("clears all relevant loggers when undefined", () => {
    setLogLevel("verbose");
    assert.isTrue(testLogger.verbose.enabled);
    assert.isTrue(testLogger.info.enabled);
    assert.isTrue(testLogger.warning.enabled);
    assert.isTrue(testLogger.error.enabled);

    setLogLevel(undefined);
    assert.isFalse(testLogger.verbose.enabled);
    assert.isFalse(testLogger.info.enabled);
    assert.isFalse(testLogger.warning.enabled);
    assert.isFalse(testLogger.error.enabled);
  });

  it("throws when setting to an unknown log level", () => {
    assert.throws(() => {
      setLogLevel("debug" as any);
    }, /Unknown log level/);
  });
});

describe("ClientLoggers", () => {
  it("logs to parent loggers", () => {
    setLogLevel("verbose");

    const oldLog = TypeSpecRuntimeLogger.log.bind(TypeSpecRuntimeLogger);
    let called = false;

    TypeSpecRuntimeLogger.log = () => {
      called = true;
    };

    testLogger.info("hello");
    assert.isTrue(called);

    TypeSpecRuntimeLogger.log = oldLog;
  });
});
