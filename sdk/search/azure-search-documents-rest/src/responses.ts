// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpResponse } from "@azure-rest/core-client";
import type {
  SearchServiceStatisticsOutput,
  ErrorResponseOutput,
  ListIndexStatsSummaryOutput,
  SearchDocumentsResultOutput,
  LookupDocumentOutput,
  SuggestDocumentsResultOutput,
  IndexDocumentsResultOutput,
  AutocompleteResultOutput,
  SearchIndexerDataSourceOutput,
  ListDataSourcesResultOutput,
  SearchIndexerOutput,
  ListIndexersResultOutput,
  SearchIndexerStatusOutput,
  SearchIndexerSkillsetOutput,
  ListSkillsetsResultOutput,
  SynonymMapOutput,
  ListSynonymMapsResultOutput,
  SearchIndexOutput,
  ListIndexesResultOutput,
  GetIndexStatisticsResultOutput,
  AnalyzeResultOutput,
  SearchAliasOutput,
  ListAliasesResultOutput,
} from "./outputModels.js";

/** The request has succeeded. */
export interface IndexesGetServiceStatistics200Response extends HttpResponse {
  status: "200";
  body: SearchServiceStatisticsOutput;
}

export interface IndexesGetServiceStatisticsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface IndexesGetIndexStatsSummary200Response extends HttpResponse {
  status: "200";
  body: ListIndexStatsSummaryOutput;
}

export interface IndexesGetIndexStatsSummaryDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DocumentsCount200Response extends HttpResponse {
  status: "200";
  body: number;
}

export interface DocumentsCountDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DocumentsSearchGet200Response extends HttpResponse {
  status: "200";
  body: SearchDocumentsResultOutput;
}

export interface DocumentsSearchGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DocumentsSearchPost200Response extends HttpResponse {
  status: "200";
  body: SearchDocumentsResultOutput;
}

export interface DocumentsSearchPostDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DocumentsGet200Response extends HttpResponse {
  status: "200";
  body: LookupDocumentOutput;
}

export interface DocumentsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DocumentsSuggestGet200Response extends HttpResponse {
  status: "200";
  body: SuggestDocumentsResultOutput;
}

export interface DocumentsSuggestGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DocumentsSuggestPost200Response extends HttpResponse {
  status: "200";
  body: SuggestDocumentsResultOutput;
}

export interface DocumentsSuggestPostDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 * Response containing the status of operations for all documents in the indexing
 * request.
 */
export interface DocumentsIndex200Response extends HttpResponse {
  status: "200";
  body: IndexDocumentsResultOutput;
}

/**
 * Response containing the status of operations for all documents in the indexing
 * request.
 */
export interface DocumentsIndex207Response extends HttpResponse {
  status: "207";
  body: IndexDocumentsResultOutput;
}

export interface DocumentsIndexDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DocumentsAutocompleteGet200Response extends HttpResponse {
  status: "200";
  body: AutocompleteResultOutput;
}

export interface DocumentsAutocompleteGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface DocumentsAutocompletePost200Response extends HttpResponse {
  status: "200";
  body: AutocompleteResultOutput;
}

export interface DocumentsAutocompletePostDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface IndexesDataSourcesCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: SearchIndexerDataSourceOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface IndexesDataSourcesCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: SearchIndexerDataSourceOutput;
}

export interface IndexesDataSourcesCreateOrUpdateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface IndexesDataSourcesDelete204Response extends HttpResponse {
  status: "204";
}

/** The server cannot find the requested resource. */
export interface IndexesDataSourcesDelete404Response extends HttpResponse {
  status: "404";
}

export interface IndexesDataSourcesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface IndexesDataSourcesGet200Response extends HttpResponse {
  status: "200";
  body: SearchIndexerDataSourceOutput;
}

export interface IndexesDataSourcesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface IndexesDataSourcesList200Response extends HttpResponse {
  status: "200";
  body: ListDataSourcesResultOutput;
}

export interface IndexesDataSourcesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface IndexesDataSourcesCreate201Response extends HttpResponse {
  status: "201";
  body: SearchIndexerDataSourceOutput;
}

export interface IndexesDataSourcesCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface IndexesIndexersReset204Response extends HttpResponse {
  status: "204";
}

export interface IndexesIndexersResetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface IndexesIndexersResetDocs204Response extends HttpResponse {
  status: "204";
}

export interface IndexesIndexersResetDocsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface IndexesIndexersRun202Response extends HttpResponse {
  status: "202";
}

export interface IndexesIndexersRunDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface IndexesIndexersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: SearchIndexerOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface IndexesIndexersCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: SearchIndexerOutput;
}

export interface IndexesIndexersCreateOrUpdateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface IndexesIndexersDelete204Response extends HttpResponse {
  status: "204";
}

/** The server cannot find the requested resource. */
export interface IndexesIndexersDelete404Response extends HttpResponse {
  status: "404";
}

export interface IndexesIndexersDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface IndexesIndexersGet200Response extends HttpResponse {
  status: "200";
  body: SearchIndexerOutput;
}

export interface IndexesIndexersGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface IndexesIndexersList200Response extends HttpResponse {
  status: "200";
  body: ListIndexersResultOutput;
}

export interface IndexesIndexersListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface IndexesIndexersCreate201Response extends HttpResponse {
  status: "201";
  body: SearchIndexerOutput;
}

export interface IndexesIndexersCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface IndexesIndexersGetStatus200Response extends HttpResponse {
  status: "200";
  body: SearchIndexerStatusOutput;
}

export interface IndexesIndexersGetStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface IndexesSkillsetsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: SearchIndexerSkillsetOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface IndexesSkillsetsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: SearchIndexerSkillsetOutput;
}

export interface IndexesSkillsetsCreateOrUpdateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface IndexesSkillsetsDelete204Response extends HttpResponse {
  status: "204";
}

/** The server cannot find the requested resource. */
export interface IndexesSkillsetsDelete404Response extends HttpResponse {
  status: "404";
}

export interface IndexesSkillsetsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface IndexesSkillsetsGet200Response extends HttpResponse {
  status: "200";
  body: SearchIndexerSkillsetOutput;
}

export interface IndexesSkillsetsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface IndexesSkillsetsList200Response extends HttpResponse {
  status: "200";
  body: ListSkillsetsResultOutput;
}

export interface IndexesSkillsetsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface IndexesSkillsetsCreate201Response extends HttpResponse {
  status: "201";
  body: SearchIndexerSkillsetOutput;
}

export interface IndexesSkillsetsCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface IndexesSkillsetsResetSkills204Response extends HttpResponse {
  status: "204";
}

export interface IndexesSkillsetsResetSkillsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface IndexesSynonymMapsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: SynonymMapOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface IndexesSynonymMapsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: SynonymMapOutput;
}

export interface IndexesSynonymMapsCreateOrUpdateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface IndexesSynonymMapsDelete204Response extends HttpResponse {
  status: "204";
}

/** The server cannot find the requested resource. */
export interface IndexesSynonymMapsDelete404Response extends HttpResponse {
  status: "404";
}

export interface IndexesSynonymMapsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface IndexesSynonymMapsGet200Response extends HttpResponse {
  status: "200";
  body: SynonymMapOutput;
}

export interface IndexesSynonymMapsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface IndexesSynonymMapsList200Response extends HttpResponse {
  status: "200";
  body: ListSynonymMapsResultOutput;
}

export interface IndexesSynonymMapsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface IndexesSynonymMapsCreate201Response extends HttpResponse {
  status: "201";
  body: SynonymMapOutput;
}

export interface IndexesSynonymMapsCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface IndexesIndexesCreate201Response extends HttpResponse {
  status: "201";
  body: SearchIndexOutput;
}

export interface IndexesIndexesCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface IndexesIndexesList200Response extends HttpResponse {
  status: "200";
  body: ListIndexesResultOutput;
}

export interface IndexesIndexesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface IndexesIndexesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: SearchIndexOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface IndexesIndexesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: SearchIndexOutput;
}

export interface IndexesIndexesCreateOrUpdateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface IndexesIndexesDelete204Response extends HttpResponse {
  status: "204";
}

/** The server cannot find the requested resource. */
export interface IndexesIndexesDelete404Response extends HttpResponse {
  status: "404";
}

export interface IndexesIndexesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface IndexesIndexesGet200Response extends HttpResponse {
  status: "200";
  body: SearchIndexOutput;
}

export interface IndexesIndexesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface IndexesIndexesGetStatistics200Response extends HttpResponse {
  status: "200";
  body: GetIndexStatisticsResultOutput;
}

export interface IndexesIndexesGetStatisticsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface IndexesIndexesAnalyze200Response extends HttpResponse {
  status: "200";
  body: AnalyzeResultOutput;
}

export interface IndexesIndexesAnalyzeDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface IndexesAliasesCreate201Response extends HttpResponse {
  status: "201";
  body: SearchAliasOutput;
}

export interface IndexesAliasesCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface IndexesAliasesList200Response extends HttpResponse {
  status: "200";
  body: ListAliasesResultOutput;
}

export interface IndexesAliasesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface IndexesAliasesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: SearchAliasOutput;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface IndexesAliasesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: SearchAliasOutput;
}

export interface IndexesAliasesCreateOrUpdateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface IndexesAliasesDelete204Response extends HttpResponse {
  status: "204";
}

/** The server cannot find the requested resource. */
export interface IndexesAliasesDelete404Response extends HttpResponse {
  status: "404";
}

export interface IndexesAliasesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface IndexesAliasesGet200Response extends HttpResponse {
  status: "200";
  body: SearchAliasOutput;
}

export interface IndexesAliasesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
