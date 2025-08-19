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
  PendingUploadType,
  KnownVersions,
} from "./models/index.js";
export { AIProjectClientOptionalParams, DatasetUploadOptions } from "./api/index.js";
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
  IndexesCreateOrUpdateOptionalParams,
  IndexesDeleteOptionalParams,
  IndexesGetOptionalParams,
  IndexesListOptionalParams,
  IndexesListVersionsOptionalParams,
} from "./api/indexes/index.js";
export { AzureOpenAIClientOptions, GetAzureOpenAIClientOptions } from "./api/inference/options.js";
export { InferenceOperations } from "./classic/inference/index.js";
export { TelemetryOperations } from "./classic/telemetry/index.js";
export {
  ConnectionsOperations,
  DatasetsOperations,
  DeploymentsOperations,
  IndexesOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
