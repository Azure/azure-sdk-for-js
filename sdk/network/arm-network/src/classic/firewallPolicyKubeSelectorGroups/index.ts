// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/firewallPolicyKubeSelectorGroups/operations.js";
import type {
  FirewallPolicyKubeSelectorGroupsListOptionalParams,
  FirewallPolicyKubeSelectorGroupsDeleteOptionalParams,
  FirewallPolicyKubeSelectorGroupsCreateOrUpdateOptionalParams,
  FirewallPolicyKubeSelectorGroupsGetOptionalParams,
} from "../../api/firewallPolicyKubeSelectorGroups/options.js";
import type { FirewallPolicyKubeSelectorGroup } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FirewallPolicyKubeSelectorGroups operations. */
export interface FirewallPolicyKubeSelectorGroupsOperations {
  /** Lists all FirewallPolicyKubeSelectorGroups in a FirewallPolicy resource. */
  list: (
    resourceGroupName: string,
    firewallPolicyName: string,
    options?: FirewallPolicyKubeSelectorGroupsListOptionalParams,
  ) => PagedAsyncIterableIterator<FirewallPolicyKubeSelectorGroup>;
  /** Deletes the specified FirewallPolicyKubeSelectorGroup. */
  delete: (
    resourceGroupName: string,
    firewallPolicyName: string,
    kubeSelectorGroupName: string,
    options?: FirewallPolicyKubeSelectorGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    firewallPolicyName: string,
    kubeSelectorGroupName: string,
    options?: FirewallPolicyKubeSelectorGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    firewallPolicyName: string,
    kubeSelectorGroupName: string,
    options?: FirewallPolicyKubeSelectorGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the specified FirewallPolicyKubeSelectorGroup. */
  createOrUpdate: (
    resourceGroupName: string,
    firewallPolicyName: string,
    kubeSelectorGroupName: string,
    resource: FirewallPolicyKubeSelectorGroup,
    options?: FirewallPolicyKubeSelectorGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FirewallPolicyKubeSelectorGroup>, FirewallPolicyKubeSelectorGroup>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    firewallPolicyName: string,
    kubeSelectorGroupName: string,
    resource: FirewallPolicyKubeSelectorGroup,
    options?: FirewallPolicyKubeSelectorGroupsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<FirewallPolicyKubeSelectorGroup>,
      FirewallPolicyKubeSelectorGroup
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    firewallPolicyName: string,
    kubeSelectorGroupName: string,
    resource: FirewallPolicyKubeSelectorGroup,
    options?: FirewallPolicyKubeSelectorGroupsCreateOrUpdateOptionalParams,
  ) => Promise<FirewallPolicyKubeSelectorGroup>;
  /** Gets the specified FirewallPolicyKubeSelectorGroup. */
  get: (
    resourceGroupName: string,
    firewallPolicyName: string,
    kubeSelectorGroupName: string,
    options?: FirewallPolicyKubeSelectorGroupsGetOptionalParams,
  ) => Promise<FirewallPolicyKubeSelectorGroup>;
}

function _getFirewallPolicyKubeSelectorGroups(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      firewallPolicyName: string,
      options?: FirewallPolicyKubeSelectorGroupsListOptionalParams,
    ) => list(context, resourceGroupName, firewallPolicyName, options),
    delete: (
      resourceGroupName: string,
      firewallPolicyName: string,
      kubeSelectorGroupName: string,
      options?: FirewallPolicyKubeSelectorGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, firewallPolicyName, kubeSelectorGroupName, options),
    beginDelete: async (
      resourceGroupName: string,
      firewallPolicyName: string,
      kubeSelectorGroupName: string,
      options?: FirewallPolicyKubeSelectorGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        firewallPolicyName,
        kubeSelectorGroupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      firewallPolicyName: string,
      kubeSelectorGroupName: string,
      options?: FirewallPolicyKubeSelectorGroupsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        firewallPolicyName,
        kubeSelectorGroupName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      firewallPolicyName: string,
      kubeSelectorGroupName: string,
      resource: FirewallPolicyKubeSelectorGroup,
      options?: FirewallPolicyKubeSelectorGroupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        firewallPolicyName,
        kubeSelectorGroupName,
        resource,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      firewallPolicyName: string,
      kubeSelectorGroupName: string,
      resource: FirewallPolicyKubeSelectorGroup,
      options?: FirewallPolicyKubeSelectorGroupsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        firewallPolicyName,
        kubeSelectorGroupName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      firewallPolicyName: string,
      kubeSelectorGroupName: string,
      resource: FirewallPolicyKubeSelectorGroup,
      options?: FirewallPolicyKubeSelectorGroupsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        firewallPolicyName,
        kubeSelectorGroupName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      firewallPolicyName: string,
      kubeSelectorGroupName: string,
      options?: FirewallPolicyKubeSelectorGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, firewallPolicyName, kubeSelectorGroupName, options),
  };
}

export function _getFirewallPolicyKubeSelectorGroupsOperations(
  context: NetworkManagementContext,
): FirewallPolicyKubeSelectorGroupsOperations {
  return {
    ..._getFirewallPolicyKubeSelectorGroups(context),
  };
}
