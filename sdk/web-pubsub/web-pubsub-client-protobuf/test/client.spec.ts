// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { JoinGroupMessage, LeaveGroupMessage, SendEventMessage, SendToGroupMessage, SequenceAckMessage } from "@azure/web-pubsub-client";
import { WebPubSubProtobufProtocol } from "../src/index";
import { assert } from "chai";

describe("WebPubSubClient", function () {
  const protocol = WebPubSubProtobufProtocol();

  const tests = [
    {
      testName: "JoinGroup1",
      message: { kind: "joinGroup", group: "group" } as JoinGroupMessage,
      payload: "MgcKBWdyb3Vw",
    },
    {
      testName: "JoinGroup2",
      message: { kind: "joinGroup", group: "group", ackId: 44133 } as JoinGroupMessage,
      payload: "MgsKBWdyb3VwEOXYAg=="
    },
    {
      testName: "leaveGroup1",
      message: { kind: "leaveGroup", group: "group" } as LeaveGroupMessage,
      payload: "OgcKBWdyb3Vw"
    },
    {
      testName: "leaveGroup2",
      message: { kind: "leaveGroup", group: "group", ackId: 12345 } as LeaveGroupMessage,
      payload: "OgoKBWdyb3VwELlg",
    },
    {
      testName: "sendToGroup1",
      message: {
        kind: "sendToGroup",
        group: "group",
        data: "xzy",
        dataType: "text",
      } as SendToGroupMessage,
      payload: "Cg4KBWdyb3VwGgUKA3h6eQ==",
    },
    {
      testName: "sendToGroup2",
      message: {
        kind: "sendToGroup",
        group: "group",
        data: { value: "xzy" },
        dataType: "json",
        ackId: 12345,
        noEcho: true,
      } as SendToGroupMessage,
      payload: "Ch8KBWdyb3VwELlgGhEiD3sidmFsdWUiOiJ4enkifSAB",
    },
    {
      testName: "sendToGroup3",
      message: {
        kind: "sendToGroup",
        group: "group",
        data: new TextEncoder().encode("xyz").buffer,
        dataType: "binary",
        ackId: 12345,
        noEcho: true,
      } as SendToGroupMessage,
      payload: "ChMKBWdyb3VwELlgGgUSA3h5eiAB",
    },
    {
      testName: "sendToGroup4",
      message: {
        kind: "sendToGroup",
        group: "group",
        data: {type_url: "example", value: new TextEncoder().encode("xyz").buffer},
        dataType: "protobuf",
        ackId: 12345,
        noEcho: true,
      } as SendToGroupMessage,
      payload: "Ch4KBWdyb3VwELlgGhAaDgoHZXhhbXBsZRIDeHl6IAE=",
    },
    {
      testName: "sendEvent1",
      message: {
        kind: "sendEvent",
        event: "event",
        data: "xzy",
        dataType: "text",
      } as SendEventMessage,
      payload: "Kg4KBWV2ZW50EgUKA3h6eQ==",
    },
    {
      testName: "sendEvent2",
      message: {
        kind: "sendEvent",
        event: "event",
        data: { value: "xzy" },
        dataType: "json",
        ackId: 12345,
      } as SendEventMessage,
      payload: "Kh0KBWV2ZW50EhEiD3sidmFsdWUiOiJ4enkifRi5YA==",
    },
    {
      testName: "sendEvent3",
      message: {
        kind: "sendEvent",
        event: "event",
        data: new TextEncoder().encode("xyz").buffer,
        dataType: "binary",
        ackId: 12345,
      } as SendEventMessage,
      payload: "KhEKBWV2ZW50EgUSA3h5ehi5YA==",
    },
    {
      testName: "sendEvent4",
      message: {
        kind: "sendEvent",
        event: "event",
        data: {type_url: "example", value: new TextEncoder().encode("xyz").buffer},
        dataType: "protobuf",
        ackId: 12345,
      } as SendEventMessage,
      payload: "KhwKBWV2ZW50EhAaDgoHZXhhbXBsZRIDeHl6GLlg",
    },
    {
      testName: "seqAck1",
      message: { kind: "sequenceAck", sequenceId: 123456 } as SequenceAckMessage,
      payload: "QgQIwMQH",
    },
  ];

  tests.forEach(({ testName, message, payload }) => {
    it(`write message test ${testName}`, () => {
      const writeMessage = protocol.writeMessage(message) as ArrayBuffer;
      assert.equal(arrayBufferToBase64(writeMessage), payload);
    });
  });

  function arrayBufferToBase64(buffer: ArrayBuffer) {
    // Create a Uint8Array from the buffer
    let bytes = new Uint8Array(buffer);
    // Create an empty string to store the base64 encoded string
    let base64 = "";
    // Loop through the bytes and concatenate the ASCII characters
    for (let i = 0; i < bytes.length; i++) {
      base64 += String.fromCharCode(bytes[i]);
    }
    // Use the btoa function to encode the string to base64
    return btoa(base64);
  }

  // function base64ToArrayBuffer(base64: string) {
  //   return Uint8Array.from(atob(base64), c => c.charCodeAt(0))
  // }
});
