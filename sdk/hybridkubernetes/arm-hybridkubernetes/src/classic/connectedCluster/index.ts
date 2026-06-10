// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConnectedKubernetesContext } from "../../api/connectedKubernetesContext.js";
import {
  listClusterUserCredential,
  listBySubscription,
  listByResourceGroup,
  $delete,
  updateAsync,
  createOrReplace,
  get,
} from "../../api/connectedCluster/operations.js";
import type {
  ConnectedClusterListClusterUserCredentialOptionalParams,
  ConnectedClusterListBySubscriptionOptionalParams,
  ConnectedClusterListByResourceGroupOptionalParams,
  ConnectedClusterDeleteOptionalParams,
  ConnectedClusterUpdateAsyncOptionalParams,
  ConnectedClusterCreateOrReplaceOptionalParams,
  ConnectedClusterGetOptionalParams,
} from "../../api/connectedCluster/options.js";
import type {
  ConnectedCluster,
  ConnectedClusterPatch,
  ListClusterUserCredentialProperties,
  CredentialResults,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ConnectedCluster operations. */
export interface ConnectedClusterOperations {
  /** Gets cluster user credentials of the connected cluster with a specified resource group and name. */
  listClusterUserCredential: (
    resourceGroupName: string,
    clusterName: string,
    properties: ListClusterUserCredentialProperties,
    options?: ConnectedClusterListClusterUserCredentialOptionalParams,
  ) => Promise<CredentialResults>;
  /** API to enumerate registered connected K8s clusters under a Subscription */
  listBySubscription: (
    options?: ConnectedClusterListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectedCluster>;
  /** API to enumerate registered connected K8s clusters under a Resource Group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ConnectedClusterListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectedCluster>;
  /** Delete a connected cluster, removing the tracked resource in Azure Resource Manager (ARM). */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    options?: ConnectedClusterDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** API to update certain properties of the connected cluster resource */
  updateAsync: (
    resourceGroupName: string,
    clusterName: string,
    connectedClusterPatch: ConnectedClusterPatch,
    options?: ConnectedClusterUpdateAsyncOptionalParams,
  ) => PollerLike<OperationState<ConnectedCluster>, ConnectedCluster>;
  /** API to register a new Kubernetes cluster and create or replace a connected cluster tracked resource in Azure Resource Manager (ARM). */
  createOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    connectedCluster: ConnectedCluster,
    options?: ConnectedClusterCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<ConnectedCluster>, ConnectedCluster>;
  /** Returns the properties of the specified connected cluster, including name, identity, properties, and additional cluster details. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: ConnectedClusterGetOptionalParams,
  ) => Promise<ConnectedCluster>;
}

function _getConnectedCluster(context: ConnectedKubernetesContext) {
  return {
    listClusterUserCredential: (
      resourceGroupName: string,
      clusterName: string,
      properties: ListClusterUserCredentialProperties,
      options?: ConnectedClusterListClusterUserCredentialOptionalParams,
    ) => listClusterUserCredential(context, resourceGroupName, clusterName, properties, options),
    listBySubscription: (options?: ConnectedClusterListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ConnectedClusterListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      options?: ConnectedClusterDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, options),
    updateAsync: (
      resourceGroupName: string,
      clusterName: string,
      connectedClusterPatch: ConnectedClusterPatch,
      options?: ConnectedClusterUpdateAsyncOptionalParams,
    ) => updateAsync(context, resourceGroupName, clusterName, connectedClusterPatch, options),
    createOrReplace: (
      resourceGroupName: string,
      clusterName: string,
      connectedCluster: ConnectedCluster,
      options?: ConnectedClusterCreateOrReplaceOptionalParams,
    ) => createOrReplace(context, resourceGroupName, clusterName, connectedCluster, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      options?: ConnectedClusterGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, options),
  };
}

export function _getConnectedClusterOperations(
  context: ConnectedKubernetesContext,
): ConnectedClusterOperations {
  return {
    ..._getConnectedCluster(context),
  };
}
