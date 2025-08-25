// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  MessageAdapter as EHMessageAdapter,
  EventData,
  EventDataAdapterParameters,
} from "@azure/event-hubs";
import { createEventDataAdapter } from "@azure/event-hubs";
import type { AssertEqualKeys } from "../utils/utils.js";
import type { MessageAdapter } from "@azure/schema-registry-avro";
import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, it, assert } from "vitest";

function isMessageAdapter<MessageT>(obj: any): obj is MessageAdapter<MessageT> {
  return typeof obj.produce === "function" && typeof obj.consume === "function";
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
  adapterFactoryName: string;
}

describe("Message Adapters", function () {
  const eventDataAdapterTestInfo: AdapterTestInfo<EventData> = {
    adapterFactory: createEventDataAdapter(),
    adapterFactoryName: createEventDataAdapter.name,
  };
  describe("MessageAdapter types are identical", function () {
    it("Event Hubs", () => {
      const areEqual: AssertEqualKeys<MessageAdapter<unknown>, EHMessageAdapter<unknown>> = true;
      assert.isTrue(
        areEqual,
        "MessageAdapter should have the same shape as @azure/event-hubs's MessageAdapter.",
      );
    });
  });
  describe("Input types for message adapter factories are sound", function () {
    it("EventDataAdapterParameters", () => {
      const areEqual: AssertEqualKeys<
        EventDataAdapterParameters,
        Omit<EventData, "body" | "contentType">
      > = true;
      assert.isTrue(
        areEqual,
        'EventDataAdapterParameters should have the same shape as Omit<EventData, "body" | "contentType">.',
      );
    });
  });
  matrix([[eventDataAdapterTestInfo]] as const, async (adapterTestInfo: AdapterTestInfo<any>) => {
    describe(adapterTestInfo.adapterFactoryName, function () {
      const adapter = adapterTestInfo.adapterFactory;
      it("implements MessageAdapter", async () => {
        assert.isTrue(isMessageAdapter(adapter), `should create a valid MessageAdapter`);
      });
      it("consumeMessage rejects undefined body", async () => {
        assert.throws(
          () =>
            adapter.consume({
              contentType: "",
            }),
          /Expected the body field to be defined/,
        );
      });
      it("consumeMessage rejects messages with no contentType", async () => {
        assert.throws(
          () =>
            adapter.consume({
              body: dummyUint8Array,
            }),
          /Expected the contentType field to be defined/,
        );
      });
    });
  });
});
