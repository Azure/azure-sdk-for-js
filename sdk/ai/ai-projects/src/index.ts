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
  EvaluationWithOptionalName,
  InputData,
  InputDataUnion,
  InputDataset,
  EvaluatorConfiguration,
  AgentEvaluationRequest,
  AgentEvaluationSamplingConfiguration,
  AgentEvaluationRedactionConfiguration,
  AgentEvaluation,
  AgentEvaluationResult,
  DatasetVersion,
  DatasetVersionUnion,
  DatasetType,
  FileDatasetVersion,
  FolderDatasetVersion,
  PendingUploadRequest,
  PendingUploadResponse,
  BlobReference,
  SasCredential,
  AssetCredentialResponse,
  Index,
  IndexUnion,
  IndexType,
  AzureAISearchIndex,
  FieldMapping,
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
  TargetConfig,
  TargetConfigUnion,
  AzureOpenAIModelConfiguration,
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
  DatasetsPendingUploadOptionalParams,
  DatasetsCreateOrUpdateOptionalParams,
  DatasetsDeleteOptionalParams,
  DatasetsGetOptionalParams,
  DatasetsListOptionalParams,
  DatasetsListVersionsOptionalParams,
} from "./api/datasets/index.js";
export {
  DeploymentsListOptionalParams,
  DeploymentsGetOptionalParams,
} from "./api/deployments/index.js";
export {
  EvaluationsCreateAgentEvaluationOptionalParams,
  EvaluationsCreateOptionalParams,
  EvaluationsListOptionalParams,
  EvaluationsGetOptionalParams,
} from "./api/evaluations/index.js";
export {
  IndexesCreateOrUpdateOptionalParams,
  IndexesDeleteOptionalParams,
  IndexesGetOptionalParams,
  IndexesListOptionalParams,
  IndexesListVersionsOptionalParams,
} from "./api/indexes/index.js";
export {
  RedTeamsCreateOptionalParams,
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
export { isUnexpected } from "@azure-rest/ai-inference";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
