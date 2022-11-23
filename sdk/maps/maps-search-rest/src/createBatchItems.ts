// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BatchRequestItem,
  SearchFuzzySearchQueryParamProperties,
  SearchReverseSearchAddressQueryParamProperties,
  SearchSearchAddressQueryParamProperties,
} from "./generated";

/**
 * Create batch items for the batch request.
 *
 * @param requests - The list of queries to process. Including {@link SearchFuzzySearchQueryParamProperties}, {@link SearchSearchAddressQueryParamProperties}, and {@link SearchReverseSearchAddressQueryParamProperties}
 * @returns - The BatchRequestItem object.
 */
export function createBatchItems(
  requests: Array<
    | SearchFuzzySearchQueryParamProperties
    | SearchSearchAddressQueryParamProperties
    | SearchReverseSearchAddressQueryParamProperties
  >
): Array<BatchRequestItem> {
  return requests.map((r) => ({
    query: Object.entries(r)
      .map(([k, v]) => `${k}=${v}`)
      .join("&"),
  }));
}
