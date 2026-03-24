// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VoiceLiveWebSocketLike,
  VoiceLiveWebSocketFactoryLike,
  WebSocketFactoryOptions,
} from "./websocketLike.js";
import { VoiceLiveWebSocket } from "#platform/websocket/websocket";

/**
 * Factory for creating platform-appropriate WebSocket instances
 */
export class VoiceLiveWebSocketFactory implements VoiceLiveWebSocketFactoryLike {
  create(options?: WebSocketFactoryOptions): VoiceLiveWebSocketLike {
    return new VoiceLiveWebSocket(options);
  }
}

/**
 * Default factory instance
 */
export const defaultWebSocketFactory = new VoiceLiveWebSocketFactory();
