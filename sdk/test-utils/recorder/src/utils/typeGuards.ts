// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpHeadersLike } from "@azure/core-http";

/**
 * Returns true if the given object is a HttpHeadersLike object.
 * @param headers - The object to test.
 * @internal
 * @hidden
 */
export function isHttpHeadersLike(headers: any): headers is HttpHeadersLike {
  return (
    headers &&
    typeof headers.get === "function" &&
    typeof headers.set === "function" &&
    typeof headers.remove === "function" &&
    typeof headers.clone === "function" &&
    typeof headers.toString === "function"
  );
}
