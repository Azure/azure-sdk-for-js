// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createConnectionManager } from "./connectionManager.js";
import type {
  ConnectionManager,
  Data,
  WebSocketClient,
  WebSocketClientOptions,
  WebsocketClientWrapper,
} from "./models/public.js";
import { createReliableConnectionClient } from "./reliableConnectionClient.js";
import { createError, createUrl } from "./utils.js";
import { createWebSocket } from "./webSocket.js";
import { createWS } from "./ws.js";

async function withConnectionManager(
  connectionManager: ConnectionManager<Data, Data>,
  options: Omit<WebSocketClientOptions, "allowInsecureConnection" | "protocols" | "wsOptions"> = {},
): Promise<WebSocketClient> {
  const { identifier, retryOptions, highWaterMark, abortSignal } = options;
  const reliableClientFactory = createReliableConnectionClient<Data, Data>(connectionManager, {
    isRetryable: () => true,
    resolveOnUnsuccessful: true,
  });
  const reliableClient = reliableClientFactory({ identifier, retryOptions, highWaterMark });
  await reliableClient.open({ abortSignal });
  const obj: Omit<WebSocketClient, "status"> = {
    send: async (data, opts) => reliableClient.send(data, opts),
    on(event, listener) {
      switch (event) {
        case "message":
          reliableClient.onMessage(listener as (data: Data) => void);
          break;
        case "reconnect":
          reliableClient.onOpen(listener as () => void);
          break;
        case "close":
          reliableClient.onClose(listener as () => void);
          break;
        case "error":
          reliableClient.onError(listener as (error: unknown) => void);
          break;
        default:
          throw createError(`Unknown event: ${event}`);
      }
    },
    close: async (opts) => reliableClient.close(opts),
  };
  return Object.defineProperty(obj, "status", {
    get() {
      return reliableClient.status;
    },
    enumerable: true,
  }) as WebSocketClient;
}

/**
 * Creates a WebSocket client
 * @param url - The websocket connection URL
 * @param options - Options for createWebSocketClient
 *
 * @returns a WebSocket client
 */
export function createWebSocketClient(
  url: string,
  options: WebSocketClientOptions = {},
): WebsocketClientWrapper {
  const { protocols, allowInsecureConnection, wsOptions } = options;
  const urlObj = createUrl(url, { allowInsecureConnection });
  function buildPromise(): Promise<WebSocketClient> {
    const connManager = createConnectionManager(urlObj, { protocols, wsOptions });
    return withConnectionManager(connManager.connectionManager, options);
  }
  return {
    asWs: async () => {
      const wsConnManager = createWS(urlObj, { protocols, wsOptions });
      const wsClient = await withConnectionManager(wsConnManager.connectionManager, options);
      return Object.defineProperty(wsClient, "websocket", {
        get() {
          return wsConnManager.socket;
        },
        enumerable: true,
      }) as ReturnType<WebsocketClientWrapper["asWs"]> extends Promise<infer WS> ? WS : never;
    },
    asWebSocket: async () => {
      const webSocketConnManager = createWebSocket(urlObj, { protocols, wsOptions });
      const webSocketClient = await withConnectionManager(
        webSocketConnManager.connectionManager,
        options,
      );
      return Object.defineProperty(webSocketClient, "websocket", {
        get() {
          return webSocketConnManager.socket;
        },
        enumerable: true,
      }) as ReturnType<WebsocketClientWrapper["asWebSocket"]> extends Promise<infer WS>
        ? WS
        : never;
    },
    then<TResult1 = WebSocketClient, TResult2 = never>(
      onfulfilled?:
        | ((value: WebSocketClient) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): Promise<TResult1 | TResult2> {
      return buildPromise().then(onfulfilled, onrejected);
    },
    catch<TResult2 = never>(
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): Promise<WebSocketClient | TResult2> {
      return buildPromise().catch(onrejected);
    },
    finally(onfinally?: (() => void) | undefined | null): Promise<WebSocketClient> {
      return buildPromise().finally(onfinally);
    },
    [Symbol.toStringTag]: "WebSocketClient",
  };
}
