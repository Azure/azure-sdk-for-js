// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const wsSendAsync = (socket: WebSocket, data: any, _?: AbortSignalLike): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      socket.send(data);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
