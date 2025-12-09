// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  listQuotaReport,
  revertRelocation,
  finalizeRelocation,
  relocate,
  poolChange,
  performReplicationTransfer,
  finalizeExternalReplication,
  authorizeExternalReplication,
  peerExternalCluster,
  reInitializeReplication,
  authorizeReplication,
  deleteReplication,
  resyncReplication,
  listReplications,
  replicationStatus,
  reestablishReplication,
  breakReplication,
  listGetGroupIdListForLdapUser,
  breakFileLocks,
  splitCloneFromParent,
  resetCifsPassword,
  revert,
  populateAvailabilityZone,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/volumes/operations.js";
import type {
  VolumesListQuotaReportOptionalParams,
  VolumesRevertRelocationOptionalParams,
  VolumesFinalizeRelocationOptionalParams,
  VolumesRelocateOptionalParams,
  VolumesPoolChangeOptionalParams,
  VolumesPerformReplicationTransferOptionalParams,
  VolumesFinalizeExternalReplicationOptionalParams,
  VolumesAuthorizeExternalReplicationOptionalParams,
  VolumesPeerExternalClusterOptionalParams,
  VolumesReInitializeReplicationOptionalParams,
  VolumesAuthorizeReplicationOptionalParams,
  VolumesDeleteReplicationOptionalParams,
  VolumesResyncReplicationOptionalParams,
  VolumesListReplicationsOptionalParams,
  VolumesReplicationStatusOptionalParams,
  VolumesReestablishReplicationOptionalParams,
  VolumesBreakReplicationOptionalParams,
  VolumesListGetGroupIdListForLdapUserOptionalParams,
  VolumesBreakFileLocksOptionalParams,
  VolumesSplitCloneFromParentOptionalParams,
  VolumesResetCifsPasswordOptionalParams,
  VolumesRevertOptionalParams,
  VolumesPopulateAvailabilityZoneOptionalParams,
  VolumesListOptionalParams,
  VolumesDeleteOptionalParams,
  VolumesUpdateOptionalParams,
  VolumesCreateOrUpdateOptionalParams,
  VolumesGetOptionalParams,
} from "../../api/volumes/options.js";
import type {
  Volume,
  VolumePatch,
  VolumeRevert,
  GetGroupIdListForLdapUserRequest,
  GetGroupIdListForLdapUserResponse,
  ReestablishReplicationRequest,
  ReplicationStatus,
  Replication,
  AuthorizeRequest,
  PeerClusterForVolumeMigrationRequest,
  ClusterPeerCommandResponse,
  SvmPeerCommandResponse,
  PoolChangeRequest,
  ListQuotaReportResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Volumes operations. */
export interface VolumesOperations {
  /** A long-running resource action. */
  listQuotaReport: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: VolumesListQuotaReportOptionalParams,
  ) => PollerLike<OperationState<ListQuotaReportResponse>, ListQuotaReportResponse>;
  /** Reverts the volume relocation process, cleans up the new volume and starts using the former-existing volume. */
  revertRelocation: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: VolumesRevertRelocationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Finalizes the relocation of the volume and cleans up the old volume. */
  finalizeRelocation: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: VolumesFinalizeRelocationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Relocates volume to a new stamp */
  relocate: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: VolumesRelocateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Moves volume to another pool */
  poolChange: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    body: PoolChangeRequest,
    options?: VolumesPoolChangeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Performs an adhoc replication transfer on a volume with volumeType Migration */
  performReplicationTransfer: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: VolumesPerformReplicationTransferOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Finalizes the migration of an external volume by releasing the replication and breaking the external cluster peering if no other migration is active. */
  finalizeExternalReplication: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: VolumesFinalizeExternalReplicationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Starts SVM peering and returns a command to be run on the external ONTAP to accept it.  Once the SVM have been peered a SnapMirror will be created */
  authorizeExternalReplication: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: VolumesAuthorizeExternalReplicationOptionalParams,
  ) => PollerLike<OperationState<SvmPeerCommandResponse>, SvmPeerCommandResponse>;
  /** Starts peering the external cluster for this migration volume */
  peerExternalCluster: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    body: PeerClusterForVolumeMigrationRequest,
    options?: VolumesPeerExternalClusterOptionalParams,
  ) => PollerLike<OperationState<ClusterPeerCommandResponse>, ClusterPeerCommandResponse>;
  /** Re-Initializes the replication connection on the destination volume */
  reInitializeReplication: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: VolumesReInitializeReplicationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Authorize the replication connection on the source volume */
  authorizeReplication: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    body: AuthorizeRequest,
    options?: VolumesAuthorizeReplicationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Delete the replication connection on the destination volume, and send release to the source replication */
  deleteReplication: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: VolumesDeleteReplicationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Resync the connection on the destination volume. If the operation is ran on the source volume it will reverse-resync the connection and sync from destination to source. */
  resyncReplication: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: VolumesResyncReplicationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List all replications for a specified volume */
  listReplications: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: VolumesListReplicationsOptionalParams,
  ) => PagedAsyncIterableIterator<Replication>;
  /** Get the status of the replication */
  replicationStatus: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: VolumesReplicationStatusOptionalParams,
  ) => Promise<ReplicationStatus>;
  /** Re-establish a previously deleted replication between 2 volumes that have a common ad-hoc or policy-based snapshots */
  reestablishReplication: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    body: ReestablishReplicationRequest,
    options?: VolumesReestablishReplicationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Break the replication connection on the destination volume */
  breakReplication: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: VolumesBreakReplicationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Returns the list of group Ids for a specific LDAP User */
  listGetGroupIdListForLdapUser: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    body: GetGroupIdListForLdapUserRequest,
    options?: VolumesListGetGroupIdListForLdapUserOptionalParams,
  ) => PollerLike<
    OperationState<GetGroupIdListForLdapUserResponse>,
    GetGroupIdListForLdapUserResponse
  >;
  /** Break all the file locks on a volume */
  breakFileLocks: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: VolumesBreakFileLocksOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Split operation to convert clone volume to an independent volume. */
  splitCloneFromParent: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: VolumesSplitCloneFromParentOptionalParams,
  ) => PollerLike<OperationState<Volume>, Volume>;
  /** Reset cifs password from volume */
  resetCifsPassword: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: VolumesResetCifsPasswordOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Revert a volume to the snapshot specified in the body */
  revert: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    body: VolumeRevert,
    options?: VolumesRevertOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** This operation will populate availability zone information for a volume */
  populateAvailabilityZone: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: VolumesPopulateAvailabilityZoneOptionalParams,
  ) => PollerLike<OperationState<Volume>, Volume>;
  /** List all volumes within the capacity pool */
  list: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    options?: VolumesListOptionalParams,
  ) => PagedAsyncIterableIterator<Volume>;
  /** Delete the specified volume */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: VolumesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch the specified volume */
  update: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    body: VolumePatch,
    options?: VolumesUpdateOptionalParams,
  ) => PollerLike<OperationState<Volume>, Volume>;
  /** Create or update the specified volume within the capacity pool */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    body: Volume,
    options?: VolumesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Volume>, Volume>;
  /** Get the details of the specified volume */
  get: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: VolumesGetOptionalParams,
  ) => Promise<Volume>;
}

function _getVolumes(context: NetAppManagementContext) {
  return {
    listQuotaReport: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: VolumesListQuotaReportOptionalParams,
    ) => listQuotaReport(context, resourceGroupName, accountName, poolName, volumeName, options),
    revertRelocation: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: VolumesRevertRelocationOptionalParams,
    ) => revertRelocation(context, resourceGroupName, accountName, poolName, volumeName, options),
    finalizeRelocation: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: VolumesFinalizeRelocationOptionalParams,
    ) => finalizeRelocation(context, resourceGroupName, accountName, poolName, volumeName, options),
    relocate: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: VolumesRelocateOptionalParams,
    ) => relocate(context, resourceGroupName, accountName, poolName, volumeName, options),
    poolChange: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      body: PoolChangeRequest,
      options?: VolumesPoolChangeOptionalParams,
    ) => poolChange(context, resourceGroupName, accountName, poolName, volumeName, body, options),
    performReplicationTransfer: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: VolumesPerformReplicationTransferOptionalParams,
    ) =>
      performReplicationTransfer(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        options,
      ),
    finalizeExternalReplication: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: VolumesFinalizeExternalReplicationOptionalParams,
    ) =>
      finalizeExternalReplication(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        options,
      ),
    authorizeExternalReplication: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: VolumesAuthorizeExternalReplicationOptionalParams,
    ) =>
      authorizeExternalReplication(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        options,
      ),
    peerExternalCluster: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      body: PeerClusterForVolumeMigrationRequest,
      options?: VolumesPeerExternalClusterOptionalParams,
    ) =>
      peerExternalCluster(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        body,
        options,
      ),
    reInitializeReplication: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: VolumesReInitializeReplicationOptionalParams,
    ) =>
      reInitializeReplication(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        options,
      ),
    authorizeReplication: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      body: AuthorizeRequest,
      options?: VolumesAuthorizeReplicationOptionalParams,
    ) =>
      authorizeReplication(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        body,
        options,
      ),
    deleteReplication: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: VolumesDeleteReplicationOptionalParams,
    ) => deleteReplication(context, resourceGroupName, accountName, poolName, volumeName, options),
    resyncReplication: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: VolumesResyncReplicationOptionalParams,
    ) => resyncReplication(context, resourceGroupName, accountName, poolName, volumeName, options),
    listReplications: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: VolumesListReplicationsOptionalParams,
    ) => listReplications(context, resourceGroupName, accountName, poolName, volumeName, options),
    replicationStatus: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: VolumesReplicationStatusOptionalParams,
    ) => replicationStatus(context, resourceGroupName, accountName, poolName, volumeName, options),
    reestablishReplication: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      body: ReestablishReplicationRequest,
      options?: VolumesReestablishReplicationOptionalParams,
    ) =>
      reestablishReplication(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        body,
        options,
      ),
    breakReplication: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: VolumesBreakReplicationOptionalParams,
    ) => breakReplication(context, resourceGroupName, accountName, poolName, volumeName, options),
    listGetGroupIdListForLdapUser: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      body: GetGroupIdListForLdapUserRequest,
      options?: VolumesListGetGroupIdListForLdapUserOptionalParams,
    ) =>
      listGetGroupIdListForLdapUser(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        body,
        options,
      ),
    breakFileLocks: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: VolumesBreakFileLocksOptionalParams,
    ) => breakFileLocks(context, resourceGroupName, accountName, poolName, volumeName, options),
    splitCloneFromParent: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: VolumesSplitCloneFromParentOptionalParams,
    ) =>
      splitCloneFromParent(context, resourceGroupName, accountName, poolName, volumeName, options),
    resetCifsPassword: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: VolumesResetCifsPasswordOptionalParams,
    ) => resetCifsPassword(context, resourceGroupName, accountName, poolName, volumeName, options),
    revert: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      body: VolumeRevert,
      options?: VolumesRevertOptionalParams,
    ) => revert(context, resourceGroupName, accountName, poolName, volumeName, body, options),
    populateAvailabilityZone: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: VolumesPopulateAvailabilityZoneOptionalParams,
    ) =>
      populateAvailabilityZone(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        options,
      ),
    list: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      options?: VolumesListOptionalParams,
    ) => list(context, resourceGroupName, accountName, poolName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: VolumesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, poolName, volumeName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      body: VolumePatch,
      options?: VolumesUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, poolName, volumeName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      body: Volume,
      options?: VolumesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, accountName, poolName, volumeName, body, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: VolumesGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, poolName, volumeName, options),
  };
}

export function _getVolumesOperations(context: NetAppManagementContext): VolumesOperations {
  return {
    ..._getVolumes(context),
  };
}
