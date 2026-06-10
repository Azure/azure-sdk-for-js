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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    options?: ConnectedClusterDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: ConnectedClusterDeleteOptionalParams,
  ) => Promise<void>;
  /** API to update certain properties of the connected cluster resource */
  updateAsync: (
    resourceGroupName: string,
    clusterName: string,
    connectedClusterPatch: ConnectedClusterPatch,
    options?: ConnectedClusterUpdateAsyncOptionalParams,
  ) => PollerLike<OperationState<ConnectedCluster>, ConnectedCluster>;
  /** @deprecated use updateAsync instead */
  beginUpdateAsync: (
    resourceGroupName: string,
    clusterName: string,
    connectedClusterPatch: ConnectedClusterPatch,
    options?: ConnectedClusterUpdateAsyncOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ConnectedCluster>, ConnectedCluster>>;
  /** @deprecated use updateAsync instead */
  beginUpdateAsyncAndWait: (
    resourceGroupName: string,
    clusterName: string,
    connectedClusterPatch: ConnectedClusterPatch,
    options?: ConnectedClusterUpdateAsyncOptionalParams,
  ) => Promise<ConnectedCluster>;
  /** API to register a new Kubernetes cluster and create or replace a connected cluster tracked resource in Azure Resource Manager (ARM). */
  createOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    connectedCluster: ConnectedCluster,
    options?: ConnectedClusterCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<ConnectedCluster>, ConnectedCluster>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    connectedCluster: ConnectedCluster,
    options?: ConnectedClusterCreateOrReplaceOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ConnectedCluster>, ConnectedCluster>>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplaceAndWait: (
    resourceGroupName: string,
    clusterName: string,
    connectedCluster: ConnectedCluster,
    options?: ConnectedClusterCreateOrReplaceOptionalParams,
  ) => Promise<ConnectedCluster>;
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
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ConnectedClusterDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ConnectedClusterDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, options);
    },
    updateAsync: (
      resourceGroupName: string,
      clusterName: string,
      connectedClusterPatch: ConnectedClusterPatch,
      options?: ConnectedClusterUpdateAsyncOptionalParams,
    ) => updateAsync(context, resourceGroupName, clusterName, connectedClusterPatch, options),
    beginUpdateAsync: async (
      resourceGroupName: string,
      clusterName: string,
      connectedClusterPatch: ConnectedClusterPatch,
      options?: ConnectedClusterUpdateAsyncOptionalParams,
    ) => {
      const poller = updateAsync(
        context,
        resourceGroupName,
        clusterName,
        connectedClusterPatch,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAsyncAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      connectedClusterPatch: ConnectedClusterPatch,
      options?: ConnectedClusterUpdateAsyncOptionalParams,
    ) => {
      return await updateAsync(
        context,
        resourceGroupName,
        clusterName,
        connectedClusterPatch,
        options,
      );
    },
    createOrReplace: (
      resourceGroupName: string,
      clusterName: string,
      connectedCluster: ConnectedCluster,
      options?: ConnectedClusterCreateOrReplaceOptionalParams,
    ) => createOrReplace(context, resourceGroupName, clusterName, connectedCluster, options),
    beginCreateOrReplace: async (
      resourceGroupName: string,
      clusterName: string,
      connectedCluster: ConnectedCluster,
      options?: ConnectedClusterCreateOrReplaceOptionalParams,
    ) => {
      const poller = createOrReplace(
        context,
        resourceGroupName,
        clusterName,
        connectedCluster,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrReplaceAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      connectedCluster: ConnectedCluster,
      options?: ConnectedClusterCreateOrReplaceOptionalParams,
    ) => {
      return await createOrReplace(
        context,
        resourceGroupName,
        clusterName,
        connectedCluster,
        options,
      );
    },
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
