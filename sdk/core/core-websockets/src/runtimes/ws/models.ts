// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientRequestArgs } from "node:http";
import type * as WS from "ws";

/**
 * The options to create the WS client.
 */
export interface WebSocketClientAsWsOptions {
  /**
   * The options to create the WS websocket.
   */
  wsOptions?: WS.ClientOptions | ClientRequestArgs;
}
