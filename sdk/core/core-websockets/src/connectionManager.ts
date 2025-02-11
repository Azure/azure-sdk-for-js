// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSocketImplOptions, WithSocket } from "./models/internal.js";
import type { Data } from "./models/public.js";
import { createWebSocket } from "./webSocket.js";
import { createWs } from "./ws.js";

export function createConnectionManager<WebSocketT>(
  url: URL,
  options: WebSocketImplOptions = {},
): WithSocket<WebSocketT, Data, Data> {
  if (typeof WebSocket === "function") {
    return createWebSocket(url, options) as WithSocket<WebSocketT, Data, Data>;
  } else {
    return createWs(url, options) as WithSocket<WebSocketT, Data, Data>;
  }
}
