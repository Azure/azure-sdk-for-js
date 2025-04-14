// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolContext } from "../../api/standbyPoolManagementContext.js";
import { StandbyVirtualMachinePoolRuntimeViewResource } from "../../models/models.js";
import {
  standbyVirtualMachinePoolRuntimeViewsGet,
  standbyVirtualMachinePoolRuntimeViewsListByStandbyPool,
} from "../../api/standbyVirtualMachinePoolRuntimeViews/index.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import {
  StandbyVirtualMachinePoolRuntimeViewsGetOptionalParams,
  StandbyVirtualMachinePoolRuntimeViewsListByStandbyPoolOptionalParams,
} from "../../models/options.js";

/** Interface representing a StandbyVirtualMachinePoolRuntimeViews operations. */
export interface StandbyVirtualMachinePoolRuntimeViewsOperations {
  /** Get a StandbyVirtualMachinePoolRuntimeViewResource */
  get: (
    resourceGroupName: string,
    standbyVirtualMachinePoolName: string,
    runtimeView: string,
    options?: StandbyVirtualMachinePoolRuntimeViewsGetOptionalParams,
  ) => Promise<StandbyVirtualMachinePoolRuntimeViewResource>;
  /** List StandbyVirtualMachinePoolRuntimeViewResource resources by StandbyVirtualMachinePoolResource */
  listByStandbyPool: (
    resourceGroupName: string,
    standbyVirtualMachinePoolName: string,
    options?: StandbyVirtualMachinePoolRuntimeViewsListByStandbyPoolOptionalParams,
  ) => PagedAsyncIterableIterator<StandbyVirtualMachinePoolRuntimeViewResource>;
}

export function getStandbyVirtualMachinePoolRuntimeViews(
  context: StandbyPoolContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      standbyVirtualMachinePoolName: string,
      runtimeView: string,
      options?: StandbyVirtualMachinePoolRuntimeViewsGetOptionalParams,
    ) =>
      standbyVirtualMachinePoolRuntimeViewsGet(
        context,
        subscriptionId,
        resourceGroupName,
        standbyVirtualMachinePoolName,
        runtimeView,
        options,
      ),
    listByStandbyPool: (
      resourceGroupName: string,
      standbyVirtualMachinePoolName: string,
      options?: StandbyVirtualMachinePoolRuntimeViewsListByStandbyPoolOptionalParams,
    ) =>
      standbyVirtualMachinePoolRuntimeViewsListByStandbyPool(
        context,
        subscriptionId,
        resourceGroupName,
        standbyVirtualMachinePoolName,
        options,
      ),
  };
}

export function getStandbyVirtualMachinePoolRuntimeViewsOperations(
  context: StandbyPoolContext,
  subscriptionId: string,
): StandbyVirtualMachinePoolRuntimeViewsOperations {
  return {
    ...getStandbyVirtualMachinePoolRuntimeViews(context, subscriptionId),
  };
}
