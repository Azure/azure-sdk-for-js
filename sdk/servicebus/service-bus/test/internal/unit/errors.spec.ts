// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { MessagingError } from "@azure/core-amqp";
import { AbortError } from "@azure/abort-controller";
import { createServiceBusLogger } from "../../../src/log.js";
import { describe, it, vi, beforeEach, beforeAll, MockInstance } from "vitest";
import { assert } from "../../public/utils/chai.js";
import { Debugger } from "@azure/logger";

describe("errors", () => {
  let verboseSpy: MockInstance<Debugger>;
  let warningSpy: MockInstance<Debugger>;
  let infoSpy: MockInstance<Debugger>;
  const logger = createServiceBusLogger("test");

  beforeAll(() => {
    verboseSpy = vi.spyOn(logger, "verbose");
    warningSpy = vi.spyOn(logger, "warning");
    infoSpy = vi.spyOn(logger, "info");
  });

  beforeEach(() => {
    verboseSpy.mockReset();
    warningSpy.mockReset();
    infoSpy.mockReset();
  });

  [new Error(), new MessagingError("message")].forEach((err, i) => {
    it(`normal errors go to warning[${i}]`, () => {
      logger.logError(err, "this is a message");

      assert.equal(
        warningSpy.mock.calls.length,
        1,
        "errors are logged to the .warning stream by default",
      );
      assert.isFalse(
        infoSpy.mock.calls.length === 1,
        "info only gets used for AbortError, not for normal errors",
      );
      assert.isTrue(
        verboseSpy.mock.calls.length === 1,
        "verbose is used for the stack trace when it's available",
      );

      // check that we call the stream with the proper args
      assert.equal(warningSpy.mock.calls[0][0], "this is a message");
      assert.equal(warningSpy.mock.calls[0][1], ":");
      assert.equal(warningSpy.mock.calls[0][2].message, err.message);
    });
  });

  it("abortErrors go to info", () => {
    logger.logError(new AbortError());

    assert.isFalse(warningSpy.mock.calls.length === 1, "AbortError's are not sent to warning");
    assert.isTrue(infoSpy.mock.calls.length === 1, "AbortError's are sent to info");
    assert.isTrue(verboseSpy.mock.calls.length === 1, "stack traces are logged to verbose");
  });

  const stacktraceLessError = (() => {
    const e = new Error();
    e.stack = undefined;
    return e;
  })();

  [stacktraceLessError, undefined].forEach((err, i) => {
    it(`no stack trace available, skips verbose[${i}]`, () => {
      logger.logError(err);

      assert.isTrue(warningSpy.mock.calls.length === 1, "logs to warning");
      assert.isFalse(infoSpy.mock.calls.length === 1, "not logged to info.");
      assert.isFalse(
        verboseSpy.mock.calls.length === 1,
        "no stack trace so we don't log to verbose",
      );
    });
  });
});
