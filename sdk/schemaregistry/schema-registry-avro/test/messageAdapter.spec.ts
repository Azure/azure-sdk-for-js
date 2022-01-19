// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventData, createEventDataAdapter } from "@azure/event-hubs";
import { SendCloudEventInput, createCloudEventAdapter } from "@azure/eventgrid";
import { MessageAdapter } from "../src/models";
import { assert } from "chai";

function isMessageAdapter<MessageT>(obj: any): obj is MessageAdapter<MessageT> {
  return typeof obj.produceMessage === "function" && typeof obj.consumeMessage === "function";
}

type CloudEvent = SendCloudEventInput<Uint8Array>;

describe("Message Adapters", function () {
  describe("createEventDataAdapter", function () {
    const adapter: MessageAdapter<EventData> = createEventDataAdapter();
    it("Adapter implements MessageAdapter", async () => {
      assert.isTrue(
        isMessageAdapter<EventData>(adapter),
        `createEventDataAdapter should create a valid MessageAdapter`
      );
    });
    it("consumeMessage rejects non-Uint8Array body", async () => {
      assert.throws(
        () =>
          adapter.consumeMessage({
            body: "",
            contentType: "",
          }),
        /Expected the body field to defined and have a Uint8Array/
      );
    });
    it("consumeMessage rejects messages with no contentType", async () => {
      assert.throws(
        () =>
          adapter.consumeMessage({
            body: Uint8Array.from([0]),
          }),
        /Expected the contentType field to be defined/
      );
    });
  });
  describe("createCloudEventAdapter", function () {
    const adapter: MessageAdapter<CloudEvent> = createCloudEventAdapter({
      source: "",
      type: "",
    });
    it("Adapter implements MessageAdapter", async () => {
      assert.isTrue(
        isMessageAdapter<CloudEvent>(adapter),
        `createCloudEventAdapter should create a valid MessageAdapter`
      );
    });
    it("consumeMessage rejects non-Uint8Array body", async () => {
      assert.throws(
        () =>
          adapter.consumeMessage({
            data: "" as any,
            datacontenttype: "",
            source: "",
            type: "",
          }),
        /Expected the data field to defined and have a Uint8Array/
      );
    });
    it("consumeMessage rejects messages with no contentType", async () => {
      assert.throws(
        () =>
          adapter.consumeMessage({
            data: Uint8Array.from([0]),
            source: "",
            type: "",
          }),
        /Expected the datacontenttype field to be defined/
      );
    });
  });
});
