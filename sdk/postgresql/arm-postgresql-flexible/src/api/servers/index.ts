// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  startMajorVersionUpgradePrecheck,
  migrateNetworkMode,
  stop,
  start,
  restart,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  ServersStartMajorVersionUpgradePrecheckOptionalParams,
  ServersMigrateNetworkModeOptionalParams,
  ServersStopOptionalParams,
  ServersStartOptionalParams,
  ServersRestartOptionalParams,
  ServersListBySubscriptionOptionalParams,
  ServersListByResourceGroupOptionalParams,
  ServersDeleteOptionalParams,
  ServersUpdateOptionalParams,
  ServersCreateOrUpdateOptionalParams,
  ServersGetOptionalParams,
} from "./options.js";
