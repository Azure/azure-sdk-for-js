// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolContext } from "../../api/standbyPoolManagementContext.js";
import { StandbyContainerGroupPoolRuntimeViewResource } from "../../models/models.js";
import {
  standbyContainerGroupPoolRuntimeViewsGet,
  standbyContainerGroupPoolRuntimeViewsListByStandbyPool,
} from "../../api/standbyContainerGroupPoolRuntimeViews/index.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import {
  StandbyContainerGroupPoolRuntimeViewsGetOptionalParams,
  StandbyContainerGroupPoolRuntimeViewsListByStandbyPoolOptionalParams,
} from "../../models/options.js";

/** Interface representing a StandbyContainerGroupPoolRuntimeViews operations. */
export interface StandbyContainerGroupPoolRuntimeViewsOperations {
  /** Get a StandbyContainerGroupPoolRuntimeViewResource */
  get: (
    resourceGroupName: string,
    standbyContainerGroupPoolName: string,
    runtimeView: string,
    options?: StandbyContainerGroupPoolRuntimeViewsGetOptionalParams,
  ) => Promise<StandbyContainerGroupPoolRuntimeViewResource>;
  /** List StandbyContainerGroupPoolRuntimeViewResource resources by StandbyContainerGroupPoolResource */
  listByStandbyPool: (
    resourceGroupName: string,
    standbyContainerGroupPoolName: string,
    options?: StandbyContainerGroupPoolRuntimeViewsListByStandbyPoolOptionalParams,
  ) => PagedAsyncIterableIterator<StandbyContainerGroupPoolRuntimeViewResource>;
}

export function getStandbyContainerGroupPoolRuntimeViews(
  context: StandbyPoolContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      standbyContainerGroupPoolName: string,
      runtimeView: string,
      options?: StandbyContainerGroupPoolRuntimeViewsGetOptionalParams,
    ) =>
      standbyContainerGroupPoolRuntimeViewsGet(
        context,
        subscriptionId,
        resourceGroupName,
        standbyContainerGroupPoolName,
        runtimeView,
        options,
      ),
    listByStandbyPool: (
      resourceGroupName: string,
      standbyContainerGroupPoolName: string,
      options?: StandbyContainerGroupPoolRuntimeViewsListByStandbyPoolOptionalParams,
    ) =>
      standbyContainerGroupPoolRuntimeViewsListByStandbyPool(
        context,
        subscriptionId,
        resourceGroupName,
        standbyContainerGroupPoolName,
        options,
      ),
  };
}

export function getStandbyContainerGroupPoolRuntimeViewsOperations(
  context: StandbyPoolContext,
  subscriptionId: string,
): StandbyContainerGroupPoolRuntimeViewsOperations {
  return {
    ...getStandbyContainerGroupPoolRuntimeViews(context, subscriptionId),
  };
}
