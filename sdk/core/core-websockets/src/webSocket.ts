// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSocketData, WebSocketEventListeners } from "./models/public.js";
import type { WebSocketImplOptions, WithSocket } from "./models/internal.js";
import { logger } from "./logger.js";

type InternalListener = EventListener;
type PublicListener = WebSocketEventListeners<WebSocketData>[keyof WebSocketEventListeners];

export function createWebSocket(
  url: URL,
  options: Omit<WebSocketImplOptions, "wsOptions"> = {},
): WithSocket<WebSocket, WebSocketData, WebSocketData> {
  // Check if the WebSocket Web API is available in the current runtime.
  if (typeof WebSocket !== "function") {
    throw new Error("The WebSocket Web API is not available in this runtime environment");
  }
  logger.verbose("Using native WebSocket");
  const { protocols } = options;
  const listenerMap = new Map<
    keyof WebSocketEventListeners,
    Map<PublicListener, InternalListener>
  >();

  function addListener(
    socket: WebSocket,
    type: keyof WebSocketEventListeners,
    fn: PublicListener,
    wrapper: InternalListener,
  ): void {
    if (!listenerMap.has(type)) {
      listenerMap.set(type, new Map());
    }
    listenerMap.get(type)!.set(fn, wrapper);
    socket.addEventListener(type, wrapper);
    logger.info(
      `Added listener for ${type} events, total listeners for ${type} events: ${listenerMap.get(type)!.size}`,
    );
  }

  const obj: WithSocket<WebSocket, WebSocketData, WebSocketData> = {
    // the socket will be initialized in the open method
    socket: undefined as any,
    connectionManager: {
      open: () => {
        obj.socket = new WebSocket(url, protocols);
        obj.socket.binaryType = "arraybuffer";
      },
      send: async (data) => {
        obj.socket.send(data);
        return obj.socket.bufferedAmount;
      },
      close: ({ info } = {}) => {
        const { code, reason } = info || {};
        obj.socket.close(code ? +code : undefined, reason);
      },
      on: (type, fn) => {
        switch (type) {
          case "message": {
            const wrapper = (event: MessageEvent): void =>
              (fn as WebSocketEventListeners<WebSocketData>["message"])(
                event.data as WebSocketData,
              );
            addListener(obj.socket, type, fn, wrapper as InternalListener);
            break;
          }
          case "close": {
            const wrapper = ({ code, reason }: CloseEvent): void =>
              (fn as WebSocketEventListeners["close"])({
                code: `${code}`,
                reason,
              });
            addListener(obj.socket, type, fn, wrapper as InternalListener);
            break;
          }
          case "open":
          case "error": {
            addListener(obj.socket, type, fn, fn as InternalListener);
            break;
          }
        }
      },
      off: (type, fn) => {
        const typeMap = listenerMap.get(type);
        if (!typeMap) return;
        const wrapper = typeMap.get(fn);
        if (!wrapper) return;
        obj.socket.removeEventListener(type, wrapper);
        typeMap.delete(fn);
        logger.info(
          `Removed listener for ${type} events, total listeners for ${type} events: ${listenerMap.get(type)!.size}`,
        );
        if (typeMap.size === 0) {
          listenerMap.delete(type);
        }
      },
      canReconnect(info) {
        return info.code !== "1008";
      },
      destroy() {
        obj.socket.close();
        for (const [type, typeMap] of listenerMap) {
          for (const [_, wrapper] of typeMap) {
            obj.socket.removeEventListener(type, wrapper);
          }
          typeMap.clear();
          listenerMap.delete(type);
        }
        listenerMap.clear();
      },
    },
  };
  return obj;
}
