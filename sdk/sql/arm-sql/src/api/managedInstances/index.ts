// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  listByInstancePool,
  validateAzureKeyVaultEncryptionKey,
  listByManagedInstance,
  stop,
  start,
  refreshStatus,
  reevaluateInaccessibleDatabaseState,
  listOutboundNetworkDependenciesByManagedInstance,
  failover,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  ManagedInstancesListByInstancePoolOptionalParams,
  ManagedInstancesValidateAzureKeyVaultEncryptionKeyOptionalParams,
  ManagedInstancesListByManagedInstanceOptionalParams,
  ManagedInstancesStopOptionalParams,
  ManagedInstancesStartOptionalParams,
  ManagedInstancesRefreshStatusOptionalParams,
  ManagedInstancesReevaluateInaccessibleDatabaseStateOptionalParams,
  ManagedInstancesListOutboundNetworkDependenciesByManagedInstanceOptionalParams,
  ManagedInstancesFailoverOptionalParams,
  ManagedInstancesListOptionalParams,
  ManagedInstancesListByResourceGroupOptionalParams,
  ManagedInstancesDeleteOptionalParams,
  ManagedInstancesUpdateOptionalParams,
  ManagedInstancesCreateOrUpdateOptionalParams,
  ManagedInstancesGetOptionalParams,
} from "./options.js";
