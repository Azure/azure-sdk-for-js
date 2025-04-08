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
  AuthenticationType,
  Evaluation,
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
  EvaluationResult,
  ResultType,
  RedTeam,
  AttackStrategy,
  RiskCategory,
  ListViewType,
  RepeatabilityResult,
  PendingUploadType,
  KnownVersions,
} from "./models/index.js";
export { AIProjectClientOptionalParams } from "./api/index.js";
export {
  ConnectionsListOptionalParams,
  ConnectionsGetOptionalParams,
} from "./api/connections/index.js";
export {
  DatasetsStartPendingUploadOptionalParams,
  DatasetsStartPendingUploadVersionOptionalParams,
  DatasetsCreateVersionOptionalParams,
  DatasetsCreateOptionalParams,
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
  EvaluationResultsStartPendingUploadOptionalParams,
  EvaluationResultsCreateVersionOptionalParams,
  EvaluationResultsCreateOptionalParams,
  EvaluationResultsDeleteVersionOptionalParams,
  EvaluationResultsGetVersionOptionalParams,
  EvaluationResultsListLatestOptionalParams,
  EvaluationResultsListVersionsOptionalParams,
} from "./api/evaluationResults/index.js";
export {
  EvaluationsCreateRunOptionalParams,
  EvaluationsListOptionalParams,
  EvaluationsGetOptionalParams,
} from "./api/evaluations/index.js";
export {
  IndexesCreateVersionOptionalParams,
  IndexesCreateOptionalParams,
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
export {
  ConnectionsOperations,
  DatasetsOperations,
  DeploymentsOperations,
  EvaluationResultsOperations,
  EvaluationsOperations,
  IndexesOperations,
  RedTeamsOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
