// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createPipelineFromOptions,
  signingPolicy,
  InternalPipelineOptions,
  isTokenCredential,
  bearerTokenAuthenticationPolicy,
  operationOptionsToRequestOptionsBase,
  delay
} from "@azure/core-http";
import { TokenCredential } from "@azure/identity";
import { LIB_INFO, DEFAULT_COGNITIVE_SCOPE } from "./constants";
import { logger } from "./logger";
import {
  GetAnalyzeLayoutResultResponse,
  GetAnalyzeReceiptResultResponse,
  DocumentResult
} from "./generated/models";
import { AnalyzeReceiptResultResponse, ReceiptResult, RawReceiptResult, ReceiptItemField, RawReceipt, FormRecognizerRequestBody, toReadResult } from "./models";
import { createSpan } from "./tracing";
import { FormRecognizerClientOptions, FormRecognizerOperationOptions, SupportedContentType } from "./common";
import { CanonicalCode } from "@opentelemetry/types";

import { FormRecognizerClient as GeneratedClient } from "./generated/formRecognizerClient";
import { CognitiveKeyCredential } from "./cognitiveKeyCredential";
import { StartAnalyzePollerOptions, AnalyzePollerClient, StartAnalyzePoller } from './lro/analyze/poller';
import { PollerLike, PollOperationState } from '@azure/core-lro';

export type ExtractReceiptOptions = FormRecognizerOperationOptions & {
  includeTextDetails?: boolean;
};

export type ExtractLayoutOptions = FormRecognizerOperationOptions & {};

export type GetExtractedReceiptResultOptions = FormRecognizerOperationOptions;

export type GetExtractedLayoutResultOptions = FormRecognizerOperationOptions;

/**
 * Client class for interacting with Azure Form Recognizer.
 */
export class FormRecognizerClient {
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
   * Creates an instance of FormRecognizerClient.
   *
   * Example usage:
   * ```ts
   * import { FormRecognizerClient, CognitiveKeyCredential } from "@azure/ai-form-recognizer";
   *
   * const client = new FormRecognizerClient(
   *    "<service endpoint>",
   *    new CognitiveKeyCredential("<api key>")
   * );
   * ```
   * @param {string} endpointUrl The URL to the FormRecognizer endpoint
   * @param {TokenCredential | CognitiveKeyCredential} credential Used to authenticate requests to the service.
   * @param {FormRecognizerClientOptions} [options] Used to configure the FormRecognizer client.
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
    body: FormRecognizerRequestBody,
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


  public async getExtractedReceipt(
    resultId: string,
    options?: GetExtractedReceiptResultOptions
  ): Promise<AnalyzeReceiptResultResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormRecognizerClient-getExtractedReceipt",
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
        fields: {} // TODO: Transform from result.fields as we re-defined `elements`
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
          receiptResults: result.analyzeResult!.documentResults!.map(toReceiptResult), // TODO: Transform from original result.fields as we re-defined `elements`
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

  public async extractLayout(
    body: FormRecognizerRequestBody,
    contentType: SupportedContentType,
    options?: ExtractLayoutOptions
  ) {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormRecognizerClient-extractLayout",
      realOptions
    );

    const customHeaders: { [key: string]: string } =
      finalOptions.requestOptions?.customHeaders || {};
    customHeaders["Content-Type"] = contentType;
    try {
      const result = await this.client.analyzeLayoutAsync({
        ...operationOptionsToRequestOptionsBase(finalOptions),
        body,
        customHeaders
      });
      const lastSlashIndex = result.operationLocation.lastIndexOf("/");
      const resultId = result.operationLocation.substring(lastSlashIndex + 1);

      let analyzeResult: GetAnalyzeLayoutResultResponse;
      do {
        analyzeResult = await this.client.getAnalyzeLayoutResult(resultId, {
          abortSignal: finalOptions.abortSignal
        });
        if (analyzeResult.status !== "succeeded" && analyzeResult.status !== "failed") {
          delay(2000); // TODO: internal polling or LRO
        }
      } while (analyzeResult.status !== "succeeded" && analyzeResult.status !== "failed");

      return analyzeResult;
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

  public async extractLayoutFromUrl(imageSourceUrl: string, options?: ExtractLayoutOptions) {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormRecognizerClient-extractLayoutFromUrl",
      realOptions
    );

    const customHeaders: { [key: string]: string } =
      finalOptions.requestOptions?.customHeaders || {};
    customHeaders["Content-Type"] = "application/json";
    const body = JSON.stringify({
      source: imageSourceUrl
    });
    try {
      const result = await this.client.analyzeLayoutAsync({
        ...operationOptionsToRequestOptionsBase(finalOptions),
        body,
        customHeaders
      });
      const lastSlashIndex = result.operationLocation.lastIndexOf("/");
      const resultId = result.operationLocation.substring(lastSlashIndex + 1);

      let analyzeResult: GetAnalyzeLayoutResultResponse;
      do {
        analyzeResult = await this.client.getAnalyzeLayoutResult(resultId, {
          abortSignal: finalOptions.abortSignal
        });
        if (analyzeResult.status !== "succeeded" && analyzeResult.status !== "failed") {
          delay(2000); // TODO: internal polling or LRO
        }
      } while (analyzeResult.status !== "succeeded" && analyzeResult.status !== "failed");

      return analyzeResult;
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

  public async getExtractedLayout(resultId: string, options?: GetExtractedLayoutResultOptions) {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormRecognizerClient-getExtractedLayoutResult",
      realOptions
    );

    try {
      const result = await this.client.getAnalyzeLayoutResult(
        resultId,
        operationOptionsToRequestOptionsBase(finalOptions)
      );
      return result;
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
