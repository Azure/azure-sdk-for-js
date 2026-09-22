// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MetadataListOptionalParams extends OperationOptions {
  /** Filters the results, based on a Boolean condition. Optional. */
  filter?: string;
  /** Sorts the results. Optional. */
  orderby?: string;
  /** Returns only the first n results. Optional. */
  top?: number;
  /** Used to skip n elements in the OData query (offset). Returns a nextLink to the next page of results if there are any left. */
  skip?: number;
}

/** Optional parameters. */
export interface MetadataDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MetadataUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MetadataCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MetadataGetOptionalParams extends OperationOptions {}
