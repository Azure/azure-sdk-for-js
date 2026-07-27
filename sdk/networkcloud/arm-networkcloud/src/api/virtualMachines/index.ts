// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  start,
  restart,
  reimage,
  powerOff,
  assignRelay,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  VirtualMachinesStartOptionalParams,
  VirtualMachinesRestartOptionalParams,
  VirtualMachinesReimageOptionalParams,
  VirtualMachinesPowerOffOptionalParams,
  VirtualMachinesAssignRelayOptionalParams,
  VirtualMachinesListBySubscriptionOptionalParams,
  VirtualMachinesListByResourceGroupOptionalParams,
  VirtualMachinesDeleteOptionalParams,
  VirtualMachinesUpdateOptionalParams,
  VirtualMachinesCreateOrUpdateOptionalParams,
  VirtualMachinesGetOptionalParams,
} from "./options.js";
