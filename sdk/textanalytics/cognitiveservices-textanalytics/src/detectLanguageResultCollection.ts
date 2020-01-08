// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TextDocumentBatchStatistics,
  DocumentLanguage,
  DocumentError,
  LanguageInput
} from "./generated/models";
import {
  DetectLanguageResult,
  makeDetectLanguageResult,
  makeDetectLanguageErrorResult
} from "./detectLanguageResult";
import { sortByPreviousIdOrder } from "./util";

/**
 * Collection of `DetectLanguageResult` objects corresponding to a batch of input documents, and
 * annotated with information about the batch operation.
 */
export interface DetectLanguageResultCollection extends Array<DetectLanguageResult> {
  /**
   * Statistics about the input document batch and how it was processed
   * by the service. This property will have a value when includeStatistics is set to true
   * in the client call.
   */
  statistics?: TextDocumentBatchStatistics;
  /**
   * The version of the text analytics model used by this operation on this
   * batch of input documents.
   */
  modelVersion: string;
}

export function makeDetectLanguageResultCollection(
  input: LanguageInput[],
  documents: DocumentLanguage[],
  errors: DocumentError[],
  modelVersion: string,
  statistics?: TextDocumentBatchStatistics
): DetectLanguageResultCollection {
  const unsortedResult = documents
    .map(
      (document): DetectLanguageResult => {
        return makeDetectLanguageResult(
          document.id,
          document.detectedLanguages,
          document.statistics
        );
      }
    )
    .concat(
      errors.map(
        (error): DetectLanguageResult => {
          return makeDetectLanguageErrorResult(error.id, error.error);
        }
      )
    );
  const result = sortByPreviousIdOrder(input, unsortedResult);
  return Object.assign(result, {
    statistics,
    modelVersion
  });
}
