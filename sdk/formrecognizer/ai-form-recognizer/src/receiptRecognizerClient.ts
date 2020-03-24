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
 * Options for extract receipt operation
 */
export type ExtractReceiptsOptions = FormRecognizerOperationOptions & {
  /**
   * Specifies whether to include text lines and element references in the result
   */
  includeTextDetails?: boolean;
};

/**
 * Options for retrieving extracted receipt data
 */
type GetExtractedReceiptsOptions = FormRecognizerOperationOptions;

/**
 * Options for Begin Analyze Receipt operation
 */
export type BeginExtractReceiptsOptions = ExtractReceiptsOptions & {
  /**
   * Delay to wait until next poll, in milliseconds
   */
  intervalInMs?: number;
  /**
   * Callback to progress events triggered in the Extract Receipt Long-Running-Operation (LRO)
   */
  onProgress?: (state: BeginExtractPollState<ExtractReceiptResultResponse>) => void;
  /**
   * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
   */
  resumeFrom?: string;
};

/**
 * The Long-Running-Operation (LRO) poller that allows you to wait until receipt(s) are extracted.
 */
export type ReceiptPollerLike = PollerLike<
  PollOperationState<ExtractReceiptResultResponse>,
  ExtractReceiptResultResponse
>;

/**
 * Client class for extracting receipt data from documents.
 */
export class ReceiptRecognizerClient {
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
   * @param {string} endpointUrl The URL to Azure Form Recognizer service endpoint
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

  /**
   * Extracts data from receipts using pre-built receipt model, enabling you to extract structure data
   * from receipts such as merchant name, merchant phone number, transaction date, and more.
   *
   * This method returns a long running operation poller that allows you to wait
   * indefinitely until the copy is completed.
   * You can also cancel a copy before it is completed by calling `cancelOperation` on the poller.
   * Note that the onProgress callback will not be invoked if the operation completes in the first
   * request, and attempting to cancel a completed copy will result in an error being thrown.
   *
   * Example usage:
   * ```ts
   * const path = "./contoso-allinone.jpg";
   * const readStream = fs.createReadStream(path);

   * const client = new ReceiptRecognizerClient(endpoint, new FormRecognizerApiKeyCredential(apiKey));
   * const poller = await client.beginExtractReceipts(readStream, "image/jpeg", {
       onProgress: (state) => { console.log(`status: ${state.status}`); }
   * });

   * await poller.pollUntilDone();
   * const response = poller.getResult();

   * console.log("### First receipt:")
   * console.log(response.extractedReceipts[0]);
   * console.log("### Items:")
   * console.log(`   \t Quantity\tName\tPrice\tTotalPrice`);
   * let i = 1;
   * for (const item of response.extractedReceipts[0]?.items) {
   *   console.log(`${i++})\t ${item.quantity || ""}\t${item.name}\t$${item.totalPrice}`);
   * }
   * console.log("### Raw 'MerchantAddress' fields:");
   * console.log(response.extractedReceipts[0]?.fields["MerchantAddress"])
   * ```
   * @summary Extracts receipt information from a given document
   * @param {FormRecognizerRequestBody} source Input document
   * @param {contentType} Content type of the input
   * @param {BeginExtractReceiptsOptions} [options] Options to the Begin Extract Receipts operation
   */
  public async beginExtractReceipts(
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

  /**
   * Extracts receipt information from a url using pre-built receipt model, enabling you to extract structure data
   * from receipts such as merchant name, merchant phone number, transaction date, and more.
   *
   * This method returns a long running operation poller that allows you to wait
   * indefinitely until the copy is completed.
   * You can also cancel a copy before it is completed by calling `cancelOperation` on the poller.
   * Note that the onProgress callback will not be invoked if the operation completes in the first
   * request, and attempting to cancel a completed copy will result in an error being thrown.
   *
   * Example usage:
   * ```ts
   * const client = new ReceiptRecognizerClient(endpoint, new FormRecognizerApiKeyCredential(apiKey));
   * const poller = await client.beginExtractReceiptsFromUrl(
   *   imageUrl, {
   *     includeTextDetails: true,
   *     onProgress: (state) => { console.log(`analyzing status: ${state.status}`); }
   * });
   * await poller.pollUntilDone();
   * const response = poller.getResult();

   * console.log("### First receipt:")
   * console.log(response.extractedReceipts[0]);
   * console.log("### Items:")
   * console.log(`   \t Quantity\tName\tPrice\tTotalPrice`);
   * let i = 1;
   * for (const item of response.extractedReceipts[0]?.items) {
   *   console.log(`${i++})\t ${item.quantity || ""}\t${item.name}\t$${item.totalPrice}`);
   * }
   * console.log("### Raw 'MerchantAddress' fields:");
   * console.log(response.extractedReceipts[0]?.fields["MerchantAddress"])
   * ```
   * @summary Extracts receipt information from a given accessible url to input document
   * @param {string} documentUrl url to the input document
   * @param {BeginExtractReceiptsOptions} [options] Options to the Begin Extract Receipts operation
   */
  public async beginExtractReceiptsFromUrl(
    documentUrl: string,
    options: BeginExtractReceiptsOptions = {}
  ): Promise<ReceiptPollerLike> {

    return this.beginExtractReceipts(documentUrl, undefined, options);
  }

  /**
   * @internal
   */
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

/**
 * @internal
 */
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
