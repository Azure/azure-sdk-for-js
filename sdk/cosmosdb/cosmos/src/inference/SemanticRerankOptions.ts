// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Options for a semantic reranking request, passed as a flat dictionary.
 *
 * Known service options (all optional):
 * - `return_documents` (boolean) — if true, the reranked documents are included in the response.
 * - `top_k` (number) — the maximum number of top-ranked documents to return.
 * - `batch_size` (number) — the batch size for processing documents.
 * - `sort` (boolean) — if true, results are sorted by relevance score in descending order.
 * - `document_type` (`"string"` | `"json"`) — the type of documents being reranked.
 * - `target_paths` (string) — comma-separated JSON paths to extract text from (when document_type is `"json"`).
 * - `abortSignal` (AbortSignal) — signal to cancel the request (not sent as part of the payload).
 *
 * Any additional keys are forwarded as-is to the inference service payload.
 */
export type SemanticRerankOptions = Record<string, unknown>;
