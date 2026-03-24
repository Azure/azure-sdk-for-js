// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BillingRoleAssignmentsResolveByInvoiceSectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Resolves the scope display name for each of the role assignments. */
  resolveScopeDisplayNames?: boolean;
  /** The filter query option allows clients to filter a collection of resources that are addressed by a request URL. */
  filter?: string;
}

/** Optional parameters. */
export interface BillingRoleAssignmentsCreateByInvoiceSectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BillingRoleAssignmentsResolveByCustomerOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Resolves the scope display name for each of the role assignments. */
  resolveScopeDisplayNames?: boolean;
  /** The filter query option allows clients to filter a collection of resources that are addressed by a request URL. */
  filter?: string;
}

/** Optional parameters. */
export interface BillingRoleAssignmentsCreateByCustomerOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BillingRoleAssignmentsListByEnrollmentAccountOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BillingRoleAssignmentsDeleteByEnrollmentAccountOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BillingRoleAssignmentsCreateOrUpdateByEnrollmentAccountOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BillingRoleAssignmentsGetByEnrollmentAccountOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BillingRoleAssignmentsListByDepartmentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BillingRoleAssignmentsDeleteByDepartmentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BillingRoleAssignmentsCreateOrUpdateByDepartmentOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BillingRoleAssignmentsGetByDepartmentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BillingRoleAssignmentsListByBillingAccountOptionalParams extends OperationOptions {
  /** The filter query option allows clients to filter a collection of resources that are addressed by a request URL. */
  filter?: string;
  /** The top query option requests the number of items in the queried collection to be included in the result. The maximum supported value for top is 50. */
  top?: number;
  /** The skip query option requests the number of items in the queried collection that are to be skipped and not included in the result. */
  skip?: number;
}

/** Optional parameters. */
export interface BillingRoleAssignmentsDeleteByBillingAccountOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BillingRoleAssignmentsCreateOrUpdateByBillingAccountOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BillingRoleAssignmentsGetByBillingAccountOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BillingRoleAssignmentsListByInvoiceSectionOptionalParams extends OperationOptions {
  /** The filter query option allows clients to filter a collection of resources that are addressed by a request URL. */
  filter?: string;
  /** The top query option requests the number of items in the queried collection to be included in the result. The maximum supported value for top is 50. */
  top?: number;
  /** The skip query option requests the number of items in the queried collection that are to be skipped and not included in the result. */
  skip?: number;
}

/** Optional parameters. */
export interface BillingRoleAssignmentsDeleteByInvoiceSectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BillingRoleAssignmentsGetByInvoiceSectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BillingRoleAssignmentsListByCustomerOptionalParams extends OperationOptions {
  /** The filter query option allows clients to filter a collection of resources that are addressed by a request URL. */
  filter?: string;
  /** The top query option requests the number of items in the queried collection to be included in the result. The maximum supported value for top is 50. */
  top?: number;
  /** The skip query option requests the number of items in the queried collection that are to be skipped and not included in the result. */
  skip?: number;
}

/** Optional parameters. */
export interface BillingRoleAssignmentsDeleteByCustomerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BillingRoleAssignmentsGetByCustomerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BillingRoleAssignmentsResolveByBillingProfileOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Resolves the scope display name for each of the role assignments. */
  resolveScopeDisplayNames?: boolean;
  /** The filter query option allows clients to filter a collection of resources that are addressed by a request URL. */
  filter?: string;
}

/** Optional parameters. */
export interface BillingRoleAssignmentsCreateByBillingProfileOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BillingRoleAssignmentsResolveByBillingAccountOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Resolves the scope display name for each of the role assignments. */
  resolveScopeDisplayNames?: boolean;
  /** The filter query option allows clients to filter a collection of resources that are addressed by a request URL. */
  filter?: string;
}

/** Optional parameters. */
export interface BillingRoleAssignmentsCreateByBillingAccountOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BillingRoleAssignmentsListByBillingProfileOptionalParams extends OperationOptions {
  /** The filter query option allows clients to filter a collection of resources that are addressed by a request URL. */
  filter?: string;
  /** The top query option requests the number of items in the queried collection to be included in the result. The maximum supported value for top is 50. */
  top?: number;
  /** The skip query option requests the number of items in the queried collection that are to be skipped and not included in the result. */
  skip?: number;
}

/** Optional parameters. */
export interface BillingRoleAssignmentsDeleteByBillingProfileOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BillingRoleAssignmentsGetByBillingProfileOptionalParams extends OperationOptions {}
