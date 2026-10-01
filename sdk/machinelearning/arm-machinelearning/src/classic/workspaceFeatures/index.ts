// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list } from "../../api/workspaceFeatures/operations.js";
import type { WorkspaceFeaturesListOptionalParams } from "../../api/workspaceFeatures/options.js";
import type { AmlUserFeature } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceFeatures operations. */
export interface WorkspaceFeaturesOperations {
  /** Lists all enabled features for a workspace */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspaceFeaturesListOptionalParams,
  ) => PagedAsyncIterableIterator<AmlUserFeature>;
}

function _getWorkspaceFeatures(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspaceFeaturesListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
  };
}

export function _getWorkspaceFeaturesOperations(
  context: AzureMachineLearningServicesManagementContext,
): WorkspaceFeaturesOperations {
  return {
    ..._getWorkspaceFeatures(context),
  };
}
