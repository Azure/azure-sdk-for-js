// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  list,
  listByReplicationProtectionContainers,
  getOperationResults,
  unplannedFailover,
  testFailoverCleanup,
  testFailover,
  repairReplication,
  failoverCommit,
  applyRecoveryPoint,
  purge,
  create,
  get,
} from "./operations.js";
export type {
  ReplicationProtectionClustersListOptionalParams,
  ReplicationProtectionClustersListByReplicationProtectionContainersOptionalParams,
  ReplicationProtectionClustersGetOperationResultsOptionalParams,
  ReplicationProtectionClustersUnplannedFailoverOptionalParams,
  ReplicationProtectionClustersTestFailoverCleanupOptionalParams,
  ReplicationProtectionClustersTestFailoverOptionalParams,
  ReplicationProtectionClustersRepairReplicationOptionalParams,
  ReplicationProtectionClustersFailoverCommitOptionalParams,
  ReplicationProtectionClustersApplyRecoveryPointOptionalParams,
  ReplicationProtectionClustersPurgeOptionalParams,
  ReplicationProtectionClustersCreateOptionalParams,
  ReplicationProtectionClustersGetOptionalParams,
} from "./options.js";
