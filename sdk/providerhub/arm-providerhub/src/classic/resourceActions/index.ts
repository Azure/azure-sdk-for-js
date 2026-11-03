// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext } from "../../api/providerHubContext.js";
import { deleteResources } from "../../api/resourceActions/operations.js";
import type { ResourceActionsDeleteResourcesOptionalParams } from "../../api/resourceActions/options.js";
import type { ResourceManagementAction } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ResourceActions operations. */
export interface ResourceActionsOperations {
  /** Deletes resources. */
  deleteResources: (
    providerNamespace: string,
    resourceActionName: string,
    properties: ResourceManagementAction,
    options?: ResourceActionsDeleteResourcesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
}

function _getResourceActions(context: ProviderHubContext) {
  return {
    deleteResources: (
      providerNamespace: string,
      resourceActionName: string,
      properties: ResourceManagementAction,
      options?: ResourceActionsDeleteResourcesOptionalParams,
    ) => deleteResources(context, providerNamespace, resourceActionName, properties, options),
  };
}

export function _getResourceActionsOperations(
  context: ProviderHubContext,
): ResourceActionsOperations {
  return {
    ..._getResourceActions(context),
  };
}
