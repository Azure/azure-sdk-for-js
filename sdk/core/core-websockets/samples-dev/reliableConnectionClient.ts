// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary demonstrates how to create a WebSocket client using ReliableConnectionClient.
 */
import {
  type BufferLike,
  createReliableConnectionClient,
  type ReliableConnectionOptions,
} from "@azure/core-websockets";
import WebSocket from "ws";

function createClient(url: string, opts?: ReliableConnectionOptions) {
  let ws: WebSocket | undefined = undefined;
  const clientFactory = createReliableConnectionClient<BufferLike, WebSocket.Data>({
    open: async () => {
      ws = new WebSocket(url);
    },
    close: async ({ info } = {}) => {
      const { code, reason } = info || {};
      ws?.close(code ? +code : undefined, reason);
    },
    send: async (data) => {
      ws?.send(data);
    },
    isOpen: async () => {
      return ws?.readyState === WebSocket.OPEN;
    },
    onClose(fn) {
      if (!ws) {
        return;
      }
      ws.onclose = ({ code, reason }) => fn({ code: `${code}`, reason });
    },
    onError(fn) {
      if (!ws) {
        return;
      }
      ws.onerror = (event) => fn(event.error);
    },
    onMessage(fn) {
      if (!ws) {
        return;
      }
      ws.onmessage = (event) => fn(event.data);
    },
    onOpen(fn) {
      if (!ws) {
        return;
      }
      ws.onopen = fn;
    },
    canReconnect(info) {
      return info.code !== "1008";
    },
  });
  return clientFactory(opts);
}

async function main(): Promise<void> {
  const client = createClient("wss://echo.websocket.org", { retryOptions: { timeoutInMs: 2000 } });
  await client.open();
  client.onMessage((data) => {
    console.log("received:", data);
  });
  await client.send("Hello, World!");
  await client.close();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
