// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  revokeAccess,
  grantAccess,
  listByRestorePoint,
  get,
} from "../../api/diskRestorePoint/operations.js";
import {
  DiskRestorePointRevokeAccessOptionalParams,
  DiskRestorePointGrantAccessOptionalParams,
  DiskRestorePointListByRestorePointOptionalParams,
  DiskRestorePointGetOptionalParams,
} from "../../api/diskRestorePoint/options.js";
import {
  GrantAccessData,
  AccessUri,
  DiskRestorePoint,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import {
  SimplePollerLike,
  getSimplePoller,
} from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DiskRestorePoint operations. */
export interface DiskRestorePointOperations {
  /** Revokes access to a diskRestorePoint. */
  revokeAccess: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    options?: DiskRestorePointRevokeAccessOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use revokeAccess instead */
  beginRevokeAccess: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    options?: DiskRestorePointRevokeAccessOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use revokeAccess instead */
  beginRevokeAccessAndWait: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    options?: DiskRestorePointRevokeAccessOptionalParams,
  ) => Promise<void>;
  /** Grants access to a diskRestorePoint. */
  grantAccess: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    grantAccessData: GrantAccessData,
    options?: DiskRestorePointGrantAccessOptionalParams,
  ) => PollerLike<OperationState<AccessUri>, AccessUri>;
  /** @deprecated use grantAccess instead */
  beginGrantAccess: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    grantAccessData: GrantAccessData,
    options?: DiskRestorePointGrantAccessOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AccessUri>, AccessUri>>;
  /** @deprecated use grantAccess instead */
  beginGrantAccessAndWait: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    grantAccessData: GrantAccessData,
    options?: DiskRestorePointGrantAccessOptionalParams,
  ) => Promise<AccessUri>;
  /** Lists diskRestorePoints under a vmRestorePoint. */
  listByRestorePoint: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    options?: DiskRestorePointListByRestorePointOptionalParams,
  ) => PagedAsyncIterableIterator<DiskRestorePoint>;
  /** Get disk restorePoint resource */
  get: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    options?: DiskRestorePointGetOptionalParams,
  ) => Promise<DiskRestorePoint>;
}

function _getDiskRestorePoint(context: ComputeManagementContext) {
  return {
    revokeAccess: (
      resourceGroupName: string,
      restorePointCollectionName: string,
      vmRestorePointName: string,
      diskRestorePointName: string,
      options?: DiskRestorePointRevokeAccessOptionalParams,
    ) =>
      revokeAccess(
        context,
        resourceGroupName,
        restorePointCollectionName,
        vmRestorePointName,
        diskRestorePointName,
        options,
      ),
    beginRevokeAccess: async (
      resourceGroupName: string,
      restorePointCollectionName: string,
      vmRestorePointName: string,
      diskRestorePointName: string,
      options?: DiskRestorePointRevokeAccessOptionalParams,
    ) => {
      const poller = revokeAccess(
        context,
        resourceGroupName,
        restorePointCollectionName,
        vmRestorePointName,
        diskRestorePointName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRevokeAccessAndWait: async (
      resourceGroupName: string,
      restorePointCollectionName: string,
      vmRestorePointName: string,
      diskRestorePointName: string,
      options?: DiskRestorePointRevokeAccessOptionalParams,
    ) => {
      return await revokeAccess(
        context,
        resourceGroupName,
        restorePointCollectionName,
        vmRestorePointName,
        diskRestorePointName,
        options,
      );
    },
    grantAccess: (
      resourceGroupName: string,
      restorePointCollectionName: string,
      vmRestorePointName: string,
      diskRestorePointName: string,
      grantAccessData: GrantAccessData,
      options?: DiskRestorePointGrantAccessOptionalParams,
    ) =>
      grantAccess(
        context,
        resourceGroupName,
        restorePointCollectionName,
        vmRestorePointName,
        diskRestorePointName,
        grantAccessData,
        options,
      ),
    beginGrantAccess: async (
      resourceGroupName: string,
      restorePointCollectionName: string,
      vmRestorePointName: string,
      diskRestorePointName: string,
      grantAccessData: GrantAccessData,
      options?: DiskRestorePointGrantAccessOptionalParams,
    ) => {
      const poller = grantAccess(
        context,
        resourceGroupName,
        restorePointCollectionName,
        vmRestorePointName,
        diskRestorePointName,
        grantAccessData,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGrantAccessAndWait: async (
      resourceGroupName: string,
      restorePointCollectionName: string,
      vmRestorePointName: string,
      diskRestorePointName: string,
      grantAccessData: GrantAccessData,
      options?: DiskRestorePointGrantAccessOptionalParams,
    ) => {
      return await grantAccess(
        context,
        resourceGroupName,
        restorePointCollectionName,
        vmRestorePointName,
        diskRestorePointName,
        grantAccessData,
        options,
      );
    },
    listByRestorePoint: (
      resourceGroupName: string,
      restorePointCollectionName: string,
      vmRestorePointName: string,
      options?: DiskRestorePointListByRestorePointOptionalParams,
    ) =>
      listByRestorePoint(
        context,
        resourceGroupName,
        restorePointCollectionName,
        vmRestorePointName,
        options,
      ),
    get: (
      resourceGroupName: string,
      restorePointCollectionName: string,
      vmRestorePointName: string,
      diskRestorePointName: string,
      options?: DiskRestorePointGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        restorePointCollectionName,
        vmRestorePointName,
        diskRestorePointName,
        options,
      ),
  };
}

export function _getDiskRestorePointOperations(
  context: ComputeManagementContext,
): DiskRestorePointOperations {
  return {
    ..._getDiskRestorePoint(context),
  };
}
