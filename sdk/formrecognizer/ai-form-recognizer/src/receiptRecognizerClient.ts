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
import { AnalyzeReceiptResultResponse, ReceiptResult, RawReceiptResult, ReceiptItemField, RawReceipt } from "./models";
import { createSpan } from "./tracing";
import { FormRecognizerClientOptions, FormRecognizerOperationOptions, SupportedContentType } from "./common";
import { CanonicalCode } from "@opentelemetry/types";

import { FormRecognizerClient as GeneratedClient } from "./generated/formRecognizerClient";
import { CognitiveKeyCredential } from "./cognitiveKeyCredential";
import { AnalyzePollerClient, StartAnalyzePoller, StartAnalyzePollState } from './lro/analyze/poller';
import { PollOperationState, PollerLike } from '@azure/core-lro';

import {
  GetAnalyzeReceiptResultResponse,
  DocumentResult
} from "./generated/models";

export {
  GetAnalyzeReceiptResultResponse,
  DocumentResult
}

/**
 * Options for analyzing receipts
 */
export type ExtractReceiptOptions = FormRecognizerOperationOptions & {
  includeTextDetails?: boolean;
};

type GetExtractedReceiptResultOptions = FormRecognizerOperationOptions;

/**
 * Options for the start analyzing receipt operation
 */
export type StartAnalyzeReceiptOptions = ExtractReceiptOptions & {
  intervalInMs?: number;
  onProgress?: (state: StartAnalyzePollState<AnalyzeReceiptResultResponse>) => void;
  resumeFrom?: string;
}

export type ReceiptPollerLike = PollerLike<PollOperationState<AnalyzeReceiptResultResponse>, AnalyzeReceiptResultResponse>

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
    options: StartAnalyzeReceiptOptions
  ): Promise<ReceiptPollerLike> {

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
    options: StartAnalyzeReceiptOptions
  ): Promise<ReceiptPollerLike> {
    const body = JSON.stringify({
      source: imageSourceUrl
    });

    return this.extractReceipt(body, "application/json", options);
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
      const rawReceiptFields = result.fields as unknown as RawReceipt;
      return {
        docType: rawReceipt.docType,
        pageRange: rawReceipt.pageRange,
        receiptType: rawReceiptFields.ReceiptType.valueString,
        merchantName: rawReceiptFields.MerchantName?.valueString,
        merchantPhoneNumber: rawReceiptFields.MerchantPhoneNumber?.valuePhoneNumber,
        merchantAddress: rawReceiptFields.MerchantAddress?.valueString,
        items: rawReceiptFields.Items.valueArray?.map(i => {
          return {
            name: (i as ReceiptItemField).valueObject.Name?.valueString,
            quantity: (i as ReceiptItemField).valueObject.Quantity?.valueNumber,
            totalPrice: (i as ReceiptItemField).valueObject.TotalPrice?.valueNumber
          };
        }),
        subtotal: rawReceiptFields.Subtotal?.valueNumber,
        tax: rawReceiptFields.Tax?.valueNumber,
        tip: rawReceiptFields.Tip?.valueNumber,
        total: rawReceiptFields.Total?.valueNumber,
        transactionDate: rawReceiptFields.TransactionDate?.valueDate,
        transactionTime: rawReceiptFields.TransactionTime?.valueTime,
        fields: {} // TODO: Transform from original result.fields as we re-defined `elements`
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
