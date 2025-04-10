// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

const responseMap: Record<string, string[]> = {
  "GET /servicestats": ["200"],
  "GET /indexstats": ["200"],
  "GET /indexes('{indexName}')/docs/$count": ["200"],
  "GET /indexes('{indexName}')/docs": ["200"],
  "POST /indexes('{indexName}')/docs/search.post.search": ["200"],
  "GET /indexes('{indexName}')/docs('{key}')": ["200"],
  "GET /indexes('{indexName}')/docs/search.suggest": ["200"],
  "POST /indexes('{indexName}')/docs/search.post.suggest": ["200"],
  "POST /indexes('{indexName}')/docs/search.index": ["200", "207"],
  "GET /indexes('{indexName}')/docs/search.autocomplete": ["200"],
  "POST /indexes('{indexName}')/docs/search.post.autocomplete": ["200"],
  "PUT /datasources('{dataSourceName}')": ["200", "201"],
  "DELETE /datasources('{dataSourceName}')": ["204", "404"],
  "GET /datasources('{dataSourceName}')": ["200"],
  "GET /datasources": ["200"],
  "POST /datasources": ["201"],
  "POST /indexers('{indexerName}')/search.reset": ["204"],
  "POST /indexers('{indexerName}')/search.resetdocs": ["204"],
  "POST /indexers('{indexerName}')/search.run": ["202"],
  "PUT /indexers('{indexerName}')": ["200", "201"],
  "DELETE /indexers('{indexerName}')": ["204", "404"],
  "GET /indexers('{indexerName}')": ["200"],
  "GET /indexers": ["200"],
  "POST /indexers": ["201"],
  "GET /indexers('{indexerName}')/search.status": ["200"],
  "PUT /skillsets('{skillsetName}')": ["200", "201"],
  "DELETE /skillsets('{skillsetName}')": ["204", "404"],
  "GET /skillsets('{skillsetName}')": ["200"],
  "GET /skillsets": ["200"],
  "POST /skillsets": ["201"],
  "POST /skillsets('{skillsetName}')/search.resetskills": ["204"],
  "PUT /synonymmaps('{synonymMapName}')": ["200", "201"],
  "DELETE /synonymmaps('{synonymMapName}')": ["204", "404"],
  "GET /synonymmaps('{synonymMapName}')": ["200"],
  "GET /synonymmaps": ["200"],
  "POST /synonymmaps": ["201"],
  "POST /indexes": ["201"],
  "GET /indexes": ["200"],
  "PUT /indexes('{indexName}')": ["200", "201"],
  "DELETE /indexes('{indexName}')": ["204", "404"],
  "GET /indexes('{indexName}')": ["200"],
  "GET /indexes('{indexName}')/search.stats": ["200"],
  "POST /indexes('{indexName}')/search.analyze": ["200"],
  "POST /aliases": ["201"],
  "GET /aliases": ["200"],
  "PUT /aliases('{aliasName}')": ["200", "201"],
  "DELETE /aliases('{aliasName}')": ["204", "404"],
  "GET /aliases('{aliasName}')": ["200"],
};

export function isUnexpected(
  response: IndexesGetServiceStatistics200Response | IndexesGetServiceStatisticsDefaultResponse,
): response is IndexesGetServiceStatisticsDefaultResponse;
export function isUnexpected(
  response: IndexesGetIndexStatsSummary200Response | IndexesGetIndexStatsSummaryDefaultResponse,
): response is IndexesGetIndexStatsSummaryDefaultResponse;
export function isUnexpected(
  response: DocumentsCount200Response | DocumentsCountDefaultResponse,
): response is DocumentsCountDefaultResponse;
export function isUnexpected(
  response: DocumentsSearchGet200Response | DocumentsSearchGetDefaultResponse,
): response is DocumentsSearchGetDefaultResponse;
export function isUnexpected(
  response: DocumentsSearchPost200Response | DocumentsSearchPostDefaultResponse,
): response is DocumentsSearchPostDefaultResponse;
export function isUnexpected(
  response: DocumentsGet200Response | DocumentsGetDefaultResponse,
): response is DocumentsGetDefaultResponse;
export function isUnexpected(
  response: DocumentsSuggestGet200Response | DocumentsSuggestGetDefaultResponse,
): response is DocumentsSuggestGetDefaultResponse;
export function isUnexpected(
  response: DocumentsSuggestPost200Response | DocumentsSuggestPostDefaultResponse,
): response is DocumentsSuggestPostDefaultResponse;
export function isUnexpected(
  response: DocumentsIndex200Response | DocumentsIndex207Response | DocumentsIndexDefaultResponse,
): response is DocumentsIndexDefaultResponse;
export function isUnexpected(
  response: DocumentsAutocompleteGet200Response | DocumentsAutocompleteGetDefaultResponse,
): response is DocumentsAutocompleteGetDefaultResponse;
export function isUnexpected(
  response: DocumentsAutocompletePost200Response | DocumentsAutocompletePostDefaultResponse,
): response is DocumentsAutocompletePostDefaultResponse;
export function isUnexpected(
  response:
    | IndexesDataSourcesCreateOrUpdate200Response
    | IndexesDataSourcesCreateOrUpdate201Response
    | IndexesDataSourcesCreateOrUpdateDefaultResponse,
): response is IndexesDataSourcesCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | IndexesDataSourcesDelete204Response
    | IndexesDataSourcesDelete404Response
    | IndexesDataSourcesDeleteDefaultResponse,
): response is IndexesDataSourcesDeleteDefaultResponse;
export function isUnexpected(
  response: IndexesDataSourcesGet200Response | IndexesDataSourcesGetDefaultResponse,
): response is IndexesDataSourcesGetDefaultResponse;
export function isUnexpected(
  response: IndexesDataSourcesList200Response | IndexesDataSourcesListDefaultResponse,
): response is IndexesDataSourcesListDefaultResponse;
export function isUnexpected(
  response: IndexesDataSourcesCreate201Response | IndexesDataSourcesCreateDefaultResponse,
): response is IndexesDataSourcesCreateDefaultResponse;
export function isUnexpected(
  response: IndexesIndexersReset204Response | IndexesIndexersResetDefaultResponse,
): response is IndexesIndexersResetDefaultResponse;
export function isUnexpected(
  response: IndexesIndexersResetDocs204Response | IndexesIndexersResetDocsDefaultResponse,
): response is IndexesIndexersResetDocsDefaultResponse;
export function isUnexpected(
  response: IndexesIndexersRun202Response | IndexesIndexersRunDefaultResponse,
): response is IndexesIndexersRunDefaultResponse;
export function isUnexpected(
  response:
    | IndexesIndexersCreateOrUpdate200Response
    | IndexesIndexersCreateOrUpdate201Response
    | IndexesIndexersCreateOrUpdateDefaultResponse,
): response is IndexesIndexersCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | IndexesIndexersDelete204Response
    | IndexesIndexersDelete404Response
    | IndexesIndexersDeleteDefaultResponse,
): response is IndexesIndexersDeleteDefaultResponse;
export function isUnexpected(
  response: IndexesIndexersGet200Response | IndexesIndexersGetDefaultResponse,
): response is IndexesIndexersGetDefaultResponse;
export function isUnexpected(
  response: IndexesIndexersList200Response | IndexesIndexersListDefaultResponse,
): response is IndexesIndexersListDefaultResponse;
export function isUnexpected(
  response: IndexesIndexersCreate201Response | IndexesIndexersCreateDefaultResponse,
): response is IndexesIndexersCreateDefaultResponse;
export function isUnexpected(
  response: IndexesIndexersGetStatus200Response | IndexesIndexersGetStatusDefaultResponse,
): response is IndexesIndexersGetStatusDefaultResponse;
export function isUnexpected(
  response:
    | IndexesSkillsetsCreateOrUpdate200Response
    | IndexesSkillsetsCreateOrUpdate201Response
    | IndexesSkillsetsCreateOrUpdateDefaultResponse,
): response is IndexesSkillsetsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | IndexesSkillsetsDelete204Response
    | IndexesSkillsetsDelete404Response
    | IndexesSkillsetsDeleteDefaultResponse,
): response is IndexesSkillsetsDeleteDefaultResponse;
export function isUnexpected(
  response: IndexesSkillsetsGet200Response | IndexesSkillsetsGetDefaultResponse,
): response is IndexesSkillsetsGetDefaultResponse;
export function isUnexpected(
  response: IndexesSkillsetsList200Response | IndexesSkillsetsListDefaultResponse,
): response is IndexesSkillsetsListDefaultResponse;
export function isUnexpected(
  response: IndexesSkillsetsCreate201Response | IndexesSkillsetsCreateDefaultResponse,
): response is IndexesSkillsetsCreateDefaultResponse;
export function isUnexpected(
  response: IndexesSkillsetsResetSkills204Response | IndexesSkillsetsResetSkillsDefaultResponse,
): response is IndexesSkillsetsResetSkillsDefaultResponse;
export function isUnexpected(
  response:
    | IndexesSynonymMapsCreateOrUpdate200Response
    | IndexesSynonymMapsCreateOrUpdate201Response
    | IndexesSynonymMapsCreateOrUpdateDefaultResponse,
): response is IndexesSynonymMapsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | IndexesSynonymMapsDelete204Response
    | IndexesSynonymMapsDelete404Response
    | IndexesSynonymMapsDeleteDefaultResponse,
): response is IndexesSynonymMapsDeleteDefaultResponse;
export function isUnexpected(
  response: IndexesSynonymMapsGet200Response | IndexesSynonymMapsGetDefaultResponse,
): response is IndexesSynonymMapsGetDefaultResponse;
export function isUnexpected(
  response: IndexesSynonymMapsList200Response | IndexesSynonymMapsListDefaultResponse,
): response is IndexesSynonymMapsListDefaultResponse;
export function isUnexpected(
  response: IndexesSynonymMapsCreate201Response | IndexesSynonymMapsCreateDefaultResponse,
): response is IndexesSynonymMapsCreateDefaultResponse;
export function isUnexpected(
  response: IndexesIndexesCreate201Response | IndexesIndexesCreateDefaultResponse,
): response is IndexesIndexesCreateDefaultResponse;
export function isUnexpected(
  response: IndexesIndexesList200Response | IndexesIndexesListDefaultResponse,
): response is IndexesIndexesListDefaultResponse;
export function isUnexpected(
  response:
    | IndexesIndexesCreateOrUpdate200Response
    | IndexesIndexesCreateOrUpdate201Response
    | IndexesIndexesCreateOrUpdateDefaultResponse,
): response is IndexesIndexesCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | IndexesIndexesDelete204Response
    | IndexesIndexesDelete404Response
    | IndexesIndexesDeleteDefaultResponse,
): response is IndexesIndexesDeleteDefaultResponse;
export function isUnexpected(
  response: IndexesIndexesGet200Response | IndexesIndexesGetDefaultResponse,
): response is IndexesIndexesGetDefaultResponse;
export function isUnexpected(
  response: IndexesIndexesGetStatistics200Response | IndexesIndexesGetStatisticsDefaultResponse,
): response is IndexesIndexesGetStatisticsDefaultResponse;
export function isUnexpected(
  response: IndexesIndexesAnalyze200Response | IndexesIndexesAnalyzeDefaultResponse,
): response is IndexesIndexesAnalyzeDefaultResponse;
export function isUnexpected(
  response: IndexesAliasesCreate201Response | IndexesAliasesCreateDefaultResponse,
): response is IndexesAliasesCreateDefaultResponse;
export function isUnexpected(
  response: IndexesAliasesList200Response | IndexesAliasesListDefaultResponse,
): response is IndexesAliasesListDefaultResponse;
export function isUnexpected(
  response:
    | IndexesAliasesCreateOrUpdate200Response
    | IndexesAliasesCreateOrUpdate201Response
    | IndexesAliasesCreateOrUpdateDefaultResponse,
): response is IndexesAliasesCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | IndexesAliasesDelete204Response
    | IndexesAliasesDelete404Response
    | IndexesAliasesDeleteDefaultResponse,
): response is IndexesAliasesDeleteDefaultResponse;
export function isUnexpected(
  response: IndexesAliasesGet200Response | IndexesAliasesGetDefaultResponse,
): response is IndexesAliasesGetDefaultResponse;
export function isUnexpected(
  response:
    | IndexesGetServiceStatistics200Response
    | IndexesGetServiceStatisticsDefaultResponse
    | IndexesGetIndexStatsSummary200Response
    | IndexesGetIndexStatsSummaryDefaultResponse
    | DocumentsCount200Response
    | DocumentsCountDefaultResponse
    | DocumentsSearchGet200Response
    | DocumentsSearchGetDefaultResponse
    | DocumentsSearchPost200Response
    | DocumentsSearchPostDefaultResponse
    | DocumentsGet200Response
    | DocumentsGetDefaultResponse
    | DocumentsSuggestGet200Response
    | DocumentsSuggestGetDefaultResponse
    | DocumentsSuggestPost200Response
    | DocumentsSuggestPostDefaultResponse
    | DocumentsIndex200Response
    | DocumentsIndex207Response
    | DocumentsIndexDefaultResponse
    | DocumentsAutocompleteGet200Response
    | DocumentsAutocompleteGetDefaultResponse
    | DocumentsAutocompletePost200Response
    | DocumentsAutocompletePostDefaultResponse
    | IndexesDataSourcesCreateOrUpdate200Response
    | IndexesDataSourcesCreateOrUpdate201Response
    | IndexesDataSourcesCreateOrUpdateDefaultResponse
    | IndexesDataSourcesDelete204Response
    | IndexesDataSourcesDelete404Response
    | IndexesDataSourcesDeleteDefaultResponse
    | IndexesDataSourcesGet200Response
    | IndexesDataSourcesGetDefaultResponse
    | IndexesDataSourcesList200Response
    | IndexesDataSourcesListDefaultResponse
    | IndexesDataSourcesCreate201Response
    | IndexesDataSourcesCreateDefaultResponse
    | IndexesIndexersReset204Response
    | IndexesIndexersResetDefaultResponse
    | IndexesIndexersResetDocs204Response
    | IndexesIndexersResetDocsDefaultResponse
    | IndexesIndexersRun202Response
    | IndexesIndexersRunDefaultResponse
    | IndexesIndexersCreateOrUpdate200Response
    | IndexesIndexersCreateOrUpdate201Response
    | IndexesIndexersCreateOrUpdateDefaultResponse
    | IndexesIndexersDelete204Response
    | IndexesIndexersDelete404Response
    | IndexesIndexersDeleteDefaultResponse
    | IndexesIndexersGet200Response
    | IndexesIndexersGetDefaultResponse
    | IndexesIndexersList200Response
    | IndexesIndexersListDefaultResponse
    | IndexesIndexersCreate201Response
    | IndexesIndexersCreateDefaultResponse
    | IndexesIndexersGetStatus200Response
    | IndexesIndexersGetStatusDefaultResponse
    | IndexesSkillsetsCreateOrUpdate200Response
    | IndexesSkillsetsCreateOrUpdate201Response
    | IndexesSkillsetsCreateOrUpdateDefaultResponse
    | IndexesSkillsetsDelete204Response
    | IndexesSkillsetsDelete404Response
    | IndexesSkillsetsDeleteDefaultResponse
    | IndexesSkillsetsGet200Response
    | IndexesSkillsetsGetDefaultResponse
    | IndexesSkillsetsList200Response
    | IndexesSkillsetsListDefaultResponse
    | IndexesSkillsetsCreate201Response
    | IndexesSkillsetsCreateDefaultResponse
    | IndexesSkillsetsResetSkills204Response
    | IndexesSkillsetsResetSkillsDefaultResponse
    | IndexesSynonymMapsCreateOrUpdate200Response
    | IndexesSynonymMapsCreateOrUpdate201Response
    | IndexesSynonymMapsCreateOrUpdateDefaultResponse
    | IndexesSynonymMapsDelete204Response
    | IndexesSynonymMapsDelete404Response
    | IndexesSynonymMapsDeleteDefaultResponse
    | IndexesSynonymMapsGet200Response
    | IndexesSynonymMapsGetDefaultResponse
    | IndexesSynonymMapsList200Response
    | IndexesSynonymMapsListDefaultResponse
    | IndexesSynonymMapsCreate201Response
    | IndexesSynonymMapsCreateDefaultResponse
    | IndexesIndexesCreate201Response
    | IndexesIndexesCreateDefaultResponse
    | IndexesIndexesList200Response
    | IndexesIndexesListDefaultResponse
    | IndexesIndexesCreateOrUpdate200Response
    | IndexesIndexesCreateOrUpdate201Response
    | IndexesIndexesCreateOrUpdateDefaultResponse
    | IndexesIndexesDelete204Response
    | IndexesIndexesDelete404Response
    | IndexesIndexesDeleteDefaultResponse
    | IndexesIndexesGet200Response
    | IndexesIndexesGetDefaultResponse
    | IndexesIndexesGetStatistics200Response
    | IndexesIndexesGetStatisticsDefaultResponse
    | IndexesIndexesAnalyze200Response
    | IndexesIndexesAnalyzeDefaultResponse
    | IndexesAliasesCreate201Response
    | IndexesAliasesCreateDefaultResponse
    | IndexesAliasesList200Response
    | IndexesAliasesListDefaultResponse
    | IndexesAliasesCreateOrUpdate200Response
    | IndexesAliasesCreateOrUpdate201Response
    | IndexesAliasesCreateOrUpdateDefaultResponse
    | IndexesAliasesDelete204Response
    | IndexesAliasesDelete404Response
    | IndexesAliasesDeleteDefaultResponse
    | IndexesAliasesGet200Response
    | IndexesAliasesGetDefaultResponse,
): response is
  | IndexesGetServiceStatisticsDefaultResponse
  | IndexesGetIndexStatsSummaryDefaultResponse
  | DocumentsCountDefaultResponse
  | DocumentsSearchGetDefaultResponse
  | DocumentsSearchPostDefaultResponse
  | DocumentsGetDefaultResponse
  | DocumentsSuggestGetDefaultResponse
  | DocumentsSuggestPostDefaultResponse
  | DocumentsIndexDefaultResponse
  | DocumentsAutocompleteGetDefaultResponse
  | DocumentsAutocompletePostDefaultResponse
  | IndexesDataSourcesCreateOrUpdateDefaultResponse
  | IndexesDataSourcesDeleteDefaultResponse
  | IndexesDataSourcesGetDefaultResponse
  | IndexesDataSourcesListDefaultResponse
  | IndexesDataSourcesCreateDefaultResponse
  | IndexesIndexersResetDefaultResponse
  | IndexesIndexersResetDocsDefaultResponse
  | IndexesIndexersRunDefaultResponse
  | IndexesIndexersCreateOrUpdateDefaultResponse
  | IndexesIndexersDeleteDefaultResponse
  | IndexesIndexersGetDefaultResponse
  | IndexesIndexersListDefaultResponse
  | IndexesIndexersCreateDefaultResponse
  | IndexesIndexersGetStatusDefaultResponse
  | IndexesSkillsetsCreateOrUpdateDefaultResponse
  | IndexesSkillsetsDeleteDefaultResponse
  | IndexesSkillsetsGetDefaultResponse
  | IndexesSkillsetsListDefaultResponse
  | IndexesSkillsetsCreateDefaultResponse
  | IndexesSkillsetsResetSkillsDefaultResponse
  | IndexesSynonymMapsCreateOrUpdateDefaultResponse
  | IndexesSynonymMapsDeleteDefaultResponse
  | IndexesSynonymMapsGetDefaultResponse
  | IndexesSynonymMapsListDefaultResponse
  | IndexesSynonymMapsCreateDefaultResponse
  | IndexesIndexesCreateDefaultResponse
  | IndexesIndexesListDefaultResponse
  | IndexesIndexesCreateOrUpdateDefaultResponse
  | IndexesIndexesDeleteDefaultResponse
  | IndexesIndexesGetDefaultResponse
  | IndexesIndexesGetStatisticsDefaultResponse
  | IndexesIndexesAnalyzeDefaultResponse
  | IndexesAliasesCreateDefaultResponse
  | IndexesAliasesListDefaultResponse
  | IndexesAliasesCreateOrUpdateDefaultResponse
  | IndexesAliasesDeleteDefaultResponse
  | IndexesAliasesGetDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = getParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function getParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: string[] = [];

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // track if we have found a match to return the values found.
    let found = true;
    for (let i = candidateParts.length - 1, j = pathParts.length - 1; i >= 1 && j >= 1; i--, j--) {
      if (candidateParts[i]?.startsWith("{") && candidateParts[i]?.indexOf("}") !== -1) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(`${candidateParts[i]?.slice(start, end)}`).test(
          pathParts[j] || "",
        );

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
