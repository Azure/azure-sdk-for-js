// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "node:stream";
import type { NodeJSReadableStream } from "../../../src/index.js";
import { buildReconnectingSseTests } from "../reconnectingSse.js";

buildReconnectingSseTests("Node", ({ chunks = [], error, hang, onCancel, onEnqueueChunk }) => {
  let started = false;
  const stream = new Readable({
    read() {
      if (started) {
        return;
      }
      started = true;
      onEnqueueChunk?.((chunk) => this.push(chunk));
      for (const chunk of chunks) {
        this.push(chunk);
      }
      if (error) {
        this.destroy(error);
      } else if (!hang) {
        this.push(null);
      }
    },
  });
  stream.setEncoding("utf8");
  stream.once("close", onCancel ?? (() => {}));
  return stream as NodeJSReadableStream;
});
