// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolManagementContext } from "../../api/standbyPoolManagementContext.js";
import { StandbyVirtualMachinePoolRuntimeViewResource } from "../../models/models.js";
import {
  StandbyVirtualMachinePoolRuntimeViewsListByStandbyPoolOptionalParams,
  StandbyVirtualMachinePoolRuntimeViewsGetOptionalParams,
} from "../../api/standbyVirtualMachinePoolRuntimeViews/options.js";
import {
  listByStandbyPool,
  get,
} from "../../api/standbyVirtualMachinePoolRuntimeViews/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a StandbyVirtualMachinePoolRuntimeViews operations. */
export interface StandbyVirtualMachinePoolRuntimeViewsOperations {
  /** List StandbyVirtualMachinePoolRuntimeViewResource resources by StandbyVirtualMachinePoolResource */
  listByStandbyPool: (
    resourceGroupName: string,
    standbyVirtualMachinePoolName: string,
    options?: StandbyVirtualMachinePoolRuntimeViewsListByStandbyPoolOptionalParams,
  ) => PagedAsyncIterableIterator<StandbyVirtualMachinePoolRuntimeViewResource>;
  /** Get a StandbyVirtualMachinePoolRuntimeViewResource */
  get: (
    resourceGroupName: string,
    standbyVirtualMachinePoolName: string,
    runtimeView: string,
    options?: StandbyVirtualMachinePoolRuntimeViewsGetOptionalParams,
  ) => Promise<StandbyVirtualMachinePoolRuntimeViewResource>;
}

function _getStandbyVirtualMachinePoolRuntimeViews(context: StandbyPoolManagementContext) {
  return {
    listByStandbyPool: (
      resourceGroupName: string,
      standbyVirtualMachinePoolName: string,
      options?: StandbyVirtualMachinePoolRuntimeViewsListByStandbyPoolOptionalParams,
    ) => listByStandbyPool(context, resourceGroupName, standbyVirtualMachinePoolName, options),
    get: (
      resourceGroupName: string,
      standbyVirtualMachinePoolName: string,
      runtimeView: string,
      options?: StandbyVirtualMachinePoolRuntimeViewsGetOptionalParams,
    ) => get(context, resourceGroupName, standbyVirtualMachinePoolName, runtimeView, options),
  };
}

export function _getStandbyVirtualMachinePoolRuntimeViewsOperations(
  context: StandbyPoolManagementContext,
): StandbyVirtualMachinePoolRuntimeViewsOperations {
  return {
    ..._getStandbyVirtualMachinePoolRuntimeViews(context),
  };
}
