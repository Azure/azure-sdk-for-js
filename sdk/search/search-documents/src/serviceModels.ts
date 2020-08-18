// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";
import {
  LuceneStandardAnalyzer,
  StopAnalyzer,
  CorsOptions,
  Suggester as SearchSuggester,
  ClassicTokenizer,
  EdgeNGramTokenizer,
  MicrosoftLanguageTokenizer,
  MicrosoftLanguageStemmingTokenizer,
  NGramTokenizer,
  PathHierarchyTokenizerV2 as PathHierarchyTokenizer,
  UaxUrlEmailTokenizer,
  AsciiFoldingTokenFilter,
  CjkBigramTokenFilter,
  CommonGramTokenFilter,
  DictionaryDecompounderTokenFilter,
  LengthTokenFilter,
  ElisionTokenFilter,
  KeepTokenFilter,
  KeywordMarkerTokenFilter,
  LimitTokenFilter,
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
  DistanceScoringFunction,
  FreshnessScoringFunction,
  MagnitudeScoringFunction,
  TagScoringFunction,
  TextWeights,
  ScoringFunctionAggregation,
  RegexFlags,
  ConditionalSkill,
  KeyPhraseExtractionSkill,
  OcrSkill,
  ImageAnalysisSkill,
  LanguageDetectionSkill,
  ShaperSkill,
  MergeSkill,
  EntityRecognitionSkill,
  SentimentSkill,
  SplitSkill,
  TextTranslationSkill,
  WebApiSkill,
  DefaultCognitiveServicesAccount,
  CognitiveServicesAccountKey,
  HighWaterMarkChangeDetectionPolicy,
  SqlIntegratedChangeTrackingPolicy,
  SoftDeleteColumnDeletionDetectionPolicy,
  SearchIndexerDataSourceType,
  SearchIndexerDataContainer,
  LexicalAnalyzerName,
  ClassicSimilarity,
  BM25Similarity,
  EdgeNGramTokenFilterSide,
  ServiceCounters,
  ServiceLimits
} from "./generated/service/models";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

/**
 * Options for a list skillsets operation.
 */
export type ListSkillsetsOptions = OperationOptions;

/**
 * Options for a list synonymMaps operation.
 */
export type ListSynonymMapsOptions = OperationOptions;

/**
 * Options for a list indexes operation.
 */
export type ListIndexesOptions = OperationOptions;

/**
 * Options for a list indexers operation.
 */
export type ListIndexersOptions = OperationOptions;

/**
 * Options for a list data sources operation.
 */
export type ListDataSourceConnectionsOptions = OperationOptions;

/**
 * Options for get index operation.
 */
export type GetIndexOptions = OperationOptions;

/**
 * Options for get skillset operation.
 */
export type GetSkillSetOptions = OperationOptions;

/**
 * Options for get synonymmaps operation.
 */
export type GetSynonymMapsOptions = OperationOptions;

/**
 * Options for get indexer operation.
 */
export type GetIndexerOptions = OperationOptions;

/**
 * Options for get datasource operation.
 */
export type GetDataSourceConnectionOptions = OperationOptions;

/**
 * Options for get index statistics operation.
 */
export type GetIndexStatisticsOptions = OperationOptions;

/**
 * Statistics for a given index. Statistics are collected periodically and are not guaranteed to
 * always be up-to-date.
 */
export interface SearchIndexStatistics {
  /**
   * The number of documents in the index.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly documentCount: number;
  /**
   * The amount of storage in bytes consumed by the index.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly storageSize: number;
}

/**
 * Response from a get service statistics request. If successful, it includes service level
 * counters and limits.
 */
export interface SearchServiceStatistics {
  /**
   * Service level resource counters.
   */
  counters: ServiceCounters;
  /**
   * Service level general limits.
   */
  limits: ServiceLimits;
}

/**
 * Options for get service statistics operation.
 */
export type GetServiceStatisticsOptions = OperationOptions;

/**
 * Options for get indexer status operation.
 */
export type GetIndexerStatusOptions = OperationOptions;

/**
 * Options for reset indexer operation.
 */
export type ResetIndexerOptions = OperationOptions;

/**
 * Options for run indexer operation.
 */
export type RunIndexerOptions = OperationOptions;

/**
 * Options for create index operation.
 */
export type CreateIndexOptions = OperationOptions;

/**
 * Options for create skillset operation.
 */
export type CreateSkillsetOptions = OperationOptions;

/**
 * Options for create synonymmap operation.
 */
export type CreateSynonymMapOptions = OperationOptions;

/**
 * Options for create indexer operation.
 */
export type CreateIndexerOptions = OperationOptions;

/**
 * Options for create datasource operation.
 */
export type CreateDataSourceConnectionOptions = OperationOptions;

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
 * Options for create/update skillset operation.
 */
export interface CreateOrUpdateSkillsetOptions extends OperationOptions {
  /**
   * If set to true, Resource will be deleted only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
}

/**
 * Options for create/update synonymmap operation.
 */
export interface CreateOrUpdateSynonymMapOptions extends OperationOptions {
  /**
   * If set to true, Resource will be deleted only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
}

/**
 * Options for create/update indexer operation.
 */
export interface CreateorUpdateIndexerOptions extends OperationOptions {
  /**
   * If set to true, Resource will be deleted only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
}

/**
 * Options for create/update datasource operation.
 */
export interface CreateorUpdateDataSourceConnectionOptions extends OperationOptions {
  /**
   * If set to true, Resource will be deleted only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
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
 * Specifies some text and analysis components used to break that text into tokens.
 */
export interface AnalyzeRequest {
  /**
   * The text to break into tokens.
   */
  text: string;
  /**
   * The name of the analyzer to use to break the given text. If this parameter is not specified,
   * you must specify a tokenizer instead. The tokenizer and analyzer parameters are mutually
   * exclusive. KnownAnalyzerNames is an enum containing known values.
   * NOTE: Either analyzerName or tokenizerName is required in an AnalyzeRequest.
   */
  analyzerName?: string;
  /**
   * The name of the tokenizer to use to break the given text. If this parameter is not specified,
   * you must specify an analyzer instead. The tokenizer and analyzer parameters are mutually
   * exclusive. KnownTokenizerNames is an enum containing known values.
   * NOTE: Either analyzerName or tokenizerName is required in an AnalyzeRequest.
   */
  tokenizerName?: string;
  /**
   * An optional list of token filters to use when breaking the given text. This parameter can only
   * be set when using the tokenizer parameter.
   */
  tokenFilters?: string[];
  /**
   * An optional list of character filters to use when breaking the given text. This parameter can
   * only be set when using the tokenizer parameter.
   */
  charFilters?: string[];
}

/**
 * Options for analyze text operation.
 */
export type AnalyzeTextOptions = OperationOptions & AnalyzeRequest;

// BEGIN manually modified generated interfaces
//
// This section is for places where we have to manually fix issues
// with interfaces from the generated code.
// One issue is that unions of discriminated types generated with
// their abstract base class as a member.

/**
 * Flexibly separates text into terms via a regular expression pattern. This analyzer is
 * implemented using Apache Lucene.
 */
export interface PatternAnalyzer {
  /**
   * Polymorphic Discriminator
   */
  odatatype: "#Microsoft.Azure.Search.PatternAnalyzer";
  /**
   * The name of the analyzer. It must only contain letters, digits, spaces, dashes or underscores,
   * can only start and end with alphanumeric characters, and is limited to 128 characters.
   */
  name: string;
  /**
   * A value indicating whether terms should be lower-cased. Default is true. Default value: true.
   */
  lowerCaseTerms?: boolean;
  /**
   * A regular expression pattern to match token separators. Default is an expression that matches
   * one or more whitespace characters. Default value: '\W+'.
   */
  pattern?: string;
  /**
   * Regular expression flags. Possible values include: 'CANON_EQ', 'CASE_INSENSITIVE', 'COMMENTS',
   * 'DOTALL', 'LITERAL', 'MULTILINE', 'UNICODE_CASE', 'UNIX_LINES'
   */
  flags?: RegexFlags[];
  /**
   * A list of stopwords.
   */
  stopwords?: string[];
}

/**
 * Allows you to take control over the process of converting text into indexable/searchable tokens.
 * It's a user-defined configuration consisting of a single predefined tokenizer and one or more
 * filters. The tokenizer is responsible for breaking text into tokens, and the filters for
 * modifying tokens emitted by the tokenizer.
 */
export interface CustomAnalyzer {
  /**
   * Polymorphic Discriminator
   */
  odatatype: "#Microsoft.Azure.Search.CustomAnalyzer";
  /**
   * The name of the analyzer. It must only contain letters, digits, spaces, dashes or underscores,
   * can only start and end with alphanumeric characters, and is limited to 128 characters.
   */
  name: string;
  /**
   * The name of the tokenizer to use to divide continuous text into a sequence of tokens, such as
   * breaking a sentence into words. KnownTokenizerNames is an enum containing known values.
   */
  tokenizerName: string;
  /**
   * A list of token filters used to filter out or modify the tokens generated by a tokenizer. For
   * example, you can specify a lowercase filter that converts all characters to lowercase. The
   * filters are run in the order in which they are listed.
   */
  tokenFilters?: string[];
  /**
   * A list of character filters used to prepare input text before it is processed by the
   * tokenizer. For instance, they can replace certain characters or symbols. The filters are run
   * in the order in which they are listed.
   */
  charFilters?: string[];
}

/**
 * Contains the possible cases for Analyzer.
 */
export type LexicalAnalyzer =
  | CustomAnalyzer
  | PatternAnalyzer
  | LuceneStandardAnalyzer
  | StopAnalyzer;

/**
 * Contains the possible cases for Skill.
 */
export type SearchIndexerSkill =
  | ConditionalSkill
  | KeyPhraseExtractionSkill
  | OcrSkill
  | ImageAnalysisSkill
  | LanguageDetectionSkill
  | ShaperSkill
  | MergeSkill
  | EntityRecognitionSkill
  | SentimentSkill
  | SplitSkill
  | TextTranslationSkill
  | WebApiSkill;

/**
 * Contains the possible cases for CognitiveServicesAccount.
 */
export type CognitiveServicesAccount =
  | DefaultCognitiveServicesAccount
  | CognitiveServicesAccountKey;
/**
 * Tokenizer that uses regex pattern matching to construct distinct tokens. This tokenizer is
 * implemented using Apache Lucene.
 */
export interface PatternTokenizer {
  /**
   * Polymorphic Discriminator
   */
  odatatype: "#Microsoft.Azure.Search.PatternTokenizer";
  /**
   * The name of the tokenizer. It must only contain letters, digits, spaces, dashes or
   * underscores, can only start and end with alphanumeric characters, and is limited to 128
   * characters.
   */
  name: string;
  /**
   * A regular expression pattern to match token separators. Default is an expression that matches
   * one or more whitespace characters. Default value: '\W+'.
   */
  pattern?: string;
  /**
   * Regular expression flags. Possible values include: 'CANON_EQ', 'CASE_INSENSITIVE', 'COMMENTS',
   * 'DOTALL', 'LITERAL', 'MULTILINE', 'UNICODE_CASE', 'UNIX_LINES'
   */
  flags?: RegexFlags[];
  /**
   * The zero-based ordinal of the matching group in the regular expression pattern to extract into
   * tokens. Use -1 if you want to use the entire pattern to split the input into tokens,
   * irrespective of matching groups. Default is -1. Default value: -1.
   */
  group?: number;
}
/**
 * Breaks text following the Unicode Text Segmentation rules. This tokenizer is implemented using
 * Apache Lucene.
 */
export interface LuceneStandardTokenizer {
  /**
   * Polymorphic Discriminator
   */
  odatatype:
    | "#Microsoft.Azure.Search.StandardTokenizerV2"
    | "#Microsoft.Azure.Search.StandardTokenizer";
  /**
   * The name of the tokenizer. It must only contain letters, digits, spaces, dashes or
   * underscores, can only start and end with alphanumeric characters, and is limited to 128
   * characters.
   */
  name: string;
  /**
   * The maximum token length. Default is 255. Tokens longer than the maximum length are split. The
   * maximum token length that can be used is 300 characters. Default value: 255.
   */
  maxTokenLength?: number;
}

/**
 * Generates n-grams of the given size(s) starting from the front or the back of an input token.
 * This token filter is implemented using Apache Lucene.
 */
export interface EdgeNGramTokenFilter {
  /**
   * Polymorphic Discriminator
   */
  odatatype:
    | "#Microsoft.Azure.Search.EdgeNGramTokenFilterV2"
    | "#Microsoft.Azure.Search.EdgeNGramTokenFilter";
  /**
   * The name of the token filter. It must only contain letters, digits, spaces, dashes or
   * underscores, can only start and end with alphanumeric characters, and is limited to 128
   * characters.
   */
  name: string;
  /**
   * The minimum n-gram length. Default is 1. Maximum is 300. Must be less than the value of
   * maxGram. Default value: 1.
   */
  minGram?: number;
  /**
   * The maximum n-gram length. Default is 2. Maximum is 300. Default value: 2.
   */
  maxGram?: number;
  /**
   * Specifies which side of the input the n-gram should be generated from. Default is "front".
   * Possible values include: 'Front', 'Back'
   */
  side?: EdgeNGramTokenFilterSide;
}

/**
 * Emits the entire input as a single token. This tokenizer is implemented using Apache Lucene.
 */
export interface KeywordTokenizer {
  /**
   * Polymorphic Discriminator
   */
  odatatype:
    | "#Microsoft.Azure.Search.KeywordTokenizerV2"
    | "#Microsoft.Azure.Search.KeywordTokenizer";
  /**
   * The name of the tokenizer. It must only contain letters, digits, spaces, dashes or
   * underscores, can only start and end with alphanumeric characters, and is limited to 128
   * characters.
   */
  name: string;
  /**
   * The maximum token length. Default is 256. Tokens longer than the maximum length are split. The
   * maximum token length that can be used is 300 characters. Default value: 256.
   */
  maxTokenLength?: number;
}

/**
 * Contains the possible cases for Tokenizer.
 */
export type LexicalTokenizer =
  | ClassicTokenizer
  | EdgeNGramTokenizer
  | KeywordTokenizer
  | MicrosoftLanguageTokenizer
  | MicrosoftLanguageStemmingTokenizer
  | NGramTokenizer
  | PathHierarchyTokenizer
  | PatternTokenizer
  | LuceneStandardTokenizer
  | UaxUrlEmailTokenizer;

/**
 * Contains the possible cases for Similarity.
 */
export type SimilarityAlgorithm = ClassicSimilarity | BM25Similarity;

/**
 * Generates n-grams of the given size(s). This token filter is implemented using Apache Lucene.
 */
export interface NGramTokenFilter {
  /**
   * Polymorphic Discriminator
   */
  odatatype:
    | "#Microsoft.Azure.Search.NGramTokenFilterV2"
    | "#Microsoft.Azure.Search.NGramTokenFilter";
  /**
   * The name of the token filter. It must only contain letters, digits, spaces, dashes or
   * underscores, can only start and end with alphanumeric characters, and is limited to 128
   * characters.
   */
  name: string;
  /**
   * The minimum n-gram length. Default is 1. Maximum is 300. Must be less than the value of
   * maxGram. Default value: 1.
   */
  minGram?: number;
  /**
   * The maximum n-gram length. Default is 2. Maximum is 300. Default value: 2.
   */
  maxGram?: number;
}

/**
 * Contains the possible cases for TokenFilter.
 */
export type TokenFilter =
  | AsciiFoldingTokenFilter
  | CjkBigramTokenFilter
  | CommonGramTokenFilter
  | DictionaryDecompounderTokenFilter
  | EdgeNGramTokenFilter
  | ElisionTokenFilter
  | KeepTokenFilter
  | KeywordMarkerTokenFilter
  | LengthTokenFilter
  | LimitTokenFilter
  | NGramTokenFilter
  | PatternCaptureTokenFilter
  | PatternReplaceTokenFilter
  | PhoneticTokenFilter
  | ShingleTokenFilter
  | SnowballTokenFilter
  | StemmerTokenFilter
  | StemmerOverrideTokenFilter
  | StopwordsTokenFilter
  | SynonymTokenFilter
  | TruncateTokenFilter
  | UniqueTokenFilter
  | WordDelimiterTokenFilter;

/**
 * Contains the possible cases for CharFilter.
 */
export type CharFilter = MappingCharFilter | PatternReplaceCharFilter;

/**
 * Contains the possible cases for ScoringFunction.
 */
export type ScoringFunction =
  | DistanceScoringFunction
  | FreshnessScoringFunction
  | MagnitudeScoringFunction
  | TagScoringFunction;

/**
 * Defines values for SearchFieldDataType.
 * Possible values include: 'Edm.String', 'Edm.Int32', 'Edm.Int64', 'Edm.Double', 'Edm.Boolean',
 * 'Edm.DateTimeOffset', 'Edm.GeographyPoint', 'Collection(Edm.String)',
 * 'Collection(Edm.Int32)', 'Collection(Edm.Int64)', 'Collection(Edm.Double)',
 * 'Collection(Edm.Boolean)', 'Collection(Edm.DateTimeOffset)', 'Collection(Edm.GeographyPoint)'
 * @readonly
 * @enum {string}
 */
export type SearchFieldDataType =
  | "Edm.String"
  | "Edm.Int32"
  | "Edm.Int64"
  | "Edm.Double"
  | "Edm.Boolean"
  | "Edm.DateTimeOffset"
  | "Edm.GeographyPoint"
  | "Collection(Edm.String)"
  | "Collection(Edm.Int32)"
  | "Collection(Edm.Int64)"
  | "Collection(Edm.Double)"
  | "Collection(Edm.Boolean)"
  | "Collection(Edm.DateTimeOffset)"
  | "Collection(Edm.GeographyPoint)";

/**
 * Defines values for ComplexDataType.
 * Possible values include: 'Edm.ComplexType', 'Collection(Edm.ComplexType)'
 * @readonly
 * @enum {string}
 */
export type ComplexDataType = "Edm.ComplexType" | "Collection(Edm.ComplexType)";

/**
 * Represents a field in an index definition, which describes the name, data type, and search
 * behavior of a field.
 */
export type SearchField = SimpleField | ComplexField;

/**
 * Represents a field in an index definition, which describes the name, data type, and search
 * behavior of a field.
 */
export interface SimpleField {
  /**
   * The name of the field, which must be unique within the fields collection of the index or
   * parent field.
   */
  name: string;
  /**
   * The data type of the field. Possible values include: 'Edm.String', 'Edm.Int32', 'Edm.Int64',
   * 'Edm.Double', 'Edm.Boolean', 'Edm.DateTimeOffset', 'Edm.GeographyPoint'
   * 'Collection(Edm.String)', 'Collection(Edm.Int32)', 'Collection(Edm.Int64)',
   * 'Collection(Edm.Double)', 'Collection(Edm.Boolean)', 'Collection(Edm.DateTimeOffset)',
   * 'Collection(Edm.GeographyPoint)'
   */
  type: SearchFieldDataType;
  /**
   * A value indicating whether the field uniquely identifies documents in the index. Exactly one
   * top-level field in each index must be chosen as the key field and it must be of type
   * Edm.String. Key fields can be used to look up documents directly and update or delete specific
   * documents. Default is false.
   */
  key?: boolean;
  /**
   * A value indicating whether the field can be returned in a search result. You can enable this
   * option if you want to use a field (for example, margin) as a filter, sorting, or scoring
   * mechanism but do not want the field to be visible to the end user. This property must be false
   * for key fields. This property can be changed on existing fields.
   * Disabling this property does not cause any increase in index storage requirements.
   * Default is false.
   */
  hidden?: boolean;
  /**
   * A value indicating whether the field is full-text searchable. This means it will undergo
   * analysis such as word-breaking during indexing. If you set a searchable field to a value like
   * "sunny day", internally it will be split into the individual tokens "sunny" and "day". This
   * enables full-text searches for these terms. This property must be false for simple
   * fields of other non-string data types.
   * Note: searchable fields consume extra space in your index since Azure Cognitive Search will store an
   * additional tokenized version of the field value for full-text searches.
   * Defaults to false for simple fields.
   */
  searchable?: boolean;
  /**
   * A value indicating whether to enable the field to be referenced in $filter queries. Filterable
   * differs from searchable in how strings are handled. Fields of type Edm.String or
   * Collection(Edm.String) that are filterable do not undergo word-breaking, so comparisons are
   * for exact matches only. For example, if you set such a field f to "sunny day", $filter=f eq
   * 'sunny' will find no matches, but $filter=f eq 'sunny day' will.
   * Default is false.
   */
  filterable?: boolean;
  /**
   * A value indicating whether to enable the field to be referenced in $orderby expressions. By
   * default Azure Cognitive Search sorts results by score, but in many experiences users will want
   * to sort by fields in the documents. A simple field can be sortable only if it is single-valued
   * (it has a single value in the scope of the parent document). Simple collection fields cannot
   * be sortable, since they are multi-valued. Simple sub-fields of complex collections are also
   * multi-valued, and therefore cannot be sortable. This is true whether it's an immediate parent
   * field, or an ancestor field, that's the complex collection. The default for sortable is false.
   */
  sortable?: boolean;
  /**
   * A value indicating whether to enable the field to be referenced in facet queries. Typically
   * used in a presentation of search results that includes hit count by category (for example,
   * search for digital cameras and see hits by brand, by megapixels, by price, and so on).
   * Fields of type Edm.GeographyPoint or Collection(Edm.GeographyPoint) cannot be facetable.
   * Default is false for all other simple fields.
   */
  facetable?: boolean;
  /**
   * The name of the language analyzer to use for the field. This option can be used only with
   * searchable fields and it can't be set together with either searchAnalyzer or indexAnalyzer.
   * Once the analyzer is chosen, it cannot be changed for the field.
   * KnownAnalyzerNames is an enum containing known values.
   */
  analyzerName?: LexicalAnalyzerName;
  /**
   * The name of the analyzer used at search time for the field. This option can be used only with
   * searchable fields. It must be set together with indexAnalyzer and it cannot be set together
   * with the analyzer option. This analyzer can be updated on an existing field.
   * KnownAnalyzerNames is an enum containing known values.
   */
  searchAnalyzerName?: LexicalAnalyzerName;
  /**
   * The name of the analyzer used at indexing time for the field. This option can be used only
   * with searchable fields. It must be set together with searchAnalyzer and it cannot be set
   * together with the analyzer option. Once the analyzer is chosen, it cannot be changed for the
   * field. KnownAnalyzerNames is an enum containing known values.
   */
  indexAnalyzerName?: LexicalAnalyzerName;
  /**
   * A list of the names of synonym maps to associate with this field. This option can be used only
   * with searchable fields. Currently only one synonym map per field is supported. Assigning a
   * synonym map to a field ensures that query terms targeting that field are expanded at
   * query-time using the rules in the synonym map. This attribute can be changed on existing
   * fields.
   */
  synonymMapNames?: string[];
}

export function isComplexField(field: SearchField): field is ComplexField {
  return field.type === "Edm.ComplexType" || field.type === "Collection(Edm.ComplexType)";
}

/**
 * Represents a field in an index definition, which describes the name, data type, and search
 * behavior of a field.
 */
export interface ComplexField {
  /**
   * The name of the field, which must be unique within the fields collection of the index or
   * parent field.
   */
  name: string;
  /**
   * The data type of the field.
   * Possible values include: 'Edm.ComplexType','Collection(Edm.ComplexType)'
   */
  type: ComplexDataType;
  /**
   * A list of sub-fields.
   */
  fields: SearchField[];
}

/**
 * Represents a synonym map definition.
 */
export interface SynonymMap {
  /**
   * The name of the synonym map.
   */
  name: string;
  /**
   * An array of synonym rules in the specified synonym map format.
   */
  synonyms: string[];
  /**
   * A description of an encryption key that you create in Azure Key Vault. This key is used to
   * provide an additional level of encryption-at-rest for your data when you want full assurance
   * that no one, not even Microsoft, can decrypt your data in Azure Cognitive Search. Once you
   * have encrypted your data, it will always remain encrypted. Azure Cognitive Search will ignore
   * attempts to set this property to null. You can change this property as needed if you want to
   * rotate your encryption key; Your data will be unaffected. Encryption with customer-managed
   * keys is not available for free search services, and is only available for paid services
   * created on or after January 1, 2019.
   */
  encryptionKey?: SearchResourceEncryptionKey;
  /**
   * The ETag of the synonym map.
   */
  etag?: string;
}

/**
 * An iterator for listing the indexes that exist in the Search service. Will make requests
 * as needed during iteration. Use .byPage() to make one request to the server
 * per iteration.
 */
export type IndexIterator = PagedAsyncIterableIterator<SearchIndex, SearchIndex[], {}>;

/**
 * An iterator for listing the indexes that exist in the Search service. Will make requests
 * as needed during iteration. Use .byPage() to make one request to the server
 * per iteration.
 */
export type IndexNameIterator = PagedAsyncIterableIterator<string, string[], {}>;

/**
 * Represents a search index definition, which describes the fields and search behavior of an
 * index.
 */
export interface SearchIndex {
  /**
   * The name of the index.
   */
  name: string;
  /**
   * The fields of the index.
   */
  fields: SearchField[];
  /**
   * The scoring profiles for the index.
   */
  scoringProfiles?: ScoringProfile[];
  /**
   * The name of the scoring profile to use if none is specified in the query. If this property is
   * not set and no scoring profile is specified in the query, then default scoring (tf-idf) will
   * be used.
   */
  defaultScoringProfile?: string;
  /**
   * Options to control Cross-Origin Resource Sharing (CORS) for the index.
   */
  corsOptions?: CorsOptions;
  /**
   * The suggesters for the index.
   */
  suggesters?: SearchSuggester[];
  /**
   * The analyzers for the index.
   */
  analyzers?: LexicalAnalyzer[];
  /**
   * The tokenizers for the index.
   */
  tokenizers?: LexicalTokenizer[];
  /**
   * The token filters for the index.
   */
  tokenFilters?: TokenFilter[];
  /**
   * The character filters for the index.
   */
  charFilters?: CharFilter[];
  /**
   * A description of an encryption key that you create in Azure Key Vault. This key is used to
   * provide an additional level of encryption-at-rest for your data when you want full assurance
   * that no one, not even Microsoft, can decrypt your data in Azure Cognitive Search. Once you
   * have encrypted your data, it will always remain encrypted. Azure Cognitive Search will ignore
   * attempts to set this property to null. You can change this property as needed if you want to
   * rotate your encryption key; Your data will be unaffected. Encryption with customer-managed
   * keys is not available for free search services, and is only available for paid services
   * created on or after January 1, 2019.
   */
  encryptionKey?: SearchResourceEncryptionKey;
  /**
   * The type of similarity algorithm to be used when scoring and ranking the documents matching a
   * search query. The similarity algorithm can only be defined at index creation time and cannot
   * be modified on existing indexes. If null, the ClassicSimilarity algorithm is used.
   */
  similarity?: SimilarityAlgorithm;
  /**
   * The ETag of the index.
   */
  etag?: string;
}

/**
 * A customer-managed encryption key in Azure Key Vault. Keys that you create and manage can be
 * used to encrypt or decrypt data-at-rest in Azure Cognitive Search, such as indexes and synonym
 * maps.
 */
export interface SearchResourceEncryptionKey {
  /**
   * The name of your Azure Key Vault key to be used to encrypt your data at rest.
   */
  keyName: string;
  /**
   * The version of your Azure Key Vault key to be used to encrypt your data at rest.
   */
  keyVersion: string;
  /**
   * The URI of your Azure Key Vault, also referred to as DNS name, that contains the key to be
   * used to encrypt your data at rest. An example URI might be
   * https://my-keyvault-name.vault.azure.net.
   */
  vaultUrl: string;
  /**
   * An AAD Application ID that was granted the required access permissions to the Azure Key Vault
   * that is to be used when encrypting your data at rest. The Application ID should not be
   * confused with the Object ID for your AAD Application.
   */
  applicationId?: string;
  /**
   * The authentication key of the specified AAD application.
   */
  applicationSecret?: string;
}

/**
 * A list of skills.
 */
export interface SearchIndexerSkillset {
  /**
   * The name of the skillset.
   */
  name: string;
  /**
   * The description of the skillset.
   */
  description?: string;
  /**
   * A list of skills in the skillset.
   */
  skills: SearchIndexerSkill[];
  /**
   * Details about cognitive services to be used when running skills.
   */
  cognitiveServicesAccount?: CognitiveServicesAccount;
  /**
   * The ETag of the skillset.
   */
  etag?: string;
}

/**
 * Defines parameters for a search index that influence scoring in search queries.
 */
export interface ScoringProfile {
  /**
   * The name of the scoring profile.
   */
  name: string;
  /**
   * Parameters that boost scoring based on text matches in certain index fields.
   */
  textWeights?: TextWeights;
  /**
   * The collection of functions that influence the scoring of documents.
   */
  functions?: ScoringFunction[];
  /**
   * A value indicating how the results of individual scoring functions should be combined.
   * Defaults to "Sum". Ignored if there are no scoring functions. Possible values include: 'sum',
   * 'average', 'minimum', 'maximum', 'firstMatching'
   */
  functionAggregation?: ScoringFunctionAggregation;
}

/**
 * Defines values for TokenizerName.
 * @readonly
 * @enum {string}
 */
export enum KnownTokenizerNames {
  /**
   * Grammar-based tokenizer that is suitable for processing most European-language documents. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/standard/ClassicTokenizer.html
   */
  Classic = "classic",
  /**
   * Tokenizes the input from an edge into n-grams of the given size(s). See
   * https://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/ngram/EdgeNGramTokenizer.html
   */
  EdgeNGram = "edgeNGram",
  /**
   * Emits the entire input as a single token. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/KeywordTokenizer.html
   */
  Keyword = "keyword_v2",
  /**
   * Divides text at non-letters. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/LetterTokenizer.html
   */
  Letter = "letter",
  /**
   * Divides text at non-letters and converts them to lower case. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/LowerCaseTokenizer.html
   */
  Lowercase = "lowercase",
  /**
   * Divides text using language-specific rules.
   */
  MicrosoftLanguageTokenizer = "microsoft_language_tokenizer",
  /**
   * Divides text using language-specific rules and reduces words to their base forms.
   */
  MicrosoftLanguageStemmingTokenizer = "microsoft_language_stemming_tokenizer",
  /**
   * Tokenizes the input into n-grams of the given size(s). See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/ngram/NGramTokenizer.html
   */
  NGram = "nGram",
  /**
   * Tokenizer for path-like hierarchies. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/path/PathHierarchyTokenizer.html
   */
  PathHierarchy = "path_hierarchy_v2",
  /**
   * Tokenizer that uses regex pattern matching to construct distinct tokens. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/pattern/PatternTokenizer.html
   */
  Pattern = "pattern",
  /**
   * Standard Lucene analyzer; Composed of the standard tokenizer, lowercase filter and stop
   * filter. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/standard/StandardTokenizer.html
   */
  Standard = "standard_v2",
  /**
   * Tokenizes urls and emails as one token. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/standard/UAX29URLEmailTokenizer.html
   */
  UaxUrlEmail = "uax_url_email",
  /**
   * Divides text at whitespace. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/WhitespaceTokenizer.html
   */
  Whitespace = "whitespace"
}

/**
 * Defines values for TokenFilterName.
 * @readonly
 * @enum {string}
 */
export enum KnownTokenFilterNames {
  /**
   * A token filter that applies the Arabic normalizer to normalize the orthography. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/ar/ArabicNormalizationFilter.html
   */
  ArabicNormalization = "arabic_normalization",
  /**
   * Strips all characters after an apostrophe (including the apostrophe itself). See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/tr/ApostropheFilter.html
   */
  Apostrophe = "apostrophe",
  /**
   * Converts alphabetic, numeric, and symbolic Unicode characters which are not in the first 127
   * ASCII characters (the "Basic Latin" Unicode block) into their ASCII equivalents, if such
   * equivalents exist. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/ASCIIFoldingFilter.html
   */
  AsciiFolding = "asciifolding",
  /**
   * Forms bigrams of CJK terms that are generated from StandardTokenizer. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/cjk/CJKBigramFilter.html
   */
  CjkBigram = "cjk_bigram",
  /**
   * Normalizes CJK width differences. Folds fullwidth ASCII variants into the equivalent basic
   * Latin, and half-width Katakana variants into the equivalent Kana. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/cjk/CJKWidthFilter.html
   */
  CjkWidth = "cjk_width",
  /**
   * Removes English possessives, and dots from acronyms. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/standard/ClassicFilter.html
   */
  Classic = "classic",
  /**
   * Construct bigrams for frequently occurring terms while indexing. Single terms are still
   * indexed too, with bigrams overlaid. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/commongrams/CommonGramsFilter.html
   */
  CommonGram = "common_grams",
  /**
   * Generates n-grams of the given size(s) starting from the front or the back of an input token.
   * See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/ngram/EdgeNGramTokenFilter.html
   */
  EdgeNGram = "edgeNGram_v2",
  /**
   * Removes elisions. For example, "l'avion" (the plane) will be converted to "avion" (plane). See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/util/ElisionFilter.html
   */
  Elision = "elision",
  /**
   * Normalizes German characters according to the heuristics of the German2 snowball algorithm.
   * See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/de/GermanNormalizationFilter.html
   */
  GermanNormalization = "german_normalization",
  /**
   * Normalizes text in Hindi to remove some differences in spelling variations. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/hi/HindiNormalizationFilter.html
   */
  HindiNormalization = "hindi_normalization",
  /**
   * Normalizes the Unicode representation of text in Indian languages. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/in/IndicNormalizationFilter.html
   */
  IndicNormalization = "indic_normalization",
  /**
   * Emits each incoming token twice, once as keyword and once as non-keyword. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/KeywordRepeatFilter.html
   */
  KeywordRepeat = "keyword_repeat",
  /**
   * A high-performance kstem filter for English. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/en/KStemFilter.html
   */
  KStem = "kstem",
  /**
   * Removes words that are too long or too short. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/LengthFilter.html
   */
  Length = "length",
  /**
   * Limits the number of tokens while indexing. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/LimitTokenCountFilter.html
   */
  Limit = "limit",
  /**
   * Normalizes token text to lower case. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/LowerCaseFilter.htm
   */
  Lowercase = "lowercase",
  /**
   * Generates n-grams of the given size(s). See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/ngram/NGramTokenFilter.html
   */
  NGram = "nGram_v2",
  /**
   * Applies normalization for Persian. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/fa/PersianNormalizationFilter.html
   */
  PersianNormalization = "persian_normalization",
  /**
   * Create tokens for phonetic matches. See
   * https://lucene.apache.org/core/4_10_3/analyzers-phonetic/org/apache/lucene/analysis/phonetic/package-tree.html
   */
  Phonetic = "phonetic",
  /**
   * Uses the Porter stemming algorithm to transform the token stream. See
   * http://tartarus.org/~martin/PorterStemmer
   */
  PorterStem = "porter_stem",
  /**
   * Reverses the token string. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/reverse/ReverseStringFilter.html
   */
  Reverse = "reverse",
  /**
   * Normalizes use of the interchangeable Scandinavian characters. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/ScandinavianNormalizationFilter.html
   */
  ScandinavianNormalization = "scandinavian_normalization",
  /**
   * Folds Scandinavian characters åÅäæÄÆ-&gt;a and öÖøØ-&gt;o. It also discriminates against use
   * of double vowels aa, ae, ao, oe and oo, leaving just the first one. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/ScandinavianFoldingFilter.html
   */
  ScandinavianFoldingNormalization = "scandinavian_folding",
  /**
   * Creates combinations of tokens as a single token. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/shingle/ShingleFilter.html
   */
  Shingle = "shingle",
  /**
   * A filter that stems words using a Snowball-generated stemmer. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/snowball/SnowballFilter.html
   */
  Snowball = "snowball",
  /**
   * Normalizes the Unicode representation of Sorani text. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/ckb/SoraniNormalizationFilter.html
   */
  SoraniNormalization = "sorani_normalization",
  /**
   * Language specific stemming filter. See
   * https://docs.microsoft.com/rest/api/searchservice/Custom-analyzers-in-Azure-Search#TokenFilters
   */
  Stemmer = "stemmer",
  /**
   * Removes stop words from a token stream. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/StopFilter.html
   */
  Stopwords = "stopwords",
  /**
   * Trims leading and trailing whitespace from tokens. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/TrimFilter.html
   */
  Trim = "trim",
  /**
   * Truncates the terms to a specific length. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/TruncateTokenFilter.html
   */
  Truncate = "truncate",
  /**
   * Filters out tokens with same text as the previous token. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/miscellaneous/RemoveDuplicatesTokenFilter.html
   */
  Unique = "unique",
  /**
   * Normalizes token text to upper case. See
   * http://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/core/UpperCaseFilter.html
   */
  Uppercase = "uppercase",
  /**
   * Splits words into subwords and performs optional transformations on subword groups.
   */
  WordDelimiter = "word_delimiter"
}

/**
 * Defines values for CharFilterName.
 * @readonly
 * @enum {string}
 */
export enum KnownCharFilterNames {
  /**
   * A character filter that attempts to strip out HTML constructs. See
   * https://lucene.apache.org/core/4_10_3/analyzers-common/org/apache/lucene/analysis/charfilter/HTMLStripCharFilter.html
   */
  HtmlStrip = "html_strip"
}

/**
 * Defines values for AnalyzerName.
 * See https://docs.microsoft.com/rest/api/searchservice/Language-support
 * @readonly
 * @enum {string}
 */
export enum KnownAnalyzerNames {
  /**
   * Arabic
   */
  ArMicrosoft = "ar.microsoft",
  /**
   * Arabic
   */
  ArLucene = "ar.lucene",
  /**
   * Armenian
   */
  HyLucene = "hy.lucene",
  /**
   * Bangla
   */
  BnMicrosoft = "bn.microsoft",
  /**
   * Basque
   */
  EuLucene = "eu.lucene",
  /**
   * Bulgarian
   */
  BgMicrosoft = "bg.microsoft",
  /**
   * Bulgarian
   */
  BgLucene = "bg.lucene",
  /**
   * Catalan
   */
  CaMicrosoft = "ca.microsoft",
  /**
   * Catalan
   */
  CaLucene = "ca.lucene",
  /**
   * Chinese Simplified
   */
  ZhHansMicrosoft = "zh-Hans.microsoft",
  /**
   * Chinese Simplified
   */
  ZhHansLucene = "zh-Hans.lucene",
  /**
   * Chinese Traditional
   */
  ZhHantMicrosoft = "zh-Hant.microsoft",
  /**
   * Chinese Traditional
   */
  ZhHantLucene = "zh-Hant.lucene",
  /**
   * Croatian
   */
  HrMicrosoft = "hr.microsoft",
  /**
   * Czech
   */
  CsMicrosoft = "cs.microsoft",
  /**
   * Czech
   */
  CsLucene = "cs.lucene",
  /**
   * Danish
   */
  DaMicrosoft = "da.microsoft",
  /**
   * Danish
   */
  DaLucene = "da.lucene",
  /**
   * Dutch
   */
  NlMicrosoft = "nl.microsoft",
  /**
   * Dutch
   */
  NlLucene = "nl.lucene",
  /**
   * English
   */
  EnMicrosoft = "en.microsoft",
  /**
   * English
   */
  EnLucene = "en.lucene",
  /**
   * Estonian
   */
  EtMicrosoft = "et.microsoft",
  /**
   * Finnish
   */
  FiMicrosoft = "fi.microsoft",
  /**
   * Finnish
   */
  FiLucene = "fi.lucene",
  /**
   * French
   */
  FrMicrosoft = "fr.microsoft",
  /**
   * French
   */
  FrLucene = "fr.lucene",
  /**
   * Galician
   */
  GlLucene = "gl.lucene",
  /**
   * German
   */
  DeMicrosoft = "de.microsoft",
  /**
   * German
   */
  DeLucene = "de.lucene",
  /**
   * Greek
   */
  ElMicrosoft = "el.microsoft",
  /**
   * Greek
   */
  ElLucene = "el.lucene",
  /**
   * Gujarati
   */
  GuMicrosoft = "gu.microsoft",
  /**
   * Hebrew
   */
  HeMicrosoft = "he.microsoft",
  /**
   * Hindi
   */
  HiMicrosoft = "hi.microsoft",
  /**
   * Hindi
   */
  HiLucene = "hi.lucene",
  /**
   * Hungarian
   */
  HuMicrosoft = "hu.microsoft",
  /**
   * Hungarian
   */
  HuLucene = "hu.lucene",
  /**
   * Icelandic
   */
  IsMicrosoft = "is.microsoft",
  /**
   * Indonesian (Bahasa)
   */
  IdMicrosoft = "id.microsoft",
  /**
   * Indonesian (Bahasa)
   */
  IdLucene = "id.lucene",
  /**
   * Irish
   */
  GaLucene = "ga.lucene",
  /**
   * Italian
   */
  ItMicrosoft = "it.microsoft",
  /**
   * Italian
   */
  ItLucene = "it.lucene",
  /**
   * Japanese
   */
  JaMicrosoft = "ja.microsoft",
  /**
   * Japanese
   */
  JaLucene = "ja.lucene",
  /**
   * Kannada
   */
  KnMicrosoft = "kn.microsoft",
  /**
   * Korean
   */
  KoMicrosoft = "ko.microsoft",
  /**
   * Korean
   */
  KoLucene = "ko.lucene",
  /**
   * Latvian
   */
  LvMicrosoft = "lv.microsoft",
  /**
   * Latvian
   */
  LvLucene = "lv.lucene",
  /**
   * Lithuanian
   */
  LtMicrosoft = "lt.microsoft",
  /**
   * Malayalam
   */
  MlMicrosoft = "ml.microsoft",
  /**
   * Malay (Latin)
   */
  MsMicrosoft = "ms.microsoft",
  /**
   * Marathi
   */
  MrMicrosoft = "mr.microsoft",
  /**
   * Norwegian
   */
  NbMicrosoft = "nb.microsoft",
  /**
   * Norwegian
   */
  NoLucene = "no.lucene",
  /**
   * Persian
   */
  FaLucene = "fa.lucene",
  /**
   * Polish
   */
  PlMicrosoft = "pl.microsoft",
  /**
   * Polish
   */
  PlLucene = "pl.lucene",
  /**
   * Portuguese (Brazil)
   */
  PtBRMicrosoft = "pt-BR.microsoft",
  /**
   * Portuguese (Brazil)
   */
  PtBRLucene = "pt-BR.lucene",
  /**
   * Portuguese (Portugal)
   */
  PtPTMicrosoft = "pt-PT.microsoft",
  /**
   * Portuguese (Portugal)
   */
  PtPTLucene = "pt-PT.lucene",
  /**
   * Punjabi
   */ PaMicrosoft = "pa.microsoft",
  /**
   * Romanian
   */
  RoMicrosoft = "ro.microsoft",
  /**
   * Romanian
   */
  RoLucene = "ro.lucene",
  /**
   * Russian
   */
  RuMicrosoft = "ru.microsoft",
  /**
   * Russian
   */
  RuLucene = "ru.lucene",
  /**
   * Serbian (Cyrillic)
   */
  SrCyrillicMicrosoft = "sr-cyrillic.microsoft",
  /**
   * Serbian (Latin)
   */
  SrLatinMicrosoft = "sr-latin.microsoft",
  /**
   * Slovak
   */
  SkMicrosoft = "sk.microsoft",
  /**
   * Slovenian
   */
  SlMicrosoft = "sl.microsoft",
  /**
   * Spanish
   */
  EsMicrosoft = "es.microsoft",
  /**
   * Spanish
   */
  EsLucene = "es.lucene",
  /**
   * Swedish
   */
  SvMicrosoft = "sv.microsoft",
  /**
   * Swedish
   */
  SvLucene = "sv.lucene",
  /**
   * Tamil
   */
  TaMicrosoft = "ta.microsoft",
  /**
   * Telugu
   */
  TeMicrosoft = "te.microsoft",
  /**
   * Thai
   */
  ThMicrosoft = "th.microsoft",
  /**
   * Thai
   */
  ThLucene = "th.lucene",
  /**
   * Turkish
   */
  TrMicrosoft = "tr.microsoft",
  /**
   * Turkish
   */
  TrLucene = "tr.lucene",
  /**
   * Ukrainian
   */
  UkMicrosoft = "uk.microsoft",
  /**
   * Urdu
   */
  UrMicrosoft = "ur.microsoft",
  /**
   * Vietnamese
   */
  ViMicrosoft = "vi.microsoft",
  /**
   * See: https://lucene.apache.org/core/6_6_1/core/org/apache/lucene/analysis/standard/StandardAnalyzer.html
   */
  StandardLucene = "standard.lucene",
  /**
   * See https://lucene.apache.org/core/6_6_1/analyzers-common/org/apache/lucene/analysis/miscellaneous/ASCIIFoldingFilter.html
   */
  StandardAsciiFoldingLucene = "standardasciifolding.lucene",
  /**
   * Treats the entire content of a field as a single token. This is useful for data like zip codes, ids, and some product names.
   */
  Keyword = "keyword",
  /**
   * Flexibly separates text into terms via a regular expression pattern.
   */
  Pattern = "pattern",
  /**
   * Divides text at non-letters and converts them to lower case.
   */
  Simple = "simple",
  /**
   * Divides text at non-letters; Applies the lowercase and stopword token filters.
   */
  Stop = "stop",
  /**
   * An analyzer that uses the whitespace tokenizer.
   */
  Whitespace = "whitespace"
}

/**
 * Contains the possible cases for DataChangeDetectionPolicy.
 */
export type DataChangeDetectionPolicy =
  | HighWaterMarkChangeDetectionPolicy
  | SqlIntegratedChangeTrackingPolicy;

/**
 * Contains the possible cases for DataDeletionDetectionPolicy.
 */
export type DataDeletionDetectionPolicy = SoftDeleteColumnDeletionDetectionPolicy;

/**
 * Represents a datasource definition, which can be used to configure an indexer.
 */
export interface SearchIndexerDataSourceConnection {
  /**
   * The name of the datasource.
   */
  name: string;
  /**
   * The description of the datasource.
   */
  description?: string;
  /**
   * The type of the datasource. Possible values include: 'AzureSql', 'CosmosDb', 'AzureBlob',
   * 'AzureTable', 'MySql'
   */
  type: SearchIndexerDataSourceType;
  /**
   * The connection string for the datasource.
   */
  connectionString?: string;
  /**
   * The data container for the datasource.
   */
  container: SearchIndexerDataContainer;
  /**
   * The data change detection policy for the datasource.
   */
  dataChangeDetectionPolicy?: DataChangeDetectionPolicy;
  /**
   * The data deletion detection policy for the datasource.
   */
  dataDeletionDetectionPolicy?: DataDeletionDetectionPolicy;
  /**
   * The ETag of the DataSource.
   */
  etag?: string;
}
// END manually modified generated interfaces
