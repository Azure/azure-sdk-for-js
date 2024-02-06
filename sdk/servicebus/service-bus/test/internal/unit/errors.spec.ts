// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as sinon from "sinon";
import { MessagingError } from "@azure/core-amqp";
import { AbortError } from "@azure/abort-controller";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { createServiceBusLogger } from "../../../src/log";
chai.use(chaiAsPromised);
const assert = chai.assert;

describe("errors", () => {
  let verboseSpy: sinon.SinonSpy<any[], void>;
  let warningSpy: sinon.SinonSpy<any[], void>;
  let infoSpy: sinon.SinonSpy<any[], void>;
  const logger = createServiceBusLogger("test");

  before(() => {
    verboseSpy = sinon.spy(logger, "verbose");
    warningSpy = sinon.spy(logger, "warning");
    infoSpy = sinon.spy(logger, "info");
  });

  beforeEach(() => {
    verboseSpy.resetHistory();
    warningSpy.resetHistory();
    infoSpy.resetHistory();
  });

  [new Error(), new MessagingError("message")].forEach((err, i) => {
    it(`normal errors go to warning[${i}]`, () => {
      logger.logError(err, "this is a message");

      assert.isTrue(warningSpy.calledOnce, "errors are logged to the .warning stream by default");
      assert.isFalse(
        infoSpy.calledOnce,
        "info only gets used for AbortError, not for normal errors"
      );
      assert.isTrue(
        verboseSpy.calledOnce,
        "verbose is used for the stack trace when it's available"
      );

      // check that we call the stream with the proper args
      assert.equal(warningSpy.args[0][0], "this is a message");
      assert.equal(warningSpy.args[0][1], ":");
      assert.equal(warningSpy.args[0][2].message, err.message);
    });
  });

  it("abortErrors go to info", () => {
    logger.logError(new AbortError());

    assert.isFalse(warningSpy.calledOnce, "AbortError's are not sent to warning");
    assert.isTrue(infoSpy.calledOnce, "AbortError's are sent to info");
    assert.isTrue(verboseSpy.calledOnce, "stack traces are logged to verbose");
  });

  const stacktraceLessError = (() => {
    const e = new Error();
    e.stack = undefined;
    return e;
  })();

  [stacktraceLessError, undefined].forEach((err, i) => {
    it(`no stack trace available, skips verbose[${i}]`, () => {
      logger.logError(err);

      assert.isTrue(warningSpy.calledOnce, "logs to warning");
      assert.isFalse(infoSpy.calledOnce, "not logged to info.");
      assert.isFalse(verboseSpy.calledOnce, "no stack trace so we don't log to verbose");
    });
  });
});
