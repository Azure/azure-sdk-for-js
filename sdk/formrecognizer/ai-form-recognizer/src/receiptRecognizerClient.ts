// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createPipelineFromOptions,
  signingPolicy,
  InternalPipelineOptions,
  isTokenCredential,
  bearerTokenAuthenticationPolicy,
  operationOptionsToRequestOptionsBase,
} from "@azure/core-http";
import { TokenCredential } from "@azure/identity";
import { LIB_INFO, DEFAULT_COGNITIVE_SCOPE } from "./constants";
import { logger } from "./logger";
import { ExtractReceiptResultResponse, ReceiptResult, RawReceiptResult, ReceiptItemField, RawReceipt, FormRecognizerRequestBody} from "./models";
import { toReadResult } from "./transforms";
import { createSpan } from "./tracing";
import { FormRecognizerClientOptions, FormRecognizerOperationOptions, SupportedContentType } from "./common";
import { CanonicalCode } from "@opentelemetry/types";

import { FormRecognizerClient as GeneratedClient } from "./generated/formRecognizerClient";
import { CognitiveKeyCredential } from "./cognitiveKeyCredential";
import { ExtractPollerClient, BeginExtractPoller, BeginExtractPollState } from './lro/analyze/poller';
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
}

export type ReceiptPollerLike = PollerLike<PollOperationState<ExtractReceiptResultResponse>, ExtractReceiptResultResponse>

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

  public async extractReceipts(
    body: FormRecognizerRequestBody,
    contentType: SupportedContentType,
    options: BeginExtractReceiptsOptions = {}
  ): Promise<ReceiptPollerLike> {

    const analyzePollerClient: ExtractPollerClient<ExtractReceiptResultResponse> = {
      beginExtract: (...args) => analyzeReceiptInternal(this.client, ...args),
      getExtractResult: (...args) => this.getExtractedReceipts(...args)
    }

    const poller = new BeginExtractPoller({
      client: analyzePollerClient,
      body,
      contentType,
      ...options
    });

    await poller.poll();
    return poller;
  }

  public async extractReceiptsFromUrl(
    imageSourceUrl: string,
    options: BeginExtractReceiptsOptions = {}
  ): Promise<ReceiptPollerLike> {
    const body = JSON.stringify({
      source: imageSourceUrl
    });

    return this.extractReceipts(body, "application/json", options);
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

  private toReceiptResultResponse(result: GetAnalyzeReceiptResultResponse): ExtractReceiptResultResponse {
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
        createdOn: result.createdOn,
        lastUpdatedOn: result.lastUpdatedOn,
        _response: result._response,
        analyzeResult:  {
          version: result.analyzeResult!.version,
          readResults: result.analyzeResult!.readResults.map(toReadResult),
          receiptResults: result.analyzeResult!.documentResults!.map(toReceiptResult)
        }
      }
    } else {
      return {
        status: result.status,
        createdOn: result.createdOn,
        lastUpdatedOn: result.lastUpdatedOn,
        _response: result._response,
      }
    };
  }
}

async function analyzeReceiptInternal(
  client: GeneratedClient,
  body: FormRecognizerRequestBody,
  contentType: SupportedContentType,
  options?: ExtractReceiptsOptions,
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
  // conform to HttpRequestBody
  const requestBody = (body as any)?.read && typeof((body as any)?.read === "function") ? () => body as NodeJS.ReadableStream : body;
  try {
    return await client.analyzeReceiptAsync({
      ...operationOptionsToRequestOptionsBase(finalOptions),
      requestBody,
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
