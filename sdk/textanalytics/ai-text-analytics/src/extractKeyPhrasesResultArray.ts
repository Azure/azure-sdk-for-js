// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TextDocumentBatchStatistics,
  DocumentError,
  DocumentKeyPhrases,
  TextDocumentInput
} from "./generated/models";
import {
  ExtractKeyPhrasesResult,
  makeExtractKeyPhrasesResult,
  makeExtractKeyPhrasesErrorResult
} from "./extractKeyPhrasesResult";
import { sortResponseIdObjects } from "./util";

/**
 * Array of `ExtractKeyPhrasesResult` objects corresponding to a batch of input documents, and
 * annotated with information about the batch operation.
 */
export interface ExtractKeyPhrasesResultArray extends Array<ExtractKeyPhrasesResult> {
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

export function makeExtractKeyPhrasesResultArray(
  input: TextDocumentInput[],
  documents: DocumentKeyPhrases[],
  errors: DocumentError[],
  modelVersion: string,
  statistics?: TextDocumentBatchStatistics
): ExtractKeyPhrasesResultArray {
  const unsortedResult = documents
    .map(
      (document): ExtractKeyPhrasesResult => {
        return makeExtractKeyPhrasesResult(
          document.id,
          document.keyPhrases,
          document.warnings,
          document.statistics
        );
      }
    )
    .concat(
      errors.map(
        (error): ExtractKeyPhrasesResult => {
          return makeExtractKeyPhrasesErrorResult(error.id, error.error);
        }
      )
    );
  const result = sortResponseIdObjects(input, unsortedResult);
  return Object.assign(result, {
    statistics,
    modelVersion
  });
}
