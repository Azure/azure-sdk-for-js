// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, expect, it, vi } from "vitest";
import type {
  GroupStateSnapshotMessage,
  GroupStateUpdateMessage,
  WebPubSubClientOptions,
  WebPubSubResult,
  WebPubSubRetryOptions,
} from "../src/models/index.js";
import { WebPubSubJsonProtocol } from "../src/protocols/index.js";
import { WebPubSubClient } from "../src/webPubSubClient.js";
import { TestWebSocketClient } from "./testWebSocketClient.js";
import { getConnectedPayload, makeStartable, mockSendAndResolveAck, spinCheck } from "./utils.js";

describe("GroupState", () => {
  describe("Client methods construct correct messages", () => {
    it("setGroupState with state", async () => {
      const client = new WebPubSubClient("wss://service.com");
      const mock = mockSendAndResolveAck(client);

      await client.setGroupState("room", { status: "typing" }, { ackId: 42 });

      expect(mock).toHaveBeenCalledOnce();
      expect(mock).toHaveBeenCalledWith(
        {
          kind: "setGroupState",
          group: "room",
          state: { status: "typing" },
          ackId: 42,
        },
        undefined,
      );
    });

    it("clearGroupState omits state", async () => {
      const client = new WebPubSubClient("wss://service.com");
      const mock = mockSendAndResolveAck(client);

      await client.clearGroupState("room", { ackId: 43 });

      expect(mock).toHaveBeenCalledOnce();
      expect(mock).toHaveBeenCalledWith(
        {
          kind: "setGroupState",
          group: "room",
          ackId: 43,
        },
        undefined,
      );
    });

    it("subscribeGroupStates", async () => {
      const client = new WebPubSubClient("wss://service.com");
      const mock = mockSendAndResolveAck(client);

      await client.subscribeGroupStates("room", { ackId: 44 });

      expect(mock).toHaveBeenCalledOnce();
      expect(mock).toHaveBeenCalledWith(
        {
          kind: "subscribeGroupState",
          group: "room",
          ackId: 44,
        },
        undefined,
      );
    });

    it("unsubscribeGroupStates", async () => {
      const client = new WebPubSubClient("wss://service.com");
      const mock = mockSendAndResolveAck(client);

      await client.unsubscribeGroupStates("room", { ackId: 45 });

      expect(mock).toHaveBeenCalledOnce();
      expect(mock).toHaveBeenCalledWith(
        {
          kind: "unsubscribeGroupState",
          group: "room",
          ackId: 45,
        },
        undefined,
      );
    });
  });

  describe("State cache", () => {
    it("returns locally set own state without subscribing group states", async () => {
      const client = new WebPubSubClient("wss://service.com");
      mockSendAndResolveAck(client);

      expect(() => client.getGroupState("room")).toThrow("Group 'room' is not joined.");

      await client.joinGroup("room");
      await client.setGroupState("room", { status: "typing" });

      const own = client.getGroupState("room");
      expect(own).toEqual({ status: "typing" });
      // listGroupStates throws when not subscribed
      expect(() => client.listGroupStates("room")).toThrow(
        "Group state is not subscribed for group 'room'.",
      );

      own!.status = "mutated";
      expect(client.getGroupState("room")).toEqual({ status: "typing" });
    });

    it("clearGroupState clears own state locally but subscribed cache retains service record until next update", async () => {
      const client = new WebPubSubClient("wss://service.com");
      mockSendAndResolveAck(client);
      await client.joinGroup("room");
      await client.subscribeGroupStates("room");
      await client.setGroupState("room", { status: "typing" });
      client["_connectionId"] = "conn1";

      client["_handleGroupStateSnapshotMessage"]({
        kind: "groupStateSnapshot",
        group: "room",
        items: [
          {
            connectionId: "conn1",
            userId: "user1",
            state: { status: "typing" },
            updatedAt: 20,
          },
        ],
      } as GroupStateSnapshotMessage);

      expect(client.getGroupState("room")).toEqual({ status: "typing" });

      await client.clearGroupState("room");

      // Own state is cleared locally
      expect(client.getGroupState("room")).toBeUndefined();
      // But service-delivered record is still in the subscribed cache until the service sends an update
      expect(client.listGroupStates("room")).toEqual([
        {
          connectionId: "conn1",
          userId: "user1",
          state: { status: "typing" },
          updatedAt: 20,
        },
      ]);
    });

    it("preserves existing cache while resubscribing until snapshot arrives", async () => {
      const client = new WebPubSubClient("wss://service.com");
      mockSendAndResolveAck(client);
      await client.subscribeGroupStates("room");

      client["_handleGroupStateSnapshotMessage"]({
        kind: "groupStateSnapshot",
        group: "room",
        items: [
          {
            connectionId: "conn1",
            userId: "user1",
            state: { status: "typing" },
            updatedAt: 20,
          },
        ],
      } as GroupStateSnapshotMessage);

      await client.subscribeGroupStates("room");

      expect(client.listGroupStates("room")).toEqual([
        {
          connectionId: "conn1",
          userId: "user1",
          state: { status: "typing" },
          updatedAt: 20,
        },
      ]);

      client["_handleGroupStateSnapshotMessage"]({
        kind: "groupStateSnapshot",
        group: "room",
        items: [],
      } as GroupStateSnapshotMessage);

      // Empty snapshot is authoritative — stale entries are removed
      expect(client.listGroupStates("room")).toEqual([]);
    });

    it("listGroupStates returns service-delivered records", async () => {
      const client = new WebPubSubClient("wss://service.com");
      mockSendAndResolveAck(client);
      await client.joinGroup("room");
      await client.setGroupState("room", { status: "typing" });
      client["_connectionId"] = "conn1";

      const own = client.getGroupState("room");
      expect(own).toEqual({ status: "typing" });

      own!.status = "mutated";
      expect(client.getGroupState("room")).toEqual({ status: "typing" });

      await client.subscribeGroupStates("room");

      // Before snapshot arrives, listGroupStates returns empty
      expect(client.listGroupStates("room")).toEqual([]);

      client["_handleGroupStateSnapshotMessage"]({
        kind: "groupStateSnapshot",
        group: "room",
        items: [
          {
            connectionId: "conn1",
            userId: "user1",
            state: { status: "typing" },
            updatedAt: 20,
          },
        ],
      } as GroupStateSnapshotMessage);

      const states = client.listGroupStates("room");
      expect(states).toEqual([
        {
          connectionId: "conn1",
          userId: "user1",
          state: { status: "typing" },
          updatedAt: 20,
        },
      ]);

      states[0].state!.status = "mutated";
      expect(client.listGroupStates("room")[0].state).toEqual({ status: "typing" });
    });

    it("listGroupStates returns empty until service sends snapshot even if own state is set locally", async () => {
      const client = new WebPubSubClient("wss://service.com");
      mockSendAndResolveAck(client);
      await client.joinGroup("room");
      await client.setGroupState("room", { status: "typing" });
      client["_connectionId"] = "conn1";

      await client.subscribeGroupStates("room");

      // No snapshot received yet - listGroupStates returns empty
      expect(client.listGroupStates("room")).toEqual([]);
      // But getGroupState still returns locally tracked own state
      expect(client.getGroupState("room")).toEqual({ status: "typing" });
    });

    it("listGroupStates does not include own state until service echoes it", async () => {
      const client = new WebPubSubClient("wss://service.com");
      const testWs = new TestWebSocketClient(client);
      makeStartable(testWs);
      await client.start();
      testWs.invokemessage(JSON.stringify(getConnectedPayload("conn1")));
      await spinCheck(() => assert.equal(client["_connectionId"], "conn1"));

      mockSendAndResolveAck(client);
      await client.joinGroup("room");
      await client.setGroupState("room", { status: "typing" });
      await client.subscribeGroupStates("room");

      // Before service echoes back, listGroupStates is empty
      expect(client.listGroupStates("room")).toEqual([]);

      // Once service sends snapshot including this connection, it appears
      client["_handleGroupStateSnapshotMessage"]({
        kind: "groupStateSnapshot",
        group: "room",
        items: [
          {
            connectionId: "conn1",
            userId: "user",
            state: { status: "typing" },
            updatedAt: 30,
          },
        ],
      } as GroupStateSnapshotMessage);

      expect(client.listGroupStates("room")).toEqual([
        {
          connectionId: "conn1",
          userId: "user",
          state: { status: "typing" },
          updatedAt: 30,
        },
      ]);

      client.stop();
    });

    it("emits group-states-changed when update manager reports mutation", async () => {
      const client = new WebPubSubClient("wss://service.com");
      mockSendAndResolveAck(client);
      await client.subscribeGroupStates("room");
      const manager = client["_groupMap"].get("room")!.groupStateManager!;
      const applyUpdates = vi.spyOn(manager, "applyUpdates").mockReturnValue(true);
      const changed = vi.fn();
      client.on("group-states-changed", changed);

      const message = {
        kind: "groupStateUpdate",
        group: "room",
        items: [
          {
            connectionId: "conn1",
            userId: "user1",
            state: { status: "typing" },
            updatedAt: 20,
          },
        ],
      } as GroupStateUpdateMessage;

      client["_handleGroupStateUpdateMessage"](message);

      expect(applyUpdates).toHaveBeenCalledWith(message.items);
      expect(changed).toHaveBeenCalledOnce();
      expect(changed).toHaveBeenCalledWith({ group: "room" });
    });

    it("does not emit group-states-changed when update manager reports no mutation", async () => {
      const client = new WebPubSubClient("wss://service.com");
      mockSendAndResolveAck(client);
      await client.subscribeGroupStates("room");
      const manager = client["_groupMap"].get("room")!.groupStateManager!;
      vi.spyOn(manager, "applyUpdates").mockReturnValue(false);
      const changed = vi.fn();
      client.on("group-states-changed", changed);

      client["_handleGroupStateUpdateMessage"]({
        kind: "groupStateUpdate",
        group: "room",
        items: [],
      } as GroupStateUpdateMessage);

      expect(changed).not.toHaveBeenCalled();
    });

    it("emits group-states-changed when snapshot manager reports mutation", async () => {
      const client = new WebPubSubClient("wss://service.com");
      mockSendAndResolveAck(client);
      await client.subscribeGroupStates("room");
      const manager = client["_groupMap"].get("room")!.groupStateManager!;
      const applySnapshot = vi.spyOn(manager, "applySnapshot").mockReturnValue(true);
      const changed = vi.fn();
      client.on("group-states-changed", changed);

      const message = {
        kind: "groupStateSnapshot",
        group: "room",
        items: [
          {
            connectionId: "conn1",
            userId: "user1",
            state: { status: "typing" },
            updatedAt: 20,
          },
        ],
      } as GroupStateSnapshotMessage;

      client["_handleGroupStateSnapshotMessage"](message);

      expect(applySnapshot).toHaveBeenCalledWith(message.items);
      expect(changed).toHaveBeenCalledOnce();
      expect(changed).toHaveBeenCalledWith({ group: "room" });
    });

    it("does not emit group-states-changed when snapshot manager reports no mutation", async () => {
      const client = new WebPubSubClient("wss://service.com");
      mockSendAndResolveAck(client);
      await client.subscribeGroupStates("room");
      const manager = client["_groupMap"].get("room")!.groupStateManager!;
      vi.spyOn(manager, "applySnapshot").mockReturnValue(false);
      const changed = vi.fn();
      client.on("group-states-changed", changed);

      client["_handleGroupStateSnapshotMessage"]({
        kind: "groupStateSnapshot",
        group: "room",
        items: [],
      } as GroupStateSnapshotMessage);

      expect(changed).not.toHaveBeenCalled();
    });

    it("clears cache on unsubscribe", async () => {
      const client = new WebPubSubClient("wss://service.com");
      mockSendAndResolveAck(client);
      await client.subscribeGroupStates("room");

      client["_handleGroupStateSnapshotMessage"]({
        kind: "groupStateSnapshot",
        group: "room",
        items: [
          {
            connectionId: "conn1",
            userId: "user1",
            state: { status: "typing" },
            updatedAt: 20,
          },
        ],
      } as GroupStateSnapshotMessage);

      expect(client.listGroupStates("room")).toHaveLength(1);

      await client.unsubscribeGroupStates("room");

      expect(() => client.listGroupStates("room")).toThrow(
        "Group state is not subscribed for group 'room'.",
      );
    });

    it("handles group state updates from incoming messages", async () => {
      const client = new WebPubSubClient("wss://service.com");
      const testWs = new TestWebSocketClient(client);
      makeStartable(testWs);
      await client.start();
      mockSendAndResolveAck(client);
      await client.subscribeGroupStates("room");

      testWs.invokemessage(
        JSON.stringify({
          type: "groupStateUpdate",
          group: "room",
          items: [
            {
              connectionId: "conn1",
              userId: "user1",
              state: { status: "typing" },
              updatedAt: 20,
            },
          ],
        }),
      );

      expect(client.listGroupStates("room")).toEqual([
        {
          connectionId: "conn1",
          userId: "user1",
          state: { status: "typing" },
          updatedAt: 20,
        },
      ]);
      client.stop();
    });
  });

  describe("Reconnection", () => {
    it("resubscribes group states after non-recovered reconnect", async () => {
      const client = new WebPubSubClient("wss://service.com", {
        protocol: WebPubSubJsonProtocol(),
        reconnectRetryOptions: { retryDelayInMs: 10 } as WebPubSubRetryOptions,
      } as WebPubSubClientOptions);

      const joinMock = vi
        .spyOn(client as any, "_joinGroupCore")
        .mockImplementation(() => Promise.resolve({ isDuplicated: false } as WebPubSubResult));
      const subscribeMock = vi
        .spyOn(client as any, "_subscribeGroupStatesCore")
        .mockImplementation(() => Promise.resolve({ isDuplicated: false } as WebPubSubResult));

      const testWs = new TestWebSocketClient(client);
      makeStartable(testWs);

      let connectionId: string | undefined;
      client.on("connected", (connected) => {
        connectionId = connected.connectionId;
      });

      await client.start();
      testWs.invokemessage(JSON.stringify(getConnectedPayload("conn1")));
      await spinCheck(() => assert.equal(connectionId, "conn1"));

      await client.joinGroup("room");
      client["_setOwnGroupState"]("room", { status: "typing" });
      expect(client.getGroupState("room")).toEqual({ status: "typing" });
      await client.subscribeGroupStates("room");
      client["_handleGroupStateSnapshotMessage"]({
        kind: "groupStateSnapshot",
        group: "room",
        items: [
          {
            connectionId: "oldConn",
            userId: "oldUser",
            state: { status: "typing" },
            updatedAt: 20,
          },
        ],
      } as GroupStateSnapshotMessage);
      expect(client.listGroupStates("room")).toHaveLength(1);

      testWs.invokeclose(1006);
      await spinCheck(() => assert.equal(testWs.openTime, 2));
      testWs.invokemessage(JSON.stringify(getConnectedPayload("conn2")));
      await spinCheck(() => assert.equal(connectionId, "conn2"));

      expect(joinMock).toHaveBeenCalledTimes(2);
      expect(subscribeMock).toHaveBeenCalledTimes(2);
      expect(client.getGroupState("room")).toBeUndefined();
      expect(client.listGroupStates("room")).toEqual([]);
      client.stop();
    });
  });
});
