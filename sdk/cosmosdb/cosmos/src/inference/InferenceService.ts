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
import type { SemanticRerankConfig } from "./SemanticRerankConfig.js";
import type { RerankScore, SemanticRerankResult } from "./SemanticRerankResult.js";
import { Constants } from "../common/constants.js";
import { StatusCodes } from "../common/statusCodes.js";
import { getCachedDefaultHttpClient } from "../utils/cachedClient.js";
import { ErrorResponse, type ErrorBody } from "../request/ErrorResponse.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import { DiagnosticNodeType } from "../diagnostics/DiagnosticNodeInternal.js";
import { addDiagnosticChild, getEmptyCosmosDiagnostics } from "../utils/diagnostics.js";
import { getCurrentTimestampInMs } from "../utils/time.js";

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
  private readonly inferenceRequestTimeoutMs: number;

  constructor(cosmosClientOptions: CosmosClientOptions) {
    if (!cosmosClientOptions.aadCredentials) {
      throw new Error(
        "Semantic rerank requires AAD authentication. Provide 'aadCredentials' in CosmosClientOptions.",
      );
    }

    const semanticRerankConfig = this.getSemanticRerankConfig(cosmosClientOptions);
    const endpoint = this.resolveInferenceEndpoint(semanticRerankConfig);
    this.inferenceEndpointUrl = `${endpoint}${Constants.Inference.BasePath}`;
    this.inferenceRequestTimeoutMs = this.resolveRequestTimeout(semanticRerankConfig);

    this.pipeline = this.createInferencePipeline(cosmosClientOptions.aadCredentials);
    this.httpClient = cosmosClientOptions.httpClient ?? getCachedDefaultHttpClient();

    logger.info(`InferenceService initialized with endpoint: ${endpoint}`);
  }

  /**
   * Sends a semantic rerank request to the inference service.
   * @param rerankContext - The context (e.g. query string) to use for reranking.
   * @param documents - The documents to be reranked.
   * @param options - Optional settings for the reranking request.
   * @param diagnosticNode - Optional diagnostic node used to record the inference REST call.
   * @returns The reranking results including scores, latency, and token usage.
   */
  async semanticRerank(
    rerankContext: string,
    documents: string[],
    options?: SemanticRerankOptions,
    diagnosticNode?: DiagnosticNodeInternal,
  ): Promise<SemanticRerankResult> {
    const payload = this.buildPayload(rerankContext, documents, options);
    const callerSignal = options?.["abortSignal"] as AbortSignal | undefined;

    // Enforce a single-attempt, no-retry timeout for the inference request. A dedicated
    // AbortController is the authoritative per-request budget (mirrors the .NET linked
    // CancellationTokenSource). Caller cancellation is linked in so it still cancels the
    // in-flight request, but it is surfaced unchanged rather than as a timeout.
    const timeoutController = new AbortController();
    const onCallerAbort = (): void => timeoutController.abort();
    if (callerSignal) {
      if (callerSignal.aborted) {
        timeoutController.abort();
      } else {
        callerSignal.addEventListener("abort", onCallerAbort, { once: true });
      }
    }

    const request = createPipelineRequest({
      url: this.inferenceEndpointUrl,
      method: "POST",
      body: JSON.stringify(payload),
      abortSignal: timeoutController.signal,
    });

    this.setHeaders(request);

    const sendAndParse = async (node?: DiagnosticNodeInternal): Promise<SemanticRerankResult> => {
      const startTimeUTCInMs = getCurrentTimestampInMs();
      let timedOut = false;
      const timeoutHandle = setTimeout(() => {
        timedOut = true;
        timeoutController.abort();
      }, this.inferenceRequestTimeoutMs);

      try {
        const response = await this.pipeline.sendRequest(this.httpClient, request);
        node?.addData({
          startTimeUTCInMs,
          durationInMs: getCurrentTimestampInMs() - startTimeUTCInMs,
          requestPayloadLengthInBytes: request.body ? String(request.body).length : 0,
          responsePayloadLengthInBytes: response.bodyAsText?.length ?? 0,
          requestData: { url: this.inferenceEndpointUrl },
        });
        return this.parseResponse(response);
      } catch (error) {
        // Surface only our own timeout as 408; caller cancellation propagates unchanged.
        if (timedOut && !callerSignal?.aborted) {
          throw this.createTimeoutError(startTimeUTCInMs);
        }
        throw error;
      } finally {
        clearTimeout(timeoutHandle);
        if (callerSignal) {
          callerSignal.removeEventListener("abort", onCallerAbort);
        }
      }
    };

    return diagnosticNode
      ? addDiagnosticChild(
          (childNode) => sendAndParse(childNode),
          diagnosticNode,
          DiagnosticNodeType.HTTP_REQUEST,
        )
      : sendAndParse();
  }

  /**
   * Reads the `semanticRerank` preview configuration object from `enablePreviewFeatures`, if present.
   */
  private getSemanticRerankConfig(
    cosmosClientOptions: CosmosClientOptions,
  ): SemanticRerankConfig | undefined {
    const config = cosmosClientOptions.enablePreviewFeatures?.["semanticRerank"];
    return typeof config === "object" && config !== null
      ? (config as SemanticRerankConfig)
      : undefined;
  }

  /**
   * Resolves the inference endpoint from `enablePreviewFeatures.semanticRerank.inferenceEndpoint`.
   */
  private resolveInferenceEndpoint(semanticRerankConfig: SemanticRerankConfig | undefined): string {
    const endpointValue = semanticRerankConfig?.inferenceEndpoint;
    const endpoint = typeof endpointValue === "string" ? endpointValue : undefined;

    if (!endpoint) {
      throw new Error(
        `Inference endpoint is required for semantic reranking. ` +
          `Set 'inferenceEndpoint' under the 'semanticRerank' key of 'enablePreviewFeatures' on CosmosClientOptions.`,
      );
    }

    // Remove trailing slash if present
    return endpoint.replace(/\/+$/, "");
  }

  /**
   * Resolves the per-request timeout (ms) from
   * `enablePreviewFeatures.semanticRerank.inferenceRequestTimeout`, falling back to the default
   * when not provided or invalid. This is a single-attempt budget with no retries.
   */
  private resolveRequestTimeout(semanticRerankConfig: SemanticRerankConfig | undefined): number {
    const timeoutValue = semanticRerankConfig?.inferenceRequestTimeout;
    return typeof timeoutValue === "number" && timeoutValue > 0
      ? timeoutValue
      : Constants.Inference.DefaultRequestTimeoutMs;
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
      const { code, message } = this.parseServiceError(response.bodyAsText);
      throw this.createInferenceError(
        response,
        code ?? String(response.status),
        message ?? `Semantic rerank request failed with status ${response.status}`,
      );
    }

    if (!response.bodyAsText) {
      throw this.createInferenceError(
        response,
        String(response.status),
        "Semantic rerank response body was empty.",
      );
    }

    const body = JSON.parse(response.bodyAsText);

    if (!Array.isArray(body.Scores)) {
      throw this.createInferenceError(
        response,
        String(response.status),
        "Semantic rerank response did not contain a Scores array.",
      );
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
      diagnostics: getEmptyCosmosDiagnostics(),
    };
  }

  /**
   * Parses a service error body into `{ code, message }`. `message` is the body's `message` field
   * followed by every other field except `code` (kept even when null) so no detail is lost. A
   * non-JSON body is returned verbatim in `message`; an empty body yields an empty object.
   */
  private parseServiceError(text: string | null | undefined): { code?: string; message?: string } {
    if (!text) {
      return {};
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      return { message: text };
    }
    if (typeof parsed !== "object" || parsed === null) {
      return { message: text };
    }
    const { code, message, ...rest } = parsed as Record<string, unknown>;
    const parts: string[] = [];
    if (message !== undefined) {
      parts.push(typeof message === "string" ? message : String(JSON.stringify(message)));
    }
    for (const [key, value] of Object.entries(rest)) {
      parts.push(`${key}: ${typeof value === "string" ? value : String(JSON.stringify(value))}`);
    }
    return {
      code: code != null ? String(code) : undefined,
      message: parts.join(" ") || undefined,
    };
  }

  /**
   * Builds an ErrorResponse carrying the HTTP status on `code` and the service error on `body`.
   */
  private createInferenceError(
    response: PipelineResponse,
    serviceCode: string,
    message: string,
  ): ErrorResponse {
    const errorBody: ErrorBody = { code: serviceCode, message };
    const errorResponse = new ErrorResponse(message);
    errorResponse.code = response.status;
    errorResponse.body = errorBody;
    // All response headers (including x-correlation-id) are surfaced here.
    errorResponse.headers = response.headers.toJSON() as Record<string, string>;
    return errorResponse;
  }

  /**
   * Builds an ErrorResponse for a client-side inference request timeout, carrying HTTP status
   * 408 (Request Timeout). No retries are attempted; this is a single-attempt budget.
   */
  private createTimeoutError(startTimeUTCInMs: number): ErrorResponse {
    const elapsedMs = getCurrentTimestampInMs() - startTimeUTCInMs;
    const message =
      `Semantic rerank request timed out after ${this.inferenceRequestTimeoutMs} ms ` +
      `(elapsed ${elapsedMs} ms). Adjust 'inferenceRequestTimeout' under ` +
      `'enablePreviewFeatures.semanticRerank' on CosmosClientOptions to change this budget.`;
    const errorBody: ErrorBody = { code: "RequestTimeout", message };
    const errorResponse = new ErrorResponse(message);
    errorResponse.code = StatusCodes.RequestTimeout;
    errorResponse.body = errorBody;
    return errorResponse;
  }
}
