// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi, beforeEach, afterEach, type MockInstance } from "vitest";
import type { Debugger } from "../../src/logger/debug.js";
import debug from "../../src/logger/debug.js";

describe("debug", function () {
  let logger: Debugger;
  let logStub: MockInstance;

  function expectedTestMessage(namespace: string, message: string): string {
    return `${namespace} ${message}`;
  }

  beforeEach(() => {
    logger = debug("test");
    logStub = vi.spyOn(logger, "log");
  });

  afterEach(() => {
    logStub.mockReset();
    logger.destroy();
    debug.disable();
  });

  it("logs when enabled", () => {
    debug.enable("test");
    assert.isTrue(logger.enabled);
    const testMessage = "hello world!";
    logger(testMessage);
    expect(logStub).toHaveBeenCalledWith(expectedTestMessage("test", testMessage));
  });

  it("does not log when not enabled", () => {
    const testMessage = "hello world!";
    logger(testMessage);
    expect(logStub).not.toHaveBeenCalled();
  });

  it("stops logging after being disabled", () => {
    debug.enable("test");
    assert.isTrue(logger.enabled);
    const testMessage = "hello world!";
    logger(testMessage);
    expect(logStub).toHaveBeenCalledWith(expectedTestMessage("test", testMessage));
    assert.strictEqual(
      debug.disable(),
      "test",
      "disable should return the list of what was enabled",
    );
    assert.isFalse(logger.enabled);
    logger(testMessage);
    expect(logStub).toHaveBeenCalledTimes(1);
  });

  it("extend() creates a new namespace", () => {
    const subLogger = logger.extend("foo");
    assert.strictEqual(subLogger.namespace, "test:foo");
    debug.enable("test:foo");
    const testMessage = "hello world!";
    logger(testMessage);
    subLogger(testMessage);
    expect(logStub).toHaveBeenCalledWith(expectedTestMessage("test:foo", testMessage));
  });

  it("enable() handles a csv list", () => {
    debug.enable("test,test2");
    assert.isTrue(debug.enabled("test"));
    assert.isTrue(debug.enabled("test2"));
  });

  it("enable() supports wildcards", () => {
    const subLogger = logger.extend("foo");
    debug.enable("test:*");
    assert.isTrue(subLogger.enabled);
    const testMessage = "hello world!";
    subLogger(testMessage);
    expect(logStub).toHaveBeenCalledWith(expectedTestMessage("test:foo", testMessage));
  });

  it("enable() supports the global wildcard", () => {
    debug.enable("*");
    assert.isTrue(debug.enabled("test"));
    assert.isTrue(debug.enabled("bar"));
  });

  it("enable() supports skips", () => {
    debug.enable("*,-test:*");
    assert.isTrue(debug.enabled("bar"));
    assert.isFalse(debug.enabled("test:foo"));
  });

  it("names ending in * are always enabled", () => {
    assert.isTrue(debug.enabled("foo*"));
  });

  it("enable works with pattern edge cases", () => {
    debug.enable("ab*abc");
    assert.isTrue(debug.enabled("ababababababc"));
    assert.isFalse(debug.enabled("abababababab"));
    debug.enable("a*a*");
    assert.isTrue(debug.enabled("aa"));
    assert.isTrue(debug.enabled("aab"));
    assert.isTrue(debug.enabled("aaaaaab"));
    assert.isTrue(debug.enabled("abba"));
    debug.enable("test****test");
    assert.isTrue(debug.enabled("testtest"));
    assert.isTrue(debug.enabled("testabcdtest"));
    assert.isFalse(debug.enabled("testabcdtes"));
  });
});
