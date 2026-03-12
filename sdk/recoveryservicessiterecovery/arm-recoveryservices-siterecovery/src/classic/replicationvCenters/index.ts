// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import {
  list,
  listByReplicationFabrics,
  $delete,
  update,
  create,
  get,
} from "../../api/replicationvCenters/operations.js";
import type {
  ReplicationvCentersListOptionalParams,
  ReplicationvCentersListByReplicationFabricsOptionalParams,
  ReplicationvCentersDeleteOptionalParams,
  ReplicationvCentersUpdateOptionalParams,
  ReplicationvCentersCreateOptionalParams,
  ReplicationvCentersGetOptionalParams,
} from "../../api/replicationvCenters/options.js";
import type { VCenter, AddVCenterRequest, UpdateVCenterRequest } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ReplicationvCenters operations. */
export interface ReplicationvCentersOperations {
  /** Lists the vCenter servers registered in the vault. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationvCentersListOptionalParams,
  ) => PagedAsyncIterableIterator<VCenter>;
  /** Lists the vCenter servers registered in a fabric. */
  listByReplicationFabrics: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationvCentersListByReplicationFabricsOptionalParams,
  ) => PagedAsyncIterableIterator<VCenter>;
  /** The operation to remove(unregister) a registered vCenter server from the vault. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    vcenterName: string,
    options?: ReplicationvCentersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    vcenterName: string,
    options?: ReplicationvCentersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    vcenterName: string,
    options?: ReplicationvCentersDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to update a registered vCenter. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    vcenterName: string,
    updateVCenterRequest: UpdateVCenterRequest,
    options?: ReplicationvCentersUpdateOptionalParams,
  ) => PollerLike<OperationState<VCenter>, VCenter>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    vcenterName: string,
    updateVCenterRequest: UpdateVCenterRequest,
    options?: ReplicationvCentersUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VCenter>, VCenter>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    vcenterName: string,
    updateVCenterRequest: UpdateVCenterRequest,
    options?: ReplicationvCentersUpdateOptionalParams,
  ) => Promise<VCenter>;
  /** The operation to create a vCenter object.. */
  create: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    vcenterName: string,
    addVCenterRequest: AddVCenterRequest,
    options?: ReplicationvCentersCreateOptionalParams,
  ) => PollerLike<OperationState<VCenter>, VCenter>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    vcenterName: string,
    addVCenterRequest: AddVCenterRequest,
    options?: ReplicationvCentersCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VCenter>, VCenter>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    vcenterName: string,
    addVCenterRequest: AddVCenterRequest,
    options?: ReplicationvCentersCreateOptionalParams,
  ) => Promise<VCenter>;
  /** Gets the details of a registered vCenter server(Add vCenter server). */
  get: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    vcenterName: string,
    options?: ReplicationvCentersGetOptionalParams,
  ) => Promise<VCenter>;
}

function _getReplicationvCenters(context: SiteRecoveryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationvCentersListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    listByReplicationFabrics: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      options?: ReplicationvCentersListByReplicationFabricsOptionalParams,
    ) => listByReplicationFabrics(context, resourceGroupName, resourceName, fabricName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      vcenterName: string,
      options?: ReplicationvCentersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, fabricName, vcenterName, options),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      vcenterName: string,
      options?: ReplicationvCentersDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        vcenterName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      vcenterName: string,
      options?: ReplicationvCentersDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        vcenterName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      vcenterName: string,
      updateVCenterRequest: UpdateVCenterRequest,
      options?: ReplicationvCentersUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        vcenterName,
        updateVCenterRequest,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      vcenterName: string,
      updateVCenterRequest: UpdateVCenterRequest,
      options?: ReplicationvCentersUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        vcenterName,
        updateVCenterRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      vcenterName: string,
      updateVCenterRequest: UpdateVCenterRequest,
      options?: ReplicationvCentersUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        vcenterName,
        updateVCenterRequest,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      vcenterName: string,
      addVCenterRequest: AddVCenterRequest,
      options?: ReplicationvCentersCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        vcenterName,
        addVCenterRequest,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      vcenterName: string,
      addVCenterRequest: AddVCenterRequest,
      options?: ReplicationvCentersCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        vcenterName,
        addVCenterRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      vcenterName: string,
      addVCenterRequest: AddVCenterRequest,
      options?: ReplicationvCentersCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        vcenterName,
        addVCenterRequest,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      vcenterName: string,
      options?: ReplicationvCentersGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, fabricName, vcenterName, options),
  };
}

export function _getReplicationvCentersOperations(
  context: SiteRecoveryManagementContext,
): ReplicationvCentersOperations {
  return {
    ..._getReplicationvCenters(context),
  };
}
