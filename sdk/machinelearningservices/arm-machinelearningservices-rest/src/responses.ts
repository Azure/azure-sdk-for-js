// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import {
  OperationListResult,
  ErrorResponse,
  Workspace,
  WorkspaceListResult,
  ListWorkspaceKeysResult,
  NotebookAccessTokenResult,
  NotebookResourceInfo,
  ListStorageAccountKeysResult,
  ListNotebookKeysResult,
  ListUsagesResult,
  VirtualMachineSizeListResult,
  UpdateWorkspaceQuotasResult,
  ListWorkspaceQuotas,
  PaginatedComputeResourcesList,
  ComputeResource,
  AmlComputeNodesInformation,
  ComputeSecrets,
  PrivateEndpointConnectionListResult,
  PrivateEndpointConnection,
  PrivateLinkResourceListResult,
  PaginatedWorkspaceConnectionsList,
  WorkspaceConnection,
  BatchEndpointTrackedResourceArmPaginatedResult,
  BatchEndpointTrackedResource,
  EndpointAuthKeys,
  BatchDeploymentTrackedResourceArmPaginatedResult,
  BatchDeploymentTrackedResource,
  CodeContainerResourceArmPaginatedResult,
  CodeContainerResource,
  CodeVersionResourceArmPaginatedResult,
  CodeVersionResource,
  DataContainerResourceArmPaginatedResult,
  DataContainerResource,
  DataVersionResourceArmPaginatedResult,
  DataVersionResource,
  DatastorePropertiesResourceArmPaginatedResult,
  DatastorePropertiesResource,
  DatastoreSecrets,
  EnvironmentContainerResourceArmPaginatedResult,
  EnvironmentContainerResource,
  EnvironmentSpecificationVersionResourceArmPaginatedResult,
  EnvironmentSpecificationVersionResource,
  JobBaseResourceArmPaginatedResult,
  JobBaseResource,
  LabelingJobResourceArmPaginatedResult,
  LabelingJobResource,
  ExportSummary,
  ModelContainerResourceArmPaginatedResult,
  ModelContainerResource,
  ModelVersionResourceArmPaginatedResult,
  ModelVersionResource,
  OnlineEndpointTrackedResourceArmPaginatedResult,
  OnlineEndpointTrackedResource,
  EndpointAuthToken,
  OnlineDeploymentTrackedResourceArmPaginatedResult,
  OnlineDeploymentTrackedResource,
  DeploymentLogs,
  ListAmlUserFeatureResult,
  SkuListResult
} from "./models";

/** Lists all of the available Azure Machine Learning Workspaces REST API operations. */
export interface OperationsList200Response extends HttpResponse {
  status: "200";
  body: OperationListResult;
}

/** Lists all of the available Azure Machine Learning Workspaces REST API operations. */
export interface OperationsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Gets the properties of the specified machine learning workspace. */
export interface WorkspacesGet200Response extends HttpResponse {
  status: "200";
  body: Workspace;
}

/** Gets the properties of the specified machine learning workspace. */
export interface WorkspacesGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Creates or updates a workspace with the specified parameters. */
export interface WorkspacesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: Workspace;
}

/** Creates or updates a workspace with the specified parameters. */
export interface WorkspacesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: Workspace;
}

/** Creates or updates a workspace with the specified parameters. */
export interface WorkspacesCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Creates or updates a workspace with the specified parameters. */
export interface WorkspacesCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Deletes a machine learning workspace. */
export interface WorkspacesDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes a machine learning workspace. */
export interface WorkspacesDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes a machine learning workspace. */
export interface WorkspacesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a machine learning workspace. */
export interface WorkspacesDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Updates a machine learning workspace with the specified parameters. */
export interface WorkspacesUpdate200Response extends HttpResponse {
  status: "200";
  body: Workspace;
}

/** Updates a machine learning workspace with the specified parameters. */
export interface WorkspacesUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Lists all the available machine learning workspaces under the specified resource group. */
export interface WorkspacesListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: WorkspaceListResult;
}

/** Lists all the available machine learning workspaces under the specified resource group. */
export interface WorkspacesListByResourceGroupdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Lists all the keys associated with this workspace. This includes keys for the storage account, app insights and password for container registry */
export interface WorkspacesListKeys200Response extends HttpResponse {
  status: "200";
  body: ListWorkspaceKeysResult;
}

/** Lists all the keys associated with this workspace. This includes keys for the storage account, app insights and password for container registry */
export interface WorkspacesListKeysdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Resync all the keys associated with this workspace. This includes keys for the storage account, app insights and password for container registry */
export interface WorkspacesResyncKeys200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Resync all the keys associated with this workspace. This includes keys for the storage account, app insights and password for container registry */
export interface WorkspacesResyncKeys202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Resync all the keys associated with this workspace. This includes keys for the storage account, app insights and password for container registry */
export interface WorkspacesResyncKeysdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Lists all the available machine learning workspaces under the specified subscription. */
export interface WorkspacesListBySubscription200Response extends HttpResponse {
  status: "200";
  body: WorkspaceListResult;
}

/** Lists all the available machine learning workspaces under the specified subscription. */
export interface WorkspacesListBySubscriptiondefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** return notebook access token and refresh token */
export interface WorkspacesListNotebookAccessToken200Response
  extends HttpResponse {
  status: "200";
  body: NotebookAccessTokenResult;
}

/** return notebook access token and refresh token */
export interface WorkspacesListNotebookAccessTokendefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

export interface WorkspacesPrepareNotebook200Response extends HttpResponse {
  status: "200";
  body: NotebookResourceInfo;
}

export interface WorkspacesPrepareNotebook202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

export interface WorkspacesPrepareNotebookdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

export interface WorkspacesListStorageAccountKeys200Response
  extends HttpResponse {
  status: "200";
  body: ListStorageAccountKeysResult;
}

export interface WorkspacesListStorageAccountKeysdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

export interface WorkspacesListNotebookKeys200Response extends HttpResponse {
  status: "200";
  body: ListNotebookKeysResult;
}

export interface WorkspacesListNotebookKeysdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Gets the current usage information as well as limits for AML resources for given subscription and location. */
export interface UsagesList200Response extends HttpResponse {
  status: "200";
  body: ListUsagesResult;
}

/** Returns supported VM Sizes in a location */
export interface VirtualMachineSizesList200Response extends HttpResponse {
  status: "200";
  body: VirtualMachineSizeListResult;
}

/** Update quota for each VM family in workspace. */
export interface QuotasUpdate200Response extends HttpResponse {
  status: "200";
  body: UpdateWorkspaceQuotasResult;
}

/** Update quota for each VM family in workspace. */
export interface QuotasUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Gets the currently assigned Workspace Quotas based on VMFamily. */
export interface QuotasList200Response extends HttpResponse {
  status: "200";
  body: ListWorkspaceQuotas;
}

/** Gets the currently assigned Workspace Quotas based on VMFamily. */
export interface QuotasListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Gets computes in specified workspace. */
export interface ComputeList200Response extends HttpResponse {
  status: "200";
  body: PaginatedComputeResourcesList;
}

/** Gets computes in specified workspace. */
export interface ComputeListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Gets compute definition by its name. Any secrets (storage keys, service credentials, etc) are not returned - use 'keys' nested resource to get them. */
export interface ComputeGet200Response extends HttpResponse {
  status: "200";
  body: ComputeResource;
}

/** Gets compute definition by its name. Any secrets (storage keys, service credentials, etc) are not returned - use 'keys' nested resource to get them. */
export interface ComputeGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet. */
export interface ComputeCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ComputeResource;
}

export interface ComputeCreateOrUpdate201Headers {
  /** URI to poll for asynchronous operation status. */
  "azure-asyncoperation"?: string;
}

/** Creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet. */
export interface ComputeCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ComputeResource;
  headers: RawHttpHeaders & ComputeCreateOrUpdate201Headers;
}

/** Creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet. */
export interface ComputeCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Updates properties of a compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. */
export interface ComputeUpdate200Response extends HttpResponse {
  status: "200";
  body: ComputeResource;
}

/** Updates properties of a compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. */
export interface ComputeUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Deletes specified Machine Learning compute. */
export interface ComputeDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

export interface ComputeDelete202Headers {
  /** URI to poll for asynchronous operation status. */
  "azure-asyncoperation"?: string;
  /** URI to poll for asynchronous operation result. */
  location?: string;
}

/** Deletes specified Machine Learning compute. */
export interface ComputeDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & ComputeDelete202Headers;
}

/** Deletes specified Machine Learning compute. */
export interface ComputeDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get the details (e.g IP address, port etc) of all the compute nodes in the compute. */
export interface ComputeListNodes200Response extends HttpResponse {
  status: "200";
  body: AmlComputeNodesInformation;
}

/** Get the details (e.g IP address, port etc) of all the compute nodes in the compute. */
export interface ComputeListNodesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Gets secrets related to Machine Learning compute (storage keys, service credentials, etc). */
export interface ComputeListKeys200Response extends HttpResponse {
  status: "200";
  body: ComputeSecrets;
}

/** Gets secrets related to Machine Learning compute (storage keys, service credentials, etc). */
export interface ComputeListKeysdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Posts a start action to a compute instance */
export interface ComputeStart202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Posts a start action to a compute instance */
export interface ComputeStartdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Posts a stop action to a compute instance */
export interface ComputeStop202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Posts a stop action to a compute instance */
export interface ComputeStopdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Posts a restart action to a compute instance */
export interface ComputeRestart200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Posts a restart action to a compute instance */
export interface ComputeRestartdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Updates schedules of a compute instance */
export interface ComputeUpdateSchedules200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Updates schedules of a compute instance */
export interface ComputeUpdateSchedulesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** List all the private endpoint connections associated with the workspace. */
export interface PrivateEndpointConnectionsList200Response
  extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionListResult;
}

/** List all the private endpoint connections associated with the workspace. */
export interface PrivateEndpointConnectionsListdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Gets the specified private endpoint connection associated with the workspace. */
export interface PrivateEndpointConnectionsGet200Response extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnection;
}

/** Gets the specified private endpoint connection associated with the workspace. */
export interface PrivateEndpointConnectionsGetdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Update the state of specified private endpoint connection associated with the workspace. */
export interface PrivateEndpointConnectionsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnection;
}

/** Update the state of specified private endpoint connection associated with the workspace. */
export interface PrivateEndpointConnectionsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Deletes the specified private endpoint connection associated with the workspace. */
export interface PrivateEndpointConnectionsDelete200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes the specified private endpoint connection associated with the workspace. */
export interface PrivateEndpointConnectionsDelete204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes the specified private endpoint connection associated with the workspace. */
export interface PrivateEndpointConnectionsDeletedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Gets the private link resources that need to be created for a workspace. */
export interface PrivateLinkResourcesList200Response extends HttpResponse {
  status: "200";
  body: PrivateLinkResourceListResult;
}

/** List all connections under a AML workspace. */
export interface WorkspaceConnectionsList200Response extends HttpResponse {
  status: "200";
  body: PaginatedWorkspaceConnectionsList;
}

/** List all connections under a AML workspace. */
export interface WorkspaceConnectionsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Add a new workspace connection. */
export interface WorkspaceConnectionsCreate200Response extends HttpResponse {
  status: "200";
  body: WorkspaceConnection;
}

/** Add a new workspace connection. */
export interface WorkspaceConnectionsCreatedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get the detail of a workspace connection. */
export interface WorkspaceConnectionsGet200Response extends HttpResponse {
  status: "200";
  body: WorkspaceConnection;
}

/** Get the detail of a workspace connection. */
export interface WorkspaceConnectionsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Delete a workspace connection. */
export interface WorkspaceConnectionsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a workspace connection. */
export interface WorkspaceConnectionsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a workspace connection. */
export interface WorkspaceConnectionsDeletedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Lists Batch inference endpoint in the workspace. */
export interface BatchEndpointsList200Response extends HttpResponse {
  status: "200";
  body: BatchEndpointTrackedResourceArmPaginatedResult;
}

/** Lists Batch inference endpoint in the workspace. */
export interface BatchEndpointsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Delete Batch Inference Endpoint. */
export interface BatchEndpointsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete Batch Inference Endpoint. */
export interface BatchEndpointsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete Batch Inference Endpoint. */
export interface BatchEndpointsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Gets a batch inference endpoint by name. */
export interface BatchEndpointsGet200Response extends HttpResponse {
  status: "200";
  body: BatchEndpointTrackedResource;
}

/** Gets a batch inference endpoint by name. */
export interface BatchEndpointsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Update a batch inference endpoint. */
export interface BatchEndpointsUpdate200Response extends HttpResponse {
  status: "200";
  body: BatchEndpointTrackedResource;
}

/** Update a batch inference endpoint. */
export interface BatchEndpointsUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Creates a batch inference endpoint. */
export interface BatchEndpointsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: BatchEndpointTrackedResource;
}

/** Creates a batch inference endpoint. */
export interface BatchEndpointsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: BatchEndpointTrackedResource;
}

/** Creates a batch inference endpoint. */
export interface BatchEndpointsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Lists batch Inference Endpoint keys. */
export interface BatchEndpointsListKeys200Response extends HttpResponse {
  status: "200";
  body: EndpointAuthKeys;
}

/** Lists batch Inference Endpoint keys. */
export interface BatchEndpointsListKeysdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Lists Batch inference deployments in the workspace. */
export interface BatchDeploymentsList200Response extends HttpResponse {
  status: "200";
  body: BatchDeploymentTrackedResourceArmPaginatedResult;
}

/** Lists Batch inference deployments in the workspace. */
export interface BatchDeploymentsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Delete Batch Inference deployment. */
export interface BatchDeploymentsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete Batch Inference deployment. */
export interface BatchDeploymentsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete Batch Inference deployment. */
export interface BatchDeploymentsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Gets a batch inference deployment by id. */
export interface BatchDeploymentsGet200Response extends HttpResponse {
  status: "200";
  body: BatchDeploymentTrackedResource;
}

/** Gets a batch inference deployment by id. */
export interface BatchDeploymentsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Update a batch inference deployment. */
export interface BatchDeploymentsUpdate200Response extends HttpResponse {
  status: "200";
  body: BatchDeploymentTrackedResource;
}

/** Update a batch inference deployment. */
export interface BatchDeploymentsUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Creates/updates a batch inference deployment. */
export interface BatchDeploymentsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: BatchDeploymentTrackedResource;
}

/** Creates/updates a batch inference deployment. */
export interface BatchDeploymentsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: BatchDeploymentTrackedResource;
}

/** Creates/updates a batch inference deployment. */
export interface BatchDeploymentsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** List containers. */
export interface CodeContainersList200Response extends HttpResponse {
  status: "200";
  body: CodeContainerResourceArmPaginatedResult;
}

/** List containers. */
export interface CodeContainersListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Delete container. */
export interface CodeContainersDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete container. */
export interface CodeContainersDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete container. */
export interface CodeContainersDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get container. */
export interface CodeContainersGet200Response extends HttpResponse {
  status: "200";
  body: CodeContainerResource;
}

/** Get container. */
export interface CodeContainersGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Create or update container. */
export interface CodeContainersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: CodeContainerResource;
}

/** Create or update container. */
export interface CodeContainersCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: CodeContainerResource;
}

/** Create or update container. */
export interface CodeContainersCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** List versions. */
export interface CodeVersionsList200Response extends HttpResponse {
  status: "200";
  body: CodeVersionResourceArmPaginatedResult;
}

/** List versions. */
export interface CodeVersionsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Delete version. */
export interface CodeVersionsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete version. */
export interface CodeVersionsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete version. */
export interface CodeVersionsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get version. */
export interface CodeVersionsGet200Response extends HttpResponse {
  status: "200";
  body: CodeVersionResource;
}

/** Get version. */
export interface CodeVersionsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Create or update version. */
export interface CodeVersionsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: CodeVersionResource;
}

/** Create or update version. */
export interface CodeVersionsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: CodeVersionResource;
}

/** Create or update version. */
export interface CodeVersionsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** List containers. */
export interface DataContainersList200Response extends HttpResponse {
  status: "200";
  body: DataContainerResourceArmPaginatedResult;
}

/** List containers. */
export interface DataContainersListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Delete container. */
export interface DataContainersDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete container. */
export interface DataContainersDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete container. */
export interface DataContainersDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get container. */
export interface DataContainersGet200Response extends HttpResponse {
  status: "200";
  body: DataContainerResource;
}

/** Get container. */
export interface DataContainersGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Create or update container. */
export interface DataContainersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: DataContainerResource;
}

/** Create or update container. */
export interface DataContainersCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: DataContainerResource;
}

/** Create or update container. */
export interface DataContainersCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** List data versions. */
export interface DataVersionsList200Response extends HttpResponse {
  status: "200";
  body: DataVersionResourceArmPaginatedResult;
}

/** List data versions. */
export interface DataVersionsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Delete version. */
export interface DataVersionsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete version. */
export interface DataVersionsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete version. */
export interface DataVersionsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get version. */
export interface DataVersionsGet200Response extends HttpResponse {
  status: "200";
  body: DataVersionResource;
}

/** Get version. */
export interface DataVersionsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Create or update version. */
export interface DataVersionsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: DataVersionResource;
}

/** Create or update version. */
export interface DataVersionsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: DataVersionResource;
}

/** Create or update version. */
export interface DataVersionsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** List datastores. */
export interface DatastoresList200Response extends HttpResponse {
  status: "200";
  body: DatastorePropertiesResourceArmPaginatedResult;
}

/** List datastores. */
export interface DatastoresListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Delete datastore. */
export interface DatastoresDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete datastore. */
export interface DatastoresDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete datastore. */
export interface DatastoresDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get datastore. */
export interface DatastoresGet200Response extends HttpResponse {
  status: "200";
  body: DatastorePropertiesResource;
}

/** Get datastore. */
export interface DatastoresGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Create or update datastore. */
export interface DatastoresCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: DatastorePropertiesResource;
}

/** Create or update datastore. */
export interface DatastoresCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: DatastorePropertiesResource;
}

/** Create or update datastore. */
export interface DatastoresCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get datastore secrets. */
export interface DatastoresListSecrets200Response extends HttpResponse {
  status: "200";
  body: DatastoreSecrets;
}

/** Get datastore secrets. */
export interface DatastoresListSecretsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** List containers. */
export interface EnvironmentContainersList200Response extends HttpResponse {
  status: "200";
  body: EnvironmentContainerResourceArmPaginatedResult;
}

/** List containers. */
export interface EnvironmentContainersListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Delete container. */
export interface EnvironmentContainersDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete container. */
export interface EnvironmentContainersDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete container. */
export interface EnvironmentContainersDeletedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get container. */
export interface EnvironmentContainersGet200Response extends HttpResponse {
  status: "200";
  body: EnvironmentContainerResource;
}

/** Get container. */
export interface EnvironmentContainersGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Create or update container. */
export interface EnvironmentContainersCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: EnvironmentContainerResource;
}

/** Create or update container. */
export interface EnvironmentContainersCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: EnvironmentContainerResource;
}

/** Create or update container. */
export interface EnvironmentContainersCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** List versions. */
export interface EnvironmentSpecificationVersionsList200Response
  extends HttpResponse {
  status: "200";
  body: EnvironmentSpecificationVersionResourceArmPaginatedResult;
}

/** List versions. */
export interface EnvironmentSpecificationVersionsListdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Delete version. */
export interface EnvironmentSpecificationVersionsDelete200Response
  extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete version. */
export interface EnvironmentSpecificationVersionsDelete204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete version. */
export interface EnvironmentSpecificationVersionsDeletedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get version. */
export interface EnvironmentSpecificationVersionsGet200Response
  extends HttpResponse {
  status: "200";
  body: EnvironmentSpecificationVersionResource;
}

/** Get version. */
export interface EnvironmentSpecificationVersionsGetdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Creates or updates an EnvironmentSpecificationVersion. */
export interface EnvironmentSpecificationVersionsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: EnvironmentSpecificationVersionResource;
}

/** Creates or updates an EnvironmentSpecificationVersion. */
export interface EnvironmentSpecificationVersionsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: EnvironmentSpecificationVersionResource;
}

/** Creates or updates an EnvironmentSpecificationVersion. */
export interface EnvironmentSpecificationVersionsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Lists Jobs in the workspace. */
export interface JobsList200Response extends HttpResponse {
  status: "200";
  body: JobBaseResourceArmPaginatedResult;
}

/** Lists Jobs in the workspace. */
export interface JobsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Deletes a Job (asynchronous). */
export interface JobsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

export interface JobsDelete202Headers {
  /** Timeout for the client to use when polling the asynchronous operation. */
  "x-ms-async-operation-timeout"?: string;
  /** URI to poll for asynchronous operation result. */
  location?: string;
  /** Duration the client should wait between requests, in seconds. */
  "retry-after"?: string;
}

/** Deletes a Job (asynchronous). */
export interface JobsDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & JobsDelete202Headers;
}

/** Deletes a Job (asynchronous). */
export interface JobsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a Job (asynchronous). */
export interface JobsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Gets a Job by name/id. */
export interface JobsGet200Response extends HttpResponse {
  status: "200";
  body: JobBaseResource;
}

/** Gets a Job by name/id. */
export interface JobsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Creates and executes a Job. */
export interface JobsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: JobBaseResource;
}

/** Creates and executes a Job. */
export interface JobsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: JobBaseResource;
}

/** Creates and executes a Job. */
export interface JobsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Cancels a Job. */
export interface JobsCancel200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Cancels a Job. */
export interface JobsCanceldefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Lists labeling jobs in the workspace. */
export interface LabelingJobsList200Response extends HttpResponse {
  status: "200";
  body: LabelingJobResourceArmPaginatedResult;
}

/** Lists labeling jobs in the workspace. */
export interface LabelingJobsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Delete a labeling job. */
export interface LabelingJobsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete a labeling job. */
export interface LabelingJobsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a labeling job. */
export interface LabelingJobsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Gets a labeling job by name/id. */
export interface LabelingJobsGet200Response extends HttpResponse {
  status: "200";
  body: LabelingJobResource;
}

/** Gets a labeling job by name/id. */
export interface LabelingJobsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Creates or updates a labeling job (asynchronous). */
export interface LabelingJobsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: LabelingJobResource;
}

export interface LabelingJobsCreateOrUpdate201Headers {
  /** Timeout for the client to use when polling the asynchronous operation. */
  "x-ms-async-operation-timeout"?: string;
  /** URI to poll for asynchronous operation status. */
  "azure-asyncoperation"?: string;
}

/** Creates or updates a labeling job (asynchronous). */
export interface LabelingJobsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: LabelingJobResource;
  headers: RawHttpHeaders & LabelingJobsCreateOrUpdate201Headers;
}

/** Creates or updates a labeling job (asynchronous). */
export interface LabelingJobsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Export labels from a labeling job (asynchronous). */
export interface LabelingJobsExportLabels200Response extends HttpResponse {
  status: "200";
  body: ExportSummary;
}

export interface LabelingJobsExportLabels202Headers {
  /** URI to poll for asynchronous operation result. */
  location?: string;
  /** Duration the client should wait between requests, in seconds. */
  "retry-after"?: string;
}

/** Export labels from a labeling job (asynchronous). */
export interface LabelingJobsExportLabels202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & LabelingJobsExportLabels202Headers;
}

/** Export labels from a labeling job (asynchronous). */
export interface LabelingJobsExportLabelsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Pause a labeling job. */
export interface LabelingJobsPause200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Pause a labeling job. */
export interface LabelingJobsPausedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Resume a labeling job (asynchronous). */
export interface LabelingJobsResume200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

export interface LabelingJobsResume202Headers {
  /** URI to poll for asynchronous operation result. */
  location?: string;
  /** Duration the client should wait between requests, in seconds. */
  "retry-after"?: string;
}

/** Resume a labeling job (asynchronous). */
export interface LabelingJobsResume202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & LabelingJobsResume202Headers;
}

/** Resume a labeling job (asynchronous). */
export interface LabelingJobsResumedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** List model containers. */
export interface ModelContainersList200Response extends HttpResponse {
  status: "200";
  body: ModelContainerResourceArmPaginatedResult;
}

/** List model containers. */
export interface ModelContainersListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Delete container. */
export interface ModelContainersDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete container. */
export interface ModelContainersDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete container. */
export interface ModelContainersDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get container. */
export interface ModelContainersGet200Response extends HttpResponse {
  status: "200";
  body: ModelContainerResource;
}

/** Get container. */
export interface ModelContainersGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Create or update container. */
export interface ModelContainersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ModelContainerResource;
}

/** Create or update container. */
export interface ModelContainersCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ModelContainerResource;
}

/** Create or update container. */
export interface ModelContainersCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** List model versions. */
export interface ModelVersionsList200Response extends HttpResponse {
  status: "200";
  body: ModelVersionResourceArmPaginatedResult;
}

/** List model versions. */
export interface ModelVersionsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Delete version. */
export interface ModelVersionsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Delete version. */
export interface ModelVersionsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete version. */
export interface ModelVersionsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get version. */
export interface ModelVersionsGet200Response extends HttpResponse {
  status: "200";
  body: ModelVersionResource;
}

/** Get version. */
export interface ModelVersionsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Create or update version. */
export interface ModelVersionsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ModelVersionResource;
}

/** Create or update version. */
export interface ModelVersionsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ModelVersionResource;
}

/** Create or update version. */
export interface ModelVersionsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** List Online Endpoints. */
export interface OnlineEndpointsList200Response extends HttpResponse {
  status: "200";
  body: OnlineEndpointTrackedResourceArmPaginatedResult;
}

/** List Online Endpoints. */
export interface OnlineEndpointsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Delete Online Endpoint (asynchronous). */
export interface OnlineEndpointsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

export interface OnlineEndpointsDelete202Headers {
  /** Timeout for the client to use when polling the asynchronous operation. */
  "x-ms-async-operation-timeout"?: string;
  /** URI to poll for asynchronous operation result. */
  location?: string;
  /** Duration the client should wait between requests, in seconds. */
  "retry-after"?: string;
}

/** Delete Online Endpoint (asynchronous). */
export interface OnlineEndpointsDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & OnlineEndpointsDelete202Headers;
}

/** Delete Online Endpoint (asynchronous). */
export interface OnlineEndpointsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete Online Endpoint (asynchronous). */
export interface OnlineEndpointsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get Online Endpoint. */
export interface OnlineEndpointsGet200Response extends HttpResponse {
  status: "200";
  body: OnlineEndpointTrackedResource;
}

/** Get Online Endpoint. */
export interface OnlineEndpointsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Update Online Endpoint (asynchronous). */
export interface OnlineEndpointsUpdate200Response extends HttpResponse {
  status: "200";
  body: OnlineEndpointTrackedResource;
}

export interface OnlineEndpointsUpdate202Headers {
  /** Timeout for the client to use when polling the asynchronous operation. */
  "x-ms-async-operation-timeout"?: string;
  /** URI to poll for asynchronous operation result. */
  location?: string;
  /** Duration the client should wait between requests, in seconds. */
  "retry-after"?: string;
}

/** Update Online Endpoint (asynchronous). */
export interface OnlineEndpointsUpdate202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & OnlineEndpointsUpdate202Headers;
}

/** Update Online Endpoint (asynchronous). */
export interface OnlineEndpointsUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Create or update Online Endpoint (asynchronous). */
export interface OnlineEndpointsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: OnlineEndpointTrackedResource;
}

export interface OnlineEndpointsCreateOrUpdate201Headers {
  /** Timeout for the client to use when polling the asynchronous operation. */
  "x-ms-async-operation-timeout"?: string;
  /** URI to poll for asynchronous operation status. */
  "azure-asyncoperation"?: string;
}

/** Create or update Online Endpoint (asynchronous). */
export interface OnlineEndpointsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: OnlineEndpointTrackedResource;
  headers: RawHttpHeaders & OnlineEndpointsCreateOrUpdate201Headers;
}

/** Create or update Online Endpoint (asynchronous). */
export interface OnlineEndpointsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** List EndpointAuthKeys for an Endpoint using Key-based authentication. */
export interface OnlineEndpointsListKeys200Response extends HttpResponse {
  status: "200";
  body: EndpointAuthKeys;
}

/** List EndpointAuthKeys for an Endpoint using Key-based authentication. */
export interface OnlineEndpointsListKeysdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Regenerate EndpointAuthKeys for an Endpoint using Key-based authentication (asynchronous). */
export interface OnlineEndpointsRegenerateKeys200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

export interface OnlineEndpointsRegenerateKeys202Headers {
  /** URI to poll for asynchronous operation result. */
  location?: string;
  /** Duration the client should wait between requests, in seconds. */
  "retry-after"?: string;
}

/** Regenerate EndpointAuthKeys for an Endpoint using Key-based authentication (asynchronous). */
export interface OnlineEndpointsRegenerateKeys202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & OnlineEndpointsRegenerateKeys202Headers;
}

/** Regenerate EndpointAuthKeys for an Endpoint using Key-based authentication (asynchronous). */
export interface OnlineEndpointsRegenerateKeysdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Retrieve a valid AAD token for an Endpoint using AMLToken-based authentication. */
export interface OnlineEndpointsGetToken200Response extends HttpResponse {
  status: "200";
  body: EndpointAuthToken;
}

/** Retrieve a valid AAD token for an Endpoint using AMLToken-based authentication. */
export interface OnlineEndpointsGetTokendefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** List Inference Endpoint Deployments. */
export interface OnlineDeploymentsList200Response extends HttpResponse {
  status: "200";
  body: OnlineDeploymentTrackedResourceArmPaginatedResult;
}

/** List Inference Endpoint Deployments. */
export interface OnlineDeploymentsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Delete Inference Endpoint Deployment (asynchronous). */
export interface OnlineDeploymentsDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

export interface OnlineDeploymentsDelete202Headers {
  /** Timeout for the client to use when polling the asynchronous operation. */
  "x-ms-async-operation-timeout"?: string;
  /** URI to poll for asynchronous operation result. */
  location?: string;
  /** Duration the client should wait between requests, in seconds. */
  "retry-after"?: string;
}

/** Delete Inference Endpoint Deployment (asynchronous). */
export interface OnlineDeploymentsDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & OnlineDeploymentsDelete202Headers;
}

/** Delete Inference Endpoint Deployment (asynchronous). */
export interface OnlineDeploymentsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete Inference Endpoint Deployment (asynchronous). */
export interface OnlineDeploymentsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get Inference Deployment Deployment. */
export interface OnlineDeploymentsGet200Response extends HttpResponse {
  status: "200";
  body: OnlineDeploymentTrackedResource;
}

/** Get Inference Deployment Deployment. */
export interface OnlineDeploymentsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Update Online Deployment (asynchronous). */
export interface OnlineDeploymentsUpdate200Response extends HttpResponse {
  status: "200";
  body: OnlineDeploymentTrackedResource;
}

export interface OnlineDeploymentsUpdate202Headers {
  /** Timeout for the client to use when polling the asynchronous operation. */
  "x-ms-async-operation-timeout"?: string;
  /** URI to poll for asynchronous operation result. */
  location?: string;
  /** Duration the client should wait between requests, in seconds. */
  "retry-after"?: string;
}

/** Update Online Deployment (asynchronous). */
export interface OnlineDeploymentsUpdate202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & OnlineDeploymentsUpdate202Headers;
}

/** Update Online Deployment (asynchronous). */
export interface OnlineDeploymentsUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Create or update Inference Endpoint Deployment (asynchronous). */
export interface OnlineDeploymentsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: OnlineDeploymentTrackedResource;
}

export interface OnlineDeploymentsCreateOrUpdate201Headers {
  /** Timeout for the client to use when polling the asynchronous operation. */
  "x-ms-async-operation-timeout"?: string;
  /** URI to poll for asynchronous operation status. */
  "azure-asyncoperation"?: string;
}

/** Create or update Inference Endpoint Deployment (asynchronous). */
export interface OnlineDeploymentsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: OnlineDeploymentTrackedResource;
  headers: RawHttpHeaders & OnlineDeploymentsCreateOrUpdate201Headers;
}

/** Create or update Inference Endpoint Deployment (asynchronous). */
export interface OnlineDeploymentsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Polls an Endpoint operation. */
export interface OnlineDeploymentsGetLogs200Response extends HttpResponse {
  status: "200";
  body: DeploymentLogs;
}

/** Polls an Endpoint operation. */
export interface OnlineDeploymentsGetLogsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Lists all enabled features for a workspace */
export interface WorkspaceFeaturesList200Response extends HttpResponse {
  status: "200";
  body: ListAmlUserFeatureResult;
}

/** Lists all enabled features for a workspace */
export interface WorkspaceFeaturesListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Lists all skus with associated features */
export interface WorkspaceSkusList200Response extends HttpResponse {
  status: "200";
  body: SkuListResult;
}

/** Lists all skus with associated features */
export interface WorkspaceSkusListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}
