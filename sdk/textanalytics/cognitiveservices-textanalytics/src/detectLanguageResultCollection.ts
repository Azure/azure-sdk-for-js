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

export interface DetectLanguageResultCollection extends Array<DetectLanguageResult> {
  /**
   * (Optional) if showStats=true was specified in the request this field will contain information
   * about the request payload.
   */
  statistics?: TextDocumentBatchStatistics;
  /**
   * This field indicates which model was used for scoring.
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
