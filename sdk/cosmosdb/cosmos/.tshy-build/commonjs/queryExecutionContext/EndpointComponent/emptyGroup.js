"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAggregateResult = exports.emptyGroup = void 0;
// All aggregates are effectively a group by operation
// The empty group is used for aggregates without a GROUP BY clause
exports.emptyGroup = "__empty__";
// Newer API versions rewrite the query to return `item2`. It fixes some legacy issues with the original `item` result
// Aggregator code should use item2 when available
const extractAggregateResult = (payload) => Object.keys(payload).length > 0 ? (payload.item2 ? payload.item2 : payload.item) : null;
exports.extractAggregateResult = extractAggregateResult;
//# sourceMappingURL=emptyGroup.js.map