// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EnrollmentAccountsListByBillingAccountOptionalParams extends OperationOptions {
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
export interface EnrollmentAccountsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnrollmentAccountsListByDepartmentOptionalParams extends OperationOptions {
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
export interface EnrollmentAccountsGetByDepartmentOptionalParams extends OperationOptions {}
