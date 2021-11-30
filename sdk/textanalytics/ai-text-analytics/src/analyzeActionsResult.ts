// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  AnalyzeSentimentResultArray,
  makeAnalyzeSentimentResultArray
} from "./analyzeSentimentResultArray";
import {
  MultiCategoryClassifyResultArray,
  makeMultiCategoryClassifyResultArray
} from "./multiCategoryClassifyResultArray";
import {
  SingleCategoryClassifyResultArray,
  makeSingleCategoryClassifyResultArray
} from "./singleCategoryClassifyResultArray";
import {
  ExtractKeyPhrasesResultArray,
  makeExtractKeyPhrasesResultArray
} from "./extractKeyPhrasesResultArray";
import {
  ExtractSummaryResultArray,
  makeExtractSummaryResultArray
} from "./extractSummaryResultArray";
import { AnalyzeJobState as GeneratedResponse, TextDocumentInput } from "./generated/models";
import {
  makeRecognizeCategorizedEntitiesResultArray,
  RecognizeCategorizedEntitiesResultArray
} from "./recognizeCategorizedEntitiesResultArray";
import {
  makeRecognizeCustomEntitiesResultArray,
  RecognizeCustomEntitiesResultArray
} from "./recognizeCustomEntitiesResultArray";
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
 * The results of an analyze Actions operation.
 */
export interface AnalyzeActionsResult {
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
  /**
   * Array of the results for each analyze sentiment action.
   */
  analyzeSentimentResults: AnalyzeSentimentActionResult[];
  /**
   * Array of the results for each extract summary action.
   */
  extractSummaryResults: ExtractSummaryActionResult[];
  /**
   * Array of the results for each recognize custom entities action.
   */
  recognizeCustomEntitiesResults: RecognizeCustomEntitiesActionResult[];
  /**
   * Array of the results for each custom classify document single category action.
   */
  singleCategoryClassifyResults: SingleCategoryClassifyActionResult[];
  /**
   * Array of the results for each custom classify document multi category action.
   */
  multiCategoryClassifyResults: MultiCategoryClassifyActionResult[];
}

/**
 * The state of an action
 */
export interface TextAnalyticsActionState {
  /**
   * The name of the action.
   */
  actionName?: string;
}

/**
 * The state of a succeeded action.
 */
export interface TextAnalyticsActionSuccessState extends TextAnalyticsActionState {
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
export interface TextAnalyticsActionErrorResult extends TextAnalyticsActionState {
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
 * The error of an analyze sentiment action.
 */
export type AnalyzeSentimentActionErrorResult = TextAnalyticsActionErrorResult;

/**
 * The results of a succeeded analyze sentiment action.
 */
export interface AnalyzeSentimentActionSuccessResult extends TextAnalyticsActionSuccessState {
  /**
   * Array of the results for each analyze sentiment action.
   */
  results: AnalyzeSentimentResultArray;
}

/**
 * The result of an analyze sentiment action.
 */
export type AnalyzeSentimentActionResult =
  | AnalyzeSentimentActionSuccessResult
  | AnalyzeSentimentActionErrorResult;

/**
 * The error of an extract summary action.
 */
export type ExtractSummaryActionErrorResult = TextAnalyticsActionErrorResult;

/**
 * The results of a succeeded extract summary action.
 */
export interface ExtractSummaryActionSuccessResult extends TextAnalyticsActionSuccessState {
  /**
   * Array of the results for each extract summary action.
   */
  results: ExtractSummaryResultArray;
}

/**
 * The result of an extract summary action.
 */
export type ExtractSummaryActionResult =
  | ExtractSummaryActionSuccessResult
  | ExtractSummaryActionErrorResult;

/**
 * The error of a custom recognize entities action.
 */
export type RecongizeCustomEntitiesActionErrorResult = TextAnalyticsActionErrorResult;

/**
 * The results of a succeeded custom recognize entities action.
 */
export interface RecongizeCustomEntitiesActionSuccessResult
  extends TextAnalyticsActionSuccessState {
  /**
   * Array of the results for each custom recognize entities action.
   */
  results: RecognizeCustomEntitiesResultArray;
}

/**
 * The result of a custom recognize entities action.
 */
export type RecognizeCustomEntitiesActionResult =
  | RecongizeCustomEntitiesActionSuccessResult
  | RecongizeCustomEntitiesActionErrorResult;

/**
 * The error of a custom classify document single category action.
 */
export type SingleCategoryClassifyActionErrorResult = TextAnalyticsActionErrorResult;

/**
 * The results of a succeeded custom classify document single category action.
 */
export interface SingleCategoryClassifyActionSuccessResult extends TextAnalyticsActionSuccessState {
  /**
   * Array of the results for each custom classify document single category action.
   */
  results: SingleCategoryClassifyResultArray;
}

/**
 * The result of a custom classify document single category action.
 */
export type SingleCategoryClassifyActionResult =
  | SingleCategoryClassifyActionSuccessResult
  | SingleCategoryClassifyActionErrorResult;

/**
 * The error of a custom classify document multi category action.
 */
export type MultiCategoryClassifyActionErrorResult = TextAnalyticsActionErrorResult;

/**
 * The results of a succeeded custom classify document multi category action.
 */
export interface MultiCategoryClassifyActionSuccessResult extends TextAnalyticsActionSuccessState {
  /**
   * Array of the results for each custom classify document multi category action.
   */
  results: MultiCategoryClassifyResultArray;
}

/**
 * The result of a custom classify document multi category action.
 */
export type MultiCategoryClassifyActionResult =
  | MultiCategoryClassifyActionSuccessResult
  | MultiCategoryClassifyActionErrorResult;

/**
 * The results of an analyze Actions operation represented as a paged iterator that
 * iterates over the results of the requested actions.
 */
export type PagedAsyncIterableAnalyzeActionsResult = PagedAsyncIterableIterator<
  AnalyzeActionsResult,
  AnalyzeActionsResult
>;

/**
 * The results of an analyze actions operation represented as a paged iterator that
 * iterates over the results of the requested actions.
 */
export interface PagedAnalyzeActionsResult extends PagedAsyncIterableAnalyzeActionsResult {
  // /**
  //  * Statistics about the input document batch and how it was processed
  //  * by the service. This property will have a value when includeStatistics is set to true
  //  * in the client call.
  //  */
  // statistics?: TextDocumentBatchStatistics;
}

/**
 * The type of different actions supported by the begin analyze actions operation.
 * @internal
 */
type TextAnalyticsActionType =
  | "RecognizeCategorizedEntities"
  | "RecognizePiiEntities"
  | "ExtractKeyPhrases"
  | "RecognizeLinkedEntities"
  | "AnalyzeSentiment"
  | "ExtractSummary"
  | "RecognizeCustomEntities"
  | "SingleCategoryClassify"
  | "MultiCategoryClassify";

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
    case "entityLinkingTasks": {
      return "RecognizeLinkedEntities";
    }
    case "sentimentAnalysisTasks": {
      return "AnalyzeSentiment";
    }
    case "extractiveSummarizationTasks": {
      return "ExtractSummary";
    }
    case "customEntityRecognitionTasks": {
      return "RecognizeCustomEntities";
    }
    case "customSingleClassificationTasks": {
      return "SingleCategoryClassify";
    }
    case "customMultiClassificationTasks": {
      return "MultiCategoryClassify";
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
      /#\/tasks\/(entityRecognitionTasks|entityRecognitionPiiTasks|keyPhraseExtractionTasks|entityLinkingTasks|sentimentAnalysisTasks|extractiveSummarizationTasks|customEntityRecognitionTasks|customSingleClassificationTasks|customMultiClassificationTasks)\/(\d+)/
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
  recognizeLinkedEntitiesActionErrors: TextAnalyticsActionError[],
  analyzeSentimentActionErrors: TextAnalyticsActionError[],
  extractSummarySentencesActionErrors: TextAnalyticsActionError[],
  recognizeCustomEntitiesActionErrors: TextAnalyticsActionError[],
  singleCategoryClassifyActionErrors: TextAnalyticsActionError[],
  multiCategoryClassifyActionErrors: TextAnalyticsActionError[]
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
      case "AnalyzeSentiment": {
        analyzeSentimentActionErrors.push(actionError);
        break;
      }
      case "ExtractSummary": {
        extractSummarySentencesActionErrors.push(actionError);
        break;
      }
      case "RecognizeCustomEntities": {
        recognizeCustomEntitiesActionErrors.push(actionError);
        break;
      }
      case "SingleCategoryClassify": {
        singleCategoryClassifyActionErrors.push(actionError);
        break;
      }
      case "MultiCategoryClassify": {
        multiCategoryClassifyActionErrors.push(actionError);
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
  lastUpdateDateTime: Date,
  taskName?: string
): TextAnalyticsActionErrorResult {
  return {
    error: intoTextAnalyticsError(error),
    failedOn: lastUpdateDateTime,
    actionName: taskName
  };
}

interface TaskSuccessResult<T> {
  results?: T;
  taskName?: string;
  lastUpdateDateTime: Date;
}

type ActionResult<TSuccess> =
  | {
      results: TSuccess;
      completedOn: Date;
    }
  | TextAnalyticsActionErrorResult;

/**
 * Creates a list of results for any action.
 * @param documents - list of input documents
 * @param makeResultsArray - a function to convert the results of a service response to the SDK's one
 * @param succeededTasks - list of succeeded action results
 * @param erredActions - list of erred actions
 * @internal
 */
function makeActionResult<TTaskResult, TActionResult>(
  documents: TextDocumentInput[],
  makeResultsArray: (docs: TextDocumentInput[], x: TTaskResult) => TActionResult,
  succeededTasks: TaskSuccessResult<TTaskResult>[],
  erredActions: TextAnalyticsActionError[]
): ActionResult<TActionResult>[] {
  let errorIndex = 0;
  function convertTasksToActions(
    actions: ActionResult<TActionResult>[],
    task: TaskSuccessResult<TTaskResult>
  ): ActionResult<TActionResult>[] {
    const { results: actionResults, lastUpdateDateTime, taskName } = task;
    if (actionResults !== undefined) {
      const recognizeEntitiesResults = makeResultsArray(documents, actionResults);
      return [
        ...actions,
        {
          results: recognizeEntitiesResults,
          completedOn: lastUpdateDateTime,
          actionName: taskName
        }
      ];
    } else {
      return [
        ...actions,
        createErredAction(erredActions[errorIndex++], lastUpdateDateTime, taskName)
      ];
    }
  }
  return succeededTasks.reduce(convertTasksToActions, []);
}

/**
 * Creates the user-friendly action results object for the begin analyze actions operation.
 * @param response - the begin analyze actions operation response
 * @param documents - the list of input documents
 * @returns - the user-friendly action results object
 * @internal
 */
export function createAnalyzeActionsResult(
  response: GeneratedResponse,
  documents: TextDocumentInput[]
): AnalyzeActionsResult {
  const recognizeEntitiesActionErrors: TextAnalyticsActionError[] = [];
  const recognizePiiEntitiesActionErrors: TextAnalyticsActionError[] = [];
  const extractKeyPhrasesActionErrors: TextAnalyticsActionError[] = [];
  const recognizeLinkedEntitiesActionErrors: TextAnalyticsActionError[] = [];
  const analyzeSentimentActionErrors: TextAnalyticsActionError[] = [];
  const extractSummarySentencesActionErrors: TextAnalyticsActionError[] = [];
  const recognizeCustomEntitiesActionErrors: TextAnalyticsActionError[] = [];
  const singleCategoryClassifyActionErrors: TextAnalyticsActionError[] = [];
  const multiCategoryClassifyActionErrors: TextAnalyticsActionError[] = [];
  categorizeActionErrors(
    response?.errors ?? [],
    recognizeEntitiesActionErrors,
    recognizePiiEntitiesActionErrors,
    extractKeyPhrasesActionErrors,
    recognizeLinkedEntitiesActionErrors,
    analyzeSentimentActionErrors,
    extractSummarySentencesActionErrors,
    recognizeCustomEntitiesActionErrors,
    singleCategoryClassifyActionErrors,
    multiCategoryClassifyActionErrors
  );
  return {
    recognizeEntitiesResults: makeActionResult(
      documents,
      makeRecognizeCategorizedEntitiesResultArray,
      response.tasks.entityRecognitionTasks ?? [],
      recognizeEntitiesActionErrors
    ),
    recognizePiiEntitiesResults: makeActionResult(
      documents,
      makeRecognizePiiEntitiesResultArray,
      response.tasks.entityRecognitionPiiTasks ?? [],
      recognizePiiEntitiesActionErrors
    ),
    extractKeyPhrasesResults: makeActionResult(
      documents,
      makeExtractKeyPhrasesResultArray,
      response.tasks.keyPhraseExtractionTasks ?? [],
      extractKeyPhrasesActionErrors
    ),
    recognizeLinkedEntitiesResults: makeActionResult(
      documents,
      makeRecognizeLinkedEntitiesResultArray,
      response.tasks.entityLinkingTasks ?? [],
      recognizeLinkedEntitiesActionErrors
    ),
    analyzeSentimentResults: makeActionResult(
      documents,
      makeAnalyzeSentimentResultArray,
      response.tasks.sentimentAnalysisTasks ?? [],
      analyzeSentimentActionErrors
    ),
    extractSummaryResults: makeActionResult(
      documents,
      makeExtractSummaryResultArray,
      response.tasks.extractiveSummarizationTasks ?? [],
      extractSummarySentencesActionErrors
    ),
    recognizeCustomEntitiesResults: makeActionResult(
      documents,
      makeRecognizeCustomEntitiesResultArray,
      response.tasks.customEntityRecognitionTasks ?? [],
      recognizeCustomEntitiesActionErrors
    ),
    singleCategoryClassifyResults: makeActionResult(
      documents,
      makeSingleCategoryClassifyResultArray,
      response.tasks.customSingleClassificationTasks ?? [],
      singleCategoryClassifyActionErrors
    ),
    multiCategoryClassifyResults: makeActionResult(
      documents,
      makeMultiCategoryClassifyResultArray,
      response.tasks.customMultiClassificationTasks ?? [],
      multiCategoryClassifyActionErrors
    )
  };
}
