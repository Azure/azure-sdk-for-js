// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "@azure-tools/test-utils";
import sinon from "sinon";
import {
  DisconnectedMessage,
  GroupDataMessage,
  JoinGroupMessage,
  JoinGroupOptions,
  LeaveGroupMessage,
  LeaveGroupOptions,
  SendEventMessage,
  SendToGroupMessage,
  ServerDataMessage,
} from "../src/models";
import { WebPubSubClient } from "../src/webPubSubClient";

describe("WebPubSubClient", function () {
  describe("Execute operation and translate to WebPubSubMessage", () => {
    it("join group without ack id", () => {
      assert.doesNotThrow(() => {
        const client = new WebPubSubClient("wss://service.com");
        const mock = sinon.mock(client);
        mock
          .expects("_sendMessage")
          .once()
          .withArgs({ kind: "joinGroup", group: "groupName", ackId: 1 } as JoinGroupMessage)
          .callsFake((_) => Promise.resolve());
        client.joinGroup("groupName");
        mock.verify();
      });
    });

    it("join group with ack id", () => {
      assert.doesNotThrow(() => {
        const client = new WebPubSubClient("wss://service.com");
        const mock = sinon.mock(client);
        mock
          .expects("_sendMessage")
          .once()
          .withArgs({ kind: "joinGroup", group: "groupName", ackId: 2233 } as JoinGroupMessage)
          .callsFake((_) => Promise.resolve());
        client.joinGroup("groupName", { ackId: 2233 } as JoinGroupOptions);
        mock.verify();
      });
    });

    it("leave group without ack id", () => {
      assert.doesNotThrow(() => {
        const client = new WebPubSubClient("wss://service.com");
        const mock = sinon.mock(client);
        mock
          .expects("_sendMessage")
          .once()
          .withArgs({ kind: "leaveGroup", group: "groupName", ackId: 1 } as LeaveGroupMessage)
          .callsFake((_) => Promise.resolve());
        client.leaveGroup("groupName");
        mock.verify();
      });
    });

    it("leave group with ack id", () => {
      assert.doesNotThrow(() => {
        const client = new WebPubSubClient("wss://service.com");
        const mock = sinon.mock(client);
        mock
          .expects("_sendMessage")
          .once()
          .withArgs({ kind: "leaveGroup", group: "groupName", ackId: 2233 } as LeaveGroupMessage)
          .callsFake((_) => Promise.resolve());
        client.leaveGroup("groupName", { ackId: 2233 } as LeaveGroupOptions);
        mock.verify();
      });
    });

    it("send to group fire and forget", () => {
      assert.doesNotThrow(() => {
        const client = new WebPubSubClient("wss://service.com");
        const mock = sinon.mock(client);
        mock
          .expects("_sendMessage")
          .once()
          .withArgs({
            kind: "sendToGroup",
            group: "groupName",
            dataType: "text",
            data: "xyz",
            noEcho: false,
          } as SendToGroupMessage)
          .callsFake((_) => Promise.resolve());
        client.sendToGroup("groupName", "xyz", "text", {
          fireAndForget: true,
        });
        mock.verify();
      });
    });

    it("send to group with assigned ack id", () => {
      assert.doesNotThrow(() => {
        const client = new WebPubSubClient("wss://service.com");
        const mock = sinon.mock(client);
        mock
          .expects("_sendMessage")
          .once()
          .withArgs({
            kind: "sendToGroup",
            group: "groupName",
            dataType: "text",
            ackId: 2233,
            data: "xyz",
            noEcho: false,
          } as SendToGroupMessage)
          .callsFake((_) => Promise.resolve());
        client.sendToGroup("groupName", "xyz", "text", { ackId: 2233 });
        mock.verify();
      });
    });

    it("send to group without assigned ack id", () => {
      assert.doesNotThrow(() => {
        const client = new WebPubSubClient("wss://service.com");
        const mock = sinon.mock(client);
        mock
          .expects("_sendMessage")
          .once()
          .withArgs({
            kind: "sendToGroup",
            group: "groupName",
            dataType: "text",
            ackId: 1,
            data: "xyz",
            noEcho: false,
          } as SendToGroupMessage)
          .callsFake((_) => Promise.resolve());
        client.sendToGroup("groupName", "xyz", "text");
        mock.verify();
      });
    });

    it("send to group no echo", () => {
      assert.doesNotThrow(() => {
        const client = new WebPubSubClient("wss://service.com");
        const mock = sinon.mock(client);
        mock
          .expects("_sendMessage")
          .once()
          .withArgs({
            kind: "sendToGroup",
            group: "groupName",
            dataType: "text",
            ackId: 1,
            data: "xyz",
            noEcho: true,
          } as SendToGroupMessage)
          .callsFake((_) => Promise.resolve());
        client.sendToGroup("groupName", "xyz", "text", { noEcho: true });
        mock.verify();
      });
    });

    it("send event without assigned ack id", () => {
      assert.doesNotThrow(() => {
        const client = new WebPubSubClient("wss://service.com");
        const mock = sinon.mock(client);
        mock
          .expects("_sendMessage")
          .once()
          .withArgs({
            kind: "sendEvent",
            event: "eventName",
            dataType: "text",
            ackId: 1,
            data: "xyz",
          } as SendEventMessage)
          .callsFake((_) => Promise.resolve());
        client.sendEvent("eventName", "xyz", "text");
        mock.verify();
      });
    });

    it("send event with assigned ack id", () => {
      assert.doesNotThrow(() => {
        const client = new WebPubSubClient("wss://service.com");
        const mock = sinon.mock(client);
        mock
          .expects("_sendMessage")
          .once()
          .withArgs({
            kind: "sendEvent",
            event: "eventName",
            dataType: "text",
            ackId: 12345,
            data: "xyz",
          } as SendEventMessage)
          .callsFake((_) => Promise.resolve());
        client.sendEvent("eventName", "xyz", "text", { ackId: 12345 });
        mock.verify();
      });
    });

    it("send event fire and forget", () => {
      assert.doesNotThrow(() => {
        const client = new WebPubSubClient("wss://service.com");
        const mock = sinon.mock(client);
        mock
          .expects("_sendMessage")
          .once()
          .withArgs({
            kind: "sendEvent",
            event: "eventName",
            dataType: "text",
            data: "xyz",
          } as SendEventMessage)
          .callsFake((_) => Promise.resolve());
        client.sendEvent("eventName", "xyz", "text", {
          fireAndForget: true,
        });
        mock.verify();
      });
    });
  });

  describe("Add handler to events", () => {
    it("add connected event", () => {
      const client = new WebPubSubClient("wss://service.com");
      const callback = sinon.spy();
      client.on("connected", callback);

      client["_safeEmitConnected"]("connId", "user");

      assert.isTrue(
        callback.calledWith({
          connectionId: "connId",
          userId: "user",
        }),
      );
    });

    it("add disconnected event without disconnectedMessage", () => {
      const client = new WebPubSubClient("wss://service.com");
      const callback = sinon.spy();
      client.on("disconnected", callback);

      client["_safeEmitDisconnected"]("connId", undefined);

      assert.isTrue(
        callback.calledWith({
          connectionId: "connId",
          message: undefined,
        }),
      );
    });

    it("add disconnected event", () => {
      const client = new WebPubSubClient("wss://service.com");
      const callback = sinon.spy();
      client.on("disconnected", callback);

      client["_safeEmitDisconnected"]("connId", {
        kind: "disconnected",
        message: "internal server error",
      } as DisconnectedMessage);

      assert.isTrue(
        callback.calledWith({
          connectionId: "connId",
          message: {
            kind: "disconnected",
            message: "internal server error",
          } as DisconnectedMessage,
        }),
      );
    });

    it("add group message event", () => {
      const client = new WebPubSubClient("wss://service.com");
      const callback = sinon.spy();
      client.on("group-message", callback);

      client["_safeEmitGroupMessage"]({
        kind: "groupData",
        group: "groupName",
        dataType: "text",
        data: "xyz",
      } as GroupDataMessage);

      assert.isTrue(
        callback.calledWith({
          message: { kind: "groupData", group: "groupName", dataType: "text", data: "xyz" },
        }),
      );
    });

    it("add server message event", () => {
      const client = new WebPubSubClient("wss://service.com");
      const callback = sinon.spy();
      client.on("server-message", callback);

      client["_safeEmitServerMessage"]({
        kind: "serverData",
        dataType: "text",
        data: "xyz",
      } as ServerDataMessage);

      assert.isTrue(
        callback.calledWith({
          message: { kind: "serverData", dataType: "text", data: "xyz" },
        }),
      );
    });

    it("add stopped event", () => {
      const client = new WebPubSubClient("wss://service.com");
      const callback = sinon.spy();
      client.on("stopped", callback);

      client["_safeEmitStopped"]();

      assert.isTrue(callback.calledWith());
    });

    it("add rejoin group failed event", () => {
      const client = new WebPubSubClient("wss://service.com");
      const callback = sinon.spy();
      client.on("rejoin-group-failed", callback);

      const err = new Error("Some error");
      client["_safeEmitRejoinGroupFailed"]("groupName", err);

      assert.isTrue(
        callback.calledWith({
          group: "groupName",
          error: err,
        }),
      );
    });
  });
});
