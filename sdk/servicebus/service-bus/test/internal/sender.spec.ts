// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import { ServiceBusMessageBatchImpl } from "../../src/serviceBusMessageBatch";
import { ConnectionContext } from "../../src/connectionContext";
import { ServiceBusMessage } from "../../src";
import { isServiceBusMessageBatch, ServiceBusSenderImpl } from "../../src/sender";
import { createConnectionContextForTests, retryableErrorForTests } from "./unittestUtils";
import { MessageSender } from "../../src/core/messageSender";
import sinon from "sinon";

const assert = chai.assert;

describe("Sender helper unit tests", () => {
  it("isServiceBusMessageBatch", () => {
    assert.isTrue(
      isServiceBusMessageBatch(new ServiceBusMessageBatchImpl({} as ConnectionContext, 100))
    );

    assert.isFalse(isServiceBusMessageBatch(undefined));
    assert.isFalse(isServiceBusMessageBatch((4 as any) as ServiceBusMessage));
    assert.isFalse(isServiceBusMessageBatch(({} as any) as ServiceBusMessage));
  });
});

describe("sender unit tests", () => {
  const fakeContext = createConnectionContextForTests();
  const sender = new ServiceBusSenderImpl(fakeContext, "fakeEntityPath");
  sender["_sender"].createBatch = async () => {
    return new ServiceBusMessageBatchImpl(fakeContext, 100);
  };

  ["hello", {}, 123, null, undefined, ["hello"]].forEach((invalidValue) => {
    it(`don't allow Sender.sendMessages(${invalidValue})`, async () => {
      let expectedErrorMsg =
        "Provided value for 'messages' must be of type ServiceBusMessage, ServiceBusMessageBatch or an array of type ServiceBusMessage.";
      if (invalidValue === null || invalidValue === undefined) {
        expectedErrorMsg = `Missing parameter "messages"`;
      }
      try {
        await sender.sendMessages(
          // @ts-expect-error
          invalidValue
        );
      } catch (err) {
        assert.equal(err.name, "TypeError");
        assert.equal(err.message, expectedErrorMsg);
      }
    });
  });

  ["hello", {}, null, undefined].forEach((invalidValue) => {
    it(`don't allow tryAdd(${invalidValue})`, async () => {
      const batch = await sender.createBatch();
      let expectedErrorMsg = "Provided value for 'message' must be of type ServiceBusMessage.";
      if (invalidValue === null || invalidValue === undefined) {
        expectedErrorMsg = `Missing parameter "message"`;
      }
      try {
        batch.tryAdd(
          // @ts-expect-error
          invalidValue
        );
      } catch (err) {
        assert.equal(err.name, "TypeError");
        assert.equal(err.message, expectedErrorMsg);
      }
    });
  });

  ["hello", {}, null, undefined, ["hello"]].forEach((invalidValue) => {
    it(`don't allow Sender.scheduleMessages(${invalidValue})`, async () => {
      let expectedErrorMsg =
        "Provided value for 'messages' must be of type ServiceBusMessage or an array of type ServiceBusMessage.";
      if (invalidValue === null || invalidValue === undefined) {
        expectedErrorMsg = `Missing parameter "messages"`;
      }

      try {
        await sender.scheduleMessages(
          new Date(),
          // @ts-expect-error
          invalidValue
        );
      } catch (err) {
        assert.equal(err.name, "TypeError");
        assert.equal(err.message, expectedErrorMsg);
      }
    });
  });

  describe("onDetached", () => {
    let sender: MessageSender;

    beforeEach(async () => {
      sender = new MessageSender(createConnectionContextForTests(), "entity-path", {});
      await sender.open();
      assert.isTrue(sender.isOpen());
    });

    afterEach(async () => {
      await sender.close();
    });

    [retryableErrorForTests, undefined].forEach((err) => {
      it(`onDetached (error: ${err}) and succeeds in opening link`, async () => {
        const closeLinkSpy = sinon.spy(sender as any, "closeLink");

        await sender.onDetached(err);

        assert.isTrue(closeLinkSpy.called, "We closed the link before reopening it in detach");
        assert.isTrue(sender.isOpen(), "connection should be open after detaching");
      });

      it(`onDetached (error: ${err}) but fails to open the link`, async () => {
        const closeLinkSpy = sinon.spy(sender as any, "closeLink");

        const openStub = sinon.stub(sender, "open");
        // throw a non-retryable error when they try to open the link.
        openStub.throwsException(new Error("Short circuit the retries (not needed for this test)"));

        await sender.onDetached(err);

        assert.isTrue(closeLinkSpy.called, "should have closed even on the failed attempt");
        assert.isTrue(openStub.called, "open was attempted");
        assert.isFalse(
          sender.isOpen(),
          "connection should not reestablish even after retries (open purposefully threw exceptions)"
        );
      });
    });

    it(`onDetached (with non-retryable error) does not try to open link`, async () => {
      const closeLinkSpy = sinon.spy(sender as any, "closeLink");
      const openSpy = sinon.spy(sender, "open");

      await sender.onDetached(new Error("non-retryable error"));

      assert.isTrue(closeLinkSpy.called, "We closed the link before reopening it in detach");
      assert.isFalse(
        openSpy.called,
        "We should not have tried to open the link when the detach error is not retryable"
      );
    });

    it("onDetached on a permanently closed sender", async () => {
      await sender.close();
      assert.isFalse(sender.isOpen(), "sender is permanently closed");

      const openSpy = sinon.spy(sender, "open");

      await sender.onDetached(retryableErrorForTests);

      assert.isFalse(
        openSpy.called,
        "if a link is permanently closed we should not attempt to open it"
      );

      assert.isFalse(
        sender.isOpen(),
        "connection should not open after detaching since it was permanently closed"
      );
    });
  });
});
