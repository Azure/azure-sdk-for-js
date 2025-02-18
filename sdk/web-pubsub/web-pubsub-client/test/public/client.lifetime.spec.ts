// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  JoinGroupMessage,
  JoinGroupOptions,
  LeaveGroupMessage,
  SendEventMessage,
  SendToGroupMessage,
  WebPubSubResult,
} from "../../src/index.js";
import { WebPubSubClient, WebPubSubJsonProtocol, SendMessageError } from "../../src/index.js";
import { delay } from "@azure/core-util";
import { describe, it, expect, vi } from "vitest";
import {
  getGroupName,
  getProxyHttpsUrl,
  getProxyWssUrl,
  getSimulatorAdminUrl,
  getWebPubSubClientUrl,
  isMockMode,
} from "../utils/injectables.js";
import { assert } from "../utils/vitest.js";

describe("WebPubSubClient", function () {
  const url = getWebPubSubClientUrl();
  const proxyWssUrl = getProxyWssUrl();
  const proxyHttpsUrl = getProxyHttpsUrl();
  const simulatorAdminUrl = getSimulatorAdminUrl();
  const groupName = getGroupName();
  const retryDelayInMs = isMockMode() ? 10 : 1000;
  const waitForEvents = isMockMode() ? 100 : 2000;

  async function setDropProbability(probability: number): Promise<void> {
    const res = await fetch(`${proxyHttpsUrl}/dropProbability`, {
      method: "POST",
      body: JSON.stringify({ dropProbability: probability }),
      headers: { "Content-Type": "application/json" },
    });
    const { updated } = await res.json();
    if (!res.ok || !updated) {
      throw new Error(`Failed to set drop probability: ${res.statusText}`);
    }
  }

  async function askForConnectedMessage(): Promise<void> {
    const res = await fetch(`${simulatorAdminUrl}/admin/force-reconnect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    await res.json();
    if (!res.ok) {
      throw new Error(`Failed to send connected message: ${res.statusText}`);
    }
  }

  async function askForClose(closeCode?: number, closeReason?: string): Promise<void> {
    const payload: Record<string, unknown> = {};
    if (closeCode !== undefined) {
      payload.closeCode = closeCode;
    }
    if (closeReason !== undefined) {
      payload.closeReason = closeReason;
    }
    const res = await fetch(`${proxyHttpsUrl}/close`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const { closed } = await res.json();
    if (!res.ok || !closed) {
      throw new Error(`Failed to close connection: ${res.statusText}`);
    }
  }

  describe("Start operation can only be execute when stopped", () => {
    it("throw error when it's not stopped", async () => {
      const client = new WebPubSubClient(url);
      await client.start();
      await assert.isRejected(client.start());
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
        const client = new WebPubSubClient(url, {
          messageRetryOptions: { retryDelayInMs },
        });

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
        const client = new WebPubSubClient(url, {
          messageRetryOptions: { retryDelayInMs, maxRetries: 5 },
        });

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
        const client = new WebPubSubClient(url, {
          messageRetryOptions: { retryDelayInMs },
        });

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
      const client = new WebPubSubClient(url, {
        messageRetryOptions: { maxRetries: 0 },
      });

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

      await expect(p).to.be.rejected.then((e) => {
        return expect(e).toBeInstanceOf(SendMessageError);
      });

      // Retry with another non-abort operation should work
      await client.joinGroup("group", { ackId: 1 } as JoinGroupOptions);

      expect(mock).toHaveBeenCalledTimes(2);
    });
  });

  describe("Client can reconnect", () => {
    it("failed at the first time", async () => {
      let isConnectedCallbackCalled = false;
      const client = new WebPubSubClient(proxyWssUrl, {
        reconnectRetryOptions: { retryDelayInMs, maxRetries: 3 },
      });
      client.on("connected", () => {
        isConnectedCallbackCalled = true;
      });
      setDropProbability(1);
      await assert.isRejected(client.start());
      assert.isFalse(isConnectedCallbackCalled);
    });

    it("reconnect if close before connected message", async () => {
      const client = new WebPubSubClient(proxyWssUrl, {
        reconnectRetryOptions: { retryDelayInMs },
      });
      let isConnectedCallbackCalled = false;
      client.on("connected", () => {
        isConnectedCallbackCalled = true;
      });
      setDropProbability(1);
      await assert.isFulfilled(
        Promise.all([
          client.start(),
          delay(retryDelayInMs * 2)
            .then(() => setDropProbability(0))
            .then(() => delay(waitForEvents)),
        ]),
      );
      assert.isTrue(isConnectedCallbackCalled);
      client.stop();
    });

    it("reconnect if not reliable protocol and connected should emit once per connection", async () => {
      const client = new WebPubSubClient(proxyWssUrl, {
        protocol: WebPubSubJsonProtocol(),
        reconnectRetryOptions: { retryDelayInMs },
      });
      let connectedCallbackCallCount = 0;
      client.on("connected", () => {
        ++connectedCallbackCallCount;
      });
      setDropProbability(0);
      await client.start();
      await delay(waitForEvents);
      assert.equal(connectedCallbackCallCount, 1);
      if (isMockMode()) {
        await askForConnectedMessage();
        await delay(waitForEvents);
        assert.equal(connectedCallbackCallCount, 1);
      }
      await askForClose(1011);
      await delay(waitForEvents);
      assert.equal(connectedCallbackCallCount, 2);
      client.stop();
    });

    it("recover if using reliable protocol", async () => {
      const client = new WebPubSubClient(proxyWssUrl, {
        reconnectRetryOptions: { retryDelayInMs },
      });
      let connectedCallbackCallCount = 0;
      client.on("connected", () => {
        ++connectedCallbackCallCount;
      });
      setDropProbability(0);
      await client.start();
      await delay(waitForEvents);
      assert.equal(connectedCallbackCallCount, 1);
      if (isMockMode()) {
        await askForConnectedMessage();
        await delay(waitForEvents);
        assert.equal(connectedCallbackCallCount, 1);
      }
      await askForClose(1011);
      await delay(waitForEvents);
      assert.equal(connectedCallbackCallCount, 1);
      client.stop();
    });

    it("recover shouldn't work for 1008 close", async () => {
      const client = new WebPubSubClient(proxyWssUrl, {
        reconnectRetryOptions: { retryDelayInMs },
      });
      let connectedCallbackCallCount = 0;
      client.on("connected", () => {
        ++connectedCallbackCallCount;
      });
      setDropProbability(0);
      await client.start();
      await delay(waitForEvents);
      assert.equal(connectedCallbackCallCount, 1);
      if (isMockMode()) {
        await askForConnectedMessage();
        await delay(waitForEvents);
        assert.equal(connectedCallbackCallCount, 1);
      }
      await askForClose(1008);
      await delay(waitForEvents);
      assert.equal(connectedCallbackCallCount, 2);
      client.stop();
    });

    it("rejoin group after reconnection", async () => {
      const client = new WebPubSubClient(url, {
        protocol: WebPubSubJsonProtocol(),
        reconnectRetryOptions: { retryDelayInMs },
      });

      const mock = vi
        .spyOn(client as any, "_joinGroupCore")
        .mockImplementation(() => Promise.resolve());

      await client.start();
      // join 2 groups first
      await client.joinGroup("a");
      await client.joinGroup("b");

      await askForClose(1008);
      await delay(waitForEvents);

      expect(mock).toHaveBeenCalledTimes(4);
    });

    it("rejoin group after reconnection can be disabled", async () => {
      const client = new WebPubSubClient(url, {
        protocol: WebPubSubJsonProtocol(),
        reconnectRetryOptions: { retryDelayInMs },
        autoRejoinGroups: false,
      });

      const mock = vi
        .spyOn(client as any, "_joinGroupCore")
        .mockImplementation(() => Promise.resolve());

      await client.start();

      // join 2 groups first
      await client.joinGroup("a");
      await client.joinGroup("b");

      await askForClose(1008);
      await delay(waitForEvents);

      expect(mock).toHaveBeenCalledTimes(2);
      mock.mockRestore();
    });
  });

  describe("WebPubSubClient handle messages", () => {
    it("Handle a list of messages", async () => {
      const client = new WebPubSubClient(url);

      let groupMsgCallbackCallCount = 0;
      client.on("group-message", () => {
        ++groupMsgCallbackCallCount;
      });
      setDropProbability(0);
      await client.start();
      await delay(waitForEvents);
      await client.joinGroup(groupName);
      await client.sendToGroup(groupName, "msg1", "text");
      await client.sendToGroup(groupName, "msg2", "text");
      await delay(waitForEvents);
      assert.equal(groupMsgCallbackCallCount, 2);
      client.stop();
    });

    it("Quick sequence ack if diff more than limit", async () => {
      const client = new WebPubSubClient(proxyWssUrl);
      const writeMessageSpy = vi.spyOn(client["_protocol"], "writeMessage");
      setDropProbability(0);
      await client.start();
      await delay(waitForEvents);
      await client.joinGroup(groupName);
      for (let i = 0; i < 10; i++) {
        await client.sendToGroup(groupName, "msg", "text");
      }
      await delay(1000);
      // expect quick sequenceAck message
      expect(writeMessageSpy).toHaveBeenNthCalledWith(12, {
        kind: "sequenceAck",
        sequenceId: 10,
      });
      client.stop();
    });

    it("SequenceAck as ping", async () => {
      const client = new WebPubSubClient(url);

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
});
