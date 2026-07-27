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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use regenerateKeys instead */
  beginRegenerateKeys: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: RegenerateEndpointKeysRequest,
    options?: OnlineEndpointsRegenerateKeysOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use regenerateKeys instead */
  beginRegenerateKeysAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: RegenerateEndpointKeysRequest,
    options?: OnlineEndpointsRegenerateKeysOptionalParams,
  ) => Promise<void>;
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
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: OnlineEndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: OnlineEndpointsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: OnlineEndpointsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update Online Endpoint (asynchronous). */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: PartialMinimalTrackedResourceWithIdentity,
    options?: OnlineEndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<OnlineEndpoint>, OnlineEndpoint>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: PartialMinimalTrackedResourceWithIdentity,
    options?: OnlineEndpointsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OnlineEndpoint>, OnlineEndpoint>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: PartialMinimalTrackedResourceWithIdentity,
    options?: OnlineEndpointsUpdateOptionalParams,
  ) => Promise<OnlineEndpoint>;
  /** Create or update Online Endpoint (asynchronous). */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: OnlineEndpoint,
    options?: OnlineEndpointsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<OnlineEndpoint>, OnlineEndpoint>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: OnlineEndpoint,
    options?: OnlineEndpointsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OnlineEndpoint>, OnlineEndpoint>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: OnlineEndpoint,
    options?: OnlineEndpointsCreateOrUpdateOptionalParams,
  ) => Promise<OnlineEndpoint>;
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
    beginRegenerateKeys: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: RegenerateEndpointKeysRequest,
      options?: OnlineEndpointsRegenerateKeysOptionalParams,
    ) => {
      const poller = regenerateKeys(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRegenerateKeysAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: RegenerateEndpointKeysRequest,
      options?: OnlineEndpointsRegenerateKeysOptionalParams,
    ) => {
      return await regenerateKeys(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        body,
        options,
      );
    },
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
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      options?: OnlineEndpointsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, workspaceName, endpointName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      options?: OnlineEndpointsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, workspaceName, endpointName, options);
    },
    update: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: PartialMinimalTrackedResourceWithIdentity,
      options?: OnlineEndpointsUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, endpointName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: PartialMinimalTrackedResourceWithIdentity,
      options?: OnlineEndpointsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, workspaceName, endpointName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: PartialMinimalTrackedResourceWithIdentity,
      options?: OnlineEndpointsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, workspaceName, endpointName, body, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: OnlineEndpoint,
      options?: OnlineEndpointsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, endpointName, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: OnlineEndpoint,
      options?: OnlineEndpointsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      body: OnlineEndpoint,
      options?: OnlineEndpointsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        body,
        options,
      );
    },
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
