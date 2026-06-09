// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EventFetchDetailsByTenantIdAndTrackingIdOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EventGetByTenantIdAndTrackingIdOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. For more information please see https://docs.microsoft.com/en-us/rest/api/apimanagement/apis?redirectedfrom=MSDN */
  filter?: string;
  /** Specifies from when to return events (default is 3 days), based on the lastUpdateTime property. For example, queryStartTime = 7/24/2020 OR queryStartTime=7%2F24%2F2020 */
  queryStartTime?: string;
}

/** Optional parameters. */
export interface EventFetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EventFetchDetailsBySubscriptionIdAndTrackingIdOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EventGetBySubscriptionIdAndTrackingIdOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. For more information please see https://docs.microsoft.com/en-us/rest/api/apimanagement/apis?redirectedfrom=MSDN */
  filter?: string;
  /** Specifies from when to return events (default is 3 days), based on the lastUpdateTime property. For example, queryStartTime = 7/24/2020 OR queryStartTime=7%2F24%2F2020 */
  queryStartTime?: string;
}
