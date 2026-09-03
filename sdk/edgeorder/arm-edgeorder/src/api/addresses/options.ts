// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AddressesListBySubscriptionOptionalParams extends OperationOptions {
  /** $filter is supported to filter based on shipping address properties. Filter supports only equals operation. */
  filter?: string;
  /** $skipToken is supported on Get list of addresses, which provides the next page in the list of addresses. */
  skipToken?: string;
  /** $top is supported on fetching list of resources. $top=10 means that the first 10 items in the list will be returned to the API caller. */
  top?: number;
}

/** Optional parameters. */
export interface AddressesListByResourceGroupOptionalParams extends OperationOptions {
  /** $filter is supported to filter based on shipping address properties. Filter supports only equals operation. */
  filter?: string;
  /** $skipToken is supported on Get list of addresses, which provides the next page in the list of addresses. */
  skipToken?: string;
  /** $top is supported on fetching list of resources. $top=10 means that the first 10 items in the list will be returned to the API caller. */
  top?: number;
}

/** Optional parameters. */
export interface AddressesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AddressesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Defines the If-Match condition. The patch will be performed only if the ETag of the job on the server matches this value. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface AddressesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AddressesGetOptionalParams extends OperationOptions {}
