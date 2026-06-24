// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  updateImmutabilityPolicyLock,
  updateImmutabilityPolicy,
  revokeAccess,
  grantAccess,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/snapshots/operations.js";
import {
  SnapshotsUpdateImmutabilityPolicyLockOptionalParams,
  SnapshotsUpdateImmutabilityPolicyOptionalParams,
  SnapshotsRevokeAccessOptionalParams,
  SnapshotsGrantAccessOptionalParams,
  SnapshotsListOptionalParams,
  SnapshotsListByResourceGroupOptionalParams,
  SnapshotsDeleteOptionalParams,
  SnapshotsUpdateOptionalParams,
  SnapshotsCreateOrUpdateOptionalParams,
  SnapshotsGetOptionalParams,
} from "../../api/snapshots/options.js";
import {
  GrantAccessData,
  AccessUri,
  Snapshot,
  SnapshotUpdate,
  ImmutabilityPolicyData,
  ImmutabilityPolicyLockData,
} from "../../models/computeDisk/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Snapshots operations. */
export interface SnapshotsOperations {
  /** Locks the immutability policy of a snapshot. Once locked, the policy cannot be reduced or removed until the lock period expires. */
  updateImmutabilityPolicyLock: (
    resourceGroupName: string,
    snapshotName: string,
    immutabilityPolicyData: ImmutabilityPolicyLockData,
    options?: SnapshotsUpdateImmutabilityPolicyLockOptionalParams,
  ) => PollerLike<OperationState<Snapshot>, Snapshot>;
  /** @deprecated use updateImmutabilityPolicyLock instead */
  beginUpdateImmutabilityPolicyLock: (
    resourceGroupName: string,
    snapshotName: string,
    immutabilityPolicyData: ImmutabilityPolicyLockData,
    options?: SnapshotsUpdateImmutabilityPolicyLockOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Snapshot>, Snapshot>>;
  /** @deprecated use updateImmutabilityPolicyLock instead */
  beginUpdateImmutabilityPolicyLockAndWait: (
    resourceGroupName: string,
    snapshotName: string,
    immutabilityPolicyData: ImmutabilityPolicyLockData,
    options?: SnapshotsUpdateImmutabilityPolicyLockOptionalParams,
  ) => Promise<Snapshot>;
  /** Updates the immutability policy of a snapshot. Sets or extends an unlocked immutability policy with the specified duration and type. If the snapshot already has a locked policy, the request will be rejected. Use updateImmutabilityPolicyLock to lock an immutability policy. */
  updateImmutabilityPolicy: (
    resourceGroupName: string,
    snapshotName: string,
    immutabilityPolicyData: ImmutabilityPolicyData,
    options?: SnapshotsUpdateImmutabilityPolicyOptionalParams,
  ) => PollerLike<OperationState<Snapshot>, Snapshot>;
  /** @deprecated use updateImmutabilityPolicy instead */
  beginUpdateImmutabilityPolicy: (
    resourceGroupName: string,
    snapshotName: string,
    immutabilityPolicyData: ImmutabilityPolicyData,
    options?: SnapshotsUpdateImmutabilityPolicyOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Snapshot>, Snapshot>>;
  /** @deprecated use updateImmutabilityPolicy instead */
  beginUpdateImmutabilityPolicyAndWait: (
    resourceGroupName: string,
    snapshotName: string,
    immutabilityPolicyData: ImmutabilityPolicyData,
    options?: SnapshotsUpdateImmutabilityPolicyOptionalParams,
  ) => Promise<Snapshot>;
  /** Revokes access to a snapshot. */
  revokeAccess: (
    resourceGroupName: string,
    snapshotName: string,
    options?: SnapshotsRevokeAccessOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use revokeAccess instead */
  beginRevokeAccess: (
    resourceGroupName: string,
    snapshotName: string,
    options?: SnapshotsRevokeAccessOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use revokeAccess instead */
  beginRevokeAccessAndWait: (
    resourceGroupName: string,
    snapshotName: string,
    options?: SnapshotsRevokeAccessOptionalParams,
  ) => Promise<void>;
  /** Grants access to a snapshot. */
  grantAccess: (
    resourceGroupName: string,
    snapshotName: string,
    grantAccessData: GrantAccessData,
    options?: SnapshotsGrantAccessOptionalParams,
  ) => PollerLike<OperationState<AccessUri>, AccessUri>;
  /** @deprecated use grantAccess instead */
  beginGrantAccess: (
    resourceGroupName: string,
    snapshotName: string,
    grantAccessData: GrantAccessData,
    options?: SnapshotsGrantAccessOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AccessUri>, AccessUri>>;
  /** @deprecated use grantAccess instead */
  beginGrantAccessAndWait: (
    resourceGroupName: string,
    snapshotName: string,
    grantAccessData: GrantAccessData,
    options?: SnapshotsGrantAccessOptionalParams,
  ) => Promise<AccessUri>;
  /** Lists snapshots under a subscription. */
  list: (options?: SnapshotsListOptionalParams) => PagedAsyncIterableIterator<Snapshot>;
  /** Lists snapshots under a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SnapshotsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Snapshot>;
  /** Deletes a snapshot. */
  delete: (
    resourceGroupName: string,
    snapshotName: string,
    options?: SnapshotsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    snapshotName: string,
    options?: SnapshotsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    snapshotName: string,
    options?: SnapshotsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates (patches) a snapshot. */
  update: (
    resourceGroupName: string,
    snapshotName: string,
    snapshot: SnapshotUpdate,
    options?: SnapshotsUpdateOptionalParams,
  ) => PollerLike<OperationState<Snapshot>, Snapshot>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    snapshotName: string,
    snapshot: SnapshotUpdate,
    options?: SnapshotsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Snapshot>, Snapshot>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    snapshotName: string,
    snapshot: SnapshotUpdate,
    options?: SnapshotsUpdateOptionalParams,
  ) => Promise<Snapshot>;
  /** Creates or updates a snapshot. */
  createOrUpdate: (
    resourceGroupName: string,
    snapshotName: string,
    snapshot: Snapshot,
    options?: SnapshotsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Snapshot>, Snapshot>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    snapshotName: string,
    snapshot: Snapshot,
    options?: SnapshotsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Snapshot>, Snapshot>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    snapshotName: string,
    snapshot: Snapshot,
    options?: SnapshotsCreateOrUpdateOptionalParams,
  ) => Promise<Snapshot>;
  /** Gets information about a snapshot. */
  get: (
    resourceGroupName: string,
    snapshotName: string,
    options?: SnapshotsGetOptionalParams,
  ) => Promise<Snapshot>;
}

function _getSnapshots(context: ComputeManagementContext) {
  return {
    updateImmutabilityPolicyLock: (
      resourceGroupName: string,
      snapshotName: string,
      immutabilityPolicyData: ImmutabilityPolicyLockData,
      options?: SnapshotsUpdateImmutabilityPolicyLockOptionalParams,
    ) =>
      updateImmutabilityPolicyLock(
        context,
        resourceGroupName,
        snapshotName,
        immutabilityPolicyData,
        options,
      ),
    beginUpdateImmutabilityPolicyLock: async (
      resourceGroupName: string,
      snapshotName: string,
      immutabilityPolicyData: ImmutabilityPolicyLockData,
      options?: SnapshotsUpdateImmutabilityPolicyLockOptionalParams,
    ) => {
      const poller = updateImmutabilityPolicyLock(
        context,
        resourceGroupName,
        snapshotName,
        immutabilityPolicyData,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateImmutabilityPolicyLockAndWait: async (
      resourceGroupName: string,
      snapshotName: string,
      immutabilityPolicyData: ImmutabilityPolicyLockData,
      options?: SnapshotsUpdateImmutabilityPolicyLockOptionalParams,
    ) => {
      return await updateImmutabilityPolicyLock(
        context,
        resourceGroupName,
        snapshotName,
        immutabilityPolicyData,
        options,
      );
    },
    updateImmutabilityPolicy: (
      resourceGroupName: string,
      snapshotName: string,
      immutabilityPolicyData: ImmutabilityPolicyData,
      options?: SnapshotsUpdateImmutabilityPolicyOptionalParams,
    ) =>
      updateImmutabilityPolicy(
        context,
        resourceGroupName,
        snapshotName,
        immutabilityPolicyData,
        options,
      ),
    beginUpdateImmutabilityPolicy: async (
      resourceGroupName: string,
      snapshotName: string,
      immutabilityPolicyData: ImmutabilityPolicyData,
      options?: SnapshotsUpdateImmutabilityPolicyOptionalParams,
    ) => {
      const poller = updateImmutabilityPolicy(
        context,
        resourceGroupName,
        snapshotName,
        immutabilityPolicyData,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateImmutabilityPolicyAndWait: async (
      resourceGroupName: string,
      snapshotName: string,
      immutabilityPolicyData: ImmutabilityPolicyData,
      options?: SnapshotsUpdateImmutabilityPolicyOptionalParams,
    ) => {
      return await updateImmutabilityPolicy(
        context,
        resourceGroupName,
        snapshotName,
        immutabilityPolicyData,
        options,
      );
    },
    revokeAccess: (
      resourceGroupName: string,
      snapshotName: string,
      options?: SnapshotsRevokeAccessOptionalParams,
    ) => revokeAccess(context, resourceGroupName, snapshotName, options),
    beginRevokeAccess: async (
      resourceGroupName: string,
      snapshotName: string,
      options?: SnapshotsRevokeAccessOptionalParams,
    ) => {
      const poller = revokeAccess(context, resourceGroupName, snapshotName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRevokeAccessAndWait: async (
      resourceGroupName: string,
      snapshotName: string,
      options?: SnapshotsRevokeAccessOptionalParams,
    ) => {
      return await revokeAccess(context, resourceGroupName, snapshotName, options);
    },
    grantAccess: (
      resourceGroupName: string,
      snapshotName: string,
      grantAccessData: GrantAccessData,
      options?: SnapshotsGrantAccessOptionalParams,
    ) => grantAccess(context, resourceGroupName, snapshotName, grantAccessData, options),
    beginGrantAccess: async (
      resourceGroupName: string,
      snapshotName: string,
      grantAccessData: GrantAccessData,
      options?: SnapshotsGrantAccessOptionalParams,
    ) => {
      const poller = grantAccess(
        context,
        resourceGroupName,
        snapshotName,
        grantAccessData,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGrantAccessAndWait: async (
      resourceGroupName: string,
      snapshotName: string,
      grantAccessData: GrantAccessData,
      options?: SnapshotsGrantAccessOptionalParams,
    ) => {
      return await grantAccess(context, resourceGroupName, snapshotName, grantAccessData, options);
    },
    list: (options?: SnapshotsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SnapshotsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      snapshotName: string,
      options?: SnapshotsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, snapshotName, options),
    beginDelete: async (
      resourceGroupName: string,
      snapshotName: string,
      options?: SnapshotsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, snapshotName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      snapshotName: string,
      options?: SnapshotsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, snapshotName, options);
    },
    update: (
      resourceGroupName: string,
      snapshotName: string,
      snapshot: SnapshotUpdate,
      options?: SnapshotsUpdateOptionalParams,
    ) => update(context, resourceGroupName, snapshotName, snapshot, options),
    beginUpdate: async (
      resourceGroupName: string,
      snapshotName: string,
      snapshot: SnapshotUpdate,
      options?: SnapshotsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, snapshotName, snapshot, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      snapshotName: string,
      snapshot: SnapshotUpdate,
      options?: SnapshotsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, snapshotName, snapshot, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      snapshotName: string,
      snapshot: Snapshot,
      options?: SnapshotsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, snapshotName, snapshot, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      snapshotName: string,
      snapshot: Snapshot,
      options?: SnapshotsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, snapshotName, snapshot, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      snapshotName: string,
      snapshot: Snapshot,
      options?: SnapshotsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, snapshotName, snapshot, options);
    },
    get: (resourceGroupName: string, snapshotName: string, options?: SnapshotsGetOptionalParams) =>
      get(context, resourceGroupName, snapshotName, options),
  };
}

export function _getSnapshotsOperations(context: ComputeManagementContext): SnapshotsOperations {
  return {
    ..._getSnapshots(context),
  };
}
