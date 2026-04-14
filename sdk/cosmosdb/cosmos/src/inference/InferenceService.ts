// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import type { HttpClient, Pipeline, PipelineResponse } from "@azure/core-rest-pipeline";
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
import { getCachedDefaultHttpClient } from "../utils/cachedClient.js";
import { ErrorResponse } from "../request/ErrorResponse.js";

const logger: AzureLogger = createClientLogger("InferenceService");

/** Base path for the inference service endpoint. */
const INFERENCE_BASE_PATH = "/inference/semanticReranking";
/** User agent string for inference requests. */
const INFERENCE_USER_AGENT = "cosmos-inference-js";
/** Default AAD scope for the Cosmos DB Inference Service. */
const INFERENCE_DEFAULT_SCOPE = "https://dbinference.azure.com/.default";
/** Default request timeout in milliseconds (120 seconds). */
const INFERENCE_DEFAULT_TIMEOUT_MS = 120_000;
/** Environment variable name for the inference endpoint. */
const INFERENCE_ENDPOINT_ENV_VAR = "AZURE_COSMOS_SEMANTIC_RERANKER_INFERENCE_ENDPOINT";

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

    const endpoint = this.resolveInferenceEndpoint();
    this.inferenceEndpointUrl = `${endpoint}${INFERENCE_BASE_PATH}`;

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
      abortSignal: options?.abortSignal,
      timeout: INFERENCE_DEFAULT_TIMEOUT_MS,
    });

    request.headers.set("Content-Type", "application/json");
    request.headers.set("Accept", "application/json");
    request.headers.set("Cache-Control", "no-cache");
    request.headers.set(Constants.HttpHeaders.Version, Constants.CurrentVersion);
    request.headers.set(Constants.HttpHeaders.UserAgent, INFERENCE_USER_AGENT);
    request.headers.set(Constants.HttpHeaders.CustomUserAgent, INFERENCE_USER_AGENT);

    const response = await this.pipeline.sendRequest(this.httpClient, request);
    return this.parseResponse(response);
  }

  /**
   * Resolves the inference endpoint from the environment variable.
   */
  private resolveInferenceEndpoint(): string {
    const endpoint =
      typeof process !== "undefined" ? process.env[INFERENCE_ENDPOINT_ENV_VAR] : undefined;

    if (!endpoint) {
      throw new Error(
        `Inference endpoint is required for semantic reranking. ` +
          `Set the '${INFERENCE_ENDPOINT_ENV_VAR}' environment variable.`,
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
        scopes: INFERENCE_DEFAULT_SCOPE,
      }),
    );
    return pipeline;
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
      if (options.returnDocuments !== undefined) {
        payload["return_documents"] = options.returnDocuments;
      }
      if (options.topK !== undefined) {
        payload["top_k"] = options.topK;
      }
      if (options.batchSize !== undefined) {
        payload["batch_size"] = options.batchSize;
      }
      if (options.sort !== undefined) {
        payload["sort"] = options.sort;
      }
      if (options.documentType !== undefined) {
        payload["document_type"] = options.documentType;
      }
      if (options.targetPaths !== undefined) {
        payload["target_paths"] = options.targetPaths;
      }
      if (options.additionalOptions) {
        for (const [key, value] of Object.entries(options.additionalOptions)) {
          payload[key] = value;
        }
      }
    }

    // Required fields are set last to prevent additionalOptions from overriding them
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
    if (response.status < 200 || response.status >= 300) {
      let serviceCode: string | number = response.status;
      let serviceMessage = `Semantic rerank request failed with status ${response.status}`;

      // Parse the error payload to surface the service's code, message, and details
      try {
        const errorBody = JSON.parse(response.bodyAsText || "{}");
        if (errorBody.code) {
          serviceCode = errorBody.code;
        }
        if (errorBody.message) {
          serviceMessage = errorBody.message;
        }
        if (errorBody.details) {
          serviceMessage += ` Details: ${JSON.stringify(errorBody.details)}`;
        }
      } catch {
        // If parsing fails, fall back to raw body text
        serviceMessage += `: ${response.bodyAsText}`;
      }

      const errorResponse = new ErrorResponse(serviceMessage);
      errorResponse.code = serviceCode;
      errorResponse.headers = response.headers.toJSON() as Record<string, string>;
      throw errorResponse;
    }

    const body = JSON.parse(response.bodyAsText || "{}");

    const rerankScores: RerankScore[] = [];
    if (Array.isArray(body.Scores)) {
      for (const item of body.Scores) {
        rerankScores.push({
          document: item.document ?? null,
          score: typeof item.score === "number" ? item.score : 0,
          index: typeof item.index === "number" ? item.index : -1,
        });
      }
    }

    return {
      rerankScores,
      latency: body.latency ?? undefined,
      tokenUsage: body.token_usage ?? undefined,
      headers: response.headers.toJSON() as Record<string, string>,
    };
  }
}
