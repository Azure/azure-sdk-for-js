// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSocketImplOptions, WithSocket } from "./models/internal.js";
import type { WebSocketData } from "./models/public.js";
import { createError } from "./utils.js";
import { createWebSocket } from "./webSocket.js";

export function createConnectionManager(
  url: URL,
  options: WebSocketImplOptions = {},
): WithSocket<WebSocket, WebSocketData, WebSocketData> {
  if (options.wsOptions !== undefined) {
    throw createError("Unexpected ws options in the browser");
  }
  return createWebSocket(url, options);
}
