// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import WebSocket from "ws";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const wsSendAsync = (socket: WebSocket, data: any, _?: AbortSignalLike): Promise<void> => {
  return new Promise((resolve, reject) => {
    socket.send(data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
