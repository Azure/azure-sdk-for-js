// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/sandboxGroups/operations.js";
import type {
  SandboxGroupsListBySubscriptionOptionalParams,
  SandboxGroupsListByResourceGroupOptionalParams,
  SandboxGroupsDeleteOptionalParams,
  SandboxGroupsUpdateOptionalParams,
  SandboxGroupsCreateOrUpdateOptionalParams,
  SandboxGroupsGetOptionalParams,
} from "../../api/sandboxGroups/options.js";
import type { SandboxGroup, SandboxGroupPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SandboxGroups operations. */
export interface SandboxGroupsOperations {
  /** Get all SandboxGroups for a subscription. */
  listBySubscription: (
    options?: SandboxGroupsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<SandboxGroup>;
  /** Get all SandboxGroups in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SandboxGroupsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SandboxGroup>;
  /** Delete a SandboxGroup. */
  delete: (
    resourceGroupName: string,
    sandboxGroupName: string,
    options?: SandboxGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    sandboxGroupName: string,
    options?: SandboxGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    sandboxGroupName: string,
    options?: SandboxGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Patches a SandboxGroup. */
  update: (
    resourceGroupName: string,
    sandboxGroupName: string,
    properties: SandboxGroupPatch,
    options?: SandboxGroupsUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    sandboxGroupName: string,
    properties: SandboxGroupPatch,
    options?: SandboxGroupsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    sandboxGroupName: string,
    properties: SandboxGroupPatch,
    options?: SandboxGroupsUpdateOptionalParams,
  ) => Promise<void>;
  /** Create or update a SandboxGroup. */
  createOrUpdate: (
    resourceGroupName: string,
    sandboxGroupName: string,
    resource: SandboxGroup,
    options?: SandboxGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SandboxGroup>, SandboxGroup>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    sandboxGroupName: string,
    resource: SandboxGroup,
    options?: SandboxGroupsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SandboxGroup>, SandboxGroup>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    sandboxGroupName: string,
    resource: SandboxGroup,
    options?: SandboxGroupsCreateOrUpdateOptionalParams,
  ) => Promise<SandboxGroup>;
  /** Get the properties of a SandboxGroup. */
  get: (
    resourceGroupName: string,
    sandboxGroupName: string,
    options?: SandboxGroupsGetOptionalParams,
  ) => Promise<SandboxGroup>;
}

function _getSandboxGroups(context: ContainerAppsAPIContext) {
  return {
    listBySubscription: (options?: SandboxGroupsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SandboxGroupsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      sandboxGroupName: string,
      options?: SandboxGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, sandboxGroupName, options),
    beginDelete: async (
      resourceGroupName: string,
      sandboxGroupName: string,
      options?: SandboxGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, sandboxGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      sandboxGroupName: string,
      options?: SandboxGroupsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, sandboxGroupName, options);
    },
    update: (
      resourceGroupName: string,
      sandboxGroupName: string,
      properties: SandboxGroupPatch,
      options?: SandboxGroupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, sandboxGroupName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      sandboxGroupName: string,
      properties: SandboxGroupPatch,
      options?: SandboxGroupsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, sandboxGroupName, properties, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      sandboxGroupName: string,
      properties: SandboxGroupPatch,
      options?: SandboxGroupsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, sandboxGroupName, properties, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      sandboxGroupName: string,
      resource: SandboxGroup,
      options?: SandboxGroupsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, sandboxGroupName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      sandboxGroupName: string,
      resource: SandboxGroup,
      options?: SandboxGroupsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        sandboxGroupName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      sandboxGroupName: string,
      resource: SandboxGroup,
      options?: SandboxGroupsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, sandboxGroupName, resource, options);
    },
    get: (
      resourceGroupName: string,
      sandboxGroupName: string,
      options?: SandboxGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, sandboxGroupName, options),
  };
}

export function _getSandboxGroupsOperations(
  context: ContainerAppsAPIContext,
): SandboxGroupsOperations {
  return {
    ..._getSandboxGroups(context),
  };
}
