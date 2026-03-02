// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  virtualMachinesCancelOperations,
  virtualMachinesGetOperationStatus,
  virtualMachinesExecuteDelete,
  virtualMachinesExecuteCreate,
  virtualMachinesExecuteStart,
  virtualMachinesExecuteHibernate,
  virtualMachinesExecuteDeallocate,
  listVirtualMachines,
  listBySubscription,
  listByResourceGroup,
  cancel,
  $delete,
  createOrUpdate,
  getOperationStatus,
  get,
} from "./operations.js";
export {
  type BulkActionsVirtualMachinesCancelOperationsOptionalParams,
  type BulkActionsVirtualMachinesGetOperationStatusOptionalParams,
  type BulkActionsVirtualMachinesExecuteDeleteOptionalParams,
  type BulkActionsVirtualMachinesExecuteCreateOptionalParams,
  type BulkActionsVirtualMachinesExecuteStartOptionalParams,
  type BulkActionsVirtualMachinesExecuteHibernateOptionalParams,
  type BulkActionsVirtualMachinesExecuteDeallocateOptionalParams,
  type BulkActionsListVirtualMachinesOptionalParams,
  type BulkActionsListBySubscriptionOptionalParams,
  type BulkActionsListByResourceGroupOptionalParams,
  type BulkActionsCancelOptionalParams,
  type BulkActionsDeleteOptionalParams,
  type BulkActionsCreateOrUpdateOptionalParams,
  type BulkActionsGetOperationStatusOptionalParams,
  type BulkActionsGetOptionalParams,
} from "./options.js";
