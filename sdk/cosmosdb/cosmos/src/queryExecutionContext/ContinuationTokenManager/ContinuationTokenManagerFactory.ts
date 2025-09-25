// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BaseContinuationTokenManager } from "./BaseContinuationTokenManager.js";
import { ParallelQueryContinuationTokenManager } from "./ParallelQueryContinuationTokenManager.js";
import { OrderByQueryContinuationTokenManager } from "./OrderByQueryContinuationTokenManager.js";

/**
 * Factory for creating appropriate continuation token managers based on query type.
 * @internal
 */
export const ContinuationTokenManagerFactory = {
  /**
   * Creates the appropriate continuation token manager based on query type.
   * @param collectionLink - Collection link/RID
   * @param initialContinuationToken - Optional initial continuation token
   * @param isOrderByQuery - Whether this is an ORDER BY query
   * @param isUnsupportedQueryType - Whether this query type doesn't support continuation tokens
   * @returns Appropriate continuation token manager instance
   * @internal
   */
  create(
    collectionLink: string,
    initialContinuationToken?: string,
    isOrderByQuery: boolean = false,
    isUnsupportedQueryType: boolean = false,
  ): BaseContinuationTokenManager {
    
    if (isOrderByQuery) {
      return new OrderByQueryContinuationTokenManager(collectionLink, initialContinuationToken, isUnsupportedQueryType);
    } else {
      return new ParallelQueryContinuationTokenManager(collectionLink, initialContinuationToken, isUnsupportedQueryType);
    }
  },
};
