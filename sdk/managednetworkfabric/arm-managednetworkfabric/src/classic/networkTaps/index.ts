// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext } from "../../api/azureNetworkFabricManagementServiceAPIContext.js";
import {
  resync,
  updateAdministrativeState,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/networkTaps/operations.js";
import type {
  NetworkTapsResyncOptionalParams,
  NetworkTapsUpdateAdministrativeStateOptionalParams,
  NetworkTapsListBySubscriptionOptionalParams,
  NetworkTapsListByResourceGroupOptionalParams,
  NetworkTapsDeleteOptionalParams,
  NetworkTapsUpdateOptionalParams,
  NetworkTapsCreateOptionalParams,
  NetworkTapsGetOptionalParams,
} from "../../api/networkTaps/options.js";
import type {
  UpdateAdministrativeState,
  UpdateAdministrativeStateResponse,
  NetworkTap,
  NetworkTapPatch,
  NetworkTapResyncResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkTaps operations. */
export interface NetworkTapsOperations {
  /** Implements the operation to the underlying resources. */
  resync: (
    resourceGroupName: string,
    networkTapName: string,
    options?: NetworkTapsResyncOptionalParams,
  ) => PollerLike<OperationState<NetworkTapResyncResponse>, NetworkTapResyncResponse>;
  /** @deprecated use resync instead */
  beginResync: (
    resourceGroupName: string,
    networkTapName: string,
    options?: NetworkTapsResyncOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<NetworkTapResyncResponse>, NetworkTapResyncResponse>
  >;
  /** @deprecated use resync instead */
  beginResyncAndWait: (
    resourceGroupName: string,
    networkTapName: string,
    options?: NetworkTapsResyncOptionalParams,
  ) => Promise<NetworkTapResyncResponse>;
  /** Implements the operation to the underlying resources. */
  updateAdministrativeState: (
    resourceGroupName: string,
    networkTapName: string,
    body: UpdateAdministrativeState,
    options?: NetworkTapsUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<UpdateAdministrativeStateResponse>,
    UpdateAdministrativeStateResponse
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeState: (
    resourceGroupName: string,
    networkTapName: string,
    body: UpdateAdministrativeState,
    options?: NetworkTapsUpdateAdministrativeStateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<UpdateAdministrativeStateResponse>,
      UpdateAdministrativeStateResponse
    >
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeStateAndWait: (
    resourceGroupName: string,
    networkTapName: string,
    body: UpdateAdministrativeState,
    options?: NetworkTapsUpdateAdministrativeStateOptionalParams,
  ) => Promise<UpdateAdministrativeStateResponse>;
  /** Displays Network Taps list by subscription GET method. */
  listBySubscription: (
    options?: NetworkTapsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkTap>;
  /** Displays Network Taps list by resource group GET method. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NetworkTapsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkTap>;
  /** Deletes Network Tap. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkTapName: string,
    options?: NetworkTapsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkTapName: string,
    options?: NetworkTapsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkTapName: string,
    options?: NetworkTapsDeleteOptionalParams,
  ) => Promise<void>;
  /** API to update certain properties of the Network Tap resource. */
  update: (
    resourceGroupName: string,
    networkTapName: string,
    body: NetworkTapPatch,
    options?: NetworkTapsUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkTap>, NetworkTap>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    networkTapName: string,
    body: NetworkTapPatch,
    options?: NetworkTapsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkTap>, NetworkTap>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    networkTapName: string,
    body: NetworkTapPatch,
    options?: NetworkTapsUpdateOptionalParams,
  ) => Promise<NetworkTap>;
  /** Creates a Network Tap. */
  create: (
    resourceGroupName: string,
    networkTapName: string,
    body: NetworkTap,
    options?: NetworkTapsCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkTap>, NetworkTap>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    networkTapName: string,
    body: NetworkTap,
    options?: NetworkTapsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkTap>, NetworkTap>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    networkTapName: string,
    body: NetworkTap,
    options?: NetworkTapsCreateOptionalParams,
  ) => Promise<NetworkTap>;
  /** Retrieves details of this Network Tap. */
  get: (
    resourceGroupName: string,
    networkTapName: string,
    options?: NetworkTapsGetOptionalParams,
  ) => Promise<NetworkTap>;
}

function _getNetworkTaps(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    resync: (
      resourceGroupName: string,
      networkTapName: string,
      options?: NetworkTapsResyncOptionalParams,
    ) => resync(context, resourceGroupName, networkTapName, options),
    beginResync: async (
      resourceGroupName: string,
      networkTapName: string,
      options?: NetworkTapsResyncOptionalParams,
    ) => {
      const poller = resync(context, resourceGroupName, networkTapName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResyncAndWait: async (
      resourceGroupName: string,
      networkTapName: string,
      options?: NetworkTapsResyncOptionalParams,
    ) => {
      return await resync(context, resourceGroupName, networkTapName, options);
    },
    updateAdministrativeState: (
      resourceGroupName: string,
      networkTapName: string,
      body: UpdateAdministrativeState,
      options?: NetworkTapsUpdateAdministrativeStateOptionalParams,
    ) => updateAdministrativeState(context, resourceGroupName, networkTapName, body, options),
    beginUpdateAdministrativeState: async (
      resourceGroupName: string,
      networkTapName: string,
      body: UpdateAdministrativeState,
      options?: NetworkTapsUpdateAdministrativeStateOptionalParams,
    ) => {
      const poller = updateAdministrativeState(
        context,
        resourceGroupName,
        networkTapName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAdministrativeStateAndWait: async (
      resourceGroupName: string,
      networkTapName: string,
      body: UpdateAdministrativeState,
      options?: NetworkTapsUpdateAdministrativeStateOptionalParams,
    ) => {
      return await updateAdministrativeState(
        context,
        resourceGroupName,
        networkTapName,
        body,
        options,
      );
    },
    listBySubscription: (options?: NetworkTapsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NetworkTapsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      networkTapName: string,
      options?: NetworkTapsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkTapName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkTapName: string,
      options?: NetworkTapsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, networkTapName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkTapName: string,
      options?: NetworkTapsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, networkTapName, options);
    },
    update: (
      resourceGroupName: string,
      networkTapName: string,
      body: NetworkTapPatch,
      options?: NetworkTapsUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkTapName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      networkTapName: string,
      body: NetworkTapPatch,
      options?: NetworkTapsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, networkTapName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      networkTapName: string,
      body: NetworkTapPatch,
      options?: NetworkTapsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, networkTapName, body, options);
    },
    create: (
      resourceGroupName: string,
      networkTapName: string,
      body: NetworkTap,
      options?: NetworkTapsCreateOptionalParams,
    ) => create(context, resourceGroupName, networkTapName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      networkTapName: string,
      body: NetworkTap,
      options?: NetworkTapsCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, networkTapName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      networkTapName: string,
      body: NetworkTap,
      options?: NetworkTapsCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, networkTapName, body, options);
    },
    get: (
      resourceGroupName: string,
      networkTapName: string,
      options?: NetworkTapsGetOptionalParams,
    ) => get(context, resourceGroupName, networkTapName, options),
  };
}

export function _getNetworkTapsOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): NetworkTapsOperations {
  return {
    ..._getNetworkTaps(context),
  };
}
