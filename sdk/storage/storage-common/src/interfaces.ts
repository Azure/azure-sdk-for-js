// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NodeReadableStream } from "@azure/core-rest-pipeline";

/**
 * A Node.js Readable stream that also has a `destroy` method.
 * In non-Node environments, this type resolves to `never`.
 */
export type NodeJSReadableStream = NodeReadableStream & {
  /**
   * Destroy the stream. Optionally emit an 'error' event, and emit a
   * 'close' event (unless emitClose is set to false). After this call,
   * internal resources will be released.
   */
  destroy(error?: Error): NodeJSReadableStream;
};
