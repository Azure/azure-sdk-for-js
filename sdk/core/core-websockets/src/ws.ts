// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Data } from "./models/public.js";
import type { WebSocketImplOptions, WithSocket } from "./models/internal.js";
import { WebSocket } from "ws";
import { createAbortablePromise } from "@azure/core-util";
import { logger } from "./logger.js";

export function createWS(
  url: URL,
  options: WebSocketImplOptions = {},
): WithSocket<WebSocket, Data, Data> {
  logger.verbose("Using ws WebSocket");
  const { protocols, wsOptions } = options;
  const obj: WithSocket<WebSocket, Data, Data> = {
    // the socket will be initialized in the open method
    socket: undefined as any,
    connectionManager: {
      open: () => {
        obj.socket = new WebSocket(url, protocols, wsOptions);
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
      onMessage: (fn) => {
        obj.socket.onmessage = (event) => fn(event.data as Data);
      },
      onOpen: (fn) => {
        obj.socket.onopen = fn;
      },
      onClose: (fn) => {
        obj.socket.onclose = ({ code, reason }) => fn({ code: `${code}`, reason });
      },
      onError(fn) {
        obj.socket.onerror = (event) => fn(event);
      },
      canReconnect(info) {
        return info.code !== "1008";
      },
    },
  };
  return obj;
}
