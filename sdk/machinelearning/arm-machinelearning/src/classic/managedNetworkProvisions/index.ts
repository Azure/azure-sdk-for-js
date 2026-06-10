// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { provisionManagedNetwork } from "../../api/managedNetworkProvisions/operations.js";
import type { ManagedNetworkProvisionsProvisionManagedNetworkOptionalParams } from "../../api/managedNetworkProvisions/options.js";
import type { ManagedNetworkProvisionStatus } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedNetworkProvisions operations. */
export interface ManagedNetworkProvisionsOperations {
  /** Provisions the managed network of a machine learning workspace. */
  provisionManagedNetwork: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ManagedNetworkProvisionsProvisionManagedNetworkOptionalParams,
  ) => PollerLike<OperationState<ManagedNetworkProvisionStatus>, ManagedNetworkProvisionStatus>;
}

function _getManagedNetworkProvisions(context: AzureMachineLearningServicesManagementContext) {
  return {
    provisionManagedNetwork: (
      resourceGroupName: string,
      workspaceName: string,
      options?: ManagedNetworkProvisionsProvisionManagedNetworkOptionalParams,
    ) => provisionManagedNetwork(context, resourceGroupName, workspaceName, options),
  };
}

export function _getManagedNetworkProvisionsOperations(
  context: AzureMachineLearningServicesManagementContext,
): ManagedNetworkProvisionsOperations {
  return {
    ..._getManagedNetworkProvisions(context),
  };
}
