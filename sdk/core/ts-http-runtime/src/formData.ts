// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FormDataMap } from "./interfaces.js";

/**
 * If the request body is a native FormData, convert it to our FormDataMap
 * representation and clear the body. Node.js's HTTP stack doesn't handle
 * FormData natively, so the pipeline must serialize it later.
 *
 * @internal
 */
export function convertBodyToFormDataMap(body: unknown): FormDataMap | undefined {
  if (typeof FormData !== "undefined" && body instanceof FormData) {
    const formDataMap: FormDataMap = {};
    for (const [key, value] of body.entries()) {
      const existing = formDataMap[key];
      if (Array.isArray(existing)) {
        existing.push(value);
      } else {
        formDataMap[key] = existing !== undefined ? [existing, value] : [value];
      }
    }
    return formDataMap;
  }
  return undefined;
}
