// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AnalyzeActionName,
  AnalyzeActionParameters,
  AnalyzeResult,
  EntityLinkingResult,
  EntityRecognitionResult,
  KeyPhraseExtractionResult,
  LanguageDetectionResult,
  Opinion,
  PiiEntityRecognitionResult,
  SentenceSentiment,
  SentimentAnalysisResult,
  TextAnalysisError,
  TextAnalysisErrorResult,
  TextAnalysisSuccessResult,
} from "./models";
import {
  AnalyzeResponse,
  AssessmentSentiment,
  DocumentError,
  EntitiesTaskResult,
  EntityLinkingTaskResult,
  ErrorModel,
  ErrorResponse,
  EntityLinkingResult as GeneratedEntityLinkingResult,
  EntitiesResult as GeneratedEntityRecognitionResult,
  KeyPhraseResult as GeneratedKeyPhraseExtractionResult,
  LanguageDetectionResult as GeneratedLanguageDetectionResult,
  PiiResult as GeneratedPiiEntityRecognitionResult,
  SentenceSentiment as GeneratedSentenceSentiment,
  SentimentResponse as GeneratedSentimentAnalysisResult,
  InnerErrorModel,
  KeyPhraseTaskResult,
  LanguageDetectionInput,
  LanguageDetectionTaskResult,
  PiiEntityRecognitionAction,
  PiiTaskResult,
  SentenceTarget,
  SentimentTaskResult,
  TargetRelation,
  TextDocumentInput,
} from "./generated";
import { AssessmentIndex, parseAssessmentIndex, sortResponseIdObjects } from "./util";
import { RestError } from "@azure/core-rest-pipeline";

/**
 * Helper function for converting nested service error into
 * the unified TextAnalyticsError
 * @internal
 */
export function intoTextAnalyticsError(
  errorModel: ErrorModel | InnerErrorModel
): TextAnalysisError {
  // Return the deepest error. This will always be at most
  // one level for TextAnalytics
  if (errorModel.innererror !== undefined) {
    return intoTextAnalyticsError(errorModel.innererror);
  }

  return {
    code: errorModel.code,
    message: errorModel.message,
    target: errorModel.target,
  };
}

/**
 * @internal
 */
export function makeTextAnalyticsErrorResult(
  id: string,
  error: ErrorModel
): TextAnalysisErrorResult {
  return {
    id,
    error: intoTextAnalyticsError(error),
  };
}

/**
 * @internal
 * combines successful and erroneous results into a single array of results and
 * sort them so that the IDs order match that of the input documents array.
 * @param input - the array of documents sent to the service for processing.
 * @param response - the response received from the service.
 * @param options - an options bag that includes functions to process the results.
 */
export function transformDocumentResults<
  DocumentSuccess extends TextAnalysisSuccessResult,
  PublicDocumentSuccess extends TextAnalysisSuccessResult = DocumentSuccess,
  TError extends TextAnalysisErrorResult = TextAnalysisErrorResult
>(
  input: TextDocumentInput[],
  response: {
    documents: DocumentSuccess[];
    errors: DocumentError[];
  },
  options?: {
    processSuccess?: (successResult: DocumentSuccess) => PublicDocumentSuccess;
    processError?: (id: string, error: ErrorModel) => TError;
  }
): (PublicDocumentSuccess | TextAnalysisErrorResult)[] {
  const { processError = makeTextAnalyticsErrorResult, processSuccess } = options || {};
  const successResults = processSuccess
    ? response.documents.map(processSuccess)
    : response.documents;
  const unsortedResults = (
    successResults as (PublicDocumentSuccess | TextAnalysisErrorResult)[]
  ).concat(response.errors.map((error) => processError(error.id, error.error)));

  return sortResponseIdObjects(input, unsortedResults);
}

/**
 * @internal
 */
export function toLanguageDetectionResult(
  documents: LanguageDetectionInput[],
  results: GeneratedLanguageDetectionResult
): LanguageDetectionResult[] {
  return transformDocumentResults(documents, results, {
    processSuccess: ({ detectedLanguage, ...rest }) => ({
      primaryLanguage: detectedLanguage,
      ...rest,
    }),
  });
}

/**
 * @internal
 */
export function toPiiEntityRecognitionResult(
  documents: TextDocumentInput[],
  results: GeneratedPiiEntityRecognitionResult
): PiiEntityRecognitionResult[] {
  return transformDocumentResults(documents, results);
}

/**
 * @internal
 */
export function toSentimentAnalysisResult(
  documents: TextDocumentInput[],
  results: GeneratedSentimentAnalysisResult
): SentimentAnalysisResult[] {
  return transformDocumentResults(documents, results, {
    processSuccess: ({ sentences, ...rest }) => ({
      ...rest,
      sentences: sentences.map((sentence) =>
        convertGeneratedSentenceSentiment(sentence, sentences)
      ),
    }),
  });
}

/**
 * Converts a sentence sentiment object returned by the service to another that
 * is user-friendly.
 *
 * @param sentence - The sentence sentiment object to be converted.
 * @param response - The entire response returned by the service.
 * @returns The user-friendly sentence sentiment object.
 * @internal
 */
function convertGeneratedSentenceSentiment(
  { targets, assessments: _, ...rest }: GeneratedSentenceSentiment,
  sentences: GeneratedSentenceSentiment[]
): SentenceSentiment {
  return {
    ...rest,
    opinions:
      targets?.map(
        // eslint-disable-next-line @typescript-eslint/no-shadow
        ({ relations, ...rest }: SentenceTarget): Opinion => ({
          target: rest,
          assessments: relations
            .filter((relation) => relation.relationType === "assessment")
            .map((relation) => convertTargetRelationToAssessmentSentiment(relation, sentences)),
        })
      ) ?? [],
  };
}

/**
 * Converts a target relation object returned by the service to an assessment
 * sentiment object where JSON pointers in the former are realized in the
 * latter.
 *
 * @param targetRelation - The target relation object to be converted.
 * @param response - The entire response returned by the service.
 * @returns The user-friendly assessment sentiment object.
 * @internal
 */
function convertTargetRelationToAssessmentSentiment(
  targetRelation: TargetRelation,
  sentences: GeneratedSentenceSentiment[]
): AssessmentSentiment {
  const assessmentPtr = targetRelation.ref;
  const assessmentIndex: AssessmentIndex = parseAssessmentIndex(assessmentPtr);
  const assessment =
    sentences?.[assessmentIndex.sentence].assessments?.[assessmentIndex.assessment];
  if (assessment !== undefined) {
    return assessment;
  } else {
    throw new Error(`Pointer "${assessmentPtr}" is not a valid Assessment pointer`);
  }
}

/**
 * @internal
 */
export function toEntityLinkingResult(
  documents: TextDocumentInput[],
  results: GeneratedEntityLinkingResult
): EntityLinkingResult[] {
  return transformDocumentResults(documents, results);
}

/**
 * @internal
 */
export function toKeyPhraseExtractionResult(
  documents: TextDocumentInput[],
  results: GeneratedKeyPhraseExtractionResult
): KeyPhraseExtractionResult[] {
  return transformDocumentResults(documents, results);
}

/**
 * @internal
 */
export function toEntityRecognitionResult(
  documents: TextDocumentInput[],
  results: GeneratedEntityRecognitionResult
): EntityRecognitionResult[] {
  return transformDocumentResults(documents, results);
}

/**
 * @internal
 */
export function transformActionResult<ActionName extends AnalyzeActionName>(
  actionName: ActionName,
  input: TextDocumentInput[] | LanguageDetectionInput[],
  response: AnalyzeResponse
): AnalyzeResult<AnalyzeActionName> {
  switch (response.kind) {
    case "EntityLinkingResults": {
      return toEntityLinkingResult(input, (response as EntityLinkingTaskResult).results);
    }
    case "EntityRecognitionResults": {
      return toEntityRecognitionResult(input, (response as EntitiesTaskResult).results);
    }
    case "KeyPhraseExtractionResults": {
      return toKeyPhraseExtractionResult(input, (response as KeyPhraseTaskResult).results);
    }
    case "PiiEntityRecognitionResults": {
      return toPiiEntityRecognitionResult(input, (response as PiiTaskResult).results);
    }
    case "SentimentAnalysisResults": {
      return toSentimentAnalysisResult(input, (response as SentimentTaskResult).results);
    }
    case "LanguageDetectionResults": {
      return toLanguageDetectionResult(input, (response as LanguageDetectionTaskResult).results);
    }
    default: {
      const __exhaust: never = response;
      throw new Error(`Unsupported results kind: ${__exhaust} for an action of type ${actionName}`);
    }
  }
}

function appendReadableErrorMessage(currentMessage: string, innerMessage: string): string {
  let message = currentMessage;
  if (message.slice(-1) !== ".") {
    message = message + ".";
  }
  return message + " " + innerMessage;
}

/**
 * @internal
 * parses incoming errors from the service/
 * @param error - the incoming error
 */
export function transformError(errorResponse: unknown): any {
  const strongErrorResponse = errorResponse as {
    response: {
      parsedBody?: ErrorResponse;
    };
    statusCode: number;
  };
  if (!strongErrorResponse.response) {
    throw errorResponse;
  }
  const topLevelError = strongErrorResponse.response.parsedBody?.error;
  if (!topLevelError) return errorResponse;
  let errorMessage = topLevelError.message;
  let code = topLevelError.code;
  function unwrap(error: ErrorModel | InnerErrorModel): ErrorModel {
    const innerError = error.innererror;
    if (innerError) {
      if (innerError.message) {
        errorMessage = appendReadableErrorMessage(errorMessage, innerError.message);
      }
      if (innerError.code) {
        code = innerError.code;
      }
      return unwrap(innerError);
    }
    return error as ErrorModel;
  }
  unwrap(topLevelError);
  return new RestError(errorMessage, {
    code,
    statusCode: strongErrorResponse.statusCode,
  });
}

/**
 * @internal
 */
export function setDefaultActionParameters<ActionName extends AnalyzeActionName>(
  actionName: AnalyzeActionName,
  action: AnalyzeActionParameters<ActionName>
): AnalyzeActionParameters<ActionName> {
  switch (actionName) {
    case "PiiEntityRecognition": {
      const { disableServiceLogs = true, ...rest } = action as PiiEntityRecognitionAction;
      return {
        disableServiceLogs,
        ...rest,
      } as AnalyzeActionParameters<ActionName>;
    }
  }
  return action;
}
