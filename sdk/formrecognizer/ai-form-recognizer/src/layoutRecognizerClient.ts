// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createPipelineFromOptions,
  signingPolicy,
  InternalPipelineOptions,
  isTokenCredential,
  bearerTokenAuthenticationPolicy,
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";
import { TokenCredential } from "@azure/identity";
import { LIB_INFO, DEFAULT_COGNITIVE_SCOPE } from "./constants";
import { logger } from "./logger";
import { createSpan } from "./tracing";
import {
  FormRecognizerClientOptions,
  FormRecognizerOperationOptions,
  SupportedContentType
} from "./common";
import { CanonicalCode } from "@opentelemetry/types";

import { FormRecognizerClient as GeneratedClient } from "./generated/formRecognizerClient";
import { CognitiveKeyCredential } from "./cognitiveKeyCredential";
import { ExtractLayoutResultResponse, FormRecognizerRequestBody } from "./models";
import { toAnalyzeLayoutResultResponse } from "./transforms";
import {
  ExtractPollerClient,
  BeginExtractPoller,
  BeginExtractPollState
} from "./lro/analyze/poller";
import { PollerLike, PollOperationState } from ".";

import { AnalyzeLayoutAsyncResponse as AnalyzeLayoutAsyncResponseModel } from "./generated/models";

/**
 * Options for analyzing layout
 */
export type ExtractLayoutOptions = FormRecognizerOperationOptions;

/**
 * Options for the start analyzing layout operation
 */
export type StartAnalyzeLayoutOptions = ExtractLayoutOptions & {
  intervalInMs?: number;
  onProgress?: (state: BeginExtractPollState<ExtractLayoutResultResponse>) => void;
  resumeFrom?: string;
};

export type LayoutPollerLike = PollerLike<
  PollOperationState<ExtractLayoutResultResponse>,
  ExtractLayoutResultResponse
>;

type GetExtractedLayoutResultOptions = FormRecognizerOperationOptions;

/**
 * Client class for interacting with Azure Form Recognizer.
 */
export class LayoutRecognizerClient {
  /**
   * The URL to the LayoutRecognizer endpoint
   */
  public readonly endpointUrl: string;

  /**
   * @internal
   * @ignore
   * A reference to the auto-generated FormRecognizer HTTP client.
   */
  private readonly client: GeneratedClient;

  /**
   * Creates an instance of LayoutRecognizerClient.
   *
   * Example usage:
   * ```ts
   * import { LayoutRecognizerClient, CognitiveKeyCredential } from "@azure/ai-form-recognizer";
   *
   * const client = new LayoutRecognizerClient(
   *    "<service endpoint>",
   *    new CognitiveKeyCredential("<api key>")
   * );
   * ```
   * @param {string} endpointUrl The URL to the FormRecognizer endpoint
   * @param {TokenCredential | CognitiveKeyCredential} credential Used to authenticate requests to the service.
   * @param {FormRecognizerClientOptions} [options] Used to configure the LayoutRecognizer client.
   */
  constructor(
    endpointUrl: string,
    credential: TokenCredential | CognitiveKeyCredential,
    options: FormRecognizerClientOptions = {}
  ) {
    this.endpointUrl = endpointUrl;
    const { ...pipelineOptions } = options;

    if (!pipelineOptions.userAgentOptions) {
      pipelineOptions.userAgentOptions = {};
    }
    if (pipelineOptions.userAgentOptions.userAgentPrefix) {
      pipelineOptions.userAgentOptions.userAgentPrefix = `${pipelineOptions.userAgentOptions.userAgentPrefix} ${LIB_INFO}`;
    } else {
      pipelineOptions.userAgentOptions.userAgentPrefix = LIB_INFO;
    }

    const authPolicy = isTokenCredential(credential)
      ? bearerTokenAuthenticationPolicy(credential, DEFAULT_COGNITIVE_SCOPE)
      : signingPolicy(credential);

    const internalPipelineOptions: InternalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info,
          allowedHeaderNames: ["x-ms-correlation-request-id", "x-ms-request-id"]
        }
      }
    };

    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
    this.client = new GeneratedClient(credential, this.endpointUrl, pipeline);
  }

  public async extractLayout(
    body: FormRecognizerRequestBody,
    contentType: SupportedContentType,
    options: StartAnalyzeLayoutOptions = {}
  ): Promise<LayoutPollerLike> {
    const analyzePollerClient: ExtractPollerClient<ExtractLayoutResultResponse> = {
      beginExtract: (...args) => analyzeLayoutInternal(this.client, ...args),
      getExtractResult: (...args) => this.getExtractedLayout(...args)
    };

    const poller = new BeginExtractPoller<ExtractLayoutResultResponse>({
      client: analyzePollerClient,
      body,
      contentType,
      ...options
    });

    await poller.poll();
    return poller;
  }

  public async extractLayoutFromUrl(
    imageSourceUrl: string,
    options: StartAnalyzeLayoutOptions = {}
  ): Promise<LayoutPollerLike> {
    const body = JSON.stringify({
      source: imageSourceUrl
    });

    return this.extractLayout(body, "application/json", options);
  }

  private async getExtractedLayout(resultId: string, options?: GetExtractedLayoutResultOptions) {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "LayoutRecognizerClient-getExtractedLayoutResult",
      realOptions
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const analyzeResult = await this.client.getAnalyzeLayoutResult(resultId, requestOptions);
      return toAnalyzeLayoutResultResponse(analyzeResult);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}

async function analyzeLayoutInternal(
  client: GeneratedClient,
  body: FormRecognizerRequestBody,
  contentType: SupportedContentType,
  options?: ExtractLayoutOptions,
  _modelId?: string
): Promise<AnalyzeLayoutAsyncResponseModel> {
  const realOptions = options || {};
  const { span, updatedOptions: finalOptions } = createSpan("analyzeLayoutInternal", realOptions);

  const customHeaders: { [key: string]: string } = finalOptions.requestOptions?.customHeaders || {};
  customHeaders["Content-Type"] = contentType;
  // conform to HttpRequestBody
  const requestBody =
    (body as any)?.read && typeof ((body as any)?.read === "function")
      ? () => body as NodeJS.ReadableStream
      : body;
  try {
    return await client.analyzeLayoutAsync({
      ...operationOptionsToRequestOptionsBase(finalOptions),
      body: requestBody,
      customHeaders
    });
  } catch (e) {
    span.setStatus({
      code: CanonicalCode.UNKNOWN,
      message: e.message
    });
    throw e;
  } finally {
    span.end();
  }
}
