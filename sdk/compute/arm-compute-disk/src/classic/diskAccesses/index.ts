// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  listPrivateEndpointConnections,
  deleteAPrivateEndpointConnection,
  updateAPrivateEndpointConnection,
  getAPrivateEndpointConnection,
  getPrivateLinkResources,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/diskAccesses/operations.js";
import {
  DiskAccessesListPrivateEndpointConnectionsOptionalParams,
  DiskAccessesDeleteAPrivateEndpointConnectionOptionalParams,
  DiskAccessesUpdateAPrivateEndpointConnectionOptionalParams,
  DiskAccessesGetAPrivateEndpointConnectionOptionalParams,
  DiskAccessesGetPrivateLinkResourcesOptionalParams,
  DiskAccessesListOptionalParams,
  DiskAccessesListByResourceGroupOptionalParams,
  DiskAccessesDeleteOptionalParams,
  DiskAccessesUpdateOptionalParams,
  DiskAccessesCreateOrUpdateOptionalParams,
  DiskAccessesGetOptionalParams,
} from "../../api/diskAccesses/options.js";
import {
  DiskAccess,
  PrivateEndpointConnection,
  DiskAccessUpdate,
  PrivateLinkResourceListResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import {
  SimplePollerLike,
  getSimplePoller,
} from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DiskAccesses operations. */
export interface DiskAccessesOperations {
  /** List information about private endpoint connections under a disk access resource */
  listPrivateEndpointConnections: (
    resourceGroupName: string,
    diskAccessName: string,
    options?: DiskAccessesListPrivateEndpointConnectionsOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Deletes a private endpoint connection under a disk access resource. */
  deleteAPrivateEndpointConnection: (
    resourceGroupName: string,
    diskAccessName: string,
    privateEndpointConnectionName: string,
    options?: DiskAccessesDeleteAPrivateEndpointConnectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteAPrivateEndpointConnection instead */
  beginDeleteAPrivateEndpointConnection: (
    resourceGroupName: string,
    diskAccessName: string,
    privateEndpointConnectionName: string,
    options?: DiskAccessesDeleteAPrivateEndpointConnectionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteAPrivateEndpointConnection instead */
  beginDeleteAPrivateEndpointConnectionAndWait: (
    resourceGroupName: string,
    diskAccessName: string,
    privateEndpointConnectionName: string,
    options?: DiskAccessesDeleteAPrivateEndpointConnectionOptionalParams,
  ) => Promise<void>;
  /** Approve or reject a private endpoint connection under disk access resource, this can't be used to create a new private endpoint connection. */
  updateAPrivateEndpointConnection: (
    resourceGroupName: string,
    diskAccessName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnection: PrivateEndpointConnection,
    options?: DiskAccessesUpdateAPrivateEndpointConnectionOptionalParams,
  ) => PollerLike<
    OperationState<PrivateEndpointConnection>,
    PrivateEndpointConnection
  >;
  /** @deprecated use updateAPrivateEndpointConnection instead */
  beginUpdateAPrivateEndpointConnection: (
    resourceGroupName: string,
    diskAccessName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnection: PrivateEndpointConnection,
    options?: DiskAccessesUpdateAPrivateEndpointConnectionOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<PrivateEndpointConnection>,
      PrivateEndpointConnection
    >
  >;
  /** @deprecated use updateAPrivateEndpointConnection instead */
  beginUpdateAPrivateEndpointConnectionAndWait: (
    resourceGroupName: string,
    diskAccessName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnection: PrivateEndpointConnection,
    options?: DiskAccessesUpdateAPrivateEndpointConnectionOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Gets information about a private endpoint connection under a disk access resource. */
  getAPrivateEndpointConnection: (
    resourceGroupName: string,
    diskAccessName: string,
    privateEndpointConnectionName: string,
    options?: DiskAccessesGetAPrivateEndpointConnectionOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Gets the private link resources possible under disk access resource */
  getPrivateLinkResources: (
    resourceGroupName: string,
    diskAccessName: string,
    options?: DiskAccessesGetPrivateLinkResourcesOptionalParams,
  ) => Promise<PrivateLinkResourceListResult>;
  /** Lists all the disk access resources under a subscription. */
  list: (
    options?: DiskAccessesListOptionalParams,
  ) => PagedAsyncIterableIterator<DiskAccess>;
  /** Lists all the disk access resources under a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DiskAccessesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DiskAccess>;
  /** Deletes a disk access resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    diskAccessName: string,
    options?: DiskAccessesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    diskAccessName: string,
    options?: DiskAccessesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    diskAccessName: string,
    options?: DiskAccessesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates (patches) a disk access resource. */
  update: (
    resourceGroupName: string,
    diskAccessName: string,
    diskAccess: DiskAccessUpdate,
    options?: DiskAccessesUpdateOptionalParams,
  ) => PollerLike<OperationState<DiskAccess>, DiskAccess>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    diskAccessName: string,
    diskAccess: DiskAccessUpdate,
    options?: DiskAccessesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DiskAccess>, DiskAccess>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    diskAccessName: string,
    diskAccess: DiskAccessUpdate,
    options?: DiskAccessesUpdateOptionalParams,
  ) => Promise<DiskAccess>;
  /** Creates or updates a disk access resource */
  createOrUpdate: (
    resourceGroupName: string,
    diskAccessName: string,
    diskAccess: DiskAccess,
    options?: DiskAccessesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DiskAccess>, DiskAccess>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    diskAccessName: string,
    diskAccess: DiskAccess,
    options?: DiskAccessesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DiskAccess>, DiskAccess>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    diskAccessName: string,
    diskAccess: DiskAccess,
    options?: DiskAccessesCreateOrUpdateOptionalParams,
  ) => Promise<DiskAccess>;
  /** Gets information about a disk access resource. */
  get: (
    resourceGroupName: string,
    diskAccessName: string,
    options?: DiskAccessesGetOptionalParams,
  ) => Promise<DiskAccess>;
}

function _getDiskAccesses(context: ComputeManagementContext) {
  return {
    listPrivateEndpointConnections: (
      resourceGroupName: string,
      diskAccessName: string,
      options?: DiskAccessesListPrivateEndpointConnectionsOptionalParams,
    ) =>
      listPrivateEndpointConnections(
        context,
        resourceGroupName,
        diskAccessName,
        options,
      ),
    deleteAPrivateEndpointConnection: (
      resourceGroupName: string,
      diskAccessName: string,
      privateEndpointConnectionName: string,
      options?: DiskAccessesDeleteAPrivateEndpointConnectionOptionalParams,
    ) =>
      deleteAPrivateEndpointConnection(
        context,
        resourceGroupName,
        diskAccessName,
        privateEndpointConnectionName,
        options,
      ),
    beginDeleteAPrivateEndpointConnection: async (
      resourceGroupName: string,
      diskAccessName: string,
      privateEndpointConnectionName: string,
      options?: DiskAccessesDeleteAPrivateEndpointConnectionOptionalParams,
    ) => {
      const poller = deleteAPrivateEndpointConnection(
        context,
        resourceGroupName,
        diskAccessName,
        privateEndpointConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAPrivateEndpointConnectionAndWait: async (
      resourceGroupName: string,
      diskAccessName: string,
      privateEndpointConnectionName: string,
      options?: DiskAccessesDeleteAPrivateEndpointConnectionOptionalParams,
    ) => {
      return await deleteAPrivateEndpointConnection(
        context,
        resourceGroupName,
        diskAccessName,
        privateEndpointConnectionName,
        options,
      );
    },
    updateAPrivateEndpointConnection: (
      resourceGroupName: string,
      diskAccessName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnection: PrivateEndpointConnection,
      options?: DiskAccessesUpdateAPrivateEndpointConnectionOptionalParams,
    ) =>
      updateAPrivateEndpointConnection(
        context,
        resourceGroupName,
        diskAccessName,
        privateEndpointConnectionName,
        privateEndpointConnection,
        options,
      ),
    beginUpdateAPrivateEndpointConnection: async (
      resourceGroupName: string,
      diskAccessName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnection: PrivateEndpointConnection,
      options?: DiskAccessesUpdateAPrivateEndpointConnectionOptionalParams,
    ) => {
      const poller = updateAPrivateEndpointConnection(
        context,
        resourceGroupName,
        diskAccessName,
        privateEndpointConnectionName,
        privateEndpointConnection,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAPrivateEndpointConnectionAndWait: async (
      resourceGroupName: string,
      diskAccessName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnection: PrivateEndpointConnection,
      options?: DiskAccessesUpdateAPrivateEndpointConnectionOptionalParams,
    ) => {
      return await updateAPrivateEndpointConnection(
        context,
        resourceGroupName,
        diskAccessName,
        privateEndpointConnectionName,
        privateEndpointConnection,
        options,
      );
    },
    getAPrivateEndpointConnection: (
      resourceGroupName: string,
      diskAccessName: string,
      privateEndpointConnectionName: string,
      options?: DiskAccessesGetAPrivateEndpointConnectionOptionalParams,
    ) =>
      getAPrivateEndpointConnection(
        context,
        resourceGroupName,
        diskAccessName,
        privateEndpointConnectionName,
        options,
      ),
    getPrivateLinkResources: (
      resourceGroupName: string,
      diskAccessName: string,
      options?: DiskAccessesGetPrivateLinkResourcesOptionalParams,
    ) =>
      getPrivateLinkResources(
        context,
        resourceGroupName,
        diskAccessName,
        options,
      ),
    list: (options?: DiskAccessesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DiskAccessesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      diskAccessName: string,
      options?: DiskAccessesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, diskAccessName, options),
    beginDelete: async (
      resourceGroupName: string,
      diskAccessName: string,
      options?: DiskAccessesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        diskAccessName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      diskAccessName: string,
      options?: DiskAccessesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, diskAccessName, options);
    },
    update: (
      resourceGroupName: string,
      diskAccessName: string,
      diskAccess: DiskAccessUpdate,
      options?: DiskAccessesUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, diskAccessName, diskAccess, options),
    beginUpdate: async (
      resourceGroupName: string,
      diskAccessName: string,
      diskAccess: DiskAccessUpdate,
      options?: DiskAccessesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        diskAccessName,
        diskAccess,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      diskAccessName: string,
      diskAccess: DiskAccessUpdate,
      options?: DiskAccessesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        diskAccessName,
        diskAccess,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      diskAccessName: string,
      diskAccess: DiskAccess,
      options?: DiskAccessesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        diskAccessName,
        diskAccess,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      diskAccessName: string,
      diskAccess: DiskAccess,
      options?: DiskAccessesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        diskAccessName,
        diskAccess,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      diskAccessName: string,
      diskAccess: DiskAccess,
      options?: DiskAccessesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        diskAccessName,
        diskAccess,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      diskAccessName: string,
      options?: DiskAccessesGetOptionalParams,
    ) => get(context, resourceGroupName, diskAccessName, options),
  };
}

export function _getDiskAccessesOperations(
  context: ComputeManagementContext,
): DiskAccessesOperations {
  return {
    ..._getDiskAccesses(context),
  };
}
