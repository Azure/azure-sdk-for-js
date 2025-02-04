// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConnectionManager, Data, WebSocketImplOptions } from "./models.js";
import { WebSocket } from "ws";
import { createAbortablePromise } from "@azure/core-util";

export function createWS(
  url: URL,
  options: WebSocketImplOptions = {},
): ConnectionManager<Data, Data> {
  const { protocols, wsOptions } = options;
  let ws: WebSocket | undefined;
  const connManager: ConnectionManager<Data, Data> = {
    open: () => {
      ws = new WebSocket(url, protocols, wsOptions);
      ws.binaryType = "arraybuffer";
    },
    send: (data, sendOptions = {}) => {
      const { abortSignal } = sendOptions;
      return createAbortablePromise(
        (resolve, reject) => {
          ws!.send(data, (error?: Error) => {
            if (error) {
              reject(error);
            } else {
              resolve(ws!.bufferedAmount);
            }
          });
        },
        { abortSignal },
      );
    },
    close: ({ info } = {}) => {
      const { code, reason } = info || {};
      ws!.close(code ? +code : undefined, reason);
    },
    onMessage: (fn) => {
      ws!.onmessage = (event) => fn(event.data as Data);
    },
    onOpen: (fn) => {
      ws!.onopen = fn;
    },
    onClose: (fn) => {
      ws!.onclose = ({ code, reason }) => fn({ code: `${code}`, reason });
    },
    onError(fn) {
      ws!.onerror = (event) => fn(event);
    },
    canReconnect(info) {
      return info.code !== "1008";
    },
  };
  return connManager;
}
