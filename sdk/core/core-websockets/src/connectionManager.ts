// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSocketImplOptions, WithSocket } from "./models/internal.js";
import type { Data } from "./models/public.js";
import { createWebSocket } from "./webSocket.js";
import { createWS } from "./ws.js";

export function createConnectionManager(
  url: URL,
  options: WebSocketImplOptions = {},
): WithSocket<unknown, Data, Data> {
  if (typeof WebSocket === "function") {
    return createWebSocket(url, options);
  } else {
    return createWS(url, options);
  }
}
