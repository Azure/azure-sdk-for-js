// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

declare global {
  interface FormData {}
  interface Blob {}
  interface File {}
  interface ReadableStream<R = any> {}
  interface TransformStream<I = any, O = any>  {}
}

export * from "./dist/esm/index.d.ts";
