// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  listVirtualMachines,
  listBySubscription,
  listByResourceGroup,
  cancel,
  $delete,
  createOrUpdate,
  getOperationStatus,
  get,
} from "./operations.js";
export type {
  LaunchBulkInstancesOperationListVirtualMachinesOptionalParams,
  LaunchBulkInstancesOperationListBySubscriptionOptionalParams,
  LaunchBulkInstancesOperationListByResourceGroupOptionalParams,
  LaunchBulkInstancesOperationCancelOptionalParams,
  LaunchBulkInstancesOperationDeleteOptionalParams,
  LaunchBulkInstancesOperationCreateOrUpdateOptionalParams,
  LaunchBulkInstancesOperationGetOperationStatusOptionalParams,
  LaunchBulkInstancesOperationGetOptionalParams,
} from "./options.js";
