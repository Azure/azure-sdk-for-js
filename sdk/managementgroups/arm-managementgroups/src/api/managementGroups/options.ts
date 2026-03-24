// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagementGroupExpandType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagementGroupsListOptionalParams extends OperationOptions {
  /** Indicates whether the request should utilize any caches. Populate the header with 'no-cache' value to bypass existing caches. */
  cacheControl?: string;
  /**
   * Page continuation token is only used if a previous operation returned a partial result.
   * If a previous response contains a nextLink element, the value of the nextLink element will include a token parameter that specifies a starting point to use for subsequent calls.
   */
  skiptoken?: string;
}

/** Optional parameters. */
export interface ManagementGroupsGetDescendantsOptionalParams extends OperationOptions {
  /**
   * Page continuation token is only used if a previous operation returned a partial result.
   * If a previous response contains a nextLink element, the value of the nextLink element will include a token parameter that specifies a starting point to use for subsequent calls.
   */
  skiptoken?: string;
  /** Number of elements to return when retrieving results. Passing this in will override $skipToken. */
  top?: number;
}

/** Optional parameters. */
export interface ManagementGroupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Indicates whether the request should utilize any caches. Populate the header with 'no-cache' value to bypass existing caches. */
  cacheControl?: string;
}

/** Optional parameters. */
export interface ManagementGroupsUpdateOptionalParams extends OperationOptions {
  /** Indicates whether the request should utilize any caches. Populate the header with 'no-cache' value to bypass existing caches. */
  cacheControl?: string;
}

/** Optional parameters. */
export interface ManagementGroupsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Indicates whether the request should utilize any caches. Populate the header with 'no-cache' value to bypass existing caches. */
  cacheControl?: string;
}

/** Optional parameters. */
export interface ManagementGroupsGetOptionalParams extends OperationOptions {
  /** The $expand=children query string parameter allows clients to request inclusion of children in the response payload.  $expand=path includes the path from the root group to the current group.  $expand=ancestors includes the ancestor Ids of the current group. */
  expand?: ManagementGroupExpandType;
  /** The $recurse=true query string parameter allows clients to request inclusion of entire hierarchy in the response payload. Note that  $expand=children must be passed up if $recurse is set to true. */
  recurse?: boolean;
  /** A filter which allows the exclusion of subscriptions from results (i.e. '$filter=children.childType ne Subscription') */
  filter?: string;
  /** Indicates whether the request should utilize any caches. Populate the header with 'no-cache' value to bypass existing caches. */
  cacheControl?: string;
}
