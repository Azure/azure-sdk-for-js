// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NodeReadableStream } from "@azure/core-rest-pipeline";

/**
 * A Node.js Readable stream that also has a `destroy` method.
 * In browser environments, this type is `never` since Node streams are not available.
 */
export type NodeJSReadableStream = NodeReadableStream extends never
  ? never
  : NodeReadableStream & {
      /**
       * Destroy the stream. Optionally emit an 'error' event, and emit a
       * 'close' event (unless emitClose is set to false). After this call,
       * internal resources will be released.
       */
      destroy(error?: Error): NodeJSReadableStream;
    };
