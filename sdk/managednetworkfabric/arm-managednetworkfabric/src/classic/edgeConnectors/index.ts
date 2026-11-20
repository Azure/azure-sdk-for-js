// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext } from "../../api/azureNetworkFabricManagementServiceAPIContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/edgeConnectors/operations.js";
import type {
  EdgeConnectorsListBySubscriptionOptionalParams,
  EdgeConnectorsListByResourceGroupOptionalParams,
  EdgeConnectorsDeleteOptionalParams,
  EdgeConnectorsUpdateOptionalParams,
  EdgeConnectorsCreateOptionalParams,
  EdgeConnectorsGetOptionalParams,
} from "../../api/edgeConnectors/options.js";
import type { EdgeConnector, EdgeConnectorPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EdgeConnectors operations. */
export interface EdgeConnectorsOperations {
  /** Lists EdgeConnectors by subscription. */
  listBySubscription: (
    options?: EdgeConnectorsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeConnector>;
  /** Lists EdgeConnectors by resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: EdgeConnectorsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeConnector>;
  /** Deletes the specified EdgeConnector. */
  delete: (
    resourceGroupName: string,
    edgeConnectorName: string,
    options?: EdgeConnectorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    edgeConnectorName: string,
    options?: EdgeConnectorsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    edgeConnectorName: string,
    options?: EdgeConnectorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an EdgeConnector. */
  update: (
    resourceGroupName: string,
    edgeConnectorName: string,
    body: EdgeConnectorPatch,
    options?: EdgeConnectorsUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeConnector>, EdgeConnector>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    edgeConnectorName: string,
    body: EdgeConnectorPatch,
    options?: EdgeConnectorsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EdgeConnector>, EdgeConnector>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    edgeConnectorName: string,
    body: EdgeConnectorPatch,
    options?: EdgeConnectorsUpdateOptionalParams,
  ) => Promise<EdgeConnector>;
  /** Creates or updates an EdgeConnector. */
  create: (
    resourceGroupName: string,
    edgeConnectorName: string,
    body: EdgeConnector,
    options?: EdgeConnectorsCreateOptionalParams,
  ) => PollerLike<OperationState<EdgeConnector>, EdgeConnector>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    edgeConnectorName: string,
    body: EdgeConnector,
    options?: EdgeConnectorsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EdgeConnector>, EdgeConnector>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    edgeConnectorName: string,
    body: EdgeConnector,
    options?: EdgeConnectorsCreateOptionalParams,
  ) => Promise<EdgeConnector>;
  /** Gets the specified EdgeConnector. */
  get: (
    resourceGroupName: string,
    edgeConnectorName: string,
    options?: EdgeConnectorsGetOptionalParams,
  ) => Promise<EdgeConnector>;
}

function _getEdgeConnectors(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    listBySubscription: (options?: EdgeConnectorsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: EdgeConnectorsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      edgeConnectorName: string,
      options?: EdgeConnectorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, edgeConnectorName, options),
    beginDelete: async (
      resourceGroupName: string,
      edgeConnectorName: string,
      options?: EdgeConnectorsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, edgeConnectorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      edgeConnectorName: string,
      options?: EdgeConnectorsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, edgeConnectorName, options);
    },
    update: (
      resourceGroupName: string,
      edgeConnectorName: string,
      body: EdgeConnectorPatch,
      options?: EdgeConnectorsUpdateOptionalParams,
    ) => update(context, resourceGroupName, edgeConnectorName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      edgeConnectorName: string,
      body: EdgeConnectorPatch,
      options?: EdgeConnectorsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, edgeConnectorName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      edgeConnectorName: string,
      body: EdgeConnectorPatch,
      options?: EdgeConnectorsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, edgeConnectorName, body, options);
    },
    create: (
      resourceGroupName: string,
      edgeConnectorName: string,
      body: EdgeConnector,
      options?: EdgeConnectorsCreateOptionalParams,
    ) => create(context, resourceGroupName, edgeConnectorName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      edgeConnectorName: string,
      body: EdgeConnector,
      options?: EdgeConnectorsCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, edgeConnectorName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      edgeConnectorName: string,
      body: EdgeConnector,
      options?: EdgeConnectorsCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, edgeConnectorName, body, options);
    },
    get: (
      resourceGroupName: string,
      edgeConnectorName: string,
      options?: EdgeConnectorsGetOptionalParams,
    ) => get(context, resourceGroupName, edgeConnectorName, options),
  };
}

export function _getEdgeConnectorsOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): EdgeConnectorsOperations {
  return {
    ..._getEdgeConnectors(context),
  };
}
