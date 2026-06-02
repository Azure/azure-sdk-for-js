// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  listRunOutputs,
  getRunOutput,
  cancel,
  run,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  VirtualMachineImageTemplatesListRunOutputsOptionalParams,
  VirtualMachineImageTemplatesGetRunOutputOptionalParams,
  VirtualMachineImageTemplatesCancelOptionalParams,
  VirtualMachineImageTemplatesRunOptionalParams,
  VirtualMachineImageTemplatesListOptionalParams,
  VirtualMachineImageTemplatesListByResourceGroupOptionalParams,
  VirtualMachineImageTemplatesDeleteOptionalParams,
  VirtualMachineImageTemplatesUpdateOptionalParams,
  VirtualMachineImageTemplatesCreateOrUpdateOptionalParams,
  VirtualMachineImageTemplatesGetOptionalParams,
} from "./options.js";
