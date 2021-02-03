// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  ExtractKeyPhrasesResultArray,
  makeExtractKeyPhrasesResultArray
} from "./extractKeyPhrasesResultArray";
import {
  AnalyzeJobState as GeneratedResponse,
  TasksStateTasksEntityRecognitionPiiTasksItem,
  TasksStateTasksEntityRecognitionTasksItem,
  TasksStateTasksKeyPhraseExtractionTasksItem,
  TextDocumentBatchStatistics,
  TextDocumentInput
} from "./generated/models";
import {
  makeRecognizeCategorizedEntitiesResultArray,
  RecognizeCategorizedEntitiesResultArray
} from "./recognizeCategorizedEntitiesResultArray";
import {
  makeRecognizePiiEntitiesResultArray,
  RecognizePiiEntitiesResultArray
} from "./recognizePiiEntitiesResultArray";
import { intoTextAnalyticsError, TextAnalyticsError } from "./textAnalyticsResult";

/**
 * The results of a successful analyze batch actions operation.
 */
export interface AnalyzeBatchActionsResult {
  /**
   * Array of the results for each categorized entities recognition action.
   */
  recognizeEntitiesResults: RecognizeCategorizedEntitiesActionResult[];
  /**
   * Array of the results for each Pii entities recognition action.
   */
  recognizePiiEntitiesResults: RecognizePiiEntitiesActionResult[];
  /**
   * Array of the results for each key phrases extraction action.
   */
  extractKeyPhrasesResults: ExtractKeyPhrasesActionResult[];
}

/**
 * The state of a successful action.
 */
export interface TextAnalyticsActionSuccessState {
  /**
   * When was the last time this action was updated by the service.
   */
  readonly lastUpdatedOn: Date;
  /**
   * Discriminant to determine if that this is an error result.
   */
  readonly error?: undefined;
}

/**
 * The error of an analyze batch action.
 */
export interface TextAnalyticsActionErrorResult {
  /**
   * The Error for this document result.
   */
  readonly error: TextAnalyticsError;
}

/**
 * The error of a recognize categorized entities action.
 */
export type RecognizeCategorizedEntitiesActionErrorResult = TextAnalyticsActionErrorResult;

/**
 * The results of a successful recognize categorized entities action.
 */
export interface RecognizeCategorizedEntitiesActionSuccessResult
  extends TextAnalyticsActionSuccessState {
  /**
   * Array of the results for each categorized entities recognition action.
   */
  results: RecognizeCategorizedEntitiesResultArray;
}

/**
 * The result of a recognize categorized entities action.
 */
export type RecognizeCategorizedEntitiesActionResult =
  | RecognizeCategorizedEntitiesActionSuccessResult
  | RecognizeCategorizedEntitiesActionErrorResult;

/**
 * The error of a recognize pii entities action.
 */
export type RecognizePiiEntitiesActionErrorResult = TextAnalyticsActionErrorResult;

/**
 * The results of a successful recognize pii entities action.
 */
export interface RecognizePiiEntitiesActionSuccessResult extends TextAnalyticsActionSuccessState {
  /**
   * Array of the results for each pii entities recognition action.
   */
  results: RecognizePiiEntitiesResultArray;
}

/**
 * The result of a recognize pii entities action.
 */
export type RecognizePiiEntitiesActionResult =
  | RecognizePiiEntitiesActionSuccessResult
  | RecognizePiiEntitiesActionErrorResult;

/**
 * The error of a extract key phrases action.
 */
export type ExtractKeyPhrasesActionErrorResult = TextAnalyticsActionErrorResult;

/**
 * The results of a successful extract key phrases action.
 */
export interface ExtractKeyPhrasesActionSuccessResult extends TextAnalyticsActionSuccessState {
  /**
   * Array of the results for each extract key phrases action.
   */
  results: ExtractKeyPhrasesResultArray;
}

/**
 * The result of a extract key phrases action.
 */
export type ExtractKeyPhrasesActionResult =
  | ExtractKeyPhrasesActionSuccessResult
  | ExtractKeyPhrasesActionErrorResult;

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

export class ActionsResultBuilder {
  private readonly documents: TextDocumentInput[];
  private readonly errors: TextAnalyticsError[];
  private readonly recognizeEntitiesActionsResults: TasksStateTasksEntityRecognitionTasksItem[];
  private readonly recognizePiiEntitiesActionsResults: TasksStateTasksEntityRecognitionPiiTasksItem[];
  private readonly extractKeyPhrasesActionsResults: TasksStateTasksKeyPhraseExtractionTasksItem[];
  constructor(response: GeneratedResponse, documents: TextDocumentInput[]) {
    this.errors = response?.errors ?? [];
    this.recognizeEntitiesActionsResults = response.tasks.entityRecognitionTasks ?? [];
    this.recognizePiiEntitiesActionsResults = response.tasks.entityRecognitionPiiTasks ?? [];
    this.extractKeyPhrasesActionsResults = response.tasks.keyPhraseExtractionTasks ?? [];
    this.documents = documents;
  }

  private *getAnError() {
    yield* this.errors;
  }

  public makeRecognizeCategorizedEntitiesActionResult(): RecognizeCategorizedEntitiesActionResult[] {
    return this.recognizeEntitiesActionsResults.map(
      ({
        results: actionResults,
        lastUpdateDateTime
      }): RecognizeCategorizedEntitiesActionResult => {
        // this indicates that the action failed
        if (actionResults.documents.length === 0 && actionResults.modelVersion === "") {
          const error = this.getAnError().next().value;
          if (error != undefined) {
            return {
              error: intoTextAnalyticsError(error)
            };
          } else {
            throw new Error(
              "Expected the service to have an error for this action but did not find any"
            );
          }
        } else {
          const recognizeEntitiesResults = makeRecognizeCategorizedEntitiesResultArray(
            this.documents,
            actionResults?.documents,
            actionResults?.errors,
            actionResults?.modelVersion,
            actionResults?.statistics
          );
          return { results: recognizeEntitiesResults, lastUpdatedOn: lastUpdateDateTime };
        }
      }
    );
  }

  public makeRecognizePiiEntitiesActionResult(): RecognizePiiEntitiesActionResult[] {
    return this.recognizePiiEntitiesActionsResults.map(
      ({ results: actionResults, lastUpdateDateTime }): RecognizePiiEntitiesActionResult => {
        // this indicates that the action failed
        if (actionResults.documents.length === 0 && actionResults.modelVersion === "") {
          const error = this.getAnError().next().value;
          if (error != undefined) {
            return {
              error: intoTextAnalyticsError(error)
            };
          } else {
            throw new Error(
              "Expected the service to have an error for this action but did not find any"
            );
          }
        } else {
          const recognizePiiEntitiesResults = makeRecognizePiiEntitiesResultArray(
            this.documents,
            actionResults
          );
          return { results: recognizePiiEntitiesResults, lastUpdatedOn: lastUpdateDateTime };
        }
      }
    );
  }

  public makeExtractKeyPhrasesActionResult(): ExtractKeyPhrasesActionResult[] {
    return this.extractKeyPhrasesActionsResults.map(
      ({ results: actionResults, lastUpdateDateTime }): ExtractKeyPhrasesActionResult => {
        // this indicates that the action failed
        if (actionResults.documents.length === 0 && actionResults.modelVersion === "") {
          const error = this.getAnError().next().value;
          if (error != undefined) {
            return {
              error: intoTextAnalyticsError(error)
            };
          } else {
            throw new Error(
              "Expected the service to have an error for this action but did not find any"
            );
          }
        } else {
          const extractKeyPhrasesResults = makeExtractKeyPhrasesResultArray(
            this.documents,
            actionResults?.documents,
            actionResults?.errors,
            actionResults?.modelVersion,
            actionResults?.statistics
          );
          return { results: extractKeyPhrasesResults, lastUpdatedOn: lastUpdateDateTime };
        }
      }
    );
  }
}
