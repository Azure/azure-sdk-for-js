// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import {
  listKubernetesVersions,
  listMeshUpgradeProfiles,
  getMeshUpgradeProfile,
  listMeshRevisionProfiles,
  getMeshRevisionProfile,
  listSafeguardsVersions,
  getSafeguardsVersions,
  listGuardrailsVersions,
  getGuardrailsVersions,
  getUpgradeProfile,
  rebalanceLoadBalancers,
  listOutboundNetworkDependenciesEndpoints,
  getCommandResult,
  runCommand,
  start,
  stop,
  rotateServiceAccountSigningKeys,
  abortLatestOperation,
  rotateClusterCertificates,
  resetAADProfile,
  resetServicePrincipalProfile,
  listClusterMonitoringUserCredentials,
  listClusterUserCredentials,
  listClusterAdminCredentials,
  getAccessProfile,
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/managedClusters/operations.js";
import type {
  ManagedClustersListKubernetesVersionsOptionalParams,
  ManagedClustersListMeshUpgradeProfilesOptionalParams,
  ManagedClustersGetMeshUpgradeProfileOptionalParams,
  ManagedClustersListMeshRevisionProfilesOptionalParams,
  ManagedClustersGetMeshRevisionProfileOptionalParams,
  ManagedClustersListSafeguardsVersionsOptionalParams,
  ManagedClustersGetSafeguardsVersionsOptionalParams,
  ManagedClustersListGuardrailsVersionsOptionalParams,
  ManagedClustersGetGuardrailsVersionsOptionalParams,
  ManagedClustersGetUpgradeProfileOptionalParams,
  ManagedClustersRebalanceLoadBalancersOptionalParams,
  ManagedClustersListOutboundNetworkDependenciesEndpointsOptionalParams,
  ManagedClustersGetCommandResultOptionalParams,
  ManagedClustersRunCommandOptionalParams,
  ManagedClustersStartOptionalParams,
  ManagedClustersStopOptionalParams,
  ManagedClustersRotateServiceAccountSigningKeysOptionalParams,
  ManagedClustersAbortLatestOperationOptionalParams,
  ManagedClustersRotateClusterCertificatesOptionalParams,
  ManagedClustersResetAADProfileOptionalParams,
  ManagedClustersResetServicePrincipalProfileOptionalParams,
  ManagedClustersListClusterMonitoringUserCredentialsOptionalParams,
  ManagedClustersListClusterUserCredentialsOptionalParams,
  ManagedClustersListClusterAdminCredentialsOptionalParams,
  ManagedClustersGetAccessProfileOptionalParams,
  ManagedClustersListOptionalParams,
  ManagedClustersListByResourceGroupOptionalParams,
  ManagedClustersDeleteOptionalParams,
  ManagedClustersUpdateTagsOptionalParams,
  ManagedClustersCreateOrUpdateOptionalParams,
  ManagedClustersGetOptionalParams,
} from "../../api/managedClusters/options.js";
import type {
  ManagedCluster,
  ManagedClusterServicePrincipalProfile,
  ManagedClusterAADProfile,
  TagsObject,
  ManagedClusterAccessProfile,
  CredentialResults,
  RunCommandRequest,
  RunCommandResult,
  OutboundEnvironmentEndpoint,
  RebalanceLoadBalancersRequestBody,
  ManagedClusterUpgradeProfile,
  GuardrailsAvailableVersion,
  SafeguardsAvailableVersion,
  MeshRevisionProfile,
  MeshUpgradeProfile,
  KubernetesVersionListResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedClusters operations. */
export interface ManagedClustersOperations {
  /** Contains extra metadata on the version, including supported patch versions, capabilities, available upgrades, and details on preview status of the version */
  listKubernetesVersions: (
    location: string,
    options?: ManagedClustersListKubernetesVersionsOptionalParams,
  ) => Promise<KubernetesVersionListResult>;
  /** Lists available upgrades for all service meshes in a specific cluster. */
  listMeshUpgradeProfiles: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersListMeshUpgradeProfilesOptionalParams,
  ) => PagedAsyncIterableIterator<MeshUpgradeProfile>;
  /** Gets available upgrades for a service mesh in a cluster. */
  getMeshUpgradeProfile: (
    resourceGroupName: string,
    resourceName: string,
    mode: string,
    options?: ManagedClustersGetMeshUpgradeProfileOptionalParams,
  ) => Promise<MeshUpgradeProfile>;
  /** Contains extra metadata on each revision, including supported revisions, cluster compatibility and available upgrades */
  listMeshRevisionProfiles: (
    location: string,
    options?: ManagedClustersListMeshRevisionProfilesOptionalParams,
  ) => PagedAsyncIterableIterator<MeshRevisionProfile>;
  /** Contains extra metadata on the revision, including supported revisions, cluster compatibility and available upgrades */
  getMeshRevisionProfile: (
    location: string,
    mode: string,
    options?: ManagedClustersGetMeshRevisionProfileOptionalParams,
  ) => Promise<MeshRevisionProfile>;
  /** Contains list of Safeguards version along with its support info and whether it is a default version. */
  listSafeguardsVersions: (
    location: string,
    options?: ManagedClustersListSafeguardsVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<SafeguardsAvailableVersion>;
  /** Contains Safeguards version along with its support info and whether it is a default version. */
  getSafeguardsVersions: (
    location: string,
    version: string,
    options?: ManagedClustersGetSafeguardsVersionsOptionalParams,
  ) => Promise<SafeguardsAvailableVersion>;
  /** Contains list of Guardrails version along with its support info and whether it is a default version. */
  listGuardrailsVersions: (
    location: string,
    options?: ManagedClustersListGuardrailsVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<GuardrailsAvailableVersion>;
  /** Contains Guardrails version along with its support info and whether it is a default version. */
  getGuardrailsVersions: (
    location: string,
    version: string,
    options?: ManagedClustersGetGuardrailsVersionsOptionalParams,
  ) => Promise<GuardrailsAvailableVersion>;
  /** Gets the upgrade profile of a managed cluster. */
  getUpgradeProfile: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersGetUpgradeProfileOptionalParams,
  ) => Promise<ManagedClusterUpgradeProfile>;
  /** Rebalance nodes across specific load balancers. */
  rebalanceLoadBalancers: (
    resourceGroupName: string,
    resourceName: string,
    parameters: RebalanceLoadBalancersRequestBody,
    options?: ManagedClustersRebalanceLoadBalancersOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use rebalanceLoadBalancers instead */
  beginRebalanceLoadBalancers: (
    resourceGroupName: string,
    resourceName: string,
    parameters: RebalanceLoadBalancersRequestBody,
    options?: ManagedClustersRebalanceLoadBalancersOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use rebalanceLoadBalancers instead */
  beginRebalanceLoadBalancersAndWait: (
    resourceGroupName: string,
    resourceName: string,
    parameters: RebalanceLoadBalancersRequestBody,
    options?: ManagedClustersRebalanceLoadBalancersOptionalParams,
  ) => Promise<void>;
  /** Gets a list of egress endpoints (network endpoints of all outbound dependencies) in the specified managed cluster. The operation returns properties of each egress endpoint. */
  listOutboundNetworkDependenciesEndpoints: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersListOutboundNetworkDependenciesEndpointsOptionalParams,
  ) => PagedAsyncIterableIterator<OutboundEnvironmentEndpoint>;
  /** Gets the results of a command which has been run on the Managed Cluster. */
  getCommandResult: (
    resourceGroupName: string,
    resourceName: string,
    commandId: string,
    options?: ManagedClustersGetCommandResultOptionalParams,
  ) => Promise<RunCommandResult>;
  /** AKS will create a pod to run the command. This is primarily useful for private clusters. For more information see [AKS Run Command](https://docs.microsoft.com/azure/aks/private-clusters#aks-run-command-preview). */
  runCommand: (
    resourceGroupName: string,
    resourceName: string,
    requestPayload: RunCommandRequest,
    options?: ManagedClustersRunCommandOptionalParams,
  ) => PollerLike<OperationState<RunCommandResult>, RunCommandResult>;
  /** @deprecated use runCommand instead */
  beginRunCommand: (
    resourceGroupName: string,
    resourceName: string,
    requestPayload: RunCommandRequest,
    options?: ManagedClustersRunCommandOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RunCommandResult>, RunCommandResult>>;
  /** @deprecated use runCommand instead */
  beginRunCommandAndWait: (
    resourceGroupName: string,
    resourceName: string,
    requestPayload: RunCommandRequest,
    options?: ManagedClustersRunCommandOptionalParams,
  ) => Promise<RunCommandResult>;
  /** See [starting a cluster](https://docs.microsoft.com/azure/aks/start-stop-cluster) for more details about starting a cluster. */
  start: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersStartOptionalParams,
  ) => Promise<void>;
  /** This can only be performed on Azure Virtual Machine Scale set backed clusters. Stopping a cluster stops the control plane and agent nodes entirely, while maintaining all object and cluster state. A cluster does not accrue charges while it is stopped. See [stopping a cluster](https://docs.microsoft.com/azure/aks/start-stop-cluster) for more details about stopping a cluster. */
  stop: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersStopOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use stop instead */
  beginStop: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersStopOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use stop instead */
  beginStopAndWait: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersStopOptionalParams,
  ) => Promise<void>;
  /** Rotates the service account signing keys of a managed cluster. */
  rotateServiceAccountSigningKeys: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersRotateServiceAccountSigningKeysOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use rotateServiceAccountSigningKeys instead */
  beginRotateServiceAccountSigningKeys: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersRotateServiceAccountSigningKeysOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use rotateServiceAccountSigningKeys instead */
  beginRotateServiceAccountSigningKeysAndWait: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersRotateServiceAccountSigningKeysOptionalParams,
  ) => Promise<void>;
  /** Aborts the currently running operation on the managed cluster. The Managed Cluster will be moved to a Canceling state and eventually to a Canceled state when cancellation finishes. If the operation completes before cancellation can take place, a 409 error code is returned. */
  abortLatestOperation: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersAbortLatestOperationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use abortLatestOperation instead */
  beginAbortLatestOperation: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersAbortLatestOperationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use abortLatestOperation instead */
  beginAbortLatestOperationAndWait: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersAbortLatestOperationOptionalParams,
  ) => Promise<void>;
  /** See [Certificate rotation](https://docs.microsoft.com/azure/aks/certificate-rotation) for more details about rotating managed cluster certificates. */
  rotateClusterCertificates: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersRotateClusterCertificatesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use rotateClusterCertificates instead */
  beginRotateClusterCertificates: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersRotateClusterCertificatesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use rotateClusterCertificates instead */
  beginRotateClusterCertificatesAndWait: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersRotateClusterCertificatesOptionalParams,
  ) => Promise<void>;
  /** **WARNING**: This API will be deprecated. Please see [AKS-managed Azure Active Directory integration](https://aka.ms/aks-managed-aad) to update your cluster with AKS-managed Azure AD. */
  resetAADProfile: (
    resourceGroupName: string,
    resourceName: string,
    parameters: ManagedClusterAADProfile,
    options?: ManagedClustersResetAADProfileOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use resetAADProfile instead */
  beginResetAADProfile: (
    resourceGroupName: string,
    resourceName: string,
    parameters: ManagedClusterAADProfile,
    options?: ManagedClustersResetAADProfileOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use resetAADProfile instead */
  beginResetAADProfileAndWait: (
    resourceGroupName: string,
    resourceName: string,
    parameters: ManagedClusterAADProfile,
    options?: ManagedClustersResetAADProfileOptionalParams,
  ) => Promise<void>;
  /** This action cannot be performed on a cluster that is not using a service principal */
  resetServicePrincipalProfile: (
    resourceGroupName: string,
    resourceName: string,
    parameters: ManagedClusterServicePrincipalProfile,
    options?: ManagedClustersResetServicePrincipalProfileOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use resetServicePrincipalProfile instead */
  beginResetServicePrincipalProfile: (
    resourceGroupName: string,
    resourceName: string,
    parameters: ManagedClusterServicePrincipalProfile,
    options?: ManagedClustersResetServicePrincipalProfileOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use resetServicePrincipalProfile instead */
  beginResetServicePrincipalProfileAndWait: (
    resourceGroupName: string,
    resourceName: string,
    parameters: ManagedClusterServicePrincipalProfile,
    options?: ManagedClustersResetServicePrincipalProfileOptionalParams,
  ) => Promise<void>;
  /** Lists the cluster monitoring user credentials of a managed cluster. */
  listClusterMonitoringUserCredentials: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersListClusterMonitoringUserCredentialsOptionalParams,
  ) => Promise<CredentialResults>;
  /** Lists the user credentials of a managed cluster. */
  listClusterUserCredentials: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersListClusterUserCredentialsOptionalParams,
  ) => Promise<CredentialResults>;
  /** Lists the admin credentials of a managed cluster. */
  listClusterAdminCredentials: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersListClusterAdminCredentialsOptionalParams,
  ) => Promise<CredentialResults>;
  /** **WARNING**: This API will be deprecated. Instead use [ListClusterUserCredentials](https://docs.microsoft.com/rest/api/aks/managedclusters/listclusterusercredentials) or [ListClusterAdminCredentials](https://docs.microsoft.com/rest/api/aks/managedclusters/listclusteradmincredentials) . */
  getAccessProfile: (
    resourceGroupName: string,
    resourceName: string,
    roleName: string,
    options?: ManagedClustersGetAccessProfileOptionalParams,
  ) => Promise<ManagedClusterAccessProfile>;
  /** Gets a list of managed clusters in the specified subscription. */
  list: (options?: ManagedClustersListOptionalParams) => PagedAsyncIterableIterator<ManagedCluster>;
  /** Lists managed clusters in the specified subscription and resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ManagedClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedCluster>;
  /** Deletes a managed cluster. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates tags on a managed cluster. */
  updateTags: (
    resourceGroupName: string,
    resourceName: string,
    parameters: TagsObject,
    options?: ManagedClustersUpdateTagsOptionalParams,
  ) => PollerLike<OperationState<ManagedCluster>, ManagedCluster>;
  /** @deprecated use updateTags instead */
  beginUpdateTags: (
    resourceGroupName: string,
    resourceName: string,
    parameters: TagsObject,
    options?: ManagedClustersUpdateTagsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ManagedCluster>, ManagedCluster>>;
  /** @deprecated use updateTags instead */
  beginUpdateTagsAndWait: (
    resourceGroupName: string,
    resourceName: string,
    parameters: TagsObject,
    options?: ManagedClustersUpdateTagsOptionalParams,
  ) => Promise<ManagedCluster>;
  /** Creates or updates a managed cluster. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    parameters: ManagedCluster,
    options?: ManagedClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedCluster>, ManagedCluster>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    parameters: ManagedCluster,
    options?: ManagedClustersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ManagedCluster>, ManagedCluster>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    parameters: ManagedCluster,
    options?: ManagedClustersCreateOrUpdateOptionalParams,
  ) => Promise<ManagedCluster>;
  /** Gets a managed cluster. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedClustersGetOptionalParams,
  ) => Promise<ManagedCluster>;
}

function _getManagedClusters(context: ContainerServiceContext) {
  return {
    listKubernetesVersions: (
      location: string,
      options?: ManagedClustersListKubernetesVersionsOptionalParams,
    ) => listKubernetesVersions(context, location, options),
    listMeshUpgradeProfiles: (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersListMeshUpgradeProfilesOptionalParams,
    ) => listMeshUpgradeProfiles(context, resourceGroupName, resourceName, options),
    getMeshUpgradeProfile: (
      resourceGroupName: string,
      resourceName: string,
      mode: string,
      options?: ManagedClustersGetMeshUpgradeProfileOptionalParams,
    ) => getMeshUpgradeProfile(context, resourceGroupName, resourceName, mode, options),
    listMeshRevisionProfiles: (
      location: string,
      options?: ManagedClustersListMeshRevisionProfilesOptionalParams,
    ) => listMeshRevisionProfiles(context, location, options),
    getMeshRevisionProfile: (
      location: string,
      mode: string,
      options?: ManagedClustersGetMeshRevisionProfileOptionalParams,
    ) => getMeshRevisionProfile(context, location, mode, options),
    listSafeguardsVersions: (
      location: string,
      options?: ManagedClustersListSafeguardsVersionsOptionalParams,
    ) => listSafeguardsVersions(context, location, options),
    getSafeguardsVersions: (
      location: string,
      version: string,
      options?: ManagedClustersGetSafeguardsVersionsOptionalParams,
    ) => getSafeguardsVersions(context, location, version, options),
    listGuardrailsVersions: (
      location: string,
      options?: ManagedClustersListGuardrailsVersionsOptionalParams,
    ) => listGuardrailsVersions(context, location, options),
    getGuardrailsVersions: (
      location: string,
      version: string,
      options?: ManagedClustersGetGuardrailsVersionsOptionalParams,
    ) => getGuardrailsVersions(context, location, version, options),
    getUpgradeProfile: (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersGetUpgradeProfileOptionalParams,
    ) => getUpgradeProfile(context, resourceGroupName, resourceName, options),
    rebalanceLoadBalancers: (
      resourceGroupName: string,
      resourceName: string,
      parameters: RebalanceLoadBalancersRequestBody,
      options?: ManagedClustersRebalanceLoadBalancersOptionalParams,
    ) => rebalanceLoadBalancers(context, resourceGroupName, resourceName, parameters, options),
    beginRebalanceLoadBalancers: async (
      resourceGroupName: string,
      resourceName: string,
      parameters: RebalanceLoadBalancersRequestBody,
      options?: ManagedClustersRebalanceLoadBalancersOptionalParams,
    ) => {
      const poller = rebalanceLoadBalancers(
        context,
        resourceGroupName,
        resourceName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRebalanceLoadBalancersAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      parameters: RebalanceLoadBalancersRequestBody,
      options?: ManagedClustersRebalanceLoadBalancersOptionalParams,
    ) => {
      return await rebalanceLoadBalancers(
        context,
        resourceGroupName,
        resourceName,
        parameters,
        options,
      );
    },
    listOutboundNetworkDependenciesEndpoints: (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersListOutboundNetworkDependenciesEndpointsOptionalParams,
    ) =>
      listOutboundNetworkDependenciesEndpoints(context, resourceGroupName, resourceName, options),
    getCommandResult: (
      resourceGroupName: string,
      resourceName: string,
      commandId: string,
      options?: ManagedClustersGetCommandResultOptionalParams,
    ) => getCommandResult(context, resourceGroupName, resourceName, commandId, options),
    runCommand: (
      resourceGroupName: string,
      resourceName: string,
      requestPayload: RunCommandRequest,
      options?: ManagedClustersRunCommandOptionalParams,
    ) => runCommand(context, resourceGroupName, resourceName, requestPayload, options),
    beginRunCommand: async (
      resourceGroupName: string,
      resourceName: string,
      requestPayload: RunCommandRequest,
      options?: ManagedClustersRunCommandOptionalParams,
    ) => {
      const poller = runCommand(context, resourceGroupName, resourceName, requestPayload, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRunCommandAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      requestPayload: RunCommandRequest,
      options?: ManagedClustersRunCommandOptionalParams,
    ) => {
      return await runCommand(context, resourceGroupName, resourceName, requestPayload, options);
    },
    start: (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersStartOptionalParams,
    ) => start(context, resourceGroupName, resourceName, options),
    beginStart: async (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, resourceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, resourceName, options);
    },
    stop: (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersStopOptionalParams,
    ) => stop(context, resourceGroupName, resourceName, options),
    beginStop: async (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersStopOptionalParams,
    ) => {
      const poller = stop(context, resourceGroupName, resourceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersStopOptionalParams,
    ) => {
      return await stop(context, resourceGroupName, resourceName, options);
    },
    rotateServiceAccountSigningKeys: (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersRotateServiceAccountSigningKeysOptionalParams,
    ) => rotateServiceAccountSigningKeys(context, resourceGroupName, resourceName, options),
    beginRotateServiceAccountSigningKeys: async (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersRotateServiceAccountSigningKeysOptionalParams,
    ) => {
      const poller = rotateServiceAccountSigningKeys(
        context,
        resourceGroupName,
        resourceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRotateServiceAccountSigningKeysAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersRotateServiceAccountSigningKeysOptionalParams,
    ) => {
      return await rotateServiceAccountSigningKeys(
        context,
        resourceGroupName,
        resourceName,
        options,
      );
    },
    abortLatestOperation: (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersAbortLatestOperationOptionalParams,
    ) => abortLatestOperation(context, resourceGroupName, resourceName, options),
    beginAbortLatestOperation: async (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersAbortLatestOperationOptionalParams,
    ) => {
      const poller = abortLatestOperation(context, resourceGroupName, resourceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginAbortLatestOperationAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersAbortLatestOperationOptionalParams,
    ) => {
      return await abortLatestOperation(context, resourceGroupName, resourceName, options);
    },
    rotateClusterCertificates: (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersRotateClusterCertificatesOptionalParams,
    ) => rotateClusterCertificates(context, resourceGroupName, resourceName, options),
    beginRotateClusterCertificates: async (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersRotateClusterCertificatesOptionalParams,
    ) => {
      const poller = rotateClusterCertificates(context, resourceGroupName, resourceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRotateClusterCertificatesAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersRotateClusterCertificatesOptionalParams,
    ) => {
      return await rotateClusterCertificates(context, resourceGroupName, resourceName, options);
    },
    resetAADProfile: (
      resourceGroupName: string,
      resourceName: string,
      parameters: ManagedClusterAADProfile,
      options?: ManagedClustersResetAADProfileOptionalParams,
    ) => resetAADProfile(context, resourceGroupName, resourceName, parameters, options),
    beginResetAADProfile: async (
      resourceGroupName: string,
      resourceName: string,
      parameters: ManagedClusterAADProfile,
      options?: ManagedClustersResetAADProfileOptionalParams,
    ) => {
      const poller = resetAADProfile(context, resourceGroupName, resourceName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResetAADProfileAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      parameters: ManagedClusterAADProfile,
      options?: ManagedClustersResetAADProfileOptionalParams,
    ) => {
      return await resetAADProfile(context, resourceGroupName, resourceName, parameters, options);
    },
    resetServicePrincipalProfile: (
      resourceGroupName: string,
      resourceName: string,
      parameters: ManagedClusterServicePrincipalProfile,
      options?: ManagedClustersResetServicePrincipalProfileOptionalParams,
    ) =>
      resetServicePrincipalProfile(context, resourceGroupName, resourceName, parameters, options),
    beginResetServicePrincipalProfile: async (
      resourceGroupName: string,
      resourceName: string,
      parameters: ManagedClusterServicePrincipalProfile,
      options?: ManagedClustersResetServicePrincipalProfileOptionalParams,
    ) => {
      const poller = resetServicePrincipalProfile(
        context,
        resourceGroupName,
        resourceName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResetServicePrincipalProfileAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      parameters: ManagedClusterServicePrincipalProfile,
      options?: ManagedClustersResetServicePrincipalProfileOptionalParams,
    ) => {
      return await resetServicePrincipalProfile(
        context,
        resourceGroupName,
        resourceName,
        parameters,
        options,
      );
    },
    listClusterMonitoringUserCredentials: (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersListClusterMonitoringUserCredentialsOptionalParams,
    ) => listClusterMonitoringUserCredentials(context, resourceGroupName, resourceName, options),
    listClusterUserCredentials: (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersListClusterUserCredentialsOptionalParams,
    ) => listClusterUserCredentials(context, resourceGroupName, resourceName, options),
    listClusterAdminCredentials: (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersListClusterAdminCredentialsOptionalParams,
    ) => listClusterAdminCredentials(context, resourceGroupName, resourceName, options),
    getAccessProfile: (
      resourceGroupName: string,
      resourceName: string,
      roleName: string,
      options?: ManagedClustersGetAccessProfileOptionalParams,
    ) => getAccessProfile(context, resourceGroupName, resourceName, roleName, options),
    list: (options?: ManagedClustersListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ManagedClustersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, options),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, resourceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, resourceName, options);
    },
    updateTags: (
      resourceGroupName: string,
      resourceName: string,
      parameters: TagsObject,
      options?: ManagedClustersUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, resourceName, parameters, options),
    beginUpdateTags: async (
      resourceGroupName: string,
      resourceName: string,
      parameters: TagsObject,
      options?: ManagedClustersUpdateTagsOptionalParams,
    ) => {
      const poller = updateTags(context, resourceGroupName, resourceName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateTagsAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      parameters: TagsObject,
      options?: ManagedClustersUpdateTagsOptionalParams,
    ) => {
      return await updateTags(context, resourceGroupName, resourceName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      parameters: ManagedCluster,
      options?: ManagedClustersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      parameters: ManagedCluster,
      options?: ManagedClustersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, resourceName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      parameters: ManagedCluster,
      options?: ManagedClustersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, resourceName, parameters, options);
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedClustersGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, options),
  };
}

export function _getManagedClustersOperations(
  context: ContainerServiceContext,
): ManagedClustersOperations {
  return {
    ..._getManagedClusters(context),
  };
}
