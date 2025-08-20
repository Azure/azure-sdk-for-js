// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DisconnectedMessage,
  GroupDataMessage,
  JoinGroupOptions,
  LeaveGroupOptions,
  ServerDataMessage,
} from "@azure/web-pubsub-client";
import { WebPubSubClient } from "@azure/web-pubsub-client";
import { describe, it, expect, vi } from "vitest";
describe("WebPubSubClient", () => {
  describe("Execute operation and translate to WebPubSubMessage", () => {
    it("join group without ack id", () => {
      const client = new WebPubSubClient("wss://service.com");

      const mock = vi
        .spyOn(client as any, "_sendMessage")
        .mockImplementation(() => Promise.resolve());

      client.joinGroup("groupName");

      expect(mock).toHaveBeenCalledOnce();
      expect(mock).toHaveBeenCalledWith(
        { kind: "joinGroup", group: "groupName", ackId: 1 },
        undefined,
      );
    });

    it("join group with ack id", () => {
      const client = new WebPubSubClient("wss://service.com");

      const mock = vi
        .spyOn(client as any, "_sendMessage")
        .mockImplementation(() => Promise.resolve());

      client.joinGroup("groupName", { ackId: 2233 } as JoinGroupOptions);

      expect(mock).toHaveBeenCalledOnce();
      expect(mock).toHaveBeenCalledWith(
        { kind: "joinGroup", group: "groupName", ackId: 2233 },
        undefined,
      );
    });

    it("leave group without ack id", () => {
      const client = new WebPubSubClient("wss://service.com");

      const mock = vi
        .spyOn(client as any, "_sendMessage")
        .mockImplementation(() => Promise.resolve());

      client.leaveGroup("groupName");

      expect(mock).toHaveBeenCalledOnce();
      expect(mock).toHaveBeenCalledWith(
        { kind: "leaveGroup", group: "groupName", ackId: 1 },
        undefined,
      );
    });

    it("leave group with ack id", () => {
      const client = new WebPubSubClient("wss://service.com");

      const mock = vi
        .spyOn(client as any, "_sendMessage")
        .mockImplementation(() => Promise.resolve());

      client.leaveGroup("groupName", { ackId: 2233 } as LeaveGroupOptions);

      expect(mock).toHaveBeenCalledOnce();
      expect(mock).toHaveBeenCalledWith(
        { kind: "leaveGroup", group: "groupName", ackId: 2233 },
        undefined,
      );
    });

    it("send to group fire and forget", () => {
      const client = new WebPubSubClient("wss://service.com");

      const mock = vi
        .spyOn(client as any, "_sendMessage")
        .mockImplementation(() => Promise.resolve());

      client.sendToGroup("groupName", "xyz", "text", {
        fireAndForget: true,
      });

      expect(mock).toHaveBeenCalledOnce();
      expect(mock).toHaveBeenCalledWith(
        {
          kind: "sendToGroup",
          group: "groupName",
          dataType: "text",
          data: "xyz",
          noEcho: false,
        },
        undefined,
      );
    });

    it("send to group with assigned ack id", () => {
      const client = new WebPubSubClient("wss://service.com");

      const mock = vi
        .spyOn(client as any, "_sendMessage")
        .mockImplementation(() => Promise.resolve());

      client.sendToGroup("groupName", "xyz", "text", { ackId: 2233 });

      expect(mock).toHaveBeenCalledOnce();
      expect(mock).toHaveBeenCalledWith(
        {
          kind: "sendToGroup",
          group: "groupName",
          dataType: "text",
          ackId: 2233,
          data: "xyz",
          noEcho: false,
        },
        undefined,
      );
    });

    it("send to group without assigned ack id", () => {
      const client = new WebPubSubClient("wss://service.com");

      const mock = vi
        .spyOn(client as any, "_sendMessage")
        .mockImplementation(() => Promise.resolve());

      client.sendToGroup("groupName", "xyz", "text");

      expect(mock).toHaveBeenCalledOnce();
      expect(mock).toHaveBeenCalledWith(
        {
          ackId: 1,
          kind: "sendToGroup",
          group: "groupName",
          dataType: "text",
          data: "xyz",
          noEcho: false,
        },
        undefined,
      );
    });

    it("send to group no echo", () => {
      const client = new WebPubSubClient("wss://service.com");

      const mock = vi
        .spyOn(client as any, "_sendMessage")
        .mockImplementation(() => Promise.resolve());

      client.sendToGroup("groupName", "xyz", "text", { noEcho: true });

      expect(mock).toHaveBeenCalledOnce();
      expect(mock).toHaveBeenCalledWith(
        {
          ackId: 1,
          kind: "sendToGroup",
          group: "groupName",
          dataType: "text",
          data: "xyz",
          noEcho: true,
        },
        undefined,
      );
    });

    it("send event without assigned ack id", () => {
      const client = new WebPubSubClient("wss://service.com");

      const mock = vi
        .spyOn(client as any, "_sendMessage")
        .mockImplementation(() => Promise.resolve());

      client.sendEvent("eventName", "xyz", "text");

      expect(mock).toHaveBeenCalledOnce();
      expect(mock).toHaveBeenCalledWith(
        {
          kind: "sendEvent",
          event: "eventName",
          dataType: "text",
          data: "xyz",
          ackId: 1,
        },
        undefined,
      );
    });

    it("send event with assigned ack id", () => {
      const client = new WebPubSubClient("wss://service.com");

      const mock = vi
        .spyOn(client as any, "_sendMessage")
        .mockImplementation(() => Promise.resolve());

      client.sendEvent("eventName", "xyz", "text", { ackId: 12345 });

      expect(mock).toHaveBeenCalledOnce();
      expect(mock).toHaveBeenCalledWith(
        {
          kind: "sendEvent",
          event: "eventName",
          dataType: "text",
          ackId: 12345,
          data: "xyz",
        },
        undefined,
      );
    });

    it("send event fire and forget", () => {
      const client = new WebPubSubClient("wss://service.com");

      const mock = vi
        .spyOn(client as any, "_sendMessage")
        .mockImplementation(() => Promise.resolve());

      client.sendEvent("eventName", "xyz", "text", {
        fireAndForget: true,
      });

      expect(mock).toHaveBeenCalledOnce();
      expect(mock).toHaveBeenCalledWith(
        {
          kind: "sendEvent",
          event: "eventName",
          dataType: "text",
          data: "xyz",
        },
        undefined,
      );
    });
  });

  describe("Add handler to events", () => {
    it("add connected event", () => {
      const client = new WebPubSubClient("wss://service.com");
      const callback = vi.fn();
      client.on("connected", callback);

      client["_safeEmitConnected"]("connId", "user");

      expect(callback).toHaveBeenCalledOnce();
      expect(callback).toHaveBeenCalledWith({
        connectionId: "connId",
        userId: "user",
      });
    });

    it("add disconnected event without disconnectedMessage", () => {
      const client = new WebPubSubClient("wss://service.com");
      const callback = vi.fn();
      client.on("disconnected", callback);

      client["_safeEmitDisconnected"]("connId", undefined);

      expect(callback).toHaveBeenCalledOnce();
      expect(callback).toHaveBeenCalledWith({
        connectionId: "connId",
        message: undefined,
      });
    });

    it("add disconnected event", () => {
      const client = new WebPubSubClient("wss://service.com");
      const callback = vi.fn();
      client.on("disconnected", callback);

      client["_safeEmitDisconnected"]("connId", {
        kind: "disconnected",
        message: "internal server error",
      } as DisconnectedMessage);

      expect(callback).toHaveBeenCalledOnce();
      expect(callback).toHaveBeenCalledWith({
        connectionId: "connId",
        message: {
          kind: "disconnected",
          message: "internal server error",
        },
      });
    });

    it("add group message event", () => {
      const client = new WebPubSubClient("wss://service.com");
      const callback = vi.fn();
      client.on("group-message", callback);

      client["_safeEmitGroupMessage"]({
        kind: "groupData",
        group: "groupName",
        dataType: "text",
        data: "xyz",
      } as GroupDataMessage);

      expect(callback).toHaveBeenCalledOnce();
      expect(callback).toHaveBeenCalledWith({
        message: { kind: "groupData", group: "groupName", dataType: "text", data: "xyz" },
      });
    });

    it("add server message event", () => {
      const client = new WebPubSubClient("wss://service.com");
      const callback = vi.fn();
      client.on("server-message", callback);

      client["_safeEmitServerMessage"]({
        kind: "serverData",
        dataType: "text",
        data: "xyz",
      } as ServerDataMessage);

      expect(callback).toHaveBeenCalledOnce();
      expect(callback).toHaveBeenCalledWith({
        message: { kind: "serverData", dataType: "text", data: "xyz" },
      });
    });

    it("add stopped event", () => {
      const client = new WebPubSubClient("wss://service.com");
      const callback = vi.fn();
      client.on("stopped", callback);

      client["_safeEmitStopped"]();

      expect(callback).toHaveBeenCalledOnce();
    });

    it("add rejoin group failed event", () => {
      const client = new WebPubSubClient("wss://service.com");
      const callback = vi.fn();
      client.on("rejoin-group-failed", callback);

      const err = new Error("Some error");
      client["_safeEmitRejoinGroupFailed"]("groupName", err);

      expect(callback).toHaveBeenCalledOnce();
      expect(callback).toHaveBeenCalledWith({
        group: "groupName",
        error: err,
      });
    });
  });
});
