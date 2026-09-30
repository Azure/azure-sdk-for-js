// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import { list, get } from "../../api/machines/operations.js";
import type {
  MachinesListOptionalParams,
  MachinesGetOptionalParams,
} from "../../api/machines/options.js";
import type { Machine } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Machines operations. */
export interface MachinesOperations {
  /** Gets a list of machines in the specified agent pool. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    options?: MachinesListOptionalParams,
  ) => PagedAsyncIterableIterator<Machine>;
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
