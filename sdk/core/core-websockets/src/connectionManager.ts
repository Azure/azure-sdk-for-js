// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConnectionManager, Data, WebSocketImplOptions } from "./models.js";
import { createWebSocket } from "./webSocket.js";
import { createWS } from "./ws.js";

export function createConnectionManager(
  url: URL,
  options: WebSocketImplOptions = {},
): ConnectionManager<Data, Data> {
  if (typeof WebSocket !== "undefined") {
    return createWebSocket(url, options);
  } else {
    return createWS(url, options);
  }
}
