// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createConnectionManager } from "./connectionManager.js";
import { WEBSOCKET_CLIENT_TAG } from "./constants.js";
import type { ReliableConnectionClient, WithSocket } from "./models/internal.js";
import type {
  WebSocketData,
  WebSocketClient,
  WebSocketClientOptions,
  WebsocketClientWrapper,
} from "./models/public.js";
import { createReliableConnectionClient } from "./reliableConnectionClient.js";
import { createUrl } from "./utils.js";
import { createWebSocket } from "./webSocket.js";
import { createWs } from "./ws.js";

async function withConnectionManager<WebSocketT>(
  connectionManager: WithSocket<WebSocketT, WebSocketData, WebSocketData>,
  options: Omit<WebSocketClientOptions, "allowInsecureConnection" | "protocols" | "wsOptions"> = {},
): Promise<WebSocketClient<WebSocketT>> {
  const { identifier, retryOptions, highWaterMark, abortSignal, on } = options;
  const reliableClientFactory = createReliableConnectionClient<WebSocketData, WebSocketData>(
    connectionManager.connectionManager,
    {
      // Always retry on any error.
      isRetryable: () => true,
    },
  );
  const reliableClient = reliableClientFactory({ identifier, retryOptions, highWaterMark, on });
  await reliableClient.open({ abortSignal });

  const obj: Omit<WebSocketClient<WebSocketT>, "status" | "websocket" | "identifier"> = {
    send: async (data, opts) => reliableClient.send(data, opts),
    on(event, listener) {
      reliableClient.on(
        event as Parameters<ReliableConnectionClient<WebSocketData, WebSocketData>["on"]>[0],
        listener as Parameters<ReliableConnectionClient<WebSocketData, WebSocketData>["on"]>[1],
      );
    },
    off(event, listener) {
      reliableClient.off(
        event as Parameters<ReliableConnectionClient<WebSocketData, WebSocketData>["off"]>[0],
        listener as Parameters<ReliableConnectionClient<WebSocketData, WebSocketData>["off"]>[1],
      );
    },
    close: async (opts) => {
      await reliableClient.close(opts);
      reliableClient.destroy();
    },
  };

  return Object.defineProperties(obj, {
    status: {
      get() {
        return reliableClient.status;
      },
      enumerable: true,
    },
    websocket: {
      get() {
        return connectionManager.socket;
      },
      enumerable: true,
    },
    identifier: {
      get() {
        return reliableClient.identifier;
      },
      enumerable: true,
    },
  }) as WebSocketClient<WebSocketT>;
}

/**
 * Create a wrapper that builds a promise-based client on demand.
 */
function buildClientWrapper<WebSocketT>(
  urlObj: URL,
  protocols: string | string[] | undefined,
  wsOptions: WebSocketClientOptions["wsOptions"],
  restOptions: Omit<WebSocketClientOptions, "allowInsecureConnection" | "protocols" | "wsOptions">,
  fullOptions: WebSocketClientOptions,
): WebsocketClientWrapper<WebSocketT> {
  function buildPromise(): Promise<WebSocketClient<WebSocketT>> {
    return withConnectionManager<WebSocketT>(
      createConnectionManager<WebSocketT>(urlObj, { protocols, wsOptions }),
      fullOptions,
    );
  }

  return {
    asWs: () => {
      try {
        return withConnectionManager(
          createWs(urlObj, { protocols, wsOptions }),
          restOptions,
        ) as ReturnType<WebsocketClientWrapper<unknown>["asWs"]>;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    asWebSocket: () => {
      try {
        return withConnectionManager(
          createWebSocket(urlObj, { protocols }),
          restOptions,
        ) as ReturnType<WebsocketClientWrapper<unknown>["asWebSocket"]>;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    then: (onfulfilled, onrejected) => buildPromise().then(onfulfilled, onrejected),
    catch: (onrejected) => buildPromise().catch(onrejected),
    finally: (onfinally) => buildPromise().finally(onfinally),
    [Symbol.toStringTag]: WEBSOCKET_CLIENT_TAG,
  };
}

/**
 * Creates a WebSocket client
 * @param url - The WebSocket connection URL
 * @param options - Options for createWebSocketClient
 *
 * @returns a WebSocket client
 */
export function createWebSocketClient<WebSocketT>(
  url: string,
  options: WebSocketClientOptions = {},
): WebsocketClientWrapper<WebSocketT> {
  const { protocols, allowInsecureConnection, wsOptions, ...restOptions } = options;
  try {
    const urlObj = createUrl(url, { allowInsecureConnection });
    return buildClientWrapper<WebSocketT>(urlObj, protocols, wsOptions, restOptions, options);
  } catch (err) {
    const rejectOnDemand = (): Promise<never> => Promise.reject(err);
    return {
      asWs: rejectOnDemand,
      asWebSocket: rejectOnDemand,
      then: (onfulfilled, onrejected) => rejectOnDemand().then(onfulfilled, onrejected),
      catch: (onrejected) => rejectOnDemand().catch(onrejected),
      finally: (onfinally) => rejectOnDemand().finally(onfinally),
      [Symbol.toStringTag]: WEBSOCKET_CLIENT_TAG,
    } as WebsocketClientWrapper<WebSocketT>;
  }
}
