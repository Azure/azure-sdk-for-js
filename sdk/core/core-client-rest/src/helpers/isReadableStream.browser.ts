// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Checks if the body is a ReadableStream supported by browsers
 * @internal
 */
export function isReadableStream(body: unknown): body is ReadableStream {
  return Boolean(
    body &&
      typeof (body as ReadableStream).getReader === "function" &&
      typeof (body as ReadableStream).tee === "function"
  );
}
