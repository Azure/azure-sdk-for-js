// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KustoManagementContext } from "../../api/kustoManagementContext.js";
import {
  checkNameAvailability,
  listSkus,
  removeLanguageExtensions,
  addLanguageExtensions,
  listLanguageExtensions,
  listCalloutPolicies,
  removeCalloutPolicy,
  addCalloutPolicies,
  listOutboundNetworkDependenciesEndpoints,
  listSkusByResource,
  diagnoseVirtualNetwork,
  detachFollowerDatabases,
  listFollowerDatabases,
  listFollowerDatabasesGet,
  migrate,
  start,
  stop,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/clusters/operations.js";
import type {
  ClustersCheckNameAvailabilityOptionalParams,
  ClustersListSkusOptionalParams,
  ClustersRemoveLanguageExtensionsOptionalParams,
  ClustersAddLanguageExtensionsOptionalParams,
  ClustersListLanguageExtensionsOptionalParams,
  ClustersListCalloutPoliciesOptionalParams,
  ClustersRemoveCalloutPolicyOptionalParams,
  ClustersAddCalloutPoliciesOptionalParams,
  ClustersListOutboundNetworkDependenciesEndpointsOptionalParams,
  ClustersListSkusByResourceOptionalParams,
  ClustersDiagnoseVirtualNetworkOptionalParams,
  ClustersDetachFollowerDatabasesOptionalParams,
  ClustersListFollowerDatabasesOptionalParams,
  ClustersListFollowerDatabasesGetOptionalParams,
  ClustersMigrateOptionalParams,
  ClustersStartOptionalParams,
  ClustersStopOptionalParams,
  ClustersListOptionalParams,
  ClustersListByResourceGroupOptionalParams,
  ClustersDeleteOptionalParams,
  ClustersUpdateOptionalParams,
  ClustersCreateOrUpdateOptionalParams,
  ClustersGetOptionalParams,
} from "../../api/clusters/options.js";
import type {
  CheckNameResult,
  Cluster,
  LanguageExtensionsList,
  LanguageExtension,
  CalloutPolicy,
  ClusterUpdate,
  ClusterMigrateRequest,
  FollowerDatabaseDefinitionGet,
  FollowerDatabaseDefinition,
  DiagnoseVirtualNetworkResult,
  AzureResourceSku,
  OutboundNetworkDependenciesEndpoint,
  _CalloutPoliciesList,
  CalloutPolicyToRemove,
  SkuDescription,
  ClusterCheckNameRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Clusters operations. */
export interface ClustersOperations {
  /** Checks that the cluster name is valid and is not already in use. */
  checkNameAvailability: (
    location: string,
    clusterName: ClusterCheckNameRequest,
    options?: ClustersCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameResult>;
  /** Lists eligible SKUs for Kusto resource provider. */
  listSkus: (
    options?: ClustersListSkusOptionalParams,
  ) => PagedAsyncIterableIterator<SkuDescription>;
  /** Remove a list of language extensions that can run within KQL queries. */
  removeLanguageExtensions: (
    resourceGroupName: string,
    clusterName: string,
    languageExtensionsToRemove: LanguageExtensionsList,
    options?: ClustersRemoveLanguageExtensionsOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use removeLanguageExtensions instead */
  beginRemoveLanguageExtensions: (
    resourceGroupName: string,
    clusterName: string,
    languageExtensionsToRemove: LanguageExtensionsList,
    options?: ClustersRemoveLanguageExtensionsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use removeLanguageExtensions instead */
  beginRemoveLanguageExtensionsAndWait: (
    resourceGroupName: string,
    clusterName: string,
    languageExtensionsToRemove: LanguageExtensionsList,
    options?: ClustersRemoveLanguageExtensionsOptionalParams,
  ) => Promise<void>;
  /** Add a list of language extensions that can run within KQL queries. */
  addLanguageExtensions: (
    resourceGroupName: string,
    clusterName: string,
    languageExtensionsToAdd: LanguageExtensionsList,
    options?: ClustersAddLanguageExtensionsOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use addLanguageExtensions instead */
  beginAddLanguageExtensions: (
    resourceGroupName: string,
    clusterName: string,
    languageExtensionsToAdd: LanguageExtensionsList,
    options?: ClustersAddLanguageExtensionsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use addLanguageExtensions instead */
  beginAddLanguageExtensionsAndWait: (
    resourceGroupName: string,
    clusterName: string,
    languageExtensionsToAdd: LanguageExtensionsList,
    options?: ClustersAddLanguageExtensionsOptionalParams,
  ) => Promise<void>;
  /** Returns a list of language extensions that can run within KQL queries. */
  listLanguageExtensions: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersListLanguageExtensionsOptionalParams,
  ) => PagedAsyncIterableIterator<LanguageExtension>;
  /** Returns the allowed callout policies for the specified service. */
  listCalloutPolicies: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersListCalloutPoliciesOptionalParams,
  ) => PagedAsyncIterableIterator<CalloutPolicy>;
  /** Removes callout policy for engine services. */
  removeCalloutPolicy: (
    resourceGroupName: string,
    clusterName: string,
    calloutPolicy: CalloutPolicyToRemove,
    options?: ClustersRemoveCalloutPolicyOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use removeCalloutPolicy instead */
  beginRemoveCalloutPolicy: (
    resourceGroupName: string,
    clusterName: string,
    calloutPolicy: CalloutPolicyToRemove,
    options?: ClustersRemoveCalloutPolicyOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use removeCalloutPolicy instead */
  beginRemoveCalloutPolicyAndWait: (
    resourceGroupName: string,
    clusterName: string,
    calloutPolicy: CalloutPolicyToRemove,
    options?: ClustersRemoveCalloutPolicyOptionalParams,
  ) => Promise<void>;
  /** Adds a list of callout policies for engine services. */
  addCalloutPolicies: (
    resourceGroupName: string,
    clusterName: string,
    calloutPolicies: _CalloutPoliciesList,
    options?: ClustersAddCalloutPoliciesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use addCalloutPolicies instead */
  beginAddCalloutPolicies: (
    resourceGroupName: string,
    clusterName: string,
    calloutPolicies: _CalloutPoliciesList,
    options?: ClustersAddCalloutPoliciesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use addCalloutPolicies instead */
  beginAddCalloutPoliciesAndWait: (
    resourceGroupName: string,
    clusterName: string,
    calloutPolicies: _CalloutPoliciesList,
    options?: ClustersAddCalloutPoliciesOptionalParams,
  ) => Promise<void>;
  /** Gets the network endpoints of all outbound dependencies of a Kusto cluster */
  listOutboundNetworkDependenciesEndpoints: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersListOutboundNetworkDependenciesEndpointsOptionalParams,
  ) => PagedAsyncIterableIterator<OutboundNetworkDependenciesEndpoint>;
  /** Returns the SKUs available for the provided resource. */
  listSkusByResource: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersListSkusByResourceOptionalParams,
  ) => PagedAsyncIterableIterator<AzureResourceSku>;
  /** Diagnoses network connectivity status for external resources on which the service is dependent on. */
  diagnoseVirtualNetwork: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersDiagnoseVirtualNetworkOptionalParams,
  ) => PollerLike<OperationState<DiagnoseVirtualNetworkResult>, DiagnoseVirtualNetworkResult>;
  /** @deprecated use diagnoseVirtualNetwork instead */
  beginDiagnoseVirtualNetwork: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersDiagnoseVirtualNetworkOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DiagnoseVirtualNetworkResult>, DiagnoseVirtualNetworkResult>
  >;
  /** @deprecated use diagnoseVirtualNetwork instead */
  beginDiagnoseVirtualNetworkAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersDiagnoseVirtualNetworkOptionalParams,
  ) => Promise<DiagnoseVirtualNetworkResult>;
  /** Detaches all followers of a database owned by this cluster. */
  detachFollowerDatabases: (
    resourceGroupName: string,
    clusterName: string,
    followerDatabaseToRemove: FollowerDatabaseDefinition,
    options?: ClustersDetachFollowerDatabasesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use detachFollowerDatabases instead */
  beginDetachFollowerDatabases: (
    resourceGroupName: string,
    clusterName: string,
    followerDatabaseToRemove: FollowerDatabaseDefinition,
    options?: ClustersDetachFollowerDatabasesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use detachFollowerDatabases instead */
  beginDetachFollowerDatabasesAndWait: (
    resourceGroupName: string,
    clusterName: string,
    followerDatabaseToRemove: FollowerDatabaseDefinition,
    options?: ClustersDetachFollowerDatabasesOptionalParams,
  ) => Promise<void>;
  /** Returns a list of databases that are owned by this cluster and were followed by another cluster. */
  listFollowerDatabases: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersListFollowerDatabasesOptionalParams,
  ) => PagedAsyncIterableIterator<FollowerDatabaseDefinition>;
  /** Returns a list of databases that are owned by this cluster and were followed by another cluster. */
  listFollowerDatabasesGet: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersListFollowerDatabasesGetOptionalParams,
  ) => PagedAsyncIterableIterator<FollowerDatabaseDefinitionGet>;
  /** Migrate data from a Kusto cluster to another cluster. */
  migrate: (
    resourceGroupName: string,
    clusterName: string,
    clusterMigrateRequest: ClusterMigrateRequest,
    options?: ClustersMigrateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use migrate instead */
  beginMigrate: (
    resourceGroupName: string,
    clusterName: string,
    clusterMigrateRequest: ClusterMigrateRequest,
    options?: ClustersMigrateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use migrate instead */
  beginMigrateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    clusterMigrateRequest: ClusterMigrateRequest,
    options?: ClustersMigrateOptionalParams,
  ) => Promise<void>;
  /** Starts a Kusto cluster. */
  start: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersStartOptionalParams,
  ) => Promise<void>;
  /** Stops a Kusto cluster. */
  stop: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersStopOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use stop instead */
  beginStop: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersStopOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use stop instead */
  beginStopAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersStopOptionalParams,
  ) => Promise<void>;
  /** Lists all Kusto clusters within a subscription. */
  list: (options?: ClustersListOptionalParams) => PagedAsyncIterableIterator<Cluster>;
  /** Lists all Kusto clusters within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Cluster>;
  /** Deletes a Kusto cluster. */
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
  /** Update a Kusto cluster. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterUpdate,
    options?: ClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterUpdate,
    options?: ClustersUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Cluster>, Cluster>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterUpdate,
    options?: ClustersUpdateOptionalParams,
  ) => Promise<Cluster>;
  /** Create or update a Kusto cluster. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    parameters: Cluster,
    options?: ClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    parameters: Cluster,
    options?: ClustersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Cluster>, Cluster>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    parameters: Cluster,
    options?: ClustersCreateOrUpdateOptionalParams,
  ) => Promise<Cluster>;
  /** Gets a Kusto cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersGetOptionalParams,
  ) => Promise<Cluster>;
}

function _getClusters(context: KustoManagementContext) {
  return {
    checkNameAvailability: (
      location: string,
      clusterName: ClusterCheckNameRequest,
      options?: ClustersCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, location, clusterName, options),
    listSkus: (options?: ClustersListSkusOptionalParams) => listSkus(context, options),
    removeLanguageExtensions: (
      resourceGroupName: string,
      clusterName: string,
      languageExtensionsToRemove: LanguageExtensionsList,
      options?: ClustersRemoveLanguageExtensionsOptionalParams,
    ) =>
      removeLanguageExtensions(
        context,
        resourceGroupName,
        clusterName,
        languageExtensionsToRemove,
        options,
      ),
    beginRemoveLanguageExtensions: async (
      resourceGroupName: string,
      clusterName: string,
      languageExtensionsToRemove: LanguageExtensionsList,
      options?: ClustersRemoveLanguageExtensionsOptionalParams,
    ) => {
      const poller = removeLanguageExtensions(
        context,
        resourceGroupName,
        clusterName,
        languageExtensionsToRemove,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRemoveLanguageExtensionsAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      languageExtensionsToRemove: LanguageExtensionsList,
      options?: ClustersRemoveLanguageExtensionsOptionalParams,
    ) => {
      return await removeLanguageExtensions(
        context,
        resourceGroupName,
        clusterName,
        languageExtensionsToRemove,
        options,
      );
    },
    addLanguageExtensions: (
      resourceGroupName: string,
      clusterName: string,
      languageExtensionsToAdd: LanguageExtensionsList,
      options?: ClustersAddLanguageExtensionsOptionalParams,
    ) =>
      addLanguageExtensions(
        context,
        resourceGroupName,
        clusterName,
        languageExtensionsToAdd,
        options,
      ),
    beginAddLanguageExtensions: async (
      resourceGroupName: string,
      clusterName: string,
      languageExtensionsToAdd: LanguageExtensionsList,
      options?: ClustersAddLanguageExtensionsOptionalParams,
    ) => {
      const poller = addLanguageExtensions(
        context,
        resourceGroupName,
        clusterName,
        languageExtensionsToAdd,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginAddLanguageExtensionsAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      languageExtensionsToAdd: LanguageExtensionsList,
      options?: ClustersAddLanguageExtensionsOptionalParams,
    ) => {
      return await addLanguageExtensions(
        context,
        resourceGroupName,
        clusterName,
        languageExtensionsToAdd,
        options,
      );
    },
    listLanguageExtensions: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersListLanguageExtensionsOptionalParams,
    ) => listLanguageExtensions(context, resourceGroupName, clusterName, options),
    listCalloutPolicies: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersListCalloutPoliciesOptionalParams,
    ) => listCalloutPolicies(context, resourceGroupName, clusterName, options),
    removeCalloutPolicy: (
      resourceGroupName: string,
      clusterName: string,
      calloutPolicy: CalloutPolicyToRemove,
      options?: ClustersRemoveCalloutPolicyOptionalParams,
    ) => removeCalloutPolicy(context, resourceGroupName, clusterName, calloutPolicy, options),
    beginRemoveCalloutPolicy: async (
      resourceGroupName: string,
      clusterName: string,
      calloutPolicy: CalloutPolicyToRemove,
      options?: ClustersRemoveCalloutPolicyOptionalParams,
    ) => {
      const poller = removeCalloutPolicy(
        context,
        resourceGroupName,
        clusterName,
        calloutPolicy,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRemoveCalloutPolicyAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      calloutPolicy: CalloutPolicyToRemove,
      options?: ClustersRemoveCalloutPolicyOptionalParams,
    ) => {
      return await removeCalloutPolicy(
        context,
        resourceGroupName,
        clusterName,
        calloutPolicy,
        options,
      );
    },
    addCalloutPolicies: (
      resourceGroupName: string,
      clusterName: string,
      calloutPolicies: _CalloutPoliciesList,
      options?: ClustersAddCalloutPoliciesOptionalParams,
    ) => addCalloutPolicies(context, resourceGroupName, clusterName, calloutPolicies, options),
    beginAddCalloutPolicies: async (
      resourceGroupName: string,
      clusterName: string,
      calloutPolicies: _CalloutPoliciesList,
      options?: ClustersAddCalloutPoliciesOptionalParams,
    ) => {
      const poller = addCalloutPolicies(
        context,
        resourceGroupName,
        clusterName,
        calloutPolicies,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginAddCalloutPoliciesAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      calloutPolicies: _CalloutPoliciesList,
      options?: ClustersAddCalloutPoliciesOptionalParams,
    ) => {
      return await addCalloutPolicies(
        context,
        resourceGroupName,
        clusterName,
        calloutPolicies,
        options,
      );
    },
    listOutboundNetworkDependenciesEndpoints: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersListOutboundNetworkDependenciesEndpointsOptionalParams,
    ) => listOutboundNetworkDependenciesEndpoints(context, resourceGroupName, clusterName, options),
    listSkusByResource: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersListSkusByResourceOptionalParams,
    ) => listSkusByResource(context, resourceGroupName, clusterName, options),
    diagnoseVirtualNetwork: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersDiagnoseVirtualNetworkOptionalParams,
    ) => diagnoseVirtualNetwork(context, resourceGroupName, clusterName, options),
    beginDiagnoseVirtualNetwork: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersDiagnoseVirtualNetworkOptionalParams,
    ) => {
      const poller = diagnoseVirtualNetwork(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDiagnoseVirtualNetworkAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersDiagnoseVirtualNetworkOptionalParams,
    ) => {
      return await diagnoseVirtualNetwork(context, resourceGroupName, clusterName, options);
    },
    detachFollowerDatabases: (
      resourceGroupName: string,
      clusterName: string,
      followerDatabaseToRemove: FollowerDatabaseDefinition,
      options?: ClustersDetachFollowerDatabasesOptionalParams,
    ) =>
      detachFollowerDatabases(
        context,
        resourceGroupName,
        clusterName,
        followerDatabaseToRemove,
        options,
      ),
    beginDetachFollowerDatabases: async (
      resourceGroupName: string,
      clusterName: string,
      followerDatabaseToRemove: FollowerDatabaseDefinition,
      options?: ClustersDetachFollowerDatabasesOptionalParams,
    ) => {
      const poller = detachFollowerDatabases(
        context,
        resourceGroupName,
        clusterName,
        followerDatabaseToRemove,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDetachFollowerDatabasesAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      followerDatabaseToRemove: FollowerDatabaseDefinition,
      options?: ClustersDetachFollowerDatabasesOptionalParams,
    ) => {
      return await detachFollowerDatabases(
        context,
        resourceGroupName,
        clusterName,
        followerDatabaseToRemove,
        options,
      );
    },
    listFollowerDatabases: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersListFollowerDatabasesOptionalParams,
    ) => listFollowerDatabases(context, resourceGroupName, clusterName, options),
    listFollowerDatabasesGet: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersListFollowerDatabasesGetOptionalParams,
    ) => listFollowerDatabasesGet(context, resourceGroupName, clusterName, options),
    migrate: (
      resourceGroupName: string,
      clusterName: string,
      clusterMigrateRequest: ClusterMigrateRequest,
      options?: ClustersMigrateOptionalParams,
    ) => migrate(context, resourceGroupName, clusterName, clusterMigrateRequest, options),
    beginMigrate: async (
      resourceGroupName: string,
      clusterName: string,
      clusterMigrateRequest: ClusterMigrateRequest,
      options?: ClustersMigrateOptionalParams,
    ) => {
      const poller = migrate(
        context,
        resourceGroupName,
        clusterName,
        clusterMigrateRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      clusterMigrateRequest: ClusterMigrateRequest,
      options?: ClustersMigrateOptionalParams,
    ) => {
      return await migrate(context, resourceGroupName, clusterName, clusterMigrateRequest, options);
    },
    start: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersStartOptionalParams,
    ) => start(context, resourceGroupName, clusterName, options),
    beginStart: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, clusterName, options);
    },
    stop: (resourceGroupName: string, clusterName: string, options?: ClustersStopOptionalParams) =>
      stop(context, resourceGroupName, clusterName, options),
    beginStop: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersStopOptionalParams,
    ) => {
      const poller = stop(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersStopOptionalParams,
    ) => {
      return await stop(context, resourceGroupName, clusterName, options);
    },
    list: (options?: ClustersListOptionalParams) => list(context, options),
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
      parameters: ClusterUpdate,
      options?: ClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: ClusterUpdate,
      options?: ClustersUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, clusterName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: ClusterUpdate,
      options?: ClustersUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, clusterName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      parameters: Cluster,
      options?: ClustersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, clusterName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: Cluster,
      options?: ClustersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, clusterName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: Cluster,
      options?: ClustersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, clusterName, parameters, options);
    },
    get: (resourceGroupName: string, clusterName: string, options?: ClustersGetOptionalParams) =>
      get(context, resourceGroupName, clusterName, options),
  };
}

export function _getClustersOperations(context: KustoManagementContext): ClustersOperations {
  return {
    ..._getClusters(context),
  };
}
