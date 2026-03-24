// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import { listByBillingAccount, get } from "../../api/departments/operations.js";
import type {
  DepartmentsListByBillingAccountOptionalParams,
  DepartmentsGetOptionalParams,
} from "../../api/departments/options.js";
import type { Department } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Departments operations. */
export interface DepartmentsOperations {
  /** Lists the departments that a user has access to. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
  listByBillingAccount: (
    billingAccountName: string,
    options?: DepartmentsListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Department>;
  /** Gets a department by ID. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
  get: (
    billingAccountName: string,
    departmentName: string,
    options?: DepartmentsGetOptionalParams,
  ) => Promise<Department>;
}

function _getDepartments(context: BillingManagementContext) {
  return {
    listByBillingAccount: (
      billingAccountName: string,
      options?: DepartmentsListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountName, options),
    get: (
      billingAccountName: string,
      departmentName: string,
      options?: DepartmentsGetOptionalParams,
    ) => get(context, billingAccountName, departmentName, options),
  };
}

export function _getDepartmentsOperations(
  context: BillingManagementContext,
): DepartmentsOperations {
  return {
    ..._getDepartments(context),
  };
}
