// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type * as Undici from "undici";
import type { WebSocketData } from "../../models/public.js";
import type { WebSocketImplOptions, WithSocket } from "../../models/internal.js";
import type { WebSocketClientUndiciOptions } from "./models.js";


export function create(
  _url: string,
  _options: WebSocketImplOptions & WebSocketClientUndiciOptions = {},
): WithSocket<Undici.WebSocket, WebSocketData, WebSocketData> {
  throw new Error("Undici WebSocket is not available in this runtime environment");
}
