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

  ["hello", {}, null, undefined].forEach((invalidValue) => {
    it(`don't allow Sender.send(${invalidValue})`, async () => {
      const sender = new SenderImpl(createClientEntityContextForTests());

      try {
        await sender.send(
          // @ts-expect-error
          invalidValue
        );
      } catch (err) {
        assert.equal(err.name, "TypeError");
        assert.equal(
          err.message,
          "Invalid type for message. Must be a ServiceBusMessage, an array of ServiceBusMessage or a ServiceBusMessageBatch"
        );
      }
    });
  });
});

function createClientEntityContextForTests(): ClientEntityContext & { initWasCalled: boolean } {
  let initWasCalled = false;

  const fakeClientEntityContext = {
    entityPath: "queue",
    sender: {
      credit: 999
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
