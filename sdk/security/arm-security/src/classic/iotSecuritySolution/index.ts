// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/iotSecuritySolution/operations.js";
import type {
  IotSecuritySolutionListBySubscriptionOptionalParams,
  IotSecuritySolutionListByResourceGroupOptionalParams,
  IotSecuritySolutionDeleteOptionalParams,
  IotSecuritySolutionUpdateOptionalParams,
  IotSecuritySolutionCreateOrUpdateOptionalParams,
  IotSecuritySolutionGetOptionalParams,
} from "../../api/iotSecuritySolution/options.js";
import type {
  IoTSecuritySolutionModel,
  UpdateIotSecuritySolutionData,
} from "../../models/ioTSecurityAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a IotSecuritySolution operations. */
export interface IotSecuritySolutionOperations {
  /** Use this method to get the list of IoT Security solutions by subscription. */
  listBySubscription: (
    options?: IotSecuritySolutionListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<IoTSecuritySolutionModel>;
  /** Use this method to get the list IoT Security solutions organized by resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: IotSecuritySolutionListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<IoTSecuritySolutionModel>;
  /** Use this method to delete yours IoT Security solution */
  delete: (
    resourceGroupName: string,
    solutionName: string,
    options?: IotSecuritySolutionDeleteOptionalParams,
  ) => Promise<void>;
  /** Use this method to update existing IoT Security solution tags or user defined resources. To update other fields use the CreateOrUpdate method. */
  update: (
    resourceGroupName: string,
    solutionName: string,
    updateIotSecuritySolutionData: UpdateIotSecuritySolutionData,
    options?: IotSecuritySolutionUpdateOptionalParams,
  ) => Promise<IoTSecuritySolutionModel>;
  /** Use this method to create or update yours IoT Security solution */
  createOrUpdate: (
    resourceGroupName: string,
    solutionName: string,
    iotSecuritySolutionData: IoTSecuritySolutionModel,
    options?: IotSecuritySolutionCreateOrUpdateOptionalParams,
  ) => Promise<IoTSecuritySolutionModel>;
  /** User this method to get details of a specific IoT Security solution based on solution name */
  get: (
    resourceGroupName: string,
    solutionName: string,
    options?: IotSecuritySolutionGetOptionalParams,
  ) => Promise<IoTSecuritySolutionModel>;
}

function _getIotSecuritySolution(context: SecurityCenterContext) {
  return {
    listBySubscription: (options?: IotSecuritySolutionListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: IotSecuritySolutionListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      solutionName: string,
      options?: IotSecuritySolutionDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, solutionName, options),
    update: (
      resourceGroupName: string,
      solutionName: string,
      updateIotSecuritySolutionData: UpdateIotSecuritySolutionData,
      options?: IotSecuritySolutionUpdateOptionalParams,
    ) => update(context, resourceGroupName, solutionName, updateIotSecuritySolutionData, options),
    createOrUpdate: (
      resourceGroupName: string,
      solutionName: string,
      iotSecuritySolutionData: IoTSecuritySolutionModel,
      options?: IotSecuritySolutionCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, solutionName, iotSecuritySolutionData, options),
    get: (
      resourceGroupName: string,
      solutionName: string,
      options?: IotSecuritySolutionGetOptionalParams,
    ) => get(context, resourceGroupName, solutionName, options),
  };
}

export function _getIotSecuritySolutionOperations(
  context: SecurityCenterContext,
): IotSecuritySolutionOperations {
  return {
    ..._getIotSecuritySolution(context),
  };
}
