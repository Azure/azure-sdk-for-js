// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Checks if the body is a ReadableStream supported by browsers
 * @internal
 */
export function isReadableStream(body: unknown): body is ReadableStream | NodeJS.ReadableStream {
  return body instanceof ReadableStream;
}
