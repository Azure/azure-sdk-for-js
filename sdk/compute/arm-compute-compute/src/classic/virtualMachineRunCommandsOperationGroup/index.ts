// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import { get, list } from "../../api/virtualMachineRunCommandsOperationGroup/operations.js";
import type {
  VirtualMachineRunCommandsOperationGroupGetOptionalParams,
  VirtualMachineRunCommandsOperationGroupListOptionalParams,
} from "../../api/virtualMachineRunCommandsOperationGroup/options.js";
import type { RunCommandDocumentBase, RunCommandDocument } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VirtualMachineRunCommandsOperationGroup operations. */
export interface VirtualMachineRunCommandsOperationGroupOperations {
  /** Gets specific run command for a subscription in a location. */
  get: (
    location: string,
    commandId: string,
    options?: VirtualMachineRunCommandsOperationGroupGetOptionalParams,
  ) => Promise<RunCommandDocument>;
  /** Lists all available run commands for a subscription in a location. */
  list: (
    location: string,
    options?: VirtualMachineRunCommandsOperationGroupListOptionalParams,
  ) => PagedAsyncIterableIterator<RunCommandDocumentBase>;
}

function _getVirtualMachineRunCommandsOperationGroup(context: ComputeContext) {
  return {
    get: (
      location: string,
      commandId: string,
      options?: VirtualMachineRunCommandsOperationGroupGetOptionalParams,
    ) => get(context, location, commandId, options),
    list: (location: string, options?: VirtualMachineRunCommandsOperationGroupListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getVirtualMachineRunCommandsOperationGroupOperations(
  context: ComputeContext,
): VirtualMachineRunCommandsOperationGroupOperations {
  return {
    ..._getVirtualMachineRunCommandsOperationGroup(context),
  };
}
