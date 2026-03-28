// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BillingSubscriptionsListByInvoiceSectionOptionalParams extends OperationOptions {
  /** Can be used to get deleted billing subscriptions. */
  includeDeleted?: boolean;
  /** Can be used to expand `Reseller`, `ConsumptionCostCenter`, `LastMonthCharges` and `MonthToDateCharges` */
  expand?: string;
  /** The filter query option allows clients to filter a collection of resources that are addressed by a request URL. */
  filter?: string;
  /** The orderby query option allows clients to request resources in a particular order. */
  orderBy?: string;
  /** The top query option requests the number of items in the queried collection to be included in the result. The maximum supported value for top is 50. */
  top?: number;
  /** The skip query option requests the number of items in the queried collection that are to be skipped and not included in the result. */
  skip?: number;
  /** The count query option allows clients to request a count of the matching resources included with the resources in the response. */
  count?: boolean;
  /** The search query option allows clients to request items within a collection matching a free-text search expression. search is only supported for string fields. */
  search?: string;
}

/** Optional parameters. */
export interface BillingSubscriptionsListByEnrollmentAccountOptionalParams extends OperationOptions {
  /** The filter query option allows clients to filter a collection of resources that are addressed by a request URL. */
  filter?: string;
  /** The orderby query option allows clients to request resources in a particular order. */
  orderBy?: string;
  /** The top query option requests the number of items in the queried collection to be included in the result. The maximum supported value for top is 50. */
  top?: number;
  /** The skip query option requests the number of items in the queried collection that are to be skipped and not included in the result. */
  skip?: number;
  /** The count query option allows clients to request a count of the matching resources included with the resources in the response. */
  count?: boolean;
  /** The search query option allows clients to request items within a collection matching a free-text search expression. search is only supported for string fields. */
  search?: string;
}

/** Optional parameters. */
export interface BillingSubscriptionsListByCustomerAtBillingAccountOptionalParams extends OperationOptions {
  /** Can be used to get deleted billing subscriptions. */
  includeDeleted?: boolean;
  /** Can be used to expand `Reseller`, `ConsumptionCostCenter`, `LastMonthCharges` and `MonthToDateCharges` */
  expand?: string;
  /** The filter query option allows clients to filter a collection of resources that are addressed by a request URL. */
  filter?: string;
  /** The orderby query option allows clients to request resources in a particular order. */
  orderBy?: string;
  /** The top query option requests the number of items in the queried collection to be included in the result. The maximum supported value for top is 50. */
  top?: number;
  /** The skip query option requests the number of items in the queried collection that are to be skipped and not included in the result. */
  skip?: number;
  /** The count query option allows clients to request a count of the matching resources included with the resources in the response. */
  count?: boolean;
  /** The search query option allows clients to request items within a collection matching a free-text search expression. search is only supported for string fields. */
  search?: string;
}

/** Optional parameters. */
export interface BillingSubscriptionsListByCustomerOptionalParams extends OperationOptions {
  /** Can be used to get deleted billing subscriptions. */
  includeDeleted?: boolean;
  /** Can be used to expand `Reseller`, `ConsumptionCostCenter`, `LastMonthCharges` and `MonthToDateCharges` */
  expand?: string;
  /** The filter query option allows clients to filter a collection of resources that are addressed by a request URL. */
  filter?: string;
  /** The orderby query option allows clients to request resources in a particular order. */
  orderBy?: string;
  /** The top query option requests the number of items in the queried collection to be included in the result. The maximum supported value for top is 50. */
  top?: number;
  /** The skip query option requests the number of items in the queried collection that are to be skipped and not included in the result. */
  skip?: number;
  /** The count query option allows clients to request a count of the matching resources included with the resources in the response. */
  count?: boolean;
  /** The search query option allows clients to request items within a collection matching a free-text search expression. search is only supported for string fields. */
  search?: string;
}

/** Optional parameters. */
export interface BillingSubscriptionsValidateMoveEligibilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BillingSubscriptionsSplitOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BillingSubscriptionsMoveOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BillingSubscriptionsMergeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BillingSubscriptionsCancelOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BillingSubscriptionsListByBillingAccountOptionalParams extends OperationOptions {
  /** Can be used to get deleted billing subscriptions. */
  includeDeleted?: boolean;
  /** Can be used to get tenant-owned billing subscriptions. This field is only applies to Microsoft Online Services Program billing accounts. */
  includeTenantSubscriptions?: boolean;
  /** Can be used to get failed billing subscriptions. */
  includeFailed?: boolean;
  /** Can be used to expand `Reseller`, `ConsumptionCostCenter`, `LastMonthCharges` and `MonthToDateCharges` */
  expand?: string;
  /** The filter query option allows clients to filter a collection of resources that are addressed by a request URL. */
  filter?: string;
  /** The orderby query option allows clients to request resources in a particular order. */
  orderBy?: string;
  /** The top query option requests the number of items in the queried collection to be included in the result. The maximum supported value for top is 50. */
  top?: number;
  /** The skip query option requests the number of items in the queried collection that are to be skipped and not included in the result. */
  skip?: number;
  /** The count query option allows clients to request a count of the matching resources included with the resources in the response. */
  count?: boolean;
  /** The search query option allows clients to request items within a collection matching a free-text search expression. search is only supported for string fields. */
  search?: string;
}

/** Optional parameters. */
export interface BillingSubscriptionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BillingSubscriptionsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BillingSubscriptionsGetOptionalParams extends OperationOptions {
  /** Can be used to expand `Reseller`, `ConsumptionCostCenter`, `LastMonthCharges` and `MonthToDateCharges` */
  expand?: string;
}

/** Optional parameters. */
export interface BillingSubscriptionsListByBillingProfileOptionalParams extends OperationOptions {
  /** Can be used to get deleted billing subscriptions. */
  includeDeleted?: boolean;
  /** Can be used to expand `Reseller`, `ConsumptionCostCenter`, `LastMonthCharges` and `MonthToDateCharges` */
  expand?: string;
  /** The filter query option allows clients to filter a collection of resources that are addressed by a request URL. */
  filter?: string;
  /** The orderby query option allows clients to request resources in a particular order. */
  orderBy?: string;
  /** The top query option requests the number of items in the queried collection to be included in the result. The maximum supported value for top is 50. */
  top?: number;
  /** The skip query option requests the number of items in the queried collection that are to be skipped and not included in the result. */
  skip?: number;
  /** The count query option allows clients to request a count of the matching resources included with the resources in the response. */
  count?: boolean;
  /** The search query option allows clients to request items within a collection matching a free-text search expression. search is only supported for string fields. */
  search?: string;
}

/** Optional parameters. */
export interface BillingSubscriptionsGetByBillingProfileOptionalParams extends OperationOptions {
  /** Can be used to expand `Reseller`, `ConsumptionCostCenter`, `LastMonthCharges` and `MonthToDateCharges` */
  expand?: string;
}
