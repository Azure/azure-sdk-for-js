// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventData, createEventDataAdapter, EventDataAdapterParameters } from "@azure/event-hubs";
import {
  CloudEventAdapterParameters,
  SendCloudEventInput,
  createCloudEventAdapter,
} from "@azure/eventgrid";
import { matrix } from "@azure/test-utils";
import { MessageAdapter } from "../src/models";
import { assert } from "chai";

/**
 * A type predicate to check whether two record types have the same keys
 */
type AssertEqualKeys<T1 extends Record<string, any>, T2 extends Record<string, any>> = [
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
  nonContentTypeMessage: T;
  adapterFactoryName: string;
}

const eventDataAdapterTestInfo: AdapterTestInfo<EventData> = {
  adapterFactory: createEventDataAdapter(),
  nonUint8ArrayMessage: {
    body: "",
    contentType: "",
  },
  nonContentTypeMessage: {
    body: dummyUint8Array,
  },
  adapterFactoryName: createEventDataAdapter.name,
};

const cloudEventAdapterTestInfo: AdapterTestInfo<SendCloudEventInput<any>> = {
  adapterFactory: createCloudEventAdapter({
    source: "",
    type: "",
  }),
  nonUint8ArrayMessage: {
    data: "",
    datacontenttype: "",
    source: "",
    type: "",
  },
  nonContentTypeMessage: {
    data: dummyUint8Array,
    source: "",
    type: "",
  },
  adapterFactoryName: createCloudEventAdapter.name,
};

describe("Message Adapters", function () {
  describe("Input types for message adapter factories are sound", function () {
    it("EventDataAdapterParameters", function () {
      const areEqual: AssertEqualKeys<
        EventDataAdapterParameters,
        Omit<EventData, "body" | "contentType">
      > = true;
      assert.isTrue(
        areEqual,
        'EventDataAdapterParameters should have the same shape as Omit<EventData, "body" | "contentType">.'
      );
    });
    it("CloudEventAdapterParameters", function () {
      const areEqual: AssertEqualKeys<
        CloudEventAdapterParameters,
        Omit<SendCloudEventInput<any>, "data" | "datacontenttype">
      > = true;
      assert.isTrue(
        areEqual,
        'CloudEventAdapterParameters should have the same shape as Omit<SendCloudEventInput<any>, "data" | "datacontenttype">.'
      );
    });
  });
  matrix(
    [[eventDataAdapterTestInfo, cloudEventAdapterTestInfo]] as const,
    async (adapterTestInfo: AdapterTestInfo<any>) => {
      describe(adapterTestInfo.adapterFactoryName, function () {
        const adapter = adapterTestInfo.adapterFactory;
        it("implements MessageAdapter", async () => {
          assert.isTrue(isMessageAdapter(adapter), `should create a valid MessageAdapter`);
        });
        it("consumeMessage rejects non-Uint8Array body", async () => {
          assert.throws(
            () => adapter.consumeMessage(adapterTestInfo.nonUint8ArrayMessage),
            /Expected the \w+ field to be defined and have a Uint8Array/g
          );
        });
        it("consumeMessage rejects messages with no contentType", async () => {
          assert.throws(
            () => adapter.consumeMessage(adapterTestInfo.nonContentTypeMessage),
            /Expected the \w+ field to be defined/g
          );
        });
      });
    }
  );
});
