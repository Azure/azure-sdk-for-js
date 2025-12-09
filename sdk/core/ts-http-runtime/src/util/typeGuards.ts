// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function isNodeReadableStream(x: unknown): x is NodeJS.ReadableStream {
  return Boolean(x && typeof (x as NodeJS.ReadableStream)["pipe"] === "function");
}

export function isWebReadableStream(x: unknown): x is ReadableStream {
  return Boolean(
    x &&
    typeof (x as ReadableStream).getReader === "function" &&
    typeof (x as ReadableStream).tee === "function",
  );
}

export function isBinaryBody(
  body: unknown,
): body is
  | Uint8Array
  | NodeJS.ReadableStream
  | ReadableStream<Uint8Array>
  | (() => NodeJS.ReadableStream)
  | (() => ReadableStream<Uint8Array>)
  | Blob {
  return (
    body !== undefined &&
    (body instanceof Uint8Array ||
      isReadableStream(body) ||
      typeof body === "function" ||
      body instanceof Blob)
  );
}

export function isReadableStream(x: unknown): x is ReadableStream | NodeJS.ReadableStream {
  return isNodeReadableStream(x) || isWebReadableStream(x);
}

export function isBlob(x: unknown): x is Blob {
  return typeof (x as Blob).stream === "function";
}
