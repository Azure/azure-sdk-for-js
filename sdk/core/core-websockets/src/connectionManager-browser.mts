// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConnectionManager, Data, WebSocketImplOptions } from "./models.js";
import { createError } from "./utils.js";
import { createWebSocket } from "./webSocket.js";

export function createConnectionManager(
  url: URL,
  options: WebSocketImplOptions = {},
): ConnectionManager<Data, Data> {
  if (options.wsOptions !== undefined) {
    throw createError("Unexpected ws options in the browser");
  }
  return createWebSocket(url, options);
}
