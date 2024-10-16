// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ApplicationTypeVersionsCreateOrUpdateParameters,
  ApplicationTypeVersionsDeleteParameters,
  ApplicationTypeVersionsGetParameters,
  ApplicationTypeVersionsListParameters,
  ApplicationTypesCreateOrUpdateParameters,
  ApplicationTypesDeleteParameters,
  ApplicationTypesGetParameters,
  ApplicationTypesListParameters,
  ApplicationsCreateOrUpdateParameters,
  ApplicationsDeleteParameters,
  ApplicationsGetParameters,
  ApplicationsListParameters,
  ApplicationsUpdateParameters,
  ClusterVersionsGetByEnvironmentParameters,
  ClusterVersionsGetParameters,
  ClusterVersionsListByEnvironmentParameters,
  ClusterVersionsListParameters,
  ClustersCreateOrUpdateParameters,
  ClustersDeleteParameters,
  ClustersGetParameters,
  ClustersListByResourceGroupParameters,
  ClustersListParameters,
  ClustersListUpgradableVersionsParameters,
  ClustersUpdateParameters,
  OperationsListParameters,
  ServicesCreateOrUpdateParameters,
  ServicesDeleteParameters,
  ServicesGetParameters,
  ServicesListParameters,
  ServicesUpdateParameters,
} from "./parameters";
import {
  ApplicationTypeVersionsCreateOrUpdate202Response,
  ApplicationTypeVersionsCreateOrUpdatedefaultResponse,
  ApplicationTypeVersionsDelete202Response,
  ApplicationTypeVersionsDelete204Response,
  ApplicationTypeVersionsDeletedefaultResponse,
  ApplicationTypeVersionsGet200Response,
  ApplicationTypeVersionsGetdefaultResponse,
  ApplicationTypeVersionsList200Response,
  ApplicationTypeVersionsListdefaultResponse,
  ApplicationTypesCreateOrUpdate200Response,
  ApplicationTypesCreateOrUpdatedefaultResponse,
  ApplicationTypesDelete202Response,
  ApplicationTypesDelete204Response,
  ApplicationTypesDeletedefaultResponse,
  ApplicationTypesGet200Response,
  ApplicationTypesGetdefaultResponse,
  ApplicationTypesList200Response,
  ApplicationTypesListdefaultResponse,
  ApplicationsCreateOrUpdate202Response,
  ApplicationsCreateOrUpdatedefaultResponse,
  ApplicationsDelete202Response,
  ApplicationsDelete204Response,
  ApplicationsDeletedefaultResponse,
  ApplicationsGet200Response,
  ApplicationsGetdefaultResponse,
  ApplicationsList200Response,
  ApplicationsListdefaultResponse,
  ApplicationsUpdate202Response,
  ApplicationsUpdatedefaultResponse,
  ClusterVersionsGet200Response,
  ClusterVersionsGetByEnvironment200Response,
  ClusterVersionsGetByEnvironmentdefaultResponse,
  ClusterVersionsGetdefaultResponse,
  ClusterVersionsList200Response,
  ClusterVersionsListByEnvironment200Response,
  ClusterVersionsListByEnvironmentdefaultResponse,
  ClusterVersionsListdefaultResponse,
  ClustersCreateOrUpdate200Response,
  ClustersCreateOrUpdate202Response,
  ClustersCreateOrUpdatedefaultResponse,
  ClustersDelete200Response,
  ClustersDelete204Response,
  ClustersDeletedefaultResponse,
  ClustersGet200Response,
  ClustersGetdefaultResponse,
  ClustersList200Response,
  ClustersListByResourceGroup200Response,
  ClustersListByResourceGroupdefaultResponse,
  ClustersListUpgradableVersions200Response,
  ClustersListUpgradableVersionsdefaultResponse,
  ClustersListdefaultResponse,
  ClustersUpdate200Response,
  ClustersUpdate202Response,
  ClustersUpdatedefaultResponse,
  OperationsList200Response,
  OperationsListdefaultResponse,
  ServicesCreateOrUpdate202Response,
  ServicesCreateOrUpdatedefaultResponse,
  ServicesDelete202Response,
  ServicesDelete204Response,
  ServicesDeletedefaultResponse,
  ServicesGet200Response,
  ServicesGetdefaultResponse,
  ServicesList200Response,
  ServicesListdefaultResponse,
  ServicesUpdate202Response,
  ServicesUpdatedefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface ClustersGet {
  /** Get a Service Fabric cluster resource created or in the process of being created in the specified resource group. */
  get(
    options?: ClustersGetParameters,
  ): StreamableMethod<ClustersGet200Response | ClustersGetdefaultResponse>;
  /** Create or update a Service Fabric cluster resource with the specified name. */
  put(
    options: ClustersCreateOrUpdateParameters,
  ): StreamableMethod<
    | ClustersCreateOrUpdate200Response
    | ClustersCreateOrUpdate202Response
    | ClustersCreateOrUpdatedefaultResponse
  >;
  /** Update the configuration of a Service Fabric cluster resource with the specified name. */
  patch(
    options: ClustersUpdateParameters,
  ): StreamableMethod<
    ClustersUpdate200Response | ClustersUpdate202Response | ClustersUpdatedefaultResponse
  >;
  /** Delete a Service Fabric cluster resource with the specified name. */
  delete(
    options?: ClustersDeleteParameters,
  ): StreamableMethod<
    ClustersDelete200Response | ClustersDelete204Response | ClustersDeletedefaultResponse
  >;
}

export interface ClustersListByResourceGroup {
  /** Gets all Service Fabric cluster resources created or in the process of being created in the resource group. */
  get(
    options?: ClustersListByResourceGroupParameters,
  ): StreamableMethod<
    ClustersListByResourceGroup200Response | ClustersListByResourceGroupdefaultResponse
  >;
}

export interface ClustersList {
  /** Gets all Service Fabric cluster resources created or in the process of being created in the subscription. */
  get(
    options?: ClustersListParameters,
  ): StreamableMethod<ClustersList200Response | ClustersListdefaultResponse>;
}

export interface ClustersListUpgradableVersions {
  /** If a target is not provided, it will get the minimum and maximum versions available from the current cluster version. If a target is given, it will provide the required path to get from the current cluster version to the target version. */
  post(
    options?: ClustersListUpgradableVersionsParameters,
  ): StreamableMethod<
    ClustersListUpgradableVersions200Response | ClustersListUpgradableVersionsdefaultResponse
  >;
}

export interface ClusterVersionsGet {
  /** Gets information about an available Service Fabric cluster code version. */
  get(
    options?: ClusterVersionsGetParameters,
  ): StreamableMethod<ClusterVersionsGet200Response | ClusterVersionsGetdefaultResponse>;
}

export interface ClusterVersionsGetByEnvironment {
  /** Gets information about an available Service Fabric cluster code version by environment. */
  get(
    options?: ClusterVersionsGetByEnvironmentParameters,
  ): StreamableMethod<
    ClusterVersionsGetByEnvironment200Response | ClusterVersionsGetByEnvironmentdefaultResponse
  >;
}

export interface ClusterVersionsList {
  /** Gets all available code versions for Service Fabric cluster resources by location. */
  get(
    options?: ClusterVersionsListParameters,
  ): StreamableMethod<ClusterVersionsList200Response | ClusterVersionsListdefaultResponse>;
}

export interface ClusterVersionsListByEnvironment {
  /** Gets all available code versions for Service Fabric cluster resources by environment. */
  get(
    options?: ClusterVersionsListByEnvironmentParameters,
  ): StreamableMethod<
    ClusterVersionsListByEnvironment200Response | ClusterVersionsListByEnvironmentdefaultResponse
  >;
}

export interface OperationsList {
  /** Get the list of available Service Fabric resource provider API operations. */
  get(
    options?: OperationsListParameters,
  ): StreamableMethod<OperationsList200Response | OperationsListdefaultResponse>;
}

export interface ApplicationTypesGet {
  /** Get a Service Fabric application type name resource created or in the process of being created in the Service Fabric cluster resource. */
  get(
    options?: ApplicationTypesGetParameters,
  ): StreamableMethod<ApplicationTypesGet200Response | ApplicationTypesGetdefaultResponse>;
  /** Create or update a Service Fabric application type name resource with the specified name. */
  put(
    options: ApplicationTypesCreateOrUpdateParameters,
  ): StreamableMethod<
    ApplicationTypesCreateOrUpdate200Response | ApplicationTypesCreateOrUpdatedefaultResponse
  >;
  /** Delete a Service Fabric application type name resource with the specified name. */
  delete(
    options?: ApplicationTypesDeleteParameters,
  ): StreamableMethod<
    | ApplicationTypesDelete202Response
    | ApplicationTypesDelete204Response
    | ApplicationTypesDeletedefaultResponse
  >;
}

export interface ApplicationTypesList {
  /** Gets all application type name resources created or in the process of being created in the Service Fabric cluster resource. */
  get(
    options?: ApplicationTypesListParameters,
  ): StreamableMethod<ApplicationTypesList200Response | ApplicationTypesListdefaultResponse>;
}

export interface ApplicationTypeVersionsGet {
  /** Get a Service Fabric application type version resource created or in the process of being created in the Service Fabric application type name resource. */
  get(
    options?: ApplicationTypeVersionsGetParameters,
  ): StreamableMethod<
    ApplicationTypeVersionsGet200Response | ApplicationTypeVersionsGetdefaultResponse
  >;
  /** Create or update a Service Fabric application type version resource with the specified name. */
  put(
    options: ApplicationTypeVersionsCreateOrUpdateParameters,
  ): StreamableMethod<
    | ApplicationTypeVersionsCreateOrUpdate202Response
    | ApplicationTypeVersionsCreateOrUpdatedefaultResponse
  >;
  /** Delete a Service Fabric application type version resource with the specified name. */
  delete(
    options?: ApplicationTypeVersionsDeleteParameters,
  ): StreamableMethod<
    | ApplicationTypeVersionsDelete202Response
    | ApplicationTypeVersionsDelete204Response
    | ApplicationTypeVersionsDeletedefaultResponse
  >;
}

export interface ApplicationTypeVersionsList {
  /** Gets all application type version resources created or in the process of being created in the Service Fabric application type name resource. */
  get(
    options?: ApplicationTypeVersionsListParameters,
  ): StreamableMethod<
    ApplicationTypeVersionsList200Response | ApplicationTypeVersionsListdefaultResponse
  >;
}

export interface ApplicationsGet {
  /** Get a Service Fabric application resource created or in the process of being created in the Service Fabric cluster resource. */
  get(
    options?: ApplicationsGetParameters,
  ): StreamableMethod<ApplicationsGet200Response | ApplicationsGetdefaultResponse>;
  /** Create or update a Service Fabric application resource with the specified name. */
  put(
    options: ApplicationsCreateOrUpdateParameters,
  ): StreamableMethod<
    ApplicationsCreateOrUpdate202Response | ApplicationsCreateOrUpdatedefaultResponse
  >;
  /** Update a Service Fabric application resource with the specified name. */
  patch(
    options: ApplicationsUpdateParameters,
  ): StreamableMethod<ApplicationsUpdate202Response | ApplicationsUpdatedefaultResponse>;
  /** Delete a Service Fabric application resource with the specified name. */
  delete(
    options?: ApplicationsDeleteParameters,
  ): StreamableMethod<
    | ApplicationsDelete202Response
    | ApplicationsDelete204Response
    | ApplicationsDeletedefaultResponse
  >;
}

export interface ApplicationsList {
  /** Gets all application resources created or in the process of being created in the Service Fabric cluster resource. */
  get(
    options?: ApplicationsListParameters,
  ): StreamableMethod<ApplicationsList200Response | ApplicationsListdefaultResponse>;
}

export interface ServicesGet {
  /** Get a Service Fabric service resource created or in the process of being created in the Service Fabric application resource. */
  get(
    options?: ServicesGetParameters,
  ): StreamableMethod<ServicesGet200Response | ServicesGetdefaultResponse>;
  /** Create or update a Service Fabric service resource with the specified name. */
  put(
    options: ServicesCreateOrUpdateParameters,
  ): StreamableMethod<ServicesCreateOrUpdate202Response | ServicesCreateOrUpdatedefaultResponse>;
  /** Update a Service Fabric service resource with the specified name. */
  patch(
    options: ServicesUpdateParameters,
  ): StreamableMethod<ServicesUpdate202Response | ServicesUpdatedefaultResponse>;
  /** Delete a Service Fabric service resource with the specified name. */
  delete(
    options?: ServicesDeleteParameters,
  ): StreamableMethod<
    ServicesDelete202Response | ServicesDelete204Response | ServicesDeletedefaultResponse
  >;
}

export interface ServicesList {
  /** Gets all service resources created or in the process of being created in the Service Fabric application resource. */
  get(
    options?: ServicesListParameters,
  ): StreamableMethod<ServicesList200Response | ServicesListdefaultResponse>;
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
