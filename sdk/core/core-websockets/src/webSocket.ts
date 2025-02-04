// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConnectionManager, Data, WebSocketImplOptions } from "./models.js";

export function createWebSocket(
  url: URL,
  options: WebSocketImplOptions = {},
): ConnectionManager<Data, Data> {
  const { protocols } = options;
  let ws: WebSocket | undefined;
  const connManager: ConnectionManager<Data, Data> = {
    open: () => {
      ws = new WebSocket(url, protocols);
      ws.binaryType = "arraybuffer";
    },
    send: async (data) => {
      ws!.send(data);
      return ws!.bufferedAmount;
    },
    close: ({ info } = {}) => {
      const { code, reason } = info || {};
      ws!.close(code ? +code : undefined, reason);
    },
    onMessage: (fn) => {
      ws!.onmessage = (event) => fn(event.data);
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
