// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  resyncCertificates,
  resyncPasswords,
  runRwCommand,
  runRoCommand,
  upgrade,
  updateAdministrativeState,
  refreshConfiguration,
  reboot,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "./operations.js";
export type {
  NetworkDevicesResyncCertificatesOptionalParams,
  NetworkDevicesResyncPasswordsOptionalParams,
  NetworkDevicesRunRwCommandOptionalParams,
  NetworkDevicesRunRoCommandOptionalParams,
  NetworkDevicesUpgradeOptionalParams,
  NetworkDevicesUpdateAdministrativeStateOptionalParams,
  NetworkDevicesRefreshConfigurationOptionalParams,
  NetworkDevicesRebootOptionalParams,
  NetworkDevicesListBySubscriptionOptionalParams,
  NetworkDevicesListByResourceGroupOptionalParams,
  NetworkDevicesDeleteOptionalParams,
  NetworkDevicesUpdateOptionalParams,
  NetworkDevicesCreateOptionalParams,
  NetworkDevicesGetOptionalParams,
} from "./options.js";
