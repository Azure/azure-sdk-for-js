// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";
import type { RandomScoringFunction } from "./models/azure/search/documents/indexes/inputModels.js";
import type {
  AIServicesVisionParameters,
  OpenAICompatibleVectorizerParameters,
  WorkIQKnowledgeSourceParameters,
} from "./models/azure/search/documents/indexes/index.js";
import type { KnowledgeSourceOpenAICompatibleVectorizer } from "./models/azure/search/documents/knowledgeBases/index.js";
import type { KnowledgeBaseModelInput } from "./knowledgeBaseModels.js";
import type {
  AzureBlobKnowledgeSource,
  AzureMachineLearningVectorizer,
  BaseKnowledgeSource,
  BaseVectorSearchVectorizer,
  FabricDataAgentKnowledgeSourceParameters,
  FabricOntologyKnowledgeSourceParameters,
  FileKnowledgeSource,
  IndexedOneLakeKnowledgeSource,
  IndexedSharePointKnowledgeSource,
  IndexedSqlKnowledgeSource,
  KnowledgeSource,
  KnowledgeSourceIngestionParameters,
  KnowledgeSourceVectorizer,
  McpServerKnowledgeSourceParameters,
  RemoteSharePointKnowledgeSourceParameters,
  ScoringFunction,
  ScoringProfile,
  SearchIndex,
  VectorSearch,
  VectorSearchVectorizer,
} from "./serviceModels.js";
import type {
  BaseSearchRequestOptions,
  GraphOptions,
  SearchRequestQueryTypeOptions,
  VectorFilterMode,
  VectorizableImageBinaryQuery,
  VectorizableImageUrlQuery,
  VectorQuery,
  VectorSearchOptions,
  SelectFields,
} from "./indexModels.js";

/** Scoring functions accepted as input without changing the legacy scoring union. */
export type ScoringFunctionInput = ScoringFunction | RandomScoringFunction;

/** A scoring profile input supporting classic and random scoring. */
export interface ScoringProfileInput extends Omit<ScoringProfile, "functions"> {
  /** Functions used to compute document scores. */
  functions?: ScoringFunctionInput[];
}

/** Vectorizers accepted as input, including OpenAI-compatible endpoints. */
export type VectorSearchVectorizerInput =
  | VectorSearchVectorizer
  | OpenAICompatibleVectorizerInput
  | AIServicesVisionVectorizerInput
  | AzureMachineLearningVectorizer;

/** An OpenAI-compatible query vectorizer input. */
export interface OpenAICompatibleVectorizerInput extends Omit<BaseVectorSearchVectorizer, "kind"> {
  /** Selects direct OpenAI-compatible embedding vectorization. */
  kind: "openAICompatible";
  /** Endpoint, authentication and embedding profile configuration. */
  openAICompatibleParameters: OpenAICompatibleVectorizerParameters;
}

/** An AI Services Vision query vectorizer input. */
export interface AIServicesVisionVectorizerInput extends Omit<BaseVectorSearchVectorizer, "kind"> {
  /** Selects AI Services Vision embedding vectorization. */
  kind: "aiServicesVision";
  /** Vision resource, model version and authentication configuration. */
  aiServicesVisionParameters?: AIServicesVisionParameters;
}

/** Vector-search configuration supporting additional preview vectorizers. */
export interface VectorSearchInput extends Omit<VectorSearch, "vectorizers"> {
  /** Query vectorizers configured for the index. */
  vectorizers?: VectorSearchVectorizerInput[];
}

/** An index input supporting preview scoring and vectorizers without widening legacy responses. */
export interface SearchIndexInput extends Omit<SearchIndex, "scoringProfiles" | "vectorSearch"> {
  /** Scoring profiles to configure on the index. */
  scoringProfiles?: ScoringProfileInput[];
  /** Vector-search configuration. */
  vectorSearch?: VectorSearchInput;
}

/** Embedding models accepted as input for knowledge-source ingestion. */
export type KnowledgeSourceVectorizerInput =
  KnowledgeSourceVectorizer | KnowledgeSourceOpenAICompatibleVectorizer;

/** Ingestion input supporting preview embedding and image-verbalization models. */
export interface KnowledgeSourceIngestionParametersInput extends Omit<
  KnowledgeSourceIngestionParameters,
  "embeddingModel" | "chatCompletionModel"
> {
  /** Embedding model used during ingestion. */
  embeddingModel?: KnowledgeSourceVectorizerInput;
  /** Model used for image verbalization or context extraction. */
  chatCompletionModel?: KnowledgeBaseModelInput;
}

/** Azure Blob source input accepting preview ingestion models. */
export interface AzureBlobKnowledgeSourceInput extends Omit<
  AzureBlobKnowledgeSource,
  "azureBlobParameters"
> {
  /** Blob connection and ingestion configuration. */
  azureBlobParameters: Omit<
    AzureBlobKnowledgeSource["azureBlobParameters"],
    "ingestionParameters"
  > & {
    ingestionParameters?: KnowledgeSourceIngestionParametersInput;
  };
}

/** OneLake source input accepting preview ingestion models. */
export interface IndexedOneLakeKnowledgeSourceInput extends Omit<
  IndexedOneLakeKnowledgeSource,
  "indexedOneLakeParameters"
> {
  /** OneLake connection and ingestion configuration. */
  indexedOneLakeParameters: Omit<
    IndexedOneLakeKnowledgeSource["indexedOneLakeParameters"],
    "ingestionParameters"
  > & {
    ingestionParameters?: KnowledgeSourceIngestionParametersInput;
  };
}

/** SharePoint source input accepting preview ingestion models. */
export interface IndexedSharePointKnowledgeSourceInput extends Omit<
  IndexedSharePointKnowledgeSource,
  "indexedSharePointParameters"
> {
  /** SharePoint connection and ingestion configuration. */
  indexedSharePointParameters: Omit<
    IndexedSharePointKnowledgeSource["indexedSharePointParameters"],
    "ingestionParameters"
  > & {
    ingestionParameters?: KnowledgeSourceIngestionParametersInput;
  };
}

/** SQL source input accepting preview ingestion models. */
export interface IndexedSqlKnowledgeSourceInput extends Omit<
  IndexedSqlKnowledgeSource,
  "indexedSqlParameters"
> {
  /** SQL connection and ingestion configuration. */
  indexedSqlParameters: Omit<
    IndexedSqlKnowledgeSource["indexedSqlParameters"],
    "ingestionParameters"
  > & {
    ingestionParameters?: KnowledgeSourceIngestionParametersInput;
  };
}

/** File source input accepting preview ingestion models. */
export interface FileKnowledgeSourceInput extends Omit<FileKnowledgeSource, "fileParameters"> {
  /** File ingestion configuration. */
  fileParameters: Omit<FileKnowledgeSource["fileParameters"], "ingestionParameters"> & {
    ingestionParameters?: KnowledgeSourceIngestionParametersInput;
  };
}

/** A remote SharePoint source input using convenience-layer encryption and ETags. */
export interface RemoteSharePointKnowledgeSourceInput extends Omit<BaseKnowledgeSource, "kind"> {
  /** Selects remote SharePoint retrieval. */
  kind: "remoteSharePoint";
  /** SharePoint retrieval configuration. */
  remoteSharePointParameters: RemoteSharePointKnowledgeSourceParameters;
}

/** A Fabric Data Agent source input using convenience-layer encryption and ETags. */
export interface FabricDataAgentKnowledgeSourceInput extends Omit<BaseKnowledgeSource, "kind"> {
  /** Selects a Fabric Data Agent. */
  kind: "fabricDataAgent";
  /** Workspace and agent configuration. */
  fabricDataAgentParameters: FabricDataAgentKnowledgeSourceParameters;
}

/** A Fabric Ontology source input using convenience-layer encryption and ETags. */
export interface FabricOntologyKnowledgeSourceInput extends Omit<BaseKnowledgeSource, "kind"> {
  /** Selects a Fabric Ontology. */
  kind: "fabricOntology";
  /** Workspace and ontology configuration. */
  fabricOntologyParameters: FabricOntologyKnowledgeSourceParameters;
}

/** A Work IQ source input using convenience-layer encryption and ETags. */
export interface WorkIQKnowledgeSourceInput extends Omit<BaseKnowledgeSource, "kind"> {
  /** Selects Work IQ retrieval. */
  kind: "workIQ";
  /** Work IQ connection configuration. */
  workIQParameters: WorkIQKnowledgeSourceParameters;
}

/** An MCP source input retaining the convenience-layer serverUrl spelling. */
export interface McpServerKnowledgeSourceInput extends Omit<BaseKnowledgeSource, "kind"> {
  /** Selects an MCP server. */
  kind: "mcpServer";
  /** Server endpoint, authentication and tool configuration. */
  mcpServerParameters: McpServerKnowledgeSourceParameters;
}

/** Additional source definitions accepted as input with convenience-layer encryption and ETags. */
export type AdditionalKnowledgeSourceInput =
  | RemoteSharePointKnowledgeSourceInput
  | FabricDataAgentKnowledgeSourceInput
  | FabricOntologyKnowledgeSourceInput
  | WorkIQKnowledgeSourceInput
  | McpServerKnowledgeSourceInput;

/** Knowledge-source definitions accepted as input, including preview source and model kinds. */
export type KnowledgeSourceInput =
  | KnowledgeSource
  | AzureBlobKnowledgeSourceInput
  | IndexedOneLakeKnowledgeSourceInput
  | IndexedSharePointKnowledgeSourceInput
  | IndexedSqlKnowledgeSourceInput
  | FileKnowledgeSourceInput
  | AdditionalKnowledgeSourceInput;

/** Vector queries accepted as input, including image queries. */
export type VectorQueryInput<TModel extends object> =
  VectorQuery<TModel> | VectorizableImageUrlQuery<TModel> | VectorizableImageBinaryQuery<TModel>;

/** Filtering modes accepted as input without changing the legacy union. */
export type VectorFilterModeInput = VectorFilterMode | "strictPostFilter";

/** Vector search input supporting image queries and strict post-filtering. */
export interface VectorSearchOptionsInput<TModel extends object> extends Omit<
  VectorSearchOptions<TModel>,
  "queries" | "filterMode"
> {
  /** Vector queries to execute. */
  queries: VectorQueryInput<TModel>[];
  /** When to apply query filters. */
  filterMode?: VectorFilterModeInput;
}

/** Search input supporting agentic and additional vector options while preserving legacy types. */
export type SearchOptionsInput<
  TModel extends object,
  TFields extends SelectFields<TModel> = SelectFields<TModel>,
> = OperationOptions &
  Omit<BaseSearchRequestOptions<TModel, TFields>, "queryType" | "vectorSearchOptions"> &
  (SearchRequestQueryTypeOptions | { queryType: "agentic" }) & {
    vectorSearchOptions?: VectorSearchOptionsInput<TModel>;
  };

/** Graph-query input supporting all preview vector-query kinds. */
export interface GraphOptionsInput<TModel extends object = object> extends Omit<
  GraphOptions<TModel>,
  "vectorQueries"
> {
  /** Vector queries constraining graph execution. */
  vectorQueries?: VectorQueryInput<TModel>[];
}
