// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createConnectionManager } from "./connectionManager.js";
import type { Data, WebSocketClientOptions, WebSocketClient } from "./models.js";
import { createReliableConnectionClient } from "./reliableConnectionClient.js";
import { createError, createUrl } from "./utils.js";

/**
 * Creates a WebSocket client
 * @param url - The websocket connection URL
 * @param options - Options for createWebSocketClient
 *
 * @returns a WebSocket client
 */
export async function createWebSocketClient(
  url: string,
  options: WebSocketClientOptions = {},
): Promise<WebSocketClient> {
  const { identifier, protocols, retryOptions, allowInsecureConnection, wsOptions, highWaterMark } =
    options;
  const urlObj = createUrl(url, { allowInsecureConnection });
  const reliableClientFactory = createReliableConnectionClient<Data, Data>(
    createConnectionManager(urlObj, { protocols, wsOptions }),
    { isRetryable: () => true, resolveOnUnsuccessful: true },
  );
  const client = reliableClientFactory({ identifier, retryOptions, highWaterMark });
  await client.open();
  return {
    send: async (data, opts) => client.send(data, opts),
    on(event, listener) {
      switch (event) {
        case "message":
          client.onMessage(listener as (data: Data) => void);
          break;
        case "reconnect":
          client.onOpen(listener as () => void);
          break;
        case "close":
          client.onClose(listener as () => void);
          break;
        case "error":
          client.onError(listener as (error: unknown) => void);
          break;
        default:
          throw createError(`Unknown event: ${event}`);
      }
    },
    close: async (opts) => client.close(opts),
  };
}
