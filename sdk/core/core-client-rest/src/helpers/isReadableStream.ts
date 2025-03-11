// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NodeJSReadableStream } from "@azure/core-rest-pipeline";

/**
 * Checks if the body is a ReadableStream supported by Node
 * @internal
 */
export function isReadableStream(body: unknown): body is NodeJSReadableStream {
  return Boolean(body) && typeof (body as any).pipe === "function";
}
