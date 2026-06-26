// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanManagementContext } from "../../api/elasticSanManagementContext.js";
import { list, $delete, create, get } from "../../api/privateEndpointConnections/operations.js";
import {
  PrivateEndpointConnectionsListOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "../../api/privateEndpointConnections/options.js";
import { PrivateEndpointConnection } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** List all Private Endpoint Connections associated with the Elastic San. */
  list: (
    resourceGroupName: string,
    elasticSanName: string,
    options?: PrivateEndpointConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Deletes the specified private endpoint connection associated with the Elastic San */
  delete: (
    resourceGroupName: string,
    elasticSanName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    elasticSanName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    elasticSanName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the state of specified private endpoint connection associated with the Elastic San */
  create: (
    resourceGroupName: string,
    elasticSanName: string,
    privateEndpointConnectionName: string,
    parameters: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOptionalParams,
  ) => PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    elasticSanName: string,
    privateEndpointConnectionName: string,
    parameters: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>
  >;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    elasticSanName: string,
    privateEndpointConnectionName: string,
    parameters: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Gets the specified private endpoint connection associated with the Elastic San */
  get: (
    resourceGroupName: string,
    elasticSanName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getPrivateEndpointConnections(context: ElasticSanManagementContext) {
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
    beginDelete: async (
      resourceGroupName: string,
      elasticSanName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        elasticSanName,
        privateEndpointConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      elasticSanName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        elasticSanName,
        privateEndpointConnectionName,
        options,
      );
    },
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
    beginCreate: async (
      resourceGroupName: string,
      elasticSanName: string,
      privateEndpointConnectionName: string,
      parameters: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        elasticSanName,
        privateEndpointConnectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      elasticSanName: string,
      privateEndpointConnectionName: string,
      parameters: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        elasticSanName,
        privateEndpointConnectionName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      elasticSanName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, elasticSanName, privateEndpointConnectionName, options),
  };
}

export function _getPrivateEndpointConnectionsOperations(
  context: ElasticSanManagementContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
