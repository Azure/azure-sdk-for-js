// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpResponse } from "@azure-rest/core-client";
import {
  ApplicationResourceListOutput,
  ApplicationResourceOutput,
  ApplicationTypeResourceListOutput,
  ApplicationTypeResourceOutput,
  ApplicationTypeVersionResourceListOutput,
  ApplicationTypeVersionResourceOutput,
  ClusterCodeVersionsListResultOutput,
  ClusterListResultOutput,
  ClusterOutput,
  ErrorModelOutput,
  OperationListResultOutput,
  ServiceResourceListOutput,
  ServiceResourceOutput,
  UpgradableVersionPathResultOutput,
} from "./outputModels";

/** Get a Service Fabric cluster resource created or in the process of being created in the specified resource group. */
export interface ClustersGet200Response extends HttpResponse {
  status: "200";
  body: ClusterOutput;
}

/** Get a Service Fabric cluster resource created or in the process of being created in the specified resource group. */
export interface ClustersGetdefaultResponse extends HttpResponse {
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
export interface ClustersCreateOrUpdatedefaultResponse extends HttpResponse {
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
export interface ClustersUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Delete a Service Fabric cluster resource with the specified name. */
export interface ClustersDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a Service Fabric cluster resource with the specified name. */
export interface ClustersDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a Service Fabric cluster resource with the specified name. */
export interface ClustersDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all Service Fabric cluster resources created or in the process of being created in the resource group. */
export interface ClustersListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: ClusterListResultOutput;
}

/** Gets all Service Fabric cluster resources created or in the process of being created in the resource group. */
export interface ClustersListByResourceGroupdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all Service Fabric cluster resources created or in the process of being created in the subscription. */
export interface ClustersList200Response extends HttpResponse {
  status: "200";
  body: ClusterListResultOutput;
}

/** Gets all Service Fabric cluster resources created or in the process of being created in the subscription. */
export interface ClustersListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** If a target is not provided, it will get the minimum and maximum versions available from the current cluster version. If a target is given, it will provide the required path to get from the current cluster version to the target version. */
export interface ClustersListUpgradableVersions200Response extends HttpResponse {
  status: "200";
  body: UpgradableVersionPathResultOutput;
}

/** If a target is not provided, it will get the minimum and maximum versions available from the current cluster version. If a target is given, it will provide the required path to get from the current cluster version to the target version. */
export interface ClustersListUpgradableVersionsdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets information about an available Service Fabric cluster code version. */
export interface ClusterVersionsGet200Response extends HttpResponse {
  status: "200";
  body: ClusterCodeVersionsListResultOutput;
}

/** Gets information about an available Service Fabric cluster code version. */
export interface ClusterVersionsGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets information about an available Service Fabric cluster code version by environment. */
export interface ClusterVersionsGetByEnvironment200Response extends HttpResponse {
  status: "200";
  body: ClusterCodeVersionsListResultOutput;
}

/** Gets information about an available Service Fabric cluster code version by environment. */
export interface ClusterVersionsGetByEnvironmentdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all available code versions for Service Fabric cluster resources by location. */
export interface ClusterVersionsList200Response extends HttpResponse {
  status: "200";
  body: ClusterCodeVersionsListResultOutput;
}

/** Gets all available code versions for Service Fabric cluster resources by location. */
export interface ClusterVersionsListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all available code versions for Service Fabric cluster resources by environment. */
export interface ClusterVersionsListByEnvironment200Response extends HttpResponse {
  status: "200";
  body: ClusterCodeVersionsListResultOutput;
}

/** Gets all available code versions for Service Fabric cluster resources by environment. */
export interface ClusterVersionsListByEnvironmentdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Get the list of available Service Fabric resource provider API operations. */
export interface OperationsList200Response extends HttpResponse {
  status: "200";
  body: OperationListResultOutput;
}

/** Get the list of available Service Fabric resource provider API operations. */
export interface OperationsListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Get a Service Fabric application type name resource created or in the process of being created in the Service Fabric cluster resource. */
export interface ApplicationTypesGet200Response extends HttpResponse {
  status: "200";
  body: ApplicationTypeResourceOutput;
}

/** Get a Service Fabric application type name resource created or in the process of being created in the Service Fabric cluster resource. */
export interface ApplicationTypesGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Create or update a Service Fabric application type name resource with the specified name. */
export interface ApplicationTypesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ApplicationTypeResourceOutput;
}

/** Create or update a Service Fabric application type name resource with the specified name. */
export interface ApplicationTypesCreateOrUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Delete a Service Fabric application type name resource with the specified name. */
export interface ApplicationTypesDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Delete a Service Fabric application type name resource with the specified name. */
export interface ApplicationTypesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a Service Fabric application type name resource with the specified name. */
export interface ApplicationTypesDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all application type name resources created or in the process of being created in the Service Fabric cluster resource. */
export interface ApplicationTypesList200Response extends HttpResponse {
  status: "200";
  body: ApplicationTypeResourceListOutput;
}

/** Gets all application type name resources created or in the process of being created in the Service Fabric cluster resource. */
export interface ApplicationTypesListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Get a Service Fabric application type version resource created or in the process of being created in the Service Fabric application type name resource. */
export interface ApplicationTypeVersionsGet200Response extends HttpResponse {
  status: "200";
  body: ApplicationTypeVersionResourceOutput;
}

/** Get a Service Fabric application type version resource created or in the process of being created in the Service Fabric application type name resource. */
export interface ApplicationTypeVersionsGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Create or update a Service Fabric application type version resource with the specified name. */
export interface ApplicationTypeVersionsCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: ApplicationTypeVersionResourceOutput;
}

/** Create or update a Service Fabric application type version resource with the specified name. */
export interface ApplicationTypeVersionsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Delete a Service Fabric application type version resource with the specified name. */
export interface ApplicationTypeVersionsDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Delete a Service Fabric application type version resource with the specified name. */
export interface ApplicationTypeVersionsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a Service Fabric application type version resource with the specified name. */
export interface ApplicationTypeVersionsDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all application type version resources created or in the process of being created in the Service Fabric application type name resource. */
export interface ApplicationTypeVersionsList200Response extends HttpResponse {
  status: "200";
  body: ApplicationTypeVersionResourceListOutput;
}

/** Gets all application type version resources created or in the process of being created in the Service Fabric application type name resource. */
export interface ApplicationTypeVersionsListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Get a Service Fabric application resource created or in the process of being created in the Service Fabric cluster resource. */
export interface ApplicationsGet200Response extends HttpResponse {
  status: "200";
  body: ApplicationResourceOutput;
}

/** Get a Service Fabric application resource created or in the process of being created in the Service Fabric cluster resource. */
export interface ApplicationsGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Create or update a Service Fabric application resource with the specified name. */
export interface ApplicationsCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: ApplicationResourceOutput;
}

/** Create or update a Service Fabric application resource with the specified name. */
export interface ApplicationsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Update a Service Fabric application resource with the specified name. */
export interface ApplicationsUpdate202Response extends HttpResponse {
  status: "202";
  body: ApplicationResourceOutput;
}

/** Update a Service Fabric application resource with the specified name. */
export interface ApplicationsUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Delete a Service Fabric application resource with the specified name. */
export interface ApplicationsDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Delete a Service Fabric application resource with the specified name. */
export interface ApplicationsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a Service Fabric application resource with the specified name. */
export interface ApplicationsDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all application resources created or in the process of being created in the Service Fabric cluster resource. */
export interface ApplicationsList200Response extends HttpResponse {
  status: "200";
  body: ApplicationResourceListOutput;
}

/** Gets all application resources created or in the process of being created in the Service Fabric cluster resource. */
export interface ApplicationsListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Get a Service Fabric service resource created or in the process of being created in the Service Fabric application resource. */
export interface ServicesGet200Response extends HttpResponse {
  status: "200";
  body: ServiceResourceOutput;
}

/** Get a Service Fabric service resource created or in the process of being created in the Service Fabric application resource. */
export interface ServicesGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Create or update a Service Fabric service resource with the specified name. */
export interface ServicesCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: ServiceResourceOutput;
}

/** Create or update a Service Fabric service resource with the specified name. */
export interface ServicesCreateOrUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Update a Service Fabric service resource with the specified name. */
export interface ServicesUpdate202Response extends HttpResponse {
  status: "202";
  body: ServiceResourceOutput;
}

/** Update a Service Fabric service resource with the specified name. */
export interface ServicesUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Delete a Service Fabric service resource with the specified name. */
export interface ServicesDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Delete a Service Fabric service resource with the specified name. */
export interface ServicesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a Service Fabric service resource with the specified name. */
export interface ServicesDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all service resources created or in the process of being created in the Service Fabric application resource. */
export interface ServicesList200Response extends HttpResponse {
  status: "200";
  body: ServiceResourceListOutput;
}

/** Gets all service resources created or in the process of being created in the Service Fabric application resource. */
export interface ServicesListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}
