// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import {
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
} from "../../api/replicationProtectionClusters/operations.js";
import type {
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
} from "../../api/replicationProtectionClusters/options.js";
import type {
  ReplicationProtectionCluster,
  ApplyClusterRecoveryPointInput,
  ClusterTestFailoverInput,
  ClusterTestFailoverCleanupInput,
  ClusterUnplannedFailoverInput,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ReplicationProtectionClusters operations. */
export interface ReplicationProtectionClustersOperations {
  /** Gets the list of ASR replication protected clusters in the vault. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationProtectionClustersListOptionalParams,
  ) => PagedAsyncIterableIterator<ReplicationProtectionCluster>;
  /** Gets the list of ASR replication protected clusters in the protection container. */
  listByReplicationProtectionContainers: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    options?: ReplicationProtectionClustersListByReplicationProtectionContainersOptionalParams,
  ) => PagedAsyncIterableIterator<ReplicationProtectionCluster>;
  /** Track the results of an asynchronous operation on the replication protection cluster. */
  getOperationResults: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    jobId: string,
    options?: ReplicationProtectionClustersGetOperationResultsOptionalParams,
  ) => Promise<ReplicationProtectionCluster>;
  /** Operation to initiate a failover of the replication protection cluster. */
  unplannedFailover: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    failoverInput: ClusterUnplannedFailoverInput,
    options?: ReplicationProtectionClustersUnplannedFailoverOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster>;
  /** @deprecated use unplannedFailover instead */
  beginUnplannedFailover: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    failoverInput: ClusterUnplannedFailoverInput,
    options?: ReplicationProtectionClustersUnplannedFailoverOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster>
  >;
  /** @deprecated use unplannedFailover instead */
  beginUnplannedFailoverAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    failoverInput: ClusterUnplannedFailoverInput,
    options?: ReplicationProtectionClustersUnplannedFailoverOptionalParams,
  ) => Promise<ReplicationProtectionCluster>;
  /** Operation to clean up the test failover of a replication protected cluster. */
  testFailoverCleanup: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    cleanupInput: ClusterTestFailoverCleanupInput,
    options?: ReplicationProtectionClustersTestFailoverCleanupOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster>;
  /** @deprecated use testFailoverCleanup instead */
  beginTestFailoverCleanup: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    cleanupInput: ClusterTestFailoverCleanupInput,
    options?: ReplicationProtectionClustersTestFailoverCleanupOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster>
  >;
  /** @deprecated use testFailoverCleanup instead */
  beginTestFailoverCleanupAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    cleanupInput: ClusterTestFailoverCleanupInput,
    options?: ReplicationProtectionClustersTestFailoverCleanupOptionalParams,
  ) => Promise<ReplicationProtectionCluster>;
  /** Operation to initiate a failover of the replication protection cluster. */
  testFailover: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    failoverInput: ClusterTestFailoverInput,
    options?: ReplicationProtectionClustersTestFailoverOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster>;
  /** @deprecated use testFailover instead */
  beginTestFailover: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    failoverInput: ClusterTestFailoverInput,
    options?: ReplicationProtectionClustersTestFailoverOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster>
  >;
  /** @deprecated use testFailover instead */
  beginTestFailoverAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    failoverInput: ClusterTestFailoverInput,
    options?: ReplicationProtectionClustersTestFailoverOptionalParams,
  ) => Promise<ReplicationProtectionCluster>;
  /** The operation to repair replication protection cluster. */
  repairReplication: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    options?: ReplicationProtectionClustersRepairReplicationOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster>;
  /** @deprecated use repairReplication instead */
  beginRepairReplication: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    options?: ReplicationProtectionClustersRepairReplicationOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster>
  >;
  /** @deprecated use repairReplication instead */
  beginRepairReplicationAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    options?: ReplicationProtectionClustersRepairReplicationOptionalParams,
  ) => Promise<ReplicationProtectionCluster>;
  /** Operation to initiate commit failover of the replication protection cluster. */
  failoverCommit: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    options?: ReplicationProtectionClustersFailoverCommitOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster>;
  /** @deprecated use failoverCommit instead */
  beginFailoverCommit: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    options?: ReplicationProtectionClustersFailoverCommitOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster>
  >;
  /** @deprecated use failoverCommit instead */
  beginFailoverCommitAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    options?: ReplicationProtectionClustersFailoverCommitOptionalParams,
  ) => Promise<ReplicationProtectionCluster>;
  /** Operation to apply a new cluster recovery point on the Protection cluster. */
  applyRecoveryPoint: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    applyClusterRecoveryPointInput: ApplyClusterRecoveryPointInput,
    options?: ReplicationProtectionClustersApplyRecoveryPointOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster>;
  /** @deprecated use applyRecoveryPoint instead */
  beginApplyRecoveryPoint: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    applyClusterRecoveryPointInput: ApplyClusterRecoveryPointInput,
    options?: ReplicationProtectionClustersApplyRecoveryPointOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster>
  >;
  /** @deprecated use applyRecoveryPoint instead */
  beginApplyRecoveryPointAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    applyClusterRecoveryPointInput: ApplyClusterRecoveryPointInput,
    options?: ReplicationProtectionClustersApplyRecoveryPointOptionalParams,
  ) => Promise<ReplicationProtectionCluster>;
  /** The operation to purge the replication protection cluster. This operation will force delete the replication protection cluster. Use the remove operation on replication protection cluster to perform a clean disable replication protection cluster. */
  purge: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    options?: ReplicationProtectionClustersPurgeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use purge instead */
  beginPurge: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    options?: ReplicationProtectionClustersPurgeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use purge instead */
  beginPurgeAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    options?: ReplicationProtectionClustersPurgeOptionalParams,
  ) => Promise<void>;
  /** The operation to create an ASR replication protection cluster item. */
  create: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    replicationProtectionCluster: ReplicationProtectionCluster,
    options?: ReplicationProtectionClustersCreateOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    replicationProtectionCluster: ReplicationProtectionCluster,
    options?: ReplicationProtectionClustersCreateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster>
  >;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    replicationProtectionCluster: ReplicationProtectionCluster,
    options?: ReplicationProtectionClustersCreateOptionalParams,
  ) => Promise<ReplicationProtectionCluster>;
  /** Gets the details of an ASR replication protection cluster. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    options?: ReplicationProtectionClustersGetOptionalParams,
  ) => Promise<ReplicationProtectionCluster>;
}

function _getReplicationProtectionClusters(context: SiteRecoveryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationProtectionClustersListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    listByReplicationProtectionContainers: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      options?: ReplicationProtectionClustersListByReplicationProtectionContainersOptionalParams,
    ) =>
      listByReplicationProtectionContainers(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        options,
      ),
    getOperationResults: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      jobId: string,
      options?: ReplicationProtectionClustersGetOperationResultsOptionalParams,
    ) =>
      getOperationResults(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        jobId,
        options,
      ),
    unplannedFailover: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      failoverInput: ClusterUnplannedFailoverInput,
      options?: ReplicationProtectionClustersUnplannedFailoverOptionalParams,
    ) =>
      unplannedFailover(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        failoverInput,
        options,
      ),
    beginUnplannedFailover: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      failoverInput: ClusterUnplannedFailoverInput,
      options?: ReplicationProtectionClustersUnplannedFailoverOptionalParams,
    ) => {
      const poller = unplannedFailover(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        failoverInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUnplannedFailoverAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      failoverInput: ClusterUnplannedFailoverInput,
      options?: ReplicationProtectionClustersUnplannedFailoverOptionalParams,
    ) => {
      return await unplannedFailover(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        failoverInput,
        options,
      );
    },
    testFailoverCleanup: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      cleanupInput: ClusterTestFailoverCleanupInput,
      options?: ReplicationProtectionClustersTestFailoverCleanupOptionalParams,
    ) =>
      testFailoverCleanup(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        cleanupInput,
        options,
      ),
    beginTestFailoverCleanup: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      cleanupInput: ClusterTestFailoverCleanupInput,
      options?: ReplicationProtectionClustersTestFailoverCleanupOptionalParams,
    ) => {
      const poller = testFailoverCleanup(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        cleanupInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTestFailoverCleanupAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      cleanupInput: ClusterTestFailoverCleanupInput,
      options?: ReplicationProtectionClustersTestFailoverCleanupOptionalParams,
    ) => {
      return await testFailoverCleanup(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        cleanupInput,
        options,
      );
    },
    testFailover: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      failoverInput: ClusterTestFailoverInput,
      options?: ReplicationProtectionClustersTestFailoverOptionalParams,
    ) =>
      testFailover(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        failoverInput,
        options,
      ),
    beginTestFailover: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      failoverInput: ClusterTestFailoverInput,
      options?: ReplicationProtectionClustersTestFailoverOptionalParams,
    ) => {
      const poller = testFailover(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        failoverInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTestFailoverAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      failoverInput: ClusterTestFailoverInput,
      options?: ReplicationProtectionClustersTestFailoverOptionalParams,
    ) => {
      return await testFailover(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        failoverInput,
        options,
      );
    },
    repairReplication: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      options?: ReplicationProtectionClustersRepairReplicationOptionalParams,
    ) =>
      repairReplication(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        options,
      ),
    beginRepairReplication: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      options?: ReplicationProtectionClustersRepairReplicationOptionalParams,
    ) => {
      const poller = repairReplication(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRepairReplicationAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      options?: ReplicationProtectionClustersRepairReplicationOptionalParams,
    ) => {
      return await repairReplication(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        options,
      );
    },
    failoverCommit: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      options?: ReplicationProtectionClustersFailoverCommitOptionalParams,
    ) =>
      failoverCommit(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        options,
      ),
    beginFailoverCommit: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      options?: ReplicationProtectionClustersFailoverCommitOptionalParams,
    ) => {
      const poller = failoverCommit(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailoverCommitAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      options?: ReplicationProtectionClustersFailoverCommitOptionalParams,
    ) => {
      return await failoverCommit(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        options,
      );
    },
    applyRecoveryPoint: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      applyClusterRecoveryPointInput: ApplyClusterRecoveryPointInput,
      options?: ReplicationProtectionClustersApplyRecoveryPointOptionalParams,
    ) =>
      applyRecoveryPoint(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        applyClusterRecoveryPointInput,
        options,
      ),
    beginApplyRecoveryPoint: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      applyClusterRecoveryPointInput: ApplyClusterRecoveryPointInput,
      options?: ReplicationProtectionClustersApplyRecoveryPointOptionalParams,
    ) => {
      const poller = applyRecoveryPoint(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        applyClusterRecoveryPointInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginApplyRecoveryPointAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      applyClusterRecoveryPointInput: ApplyClusterRecoveryPointInput,
      options?: ReplicationProtectionClustersApplyRecoveryPointOptionalParams,
    ) => {
      return await applyRecoveryPoint(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        applyClusterRecoveryPointInput,
        options,
      );
    },
    purge: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      options?: ReplicationProtectionClustersPurgeOptionalParams,
    ) =>
      purge(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        options,
      ),
    beginPurge: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      options?: ReplicationProtectionClustersPurgeOptionalParams,
    ) => {
      const poller = purge(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPurgeAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      options?: ReplicationProtectionClustersPurgeOptionalParams,
    ) => {
      return await purge(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      replicationProtectionCluster: ReplicationProtectionCluster,
      options?: ReplicationProtectionClustersCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        replicationProtectionCluster,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      replicationProtectionCluster: ReplicationProtectionCluster,
      options?: ReplicationProtectionClustersCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        replicationProtectionCluster,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      replicationProtectionCluster: ReplicationProtectionCluster,
      options?: ReplicationProtectionClustersCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        replicationProtectionCluster,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      options?: ReplicationProtectionClustersGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        options,
      ),
  };
}

export function _getReplicationProtectionClustersOperations(
  context: SiteRecoveryManagementContext,
): ReplicationProtectionClustersOperations {
  return {
    ..._getReplicationProtectionClusters(context),
  };
}
