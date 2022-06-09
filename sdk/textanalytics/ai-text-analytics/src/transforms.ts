// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AnalyzeActionName,
  AnalyzeBatchResult,
  AnalyzeResult,
  CustomSingleLabelClassificationResult,
  CustomSingleLabelClassificationSuccessResult,
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
  CustomSingleLabelClassificationResult as GeneratedCustomSingleLabelClassificationResult,
  EntityLinkingResult as GeneratedEntityLinkingResult,
  EntitiesResult as GeneratedEntityRecognitionResult,
  HealthcareEntity as GeneratedHealthcareEntity,
  HealthcareResult as GeneratedHealthcareResult,
  KeyPhraseResult as GeneratedKeyPhraseExtractionResult,
  LanguageDetectionResult as GeneratedLanguageDetectionResult,
  PiiResult as GeneratedPiiEntityRecognitionResult,
  SentenceSentiment as GeneratedSentenceSentiment,
  SentimentResponse as GeneratedSentimentAnalysisResult,
  HealthcareEntitiesDocumentResult,
  HealthcareLROResult,
  HealthcareRelation,
  HealthcareRelationEntity,
  InnerErrorModel,
  KeyPhraseExtractionLROResult,
  KeyPhraseTaskResult,
  KnownAnalyzeTextLROResultsKind,
  LanguageDetectionInput,
  LanguageDetectionTaskResult,
  PiiEntityRecognitionLROResult,
  PiiTaskResult,
  SentenceTarget,
  SentimentLROResult,
  SentimentTaskResult,
  SingleClassificationDocumentResult,
  TargetRelation,
  TextDocumentInput,
} from "./generated";
import {
  AssessmentIndex,
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
 * @param input - the array of documents sent to the service for processing.
 * @param response - the response received from the service.
 * @param options - an options bag that includes functions to process the results.
 */
function transformDocumentResults<
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
  const { processError = makeTextAnalysisErrorResult, processSuccess } = options || {};
  const successResults = processSuccess
    ? response.documents.map(processSuccess)
    : response.documents;
  const unsortedResults = (
    successResults as (PublicDocumentSuccess | TextAnalysisErrorResult)[]
  ).concat(response.errors.map((error) => processError(error.id, error.error)));

  return sortResponseIdObjects(input, unsortedResults);
}

function toLanguageDetectionResult(
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

function toPiiEntityRecognitionResult(
  documents: TextDocumentInput[],
  results: GeneratedPiiEntityRecognitionResult
): PiiEntityRecognitionResult[] {
  return transformDocumentResults(documents, results);
}

function toSentimentAnalysisResult(
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

function toEntityLinkingResult(
  documents: TextDocumentInput[],
  results: GeneratedEntityLinkingResult
): EntityLinkingResult[] {
  return transformDocumentResults(documents, results);
}

function toKeyPhraseExtractionResult(
  documents: TextDocumentInput[],
  results: GeneratedKeyPhraseExtractionResult
): KeyPhraseExtractionResult[] {
  return transformDocumentResults(documents, results);
}

function toEntityRecognitionResult(
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
  documents: TextDocumentInput[],
  results: GeneratedHealthcareResult
): HealthcareResult[] {
  function makeHealthcareEntity(entity: GeneratedHealthcareEntity): HealthcareEntity {
    const { dataSources, ...rest } = entity;
    return {
      dataSources: dataSources ?? [],
      ...rest,
    };
  }
  function makeHealthcareRelation(
    entities: HealthcareEntity[]
  ): (relation: HealthcareRelation) => HealthcareEntityRelation {
    return (relation: HealthcareRelation): HealthcareEntityRelation => ({
      relationType: relation.relationType,
      roles: relation.entities.map(
        (role: HealthcareRelationEntity): HealthcareEntityRelationRole => ({
          entity: entities[parseHealthcareEntityIndex(role.ref)],
          name: role.role,
        })
      ),
    });
  }
  return transformDocumentResults<HealthcareEntitiesDocumentResult, HealthcareSuccessResult>(
    documents,
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
    }
  );
}

function toCustomSingleLabelClassificationResult(
  documents: TextDocumentInput[],
  results: GeneratedCustomSingleLabelClassificationResult
): CustomSingleLabelClassificationResult[] {
  return transformDocumentResults<
    SingleClassificationDocumentResult,
    CustomSingleLabelClassificationSuccessResult
  >(documents, results, {
    processSuccess: ({ classification, ...rest }) => {
      return {
        classifications: [classification],
        ...rest,
      };
    },
  });
}

/**
 * @internal
 */
export function transformAnalyzeBatchResults(
  documents: TextDocumentInput[],
  response: AnalyzeTextLROResultUnion[] = []
): AnalyzeBatchResult[] {
  return response.map((actionData) => {
    const { lastUpdateDateTime: completedOn, actionName, kind } = actionData;
    switch (kind as KnownAnalyzeTextLROResultsKind) {
      case "SentimentAnalysisLROResults": {
        const { results } = actionData as SentimentLROResult;
        const { modelVersion, statistics } = results;
        return {
          kind: "SentimentAnalysis",
          results: toSentimentAnalysisResult(documents, results),
          completedOn,
          ...(actionName ? { actionName } : {}),
          ...(statistics ? { statistics } : {}),
          modelVersion,
        };
      }
      case "EntityRecognitionLROResults": {
        const { results } = actionData as EntityRecognitionLROResult;
        const { modelVersion, statistics } = results;
        return {
          kind: "EntityRecognition",
          results: toEntityRecognitionResult(documents, results),
          completedOn,
          ...(actionName ? { actionName } : {}),
          ...(statistics ? { statistics } : {}),
          modelVersion,
        };
      }
      case "PiiEntityRecognitionLROResults": {
        const { results } = actionData as PiiEntityRecognitionLROResult;
        const { modelVersion, statistics } = results;
        return {
          kind: "PiiEntityRecognition",
          results: toPiiEntityRecognitionResult(documents, results),
          completedOn,
          ...(actionName ? { actionName } : {}),
          ...(statistics ? { statistics } : {}),
          modelVersion,
        };
      }
      case "KeyPhraseExtractionLROResults": {
        const { results } = actionData as KeyPhraseExtractionLROResult;
        const { modelVersion, statistics } = results;
        return {
          kind: "KeyPhraseExtraction",
          results: toKeyPhraseExtractionResult(documents, results),
          completedOn,
          ...(actionName ? { actionName } : {}),
          ...(statistics ? { statistics } : {}),
          modelVersion,
        };
      }
      case "EntityLinkingLROResults": {
        const { results } = actionData as EntityLinkingLROResult;
        const { modelVersion, statistics } = results;
        return {
          kind: "EntityLinking",
          results: toEntityLinkingResult(documents, results),
          completedOn,
          ...(actionName ? { actionName } : {}),
          ...(statistics ? { statistics } : {}),
          modelVersion,
        };
      }
      case "HealthcareLROResults": {
        const { results } = actionData as HealthcareLROResult;
        const { modelVersion, statistics } = results;
        return {
          kind: "Healthcare",
          results: toHealthcareResult(documents, results),
          completedOn,
          ...(actionName ? { actionName } : {}),
          ...(statistics ? { statistics } : {}),
          modelVersion,
        };
      }
      case "CustomEntityRecognitionLROResults": {
        const { results } = actionData as CustomEntityRecognitionLROResult;
        const { deploymentName, projectName, statistics } = results;
        return {
          kind: "CustomEntityRecognition",
          results: transformDocumentResults(documents, results),
          completedOn,
          ...(actionName ? { actionName } : {}),
          ...(statistics ? { statistics } : {}),
          deploymentName,
          projectName,
        };
      }
      case "CustomSingleLabelClassificationLROResults": {
        const { results } = actionData as CustomSingleLabelClassificationLROResult;
        const { deploymentName, projectName, statistics } = results;
        return {
          kind: "CustomSingleLabelClassification",
          results: toCustomSingleLabelClassificationResult(documents, results),
          completedOn,
          ...(actionName ? { actionName } : {}),
          ...(statistics ? { statistics } : {}),
          deploymentName,
          projectName,
        };
      }
      case "CustomMultiLabelClassificationLROResults": {
        const { results } = actionData as CustomMultiLabelClassificationLROResult;
        const { deploymentName, projectName, statistics } = results;
        return {
          kind: "CustomMultiLabelClassification",
          results: transformDocumentResults(documents, results),
          completedOn,
          ...(actionName ? { actionName } : {}),
          ...(statistics ? { statistics } : {}),
          deploymentName,
          projectName,
        };
      }
      case "ExtractiveSummarizationLROResults": {
        const { results } = actionData as ExtractiveSummarizationLROResult;
        const { modelVersion, statistics } = results;
        return {
          kind: "ExtractiveSummarization",
          results: transformDocumentResults(documents, results),
          completedOn,
          ...(actionName ? { actionName } : {}),
          ...(statistics ? { statistics } : {}),
          modelVersion,
        };
      }
      default: {
        throw new Error(`Unsupported results kind: ${kind}`);
      }
    }
  });
}
