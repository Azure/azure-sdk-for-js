// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type * as Undici from "undici";
import type { WebSocketClientUndiciOptions } from "./models.js";

type WebSocket = Undici.WebSocket;

declare module "../../models/public.js" {
  interface WebsocketClientAdapter<WebSocketT> extends Promise<WebSocketClient<WebSocketT>> {
    /**
     * Returns the WebSocket client as an undici WebSocket client.
     * @returns The Undici WebSocket client.
     */
    undici: (options?: WebSocketClientUndiciOptions) => Promise<WebSocketClient<WebSocket>>;
  }
}

export { WebSocketClientUndiciOptions, WebSocket };
