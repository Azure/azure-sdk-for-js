// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  repairAvsConnection,
  finalizeAvsConnection,
  disableAvsConnection,
  enableAvsConnection,
  getAvsStatus,
  getAvsConnection,
  getHealthStatus,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "./operations.js";
export {
  type StoragePoolsRepairAvsConnectionOptionalParams,
  type StoragePoolsFinalizeAvsConnectionOptionalParams,
  type StoragePoolsDisableAvsConnectionOptionalParams,
  type StoragePoolsEnableAvsConnectionOptionalParams,
  type StoragePoolsGetAvsStatusOptionalParams,
  type StoragePoolsGetAvsConnectionOptionalParams,
  type StoragePoolsGetHealthStatusOptionalParams,
  type StoragePoolsListBySubscriptionOptionalParams,
  type StoragePoolsListByResourceGroupOptionalParams,
  type StoragePoolsDeleteOptionalParams,
  type StoragePoolsUpdateOptionalParams,
  type StoragePoolsCreateOptionalParams,
  type StoragePoolsGetOptionalParams,
} from "./options.js";
