// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import {
  getUpgradeProfile,
  getAvailableAgentPoolVersions,
  upgradeNodeImageVersion,
  deleteMachines,
  completeUpgrade,
  abortLatestOperation,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/agentPools/operations.js";
import type {
  AgentPoolsGetUpgradeProfileOptionalParams,
  AgentPoolsGetAvailableAgentPoolVersionsOptionalParams,
  AgentPoolsUpgradeNodeImageVersionOptionalParams,
  AgentPoolsDeleteMachinesOptionalParams,
  AgentPoolsCompleteUpgradeOptionalParams,
  AgentPoolsAbortLatestOperationOptionalParams,
  AgentPoolsListOptionalParams,
  AgentPoolsDeleteOptionalParams,
  AgentPoolsCreateOrUpdateOptionalParams,
  AgentPoolsGetOptionalParams,
} from "../../api/agentPools/options.js";
import type {
  AgentPool,
  AgentPoolDeleteMachinesParameter,
  AgentPoolAvailableVersions,
  AgentPoolUpgradeProfile,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AgentPools operations. */
export interface AgentPoolsOperations {
  /** Gets the upgrade profile for an agent pool. */
  getUpgradeProfile: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    options?: AgentPoolsGetUpgradeProfileOptionalParams,
  ) => Promise<AgentPoolUpgradeProfile>;
  /** See [supported Kubernetes versions](https://docs.microsoft.com/azure/aks/supported-kubernetes-versions) for more details about the version lifecycle. */
  getAvailableAgentPoolVersions: (
    resourceGroupName: string,
    resourceName: string,
    options?: AgentPoolsGetAvailableAgentPoolVersionsOptionalParams,
  ) => Promise<AgentPoolAvailableVersions>;
  /** Upgrading the node image version of an agent pool applies the newest OS and runtime updates to the nodes. AKS provides one new image per week with the latest updates. For more details on node image versions, see: https://docs.microsoft.com/azure/aks/node-image-upgrade */
  upgradeNodeImageVersion: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    options?: AgentPoolsUpgradeNodeImageVersionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use upgradeNodeImageVersion instead */
  beginUpgradeNodeImageVersion: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    options?: AgentPoolsUpgradeNodeImageVersionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use upgradeNodeImageVersion instead */
  beginUpgradeNodeImageVersionAndWait: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    options?: AgentPoolsUpgradeNodeImageVersionOptionalParams,
  ) => Promise<void>;
  /** Deletes specific machines in an agent pool. */
  deleteMachines: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    machines: AgentPoolDeleteMachinesParameter,
    options?: AgentPoolsDeleteMachinesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteMachines instead */
  beginDeleteMachines: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    machines: AgentPoolDeleteMachinesParameter,
    options?: AgentPoolsDeleteMachinesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteMachines instead */
  beginDeleteMachinesAndWait: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    machines: AgentPoolDeleteMachinesParameter,
    options?: AgentPoolsDeleteMachinesOptionalParams,
  ) => Promise<void>;
  /** Completes the upgrade operation for the specified agent pool. */
  completeUpgrade: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    options?: AgentPoolsCompleteUpgradeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use completeUpgrade instead */
  beginCompleteUpgrade: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    options?: AgentPoolsCompleteUpgradeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use completeUpgrade instead */
  beginCompleteUpgradeAndWait: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    options?: AgentPoolsCompleteUpgradeOptionalParams,
  ) => Promise<void>;
  /** Aborts the currently running operation on the agent pool. The Agent Pool will be moved to a Canceling state and eventually to a Canceled state when cancellation finishes. If the operation completes before cancellation can take place, a 409 error code is returned. */
  abortLatestOperation: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    options?: AgentPoolsAbortLatestOperationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use abortLatestOperation instead */
  beginAbortLatestOperation: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    options?: AgentPoolsAbortLatestOperationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use abortLatestOperation instead */
  beginAbortLatestOperationAndWait: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    options?: AgentPoolsAbortLatestOperationOptionalParams,
  ) => Promise<void>;
  /** Gets a list of agent pools in the specified managed cluster. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: AgentPoolsListOptionalParams,
  ) => PagedAsyncIterableIterator<AgentPool>;
  /** Deletes an agent pool in the specified managed cluster. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    options?: AgentPoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    options?: AgentPoolsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    options?: AgentPoolsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an agent pool in the specified managed cluster. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    parameters: AgentPool,
    options?: AgentPoolsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AgentPool>, AgentPool>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    parameters: AgentPool,
    options?: AgentPoolsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AgentPool>, AgentPool>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    parameters: AgentPool,
    options?: AgentPoolsCreateOrUpdateOptionalParams,
  ) => Promise<AgentPool>;
  /** Gets the specified managed cluster agent pool. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    options?: AgentPoolsGetOptionalParams,
  ) => Promise<AgentPool>;
}

function _getAgentPools(context: ContainerServiceContext) {
  return {
    getUpgradeProfile: (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      options?: AgentPoolsGetUpgradeProfileOptionalParams,
    ) => getUpgradeProfile(context, resourceGroupName, resourceName, agentPoolName, options),
    getAvailableAgentPoolVersions: (
      resourceGroupName: string,
      resourceName: string,
      options?: AgentPoolsGetAvailableAgentPoolVersionsOptionalParams,
    ) => getAvailableAgentPoolVersions(context, resourceGroupName, resourceName, options),
    upgradeNodeImageVersion: (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      options?: AgentPoolsUpgradeNodeImageVersionOptionalParams,
    ) => upgradeNodeImageVersion(context, resourceGroupName, resourceName, agentPoolName, options),
    beginUpgradeNodeImageVersion: async (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      options?: AgentPoolsUpgradeNodeImageVersionOptionalParams,
    ) => {
      const poller = upgradeNodeImageVersion(
        context,
        resourceGroupName,
        resourceName,
        agentPoolName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpgradeNodeImageVersionAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      options?: AgentPoolsUpgradeNodeImageVersionOptionalParams,
    ) => {
      return await upgradeNodeImageVersion(
        context,
        resourceGroupName,
        resourceName,
        agentPoolName,
        options,
      );
    },
    deleteMachines: (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      machines: AgentPoolDeleteMachinesParameter,
      options?: AgentPoolsDeleteMachinesOptionalParams,
    ) => deleteMachines(context, resourceGroupName, resourceName, agentPoolName, machines, options),
    beginDeleteMachines: async (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      machines: AgentPoolDeleteMachinesParameter,
      options?: AgentPoolsDeleteMachinesOptionalParams,
    ) => {
      const poller = deleteMachines(
        context,
        resourceGroupName,
        resourceName,
        agentPoolName,
        machines,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteMachinesAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      machines: AgentPoolDeleteMachinesParameter,
      options?: AgentPoolsDeleteMachinesOptionalParams,
    ) => {
      return await deleteMachines(
        context,
        resourceGroupName,
        resourceName,
        agentPoolName,
        machines,
        options,
      );
    },
    completeUpgrade: (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      options?: AgentPoolsCompleteUpgradeOptionalParams,
    ) => completeUpgrade(context, resourceGroupName, resourceName, agentPoolName, options),
    beginCompleteUpgrade: async (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      options?: AgentPoolsCompleteUpgradeOptionalParams,
    ) => {
      const poller = completeUpgrade(
        context,
        resourceGroupName,
        resourceName,
        agentPoolName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCompleteUpgradeAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      options?: AgentPoolsCompleteUpgradeOptionalParams,
    ) => {
      return await completeUpgrade(
        context,
        resourceGroupName,
        resourceName,
        agentPoolName,
        options,
      );
    },
    abortLatestOperation: (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      options?: AgentPoolsAbortLatestOperationOptionalParams,
    ) => abortLatestOperation(context, resourceGroupName, resourceName, agentPoolName, options),
    beginAbortLatestOperation: async (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      options?: AgentPoolsAbortLatestOperationOptionalParams,
    ) => {
      const poller = abortLatestOperation(
        context,
        resourceGroupName,
        resourceName,
        agentPoolName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginAbortLatestOperationAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      options?: AgentPoolsAbortLatestOperationOptionalParams,
    ) => {
      return await abortLatestOperation(
        context,
        resourceGroupName,
        resourceName,
        agentPoolName,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: AgentPoolsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      options?: AgentPoolsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, agentPoolName, options),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      options?: AgentPoolsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, resourceName, agentPoolName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      options?: AgentPoolsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, resourceName, agentPoolName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      parameters: AgentPool,
      options?: AgentPoolsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, resourceName, agentPoolName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      parameters: AgentPool,
      options?: AgentPoolsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        agentPoolName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      parameters: AgentPool,
      options?: AgentPoolsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        agentPoolName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      options?: AgentPoolsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, agentPoolName, options),
  };
}

export function _getAgentPoolsOperations(context: ContainerServiceContext): AgentPoolsOperations {
  return {
    ..._getAgentPools(context),
  };
}
