// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventData, createEventDataAdapter, EventDataAdapterParameters } from "@azure/event-hubs";
import { matrix } from "@azure/test-utils";
import { MessageAdapter } from "../src/models";
import { assert } from "chai";

/**
 * A type predicate to check whether two record types have the same keys
 */
type AssertEqualKeys<T1 extends object, T2 extends object> = [
  keyof T1 extends keyof T2 ? 1 : 0,
  keyof T2 extends keyof T1 ? 1 : 0
] extends [1, 1]
  ? true
  : false;

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
  adapterFactoryName: string;
}

const eventDataAdapterTestInfo: AdapterTestInfo<EventData> = {
  adapterFactory: createEventDataAdapter(),
  nonUint8ArrayMessage: {
    body: "",
    contentType: "",
  },
  adapterFactoryName: createEventDataAdapter.name,
};

describe("Message Adapters", function () {
  describe("Input types for message adapter factories are sound", function () {
    it("EventDataAdapterParameters", function () {
      const areEqual: AssertEqualKeys<
        EventDataAdapterParameters,
        Omit<Omit<EventData, "body">, "contentType">
      > = true;
      assert.isTrue(
        areEqual,
        'EventDataAdapterParameters should have the same shape as Omit<Omit<EventData, "body">, "contentType">'
      );
    });
  });
  matrix([[eventDataAdapterTestInfo]] as const, async (adapterTestInfo: AdapterTestInfo<any>) => {
    describe(adapterTestInfo.adapterFactoryName, function () {
      const adapter = adapterTestInfo.adapterFactory;
      it("implements MessageAdapter", async () => {
        assert.isTrue(isMessageAdapter(adapter), `should create a valid MessageAdapter`);
      });
      it("consumeMessage rejects non-Uint8Array body", async () => {
        assert.throws(
          () => adapter.consumeMessage(adapterTestInfo.nonUint8ArrayMessage),
          /Expected the body field to be defined and have a Uint8Array/
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
