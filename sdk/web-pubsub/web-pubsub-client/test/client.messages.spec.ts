// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DisconnectedMessage,
  GroupDataMessage,
  JoinGroupOptions,
  LeaveGroupOptions,
  ServerDataMessage,
} from "../src/models/index.js";
import { WebPubSubClient } from "../src/webPubSubClient.js";
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

    it("stream publisher sends start, publish and complete", async () => {
      const client = new WebPubSubClient("wss://service.com");
      const mock = vi
        .spyOn(client as any, "_sendMessage")
        .mockImplementation(() => Promise.resolve());

      const stream = client.stream("groupName", { streamId: "stream1", idleTimeoutMs: 15000 });
      await stream.publish("chunk1", "text");
      await stream.complete("chunk2", "text");

      expect(mock).toHaveBeenCalledTimes(4);
      expect(mock).toHaveBeenNthCalledWith(
        1,
        {
          kind: "streamStart",
          streamId: "stream1",
          target: "group",
          group: "groupName",
          idleTimeoutMs: 15000,
        },
        undefined,
      );
      expect(mock).toHaveBeenNthCalledWith(
        2,
        {
          kind: "streamData",
          streamId: "stream1",
          streamSequenceId: 1,
          dataType: "text",
          data: "chunk1",
        },
        undefined,
      );
      expect(mock).toHaveBeenNthCalledWith(
        3,
        {
          kind: "streamData",
          streamId: "stream1",
          streamSequenceId: 2,
          dataType: "text",
          data: "chunk2",
        },
        undefined,
      );
      expect(mock).toHaveBeenNthCalledWith(
        4,
        {
          kind: "streamEnd",
          streamId: "stream1",
          error: undefined,
        },
        undefined,
      );
    });

    it("stream publisher throws when streamId is duplicated", () => {
      const client = new WebPubSubClient("wss://service.com");
      client.stream("groupName", { streamId: "stream1" });
      expect(() => client.stream("groupName", { streamId: "stream1" })).toThrow(
        "Stream 'stream1' already exists.",
      );
    });

    it("stream publisher rejects publish after complete", async () => {
      const client = new WebPubSubClient("wss://service.com");
      vi.spyOn(client as any, "_sendMessage").mockImplementation(() => Promise.resolve());

      const stream = client.stream("groupName", { streamId: "stream1" });
      await stream.complete();

      await expect(stream.publish("chunk-after-end", "text")).rejects.toThrow(
        "Stream 'stream1' is completed.",
      );
    });

    it("stream publisher can retry start after an initial streamStart failure", async () => {
      const client = new WebPubSubClient("wss://service.com");
      const mock = vi
        .spyOn(client as any, "_sendMessage")
        .mockImplementationOnce(() => Promise.reject(new Error("start failed")))
        .mockImplementation(() => Promise.resolve());

      const stream = client.stream("groupName", { streamId: "stream1" });

      await expect(stream.publish("first", "text")).rejects.toThrow("start failed");
      await expect(stream.publish("second", "text")).resolves.toBeUndefined();

      expect(mock).toHaveBeenNthCalledWith(
        1,
        {
          kind: "streamStart",
          streamId: "stream1",
          target: "group",
          group: "groupName",
          idleTimeoutMs: undefined,
        },
        undefined,
      );
      expect(mock).toHaveBeenNthCalledWith(
        2,
        {
          kind: "streamStart",
          streamId: "stream1",
          target: "group",
          group: "groupName",
          idleTimeoutMs: undefined,
        },
        undefined,
      );
      expect(mock).toHaveBeenNthCalledWith(
        3,
        {
          kind: "streamData",
          streamId: "stream1",
          streamSequenceId: 1,
          dataType: "text",
          data: "second",
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
