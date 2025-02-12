// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type * as WS from "ws";
import type { WebSocketClientAsWsOptions } from "./models.js";

declare module "../../models/public.js" {
  interface WebsocketClientAdapter<WebSocketT> extends Promise<WebSocketClient<WebSocketT>> {
    /**
     * Returns the WebSocket client as a ws WebSocket client.
     * @returns The ws WebSocket client.
     */
    asWs: (options?: WebSocketClientAsWsOptions) => Promise<WebSocketClient<WS.WebSocket>>;
  }
}

export { WebSocketClientAsWsOptions };
