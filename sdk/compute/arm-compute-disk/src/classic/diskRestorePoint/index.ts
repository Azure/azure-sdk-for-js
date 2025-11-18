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
  /** Grants access to a diskRestorePoint. */
  grantAccess: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    grantAccessData: GrantAccessData,
    options?: DiskRestorePointGrantAccessOptionalParams,
  ) => PollerLike<OperationState<AccessUri>, AccessUri>;
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
