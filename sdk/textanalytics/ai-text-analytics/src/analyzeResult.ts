// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ExtractKeyPhrasesSuccessResult } from "./extractKeyPhrasesResult";
import { TextDocumentBatchStatistics } from "./generated/models";
import { RecognizeCategorizedEntitiesSuccessResult } from "./recognizeCategorizedEntitiesResult";
import { RecognizePiiEntitiesSuccessResult } from "./recognizePiiEntitiesResult";
import { TextAnalyticsErrorResult } from "./textAnalyticsResult";

/**
 * The results of a successful analyze entities job on a single document.
 */
export interface AnalyzeEntitiesResult extends RecognizeCategorizedEntitiesSuccessResult {
  type: "Entities";
}

export interface AnalyzePiiEntitiesResult extends RecognizePiiEntitiesSuccessResult {
  type: "PiiEntities";
}

export interface AnalyzeKeyPhrasesResult extends ExtractKeyPhrasesSuccessResult {
  type: "KeyPhrases";
}

/**
 * An error result from the analyze operation on a single document.
 */
export interface AnalyzeErrorResult extends TextAnalyticsErrorResult {
  type: "Error";
}

/**
 * The results of a successful analyze job for a single document.
 */
export type AnalyzeResult =
  | AnalyzeEntitiesResult
  | AnalyzePiiEntitiesResult
  | AnalyzeKeyPhrasesResult
  | AnalyzeErrorResult;

/**
 * Array of {@link AnalyzeResult}
 */
export interface AnalyzeResultsArray extends Array<AnalyzeResult> {}

/**
 * The results of an analyze job represented as a paginated iterator that can
 * either iterate over the results on a document-by-document basis or, by
 * byPage(), can iterate over pages of documents.
 */
export type PagedAsyncIterableAnalyzeResults = PagedAsyncIterableIterator<
  AnalyzeResult,
  AnalyzeResultsArray
>;

/**
 * The results of an analyze job represented as a paginated iterator that can
 * either iterate over the results on a document-by-document basis or, by
 * byPage(), can iterate over pages of documents.
 */
export interface PaginatedAnalyzeResults extends PagedAsyncIterableAnalyzeResults {
  /**
   * Statistics about the input document batch and how it was processed
   * by the service. This property will have a value when includeStatistics is set to true
   * in the client call.
   */
  statistics?: TextDocumentBatchStatistics;
}
