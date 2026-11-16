// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RestError } from "@azure/core-rest-pipeline";
import type { BlobGetLayoutOptionalParams, BlobOperations } from "../../src/generated/index.js";

/** A blob context whose getLayout replays the given pages, throwing any RestError in sequence. */
export function layoutContext(pages: unknown[]): {
  context: BlobOperations;
  calls: BlobGetLayoutOptionalParams[];
} {
  const calls: BlobGetLayoutOptionalParams[] = [];
  const queue = [...pages];
  const context = {
    getLayout: async (options: BlobGetLayoutOptionalParams = {}) => {
      calls.push(options);
      const page = queue.shift();
      if (page instanceof RestError) {
        throw page;
      }
      return page;
    },
  } as unknown as BlobOperations;
  return { context, calls };
}
