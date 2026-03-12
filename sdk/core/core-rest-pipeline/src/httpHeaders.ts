// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpHeaders, RawHttpHeadersInput } from "./interfaces.js";

import { createHttpHeaders as tspCreateHttpHeaders } from "@typespec/ts-http-runtime";

/**
 * Creates an object that satisfies the `HttpHeaders` interface.
 * @param rawHeaders - A simple object representing initial headers
 */
export function createHttpHeaders(rawHeaders?: RawHttpHeadersInput): HttpHeaders {
  return tspCreateHttpHeaders(rawHeaders);
}
