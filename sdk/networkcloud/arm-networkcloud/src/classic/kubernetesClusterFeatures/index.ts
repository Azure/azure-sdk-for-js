// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext } from "../../api/networkCloudContext.js";
import {
  listByKubernetesCluster,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/kubernetesClusterFeatures/operations.js";
import {
  KubernetesClusterFeaturesListByKubernetesClusterOptionalParams,
  KubernetesClusterFeaturesDeleteOptionalParams,
  KubernetesClusterFeaturesUpdateOptionalParams,
  KubernetesClusterFeaturesCreateOrUpdateOptionalParams,
  KubernetesClusterFeaturesGetOptionalParams,
} from "../../api/kubernetesClusterFeatures/options.js";
import { OperationStatusResult, KubernetesClusterFeature } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a KubernetesClusterFeatures operations. */
export interface KubernetesClusterFeaturesOperations {
  /** Get a list of features for the provided Kubernetes cluster. */
  listByKubernetesCluster: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    options?: KubernetesClusterFeaturesListByKubernetesClusterOptionalParams,
  ) => PagedAsyncIterableIterator<KubernetesClusterFeature>;
  /** Delete the provided Kubernetes cluster feature. */
  delete: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    featureName: string,
    options?: KubernetesClusterFeaturesDeleteOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Patch properties of the provided Kubernetes cluster feature. */
  update: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    featureName: string,
    options?: KubernetesClusterFeaturesUpdateOptionalParams,
  ) => PollerLike<OperationState<KubernetesClusterFeature>, KubernetesClusterFeature>;
  /** Create a new Kubernetes cluster feature or update properties of the Kubernetes cluster feature if it exists. */
  createOrUpdate: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    featureName: string,
    kubernetesClusterFeatureParameters: KubernetesClusterFeature,
    options?: KubernetesClusterFeaturesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<KubernetesClusterFeature>, KubernetesClusterFeature>;
  /** Get properties of the provided the Kubernetes cluster feature. */
  get: (
    resourceGroupName: string,
    kubernetesClusterName: string,
    featureName: string,
    options?: KubernetesClusterFeaturesGetOptionalParams,
  ) => Promise<KubernetesClusterFeature>;
}

function _getKubernetesClusterFeatures(context: NetworkCloudContext) {
  return {
    listByKubernetesCluster: (
      resourceGroupName: string,
      kubernetesClusterName: string,
      options?: KubernetesClusterFeaturesListByKubernetesClusterOptionalParams,
    ) => listByKubernetesCluster(context, resourceGroupName, kubernetesClusterName, options),
    delete: (
      resourceGroupName: string,
      kubernetesClusterName: string,
      featureName: string,
      options?: KubernetesClusterFeaturesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, kubernetesClusterName, featureName, options),
    update: (
      resourceGroupName: string,
      kubernetesClusterName: string,
      featureName: string,
      options?: KubernetesClusterFeaturesUpdateOptionalParams,
    ) => update(context, resourceGroupName, kubernetesClusterName, featureName, options),
    createOrUpdate: (
      resourceGroupName: string,
      kubernetesClusterName: string,
      featureName: string,
      kubernetesClusterFeatureParameters: KubernetesClusterFeature,
      options?: KubernetesClusterFeaturesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        kubernetesClusterName,
        featureName,
        kubernetesClusterFeatureParameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      kubernetesClusterName: string,
      featureName: string,
      options?: KubernetesClusterFeaturesGetOptionalParams,
    ) => get(context, resourceGroupName, kubernetesClusterName, featureName, options),
  };
}

export function _getKubernetesClusterFeaturesOperations(
  context: NetworkCloudContext,
): KubernetesClusterFeaturesOperations {
  return {
    ..._getKubernetesClusterFeatures(context),
  };
}
