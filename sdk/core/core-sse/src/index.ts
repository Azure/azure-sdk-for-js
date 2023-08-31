// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

declare global {
  interface ReadableStream<R = any> {}
}

export { EventMessage, toSSE } from "./sse.js";
