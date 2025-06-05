// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContosoContext } from "../../api/contosoContext.js";
import { Employee } from "../../models/models.js";
import {
  EmployeesListBySubscriptionOptionalParams,
  EmployeesListByResourceGroupOptionalParams,
  EmployeesDeleteOptionalParams,
  EmployeesUpdateOptionalParams,
  EmployeesCreateOrUpdateOptionalParams,
  EmployeesGetOptionalParams,
} from "../../api/employees/options.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/employees/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Employees operations. */
export interface EmployeesOperations {
  /** List Employee resources by subscription ID */
  listBySubscription: (
    apiVersion: string,
    options?: EmployeesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Employee>;
  /** List Employee resources by resource group */
  listByResourceGroup: (
    apiVersion: string,
    resourceGroupName: string,
    options?: EmployeesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Employee>;
  /** Delete a Employee */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    apiVersion: string,
    resourceGroupName: string,
    employeeName: string,
    options?: EmployeesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Employee */
  update: (
    apiVersion: string,
    resourceGroupName: string,
    employeeName: string,
    properties: Employee,
    options?: EmployeesUpdateOptionalParams,
  ) => Promise<Employee>;
  /** Create a Employee */
  createOrUpdate: (
    apiVersion: string,
    resourceGroupName: string,
    employeeName: string,
    resource: Employee,
    options?: EmployeesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Employee>, Employee>;
  /** Get a Employee */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    employeeName: string,
    options?: EmployeesGetOptionalParams,
  ) => Promise<Employee>;
}

function _getEmployees(context: ContosoContext) {
  return {
    listBySubscription: (apiVersion: string, options?: EmployeesListBySubscriptionOptionalParams) =>
      listBySubscription(context, apiVersion, options),
    listByResourceGroup: (
      apiVersion: string,
      resourceGroupName: string,
      options?: EmployeesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, apiVersion, resourceGroupName, options),
    delete: (
      apiVersion: string,
      resourceGroupName: string,
      employeeName: string,
      options?: EmployeesDeleteOptionalParams,
    ) => $delete(context, apiVersion, resourceGroupName, employeeName, options),
    update: (
      apiVersion: string,
      resourceGroupName: string,
      employeeName: string,
      properties: Employee,
      options?: EmployeesUpdateOptionalParams,
    ) => update(context, apiVersion, resourceGroupName, employeeName, properties, options),
    createOrUpdate: (
      apiVersion: string,
      resourceGroupName: string,
      employeeName: string,
      resource: Employee,
      options?: EmployeesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, apiVersion, resourceGroupName, employeeName, resource, options),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      employeeName: string,
      options?: EmployeesGetOptionalParams,
    ) => get(context, apiVersion, resourceGroupName, employeeName, options),
  };
}

export function _getEmployeesOperations(context: ContosoContext): EmployeesOperations {
  return {
    ..._getEmployees(context),
  };
}
