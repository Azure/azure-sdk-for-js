// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Constants } from "@azure/core-amqp";
import { ServiceBusReceivedMessageWithLock } from "../../src";
import { ServiceBusSessionReceiverImpl } from "../../src/receivers/sessionReceiver";
import { createConnectionContextForTests } from "./unittestUtils";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import Long from "long";
chai.use(chaiAsPromised);
const assert = chai.assert;

describe("session receiver unit tests", () => {
  it("operations throw errors if accept hasn't been called", async () => {
    const session = new ServiceBusSessionReceiverImpl<ServiceBusReceivedMessageWithLock>(
      createConnectionContextForTests({
        onCreateReceiverCalled: (receiver) => {
          (receiver as any).source = {
            filter: {
              [Constants.sessionFilterName]: "hello"
            }
          };

          (receiver as any).properties = {
            ["com.microsoft:locked-until-utc"]: Date.now()
          };
        }
      }),
      "entityPath",
      {},
      {
        receiveMode: "peekLock"
      }
    );

    try {
      await session.receiveMessages(1);
      assert.fail("Should have thrown for receiveMessages");
    } catch (err) {
      assert.equal("You must call .accept on this session receiver before using it.", err.message);
    }

    try {
      await session.peekMessages(1);
      assert.fail("Should have thrown for peekMessages");
    } catch (err) {
      assert.equal("You must call .accept on this session receiver before using it.", err.message);
    }

    try {
      session.subscribe({
        processError: async (_err) => {},
        processMessage: async (_msg) => {}
      });

      assert.fail("Should have thrown for subscribe");
    } catch (err) {
      assert.equal("You must call .accept on this session receiver before using it.", err.message);
    }

    try {
      await session.receiveDeferredMessages([new Long(1)]);
      assert.fail("Should have thrown for deferred messages");
    } catch (err) {
      assert.equal("You must call .accept on this session receiver before using it.", err.message);
    }

    try {
      await session.renewSessionLock();
      assert.fail("Should have thrown for deferred messages");
    } catch (err) {
      assert.equal("You must call .accept on this session receiver before using it.", err.message);
    }
    await session.close();
  });
});
