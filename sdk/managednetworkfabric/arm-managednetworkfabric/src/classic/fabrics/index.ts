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
} from "../../api/fabrics/operations.js";
import type {
  FabricsListBySubscriptionOptionalParams,
  FabricsListByResourceGroupOptionalParams,
  FabricsDeleteOptionalParams,
  FabricsUpdateOptionalParams,
  FabricsCreateOptionalParams,
  FabricsGetOptionalParams,
} from "../../api/fabrics/options.js";
import type { Fabric, FabricPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Fabrics operations. */
export interface FabricsOperations {
  /** Lists Fabrics by subscription. */
  listBySubscription: (
    options?: FabricsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Fabric>;
  /** Lists Fabrics by resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: FabricsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Fabric>;
  /** Deletes the specified Fabric. */
  delete: (
    resourceGroupName: string,
    fabricName: string,
    options?: FabricsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    fabricName: string,
    options?: FabricsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    fabricName: string,
    options?: FabricsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a Fabric. */
  update: (
    resourceGroupName: string,
    fabricName: string,
    body: FabricPatch,
    options?: FabricsUpdateOptionalParams,
  ) => PollerLike<OperationState<Fabric>, Fabric>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    fabricName: string,
    body: FabricPatch,
    options?: FabricsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Fabric>, Fabric>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    fabricName: string,
    body: FabricPatch,
    options?: FabricsUpdateOptionalParams,
  ) => Promise<Fabric>;
  /** Creates or updates a Fabric. */
  create: (
    resourceGroupName: string,
    fabricName: string,
    body: Fabric,
    options?: FabricsCreateOptionalParams,
  ) => PollerLike<OperationState<Fabric>, Fabric>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    fabricName: string,
    body: Fabric,
    options?: FabricsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Fabric>, Fabric>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    fabricName: string,
    body: Fabric,
    options?: FabricsCreateOptionalParams,
  ) => Promise<Fabric>;
  /** Gets the specified Fabric. */
  get: (
    resourceGroupName: string,
    fabricName: string,
    options?: FabricsGetOptionalParams,
  ) => Promise<Fabric>;
}

function _getFabrics(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    listBySubscription: (options?: FabricsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: FabricsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      fabricName: string,
      options?: FabricsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, fabricName, options),
    beginDelete: async (
      resourceGroupName: string,
      fabricName: string,
      options?: FabricsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, fabricName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      fabricName: string,
      options?: FabricsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, fabricName, options);
    },
    update: (
      resourceGroupName: string,
      fabricName: string,
      body: FabricPatch,
      options?: FabricsUpdateOptionalParams,
    ) => update(context, resourceGroupName, fabricName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      fabricName: string,
      body: FabricPatch,
      options?: FabricsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, fabricName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      fabricName: string,
      body: FabricPatch,
      options?: FabricsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, fabricName, body, options);
    },
    create: (
      resourceGroupName: string,
      fabricName: string,
      body: Fabric,
      options?: FabricsCreateOptionalParams,
    ) => create(context, resourceGroupName, fabricName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      fabricName: string,
      body: Fabric,
      options?: FabricsCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, fabricName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      fabricName: string,
      body: Fabric,
      options?: FabricsCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, fabricName, body, options);
    },
    get: (resourceGroupName: string, fabricName: string, options?: FabricsGetOptionalParams) =>
      get(context, resourceGroupName, fabricName, options),
  };
}

export function _getFabricsOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): FabricsOperations {
  return {
    ..._getFabrics(context),
  };
}
