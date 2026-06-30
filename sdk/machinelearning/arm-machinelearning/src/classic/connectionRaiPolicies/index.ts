// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list } from "../../api/connectionRaiPolicies/operations.js";
import type { ConnectionRaiPoliciesListOptionalParams } from "../../api/connectionRaiPolicies/options.js";
import type { RaiPolicyPropertiesBasicResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConnectionRaiPolicies operations. */
export interface ConnectionRaiPoliciesOperations {
  /** List the specified Content Filters associated with the Azure OpenAI connection. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    options?: ConnectionRaiPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<RaiPolicyPropertiesBasicResource>;
}

function _getConnectionRaiPolicies(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      options?: ConnectionRaiPoliciesListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, connectionName, options),
  };
}

export function _getConnectionRaiPoliciesOperations(
  context: AzureMachineLearningServicesManagementContext,
): ConnectionRaiPoliciesOperations {
  return {
    ..._getConnectionRaiPolicies(context),
  };
}
