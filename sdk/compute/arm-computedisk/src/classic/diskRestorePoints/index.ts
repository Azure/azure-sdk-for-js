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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use revokeAccess instead */
  beginRevokeAccess: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    options?: DiskRestorePointsRevokeAccessOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OkResponse>, OkResponse>>;
  /** @deprecated use revokeAccess instead */
  beginRevokeAccessAndWait: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    options?: DiskRestorePointsRevokeAccessOptionalParams,
  ) => Promise<OkResponse>;
  /** Grants access to a diskRestorePoint. */
  grantAccess: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    grantAccessData: GrantAccessData,
    options?: DiskRestorePointsGrantAccessOptionalParams,
  ) => PollerLike<OperationState<AccessUri>, AccessUri>;
  /** @deprecated use grantAccess instead */
  beginGrantAccess: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    grantAccessData: GrantAccessData,
    options?: DiskRestorePointsGrantAccessOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AccessUri>, AccessUri>>;
  /** @deprecated use grantAccess instead */
  beginGrantAccessAndWait: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    grantAccessData: GrantAccessData,
    options?: DiskRestorePointsGrantAccessOptionalParams,
  ) => Promise<AccessUri>;
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
    beginRevokeAccess: async (
      resourceGroupName: string,
      restorePointCollectionName: string,
      vmRestorePointName: string,
      diskRestorePointName: string,
      options?: DiskRestorePointsRevokeAccessOptionalParams,
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
      options?: DiskRestorePointsRevokeAccessOptionalParams,
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
    beginGrantAccess: async (
      resourceGroupName: string,
      restorePointCollectionName: string,
      vmRestorePointName: string,
      diskRestorePointName: string,
      grantAccessData: GrantAccessData,
      options?: DiskRestorePointsGrantAccessOptionalParams,
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
      options?: DiskRestorePointsGrantAccessOptionalParams,
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
