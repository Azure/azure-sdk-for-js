// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { buildReconnectingSseTests } from "../reconnectingSse.js";

buildReconnectingSseTests("Browser", ({ chunks = [], error, hang, onCancel }) => {
  const encoder = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
      }
      if (error) {
        controller.error(error);
      } else if (!hang) {
        controller.close();
      }
    },
    cancel() {
      onCancel?.();
    },
  });
});
