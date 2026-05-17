// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list } from "../../api/virtualMachineSizes/operations.js";
import { VirtualMachineSizesListOptionalParams } from "../../api/virtualMachineSizes/options.js";
import { VirtualMachineSizeListResult } from "../../models/models.js";

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
