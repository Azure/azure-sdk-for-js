// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureResilienceManagementContext } from "../../api/azureResilienceManagementContext.js";
import { list, get } from "../../api/recoveryResources/operations.js";
import type {
  RecoveryResourcesListOptionalParams,
  RecoveryResourcesGetOptionalParams,
} from "../../api/recoveryResources/options.js";
import type { RecoveryResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RecoveryResources operations. */
export interface RecoveryResourcesOperations {
  /** List RecoveryResource resources by RecoveryPlan */
  list: (
    serviceGroupName: string,
    recoveryPlanName: string,
    options?: RecoveryResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<RecoveryResource>;
  /** Get a RecoveryResource */
  get: (
    serviceGroupName: string,
    recoveryPlanName: string,
    recoveryResourceName: string,
    options?: RecoveryResourcesGetOptionalParams,
  ) => Promise<RecoveryResource>;
}

function _getRecoveryResources(context: AzureResilienceManagementContext) {
  return {
    list: (
      serviceGroupName: string,
      recoveryPlanName: string,
      options?: RecoveryResourcesListOptionalParams,
    ) => list(context, serviceGroupName, recoveryPlanName, options),
    get: (
      serviceGroupName: string,
      recoveryPlanName: string,
      recoveryResourceName: string,
      options?: RecoveryResourcesGetOptionalParams,
    ) => get(context, serviceGroupName, recoveryPlanName, recoveryResourceName, options),
  };
}

export function _getRecoveryResourcesOperations(
  context: AzureResilienceManagementContext,
): RecoveryResourcesOperations {
  return {
    ..._getRecoveryResources(context),
  };
}
