// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext } from "../../api/networkCloudContext.js";
import {
  listByCluster,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/bareMetalMachineKeySets/operations.js";
import {
  BareMetalMachineKeySetsListByClusterOptionalParams,
  BareMetalMachineKeySetsDeleteOptionalParams,
  BareMetalMachineKeySetsUpdateOptionalParams,
  BareMetalMachineKeySetsCreateOrUpdateOptionalParams,
  BareMetalMachineKeySetsGetOptionalParams,
} from "../../api/bareMetalMachineKeySets/options.js";
import { OperationStatusResult, BareMetalMachineKeySet } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BareMetalMachineKeySets operations. */
export interface BareMetalMachineKeySetsOperations {
  /** Get a list of bare metal machine key sets for the provided cluster. */
  listByCluster: (
    resourceGroupName: string,
    clusterName: string,
    options?: BareMetalMachineKeySetsListByClusterOptionalParams,
  ) => PagedAsyncIterableIterator<BareMetalMachineKeySet>;
  /** Delete the bare metal machine key set of the provided cluster. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    bareMetalMachineKeySetName: string,
    options?: BareMetalMachineKeySetsDeleteOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    bareMetalMachineKeySetName: string,
    options?: BareMetalMachineKeySetsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    bareMetalMachineKeySetName: string,
    options?: BareMetalMachineKeySetsDeleteOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Patch properties of bare metal machine key set for the provided cluster, or update the tags associated with it. Properties and tag updates can be done independently. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    bareMetalMachineKeySetName: string,
    options?: BareMetalMachineKeySetsUpdateOptionalParams,
  ) => PollerLike<OperationState<BareMetalMachineKeySet>, BareMetalMachineKeySet>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    bareMetalMachineKeySetName: string,
    options?: BareMetalMachineKeySetsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BareMetalMachineKeySet>, BareMetalMachineKeySet>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    bareMetalMachineKeySetName: string,
    options?: BareMetalMachineKeySetsUpdateOptionalParams,
  ) => Promise<BareMetalMachineKeySet>;
  /** Create a new bare metal machine key set or update the existing one for the provided cluster. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    bareMetalMachineKeySetName: string,
    bareMetalMachineKeySetParameters: BareMetalMachineKeySet,
    options?: BareMetalMachineKeySetsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BareMetalMachineKeySet>, BareMetalMachineKeySet>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    bareMetalMachineKeySetName: string,
    bareMetalMachineKeySetParameters: BareMetalMachineKeySet,
    options?: BareMetalMachineKeySetsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BareMetalMachineKeySet>, BareMetalMachineKeySet>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    bareMetalMachineKeySetName: string,
    bareMetalMachineKeySetParameters: BareMetalMachineKeySet,
    options?: BareMetalMachineKeySetsCreateOrUpdateOptionalParams,
  ) => Promise<BareMetalMachineKeySet>;
  /** Get bare metal machine key set of the provided cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    bareMetalMachineKeySetName: string,
    options?: BareMetalMachineKeySetsGetOptionalParams,
  ) => Promise<BareMetalMachineKeySet>;
}

function _getBareMetalMachineKeySets(context: NetworkCloudContext) {
  return {
    listByCluster: (
      resourceGroupName: string,
      clusterName: string,
      options?: BareMetalMachineKeySetsListByClusterOptionalParams,
    ) => listByCluster(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      bareMetalMachineKeySetName: string,
      options?: BareMetalMachineKeySetsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, bareMetalMachineKeySetName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      bareMetalMachineKeySetName: string,
      options?: BareMetalMachineKeySetsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        clusterName,
        bareMetalMachineKeySetName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      bareMetalMachineKeySetName: string,
      options?: BareMetalMachineKeySetsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        clusterName,
        bareMetalMachineKeySetName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      clusterName: string,
      bareMetalMachineKeySetName: string,
      options?: BareMetalMachineKeySetsUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, bareMetalMachineKeySetName, options),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      bareMetalMachineKeySetName: string,
      options?: BareMetalMachineKeySetsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        clusterName,
        bareMetalMachineKeySetName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      bareMetalMachineKeySetName: string,
      options?: BareMetalMachineKeySetsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        clusterName,
        bareMetalMachineKeySetName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      bareMetalMachineKeySetName: string,
      bareMetalMachineKeySetParameters: BareMetalMachineKeySet,
      options?: BareMetalMachineKeySetsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        bareMetalMachineKeySetName,
        bareMetalMachineKeySetParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      bareMetalMachineKeySetName: string,
      bareMetalMachineKeySetParameters: BareMetalMachineKeySet,
      options?: BareMetalMachineKeySetsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        bareMetalMachineKeySetName,
        bareMetalMachineKeySetParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      bareMetalMachineKeySetName: string,
      bareMetalMachineKeySetParameters: BareMetalMachineKeySet,
      options?: BareMetalMachineKeySetsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        bareMetalMachineKeySetName,
        bareMetalMachineKeySetParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      bareMetalMachineKeySetName: string,
      options?: BareMetalMachineKeySetsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, bareMetalMachineKeySetName, options),
  };
}

export function _getBareMetalMachineKeySetsOperations(
  context: NetworkCloudContext,
): BareMetalMachineKeySetsOperations {
  return {
    ..._getBareMetalMachineKeySets(context),
  };
}
