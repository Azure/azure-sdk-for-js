// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list } from "../../api/connectionRaiBlocklistItems/operations.js";
import type { ConnectionRaiBlocklistItemsListOptionalParams } from "../../api/connectionRaiBlocklistItems/options.js";
import type { RaiBlocklistItemPropertiesBasicResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConnectionRaiBlocklistItems operations. */
export interface ConnectionRaiBlocklistItemsOperations {
  /** Gets the custom blocklist items associated with the Azure OpenAI connection. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    raiBlocklistName: string,
    options?: ConnectionRaiBlocklistItemsListOptionalParams,
  ) => PagedAsyncIterableIterator<RaiBlocklistItemPropertiesBasicResource>;
}

function _getConnectionRaiBlocklistItems(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      raiBlocklistName: string,
      options?: ConnectionRaiBlocklistItemsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, connectionName, raiBlocklistName, options),
  };
}

export function _getConnectionRaiBlocklistItemsOperations(
  context: AzureMachineLearningServicesManagementContext,
): ConnectionRaiBlocklistItemsOperations {
  return {
    ..._getConnectionRaiBlocklistItems(context),
  };
}
