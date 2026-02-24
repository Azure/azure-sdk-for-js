// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";
import type { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import type {
  AnalyzeTextOptions as GeneratedAnalyzeTextOptions,
  IndexStatisticsSummary,
  KnowledgeSourceUnion,
  SearchAlias,
  SearchIndex,
  SearchResourceEncryptionKey,
} from "./models/azure/search/documents/indexes/index.js";

// Re-export generated option types with custom names for backward compatibility
export type {
  // SearchIndex options
  ListIndexesOptionalParams as ListIndexesOptions,
  GetIndexOptionalParams as GetIndexOptions,
  CreateIndexOptionalParams as CreateIndexOptions,
  GetIndexStatisticsOptionalParams as GetIndexStatisticsOptions,
  CreateAliasOptionalParams as CreateAliasOptions,
  GetAliasOptionalParams as GetAliasOptions,
  ListAliasesOptionalParams as ListAliasesOptions,
  CreateSynonymMapOptionalParams as CreateSynonymMapOptions,
  GetServiceStatisticsOptionalParams as GetServiceStatisticsOptions,
  ListIndexStatsSummaryOptionalParams as GetIndexStatsSummaryOptions,
  // Knowledge base options
  GetKnowledgeBaseOptionalParams as GetKnowledgeBaseOptions,
  ListKnowledgeBasesOptionalParams as ListKnowledgeBasesOptions,
  CreateKnowledgeBaseOptionalParams as CreateKnowledgeBaseOptions,
  GetKnowledgeSourceOptionalParams as GetKnowledgeSourceOptions,
  ListKnowledgeSourcesOptionalParams as ListKnowledgeSourcesOptions,
  CreateKnowledgeSourceOptionalParams as CreateKnowledgeSourceOptions,
  GetKnowledgeSourceStatusOptionalParams as GetKnowledgeSourceStatusOptions,
} from "./searchIndex/api/options.js";
export type {
  // SearchIndexer options
  GetSkillsetsOptionalParams as ListSkillsetsOptions,
  GetSkillsetOptionalParams as GetSkillSetOptions,
  CreateSkillsetOptionalParams as CreateSkillsetOptions,
  GetIndexersOptionalParams as ListIndexersOptions,
  GetIndexerOptionalParams as GetIndexerOptions,
  CreateIndexerOptionalParams as CreateIndexerOptions,
  GetIndexerStatusOptionalParams as GetIndexerStatusOptions,
  ResetIndexerOptionalParams as ResetIndexerOptions,
  RunIndexerOptionalParams as RunIndexerOptions,
  GetDataSourceConnectionsOptionalParams as ListDataSourceConnectionsOptions,
  GetDataSourceConnectionOptionalParams as GetDataSourceConnectionOptions,
  CreateDataSourceConnectionOptionalParams as CreateDataSourceConnectionOptions,
} from "./searchIndexer/api/options.js";

// Re-export generated types that replace custom types
export {
  // Union types (use *Union suffix in generated)
  CharFilterUnion as CharFilter,
  CognitiveServicesAccountUnion as CognitiveServicesAccount,
  DataChangeDetectionPolicyUnion as DataChangeDetectionPolicy,
  DataDeletionDetectionPolicyUnion as DataDeletionDetectionPolicy,
  LexicalAnalyzerUnion as LexicalAnalyzer,
  LexicalNormalizerUnion as LexicalNormalizer,
  LexicalTokenizerUnion as LexicalTokenizer,
  ScoringFunctionUnion as ScoringFunction,
  SearchIndexerDataIdentityUnion as SearchIndexerDataIdentity,
  SearchIndexerSkillUnion as SearchIndexerSkill,
  SimilarityAlgorithmUnion as SimilarityAlgorithm,
  TokenFilterUnion as TokenFilter,
  VectorSearchAlgorithmConfigurationUnion as VectorSearchAlgorithmConfiguration,
  VectorSearchCompressionUnion as VectorSearchCompression,
  VectorSearchVectorizerUnion as VectorSearchVectorizer,

  // Main entity types
  SearchField,
  SearchIndex,
  SearchIndexer,
  SearchIndexerCache,
  SearchIndexerDataSourceConnection,
  SearchIndexerIndexProjection,
  SearchIndexerIndexProjectionsParameters as SearchIndexerIndexProjectionParameters,
  SearchIndexerKnowledgeStore,
  SearchIndexerKnowledgeStoreParameters,
  SearchIndexerSkillset,
  SearchResourceEncryptionKey,
  ScoringProfile,
  VectorSearch,
  IndexingParameters,
  IndexingParametersConfiguration,

  // Concrete analyzer/tokenizer/filter types
  CustomAnalyzer,
  PatternAnalyzer,
  LuceneStandardAnalyzer,
  StopAnalyzer,
  ClassicTokenizer,
  EdgeNGramTokenizer,
  KeywordTokenizer,
  KeywordTokenizerV2,
  MicrosoftLanguageTokenizer,
  MicrosoftLanguageStemmingTokenizer,
  NGramTokenizer,
  PathHierarchyTokenizerV2 as PathHierarchyTokenizer,
  PatternTokenizer,
  LuceneStandardTokenizer,
  LuceneStandardTokenizerV2,
  UaxUrlEmailTokenizer,
  AsciiFoldingTokenFilter,
  CjkBigramTokenFilter,
  CommonGramTokenFilter,
  DictionaryDecompounderTokenFilter,
  EdgeNGramTokenFilter,
  EdgeNGramTokenFilterSide,
  EdgeNGramTokenFilterV2,
  ElisionTokenFilter,
  KeepTokenFilter,
  KeywordMarkerTokenFilter,
  LengthTokenFilter,
  LimitTokenFilter,
  NGramTokenFilter,
  NGramTokenFilterV2,
  PatternCaptureTokenFilter,
  PatternReplaceTokenFilter,
  PhoneticTokenFilter,
  ShingleTokenFilter,
  SnowballTokenFilter,
  StemmerTokenFilter,
  StemmerOverrideTokenFilter,
  StopwordsTokenFilter,
  SynonymTokenFilter,
  TruncateTokenFilter,
  UniqueTokenFilter,
  WordDelimiterTokenFilter,
  MappingCharFilter,
  PatternReplaceCharFilter,
  CustomNormalizer,

  // Similarity types
  BM25Similarity,
  ClassicSimilarity,

  // Scoring function types
  DistanceScoringFunction,
  FreshnessScoringFunction,
  MagnitudeScoringFunction,
  TagScoringFunction,

  // Cognitive services types
  DefaultCognitiveServicesAccount,
  CognitiveServicesAccountKey,
  AIServicesAccountKey,
  AIServicesAccountIdentity,

  // Data change/deletion detection types
  HighWaterMarkChangeDetectionPolicy,
  SqlIntegratedChangeTrackingPolicy,
  SoftDeleteColumnDeletionDetectionPolicy,
  NativeBlobSoftDeleteDeletionDetectionPolicy,

  // Data identity types
  SearchIndexerDataNoneIdentity,
  SearchIndexerDataUserAssignedIdentity,

  // Skill types
  ConditionalSkill,
  KeyPhraseExtractionSkill,
  OcrSkill,
  ImageAnalysisSkill,
  LanguageDetectionSkill,
  ShaperSkill,
  MergeSkill,
  EntityLinkingSkill,
  EntityRecognitionSkillV3,
  SentimentSkillV3,
  PIIDetectionSkill,
  SplitSkill,
  CustomEntityLookupSkill,
  TextTranslationSkill,
  DocumentExtractionSkill,
  DocumentIntelligenceLayoutSkill,
  DocumentIntelligenceLayoutSkillChunkingProperties,
  DocumentIntelligenceLayoutSkillExtractionOptions,
  DocumentIntelligenceLayoutSkillMarkdownHeaderDepth,
  DocumentIntelligenceLayoutSkillOutputFormat,
  DocumentIntelligenceLayoutSkillOutputMode,
  WebApiSkill,
  WebApiHttpHeaders,
  AzureMachineLearningSkill,
  AzureOpenAIEmbeddingSkill,
  VisionVectorizeSkill,
  ContentUnderstandingSkill,
  ChatCompletionSkill,

  // Vector search types
  HnswAlgorithmConfiguration,
  HnswParameters,
  ExhaustiveKnnAlgorithmConfiguration,
  ExhaustiveKnnParameters,
  AzureOpenAIVectorizer,
  AzureOpenAIVectorizerParameters,
  WebApiVectorizer,
  WebApiVectorizerParameters,
  AIServicesVisionVectorizer,
  AIServicesVisionParameters,
  AzureMachineLearningVectorizer,
  AzureMachineLearningParameters,
  BinaryQuantizationCompression,
  ScalarQuantizationCompression,

  // Knowledge store types
  SearchIndexerKnowledgeStoreProjection,
  SearchIndexerIndexProjectionSelector,

  // Other types
  SearchSuggester,
  SemanticSearch,
  FieldMapping,
  ServiceIndexersRuntime,

  // Known name enums - re-exported with backward compatible names
  KnownLexicalAnalyzerName as KnownAnalyzerNames,
  KnownLexicalTokenizerName as KnownTokenizerNames,
  KnownTokenFilterName as KnownTokenFilterNames,
  KnownCharFilterName as KnownCharFilterNames,
} from "./models/azure/search/documents/indexes/index.js";
import type { KnowledgeBase } from "./knowledgeBaseModels.js";

// Re-export generated statistics types with backward compatible names
export type {
  GetIndexStatisticsResult as SearchIndexStatistics,
  SearchServiceStatistics,
} from "./models/azure/search/documents/indexes/index.js";

// Re-export generated KnowledgeSource types - these replace custom types
export type {
  KnowledgeSource,
  KnowledgeSourceUnion,
  SearchIndexKnowledgeSource,
  AzureBlobKnowledgeSource,
  AzureBlobKnowledgeSourceParameters,
  IndexedSharePointKnowledgeSource,
  IndexedSharePointKnowledgeSourceParameters,
  IndexedOneLakeKnowledgeSource,
  IndexedOneLakeKnowledgeSourceParameters,
  WebKnowledgeSource,
  RemoteSharePointKnowledgeSource,
  SearchIndexKnowledgeSourceParameters,
  CreatedResources,
} from "./models/azure/search/documents/indexes/index.js";

// Re-export generated KnowledgeSource ingestion/vectorizer types
export type {
  KnowledgeSourceIngestionParameters,
  KnowledgeSourceVectorizer,
  KnowledgeSourceVectorizerUnion,
  KnowledgeSourceAzureOpenAIVectorizer,
} from "./models/azure/search/documents/knowledgeBases/index.js";

// Re-export generated KnowledgeBaseModel types
export type {
  KnowledgeBaseModelUnion as KnowledgeBaseModel,
  KnowledgeBaseAzureOpenAIModel,
} from "./models/azure/search/documents/indexes/index.js";

/**
 * Represents a synonym map definition.
 */
export interface SynonymMap {
  /** The name of the synonym map. */
  name: string;
  /**
   * The format of the synonym map. Only the 'solr' format is currently supported.
   * Defaults to `"solr"`.
   */
  format?: "solr";
  /** A series of synonym rules in the specified synonym map format. The rules must be separated by newlines. */
  synonyms: string[];
  /** A description of an encryption key that you create in Azure Key Vault. This key is used to provide an additional level of encryption-at-rest for your data when you want full assurance that no one, not even Microsoft, can decrypt your data. Once you have encrypted your data, it will always remain encrypted. The search service will ignore attempts to set this property to null. You can change this property as needed if you want to rotate your encryption key; Your data will be unaffected. Encryption with customer-managed keys is not available for free search services, and is only available for paid services created on or after January 1, 2019. */
  encryptionKey?: SearchResourceEncryptionKey;
  /** The ETag of the synonym map. */
  eTag?: string;
}

/**
 * Options for create or update alias operation.
 */
export interface CreateOrUpdateAliasOptions extends OperationOptions {
  /**
   * If set to true, Resource will be updated only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
}

/**
 * Options for delete alias operation.
 */
export interface DeleteAliasOptions extends OperationOptions {
  /**
   * If set to true, Resource will be deleted only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
}

/**
 * Options for create/update index operation.
 */
export interface CreateOrUpdateIndexOptions extends OperationOptions {
  /**
   * Allows new analyzers, tokenizers, token filters, or char filters to be added to an index by
   * taking the index offline for at least a few seconds. This temporarily causes indexing and
   * query requests to fail. Performance and write availability of the index can be impaired for
   * several minutes after the index is updated, or longer for very large indexes.
   */
  allowIndexDowntime?: boolean;
  /**
   * If set to true, Resource will be deleted only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
}

/**
 * Options for reset docs operation.
 */
export interface ResetDocumentsOptions extends OperationOptions {
  /**
   * document keys to be reset
   */
  documentKeys?: string[];
  /**
   * datasource document identifiers to be reset
   */
  datasourceDocumentIds?: string[];
  /**
   * If false, keys or ids will be appended to existing ones. If true, only the keys or ids in this
   * payload will be queued to be re-ingested.
   */
  overwrite?: boolean;
}

/**
 * Options for reset skills operation.
 */
export interface ResetSkillsOptions extends OperationOptions {
  /**
   * the names of skills to be reset.
   */
  skillNames?: string[];
}

/**
 * Options for create/update skillset operation.
 */
export interface CreateOrUpdateSkillsetOptions extends OperationOptions {
  /**
   * If set to true, Resource will be updated only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
  /**
   * Ignores cache reset requirements.
   */
  skipIndexerResetRequirementForCache?: boolean;
  /**
   * Disables cache reprocessing change detection.
   */
  disableCacheReprocessingChangeDetection?: boolean;
}

/**
 * Options for create/update synonymmap operation.
 */
export interface CreateOrUpdateSynonymMapOptions extends OperationOptions {
  /**
   * If set to true, Resource will be updated only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
}

/**
 * Options for create/update indexer operation.
 */
export interface CreateorUpdateIndexerOptions extends OperationOptions {
  /**
   * If set to true, Resource will be updated only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
  /**
   * Ignores cache reset requirements.
   */
  skipIndexerResetRequirementForCache?: boolean;
  /**
   * Disables cache reprocessing change detection.
   */
  disableCacheReprocessingChangeDetection?: boolean;
}

/**
 * Options for create/update datasource operation.
 */
export interface CreateorUpdateDataSourceConnectionOptions extends OperationOptions {
  /**
   * If set to true, Resource will be updated only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
  /**
   * Ignores cache reset requirements.
   */
  skipIndexerResetRequirementForCache?: boolean;
}

/**
 * Options for delete index operation.
 */
export interface DeleteIndexOptions extends OperationOptions {
  /**
   * If set to true, Resource will be deleted only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
}

/**
 * Options for delete skillset operaion.
 */
export interface DeleteSkillsetOptions extends OperationOptions {
  /**
   * If set to true, Resource will be deleted only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
}

/**
 * Options for delete synonymmap operation.
 */
export interface DeleteSynonymMapOptions extends OperationOptions {
  /**
   * If set to true, Resource will be deleted only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
}

/**
 * Options for delete indexer operation.
 */
export interface DeleteIndexerOptions extends OperationOptions {
  /**
   * If set to true, Resource will be deleted only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
}

/**
 * Options for delete datasource operation.
 */
export interface DeleteDataSourceConnectionOptions extends OperationOptions {
  /**
   * If set to true, Resource will be deleted only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
}

/**
 * Options for analyze text operation.
 * Combines operation options with the text analysis parameters.
 */
export type AnalyzeTextOptions = OperationOptions & GeneratedAnalyzeTextOptions;

/**
 * An iterator for listing the indexes that exist in the Search service. Will make requests
 * as needed during iteration. Use .byPage() to make one request to the server
 * per iteration.
 */
export type IndexIterator = PagedAsyncIterableIterator<SearchIndex, SearchIndex[], {}>;

/**
 * An iterator for statistics summaries for each index in the Search service. Will make requests as
 * needed during iteration. Use .byPage() to make one request to the server per iteration.
 */
export type IndexStatisticsSummaryIterator = PagedAsyncIterableIterator<
  IndexStatisticsSummary,
  IndexStatisticsSummary[],
  {}
>;

/**
 * An iterator for listing the knowledge bases that exist in the Search service. Will make requests
 * as needed during iteration. Use .byPage() to make one request to the server per iteration.
 */
export type KnowledgeBaseIterator = PagedAsyncIterableIterator<KnowledgeBase, KnowledgeBase[], {}>;

/**
 * An iterator for listing the knowledge sources that exist in the Search service. Will make requests
 * as needed during iteration. Use .byPage() to make one request to the server per iteration.
 */
export type KnowledgeSourceIterator = PagedAsyncIterableIterator<
  KnowledgeSourceUnion,
  KnowledgeSourceUnion[],
  {}
>;

/**
 * An iterator for listing the aliases that exist in the Search service. This will make requests
 * as needed during iteration. Use .byPage() to make one request to the server
 * per iteration.
 */
export type AliasIterator = PagedAsyncIterableIterator<SearchAlias, SearchAlias[], {}>;

/**
 * An iterator for listing the indexes that exist in the Search service. Will make requests
 * as needed during iteration. Use .byPage() to make one request to the server
 * per iteration.
 */
export type IndexNameIterator = PagedAsyncIterableIterator<string, string[], {}>;

export interface CreateOrUpdateKnowledgeBaseOptions extends OperationOptions {
  /**
   * If set to true, Resource will be deleted only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
}
export interface DeleteKnowledgeBaseOptions extends OperationOptions {
  /**
   * If set to true, Resource will be deleted only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
}

export interface CreateOrUpdateKnowledgeSourceOptions extends OperationOptions {
  /**
   * If set to true, Resource will be deleted only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
}
export interface DeleteKnowledgeSourceOptions extends OperationOptions {
  /**
   * If set to true, Resource will be deleted only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
}

// Re-export FacetResult, QueryAnswerResult, and QueryCaptionResult from generated types
// Dynamic properties should be accessed via `.additionalProperties` object

export type {
  FacetResult,
  QueryAnswerResult,
  QueryCaptionResult,
} from "./models/azure/search/documents/models.js";

// END manually modified generated interfaces
