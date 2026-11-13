// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByAiGateway,
  $delete,
  createOrUpdate,
  get,
} from "../../api/aiGatewayPrivateEndpointConnections/operations.js";
import type {
  AiGatewayPrivateEndpointConnectionsListByAiGatewayOptionalParams,
  AiGatewayPrivateEndpointConnectionsDeleteOptionalParams,
  AiGatewayPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  AiGatewayPrivateEndpointConnectionsGetOptionalParams,
} from "../../api/aiGatewayPrivateEndpointConnections/options.js";
import type { AiGatewayPrivateEndpointConnection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AiGatewayPrivateEndpointConnections operations. */
export interface AiGatewayPrivateEndpointConnectionsOperations {
  /** List AiGatewayResource PrivateEndpointConnections */
  listByAiGateway: (
    resourceGroupName: string,
    aiGatewayName: string,
    options?: AiGatewayPrivateEndpointConnectionsListByAiGatewayOptionalParams,
  ) => PagedAsyncIterableIterator<AiGatewayPrivateEndpointConnection>;
  /** Deletes a private endpoint connection. Until the connection is removed, `properties.provisioningState` is `Deleting`. */
  delete: (
    resourceGroupName: string,
    aiGatewayName: string,
    privateEndpointConnectionName: string,
    options?: AiGatewayPrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Approves or rejects a private endpoint connection. While the decision is applied, `properties.provisioningState` is `Updating`, a service-defined value of the extensible provisioning state. */
  createOrUpdate: (
    resourceGroupName: string,
    aiGatewayName: string,
    privateEndpointConnectionName: string,
    resource: AiGatewayPrivateEndpointConnection,
    options?: AiGatewayPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<AiGatewayPrivateEndpointConnection>,
    AiGatewayPrivateEndpointConnection
  >;
  /** Get a AiGatewayResource PrivateEndpointConnection */
  get: (
    resourceGroupName: string,
    aiGatewayName: string,
    privateEndpointConnectionName: string,
    options?: AiGatewayPrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<AiGatewayPrivateEndpointConnection>;
}

function _getAiGatewayPrivateEndpointConnections(context: ApiManagementContext) {
  return {
    listByAiGateway: (
      resourceGroupName: string,
      aiGatewayName: string,
      options?: AiGatewayPrivateEndpointConnectionsListByAiGatewayOptionalParams,
    ) => listByAiGateway(context, resourceGroupName, aiGatewayName, options),
    delete: (
      resourceGroupName: string,
      aiGatewayName: string,
      privateEndpointConnectionName: string,
      options?: AiGatewayPrivateEndpointConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, aiGatewayName, privateEndpointConnectionName, options),
    createOrUpdate: (
      resourceGroupName: string,
      aiGatewayName: string,
      privateEndpointConnectionName: string,
      resource: AiGatewayPrivateEndpointConnection,
      options?: AiGatewayPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        aiGatewayName,
        privateEndpointConnectionName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      aiGatewayName: string,
      privateEndpointConnectionName: string,
      options?: AiGatewayPrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, aiGatewayName, privateEndpointConnectionName, options),
  };
}

export function _getAiGatewayPrivateEndpointConnectionsOperations(
  context: ApiManagementContext,
): AiGatewayPrivateEndpointConnectionsOperations {
  return {
    ..._getAiGatewayPrivateEndpointConnections(context),
  };
}
