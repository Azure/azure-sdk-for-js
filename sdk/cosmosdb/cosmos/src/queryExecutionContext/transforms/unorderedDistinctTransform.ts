// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineTransform } from "../PipelineTransform.js";
import { hashObject } from "../../utils/hashObject.js";

/**
 * Creates a transform that deduplicates items using a global set of seen hashes.
 * Unlike ordered distinct, this handles items in any order across all pages.
 * Mirrors UnorderedDistinctEndpointComponent.fetchMore().
 * @internal
 */
export function createUnorderedDistinctTransform(): PipelineTransform {
  const hashedResults = new Set<string>();

  return async function* unorderedDistinctTransform(source) {
    for await (const page of source) {
      if (page.items.length === 0) {
        yield page;
        continue;
      }

      const buffer: unknown[] = [];
      for (const item of page.items) {
        if (item) {
          const hashedResult = await hashObject(item);
          if (!hashedResults.has(hashedResult)) {
            buffer.push(item);
            hashedResults.add(hashedResult);
          }
        }
      }

      yield {
        ...page,
        items: buffer,
        partitionKeyRangeMap: new Map(),
      };
    }
  };
}
