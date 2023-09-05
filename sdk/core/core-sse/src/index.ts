// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

declare global {
  interface ReadableStream<R = any> {}
}

export { EventMessage, iterateSseStream as toSSE } from "./sse.js";
