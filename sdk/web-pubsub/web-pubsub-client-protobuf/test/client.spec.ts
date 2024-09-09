// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AckMessage,
  ConnectedMessage,
  DisconnectedMessage,
  GroupDataMessage,
  JoinGroupMessage,
  LeaveGroupMessage,
  SendEventMessage,
  SendToGroupMessage,
  SequenceAckMessage,
  ServerDataMessage,
  WebPubSubMessage,
} from "@azure/web-pubsub-client";
import { WebPubSubProtobufProtocol } from "../src/index";
import { assert } from "chai";

describe("WebPubSubClient", function () {
  const protocol = WebPubSubProtobufProtocol();

  describe("WriteMessage upstream messages", () => {
    const tests = [
      {
        testName: "JoinGroup1",
        message: { kind: "joinGroup", group: "group" } as JoinGroupMessage,
        payload: "MgcKBWdyb3Vw",
      },
      {
        testName: "JoinGroup2",
        message: { kind: "joinGroup", group: "group", ackId: 44133 } as JoinGroupMessage,
        payload: "MgsKBWdyb3VwEOXYAg==",
      },
      {
        testName: "leaveGroup1",
        message: { kind: "leaveGroup", group: "group" } as LeaveGroupMessage,
        payload: "OgcKBWdyb3Vw",
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
          data: { type_url: "example", value: new TextEncoder().encode("xyz").buffer },
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
          data: { type_url: "example", value: new TextEncoder().encode("xyz").buffer },
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

    function arrayBufferToBase64(buffer: ArrayBuffer): string {
      return Buffer.from(buffer).toString("base64");
    }
  });

  describe("Parse downstream messages", () => {
    const tests = [
      {
        testName: "ack1",
        message: "CgQIexAB",
        assertFunc: (msg: WebPubSubMessage) => {
          assert.equal(msg.kind, "ack");
          msg = msg as AckMessage;
          assert.equal(msg.ackId, 123);
          assert.equal(msg.success, true);
          assert.isUndefined(msg.error);
        },
      },
      {
        testName: "ack2",
        message: "ChoIexAAGhQKCUZvcmJpZGRlbhIHbWVzc2FnZQ==",
        assertFunc: (msg: WebPubSubMessage) => {
          assert.equal(msg.kind, "ack");
          msg = msg as AckMessage;
          assert.equal(msg.ackId, 123);
          assert.equal(msg.success, false);
          assert.equal(msg.error!.name, "Forbidden");
          assert.equal(msg.error!.message, "message");
        },
      },
      {
        testName: "group1",
        message: "EhwKBWdyb3VwEglncm91cE5hbWUaBQoDeHl6ILlg",
        assertFunc: (msg: WebPubSubMessage) => {
          assert.equal(msg.kind, "groupData");
          msg = msg as GroupDataMessage;
          assert.equal(msg.group, "groupName");
          assert.equal(msg.sequenceId, 12345);
          assert.equal(msg.dataType, "text");
          assert.equal(msg.data, "xyz");
        },
      },
      {
        testName: "group2",
        message: "EiUKBWdyb3VwEglncm91cE5hbWUaESIPeyJ2YWx1ZSI6Inh5eiJ9",
        assertFunc: (msg: WebPubSubMessage) => {
          assert.equal(msg.kind, "groupData");
          msg = msg as GroupDataMessage;
          assert.equal(msg.group, "groupName");
          assert.isNull(msg.sequenceId);
          assert.equal(msg.dataType, "json");
          assert.deepEqual(msg.data, { value: "xyz" });
        },
      },
      {
        testName: "group3",
        message: "EhkKBWdyb3VwEglncm91cE5hbWUaBRIDeHl6",
        assertFunc: (msg: WebPubSubMessage) => {
          assert.equal(msg.kind, "groupData");
          msg = msg as GroupDataMessage;
          assert.equal(msg.group, "groupName");
          assert.isNull(msg.sequenceId);
          assert.equal(msg.dataType, "binary");
          assert.equal(new TextDecoder().decode(msg.data as ArrayBuffer), "xyz");
        },
      },
      {
        testName: "group4",
        message: "EiQKBWdyb3VwEglncm91cE5hbWUaEBoOCgdleGFtcGxlEgN4eXo=",
        assertFunc: (msg: WebPubSubMessage) => {
          assert.equal(msg.kind, "groupData");
          msg = msg as GroupDataMessage;
          assert.equal(msg.group, "groupName");
          assert.isNull(msg.sequenceId);
          assert.equal(msg.dataType, "protobuf");
          assert.equal((msg.data as any).type_url, "example");
          assert.equal(new TextDecoder().decode((msg.data as any).value as ArrayBuffer), "xyz");
        },
      },
      {
        testName: "event1",
        message: "EhIKBnNlcnZlchoFCgN4eXoguWA=",
        assertFunc: (msg: WebPubSubMessage) => {
          assert.equal(msg.kind, "serverData");
          msg = msg as ServerDataMessage;
          assert.equal(msg.sequenceId, 12345);
          assert.equal(msg.dataType, "text");
          assert.equal(msg.data, "xyz");
        },
      },
      {
        testName: "event2",
        message: "EhsKBnNlcnZlchoRIg97InZhbHVlIjoieHl6In0=",
        assertFunc: (msg: WebPubSubMessage) => {
          assert.equal(msg.kind, "serverData");
          msg = msg as ServerDataMessage;
          assert.isNull(msg.sequenceId);
          assert.equal(msg.dataType, "json");
          assert.deepEqual(msg.data, { value: "xyz" });
        },
      },
      {
        testName: "event3",
        message: "Eg8KBnNlcnZlchoFEgN4eXo=",
        assertFunc: (msg: WebPubSubMessage) => {
          assert.equal(msg.kind, "serverData");
          msg = msg as ServerDataMessage;
          assert.isNull(msg.sequenceId);
          assert.equal(msg.dataType, "binary");
          assert.equal(new TextDecoder().decode(msg.data as ArrayBuffer), "xyz");
        },
      },
      {
        testName: "event4",
        message: "EhoKBnNlcnZlchoQGg4KB2V4YW1wbGUSA3h5eg==",
        assertFunc: (msg: WebPubSubMessage) => {
          assert.equal(msg.kind, "serverData");
          msg = msg as ServerDataMessage;
          assert.isNull(msg.sequenceId);
          assert.equal(msg.dataType, "protobuf");
          assert.equal((msg.data as any).type_url, "example");
          assert.equal(new TextDecoder().decode((msg.data as any).value as ArrayBuffer), "xyz");
        },
      },
      {
        testName: "system1",
        message: "GhQKEgoKY29ubmVjdGlvbhIEdXNlcg==",
        assertFunc: (msg: WebPubSubMessage) => {
          assert.equal(msg.kind, "connected");
          msg = msg as ConnectedMessage;
          assert.equal(msg.userId, "user");
          assert.equal(msg.connectionId, "connection");
          assert.isEmpty(msg.reconnectionToken);
        },
      },
      {
        testName: "system2",
        message: "GhkKFwoKY29ubmVjdGlvbhIEdXNlchoDcmVj",
        assertFunc: (msg: WebPubSubMessage) => {
          assert.equal(msg.kind, "connected");
          msg = msg as ConnectedMessage;
          assert.equal(msg.userId, "user");
          assert.equal(msg.connectionId, "connection");
          assert.equal(msg.reconnectionToken, "rec");
        },
      },
      {
        testName: "system3",
        message: "GgcSBRIDbXNn",
        assertFunc: (msg: WebPubSubMessage) => {
          assert.equal(msg.kind, "disconnected");
          msg = msg as DisconnectedMessage;
          assert.equal(msg.message, "msg");
        },
      },
    ];

    tests.forEach(({ testName, message, assertFunc }) => {
      it(`parse message test ${testName}`, () => {
        const buffer = Buffer.from(message, "base64");
        const parsedMsg = protocol.parseMessages(buffer);
        assertFunc(parsedMsg!);
      });
    });
  });
});
