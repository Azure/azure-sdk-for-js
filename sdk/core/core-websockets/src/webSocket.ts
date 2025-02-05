// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Data } from "./models/public.js";
import type { WebSocketImplOptions, WithSocket } from "./models/internal.js";
import { logger } from "./logger.js";

export function createWebSocket(
  url: URL,
  options: WebSocketImplOptions = {},
): WithSocket<WebSocket, Data, Data> {
  logger.verbose("Using native WebSocket");
  const { protocols } = options;
  const obj: WithSocket<WebSocket, Data, Data> = {
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
      onMessage: (fn) => {
        obj.socket.onmessage = (event) => fn(event.data);
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
