// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OperationsListParameters,
  WorkspacesGetParameters,
  WorkspacesCreateOrUpdateParameters,
  WorkspacesDeleteParameters,
  WorkspacesUpdateParameters,
  WorkspacesListByResourceGroupParameters,
  WorkspacesListKeysParameters,
  WorkspacesResyncKeysParameters,
  WorkspacesListBySubscriptionParameters,
  WorkspacesListNotebookAccessTokenParameters,
  WorkspacesPrepareNotebookParameters,
  WorkspacesListStorageAccountKeysParameters,
  WorkspacesListNotebookKeysParameters,
  UsagesListParameters,
  VirtualMachineSizesListParameters,
  QuotasUpdateParameters,
  QuotasListParameters,
  ComputeListParameters,
  ComputeGetParameters,
  ComputeCreateOrUpdateParameters,
  ComputeUpdateParameters,
  ComputeDeleteParameters,
  ComputeListNodesParameters,
  ComputeListKeysParameters,
  ComputeStartParameters,
  ComputeStopParameters,
  ComputeRestartParameters,
  ComputeUpdateSchedulesParameters,
  PrivateEndpointConnectionsListParameters,
  PrivateEndpointConnectionsGetParameters,
  PrivateEndpointConnectionsCreateOrUpdateParameters,
  PrivateEndpointConnectionsDeleteParameters,
  PrivateLinkResourcesListParameters,
  WorkspaceConnectionsListParameters,
  WorkspaceConnectionsCreateParameters,
  WorkspaceConnectionsGetParameters,
  WorkspaceConnectionsDeleteParameters,
  BatchEndpointsListParameters,
  BatchEndpointsDeleteParameters,
  BatchEndpointsGetParameters,
  BatchEndpointsUpdateParameters,
  BatchEndpointsCreateOrUpdateParameters,
  BatchEndpointsListKeysParameters,
  BatchDeploymentsListParameters,
  BatchDeploymentsDeleteParameters,
  BatchDeploymentsGetParameters,
  BatchDeploymentsUpdateParameters,
  BatchDeploymentsCreateOrUpdateParameters,
  CodeContainersListParameters,
  CodeContainersDeleteParameters,
  CodeContainersGetParameters,
  CodeContainersCreateOrUpdateParameters,
  CodeVersionsListParameters,
  CodeVersionsDeleteParameters,
  CodeVersionsGetParameters,
  CodeVersionsCreateOrUpdateParameters,
  DataContainersListParameters,
  DataContainersDeleteParameters,
  DataContainersGetParameters,
  DataContainersCreateOrUpdateParameters,
  DataVersionsListParameters,
  DataVersionsDeleteParameters,
  DataVersionsGetParameters,
  DataVersionsCreateOrUpdateParameters,
  DatastoresListParameters,
  DatastoresDeleteParameters,
  DatastoresGetParameters,
  DatastoresCreateOrUpdateParameters,
  DatastoresListSecretsParameters,
  EnvironmentContainersListParameters,
  EnvironmentContainersDeleteParameters,
  EnvironmentContainersGetParameters,
  EnvironmentContainersCreateOrUpdateParameters,
  EnvironmentSpecificationVersionsListParameters,
  EnvironmentSpecificationVersionsDeleteParameters,
  EnvironmentSpecificationVersionsGetParameters,
  EnvironmentSpecificationVersionsCreateOrUpdateParameters,
  JobsListParameters,
  JobsDeleteParameters,
  JobsGetParameters,
  JobsCreateOrUpdateParameters,
  JobsCancelParameters,
  LabelingJobsListParameters,
  LabelingJobsDeleteParameters,
  LabelingJobsGetParameters,
  LabelingJobsCreateOrUpdateParameters,
  LabelingJobsExportLabelsParameters,
  LabelingJobsPauseParameters,
  LabelingJobsResumeParameters,
  ModelContainersListParameters,
  ModelContainersDeleteParameters,
  ModelContainersGetParameters,
  ModelContainersCreateOrUpdateParameters,
  ModelVersionsListParameters,
  ModelVersionsDeleteParameters,
  ModelVersionsGetParameters,
  ModelVersionsCreateOrUpdateParameters,
  OnlineEndpointsListParameters,
  OnlineEndpointsDeleteParameters,
  OnlineEndpointsGetParameters,
  OnlineEndpointsUpdateParameters,
  OnlineEndpointsCreateOrUpdateParameters,
  OnlineEndpointsListKeysParameters,
  OnlineEndpointsRegenerateKeysParameters,
  OnlineEndpointsGetTokenParameters,
  OnlineDeploymentsListParameters,
  OnlineDeploymentsDeleteParameters,
  OnlineDeploymentsGetParameters,
  OnlineDeploymentsUpdateParameters,
  OnlineDeploymentsCreateOrUpdateParameters,
  OnlineDeploymentsGetLogsParameters,
  WorkspaceFeaturesListParameters,
  WorkspaceSkusListParameters
} from "./parameters";
import {
  OperationsList200Response,
  OperationsListdefaultResponse,
  WorkspacesGet200Response,
  WorkspacesGetdefaultResponse,
  WorkspacesCreateOrUpdate200Response,
  WorkspacesCreateOrUpdate201Response,
  WorkspacesCreateOrUpdate202Response,
  WorkspacesCreateOrUpdatedefaultResponse,
  WorkspacesDelete200Response,
  WorkspacesDelete202Response,
  WorkspacesDelete204Response,
  WorkspacesDeletedefaultResponse,
  WorkspacesUpdate200Response,
  WorkspacesUpdatedefaultResponse,
  WorkspacesListByResourceGroup200Response,
  WorkspacesListByResourceGroupdefaultResponse,
  WorkspacesListKeys200Response,
  WorkspacesListKeysdefaultResponse,
  WorkspacesResyncKeys200Response,
  WorkspacesResyncKeys202Response,
  WorkspacesResyncKeysdefaultResponse,
  WorkspacesListBySubscription200Response,
  WorkspacesListBySubscriptiondefaultResponse,
  WorkspacesListNotebookAccessToken200Response,
  WorkspacesListNotebookAccessTokendefaultResponse,
  WorkspacesPrepareNotebook200Response,
  WorkspacesPrepareNotebook202Response,
  WorkspacesPrepareNotebookdefaultResponse,
  WorkspacesListStorageAccountKeys200Response,
  WorkspacesListStorageAccountKeysdefaultResponse,
  WorkspacesListNotebookKeys200Response,
  WorkspacesListNotebookKeysdefaultResponse,
  UsagesList200Response,
  VirtualMachineSizesList200Response,
  QuotasUpdate200Response,
  QuotasUpdatedefaultResponse,
  QuotasList200Response,
  QuotasListdefaultResponse,
  ComputeList200Response,
  ComputeListdefaultResponse,
  ComputeGet200Response,
  ComputeGetdefaultResponse,
  ComputeCreateOrUpdate200Response,
  ComputeCreateOrUpdate201Response,
  ComputeCreateOrUpdatedefaultResponse,
  ComputeUpdate200Response,
  ComputeUpdatedefaultResponse,
  ComputeDelete200Response,
  ComputeDelete202Response,
  ComputeDeletedefaultResponse,
  ComputeListNodes200Response,
  ComputeListNodesdefaultResponse,
  ComputeListKeys200Response,
  ComputeListKeysdefaultResponse,
  ComputeStart202Response,
  ComputeStartdefaultResponse,
  ComputeStop202Response,
  ComputeStopdefaultResponse,
  ComputeRestart200Response,
  ComputeRestartdefaultResponse,
  ComputeUpdateSchedules200Response,
  ComputeUpdateSchedulesdefaultResponse,
  PrivateEndpointConnectionsList200Response,
  PrivateEndpointConnectionsListdefaultResponse,
  PrivateEndpointConnectionsGet200Response,
  PrivateEndpointConnectionsGetdefaultResponse,
  PrivateEndpointConnectionsCreateOrUpdate200Response,
  PrivateEndpointConnectionsCreateOrUpdatedefaultResponse,
  PrivateEndpointConnectionsDelete200Response,
  PrivateEndpointConnectionsDelete204Response,
  PrivateEndpointConnectionsDeletedefaultResponse,
  PrivateLinkResourcesList200Response,
  WorkspaceConnectionsList200Response,
  WorkspaceConnectionsListdefaultResponse,
  WorkspaceConnectionsCreate200Response,
  WorkspaceConnectionsCreatedefaultResponse,
  WorkspaceConnectionsGet200Response,
  WorkspaceConnectionsGetdefaultResponse,
  WorkspaceConnectionsDelete200Response,
  WorkspaceConnectionsDelete204Response,
  WorkspaceConnectionsDeletedefaultResponse,
  BatchEndpointsList200Response,
  BatchEndpointsListdefaultResponse,
  BatchEndpointsDelete200Response,
  BatchEndpointsDelete204Response,
  BatchEndpointsDeletedefaultResponse,
  BatchEndpointsGet200Response,
  BatchEndpointsGetdefaultResponse,
  BatchEndpointsUpdate200Response,
  BatchEndpointsUpdatedefaultResponse,
  BatchEndpointsCreateOrUpdate200Response,
  BatchEndpointsCreateOrUpdate201Response,
  BatchEndpointsCreateOrUpdatedefaultResponse,
  BatchEndpointsListKeys200Response,
  BatchEndpointsListKeysdefaultResponse,
  BatchDeploymentsList200Response,
  BatchDeploymentsListdefaultResponse,
  BatchDeploymentsDelete200Response,
  BatchDeploymentsDelete204Response,
  BatchDeploymentsDeletedefaultResponse,
  BatchDeploymentsGet200Response,
  BatchDeploymentsGetdefaultResponse,
  BatchDeploymentsUpdate200Response,
  BatchDeploymentsUpdatedefaultResponse,
  BatchDeploymentsCreateOrUpdate200Response,
  BatchDeploymentsCreateOrUpdate201Response,
  BatchDeploymentsCreateOrUpdatedefaultResponse,
  CodeContainersList200Response,
  CodeContainersListdefaultResponse,
  CodeContainersDelete200Response,
  CodeContainersDelete204Response,
  CodeContainersDeletedefaultResponse,
  CodeContainersGet200Response,
  CodeContainersGetdefaultResponse,
  CodeContainersCreateOrUpdate200Response,
  CodeContainersCreateOrUpdate201Response,
  CodeContainersCreateOrUpdatedefaultResponse,
  CodeVersionsList200Response,
  CodeVersionsListdefaultResponse,
  CodeVersionsDelete200Response,
  CodeVersionsDelete204Response,
  CodeVersionsDeletedefaultResponse,
  CodeVersionsGet200Response,
  CodeVersionsGetdefaultResponse,
  CodeVersionsCreateOrUpdate200Response,
  CodeVersionsCreateOrUpdate201Response,
  CodeVersionsCreateOrUpdatedefaultResponse,
  DataContainersList200Response,
  DataContainersListdefaultResponse,
  DataContainersDelete200Response,
  DataContainersDelete204Response,
  DataContainersDeletedefaultResponse,
  DataContainersGet200Response,
  DataContainersGetdefaultResponse,
  DataContainersCreateOrUpdate200Response,
  DataContainersCreateOrUpdate201Response,
  DataContainersCreateOrUpdatedefaultResponse,
  DataVersionsList200Response,
  DataVersionsListdefaultResponse,
  DataVersionsDelete200Response,
  DataVersionsDelete204Response,
  DataVersionsDeletedefaultResponse,
  DataVersionsGet200Response,
  DataVersionsGetdefaultResponse,
  DataVersionsCreateOrUpdate200Response,
  DataVersionsCreateOrUpdate201Response,
  DataVersionsCreateOrUpdatedefaultResponse,
  DatastoresList200Response,
  DatastoresListdefaultResponse,
  DatastoresDelete200Response,
  DatastoresDelete204Response,
  DatastoresDeletedefaultResponse,
  DatastoresGet200Response,
  DatastoresGetdefaultResponse,
  DatastoresCreateOrUpdate200Response,
  DatastoresCreateOrUpdate201Response,
  DatastoresCreateOrUpdatedefaultResponse,
  DatastoresListSecrets200Response,
  DatastoresListSecretsdefaultResponse,
  EnvironmentContainersList200Response,
  EnvironmentContainersListdefaultResponse,
  EnvironmentContainersDelete200Response,
  EnvironmentContainersDelete204Response,
  EnvironmentContainersDeletedefaultResponse,
  EnvironmentContainersGet200Response,
  EnvironmentContainersGetdefaultResponse,
  EnvironmentContainersCreateOrUpdate200Response,
  EnvironmentContainersCreateOrUpdate201Response,
  EnvironmentContainersCreateOrUpdatedefaultResponse,
  EnvironmentSpecificationVersionsList200Response,
  EnvironmentSpecificationVersionsListdefaultResponse,
  EnvironmentSpecificationVersionsDelete200Response,
  EnvironmentSpecificationVersionsDelete204Response,
  EnvironmentSpecificationVersionsDeletedefaultResponse,
  EnvironmentSpecificationVersionsGet200Response,
  EnvironmentSpecificationVersionsGetdefaultResponse,
  EnvironmentSpecificationVersionsCreateOrUpdate200Response,
  EnvironmentSpecificationVersionsCreateOrUpdate201Response,
  EnvironmentSpecificationVersionsCreateOrUpdatedefaultResponse,
  JobsList200Response,
  JobsListdefaultResponse,
  JobsDelete200Response,
  JobsDelete202Response,
  JobsDelete204Response,
  JobsDeletedefaultResponse,
  JobsGet200Response,
  JobsGetdefaultResponse,
  JobsCreateOrUpdate200Response,
  JobsCreateOrUpdate201Response,
  JobsCreateOrUpdatedefaultResponse,
  JobsCancel200Response,
  JobsCanceldefaultResponse,
  LabelingJobsList200Response,
  LabelingJobsListdefaultResponse,
  LabelingJobsDelete200Response,
  LabelingJobsDelete204Response,
  LabelingJobsDeletedefaultResponse,
  LabelingJobsGet200Response,
  LabelingJobsGetdefaultResponse,
  LabelingJobsCreateOrUpdate200Response,
  LabelingJobsCreateOrUpdate201Response,
  LabelingJobsCreateOrUpdatedefaultResponse,
  LabelingJobsExportLabels200Response,
  LabelingJobsExportLabels202Response,
  LabelingJobsExportLabelsdefaultResponse,
  LabelingJobsPause200Response,
  LabelingJobsPausedefaultResponse,
  LabelingJobsResume200Response,
  LabelingJobsResume202Response,
  LabelingJobsResumedefaultResponse,
  ModelContainersList200Response,
  ModelContainersListdefaultResponse,
  ModelContainersDelete200Response,
  ModelContainersDelete204Response,
  ModelContainersDeletedefaultResponse,
  ModelContainersGet200Response,
  ModelContainersGetdefaultResponse,
  ModelContainersCreateOrUpdate200Response,
  ModelContainersCreateOrUpdate201Response,
  ModelContainersCreateOrUpdatedefaultResponse,
  ModelVersionsList200Response,
  ModelVersionsListdefaultResponse,
  ModelVersionsDelete200Response,
  ModelVersionsDelete204Response,
  ModelVersionsDeletedefaultResponse,
  ModelVersionsGet200Response,
  ModelVersionsGetdefaultResponse,
  ModelVersionsCreateOrUpdate200Response,
  ModelVersionsCreateOrUpdate201Response,
  ModelVersionsCreateOrUpdatedefaultResponse,
  OnlineEndpointsList200Response,
  OnlineEndpointsListdefaultResponse,
  OnlineEndpointsDelete200Response,
  OnlineEndpointsDelete202Response,
  OnlineEndpointsDelete204Response,
  OnlineEndpointsDeletedefaultResponse,
  OnlineEndpointsGet200Response,
  OnlineEndpointsGetdefaultResponse,
  OnlineEndpointsUpdate200Response,
  OnlineEndpointsUpdate202Response,
  OnlineEndpointsUpdatedefaultResponse,
  OnlineEndpointsCreateOrUpdate200Response,
  OnlineEndpointsCreateOrUpdate201Response,
  OnlineEndpointsCreateOrUpdatedefaultResponse,
  OnlineEndpointsListKeys200Response,
  OnlineEndpointsListKeysdefaultResponse,
  OnlineEndpointsRegenerateKeys200Response,
  OnlineEndpointsRegenerateKeys202Response,
  OnlineEndpointsRegenerateKeysdefaultResponse,
  OnlineEndpointsGetToken200Response,
  OnlineEndpointsGetTokendefaultResponse,
  OnlineDeploymentsList200Response,
  OnlineDeploymentsListdefaultResponse,
  OnlineDeploymentsDelete200Response,
  OnlineDeploymentsDelete202Response,
  OnlineDeploymentsDelete204Response,
  OnlineDeploymentsDeletedefaultResponse,
  OnlineDeploymentsGet200Response,
  OnlineDeploymentsGetdefaultResponse,
  OnlineDeploymentsUpdate200Response,
  OnlineDeploymentsUpdate202Response,
  OnlineDeploymentsUpdatedefaultResponse,
  OnlineDeploymentsCreateOrUpdate200Response,
  OnlineDeploymentsCreateOrUpdate201Response,
  OnlineDeploymentsCreateOrUpdatedefaultResponse,
  OnlineDeploymentsGetLogs200Response,
  OnlineDeploymentsGetLogsdefaultResponse,
  WorkspaceFeaturesList200Response,
  WorkspaceFeaturesListdefaultResponse,
  WorkspaceSkusList200Response,
  WorkspaceSkusListdefaultResponse
} from "./responses";
import { getClient, ClientOptions, Client } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface OperationsList {
  /** Lists all of the available Azure Machine Learning Workspaces REST API operations. */
  get(
    options?: OperationsListParameters
  ): Promise<OperationsList200Response | OperationsListdefaultResponse>;
}

export interface WorkspacesGet {
  /** Gets the properties of the specified machine learning workspace. */
  get(
    options?: WorkspacesGetParameters
  ): Promise<WorkspacesGet200Response | WorkspacesGetdefaultResponse>;
  /** Creates or updates a workspace with the specified parameters. */
  put(
    options: WorkspacesCreateOrUpdateParameters
  ): Promise<
    | WorkspacesCreateOrUpdate200Response
    | WorkspacesCreateOrUpdate201Response
    | WorkspacesCreateOrUpdate202Response
    | WorkspacesCreateOrUpdatedefaultResponse
  >;
  /** Deletes a machine learning workspace. */
  delete(
    options?: WorkspacesDeleteParameters
  ): Promise<
    | WorkspacesDelete200Response
    | WorkspacesDelete202Response
    | WorkspacesDelete204Response
    | WorkspacesDeletedefaultResponse
  >;
  /** Updates a machine learning workspace with the specified parameters. */
  patch(
    options: WorkspacesUpdateParameters
  ): Promise<WorkspacesUpdate200Response | WorkspacesUpdatedefaultResponse>;
}

export interface WorkspacesListByResourceGroup {
  /** Lists all the available machine learning workspaces under the specified resource group. */
  get(
    options?: WorkspacesListByResourceGroupParameters
  ): Promise<
    | WorkspacesListByResourceGroup200Response
    | WorkspacesListByResourceGroupdefaultResponse
  >;
}

export interface WorkspacesListKeys {
  /** Lists all the keys associated with this workspace. This includes keys for the storage account, app insights and password for container registry */
  post(
    options?: WorkspacesListKeysParameters
  ): Promise<WorkspacesListKeys200Response | WorkspacesListKeysdefaultResponse>;
}

export interface WorkspacesResyncKeys {
  /** Resync all the keys associated with this workspace. This includes keys for the storage account, app insights and password for container registry */
  post(
    options?: WorkspacesResyncKeysParameters
  ): Promise<
    | WorkspacesResyncKeys200Response
    | WorkspacesResyncKeys202Response
    | WorkspacesResyncKeysdefaultResponse
  >;
}

export interface WorkspacesListBySubscription {
  /** Lists all the available machine learning workspaces under the specified subscription. */
  get(
    options?: WorkspacesListBySubscriptionParameters
  ): Promise<
    | WorkspacesListBySubscription200Response
    | WorkspacesListBySubscriptiondefaultResponse
  >;
}

export interface WorkspacesListNotebookAccessToken {
  /** return notebook access token and refresh token */
  post(
    options?: WorkspacesListNotebookAccessTokenParameters
  ): Promise<
    | WorkspacesListNotebookAccessToken200Response
    | WorkspacesListNotebookAccessTokendefaultResponse
  >;
}

export interface WorkspacesPrepareNotebook {
  post(
    options?: WorkspacesPrepareNotebookParameters
  ): Promise<
    | WorkspacesPrepareNotebook200Response
    | WorkspacesPrepareNotebook202Response
    | WorkspacesPrepareNotebookdefaultResponse
  >;
}

export interface WorkspacesListStorageAccountKeys {
  post(
    options?: WorkspacesListStorageAccountKeysParameters
  ): Promise<
    | WorkspacesListStorageAccountKeys200Response
    | WorkspacesListStorageAccountKeysdefaultResponse
  >;
}

export interface WorkspacesListNotebookKeys {
  post(
    options?: WorkspacesListNotebookKeysParameters
  ): Promise<
    | WorkspacesListNotebookKeys200Response
    | WorkspacesListNotebookKeysdefaultResponse
  >;
}

export interface UsagesList {
  /** Gets the current usage information as well as limits for AML resources for given subscription and location. */
  get(options?: UsagesListParameters): Promise<UsagesList200Response>;
}

export interface VirtualMachineSizesList {
  /** Returns supported VM Sizes in a location */
  get(
    options?: VirtualMachineSizesListParameters
  ): Promise<VirtualMachineSizesList200Response>;
}

export interface QuotasUpdate {
  /** Update quota for each VM family in workspace. */
  post(
    options: QuotasUpdateParameters
  ): Promise<QuotasUpdate200Response | QuotasUpdatedefaultResponse>;
}

export interface QuotasList {
  /** Gets the currently assigned Workspace Quotas based on VMFamily. */
  get(
    options?: QuotasListParameters
  ): Promise<QuotasList200Response | QuotasListdefaultResponse>;
}

export interface ComputeList {
  /** Gets computes in specified workspace. */
  get(
    options?: ComputeListParameters
  ): Promise<ComputeList200Response | ComputeListdefaultResponse>;
}

export interface ComputeGet {
  /** Gets compute definition by its name. Any secrets (storage keys, service credentials, etc) are not returned - use 'keys' nested resource to get them. */
  get(
    options?: ComputeGetParameters
  ): Promise<ComputeGet200Response | ComputeGetdefaultResponse>;
  /** Creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet. */
  put(
    options: ComputeCreateOrUpdateParameters
  ): Promise<
    | ComputeCreateOrUpdate200Response
    | ComputeCreateOrUpdate201Response
    | ComputeCreateOrUpdatedefaultResponse
  >;
  /** Updates properties of a compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. */
  patch(
    options: ComputeUpdateParameters
  ): Promise<ComputeUpdate200Response | ComputeUpdatedefaultResponse>;
  /** Deletes specified Machine Learning compute. */
  delete(
    options?: ComputeDeleteParameters
  ): Promise<
    | ComputeDelete200Response
    | ComputeDelete202Response
    | ComputeDeletedefaultResponse
  >;
}

export interface ComputeListNodes {
  /** Get the details (e.g IP address, port etc) of all the compute nodes in the compute. */
  post(
    options?: ComputeListNodesParameters
  ): Promise<ComputeListNodes200Response | ComputeListNodesdefaultResponse>;
}

export interface ComputeListKeys {
  /** Gets secrets related to Machine Learning compute (storage keys, service credentials, etc). */
  post(
    options?: ComputeListKeysParameters
  ): Promise<ComputeListKeys200Response | ComputeListKeysdefaultResponse>;
}

export interface ComputeStart {
  /** Posts a start action to a compute instance */
  post(
    options?: ComputeStartParameters
  ): Promise<ComputeStart202Response | ComputeStartdefaultResponse>;
}

export interface ComputeStop {
  /** Posts a stop action to a compute instance */
  post(
    options?: ComputeStopParameters
  ): Promise<ComputeStop202Response | ComputeStopdefaultResponse>;
}

export interface ComputeRestart {
  /** Posts a restart action to a compute instance */
  post(
    options?: ComputeRestartParameters
  ): Promise<ComputeRestart200Response | ComputeRestartdefaultResponse>;
}

export interface ComputeUpdateSchedules {
  /** Updates schedules of a compute instance */
  post(
    options?: ComputeUpdateSchedulesParameters
  ): Promise<
    ComputeUpdateSchedules200Response | ComputeUpdateSchedulesdefaultResponse
  >;
}

export interface PrivateEndpointConnectionsList {
  /** List all the private endpoint connections associated with the workspace. */
  get(
    options?: PrivateEndpointConnectionsListParameters
  ): Promise<
    | PrivateEndpointConnectionsList200Response
    | PrivateEndpointConnectionsListdefaultResponse
  >;
}

export interface PrivateEndpointConnectionsGet {
  /** Gets the specified private endpoint connection associated with the workspace. */
  get(
    options?: PrivateEndpointConnectionsGetParameters
  ): Promise<
    | PrivateEndpointConnectionsGet200Response
    | PrivateEndpointConnectionsGetdefaultResponse
  >;
  /** Update the state of specified private endpoint connection associated with the workspace. */
  put(
    options: PrivateEndpointConnectionsCreateOrUpdateParameters
  ): Promise<
    | PrivateEndpointConnectionsCreateOrUpdate200Response
    | PrivateEndpointConnectionsCreateOrUpdatedefaultResponse
  >;
  /** Deletes the specified private endpoint connection associated with the workspace. */
  delete(
    options?: PrivateEndpointConnectionsDeleteParameters
  ): Promise<
    | PrivateEndpointConnectionsDelete200Response
    | PrivateEndpointConnectionsDelete204Response
    | PrivateEndpointConnectionsDeletedefaultResponse
  >;
}

export interface PrivateLinkResourcesList {
  /** Gets the private link resources that need to be created for a workspace. */
  get(
    options?: PrivateLinkResourcesListParameters
  ): Promise<PrivateLinkResourcesList200Response>;
}

export interface WorkspaceConnectionsList {
  /** List all connections under a AML workspace. */
  get(
    options?: WorkspaceConnectionsListParameters
  ): Promise<
    | WorkspaceConnectionsList200Response
    | WorkspaceConnectionsListdefaultResponse
  >;
}

export interface WorkspaceConnectionsCreate {
  /** Add a new workspace connection. */
  put(
    options: WorkspaceConnectionsCreateParameters
  ): Promise<
    | WorkspaceConnectionsCreate200Response
    | WorkspaceConnectionsCreatedefaultResponse
  >;
  /** Get the detail of a workspace connection. */
  get(
    options?: WorkspaceConnectionsGetParameters
  ): Promise<
    WorkspaceConnectionsGet200Response | WorkspaceConnectionsGetdefaultResponse
  >;
  /** Delete a workspace connection. */
  delete(
    options?: WorkspaceConnectionsDeleteParameters
  ): Promise<
    | WorkspaceConnectionsDelete200Response
    | WorkspaceConnectionsDelete204Response
    | WorkspaceConnectionsDeletedefaultResponse
  >;
}

export interface BatchEndpointsList {
  /** Lists Batch inference endpoint in the workspace. */
  get(
    options?: BatchEndpointsListParameters
  ): Promise<BatchEndpointsList200Response | BatchEndpointsListdefaultResponse>;
}

export interface BatchEndpointsDelete {
  /** Delete Batch Inference Endpoint. */
  delete(
    options?: BatchEndpointsDeleteParameters
  ): Promise<
    | BatchEndpointsDelete200Response
    | BatchEndpointsDelete204Response
    | BatchEndpointsDeletedefaultResponse
  >;
  /** Gets a batch inference endpoint by name. */
  get(
    options?: BatchEndpointsGetParameters
  ): Promise<BatchEndpointsGet200Response | BatchEndpointsGetdefaultResponse>;
  /** Update a batch inference endpoint. */
  patch(
    options: BatchEndpointsUpdateParameters
  ): Promise<
    BatchEndpointsUpdate200Response | BatchEndpointsUpdatedefaultResponse
  >;
  /** Creates a batch inference endpoint. */
  put(
    options: BatchEndpointsCreateOrUpdateParameters
  ): Promise<
    | BatchEndpointsCreateOrUpdate200Response
    | BatchEndpointsCreateOrUpdate201Response
    | BatchEndpointsCreateOrUpdatedefaultResponse
  >;
}

export interface BatchEndpointsListKeys {
  /** Lists batch Inference Endpoint keys. */
  post(
    options?: BatchEndpointsListKeysParameters
  ): Promise<
    BatchEndpointsListKeys200Response | BatchEndpointsListKeysdefaultResponse
  >;
}

export interface BatchDeploymentsList {
  /** Lists Batch inference deployments in the workspace. */
  get(
    options?: BatchDeploymentsListParameters
  ): Promise<
    BatchDeploymentsList200Response | BatchDeploymentsListdefaultResponse
  >;
}

export interface BatchDeploymentsDelete {
  /** Delete Batch Inference deployment. */
  delete(
    options?: BatchDeploymentsDeleteParameters
  ): Promise<
    | BatchDeploymentsDelete200Response
    | BatchDeploymentsDelete204Response
    | BatchDeploymentsDeletedefaultResponse
  >;
  /** Gets a batch inference deployment by id. */
  get(
    options?: BatchDeploymentsGetParameters
  ): Promise<
    BatchDeploymentsGet200Response | BatchDeploymentsGetdefaultResponse
  >;
  /** Update a batch inference deployment. */
  patch(
    options: BatchDeploymentsUpdateParameters
  ): Promise<
    BatchDeploymentsUpdate200Response | BatchDeploymentsUpdatedefaultResponse
  >;
  /** Creates/updates a batch inference deployment. */
  put(
    options: BatchDeploymentsCreateOrUpdateParameters
  ): Promise<
    | BatchDeploymentsCreateOrUpdate200Response
    | BatchDeploymentsCreateOrUpdate201Response
    | BatchDeploymentsCreateOrUpdatedefaultResponse
  >;
}

export interface CodeContainersList {
  /** List containers. */
  get(
    options?: CodeContainersListParameters
  ): Promise<CodeContainersList200Response | CodeContainersListdefaultResponse>;
}

export interface CodeContainersDelete {
  /** Delete container. */
  delete(
    options?: CodeContainersDeleteParameters
  ): Promise<
    | CodeContainersDelete200Response
    | CodeContainersDelete204Response
    | CodeContainersDeletedefaultResponse
  >;
  /** Get container. */
  get(
    options?: CodeContainersGetParameters
  ): Promise<CodeContainersGet200Response | CodeContainersGetdefaultResponse>;
  /** Create or update container. */
  put(
    options: CodeContainersCreateOrUpdateParameters
  ): Promise<
    | CodeContainersCreateOrUpdate200Response
    | CodeContainersCreateOrUpdate201Response
    | CodeContainersCreateOrUpdatedefaultResponse
  >;
}

export interface CodeVersionsList {
  /** List versions. */
  get(
    options?: CodeVersionsListParameters
  ): Promise<CodeVersionsList200Response | CodeVersionsListdefaultResponse>;
}

export interface CodeVersionsDelete {
  /** Delete version. */
  delete(
    options?: CodeVersionsDeleteParameters
  ): Promise<
    | CodeVersionsDelete200Response
    | CodeVersionsDelete204Response
    | CodeVersionsDeletedefaultResponse
  >;
  /** Get version. */
  get(
    options?: CodeVersionsGetParameters
  ): Promise<CodeVersionsGet200Response | CodeVersionsGetdefaultResponse>;
  /** Create or update version. */
  put(
    options: CodeVersionsCreateOrUpdateParameters
  ): Promise<
    | CodeVersionsCreateOrUpdate200Response
    | CodeVersionsCreateOrUpdate201Response
    | CodeVersionsCreateOrUpdatedefaultResponse
  >;
}

export interface DataContainersList {
  /** List containers. */
  get(
    options?: DataContainersListParameters
  ): Promise<DataContainersList200Response | DataContainersListdefaultResponse>;
}

export interface DataContainersDelete {
  /** Delete container. */
  delete(
    options?: DataContainersDeleteParameters
  ): Promise<
    | DataContainersDelete200Response
    | DataContainersDelete204Response
    | DataContainersDeletedefaultResponse
  >;
  /** Get container. */
  get(
    options?: DataContainersGetParameters
  ): Promise<DataContainersGet200Response | DataContainersGetdefaultResponse>;
  /** Create or update container. */
  put(
    options: DataContainersCreateOrUpdateParameters
  ): Promise<
    | DataContainersCreateOrUpdate200Response
    | DataContainersCreateOrUpdate201Response
    | DataContainersCreateOrUpdatedefaultResponse
  >;
}

export interface DataVersionsList {
  /** List data versions. */
  get(
    options?: DataVersionsListParameters
  ): Promise<DataVersionsList200Response | DataVersionsListdefaultResponse>;
}

export interface DataVersionsDelete {
  /** Delete version. */
  delete(
    options?: DataVersionsDeleteParameters
  ): Promise<
    | DataVersionsDelete200Response
    | DataVersionsDelete204Response
    | DataVersionsDeletedefaultResponse
  >;
  /** Get version. */
  get(
    options?: DataVersionsGetParameters
  ): Promise<DataVersionsGet200Response | DataVersionsGetdefaultResponse>;
  /** Create or update version. */
  put(
    options: DataVersionsCreateOrUpdateParameters
  ): Promise<
    | DataVersionsCreateOrUpdate200Response
    | DataVersionsCreateOrUpdate201Response
    | DataVersionsCreateOrUpdatedefaultResponse
  >;
}

export interface DatastoresList {
  /** List datastores. */
  get(
    options?: DatastoresListParameters
  ): Promise<DatastoresList200Response | DatastoresListdefaultResponse>;
}

export interface DatastoresDelete {
  /** Delete datastore. */
  delete(
    options?: DatastoresDeleteParameters
  ): Promise<
    | DatastoresDelete200Response
    | DatastoresDelete204Response
    | DatastoresDeletedefaultResponse
  >;
  /** Get datastore. */
  get(
    options?: DatastoresGetParameters
  ): Promise<DatastoresGet200Response | DatastoresGetdefaultResponse>;
  /** Create or update datastore. */
  put(
    options: DatastoresCreateOrUpdateParameters
  ): Promise<
    | DatastoresCreateOrUpdate200Response
    | DatastoresCreateOrUpdate201Response
    | DatastoresCreateOrUpdatedefaultResponse
  >;
}

export interface DatastoresListSecrets {
  /** Get datastore secrets. */
  post(
    options?: DatastoresListSecretsParameters
  ): Promise<
    DatastoresListSecrets200Response | DatastoresListSecretsdefaultResponse
  >;
}

export interface EnvironmentContainersList {
  /** List containers. */
  get(
    options?: EnvironmentContainersListParameters
  ): Promise<
    | EnvironmentContainersList200Response
    | EnvironmentContainersListdefaultResponse
  >;
}

export interface EnvironmentContainersDelete {
  /** Delete container. */
  delete(
    options?: EnvironmentContainersDeleteParameters
  ): Promise<
    | EnvironmentContainersDelete200Response
    | EnvironmentContainersDelete204Response
    | EnvironmentContainersDeletedefaultResponse
  >;
  /** Get container. */
  get(
    options?: EnvironmentContainersGetParameters
  ): Promise<
    | EnvironmentContainersGet200Response
    | EnvironmentContainersGetdefaultResponse
  >;
  /** Create or update container. */
  put(
    options: EnvironmentContainersCreateOrUpdateParameters
  ): Promise<
    | EnvironmentContainersCreateOrUpdate200Response
    | EnvironmentContainersCreateOrUpdate201Response
    | EnvironmentContainersCreateOrUpdatedefaultResponse
  >;
}

export interface EnvironmentSpecificationVersionsList {
  /** List versions. */
  get(
    options?: EnvironmentSpecificationVersionsListParameters
  ): Promise<
    | EnvironmentSpecificationVersionsList200Response
    | EnvironmentSpecificationVersionsListdefaultResponse
  >;
}

export interface EnvironmentSpecificationVersionsDelete {
  /** Delete version. */
  delete(
    options?: EnvironmentSpecificationVersionsDeleteParameters
  ): Promise<
    | EnvironmentSpecificationVersionsDelete200Response
    | EnvironmentSpecificationVersionsDelete204Response
    | EnvironmentSpecificationVersionsDeletedefaultResponse
  >;
  /** Get version. */
  get(
    options?: EnvironmentSpecificationVersionsGetParameters
  ): Promise<
    | EnvironmentSpecificationVersionsGet200Response
    | EnvironmentSpecificationVersionsGetdefaultResponse
  >;
  /** Creates or updates an EnvironmentSpecificationVersion. */
  put(
    options: EnvironmentSpecificationVersionsCreateOrUpdateParameters
  ): Promise<
    | EnvironmentSpecificationVersionsCreateOrUpdate200Response
    | EnvironmentSpecificationVersionsCreateOrUpdate201Response
    | EnvironmentSpecificationVersionsCreateOrUpdatedefaultResponse
  >;
}

export interface JobsList {
  /** Lists Jobs in the workspace. */
  get(
    options?: JobsListParameters
  ): Promise<JobsList200Response | JobsListdefaultResponse>;
}

export interface JobsDelete {
  /** Deletes a Job (asynchronous). */
  delete(
    options?: JobsDeleteParameters
  ): Promise<
    | JobsDelete200Response
    | JobsDelete202Response
    | JobsDelete204Response
    | JobsDeletedefaultResponse
  >;
  /** Gets a Job by name/id. */
  get(
    options?: JobsGetParameters
  ): Promise<JobsGet200Response | JobsGetdefaultResponse>;
  /** Creates and executes a Job. */
  put(
    options: JobsCreateOrUpdateParameters
  ): Promise<
    | JobsCreateOrUpdate200Response
    | JobsCreateOrUpdate201Response
    | JobsCreateOrUpdatedefaultResponse
  >;
}

export interface JobsCancel {
  /** Cancels a Job. */
  post(
    options?: JobsCancelParameters
  ): Promise<JobsCancel200Response | JobsCanceldefaultResponse>;
}

export interface LabelingJobsList {
  /** Lists labeling jobs in the workspace. */
  get(
    options?: LabelingJobsListParameters
  ): Promise<LabelingJobsList200Response | LabelingJobsListdefaultResponse>;
}

export interface LabelingJobsDelete {
  /** Delete a labeling job. */
  delete(
    options?: LabelingJobsDeleteParameters
  ): Promise<
    | LabelingJobsDelete200Response
    | LabelingJobsDelete204Response
    | LabelingJobsDeletedefaultResponse
  >;
  /** Gets a labeling job by name/id. */
  get(
    options?: LabelingJobsGetParameters
  ): Promise<LabelingJobsGet200Response | LabelingJobsGetdefaultResponse>;
  /** Creates or updates a labeling job (asynchronous). */
  put(
    options: LabelingJobsCreateOrUpdateParameters
  ): Promise<
    | LabelingJobsCreateOrUpdate200Response
    | LabelingJobsCreateOrUpdate201Response
    | LabelingJobsCreateOrUpdatedefaultResponse
  >;
}

export interface LabelingJobsExportLabels {
  /** Export labels from a labeling job (asynchronous). */
  post(
    options: LabelingJobsExportLabelsParameters
  ): Promise<
    | LabelingJobsExportLabels200Response
    | LabelingJobsExportLabels202Response
    | LabelingJobsExportLabelsdefaultResponse
  >;
}

export interface LabelingJobsPause {
  /** Pause a labeling job. */
  post(
    options?: LabelingJobsPauseParameters
  ): Promise<LabelingJobsPause200Response | LabelingJobsPausedefaultResponse>;
}

export interface LabelingJobsResume {
  /** Resume a labeling job (asynchronous). */
  post(
    options?: LabelingJobsResumeParameters
  ): Promise<
    | LabelingJobsResume200Response
    | LabelingJobsResume202Response
    | LabelingJobsResumedefaultResponse
  >;
}

export interface ModelContainersList {
  /** List model containers. */
  get(
    options?: ModelContainersListParameters
  ): Promise<
    ModelContainersList200Response | ModelContainersListdefaultResponse
  >;
}

export interface ModelContainersDelete {
  /** Delete container. */
  delete(
    options?: ModelContainersDeleteParameters
  ): Promise<
    | ModelContainersDelete200Response
    | ModelContainersDelete204Response
    | ModelContainersDeletedefaultResponse
  >;
  /** Get container. */
  get(
    options?: ModelContainersGetParameters
  ): Promise<ModelContainersGet200Response | ModelContainersGetdefaultResponse>;
  /** Create or update container. */
  put(
    options: ModelContainersCreateOrUpdateParameters
  ): Promise<
    | ModelContainersCreateOrUpdate200Response
    | ModelContainersCreateOrUpdate201Response
    | ModelContainersCreateOrUpdatedefaultResponse
  >;
}

export interface ModelVersionsList {
  /** List model versions. */
  get(
    options?: ModelVersionsListParameters
  ): Promise<ModelVersionsList200Response | ModelVersionsListdefaultResponse>;
}

export interface ModelVersionsDelete {
  /** Delete version. */
  delete(
    options?: ModelVersionsDeleteParameters
  ): Promise<
    | ModelVersionsDelete200Response
    | ModelVersionsDelete204Response
    | ModelVersionsDeletedefaultResponse
  >;
  /** Get version. */
  get(
    options?: ModelVersionsGetParameters
  ): Promise<ModelVersionsGet200Response | ModelVersionsGetdefaultResponse>;
  /** Create or update version. */
  put(
    options: ModelVersionsCreateOrUpdateParameters
  ): Promise<
    | ModelVersionsCreateOrUpdate200Response
    | ModelVersionsCreateOrUpdate201Response
    | ModelVersionsCreateOrUpdatedefaultResponse
  >;
}

export interface OnlineEndpointsList {
  /** List Online Endpoints. */
  get(
    options?: OnlineEndpointsListParameters
  ): Promise<
    OnlineEndpointsList200Response | OnlineEndpointsListdefaultResponse
  >;
}

export interface OnlineEndpointsDelete {
  /** Delete Online Endpoint (asynchronous). */
  delete(
    options?: OnlineEndpointsDeleteParameters
  ): Promise<
    | OnlineEndpointsDelete200Response
    | OnlineEndpointsDelete202Response
    | OnlineEndpointsDelete204Response
    | OnlineEndpointsDeletedefaultResponse
  >;
  /** Get Online Endpoint. */
  get(
    options?: OnlineEndpointsGetParameters
  ): Promise<OnlineEndpointsGet200Response | OnlineEndpointsGetdefaultResponse>;
  /** Update Online Endpoint (asynchronous). */
  patch(
    options: OnlineEndpointsUpdateParameters
  ): Promise<
    | OnlineEndpointsUpdate200Response
    | OnlineEndpointsUpdate202Response
    | OnlineEndpointsUpdatedefaultResponse
  >;
  /** Create or update Online Endpoint (asynchronous). */
  put(
    options: OnlineEndpointsCreateOrUpdateParameters
  ): Promise<
    | OnlineEndpointsCreateOrUpdate200Response
    | OnlineEndpointsCreateOrUpdate201Response
    | OnlineEndpointsCreateOrUpdatedefaultResponse
  >;
}

export interface OnlineEndpointsListKeys {
  /** List EndpointAuthKeys for an Endpoint using Key-based authentication. */
  post(
    options?: OnlineEndpointsListKeysParameters
  ): Promise<
    OnlineEndpointsListKeys200Response | OnlineEndpointsListKeysdefaultResponse
  >;
}

export interface OnlineEndpointsRegenerateKeys {
  /** Regenerate EndpointAuthKeys for an Endpoint using Key-based authentication (asynchronous). */
  post(
    options: OnlineEndpointsRegenerateKeysParameters
  ): Promise<
    | OnlineEndpointsRegenerateKeys200Response
    | OnlineEndpointsRegenerateKeys202Response
    | OnlineEndpointsRegenerateKeysdefaultResponse
  >;
}

export interface OnlineEndpointsGetToken {
  /** Retrieve a valid AAD token for an Endpoint using AMLToken-based authentication. */
  post(
    options?: OnlineEndpointsGetTokenParameters
  ): Promise<
    OnlineEndpointsGetToken200Response | OnlineEndpointsGetTokendefaultResponse
  >;
}

export interface OnlineDeploymentsList {
  /** List Inference Endpoint Deployments. */
  get(
    options?: OnlineDeploymentsListParameters
  ): Promise<
    OnlineDeploymentsList200Response | OnlineDeploymentsListdefaultResponse
  >;
}

export interface OnlineDeploymentsDelete {
  /** Delete Inference Endpoint Deployment (asynchronous). */
  delete(
    options?: OnlineDeploymentsDeleteParameters
  ): Promise<
    | OnlineDeploymentsDelete200Response
    | OnlineDeploymentsDelete202Response
    | OnlineDeploymentsDelete204Response
    | OnlineDeploymentsDeletedefaultResponse
  >;
  /** Get Inference Deployment Deployment. */
  get(
    options?: OnlineDeploymentsGetParameters
  ): Promise<
    OnlineDeploymentsGet200Response | OnlineDeploymentsGetdefaultResponse
  >;
  /** Update Online Deployment (asynchronous). */
  patch(
    options: OnlineDeploymentsUpdateParameters
  ): Promise<
    | OnlineDeploymentsUpdate200Response
    | OnlineDeploymentsUpdate202Response
    | OnlineDeploymentsUpdatedefaultResponse
  >;
  /** Create or update Inference Endpoint Deployment (asynchronous). */
  put(
    options: OnlineDeploymentsCreateOrUpdateParameters
  ): Promise<
    | OnlineDeploymentsCreateOrUpdate200Response
    | OnlineDeploymentsCreateOrUpdate201Response
    | OnlineDeploymentsCreateOrUpdatedefaultResponse
  >;
}

export interface OnlineDeploymentsGetLogs {
  /** Polls an Endpoint operation. */
  post(
    options: OnlineDeploymentsGetLogsParameters
  ): Promise<
    | OnlineDeploymentsGetLogs200Response
    | OnlineDeploymentsGetLogsdefaultResponse
  >;
}

export interface WorkspaceFeaturesList {
  /** Lists all enabled features for a workspace */
  get(
    options?: WorkspaceFeaturesListParameters
  ): Promise<
    WorkspaceFeaturesList200Response | WorkspaceFeaturesListdefaultResponse
  >;
}

export interface WorkspaceSkusList {
  /** Lists all skus with associated features */
  get(
    options?: WorkspaceSkusListParameters
  ): Promise<WorkspaceSkusList200Response | WorkspaceSkusListdefaultResponse>;
}

export interface Routes {
  /** Resource for '/providers/Microsoft.MachineLearningServices/operations' has methods for the following verbs: get */
  (
    path: "/providers/Microsoft.MachineLearningServices/operations"
  ): OperationsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}' has methods for the following verbs: get, put, delete, patch */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): WorkspacesGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces",
    subscriptionId: string,
    resourceGroupName: string
  ): WorkspacesListByResourceGroup;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/listKeys' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/listKeys",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): WorkspacesListKeys;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/resyncKeys' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/resyncKeys",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): WorkspacesResyncKeys;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.MachineLearningServices/workspaces' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.MachineLearningServices/workspaces",
    subscriptionId: string
  ): WorkspacesListBySubscription;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/listNotebookAccessToken' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/listNotebookAccessToken",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): WorkspacesListNotebookAccessToken;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/prepareNotebook' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/prepareNotebook",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): WorkspacesPrepareNotebook;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/listStorageAccountKeys' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/listStorageAccountKeys",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): WorkspacesListStorageAccountKeys;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/listNotebookKeys' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/listNotebookKeys",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): WorkspacesListNotebookKeys;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.MachineLearningServices/locations/\{location\}/usages' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.MachineLearningServices/locations/{location}/usages",
    subscriptionId: string,
    location: string
  ): UsagesList;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.MachineLearningServices/locations/\{location\}/vmSizes' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.MachineLearningServices/locations/{location}/vmSizes",
    location: string,
    subscriptionId: string
  ): VirtualMachineSizesList;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.MachineLearningServices/locations/\{location\}/updateQuotas' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.MachineLearningServices/locations/{location}/updateQuotas",
    location: string,
    subscriptionId: string
  ): QuotasUpdate;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.MachineLearningServices/locations/\{location\}/quotas' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.MachineLearningServices/locations/{location}/quotas",
    subscriptionId: string,
    location: string
  ): QuotasList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/computes' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): ComputeList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/computes/\{computeName\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string,
    computeName: string
  ): ComputeGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/computes/\{computeName\}/listNodes' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/listNodes",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string,
    computeName: string
  ): ComputeListNodes;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/computes/\{computeName\}/listKeys' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/listKeys",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string,
    computeName: string
  ): ComputeListKeys;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/computes/\{computeName\}/start' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/start",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string,
    computeName: string
  ): ComputeStart;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/computes/\{computeName\}/stop' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/stop",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string,
    computeName: string
  ): ComputeStop;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/computes/\{computeName\}/restart' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/restart",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string,
    computeName: string
  ): ComputeRestart;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/computes/\{computeName\}/updateSchedules' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/updateSchedules",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string,
    computeName: string
  ): ComputeUpdateSchedules;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/privateEndpointConnections' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/privateEndpointConnections",
    resourceGroupName: string,
    workspaceName: string,
    subscriptionId: string
  ): PrivateEndpointConnectionsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/privateEndpointConnections/\{privateEndpointConnectionName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string,
    privateEndpointConnectionName: string
  ): PrivateEndpointConnectionsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/privateLinkResources' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/privateLinkResources",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): PrivateLinkResourcesList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/connections' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): WorkspaceConnectionsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/connections/\{connectionName\}' has methods for the following verbs: put, get, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string
  ): WorkspaceConnectionsCreate;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/batchEndpoints' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): BatchEndpointsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/batchEndpoints/\{endpointName\}' has methods for the following verbs: delete, get, patch, put */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}",
    endpointName: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): BatchEndpointsDelete;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/batchEndpoints/\{endpointName\}/listkeys' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}/listkeys",
    endpointName: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): BatchEndpointsListKeys;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/batchEndpoints/\{endpointName\}/deployments' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}/deployments",
    endpointName: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): BatchDeploymentsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/batchEndpoints/\{endpointName\}/deployments/\{deploymentName\}' has methods for the following verbs: delete, get, patch, put */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}/deployments/{deploymentName}",
    endpointName: string,
    deploymentName: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): BatchDeploymentsDelete;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/codes' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/codes",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): CodeContainersList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/codes/\{name\}' has methods for the following verbs: delete, get, put */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/codes/{name}",
    name: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): CodeContainersDelete;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/codes/\{name\}/versions' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/codes/{name}/versions",
    name: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): CodeVersionsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/codes/\{name\}/versions/\{version\}' has methods for the following verbs: delete, get, put */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/codes/{name}/versions/{version}",
    name: string,
    version: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): CodeVersionsDelete;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/data' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/data",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): DataContainersList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/data/\{name\}' has methods for the following verbs: delete, get, put */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/data/{name}",
    name: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): DataContainersDelete;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/data/\{name\}/versions' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/data/{name}/versions",
    name: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): DataVersionsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/data/\{name\}/versions/\{version\}' has methods for the following verbs: delete, get, put */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/data/{name}/versions/{version}",
    name: string,
    version: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): DataVersionsDelete;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/datastores' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/datastores",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): DatastoresList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/datastores/\{name\}' has methods for the following verbs: delete, get, put */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/datastores/{name}",
    name: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): DatastoresDelete;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/datastores/\{name\}/listSecrets' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/datastores/{name}/listSecrets",
    name: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): DatastoresListSecrets;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/environments' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/environments",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): EnvironmentContainersList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/environments/\{name\}' has methods for the following verbs: delete, get, put */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/environments/{name}",
    name: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): EnvironmentContainersDelete;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/environments/\{name\}/versions' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/environments/{name}/versions",
    name: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): EnvironmentSpecificationVersionsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/environments/\{name\}/versions/\{version\}' has methods for the following verbs: delete, get, put */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/environments/{name}/versions/{version}",
    name: string,
    version: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): EnvironmentSpecificationVersionsDelete;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/jobs' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/jobs",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): JobsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/jobs/\{id\}' has methods for the following verbs: delete, get, put */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/jobs/{id}",
    id: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): JobsDelete;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/jobs/\{id\}/cancel' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/jobs/{id}/cancel",
    id: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): JobsCancel;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/labelingJobs' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/labelingJobs",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): LabelingJobsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/labelingJobs/\{id\}' has methods for the following verbs: delete, get, put */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/labelingJobs/{id}",
    id: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): LabelingJobsDelete;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/labelingJobs/\{id\}/exportLabels' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/labelingJobs/{id}/exportLabels",
    id: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): LabelingJobsExportLabels;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/labelingJobs/\{id\}/pause' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/labelingJobs/{id}/pause",
    id: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): LabelingJobsPause;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/labelingJobs/\{id\}/resume' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/labelingJobs/{id}/resume",
    id: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): LabelingJobsResume;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/models' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/models",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): ModelContainersList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/models/\{name\}' has methods for the following verbs: delete, get, put */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/models/{name}",
    name: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): ModelContainersDelete;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/models/\{name\}/versions' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/models/{name}/versions",
    name: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): ModelVersionsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/models/\{name\}/versions/\{version\}' has methods for the following verbs: delete, get, put */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/models/{name}/versions/{version}",
    name: string,
    version: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): ModelVersionsDelete;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/onlineEndpoints' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): OnlineEndpointsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/onlineEndpoints/\{endpointName\}' has methods for the following verbs: delete, get, patch, put */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}",
    endpointName: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): OnlineEndpointsDelete;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/onlineEndpoints/\{endpointName\}/listKeys' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/listKeys",
    endpointName: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): OnlineEndpointsListKeys;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/onlineEndpoints/\{endpointName\}/regenerateKeys' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/regenerateKeys",
    endpointName: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): OnlineEndpointsRegenerateKeys;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/onlineEndpoints/\{endpointName\}/token' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/token",
    endpointName: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): OnlineEndpointsGetToken;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/onlineEndpoints/\{endpointName\}/deployments' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/deployments",
    endpointName: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): OnlineDeploymentsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/onlineEndpoints/\{endpointName\}/deployments/\{deploymentName\}' has methods for the following verbs: delete, get, patch, put */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/deployments/{deploymentName}",
    endpointName: string,
    deploymentName: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): OnlineDeploymentsDelete;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/onlineEndpoints/\{endpointName\}/deployments/\{deploymentName\}/getLogs' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/deployments/{deploymentName}/getLogs",
    endpointName: string,
    deploymentName: string,
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): OnlineDeploymentsGetLogs;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.MachineLearningServices/workspaces/\{workspaceName\}/features' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/features",
    subscriptionId: string,
    resourceGroupName: string,
    workspaceName: string
  ): WorkspaceFeaturesList;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.MachineLearningServices/workspaces/skus' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.MachineLearningServices/workspaces/skus",
    subscriptionId: string
  ): WorkspaceSkusList;
}

export type MachineLearningServicesManagementClientRestClient = Client & {
  path: Routes;
};

export default function MachineLearningServicesManagementClient(
  credentials: TokenCredential,
  options: ClientOptions = {}
): MachineLearningServicesManagementClientRestClient {
  const baseUrl = options.baseUrl ?? "https://management.azure.com";
  options.apiVersion = options.apiVersion ?? "2021-03-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://management.azure.com/.default"]
    }
  };

  return getClient(
    baseUrl,
    credentials,
    options
  ) as MachineLearningServicesManagementClientRestClient;
}
