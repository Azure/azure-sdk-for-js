// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import type { HttpClient, Pipeline, PipelineResponse } from "@azure/core-rest-pipeline";
import {
  bearerTokenAuthenticationPolicy,
  createEmptyPipeline,
  createPipelineRequest,
  createDefaultHttpClient,
} from "@azure/core-rest-pipeline";
import type { AzureLogger } from "@azure/logger";
import { createClientLogger } from "@azure/logger";
import type { CosmosClientOptions } from "../CosmosClientOptions.js";
import type { SemanticRerankOptions } from "./SemanticRerankOptions.js";
import type { RerankScore, SemanticRerankResult } from "./SemanticRerankResult.js";
import { Constants } from "../common/constants.js";

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

    const endpoint = this.resolveInferenceEndpoint(cosmosClientOptions);
    this.inferenceEndpointUrl = `${endpoint}${INFERENCE_BASE_PATH}`;

    this.pipeline = this.createInferencePipeline(cosmosClientOptions.aadCredentials);
    this.httpClient = createDefaultHttpClient();

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
      headers: createPipelineRequest({ url: "" }).headers,
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
   * Resolves the inference endpoint from client options or environment variable.
   */
  private resolveInferenceEndpoint(cosmosClientOptions: CosmosClientOptions): string {
    const endpoint =
      cosmosClientOptions.inferenceEndpoint ||
      (typeof process !== "undefined" ? process.env[INFERENCE_ENDPOINT_ENV_VAR] : undefined);

    if (!endpoint) {
      throw new Error(
        `Inference endpoint is required for semantic reranking. ` +
          `Set 'inferenceEndpoint' in CosmosClientOptions or the '${INFERENCE_ENDPOINT_ENV_VAR}' environment variable.`,
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
    const payload: Record<string, unknown> = {
      query: rerankContext,
      documents,
    };

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
      if (options.additionalOptions) {
        for (const [key, value] of Object.entries(options.additionalOptions)) {
          payload[key] = value;
        }
      }
    }

    return payload;
  }

  /**
   * Parses the HTTP response into a SemanticRerankResult.
   */
  private parseResponse(response: PipelineResponse): SemanticRerankResult {
    if (response.status < 200 || response.status >= 300) {
      throw new Error(
        `Semantic rerank request failed with status ${response.status}: ${response.bodyAsText}`,
      );
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
