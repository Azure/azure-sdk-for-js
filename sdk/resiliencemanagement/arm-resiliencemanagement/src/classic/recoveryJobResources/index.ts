// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementContext } from "../../api/azureResilienceManagementContext.js";
import { list, get } from "../../api/recoveryJobResources/operations.js";
import {
  RecoveryJobResourcesListOptionalParams,
  RecoveryJobResourcesGetOptionalParams,
} from "../../api/recoveryJobResources/options.js";
import { RecoveryJobResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RecoveryJobResources operations. */
export interface RecoveryJobResourcesOperations {
  /** List RecoveryJobResource resources by RecoveryJob */
  list: (
    serviceGroupName: string,
    recoveryPlanName: string,
    recoveryJobName: string,
    options?: RecoveryJobResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<RecoveryJobResource>;
  /** Get a RecoveryJobResource */
  get: (
    serviceGroupName: string,
    recoveryPlanName: string,
    recoveryJobName: string,
    recoveryJobResourceName: string,
    options?: RecoveryJobResourcesGetOptionalParams,
  ) => Promise<RecoveryJobResource>;
}

function _getRecoveryJobResources(context: AzureResilienceManagementContext) {
  return {
    list: (
      serviceGroupName: string,
      recoveryPlanName: string,
      recoveryJobName: string,
      options?: RecoveryJobResourcesListOptionalParams,
    ) => list(context, serviceGroupName, recoveryPlanName, recoveryJobName, options),
    get: (
      serviceGroupName: string,
      recoveryPlanName: string,
      recoveryJobName: string,
      recoveryJobResourceName: string,
      options?: RecoveryJobResourcesGetOptionalParams,
    ) =>
      get(
        context,
        serviceGroupName,
        recoveryPlanName,
        recoveryJobName,
        recoveryJobResourceName,
        options,
      ),
  };
}

export function _getRecoveryJobResourcesOperations(
  context: AzureResilienceManagementContext,
): RecoveryJobResourcesOperations {
  return {
    ..._getRecoveryJobResources(context),
  };
}
