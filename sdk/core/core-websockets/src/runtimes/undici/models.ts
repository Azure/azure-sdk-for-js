// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type * as Undici from "undici";

/**
 * The options to create the WS client.
 */
export interface WebSocketClientUndiciOptions {
  /**
   * The Undici request dispatcher.
   */
  undiciOptions?: Undici.WebSocketInit;
}
