// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type * as WS from "ws";
import type { ClientRequestArgs } from "node:http";
import type { ConnectionManager } from "./public.js";

/**
 * The options to create a WebSocket implementation.
 */
export interface WebSocketImplOptions {
  /**
   * The WebSocket protocol version(s) to use.
   * This can be a single protocol string or an array of protocol strings.
   */
  protocols?: string | string[];

  /**
   * NODEJS ONLY and WS ONLY
   *
   * The options to create the WS client.
   */
  wsOptions?: WS.ClientOptions | ClientRequestArgs;
}

export interface WithSocket<SocketT, SendT, ReceiveT> {
  connectionManager: ConnectionManager<SendT, ReceiveT>;
  socket: SocketT;
}
