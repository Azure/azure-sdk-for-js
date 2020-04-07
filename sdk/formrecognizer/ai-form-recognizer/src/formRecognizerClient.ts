// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createPipelineFromOptions,
  signingPolicy,
  InternalPipelineOptions,
  operationOptionsToRequestOptionsBase,
  AbortSignalLike
} from "@azure/core-http";
import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import { createSpan } from "./tracing";
import {
  FormRecognizerClientOptions,
  FormRecognizerOperationOptions,
  toRequestBody,
  getContentType
} from "./common";
import { CanonicalCode } from "@opentelemetry/types";

import { FormRecognizerClient as GeneratedClient } from "./generated/formRecognizerClient";
import {
  FormRecognizerClientAnalyzeWithCustomModelResponse as AnalyzeWithCustomModelResponseModel,
  FormRecognizerClientAnalyzeLayoutAsyncResponse as AnalyzeLayoutAsyncResponseModel,
  FormRecognizerClientAnalyzeReceiptAsyncResponse as AnalyzeReceiptAsyncResponseModel,
  ContentType,
} from "./generated/models";
import { FormRecognizerApiKeyCredential } from "./formRecognizerApiKeyCredential";
import { PollOperationState, PollerLike } from "@azure/core-lro";
import {
  ExtractPollerClient,
  BeginExtractPoller,
  BeginExtractPollState,
  ExtractOptions
} from "./lro/analyze/poller";
import {
  ExtractLayoutResultResponse,
  ExtractFormResultResponse,
  LabeledFormResultResponse,
  ExtractReceiptResultResponse,
  FormRecognizerRequestBody
} from "./models";
import {
  toCustomFormResultResponse,
  toLabeledFormResultResponse,
  toAnalyzeLayoutResultResponse,
  toReceiptResultResponse
} from "./transforms";
import { FormTrainingClient } from "./formTrainingClient";

export {
  ContentType
};

export { PollOperationState, PollerLike };

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
 * Options for analyzing of forms
 */
export type ExtractFormsOptions = FormRecognizerOperationOptions & {
  /**
   * Specifies whether to include text lines and element references in the result
   */
  includeTextDetails?: boolean;
};

/**
 * Options for starting analyzing form operation
 */
export type BeginExtractFormsOptions = ExtractFormsOptions & {
  /**
   * Delay to wait until next poll, in milliseconds
   */
  intervalInMs?: number;
  /**
   * Callback to progress events triggered in the Extract Form Long-Running-Operation (LRO)
   */
  onProgress?: (state: BeginExtractPollState<ExtractFormResultResponse>) => void;
  /**
   * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
   */
  resumeFrom?: string;
};

/**
 * Options for starting analyzing form operation
 */
export type BeginExtractLabeledFormOptions = ExtractFormsOptions & {
  /**
   * Delay to wait until next poll, in milliseconds
   */
  intervalInMs?: number;
  /**
   * Callback to progress events triggered in the Extract Labeled Form Long-Running-Operation (LRO)
   */
  onProgress?: (state: BeginExtractPollState<LabeledFormResultResponse>) => void;
  /**
   * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
   */
  resumeFrom?: string;
};

/**
 * Result type of the Extract Form Long-Running-Operation (LRO)
 */
export type FormPollerLike = PollerLike<
  PollOperationState<ExtractFormResultResponse>,
  ExtractFormResultResponse
>;

/**
 * Result of the Extract Labeled Form Long-Running-Operation (LRO)
 */
export type LabeledFormPollerLike = PollerLike<
  PollOperationState<LabeledFormResultResponse>,
  LabeledFormResultResponse
>;

/**
 * Options for retrieving result of Extract Form operation
 */
type GetExtractedFormsOptions = FormRecognizerOperationOptions;

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
 * Client class for interacting with Azure Form Recognizer.
 */
export class FormRecognizerClient {
  /**
   * The URL to Azure Form Recognizer service endpoint
   */
  public readonly endpointUrl: string;

  /**
   * @internal
   * @ignore
   */
  private readonly credential: FormRecognizerApiKeyCredential;

  /**
   * @internal
   * @ignore
   * A reference to the auto-generated FormRecognizer HTTP client.
   */
  private readonly client: GeneratedClient;

  /**
   * Creates an instance of CustomFormRecognizerClient.
   *
   * Example usage:
   * ```ts
   * import { CustomFormRecognizerClient, FormRecognizerApiKeyCredential } from "@azure/ai-form-recognizer";
   *
   * const client = new CustomFormRecognizerClient(
   *    "<service endpoint>",
   *    new FormRecognizerApiKeyCredential("<api key>")
   * );
   * ```
   * @param {string} endpointUrl The URL to Azure Form Recognizer service endpoint
   * @param {FormRecognizerApiKeyCredential} credential Used to authenticate requests to the service.
   * @param {FormRecognizerClientOptions} [options] Used to configure the FormRecognizer client.
   */
  constructor(
    endpointUrl: string,
    credential: FormRecognizerApiKeyCredential,
    options: FormRecognizerClientOptions = {}
  ) {
    this.endpointUrl = endpointUrl;
    this.credential = credential;
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
   * Creates an instance of {@link FormTrainingClient}.
   */
  public getFormTrainingClient(): FormTrainingClient {
    return new FormTrainingClient(this.endpointUrl, this.credential);
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
   * @param {contentType} Content type of the input. Supported types are "application/pdf", "image/jpeg", "image/png", and "image/tiff";
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
      "FormRecognizerClient-getExtractedLayoutResult",
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
  /**
   * Extracts name-value pairs and tables from a given document using a model from unsupervised training.
   * This method returns a long running operation poller that allows you to wait
   * indefinitely until the copy is completed.
   * You can also cancel a copy before it is completed by calling `cancelOperation` on the poller.
   * Note that the onProgress callback will not be invoked if the operation completes in the first
   * request, and attempting to cancel a completed copy will result in an error being thrown.
   *
   * Example usage:
   * ```ts
   *   const path = "./Invoice_6.pdf";
   *   const readStream = fs.createReadStream(path);
   *
   *   const client = new FormRecognizerClient(endpoint, new FormRecognizerApiKeyCredential(apiKey));
   *   const poller = await client.beginExtractForms(modelId, readStream, "application/pdf", {
   *     onProgress: (state) => { console.log(`status: ${state.status}`); }
   *   });
   *   await poller.pollUntilDone();
   *   const response = poller.getResult();
   *   console.log(response.status);
   * ```
   * @summary Extracts form information from a given document using unlabeled model.
   * @param {string} modelId Id of the model to use
   * @param {FormRecognizerRequestBody} body Input document
   * @param {contentType} Content type of the input. Supported types are "application/pdf", "image/jpeg", "image/png", and "image/tiff";
   * @param {BeginExtractFormsOptions} [options] Options to the BeginExtractForms operation
   */
  public async beginExtractForms(
    modelId: string,
    body: FormRecognizerRequestBody,
    contentType?: ContentType,
    options: BeginExtractFormsOptions = {}
  ): Promise<FormPollerLike> {
    if (!modelId) {
      throw new RangeError("Invalid model id");
    }
    const analyzePollerClient: ExtractPollerClient<ExtractFormResultResponse> = {
      beginExtract: (
        body: FormRecognizerRequestBody,
        contentType?: ContentType,
        analyzeOptions: ExtractOptions = {},
        modelId?: string
      ) => analyzeCustomFormInternal(this.client, body, contentType, analyzeOptions, modelId!),
      getExtractResult: (resultId: string, options: { abortSignal?: AbortSignalLike }) =>
        this.getExtractedForm(modelId, resultId, options)
    };

    const poller = new BeginExtractPoller({
      client: analyzePollerClient,
      modelId,
      source: body,
      contentType,
      ...options
    });

    await poller.poll();
    return poller;
  }

  public async beginExtractFormsFromUrl(
    modelId: string,
    documentUrl: string,
    options: BeginExtractFormsOptions = {}
  ): Promise<PollerLike<PollOperationState<ExtractFormResultResponse>, ExtractFormResultResponse>> {
    if (!modelId) {
      throw new RangeError("Invalid modelId");
    }
    return this.beginExtractForms(modelId, documentUrl, undefined, options);
  }

  private async getExtractedForm(
    modelId: string,
    resultId: string,
    options?: GetExtractedFormsOptions
  ): Promise<ExtractFormResultResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormRecognizerClient-getExtractedForm",
      realOptions
    );

    try {
      const result = await this.client.getAnalyzeFormResult(
        modelId,
        resultId,
        operationOptionsToRequestOptionsBase(finalOptions)
      );
      return toCustomFormResultResponse(result);
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

  private async getExtractedLabeledForms(
    modelId: string,
    resultId: string,
    options?: GetExtractedFormsOptions
  ): Promise<LabeledFormResultResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormRecognizerClient-getExtractedLabeledForm",
      realOptions
    );

    try {
      const result = await this.client.getAnalyzeFormResult(
        modelId,
        resultId,
        operationOptionsToRequestOptionsBase(finalOptions)
      );
      return toLabeledFormResultResponse(result);
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

  /**
   * Extracts name-value pairs and tables from a given document using a model from supervised training with labels.
   * This method returns a long running operation poller that allows you to wait
   * indefinitely until the copy is completed.
   * You can also cancel a copy before it is completed by calling `cancelOperation` on the poller.
   * Note that the onProgress callback will not be invoked if the operation completes in the first
   * request, and attempting to cancel a completed copy will result in an error being thrown.
   *
   * Example usage:
   * ```ts
   *   const path = "./Invoice_6.pdf";
   *   const readStream = fs.createReadStream(path);
   *
   *   const client = new FormRecognizerClient(endpoint, new FormRecognizerApiKeyCredential(apiKey));
   *   const poller = await client.beginExtractLabeledForms(modelId, readStream, "application/pdf", {
   *     onProgress: (state) => { console.log(`status: ${state.status}`); }
   *   });
   *   await poller.pollUntilDone();
   *   const response = poller.getResult();
   *   console.log(response.status);
   * ```
   * @summary Extracts form information from a given document using labeled model.
   * @param {string} modelId Id of the model to use
   * @param {FormRecognizerRequestBody} body Input document
   * @param {contentType} Content type of the input. Supported types are "application/pdf", "image/jpeg", "image/png", and "image/tiff";
   * @param {BeginExtractLabeledFormsOptions} [options] Options to the BeginExtractLabeledForms operation
   */
  public async beginExtractLabeledForms(
    modelId: string,
    body: FormRecognizerRequestBody,
    contentType: ContentType,
    options: BeginExtractLabeledFormOptions = {}
  ): Promise<LabeledFormPollerLike> {
    if (!modelId) {
      throw new RangeError("Invalid model id");
    }
    const analyzePollerClient: ExtractPollerClient<LabeledFormResultResponse> = {
      beginExtract: (
        body: FormRecognizerRequestBody,
        contentType?: ContentType,
        analyzeOptions?: ExtractOptions,
        modelId?: string
      ) => analyzeCustomFormInternal(this.client, body, contentType, analyzeOptions, modelId!),
      getExtractResult: (resultId: string, options: { abortSignal?: AbortSignalLike }) =>
        this.getExtractedLabeledForms(modelId, resultId, options)
    };

    const poller = new BeginExtractPoller({
      client: analyzePollerClient,
      modelId,
      source: body,
      contentType,
      ...options
    });

    await poller.poll();
    return poller;
  }

  public async beginExtractLabeledFormsFromUrl(
    modelId: string,
    documentUrl: string,
    options: BeginExtractLabeledFormOptions = {}
  ): Promise<PollerLike<PollOperationState<LabeledFormResultResponse>, LabeledFormResultResponse>> {
    if (!modelId) {
      throw new RangeError("Invalid model id");
    }

    return this.beginExtractForms(modelId, documentUrl, undefined, options);
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
   * @param {contentType} Content type of the input. Supported types are "application/pdf", "image/jpeg", "image/png", and "image/tiff";
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
async function analyzeLayoutInternal(
  client: GeneratedClient,
  body: FormRecognizerRequestBody,
  contentType?: ContentType,
  options?: ExtractLayoutOptions,
  _modelId?: string
): Promise<AnalyzeLayoutAsyncResponseModel> {
  const realOptions = options || {};
  const { span, updatedOptions: finalOptions } = createSpan("analyzeLayoutInternal", realOptions);
  const requestBody = await toRequestBody(body);
  const requestContentType =
    contentType !== undefined ? contentType : await getContentType(requestBody);

  try {
    return await client.analyzeLayoutAsync({
      contentType: requestContentType,
      fileStream: requestBody,
      ...operationOptionsToRequestOptionsBase(finalOptions)
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

/**
 * @internal
 */
async function analyzeCustomFormInternal(
  client: GeneratedClient,
  body: FormRecognizerRequestBody,
  contentType?: ContentType,
  options: ExtractFormsOptions = {},
  modelId?: string
): Promise<AnalyzeWithCustomModelResponseModel> {
  const { span, updatedOptions: finalOptions } = createSpan("analyzeCustomFormInternal", options);
  const requestBody = await toRequestBody(body);
  const requestContentType =
    contentType !== undefined ? contentType : await getContentType(requestBody);

  try {
    return await client.analyzeWithCustomModel(modelId!, {
      contentType: requestContentType,
      fileStream: requestBody,
      ...operationOptionsToRequestOptionsBase(finalOptions)
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
  const requestBody = await toRequestBody(body);
  const requestContentType =
    contentType !== undefined ? contentType : await getContentType(requestBody);

  try {
    return await client.analyzeReceiptAsync({
      contentType: requestContentType,
      fileStream: requestBody,
      ...operationOptionsToRequestOptionsBase(finalOptions)
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
