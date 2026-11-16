// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ServiceBusErrorCode } from "../../src/index.js";
import { MessagingError, ServiceBusError } from "../../src/index.js";
import { describe, it } from "vitest";
import { should } from "./utils/chai.js";

describe("ServiceBusError", () => {
  describe("constructor", () => {
    it("accepts message and code", () => {
      const expectedCode: ServiceBusErrorCode = "MessageNotFound";
      const expectedMessage = "Where is the message?";
      const error = new ServiceBusError(expectedMessage, expectedCode);
      should.equal(error.name, "ServiceBusError");
      should.equal(error.code, expectedCode);
      should.equal(error.message, expectedMessage);
    });

    it("accepts MessagingError", () => {
      const expectedMessage = "This service is busy!";
      const messagingError = new MessagingError(expectedMessage);
      messagingError.code = "ServerBusyError";

      const error = new ServiceBusError(messagingError);
      should.equal(error.name, "ServiceBusError");
      should.equal(error.code, "ServiceBusy");
      should.equal(error.message, expectedMessage);
    });

    it("prefixes message with MessagingError code for if it exists and is GeneralError", () => {
      const message = "Just some general error.";
      const messagingErrorCode = "TotallyUnexpectedError";
      const messagingError = new MessagingError(message);
      messagingError.code = messagingErrorCode;

      const error = new ServiceBusError(messagingError);
      should.equal(error.name, "ServiceBusError");
      should.equal(error.code, "GeneralError");
      should.equal(error.message, `${messagingErrorCode}: ${message}`);
    });

    it("normalizes OperationTimeoutError to the ServiceTimeout reason", () => {
      // A rhea `OperationTimeoutError` is normalized to the `ServiceTimeout`
      // reason during translation, so a post-translation `code` is never
      // "OperationTimeoutError". This is why the link-creation catch blocks in
      // messageSender / messageReceiver / messageSession must not gate on
      // `code === "OperationTimeoutError"` (such a branch is unreachable).
      const messagingError = new MessagingError("Operation timed out.");
      messagingError.code = "OperationTimeoutError";

      const error = new ServiceBusError(messagingError);
      should.equal(error.code, "ServiceTimeout");
    });

    it("normalizes MessageNotFoundError to the MessageNotFound reason", () => {
      // A message-not-found rejection is normalized to the `MessageNotFound`
      // reason during translation, so a post-translation `code` is never
      // "MessageNotFoundError". This is why the peek catch in managementClient
      // must gate on `code === "MessageNotFound"` (gating on the un-normalized
      // "MessageNotFoundError" is unreachable and would make peek throw instead
      // of returning an empty list).
      const messagingError = new MessagingError("The requested message was not found.");
      messagingError.code = "MessageNotFoundError";

      const error = new ServiceBusError(messagingError);
      should.equal(error.code, "MessageNotFound");
    });

    it("normalizes MessageLockLostError to the MessageLockLost reason", () => {
      // A message-lock-lost error is normalized to the `MessageLockLost` reason
      // during translation, so a post-translation `code` is never
      // "MessageLockLostError". This is why the streaming receiver's abandon
      // guard must gate on `code !== "MessageLockLost"` (gating on the
      // un-normalized "MessageLockLostError" is unreachable and would make it
      // attempt a doomed abandon on a message whose lock is already lost).
      const messagingError = new MessagingError("The lock has expired.");
      messagingError.code = "MessageLockLostError";

      const error = new ServiceBusError(messagingError);
      should.equal(error.code, "MessageLockLost");
    });

    it("normalizes SessionLockLostError to the SessionLockLost reason", () => {
      // A session-lock-lost error is normalized to the `SessionLockLost` reason
      // during translation, so a post-translation `code` is never
      // "SessionLockLostError". This is why the session receiver's onAmqpError
      // handler must gate on `code === "SessionLockLost"` (gating on the
      // un-normalized "SessionLockLostError" is unreachable and would leave the
      // session-lock-expired error message un-enriched).
      const messagingError = new MessagingError("The session lock has expired.");
      messagingError.code = "SessionLockLostError";

      const error = new ServiceBusError(messagingError);
      should.equal(error.code, "SessionLockLost");
    });
  });
});
