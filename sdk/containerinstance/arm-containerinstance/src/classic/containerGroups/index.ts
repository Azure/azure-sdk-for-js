// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerInstanceManagementContext } from "../../api/containerInstanceManagementContext.js";
import {
  listByResourceGroup,
  list,
  getOutboundNetworkDependenciesEndpoints,
  start,
  stop,
  restart,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/containerGroups/operations.js";
import type {
  ContainerGroupsListByResourceGroupOptionalParams,
  ContainerGroupsListOptionalParams,
  ContainerGroupsGetOutboundNetworkDependenciesEndpointsOptionalParams,
  ContainerGroupsStartOptionalParams,
  ContainerGroupsStopOptionalParams,
  ContainerGroupsRestartOptionalParams,
  ContainerGroupsDeleteOptionalParams,
  ContainerGroupsUpdateOptionalParams,
  ContainerGroupsCreateOrUpdateOptionalParams,
  ContainerGroupsGetOptionalParams,
} from "../../api/containerGroups/options.js";
import type {
  ContainerGroup,
  Resource,
  ContainerGroupsGetOutboundNetworkDependenciesEndpointsResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ContainerGroups operations. */
export interface ContainerGroupsOperations {
  /** Get a list of container groups in a specified subscription and resource group. This operation returns properties of each container group including containers, image registry credentials, restart policy, IP address type, OS type, state, and volumes. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ContainerGroupsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ContainerGroup>;
  /** Get a list of container groups in the specified subscription. This operation returns properties of each container group including containers, image registry credentials, restart policy, IP address type, OS type, state, and volumes. */
  list: (options?: ContainerGroupsListOptionalParams) => PagedAsyncIterableIterator<ContainerGroup>;
  /** Gets all the network dependencies for this container group to allow complete control of network setting and configuration. For container groups, this will always be an empty list. */
  getOutboundNetworkDependenciesEndpoints: (
    resourceGroupName: string,
    containerGroupName: string,
    options?: ContainerGroupsGetOutboundNetworkDependenciesEndpointsOptionalParams,
  ) => Promise<ContainerGroupsGetOutboundNetworkDependenciesEndpointsResponse>;
  /** Starts all containers in a container group. Compute resources will be allocated and billing will start. */
  start: (
    resourceGroupName: string,
    containerGroupName: string,
    options?: ContainerGroupsStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    containerGroupName: string,
    options?: ContainerGroupsStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    containerGroupName: string,
    options?: ContainerGroupsStartOptionalParams,
  ) => Promise<void>;
  /** Stops all containers in a container group. Compute resources will be deallocated and billing will stop. */
  stop: (
    resourceGroupName: string,
    containerGroupName: string,
    options?: ContainerGroupsStopOptionalParams,
  ) => Promise<void>;
  /** Restarts all containers in a container group in place. If container image has updates, new image will be downloaded. */
  restart: (
    resourceGroupName: string,
    containerGroupName: string,
    options?: ContainerGroupsRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restart instead */
  beginRestart: (
    resourceGroupName: string,
    containerGroupName: string,
    options?: ContainerGroupsRestartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restart instead */
  beginRestartAndWait: (
    resourceGroupName: string,
    containerGroupName: string,
    options?: ContainerGroupsRestartOptionalParams,
  ) => Promise<void>;
  /** Delete the specified container group in the specified subscription and resource group. The operation does not delete other resources provided by the user, such as volumes. */
  delete: (
    resourceGroupName: string,
    containerGroupName: string,
    options?: ContainerGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<ContainerGroup>, ContainerGroup>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    containerGroupName: string,
    options?: ContainerGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ContainerGroup>, ContainerGroup>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    containerGroupName: string,
    options?: ContainerGroupsDeleteOptionalParams,
  ) => Promise<ContainerGroup>;
  /** Updates container group tags with specified values. */
  update: (
    resourceGroupName: string,
    containerGroupName: string,
    resource: Resource,
    options?: ContainerGroupsUpdateOptionalParams,
  ) => Promise<ContainerGroup>;
  /** Create or update container groups with specified configurations. */
  createOrUpdate: (
    resourceGroupName: string,
    containerGroupName: string,
    containerGroup: ContainerGroup,
    options?: ContainerGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ContainerGroup>, ContainerGroup>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    containerGroupName: string,
    containerGroup: ContainerGroup,
    options?: ContainerGroupsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ContainerGroup>, ContainerGroup>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    containerGroupName: string,
    containerGroup: ContainerGroup,
    options?: ContainerGroupsCreateOrUpdateOptionalParams,
  ) => Promise<ContainerGroup>;
  /** Gets the properties of the specified container group in the specified subscription and resource group. The operation returns the properties of each container group including containers, image registry credentials, restart policy, IP address type, OS type, state, and volumes. */
  get: (
    resourceGroupName: string,
    containerGroupName: string,
    options?: ContainerGroupsGetOptionalParams,
  ) => Promise<ContainerGroup>;
}

function _getContainerGroups(context: ContainerInstanceManagementContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ContainerGroupsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    list: (options?: ContainerGroupsListOptionalParams) => list(context, options),
    getOutboundNetworkDependenciesEndpoints: (
      resourceGroupName: string,
      containerGroupName: string,
      options?: ContainerGroupsGetOutboundNetworkDependenciesEndpointsOptionalParams,
    ) =>
      getOutboundNetworkDependenciesEndpoints(
        context,
        resourceGroupName,
        containerGroupName,
        options,
      ),
    start: (
      resourceGroupName: string,
      containerGroupName: string,
      options?: ContainerGroupsStartOptionalParams,
    ) => start(context, resourceGroupName, containerGroupName, options),
    beginStart: async (
      resourceGroupName: string,
      containerGroupName: string,
      options?: ContainerGroupsStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, containerGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      containerGroupName: string,
      options?: ContainerGroupsStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, containerGroupName, options);
    },
    stop: (
      resourceGroupName: string,
      containerGroupName: string,
      options?: ContainerGroupsStopOptionalParams,
    ) => stop(context, resourceGroupName, containerGroupName, options),
    restart: (
      resourceGroupName: string,
      containerGroupName: string,
      options?: ContainerGroupsRestartOptionalParams,
    ) => restart(context, resourceGroupName, containerGroupName, options),
    beginRestart: async (
      resourceGroupName: string,
      containerGroupName: string,
      options?: ContainerGroupsRestartOptionalParams,
    ) => {
      const poller = restart(context, resourceGroupName, containerGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartAndWait: async (
      resourceGroupName: string,
      containerGroupName: string,
      options?: ContainerGroupsRestartOptionalParams,
    ) => {
      return await restart(context, resourceGroupName, containerGroupName, options);
    },
    delete: (
      resourceGroupName: string,
      containerGroupName: string,
      options?: ContainerGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, containerGroupName, options),
    beginDelete: async (
      resourceGroupName: string,
      containerGroupName: string,
      options?: ContainerGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, containerGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      containerGroupName: string,
      options?: ContainerGroupsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, containerGroupName, options);
    },
    update: (
      resourceGroupName: string,
      containerGroupName: string,
      resource: Resource,
      options?: ContainerGroupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, containerGroupName, resource, options),
    createOrUpdate: (
      resourceGroupName: string,
      containerGroupName: string,
      containerGroup: ContainerGroup,
      options?: ContainerGroupsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, containerGroupName, containerGroup, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      containerGroupName: string,
      containerGroup: ContainerGroup,
      options?: ContainerGroupsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        containerGroupName,
        containerGroup,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      containerGroupName: string,
      containerGroup: ContainerGroup,
      options?: ContainerGroupsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        containerGroupName,
        containerGroup,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      containerGroupName: string,
      options?: ContainerGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, containerGroupName, options),
  };
}

export function _getContainerGroupsOperations(
  context: ContainerInstanceManagementContext,
): ContainerGroupsOperations {
  return {
    ..._getContainerGroups(context),
  };
}
