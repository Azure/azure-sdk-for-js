// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext } from "../../api/networkCloudContext.js";
import {
  restartNode,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/kubernetesClusters/operations.js";
import {
  KubernetesClustersRestartNodeOptionalParams,
  KubernetesClustersListBySubscriptionOptionalParams,
  KubernetesClustersListByResourceGroupOptionalParams,
  KubernetesClustersDeleteOptionalParams,
  KubernetesClustersUpdateOptionalParams,
  KubernetesClustersCreateOrUpdateOptionalParams,
  KubernetesClustersGetOptionalParams,
} from "../../api/kubernetesClusters/options.js";
import {
  OperationStatusResult,
  KubernetesCluster,
  KubernetesClusterRestartNodeParameters,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a KubernetesClusters operations. */
export interface KubernetesClustersOperations {
  /** Restart a targeted node of a Kubernetes cluster. */
  restartNode: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    kubernetesClusterRestartNodeParameters: KubernetesClusterRestartNodeParameters,
    options?: KubernetesClustersRestartNodeOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Get a list of Kubernetes clusters in the provided subscription. */
  listBySubscription: (
    options?: KubernetesClustersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<KubernetesCluster>;
  /** Get a list of Kubernetes clusters in the provided resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: KubernetesClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<KubernetesCluster>;
  /** Delete the provided Kubernetes cluster. */
  delete: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    options?: KubernetesClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Patch the properties of the provided Kubernetes cluster, or update the tags associated with the Kubernetes cluster. Properties and tag updates can be done independently. */
  update: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    options?: KubernetesClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<KubernetesCluster>, KubernetesCluster>;
  /** Create a new Kubernetes cluster or update the properties of the existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    kubernetesClusterParameters: KubernetesCluster,
    options?: KubernetesClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<KubernetesCluster>, KubernetesCluster>;
  /** Get properties of the provided the Kubernetes cluster. */
  get: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    options?: KubernetesClustersGetOptionalParams,
  ) => Promise<KubernetesCluster>;
}

function _getKubernetesClusters(context: NetworkCloudContext) {
  return {
    restartNode: (
      resourceGroupName: string,
      kubernetesClusterName: string,
      kubernetesClusterRestartNodeParameters: KubernetesClusterRestartNodeParameters,
      options?: KubernetesClustersRestartNodeOptionalParams,
    ) =>
      restartNode(
        context,
        resourceGroupName,
        kubernetesClusterName,
        kubernetesClusterRestartNodeParameters,
        options,
      ),
    listBySubscription: (options?: KubernetesClustersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: KubernetesClustersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      kubernetesClusterName: string,
      options?: KubernetesClustersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, kubernetesClusterName, options),
    update: (
      resourceGroupName: string,
      kubernetesClusterName: string,
      options?: KubernetesClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, kubernetesClusterName, options),
    createOrUpdate: (
      resourceGroupName: string,
      kubernetesClusterName: string,
      kubernetesClusterParameters: KubernetesCluster,
      options?: KubernetesClustersCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        kubernetesClusterName,
        kubernetesClusterParameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      kubernetesClusterName: string,
      options?: KubernetesClustersGetOptionalParams,
    ) => get(context, resourceGroupName, kubernetesClusterName, options),
  };
}

export function _getKubernetesClustersOperations(
  context: NetworkCloudContext,
): KubernetesClustersOperations {
  return {
    ..._getKubernetesClusters(context),
  };
}
