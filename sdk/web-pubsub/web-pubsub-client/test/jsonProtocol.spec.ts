// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure-tools/test-utils";
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
} from "../src/models";
import { WebPubSubJsonReliableProtocol } from "../src/protocols";

describe("JsonProtocol", function () {
  const protocol = WebPubSubJsonReliableProtocol();

  describe("WriteMessage upstream messages", () => {
    const tests = [
      {
        testName: "JoinGroup1",
        message: { kind: "joinGroup", group: "group" } as JoinGroupMessage,
        payload: { type: "joinGroup", group: "group" },
      },
      {
        testName: "JoinGroup2",
        message: { kind: "joinGroup", group: "group", ackId: 44133 } as JoinGroupMessage,
        payload: { type: "joinGroup", group: "group", ackId: 44133 },
      },
      {
        testName: "leaveGroup1",
        message: { kind: "leaveGroup", group: "group" } as LeaveGroupMessage,
        payload: { type: "leaveGroup", group: "group" },
      },
      {
        testName: "leaveGroup2",
        message: { kind: "leaveGroup", group: "group", ackId: 12345 } as LeaveGroupMessage,
        payload: { type: "leaveGroup", group: "group", ackId: 12345 },
      },
      {
        testName: "sendToGroup1",
        message: {
          kind: "sendToGroup",
          group: "group",
          data: "xzy",
          dataType: "text",
        } as SendToGroupMessage,
        payload: { type: "sendToGroup", group: "group", dataType: "text", data: "xzy" },
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
        payload: {
          type: "sendToGroup",
          group: "group",
          dataType: "json",
          data: { value: "xzy" },
          ackId: 12345,
          noEcho: true,
        },
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
        payload: {
          type: "sendToGroup",
          group: "group",
          dataType: "binary",
          data: "eHl6",
          ackId: 12345,
          noEcho: true,
        },
      },
      {
        testName: "sendToGroup4",
        message: {
          kind: "sendToGroup",
          group: "group",
          data: new TextEncoder().encode("xyz").buffer,
          dataType: "protobuf",
          ackId: 12345,
          noEcho: true,
        } as SendToGroupMessage,
        payload: {
          type: "sendToGroup",
          group: "group",
          dataType: "protobuf",
          data: "eHl6",
          ackId: 12345,
          noEcho: true,
        },
      },
      {
        testName: "sendEvent1",
        message: {
          kind: "sendEvent",
          event: "event",
          data: "xzy",
          dataType: "text",
        } as SendEventMessage,
        payload: { type: "event", event: "event", dataType: "text", data: "xzy" },
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
        payload: {
          type: "event",
          event: "event",
          dataType: "json",
          data: { value: "xzy" },
          ackId: 12345,
        },
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
        payload: { type: "event", event: "event", dataType: "binary", data: "eHl6", ackId: 12345 },
      },
      {
        testName: "sendEvent4",
        message: {
          kind: "sendEvent",
          event: "event",
          data: new TextEncoder().encode("xyz").buffer,
          dataType: "protobuf",
          ackId: 12345,
        } as SendEventMessage,
        payload: {
          type: "event",
          event: "event",
          dataType: "protobuf",
          data: "eHl6",
          ackId: 12345,
        },
      },
      {
        testName: "seqAck1",
        message: { kind: "sequenceAck", sequenceId: 123456 } as SequenceAckMessage,
        payload: { type: "sequenceAck", sequenceId: 123456 },
      },
    ];

    tests.forEach(({ testName, message, payload }) => {
      it(`write message test ${testName}`, () => {
        const writeMessage = protocol.writeMessage(message) as string;
        assert.deepEqual(JSON.parse(writeMessage), payload);
      });
    });
  });

  describe("Parse downstream messages", () => {
    const tests = [
      {
        testName: "ack1",
        message: { type: "ack", ackId: 123, success: true },
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
        message: {
          type: "ack",
          ackId: 123,
          success: false,
          error: { name: "Forbidden", message: "message" },
        },
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
        message: {
          sequenceId: 12345,
          type: "message",
          from: "group",
          group: "groupName",
          dataType: "text",
          data: "xyz",
          fromUserId: "user",
        },
        assertFunc: (msg: WebPubSubMessage) => {
          assert.equal(msg.kind, "groupData");
          msg = msg as GroupDataMessage;
          assert.equal(msg.group, "groupName");
          assert.equal(msg.sequenceId, 12345);
          assert.equal(msg.dataType, "text");
          assert.equal(msg.data, "xyz");
          assert.equal(msg.fromUserId, "user");
        },
      },
      {
        testName: "group2",
        message: {
          type: "message",
          from: "group",
          group: "groupName",
          dataType: "json",
          data: { value: "xyz" },
          fromUserId: "user",
        },
        assertFunc: (msg: WebPubSubMessage) => {
          assert.equal(msg.kind, "groupData");
          msg = msg as GroupDataMessage;
          assert.equal(msg.group, "groupName");
          assert.isUndefined(msg.sequenceId);
          assert.equal(msg.dataType, "json");
          assert.deepEqual(msg.data, { value: "xyz" });
          assert.equal(msg.fromUserId, "user");
        },
      },
      {
        testName: "group3",
        message: {
          type: "message",
          from: "group",
          group: "groupName",
          dataType: "binary",
          data: "eHl6",
          fromUserId: "user",
        },
        assertFunc: (msg: WebPubSubMessage) => {
          assert.equal(msg.kind, "groupData");
          msg = msg as GroupDataMessage;
          assert.equal(msg.group, "groupName");
          assert.isUndefined(msg.sequenceId);
          assert.equal(msg.dataType, "binary");
          assert.equal(new TextDecoder().decode(msg.data as ArrayBuffer), "xyz");
          assert.equal(msg.fromUserId, "user");
        },
      },
      {
        testName: "group4",
        message: {
          type: "message",
          from: "group",
          group: "groupName",
          dataType: "protobuf",
          data: "eHl6",
          fromUserId: "user",
        },
        assertFunc: (msg: WebPubSubMessage) => {
          assert.equal(msg.kind, "groupData");
          msg = msg as GroupDataMessage;
          assert.equal(msg.group, "groupName");
          assert.isUndefined(msg.sequenceId);
          assert.equal(msg.dataType, "protobuf");
          assert.equal(new TextDecoder().decode(msg.data as ArrayBuffer), "xyz");
          assert.equal(msg.fromUserId, "user");
        },
      },
      {
        testName: "event1",
        message: {
          sequenceId: 12345,
          type: "message",
          from: "server",
          dataType: "text",
          data: "xyz",
        },
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
        message: { type: "message", from: "server", dataType: "json", data: { value: "xyz" } },
        assertFunc: (msg: WebPubSubMessage) => {
          assert.equal(msg.kind, "serverData");
          msg = msg as ServerDataMessage;
          assert.isUndefined(msg.sequenceId);
          assert.equal(msg.dataType, "json");
          assert.deepEqual(msg.data, { value: "xyz" });
        },
      },
      {
        testName: "event3",
        message: { type: "message", from: "server", dataType: "binary", data: "eHl6" },
        assertFunc: (msg: WebPubSubMessage) => {
          assert.equal(msg.kind, "serverData");
          msg = msg as ServerDataMessage;
          assert.isUndefined(msg.sequenceId);
          assert.equal(msg.dataType, "binary");
          assert.equal(new TextDecoder().decode(msg.data as ArrayBuffer), "xyz");
        },
      },
      {
        testName: "event4",
        message: { type: "message", from: "server", dataType: "protobuf", data: "eHl6" },
        assertFunc: (msg: WebPubSubMessage) => {
          assert.equal(msg.kind, "serverData");
          msg = msg as ServerDataMessage;
          assert.isUndefined(msg.sequenceId);
          assert.equal(msg.dataType, "protobuf");
          assert.equal(new TextDecoder().decode(msg.data as ArrayBuffer), "xyz");
        },
      },
      {
        testName: "system1",
        message: { type: "system", event: "connected", userId: "user", connectionId: "connection" },
        assertFunc: (msg: WebPubSubMessage) => {
          assert.equal(msg.kind, "connected");
          msg = msg as ConnectedMessage;
          assert.equal(msg.userId, "user");
          assert.equal(msg.connectionId, "connection");
          assert.isUndefined(msg.reconnectionToken);
        },
      },
      {
        testName: "system2",
        message: {
          type: "system",
          event: "connected",
          userId: "user",
          connectionId: "connection",
          reconnectionToken: "rec",
        },
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
        message: { type: "system", event: "disconnected", message: "msg" },
        assertFunc: (msg: WebPubSubMessage) => {
          assert.equal(msg.kind, "disconnected");
          msg = msg as DisconnectedMessage;
          assert.equal(msg.message, "msg");
        },
      },
    ];

    tests.forEach(({ testName, message, assertFunc }) => {
      it(`parse message test ${testName}`, () => {
        const parsedMsg = protocol.parseMessages(JSON.stringify(message));
        if (!Array.isArray(parsedMsg)) {
          assertFunc(parsedMsg!);
        } else {
          throw new Error("should not be an array");
        }
      });
    });
  });
});
