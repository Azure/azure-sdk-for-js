// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  revokeAccess,
  grantAccess,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/snapshots/operations.js";
import type {
  SnapshotsRevokeAccessOptionalParams,
  SnapshotsGrantAccessOptionalParams,
  SnapshotsListOptionalParams,
  SnapshotsListByResourceGroupOptionalParams,
  SnapshotsDeleteOptionalParams,
  SnapshotsUpdateOptionalParams,
  SnapshotsCreateOrUpdateOptionalParams,
  SnapshotsGetOptionalParams,
} from "../../api/snapshots/options.js";
import type {
  GrantAccessData,
  AccessUri,
  OkResponse,
  Snapshot,
  SnapshotUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Snapshots operations. */
export interface SnapshotsOperations {
  /** Revokes access to a snapshot. */
  revokeAccess: (
    resourceGroupName: string,
    snapshotName: string,
    options?: SnapshotsRevokeAccessOptionalParams,
  ) => PollerLike<OperationState<OkResponse>, OkResponse>;
  /** @deprecated use revokeAccess instead */
  beginRevokeAccess: (
    resourceGroupName: string,
    snapshotName: string,
    options?: SnapshotsRevokeAccessOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OkResponse>, OkResponse>>;
  /** @deprecated use revokeAccess instead */
  beginRevokeAccessAndWait: (
    resourceGroupName: string,
    snapshotName: string,
    options?: SnapshotsRevokeAccessOptionalParams,
  ) => Promise<OkResponse>;
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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    snapshotName: string,
    snapshot: SnapshotUpdate,
    options?: SnapshotsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    snapshotName: string,
    snapshot: SnapshotUpdate,
    options?: SnapshotsUpdateOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a snapshot. */
  createOrUpdate: (
    resourceGroupName: string,
    snapshotName: string,
    snapshot: Snapshot,
    options?: SnapshotsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    snapshotName: string,
    snapshot: Snapshot,
    options?: SnapshotsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    snapshotName: string,
    snapshot: Snapshot,
    options?: SnapshotsCreateOrUpdateOptionalParams,
  ) => Promise<void>;
  /** Gets information about a snapshot. */
  get: (
    resourceGroupName: string,
    snapshotName: string,
    options?: SnapshotsGetOptionalParams,
  ) => Promise<Snapshot>;
}

function _getSnapshots(context: ComputeContext) {
  return {
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

export function _getSnapshotsOperations(context: ComputeContext): SnapshotsOperations {
  return {
    ..._getSnapshots(context),
  };
}
