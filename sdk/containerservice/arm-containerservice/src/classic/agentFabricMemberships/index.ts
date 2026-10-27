// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import {
  listByManagedCluster,
  $delete,
  createOrUpdate,
  get,
} from "../../api/agentFabricMemberships/operations.js";
import type {
  AgentFabricMembershipsListByManagedClusterOptionalParams,
  AgentFabricMembershipsDeleteOptionalParams,
  AgentFabricMembershipsCreateOrUpdateOptionalParams,
  AgentFabricMembershipsGetOptionalParams,
} from "../../api/agentFabricMemberships/options.js";
import type { AgentFabricMembership } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AgentFabricMemberships operations. */
export interface AgentFabricMembershipsOperations {
  /** Lists the AgentFabric memberships of a managed cluster. */
  listByManagedCluster: (
    resourceGroupName: string,
    resourceName: string,
    options?: AgentFabricMembershipsListByManagedClusterOptionalParams,
  ) => PagedAsyncIterableIterator<AgentFabricMembership>;
  /** Deletes the AgentFabric membership of a managed cluster. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    agentFabricMembershipName: string,
    options?: AgentFabricMembershipsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    agentFabricMembershipName: string,
    options?: AgentFabricMembershipsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    agentFabricMembershipName: string,
    options?: AgentFabricMembershipsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the AgentFabric membership of a managed cluster. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    agentFabricMembershipName: string,
    resource: AgentFabricMembership,
    options?: AgentFabricMembershipsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AgentFabricMembership>, AgentFabricMembership>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    agentFabricMembershipName: string,
    resource: AgentFabricMembership,
    options?: AgentFabricMembershipsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AgentFabricMembership>, AgentFabricMembership>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    agentFabricMembershipName: string,
    resource: AgentFabricMembership,
    options?: AgentFabricMembershipsCreateOrUpdateOptionalParams,
  ) => Promise<AgentFabricMembership>;
  /** Gets the AgentFabric membership of a managed cluster. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    agentFabricMembershipName: string,
    options?: AgentFabricMembershipsGetOptionalParams,
  ) => Promise<AgentFabricMembership>;
}

function _getAgentFabricMemberships(context: ContainerServiceContext) {
  return {
    listByManagedCluster: (
      resourceGroupName: string,
      resourceName: string,
      options?: AgentFabricMembershipsListByManagedClusterOptionalParams,
    ) => listByManagedCluster(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      agentFabricMembershipName: string,
      options?: AgentFabricMembershipsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, agentFabricMembershipName, options),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      agentFabricMembershipName: string,
      options?: AgentFabricMembershipsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        resourceName,
        agentFabricMembershipName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      agentFabricMembershipName: string,
      options?: AgentFabricMembershipsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        resourceName,
        agentFabricMembershipName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      agentFabricMembershipName: string,
      resource: AgentFabricMembership,
      options?: AgentFabricMembershipsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        agentFabricMembershipName,
        resource,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      agentFabricMembershipName: string,
      resource: AgentFabricMembership,
      options?: AgentFabricMembershipsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        agentFabricMembershipName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      agentFabricMembershipName: string,
      resource: AgentFabricMembership,
      options?: AgentFabricMembershipsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        agentFabricMembershipName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      agentFabricMembershipName: string,
      options?: AgentFabricMembershipsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, agentFabricMembershipName, options),
  };
}

export function _getAgentFabricMembershipsOperations(
  context: ContainerServiceContext,
): AgentFabricMembershipsOperations {
  return {
    ..._getAgentFabricMemberships(context),
  };
}
