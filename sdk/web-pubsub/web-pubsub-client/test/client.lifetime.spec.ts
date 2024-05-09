// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, expect } from "chai";
import sinon from "sinon";
import {
  JoinGroupMessage,
  JoinGroupOptions,
  LeaveGroupMessage,
  SendEventMessage,
  SendToGroupMessage,
  ServerDataMessage,
  WebPubSubClientOptions,
  WebPubSubResult,
  WebPubSubRetryOptions,
} from "../src/models";
import { WebPubSubClient } from "../src/webPubSubClient";
import { delay } from "@azure/core-util";
import { TestWebSocketClient } from "./testWebSocketClient";
import { WebPubSubJsonProtocol } from "../src/protocols";
import { getConnectedPayload } from "./utils";
import { AbortController } from "@azure/abort-controller";
import { SendMessageError } from "../src/errors";

describe("WebPubSubClient", function () {
  describe("Start operation can only be execute when stopped", () => {
    it("throw error when it's not stopped", async () => {
      const client = new WebPubSubClient("wss://service.com");
      const testWs = new TestWebSocketClient(client);
      makeStartable(testWs);
      await client.start();
      // dup start is forbidden
      await expect(client.start()).to.be.rejectedWith(Error);
      client.stop();
    });
  });

  describe("Execute operation should obey the retry policy", () => {
    const tests = [
      {
        testName: "join group",
        expectMessage: { kind: "joinGroup", group: "groupName", ackId: 2 } as JoinGroupMessage,
        actualMethod: async (client: WebPubSubClient) =>
          await client.joinGroup("groupName", { ackId: 2 } as JoinGroupOptions),
      },
      {
        testName: "leave group",
        expectMessage: { kind: "leaveGroup", group: "groupName", ackId: 2 } as LeaveGroupMessage,
        actualMethod: async (client: WebPubSubClient) =>
          await client.leaveGroup("groupName", { ackId: 2 } as JoinGroupOptions),
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
          await client.sendToGroup("groupName", "xyz", "text", { ackId: 2 }),
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
          await client.sendEvent("sendEvent", "xyz", "text", { ackId: 2 }),
      },
    ];

    tests.forEach(({ testName, expectMessage, actualMethod }) => {
      it(`Default policy ${testName}`, async () => {
        // Change the initial delay to make the test fast
        const client = new WebPubSubClient("wss://service.com", {
          messageRetryOptions: { retryDelayInMs: 10 } as WebPubSubRetryOptions,
        } as WebPubSubClientOptions);
        const mock = sinon.mock(client);
        mock
          .expects("_sendMessage")
          .exactly(4)
          .withArgs(expectMessage)
          .callsFake((_) => Promise.reject());
        try {
          await actualMethod(client);
        } catch {}
        mock.verify();
      });
    });

    tests.forEach(({ testName, expectMessage, actualMethod }) => {
      it(`Max try change to 5 ${testName}`, async () => {
        // Change the initial delay to make the test fast
        const client = new WebPubSubClient("wss://service.com", {
          messageRetryOptions: { retryDelayInMs: 10, maxRetries: 5 } as WebPubSubRetryOptions,
        } as WebPubSubClientOptions);
        const mock = sinon.mock(client);
        mock
          .expects("_sendMessage")
          .exactly(6)
          .withArgs(expectMessage)
          .callsFake((_) => Promise.reject());
        try {
          await actualMethod(client);
        } catch {}
        mock.verify();
      });
    });

    tests.forEach(({ testName, expectMessage, actualMethod }) => {
      it(`Succeed after twice retry ${testName}`, async () => {
        // Change the initial delay to make the test fast
        const client = new WebPubSubClient("wss://service.com", {
          messageRetryOptions: { retryDelayInMs: 10 } as WebPubSubRetryOptions,
        } as WebPubSubClientOptions);
        const mock = sinon.mock(client);
        mock
          .expects("_sendMessage")
          .exactly(2)
          .withArgs(expectMessage)
          .onFirstCall()
          .returns(Promise.reject(new Error("failed")))
          .callsFake(() => {
            client["_ackMap"].get(2)!.resolve({ ackId: 2, isDuplicated: false } as WebPubSubResult);
            return Promise.resolve();
          });
        try {
          await actualMethod(client);
        } catch {}
        mock.verify();
      });
    });
  });

  describe("Client should obey abortSignal", () => {
    it("Abort when waiting ack", async () => {
      const client = new WebPubSubClient("wss://service.com", {
        messageRetryOptions: { maxRetries: 0 } as WebPubSubRetryOptions,
      } as WebPubSubClientOptions);

      const mock = sinon.mock(client);
      mock
        .expects("_sendMessage")
        .exactly(2)
        .onFirstCall()
        .callsFake(() => {
          return Promise.resolve();
        })
        .onSecondCall()
        .callsFake(() => {
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
      await expect(p).to.be.rejectedWith(SendMessageError);

      // Retry with another non-abort operation should work
      await client.joinGroup("group", { ackId: 1 } as JoinGroupOptions);

      mock.verify();
    });
  });

  describe("Client can reconnect", () => {
    it("failed at the first time", async () => {
      const client = new WebPubSubClient("wss://service.com");
      const testWs = new TestWebSocketClient(client);

      const pm = client.start();
      testWs.invokeclose(1006);
      await expect(pm).to.be.rejectedWith(Error);
    });

    it("reconnect if close before connected message", async () => {
      const client = new WebPubSubClient("wss://service.com", {
        reconnectRetryOptions: { retryDelayInMs: 10 } as WebPubSubRetryOptions,
      } as WebPubSubClientOptions);
      const testWs = new TestWebSocketClient(client);

      const mock = sinon.mock(client);
      mock.expects("_getWebSocketClientFactory").thrice().callThrough();

      const stub = sinon.stub(testWs, "onopen");
      stub
        .onFirstCall()
        .callsFake((...args) => {
          setTimeout(() => {
            stub.wrappedMethod.call(testWs, ...args);
            testWs.invokeopen.call(testWs);
          });
        })
        .onSecondCall()
        .callsFake((...args) => {
          setTimeout(() => {
            stub.wrappedMethod.call(testWs, ...args);
            testWs.invokeclose.call(testWs, 1006);
          });
        })
        .callsFake((...args) => {
          setTimeout(() => {
            console.log("called more than 2");
            stub.wrappedMethod.call(testWs, ...args);
            testWs.invokeopen.call(testWs);
          });
        });

      await client.start();
      testWs.invokeclose(1006);
      await delay(100);
      mock.verify();
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
      await expect(spinCheck(() => assert.equal("conn2", conn), 10, 3)).to.be.rejectedWith(Error);

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
      await expect(spinCheck(() => assert.equal("conn2", conn), 10, 3)).to.be.rejectedWith(Error);

      // drop connection
      testWs.invokeclose(1006);
      await spinCheck(() => testWs.openTime === 2);

      // after recover, connected should be emit again
      await expect(spinCheck(() => assert.equal("conn2", conn), 10, 3)).to.be.rejectedWith(Error);
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
      await expect(spinCheck(() => assert.equal("conn2", conn), 10, 3)).to.be.rejectedWith(Error);

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
      const mock = sinon.mock(client);
      mock
        .expects("_joinGroupCore")
        .exactly(4)
        .callsFake((_) => Promise.resolve());

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

      mock.verify();
    });

    it("rejoin group after reconnection can be disabled", async () => {
      const client = new WebPubSubClient("wss://service.com", {
        protocol: WebPubSubJsonProtocol(),
        reconnectRetryOptions: { retryDelayInMs: 10 } as WebPubSubRetryOptions,
        autoRejoinGroups: false,
      } as WebPubSubClientOptions);
      const mock = sinon.mock(client);
      mock
        .expects("_joinGroupCore")
        .exactly(2)
        .callsFake((_) => Promise.resolve());

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

      mock.verify();
    });
  });

  describe("WebPubSubClient handle messages", () => {
    it("Handle a list of messages", async () => {
      const client = new WebPubSubClient("wss://service.com");
      const testWs = new TestWebSocketClient(client);
      makeStartable(testWs);

      const mock = sinon.mock(client["_protocol"]);
      mock
        .expects("parseMessages")
        .returns([
          { kind: "serverData", data: "a", dataType: "text" } as ServerDataMessage,
          { kind: "serverData", data: "b", dataType: "text" } as ServerDataMessage,
        ]);

      const callback = sinon.spy();
      client.on("server-message", callback);
      await client.start();

      // invoke any data as we mocked parseMessages
      testWs.invokemessage("a");

      assert.equal(2, callback.callCount);
      client.stop();
    });

    it("Quick sequence ack if diff more than limit", async () => {
      const client = new WebPubSubClient("wss://service.com");
      const testWs = new TestWebSocketClient(client);
      makeStartable(testWs);

      const mock = sinon.mock(client["_protocol"]);
      mock.expects("parseMessages").returns([
        { kind: "serverData", data: "a", dataType: "text", sequenceId: 1 } as ServerDataMessage,
        { kind: "serverData", data: "a", dataType: "text", sequenceId: 302 } as ServerDataMessage, // semilate we got 300 messages
      ]);

      const writeMessageSpy = sinon.spy(client["_protocol"], "writeMessage");

      await client.start();
      // invoke any data as we mocked parseMessages
      testWs.invokemessage("a");

      // expect quick sequenceAck message
      sinon.assert.calledWith(
        writeMessageSpy,
        sinon.match.has("kind", "sequenceAck").and(sinon.match.has("sequenceId", 302)),
      );
      mock.verify();
      client.stop();
    });

    it("SequenceAck as ping", async () => {
      const client = new WebPubSubClient("wss://service.com");
      const testWs = new TestWebSocketClient(client);
      makeStartable(testWs);

      const writeMessageSpy = sinon.spy(client["_protocol"], "writeMessage");
      await client.start();

      // simulate a update
      client["_sequenceId"].tryUpdate(0);

      // simulate a call
      client["_trySendSequenceAck"]();

      // expect quick sequenceAck message
      sinon.assert.calledWith(
        writeMessageSpy,
        sinon.match.has("kind", "sequenceAck").and(sinon.match.has("sequenceId", 0)),
      );
      client.stop();
    });
  });

  function makeStartable(ws: TestWebSocketClient): sinon.SinonStub<[fn: () => void], void> {
    const stub = sinon.stub(ws, "onopen");
    stub.onFirstCall().callsFake((...args) => {
      setTimeout(() => {
        stub.wrappedMethod.call(ws, ...args);
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
