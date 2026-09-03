// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SupportTicketsCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SupportTicketsLookUpResourceIdOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SupportTicketsListOptionalParams extends OperationOptions {
  /** The number of values to return in the collection. Default is 25 and max is 100. */
  top?: number;
  /** The filter to apply on the operation. We support 'odata v4.0' filter semantics. [Learn more](https://docs.microsoft.com/odata/concepts/queryoptions-overview). _Status_, _ServiceId_, and _ProblemClassificationId_ filters can only be used with Equals ('eq') operator. For _CreatedDate_ filter, the supported operators are Greater Than ('gt') and Greater Than or Equals ('ge'). When using both filters, combine them using the logical 'AND'. */
  filter?: string;
}

/** Optional parameters. */
export interface SupportTicketsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SupportTicketsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SupportTicketsGetOptionalParams extends OperationOptions {}
