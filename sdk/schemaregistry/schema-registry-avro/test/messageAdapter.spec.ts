// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventData, createEventDataAdapter } from "@azure/event-hubs";
import { matrix } from "@azure/test-utils";
import { MessageAdapter } from "../src/models";
import { assert } from "chai";

function isMessageAdapter<MessageT>(obj: any): obj is MessageAdapter<MessageT> {
  return typeof obj.produceMessage === "function" && typeof obj.consumeMessage === "function";
}

/**
 * some tests consume messages with well-formed Uint8Array payload so this variable
 * is used to construct those.
 */
const dummyUint8Array = Uint8Array.from([0]);

/**
 * An interface to group different bits needed by the tests for each adapter
 * factory
 */
interface AdapterTestInfo<T> {
  adapterFactory: MessageAdapter<T>;
  nonUint8ArrayMessage: T;
  testSuiteName: string;
}

const eventDataAdapterTestInfo: AdapterTestInfo<EventData> = {
  adapterFactory: createEventDataAdapter(),
  nonUint8ArrayMessage: {
    body: "",
    contentType: "",
  },
  testSuiteName: createEventDataAdapter.name,
};

describe("Message Adapters", function () {
  matrix([[eventDataAdapterTestInfo]] as const, async (adapterTestInfo: AdapterTestInfo<any>) => {
    describe(adapterTestInfo.testSuiteName, function () {
      const adapter: MessageAdapter<EventData> = adapterTestInfo.adapterFactory;
      it("Adapter implements MessageAdapter", async () => {
        assert.isTrue(
          isMessageAdapter<EventData>(adapter),
          `createEventDataAdapter should create a valid MessageAdapter`
        );
      });
      it("consumeMessage rejects non-Uint8Array body", async () => {
        assert.throws(
          () => adapter.consumeMessage(adapterTestInfo.nonUint8ArrayMessage),
          /Expected the body field to defined and have a Uint8Array/
        );
      });
      it("consumeMessage rejects messages with no contentType", async () => {
        assert.throws(
          () =>
            adapter.consumeMessage({
              body: dummyUint8Array,
            }),
          /Expected the contentType field to be defined/
        );
      });
    });
  });
});
