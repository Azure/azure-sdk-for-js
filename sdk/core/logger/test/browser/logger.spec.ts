// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as Logger from "../../src";
import * as sinon from "sinon";
import { assert } from "chai";

const testLogger = Logger.createClientLogger("test");

describe("AzureLogger (browser)", function () {
  function expectedTestMessage(namespace: string, message: string): string {
    return `${namespace} ${message}`;
  }

  afterEach(() => {
    Logger.setLogLevel(undefined);
    sinon.restore();
  });

  it("logs to the correct console function", () => {
    Logger.setLogLevel("verbose");

    const debugStub = sinon.stub(console, "debug");
    testLogger.verbose("verbose");
    assert.isTrue(debugStub.calledOnce, "console.debug called");
    assert.strictEqual(
      debugStub.firstCall.args[0],
      expectedTestMessage("azure:test:verbose", "verbose")
    );
    debugStub.restore();

    const infoStub = sinon.stub(console, "info");
    testLogger.info("info");
    assert.isTrue(infoStub.calledOnceWith(expectedTestMessage("azure:test:info", "info")));
    infoStub.restore();

    const warningStub = sinon.stub(console, "warn");
    testLogger.warning("warning");
    assert.isTrue(warningStub.calledOnceWith(expectedTestMessage("azure:test:warning", "warning")));
    warningStub.restore();

    const errorStub = sinon.stub(console, "error");
    testLogger.error("error");
    assert.isTrue(errorStub.calledOnceWith(expectedTestMessage("azure:test:error", "error")));
    errorStub.restore();
  });
});
