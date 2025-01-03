// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpResponse } from "@azure-rest/core-client";
import type {
  ClusterOutput,
  ErrorModelOutput,
  ClusterListResultOutput,
  UpgradableVersionPathResultOutput,
  ClusterCodeVersionsListResultOutput,
  OperationListResultOutput,
  ApplicationTypeResourceOutput,
  ApplicationTypeResourceListOutput,
  ApplicationTypeVersionResourceOutput,
  ApplicationTypeVersionResourceListOutput,
  ApplicationResourceOutput,
  ApplicationResourceListOutput,
  ServiceResourceOutput,
  ServiceResourceListOutput,
} from "./outputModels.js";

/** Get a Service Fabric cluster resource created or in the process of being created in the specified resource group. */
export interface ClustersGet200Response extends HttpResponse {
  status: "200";
  body: ClusterOutput;
}

/** Get a Service Fabric cluster resource created or in the process of being created in the specified resource group. */
export interface ClustersGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Create or update a Service Fabric cluster resource with the specified name. */
export interface ClustersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ClusterOutput;
}

/** Create or update a Service Fabric cluster resource with the specified name. */
export interface ClustersCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: ClusterOutput;
}

/** Create or update a Service Fabric cluster resource with the specified name. */
export interface ClustersCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Update the configuration of a Service Fabric cluster resource with the specified name. */
export interface ClustersUpdate200Response extends HttpResponse {
  status: "200";
  body: ClusterOutput;
}

/** Update the configuration of a Service Fabric cluster resource with the specified name. */
export interface ClustersUpdate202Response extends HttpResponse {
  status: "202";
  body: ClusterOutput;
}

/** Update the configuration of a Service Fabric cluster resource with the specified name. */
export interface ClustersUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Delete a Service Fabric cluster resource with the specified name. */
export interface ClustersDelete200Response extends HttpResponse {
  status: "200";
}

/** Delete a Service Fabric cluster resource with the specified name. */
export interface ClustersDelete204Response extends HttpResponse {
  status: "204";
}

/** Delete a Service Fabric cluster resource with the specified name. */
export interface ClustersDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all Service Fabric cluster resources created or in the process of being created in the resource group. */
export interface ClustersListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: ClusterListResultOutput;
}

/** Gets all Service Fabric cluster resources created or in the process of being created in the resource group. */
export interface ClustersListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all Service Fabric cluster resources created or in the process of being created in the subscription. */
export interface ClustersList200Response extends HttpResponse {
  status: "200";
  body: ClusterListResultOutput;
}

/** Gets all Service Fabric cluster resources created or in the process of being created in the subscription. */
export interface ClustersListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** If a target is not provided, it will get the minimum and maximum versions available from the current cluster version. If a target is given, it will provide the required path to get from the current cluster version to the target version. */
export interface ClustersListUpgradableVersions200Response extends HttpResponse {
  status: "200";
  body: UpgradableVersionPathResultOutput;
}

/** If a target is not provided, it will get the minimum and maximum versions available from the current cluster version. If a target is given, it will provide the required path to get from the current cluster version to the target version. */
export interface ClustersListUpgradableVersionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets information about an available Service Fabric cluster code version. */
export interface ClusterVersionsGet200Response extends HttpResponse {
  status: "200";
  body: ClusterCodeVersionsListResultOutput;
}

/** Gets information about an available Service Fabric cluster code version. */
export interface ClusterVersionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets information about an available Service Fabric cluster code version by environment. */
export interface ClusterVersionsGetByEnvironment200Response extends HttpResponse {
  status: "200";
  body: ClusterCodeVersionsListResultOutput;
}

/** Gets information about an available Service Fabric cluster code version by environment. */
export interface ClusterVersionsGetByEnvironmentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all available code versions for Service Fabric cluster resources by location. */
export interface ClusterVersionsList200Response extends HttpResponse {
  status: "200";
  body: ClusterCodeVersionsListResultOutput;
}

/** Gets all available code versions for Service Fabric cluster resources by location. */
export interface ClusterVersionsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all available code versions for Service Fabric cluster resources by environment. */
export interface ClusterVersionsListByEnvironment200Response extends HttpResponse {
  status: "200";
  body: ClusterCodeVersionsListResultOutput;
}

/** Gets all available code versions for Service Fabric cluster resources by environment. */
export interface ClusterVersionsListByEnvironmentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Get the list of available Service Fabric resource provider API operations. */
export interface OperationsList200Response extends HttpResponse {
  status: "200";
  body: OperationListResultOutput;
}

/** Get the list of available Service Fabric resource provider API operations. */
export interface OperationsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Get a Service Fabric application type name resource created or in the process of being created in the Service Fabric cluster resource. */
export interface ApplicationTypesGet200Response extends HttpResponse {
  status: "200";
  body: ApplicationTypeResourceOutput;
}

/** Get a Service Fabric application type name resource created or in the process of being created in the Service Fabric cluster resource. */
export interface ApplicationTypesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Create or update a Service Fabric application type name resource with the specified name. */
export interface ApplicationTypesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ApplicationTypeResourceOutput;
}

/** Create or update a Service Fabric application type name resource with the specified name. */
export interface ApplicationTypesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Delete a Service Fabric application type name resource with the specified name. */
export interface ApplicationTypesDelete202Response extends HttpResponse {
  status: "202";
}

/** Delete a Service Fabric application type name resource with the specified name. */
export interface ApplicationTypesDelete204Response extends HttpResponse {
  status: "204";
}

/** Delete a Service Fabric application type name resource with the specified name. */
export interface ApplicationTypesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all application type name resources created or in the process of being created in the Service Fabric cluster resource. */
export interface ApplicationTypesList200Response extends HttpResponse {
  status: "200";
  body: ApplicationTypeResourceListOutput;
}

/** Gets all application type name resources created or in the process of being created in the Service Fabric cluster resource. */
export interface ApplicationTypesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Get a Service Fabric application type version resource created or in the process of being created in the Service Fabric application type name resource. */
export interface ApplicationTypeVersionsGet200Response extends HttpResponse {
  status: "200";
  body: ApplicationTypeVersionResourceOutput;
}

/** Get a Service Fabric application type version resource created or in the process of being created in the Service Fabric application type name resource. */
export interface ApplicationTypeVersionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Create or update a Service Fabric application type version resource with the specified name. */
export interface ApplicationTypeVersionsCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: ApplicationTypeVersionResourceOutput;
}

/** Create or update a Service Fabric application type version resource with the specified name. */
export interface ApplicationTypeVersionsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Delete a Service Fabric application type version resource with the specified name. */
export interface ApplicationTypeVersionsDelete202Response extends HttpResponse {
  status: "202";
}

/** Delete a Service Fabric application type version resource with the specified name. */
export interface ApplicationTypeVersionsDelete204Response extends HttpResponse {
  status: "204";
}

/** Delete a Service Fabric application type version resource with the specified name. */
export interface ApplicationTypeVersionsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all application type version resources created or in the process of being created in the Service Fabric application type name resource. */
export interface ApplicationTypeVersionsList200Response extends HttpResponse {
  status: "200";
  body: ApplicationTypeVersionResourceListOutput;
}

/** Gets all application type version resources created or in the process of being created in the Service Fabric application type name resource. */
export interface ApplicationTypeVersionsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Get a Service Fabric application resource created or in the process of being created in the Service Fabric cluster resource. */
export interface ApplicationsGet200Response extends HttpResponse {
  status: "200";
  body: ApplicationResourceOutput;
}

/** Get a Service Fabric application resource created or in the process of being created in the Service Fabric cluster resource. */
export interface ApplicationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Create or update a Service Fabric application resource with the specified name. */
export interface ApplicationsCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: ApplicationResourceOutput;
}

/** Create or update a Service Fabric application resource with the specified name. */
export interface ApplicationsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Update a Service Fabric application resource with the specified name. */
export interface ApplicationsUpdate202Response extends HttpResponse {
  status: "202";
  body: ApplicationResourceOutput;
}

/** Update a Service Fabric application resource with the specified name. */
export interface ApplicationsUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Delete a Service Fabric application resource with the specified name. */
export interface ApplicationsDelete202Response extends HttpResponse {
  status: "202";
}

/** Delete a Service Fabric application resource with the specified name. */
export interface ApplicationsDelete204Response extends HttpResponse {
  status: "204";
}

/** Delete a Service Fabric application resource with the specified name. */
export interface ApplicationsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all application resources created or in the process of being created in the Service Fabric cluster resource. */
export interface ApplicationsList200Response extends HttpResponse {
  status: "200";
  body: ApplicationResourceListOutput;
}

/** Gets all application resources created or in the process of being created in the Service Fabric cluster resource. */
export interface ApplicationsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Get a Service Fabric service resource created or in the process of being created in the Service Fabric application resource. */
export interface ServicesGet200Response extends HttpResponse {
  status: "200";
  body: ServiceResourceOutput;
}

/** Get a Service Fabric service resource created or in the process of being created in the Service Fabric application resource. */
export interface ServicesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Create or update a Service Fabric service resource with the specified name. */
export interface ServicesCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: ServiceResourceOutput;
}

/** Create or update a Service Fabric service resource with the specified name. */
export interface ServicesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Update a Service Fabric service resource with the specified name. */
export interface ServicesUpdate202Response extends HttpResponse {
  status: "202";
  body: ServiceResourceOutput;
}

/** Update a Service Fabric service resource with the specified name. */
export interface ServicesUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Delete a Service Fabric service resource with the specified name. */
export interface ServicesDelete202Response extends HttpResponse {
  status: "202";
}

/** Delete a Service Fabric service resource with the specified name. */
export interface ServicesDelete204Response extends HttpResponse {
  status: "204";
}

/** Delete a Service Fabric service resource with the specified name. */
export interface ServicesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all service resources created or in the process of being created in the Service Fabric application resource. */
export interface ServicesList200Response extends HttpResponse {
  status: "200";
  body: ServiceResourceListOutput;
}

/** Gets all service resources created or in the process of being created in the Service Fabric application resource. */
export interface ServicesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}
