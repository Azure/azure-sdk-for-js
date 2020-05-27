// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";
import {
  AnalyzeRequest,
  CustomAnalyzer,
  LuceneStandardAnalyzer,
  StopAnalyzer,
  CorsOptions,
  SearchResourceEncryptionKey,
  Suggester,
  ClassicTokenizer,
  EdgeNGramTokenizer,
  KeywordTokenizer,
  KeywordTokenizerV2,
  MicrosoftLanguageTokenizer,
  MicrosoftLanguageStemmingTokenizer,
  NGramTokenizer,
  PathHierarchyTokenizerV2,
  LuceneStandardTokenizer,
  LuceneStandardTokenizerV2,
  UaxUrlEmailTokenizer,
  AsciiFoldingTokenFilter,
  CjkBigramTokenFilter,
  CommonGramTokenFilter,
  DictionaryDecompounderTokenFilter,
  EdgeNGramTokenFilter,
  EdgeNGramTokenFilterV2,
  LengthTokenFilter,
  ElisionTokenFilter,
  KeepTokenFilter,
  KeywordMarkerTokenFilter,
  LimitTokenFilter,
  NGramTokenFilterV2,
  NGramTokenFilter,
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
  LexicalAnalyzerName
} from "./generated/service/models";

/**
 * Options for a list SearchIndexerSkillsets operation.
 */
export type ListSearchIndexerSkillsetsOptions = OperationOptions;

/**
 * Options for a list synonymMaps operation.
 */
export type ListSynonymMapsOptions = OperationOptions;

/**
 * Options for a list searchindexes operation.
 */
export type ListSearchIndexesOptions = OperationOptions;

/**
 * Options for a list searchIndexers operation.
 */
export type ListSearchIndexersOptions = OperationOptions;

/**
 * Options for a list searchIndexers data sources operation.
 */
export type ListSearchIndexerDataSourcesOptions = OperationOptions;

/**
 * Options for get SearchIndex operation.
 */
export type GetSearchIndexOptions = OperationOptions;

/**
 * Options for get SearchIndexerSkillset operation.
 */
export type GetSearchIndexerSkillSetOptions = OperationOptions;

/**
 * Options for get synonymmaps operation.
 */
export type GetSynonymMapsOptions = OperationOptions;

/**
 * Options for get searchIndexer operation.
 */
export type GetSearchIndexerOptions = OperationOptions;

/**
 * Options for get searchindexerdatasource operation.
 */
export type GetSearchIndexerDataSourceOptions = OperationOptions;

/**
 * Options for get SearchIndex statistics operation.
 */
export type GetSearchIndexStatisticsOptions = OperationOptions;

/**
 * Options for get service statistics operation.
 */
export type GetServiceStatisticsOptions = OperationOptions;

/**
 * Options for get searchIndexer status operation.
 */
export type GetSearchIndexerStatusOptions = OperationOptions;

/**
 * Options for reset searchIndexer operation.
 */
export type ResetSearchIndexerOptions = OperationOptions;

/**
 * Options for run searchIndexer operation.
 */
export type RunSearchIndexerOptions = OperationOptions;

/**
 * Options for create SearchIndex operation.
 */
export type CreateSearchIndexOptions = OperationOptions;

/**
 * Options for create SearchIndexerSkillset operation.
 */
export type CreateSearchIndexerSkillsetOptions = OperationOptions;

/**
 * Options for create synonymmap operation.
 */
export type CreateSynonymMapOptions = OperationOptions;

/**
 * Options for create searchIndexer operation.
 */
export type CreateSearchIndexerOptions = OperationOptions;

/**
 * Options for create searchindexerdatasource operation.
 */
export type CreateSearchIndexerDataSourceOptions = OperationOptions;

/**
 * Options for create/update searchindex operation.
 */
export interface CreateOrUpdateSearchIndexOptions extends OperationOptions {
  /**
   * Allows new analyzers, tokenizers, token filters, or char filters to be added to an searchindex by
   * taking the searchIndex offline for at least a few seconds. This temporarily causes indexing and
   * query requests to fail. Performance and write availability of the searchindex can be impaired for
   * several minutes after the searchIndex is updated, or longer for very large indexes.
   */
  allowIndexDowntime?: boolean;
  /**
   * If set to true, Resource will be deleted only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
}

/**
 * Options for create/update SearchIndexerSkillset operation.
 */
export interface CreateOrUpdateSearchIndexerSkillsetOptions extends OperationOptions {
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
 * Options for create/update searchIndexer operation.
 */
export interface CreateorUpdateSearchIndexerOptions extends OperationOptions {
  /**
   * If set to true, Resource will be deleted only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
}

/**
 * Options for create/update searchindexerdatasource operation.
 */
export interface CreateorUpdateSearchIndexerDataSourceOptions extends OperationOptions {
  /**
   * If set to true, Resource will be deleted only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
}

/**
 * Options for delete searchindex operation.
 */
export interface DeleteSearchIndexOptions extends OperationOptions {
  /**
   * If set to true, Resource will be deleted only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
}

/**
 * Options for delete SearchIndexerSkillset operaion.
 */
export interface DeleteSearchIndexerSkillsetOptions extends OperationOptions {
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
 * Options for delete searchIndexer operation.
 */
export interface DeleteSearchIndexerOptions extends OperationOptions {
  /**
   * If set to true, Resource will be deleted only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
}

/**
 * Options for delete searchindexerdatasource operation.
 */
export interface DeleteSearchIndexerDataSourceOptions extends OperationOptions {
  /**
   * If set to true, Resource will be deleted only if the etag matches.
   */
  onlyIfUnchanged?: boolean;
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
 * Contains the possible cases for LexicalAnalyzer.
 */
export type LexicalAnalyzer =
  | CustomAnalyzer
  | PatternAnalyzer
  | LuceneStandardAnalyzer
  | StopAnalyzer;

/**
 * Contains the possible cases for SearchIndexerSkill.
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
 * Contains the possible cases for LexicalTokenizers.
 */
export type LexicalTokenizer =
  | ClassicTokenizer
  | EdgeNGramTokenizer
  | KeywordTokenizer
  | KeywordTokenizerV2
  | MicrosoftLanguageTokenizer
  | MicrosoftLanguageStemmingTokenizer
  | NGramTokenizer
  | PathHierarchyTokenizerV2
  | PatternTokenizer
  | LuceneStandardTokenizer
  | LuceneStandardTokenizerV2
  | UaxUrlEmailTokenizer;

/**
 * Contains the possible cases for TokenFilter.
 */
export type TokenFilter =
  | AsciiFoldingTokenFilter
  | CjkBigramTokenFilter
  | CommonGramTokenFilter
  | DictionaryDecompounderTokenFilter
  | EdgeNGramTokenFilter
  | EdgeNGramTokenFilterV2
  | ElisionTokenFilter
  | KeepTokenFilter
  | KeywordMarkerTokenFilter
  | LengthTokenFilter
  | LimitTokenFilter
  | NGramTokenFilter
  | NGramTokenFilterV2
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
 * Defines values for SimpleDataType.
 * Possible values include: 'Edm.String', 'Edm.Int32', 'Edm.Int64', 'Edm.Double', 'Edm.Boolean',
 * 'Edm.DateTimeOffset', 'Edm.GeographyPoint', 'Collection(Edm.String)',
 * 'Collection(Edm.Int32)', 'Collection(Edm.Int64)', 'Collection(Edm.Double)',
 * 'Collection(Edm.Boolean)', 'Collection(Edm.DateTimeOffset)', 'Collection(Edm.GeographyPoint)'
 * @readonly
 * @enum {string}
 */
export type SimpleDataType =
  | "Edm.String"
  | "Edm.Int32"
  | "Edm.Int64"
  | "Edm.Double"
  | "Edm.Boolean"
  | "Edm.DateTimeOffset"
  | "Edm.GeographyPoint";

/**
 * Defines values for ComplexDataType.
 * Possible values include: 'Edm.ComplexType', 'Collection(Edm.ComplexType)'
 * @readonly
 * @enum {string}
 */
export type ComplexDataType = "Edm.ComplexType";

/**
 * Represents a field in an searchindex definition, which describes the name, data type, and search
 * behavior of a field.
 */
export type SearchField = SimpleField | ComplexField;

/**
 * Represents a field in an searchindex definition, which describes the name, data type, and search
 * behavior of a field.
 */
export interface SimpleField {
  /**
   * The name of the field, which must be unique within the fields collection of the searchindex or
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
  type: SimpleDataType;
  /**
   * A value indicating whether the field uniquely identifies documents in the searchindex. Exactly one
   * top-level field in each searchindex must be chosen as the key field and it must be of type
   * Edm.String. Key fields can be used to look up documents directly and update or delete specific
   * documents. Default is false.
   */
  key?: boolean;
  /**
   * A value indicating whether the field can be returned in a search result. You can enable this
   * option if you want to use a field (for example, margin) as a filter, sorting, or scoring
   * mechanism but do not want the field to be visible to the end user. This property must be false
   * for key fields. This property can be changed on existing fields.
   * Disabling this property does not cause any increase in searchindex storage requirements.
   * Default is false.
   */
  hidden?: boolean;
  /**
   * A value indicating whether the field is full-text searchable. This means it will undergo
   * analysis such as word-breaking during indexing. If you set a searchable field to a value like
   * "sunny day", internally it will be split into the individual tokens "sunny" and "day". This
   * enables full-text searches for these terms. This property must be false for simple
   * fields of other non-string data types.
   * Note: searchable fields consume extra space in your searchindex since Azure Cognitive Search will store an
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
  analyzer?: LexicalAnalyzerName;
  /**
   * The name of the analyzer used at search time for the field. This option can be used only with
   * searchable fields. It must be set together with indexAnalyzer and it cannot be set together
   * with the analyzer option. This analyzer can be updated on an existing field.
   * KnownAnalyzerNames is an enum containing known values.
   */
  searchAnalyzer?: LexicalAnalyzerName;
  /**
   * The name of the analyzer used at indexing time for the field. This option can be used only
   * with searchable fields. It must be set together with searchAnalyzer and it cannot be set
   * together with the analyzer option. Once the analyzer is chosen, it cannot be changed for the
   * field. KnownAnalyzerNames is an enum containing known values.
   */
  indexAnalyzer?: LexicalAnalyzerName;
  /**
   * A list of the names of synonym maps to associate with this field. This option can be used only
   * with searchable fields. Currently only one synonym map per field is supported. Assigning a
   * synonym map to a field ensures that query terms targeting that field are expanded at
   * query-time using the rules in the synonym map. This attribute can be changed on existing
   * fields.
   */
  synonymMaps?: string[];
}

export function isComplexField(searchField: SearchField): searchField is ComplexField {
  return searchField.type === "Edm.ComplexType";
}

/**
 * Represents a field in an searchindex definition, which describes the name, data type, and search
 * behavior of a field.
 */
export interface ComplexField {
  /**
   * The name of the field, which must be unique within the fields collection of the searchindex or
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
 * Represents a searchIndex definition, which describes the fields and search behavior of an
 * searchIndex.
 */
export interface SearchIndex {
  /**
   * The name of the searchindex.
   */
  name: string;
  /**
   * The fields of the searchindex.
   */
  fields: SearchField[];
  /**
   * The scoring profiles for the searchindex.
   */
  scoringProfiles?: ScoringProfile[];
  /**
   * The name of the scoring profile to use if none is specified in the query. If this property is
   * not set and no scoring profile is specified in the query, then default scoring (tf-idf) will
   * be used.
   */
  defaultScoringProfile?: string;
  /**
   * Options to control Cross-Origin Resource Sharing (CORS) for the searchindex.
   */
  corsOptions?: CorsOptions;
  /**
   * The suggesters for the searchindex.
   */
  suggesters?: Suggester[];
  /**
   * The analyzers for the searchindex.
   */
  analyzers?: LexicalAnalyzer[];
  /**
   * The tokenizers for the searchindex.
   */
  tokenizers?: LexicalTokenizer[];
  /**
   * The token filters for the searchindex.
   */
  tokenFilters?: TokenFilter[];
  /**
   * The character filters for the searchindex.
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
   * The ETag of the searchindex.
   */
  etag?: string;
}

/**
 * A list of skills.
 */
export interface SearchIndexerSkillset {
  /**
   * The name of the SearchIndexerSkillset.
   */
  name: string;
  /**
   * The description of the SearchIndexerSkillset.
   */
  description: string;
  /**
   * A list of skills in the SearchIndexerSkillset.
   */
  skills: SearchIndexerSkill[];
  /**
   * Details about cognitive services to be used when running skills.
   */
  cognitiveServicesAccount?: CognitiveServicesAccount;
  /**
   * The ETag of the SearchIndexerSkillset.
   */
  etag?: string;
}

/**
 * Defines parameters for a search searchindex that influence scoring in search queries.
 */
export interface ScoringProfile {
  /**
   * The name of the scoring profile.
   */
  name: string;
  /**
   * Parameters that boost scoring based on text matches in certain searchindex fields.
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
 * Defines values for LexicalAnalyzerName.
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
 * Represents a SearchIndexerDataSource definition, which can be used to configure an searchIndexer.
 */
export interface SearchIndexerDataSource {
  /**
   * The name of the SearchIndexerDataSource.
   */
  name: string;
  /**
   * The description of the SearchIndexerDataSource.
   */
  description?: string;
  /**
   * The type of the SearchIndexerDataSource. Possible values include: 'AzureSql', 'CosmosDb', 'AzureBlob',
   * 'AzureTable', 'MySql'
   */
  type: SearchIndexerDataSourceType;
  /**
   * ConnectionString for the SearchIndexerDataSource.
   */
  connectionString?: string;
  /**
   * The data container for the SearchIndexerDataSource.
   */
  container: SearchIndexerDataContainer;
  /**
   * The data change detection policy for the SearchIndexerDataSource.
   */
  dataChangeDetectionPolicy?: DataChangeDetectionPolicy;
  /**
   * The data deletion detection policy for the SearchIndexerDataSource.
   */
  dataDeletionDetectionPolicy?: DataDeletionDetectionPolicy;
  /**
   * The ETag of the SearchIndexerDataSource.
   */
  etag?: string;
}
// END manually modified generated interfaces
