// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Shape of the `semanticRerank` object supplied under `enablePreviewFeatures` on
 * {@link CosmosClientOptions}.
 *
 * This is an internal, non-public contract: `enablePreviewFeatures` is intentionally
 * typed as `Record<string, unknown>` so preview configuration is not committed to the
 * public API surface. This interface exists only to give the {@link InferenceService}
 * a single, typed source of truth when reading that untyped bag.
 *
 * @internal
 */
export interface SemanticRerankPreviewConfig {
  /** Endpoint of the Cosmos DB Inference Service used for semantic reranking. */
  inferenceEndpoint?: string;
  /**
   * Per-request timeout, in milliseconds, for inference calls. This is a single-attempt budget
   * with no retries; when it elapses the request fails with HTTP status 408 (Request Timeout).
   * Defaults to 5000 (5 seconds).
   */
  inferenceRequestTimeout?: number;
}
