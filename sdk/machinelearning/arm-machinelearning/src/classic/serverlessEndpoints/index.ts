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
  PartialMinimalTrackedResourceWithSkuAndIdentity,
  RegenerateEndpointKeysRequest,
  ServerlessEndpoint,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use regenerateKeys instead */
  beginRegenerateKeys: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: RegenerateEndpointKeysRequest,
    options?: ServerlessEndpointsRegenerateKeysOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EndpointAuthKeys>, EndpointAuthKeys>>;
  /** @deprecated use regenerateKeys instead */
  beginRegenerateKeysAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: RegenerateEndpointKeysRequest,
    options?: ServerlessEndpointsRegenerateKeysOptionalParams,
  ) => Promise<EndpointAuthKeys>;
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
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: ServerlessEndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: ServerlessEndpointsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: ServerlessEndpointsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update Serverless Endpoint (asynchronous). */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: PartialMinimalTrackedResourceWithSkuAndIdentity,
    options?: ServerlessEndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<ServerlessEndpoint>, ServerlessEndpoint>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: PartialMinimalTrackedResourceWithSkuAndIdentity,
    options?: ServerlessEndpointsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ServerlessEndpoint>, ServerlessEndpoint>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: PartialMinimalTrackedResourceWithSkuAndIdentity,
    options?: ServerlessEndpointsUpdateOptionalParams,
  ) => Promise<ServerlessEndpoint>;
  /** Create or update Serverless Endpoint (asynchronous). */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: ServerlessEndpoint,
    options?: ServerlessEndpointsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ServerlessEndpoint>, ServerlessEndpoint>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: ServerlessEndpoint,
    options?: ServerlessEndpointsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ServerlessEndpoint>, ServerlessEndpoint>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: ServerlessEndpoint,
    options?: ServerlessEndpointsCreateOrUpdateOptionalParams,
  ) => Promise<ServerlessEndpoint>;
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
    beginRegenerateKeys: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: RegenerateEndpointKeysRequest,
      options?: ServerlessEndpointsRegenerateKeysOptionalParams,
    ) => {
      const poller = regenerateKeys(context, resourceGroupName, workspaceName, name, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRegenerateKeysAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: RegenerateEndpointKeysRequest,
      options?: ServerlessEndpointsRegenerateKeysOptionalParams,
    ) => {
      return await regenerateKeys(context, resourceGroupName, workspaceName, name, body, options);
    },
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
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: ServerlessEndpointsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, workspaceName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: ServerlessEndpointsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, workspaceName, name, options);
    },
    update: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: PartialMinimalTrackedResourceWithSkuAndIdentity,
      options?: ServerlessEndpointsUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, name, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: PartialMinimalTrackedResourceWithSkuAndIdentity,
      options?: ServerlessEndpointsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, workspaceName, name, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: PartialMinimalTrackedResourceWithSkuAndIdentity,
      options?: ServerlessEndpointsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, workspaceName, name, body, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: ServerlessEndpoint,
      options?: ServerlessEndpointsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: ServerlessEndpoint,
      options?: ServerlessEndpointsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, workspaceName, name, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: ServerlessEndpoint,
      options?: ServerlessEndpointsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, workspaceName, name, body, options);
    },
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
