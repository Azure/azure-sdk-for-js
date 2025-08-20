// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { MessagingError } from "@azure/core-amqp";
import { AbortError } from "@azure/abort-controller";
import { createServiceBusLogger } from "$internal/log.js";
import type { MockInstance } from "vitest";
import { describe, it, vi, beforeEach, beforeAll } from "vitest";
import { expect } from "../../public/utils/chai.js";
import type { Debugger } from "@azure/logger";

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

      // errors are logged to the .warning stream by default
      expect(warningSpy).toHaveBeenCalledOnce();
      // info only gets used for AbortError, not for normal errors
      expect(infoSpy).not.toHaveBeenCalledOnce();
      // verbose is used for the stack trace when it's available
      expect(verboseSpy).toHaveBeenCalledOnce();

      // check that we call the stream with the proper args
      expect(warningSpy).toHaveBeenCalledWith("this is a message", ":", err);
    });
  });

  it("abortErrors go to info", () => {
    logger.logError(new AbortError());

    // AbortError's are not sent to warning
    expect(warningSpy).not.toHaveBeenCalledOnce();
    // AbortError's are sent to info
    expect(infoSpy).toHaveBeenCalledOnce();
    // stack traces are logged to verbose
    expect(verboseSpy).toHaveBeenCalledOnce();
  });

  const stacktraceLessError = (() => {
    const e = new Error();
    e.stack = undefined;
    return e;
  })();

  [stacktraceLessError, undefined].forEach((err, i) => {
    it(`no stack trace available, skips verbose[${i}]`, () => {
      logger.logError(err);

      // logs to warning
      expect(warningSpy).toHaveBeenCalledOnce();
      // not logged to info.
      expect(infoSpy).not.toHaveBeenCalled();
      // no stack trace so we don't log to verbose
      expect(verboseSpy).not.toHaveBeenCalled();
    });
  });
});
