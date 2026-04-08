// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessageSender } from "../../../src/core/messageSender.js";
import { assertThrows } from "../../public/utils/testUtils.js";
import { createConnectionContextForTests } from "./unittestUtils.js";
import { describe, it } from "vitest";
import { assert } from "../../public/utils/chai.js";

describe("MessageSender unit tests", () => {
  it("getMaxMessageSize should retry (exhaust retries)", async () => {
    const retryOptions = {
      maxRetries: 3,
      retryDelayInMs: 0,
      timeoutInMs: 1000,
    };

    const messageSender = new MessageSender(
      "serviceBusClientId",
      createConnectionContextForTests(),
      "entityPath",
      retryOptions,
    );

    let openCalled = 0;

    messageSender["open"] = () => {
      ++openCalled;

      // Simulating this result:
      // getMaxMessageSize() starts.
      //   open() called.
      //   open() finishes, control not yet returned to getMaxMessagesSize()
      //   onDetach() happens, link detaches and sets this._link to undefined.
      //   control returned back to getMaxMessagesSize()
      // code assumes link is initialized from open() (it was, but was closed) and then tries
      //   to get maxMessageSize, throwing an exception.
      return new Promise((resolve) => {
        messageSender["_link"] = undefined;
        resolve();
      });
    };

    await assertThrows(
      () =>
        messageSender.getMaxMessageSize({
          abortSignal: undefined,
          retryOptions,
        }),
      [
        {
          name: "ServiceBusError",
          code: "GeneralError",
          message: "Link failed to initialize, cannot get max message size.",
          retryable: true,
        },
        {
          name: "ServiceBusError",
          code: "GeneralError",
          message: "Link failed to initialize, cannot get max message size.",
          retryable: true,
        },
        {
          name: "ServiceBusError",
          code: "GeneralError",
          message: "Link failed to initialize, cannot get max message size.",
          retryable: true,
        },
        {
          name: "ServiceBusError",
          code: "GeneralError",
          message: "Link failed to initialize, cannot get max message size.",
          retryable: true,
        },
      ],
    );

    assert.equal(openCalled, retryOptions.maxRetries + 1);
  });

  it("getMaxMessageSize should retry (success)", async () => {
    const retryOptions = {
      maxRetries: 3,
      retryDelayInMs: 0,
      timeoutInMs: 1000,
    };

    const messageSender = new MessageSender(
      "serviceBusClientId",
      createConnectionContextForTests(),
      "entityPath",
      retryOptions,
    );

    let openCalled = 0;

    messageSender["open"] = async () => {
      ++openCalled;

      messageSender["_link"] = {
        maxMessageSize: 101,
      } as any;
    };

    const maxMessageSize = await messageSender.getMaxMessageSize({
      abortSignal: undefined,
      retryOptions,
    });

    assert.equal(maxMessageSize, 101);
    assert.equal(openCalled, 1);
  });

  it("send should retry on detached link after open", async function () {
    const retryOptions = {
      maxRetries: 3,
      retryDelayInMs: 0,
      timeoutInMs: 1000,
    };

    const messageSender = new MessageSender(
      "serviceBusClientId",
      createConnectionContextForTests(),
      "entityPath",
      retryOptions,
    );
    messageSender["_logPrefix"] = "fakeSenderForSendRetry"; // prevent uuid in error message

    let openCalled = 0;

    messageSender["open"] = async () => {
      ++openCalled;

      messageSender["_link"] = {
        send: () => {
          /* no op */
        },
        isOpen: () => true,
        sendable: () => {
          // Simulating this result:
          // _trySend() starts.
          //   open() called and finished.
          //   waitForSendable(), which calls link.sendable(), finishes, control not returned to _trySend() yet.
          //   onDetach() happens, link detaches and sets this._link to undefined.
          //   control returned back to _trySend()
          // code assumes link was initialized from open() (but was closed) and then tries
          //   to send, throwing an exception.
          messageSender["_link"] = undefined;
          return true;
        },
      } as any;
    };

    await assertThrows(
      () => messageSender.send({ body: "message" }),
      [
        {
          name: "ServiceBusError",
          code: "GeneralError",
          message:
            "SenderNotReadyError: [fakeSenderForSendRetry] Cannot send the message. Link is not ready.",
        },
        {
          name: "ServiceBusError",
          code: "GeneralError",
          message:
            "SenderNotReadyError: [fakeSenderForSendRetry] Cannot send the message. Link is not ready.",
        },
        {
          name: "ServiceBusError",
          code: "GeneralError",
          message:
            "SenderNotReadyError: [fakeSenderForSendRetry] Cannot send the message. Link is not ready.",
        },
        {
          name: "ServiceBusError",
          code: "GeneralError",
          message:
            "SenderNotReadyError: [fakeSenderForSendRetry] Cannot send the message. Link is not ready.",
        },
      ],
    );

    assert.equal(openCalled, retryOptions.maxRetries + 1);
  });

  describe("createBatch uses vendor property for batch sizing", () => {
    function createSender(): MessageSender {
      return new MessageSender(
        "serviceBusClientId",
        createConnectionContextForTests(),
        "entityPath",
        { maxRetries: 0, retryDelayInMs: 0, timeoutInMs: 1000 },
      );
    }

    it("prefers com.microsoft:max-message-batch-size over maxMessageSize", async () => {
      const sender = createSender();
      sender["open"] = async () => {
        sender["_link"] = {
          maxMessageSize: 100 * 1024 * 1024, // 100 MB (Premium large-message)
          properties: {
            "com.microsoft:max-message-batch-size": 1048576, // 1 MB
          },
          isOpen: () => true,
        } as any;
      };

      const batch = await sender.createBatch();
      assert.equal(
        batch.maxSizeInBytes,
        1048576,
        "Batch size should use vendor property (1 MB), not maxMessageSize (100 MB)",
      );
    });

    it("falls back to maxMessageSize when vendor property is absent", async () => {
      const sender = createSender();
      sender["open"] = async () => {
        sender["_link"] = {
          maxMessageSize: 262144, // 256 KB (Standard tier)
          properties: {},
          isOpen: () => true,
        } as any;
      };

      const batch = await sender.createBatch();
      assert.equal(
        batch.maxSizeInBytes,
        262144,
        "Batch size should fall back to maxMessageSize when vendor property is absent",
      );
    });

    it("falls back to maxMessageSize when properties dict is undefined", async () => {
      const sender = createSender();
      sender["open"] = async () => {
        sender["_link"] = {
          maxMessageSize: 262144,
          isOpen: () => true,
        } as any;
      };

      const batch = await sender.createBatch();
      assert.equal(
        batch.maxSizeInBytes,
        262144,
        "Batch size should fall back when properties is undefined",
      );
    });

    it("falls back to maxMessageSize when vendor property has wrong type", async () => {
      const sender = createSender();
      sender["open"] = async () => {
        sender["_link"] = {
          maxMessageSize: 262144,
          properties: {
            "com.microsoft:max-message-batch-size": "not-a-number",
          },
          isOpen: () => true,
        } as any;
      };

      const batch = await sender.createBatch();
      assert.equal(
        batch.maxSizeInBytes,
        262144,
        "Batch size should fall back when vendor property is not a number",
      );
    });

    it("falls back to maxMessageSize when vendor property is zero", async () => {
      const sender = createSender();
      sender["open"] = async () => {
        sender["_link"] = {
          maxMessageSize: 262144,
          properties: {
            "com.microsoft:max-message-batch-size": 0,
          },
          isOpen: () => true,
        } as any;
      };

      const batch = await sender.createBatch();
      assert.equal(
        batch.maxSizeInBytes,
        262144,
        "Batch size should fall back when vendor property is zero",
      );
    });

    it("user-specified maxSizeInBytes still takes precedence over vendor property", async () => {
      const sender = createSender();
      sender["open"] = async () => {
        sender["_link"] = {
          maxMessageSize: 100 * 1024 * 1024,
          properties: {
            "com.microsoft:max-message-batch-size": 1048576,
          },
          isOpen: () => true,
        } as any;
      };

      const batch = await sender.createBatch({ maxSizeInBytes: 512 });
      assert.equal(
        batch.maxSizeInBytes,
        512,
        "User-specified maxSizeInBytes should override vendor property",
      );
    });

    it("rejects user-specified maxSizeInBytes above vendor batch limit", async () => {
      const sender = createSender();
      sender["open"] = async () => {
        sender["_link"] = {
          maxMessageSize: 100 * 1024 * 1024,
          properties: {
            "com.microsoft:max-message-batch-size": 1048576,
          },
          isOpen: () => true,
        } as any;
      };

      try {
        await sender.createBatch({ maxSizeInBytes: 2 * 1024 * 1024 });
        assert.fail("Should have thrown for maxSizeInBytes > batch limit");
      } catch (e: any) {
        assert.include(e.message, "Requested max batch size");
      }
    });

    it("Standard tier uses 256 KB from vendor property", async () => {
      const sender = createSender();
      sender["open"] = async () => {
        sender["_link"] = {
          maxMessageSize: 262144, // 256 KB (Standard)
          properties: {
            "com.microsoft:max-message-batch-size": 262144,
          },
          isOpen: () => true,
        } as any;
      };

      const batch = await sender.createBatch();
      assert.equal(batch.maxSizeInBytes, 262144, "Standard tier should use 256 KB batch size");
    });

    it("caps batch size at 1 MB when vendor property is absent and maxMessageSize is 100 MB", async () => {
      const sender = createSender();
      sender["open"] = async () => {
        sender["_link"] = {
          maxMessageSize: 100 * 1024 * 1024, // 100 MB (Premium large-message)
          properties: {},
          isOpen: () => true,
        } as any;
      };

      const batch = await sender.createBatch();
      assert.equal(
        batch.maxSizeInBytes,
        1048576,
        "Batch size should be capped at 1 MB (defaultMaxBatchSize) when vendor property is absent, even if maxMessageSize is 100 MB",
      );
    });

    it("caps batch size at 1 MB when vendor property is absent and maxMessageSize is 2 MB", async () => {
      const sender = createSender();
      sender["open"] = async () => {
        sender["_link"] = {
          maxMessageSize: 2 * 1024 * 1024, // 2 MB
          properties: {},
          isOpen: () => true,
        } as any;
      };

      const batch = await sender.createBatch();
      assert.equal(
        batch.maxSizeInBytes,
        1048576,
        "Batch size should be capped at 1 MB even when maxMessageSize is only slightly larger",
      );
    });

    it("rejects user-specified maxSizeInBytes above capped batch limit (no vendor property)", async () => {
      const sender = createSender();
      sender["open"] = async () => {
        sender["_link"] = {
          maxMessageSize: 100 * 1024 * 1024, // 100 MB
          properties: {},
          isOpen: () => true,
        } as any;
      };

      try {
        // Without the cap, this would succeed (2 MB < 100 MB).
        // With the cap, it should fail (2 MB > 1 MB cap).
        await sender.createBatch({ maxSizeInBytes: 2 * 1024 * 1024 });
        assert.fail("Should have thrown for maxSizeInBytes > capped batch limit");
      } catch (e: any) {
        assert.include(e.message, "Requested max batch size");
      }
    });
  });
});
