// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDatabricksManagementContext } from "../../api/azureDatabricksManagementContext.js";
import { listByWorkspace, $delete, createOrUpdate, get } from "../../api/vNetPeering/operations.js";
import type {
  VNetPeeringListByWorkspaceOptionalParams,
  VNetPeeringDeleteOptionalParams,
  VNetPeeringCreateOrUpdateOptionalParams,
  VNetPeeringGetOptionalParams,
} from "../../api/vNetPeering/options.js";
import type { VirtualNetworkPeering } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VNetPeering operations. */
export interface VNetPeeringOperations {
  /** Lists the workspace vNet Peerings. */
  listByWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    options?: VNetPeeringListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetworkPeering>;
  /** Deletes the workspace vNetPeering. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    peeringName: string,
    options?: VNetPeeringDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    peeringName: string,
    options?: VNetPeeringDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    peeringName: string,
    options?: VNetPeeringDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates vNet Peering for workspace. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    peeringName: string,
    virtualNetworkPeeringParameters: VirtualNetworkPeering,
    options?: VNetPeeringCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualNetworkPeering>, VirtualNetworkPeering>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    peeringName: string,
    virtualNetworkPeeringParameters: VirtualNetworkPeering,
    options?: VNetPeeringCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualNetworkPeering>, VirtualNetworkPeering>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    peeringName: string,
    virtualNetworkPeeringParameters: VirtualNetworkPeering,
    options?: VNetPeeringCreateOrUpdateOptionalParams,
  ) => Promise<VirtualNetworkPeering>;
  /** Gets the workspace vNet Peering. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    peeringName: string,
    options?: VNetPeeringGetOptionalParams,
  ) => Promise<VirtualNetworkPeering | undefined>;
}

function _getVNetPeering(context: AzureDatabricksManagementContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      workspaceName: string,
      options?: VNetPeeringListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      peeringName: string,
      options?: VNetPeeringDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, peeringName, options),
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      peeringName: string,
      options?: VNetPeeringDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, workspaceName, peeringName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      peeringName: string,
      options?: VNetPeeringDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, workspaceName, peeringName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      peeringName: string,
      virtualNetworkPeeringParameters: VirtualNetworkPeering,
      options?: VNetPeeringCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        peeringName,
        virtualNetworkPeeringParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      peeringName: string,
      virtualNetworkPeeringParameters: VirtualNetworkPeering,
      options?: VNetPeeringCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        peeringName,
        virtualNetworkPeeringParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      peeringName: string,
      virtualNetworkPeeringParameters: VirtualNetworkPeering,
      options?: VNetPeeringCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        peeringName,
        virtualNetworkPeeringParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      workspaceName: string,
      peeringName: string,
      options?: VNetPeeringGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, peeringName, options),
  };
}

export function _getVNetPeeringOperations(
  context: AzureDatabricksManagementContext,
): VNetPeeringOperations {
  return {
    ..._getVNetPeering(context),
  };
}
