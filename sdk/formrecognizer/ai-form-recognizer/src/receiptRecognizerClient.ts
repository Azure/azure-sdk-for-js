// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createPipelineFromOptions,
  signingPolicy,
  InternalPipelineOptions,
  isTokenCredential,
  bearerTokenAuthenticationPolicy,
  operationOptionsToRequestOptionsBase,
  HttpRequestBody
} from "@azure/core-http";
import { TokenCredential } from "@azure/identity";
import { LIB_INFO, DEFAULT_COGNITIVE_SCOPE } from "./constants";
import { logger } from "./logger";
import { AnalyzeReceiptResultResponse, ReceiptResult, RawReceiptResult, ReceiptItemField } from "./models";
import { createSpan } from "./tracing";
import { FormRecognizerClientOptions, FormRecognizerOperationOptions, SupportedContentType } from "./common";
import { CanonicalCode } from "@opentelemetry/types";

import { FormRecognizerClient as GeneratedClient } from "./generated/formRecognizerClient";
import { CognitiveKeyCredential } from "./cognitiveKeyCredential";
import { AnalyzePollerClient, StartAnalyzePoller, StartAnalyzePollState, StartAnalyzePollerOptions } from './lro/analyze/poller';
import { PollOperationState, PollerLike } from '@azure/core-lro';

import {
  GetAnalyzeReceiptResultResponse,
  DocumentResult
} from "./generated/models";

export {
  GetAnalyzeReceiptResultResponse,
  DocumentResult
}

export type ExtractReceiptOptions = FormRecognizerOperationOptions & {
  includeTextDetails?: boolean;
};

export type GetExtractedReceiptResultOptions = FormRecognizerOperationOptions;

export type StartAnalyzeOptions = ExtractReceiptOptions & {
  intervalInMs?: number;
  onProgress?: (state: StartAnalyzePollState<AnalyzeReceiptResultResponse>) => void;
  resumeFrom?: string;
}
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
   * import { ReceiptRecognizerClient, CognitiveKeyCredential } from "@azure/ai-form-recognizer";
   *
   * const client = new ReceiptRecognizerClient(
   *    "<service endpoint>",
   *    new CognitiveKeyCredential("<api key>")
   * );
   * ```
   * @param {string} endpointUrl The URL to the FormRecognizer endpoint
   * @param {TokenCredential | CognitiveKeyCredential} credential Used to authenticate requests to the service.
   * @param {FormRecognizerClientOptions} [options] Used to configure the ReceiptRecognizer client.
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

  public async extractReceipt(
    body: HttpRequestBody,
    contentType: SupportedContentType,
    options: StartAnalyzePollerOptions<AnalyzeReceiptResultResponse>
  ): Promise<PollerLike<PollOperationState<AnalyzeReceiptResultResponse>, AnalyzeReceiptResultResponse>> {

    const analyzePollerClient: AnalyzePollerClient<AnalyzeReceiptResultResponse> = {
      startAnalyze: (...args) => analyzeReceiptInternal(this.client, ...args),
      getAnalyzeResult: (...args) => this.getExtractedReceipt(...args)
    }

    const poller = new StartAnalyzePoller({
      client: analyzePollerClient,
      body,
      contentType,
      ...options
    });

    await poller.poll();
    return poller;
  }

  public async extractReceiptFromUrl(
    imageSourceUrl: string,
    options: StartAnalyzePollerOptions<AnalyzeReceiptResultResponse>
  ): Promise<PollerLike<PollOperationState<AnalyzeReceiptResultResponse>, AnalyzeReceiptResultResponse>> {
    const body = JSON.stringify({
      source: imageSourceUrl
    });

    const analyzePollerClient: AnalyzePollerClient<AnalyzeReceiptResultResponse> = {
      startAnalyze: (...args) => analyzeReceiptInternal(this.client, ...args),
      getAnalyzeResult: (...args) => this.getExtractedReceipt(...args)
    }

    const poller = new StartAnalyzePoller({
      client: analyzePollerClient,
      body,
      contentType: "application/json",
      ...options
    });

    await poller.poll();
    return poller;
  }

  private async getExtractedReceipt(
    resultId: string,
    options?: GetExtractedReceiptResultOptions
  ): Promise<AnalyzeReceiptResultResponse> {
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
      return this.toReceiptResultResponse(result);
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

  private toReceiptResultResponse(result: GetAnalyzeReceiptResultResponse): AnalyzeReceiptResultResponse {
    function toReceiptResult(result: DocumentResult): ReceiptResult {
      const rawReceipt = result as unknown as RawReceiptResult;
      return {
        docType: rawReceipt.docType,
        pageRange: rawReceipt.pageRange,
        receiptType: rawReceipt.fields.ReceiptType.valueString,
        merchantName: rawReceipt.fields.MerchantName?.valueString,
        merchantPhoneNumber: rawReceipt.fields.MerchantPhoneNumber?.valuePhoneNumber,
        merchantAddress: rawReceipt.fields.MerchantAddress?.valueString,
        items: rawReceipt.fields.Items.valueArray?.map(i => {
          return {
            name: (i as ReceiptItemField).valueObject.Name?.valueString,
            quantity: (i as ReceiptItemField).valueObject.Quantity?.valueNumber,
            totalPrice: (i as ReceiptItemField).valueObject.TotalPrice?.valueNumber
          };
        }),
        subtotal: rawReceipt.fields.Subtotal?.valueNumber,
        tax: rawReceipt.fields.Tax?.valueNumber,
        tip: rawReceipt.fields.Tip?.valueNumber,
        total: rawReceipt.fields.Total?.valueNumber,
        transactionDate: rawReceipt.fields.TransactionDate?.valueDate,
        transactionTime: rawReceipt.fields.TransactionTime?.valueTime,
        fields: rawReceipt.fields
      }
    }

    if (result.status === "succeeded") {
      return {
        status: result.status,
        createdDateTime: result.createdDateTime,
        lastUpdatedDateTime: result.lastUpdatedDateTime,
        _response: result._response,
        analyzeResult:  {
          version: result.analyzeResult!.version,
          readResults: result.analyzeResult!.readResults,
          pageResults: [], // TODO: transform result.analyzeResult!.pageResults,
          receiptResults: result.analyzeResult!.documentResults!.map(toReceiptResult)
        }
      }
    } else {
      return {
        status: result.status,
        createdDateTime: result.createdDateTime,
        lastUpdatedDateTime: result.lastUpdatedDateTime,
        _response: result._response,
      }
    };
  }
}

async function analyzeReceiptInternal(
  client: GeneratedClient,
  body: HttpRequestBody,
  contentType: SupportedContentType,
  options?: ExtractReceiptOptions,
  _modelId?: string
) {
  const realOptions = options || { includeTextDetails: false };
  const { span, updatedOptions: finalOptions } = createSpan(
    "analyzeReceiptInternal",
    realOptions
  );

  const customHeaders: { [key: string]: string } =
    finalOptions.requestOptions?.customHeaders || {};
  customHeaders["Content-Type"] = contentType;
  try {
      return await client.analyzeReceiptAsync({
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
