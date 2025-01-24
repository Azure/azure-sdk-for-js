// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContosoContext } from "../../api/contosoContext.js";
import {
  employeesListBySubscription,
  employeesListByResourceGroup,
  employeesDelete,
  employeesUpdate,
  employeesCreateOrUpdate,
  employeesGet,
} from "../../api/employees/index.js";
import {
  EmployeesListBySubscriptionOptionalParams,
  EmployeesListByResourceGroupOptionalParams,
  EmployeesDeleteOptionalParams,
  EmployeesUpdateOptionalParams,
  EmployeesCreateOrUpdateOptionalParams,
  EmployeesGetOptionalParams,
} from "../../api/options.js";
import { Employee } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Employees operations. */
export interface EmployeesOperations {
  /** List Employee resources by subscription ID */
  listBySubscription: (
    options?: EmployeesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Employee>;
  /** List Employee resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: EmployeesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Employee>;
  /** Delete a Employee */
  delete: (
    resourceGroupName: string,
    employeeName: string,
    options?: EmployeesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Employee */
  update: (
    resourceGroupName: string,
    employeeName: string,
    properties: Employee,
    options?: EmployeesUpdateOptionalParams,
  ) => Promise<Employee>;
  /** Create a Employee */
  createOrUpdate: (
    resourceGroupName: string,
    employeeName: string,
    resource: Employee,
    options?: EmployeesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Employee>, Employee>;
  /** Get a Employee */
  get: (
    resourceGroupName: string,
    employeeName: string,
    options?: EmployeesGetOptionalParams,
  ) => Promise<Employee>;
}

function _getEmployees(context: ContosoContext) {
  return {
    listBySubscription: (options?: EmployeesListBySubscriptionOptionalParams) =>
      employeesListBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: EmployeesListByResourceGroupOptionalParams,
    ) => employeesListByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      employeeName: string,
      options?: EmployeesDeleteOptionalParams,
    ) => employeesDelete(context, resourceGroupName, employeeName, options),
    update: (
      resourceGroupName: string,
      employeeName: string,
      properties: Employee,
      options?: EmployeesUpdateOptionalParams,
    ) => employeesUpdate(context, resourceGroupName, employeeName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      employeeName: string,
      resource: Employee,
      options?: EmployeesCreateOrUpdateOptionalParams,
    ) => employeesCreateOrUpdate(context, resourceGroupName, employeeName, resource, options),
    get: (resourceGroupName: string, employeeName: string, options?: EmployeesGetOptionalParams) =>
      employeesGet(context, resourceGroupName, employeeName, options),
  };
}

export function _getEmployeesOperations(context: ContosoContext): EmployeesOperations {
  return {
    ..._getEmployees(context),
  };
}
