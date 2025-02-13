// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSocketImplOptions, WithSocket } from "./models/internal.js";
import type { WebSocketData } from "./models/public.js";
import { createWebSocket } from "./webSocket.js";
import { createWs } from "./ws.js";

export function createConnectionManager<WebSocketT>(
  url: string,
  options: WebSocketImplOptions = {},
): WithSocket<WebSocketT, WebSocketData, WebSocketData> {
  if (typeof WebSocket === "function") {
    return createWebSocket(url, options) as WithSocket<WebSocketT, WebSocketData, WebSocketData>;
  } else {
    return createWs(url, options) as WithSocket<WebSocketT, WebSocketData, WebSocketData>;
  }
}
