// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "@azure/core-amqp";
import { translateServiceBusError } from "../../../src/serviceBusError.js";
import { beforeEach, describe, it, vi, expect } from "vitest";
import type { EventContext } from "rhea-promise";

// Mock abandonMessage so we can assert whether the streaming receiver attempts to
// abandon after the user's handler throws. Everything else in receiverCommon stays
// real. vi.hoisted makes the mock available to the hoisted vi.mock factory.
const abandonMessageMock = vi.hoisted(() => vi.fn(async () => {}));
vi.mock("../../../src/receivers/receiverCommon.js", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../../src/receivers/receiverCommon.js")>();
  return { ...actual, abandonMessage: abandonMessageMock };
});

const { addTestStreamingReceiver } = await import("./unittestUtils.js");

describe("StreamingReceiver abandon-on-handler-error", () => {
  const createTestStreamingReceiver = addTestStreamingReceiver();

  beforeEach(() => {
    abandonMessageMock.mockClear();
  });

  // Drive one peekLock message whose handler throws `err`, straight through
  // _onAmqpMessage. The handlers and link are set directly so we avoid subscribe()
  // (which needs a live connection); only the error-code guard decides whether
  // abandon is attempted.
  async function runHandlerThrowing(err: unknown): Promise<void> {
    const streamingReceiver = createTestStreamingReceiver("entity path"); // peekLock by default
    // `link` is a getter over `_link`, and isOpen() reads `_link` too, so setting
    // `_link` to an open stub satisfies both the peekLock open-link check and the
    // abandon branch's isOpen() guard without a live connection.
    (streamingReceiver as any)._link = { isOpen: () => true };
    (streamingReceiver as any)._messageHandlers = () => ({
      processMessage: async () => {
        throw err;
      },
      processError: async () => {
        /* swallow - we assert on abandon, not on the surfaced error */
      },
      postInitialize: async () => {},
      preInitialize: async () => {},
      forwardInternalErrors: false,
    });
    // Keep the finally's credit top-up a no-op so it cannot reach a live link.
    (streamingReceiver as any)._receiverHelper = { addCredit: () => {} };

    const eventContext = {
      delivery: { remote_settled: false },
      message: {
        message_annotations: { [Constants.enqueuedTime]: new Date() },
      },
    };
    await streamingReceiver["_onAmqpMessage"](eventContext as any as EventContext);
  }

  it("skips abandon when the handler error is MessageLockLost", async () => {
    // A MessageLockLost error normalizes to code "MessageLockLost"; abandoning a
    // message whose lock is already lost would fail, so the receiver must skip it.
    // Built through translateServiceBusError so this fails against a guard that
    // compares the un-normalized "MessageLockLostError".
    await runHandlerThrowing(
      translateServiceBusError({
        condition: "com.microsoft:message-lock-lost",
        description: "The lock has expired.",
      } as any),
    );
    expect(abandonMessageMock).not.toHaveBeenCalled();
  });

  it("abandons when the handler error is not lock-related", async () => {
    await runHandlerThrowing(new Error("boom from the handler"));
    expect(abandonMessageMock).toHaveBeenCalledOnce();
  });
});
