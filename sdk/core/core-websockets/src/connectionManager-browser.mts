// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSocketImplOptions, WithSocket } from "./models/internal.js";
import type { WebSocketData } from "./models/public.js";
import { create as createWeb } from "./runtimes/web/impl.js";

export function createConnectionManager(
  url: string,
  options: WebSocketImplOptions = {},
): WithSocket<WebSocket, WebSocketData, WebSocketData> {
  return createWeb(url, options);
}
