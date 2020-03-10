// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createPipelineFromOptions,
  signingPolicy,
  InternalPipelineOptions,
  isTokenCredential,
  bearerTokenAuthenticationPolicy,
  operationOptionsToRequestOptionsBase,
  HttpRequestBody,
  delay
} from "@azure/core-http";
import { TokenCredential } from "@azure/identity";
import { LIB_INFO, DEFAULT_COGNITIVE_SCOPE } from "./constants";
import { logger } from "./logger";
import { createSpan } from "./tracing";
import { FormRecognizerClientOptions, FormRecognizerOperationOptions, SupportedContentType } from "./common";
import { CanonicalCode } from "@opentelemetry/types";

import { FormRecognizerClient as GeneratedClient } from "./generated/formRecognizerClient";
import { CognitiveKeyCredential } from "./cognitiveKeyCredential";
import { AnalyzeLayoutResultResponse, AnalyzeLayoutResult } from './models';
import { AnalyzePollerClient, StartAnalyzePoller, StartAnalyzePollState } from './lro/analyze/poller';
import { PollerLike, PollOperationState } from '.';

import {
  AnalyzeResult as AnalyzeResultModel,
  AnalyzeLayoutAsyncResponse as AnalyzeLayoutAsyncResponseModel,
  GetAnalyzeLayoutResultResponse,
} from "./generated/models";

export {
  AnalyzeResultModel,
  AnalyzeLayoutAsyncResponseModel
}

/**
 * Options for analyzing layout
 */
export type ExtractLayoutOptions = FormRecognizerOperationOptions;

/**
 * Options for the start analyzing layout operation
 */
export type StartAnalyzeLayoutOptions = ExtractLayoutOptions & {
  intervalInMs?: number;
  onProgress?: (state: StartAnalyzePollState<AnalyzeLayoutResultResponse>) => void;
  resumeFrom?: string;
}

export type LayoutPollerLike = PollerLike<PollOperationState<AnalyzeLayoutResultResponse>, AnalyzeLayoutResultResponse>

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
    body: HttpRequestBody,
    contentType: SupportedContentType,
    options: StartAnalyzeLayoutOptions
  ): Promise<LayoutPollerLike> {

    const analyzePollerClient: AnalyzePollerClient<AnalyzeLayoutResultResponse> = {
      startAnalyze: (...args) => analyzeLayoutInternal(this.client, ...args),
      getAnalyzeResult: (...args) => this.getExtractedLayout(...args)
    }

    const poller = new StartAnalyzePoller<AnalyzeLayoutResultResponse>({
      client: analyzePollerClient,
      body,
      contentType,
      ...options
    });

    await poller.poll();
    return poller;
  }

  public async extractLayoutFromUrl(imageSourceUrl: string,
    options: StartAnalyzeLayoutOptions
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
      let analyzeResult: GetAnalyzeLayoutResultResponse;
      do {
        analyzeResult = await this.client.getAnalyzeLayoutResult(resultId, requestOptions);
        if (analyzeResult.status !== "succeeded" && analyzeResult.status !== "failed") {
          delay(2000); // TODO: internal polling or LRO
        }
      } while (analyzeResult.status !== "succeeded" && analyzeResult.status !== "failed");

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

function  toAnalyzeLayoutResultResponse(original: GetAnalyzeLayoutResultResponse): AnalyzeLayoutResultResponse {
  function toAnalyzeLayoutResult(model?: AnalyzeResultModel): AnalyzeLayoutResult | undefined {
    if (!model){
      return undefined;
    }
    return {
      version: model.version,
      readResults: model.readResults,
      pageResults: [] // TODO: transform original page results
    }
  }

  if (original.status === "succeeded") {
    return {
      status: original.status,
      createdDateTime: original.createdDateTime,
      lastUpdatedDateTime: original.lastUpdatedDateTime,
      analyzeResult: toAnalyzeLayoutResult(original.analyzeResult),
      _response: original._response
    }
  } else {
    return {
      status: original.status,
      createdDateTime: original.createdDateTime,
      lastUpdatedDateTime: original.lastUpdatedDateTime,
      _response: original._response
    }
  }
}

async function analyzeLayoutInternal(
  client: GeneratedClient,
  body: HttpRequestBody,
  contentType: SupportedContentType,
  options?: ExtractLayoutOptions,
  _modelId?: string
): Promise<AnalyzeLayoutAsyncResponseModel> {
  const realOptions = options || {};
  const { span, updatedOptions: finalOptions } = createSpan(
    "analyzeLayoutInternal",
    realOptions
  );

  const customHeaders: { [key: string]: string } =
    finalOptions.requestOptions?.customHeaders || {};
  customHeaders["Content-Type"] = contentType;
  try {
    return await client.analyzeLayoutAsync({
      ...operationOptionsToRequestOptionsBase(finalOptions),
      body,
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
