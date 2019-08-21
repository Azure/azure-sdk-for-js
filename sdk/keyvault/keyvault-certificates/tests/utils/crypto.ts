// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isNode } from "./recorder";

export function uint8ArrayToString(ab: Uint8Array): string {
  if (isNode) {
    return Buffer.from(ab).toString("utf-8");
  } else {
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(ab);
  }
}
