// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SupportTicketsNoSubscriptionCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SupportTicketsNoSubscriptionListOptionalParams extends OperationOptions {
  /** The number of values to return in the collection. Default is 25 and max is 100. */
  top?: number;
  /** The filter to apply on the operation. We support 'odata v4.0' filter semantics. <a target='_blank' href='https://docs.microsoft.com/odata/concepts/queryoptions-overview'>Learn more</a> <br/><i>Status</i> , <i>ServiceId</i>, and <i>ProblemClassificationId</i> filters can only be used with 'eq' operator. For <i>CreatedDate</i> filter, the supported operators are 'gt' and 'ge'. When using both filters, combine them using the logical 'AND'. */
  filter?: string;
}

/** Optional parameters. */
export interface SupportTicketsNoSubscriptionUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SupportTicketsNoSubscriptionCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SupportTicketsNoSubscriptionGetOptionalParams extends OperationOptions {}
