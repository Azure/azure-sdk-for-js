// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PurviewManagementContext } from "../../api/purviewManagementContext.js";
import { updateStatus, list } from "../../api/ingestionPrivateEndpointConnections/operations.js";
import type {
  IngestionPrivateEndpointConnectionsUpdateStatusOptionalParams,
  IngestionPrivateEndpointConnectionsListOptionalParams,
} from "../../api/ingestionPrivateEndpointConnections/options.js";
import type {
  PrivateEndpointConnection,
  PrivateEndpointConnectionStatusUpdateRequest,
  PrivateEndpointConnectionStatusUpdateResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a IngestionPrivateEndpointConnections operations. */
export interface IngestionPrivateEndpointConnectionsOperations {
  /** Update ingestion private endpoint connection status */
  updateStatus: (
    resourceGroupName: string,
    accountName: string,
    request: PrivateEndpointConnectionStatusUpdateRequest,
    options?: IngestionPrivateEndpointConnectionsUpdateStatusOptionalParams,
  ) => Promise<PrivateEndpointConnectionStatusUpdateResponse>;
  /** Lists all ingestion private endpoint connections */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: IngestionPrivateEndpointConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
}

function _getIngestionPrivateEndpointConnections(context: PurviewManagementContext) {
  return {
    updateStatus: (
      resourceGroupName: string,
      accountName: string,
      request: PrivateEndpointConnectionStatusUpdateRequest,
      options?: IngestionPrivateEndpointConnectionsUpdateStatusOptionalParams,
    ) => updateStatus(context, resourceGroupName, accountName, request, options),
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: IngestionPrivateEndpointConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
  };
}

export function _getIngestionPrivateEndpointConnectionsOperations(
  context: PurviewManagementContext,
): IngestionPrivateEndpointConnectionsOperations {
  return {
    ..._getIngestionPrivateEndpointConnections(context),
  };
}
