// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ExtractKeyPhrasesResultArray } from "./extractKeyPhrasesResultArray";
import { TextDocumentBatchStatistics } from "./generated/models";
import { RecognizeCategorizedEntitiesResultArray } from "./recognizeCategorizedEntitiesResultArray";
import { RecognizePiiEntitiesResultArray } from "./recognizePiiEntitiesResultArray";

/**
 * The results of a successful analyze batch actions operation.
 */
export interface AnalyzeBatchActionsResult {
  /**
   * Array of the results for each categorized entities recognition action.
   */
  entitiesRecognitionResults: RecognizeCategorizedEntitiesResultArray[];
  /**
   * Array of the results for each Pii entities recognition action.
   */
  piiEntitiesRecognitionResults: RecognizePiiEntitiesResultArray[];
  /**
   * Array of the results for each key phrases extraction action.
   */
  keyPhrasesExtractionResults: ExtractKeyPhrasesResultArray[];
}

/**
 * The results of an analyze batch actions operation represented as a paged iterator that
 * iterates over the results of the requested actions.
 */
export type PagedAsyncIterableAnalyzeBatchActionsResult = PagedAsyncIterableIterator<
  AnalyzeBatchActionsResult,
  AnalyzeBatchActionsResult
>;

/**
 * The results of an analyze batch actions operation represented as a paged iterator that
 * iterates over the results of the requested actions.
 */
export interface PagedAnalyzeBatchActionsResult
  extends PagedAsyncIterableAnalyzeBatchActionsResult {
  /**
   * Statistics about the input document batch and how it was processed
   * by the service. This property will have a value when includeStatistics is set to true
   * in the client call.
   */
  statistics?: TextDocumentBatchStatistics;
}
