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
  StoragePoolsRepairAvsConnectionOptionalParams,
  StoragePoolsFinalizeAvsConnectionOptionalParams,
  StoragePoolsDisableAvsConnectionOptionalParams,
  StoragePoolsEnableAvsConnectionOptionalParams,
  StoragePoolsGetAvsStatusOptionalParams,
  StoragePoolsGetAvsConnectionOptionalParams,
  StoragePoolsGetHealthStatusOptionalParams,
  StoragePoolsListBySubscriptionOptionalParams,
  StoragePoolsListByResourceGroupOptionalParams,
  StoragePoolsDeleteOptionalParams,
  StoragePoolsUpdateOptionalParams,
  StoragePoolsCreateOptionalParams,
  StoragePoolsGetOptionalParams,
} from "./options.js";
