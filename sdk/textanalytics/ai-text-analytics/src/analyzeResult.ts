// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ExtractKeyPhrasesResultArray } from "./extractKeyPhrasesResultArray";
import { TextDocumentBatchStatistics } from "./generated/models";
import { RecognizeCategorizedEntitiesResultArray } from "./recognizeCategorizedEntitiesResultArray";
import { RecognizePiiEntitiesResultArray } from "./recognizePiiEntitiesResultArray";

/**
 * The results of a successful analyze job.
 */
export interface AnalyzeResult {
  /**
   * Array of the results for each categorized entities recognition task.
   */
  entitiesRecognitionResults?: RecognizeCategorizedEntitiesResultArray[];
  /**
   * Array of the results for each Pii entities recognition task.
   */
  piiEntitiesRecognitionResults?: RecognizePiiEntitiesResultArray[];
  /**
   * Array of the results for each key phrases extraction task.
   */
  keyPhrasesExtractionResults?: ExtractKeyPhrasesResultArray[];
}

/**
 * The results of an analyze job represented as a paginated iterator that
 * iterates over the results of the requested tasks.
 */
export type PagedAsyncIterableAnalyzeResults = PagedAsyncIterableIterator<
  AnalyzeResult,
  AnalyzeResult
>;

/**
 * The results of an analyze job represented as a paginated iterator that
 * iterates over the results of the requested tasks.
 */
export interface PaginatedAnalyzeResults extends PagedAsyncIterableAnalyzeResults {
  /**
   * Statistics about the input document batch and how it was processed
   * by the service. This property will have a value when includeStatistics is set to true
   * in the client call.
   */
  statistics?: TextDocumentBatchStatistics;
}
