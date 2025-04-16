// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable tsdoc/syntax */

/** Response from the list and get connections operations */
export interface Connection {
  /** Discriminator property for Connection. */
  /** The discriminator possible values: */
  authType: string;
  /** The name of the resource */
  readonly name: string;
  /** Category of the connection */
  readonly type: ConnectionType;
  /** The connection URL to be used for this service */
  readonly target: string;
  /** Whether the connection is tagged as the default connection of its type */
  readonly isDefault: boolean;
  /** The credentials used by the connection */
  readonly credentials: BaseCredentialsUnion;
  /** Metadata of the connection */
  readonly metadata: Record<string, string>;
}

/** The Type (or category) of the connection */
export type ConnectionType =
  | "AzureOpenAI"
  | "AzureBlob"
  | "AzureStorageAccount"
  | "CognitiveSearch"
  | "CosmosDB"
  | "ApiKey"
  | "AppConfig"
  | "AppInsights"
  | "CustomKeys";

/** A base class for connection credentials */
export interface BaseCredentials {
  /** The type of credential used by the connection */
  /** The discriminator possible values: ApiKey, AAD, CustomKeys, SAS, None */
  readonly authType: CredentialType;
}

export function connectionDeserializer(item: any): Connection {
  return {
    name: item["name"],
    type: item["type"],
    target: item["target"],
    authType: item["authType"],
    metadata: item["metadata"],
    isDefault: item["isDefault"],
    credentials: item["credentials"]
      ? baseCredentialsUnionDeserializer(item["credentials"])
      : { authType: "None" },
  };
}

export function baseCredentialsDeserializer(item: any): BaseCredentials {
  return {
    authType: item["authType"],
  };
}

/** Alias for BaseCredentialsUnion */
export type BaseCredentialsUnion =
  | ApiKeyCredentials
  | EntraIDCredentials
  | CustomCredential
  | SASCredentials
  | NoAuthenticationCredentials
  | BaseCredentials;

export function baseCredentialsUnionDeserializer(item: any): BaseCredentialsUnion {
  switch (item.authType) {
    case "ApiKey":
      return apiKeyCredentialsDeserializer(item as ApiKeyCredentials);

    case "AAD":
      return entraIDCredentialsDeserializer(item as EntraIDCredentials);

    case "CustomKeys":
      return customCredentialDeserializer(item as CustomCredential);

    case "SAS":
      return sasCredentialsDeserializer(item as SASCredentials);

    case "None":
      return noAuthenticationCredentialsDeserializer(item as NoAuthenticationCredentials);

    default:
      return baseCredentialsDeserializer(item);
  }
}

/** The credential type used by the connection */
export type CredentialType = "ApiKey" | "AAD" | "SAS" | "CustomKeys" | "None";

/** API Key Credential definition */
export interface ApiKeyCredentials extends BaseCredentials {
  /** The credentail type */
  readonly authType: "ApiKey";
  /** API Key */
  readonly apiKey?: string;
}

export function apiKeyCredentialsDeserializer(item: any): ApiKeyCredentials {
  return {
    authType: item["authType"],
    apiKey: item["apiKey"],
  };
}

/** Entra ID credential definition */
export interface EntraIDCredentials extends BaseCredentials {
  /** The credential type */
  readonly authType: "AAD";
}

export function entraIDCredentialsDeserializer(item: any): EntraIDCredentials {
  return {
    authType: item["authType"],
  };
}

/** Custom credential defintion */
export interface CustomCredential extends BaseCredentials {
  /** The credential type */
  readonly authType: "CustomKeys";
}

export function customCredentialDeserializer(item: any): CustomCredential {
  return {
    authType: item["authType"],
  };
}

/** Shared Access Signature (SAS) credential definition */
export interface SASCredentials extends BaseCredentials {
  /** The credential type */
  readonly authType: "SAS";
  /** SAS token */
  readonly sasToken?: string;
}

export function sasCredentialsDeserializer(item: any): SASCredentials {
  return {
    authType: item["authType"],
    sasToken: item["sasToken"],
  };
}

/** Credentials that do not require authentication */
export interface NoAuthenticationCredentials extends BaseCredentials {
  /** The credential type */
  readonly authType: "None";
}

export function noAuthenticationCredentialsDeserializer(item: any): NoAuthenticationCredentials {
  return {
    authType: item["authType"],
  };
}

/** Paged collection of Connection items */
export interface _PagedConnection {
  /** The Connection items on this page */
  value: Connection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedConnectionDeserializer(item: any): _PagedConnection {
  return {
    value: connectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function connectionArrayDeserializer(result: Array<Connection>): any[] {
  return result.map((item) => {
    return connectionDeserializer(item);
  });
}

/** Evaluation Definition */
export interface Evaluation {
  /** Identifier of the evaluation. */
  readonly id: string;
  /** Data for evaluation. */
  data: InputDataUnion;
  /** Display Name for evaluation. It helps to find the evaluation easily in AI Foundry. It does not need to be unique. */
  displayName?: string;
  /** Description of the evaluation. It can be used to store additional information about the evaluation and is mutable. */
  description?: string;
  /** Status of the evaluation. It is set by service and is read-only. */
  readonly status?: string;
  /** Evaluation's tags. Unlike properties, tags are fully mutable. */
  tags?: Record<string, string>;
  /** Evaluation's properties. Unlike tags, properties are add-only. Once added, a property cannot be removed. */
  properties?: Record<string, string>;
  /** Evaluators to be used for the evaluation. */
  evaluators: Record<string, EvaluatorConfiguration>;
}

export function evaluationSerializer(item: Evaluation): any {
  return {
    data: inputDataUnionSerializer(item["data"]),
    displayName: item["displayName"],
    description: item["description"],
    tags: item["tags"],
    properties: item["properties"],
    evaluators: evaluatorConfigurationRecordSerializer(item["evaluators"]),
  };
}

export function evaluationDeserializer(item: any): Evaluation {
  return {
    id: item["id"],
    data: inputDataUnionDeserializer(item["data"]),
    displayName: item["displayName"],
    description: item["description"],
    status: item["status"],
    tags: item["tags"],
    properties: item["properties"],
    evaluators: evaluatorConfigurationRecordDeserializer(item["evaluators"]),
  };
}

/** Abstract data class. */
export interface InputData {
  /** Type of the data */
  /** The discriminator possible values: dataset */
  type: string;
}

export function inputDataSerializer(item: InputData): any {
  return { type: item["type"] };
}

export function inputDataDeserializer(item: any): InputData {
  return {
    type: item["type"],
  };
}

/** Alias for InputDataUnion */
export type InputDataUnion = InputDataset | InputData;

export function inputDataUnionSerializer(item: InputDataUnion): any {
  switch (item.type) {
    case "dataset":
      return inputDatasetSerializer(item as InputDataset);

    default:
      return inputDataSerializer(item);
  }
}

export function inputDataUnionDeserializer(item: any): InputDataUnion {
  switch (item.type) {
    case "dataset":
      return inputDatasetDeserializer(item as InputDataset);

    default:
      return inputDataDeserializer(item);
  }
}

/** Dataset as source for evaluation. */
export interface InputDataset extends InputData {
  type: "dataset";
  /** Evaluation input data */
  id: string;
}

export function inputDatasetSerializer(item: InputDataset): any {
  return { type: item["type"], id: item["id"] };
}

export function inputDatasetDeserializer(item: any): InputDataset {
  return {
    type: item["type"],
    id: item["id"],
  };
}

export function evaluatorConfigurationRecordSerializer(
  item: Record<string, EvaluatorConfiguration>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : evaluatorConfigurationSerializer(item[key]);
  });
  return result;
}

export function evaluatorConfigurationRecordDeserializer(
  item: Record<string, any>,
): Record<string, EvaluatorConfiguration> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : evaluatorConfigurationDeserializer(item[key]);
  });
  return result;
}

/** Evaluator Configuration */
export interface EvaluatorConfiguration {
  /** Identifier of the evaluator. */
  id: string;
  /** Initialization parameters of the evaluator. */
  initParams?: Record<string, any>;
  /** Data parameters of the evaluator. */
  dataMapping?: Record<string, string>;
}

export function evaluatorConfigurationSerializer(item: EvaluatorConfiguration): any {
  return {
    id: item["id"],
    initParams: item["initParams"],
    dataMapping: item["dataMapping"],
  };
}

export function evaluatorConfigurationDeserializer(item: any): EvaluatorConfiguration {
  return {
    id: item["id"],
    initParams: item["initParams"],
    dataMapping: item["dataMapping"],
  };
}

/** Paged collection of Evaluation items */
export interface _PagedEvaluation {
  /** The Evaluation items on this page */
  value: Evaluation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedEvaluationDeserializer(item: any): _PagedEvaluation {
  return {
    value: evaluationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function evaluationArraySerializer(result: Array<Evaluation>): any[] {
  return result.map((item) => {
    return evaluationSerializer(item);
  });
}

export function evaluationArrayDeserializer(result: Array<Evaluation>): any[] {
  return result.map((item) => {
    return evaluationDeserializer(item);
  });
}

/** Paged collection of DatasetVersion items */
export interface _PagedDatasetVersion {
  /** The DatasetVersion items on this page */
  value: DatasetVersionUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedDatasetVersionDeserializer(item: any): _PagedDatasetVersion {
  return {
    value: datasetVersionUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function datasetVersionUnionArraySerializer(result: Array<DatasetVersionUnion>): any[] {
  return result.map((item) => {
    return datasetVersionUnionSerializer(item);
  });
}

export function datasetVersionUnionArrayDeserializer(result: Array<DatasetVersionUnion>): any[] {
  return result.map((item) => {
    return datasetVersionUnionDeserializer(item);
  });
}

/** DatasetVersion Definition */
export interface DatasetVersion {
  /** [Required] Uri of the data. Example: https://go.microsoft.com/fwlink/?linkid=2202330 */
  datasetUri: string;
  /** Dataset type */
  /** The discriminator possible values: uri_file, uri_folder */
  type: DatasetType;
  /** Indicates if dataset is reference only or managed by dataset service. If true, the underlying data will be deleted when the dataset version is deleted */
  readonly isReference?: boolean;
  /** Asset stage */
  stage?: string;
  /** A unique identifier for the asset, assetId probably? */
  readonly id?: string;
  /** The name of the resource */
  readonly name: string;
  /** The version of the resource */
  readonly version: string;
  /** The asset description text. */
  description?: string;
  /** Tag dictionary. Tags can be added, removed, and updated. */
  tags?: Record<string, string>;
}

export function datasetVersionSerializer(item: DatasetVersion): any {
  return {
    datasetUri: item["datasetUri"],
    type: item["type"],
    stage: item["stage"],
    description: item["description"],
    tags: item["tags"],
  };
}

export function datasetVersionDeserializer(item: any): DatasetVersion {
  return {
    datasetUri: item["datasetUri"],
    type: item["type"],
    isReference: item["isReference"],
    stage: item["stage"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    tags: item["tags"],
  };
}

/** Alias for DatasetVersionUnion */
export type DatasetVersionUnion = FileDatasetVersion | FolderDatasetVersion | DatasetVersion;

export function datasetVersionUnionSerializer(item: DatasetVersionUnion): any {
  switch (item.type) {
    case "uri_file":
      return fileDatasetVersionSerializer(item as FileDatasetVersion);

    case "uri_folder":
      return folderDatasetVersionSerializer(item as FolderDatasetVersion);

    default:
      return datasetVersionSerializer(item);
  }
}

export function datasetVersionUnionDeserializer(item: any): DatasetVersionUnion {
  switch (item.type) {
    case "uri_file":
      return fileDatasetVersionDeserializer(item as FileDatasetVersion);

    case "uri_folder":
      return folderDatasetVersionDeserializer(item as FolderDatasetVersion);

    default:
      return datasetVersionDeserializer(item);
  }
}

/** Enum to determine the type of data. */
export type DatasetType = "uri_file" | "uri_folder";

/** FileDatasetVersion Definition */
export interface FileDatasetVersion extends DatasetVersion {
  /** Dataset type */
  type: "uri_file";
  /** Indicates OpenAI Purpose. FileDatasets created with this field will be compatible with OpenAI-specific features */
  openAIPurpose: string;
}

export function fileDatasetVersionSerializer(item: FileDatasetVersion): any {
  return {
    datasetUri: item["datasetUri"],
    type: item["type"],
    stage: item["stage"],
    description: item["description"],
    tags: item["tags"],
    openAIPurpose: item["openAIPurpose"],
  };
}

export function fileDatasetVersionDeserializer(item: any): FileDatasetVersion {
  return {
    datasetUri: item["datasetUri"],
    type: item["type"],
    isReference: item["isReference"],
    stage: item["stage"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    tags: item["tags"],
    openAIPurpose: item["openAIPurpose"],
  };
}

/** FileDatasetVersion Definition */
export interface FolderDatasetVersion extends DatasetVersion {
  /** Dataset type */
  type: "uri_folder";
}

export function folderDatasetVersionSerializer(item: FolderDatasetVersion): any {
  return {
    datasetUri: item["datasetUri"],
    type: item["type"],
    stage: item["stage"],
    description: item["description"],
    tags: item["tags"],
  };
}

export function folderDatasetVersionDeserializer(item: any): FolderDatasetVersion {
  return {
    datasetUri: item["datasetUri"],
    type: item["type"],
    isReference: item["isReference"],
    stage: item["stage"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    tags: item["tags"],
  };
}

/** Represents a request for a pending upload. */
export interface PendingUploadRequest {
  /** If PendingUploadId is not provided, a random GUID will be used. */
  pendingUploadId?: string;
  /** Name of Azure blob storage connection to use for generating temporary SAS token */
  connectionName?: string;
  /** TemporaryBlobReference is the only supported type. */
  pendingUploadType: "TemporaryBlobReference";
}

export function pendingUploadRequestSerializer(item: PendingUploadRequest): any {
  return {
    pendingUploadId: item["pendingUploadId"],
    connectionName: item["connectionName"],
    pendingUploadType: item["pendingUploadType"],
  };
}

/** Represents the response for a pending upload request */
export interface PendingUploadResponse {
  /** Container-level read, write, list SAS. */
  blobReferenceForConsumption: BlobReferenceForConsumption;
  /** ID for this upload request. */
  pendingUploadId: string;
  /** Version of dataset to be created if user did not specify version when initially creating upload */
  datasetVersion?: string;
  /** TemporaryBlobReference is the only supported type */
  pendingUploadType: "TemporaryBlobReference";
}

export function pendingUploadResponseDeserializer(item: any): PendingUploadResponse {
  return {
    blobReferenceForConsumption: blobReferenceForConsumptionDeserializer(
      item["blobReferenceForConsumption"],
    ),
    pendingUploadId: item["pendingUploadId"],
    datasetVersion: item["datasetVersion"],
    pendingUploadType: item["pendingUploadType"],
  };
}

/** Represents a reference to a blob for consumption */
export interface BlobReferenceForConsumption {
  /** Blob URI path for client to upload data. Example: https://blob.windows.core.net/Container/Path */
  blobUri: string;
  /** ARM ID of the storage account to use. */
  storageAccountArmId: string;
  /** Credential info to access the storage account. */
  credential: SasCredential;
}

export function blobReferenceForConsumptionDeserializer(item: any): BlobReferenceForConsumption {
  return {
    blobUri: item["blobUri"],
    storageAccountArmId: item["storageAccountArmId"],
    credential: sasCredentialDeserializer(item["credential"]),
  };
}

/** SAS Credential definition */
export interface SasCredential {
  /** SAS uri */
  readonly sasUri: string;
  /** Type of credential */
  readonly type: "SAS";
}

export function sasCredentialDeserializer(item: any): SasCredential {
  return {
    sasUri: item["sasUri"],
    type: item["type"],
  };
}

/** model interface _GetCredentialsRequest */
export interface _GetCredentialsRequest {}

export function _getCredentialsRequestSerializer(item: _GetCredentialsRequest): any {
  return item;
}

/** Represents a reference to a blob for consumption */
export interface AssetCredentialResponse {
  /** Credential info to access the storage account. */
  blobReferenceForConsumption: BlobReferenceForConsumption;
}

export function assetCredentialResponseDeserializer(item: any): AssetCredentialResponse {
  return {
    blobReferenceForConsumption: blobReferenceForConsumptionDeserializer(
      item["blobReferenceForConsumption"],
    ),
  };
}

/** Paged collection of Index items */
export interface _PagedIndex {
  /** The Index items on this page */
  value: IndexUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedIndexDeserializer(item: any): _PagedIndex {
  return {
    value: indexUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function indexUnionArraySerializer(result: Array<IndexUnion>): any[] {
  return result.map((item) => {
    return indexUnionSerializer(item);
  });
}

export function indexUnionArrayDeserializer(result: Array<IndexUnion>): any[] {
  return result.map((item) => {
    return indexUnionDeserializer(item);
  });
}

/** Index resource Definition */
export interface Index {
  /** Type of index */
  /** The discriminator possible values: AzureSearch, ManagedAzureSearch, CosmosDBNoSqlVectorStore */
  type: IndexType;
  /** Asset stage */
  stage?: string;
  /** A unique identifier for the asset, assetId probably? */
  readonly id?: string;
  /** The name of the resource */
  readonly name: string;
  /** The version of the resource */
  readonly version: string;
  /** The asset description text. */
  description?: string;
  /** Tag dictionary. Tags can be added, removed, and updated. */
  tags?: Record<string, string>;
}

export function indexSerializer(item: Index): any {
  return {
    type: item["type"],
    stage: item["stage"],
    description: item["description"],
    tags: item["tags"],
  };
}

export function indexDeserializer(item: any): Index {
  return {
    type: item["type"],
    stage: item["stage"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    tags: item["tags"],
  };
}

/** Alias for IndexUnion */
export type IndexUnion = AzureAISearchIndex | ManagedAzureAISearchIndex | CosmosDBIndex | Index;

export function indexUnionSerializer(item: IndexUnion): any {
  switch (item.type) {
    case "AzureSearch":
      return azureAISearchIndexSerializer(item as AzureAISearchIndex);

    case "ManagedAzureSearch":
      return managedAzureAISearchIndexSerializer(item as ManagedAzureAISearchIndex);

    case "CosmosDBNoSqlVectorStore":
      return cosmosDBIndexSerializer(item as CosmosDBIndex);

    default:
      return indexSerializer(item);
  }
}

export function indexUnionDeserializer(item: any): IndexUnion {
  switch (item.type) {
    case "AzureSearch":
      return azureAISearchIndexDeserializer(item as AzureAISearchIndex);

    case "ManagedAzureSearch":
      return managedAzureAISearchIndexDeserializer(item as ManagedAzureAISearchIndex);

    case "CosmosDBNoSqlVectorStore":
      return cosmosDBIndexDeserializer(item as CosmosDBIndex);

    default:
      return indexDeserializer(item);
  }
}

/** Type of IndexType */
export type IndexType = "AzureSearch" | "CosmosDBNoSqlVectorStore" | "ManagedAzureSearch";

/** Azure AI Search Index Definition */
export interface AzureAISearchIndex extends Index {
  /** Type of index */
  type: "AzureSearch";
  /** Name of connection to Azure AI Search */
  connectionName: string;
  /** Name of index in Azure AI Search resource to attach */
  indexName: string;
}

export function azureAISearchIndexSerializer(item: AzureAISearchIndex): any {
  return {
    type: item["type"],
    stage: item["stage"],
    description: item["description"],
    tags: item["tags"],
    connectionName: item["connectionName"],
    indexName: item["indexName"],
  };
}

export function azureAISearchIndexDeserializer(item: any): AzureAISearchIndex {
  return {
    type: item["type"],
    stage: item["stage"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    tags: item["tags"],
    connectionName: item["connectionName"],
    indexName: item["indexName"],
  };
}

/** Managed Azure AI Search Index Definition */
export interface ManagedAzureAISearchIndex extends Index {
  /** Type of index */
  type: "ManagedAzureSearch";
  /** Vector store id of managed index */
  vectorStoreId: string;
}

export function managedAzureAISearchIndexSerializer(item: ManagedAzureAISearchIndex): any {
  return {
    type: item["type"],
    stage: item["stage"],
    description: item["description"],
    tags: item["tags"],
    vectorStoreId: item["vectorStoreId"],
  };
}

export function managedAzureAISearchIndexDeserializer(item: any): ManagedAzureAISearchIndex {
  return {
    type: item["type"],
    stage: item["stage"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    tags: item["tags"],
    vectorStoreId: item["vectorStoreId"],
  };
}

/** CosmosDB Vector Store Index Definition */
export interface CosmosDBIndex extends Index {
  /** Type of index */
  type: "CosmosDBNoSqlVectorStore";
  /** Name of connection to CosmosDB */
  connectionName: string;
  /** Name of the CosmosDB Database */
  databaseName: string;
  /** Name of CosmosDB Container */
  containerName: string;
  /** Embedding model configuration */
  embeddingConfiguration: EmbeddingConfiguration;
}

export function cosmosDBIndexSerializer(item: CosmosDBIndex): any {
  return {
    type: item["type"],
    stage: item["stage"],
    description: item["description"],
    tags: item["tags"],
    connectionName: item["connectionName"],
    databaseName: item["databaseName"],
    containerName: item["containerName"],
    embeddingConfiguration: embeddingConfigurationSerializer(item["embeddingConfiguration"]),
  };
}

export function cosmosDBIndexDeserializer(item: any): CosmosDBIndex {
  return {
    type: item["type"],
    stage: item["stage"],
    id: item["id"],
    name: item["name"],
    version: item["version"],
    description: item["description"],
    tags: item["tags"],
    connectionName: item["connectionName"],
    databaseName: item["databaseName"],
    containerName: item["containerName"],
    embeddingConfiguration: embeddingConfigurationDeserializer(item["embeddingConfiguration"]),
  };
}

/** Embedding configuration class */
export interface EmbeddingConfiguration {
  /** Deployment name of embedding model. It can point to a model deployment either in the parent AIServices or a connection. */
  modelDeploymentName: string;
  /** Embedding field */
  embeddingField: string;
}

export function embeddingConfigurationSerializer(item: EmbeddingConfiguration): any {
  return {
    modelDeploymentName: item["modelDeploymentName"],
    embeddingField: item["embeddingField"],
  };
}

export function embeddingConfigurationDeserializer(item: any): EmbeddingConfiguration {
  return {
    modelDeploymentName: item["modelDeploymentName"],
    embeddingField: item["embeddingField"],
  };
}

/** Model Deployment Definition */
export interface Deployment {
  /** The type of the deployment */
  /** The discriminator possible values: ModelDeployment */
  type: DeploymentType;
  /** Name of the deployment */
  readonly name: string;
}

export function deploymentDeserializer(item: any): Deployment {
  return {
    type: item["type"],
    name: item["name"],
  };
}

/** Alias for DeploymentUnion */
export type DeploymentUnion = ModelDeployment | Deployment;

export function deploymentUnionDeserializer(item: any): DeploymentUnion {
  switch (item.type) {
    case "ModelDeployment":
      return modelDeploymentDeserializer(item as ModelDeployment);

    default:
      return deploymentDeserializer(item);
  }
}

/** Type of DeploymentType */
export type DeploymentType = "ModelDeployment";

/** Model Deployment Definition */
export interface ModelDeployment extends Deployment {
  /** The type of the deployment */
  type: "ModelDeployment";
  /** Publisher-specific name of the deployed model */
  readonly modelName: string;
  /** Publisher-specific version of the deployed model */
  readonly modelVersion: string;
  /** Name of the deployed model's publisher */
  readonly modelPublisher: string;
  /** Capabilities of deployed model */
  readonly capabilities: Record<string, string>;
  /** Sku of the model deployment */
  readonly sku: Sku;
  /** Name of the connection the deployment comes from */
  readonly connectionName?: string;
}

export function modelDeploymentDeserializer(item: any): ModelDeployment {
  return {
    type: item["type"],
    name: item["name"],
    modelName: item["modelName"],
    modelVersion: item["modelVersion"],
    modelPublisher: item["modelPublisher"],
    capabilities: item["capabilities"],
    sku: skuDeserializer(item["sku"]),
    connectionName: item["connectionName"],
  };
}

/** Sku information */
export interface Sku {
  /** Sku capacity */
  capacity: number;
  /** Sku family */
  family: string;
  /** Sku name */
  name: string;
  /** Sku size */
  size: string;
  /** Sku tier */
  tier: string;
}

export function skuDeserializer(item: any): Sku {
  return {
    capacity: item["capacity"],
    family: item["family"],
    name: item["name"],
    size: item["size"],
    tier: item["tier"],
  };
}

/** Paged collection of Deployment items */
export interface _PagedDeployment {
  /** The Deployment items on this page */
  value: DeploymentUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedDeploymentDeserializer(item: any): _PagedDeployment {
  return {
    value: deploymentUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deploymentUnionArrayDeserializer(result: Array<DeploymentUnion>): any[] {
  return result.map((item) => {
    return deploymentUnionDeserializer(item);
  });
}

/** Red team details. */
export interface RedTeam {
  /** Identifier of the red team. */
  readonly id: string;
  /** Name of the red-team scan. */
  scanName: string;
  /** Number of simulation rounds. */
  numTurns: number;
  /** List of attack strategies or nested lists of attack strategies. */
  attackStrategy: AttackStrategy[];
  /** Simulation-only or Simulation + Evaluation. Default false, if true the scan outputs conversation not evaluation result. */
  simulationOnly: boolean;
  /** List of risk categories to generate attack objectives for. */
  riskCategories: RiskCategory[];
  /** Application scenario for the red team operation, to generate scenario specific attacks. */
  applicationScenario?: string;
  /** Red team's tags. Unlike properties, tags are fully mutable. */
  tags?: Record<string, string>;
  /** Red team's properties. Unlike tags, properties are add-only. Once added, a property cannot be removed. */
  properties?: Record<string, string>;
  /** Status of the red-team. It is set by service and is read-only. */
  readonly status?: string;
}

export function redTeamSerializer(item: RedTeam): any {
  return {
    scanName: item["scanName"],
    numTurns: item["numTurns"],
    attackStrategy: item["attackStrategy"].map((p: any) => {
      return p;
    }),
    simulationOnly: item["simulationOnly"],
    riskCategories: item["riskCategories"].map((p: any) => {
      return p;
    }),
    applicationScenario: item["applicationScenario"],
    tags: item["tags"],
    properties: item["properties"],
  };
}

export function redTeamDeserializer(item: any): RedTeam {
  return {
    id: item["id"],
    scanName: item["scanName"],
    numTurns: item["numTurns"],
    attackStrategy: item["attackStrategy"].map((p: any) => {
      return p;
    }),
    simulationOnly: item["simulationOnly"],
    riskCategories: item["riskCategories"].map((p: any) => {
      return p;
    }),
    applicationScenario: item["applicationScenario"],
    tags: item["tags"],
    properties: item["properties"],
    status: item["status"],
  };
}

/** Strategies for attacks. */
export type AttackStrategy =
  | "easy"
  | "ascii_art"
  | "ascii_smuggler"
  | "atbash"
  | "base64"
  | "binary"
  | "caesar"
  | "character_space"
  | "jailbreak";
/** Risk category for the attack objective. */
export type RiskCategory =
  | "HateUnfairness"
  | "Violence"
  | "Sexual"
  | "SelfHarm"
  | "ProtectedMaterial"
  | "CodeVulnerability"
  | "UngroundedAttributes";

/** Paged collection of RedTeam items */
export interface _PagedRedTeam {
  /** The RedTeam items on this page */
  value: RedTeam[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedRedTeamDeserializer(item: any): _PagedRedTeam {
  return {
    value: redTeamArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function redTeamArraySerializer(result: Array<RedTeam>): any[] {
  return result.map((item) => {
    return redTeamSerializer(item);
  });
}

export function redTeamArrayDeserializer(result: Array<RedTeam>): any[] {
  return result.map((item) => {
    return redTeamDeserializer(item);
  });
}

/** List View Type Definition */
export type ListViewType = "ActiveOnly" | "ArchivedOnly" | "All";
/** The type of pending upload. */
export type PendingUploadType = "None" | "TemporaryBlobReference";

/** Azure AI Projects API versions */
export enum KnownVersions {
  /** Azure AI API version 2025-05-01. */
  V20250501 = "2025-05-01",
  /** Azure AI API version 2025-05-15-preview. */
  V20250515Preview = "2025-05-15-preview",
}
