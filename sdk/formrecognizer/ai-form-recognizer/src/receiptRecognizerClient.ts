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
import { ExtractReceiptResultResponse, FormRecognizerRequestBody } from "./models";
import { toReceiptResultResponse } from "./transforms";
import { createSpan } from "./tracing";
import {
  FormRecognizerClientOptions,
  FormRecognizerOperationOptions,
  toRequestBody
} from "./common";
import { CanonicalCode } from "@opentelemetry/types";

import { FormRecognizerClient as GeneratedClient } from "./generated/formRecognizerClient";
import { FormRecognizerClientAnalyzeReceiptAsyncResponse as AnalyzeReceiptAsyncResponseModel, ContentType } from "./generated/models";
import { FormRecognizerApiKeyCredential } from "./formRecognizerApiKeyCredential";
import {
  ExtractPollerClient,
  BeginExtractPoller,
  BeginExtractPollState
} from "./lro/analyze/poller";
import { PollOperationState, PollerLike } from "@azure/core-lro";

/**
 * Options for analyzing receipts
 */
export type ExtractReceiptsOptions = FormRecognizerOperationOptions & {
  includeTextDetails?: boolean;
};

type GetExtractedReceiptsOptions = FormRecognizerOperationOptions;

/**
 * Options for the start analyzing receipt operation
 */
export type BeginExtractReceiptsOptions = ExtractReceiptsOptions & {
  intervalInMs?: number;
  onProgress?: (state: BeginExtractPollState<ExtractReceiptResultResponse>) => void;
  resumeFrom?: string;
};

export type ReceiptPollerLike = PollerLike<
  PollOperationState<ExtractReceiptResultResponse>,
  ExtractReceiptResultResponse
>;

/**
 * Client class for interacting with Azure Form Recognizer.
 */
export class ReceiptRecognizerClient {
  /**
   * The URL to the FormRecognizer endpoint
   */
  public readonly endpointUrl: string;

  /**
   * @internal
   * @ignore
   * A reference to the auto-generated FormRecognizer HTTP client.
   */
  private readonly client: GeneratedClient;

  /**
   * Creates an instance of ReceiptRecognizerClient.
   *
   * Example usage:
   * ```ts
   * import { ReceiptRecognizerClient, FormRecognizerApiKeyCredential } from "@azure/ai-form-recognizer";
   *
   * const client = new ReceiptRecognizerClient(
   *    "<service endpoint>",
   *    new FormRecognizerApiKeyCredential("<api key>")
   * );
   * ```
   * @param {string} endpointUrl The URL to the FormRecognizer endpoint
   * @param {TokenCredential | FormRecognizerApiKeyCredential} credential Used to authenticate requests to the service.
   * @param {FormRecognizerClientOptions} [options] Used to configure the ReceiptRecognizer client.
   */
  constructor(
    endpointUrl: string,
    credential: TokenCredential | FormRecognizerApiKeyCredential,
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

  public async extractReceipts(
    source: FormRecognizerRequestBody,
    contentType?: ContentType,
    options: BeginExtractReceiptsOptions = {}
  ): Promise<ReceiptPollerLike> {
    const analyzePollerClient: ExtractPollerClient<ExtractReceiptResultResponse> = {
      beginExtract: (...args) => analyzeReceiptInternal(this.client, ...args),
      getExtractResult: (...args) => this.getExtractedReceipts(...args)
    };

    const poller = new BeginExtractPoller({
      client: analyzePollerClient,
      source: source,
      contentType,
      ...options
    });

    await poller.poll();
    return poller;
  }

  public async extractReceiptsFromUrl(
    documentUrl: string,
    options: BeginExtractReceiptsOptions = {}
  ): Promise<ReceiptPollerLike> {

    return this.extractReceipts(documentUrl, undefined, options);
  }

  private async getExtractedReceipts(
    resultId: string,
    options?: GetExtractedReceiptsOptions
  ): Promise<ExtractReceiptResultResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "ReceiptRecognizerClient-getExtractedReceipt",
      realOptions
    );

    try {
      const result = await this.client.getAnalyzeReceiptResult(
        resultId,
        operationOptionsToRequestOptionsBase(finalOptions)
      );
      return toReceiptResultResponse(result);
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

async function analyzeReceiptInternal(
  client: GeneratedClient,
  body: FormRecognizerRequestBody,
  contentType?: ContentType,
  options?: ExtractReceiptsOptions,
  _modelId?: string
): Promise<AnalyzeReceiptAsyncResponseModel> {
  const realOptions = options || { includeTextDetails: false };
  const { span, updatedOptions: finalOptions } = createSpan("analyzeReceiptInternal", realOptions);
  try {
    return await client.analyzeReceiptAsync({
      contentType: contentType,
      fileStream: toRequestBody(body),
      ...operationOptionsToRequestOptionsBase(finalOptions),
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
