// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list } from "../../api/managedComputeCapacities/operations.js";
import type { ManagedComputeCapacitiesListOptionalParams } from "../../api/managedComputeCapacities/options.js";
import type { ManagedComputeCapacity } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedComputeCapacities operations. */
export interface ManagedComputeCapacitiesOperations {
  /**
   * Gets the managed compute capacities for a subscription. Returns available capacity
   * per accelerator type, including deployment size information.
   */
  list: (
    offer: string,
    options?: ManagedComputeCapacitiesListOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedComputeCapacity>;
}

function _getManagedComputeCapacities(context: CognitiveServicesManagementContext) {
  return {
    list: (offer: string, options?: ManagedComputeCapacitiesListOptionalParams) =>
      list(context, offer, options),
  };
}

export function _getManagedComputeCapacitiesOperations(
  context: CognitiveServicesManagementContext,
): ManagedComputeCapacitiesOperations {
  return {
    ..._getManagedComputeCapacities(context),
  };
}
