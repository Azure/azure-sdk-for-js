// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  listBySandboxGroup,
  $delete,
  createOrUpdate,
  get,
} from "../../api/vnetConnections/operations.js";
import type {
  VnetConnectionsListBySandboxGroupOptionalParams,
  VnetConnectionsDeleteOptionalParams,
  VnetConnectionsCreateOrUpdateOptionalParams,
  VnetConnectionsGetOptionalParams,
} from "../../api/vnetConnections/options.js";
import type { VnetConnection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VnetConnections operations. */
export interface VnetConnectionsOperations {
  /** List all VnetConnections in the specified SandboxGroup. */
  listBySandboxGroup: (
    resourceGroupName: string,
    sandboxGroupName: string,
    options?: VnetConnectionsListBySandboxGroupOptionalParams,
  ) => PagedAsyncIterableIterator<VnetConnection>;
  /** Delete a VnetConnection. */
  delete: (
    resourceGroupName: string,
    sandboxGroupName: string,
    vnetConnectionName: string,
    options?: VnetConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    sandboxGroupName: string,
    vnetConnectionName: string,
    options?: VnetConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    sandboxGroupName: string,
    vnetConnectionName: string,
    options?: VnetConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a VnetConnection. */
  createOrUpdate: (
    resourceGroupName: string,
    sandboxGroupName: string,
    vnetConnectionName: string,
    resource: VnetConnection,
    options?: VnetConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<VnetConnection>;
  /** Get the properties of a VnetConnection. */
  get: (
    resourceGroupName: string,
    sandboxGroupName: string,
    vnetConnectionName: string,
    options?: VnetConnectionsGetOptionalParams,
  ) => Promise<VnetConnection>;
}

function _getVnetConnections(context: ContainerAppsAPIContext) {
  return {
    listBySandboxGroup: (
      resourceGroupName: string,
      sandboxGroupName: string,
      options?: VnetConnectionsListBySandboxGroupOptionalParams,
    ) => listBySandboxGroup(context, resourceGroupName, sandboxGroupName, options),
    delete: (
      resourceGroupName: string,
      sandboxGroupName: string,
      vnetConnectionName: string,
      options?: VnetConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, sandboxGroupName, vnetConnectionName, options),
    beginDelete: async (
      resourceGroupName: string,
      sandboxGroupName: string,
      vnetConnectionName: string,
      options?: VnetConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        sandboxGroupName,
        vnetConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      sandboxGroupName: string,
      vnetConnectionName: string,
      options?: VnetConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        sandboxGroupName,
        vnetConnectionName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      sandboxGroupName: string,
      vnetConnectionName: string,
      resource: VnetConnection,
      options?: VnetConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        sandboxGroupName,
        vnetConnectionName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      sandboxGroupName: string,
      vnetConnectionName: string,
      options?: VnetConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, sandboxGroupName, vnetConnectionName, options),
  };
}

export function _getVnetConnectionsOperations(
  context: ContainerAppsAPIContext,
): VnetConnectionsOperations {
  return {
    ..._getVnetConnections(context),
  };
}
