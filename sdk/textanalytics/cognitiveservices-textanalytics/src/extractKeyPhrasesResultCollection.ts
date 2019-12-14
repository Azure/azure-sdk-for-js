// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TextDocumentBatchStatistics,
  DocumentError,
  DocumentKeyPhrases,
  MultiLanguageInput
} from "./generated/models";
import {
  ExtractKeyPhrasesResult,
  makeExtractKeyPhrasesResult,
  makeExtractKeyPhrasesErrorResult
} from "./extractKeyPhrasesResult";
import { sortByPreviousIdOrder } from "./util";

export interface ExtractKeyPhrasesResultCollection extends Array<ExtractKeyPhrasesResult> {
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

export function makeExtractKeyPhrasesResultCollection(
  input: MultiLanguageInput[],
  documents: DocumentKeyPhrases[],
  errors: DocumentError[],
  modelVersion: string,
  statistics?: TextDocumentBatchStatistics
): ExtractKeyPhrasesResultCollection {
  const unsortedResult = documents
    .map(
      (document): ExtractKeyPhrasesResult => {
        return makeExtractKeyPhrasesResult(document.id, document.keyPhrases, document.statistics);
      }
    )
    .concat(
      errors.map(
        (error): ExtractKeyPhrasesResult => {
          return makeExtractKeyPhrasesErrorResult(error.id, error.error);
        }
      )
    );
  const result = sortByPreviousIdOrder(input, unsortedResult);
  return Object.assign(result, {
    statistics,
    modelVersion
  });
}
