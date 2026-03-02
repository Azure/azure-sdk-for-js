// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  checkExistence,
  move,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/employees/operations.js";
import type {
  EmployeesCheckExistenceOptionalParams,
  EmployeesMoveOptionalParams,
  EmployeesListBySubscriptionOptionalParams,
  EmployeesListByResourceGroupOptionalParams,
  EmployeesDeleteOptionalParams,
  EmployeesUpdateOptionalParams,
  EmployeesCreateOrUpdateOptionalParams,
  EmployeesGetOptionalParams,
} from "../../api/employees/options.js";
import type {
  GalleryEmployee,
  GalleryEmployeeUpdate,
  GalleryMoveRequest,
  GalleryMoveResponse,
} from "../../models/gallery/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Employees operations. */
export interface EmployeesOperations {
  /** A sample HEAD operation to check resource existence */
  checkExistence: (
    resourceGroupName: string,
    employeeName: string,
    options?: EmployeesCheckExistenceOptionalParams,
  ) => Promise<void>;
  /** A sample resource action that move employee to different location */
  move: (
    resourceGroupName: string,
    employeeName: string,
    body: GalleryMoveRequest,
    options?: EmployeesMoveOptionalParams,
  ) => Promise<GalleryMoveResponse>;
  /** List Employee resources by subscription ID */
  listBySubscription: (
    options?: EmployeesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<GalleryEmployee>;
  /** List Employee resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: EmployeesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<GalleryEmployee>;
  /** Delete a Employee */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    employeeName: string,
    options?: EmployeesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Employee */
  update: (
    resourceGroupName: string,
    employeeName: string,
    properties: GalleryEmployeeUpdate,
    options?: EmployeesUpdateOptionalParams,
  ) => Promise<GalleryEmployee>;
  /** Create a Employee */
  createOrUpdate: (
    resourceGroupName: string,
    employeeName: string,
    resource: GalleryEmployee,
    options?: EmployeesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<GalleryEmployee>, GalleryEmployee>;
  /** Get a Employee */
  get: (
    resourceGroupName: string,
    employeeName: string,
    options?: EmployeesGetOptionalParams,
  ) => Promise<GalleryEmployee>;
}

function _getEmployees(context: ComputeContext) {
  return {
    checkExistence: (
      resourceGroupName: string,
      employeeName: string,
      options?: EmployeesCheckExistenceOptionalParams,
    ) => checkExistence(context, resourceGroupName, employeeName, options),
    move: (
      resourceGroupName: string,
      employeeName: string,
      body: GalleryMoveRequest,
      options?: EmployeesMoveOptionalParams,
    ) => move(context, resourceGroupName, employeeName, body, options),
    listBySubscription: (options?: EmployeesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: EmployeesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      employeeName: string,
      options?: EmployeesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, employeeName, options),
    update: (
      resourceGroupName: string,
      employeeName: string,
      properties: GalleryEmployeeUpdate,
      options?: EmployeesUpdateOptionalParams,
    ) => update(context, resourceGroupName, employeeName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      employeeName: string,
      resource: GalleryEmployee,
      options?: EmployeesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, employeeName, resource, options),
    get: (resourceGroupName: string, employeeName: string, options?: EmployeesGetOptionalParams) =>
      get(context, resourceGroupName, employeeName, options),
  };
}

export function _getEmployeesOperations(context: ComputeContext): EmployeesOperations {
  return {
    ..._getEmployees(context),
  };
}
