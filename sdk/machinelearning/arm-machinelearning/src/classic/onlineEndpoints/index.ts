// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  getToken,
  regenerateKeys,
  listKeys,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/onlineEndpoints/operations.js";
import type {
  OnlineEndpointsGetTokenOptionalParams,
  OnlineEndpointsRegenerateKeysOptionalParams,
  OnlineEndpointsListKeysOptionalParams,
  OnlineEndpointsListOptionalParams,
  OnlineEndpointsDeleteOptionalParams,
  OnlineEndpointsUpdateOptionalParams,
  OnlineEndpointsCreateOrUpdateOptionalParams,
  OnlineEndpointsGetOptionalParams,
} from "../../api/onlineEndpoints/options.js";
import type {
  EndpointAuthKeys,
  PartialMinimalTrackedResourceWithIdentity,
  OnlineEndpoint,
  RegenerateEndpointKeysRequest,
  EndpointAuthToken,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a OnlineEndpoints operations. */
export interface OnlineEndpointsOperations {
  /** Retrieve a valid AML token for an Endpoint using AMLToken-based authentication. */
  getToken: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: OnlineEndpointsGetTokenOptionalParams,
  ) => Promise<EndpointAuthToken>;
  /** Regenerate EndpointAuthKeys for an Endpoint using Key-based authentication (asynchronous). */
  regenerateKeys: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: RegenerateEndpointKeysRequest,
    options?: OnlineEndpointsRegenerateKeysOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List EndpointAuthKeys for an Endpoint using Key-based authentication. */
  listKeys: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: OnlineEndpointsListKeysOptionalParams,
  ) => Promise<EndpointAuthKeys>;
  /** List Online Endpoints. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: OnlineEndpointsListOptionalParams,
  ) => PagedAsyncIterableIterator<OnlineEndpoint>;
  /** Delete Online Endpoint (asynchronous). */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: OnlineEndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update Online Endpoint (asynchronous). */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: PartialMinimalTrackedResourceWithIdentity,
    options?: OnlineEndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<OnlineEndpoint>, OnlineEndpoint>;
  /** Create or update Online Endpoint (asynchronous). */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: OnlineEndpoint,
    options?: OnlineEndpointsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<OnlineEndpoint>, OnlineEndpoint>;
  /** Get Online Endpoint. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: OnlineEndpointsGetOptionalParams,
  ) => Promise<OnlineEndpoint>;
}

function _getOnlineEndpoints(context: AzureMachineLearningServicesManagementContext) {
  return {
    getToken: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      options?: OnlineEndpointsGetTokenOptionalParams,
    ) => getToken(context, resourceGroupName, workspaceName, endpointName, options),
    regenerateKeys: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: RegenerateEndpointKeysRequest,
      options?: OnlineEndpointsRegenerateKeysOptionalParams,
    ) => regenerateKeys(context, resourceGroupName, workspaceName, endpointName, body, options),
    listKeys: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      options?: OnlineEndpointsListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, workspaceName, endpointName, options),
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: OnlineEndpointsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      options?: OnlineEndpointsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, endpointName, options),
    update: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: PartialMinimalTrackedResourceWithIdentity,
      options?: OnlineEndpointsUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, endpointName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: OnlineEndpoint,
      options?: OnlineEndpointsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, endpointName, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      options?: OnlineEndpointsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, endpointName, options),
  };
}

export function _getOnlineEndpointsOperations(
  context: AzureMachineLearningServicesManagementContext,
): OnlineEndpointsOperations {
  return {
    ..._getOnlineEndpoints(context),
  };
}
