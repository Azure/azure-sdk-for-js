// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BaseContinuationTokenManager } from "./BaseContinuationTokenManager.js";
import { ParallelQueryContinuationTokenManager } from "./ParallelQueryContinuationTokenManager.js";
import { OrderByQueryContinuationTokenManager } from "./OrderByQueryContinuationTokenManager.js";
import type { BaseContinuationToken } from "../../documents/ContinuationToken/CompositeQueryContinuationToken.js";

/**
 * Factory for creating appropriate continuation token managers based on query type.
 * @internal
 */
export const ContinuationTokenManagerFactory = {
  /**
   * Creates the appropriate continuation token manager based on query type.
   * Only call this for queries that support continuation tokens.
   * @param collectionLink - Collection link/RID
   * @param initialContinuationToken - Optional initial continuation token
   * @param isOrderByQuery - Whether this is an ORDER BY query
   * @returns Appropriate continuation token manager instance
   * @internal
   */
  create(
    collectionLink: string,
    initialContinuationToken?: string,
    isOrderByQuery: boolean = false,
    parsedContinuationToken?: BaseContinuationToken,
  ): BaseContinuationTokenManager {
    if (isOrderByQuery) {
      return new OrderByQueryContinuationTokenManager(
        collectionLink,
        initialContinuationToken,
        parsedContinuationToken,
      );
    } else {
      return new ParallelQueryContinuationTokenManager(
        collectionLink,
        parsedContinuationToken ?? initialContinuationToken,
      );
    }
  },
};
