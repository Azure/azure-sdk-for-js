// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  IndexesGetServiceStatisticsParameters,
  IndexesGetIndexStatsSummaryParameters,
  DocumentsCountParameters,
  DocumentsSearchGetParameters,
  DocumentsSearchPostParameters,
  DocumentsGetParameters,
  DocumentsSuggestGetParameters,
  DocumentsSuggestPostParameters,
  DocumentsIndexParameters,
  DocumentsAutocompleteGetParameters,
  DocumentsAutocompletePostParameters,
  IndexesDataSourcesCreateOrUpdateParameters,
  IndexesDataSourcesDeleteParameters,
  IndexesDataSourcesGetParameters,
  IndexesDataSourcesListParameters,
  IndexesDataSourcesCreateParameters,
  IndexesIndexersResetParameters,
  IndexesIndexersResetDocsParameters,
  IndexesIndexersRunParameters,
  IndexesIndexersCreateOrUpdateParameters,
  IndexesIndexersDeleteParameters,
  IndexesIndexersGetParameters,
  IndexesIndexersListParameters,
  IndexesIndexersCreateParameters,
  IndexesIndexersGetStatusParameters,
  IndexesSkillsetsCreateOrUpdateParameters,
  IndexesSkillsetsDeleteParameters,
  IndexesSkillsetsGetParameters,
  IndexesSkillsetsListParameters,
  IndexesSkillsetsCreateParameters,
  IndexesSkillsetsResetSkillsParameters,
  IndexesSynonymMapsCreateOrUpdateParameters,
  IndexesSynonymMapsDeleteParameters,
  IndexesSynonymMapsGetParameters,
  IndexesSynonymMapsListParameters,
  IndexesSynonymMapsCreateParameters,
  IndexesIndexesCreateParameters,
  IndexesIndexesListParameters,
  IndexesIndexesCreateOrUpdateParameters,
  IndexesIndexesDeleteParameters,
  IndexesIndexesGetParameters,
  IndexesIndexesGetStatisticsParameters,
  IndexesIndexesAnalyzeParameters,
  IndexesAliasesCreateParameters,
  IndexesAliasesListParameters,
  IndexesAliasesCreateOrUpdateParameters,
  IndexesAliasesDeleteParameters,
  IndexesAliasesGetParameters,
} from "./parameters.js";
import type {
  IndexesGetServiceStatistics200Response,
  IndexesGetServiceStatisticsDefaultResponse,
  IndexesGetIndexStatsSummary200Response,
  IndexesGetIndexStatsSummaryDefaultResponse,
  DocumentsCount200Response,
  DocumentsCountDefaultResponse,
  DocumentsSearchGet200Response,
  DocumentsSearchGetDefaultResponse,
  DocumentsSearchPost200Response,
  DocumentsSearchPostDefaultResponse,
  DocumentsGet200Response,
  DocumentsGetDefaultResponse,
  DocumentsSuggestGet200Response,
  DocumentsSuggestGetDefaultResponse,
  DocumentsSuggestPost200Response,
  DocumentsSuggestPostDefaultResponse,
  DocumentsIndex200Response,
  DocumentsIndex207Response,
  DocumentsIndexDefaultResponse,
  DocumentsAutocompleteGet200Response,
  DocumentsAutocompleteGetDefaultResponse,
  DocumentsAutocompletePost200Response,
  DocumentsAutocompletePostDefaultResponse,
  IndexesDataSourcesCreateOrUpdate200Response,
  IndexesDataSourcesCreateOrUpdate201Response,
  IndexesDataSourcesCreateOrUpdateDefaultResponse,
  IndexesDataSourcesDelete204Response,
  IndexesDataSourcesDelete404Response,
  IndexesDataSourcesDeleteDefaultResponse,
  IndexesDataSourcesGet200Response,
  IndexesDataSourcesGetDefaultResponse,
  IndexesDataSourcesList200Response,
  IndexesDataSourcesListDefaultResponse,
  IndexesDataSourcesCreate201Response,
  IndexesDataSourcesCreateDefaultResponse,
  IndexesIndexersReset204Response,
  IndexesIndexersResetDefaultResponse,
  IndexesIndexersResetDocs204Response,
  IndexesIndexersResetDocsDefaultResponse,
  IndexesIndexersRun202Response,
  IndexesIndexersRunDefaultResponse,
  IndexesIndexersCreateOrUpdate200Response,
  IndexesIndexersCreateOrUpdate201Response,
  IndexesIndexersCreateOrUpdateDefaultResponse,
  IndexesIndexersDelete204Response,
  IndexesIndexersDelete404Response,
  IndexesIndexersDeleteDefaultResponse,
  IndexesIndexersGet200Response,
  IndexesIndexersGetDefaultResponse,
  IndexesIndexersList200Response,
  IndexesIndexersListDefaultResponse,
  IndexesIndexersCreate201Response,
  IndexesIndexersCreateDefaultResponse,
  IndexesIndexersGetStatus200Response,
  IndexesIndexersGetStatusDefaultResponse,
  IndexesSkillsetsCreateOrUpdate200Response,
  IndexesSkillsetsCreateOrUpdate201Response,
  IndexesSkillsetsCreateOrUpdateDefaultResponse,
  IndexesSkillsetsDelete204Response,
  IndexesSkillsetsDelete404Response,
  IndexesSkillsetsDeleteDefaultResponse,
  IndexesSkillsetsGet200Response,
  IndexesSkillsetsGetDefaultResponse,
  IndexesSkillsetsList200Response,
  IndexesSkillsetsListDefaultResponse,
  IndexesSkillsetsCreate201Response,
  IndexesSkillsetsCreateDefaultResponse,
  IndexesSkillsetsResetSkills204Response,
  IndexesSkillsetsResetSkillsDefaultResponse,
  IndexesSynonymMapsCreateOrUpdate200Response,
  IndexesSynonymMapsCreateOrUpdate201Response,
  IndexesSynonymMapsCreateOrUpdateDefaultResponse,
  IndexesSynonymMapsDelete204Response,
  IndexesSynonymMapsDelete404Response,
  IndexesSynonymMapsDeleteDefaultResponse,
  IndexesSynonymMapsGet200Response,
  IndexesSynonymMapsGetDefaultResponse,
  IndexesSynonymMapsList200Response,
  IndexesSynonymMapsListDefaultResponse,
  IndexesSynonymMapsCreate201Response,
  IndexesSynonymMapsCreateDefaultResponse,
  IndexesIndexesCreate201Response,
  IndexesIndexesCreateDefaultResponse,
  IndexesIndexesList200Response,
  IndexesIndexesListDefaultResponse,
  IndexesIndexesCreateOrUpdate200Response,
  IndexesIndexesCreateOrUpdate201Response,
  IndexesIndexesCreateOrUpdateDefaultResponse,
  IndexesIndexesDelete204Response,
  IndexesIndexesDelete404Response,
  IndexesIndexesDeleteDefaultResponse,
  IndexesIndexesGet200Response,
  IndexesIndexesGetDefaultResponse,
  IndexesIndexesGetStatistics200Response,
  IndexesIndexesGetStatisticsDefaultResponse,
  IndexesIndexesAnalyze200Response,
  IndexesIndexesAnalyzeDefaultResponse,
  IndexesAliasesCreate201Response,
  IndexesAliasesCreateDefaultResponse,
  IndexesAliasesList200Response,
  IndexesAliasesListDefaultResponse,
  IndexesAliasesCreateOrUpdate200Response,
  IndexesAliasesCreateOrUpdate201Response,
  IndexesAliasesCreateOrUpdateDefaultResponse,
  IndexesAliasesDelete204Response,
  IndexesAliasesDelete404Response,
  IndexesAliasesDeleteDefaultResponse,
  IndexesAliasesGet200Response,
  IndexesAliasesGetDefaultResponse,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface IndexesGetServiceStatistics {
  /** Gets service level statistics for a search service. */
  get(
    options?: IndexesGetServiceStatisticsParameters,
  ): StreamableMethod<
    | IndexesGetServiceStatistics200Response
    | IndexesGetServiceStatisticsDefaultResponse
  >;
}

export interface IndexesGetIndexStatsSummary {
  /** Retrieves a summary of statistics for all indexes in the search service. */
  get(
    options?: IndexesGetIndexStatsSummaryParameters,
  ): StreamableMethod<
    | IndexesGetIndexStatsSummary200Response
    | IndexesGetIndexStatsSummaryDefaultResponse
  >;
}

export interface DocumentsCount {
  /** Queries the number of documents in the index. */
  get(
    options?: DocumentsCountParameters,
  ): StreamableMethod<
    DocumentsCount200Response | DocumentsCountDefaultResponse
  >;
}

export interface DocumentsSearchGet {
  /** Searches for documents in the index. */
  get(
    options?: DocumentsSearchGetParameters,
  ): StreamableMethod<
    DocumentsSearchGet200Response | DocumentsSearchGetDefaultResponse
  >;
}

export interface DocumentsSearchPost {
  /** Searches for documents in the index. */
  post(
    options: DocumentsSearchPostParameters,
  ): StreamableMethod<
    DocumentsSearchPost200Response | DocumentsSearchPostDefaultResponse
  >;
}

export interface DocumentsGet {
  /** Retrieves a document from the index. */
  get(
    options?: DocumentsGetParameters,
  ): StreamableMethod<DocumentsGet200Response | DocumentsGetDefaultResponse>;
}

export interface DocumentsSuggestGet {
  /** Suggests documents in the index that match the given partial query text. */
  get(
    options: DocumentsSuggestGetParameters,
  ): StreamableMethod<
    DocumentsSuggestGet200Response | DocumentsSuggestGetDefaultResponse
  >;
}

export interface DocumentsSuggestPost {
  /** Suggests documents in the index that match the given partial query text. */
  post(
    options: DocumentsSuggestPostParameters,
  ): StreamableMethod<
    DocumentsSuggestPost200Response | DocumentsSuggestPostDefaultResponse
  >;
}

export interface DocumentsIndex {
  /** Sends a batch of document write actions to the index. */
  post(
    options: DocumentsIndexParameters,
  ): StreamableMethod<
    | DocumentsIndex200Response
    | DocumentsIndex207Response
    | DocumentsIndexDefaultResponse
  >;
}

export interface DocumentsAutocompleteGet {
  /**
   * Autocompletes incomplete query terms based on input text and matching terms in
   * the index.
   */
  get(
    options: DocumentsAutocompleteGetParameters,
  ): StreamableMethod<
    | DocumentsAutocompleteGet200Response
    | DocumentsAutocompleteGetDefaultResponse
  >;
}

export interface DocumentsAutocompletePost {
  /**
   * Autocompletes incomplete query terms based on input text and matching terms in
   * the index.
   */
  post(
    options: DocumentsAutocompletePostParameters,
  ): StreamableMethod<
    | DocumentsAutocompletePost200Response
    | DocumentsAutocompletePostDefaultResponse
  >;
}

export interface IndexesDataSourcesCreateOrUpdate {
  /** Creates a new datasource or updates a datasource if it already exists. */
  put(
    options: IndexesDataSourcesCreateOrUpdateParameters,
  ): StreamableMethod<
    | IndexesDataSourcesCreateOrUpdate200Response
    | IndexesDataSourcesCreateOrUpdate201Response
    | IndexesDataSourcesCreateOrUpdateDefaultResponse
  >;
  /** Deletes a datasource. */
  delete(
    options?: IndexesDataSourcesDeleteParameters,
  ): StreamableMethod<
    | IndexesDataSourcesDelete204Response
    | IndexesDataSourcesDelete404Response
    | IndexesDataSourcesDeleteDefaultResponse
  >;
  /** Retrieves a datasource definition. */
  get(
    options?: IndexesDataSourcesGetParameters,
  ): StreamableMethod<
    IndexesDataSourcesGet200Response | IndexesDataSourcesGetDefaultResponse
  >;
}

export interface IndexesDataSourcesList {
  /** Lists all datasources available for a search service. */
  get(
    options?: IndexesDataSourcesListParameters,
  ): StreamableMethod<
    IndexesDataSourcesList200Response | IndexesDataSourcesListDefaultResponse
  >;
  /** Creates a new datasource. */
  post(
    options: IndexesDataSourcesCreateParameters,
  ): StreamableMethod<
    | IndexesDataSourcesCreate201Response
    | IndexesDataSourcesCreateDefaultResponse
  >;
}

export interface IndexesIndexersReset {
  /** Resets the change tracking state associated with an indexer. */
  post(
    options?: IndexesIndexersResetParameters,
  ): StreamableMethod<
    IndexesIndexersReset204Response | IndexesIndexersResetDefaultResponse
  >;
}

export interface IndexesIndexersResetDocs {
  /**
   * Resets specific documents in the datasource to be selectively re-ingested by
   * the indexer.
   */
  post(
    options?: IndexesIndexersResetDocsParameters,
  ): StreamableMethod<
    | IndexesIndexersResetDocs204Response
    | IndexesIndexersResetDocsDefaultResponse
  >;
}

export interface IndexesIndexersRun {
  /** Runs an indexer on-demand. */
  post(
    options?: IndexesIndexersRunParameters,
  ): StreamableMethod<
    IndexesIndexersRun202Response | IndexesIndexersRunDefaultResponse
  >;
}

export interface IndexesIndexersCreateOrUpdate {
  /** Creates a new indexer or updates an indexer if it already exists. */
  put(
    options: IndexesIndexersCreateOrUpdateParameters,
  ): StreamableMethod<
    | IndexesIndexersCreateOrUpdate200Response
    | IndexesIndexersCreateOrUpdate201Response
    | IndexesIndexersCreateOrUpdateDefaultResponse
  >;
  /** Deletes an indexer. */
  delete(
    options?: IndexesIndexersDeleteParameters,
  ): StreamableMethod<
    | IndexesIndexersDelete204Response
    | IndexesIndexersDelete404Response
    | IndexesIndexersDeleteDefaultResponse
  >;
  /** Retrieves an indexer definition. */
  get(
    options?: IndexesIndexersGetParameters,
  ): StreamableMethod<
    IndexesIndexersGet200Response | IndexesIndexersGetDefaultResponse
  >;
}

export interface IndexesIndexersList {
  /** Lists all indexers available for a search service. */
  get(
    options?: IndexesIndexersListParameters,
  ): StreamableMethod<
    IndexesIndexersList200Response | IndexesIndexersListDefaultResponse
  >;
  /** Creates a new indexer. */
  post(
    options: IndexesIndexersCreateParameters,
  ): StreamableMethod<
    IndexesIndexersCreate201Response | IndexesIndexersCreateDefaultResponse
  >;
}

export interface IndexesIndexersGetStatus {
  /** Returns the current status and execution history of an indexer. */
  get(
    options?: IndexesIndexersGetStatusParameters,
  ): StreamableMethod<
    | IndexesIndexersGetStatus200Response
    | IndexesIndexersGetStatusDefaultResponse
  >;
}

export interface IndexesSkillsetsCreateOrUpdate {
  /**
   * Creates a new skillset in a search service or updates the skillset if it
   * already exists.
   */
  put(
    options: IndexesSkillsetsCreateOrUpdateParameters,
  ): StreamableMethod<
    | IndexesSkillsetsCreateOrUpdate200Response
    | IndexesSkillsetsCreateOrUpdate201Response
    | IndexesSkillsetsCreateOrUpdateDefaultResponse
  >;
  /** Deletes a skillset in a search service. */
  delete(
    options?: IndexesSkillsetsDeleteParameters,
  ): StreamableMethod<
    | IndexesSkillsetsDelete204Response
    | IndexesSkillsetsDelete404Response
    | IndexesSkillsetsDeleteDefaultResponse
  >;
  /** Retrieves a skillset in a search service. */
  get(
    options?: IndexesSkillsetsGetParameters,
  ): StreamableMethod<
    IndexesSkillsetsGet200Response | IndexesSkillsetsGetDefaultResponse
  >;
}

export interface IndexesSkillsetsList {
  /** List all skillsets in a search service. */
  get(
    options?: IndexesSkillsetsListParameters,
  ): StreamableMethod<
    IndexesSkillsetsList200Response | IndexesSkillsetsListDefaultResponse
  >;
  /** Creates a new skillset in a search service. */
  post(
    options: IndexesSkillsetsCreateParameters,
  ): StreamableMethod<
    IndexesSkillsetsCreate201Response | IndexesSkillsetsCreateDefaultResponse
  >;
}

export interface IndexesSkillsetsResetSkills {
  /** Reset an existing skillset in a search service. */
  post(
    options: IndexesSkillsetsResetSkillsParameters,
  ): StreamableMethod<
    | IndexesSkillsetsResetSkills204Response
    | IndexesSkillsetsResetSkillsDefaultResponse
  >;
}

export interface IndexesSynonymMapsCreateOrUpdate {
  /** Creates a new synonym map or updates a synonym map if it already exists. */
  put(
    options: IndexesSynonymMapsCreateOrUpdateParameters,
  ): StreamableMethod<
    | IndexesSynonymMapsCreateOrUpdate200Response
    | IndexesSynonymMapsCreateOrUpdate201Response
    | IndexesSynonymMapsCreateOrUpdateDefaultResponse
  >;
  /** Deletes a synonym map. */
  delete(
    options?: IndexesSynonymMapsDeleteParameters,
  ): StreamableMethod<
    | IndexesSynonymMapsDelete204Response
    | IndexesSynonymMapsDelete404Response
    | IndexesSynonymMapsDeleteDefaultResponse
  >;
  /** Retrieves a synonym map definition. */
  get(
    options?: IndexesSynonymMapsGetParameters,
  ): StreamableMethod<
    IndexesSynonymMapsGet200Response | IndexesSynonymMapsGetDefaultResponse
  >;
}

export interface IndexesSynonymMapsList {
  /** Lists all synonym maps available for a search service. */
  get(
    options?: IndexesSynonymMapsListParameters,
  ): StreamableMethod<
    IndexesSynonymMapsList200Response | IndexesSynonymMapsListDefaultResponse
  >;
  /** Creates a new synonym map. */
  post(
    options: IndexesSynonymMapsCreateParameters,
  ): StreamableMethod<
    | IndexesSynonymMapsCreate201Response
    | IndexesSynonymMapsCreateDefaultResponse
  >;
}

export interface IndexesIndexesCreate {
  /** Creates a new search index. */
  post(
    options: IndexesIndexesCreateParameters,
  ): StreamableMethod<
    IndexesIndexesCreate201Response | IndexesIndexesCreateDefaultResponse
  >;
  /** Lists all indexes available for a search service. */
  get(
    options?: IndexesIndexesListParameters,
  ): StreamableMethod<
    IndexesIndexesList200Response | IndexesIndexesListDefaultResponse
  >;
}

export interface IndexesIndexesCreateOrUpdate {
  /** Creates a new search index or updates an index if it already exists. */
  put(
    options: IndexesIndexesCreateOrUpdateParameters,
  ): StreamableMethod<
    | IndexesIndexesCreateOrUpdate200Response
    | IndexesIndexesCreateOrUpdate201Response
    | IndexesIndexesCreateOrUpdateDefaultResponse
  >;
  /**
   * Deletes a search index and all the documents it contains. This operation is
   * permanent, with no recovery option. Make sure you have a master copy of your
   * index definition, data ingestion code, and a backup of the primary data source
   * in case you need to re-build the index.
   */
  delete(
    options?: IndexesIndexesDeleteParameters,
  ): StreamableMethod<
    | IndexesIndexesDelete204Response
    | IndexesIndexesDelete404Response
    | IndexesIndexesDeleteDefaultResponse
  >;
  /** Retrieves an index definition. */
  get(
    options?: IndexesIndexesGetParameters,
  ): StreamableMethod<
    IndexesIndexesGet200Response | IndexesIndexesGetDefaultResponse
  >;
}

export interface IndexesIndexesGetStatistics {
  /**
   * Returns statistics for the given index, including a document count and storage
   * usage.
   */
  get(
    options?: IndexesIndexesGetStatisticsParameters,
  ): StreamableMethod<
    | IndexesIndexesGetStatistics200Response
    | IndexesIndexesGetStatisticsDefaultResponse
  >;
}

export interface IndexesIndexesAnalyze {
  /** Shows how an analyzer breaks text into tokens. */
  post(
    options: IndexesIndexesAnalyzeParameters,
  ): StreamableMethod<
    IndexesIndexesAnalyze200Response | IndexesIndexesAnalyzeDefaultResponse
  >;
}

export interface IndexesAliasesCreate {
  /** Creates a new search alias. */
  post(
    options: IndexesAliasesCreateParameters,
  ): StreamableMethod<
    IndexesAliasesCreate201Response | IndexesAliasesCreateDefaultResponse
  >;
  /** Lists all aliases available for a search service. */
  get(
    options?: IndexesAliasesListParameters,
  ): StreamableMethod<
    IndexesAliasesList200Response | IndexesAliasesListDefaultResponse
  >;
}

export interface IndexesAliasesCreateOrUpdate {
  /** Creates a new search alias or updates an alias if it already exists. */
  put(
    options: IndexesAliasesCreateOrUpdateParameters,
  ): StreamableMethod<
    | IndexesAliasesCreateOrUpdate200Response
    | IndexesAliasesCreateOrUpdate201Response
    | IndexesAliasesCreateOrUpdateDefaultResponse
  >;
  /**
   * Deletes a search alias and its associated mapping to an index. This operation
   * is permanent, with no recovery option. The mapped index is untouched by this
   * operation.
   */
  delete(
    options?: IndexesAliasesDeleteParameters,
  ): StreamableMethod<
    | IndexesAliasesDelete204Response
    | IndexesAliasesDelete404Response
    | IndexesAliasesDeleteDefaultResponse
  >;
  /** Retrieves an alias definition. */
  get(
    options?: IndexesAliasesGetParameters,
  ): StreamableMethod<
    IndexesAliasesGet200Response | IndexesAliasesGetDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/servicestats' has methods for the following verbs: get */
  (path: "/servicestats"): IndexesGetServiceStatistics;
  /** Resource for '/indexstats' has methods for the following verbs: get */
  (path: "/indexstats"): IndexesGetIndexStatsSummary;
  /** Resource for '/indexes('\{indexName\}')/docs/$count' has methods for the following verbs: get */
  (
    path: "/indexes('{indexName}')/docs/$count",
    indexName: string,
  ): DocumentsCount;
  /** Resource for '/indexes('\{indexName\}')/docs' has methods for the following verbs: get */
  (path: "/indexes('{indexName}')/docs", indexName: string): DocumentsSearchGet;
  /** Resource for '/indexes('\{indexName\}')/docs/search.post.search' has methods for the following verbs: post */
  (
    path: "/indexes('{indexName}')/docs/search.post.search",
    indexName: string,
  ): DocumentsSearchPost;
  /** Resource for '/indexes('\{indexName\}')/docs('\{key\}')' has methods for the following verbs: get */
  (
    path: "/indexes('{indexName}')/docs('{key}')",
    key: string,
    indexName: string,
  ): DocumentsGet;
  /** Resource for '/indexes('\{indexName\}')/docs/search.suggest' has methods for the following verbs: get */
  (
    path: "/indexes('{indexName}')/docs/search.suggest",
    indexName: string,
  ): DocumentsSuggestGet;
  /** Resource for '/indexes('\{indexName\}')/docs/search.post.suggest' has methods for the following verbs: post */
  (
    path: "/indexes('{indexName}')/docs/search.post.suggest",
    indexName: string,
  ): DocumentsSuggestPost;
  /** Resource for '/indexes('\{indexName\}')/docs/search.index' has methods for the following verbs: post */
  (
    path: "/indexes('{indexName}')/docs/search.index",
    indexName: string,
  ): DocumentsIndex;
  /** Resource for '/indexes('\{indexName\}')/docs/search.autocomplete' has methods for the following verbs: get */
  (
    path: "/indexes('{indexName}')/docs/search.autocomplete",
    indexName: string,
  ): DocumentsAutocompleteGet;
  /** Resource for '/indexes('\{indexName\}')/docs/search.post.autocomplete' has methods for the following verbs: post */
  (
    path: "/indexes('{indexName}')/docs/search.post.autocomplete",
    indexName: string,
  ): DocumentsAutocompletePost;
  /** Resource for '/datasources('\{dataSourceName\}')' has methods for the following verbs: put, delete, get */
  (
    path: "/datasources('{dataSourceName}')",
    dataSourceName: string,
  ): IndexesDataSourcesCreateOrUpdate;
  /** Resource for '/datasources' has methods for the following verbs: get, post */
  (path: "/datasources"): IndexesDataSourcesList;
  /** Resource for '/indexers('\{indexerName\}')/search.reset' has methods for the following verbs: post */
  (
    path: "/indexers('{indexerName}')/search.reset",
    indexerName: string,
  ): IndexesIndexersReset;
  /** Resource for '/indexers('\{indexerName\}')/search.resetdocs' has methods for the following verbs: post */
  (
    path: "/indexers('{indexerName}')/search.resetdocs",
    indexerName: string,
  ): IndexesIndexersResetDocs;
  /** Resource for '/indexers('\{indexerName\}')/search.run' has methods for the following verbs: post */
  (
    path: "/indexers('{indexerName}')/search.run",
    indexerName: string,
  ): IndexesIndexersRun;
  /** Resource for '/indexers('\{indexerName\}')' has methods for the following verbs: put, delete, get */
  (
    path: "/indexers('{indexerName}')",
    indexerName: string,
  ): IndexesIndexersCreateOrUpdate;
  /** Resource for '/indexers' has methods for the following verbs: get, post */
  (path: "/indexers"): IndexesIndexersList;
  /** Resource for '/indexers('\{indexerName\}')/search.status' has methods for the following verbs: get */
  (
    path: "/indexers('{indexerName}')/search.status",
    indexerName: string,
  ): IndexesIndexersGetStatus;
  /** Resource for '/skillsets('\{skillsetName\}')' has methods for the following verbs: put, delete, get */
  (
    path: "/skillsets('{skillsetName}')",
    skillsetName: string,
  ): IndexesSkillsetsCreateOrUpdate;
  /** Resource for '/skillsets' has methods for the following verbs: get, post */
  (path: "/skillsets"): IndexesSkillsetsList;
  /** Resource for '/skillsets('\{skillsetName\}')/search.resetskills' has methods for the following verbs: post */
  (
    path: "/skillsets('{skillsetName}')/search.resetskills",
    skillsetName: string,
  ): IndexesSkillsetsResetSkills;
  /** Resource for '/synonymmaps('\{synonymMapName\}')' has methods for the following verbs: put, delete, get */
  (
    path: "/synonymmaps('{synonymMapName}')",
    synonymMapName: string,
  ): IndexesSynonymMapsCreateOrUpdate;
  /** Resource for '/synonymmaps' has methods for the following verbs: get, post */
  (path: "/synonymmaps"): IndexesSynonymMapsList;
  /** Resource for '/indexes' has methods for the following verbs: post, get */
  (path: "/indexes"): IndexesIndexesCreate;
  /** Resource for '/indexes('\{indexName\}')' has methods for the following verbs: put, delete, get */
  (
    path: "/indexes('{indexName}')",
    indexName: string,
  ): IndexesIndexesCreateOrUpdate;
  /** Resource for '/indexes('\{indexName\}')/search.stats' has methods for the following verbs: get */
  (
    path: "/indexes('{indexName}')/search.stats",
    indexName: string,
  ): IndexesIndexesGetStatistics;
  /** Resource for '/indexes('\{indexName\}')/search.analyze' has methods for the following verbs: post */
  (
    path: "/indexes('{indexName}')/search.analyze",
    indexName: string,
  ): IndexesIndexesAnalyze;
  /** Resource for '/aliases' has methods for the following verbs: post, get */
  (path: "/aliases"): IndexesAliasesCreate;
  /** Resource for '/aliases('\{aliasName\}')' has methods for the following verbs: put, delete, get */
  (
    path: "/aliases('{aliasName}')",
    aliasName: string,
  ): IndexesAliasesCreateOrUpdate;
}

export type DocumentsClient = Client & {
  path: Routes;
};
