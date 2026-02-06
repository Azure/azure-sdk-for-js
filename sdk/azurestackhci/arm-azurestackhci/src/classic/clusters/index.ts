// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import {
  configureRemoteSupport,
  triggerLogCollection,
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
import type {
  ClustersConfigureRemoteSupportOptionalParams,
  ClustersTriggerLogCollectionOptionalParams,
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
import type {
  Cluster,
  ClusterPatch,
  SecretsLocationsChangeRequest,
  UploadCertificateRequest,
  ClusterIdentityResponse,
  SoftwareAssuranceChangeRequest,
  LogCollectionRequest,
  RemoteSupportRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Clusters operations. */
export interface ClustersOperations {
  /** Configure RemoteSupport on a cluster */
  configureRemoteSupport: (
    resourceGroupName: string,
    clusterName: string,
    remoteSupportRequest: RemoteSupportRequest,
    options?: ClustersConfigureRemoteSupportOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** @deprecated use configureRemoteSupport instead */
  beginConfigureRemoteSupport: (
    resourceGroupName: string,
    clusterName: string,
    remoteSupportRequest: RemoteSupportRequest,
    options?: ClustersConfigureRemoteSupportOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Cluster>, Cluster>>;
  /** @deprecated use configureRemoteSupport instead */
  beginConfigureRemoteSupportAndWait: (
    resourceGroupName: string,
    clusterName: string,
    remoteSupportRequest: RemoteSupportRequest,
    options?: ClustersConfigureRemoteSupportOptionalParams,
  ) => Promise<Cluster>;
  /** Trigger Log Collection on a cluster */
  triggerLogCollection: (
    resourceGroupName: string,
    clusterName: string,
    logCollectionRequest: LogCollectionRequest,
    options?: ClustersTriggerLogCollectionOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** @deprecated use triggerLogCollection instead */
  beginTriggerLogCollection: (
    resourceGroupName: string,
    clusterName: string,
    logCollectionRequest: LogCollectionRequest,
    options?: ClustersTriggerLogCollectionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Cluster>, Cluster>>;
  /** @deprecated use triggerLogCollection instead */
  beginTriggerLogCollectionAndWait: (
    resourceGroupName: string,
    clusterName: string,
    logCollectionRequest: LogCollectionRequest,
    options?: ClustersTriggerLogCollectionOptionalParams,
  ) => Promise<Cluster>;
  /** Extends Software Assurance Benefit to a cluster */
  extendSoftwareAssuranceBenefit: (
    resourceGroupName: string,
    clusterName: string,
    softwareAssuranceChangeRequest: SoftwareAssuranceChangeRequest,
    options?: ClustersExtendSoftwareAssuranceBenefitOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** @deprecated use extendSoftwareAssuranceBenefit instead */
  beginExtendSoftwareAssuranceBenefit: (
    resourceGroupName: string,
    clusterName: string,
    softwareAssuranceChangeRequest: SoftwareAssuranceChangeRequest,
    options?: ClustersExtendSoftwareAssuranceBenefitOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Cluster>, Cluster>>;
  /** @deprecated use extendSoftwareAssuranceBenefit instead */
  beginExtendSoftwareAssuranceBenefitAndWait: (
    resourceGroupName: string,
    clusterName: string,
    softwareAssuranceChangeRequest: SoftwareAssuranceChangeRequest,
    options?: ClustersExtendSoftwareAssuranceBenefitOptionalParams,
  ) => Promise<Cluster>;
  /** Create cluster identity. */
  createIdentity: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersCreateIdentityOptionalParams,
  ) => PollerLike<OperationState<ClusterIdentityResponse>, ClusterIdentityResponse>;
  /** @deprecated use createIdentity instead */
  beginCreateIdentity: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersCreateIdentityOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ClusterIdentityResponse>, ClusterIdentityResponse>>;
  /** @deprecated use createIdentity instead */
  beginCreateIdentityAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersCreateIdentityOptionalParams,
  ) => Promise<ClusterIdentityResponse>;
  /** Upload certificate. */
  uploadCertificate: (
    resourceGroupName: string,
    clusterName: string,
    uploadCertificateRequest: UploadCertificateRequest,
    options?: ClustersUploadCertificateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use uploadCertificate instead */
  beginUploadCertificate: (
    resourceGroupName: string,
    clusterName: string,
    uploadCertificateRequest: UploadCertificateRequest,
    options?: ClustersUploadCertificateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use uploadCertificate instead */
  beginUploadCertificateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    uploadCertificateRequest: UploadCertificateRequest,
    options?: ClustersUploadCertificateOptionalParams,
  ) => Promise<void>;
  /** Update cluster secrets locations. */
  updateSecretsLocations: (
    resourceGroupName: string,
    clusterName: string,
    body: SecretsLocationsChangeRequest,
    options?: ClustersUpdateSecretsLocationsOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** @deprecated use updateSecretsLocations instead */
  beginUpdateSecretsLocations: (
    resourceGroupName: string,
    clusterName: string,
    body: SecretsLocationsChangeRequest,
    options?: ClustersUpdateSecretsLocationsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Cluster>, Cluster>>;
  /** @deprecated use updateSecretsLocations instead */
  beginUpdateSecretsLocationsAndWait: (
    resourceGroupName: string,
    clusterName: string,
    body: SecretsLocationsChangeRequest,
    options?: ClustersUpdateSecretsLocationsOptionalParams,
  ) => Promise<Cluster>;
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersDeleteOptionalParams,
  ) => Promise<void>;
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
    beginConfigureRemoteSupport: async (
      resourceGroupName: string,
      clusterName: string,
      remoteSupportRequest: RemoteSupportRequest,
      options?: ClustersConfigureRemoteSupportOptionalParams,
    ) => {
      const poller = configureRemoteSupport(
        context,
        resourceGroupName,
        clusterName,
        remoteSupportRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginConfigureRemoteSupportAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      remoteSupportRequest: RemoteSupportRequest,
      options?: ClustersConfigureRemoteSupportOptionalParams,
    ) => {
      return await configureRemoteSupport(
        context,
        resourceGroupName,
        clusterName,
        remoteSupportRequest,
        options,
      );
    },
    triggerLogCollection: (
      resourceGroupName: string,
      clusterName: string,
      logCollectionRequest: LogCollectionRequest,
      options?: ClustersTriggerLogCollectionOptionalParams,
    ) =>
      triggerLogCollection(context, resourceGroupName, clusterName, logCollectionRequest, options),
    beginTriggerLogCollection: async (
      resourceGroupName: string,
      clusterName: string,
      logCollectionRequest: LogCollectionRequest,
      options?: ClustersTriggerLogCollectionOptionalParams,
    ) => {
      const poller = triggerLogCollection(
        context,
        resourceGroupName,
        clusterName,
        logCollectionRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTriggerLogCollectionAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      logCollectionRequest: LogCollectionRequest,
      options?: ClustersTriggerLogCollectionOptionalParams,
    ) => {
      return await triggerLogCollection(
        context,
        resourceGroupName,
        clusterName,
        logCollectionRequest,
        options,
      );
    },
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
    beginExtendSoftwareAssuranceBenefit: async (
      resourceGroupName: string,
      clusterName: string,
      softwareAssuranceChangeRequest: SoftwareAssuranceChangeRequest,
      options?: ClustersExtendSoftwareAssuranceBenefitOptionalParams,
    ) => {
      const poller = extendSoftwareAssuranceBenefit(
        context,
        resourceGroupName,
        clusterName,
        softwareAssuranceChangeRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginExtendSoftwareAssuranceBenefitAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      softwareAssuranceChangeRequest: SoftwareAssuranceChangeRequest,
      options?: ClustersExtendSoftwareAssuranceBenefitOptionalParams,
    ) => {
      return await extendSoftwareAssuranceBenefit(
        context,
        resourceGroupName,
        clusterName,
        softwareAssuranceChangeRequest,
        options,
      );
    },
    createIdentity: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersCreateIdentityOptionalParams,
    ) => createIdentity(context, resourceGroupName, clusterName, options),
    beginCreateIdentity: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersCreateIdentityOptionalParams,
    ) => {
      const poller = createIdentity(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateIdentityAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersCreateIdentityOptionalParams,
    ) => {
      return await createIdentity(context, resourceGroupName, clusterName, options);
    },
    uploadCertificate: (
      resourceGroupName: string,
      clusterName: string,
      uploadCertificateRequest: UploadCertificateRequest,
      options?: ClustersUploadCertificateOptionalParams,
    ) =>
      uploadCertificate(context, resourceGroupName, clusterName, uploadCertificateRequest, options),
    beginUploadCertificate: async (
      resourceGroupName: string,
      clusterName: string,
      uploadCertificateRequest: UploadCertificateRequest,
      options?: ClustersUploadCertificateOptionalParams,
    ) => {
      const poller = uploadCertificate(
        context,
        resourceGroupName,
        clusterName,
        uploadCertificateRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUploadCertificateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      uploadCertificateRequest: UploadCertificateRequest,
      options?: ClustersUploadCertificateOptionalParams,
    ) => {
      return await uploadCertificate(
        context,
        resourceGroupName,
        clusterName,
        uploadCertificateRequest,
        options,
      );
    },
    updateSecretsLocations: (
      resourceGroupName: string,
      clusterName: string,
      body: SecretsLocationsChangeRequest,
      options?: ClustersUpdateSecretsLocationsOptionalParams,
    ) => updateSecretsLocations(context, resourceGroupName, clusterName, body, options),
    beginUpdateSecretsLocations: async (
      resourceGroupName: string,
      clusterName: string,
      body: SecretsLocationsChangeRequest,
      options?: ClustersUpdateSecretsLocationsOptionalParams,
    ) => {
      const poller = updateSecretsLocations(context, resourceGroupName, clusterName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateSecretsLocationsAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      body: SecretsLocationsChangeRequest,
      options?: ClustersUpdateSecretsLocationsOptionalParams,
    ) => {
      return await updateSecretsLocations(context, resourceGroupName, clusterName, body, options);
    },
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
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, options);
    },
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
