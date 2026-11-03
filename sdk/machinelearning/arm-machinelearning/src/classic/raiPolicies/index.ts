// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list } from "../../api/raiPolicies/operations.js";
import type { RaiPoliciesListOptionalParams } from "../../api/raiPolicies/options.js";
import type { RaiPolicyPropertiesBasicResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RaiPolicies operations. */
export interface RaiPoliciesOperations {
  /** List the specified Content Filters associated with the Azure OpenAI account. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: RaiPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<RaiPolicyPropertiesBasicResource>;
}

function _getRaiPolicies(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      options?: RaiPoliciesListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, endpointName, options),
  };
}

export function _getRaiPoliciesOperations(
  context: AzureMachineLearningServicesManagementContext,
): RaiPoliciesOperations {
  return {
    ..._getRaiPolicies(context),
  };
}
