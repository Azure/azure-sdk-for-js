// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  ExtractKeyPhrasesResultArray,
  makeExtractKeyPhrasesResultArray
} from "./extractKeyPhrasesResultArray";
import {
  AnalyzeJobState as GeneratedResponse,
  TasksStateTasksEntityLinkingTasksItem,
  TasksStateTasksEntityRecognitionPiiTasksItem,
  TasksStateTasksEntityRecognitionTasksItem,
  TasksStateTasksKeyPhraseExtractionTasksItem,
  TextDocumentInput
} from "./generated/models";
import {
  makeRecognizeCategorizedEntitiesResultArray,
  RecognizeCategorizedEntitiesResultArray
} from "./recognizeCategorizedEntitiesResultArray";
import {
  makeRecognizeLinkedEntitiesResultArray,
  RecognizeLinkedEntitiesResultArray
} from "./recognizeLinkedEntitiesResultArray";
import {
  makeRecognizePiiEntitiesResultArray,
  RecognizePiiEntitiesResultArray
} from "./recognizePiiEntitiesResultArray";
import { ErrorCode, intoTextAnalyticsError, TextAnalyticsError } from "./textAnalyticsResult";

/**
 * The results of an analyze batch actions operation.
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
  /**
   * Array of the results for each linked entities recognition action.
   */
  recognizeLinkedEntitiesResults: RecognizeLinkedEntitiesActionResult[];
}

/**
 * The state of a succeeded action.
 */
export interface TextAnalyticsActionSuccessState {
  /**
   * When this action was completed by the service.
   */
  readonly completedOn: Date;
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
   * When this action was completed by the service.
   */
  readonly failedOn: Date;
  /**
   * The Error for this action result.
   */
  readonly error: TextAnalyticsError;
}

/**
 * The error of a recognize categorized entities action.
 */
export type RecognizeCategorizedEntitiesActionErrorResult = TextAnalyticsActionErrorResult;

/**
 * The results of a succeeded recognize categorized entities action.
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
 * The results of a succeeded recognize pii entities action.
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
 * The results of a succeeded extract key phrases action.
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
 * The error of a recognize linked entities action.
 */
export type RecognizeLinkedEntitiesActionErrorResult = TextAnalyticsActionErrorResult;

/**
 * The results of a succeeded recognize linked entities action.
 */
export interface RecognizeLinkedEntitiesActionSuccessResult
  extends TextAnalyticsActionSuccessState {
  /**
   * Array of the results for each linked entities recognition action.
   */
  results: RecognizeLinkedEntitiesResultArray;
}

/**
 * The result of a recognize linked entities action.
 */
export type RecognizeLinkedEntitiesActionResult =
  | RecognizeLinkedEntitiesActionSuccessResult
  | RecognizeLinkedEntitiesActionErrorResult;

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
  // /**
  //  * Statistics about the input document batch and how it was processed
  //  * by the service. This property will have a value when includeStatistics is set to true
  //  * in the client call.
  //  */
  // statistics?: TextDocumentBatchStatistics;
}

/**
 * The type of different actions supported by the begin analyze batch actions operation.
 * @internal
 */
type TextAnalyticsActionType =
  | "RecognizeCategorizedEntities"
  | "RecognizePiiEntities"
  | "ExtractKeyPhrases"
  | "RecognizeLinkedEntities";

/**
 * The type of an action error with the type of the action that erred and its
 * index in the list of input actions.
 * @internal
 */
interface TextAnalyticsActionError {
  /**
   * A code describing the kind of error produced
   */
  readonly code: ErrorCode;
  /**
   * A message from the service explaining the error
   */
  readonly message: string;
  /**
   * The type of the action that erred
   */
  readonly type: TextAnalyticsActionType;
  /**
   * The index of the action that erred in the list of input actions
   */
  readonly index: number;
}

/**
 * Converts the service task name (in the JSON pointer in an action error) to an action type name.
 * @param serviceActionType - The task type name the service uses.
 * @returns the action type name that the package uses
 * @internal
 */
function convertTaskTypeToActionType(taskType: string): TextAnalyticsActionType {
  switch (taskType) {
    case "entityRecognitionTasks": {
      return "RecognizeCategorizedEntities";
    }
    case "entityRecognitionPiiTasks": {
      return "RecognizePiiEntities";
    }
    case "keyPhraseExtractionTasks": {
      return "ExtractKeyPhrases";
    }
    default: {
      throw new Error(`unexpected action type from the service: ${taskType}`);
    }
  }
}

/**
 * Converts a service action error to one with the JSON pointer converted to an action index.
 * @param erredActions - the action error the service sent
 * @returns an action error with an action type and index
 * @internal
 */
export function parseActionError(erredActions: TextAnalyticsError): TextAnalyticsActionError {
  if (erredActions.target) {
    const regex = new RegExp(
      /#\/tasks\/(entityRecognitionTasks|entityRecognitionPiiTasks|keyPhraseExtractionTasks|entityLinkingTasks)\/(\d+)/
    );
    const result = regex.exec(erredActions.target);
    if (result !== null) {
      return {
        code: erredActions.code,
        message: erredActions.message,
        index: parseInt(result[2]),
        type: convertTaskTypeToActionType(result[1])
      };
    } else {
      throw new Error(`Pointer "${erredActions.target}" is not a valid action pointer`);
    }
  } else {
    throw new Error(
      "expected an error with a target field referencing an action but did not get one"
    );
  }
}

/**
 * Categorize each action error into a bucket according to its action type.
 * @param erredActions - list of action errors
 * @param recognizeEntitiesActionErrors - a list of recognize entities action errors to be filled from the errors list
 * @param recognizePiiEntitiesActionErrors - a list of recognize pii entities action errors to be filled from the errors list
 * @param extractKeyPhrasesActionErrors - a list of extract key phrases action errors to be filled from the errors list
 * @internal
 */
function categorizeActionErrors(
  erredActions: TextAnalyticsError[],
  recognizeEntitiesActionErrors: TextAnalyticsActionError[],
  recognizePiiEntitiesActionErrors: TextAnalyticsActionError[],
  extractKeyPhrasesActionErrors: TextAnalyticsActionError[],
  recognizeLinkedEntitiesActionErrors: TextAnalyticsActionError[]
): void {
  for (const error of erredActions) {
    const actionError = parseActionError(error);
    switch (actionError.type) {
      case "RecognizeCategorizedEntities": {
        recognizeEntitiesActionErrors.push(actionError);
        break;
      }
      case "RecognizePiiEntities": {
        recognizePiiEntitiesActionErrors.push(actionError);
        break;
      }
      case "ExtractKeyPhrases": {
        extractKeyPhrasesActionErrors.push(actionError);
        break;
      }
      case "RecognizeLinkedEntities": {
        recognizeLinkedEntitiesActionErrors.push(actionError);
        break;
      }
    }
  }
}

/**
 * @internal
 * @param error - the error the service sent for a task
 * @param lastUpdateDateTime - the time when this task failed
 */
function createErredAction(
  error: TextAnalyticsActionError,
  lastUpdateDateTime: Date
): RecognizeCategorizedEntitiesActionErrorResult {
  return { error: intoTextAnalyticsError(error), failedOn: lastUpdateDateTime };
}

/**
 * Creates a list of results for recognize categorized entities actions.
 * @param documents - list of input documents
 * @param succeededTasks - list of succeeded action results
 * @param erredActions - list of erred actions
 * @internal
 */
function makeRecognizeCategorizedEntitiesActionResult(
  documents: TextDocumentInput[],
  succeededTasks: TasksStateTasksEntityRecognitionTasksItem[],
  erredActions: TextAnalyticsActionError[]
): RecognizeCategorizedEntitiesActionResult[] {
  let errorIndex = 0;
  function convertTasksToActions(
    actions: RecognizeCategorizedEntitiesActionResult[],
    task: TasksStateTasksEntityRecognitionTasksItem
  ): RecognizeCategorizedEntitiesActionResult[] {
    const { results: actionResults, lastUpdateDateTime } = task;
    if (actionResults !== undefined) {
      const recognizeEntitiesResults = makeRecognizeCategorizedEntitiesResultArray(
        documents,
        actionResults
      );
      return [
        ...actions,
        {
          results: recognizeEntitiesResults,
          completedOn: lastUpdateDateTime
        }
      ];
    } else {
      return [...actions, createErredAction(erredActions[errorIndex++], lastUpdateDateTime)];
    }
  }
  return succeededTasks.reduce(convertTasksToActions, []);
}

/**
 * Creates a list of results for recognize pii entities actions.
 * @param documents - list of input documents
 * @param succeededTasks - list of succeeded action results
 * @param erredActions - list of erred actions
 * @internal
 */
function makeRecognizePiiEntitiesActionResult(
  documents: TextDocumentInput[],
  succeededTasks: TasksStateTasksEntityRecognitionPiiTasksItem[],
  erredActions: TextAnalyticsActionError[]
): RecognizePiiEntitiesActionResult[] {
  let errorIndex = 0;
  function convertTasksToActions(
    actions: RecognizePiiEntitiesActionResult[],
    task: TasksStateTasksEntityRecognitionPiiTasksItem
  ): RecognizePiiEntitiesActionResult[] {
    const { results: actionResults, lastUpdateDateTime } = task;
    if (actionResults !== undefined) {
      const recognizeEntitiesResults = makeRecognizePiiEntitiesResultArray(
        documents,
        actionResults
      );
      return [
        ...actions,
        {
          results: recognizeEntitiesResults,
          completedOn: lastUpdateDateTime
        }
      ];
    } else {
      return [...actions, createErredAction(erredActions[errorIndex++], lastUpdateDateTime)];
    }
  }
  return succeededTasks.reduce(convertTasksToActions, []);
}

/**
 * Creates a list of results for extract key phrases actions.
 * @param documents - list of input documents
 * @param succeededTasks - list of succeeded action results
 * @param erredActions - list of erred actions
 * @internal
 */
function makeExtractKeyPhrasesActionResult(
  documents: TextDocumentInput[],
  succeededTasks: TasksStateTasksKeyPhraseExtractionTasksItem[],
  erredActions: TextAnalyticsActionError[]
): ExtractKeyPhrasesActionResult[] {
  let errorIndex = 0;
  function convertTasksToActions(
    actions: ExtractKeyPhrasesActionResult[],
    task: TasksStateTasksKeyPhraseExtractionTasksItem
  ): ExtractKeyPhrasesActionResult[] {
    const { results: actionResults, lastUpdateDateTime } = task;
    if (actionResults !== undefined) {
      const extractKeyPhrasesResults = makeExtractKeyPhrasesResultArray(documents, actionResults);
      return [
        ...actions,
        {
          results: extractKeyPhrasesResults,
          completedOn: lastUpdateDateTime
        }
      ];
    } else {
      return [...actions, createErredAction(erredActions[errorIndex++], lastUpdateDateTime)];
    }
  }
  return succeededTasks.reduce(convertTasksToActions, []);
}

/**
 * Creates a list of results for recognize linked entities actions.
 * @param documents - list of input documents
 * @param succeededTasks - list of succeeded action results
 * @param erredActions - list of erred actions
 * @internal
 */
function makeRecognizeLinkedEntitiesActionResult(
  documents: TextDocumentInput[],
  succeededTasks: TasksStateTasksEntityLinkingTasksItem[],
  erredActions: TextAnalyticsActionError[]
): RecognizeLinkedEntitiesActionResult[] {
  let errorIndex = 0;
  function convertTasksToActions(
    actions: RecognizeLinkedEntitiesActionResult[],
    task: TasksStateTasksEntityLinkingTasksItem
  ): RecognizeLinkedEntitiesActionResult[] {
    const { results: actionResults, lastUpdateDateTime } = task;
    if (actionResults !== undefined) {
      const recognizeEntitiesResults = makeRecognizeLinkedEntitiesResultArray(
        documents,
        actionResults
      );
      return [
        ...actions,
        {
          results: recognizeEntitiesResults,
          completedOn: lastUpdateDateTime
        }
      ];
    } else {
      return [...actions, createErredAction(erredActions[errorIndex++], lastUpdateDateTime)];
    }
  }
  return succeededTasks.reduce(convertTasksToActions, []);
}

/**
 * Creates the user-friendly action results object for the begin analyze batch actions operation.
 * @param response - the begin analyze batch actions operation response
 * @param documents - the list of input documents
 * @returns - the user-friendly action results object
 * @internal
 */
export function createAnalyzeBatchActionsResult(
  response: GeneratedResponse,
  documents: TextDocumentInput[]
): AnalyzeBatchActionsResult {
  const recognizeEntitiesActionErrors: TextAnalyticsActionError[] = [];
  const recognizePiiEntitiesActionErrors: TextAnalyticsActionError[] = [];
  const extractKeyPhrasesActionErrors: TextAnalyticsActionError[] = [];
  const recognizeLinkedEntitiesActionErrors: TextAnalyticsActionError[] = [];
  categorizeActionErrors(
    response?.errors ?? [],
    recognizeEntitiesActionErrors,
    recognizePiiEntitiesActionErrors,
    extractKeyPhrasesActionErrors,
    recognizeLinkedEntitiesActionErrors
  );
  return {
    recognizeEntitiesResults: makeRecognizeCategorizedEntitiesActionResult(
      documents,
      response.tasks.entityRecognitionTasks ?? [],
      recognizeEntitiesActionErrors
    ),
    recognizePiiEntitiesResults: makeRecognizePiiEntitiesActionResult(
      documents,
      response.tasks.entityRecognitionPiiTasks ?? [],
      recognizePiiEntitiesActionErrors
    ),
    extractKeyPhrasesResults: makeExtractKeyPhrasesActionResult(
      documents,
      response.tasks.keyPhraseExtractionTasks ?? [],
      extractKeyPhrasesActionErrors
    ),
    recognizeLinkedEntitiesResults: makeRecognizeLinkedEntitiesActionResult(
      documents,
      response.tasks.entityLinkingTasks ?? [],
      recognizeLinkedEntitiesActionErrors
    )
  };
}
