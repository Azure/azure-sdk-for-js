// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VoiceLiveWebSocketLike,
  VoiceLiveWebSocketFactoryLike,
  WebSocketFactoryOptions,
} from "./websocketLike.js";

/**
 * Factory for creating platform-appropriate WebSocket instances
 */
export class VoiceLiveWebSocketFactory implements VoiceLiveWebSocketFactoryLike {
  create(options?: WebSocketFactoryOptions): VoiceLiveWebSocketLike {
    const platform = this._detectPlatform();

    switch (platform) {
      case "browser":
        return this._createBrowserWebSocket(options);

      case "node":
        return this._createNodeWebSocket(options);

      default:
        throw new Error(`Unsupported environment for WebSocket: ${platform}`);
    }
  }

  private _createBrowserWebSocket(options?: WebSocketFactoryOptions): VoiceLiveWebSocketLike {
    // Use dynamic require to avoid bundling Node.js specific code in browser builds
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { VoiceLiveWebSocketBrowser } = require("./websocketBrowser.js");
    return new VoiceLiveWebSocketBrowser(options);
  }

  private _createNodeWebSocket(options?: WebSocketFactoryOptions): VoiceLiveWebSocketLike {
    // Use dynamic require to avoid bundling browser specific code in Node.js builds
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { VoiceLiveWebSocketNode } = require("./websocketNode.js");
    return new VoiceLiveWebSocketNode(options);
  }

  private _detectPlatform(): "browser" | "node" | "unknown" {
    // Check for browser environment
    if (typeof self !== "undefined" && typeof (self as any).WebSocket !== "undefined") {
      return "browser";
    }

    // Check for Node.js environment
    if (
      typeof process !== "undefined" &&
      process.versions != null &&
      process.versions.node != null
    ) {
      return "node";
    }

    // Check for global object (Node.js) vs window (browser)
    if (typeof global !== "undefined" && typeof require !== "undefined") {
      return "node";
    }

    return "unknown";
  }
}

/**
 * Platform detection utility
 */
export function detectPlatform(): "browser" | "node" | "unknown" {
  const factory = new VoiceLiveWebSocketFactory();
  return (factory as any)._detectPlatform();
}

/**
 * Check if platform supports WebSocket
 */
export function isWebSocketSupported(): boolean {
  const platform = detectPlatform();

  switch (platform) {
    case "browser":
      return typeof WebSocket !== "undefined";

    case "node":
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("ws");
        return true;
      } catch {
        return false;
      }

    default:
      return false;
  }
}

/**
 * Default factory instance
 */
export const defaultWebSocketFactory = new VoiceLiveWebSocketFactory();
