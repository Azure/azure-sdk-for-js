// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AIProjectClient } from "./aiProjectClient.js";
export {
  Connection,
  ConnectionType,
  BaseCredentials,
  BaseCredentialsUnion,
  CredentialType,
  ApiKeyCredentials,
  EntraIDCredentials,
  CustomCredential,
  SASCredentials,
  NoAuthenticationCredentials,
  Evaluation,
  EvaluatorId,
  EvaluatorIds,
  EvaluationWithOptionalId,
  InputData,
  InputDataUnion,
  InputDataset,
  EvaluatorConfiguration,
  DatasetVersion,
  DatasetVersionUnion,
  DatasetType,
  FileDatasetVersion,
  FolderDatasetVersion,
  PendingUploadRequest,
  PendingUploadResponse,
  BlobReferenceForConsumption,
  SasCredential,
  AssetCredentialResponse,
  Index,
  IndexUnion,
  IndexType,
  AzureAISearchIndex,
  ManagedAzureAISearchIndex,
  CosmosDBIndex,
  EmbeddingConfiguration,
  Deployment,
  DeploymentUnion,
  DeploymentType,
  ModelDeployment,
  Sku,
  RedTeam,
  AttackStrategy,
  RiskCategory,
  ListViewType,
  PendingUploadType,
  KnownVersions,
} from "./models/index.js";
export { AIProjectClientOptionalParams } from "./api/index.js";
export {
  ConnectionsListOptionalParams,
  ConnectionsGetWithCredentialsOptionalParams,
  ConnectionsGetOptionalParams,
} from "./api/connections/index.js";
export {
  DatasetsGetCredentialsOptionalParams,
  DatasetsStartPendingUploadVersionOptionalParams,
  DatasetsUploadFileAndCreateOptionalParams,
  DatasetsUploadFolderAndCreateOptionalParams,
  DatasetsCreateVersionOptionalParams,
  DatasetsDeleteVersionOptionalParams,
  DatasetsGetVersionOptionalParams,
  DatasetsListLatestOptionalParams,
  DatasetsListVersionsOptionalParams,
} from "./api/datasets/index.js";
export {
  DeploymentsListOptionalParams,
  DeploymentsGetOptionalParams,
} from "./api/deployments/index.js";
export {
  EvaluationsCreateRunOptionalParams,
  EvaluationsListOptionalParams,
  EvaluationsGetOptionalParams,
} from "./api/evaluations/index.js";
export {
  IndexesCreateVersionOptionalParams,
  IndexesDeleteVersionOptionalParams,
  IndexesGetVersionOptionalParams,
  IndexesListLatestOptionalParams,
  IndexesListVersionsOptionalParams,
} from "./api/indexes/index.js";
export {
  RedTeamsCreateRunOptionalParams,
  RedTeamsListOptionalParams,
  RedTeamsGetOptionalParams,
} from "./api/redTeams/index.js";
export { TelemetryOperations, EnableTelemetryType } from "./classic/telemetry/index.js";
export {
  ConnectionsOperations,
  DatasetsOperations,
  DeploymentsOperations,
  EvaluationsOperations,
  IndexesOperations,
  RedTeamsOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
