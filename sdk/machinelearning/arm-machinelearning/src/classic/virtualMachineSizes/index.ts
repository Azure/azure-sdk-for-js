// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list } from "../../api/virtualMachineSizes/operations.js";
import type { VirtualMachineSizesListOptionalParams } from "../../api/virtualMachineSizes/options.js";
import type { VirtualMachineSizeListResult } from "../../models/models.js";

/** Interface representing a VirtualMachineSizes operations. */
export interface VirtualMachineSizesOperations {
  /** Returns supported VM Sizes in a location */
  list: (
    location: string,
    options?: VirtualMachineSizesListOptionalParams,
  ) => Promise<VirtualMachineSizeListResult>;
}

function _getVirtualMachineSizes(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (location: string, options?: VirtualMachineSizesListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getVirtualMachineSizesOperations(
  context: AzureMachineLearningServicesManagementContext,
): VirtualMachineSizesOperations {
  return {
    ..._getVirtualMachineSizes(context),
  };
}
