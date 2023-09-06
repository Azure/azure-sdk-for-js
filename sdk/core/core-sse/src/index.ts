// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

declare global {
  interface ReadableStream<R = any> {}
}

export { EventMessage, iterateSseStream } from "./sse.js";
