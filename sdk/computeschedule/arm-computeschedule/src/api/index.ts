// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  createComputeSchedule,
  ComputeScheduleContext,
  ComputeScheduleClientOptionalParams,
} from "./computeScheduleContext.js";
export {
  OperationsListOptionalParams,
  ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams,
  ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams,
  ScheduledActionsVirtualMachinesSubmitStartOptionalParams,
  ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams,
  ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams,
  ScheduledActionsVirtualMachinesExecuteStartOptionalParams,
  ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams,
  ScheduledActionsVirtualMachinesCancelOperationsOptionalParams,
  ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams,
} from "./options.js";
export { operationsList } from "./operations/index.js";
export {
  scheduledActionsVirtualMachinesSubmitDeallocate,
  scheduledActionsVirtualMachinesSubmitHibernate,
  scheduledActionsVirtualMachinesSubmitStart,
  scheduledActionsVirtualMachinesExecuteDeallocate,
  scheduledActionsVirtualMachinesExecuteHibernate,
  scheduledActionsVirtualMachinesExecuteStart,
  scheduledActionsVirtualMachinesGetOperationStatus,
  scheduledActionsVirtualMachinesCancelOperations,
  scheduledActionsVirtualMachinesGetOperationErrors,
} from "./scheduledActions/index.js";
