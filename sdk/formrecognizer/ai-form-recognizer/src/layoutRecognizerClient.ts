// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createPipelineFromOptions,
  signingPolicy,
  InternalPipelineOptions,
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";
import { LIB_INFO } from "./constants";
import { logger } from "./logger";
import { createSpan } from "./tracing";
import {
  FormRecognizerClientOptions,
  FormRecognizerOperationOptions,
  toRequestBody
} from "./common";
import { CanonicalCode } from "@opentelemetry/types";

import { FormRecognizerClient as GeneratedClient } from "./generated/formRecognizerClient";
import { FormRecognizerApiKeyCredential } from "./formRecognizerApiKeyCredential";
import { ExtractLayoutResultResponse, FormRecognizerRequestBody } from "./models";
import { toAnalyzeLayoutResultResponse } from "./transforms";
import {
  ExtractPollerClient,
  BeginExtractPoller,
  BeginExtractPollState
} from "./lro/analyze/poller";
import { PollerLike, PollOperationState } from ".";

import { FormRecognizerClientAnalyzeLayoutAsyncResponse as AnalyzeLayoutAsyncResponseModel, ContentType } from "./generated/models";

/**
 * Options for analyzing layout
 */
export type ExtractLayoutOptions = FormRecognizerOperationOptions;

/**
 * Options for the start analyzing layout operation
 */
export type BeginExtractLayoutOptions = ExtractLayoutOptions & {
  /**
   * Delay to wait until next poll, in milliseconds
   */
  intervalInMs?: number;
  /**
   * Callback to progress events triggered in the Extract Layout Long-Running-Operation (LRO)
   */
  onProgress?: (state: BeginExtractPollState<ExtractLayoutResultResponse>) => void;
  /**
   * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
   */
  resumeFrom?: string;
};

/**
 * The Long-Running-Operation (LRO) poller that allows you to wait until form layout is extracted.
 */
export type LayoutPollerLike = PollerLike<
  PollOperationState<ExtractLayoutResultResponse>,
  ExtractLayoutResultResponse
>;

/**
 * Options for retrieving extracted layout data
 */
type GetExtractedLayoutResultOptions = FormRecognizerOperationOptions;

/**
 * Client class for extracting text and table structure from documents.
 */
export class LayoutRecognizerClient {
  /**
   * The URL to the Azure Form Recognizer service endpoint
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
   * import { LayoutRecognizerClient, FormRecognizerApiKeyCredential } from "@azure/ai-form-recognizer";
   *
   * const client = new LayoutRecognizerClient(
   *    "<service endpoint>",
   *    new FormRecognizerApiKeyCredential("<api key>")
   * );
   * ```
   * @param {string} endpointUrl The URL to Azure Form Recognizer service endpoint
   * @param {FormRecognizerApiKeyCredential} credential Used to authenticate requests to the service.
   * @param {FormRecognizerClientOptions} [options] Used to configure the LayoutRecognizer client.
   */
  constructor(
    endpointUrl: string,
    credential: FormRecognizerApiKeyCredential,
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

    const authPolicy = signingPolicy(credential);

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

  /**
   * Extracts layout data, including text and table structure from documents.
   *
   * This method returns a long running operation poller that allows you to wait
   * indefinitely until the copy is completed.
   * You can also cancel a copy before it is completed by calling `cancelOperation` on the poller.
   * Note that the onProgress callback will not be invoked if the operation completes in the first
   * request, and attempting to cancel a completed copy will result in an error being thrown.
   *
   * Example usage:
   * ```ts
   * const path = "./fw4.pdf";
   * const readStream = fs.createReadStream(path);
   *
   * const client = new LayoutRecognizerClient(endpoint, new FormRecognizerApiKeyCredential(apiKey));
   * const poller = await client.beginExtractLayout(readStream, "application/pdf", {
   *   onProgress: (state) => { console.log(`status: ${state.status}`); }
   * });
   *
   * await poller.pollUntilDone();
   * const response = poller.getResult();

   * console.log(response.status);
   * console.log(response.rawExtractedPages);
   * console.log(response.extractedLayoutPages);
   * ```
   * @summary Extracts receipt information from a given document
   * @param {FormRecognizerRequestBody} source Input document
   * @param {contentType} Content type of the input
   * @param {BeginExtractLayoutOptions} [options] Options to the Begin Extract Layout operation
   */
   public async beginExtractLayout(
    source: FormRecognizerRequestBody,
    contentType?: ContentType,
    options: BeginExtractLayoutOptions = {}
  ): Promise<LayoutPollerLike> {
    const analyzePollerClient: ExtractPollerClient<ExtractLayoutResultResponse> = {
      beginExtract: (...args) => analyzeLayoutInternal(this.client, ...args),
      getExtractResult: (...args) => this.getExtractedLayout(...args)
    };

    const poller = new BeginExtractPoller<ExtractLayoutResultResponse>({
      client: analyzePollerClient,
      source,
      contentType,
      ...options
    });

    await poller.poll();
    return poller;
  }

  public async extractLayoutFromUrl(
    documentUrl: string,
    options: BeginExtractLayoutOptions = {}
  ): Promise<LayoutPollerLike> {

    return this.beginExtractLayout(documentUrl, undefined, options);
  }

  /**
   * @private
   */
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

/**
 * @internal
 */
async function analyzeLayoutInternal(
  client: GeneratedClient,
  body: FormRecognizerRequestBody,
  contentType?: ContentType,
  options?: ExtractLayoutOptions,
  _modelId?: string
): Promise<AnalyzeLayoutAsyncResponseModel> {
  const realOptions = options || {};
  const { span, updatedOptions: finalOptions } = createSpan("analyzeLayoutInternal", realOptions);
  try {
    return await client.analyzeLayoutAsync({
      contentType: contentType,
      fileStream: toRequestBody(body),
      ...operationOptionsToRequestOptionsBase(finalOptions),
    })
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
