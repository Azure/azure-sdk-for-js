// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BatchResult, ReverseSearchAddressResult, SearchAddressResult } from "./results";
import { OperationState, SimplePollerLike } from "@azure/core-lro";

/** The poller type for the fuzzy search batch */
export type FuzzySearchBatchPoller = SimplePollerLike<
  OperationState<BatchResult<SearchAddressResult>>,
  BatchResult<SearchAddressResult>
>;

/** The poller type for the search address batch */
export type SearchAddressBatchPoller = FuzzySearchBatchPoller;

/** The poller type for the reverse search address batch */
export type ReverseSearchAddressBatchPoller = SimplePollerLike<
  OperationState<BatchResult<ReverseSearchAddressResult>>,
  BatchResult<ReverseSearchAddressResult>
>;
