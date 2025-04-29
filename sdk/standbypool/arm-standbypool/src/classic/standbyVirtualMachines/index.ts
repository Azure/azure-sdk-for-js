// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolManagementContext } from "../../api/standbyPoolManagementContext.js";
import { StandbyVirtualMachineResource } from "../../models/models.js";
import {
  StandbyVirtualMachinesListByStandbyVirtualMachinePoolResourceOptionalParams,
  StandbyVirtualMachinesGetOptionalParams,
} from "../../api/standbyVirtualMachines/options.js";
import {
  listByStandbyVirtualMachinePoolResource,
  get,
} from "../../api/standbyVirtualMachines/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a StandbyVirtualMachines operations. */
export interface StandbyVirtualMachinesOperations {
  /** List StandbyVirtualMachineResource resources by StandbyVirtualMachinePoolResource */
  listByStandbyVirtualMachinePoolResource: (
    resourceGroupName: string,
    standbyVirtualMachinePoolName: string,
    options?: StandbyVirtualMachinesListByStandbyVirtualMachinePoolResourceOptionalParams,
  ) => PagedAsyncIterableIterator<StandbyVirtualMachineResource>;
  /** Get a StandbyVirtualMachineResource */
  get: (
    resourceGroupName: string,
    standbyVirtualMachinePoolName: string,
    standbyVirtualMachineName: string,
    options?: StandbyVirtualMachinesGetOptionalParams,
  ) => Promise<StandbyVirtualMachineResource>;
}

function _getStandbyVirtualMachines(context: StandbyPoolManagementContext) {
  return {
    listByStandbyVirtualMachinePoolResource: (
      resourceGroupName: string,
      standbyVirtualMachinePoolName: string,
      options?: StandbyVirtualMachinesListByStandbyVirtualMachinePoolResourceOptionalParams,
    ) =>
      listByStandbyVirtualMachinePoolResource(
        context,
        resourceGroupName,
        standbyVirtualMachinePoolName,
        options,
      ),
    get: (
      resourceGroupName: string,
      standbyVirtualMachinePoolName: string,
      standbyVirtualMachineName: string,
      options?: StandbyVirtualMachinesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        standbyVirtualMachinePoolName,
        standbyVirtualMachineName,
        options,
      ),
  };
}

export function _getStandbyVirtualMachinesOperations(
  context: StandbyPoolManagementContext,
): StandbyVirtualMachinesOperations {
  return {
    ..._getStandbyVirtualMachines(context),
  };
}
