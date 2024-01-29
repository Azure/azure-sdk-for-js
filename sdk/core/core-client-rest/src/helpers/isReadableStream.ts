// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Checks if the body is a ReadableStream supported by Node
 * @internal
 */
export function isReadableStream(
  body: unknown,
): body is NodeJS.ReadableStream | ReadableStream<Uint8Array> {
  return (
    Boolean(body) &&
    (typeof (body as any).pipe === "function" ||
      (typeof (body as any).getReader === "function" && typeof (body as any).tee === "function"))
  );
}
