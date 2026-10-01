// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  runReadCommands,
  enableRemoteVendorManagement,
  disableRemoteVendorManagement,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  StorageAppliancesRunReadCommandsOptionalParams,
  StorageAppliancesEnableRemoteVendorManagementOptionalParams,
  StorageAppliancesDisableRemoteVendorManagementOptionalParams,
  StorageAppliancesListBySubscriptionOptionalParams,
  StorageAppliancesListByResourceGroupOptionalParams,
  StorageAppliancesDeleteOptionalParams,
  StorageAppliancesUpdateOptionalParams,
  StorageAppliancesCreateOrUpdateOptionalParams,
  StorageAppliancesGetOptionalParams,
} from "./options.js";
