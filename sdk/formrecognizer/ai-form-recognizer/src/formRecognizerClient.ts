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
import { SDK_VERSION, DEFAULT_COGNITIVE_SCOPE } from "./constants";
import { logger } from "./logger";
import {
  GetAnalyzeLayoutResultResponse,
  GetAnalyzeReceiptResultResponse as GetAnalyzeReceiptResultResponseModel,
  GetAnalyzeReceiptResultResponse,
  DocumentResult
} from "./generated/models";
import { AnalyzeReceiptResultResponse, ReceiptResult, RawReceiptResult, ReceiptItemField, FieldValue } from "./models";
import { createSpan } from "./tracing";
import { FormRecognizerClientOptions, FormRecognizerOperationOptions, SupportedContentType } from "./common";
import { CanonicalCode } from "@opentelemetry/types";

import { FormRecognizerClient as GeneratedClient } from "./generated/formRecognizerClient";
import { CognitiveKeyCredential } from "./cognitiveKeyCredential";

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

    const libInfo = `azsdk-js-ai-formrecognizer/${SDK_VERSION}`;
    if (!pipelineOptions.userAgentOptions) {
      pipelineOptions.userAgentOptions = {};
    }
    if (pipelineOptions.userAgentOptions.userAgentPrefix) {
      pipelineOptions.userAgentOptions.userAgentPrefix = `${pipelineOptions.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      pipelineOptions.userAgentOptions.userAgentPrefix = libInfo;
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
    options?: ExtractReceiptOptions
  ): Promise<AnalyzeReceiptResultResponse> {
    const realOptions = options || { includeTextDetails: false };
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormRecognizerClient-extractReceipt",
      realOptions
    );

    const customHeaders: { [key: string]: string } =
      finalOptions.requestOptions?.customHeaders || {};
    customHeaders["Content-Type"] = contentType;
    try {
      const analyzeResult = await this.client.analyzeReceiptAsync({
        ...operationOptionsToRequestOptionsBase(finalOptions),
        body,
        customHeaders
      });
      const lastSlashIndex = analyzeResult.operationLocation.lastIndexOf("/");
      const resultId = analyzeResult.operationLocation.substring(lastSlashIndex + 1);

      let result: GetAnalyzeReceiptResultResponseModel;
      do {
        result = await this.client.getAnalyzeReceiptResult(resultId, {
          abortSignal: finalOptions.abortSignal
        });
        if (result.status !== "succeeded" && result.status !== "failed") {
          delay(2000); // TODO: internal polling or LRO
        }
      } while (result.status !== "succeeded" && result.status !== "failed");

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

  public async extractReceiptFromUrl(
    imageSourceUrl: string,
    options?: ExtractReceiptOptions
  ): Promise<AnalyzeReceiptResultResponse> {
    const realOptions = options || { includeTextDetails: false };
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormRecognizerClient-extractReceiptFromUrl",
      realOptions
    );

    const customHeaders: { [key: string]: string } =
      finalOptions.requestOptions?.customHeaders || {};
    customHeaders["Content-Type"] = "application/json";
    const body = JSON.stringify({
      source: imageSourceUrl
    });
    try {
      const analyzeResult = await this.client.analyzeReceiptAsync({
        ...operationOptionsToRequestOptionsBase(finalOptions),
        body,
        customHeaders
      });
      const lastSlashIndex = analyzeResult.operationLocation.lastIndexOf("/");
      const resultId = analyzeResult.operationLocation.substring(lastSlashIndex + 1);

      let result: GetAnalyzeReceiptResultResponseModel;
      do {
        result = await this.client.getAnalyzeReceiptResult(resultId, {
          abortSignal: finalOptions.abortSignal
        });
        if (result.status !== "succeeded" && result.status !== "failed") {
          delay(2000); // TODO: internal polling or LRO
        }
      } while (result.status !== "succeeded" && result.status !== "failed");

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
    return {
      docType: rawReceipt.docType,
      pageRange: rawReceipt.pageRange,
      receiptType: rawReceipt.fields.ReceiptType.valueString,
      merchantName: rawReceipt.fields.MerchantName?.valueString,
      merchantPhoneNumber: rawReceipt.fields.MerchantPhoneNumber?.valuePhoneNumber,
      merchantAddress: rawReceipt.fields.MerchantAddress?.valueString,
      items: rawReceipt.fields.Items.valueArray?.map(i => {
        return {
          name: (i as ReceiptItemField).valueObject.Name.valueString,
          quantity: (i as ReceiptItemField).valueObject.Quantity?.valueNumber,
          totalPrice: (i as ReceiptItemField).valueObject.TotalPrice?.valueNumber
        };}),
      subtotal: rawReceipt.fields.Subtotal?.valueNumber,
      tax: rawReceipt.fields.Tax?.valueNumber,
      total: rawReceipt.fields.Total?.valueNumber,
      transactionDate: rawReceipt.fields.TransactionDate?.valueDate,
      transactionTime: rawReceipt.fields.TransactionTime?.valueTime,
      rawReciptFields: result.fields as { [propertyName: string]: FieldValue }
    }
  }
  return {
    status: result.status,
    createdDateTime: result.createdDateTime,
    lastUpdatedDateTime: result.lastUpdatedDateTime,
    _response: result._response,
    analyzeResult: {
      version: result.analyzeResult!.version,
      readResults: result.analyzeResult!.readResults,
      pageResults: result.analyzeResult!.pageResults,
      receiptResults: result!.analyzeResult!.documentResults!.map(toReceiptResult)
    }};
  }

  public async extractLayout(
    body: HttpRequestBody,
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
