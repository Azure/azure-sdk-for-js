// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPIContext } from "../../api/hybridConnectivityManagementAPIContext.js";
import {
  SolutionTypesListBySubscriptionOptionalParams,
  SolutionTypesListByResourceGroupOptionalParams,
  SolutionTypesGetOptionalParams,
} from "../../api/options.js";
import {
  solutionTypesListBySubscription,
  solutionTypesListByResourceGroup,
  solutionTypesGet,
} from "../../api/solutionTypes/index.js";
import { SolutionTypeResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SolutionTypes operations. */
export interface SolutionTypesOperations {
  /** List SolutionTypeResource resources by subscription ID */
  listBySubscription: (
    options?: SolutionTypesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<SolutionTypeResource>;
  /** List SolutionTypeResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SolutionTypesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SolutionTypeResource>;
  /** Get a SolutionTypeResource */
  get: (
    resourceGroupName: string,
    solutionType: string,
    options?: SolutionTypesGetOptionalParams,
  ) => Promise<SolutionTypeResource>;
}

function _getSolutionTypes(context: HybridConnectivityManagementAPIContext) {
  return {
    listBySubscription: (options?: SolutionTypesListBySubscriptionOptionalParams) =>
      solutionTypesListBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SolutionTypesListByResourceGroupOptionalParams,
    ) => solutionTypesListByResourceGroup(context, resourceGroupName, options),
    get: (
      resourceGroupName: string,
      solutionType: string,
      options?: SolutionTypesGetOptionalParams,
    ) => solutionTypesGet(context, resourceGroupName, solutionType, options),
  };
}

export function _getSolutionTypesOperations(
  context: HybridConnectivityManagementAPIContext,
): SolutionTypesOperations {
  return {
    ..._getSolutionTypes(context),
  };
}
