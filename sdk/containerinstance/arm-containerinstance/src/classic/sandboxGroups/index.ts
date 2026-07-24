// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerInstanceManagementContext } from "../../api/containerInstanceManagementContext.js";
import {
  connect,
  $delete,
  update,
  createOrUpdate,
  get,
  listByResourceGroup,
  listBySubscription,
} from "../../api/sandboxGroups/operations.js";
import type {
  SandboxGroupsConnectOptionalParams,
  SandboxGroupsDeleteOptionalParams,
  SandboxGroupsUpdateOptionalParams,
  SandboxGroupsCreateOrUpdateOptionalParams,
  SandboxGroupsGetOptionalParams,
  SandboxGroupsListByResourceGroupOptionalParams,
  SandboxGroupsListBySubscriptionOptionalParams,
} from "../../api/sandboxGroups/options.js";
import type {
  SandboxGroup,
  SandboxGroupTagsUpdate,
  SandboxGroupAccessToken,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SandboxGroups operations. */
export interface SandboxGroupsOperations {
  /** Get an access token and endpoint for connecting to the SandboxGroup. */
  connect: (
    resourceGroupName: string,
    sandboxGroupName: string,
    options?: SandboxGroupsConnectOptionalParams,
  ) => Promise<SandboxGroupAccessToken>;
  /** Delete a SandboxGroup */
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
  /** Update a SandboxGroup */
  update: (
    resourceGroupName: string,
    sandboxGroupName: string,
    properties: SandboxGroupTagsUpdate,
    options?: SandboxGroupsUpdateOptionalParams,
  ) => PollerLike<OperationState<SandboxGroup>, SandboxGroup>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    sandboxGroupName: string,
    properties: SandboxGroupTagsUpdate,
    options?: SandboxGroupsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SandboxGroup>, SandboxGroup>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    sandboxGroupName: string,
    properties: SandboxGroupTagsUpdate,
    options?: SandboxGroupsUpdateOptionalParams,
  ) => Promise<SandboxGroup>;
  /** Create a SandboxGroup */
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
  /** Get a SandboxGroup */
  get: (
    resourceGroupName: string,
    sandboxGroupName: string,
    options?: SandboxGroupsGetOptionalParams,
  ) => Promise<SandboxGroup>;
  /** List SandboxGroup resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SandboxGroupsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SandboxGroup>;
  /** List SandboxGroup resources by subscription ID */
  listBySubscription: (
    options?: SandboxGroupsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<SandboxGroup>;
}

function _getSandboxGroups(context: ContainerInstanceManagementContext) {
  return {
    connect: (
      resourceGroupName: string,
      sandboxGroupName: string,
      options?: SandboxGroupsConnectOptionalParams,
    ) => connect(context, resourceGroupName, sandboxGroupName, options),
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
      properties: SandboxGroupTagsUpdate,
      options?: SandboxGroupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, sandboxGroupName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      sandboxGroupName: string,
      properties: SandboxGroupTagsUpdate,
      options?: SandboxGroupsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, sandboxGroupName, properties, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      sandboxGroupName: string,
      properties: SandboxGroupTagsUpdate,
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
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SandboxGroupsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    listBySubscription: (options?: SandboxGroupsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
  };
}

export function _getSandboxGroupsOperations(
  context: ContainerInstanceManagementContext,
): SandboxGroupsOperations {
  return {
    ..._getSandboxGroups(context),
  };
}
