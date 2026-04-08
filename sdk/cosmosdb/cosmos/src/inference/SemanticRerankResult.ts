// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Represents the score assigned to a document after a semantic reranking operation.
 */
export interface RerankScore {
  /** The document content that was reranked. May be null if `returnDocuments` was not set. */
  document: string | null;
  /** The relevance score assigned to the document after reranking. */
  score: number;
  /** The original index of the document in the input list before reranking. */
  index: number;
}

/**
 * Represents the result of a semantic reranking operation, including rerank scores,
 * latency, token usage, and HTTP response headers.
 */
export interface SemanticRerankResult {
  /** The list of rerank scores for the documents. */
  rerankScores: RerankScore[];
  /** Latency information for the rerank operation. */
  latency: Record<string, unknown> | undefined;
  /** Token usage information for the rerank operation. */
  tokenUsage: Record<string, unknown> | undefined;
  /** HTTP response headers from the inference service. */
  headers: Record<string, string>;
}
