// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import debug, { Debugger } from "../src/debug";
import { stub } from "sinon";
import { assert } from "chai";

describe("debug", function() {
  let logger: Debugger;
  let logStub: sinon.SinonStub<any[], void>;

  beforeEach(() => {
    logger = debug("test");
    logStub = stub(logger, "log");
  });

  afterEach(() => {
    logStub.restore();
    logger.destroy();
    debug.disable();
  });
  it("logs when enabled", () => {
    debug.enable("test");
    assert.isTrue(logger.enabled);
    const testMessage = "hello world!";
    logger(testMessage);
    assert.isTrue(logStub.calledOnceWith(testMessage));
  });
  it("does not log when not enabled", () => {
    const testMessage = "hello world!";
    logger(testMessage);
    assert.isTrue(logStub.notCalled);
  });
  it("stops logging after being disabled", () => {
    debug.enable("test");
    assert.isTrue(logger.enabled);
    const testMessage = "hello world!";
    logger(testMessage);
    assert.isTrue(logStub.calledOnceWith(testMessage));
    assert.strictEqual(
      debug.disable(),
      "test",
      "disable should return the list of what was enabled"
    );
    assert.isFalse(logger.enabled);
    logger(testMessage);
    assert.isTrue(logStub.calledOnce, "Logger should not have been called a second time.");
  });
  it("extend() creates a new namespace", () => {
    const subLogger = logger.extend("foo");
    assert.strictEqual(subLogger.namespace, "test:foo");
    debug.enable("test:foo");
    const testMessage = "hello world!";
    logger(testMessage);
    subLogger(testMessage);
    assert.isTrue(logStub.calledOnceWith(testMessage));
  });
});
