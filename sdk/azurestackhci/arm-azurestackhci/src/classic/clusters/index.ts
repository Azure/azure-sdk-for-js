// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import {
  configureRemoteSupport,
  triggerLogCollection,
  changeRing,
  extendSoftwareAssuranceBenefit,
  createIdentity,
  uploadCertificate,
  updateSecretsLocations,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/clusters/operations.js";
import {
  ClustersConfigureRemoteSupportOptionalParams,
  ClustersTriggerLogCollectionOptionalParams,
  ClustersChangeRingOptionalParams,
  ClustersExtendSoftwareAssuranceBenefitOptionalParams,
  ClustersCreateIdentityOptionalParams,
  ClustersUploadCertificateOptionalParams,
  ClustersUpdateSecretsLocationsOptionalParams,
  ClustersListBySubscriptionOptionalParams,
  ClustersListByResourceGroupOptionalParams,
  ClustersDeleteOptionalParams,
  ClustersUpdateOptionalParams,
  ClustersCreateOptionalParams,
  ClustersGetOptionalParams,
} from "../../api/clusters/options.js";
import {
  Cluster,
  ClusterPatch,
  SecretsLocationsChangeRequest,
  UploadCertificateRequest,
  ClusterIdentityResponse,
  SoftwareAssuranceChangeRequest,
  ChangeRingRequest,
  LogCollectionRequest,
  RemoteSupportRequest,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Clusters operations. */
export interface ClustersOperations {
  /** Configure RemoteSupport on a cluster */
  configureRemoteSupport: (
    resourceGroupName: string,
    clusterName: string,
    remoteSupportRequest: RemoteSupportRequest,
    options?: ClustersConfigureRemoteSupportOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** Trigger Log Collection on a cluster */
  triggerLogCollection: (
    resourceGroupName: string,
    clusterName: string,
    logCollectionRequest: LogCollectionRequest,
    options?: ClustersTriggerLogCollectionOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** Changes ring of a cluster */
  changeRing: (
    resourceGroupName: string,
    clusterName: string,
    changeRingRequest: ChangeRingRequest,
    options?: ClustersChangeRingOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** Extends Software Assurance Benefit to a cluster */
  extendSoftwareAssuranceBenefit: (
    resourceGroupName: string,
    clusterName: string,
    softwareAssuranceChangeRequest: SoftwareAssuranceChangeRequest,
    options?: ClustersExtendSoftwareAssuranceBenefitOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** Create cluster identity. */
  createIdentity: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersCreateIdentityOptionalParams,
  ) => PollerLike<OperationState<ClusterIdentityResponse>, ClusterIdentityResponse>;
  /** Upload certificate. */
  uploadCertificate: (
    resourceGroupName: string,
    clusterName: string,
    uploadCertificateRequest: UploadCertificateRequest,
    options?: ClustersUploadCertificateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update cluster secrets locations. */
  updateSecretsLocations: (
    resourceGroupName: string,
    clusterName: string,
    body: SecretsLocationsChangeRequest,
    options?: ClustersUpdateSecretsLocationsOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** List all HCI clusters in a subscription. */
  listBySubscription: (
    options?: ClustersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Cluster>;
  /** List all HCI clusters in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Cluster>;
  /** Delete an HCI cluster. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update an HCI cluster. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    cluster: ClusterPatch,
    options?: ClustersUpdateOptionalParams,
  ) => Promise<Cluster>;
  /** Create an HCI cluster. */
  create: (
    resourceGroupName: string,
    clusterName: string,
    cluster: Cluster,
    options?: ClustersCreateOptionalParams,
  ) => Promise<Cluster>;
  /** Get HCI cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersGetOptionalParams,
  ) => Promise<Cluster>;
}

function _getClusters(context: AzureStackHCIContext) {
  return {
    configureRemoteSupport: (
      resourceGroupName: string,
      clusterName: string,
      remoteSupportRequest: RemoteSupportRequest,
      options?: ClustersConfigureRemoteSupportOptionalParams,
    ) =>
      configureRemoteSupport(
        context,
        resourceGroupName,
        clusterName,
        remoteSupportRequest,
        options,
      ),
    triggerLogCollection: (
      resourceGroupName: string,
      clusterName: string,
      logCollectionRequest: LogCollectionRequest,
      options?: ClustersTriggerLogCollectionOptionalParams,
    ) =>
      triggerLogCollection(context, resourceGroupName, clusterName, logCollectionRequest, options),
    changeRing: (
      resourceGroupName: string,
      clusterName: string,
      changeRingRequest: ChangeRingRequest,
      options?: ClustersChangeRingOptionalParams,
    ) => changeRing(context, resourceGroupName, clusterName, changeRingRequest, options),
    extendSoftwareAssuranceBenefit: (
      resourceGroupName: string,
      clusterName: string,
      softwareAssuranceChangeRequest: SoftwareAssuranceChangeRequest,
      options?: ClustersExtendSoftwareAssuranceBenefitOptionalParams,
    ) =>
      extendSoftwareAssuranceBenefit(
        context,
        resourceGroupName,
        clusterName,
        softwareAssuranceChangeRequest,
        options,
      ),
    createIdentity: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersCreateIdentityOptionalParams,
    ) => createIdentity(context, resourceGroupName, clusterName, options),
    uploadCertificate: (
      resourceGroupName: string,
      clusterName: string,
      uploadCertificateRequest: UploadCertificateRequest,
      options?: ClustersUploadCertificateOptionalParams,
    ) =>
      uploadCertificate(context, resourceGroupName, clusterName, uploadCertificateRequest, options),
    updateSecretsLocations: (
      resourceGroupName: string,
      clusterName: string,
      body: SecretsLocationsChangeRequest,
      options?: ClustersUpdateSecretsLocationsOptionalParams,
    ) => updateSecretsLocations(context, resourceGroupName, clusterName, body, options),
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
      cluster: ClusterPatch,
      options?: ClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, cluster, options),
    create: (
      resourceGroupName: string,
      clusterName: string,
      cluster: Cluster,
      options?: ClustersCreateOptionalParams,
    ) => create(context, resourceGroupName, clusterName, cluster, options),
    get: (resourceGroupName: string, clusterName: string, options?: ClustersGetOptionalParams) =>
      get(context, resourceGroupName, clusterName, options),
  };
}

export function _getClustersOperations(context: AzureStackHCIContext): ClustersOperations {
  return {
    ..._getClusters(context),
  };
}
