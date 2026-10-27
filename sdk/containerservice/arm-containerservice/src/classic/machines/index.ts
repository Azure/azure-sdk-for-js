// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import { list, createOrUpdate, get } from "../../api/machines/operations.js";
import type {
  MachinesListOptionalParams,
  MachinesCreateOrUpdateOptionalParams,
  MachinesGetOptionalParams,
} from "../../api/machines/options.js";
import type { Machine } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Machines operations. */
export interface MachinesOperations {
  /** Gets a list of machines in the specified agent pool. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    options?: MachinesListOptionalParams,
  ) => PagedAsyncIterableIterator<Machine>;
  /** Creates or updates a machine in the specified agent pool. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    machineName: string,
    parameters: Machine,
    options?: MachinesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Machine>, Machine>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    machineName: string,
    parameters: Machine,
    options?: MachinesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Machine>, Machine>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    machineName: string,
    parameters: Machine,
    options?: MachinesCreateOrUpdateOptionalParams,
  ) => Promise<Machine>;
  /** Get a specific machine in the specified agent pool. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    machineName: string,
    options?: MachinesGetOptionalParams,
  ) => Promise<Machine>;
}

function _getMachines(context: ContainerServiceContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      options?: MachinesListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, agentPoolName, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      machineName: string,
      parameters: Machine,
      options?: MachinesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        agentPoolName,
        machineName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      machineName: string,
      parameters: Machine,
      options?: MachinesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        agentPoolName,
        machineName,
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
      machineName: string,
      parameters: Machine,
      options?: MachinesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        agentPoolName,
        machineName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      agentPoolName: string,
      machineName: string,
      options?: MachinesGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, agentPoolName, machineName, options),
  };
}

export function _getMachinesOperations(context: ContainerServiceContext): MachinesOperations {
  return {
    ..._getMachines(context),
  };
}
