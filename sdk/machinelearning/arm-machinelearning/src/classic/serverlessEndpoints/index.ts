// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  regenerateKeys,
  listKeys,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/serverlessEndpoints/operations.js";
import type {
  ServerlessEndpointsRegenerateKeysOptionalParams,
  ServerlessEndpointsListKeysOptionalParams,
  ServerlessEndpointsListOptionalParams,
  ServerlessEndpointsDeleteOptionalParams,
  ServerlessEndpointsUpdateOptionalParams,
  ServerlessEndpointsCreateOrUpdateOptionalParams,
  ServerlessEndpointsGetOptionalParams,
} from "../../api/serverlessEndpoints/options.js";
import type {
  EndpointAuthKeys,
  RegenerateEndpointKeysRequest,
  ServerlessEndpoint,
  PartialMinimalTrackedResourceWithSkuAndIdentity,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServerlessEndpoints operations. */
export interface ServerlessEndpointsOperations {
  /** Regenerate EndpointAuthKeys for an Endpoint using Key-based authentication (asynchronous). */
  regenerateKeys: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: RegenerateEndpointKeysRequest,
    options?: ServerlessEndpointsRegenerateKeysOptionalParams,
  ) => PollerLike<OperationState<EndpointAuthKeys>, EndpointAuthKeys>;
  /** List EndpointAuthKeys for an Endpoint using Key-based authentication. */
  listKeys: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: ServerlessEndpointsListKeysOptionalParams,
  ) => Promise<EndpointAuthKeys>;
  /** List Serverless Endpoints. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ServerlessEndpointsListOptionalParams,
  ) => PagedAsyncIterableIterator<ServerlessEndpoint>;
  /** Delete Serverless Endpoint (asynchronous). */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: ServerlessEndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update Serverless Endpoint (asynchronous). */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: PartialMinimalTrackedResourceWithSkuAndIdentity,
    options?: ServerlessEndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<ServerlessEndpoint>, ServerlessEndpoint>;
  /** Create or update Serverless Endpoint (asynchronous). */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: ServerlessEndpoint,
    options?: ServerlessEndpointsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ServerlessEndpoint>, ServerlessEndpoint>;
  /** Get Serverless Endpoint. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: ServerlessEndpointsGetOptionalParams,
  ) => Promise<ServerlessEndpoint>;
}

function _getServerlessEndpoints(context: AzureMachineLearningServicesManagementContext) {
  return {
    regenerateKeys: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: RegenerateEndpointKeysRequest,
      options?: ServerlessEndpointsRegenerateKeysOptionalParams,
    ) => regenerateKeys(context, resourceGroupName, workspaceName, name, body, options),
    listKeys: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: ServerlessEndpointsListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, workspaceName, name, options),
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: ServerlessEndpointsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: ServerlessEndpointsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, options),
    update: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: PartialMinimalTrackedResourceWithSkuAndIdentity,
      options?: ServerlessEndpointsUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, name, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: ServerlessEndpoint,
      options?: ServerlessEndpointsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: ServerlessEndpointsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, name, options),
  };
}

export function _getServerlessEndpointsOperations(
  context: AzureMachineLearningServicesManagementContext,
): ServerlessEndpointsOperations {
  return {
    ..._getServerlessEndpoints(context),
  };
}
