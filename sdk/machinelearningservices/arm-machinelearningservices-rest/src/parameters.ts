// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  Workspace,
  WorkspaceUpdateParameters,
  QuotaUpdateParameters,
  ComputeResource,
  ClusterUpdateParameters,
  ComputeSchedules,
  PrivateEndpointConnection,
  WorkspaceConnection,
  PartialBatchEndpointPartialTrackedResource,
  BatchEndpointTrackedResource,
  PartialBatchDeploymentPartialTrackedResource,
  BatchDeploymentTrackedResource,
  CodeContainerResource,
  CodeVersionResource,
  DataContainerResource,
  DataVersionResource,
  DatastorePropertiesResource,
  EnvironmentContainerResource,
  EnvironmentSpecificationVersionResource,
  JobBaseResource,
  LabelingJobResource,
  ExportSummary,
  ModelContainerResource,
  ModelVersionResource,
  PartialOnlineEndpointPartialTrackedResource,
  OnlineEndpointTrackedResource,
  RegenerateEndpointKeysRequest,
  PartialOnlineDeploymentPartialTrackedResource,
  OnlineDeploymentTrackedResource,
  DeploymentLogsRequest
} from "./models";

export type OperationsListParameters = RequestParameters;
export type WorkspacesGetParameters = RequestParameters;

export interface WorkspacesCreateOrUpdateBodyParam {
  /** The parameters for creating or updating a machine learning workspace. */
  body: Workspace;
}

export type WorkspacesCreateOrUpdateParameters = WorkspacesCreateOrUpdateBodyParam &
  RequestParameters;
export type WorkspacesDeleteParameters = RequestParameters;

export interface WorkspacesUpdateBodyParam {
  /** The parameters for updating a machine learning workspace. */
  body: WorkspaceUpdateParameters;
}

export type WorkspacesUpdateParameters = WorkspacesUpdateBodyParam &
  RequestParameters;

export interface WorkspacesListByResourceGroupQueryParamProperties {
  /** Continuation token for pagination. */
  $skip?: string;
}

export interface WorkspacesListByResourceGroupQueryParam {
  queryParameters?: WorkspacesListByResourceGroupQueryParamProperties;
}

export type WorkspacesListByResourceGroupParameters = WorkspacesListByResourceGroupQueryParam &
  RequestParameters;
export type WorkspacesListKeysParameters = RequestParameters;
export type WorkspacesResyncKeysParameters = RequestParameters;

export interface WorkspacesListBySubscriptionQueryParamProperties {
  /** Continuation token for pagination. */
  $skip?: string;
}

export interface WorkspacesListBySubscriptionQueryParam {
  queryParameters?: WorkspacesListBySubscriptionQueryParamProperties;
}

export type WorkspacesListBySubscriptionParameters = WorkspacesListBySubscriptionQueryParam &
  RequestParameters;
export type WorkspacesListNotebookAccessTokenParameters = RequestParameters;
export type WorkspacesPrepareNotebookParameters = RequestParameters;
export type WorkspacesListStorageAccountKeysParameters = RequestParameters;
export type WorkspacesListNotebookKeysParameters = RequestParameters;
export type UsagesListParameters = RequestParameters;
export type VirtualMachineSizesListParameters = RequestParameters;

export interface QuotasUpdateBodyParam {
  /** Quota update parameters. */
  body: QuotaUpdateParameters;
}

export type QuotasUpdateParameters = QuotasUpdateBodyParam & RequestParameters;
export type QuotasListParameters = RequestParameters;

export interface ComputeListQueryParamProperties {
  /** Continuation token for pagination. */
  $skip?: string;
}

export interface ComputeListQueryParam {
  queryParameters?: ComputeListQueryParamProperties;
}

export type ComputeListParameters = ComputeListQueryParam & RequestParameters;
export type ComputeGetParameters = RequestParameters;

export interface ComputeCreateOrUpdateBodyParam {
  /** Payload with Machine Learning compute definition. */
  body: ComputeResource;
}

export type ComputeCreateOrUpdateParameters = ComputeCreateOrUpdateBodyParam &
  RequestParameters;

export interface ComputeUpdateBodyParam {
  /** Additional parameters for cluster update. */
  body: ClusterUpdateParameters;
}

export type ComputeUpdateParameters = ComputeUpdateBodyParam &
  RequestParameters;

export interface ComputeDeleteQueryParamProperties {
  /** Delete the underlying compute if 'Delete', or detach the underlying compute from workspace if 'Detach'. */
  underlyingResourceAction: "Delete" | "Detach";
}

export interface ComputeDeleteQueryParam {
  queryParameters: ComputeDeleteQueryParamProperties;
}

export type ComputeDeleteParameters = ComputeDeleteQueryParam &
  RequestParameters;
export type ComputeListNodesParameters = RequestParameters;
export type ComputeListKeysParameters = RequestParameters;
export type ComputeStartParameters = RequestParameters;
export type ComputeStopParameters = RequestParameters;
export type ComputeRestartParameters = RequestParameters;

export interface ComputeUpdateSchedulesBodyParam {
  /** The object for updating schedules of specified ComputeInstance. */
  body?: ComputeSchedules;
}

export type ComputeUpdateSchedulesParameters = ComputeUpdateSchedulesBodyParam &
  RequestParameters;
export type PrivateEndpointConnectionsListParameters = RequestParameters;
export type PrivateEndpointConnectionsGetParameters = RequestParameters;

export interface PrivateEndpointConnectionsCreateOrUpdateBodyParam {
  /** The private endpoint connection properties. */
  body: PrivateEndpointConnection;
}

export type PrivateEndpointConnectionsCreateOrUpdateParameters = PrivateEndpointConnectionsCreateOrUpdateBodyParam &
  RequestParameters;
export type PrivateEndpointConnectionsDeleteParameters = RequestParameters;
export type PrivateLinkResourcesListParameters = RequestParameters;

export interface WorkspaceConnectionsListQueryParamProperties {
  /** Target of the workspace connection. */
  target?: string;
  /** Category of the workspace connection. */
  category?: string;
}

export interface WorkspaceConnectionsListQueryParam {
  queryParameters?: WorkspaceConnectionsListQueryParamProperties;
}

export type WorkspaceConnectionsListParameters = WorkspaceConnectionsListQueryParam &
  RequestParameters;

export interface WorkspaceConnectionsCreateBodyParam {
  /** The object for creating or updating a new workspace connection */
  body: WorkspaceConnection;
}

export type WorkspaceConnectionsCreateParameters = WorkspaceConnectionsCreateBodyParam &
  RequestParameters;
export type WorkspaceConnectionsGetParameters = RequestParameters;
export type WorkspaceConnectionsDeleteParameters = RequestParameters;

export interface BatchEndpointsListQueryParamProperties {
  /** Number of endpoints to be retrieved in a page of results. */
  count?: number;
  /** Continuation token for pagination. */
  $skip?: string;
}

export interface BatchEndpointsListQueryParam {
  queryParameters?: BatchEndpointsListQueryParamProperties;
}

export type BatchEndpointsListParameters = BatchEndpointsListQueryParam &
  RequestParameters;
export type BatchEndpointsDeleteParameters = RequestParameters;
export type BatchEndpointsGetParameters = RequestParameters;

export interface BatchEndpointsUpdateBodyParam {
  /** Mutable batch inference endpoint definition object. */
  body: PartialBatchEndpointPartialTrackedResource;
}

export type BatchEndpointsUpdateParameters = BatchEndpointsUpdateBodyParam &
  RequestParameters;

export interface BatchEndpointsCreateOrUpdateBodyParam {
  /** Batch inference endpoint definition object. */
  body: BatchEndpointTrackedResource;
}

export type BatchEndpointsCreateOrUpdateParameters = BatchEndpointsCreateOrUpdateBodyParam &
  RequestParameters;
export type BatchEndpointsListKeysParameters = RequestParameters;

export interface BatchDeploymentsListQueryParamProperties {
  /** Ordering of list. */
  $orderBy?: string;
  /** Top of list. */
  $top?: number;
  /** Continuation token for pagination. */
  $skip?: string;
}

export interface BatchDeploymentsListQueryParam {
  queryParameters?: BatchDeploymentsListQueryParamProperties;
}

export type BatchDeploymentsListParameters = BatchDeploymentsListQueryParam &
  RequestParameters;
export type BatchDeploymentsDeleteParameters = RequestParameters;
export type BatchDeploymentsGetParameters = RequestParameters;

export interface BatchDeploymentsUpdateBodyParam {
  /** Batch inference deployment definition object. */
  body: PartialBatchDeploymentPartialTrackedResource;
}

export type BatchDeploymentsUpdateParameters = BatchDeploymentsUpdateBodyParam &
  RequestParameters;

export interface BatchDeploymentsCreateOrUpdateBodyParam {
  /** Batch inference deployment definition object. */
  body: BatchDeploymentTrackedResource;
}

export type BatchDeploymentsCreateOrUpdateParameters = BatchDeploymentsCreateOrUpdateBodyParam &
  RequestParameters;

export interface CodeContainersListQueryParamProperties {
  /** Continuation token for pagination. */
  $skip?: string;
}

export interface CodeContainersListQueryParam {
  queryParameters?: CodeContainersListQueryParamProperties;
}

export type CodeContainersListParameters = CodeContainersListQueryParam &
  RequestParameters;
export type CodeContainersDeleteParameters = RequestParameters;
export type CodeContainersGetParameters = RequestParameters;

export interface CodeContainersCreateOrUpdateBodyParam {
  /** Container entity to create or update. */
  body: CodeContainerResource;
}

export type CodeContainersCreateOrUpdateParameters = CodeContainersCreateOrUpdateBodyParam &
  RequestParameters;

export interface CodeVersionsListQueryParamProperties {
  /** Ordering of list. */
  $orderBy?: string;
  /** Maximum number of records to return. */
  $top?: number;
  /** Continuation token for pagination. */
  $skip?: string;
}

export interface CodeVersionsListQueryParam {
  queryParameters?: CodeVersionsListQueryParamProperties;
}

export type CodeVersionsListParameters = CodeVersionsListQueryParam &
  RequestParameters;
export type CodeVersionsDeleteParameters = RequestParameters;
export type CodeVersionsGetParameters = RequestParameters;

export interface CodeVersionsCreateOrUpdateBodyParam {
  /** Version entity to create or update. */
  body: CodeVersionResource;
}

export type CodeVersionsCreateOrUpdateParameters = CodeVersionsCreateOrUpdateBodyParam &
  RequestParameters;

export interface DataContainersListQueryParamProperties {
  /** Continuation token for pagination. */
  $skip?: string;
}

export interface DataContainersListQueryParam {
  queryParameters?: DataContainersListQueryParamProperties;
}

export type DataContainersListParameters = DataContainersListQueryParam &
  RequestParameters;
export type DataContainersDeleteParameters = RequestParameters;
export type DataContainersGetParameters = RequestParameters;

export interface DataContainersCreateOrUpdateBodyParam {
  /** Container entity to create or update. */
  body: DataContainerResource;
}

export type DataContainersCreateOrUpdateParameters = DataContainersCreateOrUpdateBodyParam &
  RequestParameters;

export interface DataVersionsListQueryParamProperties {
  /** Ordering of list. */
  $orderBy?: string;
  /** Maximum number of records to return. */
  $top?: number;
  /** Continuation token for pagination. */
  $skip?: string;
  /** Comma-separated list of tag names (and optionally values). Example: tag1,tag2=value2 */
  $tags?: string;
}

export interface DataVersionsListQueryParam {
  queryParameters?: DataVersionsListQueryParamProperties;
}

export type DataVersionsListParameters = DataVersionsListQueryParam &
  RequestParameters;
export type DataVersionsDeleteParameters = RequestParameters;
export type DataVersionsGetParameters = RequestParameters;

export interface DataVersionsCreateOrUpdateBodyParam {
  /** Version entity to create or update. */
  body: DataVersionResource;
}

export type DataVersionsCreateOrUpdateParameters = DataVersionsCreateOrUpdateBodyParam &
  RequestParameters;

export interface DatastoresListQueryParamProperties {
  /** Continuation token for pagination. */
  $skip?: string;
  /** Maximum number of results to return. */
  count?: number;
  /** Filter down to the workspace default datastore. */
  isDefault?: boolean;
  /** Names of datastores to return. */
  names?: Array<string>;
  /** Text to search for in the datastore names. */
  searchText?: string;
  /** Order by property (createdtime | modifiedtime | name). */
  orderBy?: string;
  /** Order by property in ascending order. */
  orderByAsc?: boolean;
}

export interface DatastoresListQueryParam {
  queryParameters?: DatastoresListQueryParamProperties;
}

export type DatastoresListParameters = DatastoresListQueryParam &
  RequestParameters;
export type DatastoresDeleteParameters = RequestParameters;
export type DatastoresGetParameters = RequestParameters;

export interface DatastoresCreateOrUpdateBodyParam {
  /** Datastore entity to create or update. */
  body: DatastorePropertiesResource;
}

export interface DatastoresCreateOrUpdateQueryParamProperties {
  /** Flag to skip validation. */
  skipValidation?: boolean;
}

export interface DatastoresCreateOrUpdateQueryParam {
  queryParameters?: DatastoresCreateOrUpdateQueryParamProperties;
}

export type DatastoresCreateOrUpdateParameters = DatastoresCreateOrUpdateQueryParam &
  DatastoresCreateOrUpdateBodyParam &
  RequestParameters;
export type DatastoresListSecretsParameters = RequestParameters;

export interface EnvironmentContainersListQueryParamProperties {
  /** Continuation token for pagination. */
  $skip?: string;
}

export interface EnvironmentContainersListQueryParam {
  queryParameters?: EnvironmentContainersListQueryParamProperties;
}

export type EnvironmentContainersListParameters = EnvironmentContainersListQueryParam &
  RequestParameters;
export type EnvironmentContainersDeleteParameters = RequestParameters;
export type EnvironmentContainersGetParameters = RequestParameters;

export interface EnvironmentContainersCreateOrUpdateBodyParam {
  /** Container entity to create or update. */
  body: EnvironmentContainerResource;
}

export type EnvironmentContainersCreateOrUpdateParameters = EnvironmentContainersCreateOrUpdateBodyParam &
  RequestParameters;

export interface EnvironmentSpecificationVersionsListQueryParamProperties {
  /** Ordering of list. */
  $orderBy?: string;
  /** Maximum number of records to return. */
  $top?: number;
  /** Continuation token for pagination. */
  $skip?: string;
}

export interface EnvironmentSpecificationVersionsListQueryParam {
  queryParameters?: EnvironmentSpecificationVersionsListQueryParamProperties;
}

export type EnvironmentSpecificationVersionsListParameters = EnvironmentSpecificationVersionsListQueryParam &
  RequestParameters;
export type EnvironmentSpecificationVersionsDeleteParameters = RequestParameters;
export type EnvironmentSpecificationVersionsGetParameters = RequestParameters;

export interface EnvironmentSpecificationVersionsCreateOrUpdateBodyParam {
  /** Definition of EnvironmentSpecificationVersion. */
  body: EnvironmentSpecificationVersionResource;
}

export type EnvironmentSpecificationVersionsCreateOrUpdateParameters = EnvironmentSpecificationVersionsCreateOrUpdateBodyParam &
  RequestParameters;

export interface JobsListQueryParamProperties {
  /** Continuation token for pagination. */
  $skip?: string;
  /** Type of job to be returned. */
  jobType?: string;
  /** Tags for job to be returned. */
  tags?: string;
  /** Jobs returned will have this tag key. */
  tag?: string;
}

export interface JobsListQueryParam {
  queryParameters?: JobsListQueryParamProperties;
}

export type JobsListParameters = JobsListQueryParam & RequestParameters;
export type JobsDeleteParameters = RequestParameters;
export type JobsGetParameters = RequestParameters;

export interface JobsCreateOrUpdateBodyParam {
  /** Job definition object. */
  body: JobBaseResource;
}

export type JobsCreateOrUpdateParameters = JobsCreateOrUpdateBodyParam &
  RequestParameters;
export type JobsCancelParameters = RequestParameters;

export interface LabelingJobsListQueryParamProperties {
  /** Continuation token for pagination. */
  $skip?: string;
  /** Number of labeling jobs to return. */
  count?: number;
}

export interface LabelingJobsListQueryParam {
  queryParameters?: LabelingJobsListQueryParamProperties;
}

export type LabelingJobsListParameters = LabelingJobsListQueryParam &
  RequestParameters;
export type LabelingJobsDeleteParameters = RequestParameters;

export interface LabelingJobsGetQueryParamProperties {
  /** Boolean value to indicate whether to include JobInstructions in response. */
  includeJobInstructions?: boolean;
  /** Boolean value to indicate Whether to include LabelCategories in response. */
  includeLabelCategories?: boolean;
}

export interface LabelingJobsGetQueryParam {
  queryParameters?: LabelingJobsGetQueryParamProperties;
}

export type LabelingJobsGetParameters = LabelingJobsGetQueryParam &
  RequestParameters;

export interface LabelingJobsCreateOrUpdateBodyParam {
  /** LabelingJob definition object. */
  body: LabelingJobResource;
}

export type LabelingJobsCreateOrUpdateParameters = LabelingJobsCreateOrUpdateBodyParam &
  RequestParameters;

export interface LabelingJobsExportLabelsBodyParam {
  /** The export summary. */
  body: ExportSummary;
}

export type LabelingJobsExportLabelsParameters = LabelingJobsExportLabelsBodyParam &
  RequestParameters;
export type LabelingJobsPauseParameters = RequestParameters;
export type LabelingJobsResumeParameters = RequestParameters;

export interface ModelContainersListQueryParamProperties {
  /** Continuation token for pagination. */
  $skip?: string;
  /** Maximum number of results to return. */
  count?: number;
}

export interface ModelContainersListQueryParam {
  queryParameters?: ModelContainersListQueryParamProperties;
}

export type ModelContainersListParameters = ModelContainersListQueryParam &
  RequestParameters;
export type ModelContainersDeleteParameters = RequestParameters;
export type ModelContainersGetParameters = RequestParameters;

export interface ModelContainersCreateOrUpdateBodyParam {
  /** Container entity to create or update. */
  body: ModelContainerResource;
}

export type ModelContainersCreateOrUpdateParameters = ModelContainersCreateOrUpdateBodyParam &
  RequestParameters;

export interface ModelVersionsListQueryParamProperties {
  /** Continuation token for pagination. */
  $skip?: string;
  /** Ordering of list. */
  $orderBy?: string;
  /** Maximum number of records to return. */
  $top?: number;
  /** Model version. */
  version?: string;
  /** Model description. */
  description?: string;
  /** Number of initial results to skip. */
  offset?: number;
  /** Comma-separated list of tag names (and optionally values). Example: tag1,tag2=value2 */
  tags?: string;
  /** Comma-separated list of property names (and optionally values). Example: prop1,prop2=value2 */
  properties?: string;
}

export interface ModelVersionsListQueryParam {
  queryParameters?: ModelVersionsListQueryParamProperties;
}

export type ModelVersionsListParameters = ModelVersionsListQueryParam &
  RequestParameters;
export type ModelVersionsDeleteParameters = RequestParameters;
export type ModelVersionsGetParameters = RequestParameters;

export interface ModelVersionsCreateOrUpdateBodyParam {
  /** Version entity to create or update. */
  body: ModelVersionResource;
}

export type ModelVersionsCreateOrUpdateParameters = ModelVersionsCreateOrUpdateBodyParam &
  RequestParameters;

export interface OnlineEndpointsListQueryParamProperties {
  /** Name of the endpoint. */
  name?: string;
  /** Number of endpoints to be retrieved in a page of results. */
  count?: number;
  /** EndpointComputeType to be filtered by. */
  computeType?: "Managed" | "K8S" | "AzureMLCompute";
  /** Continuation token for pagination. */
  $skip?: string;
  /** A set of tags with which to filter the returned models. It is a comma separated string of tags key or tags key=value. Example: tagKey1,tagKey2,tagKey3=value3 . */
  tags?: string;
  /** A set of properties with which to filter the returned models. It is a comma separated string of properties key and/or properties key=value Example: propKey1,propKey2,propKey3=value3 . */
  properties?: string;
  /** The option to order the response. */
  orderBy?: "CreatedAtDesc" | "CreatedAtAsc" | "UpdatedAtDesc" | "UpdatedAtAsc";
}

export interface OnlineEndpointsListQueryParam {
  queryParameters?: OnlineEndpointsListQueryParamProperties;
}

export type OnlineEndpointsListParameters = OnlineEndpointsListQueryParam &
  RequestParameters;
export type OnlineEndpointsDeleteParameters = RequestParameters;
export type OnlineEndpointsGetParameters = RequestParameters;

export interface OnlineEndpointsUpdateBodyParam {
  /** Online Endpoint entity to apply during operation. */
  body: PartialOnlineEndpointPartialTrackedResource;
}

export type OnlineEndpointsUpdateParameters = OnlineEndpointsUpdateBodyParam &
  RequestParameters;

export interface OnlineEndpointsCreateOrUpdateBodyParam {
  /** Online Endpoint entity to apply during operation. */
  body: OnlineEndpointTrackedResource;
}

export type OnlineEndpointsCreateOrUpdateParameters = OnlineEndpointsCreateOrUpdateBodyParam &
  RequestParameters;
export type OnlineEndpointsListKeysParameters = RequestParameters;

export interface OnlineEndpointsRegenerateKeysBodyParam {
  /** RegenerateKeys request . */
  body: RegenerateEndpointKeysRequest;
}

export type OnlineEndpointsRegenerateKeysParameters = OnlineEndpointsRegenerateKeysBodyParam &
  RequestParameters;
export type OnlineEndpointsGetTokenParameters = RequestParameters;

export interface OnlineDeploymentsListQueryParamProperties {
  /** Ordering of list. */
  $orderBy?: string;
  /** Top of list. */
  $top?: number;
  /** Continuation token for pagination. */
  $skip?: string;
}

export interface OnlineDeploymentsListQueryParam {
  queryParameters?: OnlineDeploymentsListQueryParamProperties;
}

export type OnlineDeploymentsListParameters = OnlineDeploymentsListQueryParam &
  RequestParameters;
export type OnlineDeploymentsDeleteParameters = RequestParameters;
export type OnlineDeploymentsGetParameters = RequestParameters;

export interface OnlineDeploymentsUpdateBodyParam {
  /** Online Endpoint entity to apply during operation. */
  body: PartialOnlineDeploymentPartialTrackedResource;
}

export type OnlineDeploymentsUpdateParameters = OnlineDeploymentsUpdateBodyParam &
  RequestParameters;

export interface OnlineDeploymentsCreateOrUpdateBodyParam {
  /** Inference Endpoint entity to apply during operation. */
  body: OnlineDeploymentTrackedResource;
}

export type OnlineDeploymentsCreateOrUpdateParameters = OnlineDeploymentsCreateOrUpdateBodyParam &
  RequestParameters;

export interface OnlineDeploymentsGetLogsBodyParam {
  /** The request containing parameters for retrieving logs. */
  body: DeploymentLogsRequest;
}

export type OnlineDeploymentsGetLogsParameters = OnlineDeploymentsGetLogsBodyParam &
  RequestParameters;
export type WorkspaceFeaturesListParameters = RequestParameters;
export type WorkspaceSkusListParameters = RequestParameters;
