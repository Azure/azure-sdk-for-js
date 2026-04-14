// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Options for a semantic reranking request.
 */
export interface SemanticRerankOptions {
  /**
   * AbortSignal to cancel the request.
   * See https://developer.mozilla.org/en-US/docs/Web/API/AbortController
   */
  abortSignal?: AbortSignal;
  /** If true, the reranked documents will be included in the response. */
  returnDocuments?: boolean;
  /** The maximum number of top-ranked documents to return. */
  topK?: number;
  /** The batch size for processing documents. */
  batchSize?: number;
  /** If true, the results will be sorted by relevance score in descending order. */
  sort?: boolean;
  /** Type of documents being reranked. Supported values are "string" and "json". */
  documentType?: string;
  /** If documentType is "json", the list of JSON paths to extract text from for reranking. Comma-separated string. */
  targetPaths?: string;
  /** Additional custom options to include in the inference request payload. */
  additionalOptions?: Record<string, unknown>;
}
