// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AbstractiveSummarizationLROResult,
  AnalyzeResponse,
  AnalyzeTextLROResultUnion,
  AssessmentSentiment,
  CustomEntityRecognitionLROResult,
  CustomMultiLabelClassificationLROResult,
  CustomSingleLabelClassificationLROResult,
  DocumentError,
  EntitiesTaskResult,
  EntityLinkingLROResult,
  EntityLinkingTaskResult,
  EntityRecognitionLROResult,
  ErrorModel,
  ErrorResponse,
  ExtractiveSummarizationLROResult,
  EntityLinkingResult as GeneratedEntityLinkingResult,
  EntitiesResult as GeneratedEntityRecognitionResult,
  HealthcareEntity as GeneratedHealthcareEntity,
  HealthcareResult as GeneratedHealthcareResult,
  KeyPhraseResult as GeneratedKeyPhraseExtractionResult,
  LanguageDetectionResult as GeneratedLanguageDetectionResult,
  PiiResult as GeneratedPiiEntityRecognitionResult,
  SentenceSentiment as GeneratedSentenceSentiment,
  SentimentResponse as GeneratedSentimentAnalysisResult,
  HealthcareLROResult,
  HealthcareRelation,
  HealthcareRelationEntity,
  InnerErrorModel,
  KeyPhraseExtractionLROResult,
  KeyPhraseTaskResult,
  KnownAnalyzeTextLROResultsKind,
  LanguageDetectionTaskResult,
  PiiEntityRecognitionLROResult,
  PiiTaskResult,
  SentenceTarget,
  SentimentLROResult,
  SentimentTaskResult,
  TargetRelation,
  CustomEntitiesResultDocumentsItem,
  CustomLabelClassificationResultDocumentsItem,
  HealthcareEntitiesDocumentResult,
} from "./generated";
import {
  AnalyzeActionName,
  AnalyzeBatchActionName,
  AnalyzeBatchResult,
  AnalyzeResult,
  EntityLinkingResult,
  EntityRecognitionResult,
  HealthcareEntity,
  HealthcareEntityRelation,
  HealthcareEntityRelationRole,
  HealthcareResult,
  HealthcareSuccessResult,
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
  AssessmentIndex,
  extractErrorPointerIndex,
  parseAssessmentIndex,
  parseHealthcareEntityIndex,
  sortResponseIdObjects,
} from "./util";
import { RestError } from "@azure/core-rest-pipeline";

/**
 * Helper function for converting nested service error to the unified
 * TextAnalysisError
 */
function toTextAnalysisError(errorModel: ErrorModel | InnerErrorModel): TextAnalysisError {
  // Return the deepest error.
  if (errorModel.innererror !== undefined) {
    return toTextAnalysisError(errorModel.innererror);
  }

  return {
    ...errorModel,
  };
}

function makeTextAnalysisErrorResult(id: string, error: ErrorModel): TextAnalysisErrorResult {
  return {
    id,
    error: toTextAnalysisError(error),
  };
}

/**
 * combines successful and erroneous results into a single array of results and
 * sort them so that the IDs order match that of the input documents array.
 * @param ids - the array of input document IDs.
 * @param response - the response received from the service.
 * @param options - an options bag that includes functions to process the results.
 */
function transformDocumentResults<
  DocumentSuccess extends TextAnalysisSuccessResult,
  PublicDocumentSuccess extends TextAnalysisSuccessResult = DocumentSuccess,
  TError extends TextAnalysisErrorResult = TextAnalysisErrorResult,
>(
  ids: string[],
  response: {
    documents: DocumentSuccess[];
    errors: DocumentError[];
  },
  options?: {
    processSuccess?: (successResult: DocumentSuccess) => PublicDocumentSuccess;
    processError?: (id: string, error: ErrorModel) => TError;
  },
): (PublicDocumentSuccess | TextAnalysisErrorResult)[] {
  const { processError = makeTextAnalysisErrorResult, processSuccess } = options || {};
  const successResults = processSuccess
    ? response.documents.map(processSuccess)
    : response.documents;
  const unsortedResults = (
    successResults as (PublicDocumentSuccess | TextAnalysisErrorResult)[]
  ).concat(response.errors.map((error) => processError(error.id, error.error)));

  return sortResponseIdObjects(ids, unsortedResults);
}

function toLanguageDetectionResult(
  docIds: string[],
  results: GeneratedLanguageDetectionResult,
): LanguageDetectionResult[] {
  return transformDocumentResults(docIds, results, {
    processSuccess: ({ detectedLanguage, ...rest }) => ({
      primaryLanguage: detectedLanguage,
      ...rest,
    }),
  });
}

function toPiiEntityRecognitionResult(
  docIds: string[],
  results: GeneratedPiiEntityRecognitionResult,
): PiiEntityRecognitionResult[] {
  return transformDocumentResults(docIds, results);
}

function toSentimentAnalysisResult(
  docIds: string[],
  results: GeneratedSentimentAnalysisResult,
): SentimentAnalysisResult[] {
  return transformDocumentResults(docIds, results, {
    processSuccess: ({ sentences, ...rest }) => ({
      ...rest,
      sentences: sentences.map((sentence) =>
        convertGeneratedSentenceSentiment(sentence, sentences),
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
  sentences: GeneratedSentenceSentiment[],
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
        }),
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
  sentences: GeneratedSentenceSentiment[],
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

function toEntityLinkingResult(
  docIds: string[],
  results: GeneratedEntityLinkingResult,
): EntityLinkingResult[] {
  return transformDocumentResults(docIds, results);
}

function toKeyPhraseExtractionResult(
  docIds: string[],
  results: GeneratedKeyPhraseExtractionResult,
): KeyPhraseExtractionResult[] {
  return transformDocumentResults(docIds, results);
}

function toEntityRecognitionResult(
  docIds: string[],
  results: GeneratedEntityRecognitionResult,
): EntityRecognitionResult[] {
  return transformDocumentResults(docIds, results);
}

/**
 * @internal
 */
export function transformActionResult<ActionName extends AnalyzeActionName>(
  actionName: ActionName,
  docIds: string[],
  response: AnalyzeResponse,
): AnalyzeResult<AnalyzeActionName> {
  switch (response.kind) {
    case "EntityLinkingResults": {
      return toEntityLinkingResult(docIds, (response as EntityLinkingTaskResult).results);
    }
    case "EntityRecognitionResults": {
      return toEntityRecognitionResult(docIds, (response as EntitiesTaskResult).results);
    }
    case "KeyPhraseExtractionResults": {
      return toKeyPhraseExtractionResult(docIds, (response as KeyPhraseTaskResult).results);
    }
    case "PiiEntityRecognitionResults": {
      return toPiiEntityRecognitionResult(docIds, (response as PiiTaskResult).results);
    }
    case "SentimentAnalysisResults": {
      return toSentimentAnalysisResult(docIds, (response as SentimentTaskResult).results);
    }
    case "LanguageDetectionResults": {
      return toLanguageDetectionResult(docIds, (response as LanguageDetectionTaskResult).results);
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
function transformError(errorResponse: unknown): any {
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

export async function throwError<T>(p: Promise<T>): Promise<T> {
  try {
    return await p;
  } catch (e: unknown) {
    throw transformError(e);
  }
}

function toHealthcareResult(
  docIds: string[],
  results: GeneratedHealthcareResult,
): HealthcareResult[] {
  function makeHealthcareEntity(entity: GeneratedHealthcareEntity): HealthcareEntity {
    const { dataSources, ...rest } = entity;
    return {
      dataSources: dataSources ?? [],
      ...rest,
    };
  }
  function makeHealthcareRelation(
    entities: HealthcareEntity[],
  ): (relation: HealthcareRelation) => HealthcareEntityRelation {
    return ({
      entities: generatedEntities,
      relationType,
      confidenceScore,
    }: HealthcareRelation): HealthcareEntityRelation => ({
      relationType: relationType,
      confidenceScore,
      roles: generatedEntities.map(
        (role: HealthcareRelationEntity): HealthcareEntityRelationRole => ({
          entity: entities[parseHealthcareEntityIndex(role.ref)],
          name: role.role,
        }),
      ),
    });
  }
  return transformDocumentResults<HealthcareEntitiesDocumentResult, HealthcareSuccessResult>(
    docIds,
    results,
    {
      processSuccess: ({ entities, relations, ...rest }) => {
        const newEntities = entities.map(makeHealthcareEntity);
        return {
          entities: newEntities,
          entityRelations: relations.map(makeHealthcareRelation(newEntities)),
          ...rest,
        };
      },
    },
  );
}

/**
 * @internal
 */
export function transformAnalyzeBatchResults(
  docIds: string[],
  response: AnalyzeTextLROResultUnion[] = [],
  errors: ErrorModel[] = [],
): AnalyzeBatchResult[] {
  const errorMap = toIndexErrorMap(errors);
  return response.map((actionData, idx): AnalyzeBatchResult => {
    const { lastUpdateDateTime: completedOn, actionName, kind: resultKind } = actionData;
    const error = errorMap.get(idx);
    switch (resultKind as KnownAnalyzeTextLROResultsKind) {
      case "SentimentAnalysisLROResults": {
        const kind = "SentimentAnalysis";
        if (actionData.status === "failed") {
          return returnErrorTask(kind, error, completedOn);
        }
        const { results } = actionData as SentimentLROResult;
        const { modelVersion, statistics } = results;
        return {
          kind,
          results: toSentimentAnalysisResult(docIds, results),
          completedOn,
          ...(actionName ? { actionName } : {}),
          ...(statistics ? { statistics } : {}),
          modelVersion,
        };
      }
      case "EntityRecognitionLROResults": {
        const kind = "EntityRecognition";
        if (actionData.status === "failed") {
          return returnErrorTask(kind, error, completedOn);
        }
        const { results } = actionData as EntityRecognitionLROResult;
        const { modelVersion, statistics } = results;
        return {
          kind: "EntityRecognition",
          results: toEntityRecognitionResult(docIds, results),
          completedOn,
          ...(actionName ? { actionName } : {}),
          ...(statistics ? { statistics } : {}),
          modelVersion,
        };
      }
      case "PiiEntityRecognitionLROResults": {
        const kind = "PiiEntityRecognition";
        if (actionData.status === "failed") {
          return returnErrorTask(kind, error, completedOn);
        }
        const { results } = actionData as PiiEntityRecognitionLROResult;
        const { modelVersion, statistics } = results;
        return {
          kind,
          results: toPiiEntityRecognitionResult(docIds, results),
          completedOn,
          ...(actionName ? { actionName } : {}),
          ...(statistics ? { statistics } : {}),
          modelVersion,
        };
      }
      case "KeyPhraseExtractionLROResults": {
        const kind = "KeyPhraseExtraction";
        if (actionData.status === "failed") {
          return returnErrorTask(kind, error, completedOn);
        }
        const { results } = actionData as KeyPhraseExtractionLROResult;
        const { modelVersion, statistics } = results;
        return {
          kind,
          results: toKeyPhraseExtractionResult(docIds, results),
          completedOn,
          ...(actionName ? { actionName } : {}),
          ...(statistics ? { statistics } : {}),
          modelVersion,
        };
      }
      case "EntityLinkingLROResults": {
        const kind = "EntityLinking";
        if (actionData.status === "failed") {
          return returnErrorTask(kind, error, completedOn);
        }
        const { results } = actionData as EntityLinkingLROResult;
        const { modelVersion, statistics } = results;
        return {
          kind,
          results: toEntityLinkingResult(docIds, results),
          completedOn,
          ...(actionName ? { actionName } : {}),
          ...(statistics ? { statistics } : {}),
          modelVersion,
        };
      }
      case "HealthcareLROResults": {
        const kind = "Healthcare";
        if (actionData.status === "failed") {
          return returnErrorTask(kind, error, completedOn);
        }
        const { results } = actionData as HealthcareLROResult;
        const { modelVersion, statistics } = results;
        return {
          kind,
          results: toHealthcareResult(docIds, results),
          completedOn,
          ...(actionName ? { actionName } : {}),
          ...(statistics ? { statistics } : {}),
          modelVersion,
        };
      }
      case "CustomEntityRecognitionLROResults": {
        const kind = "CustomEntityRecognition";
        if (actionData.status === "failed") {
          return returnErrorCustomTask(kind, error, completedOn);
        }
        const { results } = actionData as CustomEntityRecognitionLROResult;
        const { deploymentName, projectName, statistics } = results;
        return {
          kind,
          results: transformDocumentResults<CustomEntitiesResultDocumentsItem>(docIds, results),
          completedOn,
          ...(actionName ? { actionName } : {}),
          ...(statistics ? { statistics } : {}),
          deploymentName,
          projectName,
        };
      }
      case "CustomSingleLabelClassificationLROResults": {
        const kind = "CustomSingleLabelClassification";
        if (actionData.status === "failed") {
          return returnErrorCustomTask(kind, error, completedOn);
        }
        const { results } = actionData as CustomSingleLabelClassificationLROResult;
        const { deploymentName, projectName, statistics } = results;
        return {
          kind,
          results: transformDocumentResults<CustomLabelClassificationResultDocumentsItem>(
            docIds,
            results,
          ),
          completedOn,
          ...(actionName ? { actionName } : {}),
          ...(statistics ? { statistics } : {}),
          deploymentName,
          projectName,
        };
      }
      case "CustomMultiLabelClassificationLROResults": {
        const kind = "CustomMultiLabelClassification";
        if (actionData.status === "failed") {
          return returnErrorCustomTask(kind, error, completedOn);
        }
        const { results } = actionData as CustomMultiLabelClassificationLROResult;
        const { deploymentName, projectName, statistics } = results;
        return {
          kind,
          results: transformDocumentResults<CustomLabelClassificationResultDocumentsItem>(
            docIds,
            results,
          ),
          completedOn,
          ...(actionName ? { actionName } : {}),
          ...(statistics ? { statistics } : {}),
          deploymentName,
          projectName,
        };
      }
      case "ExtractiveSummarizationLROResults": {
        const kind = "ExtractiveSummarization";
        if (actionData.status === "failed") {
          return returnErrorTask(kind, error, completedOn);
        }
        const { results } = actionData as ExtractiveSummarizationLROResult;
        const { modelVersion, statistics } = results;
        return {
          kind: "ExtractiveSummarization",
          results: transformDocumentResults(docIds, results),
          completedOn,
          ...(actionName ? { actionName } : {}),
          ...(statistics ? { statistics } : {}),
          modelVersion,
        };
      }
      case "AbstractiveSummarizationLROResults": {
        const kind = "AbstractiveSummarization";
        if (actionData.status === "failed") {
          return returnErrorTask(kind, error, completedOn);
        }
        const { results } = actionData as AbstractiveSummarizationLROResult;
        const { modelVersion, statistics } = results;
        return {
          kind: "AbstractiveSummarization",
          results: transformDocumentResults(docIds, results),
          completedOn,
          ...(actionName ? { actionName } : {}),
          ...(statistics ? { statistics } : {}),
          modelVersion,
        };
      }
      default: {
        throw new Error(`Unsupported results kind: ${resultKind}`);
      }
    }
  });
}
/**
 * @internal
 * Transform a list of error into index and error Map
 */
function toIndexErrorMap(errors: ErrorModel[]): Map<number, TextAnalysisError> {
  const errorMap = new Map<number, TextAnalysisError>();
  for (const error of errors) {
    const position = extractErrorPointerIndex(error);
    const { target, ...errorWithoutTarget } = error;
    errorMap.set(position, toTextAnalysisError(errorWithoutTarget));
  }
  return errorMap;
}

/**
 * Return the error for non-custom task
 *
 * @param kind - non custom task kind
 * @param error - error returned from the service
 * @param failedOn - the LastUpdateDateTime from the service
 * @returns - AnalyzeBatchResult with error
 */
function returnErrorTask(
  kind: AnalyzeBatchActionName,
  error: TextAnalysisError | undefined,
  failedOn: Date,
): AnalyzeBatchResult {
  if (!error) {
    throw new Error("Unexpected response from service - no errors for missing action results.");
  }
  return {
    kind,
    modelVersion: "",
    failedOn,
    error,
  } as AnalyzeBatchResult;
}
/**
 * Return the error for non-custom task
 *
 * @param kind - non custom task kind
 * @param error - error returned from the service
 * @param failedOn - the LastUpdateDateTime from the service
 * @returns AnalyzeBatchResult for custom task with error
 */
function returnErrorCustomTask(
  kind: AnalyzeBatchActionName,
  error: TextAnalysisError | undefined,
  failedOn: Date,
): AnalyzeBatchResult {
  if (!error) {
    throw new Error("Unexpected response from service - no errors for missing action results.");
  }
  return {
    kind,
    projectName: "",
    deploymentName: "",
    failedOn,
    error,
  } as AnalyzeBatchResult;
}
