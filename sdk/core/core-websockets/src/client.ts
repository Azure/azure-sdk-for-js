// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ReliableConnectionClient, WithSocket } from "./models/internal.js";
import type {
  WebSocketData,
  WebSocketClient,
  WebSocketClientOptions,
  WebsocketClientAdapter,
} from "./models/public.js";
import type * as Undici from "./runtimes/undici/index.js";
import { create as createWebSocket } from "./runtimes/web/impl.js";
import { create as createUndici } from "./runtimes/undici/impl.js";
import { createConnectionManager } from "./connectionManager.js";
import { createReliableConnectionClient } from "./reliableConnectionClient.js";
import { createUrl } from "./utils.js";
import { WEBSOCKET_CLIENT_TAG } from "./constants.js";

async function withConnectionManager<WebSocketT>(
  connectionManager: WithSocket<WebSocketT, WebSocketData, WebSocketData>,
  options: Omit<WebSocketClientOptions, "allowInsecureConnection" | "protocols"> = {},
): Promise<WebSocketClient<WebSocketT>> {
  const { identifier, retryOptions, highWaterMark, abortSignal, on, reconnectOnClosure } = options;
  const reliableClientFactory = createReliableConnectionClient<WebSocketData, WebSocketData>(
    connectionManager.connectionManager,
    {
      // Always retry on any error.
      isRetryable: () => true,
    },
  );
  const reliableClient = reliableClientFactory({
    identifier,
    retryOptions,
    highWaterMark,
    on,
    reconnectOnClosure,
  });
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
function buildClient<WebSocketT>(
  urlObj: string,
  protocols: string | string[] | undefined,
  restOptions: Omit<WebSocketClientOptions, "allowInsecureConnection" | "protocols">,
): WebsocketClientAdapter<WebSocketT> {
  function buildPromise(): Promise<WebSocketClient<WebSocketT>> {
    return withConnectionManager<WebSocketT>(
      createConnectionManager<WebSocketT>(urlObj, { protocols }),
      restOptions,
    );
  }

  return {
    undici: (options: Undici.WebSocketClientUndiciOptions = {}) => {
      const { undiciOptions: undiciOptions } = options;
      try {
        return withConnectionManager(
          createUndici(urlObj, { protocols, undiciOptions: undiciOptions }),
          restOptions,
        ) as ReturnType<WebsocketClientAdapter<unknown>["undici"]>;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    web: () => {
      try {
        return withConnectionManager(
          createWebSocket(urlObj, { protocols }),
          restOptions,
        ) as ReturnType<WebsocketClientAdapter<unknown>["web"]>;
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
): WebsocketClientAdapter<WebSocketT> {
  const { protocols, allowInsecureConnection, ...restOptions } = options;
  try {
    const urlObj = createUrl(url, { allowInsecureConnection });
    return buildClient<WebSocketT>(urlObj, protocols, restOptions);
  } catch (err) {
    const rejectOnDemand = (): Promise<never> => Promise.reject(err);
    return {
      web: rejectOnDemand,
      undici: rejectOnDemand,
      then: (onfulfilled, onrejected) => rejectOnDemand().then(onfulfilled, onrejected),
      catch: (onrejected) => rejectOnDemand().catch(onrejected),
      finally: (onfinally) => rejectOnDemand().finally(onfinally),
      [Symbol.toStringTag]: WEBSOCKET_CLIENT_TAG,
    } as WebsocketClientAdapter<WebSocketT>;
  }
}
