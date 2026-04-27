// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  SearchIndexerDataIdentityUnion,
  VectorSearchVectorizerKind,
  AzureOpenAIVectorizerParameters,
  KnowledgeBaseModelUnion,
  KnowledgeSourceKind,
  IndexingSchedule,
  KnowledgeSourceIngestionPermissionOption,
  KnowledgeSourceContentExtractionMode,
  KnowledgeSourceSynchronizationStatus,
} from "../indexes/models.js";
import {
  searchIndexerDataIdentityUnionSerializer,
  searchIndexerDataIdentityUnionDeserializer,
  azureOpenAIVectorizerParametersSerializer,
  azureOpenAIVectorizerParametersDeserializer,
  knowledgeBaseModelUnionSerializer,
  knowledgeBaseModelUnionDeserializer,
  indexingScheduleSerializer,
  indexingScheduleDeserializer,
} from "../indexes/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/** Base type for reasoning effort. */
export interface KnowledgeRetrievalReasoningEffort {
  /** The kind of reasoning effort. */
  /** The discriminator possible values: minimal, low, medium */
  kind: KnowledgeRetrievalReasoningEffortKind;
}

export function knowledgeRetrievalReasoningEffortSerializer(
  item: KnowledgeRetrievalReasoningEffort,
): any {
  return { kind: item["kind"] };
}

export function knowledgeRetrievalReasoningEffortDeserializer(
  item: any,
): KnowledgeRetrievalReasoningEffort {
  return {
    kind: item["kind"],
  };
}

/** Alias for KnowledgeRetrievalReasoningEffortUnion */
export type KnowledgeRetrievalReasoningEffortUnion =
  | KnowledgeRetrievalMinimalReasoningEffort
  | KnowledgeRetrievalLowReasoningEffort
  | KnowledgeRetrievalMediumReasoningEffort
  | KnowledgeRetrievalReasoningEffort;

export function knowledgeRetrievalReasoningEffortUnionSerializer(
  item: KnowledgeRetrievalReasoningEffortUnion,
): any {
  switch (item.kind) {
    case "minimal":
      return knowledgeRetrievalMinimalReasoningEffortSerializer(
        item as KnowledgeRetrievalMinimalReasoningEffort,
      );

    case "low":
      return knowledgeRetrievalLowReasoningEffortSerializer(
        item as KnowledgeRetrievalLowReasoningEffort,
      );

    case "medium":
      return knowledgeRetrievalMediumReasoningEffortSerializer(
        item as KnowledgeRetrievalMediumReasoningEffort,
      );

    default:
      return knowledgeRetrievalReasoningEffortSerializer(item);
  }
}

export function knowledgeRetrievalReasoningEffortUnionDeserializer(
  item: any,
): KnowledgeRetrievalReasoningEffortUnion {
  switch (item["kind"]) {
    case "minimal":
      return knowledgeRetrievalMinimalReasoningEffortDeserializer(
        item as KnowledgeRetrievalMinimalReasoningEffort,
      );

    case "low":
      return knowledgeRetrievalLowReasoningEffortDeserializer(
        item as KnowledgeRetrievalLowReasoningEffort,
      );

    case "medium":
      return knowledgeRetrievalMediumReasoningEffortDeserializer(
        item as KnowledgeRetrievalMediumReasoningEffort,
      );

    default:
      return knowledgeRetrievalReasoningEffortDeserializer(item);
  }
}

/** The amount of effort to use during retrieval. */
export enum KnownKnowledgeRetrievalReasoningEffortKind {
  /** Does not perform any source selections, query planning, or iterative search. */
  Minimal = "minimal",
  /** Use low reasoning during retrieval. */
  Low = "low",
  /** Use a moderate amount of reasoning during retrieval. */
  Medium = "medium",
}

/**
 * The amount of effort to use during retrieval. \
 * {@link KnownKnowledgeRetrievalReasoningEffortKind} can be used interchangeably with KnowledgeRetrievalReasoningEffortKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **minimal**: Does not perform any source selections, query planning, or iterative search. \
 * **low**: Use low reasoning during retrieval. \
 * **medium**: Use a moderate amount of reasoning during retrieval.
 */
export type KnowledgeRetrievalReasoningEffortKind = string;

/** Run knowledge retrieval with minimal reasoning effort. */
export interface KnowledgeRetrievalMinimalReasoningEffort extends KnowledgeRetrievalReasoningEffort {
  /** The discriminator value. */
  kind: "minimal";
}

export function knowledgeRetrievalMinimalReasoningEffortSerializer(
  item: KnowledgeRetrievalMinimalReasoningEffort,
): any {
  return { kind: item["kind"] };
}

export function knowledgeRetrievalMinimalReasoningEffortDeserializer(
  item: any,
): KnowledgeRetrievalMinimalReasoningEffort {
  return {
    kind: item["kind"],
  };
}

/** Run knowledge retrieval with low reasoning effort. */
export interface KnowledgeRetrievalLowReasoningEffort extends KnowledgeRetrievalReasoningEffort {
  /** The discriminator value. */
  kind: "low";
}

export function knowledgeRetrievalLowReasoningEffortSerializer(
  item: KnowledgeRetrievalLowReasoningEffort,
): any {
  return { kind: item["kind"] };
}

export function knowledgeRetrievalLowReasoningEffortDeserializer(
  item: any,
): KnowledgeRetrievalLowReasoningEffort {
  return {
    kind: item["kind"],
  };
}

/** Run knowledge retrieval with medium reasoning effort. */
export interface KnowledgeRetrievalMediumReasoningEffort extends KnowledgeRetrievalReasoningEffort {
  /** The discriminator value. */
  kind: "medium";
}

export function knowledgeRetrievalMediumReasoningEffortSerializer(
  item: KnowledgeRetrievalMediumReasoningEffort,
): any {
  return { kind: item["kind"] };
}

export function knowledgeRetrievalMediumReasoningEffortDeserializer(
  item: any,
): KnowledgeRetrievalMediumReasoningEffort {
  return {
    kind: item["kind"],
  };
}

/** The output configuration for this retrieval. */
export enum KnownKnowledgeRetrievalOutputMode {
  /** Return data from the knowledge sources directly without generative alteration. */
  ExtractiveData = "extractiveData",
  /** Synthesize an answer for the response payload. */
  AnswerSynthesis = "answerSynthesis",
}

/**
 * The output configuration for this retrieval. \
 * {@link KnownKnowledgeRetrievalOutputMode} can be used interchangeably with KnowledgeRetrievalOutputMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **extractiveData**: Return data from the knowledge sources directly without generative alteration. \
 * **answerSynthesis**: Synthesize an answer for the response payload.
 */
export type KnowledgeRetrievalOutputMode = string;

/** Consolidates all general ingestion settings for knowledge sources. */
export interface KnowledgeSourceIngestionParameters {
  /** An explicit identity to use for this knowledge source. */
  identity?: SearchIndexerDataIdentityUnion;
  /** Optional vectorizer configuration for vectorizing content. */
  embeddingModel?: KnowledgeSourceVectorizerUnion;
  /** Optional chat completion model for image verbalization or context extraction. */
  chatCompletionModel?: KnowledgeBaseModelUnion;
  /** Indicates whether image verbalization should be disabled. Default is false. */
  disableImageVerbalization?: boolean;
  /** Optional schedule for data ingestion. */
  ingestionSchedule?: IndexingSchedule;
  /** Optional list of permission types to ingest together with document content. If specified, it will set the indexer permission options for the data source. */
  ingestionPermissionOptions?: KnowledgeSourceIngestionPermissionOption[];
  /** Optional content extraction mode. Default is 'minimal'. */
  contentExtractionMode?: KnowledgeSourceContentExtractionMode;
  /** Optional AI Services configuration for content processing. */
  aiServices?: AIServices;
  /** Optional asset store configuration for storing extracted assets such as images. */
  assetStore?: AssetStore;
  /** Optional freshness policy for biasing retrieval toward newer documents. */
  freshnessPolicy?: FreshnessPolicy;
}

export function knowledgeSourceIngestionParametersSerializer(
  item: KnowledgeSourceIngestionParameters,
): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : searchIndexerDataIdentityUnionSerializer(item["identity"]),
    embeddingModel: !item["embeddingModel"]
      ? item["embeddingModel"]
      : knowledgeSourceVectorizerUnionSerializer(item["embeddingModel"]),
    chatCompletionModel: !item["chatCompletionModel"]
      ? item["chatCompletionModel"]
      : knowledgeBaseModelUnionSerializer(item["chatCompletionModel"]),
    disableImageVerbalization: item["disableImageVerbalization"],
    ingestionSchedule: !item["ingestionSchedule"]
      ? item["ingestionSchedule"]
      : indexingScheduleSerializer(item["ingestionSchedule"]),
    ingestionPermissionOptions: !item["ingestionPermissionOptions"]
      ? item["ingestionPermissionOptions"]
      : item["ingestionPermissionOptions"].map((p: any) => {
          return p;
        }),
    contentExtractionMode: item["contentExtractionMode"],
    aiServices: !item["aiServices"] ? item["aiServices"] : aiServicesSerializer(item["aiServices"]),
    assetStore: !item["assetStore"] ? item["assetStore"] : assetStoreSerializer(item["assetStore"]),
    freshnessPolicy: !item["freshnessPolicy"]
      ? item["freshnessPolicy"]
      : freshnessPolicySerializer(item["freshnessPolicy"]),
  };
}

export function knowledgeSourceIngestionParametersDeserializer(
  item: any,
): KnowledgeSourceIngestionParameters {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : searchIndexerDataIdentityUnionDeserializer(item["identity"]),
    embeddingModel: !item["embeddingModel"]
      ? item["embeddingModel"]
      : knowledgeSourceVectorizerUnionDeserializer(item["embeddingModel"]),
    chatCompletionModel: !item["chatCompletionModel"]
      ? item["chatCompletionModel"]
      : knowledgeBaseModelUnionDeserializer(item["chatCompletionModel"]),
    disableImageVerbalization: item["disableImageVerbalization"],
    ingestionSchedule: !item["ingestionSchedule"]
      ? item["ingestionSchedule"]
      : indexingScheduleDeserializer(item["ingestionSchedule"]),
    ingestionPermissionOptions: !item["ingestionPermissionOptions"]
      ? item["ingestionPermissionOptions"]
      : item["ingestionPermissionOptions"].map((p1: any) => {
          return p1;
        }),
    contentExtractionMode: item["contentExtractionMode"],
    aiServices: !item["aiServices"]
      ? item["aiServices"]
      : aiServicesDeserializer(item["aiServices"]),
    assetStore: !item["assetStore"]
      ? item["assetStore"]
      : assetStoreDeserializer(item["assetStore"]),
    freshnessPolicy: !item["freshnessPolicy"]
      ? item["freshnessPolicy"]
      : freshnessPolicyDeserializer(item["freshnessPolicy"]),
  };
}

/** Specifies the vectorization method to be used for knowledge source embedding model. */
export interface KnowledgeSourceVectorizer {
  /** The name of the kind of vectorization method being configured for use with vector search. */
  /** The discriminator possible values: azureOpenAI */
  kind: VectorSearchVectorizerKind;
}

export function knowledgeSourceVectorizerSerializer(item: KnowledgeSourceVectorizer): any {
  return { kind: item["kind"] };
}

export function knowledgeSourceVectorizerDeserializer(item: any): KnowledgeSourceVectorizer {
  return {
    kind: item["kind"],
  };
}

/** Alias for KnowledgeSourceVectorizerUnion */
export type KnowledgeSourceVectorizerUnion =
  | KnowledgeSourceAzureOpenAIVectorizer
  | KnowledgeSourceVectorizer;

export function knowledgeSourceVectorizerUnionSerializer(
  item: KnowledgeSourceVectorizerUnion,
): any {
  switch (item.kind) {
    case "azureOpenAI":
      return knowledgeSourceAzureOpenAIVectorizerSerializer(
        item as KnowledgeSourceAzureOpenAIVectorizer,
      );

    default:
      return knowledgeSourceVectorizerSerializer(item);
  }
}

export function knowledgeSourceVectorizerUnionDeserializer(
  item: any,
): KnowledgeSourceVectorizerUnion {
  switch (item["kind"]) {
    case "azureOpenAI":
      return knowledgeSourceAzureOpenAIVectorizerDeserializer(
        item as KnowledgeSourceAzureOpenAIVectorizer,
      );

    default:
      return knowledgeSourceVectorizerDeserializer(item);
  }
}

/** Specifies the Azure OpenAI resource used to vectorize a query string. */
export interface KnowledgeSourceAzureOpenAIVectorizer extends KnowledgeSourceVectorizer {
  /** The discriminator value. */
  kind: "azureOpenAI";
  /** Contains the parameters specific to Azure OpenAI embedding vectorization. */
  azureOpenAIParameters?: AzureOpenAIVectorizerParameters;
}

export function knowledgeSourceAzureOpenAIVectorizerSerializer(
  item: KnowledgeSourceAzureOpenAIVectorizer,
): any {
  return {
    kind: item["kind"],
    azureOpenAIParameters: !item["azureOpenAIParameters"]
      ? item["azureOpenAIParameters"]
      : azureOpenAIVectorizerParametersSerializer(item["azureOpenAIParameters"]),
  };
}

export function knowledgeSourceAzureOpenAIVectorizerDeserializer(
  item: any,
): KnowledgeSourceAzureOpenAIVectorizer {
  return {
    kind: item["kind"],
    azureOpenAIParameters: !item["azureOpenAIParameters"]
      ? item["azureOpenAIParameters"]
      : azureOpenAIVectorizerParametersDeserializer(item["azureOpenAIParameters"]),
  };
}

/** Parameters for AI Services. */
export interface AIServices {
  /** The URI of the AI Services endpoint. */
  uri: string;
  /** The API key for accessing AI Services. */
  apiKey?: string;
}

export function aiServicesSerializer(item: AIServices): any {
  return { uri: item["uri"], apiKey: item["apiKey"] };
}

export function aiServicesDeserializer(item: any): AIServices {
  return {
    uri: item["uri"],
    apiKey: item["apiKey"],
  };
}

/** Configuration for an asset store used to store extracted assets such as images. */
export interface AssetStore {
  /** The connection string for the asset store. */
  connectionString: string;
  /** The name of the blob container within the asset store where extracted assets (for example, images) are stored. */
  containerName: string;
}

export function assetStoreSerializer(item: AssetStore): any {
  return { connectionString: item["connectionString"], containerName: item["containerName"] };
}

export function assetStoreDeserializer(item: any): AssetStore {
  return {
    connectionString: item["connectionString"],
    containerName: item["containerName"],
  };
}

/** Configuration for freshness-aware retrieval. When set, newer documents receive a ranking boost during retrieval. */
export interface FreshnessPolicy {
  /** ISO 8601 duration for the freshness boosting window (e.g. 'P90D' for 90 days). Documents newer than this duration receive a ranking boost during retrieval. */
  boostingDuration?: string;
}

export function freshnessPolicySerializer(item: FreshnessPolicy): any {
  return { boostingDuration: item["boostingDuration"] };
}

export function freshnessPolicyDeserializer(item: any): FreshnessPolicy {
  return {
    boostingDuration: item["boostingDuration"],
  };
}

/** Represents the status and synchronization history of a knowledge source. */
export interface KnowledgeSourceStatus {
  /** Identifies the Knowledge Source kind directly from the Status response. */
  kind?: KnowledgeSourceKind;
  /** The current synchronization status. */
  synchronizationStatus: KnowledgeSourceSynchronizationStatus;
  /** The synchronization interval (e.g., '1d' for daily). Null if no schedule is configured. */
  synchronizationInterval?: string;
  /** Current synchronization state that spans multiple indexer runs. */
  currentSynchronizationState?: SynchronizationState;
  /** Details of the last completed synchronization. Null on first sync. */
  lastSynchronizationState?: CompletedSynchronizationState;
  /** Statistical information about the knowledge source synchronization history. Null on first sync. */
  statistics?: KnowledgeSourceStatistics;
}

export function knowledgeSourceStatusSerializer(item: KnowledgeSourceStatus): any {
  return {
    kind: item["kind"],
    synchronizationStatus: item["synchronizationStatus"],
    synchronizationInterval: item["synchronizationInterval"],
    currentSynchronizationState: !item["currentSynchronizationState"]
      ? item["currentSynchronizationState"]
      : synchronizationStateSerializer(item["currentSynchronizationState"]),
    lastSynchronizationState: !item["lastSynchronizationState"]
      ? item["lastSynchronizationState"]
      : completedSynchronizationStateSerializer(item["lastSynchronizationState"]),
    statistics: !item["statistics"]
      ? item["statistics"]
      : knowledgeSourceStatisticsSerializer(item["statistics"]),
  };
}

export function knowledgeSourceStatusDeserializer(item: any): KnowledgeSourceStatus {
  return {
    kind: item["kind"],
    synchronizationStatus: item["synchronizationStatus"],
    synchronizationInterval: item["synchronizationInterval"],
    currentSynchronizationState: !item["currentSynchronizationState"]
      ? item["currentSynchronizationState"]
      : synchronizationStateDeserializer(item["currentSynchronizationState"]),
    lastSynchronizationState: !item["lastSynchronizationState"]
      ? item["lastSynchronizationState"]
      : completedSynchronizationStateDeserializer(item["lastSynchronizationState"]),
    statistics: !item["statistics"]
      ? item["statistics"]
      : knowledgeSourceStatisticsDeserializer(item["statistics"]),
  };
}

/** Represents the current state of an ongoing synchronization that spans multiple indexer runs. */
export interface SynchronizationState {
  /** The start time of the current synchronization. */
  startTime: Date;
  /** The number of item updates successfully processed in the current synchronization. */
  itemsUpdatesProcessed: number;
  /** The number of item updates that failed in the current synchronization. */
  itemsUpdatesFailed: number;
  /** The number of items skipped in the current synchronization. */
  itemsSkipped: number;
  /** Collection of document-level indexing errors encountered during the current synchronization run. Returned only when errors are present. */
  errors?: KnowledgeSourceSynchronizationError[];
}

export function synchronizationStateSerializer(item: SynchronizationState): any {
  return {
    startTime: item["startTime"].toISOString(),
    itemsUpdatesProcessed: item["itemsUpdatesProcessed"],
    itemsUpdatesFailed: item["itemsUpdatesFailed"],
    itemsSkipped: item["itemsSkipped"],
    errors: !item["errors"]
      ? item["errors"]
      : knowledgeSourceSynchronizationErrorArraySerializer(item["errors"]),
  };
}

export function synchronizationStateDeserializer(item: any): SynchronizationState {
  return {
    startTime: new Date(item["startTime"]),
    itemsUpdatesProcessed: item["itemsUpdatesProcessed"],
    itemsUpdatesFailed: item["itemsUpdatesFailed"],
    itemsSkipped: item["itemsSkipped"],
    errors: !item["errors"]
      ? item["errors"]
      : knowledgeSourceSynchronizationErrorArrayDeserializer(item["errors"]),
  };
}

export function knowledgeSourceSynchronizationErrorArraySerializer(
  result: Array<KnowledgeSourceSynchronizationError>,
): any[] {
  return result.map((item) => {
    return knowledgeSourceSynchronizationErrorSerializer(item);
  });
}

export function knowledgeSourceSynchronizationErrorArrayDeserializer(
  result: Array<KnowledgeSourceSynchronizationError>,
): any[] {
  return result.map((item) => {
    return knowledgeSourceSynchronizationErrorDeserializer(item);
  });
}

/** Represents a document-level indexing error encountered during a knowledge source synchronization run. */
export interface KnowledgeSourceSynchronizationError {
  /** The unique identifier for the failed document or item within the synchronization run. */
  docId?: string;
  /** HTTP-like status code representing the failure category (e.g., 400). */
  statusCode?: number;
  /** Name of the ingestion or processing component reporting the error. */
  name?: string;
  /** Human-readable, customer-visible error message. */
  errorMessage: string;
  /** Additional contextual information about the failure. */
  details?: string;
  /** A link to relevant troubleshooting documentation. */
  documentationLink?: string;
}

export function knowledgeSourceSynchronizationErrorSerializer(
  item: KnowledgeSourceSynchronizationError,
): any {
  return {
    docId: item["docId"],
    statusCode: item["statusCode"],
    name: item["name"],
    errorMessage: item["errorMessage"],
    details: item["details"],
    documentationLink: item["documentationLink"],
  };
}

export function knowledgeSourceSynchronizationErrorDeserializer(
  item: any,
): KnowledgeSourceSynchronizationError {
  return {
    docId: item["docId"],
    statusCode: item["statusCode"],
    name: item["name"],
    errorMessage: item["errorMessage"],
    details: item["details"],
    documentationLink: item["documentationLink"],
  };
}

/** Represents the completed state of the last synchronization. */
export interface CompletedSynchronizationState {
  /** The start time of the last completed synchronization. */
  startTime: Date;
  /** The end time of the last completed synchronization. */
  endTime: Date;
  /** The number of item updates successfully processed in the last synchronization. */
  itemsUpdatesProcessed: number;
  /** The number of item updates that failed in the last synchronization. */
  itemsUpdatesFailed: number;
  /** The number of items skipped in the last synchronization. */
  itemsSkipped: number;
}

export function completedSynchronizationStateSerializer(item: CompletedSynchronizationState): any {
  return {
    startTime: item["startTime"].toISOString(),
    endTime: item["endTime"].toISOString(),
    itemsUpdatesProcessed: item["itemsUpdatesProcessed"],
    itemsUpdatesFailed: item["itemsUpdatesFailed"],
    itemsSkipped: item["itemsSkipped"],
  };
}

export function completedSynchronizationStateDeserializer(
  item: any,
): CompletedSynchronizationState {
  return {
    startTime: new Date(item["startTime"]),
    endTime: new Date(item["endTime"]),
    itemsUpdatesProcessed: item["itemsUpdatesProcessed"],
    itemsUpdatesFailed: item["itemsUpdatesFailed"],
    itemsSkipped: item["itemsSkipped"],
  };
}

/** Statistical information about knowledge source synchronization history. */
export interface KnowledgeSourceStatistics {
  /** Total number of synchronizations. */
  totalSynchronizations: number;
  /** Average synchronization duration in HH:MM:SS format. */
  averageSynchronizationDuration: string;
  /** Average items processed per synchronization. */
  averageItemsProcessedPerSynchronization: number;
}

export function knowledgeSourceStatisticsSerializer(item: KnowledgeSourceStatistics): any {
  return {
    totalSynchronization: item["totalSynchronizations"],
    averageSynchronizationDuration: item["averageSynchronizationDuration"],
    averageItemsProcessedPerSynchronization: item["averageItemsProcessedPerSynchronization"],
  };
}

export function knowledgeSourceStatisticsDeserializer(item: any): KnowledgeSourceStatistics {
  return {
    totalSynchronizations: item["totalSynchronization"],
    averageSynchronizationDuration: item["averageSynchronizationDuration"],
    averageItemsProcessedPerSynchronization: item["averageItemsProcessedPerSynchronization"],
  };
}

/** The input contract for the retrieval request. */
export interface KnowledgeBaseRetrievalRequest {
  /** A list of chat message style input. */
  messages?: KnowledgeBaseMessage[];
  /** A list of intended queries to execute without model query planning. */
  intents?: KnowledgeRetrievalIntentUnion[];
  /** The maximum runtime in seconds. */
  maxRuntimeInSeconds?: number;
  /** Limits the maximum size of the content in the output. */
  maxOutputSize?: number;
  /** Limits the maximum number of documents in the output. */
  maxOutputDocuments?: number;
  /** Limits the maximum size of the content in the output. */
  maxOutputSizeInTokens?: number;
  /** The retrieval reasoning effort configuration. */
  retrievalReasoningEffort?: KnowledgeRetrievalReasoningEffortUnion;
  /** Indicates retrieval results should include activity information. */
  includeActivity?: boolean;
  /** The output configuration for this retrieval. */
  outputMode?: KnowledgeRetrievalOutputMode;
  /** A list of runtime parameters for the knowledge sources. */
  knowledgeSourceParams?: KnowledgeSourceParamsUnion[];
}

export function knowledgeBaseRetrievalRequestSerializer(item: KnowledgeBaseRetrievalRequest): any {
  return {
    messages: !item["messages"]
      ? item["messages"]
      : knowledgeBaseMessageArraySerializer(item["messages"]),
    intents: !item["intents"]
      ? item["intents"]
      : knowledgeRetrievalIntentUnionArraySerializer(item["intents"]),
    maxRuntimeInSeconds: item["maxRuntimeInSeconds"],
    maxOutputSize: item["maxOutputSize"],
    maxOutputDocuments: item["maxOutputDocuments"],
    maxOutputSizeInTokens: item["maxOutputSizeInTokens"],
    retrievalReasoningEffort: !item["retrievalReasoningEffort"]
      ? item["retrievalReasoningEffort"]
      : knowledgeRetrievalReasoningEffortUnionSerializer(item["retrievalReasoningEffort"]),
    includeActivity: item["includeActivity"],
    outputMode: item["outputMode"],
    knowledgeSourceParams: !item["knowledgeSourceParams"]
      ? item["knowledgeSourceParams"]
      : knowledgeSourceParamsUnionArraySerializer(item["knowledgeSourceParams"]),
  };
}

export function knowledgeBaseMessageArraySerializer(result: Array<KnowledgeBaseMessage>): any[] {
  return result.map((item) => {
    return knowledgeBaseMessageSerializer(item);
  });
}

export function knowledgeBaseMessageArrayDeserializer(result: Array<KnowledgeBaseMessage>): any[] {
  return result.map((item) => {
    return knowledgeBaseMessageDeserializer(item);
  });
}

/** The natural language message style object. */
export interface KnowledgeBaseMessage {
  /** The role of the tool response. */
  role?: string;
  /** The content of the message. */
  content: KnowledgeBaseMessageContentUnion[];
}

export function knowledgeBaseMessageSerializer(item: KnowledgeBaseMessage): any {
  return {
    role: item["role"],
    content: knowledgeBaseMessageContentUnionArraySerializer(item["content"]),
  };
}

export function knowledgeBaseMessageDeserializer(item: any): KnowledgeBaseMessage {
  return {
    role: item["role"],
    content: knowledgeBaseMessageContentUnionArrayDeserializer(item["content"]),
  };
}

export function knowledgeBaseMessageContentUnionArraySerializer(
  result: Array<KnowledgeBaseMessageContentUnion>,
): any[] {
  return result.map((item) => {
    return knowledgeBaseMessageContentUnionSerializer(item);
  });
}

export function knowledgeBaseMessageContentUnionArrayDeserializer(
  result: Array<KnowledgeBaseMessageContentUnion>,
): any[] {
  return result.map((item) => {
    return knowledgeBaseMessageContentUnionDeserializer(item);
  });
}

/** Specifies the type of the message content. */
export interface KnowledgeBaseMessageContent {
  /** The type of the message */
  /** The discriminator possible values: text, image */
  type: KnowledgeBaseMessageContentType;
}

export function knowledgeBaseMessageContentSerializer(item: KnowledgeBaseMessageContent): any {
  return { type: item["type"] };
}

export function knowledgeBaseMessageContentDeserializer(item: any): KnowledgeBaseMessageContent {
  return {
    type: item["type"],
  };
}

/** Alias for KnowledgeBaseMessageContentUnion */
export type KnowledgeBaseMessageContentUnion =
  | KnowledgeBaseMessageTextContent
  | KnowledgeBaseMessageImageContent
  | KnowledgeBaseMessageContent;

export function knowledgeBaseMessageContentUnionSerializer(
  item: KnowledgeBaseMessageContentUnion,
): any {
  switch (item.type) {
    case "text":
      return knowledgeBaseMessageTextContentSerializer(item as KnowledgeBaseMessageTextContent);

    case "image":
      return knowledgeBaseMessageImageContentSerializer(item as KnowledgeBaseMessageImageContent);

    default:
      return knowledgeBaseMessageContentSerializer(item);
  }
}

export function knowledgeBaseMessageContentUnionDeserializer(
  item: any,
): KnowledgeBaseMessageContentUnion {
  switch (item["type"]) {
    case "text":
      return knowledgeBaseMessageTextContentDeserializer(item as KnowledgeBaseMessageTextContent);

    case "image":
      return knowledgeBaseMessageImageContentDeserializer(item as KnowledgeBaseMessageImageContent);

    default:
      return knowledgeBaseMessageContentDeserializer(item);
  }
}

/** The type of message content. */
export enum KnownKnowledgeBaseMessageContentType {
  /** Text message content kind. */
  Text = "text",
  /** Image message content kind. */
  Image = "image",
}

/**
 * The type of message content. \
 * {@link KnownKnowledgeBaseMessageContentType} can be used interchangeably with KnowledgeBaseMessageContentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **text**: Text message content kind. \
 * **image**: Image message content kind.
 */
export type KnowledgeBaseMessageContentType = string;

/** Text message type. */
export interface KnowledgeBaseMessageTextContent extends KnowledgeBaseMessageContent {
  /** The discriminator value. */
  type: "text";
  /** The text content. */
  text: string;
}

export function knowledgeBaseMessageTextContentSerializer(
  item: KnowledgeBaseMessageTextContent,
): any {
  return { type: item["type"], text: item["text"] };
}

export function knowledgeBaseMessageTextContentDeserializer(
  item: any,
): KnowledgeBaseMessageTextContent {
  return {
    type: item["type"],
    text: item["text"],
  };
}

/** Image message type. */
export interface KnowledgeBaseMessageImageContent extends KnowledgeBaseMessageContent {
  /** The discriminator value. */
  type: "image";
  /** The image content. */
  image: KnowledgeBaseImageContent;
}

export function knowledgeBaseMessageImageContentSerializer(
  item: KnowledgeBaseMessageImageContent,
): any {
  return { type: item["type"], image: knowledgeBaseImageContentSerializer(item["image"]) };
}

export function knowledgeBaseMessageImageContentDeserializer(
  item: any,
): KnowledgeBaseMessageImageContent {
  return {
    type: item["type"],
    image: knowledgeBaseImageContentDeserializer(item["image"]),
  };
}

/** Image content. */
export interface KnowledgeBaseImageContent {
  /** The url of the image. */
  url: string;
}

export function knowledgeBaseImageContentSerializer(item: KnowledgeBaseImageContent): any {
  return { url: item["url"] };
}

export function knowledgeBaseImageContentDeserializer(item: any): KnowledgeBaseImageContent {
  return {
    url: item["url"],
  };
}

export function knowledgeRetrievalIntentUnionArraySerializer(
  result: Array<KnowledgeRetrievalIntentUnion>,
): any[] {
  return result.map((item) => {
    return knowledgeRetrievalIntentUnionSerializer(item);
  });
}

/** An intended query to execute without model query planning. */
export interface KnowledgeRetrievalIntent {
  /** The type of the intent. */
  /** The discriminator possible values: semantic */
  type: KnowledgeRetrievalIntentType;
}

export function knowledgeRetrievalIntentSerializer(item: KnowledgeRetrievalIntent): any {
  return { type: item["type"] };
}

/** Alias for KnowledgeRetrievalIntentUnion */
export type KnowledgeRetrievalIntentUnion =
  | KnowledgeRetrievalSemanticIntent
  | KnowledgeRetrievalIntent;

export function knowledgeRetrievalIntentUnionSerializer(item: KnowledgeRetrievalIntentUnion): any {
  switch (item.type) {
    case "semantic":
      return knowledgeRetrievalSemanticIntentSerializer(item as KnowledgeRetrievalSemanticIntent);

    default:
      return knowledgeRetrievalIntentSerializer(item);
  }
}

/** The kind of knowledge base configuration to use. */
export enum KnownKnowledgeRetrievalIntentType {
  /** A natural language semantic query intent. */
  Semantic = "semantic",
}

/**
 * The kind of knowledge base configuration to use. \
 * {@link KnownKnowledgeRetrievalIntentType} can be used interchangeably with KnowledgeRetrievalIntentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **semantic**: A natural language semantic query intent.
 */
export type KnowledgeRetrievalIntentType = string;

/** A semantic query intent. */
export interface KnowledgeRetrievalSemanticIntent extends KnowledgeRetrievalIntent {
  /** The discriminator value. */
  type: "semantic";
  /** The semantic query to execute */
  search: string;
}

export function knowledgeRetrievalSemanticIntentSerializer(
  item: KnowledgeRetrievalSemanticIntent,
): any {
  return { type: item["type"], search: item["search"] };
}

export function knowledgeSourceParamsUnionArraySerializer(
  result: Array<KnowledgeSourceParamsUnion>,
): any[] {
  return result.map((item) => {
    return knowledgeSourceParamsUnionSerializer(item);
  });
}

/** Base type for knowledge source runtime parameters. */
export interface KnowledgeSourceParams {
  /** The name of the index the params apply to. */
  knowledgeSourceName: string;
  /** Indicates whether references should be included for data retrieved from this source. */
  includeReferences?: boolean;
  /** Indicates whether references should include the structured data obtained during retrieval in their payload. */
  includeReferenceSourceData?: boolean;
  /** Indicates that this knowledge source should bypass source selection and always be queried at retrieval time. */
  alwaysQuerySource?: boolean;
  /** Indicates that the entire retrieval request should fail if retrieval from this knowledge source encounters an error. Defaults to false. */
  failOnError?: boolean;
  /** The reranker threshold all retrieved documents must meet to be included in the response. */
  rerankerThreshold?: number;
  /** Limits the maximum number of documents returned from this knowledge source. */
  maxOutputDocuments?: number;
  /** The type of the knowledge source. */
  /** The discriminator possible values: searchIndex, azureBlob, indexedSharePoint, indexedOneLake, web, remoteSharePoint, workIQ, fabricDataAgent, fabricOntology */
  kind: KnowledgeSourceKind;
  /** Indicates whether image serving should be enabled for this knowledge source at retrieval time. When true, images extracted during ingestion are delivered to downstream models. */
  enableImageServing?: boolean;
}

export function knowledgeSourceParamsSerializer(item: KnowledgeSourceParams): any {
  return {
    knowledgeSourceName: item["knowledgeSourceName"],
    includeReferences: item["includeReferences"],
    includeReferenceSourceData: item["includeReferenceSourceData"],
    alwaysQuerySource: item["alwaysQuerySource"],
    failOnError: item["failOnError"],
    rerankerThreshold: item["rerankerThreshold"],
    maxOutputDocuments: item["maxOutputDocuments"],
    kind: item["kind"],
    enableImageServing: item["enableImageServing"],
  };
}

/** Alias for KnowledgeSourceParamsUnion */
export type KnowledgeSourceParamsUnion =
  | SearchIndexKnowledgeSourceParams
  | AzureBlobKnowledgeSourceParams
  | IndexedSharePointKnowledgeSourceParams
  | IndexedOneLakeKnowledgeSourceParams
  | WebKnowledgeSourceParams
  | RemoteSharePointKnowledgeSourceParams
  | WorkIQKnowledgeSourceParams
  | FabricDataAgentKnowledgeSourceParams
  | FabricOntologyKnowledgeSourceParams
  | KnowledgeSourceParams;

export function knowledgeSourceParamsUnionSerializer(item: KnowledgeSourceParamsUnion): any {
  switch (item.kind) {
    case "searchIndex":
      return searchIndexKnowledgeSourceParamsSerializer(item as SearchIndexKnowledgeSourceParams);

    case "azureBlob":
      return azureBlobKnowledgeSourceParamsSerializer(item as AzureBlobKnowledgeSourceParams);

    case "indexedSharePoint":
      return indexedSharePointKnowledgeSourceParamsSerializer(
        item as IndexedSharePointKnowledgeSourceParams,
      );

    case "indexedOneLake":
      return indexedOneLakeKnowledgeSourceParamsSerializer(
        item as IndexedOneLakeKnowledgeSourceParams,
      );

    case "web":
      return webKnowledgeSourceParamsSerializer(item as WebKnowledgeSourceParams);

    case "remoteSharePoint":
      return remoteSharePointKnowledgeSourceParamsSerializer(
        item as RemoteSharePointKnowledgeSourceParams,
      );

    case "workIQ":
      return workIQKnowledgeSourceParamsSerializer(item as WorkIQKnowledgeSourceParams);

    case "fabricDataAgent":
      return fabricDataAgentKnowledgeSourceParamsSerializer(
        item as FabricDataAgentKnowledgeSourceParams,
      );

    case "fabricOntology":
      return fabricOntologyKnowledgeSourceParamsSerializer(
        item as FabricOntologyKnowledgeSourceParams,
      );

    default:
      return knowledgeSourceParamsSerializer(item);
  }
}

/** Specifies runtime parameters for a search index knowledge source */
export interface SearchIndexKnowledgeSourceParams extends KnowledgeSourceParams {
  /** The discriminator value. */
  kind: "searchIndex";
  /** A filter condition applied to the index (e.g., 'State eq VA'). */
  filterAddOn?: string;
}

export function searchIndexKnowledgeSourceParamsSerializer(
  item: SearchIndexKnowledgeSourceParams,
): any {
  return {
    knowledgeSourceName: item["knowledgeSourceName"],
    includeReferences: item["includeReferences"],
    includeReferenceSourceData: item["includeReferenceSourceData"],
    alwaysQuerySource: item["alwaysQuerySource"],
    failOnError: item["failOnError"],
    rerankerThreshold: item["rerankerThreshold"],
    maxOutputDocuments: item["maxOutputDocuments"],
    kind: item["kind"],
    enableImageServing: item["enableImageServing"],
    filterAddOn: item["filterAddOn"],
  };
}

/** Specifies runtime parameters for a azure blob knowledge source */
export interface AzureBlobKnowledgeSourceParams extends KnowledgeSourceParams {
  /** The discriminator value. */
  kind: "azureBlob";
}

export function azureBlobKnowledgeSourceParamsSerializer(
  item: AzureBlobKnowledgeSourceParams,
): any {
  return {
    knowledgeSourceName: item["knowledgeSourceName"],
    includeReferences: item["includeReferences"],
    includeReferenceSourceData: item["includeReferenceSourceData"],
    alwaysQuerySource: item["alwaysQuerySource"],
    failOnError: item["failOnError"],
    rerankerThreshold: item["rerankerThreshold"],
    maxOutputDocuments: item["maxOutputDocuments"],
    kind: item["kind"],
    enableImageServing: item["enableImageServing"],
  };
}

/** Specifies runtime parameters for a indexed SharePoint knowledge source */
export interface IndexedSharePointKnowledgeSourceParams extends KnowledgeSourceParams {
  /** The discriminator value. */
  kind: "indexedSharePoint";
}

export function indexedSharePointKnowledgeSourceParamsSerializer(
  item: IndexedSharePointKnowledgeSourceParams,
): any {
  return {
    knowledgeSourceName: item["knowledgeSourceName"],
    includeReferences: item["includeReferences"],
    includeReferenceSourceData: item["includeReferenceSourceData"],
    alwaysQuerySource: item["alwaysQuerySource"],
    failOnError: item["failOnError"],
    rerankerThreshold: item["rerankerThreshold"],
    maxOutputDocuments: item["maxOutputDocuments"],
    kind: item["kind"],
    enableImageServing: item["enableImageServing"],
  };
}

/** Specifies runtime parameters for a indexed OneLake knowledge source */
export interface IndexedOneLakeKnowledgeSourceParams extends KnowledgeSourceParams {
  /** The discriminator value. */
  kind: "indexedOneLake";
}

export function indexedOneLakeKnowledgeSourceParamsSerializer(
  item: IndexedOneLakeKnowledgeSourceParams,
): any {
  return {
    knowledgeSourceName: item["knowledgeSourceName"],
    includeReferences: item["includeReferences"],
    includeReferenceSourceData: item["includeReferenceSourceData"],
    alwaysQuerySource: item["alwaysQuerySource"],
    failOnError: item["failOnError"],
    rerankerThreshold: item["rerankerThreshold"],
    maxOutputDocuments: item["maxOutputDocuments"],
    kind: item["kind"],
    enableImageServing: item["enableImageServing"],
  };
}

/** Specifies runtime parameters for a web knowledge source */
export interface WebKnowledgeSourceParams extends KnowledgeSourceParams {
  /** The discriminator value. */
  kind: "web";
  /** The language of the web results. */
  language?: string;
  /** The market of the web results. */
  market?: string;
  /** The number of web results to return. */
  count?: number;
  /** The freshness of web results. */
  freshness?: string;
}

export function webKnowledgeSourceParamsSerializer(item: WebKnowledgeSourceParams): any {
  return {
    knowledgeSourceName: item["knowledgeSourceName"],
    includeReferences: item["includeReferences"],
    includeReferenceSourceData: item["includeReferenceSourceData"],
    alwaysQuerySource: item["alwaysQuerySource"],
    failOnError: item["failOnError"],
    rerankerThreshold: item["rerankerThreshold"],
    maxOutputDocuments: item["maxOutputDocuments"],
    kind: item["kind"],
    enableImageServing: item["enableImageServing"],
    language: item["language"],
    market: item["market"],
    count: item["count"],
    freshness: item["freshness"],
  };
}

/** Specifies runtime parameters for a remote SharePoint knowledge source */
export interface RemoteSharePointKnowledgeSourceParams extends KnowledgeSourceParams {
  /** The discriminator value. */
  kind: "remoteSharePoint";
  /** A filter condition applied to the SharePoint data source. It must be specified in the Keyword Query Language syntax. It will be combined as a conjunction with the filter expression specified in the knowledge source definition. */
  filterExpressionAddOn?: string;
}

export function remoteSharePointKnowledgeSourceParamsSerializer(
  item: RemoteSharePointKnowledgeSourceParams,
): any {
  return {
    knowledgeSourceName: item["knowledgeSourceName"],
    includeReferences: item["includeReferences"],
    includeReferenceSourceData: item["includeReferenceSourceData"],
    alwaysQuerySource: item["alwaysQuerySource"],
    failOnError: item["failOnError"],
    rerankerThreshold: item["rerankerThreshold"],
    maxOutputDocuments: item["maxOutputDocuments"],
    kind: item["kind"],
    enableImageServing: item["enableImageServing"],
    filterExpressionAddOn: item["filterExpressionAddOn"],
  };
}

/** Specifies runtime parameters for a WorkIQ knowledge source */
export interface WorkIQKnowledgeSourceParams extends KnowledgeSourceParams {
  /** The discriminator value. */
  kind: "workIQ";
}

export function workIQKnowledgeSourceParamsSerializer(item: WorkIQKnowledgeSourceParams): any {
  return {
    knowledgeSourceName: item["knowledgeSourceName"],
    includeReferences: item["includeReferences"],
    includeReferenceSourceData: item["includeReferenceSourceData"],
    alwaysQuerySource: item["alwaysQuerySource"],
    failOnError: item["failOnError"],
    rerankerThreshold: item["rerankerThreshold"],
    maxOutputDocuments: item["maxOutputDocuments"],
    kind: item["kind"],
    enableImageServing: item["enableImageServing"],
  };
}

/** Specifies runtime parameters for a Fabric Data Agent knowledge source */
export interface FabricDataAgentKnowledgeSourceParams extends KnowledgeSourceParams {
  /** The discriminator value. */
  kind: "fabricDataAgent";
}

export function fabricDataAgentKnowledgeSourceParamsSerializer(
  item: FabricDataAgentKnowledgeSourceParams,
): any {
  return {
    knowledgeSourceName: item["knowledgeSourceName"],
    includeReferences: item["includeReferences"],
    includeReferenceSourceData: item["includeReferenceSourceData"],
    alwaysQuerySource: item["alwaysQuerySource"],
    failOnError: item["failOnError"],
    rerankerThreshold: item["rerankerThreshold"],
    maxOutputDocuments: item["maxOutputDocuments"],
    kind: item["kind"],
    enableImageServing: item["enableImageServing"],
  };
}

/** Specifies runtime parameters for a Fabric Ontology knowledge source */
export interface FabricOntologyKnowledgeSourceParams extends KnowledgeSourceParams {
  /** The discriminator value. */
  kind: "fabricOntology";
}

export function fabricOntologyKnowledgeSourceParamsSerializer(
  item: FabricOntologyKnowledgeSourceParams,
): any {
  return {
    knowledgeSourceName: item["knowledgeSourceName"],
    includeReferences: item["includeReferences"],
    includeReferenceSourceData: item["includeReferenceSourceData"],
    alwaysQuerySource: item["alwaysQuerySource"],
    failOnError: item["failOnError"],
    rerankerThreshold: item["rerankerThreshold"],
    maxOutputDocuments: item["maxOutputDocuments"],
    kind: item["kind"],
    enableImageServing: item["enableImageServing"],
  };
}

/** The output contract for the retrieval response. */
export interface KnowledgeBaseRetrievalResponse {
  /** The response messages. */
  response?: KnowledgeBaseMessage[];
  /** The activity records for tracking progress and billing implications. */
  activity?: KnowledgeBaseActivityRecordUnion[];
  /** The references for the retrieval data used in the response. */
  references?: KnowledgeBaseReferenceUnion[];
  /** The sensitivity label information for the overall response. */
  responseSensitivityLabelInfo?: PurviewSensitivityLabelInfo;
}

export function knowledgeBaseRetrievalResponseDeserializer(
  item: any,
): KnowledgeBaseRetrievalResponse {
  return {
    response: !item["response"]
      ? item["response"]
      : knowledgeBaseMessageArrayDeserializer(item["response"]),
    activity: !item["activity"]
      ? item["activity"]
      : knowledgeBaseActivityRecordUnionArrayDeserializer(item["activity"]),
    references: !item["references"]
      ? item["references"]
      : knowledgeBaseReferenceUnionArrayDeserializer(item["references"]),
    responseSensitivityLabelInfo: !item["responseSensitivityLabelInfo"]
      ? item["responseSensitivityLabelInfo"]
      : purviewSensitivityLabelInfoDeserializer(item["responseSensitivityLabelInfo"]),
  };
}

export function knowledgeBaseActivityRecordUnionArrayDeserializer(
  result: Array<KnowledgeBaseActivityRecordUnion>,
): any[] {
  return result.map((item) => {
    return knowledgeBaseActivityRecordUnionDeserializer(item);
  });
}

/** Base type for activity records. Tracks execution details, timing, and errors for knowledge base operations. */
export interface KnowledgeBaseActivityRecord {
  /** The ID of the activity record. */
  id: number;
  /** The type of the activity record. */
  /** The discriminator possible values: modelQueryPlanning, modelAnswerSynthesis, modelWebSummarization, agenticReasoning */
  type: KnowledgeBaseActivityRecordType;
  /** The elapsed time in milliseconds for the retrieval activity. */
  elapsedMs?: number;
  /** The error detail explaining why the operation failed. This property is only included when the activity does not succeed. */
  error?: KnowledgeBaseErrorDetail;
  /** A warning message surfacing potential configuration issues observed during the activity, such as documents dropped due to score thresholding, token limit truncation, or timeout conditions. */
  warning?: string;
}

export function knowledgeBaseActivityRecordDeserializer(item: any): KnowledgeBaseActivityRecord {
  return {
    id: item["id"],
    type: item["type"],
    elapsedMs: item["elapsedMs"],
    error: !item["error"] ? item["error"] : knowledgeBaseErrorDetailDeserializer(item["error"]),
    warning: item["warning"],
  };
}

/** Alias for KnowledgeBaseActivityRecordUnion */
export type KnowledgeBaseActivityRecordUnion =
  | KnowledgeBaseModelQueryPlanningActivityRecord
  | KnowledgeBaseModelAnswerSynthesisActivityRecord
  | KnowledgeBaseModelWebSummarizationActivityRecord
  | KnowledgeBaseAgenticReasoningActivityRecord
  | KnowledgeBaseActivityRecord;

export function knowledgeBaseActivityRecordUnionDeserializer(
  item: any,
): KnowledgeBaseActivityRecordUnion {
  switch (item["type"]) {
    case "modelQueryPlanning":
      return knowledgeBaseModelQueryPlanningActivityRecordDeserializer(
        item as KnowledgeBaseModelQueryPlanningActivityRecord,
      );

    case "modelAnswerSynthesis":
      return knowledgeBaseModelAnswerSynthesisActivityRecordDeserializer(
        item as KnowledgeBaseModelAnswerSynthesisActivityRecord,
      );

    case "modelWebSummarization":
      return knowledgeBaseModelWebSummarizationActivityRecordDeserializer(
        item as KnowledgeBaseModelWebSummarizationActivityRecord,
      );

    case "agenticReasoning":
      return knowledgeBaseAgenticReasoningActivityRecordDeserializer(
        item as KnowledgeBaseAgenticReasoningActivityRecord,
      );

    default:
      return knowledgeBaseActivityRecordDeserializer(item);
  }
}

/** The type of activity record. */
export enum KnownKnowledgeBaseActivityRecordType {
  /** Search index retrieval activity. */
  SearchIndex = "searchIndex",
  /** Azure Blob retrieval activity. */
  AzureBlob = "azureBlob",
  /** Indexed SharePoint retrieval activity. */
  IndexedSharePoint = "indexedSharePoint",
  /** Indexed OneLake retrieval activity. */
  IndexedOneLake = "indexedOneLake",
  /** Web retrieval activity. */
  Web = "web",
  /** Remote SharePoint retrieval activity. */
  RemoteSharePoint = "remoteSharePoint",
  /** WorkIQ retrieval activity. */
  WorkIQ = "workIQ",
  /** Fabric Data Agent retrieval activity. */
  FabricDataAgent = "fabricDataAgent",
  /** Fabric Ontology retrieval activity. */
  FabricOntology = "fabricOntology",
  /** LLM query planning activity. */
  ModelQueryPlanning = "modelQueryPlanning",
  /** LLM answer synthesis activity. */
  ModelAnswerSynthesis = "modelAnswerSynthesis",
  /** LLM web summarization activity. */
  ModelWebSummarization = "modelWebSummarization",
  /** Agentic reasoning activity. */
  AgenticReasoning = "agenticReasoning",
}

/**
 * The type of activity record. \
 * {@link KnownKnowledgeBaseActivityRecordType} can be used interchangeably with KnowledgeBaseActivityRecordType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **searchIndex**: Search index retrieval activity. \
 * **azureBlob**: Azure Blob retrieval activity. \
 * **indexedSharePoint**: Indexed SharePoint retrieval activity. \
 * **indexedOneLake**: Indexed OneLake retrieval activity. \
 * **web**: Web retrieval activity. \
 * **remoteSharePoint**: Remote SharePoint retrieval activity. \
 * **workIQ**: WorkIQ retrieval activity. \
 * **fabricDataAgent**: Fabric Data Agent retrieval activity. \
 * **fabricOntology**: Fabric Ontology retrieval activity. \
 * **modelQueryPlanning**: LLM query planning activity. \
 * **modelAnswerSynthesis**: LLM answer synthesis activity. \
 * **modelWebSummarization**: LLM web summarization activity. \
 * **agenticReasoning**: Agentic reasoning activity.
 */
export type KnowledgeBaseActivityRecordType = string;

/** The error details. */
export interface KnowledgeBaseErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: KnowledgeBaseErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: KnowledgeBaseErrorAdditionalInfo[];
}

export function knowledgeBaseErrorDetailDeserializer(item: any): KnowledgeBaseErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : knowledgeBaseErrorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : knowledgeBaseErrorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function knowledgeBaseErrorDetailArrayDeserializer(
  result: Array<KnowledgeBaseErrorDetail>,
): any[] {
  return result.map((item) => {
    return knowledgeBaseErrorDetailDeserializer(item);
  });
}

export function knowledgeBaseErrorAdditionalInfoArrayDeserializer(
  result: Array<KnowledgeBaseErrorAdditionalInfo>,
): any[] {
  return result.map((item) => {
    return knowledgeBaseErrorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface KnowledgeBaseErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: Record<string, unknown>;
}

export function knowledgeBaseErrorAdditionalInfoDeserializer(
  item: any,
): KnowledgeBaseErrorAdditionalInfo {
  return {
    type: item["type"],
    info: !item["info"]
      ? item["info"]
      : Object.fromEntries(Object.entries(item["info"]).map(([k, p]: [string, unknown]) => [k, p])),
  };
}

/** Represents an LLM query planning activity record. */
export interface KnowledgeBaseModelQueryPlanningActivityRecord extends KnowledgeBaseActivityRecord {
  /** The discriminator value. */
  type: "modelQueryPlanning";
  /** The number of input tokens for the LLM query planning activity. */
  inputTokens?: number;
  /** The number of output tokens for the LLM query planning activity. */
  outputTokens?: number;
  /** The name of the model used for the LLM query planning activity. */
  modelName?: string;
}

export function knowledgeBaseModelQueryPlanningActivityRecordDeserializer(
  item: any,
): KnowledgeBaseModelQueryPlanningActivityRecord {
  return {
    id: item["id"],
    type: item["type"],
    elapsedMs: item["elapsedMs"],
    error: !item["error"] ? item["error"] : knowledgeBaseErrorDetailDeserializer(item["error"]),
    warning: item["warning"],
    inputTokens: item["inputTokens"],
    outputTokens: item["outputTokens"],
    modelName: item["modelName"],
  };
}

/** Represents an LLM answer synthesis activity record. */
export interface KnowledgeBaseModelAnswerSynthesisActivityRecord extends KnowledgeBaseActivityRecord {
  /** The discriminator value. */
  type: "modelAnswerSynthesis";
  /** The number of input tokens for the LLM answer synthesis activity. */
  inputTokens?: number;
  /** The number of output tokens for the LLM answer synthesis activity. */
  outputTokens?: number;
  /** The name of the model used for the LLM answer synthesis activity. */
  modelName?: string;
}

export function knowledgeBaseModelAnswerSynthesisActivityRecordDeserializer(
  item: any,
): KnowledgeBaseModelAnswerSynthesisActivityRecord {
  return {
    id: item["id"],
    type: item["type"],
    elapsedMs: item["elapsedMs"],
    error: !item["error"] ? item["error"] : knowledgeBaseErrorDetailDeserializer(item["error"]),
    warning: item["warning"],
    inputTokens: item["inputTokens"],
    outputTokens: item["outputTokens"],
    modelName: item["modelName"],
  };
}

/** Represents an LLM web summarization activity record. */
export interface KnowledgeBaseModelWebSummarizationActivityRecord extends KnowledgeBaseActivityRecord {
  /** The discriminator value. */
  type: "modelWebSummarization";
  /** The number of input tokens for the LLM web summarization activity. */
  inputTokens?: number;
  /** The number of output tokens for the LLM web summarization activity. */
  outputTokens?: number;
  /** The name of the model used for the LLM web summarization activity. */
  modelName?: string;
}

export function knowledgeBaseModelWebSummarizationActivityRecordDeserializer(
  item: any,
): KnowledgeBaseModelWebSummarizationActivityRecord {
  return {
    id: item["id"],
    type: item["type"],
    elapsedMs: item["elapsedMs"],
    error: !item["error"] ? item["error"] : knowledgeBaseErrorDetailDeserializer(item["error"]),
    warning: item["warning"],
    inputTokens: item["inputTokens"],
    outputTokens: item["outputTokens"],
    modelName: item["modelName"],
  };
}

/** Represents an agentic reasoning activity record. */
export interface KnowledgeBaseAgenticReasoningActivityRecord extends KnowledgeBaseActivityRecord {
  /** The discriminator value. */
  type: "agenticReasoning";
  /** The number of input tokens for agentic reasoning. */
  reasoningTokens?: number;
  /** The retrieval reasoning effort configuration. */
  retrievalReasoningEffort?: KnowledgeRetrievalReasoningEffortUnion;
}

export function knowledgeBaseAgenticReasoningActivityRecordDeserializer(
  item: any,
): KnowledgeBaseAgenticReasoningActivityRecord {
  return {
    id: item["id"],
    type: item["type"],
    elapsedMs: item["elapsedMs"],
    error: !item["error"] ? item["error"] : knowledgeBaseErrorDetailDeserializer(item["error"]),
    warning: item["warning"],
    reasoningTokens: item["reasoningTokens"],
    retrievalReasoningEffort: !item["retrievalReasoningEffort"]
      ? item["retrievalReasoningEffort"]
      : knowledgeRetrievalReasoningEffortUnionDeserializer(item["retrievalReasoningEffort"]),
  };
}

export function knowledgeBaseReferenceUnionArrayDeserializer(
  result: Array<KnowledgeBaseReferenceUnion>,
): any[] {
  return result.map((item) => {
    return knowledgeBaseReferenceUnionDeserializer(item);
  });
}

/** Base type for references. */
export interface KnowledgeBaseReference {
  /** The type of the reference. */
  /** The discriminator possible values: searchIndex, azureBlob, indexedSharePoint, indexedOneLake, web, remoteSharePoint, workIQ, fabricDataAgent, fabricOntology */
  type: KnowledgeBaseReferenceType;
  /** The ID of the reference. */
  id: string;
  /** The source activity ID for the reference. */
  activitySource: number;
  /** The source data for the reference. */
  sourceData?: Record<string, unknown>;
  /** The reranker score for the document reference. */
  rerankerScore?: number;
}

export function knowledgeBaseReferenceDeserializer(item: any): KnowledgeBaseReference {
  return {
    type: item["type"],
    id: item["id"],
    activitySource: item["activitySource"],
    sourceData: !item["sourceData"]
      ? item["sourceData"]
      : Object.fromEntries(
          Object.entries(item["sourceData"]).map(([k, p]: [string, unknown]) => [k, p]),
        ),
    rerankerScore: item["rerankerScore"],
  };
}

/** Alias for KnowledgeBaseReferenceUnion */
export type KnowledgeBaseReferenceUnion =
  | KnowledgeBaseSearchIndexReference
  | KnowledgeBaseAzureBlobReference
  | KnowledgeBaseIndexedSharePointReference
  | KnowledgeBaseIndexedOneLakeReference
  | KnowledgeBaseWebReference
  | KnowledgeBaseRemoteSharePointReference
  | KnowledgeBaseWorkIQReference
  | KnowledgeBaseFabricDataAgentReference
  | KnowledgeBaseFabricOntologyReference
  | KnowledgeBaseReference;

export function knowledgeBaseReferenceUnionDeserializer(item: any): KnowledgeBaseReferenceUnion {
  switch (item["type"]) {
    case "searchIndex":
      return knowledgeBaseSearchIndexReferenceDeserializer(
        item as KnowledgeBaseSearchIndexReference,
      );

    case "azureBlob":
      return knowledgeBaseAzureBlobReferenceDeserializer(item as KnowledgeBaseAzureBlobReference);

    case "indexedSharePoint":
      return knowledgeBaseIndexedSharePointReferenceDeserializer(
        item as KnowledgeBaseIndexedSharePointReference,
      );

    case "indexedOneLake":
      return knowledgeBaseIndexedOneLakeReferenceDeserializer(
        item as KnowledgeBaseIndexedOneLakeReference,
      );

    case "web":
      return knowledgeBaseWebReferenceDeserializer(item as KnowledgeBaseWebReference);

    case "remoteSharePoint":
      return knowledgeBaseRemoteSharePointReferenceDeserializer(
        item as KnowledgeBaseRemoteSharePointReference,
      );

    case "workIQ":
      return knowledgeBaseWorkIQReferenceDeserializer(item as KnowledgeBaseWorkIQReference);

    case "fabricDataAgent":
      return knowledgeBaseFabricDataAgentReferenceDeserializer(
        item as KnowledgeBaseFabricDataAgentReference,
      );

    case "fabricOntology":
      return knowledgeBaseFabricOntologyReferenceDeserializer(
        item as KnowledgeBaseFabricOntologyReference,
      );

    default:
      return knowledgeBaseReferenceDeserializer(item);
  }
}

/** The type of reference. */
export enum KnownKnowledgeBaseReferenceType {
  /** Search index document reference. */
  SearchIndex = "searchIndex",
  /** Azure Blob document reference. */
  AzureBlob = "azureBlob",
  /** Indexed SharePoint document reference. */
  IndexedSharePoint = "indexedSharePoint",
  /** Indexed OneLake document reference. */
  IndexedOneLake = "indexedOneLake",
  /** Web document reference. */
  Web = "web",
  /** Remote SharePoint document reference. */
  RemoteSharePoint = "remoteSharePoint",
  /** Work IQ document reference. */
  WorkIQ = "workIQ",
  /** Fabric Data Agent document reference. */
  FabricDataAgent = "fabricDataAgent",
  /** Fabric Ontology document reference. */
  FabricOntology = "fabricOntology",
}

/**
 * The type of reference. \
 * {@link KnownKnowledgeBaseReferenceType} can be used interchangeably with KnowledgeBaseReferenceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **searchIndex**: Search index document reference. \
 * **azureBlob**: Azure Blob document reference. \
 * **indexedSharePoint**: Indexed SharePoint document reference. \
 * **indexedOneLake**: Indexed OneLake document reference. \
 * **web**: Web document reference. \
 * **remoteSharePoint**: Remote SharePoint document reference. \
 * **workIQ**: Work IQ document reference. \
 * **fabricDataAgent**: Fabric Data Agent document reference. \
 * **fabricOntology**: Fabric Ontology document reference.
 */
export type KnowledgeBaseReferenceType = string;

/** Represents an Azure Search document reference. */
export interface KnowledgeBaseSearchIndexReference extends KnowledgeBaseReference {
  /** The discriminator value. */
  type: "searchIndex";
  /** The document key for the reference. */
  docKey?: string;
  /** The sensitivity label information for the reference. */
  searchSensitivityLabelInfo?: PurviewSensitivityLabelInfo;
}

export function knowledgeBaseSearchIndexReferenceDeserializer(
  item: any,
): KnowledgeBaseSearchIndexReference {
  return {
    type: item["type"],
    id: item["id"],
    activitySource: item["activitySource"],
    sourceData: !item["sourceData"]
      ? item["sourceData"]
      : Object.fromEntries(
          Object.entries(item["sourceData"]).map(([k, p]: [string, unknown]) => [k, p]),
        ),
    rerankerScore: item["rerankerScore"],
    docKey: item["docKey"],
    searchSensitivityLabelInfo: !item["searchSensitivityLabelInfo"]
      ? item["searchSensitivityLabelInfo"]
      : purviewSensitivityLabelInfoDeserializer(item["searchSensitivityLabelInfo"]),
  };
}

/** Information about the sensitivity label applied to a document */
export interface PurviewSensitivityLabelInfo {
  /** The display name for the sensitivity label. */
  displayName?: string;
  /** The ID of the sensitivity label. */
  sensitivityLabelId?: string;
  /** The tooltip that should be displayed for the label in a UI. */
  toolTip?: string;
  /** The priority in which the sensitivity label is applied. */
  priority?: number;
  /** The color that the UI should display for the label, if configured. */
  color?: string;
  /** Indicates whether the sensitivity label enforces encryption. */
  isEncrypted?: boolean;
}

export function purviewSensitivityLabelInfoDeserializer(item: any): PurviewSensitivityLabelInfo {
  return {
    displayName: item["displayName"],
    sensitivityLabelId: item["sensitivityLabelId"],
    toolTip: item["toolTip"],
    priority: item["priority"],
    color: item["color"],
    isEncrypted: item["isEncrypted"],
  };
}

/** Represents an Azure Blob Storage document reference. */
export interface KnowledgeBaseAzureBlobReference extends KnowledgeBaseReference {
  /** The discriminator value. */
  type: "azureBlob";
  /** The blob URL for the reference. */
  blobUrl?: string;
  /** The sensitivity label information for the reference. */
  searchSensitivityLabelInfo?: PurviewSensitivityLabelInfo;
}

export function knowledgeBaseAzureBlobReferenceDeserializer(
  item: any,
): KnowledgeBaseAzureBlobReference {
  return {
    type: item["type"],
    id: item["id"],
    activitySource: item["activitySource"],
    sourceData: !item["sourceData"]
      ? item["sourceData"]
      : Object.fromEntries(
          Object.entries(item["sourceData"]).map(([k, p]: [string, unknown]) => [k, p]),
        ),
    rerankerScore: item["rerankerScore"],
    blobUrl: item["blobUrl"],
    searchSensitivityLabelInfo: !item["searchSensitivityLabelInfo"]
      ? item["searchSensitivityLabelInfo"]
      : purviewSensitivityLabelInfoDeserializer(item["searchSensitivityLabelInfo"]),
  };
}

/** Represents an indexed SharePoint document reference. */
export interface KnowledgeBaseIndexedSharePointReference extends KnowledgeBaseReference {
  /** The discriminator value. */
  type: "indexedSharePoint";
  /** The document URL for the reference. */
  docUrl?: string;
  /** The sensitivity label information for the reference. */
  searchSensitivityLabelInfo?: PurviewSensitivityLabelInfo;
}

export function knowledgeBaseIndexedSharePointReferenceDeserializer(
  item: any,
): KnowledgeBaseIndexedSharePointReference {
  return {
    type: item["type"],
    id: item["id"],
    activitySource: item["activitySource"],
    sourceData: !item["sourceData"]
      ? item["sourceData"]
      : Object.fromEntries(
          Object.entries(item["sourceData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    rerankerScore: item["rerankerScore"],
    docUrl: item["docUrl"],
    searchSensitivityLabelInfo: !item["searchSensitivityLabelInfo"]
      ? item["searchSensitivityLabelInfo"]
      : purviewSensitivityLabelInfoDeserializer(item["searchSensitivityLabelInfo"]),
  };
}

/** Represents an indexed OneLake document reference. */
export interface KnowledgeBaseIndexedOneLakeReference extends KnowledgeBaseReference {
  /** The discriminator value. */
  type: "indexedOneLake";
  /** The document URL for the reference. */
  docUrl?: string;
  /** The sensitivity label information for the reference. */
  searchSensitivityLabelInfo?: PurviewSensitivityLabelInfo;
}

export function knowledgeBaseIndexedOneLakeReferenceDeserializer(
  item: any,
): KnowledgeBaseIndexedOneLakeReference {
  return {
    type: item["type"],
    id: item["id"],
    activitySource: item["activitySource"],
    sourceData: !item["sourceData"]
      ? item["sourceData"]
      : Object.fromEntries(
          Object.entries(item["sourceData"]).map(([k, p]: [string, unknown]) => [k, p]),
        ),
    rerankerScore: item["rerankerScore"],
    docUrl: item["docUrl"],
    searchSensitivityLabelInfo: !item["searchSensitivityLabelInfo"]
      ? item["searchSensitivityLabelInfo"]
      : purviewSensitivityLabelInfoDeserializer(item["searchSensitivityLabelInfo"]),
  };
}

/** Represents a web document reference. */
export interface KnowledgeBaseWebReference extends KnowledgeBaseReference {
  /** The discriminator value. */
  type: "web";
  /** The url the reference data originated from. */
  url?: string;
  /** The title of the web document. */
  title?: string;
}

export function knowledgeBaseWebReferenceDeserializer(item: any): KnowledgeBaseWebReference {
  return {
    type: item["type"],
    id: item["id"],
    activitySource: item["activitySource"],
    sourceData: !item["sourceData"]
      ? item["sourceData"]
      : Object.fromEntries(
          Object.entries(item["sourceData"]).map(([k, p]: [string, unknown]) => [k, p]),
        ),
    rerankerScore: item["rerankerScore"],
    url: item["url"],
    title: item["title"],
  };
}

/** Represents a remote SharePoint document reference. */
export interface KnowledgeBaseRemoteSharePointReference extends KnowledgeBaseReference {
  /** The discriminator value. */
  type: "remoteSharePoint";
  /** The url the reference data originated from. */
  webUrl?: string;
  /** The sensitivity label information for the reference. */
  searchSensitivityLabelInfo?: PurviewSensitivityLabelInfo;
}

export function knowledgeBaseRemoteSharePointReferenceDeserializer(
  item: any,
): KnowledgeBaseRemoteSharePointReference {
  return {
    type: item["type"],
    id: item["id"],
    activitySource: item["activitySource"],
    sourceData: !item["sourceData"]
      ? item["sourceData"]
      : Object.fromEntries(
          Object.entries(item["sourceData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    rerankerScore: item["rerankerScore"],
    webUrl: item["webUrl"],
    searchSensitivityLabelInfo: !item["searchSensitivityLabelInfo"]
      ? item["searchSensitivityLabelInfo"]
      : purviewSensitivityLabelInfoDeserializer(item["searchSensitivityLabelInfo"]),
  };
}

/** Represents a WorkIQ document reference. */
export interface KnowledgeBaseWorkIQReference extends KnowledgeBaseReference {
  /** The discriminator value. */
  type: "workIQ";
  /** The attributions for the reference. */
  attributions?: WorkIQAttribution[];
}

export function knowledgeBaseWorkIQReferenceDeserializer(item: any): KnowledgeBaseWorkIQReference {
  return {
    type: item["type"],
    id: item["id"],
    activitySource: item["activitySource"],
    sourceData: !item["sourceData"]
      ? item["sourceData"]
      : Object.fromEntries(
          Object.entries(item["sourceData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    rerankerScore: item["rerankerScore"],
    attributions: !item["attributions"]
      ? item["attributions"]
      : workIQAttributionArrayDeserializer(item["attributions"]),
  };
}

export function workIQAttributionArrayDeserializer(result: Array<WorkIQAttribution>): any[] {
  return result.map((item) => {
    return workIQAttributionDeserializer(item);
  });
}

/** Attribution information for a WorkIQ reference. */
export interface WorkIQAttribution {
  /** The URL for the attribution. */
  seeMoreWebUrl?: string;
}

export function workIQAttributionDeserializer(item: any): WorkIQAttribution {
  return {
    seeMoreWebUrl: item["seeMoreWebUrl"],
  };
}

/** Represents a Fabric Data Agent document reference. */
export interface KnowledgeBaseFabricDataAgentReference extends KnowledgeBaseReference {
  /** The discriminator value. */
  type: "fabricDataAgent";
  /** The Fabric workspace ID. */
  workspaceId?: string;
  /** The Fabric Data Agent ID. */
  dataAgentId?: string;
}

export function knowledgeBaseFabricDataAgentReferenceDeserializer(
  item: any,
): KnowledgeBaseFabricDataAgentReference {
  return {
    type: item["type"],
    id: item["id"],
    activitySource: item["activitySource"],
    sourceData: !item["sourceData"]
      ? item["sourceData"]
      : Object.fromEntries(
          Object.entries(item["sourceData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    rerankerScore: item["rerankerScore"],
    workspaceId: item["workspaceId"],
    dataAgentId: item["dataAgentId"],
  };
}

/** Represents a Fabric Ontology document reference. */
export interface KnowledgeBaseFabricOntologyReference extends KnowledgeBaseReference {
  /** The discriminator value. */
  type: "fabricOntology";
  /** The Fabric workspace ID. */
  workspaceId?: string;
  /** The ontology ID within the workspace. */
  ontologyId?: string;
}

export function knowledgeBaseFabricOntologyReferenceDeserializer(
  item: any,
): KnowledgeBaseFabricOntologyReference {
  return {
    type: item["type"],
    id: item["id"],
    activitySource: item["activitySource"],
    sourceData: !item["sourceData"]
      ? item["sourceData"]
      : Object.fromEntries(
          Object.entries(item["sourceData"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    rerankerScore: item["rerankerScore"],
    workspaceId: item["workspaceId"],
    ontologyId: item["ontologyId"],
  };
}
