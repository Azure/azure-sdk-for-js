// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import {
  listByBillingAccount,
  get,
  listByDepartment,
  getByDepartment,
} from "../../api/enrollmentAccounts/operations.js";
import type {
  EnrollmentAccountsListByBillingAccountOptionalParams,
  EnrollmentAccountsGetOptionalParams,
  EnrollmentAccountsListByDepartmentOptionalParams,
  EnrollmentAccountsGetByDepartmentOptionalParams,
} from "../../api/enrollmentAccounts/options.js";
import type { EnrollmentAccount } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EnrollmentAccounts operations. */
export interface EnrollmentAccountsOperations {
  /** Lists the enrollment accounts for a billing account. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
  listByBillingAccount: (
    billingAccountName: string,
    options?: EnrollmentAccountsListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<EnrollmentAccount>;
  /** Gets an enrollment account by ID. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
  get: (
    billingAccountName: string,
    enrollmentAccountName: string,
    options?: EnrollmentAccountsGetOptionalParams,
  ) => Promise<EnrollmentAccount>;
  /** Lists the enrollment accounts for a department. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
  listByDepartment: (
    billingAccountName: string,
    departmentName: string,
    options?: EnrollmentAccountsListByDepartmentOptionalParams,
  ) => PagedAsyncIterableIterator<EnrollmentAccount>;
  /** Gets an enrollment account by department. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
  getByDepartment: (
    billingAccountName: string,
    departmentName: string,
    enrollmentAccountName: string,
    options?: EnrollmentAccountsGetByDepartmentOptionalParams,
  ) => Promise<EnrollmentAccount>;
}

function _getEnrollmentAccounts(context: BillingManagementContext) {
  return {
    listByBillingAccount: (
      billingAccountName: string,
      options?: EnrollmentAccountsListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountName, options),
    get: (
      billingAccountName: string,
      enrollmentAccountName: string,
      options?: EnrollmentAccountsGetOptionalParams,
    ) => get(context, billingAccountName, enrollmentAccountName, options),
    listByDepartment: (
      billingAccountName: string,
      departmentName: string,
      options?: EnrollmentAccountsListByDepartmentOptionalParams,
    ) => listByDepartment(context, billingAccountName, departmentName, options),
    getByDepartment: (
      billingAccountName: string,
      departmentName: string,
      enrollmentAccountName: string,
      options?: EnrollmentAccountsGetByDepartmentOptionalParams,
    ) =>
      getByDepartment(context, billingAccountName, departmentName, enrollmentAccountName, options),
  };
}

export function _getEnrollmentAccountsOperations(
  context: BillingManagementContext,
): EnrollmentAccountsOperations {
  return {
    ..._getEnrollmentAccounts(context),
  };
}
