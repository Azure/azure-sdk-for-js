// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext } from "../../api/networkCloudContext.js";
import {
  listByCluster,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/bmcKeySets/operations.js";
import {
  BmcKeySetsListByClusterOptionalParams,
  BmcKeySetsDeleteOptionalParams,
  BmcKeySetsUpdateOptionalParams,
  BmcKeySetsCreateOrUpdateOptionalParams,
  BmcKeySetsGetOptionalParams,
} from "../../api/bmcKeySets/options.js";
import { OperationStatusResult, BmcKeySet } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BmcKeySets operations. */
export interface BmcKeySetsOperations {
  /** Get a list of baseboard management controller key sets for the provided cluster. */
  listByCluster: (
    resourceGroupName: string,
    clusterName: string,
    options?: BmcKeySetsListByClusterOptionalParams,
  ) => PagedAsyncIterableIterator<BmcKeySet>;
  /** Delete the baseboard management controller key set of the provided cluster. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    bmcKeySetName: string,
    options?: BmcKeySetsDeleteOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Patch properties of baseboard management controller key set for the provided cluster, or update the tags associated with it. Properties and tag updates can be done independently. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    bmcKeySetName: string,
    options?: BmcKeySetsUpdateOptionalParams,
  ) => PollerLike<OperationState<BmcKeySet>, BmcKeySet>;
  /** Create a new baseboard management controller key set or update the existing one for the provided cluster. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    bmcKeySetName: string,
    bmcKeySetParameters: BmcKeySet,
    options?: BmcKeySetsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BmcKeySet>, BmcKeySet>;
  /** Get baseboard management controller key set of the provided cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    bmcKeySetName: string,
    options?: BmcKeySetsGetOptionalParams,
  ) => Promise<BmcKeySet>;
}

function _getBmcKeySets(context: NetworkCloudContext) {
  return {
    listByCluster: (
      resourceGroupName: string,
      clusterName: string,
      options?: BmcKeySetsListByClusterOptionalParams,
    ) => listByCluster(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      bmcKeySetName: string,
      options?: BmcKeySetsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, bmcKeySetName, options),
    update: (
      resourceGroupName: string,
      clusterName: string,
      bmcKeySetName: string,
      options?: BmcKeySetsUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, bmcKeySetName, options),
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      bmcKeySetName: string,
      bmcKeySetParameters: BmcKeySet,
      options?: BmcKeySetsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        bmcKeySetName,
        bmcKeySetParameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      clusterName: string,
      bmcKeySetName: string,
      options?: BmcKeySetsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, bmcKeySetName, options),
  };
}

export function _getBmcKeySetsOperations(context: NetworkCloudContext): BmcKeySetsOperations {
  return {
    ..._getBmcKeySets(context),
  };
}
