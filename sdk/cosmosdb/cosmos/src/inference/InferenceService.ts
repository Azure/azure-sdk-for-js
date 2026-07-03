// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import type {
  HttpClient,
  Pipeline,
  PipelineRequest,
  PipelineResponse,
} from "@azure/core-rest-pipeline";
import {
  bearerTokenAuthenticationPolicy,
  createEmptyPipeline,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import type { AzureLogger } from "@azure/logger";
import { createClientLogger } from "@azure/logger";
import type { CosmosClientOptions } from "../CosmosClientOptions.js";
import type { SemanticRerankOptions } from "./SemanticRerankOptions.js";
import type { RerankScore, SemanticRerankResult } from "./SemanticRerankResult.js";
import { Constants } from "../common/constants.js";
import { StatusCodes } from "../common/statusCodes.js";
import { getCachedDefaultHttpClient } from "../utils/cachedClient.js";
import { ErrorResponse } from "../request/ErrorResponse.js";

const logger: AzureLogger = createClientLogger("InferenceService");

/** Keys that are not part of the inference service payload. */
const NON_PAYLOAD_KEYS = new Set(["abortSignal"]);

/** HTTP redirection lower bound (kept local so it is not exported in the public API). */
const HTTP_MULTIPLE_CHOICES = 300;

/**
 * Provides functionality to interact with the Cosmos DB Inference Service for semantic reranking.
 * @internal
 */
export class InferenceService {
  private readonly pipeline: Pipeline;
  private readonly httpClient: HttpClient;
  private readonly inferenceEndpointUrl: string;

  constructor(cosmosClientOptions: CosmosClientOptions) {
    if (!cosmosClientOptions.aadCredentials) {
      throw new Error(
        "Semantic rerank requires AAD authentication. Provide 'aadCredentials' in CosmosClientOptions.",
      );
    }

    const endpoint = this.resolveInferenceEndpoint(cosmosClientOptions);
    this.inferenceEndpointUrl = `${endpoint}${Constants.Inference.BasePath}`;

    this.pipeline = this.createInferencePipeline(cosmosClientOptions.aadCredentials);
    this.httpClient = cosmosClientOptions.httpClient ?? getCachedDefaultHttpClient();

    logger.info(`InferenceService initialized with endpoint: ${endpoint}`);
  }

  /**
   * Sends a semantic rerank request to the inference service.
   * @param rerankContext - The context (e.g. query string) to use for reranking.
   * @param documents - The documents to be reranked.
   * @param options - Optional settings for the reranking request.
   * @returns The reranking results including scores, latency, and token usage.
   */
  async semanticRerank(
    rerankContext: string,
    documents: string[],
    options?: SemanticRerankOptions,
  ): Promise<SemanticRerankResult> {
    const payload = this.buildPayload(rerankContext, documents, options);

    const request = createPipelineRequest({
      url: this.inferenceEndpointUrl,
      method: "POST",
      body: JSON.stringify(payload),
      abortSignal: options?.["abortSignal"] as AbortSignal | undefined,
      timeout: Constants.Inference.DefaultTimeoutMs,
    });

    this.setHeaders(request);

    const response = await this.pipeline.sendRequest(this.httpClient, request);
    return this.parseResponse(response);
  }

  /**
   * Resolves the inference endpoint from the `inferenceEndpoint` key of `enablePreviewFeatures`.
   */
  private resolveInferenceEndpoint(cosmosClientOptions: CosmosClientOptions): string {
    const previewEndpoint = cosmosClientOptions.enablePreviewFeatures?.["inferenceEndpoint"];
    const endpoint = typeof previewEndpoint === "string" ? previewEndpoint : undefined;

    if (!endpoint) {
      throw new Error(
        `Inference endpoint is required for semantic reranking. ` +
          `Set the 'inferenceEndpoint' key in 'enablePreviewFeatures' on CosmosClientOptions.`,
      );
    }

    // Remove trailing slash if present
    return endpoint.replace(/\/+$/, "");
  }

  /**
   * Creates a pipeline configured for inference service authentication.
   */
  private createInferencePipeline(credential: TokenCredential): Pipeline {
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(
      bearerTokenAuthenticationPolicy({
        credential,
        scopes: Constants.Inference.DefaultScope,
      }),
    );
    return pipeline;
  }

  /**
   * Sets the required HTTP headers on an inference service request.
   */
  private setHeaders(request: PipelineRequest): void {
    request.headers.set("Content-Type", "application/json");
    request.headers.set("Accept", "application/json");
    request.headers.set("Cache-Control", "no-cache");
    request.headers.set(Constants.HttpHeaders.Version, Constants.CurrentVersion);
    request.headers.set(Constants.HttpHeaders.UserAgent, Constants.Inference.UserAgent);
    request.headers.set(Constants.HttpHeaders.CustomUserAgent, Constants.Inference.UserAgent);
  }

  /**
   * Builds the JSON payload for the semantic rerank request.
   */
  private buildPayload(
    rerankContext: string,
    documents: string[],
    options?: SemanticRerankOptions,
  ): Record<string, unknown> {
    const payload: Record<string, unknown> = {};

    if (options) {
      // Forward all option keys except non-payload keys (e.g. abortSignal)
      for (const [key, value] of Object.entries(options)) {
        if (!NON_PAYLOAD_KEYS.has(key) && value !== undefined) {
          payload[key] = value;
        }
      }
    }

    // Required fields are set last to prevent options from overriding them
    payload["query"] = rerankContext;
    payload["documents"] = documents;

    return payload;
  }

  /**
   * Parses the HTTP response into a SemanticRerankResult.
   *
   * Note: The inference API response uses mixed casing conventions:
   * - PascalCase: `Scores` (array of rerank results)
   * - camelCase: `latency` (timing info), `document`, `score`, `index`
   * - snake_case: `token_usage` (token consumption)
   * This is the actual service response format, not a bug.
   */
  private parseResponse(response: PipelineResponse): SemanticRerankResult {
    if (response.status < StatusCodes.Ok || response.status >= HTTP_MULTIPLE_CHOICES) {
      // Surface the service's raw error payload (code/message/details) directly to the caller.
      const errorResponse = new ErrorResponse(
        response.bodyAsText || `Semantic rerank request failed with status ${response.status}`,
      );
      errorResponse.code = response.status;
      errorResponse.headers = response.headers.toJSON() as Record<string, string>;
      throw errorResponse;
    }

    if (!response.bodyAsText) {
      const errorResponse = new ErrorResponse("Semantic rerank response body was empty.");
      errorResponse.code = response.status;
      errorResponse.headers = response.headers.toJSON() as Record<string, string>;
      throw errorResponse;
    }

    const body = JSON.parse(response.bodyAsText);

    if (!Array.isArray(body.Scores)) {
      const errorResponse = new ErrorResponse(
        "Semantic rerank response did not contain a Scores array.",
      );
      errorResponse.code = response.status;
      errorResponse.headers = response.headers.toJSON() as Record<string, string>;
      throw errorResponse;
    }

    const rerankScores: RerankScore[] = body.Scores.map((item: Record<string, unknown>) => ({
      document: typeof item.document === "string" ? item.document : "",
      score: typeof item.score === "number" ? item.score : 0,
      index: typeof item.index === "number" ? item.index : -1,
    }));

    return {
      rerankScores,
      latency: body.latency ?? undefined,
      tokenUsage: body.token_usage ?? undefined,
      headers: response.headers.toJSON() as Record<string, string>,
    };
  }
}
