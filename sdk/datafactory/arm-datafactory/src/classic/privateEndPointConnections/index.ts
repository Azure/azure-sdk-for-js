// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import { listByFactory } from "../../api/privateEndPointConnections/operations.js";
import type { PrivateEndPointConnectionsListByFactoryOptionalParams } from "../../api/privateEndPointConnections/options.js";
import type { PrivateEndpointConnectionResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateEndPointConnections operations. */
export interface PrivateEndPointConnectionsOperations {
  /** Lists Private endpoint connections */
  listByFactory: (
    resourceGroupName: string,
    factoryName: string,
    options?: PrivateEndPointConnectionsListByFactoryOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnectionResource>;
}

function _getPrivateEndPointConnections(context: DataFactoryManagementContext) {
  return {
    listByFactory: (
      resourceGroupName: string,
      factoryName: string,
      options?: PrivateEndPointConnectionsListByFactoryOptionalParams,
    ) => listByFactory(context, resourceGroupName, factoryName, options),
  };
}

export function _getPrivateEndPointConnectionsOperations(
  context: DataFactoryManagementContext,
): PrivateEndPointConnectionsOperations {
  return {
    ..._getPrivateEndPointConnections(context),
  };
}
