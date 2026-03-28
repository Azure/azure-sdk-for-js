// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface InvoicesDownloadDocumentsByBillingSubscriptionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InvoicesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InvoicesDownloadByBillingSubscriptionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ID that uniquely identifies an invoice document. This ID may be an identifier for an invoice PDF, a credit note, or a tax receipt. */
  documentName?: string;
}

/** Optional parameters. */
export interface InvoicesListByBillingSubscriptionOptionalParams extends OperationOptions {
  /** The start date of the billing period for which the invoice is generated. The date is in MM-DD-YYYY format. */
  periodStartDate?: Date;
  /** The end date of the billing period for which the invoice is generated. The date is in MM-DD-YYYY format. */
  periodEndDate?: Date;
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
export interface InvoicesGetByBillingSubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InvoicesListByBillingProfileOptionalParams extends OperationOptions {
  /** The start date of the billing period for which the invoice is generated. The date is in MM-DD-YYYY format. */
  periodStartDate?: Date;
  /** The end date of the billing period for which the invoice is generated. The date is in MM-DD-YYYY format. */
  periodEndDate?: Date;
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
export interface InvoicesDownloadDocumentsByBillingAccountOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InvoicesDownloadSummaryByBillingAccountOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InvoicesDownloadByBillingAccountOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ID that uniquely identifies an invoice document. This ID may be an identifier for an invoice PDF, a credit note, or a tax receipt. */
  documentName?: string;
}

/** Optional parameters. */
export interface InvoicesAmendOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InvoicesListByBillingAccountOptionalParams extends OperationOptions {
  /** The start date of the billing period for which the invoice is generated. The date is in MM-DD-YYYY format. */
  periodStartDate?: Date;
  /** The end date of the billing period for which the invoice is generated. The date is in MM-DD-YYYY format. */
  periodEndDate?: Date;
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
export interface InvoicesGetByBillingAccountOptionalParams extends OperationOptions {}
