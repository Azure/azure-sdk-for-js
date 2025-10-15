// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  revokeAccess,
  grantAccess,
  listByRestorePoint,
  get,
} from "../../api/diskRestorePoints/operations.js";
import type {
  DiskRestorePointsRevokeAccessOptionalParams,
  DiskRestorePointsGrantAccessOptionalParams,
  DiskRestorePointsListByRestorePointOptionalParams,
  DiskRestorePointsGetOptionalParams,
} from "../../api/diskRestorePoints/options.js";
import type {
  GrantAccessData,
  AccessUri,
  OkResponse,
  DiskRestorePoint,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DiskRestorePoints operations. */
export interface DiskRestorePointsOperations {
  /** Revokes access to a diskRestorePoint. */
  revokeAccess: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    options?: DiskRestorePointsRevokeAccessOptionalParams,
  ) => PollerLike<OperationState<OkResponse>, OkResponse>;
  /** Grants access to a diskRestorePoint. */
  grantAccess: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    grantAccessData: GrantAccessData,
    options?: DiskRestorePointsGrantAccessOptionalParams,
  ) => PollerLike<OperationState<AccessUri>, AccessUri>;
  /** Lists diskRestorePoints under a vmRestorePoint. */
  listByRestorePoint: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    options?: DiskRestorePointsListByRestorePointOptionalParams,
  ) => PagedAsyncIterableIterator<DiskRestorePoint>;
  /** Get disk restorePoint resource */
  get: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    options?: DiskRestorePointsGetOptionalParams,
  ) => Promise<DiskRestorePoint>;
}

function _getDiskRestorePoints(context: ComputeContext) {
  return {
    revokeAccess: (
      resourceGroupName: string,
      restorePointCollectionName: string,
      vmRestorePointName: string,
      diskRestorePointName: string,
      options?: DiskRestorePointsRevokeAccessOptionalParams,
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
      options?: DiskRestorePointsGrantAccessOptionalParams,
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
      options?: DiskRestorePointsListByRestorePointOptionalParams,
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
      options?: DiskRestorePointsGetOptionalParams,
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

export function _getDiskRestorePointsOperations(
  context: ComputeContext,
): DiskRestorePointsOperations {
  return {
    ..._getDiskRestorePoints(context),
  };
}
