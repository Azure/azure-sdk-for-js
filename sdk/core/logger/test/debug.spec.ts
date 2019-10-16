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
    assert.isTrue(logStub.calledOnce);
    assert.isTrue(logStub.calledOnceWith(testMessage));
  });
  it("does not log when not enabled", () => {
    const testMessage = "hello world!";
    logger(testMessage);
    assert.isTrue(logStub.notCalled);
  });
});
