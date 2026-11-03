// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ResiliencyReviewsListOptionalParams extends OperationOptions {
  /** The number of items to be included in the result. */
  top?: number;
  /** The number of items to skip before starting to collect the result set. */
  skip?: number;
  /** The filter to apply.<br>Filter can be applied to properties ['reviewStatus', 'reviewId'] with operators ['eq', 'and', 'or'].<br>Example:<br>- $filter=reviewStatus eq 'New' */
  filter?: string;
}

/** Optional parameters. */
export interface ResiliencyReviewsGetOptionalParams extends OperationOptions {}
