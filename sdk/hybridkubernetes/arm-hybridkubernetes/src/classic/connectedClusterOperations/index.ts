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
} from "../../api/connectedClusterOperations/operations.js";
import type {
  ConnectedClusterOperationsListClusterUserCredentialOptionalParams,
  ConnectedClusterOperationsListBySubscriptionOptionalParams,
  ConnectedClusterOperationsListByResourceGroupOptionalParams,
  ConnectedClusterOperationsDeleteOptionalParams,
  ConnectedClusterOperationsUpdateAsyncOptionalParams,
  ConnectedClusterOperationsCreateOrReplaceOptionalParams,
  ConnectedClusterOperationsGetOptionalParams,
} from "../../api/connectedClusterOperations/options.js";
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

/** Interface representing a ConnectedClusterOperations operations. */
export interface ConnectedClusterOperationsOperations {
  /** Gets cluster user credentials of the connected cluster with a specified resource group and name. */
  listClusterUserCredential: (
    resourceGroupName: string,
    clusterName: string,
    properties: ListClusterUserCredentialProperties,
    options?: ConnectedClusterOperationsListClusterUserCredentialOptionalParams,
  ) => Promise<CredentialResults>;
  /** API to enumerate registered connected K8s clusters under a Subscription */
  listBySubscription: (
    options?: ConnectedClusterOperationsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectedCluster>;
  /** API to enumerate registered connected K8s clusters under a Resource Group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ConnectedClusterOperationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectedCluster>;
  /** Delete a connected cluster, removing the tracked resource in Azure Resource Manager (ARM). */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    options?: ConnectedClusterOperationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    options?: ConnectedClusterOperationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: ConnectedClusterOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** API to update certain properties of the connected cluster resource */
  updateAsync: (
    resourceGroupName: string,
    clusterName: string,
    connectedClusterPatch: ConnectedClusterPatch,
    options?: ConnectedClusterOperationsUpdateAsyncOptionalParams,
  ) => PollerLike<OperationState<ConnectedCluster>, ConnectedCluster>;
  /** @deprecated use updateAsync instead */
  beginUpdateAsync: (
    resourceGroupName: string,
    clusterName: string,
    connectedClusterPatch: ConnectedClusterPatch,
    options?: ConnectedClusterOperationsUpdateAsyncOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ConnectedCluster>, ConnectedCluster>>;
  /** @deprecated use updateAsync instead */
  beginUpdateAsyncAndWait: (
    resourceGroupName: string,
    clusterName: string,
    connectedClusterPatch: ConnectedClusterPatch,
    options?: ConnectedClusterOperationsUpdateAsyncOptionalParams,
  ) => Promise<ConnectedCluster>;
  /** API to register a new Kubernetes cluster and create or replace a connected cluster tracked resource in Azure Resource Manager (ARM). */
  createOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    connectedCluster: ConnectedCluster,
    options?: ConnectedClusterOperationsCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<ConnectedCluster>, ConnectedCluster>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    connectedCluster: ConnectedCluster,
    options?: ConnectedClusterOperationsCreateOrReplaceOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ConnectedCluster>, ConnectedCluster>>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplaceAndWait: (
    resourceGroupName: string,
    clusterName: string,
    connectedCluster: ConnectedCluster,
    options?: ConnectedClusterOperationsCreateOrReplaceOptionalParams,
  ) => Promise<ConnectedCluster>;
  /** Returns the properties of the specified connected cluster, including name, identity, properties, and additional cluster details. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: ConnectedClusterOperationsGetOptionalParams,
  ) => Promise<ConnectedCluster>;
}

function _getConnectedClusterOperations(context: ConnectedKubernetesContext) {
  return {
    listClusterUserCredential: (
      resourceGroupName: string,
      clusterName: string,
      properties: ListClusterUserCredentialProperties,
      options?: ConnectedClusterOperationsListClusterUserCredentialOptionalParams,
    ) => listClusterUserCredential(context, resourceGroupName, clusterName, properties, options),
    listBySubscription: (options?: ConnectedClusterOperationsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ConnectedClusterOperationsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      options?: ConnectedClusterOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ConnectedClusterOperationsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ConnectedClusterOperationsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, options);
    },
    updateAsync: (
      resourceGroupName: string,
      clusterName: string,
      connectedClusterPatch: ConnectedClusterPatch,
      options?: ConnectedClusterOperationsUpdateAsyncOptionalParams,
    ) => updateAsync(context, resourceGroupName, clusterName, connectedClusterPatch, options),
    beginUpdateAsync: async (
      resourceGroupName: string,
      clusterName: string,
      connectedClusterPatch: ConnectedClusterPatch,
      options?: ConnectedClusterOperationsUpdateAsyncOptionalParams,
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
      options?: ConnectedClusterOperationsUpdateAsyncOptionalParams,
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
      options?: ConnectedClusterOperationsCreateOrReplaceOptionalParams,
    ) => createOrReplace(context, resourceGroupName, clusterName, connectedCluster, options),
    beginCreateOrReplace: async (
      resourceGroupName: string,
      clusterName: string,
      connectedCluster: ConnectedCluster,
      options?: ConnectedClusterOperationsCreateOrReplaceOptionalParams,
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
      options?: ConnectedClusterOperationsCreateOrReplaceOptionalParams,
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
      options?: ConnectedClusterOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, options),
  };
}

export function _getConnectedClusterOperationsOperations(
  context: ConnectedKubernetesContext,
): ConnectedClusterOperationsOperations {
  return {
    ..._getConnectedClusterOperations(context),
  };
}
