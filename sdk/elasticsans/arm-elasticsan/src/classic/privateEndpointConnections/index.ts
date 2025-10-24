// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ElasticSanContext } from "../../api/elasticSanContext.js";
import { list, $delete, create, get } from "../../api/privateEndpointConnections/operations.js";
import type {
  PrivateEndpointConnectionsListOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "../../api/privateEndpointConnections/options.js";
import type { PrivateEndpointConnection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** List all Private Endpoint Connections associated with the Elastic San. */
  list: (
    resourceGroupName: string,
    elasticSanName: string,
    options?: PrivateEndpointConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Deletes the specified private endpoint connection associated with the Elastic San */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    elasticSanName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update the state of specified private endpoint connection associated with the Elastic San */
  create: (
    resourceGroupName: string,
    elasticSanName: string,
    privateEndpointConnectionName: string,
    parameters: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOptionalParams,
  ) => PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
  /** Gets the specified private endpoint connection associated with the Elastic San */
  get: (
    resourceGroupName: string,
    elasticSanName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getPrivateEndpointConnections(context: ElasticSanContext) {
  return {
    list: (
      resourceGroupName: string,
      elasticSanName: string,
      options?: PrivateEndpointConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, elasticSanName, options),
    delete: (
      resourceGroupName: string,
      elasticSanName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, elasticSanName, privateEndpointConnectionName, options),
    create: (
      resourceGroupName: string,
      elasticSanName: string,
      privateEndpointConnectionName: string,
      parameters: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        elasticSanName,
        privateEndpointConnectionName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      elasticSanName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, elasticSanName, privateEndpointConnectionName, options),
  };
}

export function _getPrivateEndpointConnectionsOperations(
  context: ElasticSanContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
