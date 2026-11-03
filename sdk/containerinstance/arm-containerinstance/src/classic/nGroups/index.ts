// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerInstanceManagementContext } from "../../api/containerInstanceManagementContext.js";
import {
  restart,
  stop,
  start,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/nGroups/operations.js";
import type {
  NGroupsRestartOptionalParams,
  NGroupsStopOptionalParams,
  NGroupsStartOptionalParams,
  NGroupsListOptionalParams,
  NGroupsListByResourceGroupOptionalParams,
  NGroupsDeleteOptionalParams,
  NGroupsUpdateOptionalParams,
  NGroupsCreateOrUpdateOptionalParams,
  NGroupsGetOptionalParams,
} from "../../api/nGroups/options.js";
import type { NGroup, NGroupPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NGroups operations. */
export interface NGroupsOperations {
  /** Restarts all container groups in the specified NGroups resource in place. If container image has updates, new image will be downloaded. */
  restart: (
    resourceGroupName: string,
    ngroupsName: string,
    options?: NGroupsRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restart instead */
  beginRestart: (
    resourceGroupName: string,
    ngroupsName: string,
    options?: NGroupsRestartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restart instead */
  beginRestartAndWait: (
    resourceGroupName: string,
    ngroupsName: string,
    options?: NGroupsRestartOptionalParams,
  ) => Promise<void>;
  /** Stops all container groups in the specified NGroups resource. Compute resources will be deallocated and billing will stop. */
  stop: (
    resourceGroupName: string,
    ngroupsName: string,
    options?: NGroupsStopOptionalParams,
  ) => Promise<void>;
  /** Starts all container groups in the specified NGroups resource. Compute resources will be allocated and billing will start. */
  start: (
    resourceGroupName: string,
    ngroupsName: string,
    options?: NGroupsStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    ngroupsName: string,
    options?: NGroupsStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    ngroupsName: string,
    options?: NGroupsStartOptionalParams,
  ) => Promise<void>;
  /** Gets a list of all NGroups resources under a subscription. */
  list: (options?: NGroupsListOptionalParams) => PagedAsyncIterableIterator<NGroup>;
  /** Gets a list of all NGroups resources under a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NGroupsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NGroup>;
  /** Deletes the NGroups resource. */
  delete: (
    resourceGroupName: string,
    ngroupsName: string,
    options?: NGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    ngroupsName: string,
    options?: NGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    ngroupsName: string,
    options?: NGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a specified NGroups resource. */
  update: (
    resourceGroupName: string,
    ngroupsName: string,
    nGroup: NGroupPatch,
    options?: NGroupsUpdateOptionalParams,
  ) => PollerLike<OperationState<NGroup>, NGroup>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    ngroupsName: string,
    nGroup: NGroupPatch,
    options?: NGroupsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NGroup>, NGroup>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    ngroupsName: string,
    nGroup: NGroupPatch,
    options?: NGroupsUpdateOptionalParams,
  ) => Promise<NGroup>;
  /** Create or update a NGroups resource. */
  createOrUpdate: (
    resourceGroupName: string,
    ngroupsName: string,
    nGroup: NGroup,
    options?: NGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NGroup>, NGroup>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    ngroupsName: string,
    nGroup: NGroup,
    options?: NGroupsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NGroup>, NGroup>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    ngroupsName: string,
    nGroup: NGroup,
    options?: NGroupsCreateOrUpdateOptionalParams,
  ) => Promise<NGroup>;
  /** Get the properties of the specified NGroups resource. */
  get: (
    resourceGroupName: string,
    ngroupsName: string,
    options?: NGroupsGetOptionalParams,
  ) => Promise<NGroup>;
}

function _getNGroups(context: ContainerInstanceManagementContext) {
  return {
    restart: (
      resourceGroupName: string,
      ngroupsName: string,
      options?: NGroupsRestartOptionalParams,
    ) => restart(context, resourceGroupName, ngroupsName, options),
    beginRestart: async (
      resourceGroupName: string,
      ngroupsName: string,
      options?: NGroupsRestartOptionalParams,
    ) => {
      const poller = restart(context, resourceGroupName, ngroupsName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartAndWait: async (
      resourceGroupName: string,
      ngroupsName: string,
      options?: NGroupsRestartOptionalParams,
    ) => {
      return await restart(context, resourceGroupName, ngroupsName, options);
    },
    stop: (resourceGroupName: string, ngroupsName: string, options?: NGroupsStopOptionalParams) =>
      stop(context, resourceGroupName, ngroupsName, options),
    start: (resourceGroupName: string, ngroupsName: string, options?: NGroupsStartOptionalParams) =>
      start(context, resourceGroupName, ngroupsName, options),
    beginStart: async (
      resourceGroupName: string,
      ngroupsName: string,
      options?: NGroupsStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, ngroupsName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      ngroupsName: string,
      options?: NGroupsStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, ngroupsName, options);
    },
    list: (options?: NGroupsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NGroupsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      ngroupsName: string,
      options?: NGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, ngroupsName, options),
    beginDelete: async (
      resourceGroupName: string,
      ngroupsName: string,
      options?: NGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, ngroupsName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      ngroupsName: string,
      options?: NGroupsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, ngroupsName, options);
    },
    update: (
      resourceGroupName: string,
      ngroupsName: string,
      nGroup: NGroupPatch,
      options?: NGroupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, ngroupsName, nGroup, options),
    beginUpdate: async (
      resourceGroupName: string,
      ngroupsName: string,
      nGroup: NGroupPatch,
      options?: NGroupsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, ngroupsName, nGroup, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      ngroupsName: string,
      nGroup: NGroupPatch,
      options?: NGroupsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, ngroupsName, nGroup, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      ngroupsName: string,
      nGroup: NGroup,
      options?: NGroupsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, ngroupsName, nGroup, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      ngroupsName: string,
      nGroup: NGroup,
      options?: NGroupsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, ngroupsName, nGroup, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      ngroupsName: string,
      nGroup: NGroup,
      options?: NGroupsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, ngroupsName, nGroup, options);
    },
    get: (resourceGroupName: string, ngroupsName: string, options?: NGroupsGetOptionalParams) =>
      get(context, resourceGroupName, ngroupsName, options),
  };
}

export function _getNGroupsOperations(
  context: ContainerInstanceManagementContext,
): NGroupsOperations {
  return {
    ..._getNGroups(context),
  };
}
