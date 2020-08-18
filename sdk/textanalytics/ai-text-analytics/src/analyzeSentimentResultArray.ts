// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TextDocumentBatchStatistics,
  TextDocumentInput,
  GeneratedClientSentimentResponse
} from "./generated/models";
import {
  AnalyzeSentimentResult,
  makeAnalyzeSentimentResult,
  makeAnalyzeSentimentErrorResult
} from "./analyzeSentimentResult";
import { sortResponseIdObjects } from "./util";

/**
 * Array of `AnalyzeSentimentResult` objects corresponding to a batch of input documents, and
 * annotated with information about the batch operation.
 */
export interface AnalyzeSentimentResultArray extends Array<AnalyzeSentimentResult> {
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

export function makeAnalyzeSentimentResultArray(
  input: TextDocumentInput[],
  response: GeneratedClientSentimentResponse
): AnalyzeSentimentResultArray {
  const { documents, errors, modelVersion, statistics } = response;
  const unsortedResult = documents
    .map(
      (document): AnalyzeSentimentResult => {
        return makeAnalyzeSentimentResult(document, response);
      }
    )
    .concat(
      errors.map(
        (error): AnalyzeSentimentResult => {
          return makeAnalyzeSentimentErrorResult(error.id, error.error);
        }
      )
    );
  const result = sortResponseIdObjects(input, unsortedResult);
  return Object.assign(result, {
    statistics,
    modelVersion
  });
}
