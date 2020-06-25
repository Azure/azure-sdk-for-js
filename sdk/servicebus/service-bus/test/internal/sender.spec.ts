// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import { ServiceBusMessageBatchImpl } from "../../src/serviceBusMessageBatch";
import { ClientEntityContext } from "../../src/clientEntityContext";
import { ServiceBusMessage } from "../../src";
import { isServiceBusMessageBatch, SenderImpl } from "../../src/sender";
import { DefaultDataTransformer } from "@azure/core-amqp";
const assert = chai.assert;

describe("sender unit tests", () => {
  it("isServiceBusMessageBatch", () => {
    assert.isTrue(
      isServiceBusMessageBatch(new ServiceBusMessageBatchImpl({} as ClientEntityContext, 100))
    );

    assert.isFalse(isServiceBusMessageBatch(undefined));
    assert.isFalse(isServiceBusMessageBatch((4 as any) as ServiceBusMessage));
    assert.isFalse(isServiceBusMessageBatch(({} as any) as ServiceBusMessage));
  });

  ["hello", {}, 123, null, undefined, ["hello"]].forEach((invalidValue) => {
    it(`don't allow Sender.sendMessages(${invalidValue})`, async () => {
      const sender = new SenderImpl(createClientEntityContextForTests());
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
      const sender = new SenderImpl(createClientEntityContextForTests());
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
      const sender = new SenderImpl(createClientEntityContextForTests());
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
});

function createClientEntityContextForTests(): ClientEntityContext & { initWasCalled: boolean } {
  let initWasCalled = false;

  const fakeClientEntityContext = {
    entityPath: "queue",
    sender: {
      credit: 999,
      createBatch: () => {
        return new ServiceBusMessageBatchImpl(fakeClientEntityContext as any, 100);
      }
    },
    namespace: {
      config: { endpoint: "my.service.bus" },
      connectionId: "connection-id",
      dataTransformer: new DefaultDataTransformer(),
      cbsSession: {
        cbsLock: "cbs-lock",
        async init() {
          initWasCalled = true;
        }
      }
    },
    initWasCalled
  };

  return (fakeClientEntityContext as any) as ReturnType<typeof createClientEntityContextForTests>;
}
