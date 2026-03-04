// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchContext as Client } from "./index.js";
import {
  errorResponseDeserializer,
  SearchDocumentsResult,
  searchDocumentsResultDeserializer,
  vectorQueryUnionArraySerializer,
  hybridSearchSerializer,
  LookupDocument,
  lookupDocumentDeserializer,
  SuggestDocumentsResult,
  suggestDocumentsResultDeserializer,
  IndexDocumentsBatch,
  indexDocumentsBatchSerializer,
  IndexDocumentsResult,
  indexDocumentsResultDeserializer,
  AutocompleteResult,
  autocompleteResultDeserializer,
} from "../../models/azure/search/documents/models.js";
import { buildCsvCollection } from "../../static-helpers/serialization/build-csv-collection.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  AutocompletePostOptionalParams,
  AutocompleteGetOptionalParams,
  IndexOptionalParams,
  SuggestPostOptionalParams,
  SuggestGetOptionalParams,
  GetDocumentOptionalParams,
  SearchPostOptionalParams,
  SearchGetOptionalParams,
  GetDocumentCountOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _autocompletePostSend(
  context: Client,
  searchText: string,
  suggesterName: string,
  options: AutocompletePostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes('{indexName}')/docs/search.post.autocomplete{?api%2Dversion}",
    {
      indexName: context.indexName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json;odata.metadata=none",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: {
      search: searchText,
      autocompleteMode: options?.autocompleteMode,
      filter: options?.filter,
      fuzzy: options?.useFuzzyMatching,
      highlightPostTag: options?.highlightPostTag,
      highlightPreTag: options?.highlightPreTag,
      minimumCoverage: options?.minimumCoverage,
      searchFields: !options?.searchFields
        ? options?.searchFields
        : buildCsvCollection(
            options?.searchFields.map((p: any) => {
              return p;
            }),
          ),
      suggesterName: suggesterName,
      top: options?.top,
    },
  });
}

export async function _autocompletePostDeserialize(
  result: PathUncheckedResponse,
): Promise<AutocompleteResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return autocompleteResultDeserializer(result.body);
}

/** Autocompletes incomplete query terms based on input text and matching terms in the index. */
export async function autocompletePost(
  context: Client,
  searchText: string,
  suggesterName: string,
  options: AutocompletePostOptionalParams = { requestOptions: {} },
): Promise<AutocompleteResult> {
  const result = await _autocompletePostSend(context, searchText, suggesterName, options);
  return _autocompletePostDeserialize(result);
}

export function _autocompleteGetSend(
  context: Client,
  searchText: string,
  suggesterName: string,
  options: AutocompleteGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes('{indexName}')/docs/search.autocomplete{?api%2Dversion,search,suggesterName,autocompleteMode,%24filter,fuzzy,highlightPostTag,highlightPreTag,minimumCoverage,searchFields,%24top}",
    {
      indexName: context.indexName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
      search: searchText,
      suggesterName: suggesterName,
      autocompleteMode: options?.autocompleteMode,
      "%24filter": options?.filter,
      fuzzy: options?.useFuzzyMatching,
      highlightPostTag: options?.highlightPostTag,
      highlightPreTag: options?.highlightPreTag,
      minimumCoverage: options?.minimumCoverage,
      searchFields: !options?.searchFields
        ? options?.searchFields
        : options?.searchFields.map((p: any) => {
            return p;
          }),
      "%24top": options?.top,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json;odata.metadata=none",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _autocompleteGetDeserialize(
  result: PathUncheckedResponse,
): Promise<AutocompleteResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return autocompleteResultDeserializer(result.body);
}

/** Autocompletes incomplete query terms based on input text and matching terms in the index. */
export async function autocompleteGet(
  context: Client,
  searchText: string,
  suggesterName: string,
  options: AutocompleteGetOptionalParams = { requestOptions: {} },
): Promise<AutocompleteResult> {
  const result = await _autocompleteGetSend(context, searchText, suggesterName, options);
  return _autocompleteGetDeserialize(result);
}

export function _indexSend(
  context: Client,
  batch: IndexDocumentsBatch,
  options: IndexOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes('{indexName}')/docs/search.index{?api%2Dversion}",
    {
      indexName: context.indexName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json;odata.metadata=none",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: indexDocumentsBatchSerializer(batch),
  });
}

export async function _indexDeserialize(
  result: PathUncheckedResponse,
): Promise<IndexDocumentsResult> {
  const expectedStatuses = ["200", "207"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return indexDocumentsResultDeserializer(result.body);
}

/** Sends a batch of document write actions to the index. */
export async function index(
  context: Client,
  batch: IndexDocumentsBatch,
  options: IndexOptionalParams = { requestOptions: {} },
): Promise<IndexDocumentsResult> {
  const result = await _indexSend(context, batch, options);
  return _indexDeserialize(result);
}

export function _suggestPostSend(
  context: Client,
  searchText: string,
  suggesterName: string,
  options: SuggestPostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes('{indexName}')/docs/search.post.suggest{?api%2Dversion}",
    {
      indexName: context.indexName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json;odata.metadata=none",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: {
      filter: options?.filter,
      fuzzy: options?.useFuzzyMatching,
      highlightPostTag: options?.highlightPostTag,
      highlightPreTag: options?.highlightPreTag,
      minimumCoverage: options?.minimumCoverage,
      orderby: options?.orderBy,
      search: searchText,
      searchFields: options?.searchFields,
      select: options?.select,
      suggesterName: suggesterName,
      top: options?.top,
    },
  });
}

export async function _suggestPostDeserialize(
  result: PathUncheckedResponse,
): Promise<SuggestDocumentsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return suggestDocumentsResultDeserializer(result.body);
}

/** Suggests documents in the index that match the given partial query text. */
export async function suggestPost(
  context: Client,
  searchText: string,
  suggesterName: string,
  options: SuggestPostOptionalParams = { requestOptions: {} },
): Promise<SuggestDocumentsResult> {
  const result = await _suggestPostSend(context, searchText, suggesterName, options);
  return _suggestPostDeserialize(result);
}

export function _suggestGetSend(
  context: Client,
  searchText: string,
  suggesterName: string,
  options: SuggestGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes('{indexName}')/docs/search.suggest{?api%2Dversion,search,suggesterName,%24filter,fuzzy,highlightPostTag,highlightPreTag,minimumCoverage,%24orderby,searchFields,%24select,%24top}",
    {
      indexName: context.indexName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
      search: searchText,
      suggesterName: suggesterName,
      "%24filter": options?.filter,
      fuzzy: options?.useFuzzyMatching,
      highlightPostTag: options?.highlightPostTag,
      highlightPreTag: options?.highlightPreTag,
      minimumCoverage: options?.minimumCoverage,
      "%24orderby": options?.orderBy,
      searchFields: options?.searchFields,
      "%24select": options?.select,
      "%24top": options?.top,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json;odata.metadata=none",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _suggestGetDeserialize(
  result: PathUncheckedResponse,
): Promise<SuggestDocumentsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return suggestDocumentsResultDeserializer(result.body);
}

/** Suggests documents in the index that match the given partial query text. */
export async function suggestGet(
  context: Client,
  searchText: string,
  suggesterName: string,
  options: SuggestGetOptionalParams = { requestOptions: {} },
): Promise<SuggestDocumentsResult> {
  const result = await _suggestGetSend(context, searchText, suggesterName, options);
  return _suggestGetDeserialize(result);
}

export function _getDocumentSend(
  context: Client,
  key: string,
  options: GetDocumentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes('{indexName}')/docs('{key}'){?api%2Dversion,%24select}",
    {
      key: key,
      indexName: context.indexName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
      "%24select": options?.selectedFields,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json;odata.metadata=none",
      ...(options?.querySourceAuthorization !== undefined
        ? { "x-ms-query-source-authorization": options?.querySourceAuthorization }
        : {}),
      ...(options?.enableElevatedRead !== undefined
        ? { "x-ms-enable-elevated-read": options?.enableElevatedRead }
        : {}),
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDocumentDeserialize(
  result: PathUncheckedResponse,
): Promise<LookupDocument> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return lookupDocumentDeserializer(result.body);
}

/** Retrieves a document from the index. */
export async function getDocument(
  context: Client,
  key: string,
  options: GetDocumentOptionalParams = { requestOptions: {} },
): Promise<LookupDocument> {
  const result = await _getDocumentSend(context, key, options);
  return _getDocumentDeserialize(result);
}

export function _searchPostSend(
  context: Client,
  options: SearchPostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes('{indexName}')/docs/search.post.search{?api%2Dversion}",
    {
      indexName: context.indexName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json;odata.metadata=none",
      ...(options?.querySourceAuthorization !== undefined
        ? { "x-ms-query-source-authorization": options?.querySourceAuthorization }
        : {}),
      ...(options?.enableElevatedRead !== undefined
        ? { "x-ms-enable-elevated-read": options?.enableElevatedRead }
        : {}),
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: {
      count: options?.includeTotalCount,
      facets: !options?.facets
        ? options?.facets
        : options?.facets.map((p: any) => {
            return p;
          }),
      filter: options?.filter,
      highlight: !options?.highlightFields
        ? options?.highlightFields
        : buildCsvCollection(
            options?.highlightFields.map((p: any) => {
              return p;
            }),
          ),
      highlightPostTag: options?.highlightPostTag,
      highlightPreTag: options?.highlightPreTag,
      minimumCoverage: options?.minimumCoverage,
      orderby: options?.orderBy,
      queryType: options?.queryType,
      scoringStatistics: options?.scoringStatistics,
      sessionId: options?.sessionId,
      scoringParameters: !options?.scoringParameters
        ? options?.scoringParameters
        : options?.scoringParameters.map((p: any) => {
            return p;
          }),
      scoringProfile: options?.scoringProfile,
      debug: options?.debug,
      search: options?.searchText,
      searchFields: options?.searchFields,
      searchMode: options?.searchMode,
      queryLanguage: options?.queryLanguage,
      speller: options?.querySpeller,
      select: options?.select,
      skip: options?.skip,
      top: options?.top,
      semanticConfiguration: options?.semanticConfigurationName,
      semanticErrorHandling: options?.semanticErrorHandling,
      semanticMaxWaitInMilliseconds: options?.semanticMaxWaitInMilliseconds,
      semanticQuery: options?.semanticQuery,
      answers: options?.answers,
      captions: options?.captions,
      queryRewrites: options?.queryRewrites,
      semanticFields: !options?.semanticFields
        ? options?.semanticFields
        : buildCsvCollection(
            options?.semanticFields.map((p: any) => {
              return p;
            }),
          ),
      vectorQueries: !options?.vectorQueries
        ? options?.vectorQueries
        : vectorQueryUnionArraySerializer(options?.vectorQueries),
      vectorFilterMode: options?.vectorFilterMode,
      hybridSearch: !options?.hybridSearch
        ? options?.hybridSearch
        : hybridSearchSerializer(options?.hybridSearch),
    },
  });
}

export async function _searchPostDeserialize(
  result: PathUncheckedResponse,
): Promise<SearchDocumentsResult> {
  const expectedStatuses = ["200", "206"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return searchDocumentsResultDeserializer(result.body);
}

/** Searches for documents in the index. */
export async function searchPost(
  context: Client,
  options: SearchPostOptionalParams = { requestOptions: {} },
): Promise<SearchDocumentsResult> {
  const result = await _searchPostSend(context, options);
  return _searchPostDeserialize(result);
}

export function _searchGetSend(
  context: Client,
  options: SearchGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes('{indexName}')/docs{?api%2Dversion,search,%24count,facet*,%24filter,highlight,highlightPostTag,highlightPreTag,minimumCoverage,%24orderby,queryType,scoringParameter*,scoringProfile,searchFields,searchMode,scoringStatistics,sessionId,%24select,%24skip,%24top,semanticConfiguration,semanticErrorHandling,semanticMaxWaitInMilliseconds,answers,captions,semanticQuery,queryRewrites,debug,queryLanguage,speller,semanticFields}",
    {
      indexName: context.indexName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
      search: options?.searchText,
      "%24count": options?.includeTotalResultCount,
      facet: !options?.facets
        ? options?.facets
        : options?.facets.map((p: any) => {
            return p;
          }),
      "%24filter": options?.filter,
      highlight: !options?.highlightFields
        ? options?.highlightFields
        : options?.highlightFields.map((p: any) => {
            return p;
          }),
      highlightPostTag: options?.highlightPostTag,
      highlightPreTag: options?.highlightPreTag,
      minimumCoverage: options?.minimumCoverage,
      "%24orderby": options?.orderBy,
      queryType: options?.queryType,
      scoringParameter: !options?.scoringParameters
        ? options?.scoringParameters
        : options?.scoringParameters.map((p: any) => {
            return p;
          }),
      scoringProfile: options?.scoringProfile,
      searchFields: options?.searchFields,
      searchMode: options?.searchMode,
      scoringStatistics: options?.scoringStatistics,
      sessionId: options?.sessionId,
      "%24select": options?.select,
      "%24skip": options?.skip,
      "%24top": options?.top,
      semanticConfiguration: options?.semanticConfiguration,
      semanticErrorHandling: options?.semanticErrorHandling,
      semanticMaxWaitInMilliseconds: options?.semanticMaxWaitInMilliseconds,
      answers: options?.answers,
      captions: options?.captions,
      semanticQuery: options?.semanticQuery,
      queryRewrites: options?.queryRewrites,
      debug: options?.debug,
      queryLanguage: options?.queryLanguage,
      speller: options?.speller,
      semanticFields: !options?.semanticFields
        ? options?.semanticFields
        : options?.semanticFields.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json;odata.metadata=none",
      ...(options?.querySourceAuthorization !== undefined
        ? { "x-ms-query-source-authorization": options?.querySourceAuthorization }
        : {}),
      ...(options?.enableElevatedRead !== undefined
        ? { "x-ms-enable-elevated-read": options?.enableElevatedRead }
        : {}),
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _searchGetDeserialize(
  result: PathUncheckedResponse,
): Promise<SearchDocumentsResult> {
  const expectedStatuses = ["200", "206"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return searchDocumentsResultDeserializer(result.body);
}

/** Searches for documents in the index. */
export async function searchGet(
  context: Client,
  options: SearchGetOptionalParams = { requestOptions: {} },
): Promise<SearchDocumentsResult> {
  const result = await _searchGetSend(context, options);
  return _searchGetDeserialize(result);
}

export function _getDocumentCountSend(
  context: Client,
  options: GetDocumentCountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes('{indexName}')/docs/$count{?api%2Dversion}",
    {
      indexName: context.indexName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json;odata.metadata=none",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDocumentCountDeserialize(result: PathUncheckedResponse): Promise<number> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return result.body;
}

/** Queries the number of documents in the index. */
export async function getDocumentCount(
  context: Client,
  options: GetDocumentCountOptionalParams = { requestOptions: {} },
): Promise<number> {
  const result = await _getDocumentCountSend(context, options);
  return _getDocumentCountDeserialize(result);
}
