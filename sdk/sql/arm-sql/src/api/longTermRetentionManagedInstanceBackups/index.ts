// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  listByResourceGroupInstance,
  listByResourceGroupLocation,
  listByInstance,
  listByLocation,
  listByDatabase,
  $delete,
  get,
  listByResourceGroupDatabase,
  deleteByResourceGroup,
  getByResourceGroup,
} from "./operations.js";
export type {
  LongTermRetentionManagedInstanceBackupsListByResourceGroupInstanceOptionalParams,
  LongTermRetentionManagedInstanceBackupsListByResourceGroupLocationOptionalParams,
  LongTermRetentionManagedInstanceBackupsListByInstanceOptionalParams,
  LongTermRetentionManagedInstanceBackupsListByLocationOptionalParams,
  LongTermRetentionManagedInstanceBackupsListByDatabaseOptionalParams,
  LongTermRetentionManagedInstanceBackupsDeleteOptionalParams,
  LongTermRetentionManagedInstanceBackupsGetOptionalParams,
  LongTermRetentionManagedInstanceBackupsListByResourceGroupDatabaseOptionalParams,
  LongTermRetentionManagedInstanceBackupsDeleteByResourceGroupOptionalParams,
  LongTermRetentionManagedInstanceBackupsGetByResourceGroupOptionalParams,
} from "./options.js";
