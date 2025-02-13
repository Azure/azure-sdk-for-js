// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSocketData, WebSocketEventListeners } from "./models/public.js";
import type { WebSocketImplOptions, WithSocket } from "./models/internal.js";
import type { WebSocketClientAsWsOptions } from "./runtimes/ws/models.js";
import * as WS from "ws";
import { createAbortablePromise } from "@azure/core-util";
import { logger } from "./logger.js";

type InternalListner = (event: any) => void;
type PublicListener = WebSocketEventListeners<WebSocketData>[keyof WebSocketEventListeners];

export function createWs(
  url: string,
  options: WebSocketImplOptions & WebSocketClientAsWsOptions = {},
): WithSocket<WS.WebSocket, WebSocketData, WebSocketData> {
  // Check if the 'ws' module is available in the current runtime.
  if (!WS || typeof WS.WebSocket !== "function") {
    throw new Error("The 'ws' module is not available in this runtime environment");
  }
  logger.verbose("Using ws WebSocket");
  const { protocols, wsOptions } = options;
  const listenerMap = new Map<keyof WebSocketEventMap, Map<PublicListener, InternalListner>>();

  function addListener(
    socket: WS.WebSocket,
    type: keyof WebSocketEventMap,
    fn: PublicListener,
    wrapper: InternalListner,
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

  const obj: WithSocket<WS.WebSocket, WebSocketData, WebSocketData> = {
    // the socket will be initialized in the open method
    socket: undefined as any,
    connectionManager: {
      open: () => {
        obj.socket = new WS.WebSocket(url, protocols, wsOptions);
        obj.socket.binaryType = "arraybuffer";
      },
      send: (data, sendOptions = {}) => {
        const { abortSignal } = sendOptions;
        return createAbortablePromise(
          (resolve, reject) => {
            obj.socket.send(data, (error?: Error) => {
              if (error) {
                reject(error);
              } else {
                resolve(obj.socket.bufferedAmount);
              }
            });
          },
          { abortSignal },
        );
      },
      close: ({ info } = {}) => {
        const { code, reason } = info || {};
        obj.socket.close(code ? +code : undefined, reason);
      },
      on: (type, fn) => {
        switch (type) {
          case "message": {
            const wrapper = (event: WS.MessageEvent): void =>
              (fn as WebSocketEventListeners<WebSocketData>["message"])(
                event.data as WebSocketData,
              );
            addListener(obj.socket, type, fn, wrapper);
            break;
          }
          case "close": {
            const wrapper = ({ code, reason }: WS.CloseEvent): void =>
              (fn as WebSocketEventListeners["close"])({ code: `${code}`, reason });
            addListener(obj.socket, type, fn, wrapper);
            break;
          }
          case "open":
          case "error": {
            obj.socket.addEventListener(type, fn as InternalListner);
            break;
          }
        }
      },
      off: (type, fn) => {
        if (["open", "error"].includes(type)) {
          obj.socket.removeEventListener(type, fn as InternalListner);
          return;
        }
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
        obj.socket.terminate();
        obj.socket.removeAllListeners();
        for (const [type, typeMap] of listenerMap) {
          typeMap.clear();
          listenerMap.delete(type);
        }
        listenerMap.clear();
      },
    },
  };
  return obj;
}
