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
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use restartNode instead */
  beginRestartNode: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    kubernetesClusterRestartNodeParameters: KubernetesClusterRestartNodeParameters,
    options?: KubernetesClustersRestartNodeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use restartNode instead */
  beginRestartNodeAndWait: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    kubernetesClusterRestartNodeParameters: KubernetesClusterRestartNodeParameters,
    options?: KubernetesClustersRestartNodeOptionalParams,
  ) => Promise<OperationStatusResult>;
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    options?: KubernetesClustersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    options?: KubernetesClustersDeleteOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Patch the properties of the provided Kubernetes cluster, or update the tags associated with the Kubernetes cluster. Properties and tag updates can be done independently. */
  update: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    options?: KubernetesClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<KubernetesCluster>, KubernetesCluster>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    options?: KubernetesClustersUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<KubernetesCluster>, KubernetesCluster>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    options?: KubernetesClustersUpdateOptionalParams,
  ) => Promise<KubernetesCluster>;
  /** Create a new Kubernetes cluster or update the properties of the existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    kubernetesClusterParameters: KubernetesCluster,
    options?: KubernetesClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<KubernetesCluster>, KubernetesCluster>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    kubernetesClusterParameters: KubernetesCluster,
    options?: KubernetesClustersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<KubernetesCluster>, KubernetesCluster>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    kubernetesClusterParameters: KubernetesCluster,
    options?: KubernetesClustersCreateOrUpdateOptionalParams,
  ) => Promise<KubernetesCluster>;
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
    beginRestartNode: async (
      resourceGroupName: string,
      kubernetesClusterName: string,
      kubernetesClusterRestartNodeParameters: KubernetesClusterRestartNodeParameters,
      options?: KubernetesClustersRestartNodeOptionalParams,
    ) => {
      const poller = restartNode(
        context,
        resourceGroupName,
        kubernetesClusterName,
        kubernetesClusterRestartNodeParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartNodeAndWait: async (
      resourceGroupName: string,
      kubernetesClusterName: string,
      kubernetesClusterRestartNodeParameters: KubernetesClusterRestartNodeParameters,
      options?: KubernetesClustersRestartNodeOptionalParams,
    ) => {
      return await restartNode(
        context,
        resourceGroupName,
        kubernetesClusterName,
        kubernetesClusterRestartNodeParameters,
        options,
      );
    },
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
    beginDelete: async (
      resourceGroupName: string,
      kubernetesClusterName: string,
      options?: KubernetesClustersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, kubernetesClusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      kubernetesClusterName: string,
      options?: KubernetesClustersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, kubernetesClusterName, options);
    },
    update: (
      resourceGroupName: string,
      kubernetesClusterName: string,
      options?: KubernetesClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, kubernetesClusterName, options),
    beginUpdate: async (
      resourceGroupName: string,
      kubernetesClusterName: string,
      options?: KubernetesClustersUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, kubernetesClusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      kubernetesClusterName: string,
      options?: KubernetesClustersUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, kubernetesClusterName, options);
    },
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      kubernetesClusterName: string,
      kubernetesClusterParameters: KubernetesCluster,
      options?: KubernetesClustersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        kubernetesClusterName,
        kubernetesClusterParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      kubernetesClusterName: string,
      kubernetesClusterParameters: KubernetesCluster,
      options?: KubernetesClustersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        kubernetesClusterName,
        kubernetesClusterParameters,
        options,
      );
    },
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
