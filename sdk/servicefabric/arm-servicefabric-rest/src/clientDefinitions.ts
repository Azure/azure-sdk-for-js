// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ClustersGetParameters,
  ClustersCreateOrUpdateParameters,
  ClustersUpdateParameters,
  ClustersDeleteParameters,
  ClustersListByResourceGroupParameters,
  ClustersListParameters,
  ClustersListUpgradableVersionsParameters,
  ClusterVersionsGetParameters,
  ClusterVersionsGetByEnvironmentParameters,
  ClusterVersionsListParameters,
  ClusterVersionsListByEnvironmentParameters,
  OperationsListParameters,
  ApplicationTypesGetParameters,
  ApplicationTypesCreateOrUpdateParameters,
  ApplicationTypesDeleteParameters,
  ApplicationTypesListParameters,
  ApplicationTypeVersionsGetParameters,
  ApplicationTypeVersionsCreateOrUpdateParameters,
  ApplicationTypeVersionsDeleteParameters,
  ApplicationTypeVersionsListParameters,
  ApplicationsGetParameters,
  ApplicationsCreateOrUpdateParameters,
  ApplicationsUpdateParameters,
  ApplicationsDeleteParameters,
  ApplicationsListParameters,
  ServicesGetParameters,
  ServicesCreateOrUpdateParameters,
  ServicesUpdateParameters,
  ServicesDeleteParameters,
  ServicesListParameters,
} from "./parameters.js";
import type {
  ClustersGet200Response,
  ClustersGetDefaultResponse,
  ClustersCreateOrUpdate200Response,
  ClustersCreateOrUpdate202Response,
  ClustersCreateOrUpdateDefaultResponse,
  ClustersUpdate200Response,
  ClustersUpdate202Response,
  ClustersUpdateDefaultResponse,
  ClustersDelete200Response,
  ClustersDelete204Response,
  ClustersDeleteDefaultResponse,
  ClustersListByResourceGroup200Response,
  ClustersListByResourceGroupDefaultResponse,
  ClustersList200Response,
  ClustersListDefaultResponse,
  ClustersListUpgradableVersions200Response,
  ClustersListUpgradableVersionsDefaultResponse,
  ClusterVersionsGet200Response,
  ClusterVersionsGetDefaultResponse,
  ClusterVersionsGetByEnvironment200Response,
  ClusterVersionsGetByEnvironmentDefaultResponse,
  ClusterVersionsList200Response,
  ClusterVersionsListDefaultResponse,
  ClusterVersionsListByEnvironment200Response,
  ClusterVersionsListByEnvironmentDefaultResponse,
  OperationsList200Response,
  OperationsListDefaultResponse,
  ApplicationTypesGet200Response,
  ApplicationTypesGetDefaultResponse,
  ApplicationTypesCreateOrUpdate200Response,
  ApplicationTypesCreateOrUpdateDefaultResponse,
  ApplicationTypesDelete202Response,
  ApplicationTypesDelete204Response,
  ApplicationTypesDeleteDefaultResponse,
  ApplicationTypesList200Response,
  ApplicationTypesListDefaultResponse,
  ApplicationTypeVersionsGet200Response,
  ApplicationTypeVersionsGetDefaultResponse,
  ApplicationTypeVersionsCreateOrUpdate202Response,
  ApplicationTypeVersionsCreateOrUpdateDefaultResponse,
  ApplicationTypeVersionsDelete202Response,
  ApplicationTypeVersionsDelete204Response,
  ApplicationTypeVersionsDeleteDefaultResponse,
  ApplicationTypeVersionsList200Response,
  ApplicationTypeVersionsListDefaultResponse,
  ApplicationsGet200Response,
  ApplicationsGetDefaultResponse,
  ApplicationsCreateOrUpdate202Response,
  ApplicationsCreateOrUpdateDefaultResponse,
  ApplicationsUpdate202Response,
  ApplicationsUpdateDefaultResponse,
  ApplicationsDelete202Response,
  ApplicationsDelete204Response,
  ApplicationsDeleteDefaultResponse,
  ApplicationsList200Response,
  ApplicationsListDefaultResponse,
  ServicesGet200Response,
  ServicesGetDefaultResponse,
  ServicesCreateOrUpdate202Response,
  ServicesCreateOrUpdateDefaultResponse,
  ServicesUpdate202Response,
  ServicesUpdateDefaultResponse,
  ServicesDelete202Response,
  ServicesDelete204Response,
  ServicesDeleteDefaultResponse,
  ServicesList200Response,
  ServicesListDefaultResponse,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface ClustersGet {
  /** Get a Service Fabric cluster resource created or in the process of being created in the specified resource group. */
  get(
    options?: ClustersGetParameters,
  ): StreamableMethod<ClustersGet200Response | ClustersGetDefaultResponse>;
  /** Create or update a Service Fabric cluster resource with the specified name. */
  put(
    options: ClustersCreateOrUpdateParameters,
  ): StreamableMethod<
    | ClustersCreateOrUpdate200Response
    | ClustersCreateOrUpdate202Response
    | ClustersCreateOrUpdateDefaultResponse
  >;
  /** Update the configuration of a Service Fabric cluster resource with the specified name. */
  patch(
    options: ClustersUpdateParameters,
  ): StreamableMethod<
    ClustersUpdate200Response | ClustersUpdate202Response | ClustersUpdateDefaultResponse
  >;
  /** Delete a Service Fabric cluster resource with the specified name. */
  delete(
    options?: ClustersDeleteParameters,
  ): StreamableMethod<
    ClustersDelete200Response | ClustersDelete204Response | ClustersDeleteDefaultResponse
  >;
}

export interface ClustersListByResourceGroup {
  /** Gets all Service Fabric cluster resources created or in the process of being created in the resource group. */
  get(
    options?: ClustersListByResourceGroupParameters,
  ): StreamableMethod<
    ClustersListByResourceGroup200Response | ClustersListByResourceGroupDefaultResponse
  >;
}

export interface ClustersList {
  /** Gets all Service Fabric cluster resources created or in the process of being created in the subscription. */
  get(
    options?: ClustersListParameters,
  ): StreamableMethod<ClustersList200Response | ClustersListDefaultResponse>;
}

export interface ClustersListUpgradableVersions {
  /** If a target is not provided, it will get the minimum and maximum versions available from the current cluster version. If a target is given, it will provide the required path to get from the current cluster version to the target version. */
  post(
    options?: ClustersListUpgradableVersionsParameters,
  ): StreamableMethod<
    ClustersListUpgradableVersions200Response | ClustersListUpgradableVersionsDefaultResponse
  >;
}

export interface ClusterVersionsGet {
  /** Gets information about an available Service Fabric cluster code version. */
  get(
    options?: ClusterVersionsGetParameters,
  ): StreamableMethod<ClusterVersionsGet200Response | ClusterVersionsGetDefaultResponse>;
}

export interface ClusterVersionsGetByEnvironment {
  /** Gets information about an available Service Fabric cluster code version by environment. */
  get(
    options?: ClusterVersionsGetByEnvironmentParameters,
  ): StreamableMethod<
    ClusterVersionsGetByEnvironment200Response | ClusterVersionsGetByEnvironmentDefaultResponse
  >;
}

export interface ClusterVersionsList {
  /** Gets all available code versions for Service Fabric cluster resources by location. */
  get(
    options?: ClusterVersionsListParameters,
  ): StreamableMethod<ClusterVersionsList200Response | ClusterVersionsListDefaultResponse>;
}

export interface ClusterVersionsListByEnvironment {
  /** Gets all available code versions for Service Fabric cluster resources by environment. */
  get(
    options?: ClusterVersionsListByEnvironmentParameters,
  ): StreamableMethod<
    ClusterVersionsListByEnvironment200Response | ClusterVersionsListByEnvironmentDefaultResponse
  >;
}

export interface OperationsList {
  /** Get the list of available Service Fabric resource provider API operations. */
  get(
    options?: OperationsListParameters,
  ): StreamableMethod<OperationsList200Response | OperationsListDefaultResponse>;
}

export interface ApplicationTypesGet {
  /** Get a Service Fabric application type name resource created or in the process of being created in the Service Fabric cluster resource. */
  get(
    options?: ApplicationTypesGetParameters,
  ): StreamableMethod<ApplicationTypesGet200Response | ApplicationTypesGetDefaultResponse>;
  /** Create or update a Service Fabric application type name resource with the specified name. */
  put(
    options: ApplicationTypesCreateOrUpdateParameters,
  ): StreamableMethod<
    ApplicationTypesCreateOrUpdate200Response | ApplicationTypesCreateOrUpdateDefaultResponse
  >;
  /** Delete a Service Fabric application type name resource with the specified name. */
  delete(
    options?: ApplicationTypesDeleteParameters,
  ): StreamableMethod<
    | ApplicationTypesDelete202Response
    | ApplicationTypesDelete204Response
    | ApplicationTypesDeleteDefaultResponse
  >;
}

export interface ApplicationTypesList {
  /** Gets all application type name resources created or in the process of being created in the Service Fabric cluster resource. */
  get(
    options?: ApplicationTypesListParameters,
  ): StreamableMethod<ApplicationTypesList200Response | ApplicationTypesListDefaultResponse>;
}

export interface ApplicationTypeVersionsGet {
  /** Get a Service Fabric application type version resource created or in the process of being created in the Service Fabric application type name resource. */
  get(
    options?: ApplicationTypeVersionsGetParameters,
  ): StreamableMethod<
    ApplicationTypeVersionsGet200Response | ApplicationTypeVersionsGetDefaultResponse
  >;
  /** Create or update a Service Fabric application type version resource with the specified name. */
  put(
    options: ApplicationTypeVersionsCreateOrUpdateParameters,
  ): StreamableMethod<
    | ApplicationTypeVersionsCreateOrUpdate202Response
    | ApplicationTypeVersionsCreateOrUpdateDefaultResponse
  >;
  /** Delete a Service Fabric application type version resource with the specified name. */
  delete(
    options?: ApplicationTypeVersionsDeleteParameters,
  ): StreamableMethod<
    | ApplicationTypeVersionsDelete202Response
    | ApplicationTypeVersionsDelete204Response
    | ApplicationTypeVersionsDeleteDefaultResponse
  >;
}

export interface ApplicationTypeVersionsList {
  /** Gets all application type version resources created or in the process of being created in the Service Fabric application type name resource. */
  get(
    options?: ApplicationTypeVersionsListParameters,
  ): StreamableMethod<
    ApplicationTypeVersionsList200Response | ApplicationTypeVersionsListDefaultResponse
  >;
}

export interface ApplicationsGet {
  /** Get a Service Fabric application resource created or in the process of being created in the Service Fabric cluster resource. */
  get(
    options?: ApplicationsGetParameters,
  ): StreamableMethod<ApplicationsGet200Response | ApplicationsGetDefaultResponse>;
  /** Create or update a Service Fabric application resource with the specified name. */
  put(
    options: ApplicationsCreateOrUpdateParameters,
  ): StreamableMethod<
    ApplicationsCreateOrUpdate202Response | ApplicationsCreateOrUpdateDefaultResponse
  >;
  /** Update a Service Fabric application resource with the specified name. */
  patch(
    options: ApplicationsUpdateParameters,
  ): StreamableMethod<ApplicationsUpdate202Response | ApplicationsUpdateDefaultResponse>;
  /** Delete a Service Fabric application resource with the specified name. */
  delete(
    options?: ApplicationsDeleteParameters,
  ): StreamableMethod<
    | ApplicationsDelete202Response
    | ApplicationsDelete204Response
    | ApplicationsDeleteDefaultResponse
  >;
}

export interface ApplicationsList {
  /** Gets all application resources created or in the process of being created in the Service Fabric cluster resource. */
  get(
    options?: ApplicationsListParameters,
  ): StreamableMethod<ApplicationsList200Response | ApplicationsListDefaultResponse>;
}

export interface ServicesGet {
  /** Get a Service Fabric service resource created or in the process of being created in the Service Fabric application resource. */
  get(
    options?: ServicesGetParameters,
  ): StreamableMethod<ServicesGet200Response | ServicesGetDefaultResponse>;
  /** Create or update a Service Fabric service resource with the specified name. */
  put(
    options: ServicesCreateOrUpdateParameters,
  ): StreamableMethod<ServicesCreateOrUpdate202Response | ServicesCreateOrUpdateDefaultResponse>;
  /** Update a Service Fabric service resource with the specified name. */
  patch(
    options: ServicesUpdateParameters,
  ): StreamableMethod<ServicesUpdate202Response | ServicesUpdateDefaultResponse>;
  /** Delete a Service Fabric service resource with the specified name. */
  delete(
    options?: ServicesDeleteParameters,
  ): StreamableMethod<
    ServicesDelete202Response | ServicesDelete204Response | ServicesDeleteDefaultResponse
  >;
}

export interface ServicesList {
  /** Gets all service resources created or in the process of being created in the Service Fabric application resource. */
  get(
    options?: ServicesListParameters,
  ): StreamableMethod<ServicesList200Response | ServicesListDefaultResponse>;
}

export interface Routes {
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ServiceFabric/clusters/\{clusterName\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}",
    subscriptionId: string,
    resourceGroupName: string,
    clusterName: string,
  ): ClustersGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourcegroups/\{resourceGroupName\}/providers/Microsoft.ServiceFabric/clusters' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters",
    subscriptionId: string,
    resourceGroupName: string,
  ): ClustersListByResourceGroup;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.ServiceFabric/clusters' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/clusters",
    subscriptionId: string,
  ): ClustersList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ServiceFabric/clusters/\{clusterName\}/listUpgradableVersions' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/listUpgradableVersions",
    subscriptionId: string,
    resourceGroupName: string,
    clusterName: string,
  ): ClustersListUpgradableVersions;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.ServiceFabric/locations/\{location\}/clusterVersions/\{clusterVersion\}' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/clusterVersions/{clusterVersion}",
    subscriptionId: string,
    location: string,
    clusterVersion: string,
  ): ClusterVersionsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.ServiceFabric/locations/\{location\}/environments/\{environment\}/clusterVersions/\{clusterVersion\}' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/environments/{environment}/clusterVersions/{clusterVersion}",
    subscriptionId: string,
    location: string,
    environment: "Windows" | "Linux",
    clusterVersion: string,
  ): ClusterVersionsGetByEnvironment;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.ServiceFabric/locations/\{location\}/clusterVersions' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/clusterVersions",
    subscriptionId: string,
    location: string,
  ): ClusterVersionsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.ServiceFabric/locations/\{location\}/environments/\{environment\}/clusterVersions' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/environments/{environment}/clusterVersions",
    subscriptionId: string,
    location: string,
    environment: "Windows" | "Linux",
  ): ClusterVersionsListByEnvironment;
  /** Resource for '/providers/Microsoft.ServiceFabric/operations' has methods for the following verbs: get */
  (path: "/providers/Microsoft.ServiceFabric/operations"): OperationsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ServiceFabric/clusters/\{clusterName\}/applicationTypes/\{applicationTypeName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}",
    subscriptionId: string,
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
  ): ApplicationTypesGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ServiceFabric/clusters/\{clusterName\}/applicationTypes' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes",
    subscriptionId: string,
    resourceGroupName: string,
    clusterName: string,
  ): ApplicationTypesList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ServiceFabric/clusters/\{clusterName\}/applicationTypes/\{applicationTypeName\}/versions/\{version\}' has methods for the following verbs: get, put, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}/versions/{version}",
    subscriptionId: string,
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    version: string,
  ): ApplicationTypeVersionsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ServiceFabric/clusters/\{clusterName\}/applicationTypes/\{applicationTypeName\}/versions' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}/versions",
    subscriptionId: string,
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
  ): ApplicationTypeVersionsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ServiceFabric/clusters/\{clusterName\}/applications/\{applicationName\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications/{applicationName}",
    subscriptionId: string,
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
  ): ApplicationsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ServiceFabric/clusters/\{clusterName\}/applications' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications",
    subscriptionId: string,
    resourceGroupName: string,
    clusterName: string,
  ): ApplicationsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ServiceFabric/clusters/\{clusterName\}/applications/\{applicationName\}/services/\{serviceName\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications/{applicationName}/services/{serviceName}",
    subscriptionId: string,
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
    serviceName: string,
  ): ServicesGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ServiceFabric/clusters/\{clusterName\}/applications/\{applicationName\}/services' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications/{applicationName}/services",
    subscriptionId: string,
    resourceGroupName: string,
    clusterName: string,
    applicationName: string,
  ): ServicesList;
}

export type ServiceFabricClient = Client & {
  path: Routes;
};
