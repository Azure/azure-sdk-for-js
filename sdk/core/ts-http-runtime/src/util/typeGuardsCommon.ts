// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function isWebReadableStream(x: unknown): x is ReadableStream {
  return Boolean(
    x &&
      typeof (x as ReadableStream).getReader === "function" &&
      typeof (x as ReadableStream).tee === "function",
  );
}

export function isBlob(x: unknown): x is Blob {
  return typeof (x as Blob).stream === "function";
}
