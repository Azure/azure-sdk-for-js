// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  JoinGroupMessage,
  JoinGroupOptions,
  LeaveGroupMessage,
  SendEventMessage,
  SendToGroupMessage,
  ServerDataMessage,
  WebPubSubClientOptions,
  WebPubSubResult,
  WebPubSubRetryOptions,
} from "@azure/web-pubsub-client";
import { WebPubSubClient } from "@azure/web-pubsub-client";
import { delay } from "@azure/core-util";
import { TestWebSocketClient } from "./testWebSocketClient.js";
import { WebPubSubJsonProtocol } from "@azure/web-pubsub-client";
import { getConnectedPayload } from "./utils.js";
import { SendMessageError } from "@azure/web-pubsub-client";
import { describe, it, assert, expect, vi } from "vitest";
import type { MockInstance } from "vitest";

describe("WebPubSubClient", function () {
  describe("Start operation can only be execute when stopped", () => {
    it("throw error when it's not stopped", async () => {
      const client = new WebPubSubClient("wss://service.com");
      const testWs = new TestWebSocketClient(client);
      makeStartable(testWs);
      await client.start();
      // dup start is forbidden
      await expect(client.start()).rejects.toThrowError();
      client.stop();
    });
  });

  describe("Execute operation should obey the retry policy", () => {
    const tests = [
      {
        testName: "join group",
        expectMessage: { kind: "joinGroup", group: "groupName", ackId: 2 } as JoinGroupMessage,
        actualMethod: async (client: WebPubSubClient) =>
          client.joinGroup("groupName", { ackId: 2 } as JoinGroupOptions),
      },
      {
        testName: "leave group",
        expectMessage: { kind: "leaveGroup", group: "groupName", ackId: 2 } as LeaveGroupMessage,
        actualMethod: async (client: WebPubSubClient) =>
          client.leaveGroup("groupName", { ackId: 2 } as JoinGroupOptions),
      },
      {
        testName: "send to group",
        expectMessage: {
          kind: "sendToGroup",
          group: "groupName",
          ackId: 2,
          dataType: "text",
          data: "xyz",
          noEcho: false,
        } as SendToGroupMessage,
        actualMethod: async (client: WebPubSubClient) =>
          client.sendToGroup("groupName", "xyz", "text", { ackId: 2 }),
      },
      {
        testName: "send event",
        expectMessage: {
          kind: "sendEvent",
          event: "sendEvent",
          ackId: 2,
          dataType: "text",
          data: "xyz",
        } as SendEventMessage,
        actualMethod: async (client: WebPubSubClient) =>
          client.sendEvent("sendEvent", "xyz", "text", { ackId: 2 }),
      },
    ];

    tests.forEach(({ testName, expectMessage, actualMethod }) => {
      it(`Default policy ${testName}`, async () => {
        // Change the initial delay to make the test fast
        const client = new WebPubSubClient("wss://service.com", {
          messageRetryOptions: { retryDelayInMs: 10 } as WebPubSubRetryOptions,
        } as WebPubSubClientOptions);

        const mock = vi
          .spyOn(client as any, "_sendMessage")
          .mockImplementation(() => Promise.reject());

        await actualMethod(client).catch(() => {
          /** empty */
        });

        expect(mock).toHaveBeenCalledWith(expectMessage, undefined);
        expect(mock).toHaveBeenCalledTimes(4);
      });
    });

    tests.forEach(({ testName, expectMessage, actualMethod }) => {
      it(`Max try change to 5 ${testName}`, async () => {
        // Change the initial delay to make the test fast
        const client = new WebPubSubClient("wss://service.com", {
          messageRetryOptions: { retryDelayInMs: 10, maxRetries: 5 } as WebPubSubRetryOptions,
        } as WebPubSubClientOptions);

        const mock = vi
          .spyOn(client as any, "_sendMessage")
          .mockImplementation(() => Promise.reject());

        await actualMethod(client).catch(() => {
          /** empty */
        });
        expect(mock).toHaveBeenCalledWith(expectMessage, undefined);
        expect(mock).toHaveBeenCalledTimes(6);
      });
    });

    tests.forEach(({ testName, expectMessage, actualMethod }) => {
      it(`Succeed after twice retry ${testName}`, async () => {
        // Change the initial delay to make the test fast
        const client = new WebPubSubClient("wss://service.com", {
          messageRetryOptions: { retryDelayInMs: 10 } as WebPubSubRetryOptions,
        } as WebPubSubClientOptions);

        const mock = vi
          .spyOn(client as any, "_sendMessage")
          .mockImplementationOnce(() => Promise.reject())
          .mockImplementationOnce(() => {
            client["_ackMap"].get(2)!.resolve({ ackId: 2, isDuplicated: false } as WebPubSubResult);
            return Promise.resolve();
          });

        await actualMethod(client).catch(() => {
          /** empty */
        });

        expect(mock).toHaveBeenCalledWith(expectMessage, undefined);
        expect(mock).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe("Client should obey abortSignal", () => {
    it("Abort when waiting ack", async () => {
      const client = new WebPubSubClient("wss://service.com", {
        messageRetryOptions: { maxRetries: 0 } as WebPubSubRetryOptions,
      } as WebPubSubClientOptions);

      const mock = vi
        .spyOn(client as any, "_sendMessage")
        .mockImplementationOnce(() => Promise.reject())
        .mockImplementationOnce(() => {
          client["_ackMap"].get(1)!.resolve({ ackId: 1, isDuplicated: false } as WebPubSubResult);
          return Promise.resolve();
        });

      const aborter = new AbortController();
      const p = client.joinGroup("group", {
        ackId: 1,
        abortSignal: aborter.signal,
      } as JoinGroupOptions);

      setTimeout(() => {
        aborter.abort();
      });

      await expect(p).rejects.toThrowError(SendMessageError);

      // Retry with another non-abort operation should work
      await client.joinGroup("group", { ackId: 1 } as JoinGroupOptions);

      expect(mock).toHaveBeenCalledTimes(2);
    });
  });

  describe("Client can reconnect", () => {
    it("failed at the first time", async () => {
      const client = new WebPubSubClient("wss://service.com");
      const testWs = new TestWebSocketClient(client);

      const pm = client.start();
      testWs.invokeclose(1006);
      await expect(pm).rejects.toThrowError();
    });

    // TODO: Research how to fix the timings in this test
    it("reconnect if close before connected message", async () => {
      const client = new WebPubSubClient("wss://service.com", {
        reconnectRetryOptions: { retryDelayInMs: 10 } as WebPubSubRetryOptions,
      } as WebPubSubClientOptions);
      const testWs = new TestWebSocketClient(client);

      const mock = vi.spyOn(client as any, "_getWebSocketClientFactory");

      const onOpenFn = testWs.onopen.bind(testWs);
      vi.spyOn(testWs, "onopen")
        .mockImplementationOnce((...args) => {
          setTimeout(() => {
            onOpenFn(...args);
            testWs.invokeopen.call(testWs);
          });
        })
        .mockImplementationOnce((...args) => {
          setTimeout(() => {
            onOpenFn(...args);
            testWs.invokeclose.call(testWs, 1006);
          });
        })
        .mockImplementationOnce((...args) => {
          setTimeout(() => {
            console.log("called more than 2");
            onOpenFn(...args);
            testWs.invokeopen.call(testWs);
          });
        });

      await client.start();

      testWs.invokeclose(1006);
      await delay(100);

      expect(mock).toHaveBeenCalledTimes(3);
      client.stop();
    });

    it("reconnect if not reliable protocol and connected should emit once per connection", async () => {
      const client = new WebPubSubClient("wss://service.com", {
        protocol: WebPubSubJsonProtocol(),
        reconnectRetryOptions: { retryDelayInMs: 10 } as WebPubSubRetryOptions,
      } as WebPubSubClientOptions);
      const testWs = new TestWebSocketClient(client);
      makeStartable(testWs);

      let conn: string;
      client.on("connected", (connected) => {
        conn = connected.connectionId;
      });

      await client.start();
      testWs.invokemessage(JSON.stringify(getConnectedPayload("conn")));

      await spinCheck(() => assert.equal("conn", conn));

      testWs.invokemessage(JSON.stringify(getConnectedPayload("conn2")));
      // connected should not happen again
      await expect(spinCheck(() => assert.equal("conn2", conn), 10, 3)).rejects.toThrowError();

      // drop connection
      testWs.invokeclose(1006);
      await spinCheck(() => testWs.openTime === 2);
      testWs.invokemessage(JSON.stringify(getConnectedPayload("conn2")));
      await spinCheck(() => assert.equal("conn2", conn));
    });

    it("recover if using reliable protocol", async () => {
      const client = new WebPubSubClient("wss://service.com", {
        reconnectRetryOptions: { retryDelayInMs: 10 } as WebPubSubRetryOptions,
      } as WebPubSubClientOptions);
      const testWs = new TestWebSocketClient(client);
      makeStartable(testWs);

      let conn: string;
      client.on("connected", (connected) => {
        conn = connected.connectionId;
      });

      await client.start();
      testWs.invokemessage(JSON.stringify(getConnectedPayload("conn", "reconToken")));

      await spinCheck(() => assert.equal("conn", conn));

      testWs.invokemessage(JSON.stringify(getConnectedPayload("conn2", "reconToken")));
      // connected should not happen again
      await expect(spinCheck(() => assert.equal("conn2", conn), 10, 3)).rejects.toThrowError();

      // drop connection
      testWs.invokeclose(1006);
      await spinCheck(() => testWs.openTime === 2);

      // after recover, connected should be emit again
      await expect(spinCheck(() => assert.equal("conn2", conn), 10, 3)).rejects.toThrowError();
    });

    it("recover shouldn't work for 1008 close", async () => {
      const client = new WebPubSubClient("wss://service.com", {
        reconnectRetryOptions: { retryDelayInMs: 10 } as WebPubSubRetryOptions,
      } as WebPubSubClientOptions);
      const testWs = new TestWebSocketClient(client);
      makeStartable(testWs);

      let conn: string;
      client.on("connected", (connected) => {
        conn = connected.connectionId;
      });

      await client.start();
      testWs.invokemessage(JSON.stringify(getConnectedPayload("conn")));

      await spinCheck(() => assert.equal("conn", conn));

      testWs.invokemessage(JSON.stringify(getConnectedPayload("conn2")));
      // connected should not happen again
      await expect(spinCheck(() => assert.equal("conn2", conn), 10, 3)).rejects.toThrowError();

      // drop connection
      testWs.invokeclose(1008);
      await spinCheck(() => testWs.openTime === 2);
      testWs.invokemessage(JSON.stringify(getConnectedPayload("conn2")));
      await spinCheck(() => assert.equal("conn2", conn));
    });

    it("rejoin group after reconnection", async () => {
      const client = new WebPubSubClient("wss://service.com", {
        protocol: WebPubSubJsonProtocol(),
        reconnectRetryOptions: { retryDelayInMs: 10 } as WebPubSubRetryOptions,
      } as WebPubSubClientOptions);

      const mock = vi
        .spyOn(client as any, "_joinGroupCore")
        .mockImplementation(() => Promise.resolve());

      const testWs = new TestWebSocketClient(client);
      makeStartable(testWs);

      let conn: string;
      client.on("connected", (connected) => {
        conn = connected.connectionId;
      });

      await client.start();
      testWs.invokemessage(JSON.stringify(getConnectedPayload("conn")));

      await spinCheck(() => assert.equal("conn", conn));

      // join 2 groups first
      await client.joinGroup("a");
      await client.joinGroup("b");

      // drop connection
      testWs.invokeclose(1006);
      await spinCheck(() => testWs.openTime === 2);
      testWs.invokemessage(JSON.stringify(getConnectedPayload("conn2")));
      await spinCheck(() => assert.equal("conn2", conn));

      expect(mock).toHaveBeenCalledTimes(4);
    });

    it("rejoin group after reconnection can be disabled", async () => {
      const client = new WebPubSubClient("wss://service.com", {
        protocol: WebPubSubJsonProtocol(),
        reconnectRetryOptions: { retryDelayInMs: 10 } as WebPubSubRetryOptions,
        autoRejoinGroups: false,
      } as WebPubSubClientOptions);

      const mock = vi
        .spyOn(client as any, "_joinGroupCore")
        .mockImplementation(() => Promise.resolve());

      const testWs = new TestWebSocketClient(client);
      makeStartable(testWs);

      let conn: string;
      client.on("connected", (connected) => {
        conn = connected.connectionId;
      });

      await client.start();
      testWs.invokemessage(JSON.stringify(getConnectedPayload("conn")));

      await spinCheck(() => assert.equal("conn", conn));

      // join 2 groups first
      await client.joinGroup("a");
      await client.joinGroup("b");

      // drop connection
      testWs.invokeclose(1006);
      await spinCheck(() => testWs.openTime === 2);
      testWs.invokemessage(JSON.stringify(getConnectedPayload("conn2")));
      await spinCheck(() => assert.equal("conn2", conn));

      expect(mock).toHaveBeenCalledTimes(2);
    });
  });

  describe("WebPubSubClient handle messages", () => {
    it("Handle a list of messages", async () => {
      const client = new WebPubSubClient("wss://service.com");
      const testWs = new TestWebSocketClient(client);
      makeStartable(testWs);

      vi.spyOn(client["_protocol"], "parseMessages").mockReturnValue([
        { kind: "serverData", data: "a", dataType: "text" } as ServerDataMessage,
        { kind: "serverData", data: "b", dataType: "text" } as ServerDataMessage,
      ]);

      const callback = vi.fn();
      client.on("server-message", callback);
      await client.start();

      // invoke any data as we mocked parseMessages
      testWs.invokemessage("a");

      expect(callback).toHaveBeenCalledTimes(2);
      client.stop();
    });

    it("Quick sequence ack if diff more than limit", async () => {
      const client = new WebPubSubClient("wss://service.com");
      const testWs = new TestWebSocketClient(client);
      makeStartable(testWs);

      const mock = vi.spyOn(client["_protocol"], "parseMessages").mockReturnValue([
        { kind: "serverData", data: "a", dataType: "text", sequenceId: 1 } as ServerDataMessage,
        { kind: "serverData", data: "a", dataType: "text", sequenceId: 302 } as ServerDataMessage, // semilate we got 300 messages
      ]);

      const writeMessageSpy = vi.spyOn(client["_protocol"], "writeMessage");

      await client.start();
      // invoke any data as we mocked parseMessages
      testWs.invokemessage("a");

      // expect quick sequenceAck message
      expect(writeMessageSpy).toHaveBeenCalledWith({
        kind: "sequenceAck",
        sequenceId: 302,
      });

      expect(mock).toHaveBeenCalledTimes(1);

      client.stop();
    });

    it("SequenceAck as ping", async () => {
      const client = new WebPubSubClient("wss://service.com");
      const testWs = new TestWebSocketClient(client);
      makeStartable(testWs);

      const writeMessageSpy = vi.spyOn(client["_protocol"], "writeMessage");
      await client.start();

      // simulate a update
      client["_sequenceId"].tryUpdate(0);

      // simulate a call
      client["_trySendSequenceAck"]();

      // expect quick sequenceAck message
      expect(writeMessageSpy).toHaveBeenCalledWith({
        kind: "sequenceAck",
        sequenceId: 0,
      });

      client.stop();
    });
  });

  function makeStartable(ws: TestWebSocketClient): MockInstance<(fn: () => void) => void> {
    const onOpen = ws.onopen.bind(ws);
    const stub = vi.spyOn(ws, "onopen");
    stub.mockImplementationOnce((...args) => {
      setTimeout(() => {
        onOpen(...args);
        ws.invokeopen.call(ws);
      });
    });
    return stub;
  }

  async function spinCheck(fn: () => void, intervalInMs?: number, maxTry?: number): Promise<void> {
    if (!intervalInMs) {
      intervalInMs = 10;
    }
    if (!maxTry) {
      maxTry = 100;
    }

    let tryCount = 0;
    while (tryCount < maxTry) {
      try {
        fn();
        return;
      } catch (err) {
        tryCount++;
        if (tryCount >= maxTry) {
          throw err;
        }
        await delay(intervalInMs);
      }
    }
  }
});
