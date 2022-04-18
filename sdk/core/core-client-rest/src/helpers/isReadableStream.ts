// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Checks if the body is a ReadableStream supported by Node
 * @internal
 */
export function isReadableStream(body: unknown): body is NodeJS.ReadableStream {
  return Boolean(body) && typeof (body as any).pipe === "function";
}
