// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/instancePools/operations.js";
import type {
  InstancePoolsListOptionalParams,
  InstancePoolsListByResourceGroupOptionalParams,
  InstancePoolsDeleteOptionalParams,
  InstancePoolsUpdateOptionalParams,
  InstancePoolsCreateOrUpdateOptionalParams,
  InstancePoolsGetOptionalParams,
} from "../../api/instancePools/options.js";
import type { InstancePool, InstancePoolUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a InstancePools operations. */
export interface InstancePoolsOperations {
  /** Gets a list of all instance pools in the subscription. */
  list: (options?: InstancePoolsListOptionalParams) => PagedAsyncIterableIterator<InstancePool>;
  /** Gets a list of instance pools in the resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: InstancePoolsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<InstancePool>;
  /** Deletes an instance pool */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    instancePoolName: string,
    options?: InstancePoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    instancePoolName: string,
    options?: InstancePoolsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    instancePoolName: string,
    options?: InstancePoolsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an instance pool. */
  update: (
    resourceGroupName: string,
    instancePoolName: string,
    parameters: InstancePoolUpdate,
    options?: InstancePoolsUpdateOptionalParams,
  ) => PollerLike<OperationState<InstancePool>, InstancePool>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    instancePoolName: string,
    parameters: InstancePoolUpdate,
    options?: InstancePoolsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InstancePool>, InstancePool>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    instancePoolName: string,
    parameters: InstancePoolUpdate,
    options?: InstancePoolsUpdateOptionalParams,
  ) => Promise<InstancePool>;
  /** Creates or updates an instance pool. */
  createOrUpdate: (
    resourceGroupName: string,
    instancePoolName: string,
    parameters: InstancePool,
    options?: InstancePoolsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<InstancePool>, InstancePool>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    instancePoolName: string,
    parameters: InstancePool,
    options?: InstancePoolsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InstancePool>, InstancePool>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    instancePoolName: string,
    parameters: InstancePool,
    options?: InstancePoolsCreateOrUpdateOptionalParams,
  ) => Promise<InstancePool>;
  /** Gets an instance pool. */
  get: (
    resourceGroupName: string,
    instancePoolName: string,
    options?: InstancePoolsGetOptionalParams,
  ) => Promise<InstancePool>;
}

function _getInstancePools(context: SqlManagementContext) {
  return {
    list: (options?: InstancePoolsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: InstancePoolsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      instancePoolName: string,
      options?: InstancePoolsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, instancePoolName, options),
    beginDelete: async (
      resourceGroupName: string,
      instancePoolName: string,
      options?: InstancePoolsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, instancePoolName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      instancePoolName: string,
      options?: InstancePoolsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, instancePoolName, options);
    },
    update: (
      resourceGroupName: string,
      instancePoolName: string,
      parameters: InstancePoolUpdate,
      options?: InstancePoolsUpdateOptionalParams,
    ) => update(context, resourceGroupName, instancePoolName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      instancePoolName: string,
      parameters: InstancePoolUpdate,
      options?: InstancePoolsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, instancePoolName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      instancePoolName: string,
      parameters: InstancePoolUpdate,
      options?: InstancePoolsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, instancePoolName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      instancePoolName: string,
      parameters: InstancePool,
      options?: InstancePoolsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, instancePoolName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      instancePoolName: string,
      parameters: InstancePool,
      options?: InstancePoolsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        instancePoolName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      instancePoolName: string,
      parameters: InstancePool,
      options?: InstancePoolsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        instancePoolName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      instancePoolName: string,
      options?: InstancePoolsGetOptionalParams,
    ) => get(context, resourceGroupName, instancePoolName, options),
  };
}

export function _getInstancePoolsOperations(
  context: SqlManagementContext,
): InstancePoolsOperations {
  return {
    ..._getInstancePools(context),
  };
}
