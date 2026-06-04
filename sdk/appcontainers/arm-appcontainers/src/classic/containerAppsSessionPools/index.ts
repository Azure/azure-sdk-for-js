// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  rotateMcpServerCredentials,
  fetchMcpServerCredentials,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/containerAppsSessionPools/operations.js";
import {
  ContainerAppsSessionPoolsRotateMcpServerCredentialsOptionalParams,
  ContainerAppsSessionPoolsFetchMcpServerCredentialsOptionalParams,
  ContainerAppsSessionPoolsListBySubscriptionOptionalParams,
  ContainerAppsSessionPoolsListByResourceGroupOptionalParams,
  ContainerAppsSessionPoolsDeleteOptionalParams,
  ContainerAppsSessionPoolsUpdateOptionalParams,
  ContainerAppsSessionPoolsCreateOrUpdateOptionalParams,
  ContainerAppsSessionPoolsGetOptionalParams,
} from "../../api/containerAppsSessionPools/options.js";
import {
  SessionPool,
  SessionPoolUpdatableProperties,
  McpServerCredential,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ContainerAppsSessionPools operations. */
export interface ContainerAppsSessionPoolsOperations {
  /** Rotate and fetch the rotated MCP server credentials of a session pool. */
  rotateMcpServerCredentials: (
    resourceGroupName: string,
    sessionPoolName: string,
    options?: ContainerAppsSessionPoolsRotateMcpServerCredentialsOptionalParams,
  ) => Promise<McpServerCredential>;
  /** Fetch the MCP server credentials of a session pool. */
  fetchMcpServerCredentials: (
    resourceGroupName: string,
    sessionPoolName: string,
    options?: ContainerAppsSessionPoolsFetchMcpServerCredentialsOptionalParams,
  ) => Promise<McpServerCredential>;
  /** Get the session pools in a given subscription. */
  listBySubscription: (
    options?: ContainerAppsSessionPoolsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<SessionPool>;
  /** Get the session pools in a given resource group of a subscription. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ContainerAppsSessionPoolsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SessionPool>;
  /** Delete the session pool with the given name. */
  delete: (
    resourceGroupName: string,
    sessionPoolName: string,
    options?: ContainerAppsSessionPoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    sessionPoolName: string,
    options?: ContainerAppsSessionPoolsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    sessionPoolName: string,
    options?: ContainerAppsSessionPoolsDeleteOptionalParams,
  ) => Promise<void>;
  /** Patches a session pool using JSON merge patch */
  update: (
    resourceGroupName: string,
    sessionPoolName: string,
    sessionPoolEnvelope: SessionPoolUpdatableProperties,
    options?: ContainerAppsSessionPoolsUpdateOptionalParams,
  ) => PollerLike<OperationState<SessionPool>, SessionPool>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    sessionPoolName: string,
    sessionPoolEnvelope: SessionPoolUpdatableProperties,
    options?: ContainerAppsSessionPoolsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SessionPool>, SessionPool>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    sessionPoolName: string,
    sessionPoolEnvelope: SessionPoolUpdatableProperties,
    options?: ContainerAppsSessionPoolsUpdateOptionalParams,
  ) => Promise<SessionPool>;
  /** Create or update a session pool with the given properties. */
  createOrUpdate: (
    resourceGroupName: string,
    sessionPoolName: string,
    sessionPoolEnvelope: SessionPool,
    options?: ContainerAppsSessionPoolsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SessionPool>, SessionPool>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    sessionPoolName: string,
    sessionPoolEnvelope: SessionPool,
    options?: ContainerAppsSessionPoolsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SessionPool>, SessionPool>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    sessionPoolName: string,
    sessionPoolEnvelope: SessionPool,
    options?: ContainerAppsSessionPoolsCreateOrUpdateOptionalParams,
  ) => Promise<SessionPool>;
  /** Get the properties of a session pool. */
  get: (
    resourceGroupName: string,
    sessionPoolName: string,
    options?: ContainerAppsSessionPoolsGetOptionalParams,
  ) => Promise<SessionPool>;
}

function _getContainerAppsSessionPools(context: ContainerAppsAPIContext) {
  return {
    rotateMcpServerCredentials: (
      resourceGroupName: string,
      sessionPoolName: string,
      options?: ContainerAppsSessionPoolsRotateMcpServerCredentialsOptionalParams,
    ) => rotateMcpServerCredentials(context, resourceGroupName, sessionPoolName, options),
    fetchMcpServerCredentials: (
      resourceGroupName: string,
      sessionPoolName: string,
      options?: ContainerAppsSessionPoolsFetchMcpServerCredentialsOptionalParams,
    ) => fetchMcpServerCredentials(context, resourceGroupName, sessionPoolName, options),
    listBySubscription: (options?: ContainerAppsSessionPoolsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ContainerAppsSessionPoolsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      sessionPoolName: string,
      options?: ContainerAppsSessionPoolsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, sessionPoolName, options),
    beginDelete: async (
      resourceGroupName: string,
      sessionPoolName: string,
      options?: ContainerAppsSessionPoolsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, sessionPoolName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      sessionPoolName: string,
      options?: ContainerAppsSessionPoolsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, sessionPoolName, options);
    },
    update: (
      resourceGroupName: string,
      sessionPoolName: string,
      sessionPoolEnvelope: SessionPoolUpdatableProperties,
      options?: ContainerAppsSessionPoolsUpdateOptionalParams,
    ) => update(context, resourceGroupName, sessionPoolName, sessionPoolEnvelope, options),
    beginUpdate: async (
      resourceGroupName: string,
      sessionPoolName: string,
      sessionPoolEnvelope: SessionPoolUpdatableProperties,
      options?: ContainerAppsSessionPoolsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        sessionPoolName,
        sessionPoolEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      sessionPoolName: string,
      sessionPoolEnvelope: SessionPoolUpdatableProperties,
      options?: ContainerAppsSessionPoolsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        sessionPoolName,
        sessionPoolEnvelope,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      sessionPoolName: string,
      sessionPoolEnvelope: SessionPool,
      options?: ContainerAppsSessionPoolsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, sessionPoolName, sessionPoolEnvelope, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      sessionPoolName: string,
      sessionPoolEnvelope: SessionPool,
      options?: ContainerAppsSessionPoolsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        sessionPoolName,
        sessionPoolEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      sessionPoolName: string,
      sessionPoolEnvelope: SessionPool,
      options?: ContainerAppsSessionPoolsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        sessionPoolName,
        sessionPoolEnvelope,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      sessionPoolName: string,
      options?: ContainerAppsSessionPoolsGetOptionalParams,
    ) => get(context, resourceGroupName, sessionPoolName, options),
  };
}

export function _getContainerAppsSessionPoolsOperations(
  context: ContainerAppsAPIContext,
): ContainerAppsSessionPoolsOperations {
  return {
    ..._getContainerAppsSessionPools(context),
  };
}
