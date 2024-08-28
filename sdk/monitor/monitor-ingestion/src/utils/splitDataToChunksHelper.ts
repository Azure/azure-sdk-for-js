// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getBinarySize } from "./getBinarySize";

/**
 * @internal
 */
export function splitDataToChunks(logs: Record<string, unknown>[]): Record<string, unknown>[][] {
  let chunk: Record<string, unknown>[] = [];
  const chunkArray: Record<string, unknown>[][] = [];
  let size = 0;
  const maxBytes = 1000000;
  for (const element of logs) {
    const elementSize = getBinarySize(JSON.stringify(element));
    if (size + elementSize < maxBytes) {
      chunk.push(element);
      size += elementSize;
    } else {
      if (chunk.length) chunkArray.push(chunk);
      chunk = [element];
      size = elementSize;
    }
  }

  if (chunk.length) {
    chunkArray.push(chunk);
  }

  return chunkArray;
}
