// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import type { RequestParameters } from "@azure-rest/core-client";
import type {
  QueryType,
  SearchMode,
  ScoringStatistics,
  SemanticErrorMode,
  QueryAnswerType,
  QueryCaptionType,
  QueryRewritesType,
  QueryDebugMode,
  QueryLanguage,
  QuerySpellerType,
  SearchRequest,
  SuggestRequest,
  IndexBatch,
  AutocompleteMode,
  AutocompleteRequest,
  SearchIndexerDataSource,
  DocumentKeysOrIds,
  SearchIndexer,
  SearchIndexerSkillset,
  SkillNames,
  SynonymMap,
  SearchIndex,
  AnalyzeRequest,
  SearchAlias,
} from "./models.js";

export interface IndexesGetServiceStatisticsHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesGetServiceStatisticsHeaderParam {
  headers?: RawHttpHeadersInput & IndexesGetServiceStatisticsHeaders;
}

export type IndexesGetServiceStatisticsParameters =
  IndexesGetServiceStatisticsHeaderParam & RequestParameters;

export interface IndexesGetIndexStatsSummaryHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesGetIndexStatsSummaryHeaderParam {
  headers?: RawHttpHeadersInput & IndexesGetIndexStatsSummaryHeaders;
}

export type IndexesGetIndexStatsSummaryParameters =
  IndexesGetIndexStatsSummaryHeaderParam & RequestParameters;

export interface DocumentsCountHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DocumentsCountHeaderParam {
  headers?: RawHttpHeadersInput & DocumentsCountHeaders;
}

export type DocumentsCountParameters = DocumentsCountHeaderParam &
  RequestParameters;

export interface DocumentsSearchGetHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** This is the wrapper object for the parameter `highlight` with explode set to false and style set to form. */
export interface DocumentsSearchGetHighlightQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `$orderby` with explode set to false and style set to form. */
export interface DocumentsSearchGetOrderbyQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `searchFields` with explode set to false and style set to form. */
export interface DocumentsSearchGetSearchFieldsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `$select` with explode set to false and style set to form. */
export interface DocumentsSearchGetSelectQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `semanticFields` with explode set to false and style set to form. */
export interface DocumentsSearchGetSemanticFieldsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `facet` with explode set to true and style set to form. */
export interface DocumentsSearchGetFacetQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `scoringParameter` with explode set to true and style set to form. */
export interface DocumentsSearchGetScoringParameterQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface DocumentsSearchGetQueryParamProperties {
  /**
   * A full-text search query expression; Use "*" or omit this parameter to match
   * all documents.
   */
  search?: string;
  /**
   * A value that specifies whether to fetch the total count of results. Default is
   * false. Setting this value to true may have a performance impact. Note that the
   * count returned is an approximation.
   */
  $count?: boolean;
  /**
   * The list of facet expressions to apply to the search query. Each facet
   * expression contains a field name, optionally followed by a comma-separated list
   * of name:value pairs.
   */
  facet?: DocumentsSearchGetFacetQueryParam;
  /** The OData $filter expression to apply to the search query. */
  $filter?: string;
  /**
   * The list of field names to use for hit highlights. Only searchable fields can
   * be used for hit highlighting.
   */
  highlight?: string[] | DocumentsSearchGetHighlightQueryParam;
  /**
   * A string tag that is appended to hit highlights. Must be set with
   * highlightPreTag. Default is &lt;/em&gt;.
   */
  highlightPostTag?: string;
  /**
   * A string tag that is prepended to hit highlights. Must be set with
   * highlightPostTag. Default is &lt;em&gt;.
   */
  highlightPreTag?: string;
  /**
   * A number between 0 and 100 indicating the percentage of the index that must be
   * covered by a search query in order for the query to be reported as a success.
   * This parameter can be useful for ensuring search availability even for services
   * with only one replica. The default is 100.
   */
  minimumCoverage?: number;
  /**
   * The list of OData $orderby expressions by which to sort the results. Each
   * expression can be either a field name or a call to either the geo.distance() or
   * the search.score() functions. Each expression can be followed by asc to
   * indicate ascending, and desc to indicate descending. The default is ascending
   * order. Ties will be broken by the match scores of documents. If no OrderBy is
   * specified, the default sort order is descending by document match score. There
   * can be at most 32 $orderby clauses.
   */
  $orderby?: string[] | DocumentsSearchGetOrderbyQueryParam;
  /**
   * A value that specifies the syntax of the search query. The default is 'simple'.
   * Use 'full' if your query uses the Lucene query syntax.
   *
   * Possible values: "simple", "full", "semantic"
   */
  queryType?: QueryType;
  /**
   * The list of parameter values to be used in scoring functions (for example,
   * referencePointParameter) using the format name-values. For example, if the
   * scoring profile defines a function with a parameter called 'mylocation' the
   * parameter string would be "mylocation--122.2,44.8" (without the quotes).
   */
  scoringParameter?: DocumentsSearchGetScoringParameterQueryParam;
  /**
   * The name of a scoring profile to evaluate match scores for matching documents
   * in order to sort the results.
   */
  scoringProfile?: string;
  /**
   * The list of field names to which to scope the full-text search. When using
   * fielded search (fieldName:searchExpression) in a full Lucene query, the field
   * names of each fielded search expression take precedence over any field names
   * listed in this parameter.
   */
  searchFields?: string[] | DocumentsSearchGetSearchFieldsQueryParam;
  /**
   * A value that specifies whether any or all of the search terms must be matched
   * in order to count the document as a match.
   *
   * Possible values: "any", "all"
   */
  searchMode?: SearchMode;
  /**
   * A value that specifies whether we want to calculate scoring statistics (such as
   * document frequency) globally for more consistent scoring, or locally, for lower
   * latency.
   *
   * Possible values: "local", "global"
   */
  scoringStatistics?: ScoringStatistics;
  /**
   * A value to be used to create a sticky session, which can help to get more
   * consistent results. As long as the same sessionId is used, a best-effort
   * attempt will be made to target the same replica set. Be wary that reusing the
   * same sessionID values repeatedly can interfere with the load balancing of the
   * requests across replicas and adversely affect the performance of the search
   * service. The value used as sessionId cannot start with a '_' character.
   */
  sessionId?: string;
  /**
   * The list of fields to retrieve. If unspecified, all fields marked as
   * retrievable in the schema are included.
   */
  $select?: string[] | DocumentsSearchGetSelectQueryParam;
  /**
   * The number of search results to skip. This value cannot be greater than
   * 100,000. If you need to scan documents in sequence, but cannot use $skip due to
   * this limitation, consider using $orderby on a totally-ordered key and $filter
   * with a range query instead.
   */
  $skip?: number;
  /**
   * The number of search results to retrieve. This can be used in conjunction with
   * $skip to implement client-side paging of search results. If results are
   * truncated due to server-side paging, the response will include a continuation
   * token that can be used to issue another Search request for the next page of
   * results.
   */
  $top?: number;
  /**
   * The name of the semantic configuration that lists which fields should be used
   * for semantic ranking, captions, highlights, and answers
   */
  semanticConfiguration?: string;
  /**
   * Allows the user to choose whether a semantic call should fail completely, or to
   * return partial results (default).
   *
   * Possible values: "partial", "fail"
   */
  semanticErrorHandling?: SemanticErrorMode;
  /**
   * Allows the user to set an upper bound on the amount of time it takes for
   * semantic enrichment to finish processing before the request fails.
   */
  semanticMaxWaitInMilliseconds?: number;
  /**
   * This parameter is only valid if the query type is `semantic`. If set, the query
   * returns answers extracted from key passages in the highest ranked documents.
   * The number of answers returned can be configured by appending the pipe
   * character `|` followed by the `count-<number of answers>` option after the
   * answers parameter value, such as `extractive|count-3`. Default count is 1. The
   * confidence threshold can be configured by appending the pipe character `|`
   * followed by the `threshold-<confidence threshold>` option after the answers
   * parameter value, such as `extractive|threshold-0.9`. Default threshold is 0.7.
   * The maximum character length of answers can be configured by appending the pipe
   * character '|' followed by the 'count-<number of maximum character length>',
   * such as 'extractive|maxcharlength-600'.
   *
   * Possible values: "none", "extractive"
   */
  answers?: QueryAnswerType;
  /**
   * This parameter is only valid if the query type is `semantic`. If set, the query
   * returns captions extracted from key passages in the highest ranked documents.
   * When Captions is set to `extractive`, highlighting is enabled by default, and
   * can be configured by appending the pipe character `|` followed by the
   * `highlight-<true/false>` option, such as `extractive|highlight-true`. Defaults
   * to `None`. The maximum character length of captions can be configured by
   * appending the pipe character '|' followed by the 'count-<number of maximum
   * character length>', such as 'extractive|maxcharlength-600'.
   *
   * Possible values: "none", "extractive"
   */
  captions?: QueryCaptionType;
  /**
   * Allows setting a separate search query that will be solely used for semantic
   * reranking, semantic captions and semantic answers. Is useful for scenarios
   * where there is a need to use different queries between the base retrieval and
   * ranking phase, and the L2 semantic phase.
   */
  semanticQuery?: string;
  /**
   * When QueryRewrites is set to `generative`, the query terms are sent to a
   * generate model which will produce 10 (default) rewrites to help increase the
   * recall of the request. The requested count can be configured by appending the
   * pipe character `|` followed by the `count-<number of rewrites>` option, such as
   * `generative|count-3`. Defaults to `None`. This parameter is only valid if the
   * query type is `semantic`.
   *
   * Possible values: "none", "generative"
   */
  queryRewrites?: QueryRewritesType;
  /**
   * Enables a debugging tool that can be used to further explore your search
   * results.
   *
   * Possible values: "disabled", "semantic", "vector", "queryRewrites", "all"
   */
  debug?: QueryDebugMode;
  /**
   * The language of the query.
   *
   * Possible values: "none", "en-us", "en-gb", "en-in", "en-ca", "en-au", "fr-fr", "fr-ca", "de-de", "es-es", "es-mx", "zh-cn", "zh-tw", "pt-br", "pt-pt", "it-it", "ja-jp", "ko-kr", "ru-ru", "cs-cz", "nl-be", "nl-nl", "hu-hu", "pl-pl", "sv-se", "tr-tr", "hi-in", "ar-sa", "ar-eg", "ar-ma", "ar-kw", "ar-jo", "da-dk", "no-no", "bg-bg", "hr-hr", "hr-ba", "ms-my", "ms-bn", "sl-sl", "ta-in", "vi-vn", "el-gr", "ro-ro", "is-is", "id-id", "th-th", "lt-lt", "uk-ua", "lv-lv", "et-ee", "ca-es", "fi-fi", "sr-ba", "sr-me", "sr-rs", "sk-sk", "nb-no", "hy-am", "bn-in", "eu-es", "gl-es", "gu-in", "he-il", "ga-ie", "kn-in", "ml-in", "mr-in", "fa-ae", "pa-in", "te-in", "ur-pk"
   */
  queryLanguage?: QueryLanguage;
  /**
   * Improve search recall by spell-correcting individual search query terms.
   *
   * Possible values: "none", "lexicon"
   */
  speller?: QuerySpellerType;
  /** The list of field names used for semantic ranking. */
  semanticFields?: string[] | DocumentsSearchGetSemanticFieldsQueryParam;
}

export interface DocumentsSearchGetQueryParam {
  queryParameters?: DocumentsSearchGetQueryParamProperties;
}

export interface DocumentsSearchGetHeaderParam {
  headers?: RawHttpHeadersInput & DocumentsSearchGetHeaders;
}

export type DocumentsSearchGetParameters = DocumentsSearchGetQueryParam &
  DocumentsSearchGetHeaderParam &
  RequestParameters;

export interface DocumentsSearchPostHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DocumentsSearchPostBodyParam {
  /** The definition of the Search request. */
  body: SearchRequest;
}

export interface DocumentsSearchPostHeaderParam {
  headers?: RawHttpHeadersInput & DocumentsSearchPostHeaders;
}

export type DocumentsSearchPostParameters = DocumentsSearchPostHeaderParam &
  DocumentsSearchPostBodyParam &
  RequestParameters;

export interface DocumentsGetHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** This is the wrapper object for the parameter `$select` with explode set to false and style set to form. */
export interface DocumentsGetSelectQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface DocumentsGetQueryParamProperties {
  /**
   * List of field names to retrieve for the document; Any field not retrieved will
   * be missing from the returned document.
   */
  $select?: string[] | DocumentsGetSelectQueryParam;
}

export interface DocumentsGetQueryParam {
  queryParameters?: DocumentsGetQueryParamProperties;
}

export interface DocumentsGetHeaderParam {
  headers?: RawHttpHeadersInput & DocumentsGetHeaders;
}

export type DocumentsGetParameters = DocumentsGetQueryParam &
  DocumentsGetHeaderParam &
  RequestParameters;

export interface DocumentsSuggestGetHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** This is the wrapper object for the parameter `$orderby` with explode set to false and style set to form. */
export interface DocumentsSuggestGetOrderbyQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `searchFields` with explode set to false and style set to form. */
export interface DocumentsSuggestGetSearchFieldsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `$select` with explode set to false and style set to form. */
export interface DocumentsSuggestGetSelectQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface DocumentsSuggestGetQueryParamProperties {
  /**
   * The search text to use to suggest documents. Must be at least 1 character, and
   * no more than 100 characters.
   */
  search: string;
  /**
   * The name of the suggester as specified in the suggesters collection that's part
   * of the index definition.
   */
  suggesterName: string;
  /** An OData expression that filters the documents considered for suggestions. */
  $filter?: string;
  /**
   * A value indicating whether to use fuzzy matching for the suggestions query.
   * Default is false. When set to true, the query will find terms even if there's a
   * substituted or missing character in the search text. While this provides a
   * better experience in some scenarios, it comes at a performance cost as fuzzy
   * suggestions queries are slower and consume more resources.
   */
  fuzzy?: boolean;
  /**
   * A string tag that is appended to hit highlights. Must be set with
   * highlightPreTag. If omitted, hit highlighting of suggestions is disabled.
   */
  highlightPostTag?: string;
  /**
   * A string tag that is prepended to hit highlights. Must be set with
   * highlightPostTag. If omitted, hit highlighting of suggestions is disabled.
   */
  highlightPreTag?: string;
  /**
   * A number between 0 and 100 indicating the percentage of the index that must be
   * covered by a suggestions query in order for the query to be reported as a
   * success. This parameter can be useful for ensuring search availability even for
   * services with only one replica. The default is 80.
   */
  minimumCoverage?: number;
  /**
   * The list of OData $orderby expressions by which to sort the results. Each
   * expression can be either a field name or a call to either the geo.distance() or
   * the search.score() functions. Each expression can be followed by asc to
   * indicate ascending, or desc to indicate descending. The default is ascending
   * order. Ties will be broken by the match scores of documents. If no $orderby is
   * specified, the default sort order is descending by document match score. There
   * can be at most 32 $orderby clauses.
   */
  $orderby?: string[] | DocumentsSuggestGetOrderbyQueryParam;
  /**
   * The list of field names to search for the specified search text. Target fields
   * must be included in the specified suggester.
   */
  searchFields?: string[] | DocumentsSuggestGetSearchFieldsQueryParam;
  /**
   * The list of fields to retrieve. If unspecified, only the key field will be
   * included in the results.
   */
  $select?: string[] | DocumentsSuggestGetSelectQueryParam;
  /**
   * The number of suggestions to retrieve. The value must be a number between 1 and
   * 100. The default is 5.
   */
  $top?: number;
}

export interface DocumentsSuggestGetQueryParam {
  queryParameters: DocumentsSuggestGetQueryParamProperties;
}

export interface DocumentsSuggestGetHeaderParam {
  headers?: RawHttpHeadersInput & DocumentsSuggestGetHeaders;
}

export type DocumentsSuggestGetParameters = DocumentsSuggestGetQueryParam &
  DocumentsSuggestGetHeaderParam &
  RequestParameters;

export interface DocumentsSuggestPostHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DocumentsSuggestPostBodyParam {
  /** The Suggest request. */
  body: SuggestRequest;
}

export interface DocumentsSuggestPostHeaderParam {
  headers?: RawHttpHeadersInput & DocumentsSuggestPostHeaders;
}

export type DocumentsSuggestPostParameters = DocumentsSuggestPostHeaderParam &
  DocumentsSuggestPostBodyParam &
  RequestParameters;

export interface DocumentsIndexHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DocumentsIndexBodyParam {
  /** The batch of index actions. */
  body: IndexBatch;
}

export interface DocumentsIndexHeaderParam {
  headers?: RawHttpHeadersInput & DocumentsIndexHeaders;
}

export type DocumentsIndexParameters = DocumentsIndexHeaderParam &
  DocumentsIndexBodyParam &
  RequestParameters;

export interface DocumentsAutocompleteGetHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** This is the wrapper object for the parameter `searchFields` with explode set to false and style set to form. */
export interface DocumentsAutocompleteGetSearchFieldsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface DocumentsAutocompleteGetQueryParamProperties {
  /** The incomplete term which should be auto-completed. */
  search: string;
  /**
   * The name of the suggester as specified in the suggesters collection that's part
   * of the index definition.
   */
  suggesterName: string;
  /**
   * Specifies the mode for Autocomplete. The default is 'oneTerm'. Use 'twoTerms'
   * to get shingles and 'oneTermWithContext' to use the current context while
   * producing auto-completed terms.
   *
   * Possible values: "oneTerm", "twoTerms", "oneTermWithContext"
   */
  autocompleteMode?: AutocompleteMode;
  /**
   * An OData expression that filters the documents used to produce completed terms
   * for the Autocomplete result.
   */
  $filter?: string;
  /**
   * A value indicating whether to use fuzzy matching for the autocomplete query.
   * Default is false. When set to true, the query will find terms even if there's a
   * substituted or missing character in the search text. While this provides a
   * better experience in some scenarios, it comes at a performance cost as fuzzy
   * autocomplete queries are slower and consume more resources.
   */
  fuzzy?: boolean;
  /**
   * A string tag that is appended to hit highlights. Must be set with
   * highlightPreTag. If omitted, hit highlighting is disabled.
   */
  highlightPostTag?: string;
  /**
   * A string tag that is prepended to hit highlights. Must be set with
   * highlightPostTag. If omitted, hit highlighting is disabled.
   */
  highlightPreTag?: string;
  /**
   * A number between 0 and 100 indicating the percentage of the index that must be
   * covered by an autocomplete query in order for the query to be reported as a
   * success. This parameter can be useful for ensuring search availability even for
   * services with only one replica. The default is 80.
   */
  minimumCoverage?: number;
  /**
   * The list of field names to consider when querying for auto-completed terms.
   * Target fields must be included in the specified suggester.
   */
  searchFields?: string[] | DocumentsAutocompleteGetSearchFieldsQueryParam;
  /**
   * The number of auto-completed terms to retrieve. This must be a value between 1
   * and 100. The default is 5.
   */
  $top?: number;
}

export interface DocumentsAutocompleteGetQueryParam {
  queryParameters: DocumentsAutocompleteGetQueryParamProperties;
}

export interface DocumentsAutocompleteGetHeaderParam {
  headers?: RawHttpHeadersInput & DocumentsAutocompleteGetHeaders;
}

export type DocumentsAutocompleteGetParameters =
  DocumentsAutocompleteGetQueryParam &
    DocumentsAutocompleteGetHeaderParam &
    RequestParameters;

export interface DocumentsAutocompletePostHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DocumentsAutocompletePostBodyParam {
  /** The definition of the Autocomplete request. */
  body: AutocompleteRequest;
}

export interface DocumentsAutocompletePostHeaderParam {
  headers?: RawHttpHeadersInput & DocumentsAutocompletePostHeaders;
}

export type DocumentsAutocompletePostParameters =
  DocumentsAutocompletePostHeaderParam &
    DocumentsAutocompletePostBodyParam &
    RequestParameters;

export interface IndexesDataSourcesCreateOrUpdateHeaders {
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  "If-Match"?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  "If-None-Match"?: string;
  /** For HTTP PUT requests, instructs the service to return the created/updated resource on success. */
  Prefer: "return=representation";
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesDataSourcesCreateOrUpdateBodyParam {
  /** The definition of the datasource to create or update. */
  body: SearchIndexerDataSource;
}

export interface IndexesDataSourcesCreateOrUpdateQueryParamProperties {
  /** Ignores cache reset requirements. */
  ignoreResetRequirements?: boolean;
}

export interface IndexesDataSourcesCreateOrUpdateQueryParam {
  queryParameters?: IndexesDataSourcesCreateOrUpdateQueryParamProperties;
}

export interface IndexesDataSourcesCreateOrUpdateHeaderParam {
  headers: RawHttpHeadersInput & IndexesDataSourcesCreateOrUpdateHeaders;
}

export type IndexesDataSourcesCreateOrUpdateParameters =
  IndexesDataSourcesCreateOrUpdateQueryParam &
    IndexesDataSourcesCreateOrUpdateHeaderParam &
    IndexesDataSourcesCreateOrUpdateBodyParam &
    RequestParameters;

export interface IndexesDataSourcesDeleteHeaders {
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  "If-Match"?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  "If-None-Match"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesDataSourcesDeleteHeaderParam {
  headers?: RawHttpHeadersInput & IndexesDataSourcesDeleteHeaders;
}

export type IndexesDataSourcesDeleteParameters =
  IndexesDataSourcesDeleteHeaderParam & RequestParameters;

export interface IndexesDataSourcesGetHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesDataSourcesGetHeaderParam {
  headers?: RawHttpHeadersInput & IndexesDataSourcesGetHeaders;
}

export type IndexesDataSourcesGetParameters = IndexesDataSourcesGetHeaderParam &
  RequestParameters;

export interface IndexesDataSourcesListHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesDataSourcesListQueryParamProperties {
  /**
   * Selects which top-level properties to retrieve.
   * Specified as a comma-separated list of JSON property names,
   * or '*' for all properties. The default is all properties.
   */
  $select?: string;
}

export interface IndexesDataSourcesListQueryParam {
  queryParameters?: IndexesDataSourcesListQueryParamProperties;
}

export interface IndexesDataSourcesListHeaderParam {
  headers?: RawHttpHeadersInput & IndexesDataSourcesListHeaders;
}

export type IndexesDataSourcesListParameters =
  IndexesDataSourcesListQueryParam &
    IndexesDataSourcesListHeaderParam &
    RequestParameters;

export interface IndexesDataSourcesCreateHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesDataSourcesCreateBodyParam {
  /** The definition of the datasource to create. */
  body: SearchIndexerDataSource;
}

export interface IndexesDataSourcesCreateHeaderParam {
  headers?: RawHttpHeadersInput & IndexesDataSourcesCreateHeaders;
}

export type IndexesDataSourcesCreateParameters =
  IndexesDataSourcesCreateHeaderParam &
    IndexesDataSourcesCreateBodyParam &
    RequestParameters;

export interface IndexesIndexersResetHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesIndexersResetHeaderParam {
  headers?: RawHttpHeadersInput & IndexesIndexersResetHeaders;
}

export type IndexesIndexersResetParameters = IndexesIndexersResetHeaderParam &
  RequestParameters;

export interface IndexesIndexersResetDocsHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesIndexersResetDocsBodyParam {
  /**
   * The keys or ids of the documents to be re-ingested. If keys are provided, the
   * document key field must be specified in the indexer configuration. If ids are
   * provided, the document key field is ignored.
   */
  body?: DocumentKeysOrIds;
}

export interface IndexesIndexersResetDocsQueryParamProperties {
  /**
   * If false, keys or ids will be appended to existing ones. If true, only the keys
   * or ids in this payload will be queued to be re-ingested.
   */
  overwrite?: boolean;
}

export interface IndexesIndexersResetDocsQueryParam {
  queryParameters?: IndexesIndexersResetDocsQueryParamProperties;
}

export interface IndexesIndexersResetDocsHeaderParam {
  headers?: RawHttpHeadersInput & IndexesIndexersResetDocsHeaders;
}

export type IndexesIndexersResetDocsParameters =
  IndexesIndexersResetDocsQueryParam &
    IndexesIndexersResetDocsHeaderParam &
    IndexesIndexersResetDocsBodyParam &
    RequestParameters;

export interface IndexesIndexersRunHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesIndexersRunHeaderParam {
  headers?: RawHttpHeadersInput & IndexesIndexersRunHeaders;
}

export type IndexesIndexersRunParameters = IndexesIndexersRunHeaderParam &
  RequestParameters;

export interface IndexesIndexersCreateOrUpdateHeaders {
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  "If-Match"?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  "If-None-Match"?: string;
  /** For HTTP PUT requests, instructs the service to return the created/updated resource on success. */
  Prefer: "return=representation";
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesIndexersCreateOrUpdateBodyParam {
  /** The definition of the indexer to create or update. */
  body: SearchIndexer;
}

export interface IndexesIndexersCreateOrUpdateQueryParamProperties {
  /** Ignores cache reset requirements. */
  ignoreResetRequirements?: boolean;
  /** Disables cache reprocessing change detection. */
  disableCacheReprocessingChangeDetection?: boolean;
}

export interface IndexesIndexersCreateOrUpdateQueryParam {
  queryParameters?: IndexesIndexersCreateOrUpdateQueryParamProperties;
}

export interface IndexesIndexersCreateOrUpdateHeaderParam {
  headers: RawHttpHeadersInput & IndexesIndexersCreateOrUpdateHeaders;
}

export type IndexesIndexersCreateOrUpdateParameters =
  IndexesIndexersCreateOrUpdateQueryParam &
    IndexesIndexersCreateOrUpdateHeaderParam &
    IndexesIndexersCreateOrUpdateBodyParam &
    RequestParameters;

export interface IndexesIndexersDeleteHeaders {
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  "If-Match"?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  "If-None-Match"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesIndexersDeleteHeaderParam {
  headers?: RawHttpHeadersInput & IndexesIndexersDeleteHeaders;
}

export type IndexesIndexersDeleteParameters = IndexesIndexersDeleteHeaderParam &
  RequestParameters;

export interface IndexesIndexersGetHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesIndexersGetHeaderParam {
  headers?: RawHttpHeadersInput & IndexesIndexersGetHeaders;
}

export type IndexesIndexersGetParameters = IndexesIndexersGetHeaderParam &
  RequestParameters;

export interface IndexesIndexersListHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesIndexersListQueryParamProperties {
  /**
   * Selects which top-level properties to retrieve.
   * Specified as a comma-separated list of JSON property names,
   * or '*' for all properties. The default is all properties.
   */
  $select?: string;
}

export interface IndexesIndexersListQueryParam {
  queryParameters?: IndexesIndexersListQueryParamProperties;
}

export interface IndexesIndexersListHeaderParam {
  headers?: RawHttpHeadersInput & IndexesIndexersListHeaders;
}

export type IndexesIndexersListParameters = IndexesIndexersListQueryParam &
  IndexesIndexersListHeaderParam &
  RequestParameters;

export interface IndexesIndexersCreateHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesIndexersCreateBodyParam {
  /** The definition of the indexer to create. */
  body: SearchIndexer;
}

export interface IndexesIndexersCreateHeaderParam {
  headers?: RawHttpHeadersInput & IndexesIndexersCreateHeaders;
}

export type IndexesIndexersCreateParameters = IndexesIndexersCreateHeaderParam &
  IndexesIndexersCreateBodyParam &
  RequestParameters;

export interface IndexesIndexersGetStatusHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesIndexersGetStatusHeaderParam {
  headers?: RawHttpHeadersInput & IndexesIndexersGetStatusHeaders;
}

export type IndexesIndexersGetStatusParameters =
  IndexesIndexersGetStatusHeaderParam & RequestParameters;

export interface IndexesSkillsetsCreateOrUpdateHeaders {
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  "If-Match"?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  "If-None-Match"?: string;
  /** For HTTP PUT requests, instructs the service to return the created/updated resource on success. */
  Prefer: "return=representation";
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesSkillsetsCreateOrUpdateBodyParam {
  /**
   * The skillset containing one or more skills to create or update in a search
   * service.
   */
  body: SearchIndexerSkillset;
}

export interface IndexesSkillsetsCreateOrUpdateQueryParamProperties {
  /** Ignores cache reset requirements. */
  ignoreResetRequirements?: boolean;
  /** Disables cache reprocessing change detection. */
  disableCacheReprocessingChangeDetection?: boolean;
}

export interface IndexesSkillsetsCreateOrUpdateQueryParam {
  queryParameters?: IndexesSkillsetsCreateOrUpdateQueryParamProperties;
}

export interface IndexesSkillsetsCreateOrUpdateHeaderParam {
  headers: RawHttpHeadersInput & IndexesSkillsetsCreateOrUpdateHeaders;
}

export type IndexesSkillsetsCreateOrUpdateParameters =
  IndexesSkillsetsCreateOrUpdateQueryParam &
    IndexesSkillsetsCreateOrUpdateHeaderParam &
    IndexesSkillsetsCreateOrUpdateBodyParam &
    RequestParameters;

export interface IndexesSkillsetsDeleteHeaders {
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  "If-Match"?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  "If-None-Match"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesSkillsetsDeleteHeaderParam {
  headers?: RawHttpHeadersInput & IndexesSkillsetsDeleteHeaders;
}

export type IndexesSkillsetsDeleteParameters =
  IndexesSkillsetsDeleteHeaderParam & RequestParameters;

export interface IndexesSkillsetsGetHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesSkillsetsGetHeaderParam {
  headers?: RawHttpHeadersInput & IndexesSkillsetsGetHeaders;
}

export type IndexesSkillsetsGetParameters = IndexesSkillsetsGetHeaderParam &
  RequestParameters;

export interface IndexesSkillsetsListHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesSkillsetsListQueryParamProperties {
  /**
   * Selects which top-level properties to retrieve.
   * Specified as a comma-separated list of JSON property names,
   * or '*' for all properties. The default is all properties.
   */
  $select?: string;
}

export interface IndexesSkillsetsListQueryParam {
  queryParameters?: IndexesSkillsetsListQueryParamProperties;
}

export interface IndexesSkillsetsListHeaderParam {
  headers?: RawHttpHeadersInput & IndexesSkillsetsListHeaders;
}

export type IndexesSkillsetsListParameters = IndexesSkillsetsListQueryParam &
  IndexesSkillsetsListHeaderParam &
  RequestParameters;

export interface IndexesSkillsetsCreateHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesSkillsetsCreateBodyParam {
  /** The skillset containing one or more skills to create in a search service. */
  body: SearchIndexerSkillset;
}

export interface IndexesSkillsetsCreateHeaderParam {
  headers?: RawHttpHeadersInput & IndexesSkillsetsCreateHeaders;
}

export type IndexesSkillsetsCreateParameters =
  IndexesSkillsetsCreateHeaderParam &
    IndexesSkillsetsCreateBodyParam &
    RequestParameters;

export interface IndexesSkillsetsResetSkillsHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesSkillsetsResetSkillsBodyParam {
  /**
   * The names of the skills to reset. If not specified, all skills in the skillset
   * will be reset.
   */
  body: SkillNames;
}

export interface IndexesSkillsetsResetSkillsHeaderParam {
  headers?: RawHttpHeadersInput & IndexesSkillsetsResetSkillsHeaders;
}

export type IndexesSkillsetsResetSkillsParameters =
  IndexesSkillsetsResetSkillsHeaderParam &
    IndexesSkillsetsResetSkillsBodyParam &
    RequestParameters;

export interface IndexesSynonymMapsCreateOrUpdateHeaders {
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  "If-Match"?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  "If-None-Match"?: string;
  /** For HTTP PUT requests, instructs the service to return the created/updated resource on success. */
  Prefer: "return=representation";
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesSynonymMapsCreateOrUpdateBodyParam {
  /** The definition of the synonym map to create or update. */
  body: SynonymMap;
}

export interface IndexesSynonymMapsCreateOrUpdateHeaderParam {
  headers: RawHttpHeadersInput & IndexesSynonymMapsCreateOrUpdateHeaders;
}

export type IndexesSynonymMapsCreateOrUpdateParameters =
  IndexesSynonymMapsCreateOrUpdateHeaderParam &
    IndexesSynonymMapsCreateOrUpdateBodyParam &
    RequestParameters;

export interface IndexesSynonymMapsDeleteHeaders {
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  "If-Match"?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  "If-None-Match"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesSynonymMapsDeleteHeaderParam {
  headers?: RawHttpHeadersInput & IndexesSynonymMapsDeleteHeaders;
}

export type IndexesSynonymMapsDeleteParameters =
  IndexesSynonymMapsDeleteHeaderParam & RequestParameters;

export interface IndexesSynonymMapsGetHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesSynonymMapsGetHeaderParam {
  headers?: RawHttpHeadersInput & IndexesSynonymMapsGetHeaders;
}

export type IndexesSynonymMapsGetParameters = IndexesSynonymMapsGetHeaderParam &
  RequestParameters;

export interface IndexesSynonymMapsListHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesSynonymMapsListQueryParamProperties {
  /**
   * Selects which top-level properties to retrieve.
   * Specified as a comma-separated list of JSON property names,
   * or '*' for all properties. The default is all properties.
   */
  $select?: string;
}

export interface IndexesSynonymMapsListQueryParam {
  queryParameters?: IndexesSynonymMapsListQueryParamProperties;
}

export interface IndexesSynonymMapsListHeaderParam {
  headers?: RawHttpHeadersInput & IndexesSynonymMapsListHeaders;
}

export type IndexesSynonymMapsListParameters =
  IndexesSynonymMapsListQueryParam &
    IndexesSynonymMapsListHeaderParam &
    RequestParameters;

export interface IndexesSynonymMapsCreateHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesSynonymMapsCreateBodyParam {
  /** The definition of the synonym map to create. */
  body: SynonymMap;
}

export interface IndexesSynonymMapsCreateHeaderParam {
  headers?: RawHttpHeadersInput & IndexesSynonymMapsCreateHeaders;
}

export type IndexesSynonymMapsCreateParameters =
  IndexesSynonymMapsCreateHeaderParam &
    IndexesSynonymMapsCreateBodyParam &
    RequestParameters;

export interface IndexesIndexesCreateHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesIndexesCreateBodyParam {
  /** The definition of the index to create. */
  body: SearchIndex;
}

export interface IndexesIndexesCreateHeaderParam {
  headers?: RawHttpHeadersInput & IndexesIndexesCreateHeaders;
}

export type IndexesIndexesCreateParameters = IndexesIndexesCreateHeaderParam &
  IndexesIndexesCreateBodyParam &
  RequestParameters;

export interface IndexesIndexesListHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesIndexesListQueryParamProperties {
  /**
   * Selects which top-level properties to retrieve.
   * Specified as a comma-separated list of JSON property names,
   * or '*' for all properties. The default is all properties.
   */
  $select?: string;
}

export interface IndexesIndexesListQueryParam {
  queryParameters?: IndexesIndexesListQueryParamProperties;
}

export interface IndexesIndexesListHeaderParam {
  headers?: RawHttpHeadersInput & IndexesIndexesListHeaders;
}

export type IndexesIndexesListParameters = IndexesIndexesListQueryParam &
  IndexesIndexesListHeaderParam &
  RequestParameters;

export interface IndexesIndexesCreateOrUpdateHeaders {
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  "If-Match"?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  "If-None-Match"?: string;
  /** For HTTP PUT requests, instructs the service to return the created/updated resource on success. */
  Prefer: "return=representation";
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesIndexesCreateOrUpdateBodyParam {
  /** The definition of the index to create or update. */
  body: SearchIndex;
}

export interface IndexesIndexesCreateOrUpdateQueryParamProperties {
  /**
   * Allows new analyzers, tokenizers, token filters, or char filters to be added to
   * an index by taking the index offline for at least a few seconds. This
   * temporarily causes indexing and query requests to fail. Performance and write
   * availability of the index can be impaired for several minutes after the index
   * is updated, or longer for very large indexes.
   */
  allowIndexDowntime?: boolean;
}

export interface IndexesIndexesCreateOrUpdateQueryParam {
  queryParameters?: IndexesIndexesCreateOrUpdateQueryParamProperties;
}

export interface IndexesIndexesCreateOrUpdateHeaderParam {
  headers: RawHttpHeadersInput & IndexesIndexesCreateOrUpdateHeaders;
}

export type IndexesIndexesCreateOrUpdateParameters =
  IndexesIndexesCreateOrUpdateQueryParam &
    IndexesIndexesCreateOrUpdateHeaderParam &
    IndexesIndexesCreateOrUpdateBodyParam &
    RequestParameters;

export interface IndexesIndexesDeleteHeaders {
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  "If-Match"?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  "If-None-Match"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesIndexesDeleteHeaderParam {
  headers?: RawHttpHeadersInput & IndexesIndexesDeleteHeaders;
}

export type IndexesIndexesDeleteParameters = IndexesIndexesDeleteHeaderParam &
  RequestParameters;

export interface IndexesIndexesGetHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesIndexesGetHeaderParam {
  headers?: RawHttpHeadersInput & IndexesIndexesGetHeaders;
}

export type IndexesIndexesGetParameters = IndexesIndexesGetHeaderParam &
  RequestParameters;

export interface IndexesIndexesGetStatisticsHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesIndexesGetStatisticsHeaderParam {
  headers?: RawHttpHeadersInput & IndexesIndexesGetStatisticsHeaders;
}

export type IndexesIndexesGetStatisticsParameters =
  IndexesIndexesGetStatisticsHeaderParam & RequestParameters;

export interface IndexesIndexesAnalyzeHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesIndexesAnalyzeBodyParam {
  /** The text and analyzer or analysis components to test. */
  body: AnalyzeRequest;
}

export interface IndexesIndexesAnalyzeHeaderParam {
  headers?: RawHttpHeadersInput & IndexesIndexesAnalyzeHeaders;
}

export type IndexesIndexesAnalyzeParameters = IndexesIndexesAnalyzeHeaderParam &
  IndexesIndexesAnalyzeBodyParam &
  RequestParameters;

export interface IndexesAliasesCreateHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesAliasesCreateBodyParam {
  /** The definition of the alias to create. */
  body: SearchAlias;
}

export interface IndexesAliasesCreateHeaderParam {
  headers?: RawHttpHeadersInput & IndexesAliasesCreateHeaders;
}

export type IndexesAliasesCreateParameters = IndexesAliasesCreateHeaderParam &
  IndexesAliasesCreateBodyParam &
  RequestParameters;

export interface IndexesAliasesListHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesAliasesListHeaderParam {
  headers?: RawHttpHeadersInput & IndexesAliasesListHeaders;
}

export type IndexesAliasesListParameters = IndexesAliasesListHeaderParam &
  RequestParameters;

export interface IndexesAliasesCreateOrUpdateHeaders {
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  "If-Match"?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  "If-None-Match"?: string;
  /** For HTTP PUT requests, instructs the service to return the created/updated resource on success. */
  Prefer: "return=representation";
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesAliasesCreateOrUpdateBodyParam {
  /** The definition of the alias to create or update. */
  body: SearchAlias;
}

export interface IndexesAliasesCreateOrUpdateHeaderParam {
  headers: RawHttpHeadersInput & IndexesAliasesCreateOrUpdateHeaders;
}

export type IndexesAliasesCreateOrUpdateParameters =
  IndexesAliasesCreateOrUpdateHeaderParam &
    IndexesAliasesCreateOrUpdateBodyParam &
    RequestParameters;

export interface IndexesAliasesDeleteHeaders {
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  "If-Match"?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  "If-None-Match"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesAliasesDeleteHeaderParam {
  headers?: RawHttpHeadersInput & IndexesAliasesDeleteHeaders;
}

export type IndexesAliasesDeleteParameters = IndexesAliasesDeleteHeaderParam &
  RequestParameters;

export interface IndexesAliasesGetHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface IndexesAliasesGetHeaderParam {
  headers?: RawHttpHeadersInput & IndexesAliasesGetHeaders;
}

export type IndexesAliasesGetParameters = IndexesAliasesGetHeaderParam &
  RequestParameters;
