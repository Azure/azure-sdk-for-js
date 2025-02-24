// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSocketImplOptions, WithSocket } from "./models/internal.js";
import type { WebSocketData } from "./models/public.js";
import { create as createWeb } from "./runtimes/web/impl.js";
import { create as createUndici } from "./runtimes/undici/impl.js";

export function createConnectionManager<WebSocketT>(
  url: string,
  options: WebSocketImplOptions = {},
): WithSocket<WebSocketT, WebSocketData, WebSocketData> {
  if (typeof WebSocket === "function") {
    return createWeb(url, options) as WithSocket<WebSocketT, WebSocketData, WebSocketData>;
  } else {
    return createUndici(url, options) as WithSocket<WebSocketT, WebSocketData, WebSocketData>;
  }
}
