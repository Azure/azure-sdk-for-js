// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProductTemplatesListOptionalParams extends OperationOptions {
  /** Filters the results, based on a Boolean condition. Optional. */
  filter?: string;
  /** Sorts the results. Optional. */
  orderby?: string;
  /** Searches for a substring in the response. Optional. */
  search?: string;
  /** Instructs the server to return only object count without actual body. Optional. */
  count?: boolean;
  /** Returns only the first n results. Optional. */
  top?: number;
  /** Used to skip n elements in the OData query (offset). Returns a nextLink to the next page of results if there are any left. */
  skip?: number;
  /** Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls. Optional. */
  skipToken?: string;
}
