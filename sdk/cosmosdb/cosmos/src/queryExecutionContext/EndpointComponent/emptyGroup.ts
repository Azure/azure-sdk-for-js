// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// All aggregates are effectively a group by operation
// The empty group is used for aggregates without a GROUP BY clause
export const emptyGroup = "__empty__";

// Newer API versions rewrite the query to return `item2`. It fixes some legacy issues with the original `item` result
// Aggregator code should use item2 when available
export const extractAggregateResult = (payload: any) =>
  payload.item2 ? payload.item2 : payload.item;
