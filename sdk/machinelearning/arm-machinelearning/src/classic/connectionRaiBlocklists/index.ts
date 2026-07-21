// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list } from "../../api/connectionRaiBlocklists/operations.js";
import type { ConnectionRaiBlocklistsListOptionalParams } from "../../api/connectionRaiBlocklists/options.js";
import type { RaiBlocklistPropertiesBasicResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConnectionRaiBlocklists operations. */
export interface ConnectionRaiBlocklistsOperations {
  /** Gets the custom blocklists associated with the Azure OpenAI connection. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    options?: ConnectionRaiBlocklistsListOptionalParams,
  ) => PagedAsyncIterableIterator<RaiBlocklistPropertiesBasicResource>;
}

function _getConnectionRaiBlocklists(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      options?: ConnectionRaiBlocklistsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, connectionName, options),
  };
}

export function _getConnectionRaiBlocklistsOperations(
  context: AzureMachineLearningServicesManagementContext,
): ConnectionRaiBlocklistsOperations {
  return {
    ..._getConnectionRaiBlocklists(context),
  };
}
