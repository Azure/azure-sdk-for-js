// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  list,
  switchProtection,
  switchClusterProtection,
  $delete,
  discoverProtectableItem,
  listByReplicationFabrics,
  create,
  get,
} from "./operations.js";
export type {
  ReplicationProtectionContainersListOptionalParams,
  ReplicationProtectionContainersSwitchProtectionOptionalParams,
  ReplicationProtectionContainersSwitchClusterProtectionOptionalParams,
  ReplicationProtectionContainersDeleteOptionalParams,
  ReplicationProtectionContainersDiscoverProtectableItemOptionalParams,
  ReplicationProtectionContainersListByReplicationFabricsOptionalParams,
  ReplicationProtectionContainersCreateOptionalParams,
  ReplicationProtectionContainersGetOptionalParams,
} from "./options.js";
