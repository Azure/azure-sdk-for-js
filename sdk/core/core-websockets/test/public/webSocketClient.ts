// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, beforeEach, afterEach, type SuiteCollector } from "vitest";
import { assert } from "../utils/vitest.js";
import type { WebSocketClientOptions, WebSocketClient } from "../../src/index.js";
import { delay } from "@azure/core-util";
import { createIdentifier } from "../utils/reliableConnectionClientMocks.js";
import { getInsecureServerAddress, getSecureServerAddress } from "../utils/injectables.js";

const waitBeforeReceive = 200;

export function buildWebSocketClientTests<WebSocket extends { url: string; binaryType: string }>(
  clientName: string,
  createWebSocketClient: (
    url: string,
    options?: WebSocketClientOptions,
  ) => Promise<WebSocketClient<WebSocket>>,
): SuiteCollector {
  return describe(`[${clientName}] createWebSocketClient`, () => {
    const secureServerUrl = getSecureServerAddress();
    const insecureServerUrl = getInsecureServerAddress();

    let identifier: string;
    let client: WebSocketClient<WebSocket>;
    let skipClose = false;

    beforeEach(async (test) => {
      identifier = createIdentifier(test);
    });

    afterEach(async () => {
      if (!skipClose) {
        await client.close();
        assert.equal(client.status, "disconnected");
      }
    });

    it("should connect to a WebSocket server", async () => {
      client = await createWebSocketClient(secureServerUrl, {
        identifier,
      });
      assert.equal(client.identifier, identifier);
      assert.equal(client.status, "connected");
      assert.equal(client.websocket.url, secureServerUrl);
      assert.equal(client.websocket.binaryType, "arraybuffer");
      let received = "";
      client.on("message", (data) => {
        received += "\n" + data;
      });
      await client.send("Hello, World!");
      await delay(waitBeforeReceive);
      assert.include(received, "Hello, World!");
    });

    it("refuses to connect to an insecure server", async () => {
      await assert.isRejected(
        createWebSocketClient(insecureServerUrl, {
          identifier,
        }),
        /Insecure/,
      );
      skipClose = true;
    });

    it("connects to an insecure server if allowInsecureConnection enabled", async () => {
      client = await createWebSocketClient(insecureServerUrl, {
        identifier,
        allowInsecureConnection: true,
      });
      assert.equal(client.identifier, identifier);
      assert.equal(client.status, "connected");
      assert.equal(client.websocket.url, insecureServerUrl);
      assert.equal(client.websocket.binaryType, "arraybuffer");
      let received = "";
      client.on("message", (data) => {
        received += "\n" + data;
      });
      await client.send("Hello, World!");
      await delay(waitBeforeReceive);
      assert.include(received, "Hello, World!");
    });

    it("connects to https server with wss protocol", async () => {
      const url = secureServerUrl;
      client = await createWebSocketClient(url.replace("wss", "https"), {
        identifier,
      });
      assert.equal(client.identifier, identifier);
      assert.equal(client.status, "connected");
      assert.equal(client.websocket.url, url);
      assert.equal(client.websocket.binaryType, "arraybuffer");
      let received = "";
      client.on("message", (data) => {
        received += "\n" + data;
      });
      await client.send("Hello, World!");
      await delay(waitBeforeReceive);
      assert.include(received, "Hello, World!");
    });

    it("connects to http server with ws protocol", async () => {
      const url = insecureServerUrl;
      client = await createWebSocketClient(url.replace("ws", "http"), {
        identifier,
        allowInsecureConnection: true,
      });
      assert.equal(client.identifier, identifier);
      assert.equal(client.status, "connected");
      assert.equal(client.websocket.url, url);
      assert.equal(client.websocket.binaryType, "arraybuffer");
      let received = "";
      client.on("message", (data) => {
        received += "\n" + data;
      });
      await client.send("Hello, World!");
      await delay(waitBeforeReceive);
      assert.include(received, "Hello, World!");
    });

    it("connection can be aborted before being established", async () => {
      const abortController = new AbortController();
      abortController.abort();
      await assert.isRejected(
        createWebSocketClient(secureServerUrl, {
          identifier,
          abortSignal: abortController.signal,
        }),
        /aborted/,
      );
      skipClose = true;
    });

    it("highwater mark is respected under stress", async () => {
      client = await createWebSocketClient(secureServerUrl, {
        identifier,
        highWaterMark: 10,
      });
      assert.equal(client.status, "connected");
      assert.equal(client.websocket.url, secureServerUrl);
      assert.equal(client.websocket.binaryType, "arraybuffer");

      const burstCount = 10;
      const sendResults = await Promise.all(
        Array.from({ length: burstCount }, (_, i) => client.send(`Message ${i + 1}`)),
      );

      const acceptedCount = sendResults.filter((result) => result === true).length;
      const rejectedCount = sendResults.filter((result) => result === false).length;

      assert.isAtLeast(acceptedCount, 1);
      assert.isAtLeast(rejectedCount, 1);
    });

    describe("listeners", () => {
      describe("open", () => {
        it("supports initial handler", async () => {
          let openCount = 0;
          function handler(): void {
            openCount++;
          }
          client = await createWebSocketClient(secureServerUrl, {
            identifier,
            on: {
              open: handler,
            },
          });
          await delay(0);
          assert.equal(openCount, 1);
        });
      });

      describe("message", () => {
        it("supports initial handler", async () => {
          let messageCount = 0;
          function handler(): void {
            messageCount++;
          }
          client = await createWebSocketClient(secureServerUrl, {
            identifier,
            on: {
              message: handler,
            },
          });
          await client.send("test");
          await delay(waitBeforeReceive);
          assert.equal(messageCount, 1);
          client.off("message", handler);
          await client.send("test");
          await delay(waitBeforeReceive);
          assert.equal(messageCount, 1);
        });

        it("supports both initial handler and ones registered later on", async () => {
          let messageCount = 0;
          function handler1(): void {
            messageCount++;
          }
          function handler2(): void {
            messageCount++;
          }
          client = await createWebSocketClient(secureServerUrl, {
            identifier,
            on: {
              message: handler1,
            },
          });
          client.on("message", handler2);
          await client.send("test");
          await delay(waitBeforeReceive);
          assert.equal(messageCount, 2);
          client.off("message", handler1);
          await client.send("test");
          await delay(waitBeforeReceive);
          assert.equal(messageCount, 3);
          client.off("message", handler2);
          await client.send("test");
          await delay(waitBeforeReceive);
          assert.equal(messageCount, 3);
        });

        it("supports multiple handlers", async () => {
          let messageCount = 0;
          client = await createWebSocketClient(secureServerUrl, {
            identifier,
          });
          client.on("message", () => {
            messageCount++;
          });
          client.on("message", () => {
            messageCount++;
          });
          await client.send("test");
          await delay(waitBeforeReceive);
          assert.equal(messageCount, 2);
        });
      });

      describe("close", () => {
        afterEach(() => {
          skipClose = true;
        });

        it("supports initial handler", async () => {
          let closeCount = 0;
          client = await createWebSocketClient(secureServerUrl, {
            identifier,
            on: {
              close: () => {
                closeCount++;
              },
            },
          });
          await client.send("emit close");
          await delay(waitBeforeReceive);
          assert.equal(closeCount, 1);
        });

        it("supports both initial handler and ones registered later on", async () => {
          let closeCount = 0;
          client = await createWebSocketClient(secureServerUrl, {
            identifier,
            on: {
              close: () => {
                closeCount++;
              },
            },
          });
          client.on("close", () => {
            closeCount++;
          });
          await client.send("emit close");
          await delay(waitBeforeReceive);
          assert.equal(closeCount, 2);
        });

        it("supports multiple handlers", async () => {
          let closeCount = 0;
          client = await createWebSocketClient(secureServerUrl, {
            identifier,
          });
          client.on("close", () => {
            closeCount++;
          });
          client.on("close", () => {
            closeCount++;
          });
          await client.send("emit close");
          await delay(waitBeforeReceive);
          assert.equal(closeCount, 2);
        });
      });
    });
  });
}
