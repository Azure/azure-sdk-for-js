// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  createStandbyPoolManagement,
  StandbyPoolContext,
  StandbyPoolManagementClientOptionalParams,
} from "./standbyPoolManagementContext.js";
export { operationsList } from "./operations/index.js";
export {
  standbyContainerGroupPoolRuntimeViewsGet,
  standbyContainerGroupPoolRuntimeViewsListByStandbyPool,
} from "./standbyContainerGroupPoolRuntimeViews/index.js";
export {
  standbyContainerGroupPoolsGet,
  standbyContainerGroupPoolsCreateOrUpdate,
  standbyContainerGroupPoolsDelete,
  standbyContainerGroupPoolsUpdate,
  standbyContainerGroupPoolsListByResourceGroup,
  standbyContainerGroupPoolsListBySubscription,
} from "./standbyContainerGroupPools/index.js";
export {
  standbyVirtualMachinePoolRuntimeViewsGet,
  standbyVirtualMachinePoolRuntimeViewsListByStandbyPool,
} from "./standbyVirtualMachinePoolRuntimeViews/index.js";
export {
  standbyVirtualMachinePoolsGet,
  standbyVirtualMachinePoolsCreateOrUpdate,
  standbyVirtualMachinePoolsDelete,
  standbyVirtualMachinePoolsUpdate,
  standbyVirtualMachinePoolsListByResourceGroup,
  standbyVirtualMachinePoolsListBySubscription,
} from "./standbyVirtualMachinePools/index.js";
export {
  standbyVirtualMachinesGet,
  standbyVirtualMachinesListByStandbyVirtualMachinePoolResource,
} from "./standbyVirtualMachines/index.js";
