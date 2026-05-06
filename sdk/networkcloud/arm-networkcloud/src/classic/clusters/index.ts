// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext } from "../../api/networkCloudContext.js";
import {
  updateVersion,
  scanRuntime,
  rotateCredential,
  inspect,
  deploy,
  continueUpdateVersion,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/clusters/operations.js";
import {
  ClustersUpdateVersionOptionalParams,
  ClustersScanRuntimeOptionalParams,
  ClustersRotateCredentialOptionalParams,
  ClustersInspectOptionalParams,
  ClustersDeployOptionalParams,
  ClustersContinueUpdateVersionOptionalParams,
  ClustersListBySubscriptionOptionalParams,
  ClustersListByResourceGroupOptionalParams,
  ClustersDeleteOptionalParams,
  ClustersUpdateOptionalParams,
  ClustersCreateOrUpdateOptionalParams,
  ClustersGetOptionalParams,
} from "../../api/clusters/options.js";
import {
  OperationStatusResult,
  Cluster,
  ClusterContinueUpdateVersionParameters,
  ClusterRotateCredentialParameters,
  ClusterUpdateVersionParameters,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Clusters operations. */
export interface ClustersOperations {
  /** Update the version of the provided cluster to one of the available supported versions. */
  updateVersion: (
    resourceGroupName: string,
    clusterName: string,
    clusterUpdateVersionParameters: ClusterUpdateVersionParameters,
    options?: ClustersUpdateVersionOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Triggers the execution of a runtime protection scan to detect and remediate detected issues, in accordance with the cluster configuration. */
  scanRuntime: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersScanRuntimeOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Rotate the specified cluster credential. */
  rotateCredential: (
    resourceGroupName: string,
    clusterName: string,
    body: ClusterRotateCredentialParameters,
    options?: ClustersRotateCredentialOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Trigger an inspection of the cluster to perform validation and optional corrective actions based on the supplied additional actions and filters. */
  inspect: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersInspectOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Deploy the cluster using the rack configuration provided during creation. */
  deploy: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersDeployOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Trigger the continuation of an update for a cluster with a matching update strategy that has paused after completing a segment of the update. */
  continueUpdateVersion: (
    resourceGroupName: string,
    clusterName: string,
    clusterContinueUpdateVersionParameters: ClusterContinueUpdateVersionParameters,
    options?: ClustersContinueUpdateVersionOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Get a list of clusters in the provided subscription. */
  listBySubscription: (
    options?: ClustersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Cluster>;
  /** Get a list of clusters in the provided resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Cluster>;
  /** Delete the provided cluster. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Patch the properties of the provided cluster, or update the tags associated with the cluster. Properties and tag updates can be done independently. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** Create a new cluster or update the properties of the cluster if it exists. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    clusterParameters: Cluster,
    options?: ClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** Get properties of the provided cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersGetOptionalParams,
  ) => Promise<Cluster>;
}

function _getClusters(context: NetworkCloudContext) {
  return {
    updateVersion: (
      resourceGroupName: string,
      clusterName: string,
      clusterUpdateVersionParameters: ClusterUpdateVersionParameters,
      options?: ClustersUpdateVersionOptionalParams,
    ) =>
      updateVersion(
        context,
        resourceGroupName,
        clusterName,
        clusterUpdateVersionParameters,
        options,
      ),
    scanRuntime: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersScanRuntimeOptionalParams,
    ) => scanRuntime(context, resourceGroupName, clusterName, options),
    rotateCredential: (
      resourceGroupName: string,
      clusterName: string,
      body: ClusterRotateCredentialParameters,
      options?: ClustersRotateCredentialOptionalParams,
    ) => rotateCredential(context, resourceGroupName, clusterName, body, options),
    inspect: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersInspectOptionalParams,
    ) => inspect(context, resourceGroupName, clusterName, options),
    deploy: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersDeployOptionalParams,
    ) => deploy(context, resourceGroupName, clusterName, options),
    continueUpdateVersion: (
      resourceGroupName: string,
      clusterName: string,
      clusterContinueUpdateVersionParameters: ClusterContinueUpdateVersionParameters,
      options?: ClustersContinueUpdateVersionOptionalParams,
    ) =>
      continueUpdateVersion(
        context,
        resourceGroupName,
        clusterName,
        clusterContinueUpdateVersionParameters,
        options,
      ),
    listBySubscription: (options?: ClustersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ClustersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, options),
    update: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, options),
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      clusterParameters: Cluster,
      options?: ClustersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, clusterName, clusterParameters, options),
    get: (resourceGroupName: string, clusterName: string, options?: ClustersGetOptionalParams) =>
      get(context, resourceGroupName, clusterName, options),
  };
}

export function _getClustersOperations(context: NetworkCloudContext): ClustersOperations {
  return {
    ..._getClusters(context),
  };
}
