// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";
import {
  AccessCondition,
  AnalyzeRequest,
  CustomAnalyzer,
  PatternAnalyzer,
  StandardAnalyzer,
  StopAnalyzer,
  CorsOptions,
  EncryptionKey,
  Suggester,
  ScoringProfile,
  Field,
  ClassicTokenizer,
  EdgeNGramTokenizer,
  KeywordTokenizer,
  KeywordTokenizerV2,
  MicrosoftLanguageTokenizer,
  MicrosoftLanguageStemmingTokenizer,
  NGramTokenizer,
  PathHierarchyTokenizerV2,
  PatternTokenizer,
  StandardTokenizer,
  StandardTokenizerV2,
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
  PatternReplaceCharFilter
} from "./generated/service/models";

/**
 * Options for a list indexes operation.
 */
export interface ListIndexesOptions extends OperationOptions {
  /**
   * Selects which top-level properties of the index definitions to retrieve. Specified as a
   * comma-separated list of JSON property names, or '*' for all properties. The default is all
   * properties.
   */
  select?: string;
}

export type GetIndexOptions = OperationOptions;

export type GetIndexStatisticsOptions = OperationOptions;

export type CreateIndexOptions = OperationOptions;

export interface ETagOperationOptions {
  /**
   * ETag parameters
   */
  accessCondition?: AccessCondition;
}

export interface CreateOrUpdateIndexOptions extends OperationOptions, ETagOperationOptions {
  /**
   * Allows new analyzers, tokenizers, token filters, or char filters to be added to an index by
   * taking the index offline for at least a few seconds. This temporarily causes indexing and
   * query requests to fail. Performance and write availability of the index can be impaired for
   * several minutes after the index is updated, or longer for very large indexes.
   */
  allowIndexDowntime?: boolean;
}

export type DeleteIndexOptions = OperationOptions & ETagOperationOptions;

export type AnalyzeTextOptions = OperationOptions & AnalyzeRequest;

// BEGIN manually modified generated interfaces
//
// This section is for places where we have to manually fix issues
// with interfaces from the generated code.
// One issue is that unions of discriminated types generated with
// their abstract base class as a member.

/**
 * Contains the possible cases for Analyzer.
 */
export type Analyzer = CustomAnalyzer | PatternAnalyzer | StandardAnalyzer | StopAnalyzer;

/**
 * Contains the possible cases for Tokenizer.
 */
export type Tokenizer =
  | ClassicTokenizer
  | EdgeNGramTokenizer
  | KeywordTokenizer
  | KeywordTokenizerV2
  | MicrosoftLanguageTokenizer
  | MicrosoftLanguageStemmingTokenizer
  | NGramTokenizer
  | PathHierarchyTokenizerV2
  | PatternTokenizer
  | StandardTokenizer
  | StandardTokenizerV2
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
 * Represents a search index definition, which describes the fields and search behavior of an
 * index.
 */
export interface Index {
  /**
   * The name of the index.
   */
  name: string;
  /**
   * The fields of the index.
   */
  fields: Field[];
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
  suggesters?: Suggester[];
  /**
   * The analyzers for the index.
   */
  analyzers?: Analyzer[];
  /**
   * The tokenizers for the index.
   */
  tokenizers?: Tokenizer[];
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
  encryptionKey?: EncryptionKey;
  /**
   * The ETag of the index.
   */
  eTag?: string;
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
 * @readonly
 * @enum {string}
 */
export enum KnownAnalyzerNames {
  Armicrosoft = "ar.microsoft",
  Arlucene = "ar.lucene",
  Hylucene = "hy.lucene",
  Bnmicrosoft = "bn.microsoft",
  Eulucene = "eu.lucene",
  Bgmicrosoft = "bg.microsoft",
  Bglucene = "bg.lucene",
  Camicrosoft = "ca.microsoft",
  Calucene = "ca.lucene",
  ZhHansmicrosoft = "zh-Hans.microsoft",
  ZhHanslucene = "zh-Hans.lucene",
  ZhHantmicrosoft = "zh-Hant.microsoft",
  ZhHantlucene = "zh-Hant.lucene",
  Hrmicrosoft = "hr.microsoft",
  Csmicrosoft = "cs.microsoft",
  Cslucene = "cs.lucene",
  Damicrosoft = "da.microsoft",
  Dalucene = "da.lucene",
  Nlmicrosoft = "nl.microsoft",
  Nllucene = "nl.lucene",
  Enmicrosoft = "en.microsoft",
  Enlucene = "en.lucene",
  Etmicrosoft = "et.microsoft",
  Fimicrosoft = "fi.microsoft",
  Filucene = "fi.lucene",
  Frmicrosoft = "fr.microsoft",
  Frlucene = "fr.lucene",
  Gllucene = "gl.lucene",
  Demicrosoft = "de.microsoft",
  Delucene = "de.lucene",
  Elmicrosoft = "el.microsoft",
  Ellucene = "el.lucene",
  Gumicrosoft = "gu.microsoft",
  Hemicrosoft = "he.microsoft",
  Himicrosoft = "hi.microsoft",
  Hilucene = "hi.lucene",
  Humicrosoft = "hu.microsoft",
  Hulucene = "hu.lucene",
  Ismicrosoft = "is.microsoft",
  Idmicrosoft = "id.microsoft",
  Idlucene = "id.lucene",
  Galucene = "ga.lucene",
  Itmicrosoft = "it.microsoft",
  Itlucene = "it.lucene",
  Jamicrosoft = "ja.microsoft",
  Jalucene = "ja.lucene",
  Knmicrosoft = "kn.microsoft",
  Komicrosoft = "ko.microsoft",
  Kolucene = "ko.lucene",
  Lvmicrosoft = "lv.microsoft",
  Lvlucene = "lv.lucene",
  Ltmicrosoft = "lt.microsoft",
  Mlmicrosoft = "ml.microsoft",
  Msmicrosoft = "ms.microsoft",
  Mrmicrosoft = "mr.microsoft",
  Nbmicrosoft = "nb.microsoft",
  Nolucene = "no.lucene",
  Falucene = "fa.lucene",
  Plmicrosoft = "pl.microsoft",
  Pllucene = "pl.lucene",
  PtBRmicrosoft = "pt-BR.microsoft",
  PtBRlucene = "pt-BR.lucene",
  PtPTmicrosoft = "pt-PT.microsoft",
  PtPTlucene = "pt-PT.lucene",
  Pamicrosoft = "pa.microsoft",
  Romicrosoft = "ro.microsoft",
  Rolucene = "ro.lucene",
  Rumicrosoft = "ru.microsoft",
  Rulucene = "ru.lucene",
  SrCyrillicmicrosoft = "sr-cyrillic.microsoft",
  SrLatinmicrosoft = "sr-latin.microsoft",
  Skmicrosoft = "sk.microsoft",
  Slmicrosoft = "sl.microsoft",
  Esmicrosoft = "es.microsoft",
  Eslucene = "es.lucene",
  Svmicrosoft = "sv.microsoft",
  Svlucene = "sv.lucene",
  Tamicrosoft = "ta.microsoft",
  Temicrosoft = "te.microsoft",
  Thmicrosoft = "th.microsoft",
  Thlucene = "th.lucene",
  Trmicrosoft = "tr.microsoft",
  Trlucene = "tr.lucene",
  Ukmicrosoft = "uk.microsoft",
  Urmicrosoft = "ur.microsoft",
  Vimicrosoft = "vi.microsoft",
  Standardlucene = "standard.lucene",
  Standardasciifoldinglucene = "standardasciifolding.lucene",
  Keyword = "keyword",
  Pattern = "pattern",
  Simple = "simple",
  Stop = "stop",
  Whitespace = "whitespace"
}

// END manually modified generated interfaces
