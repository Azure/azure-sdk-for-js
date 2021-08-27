// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "./common";
import { RawHttpHeaders as CoreRawHeaders } from "@azure/core-rest-pipeline";

/**
 * Converts a REST client headers to core-rest-pipeline compatible headers
 * REST clients allow headers to be number, boolean or strings, this function
 * stringifies these headers
 * @returns all headers values converted to strings
 * @internal
 */
export function toCoreRawHeaders(headers: RawHttpHeaders = {}): CoreRawHeaders {
  const coreHeaders: CoreRawHeaders = {};
  for (const [name, value] of Object.entries(headers)) {
    coreHeaders[name] = String(value);
  }
  return coreHeaders;
}
