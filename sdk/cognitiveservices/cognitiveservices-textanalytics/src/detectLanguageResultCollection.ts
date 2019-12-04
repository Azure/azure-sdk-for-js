// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestStatistics, DocumentLanguage, DocumentError } from "./generated/models";
import {
  DetectLanguageResult,
  makeDetectLanguageResult,
  makeDetectLanguageErrorResult
} from "./detectLanguageResult";

export interface DetectLanguageResultCollection extends Array<DetectLanguageResult> {
  /**
   * (Optional) if showStats=true was specified in the request this field will contain information
   * about the request payload.
   */
  statistics?: RequestStatistics;
  /**
   * This field indicates which model was used for scoring.
   */
  modelVersion: string;
}

export function makeDetectLanguageResultCollection(
  documents: DocumentLanguage[],
  errors: DocumentError[],
  modelVersion: string,
  statistics?: RequestStatistics
): DetectLanguageResultCollection {
  const result = documents
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
  return Object.assign(result, {
    statistics,
    modelVersion
  });
}
