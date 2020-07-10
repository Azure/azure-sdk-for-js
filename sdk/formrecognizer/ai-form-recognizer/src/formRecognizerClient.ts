// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createPipelineFromOptions,
  InternalPipelineOptions,
  isTokenCredential,
  bearerTokenAuthenticationPolicy,
  operationOptionsToRequestOptionsBase,
  AbortSignalLike
} from "@azure/core-http";
import { TokenCredential } from "@azure/identity";
import { KeyCredential } from "@azure/core-auth";
import {
  SDK_VERSION,
  DEFAULT_COGNITIVE_SCOPE,
  FormRecognizerLoggingAllowedHeaderNames,
  FormRecognizerLoggingAllowedQueryParameters
} from "./constants";
import { logger } from "./logger";
import { createSpan } from "./tracing";
import {
  FormContentType,
  FormRecognizerClientOptions,
  FormRecognizerOperationOptions,
  toRequestBody,
  getContentType
} from "./common";
import { CanonicalCode } from "@opentelemetry/api";

import { GeneratedClient } from "./generated/generatedClient";
import {
  GeneratedClientAnalyzeWithCustomModelResponse as AnalyzeWithCustomModelResponseModel,
  GeneratedClientAnalyzeLayoutAsyncResponse as AnalyzeLayoutAsyncResponseModel,
  GeneratedClientAnalyzeReceiptAsyncResponse as AnalyzeReceiptAsyncResponseModel,
  SourcePath
} from "./generated/models";
import { PollOperationState, PollerLike } from "@azure/core-lro";
import {
  RecognizeContentPollerClient,
  BeginRecognizeContentPoller,
  BeginRecognizeContentPollState
} from "./lro/analyze/contentPoller";
import {
  RecognizeCustomFormPollerClient,
  BeginRecognizeCustomFormPoller,
  BeginRecognizeCustomFormPollState
} from "./lro/analyze/customFormPoller";
import {
  RecognizeReceiptPollerClient,
  BeginRecognizeReceiptPoller,
  BeginRecognizeReceiptPollState
} from "./lro/analyze/receiptPoller";
import { FormRecognizerRequestBody, RecognizedFormArray, FormPageArray } from "./models";
import { RecognizeContentResultResponse, RecognizeFormResultResponse } from "./internalModels";
import {
  toRecognizeFormResultResponse,
  toRecognizeContentResultResponse,
  toRecognizeFormResultResponseFromReceipt
} from "./transforms";
import { createFormRecognizerAzureKeyCredentialPolicy } from "./azureKeyCredentialPolicy";

export {
  PollOperationState,
  PollerLike,
  BeginRecognizeCustomFormPollState,
  BeginRecognizeContentPollState,
  BeginRecognizeReceiptPollState,
  RecognizeContentPollerClient,
  RecognizeCustomFormPollerClient,
  RecognizeReceiptPollerClient
};

/**
 * Options for content/layout recognition.
 */
export type RecognizeContentOptions = FormRecognizerOperationOptions;

/**
 * Options for the start content/layout recognition operation
 */
export type BeginRecognizeContentOptions = RecognizeContentOptions & {
  /**
   * Delay to wait until next poll, in milliseconds
   */
  updateIntervalInMs?: number;
  /**
   * Callback to progress events triggered in the content recognition Long-Running-Operation (LRO)
   */
  onProgress?: (state: BeginRecognizeContentPollState) => void;
  /**
   * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
   */
  resumeFrom?: string;
};

/**
 * The Long-Running-Operation (LRO) poller that allows you to wait until form content is recognized.
 */
export type ContentPollerLike = PollerLike<PollOperationState<FormPageArray>, FormPageArray>;

/**
 * Options for retrieving recognized content data
 */
type GetRecognizedContentResultOptions = FormRecognizerOperationOptions;

/**
 * Options for recognition of forms
 */
export type RecognizeFormsOptions = FormRecognizerOperationOptions & {
  /**
   * Specifies whether to include text lines and element references in the result
   */
  includeFieldElements?: boolean;
};

/**
 * Options for starting analyzing form operation
 */
export type BeginRecognizeFormsOptions = RecognizeFormsOptions & {
  /**
   * Delay to wait until next poll, in milliseconds
   */
  updateIntervalInMs?: number;
  /**
   * Callback to progress events triggered in the Recognize Form Long-Running-Operation (LRO)
   */
  onProgress?: (state: BeginRecognizeCustomFormPollState) => void;
  /**
   * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
   */
  resumeFrom?: string;
};

/**
 * Result type of the Recognize Form Long-Running-Operation (LRO)
 */
export type FormPollerLike = PollerLike<
  PollOperationState<RecognizedFormArray>,
  RecognizedFormArray
>;

/**
 * Options for retrieving result of form recognition operation
 */
type GetRecognizedFormsOptions = FormRecognizerOperationOptions;

/**
 * Options for receipt recognition operation
 */
export type RecognizeReceiptsOptions = FormRecognizerOperationOptions & {
  /**
   * Specifies whether to include text lines and element references in the result
   */
  includeFieldElements?: boolean;
};

/**
 * Options for retrieving recognized receipt data
 */
type GetReceiptsOptions = FormRecognizerOperationOptions;

/**
 * Options for starting receipt recognition operation
 */
export type BeginRecognizeReceiptsOptions = RecognizeReceiptsOptions & {
  /**
   * Delay to wait until next poll, in milliseconds
   */
  updateIntervalInMs?: number;
  /**
   * Callback to progress events triggered in the receipt recognition Long-Running-Operation (LRO)
   */
  onProgress?: (state: BeginRecognizeReceiptPollState) => void;
  /**
   * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
   */
  resumeFrom?: string;
};

/**
 * The Long-Running-Operation (LRO) poller that allows you to wait until receipt(s) are recognized.
 */
export type ReceiptPollerLike = PollerLike<
  PollOperationState<RecognizedFormArray>,
  RecognizedFormArray
>;

/**
 * Client class for interacting with Azure Form Recognizer service.
 */
export class FormRecognizerClient {
  /**
   * Url to an Azure Form Recognizer service endpoint
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
   * import { FormRecognizerClient, AzureKeyCredential } from "@azure/ai-form-recognizer";
   *
   * const client = new FormRecognizerClient(
   *    "<service endpoint>",
   *    new AzureKeyCredential("<api key>")
   * );
   * ```
   * @param {string} endpointUrl Url to an Azure Form Recognizer service endpoint
   * @param {TokenCredential | KeyCredential} credential Used to authenticate requests to the service.
   * @param {FormRecognizerClientOptions} [options] Used to configure the Form Recognizer client.
   */
  constructor(
    endpointUrl: string,
    credential: TokenCredential | KeyCredential,
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
      : createFormRecognizerAzureKeyCredentialPolicy(credential);

    const internalPipelineOptions: InternalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info,
          allowedHeaderNames: FormRecognizerLoggingAllowedHeaderNames,
          allowedQueryParameters: FormRecognizerLoggingAllowedQueryParameters
        }
      }
    };

    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);

    this.client = new GeneratedClient(this.endpointUrl, pipeline);
  }

  /**
   * Recognizes content, including text and table structure from a form document.
   *
   * This method returns a long running operation poller that allows you to wait
   * indefinitely until the operation is completed.
   * Note that the onProgress callback will not be invoked if the operation completes in the first
   * request, and attempting to cancel a completed copy will result in an error being thrown.
   *
   * Example usage:
   * ```ts
   * const path = "./Invoice_7.pdf";
   * const readStream = fs.createReadStream(path);
   *
   * const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
   * const poller = await client.beginRecognizeContent(readStream, "application/pdf", {
   *   onProgress: (state) => { console.log(`status: ${state.status}`); }
   * });
   *
   * const pages = await poller.pollUntilDone();
   * ```
   * @summary Recognizes content/layout information from a given document
   * @param {FormRecognizerRequestBody} form Input document
   * @param {FormContentType} contentType Content type of the input. Supported types are "application/pdf", "image/jpeg", "image/png", and "image/tiff";
   * @param {BeginRecognizeContentOptions} [options] Options to start content recognition operation
   */
  public async beginRecognizeContent(
    form: FormRecognizerRequestBody,
    contentType?: FormContentType,
    options: BeginRecognizeContentOptions = {}
  ): Promise<ContentPollerLike> {
    const analyzePollerClient: RecognizeContentPollerClient = {
      beginRecognize: (...args) => recognizeLayoutInternal(this.client, ...args),
      getRecognizeResult: (...args) => this.getRecognizedContent(...args)
    };

    const poller = new BeginRecognizeContentPoller({
      client: analyzePollerClient,
      source: form,
      contentType,
      ...options
    });

    await poller.poll();
    return poller;
  }

  /**
   * Recognizes content, including text and table structure from a url to a form document.
   *
   * This method returns a long running operation poller that allows you to wait
   * indefinitely until the operation is completed.
   * Note that the onProgress callback will not be invoked if the operation completes in the first
   * request, and attempting to cancel a completed copy will result in an error being thrown.
   *
   * Example usage:
   * ```ts
   * const url = "<form document url>";
   *
   * const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
   * const poller = await client.beginRecognizeContentFromUrl(url, {
   *   onProgress: (state) => { console.log(`status: ${state.status}`); }
   * });
   *
   * const pages = await poller.pollUntilDone();
   * ```
   * @summary Recognizes content/layout information from a url to a form document
   * @param {string} formUrl Url to an accessible form document. Supported document types include PDF, JPEG, PNG, and TIFF.
   * @param {BeginRecognizeContentOptions} [options] Options to start content recognition operation
   */
  public async beginRecognizeContentFromUrl(
    formUrl: string,
    options: BeginRecognizeContentOptions = {}
  ): Promise<ContentPollerLike> {
    const analyzePollerClient: RecognizeContentPollerClient = {
      beginRecognize: (...args) => recognizeLayoutInternal(this.client, ...args),
      getRecognizeResult: (...args) => this.getRecognizedContent(...args)
    };

    const poller = new BeginRecognizeContentPoller({
      client: analyzePollerClient,
      source: formUrl,
      contentType: undefined,
      ...options
    });

    await poller.poll();
    return poller;
  }

  /**
   * Retrieves result of content recognition operation.
   * @private
   */
  private async getRecognizedContent(
    resultId: string,
    options?: GetRecognizedContentResultOptions
  ): Promise<RecognizeContentResultResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormRecognizerClient-getRecognizedLayoutResult",
      realOptions
    );

    try {
      const requestOptions = operationOptionsToRequestOptionsBase(finalOptions);
      const analyzeResult = await this.client.getAnalyzeLayoutResult(resultId, requestOptions);
      return toRecognizeContentResultResponse(analyzeResult);
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
   * Recognizes forms from a given document using a custom form model from training.
   * This method returns a long running operation poller that allows you to wait
   * indefinitely until the operation is completed.
   * Note that the onProgress callback will not be invoked if the operation completes in the first
   * request, and attempting to cancel a completed copy will result in an error being thrown.
   *
   * Example usage:
   * ```ts
   * const path = "./Invoice_6.pdf";
   * const readStream = fs.createReadStream(path);
   *
   * const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
   * const poller = await client.beginRecognizeCustomForms(modelId, readStream, "application/pdf", {
   *   onProgress: (state) => { console.log(`status: ${state.status}`); }
   * });
   * const forms = await poller.pollUntilDone();
   * ```
   * @summary Recognizes form information from a given document using a custom form model.
   * @param {string} modelId Id of the custom form model to use
   * @param {FormRecognizerRequestBody} form Input form document
   * @param {FormContentType} contentType Content type of the input. Supported types are "application/pdf", "image/jpeg", "image/png", and "image/tiff";
   * @param {BeginRecognizeFormsOptions} [options] Options to start the form recognition operation
   */
  public async beginRecognizeCustomForms(
    modelId: string,
    form: FormRecognizerRequestBody,
    contentType?: FormContentType,
    options: BeginRecognizeFormsOptions = {}
  ): Promise<FormPollerLike> {
    if (!modelId) {
      throw new RangeError("Invalid model id");
    }
    const analyzePollerClient: RecognizeCustomFormPollerClient = {
      beginRecognize: (
        body: FormRecognizerRequestBody | string,
        modelId: string,
        contentType?: FormContentType,
        analyzeOptions: RecognizeFormsOptions = {}
      ) => recognizeCustomFormInternal(this.client, body, contentType, analyzeOptions, modelId!),
      getRecognizeResult: (resultId: string, options: { abortSignal?: AbortSignalLike }) =>
        this.getRecognizedForm(modelId, resultId, options)
    };

    const poller = new BeginRecognizeCustomFormPoller({
      client: analyzePollerClient,
      modelId,
      source: form,
      contentType,
      ...options
    });

    await poller.poll();
    return poller;
  }

  /**
   * Recognizes forms from a url to a form document using a custom form model from training.
   * This method returns a long running operation poller that allows you to wait
   * indefinitely until the operation is completed.
   * Note that the onProgress callback will not be invoked if the operation completes in the first
   * request, and attempting to cancel a completed copy will result in an error being thrown.
   *
   * Example usage:
   * ```ts
   * const url = "<form document url>";
   *
   * const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
   * const poller = await client.beginRecognizeCustomFormsFromUrl(modelId, url, {
   *   onProgress: (state) => { console.log(`status: ${state.status}`); }
   * });
   * const forms = await poller.pollUntilDone();
   * ```
   * @summary Recognizes form information from a url to a form document using a custom form model.
   * @param {string} modelId Id of the custom form model to use
   * @param {string} formUrl Url to an accessible form document. Supported document types include PDF, JPEG, PNG, and TIFF.
   * @param {BeginRecognizeFormsOptions} [options] Options to start the form recognition operation
   */
  public async beginRecognizeCustomFormsFromUrl(
    modelId: string,
    formUrl: string,
    options: BeginRecognizeFormsOptions = {}
  ): Promise<FormPollerLike> {
    if (!modelId) {
      throw new RangeError("Invalid modelId");
    }
    const analyzePollerClient: RecognizeCustomFormPollerClient = {
      beginRecognize: (
        body: FormRecognizerRequestBody | string,
        modelId: string,
        contentType?: FormContentType,
        analyzeOptions: RecognizeFormsOptions = {}
      ) => recognizeCustomFormInternal(this.client, body, contentType, analyzeOptions, modelId!),
      getRecognizeResult: (resultId: string, options: { abortSignal?: AbortSignalLike }) =>
        this.getRecognizedForm(modelId, resultId, options)
    };

    const poller = new BeginRecognizeCustomFormPoller({
      client: analyzePollerClient,
      modelId,
      source: formUrl,
      contentType: undefined,
      ...options
    });

    await poller.poll();
    return poller;
  }

  /**
   * Retrieves result of a form recognition operation.
   * @private
   */
  private async getRecognizedForm(
    modelId: string,
    resultId: string,
    options?: GetRecognizedFormsOptions
  ): Promise<RecognizeFormResultResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormRecognizerClient-getRecognizedForm",
      realOptions
    );

    try {
      const result = await this.client.getAnalyzeFormResult(
        modelId,
        resultId,
        operationOptionsToRequestOptionsBase(finalOptions)
      );
      return toRecognizeFormResultResponse(result);
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
   * Recognizes data from receipts using pre-built receipt model, enabling you to extract structure data
   * from receipts such as merchant name, merchant phone number, transaction date, and more.
   *
   * For supported fields recognized by the service, please refer to https://westus2.dev.cognitive.microsoft.com/docs/services/form-recognizer-api-v2-preview/operations/GetAnalyzeReceiptResult.
   *
   * This method returns a long running operation poller that allows you to wait
   * indefinitely until the operation is completed.
   * Note that the onProgress callback will not be invoked if the operation completes in the first
   * request, and attempting to cancel a completed copy will result in an error being thrown.
   *
   * Example usage:
   * ```ts
   * const path = "./contoso-allinone.jpg";
   * const readStream = fs.createReadStream(path);
   *
   * const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
   * const poller = await client.beginRecognizeReceipts(readStream, "image/jpeg", {
   *   onProgress: (state) => { console.log(`status: ${state.status}`); }
   * });
   *
   * const receipts = await poller.pollUntilDone();
   *  if (!receipts || receipts.length <= 0) {
   *    throw new Error("Expecting at lease one receipt in analysis result");
   *  }
   *
   * const receipt = receipts[0];
   * console.log("First receipt:");
   * const receiptTypeField = receipt.fields["ReceiptType"];
   * if (receiptTypeField.valueType === "string") {
   *   console.log(`  Receipt Type: '${receiptTypeField.value || "<missing>"}', with confidence of ${receiptTypeField.confidence}`);
   * }
   * const merchantNameField = receipt.fields["MerchantName"];
   * if (merchantNameField.valueType === "string") {
   *   console.log(`  Merchant Name: '${merchantNameField.value || "<missing>"}', with confidence of ${merchantNameField.confidence}`);
   * }
   * const transactionDate = receipt.fields["TransactionDate"];
   * if (transactionDate.valueType === "date") {
   *   console.log(`  Transaction Date: '${transactionDate.value || "<missing>"}', with confidence of ${transactionDate.confidence}`);
   * }
   * const itemsField = receipt.fields["Items"];
   * if (itemsField.valueType === "array") {
   *   for (const itemField of itemsField.value || []) {
   *     if (itemField.valueType === "object") {
   *       const itemNameField = itemField.value!["Name"];
   *       if (itemNameField.valueType === "string") {
   *         console.log(`    Item Name: '${itemNameField.value || "<missing>"}', with confidence of ${itemNameField.confidence}`);
   *       }
   *     }
   *  }
   * }
   * const totalField = receipt.fields["Total"];
   * if (totalField.valueType === "number") {
   *   console.log(`  Total: '${totalField.value || "<missing>"}', with confidence of ${totalField.confidence}`);
   * }
   * ```
   * @summary Recognizes receipt information from a given document
   * @param {FormRecognizerRequestBody} receipt Input document
   * @param {FormContentType} contentType Content type of the input. Supported types are "application/pdf", "image/jpeg", "image/png", and "image/tiff";
   * @param {BeginRecognizeReceiptsOptions} [options] Options to start the receipt recognition operation
   */
  public async beginRecognizeReceipts(
    receipt: FormRecognizerRequestBody,
    contentType?: FormContentType,
    options: BeginRecognizeReceiptsOptions = {}
  ): Promise<ReceiptPollerLike> {
    const analyzePollerClient: RecognizeReceiptPollerClient = {
      beginRecognize: (...args) => recognizeReceiptInternal(this.client, ...args),
      getRecognizeResult: (...args) => this.getReceipts(...args)
    };

    const poller = new BeginRecognizeReceiptPoller({
      client: analyzePollerClient,
      source: receipt,
      contentType,
      ...options
    });

    await poller.poll();
    return poller;
  }

  /**
   * Recognizes receipt information from a url using pre-built receipt model, enabling you to extract structure data
   * from receipts such as merchant name, merchant phone number, transaction date, and more.
   *
   * For supported fields recognized by the service, please refer to https://westus2.dev.cognitive.microsoft.com/docs/services/form-recognizer-api-v2-preview/operations/GetAnalyzeReceiptResult.
   *
   * This method returns a long running operation poller that allows you to wait
   * indefinitely until the operation is completed.
   * Note that the onProgress callback will not be invoked if the operation completes in the first
   * request, and attempting to cancel a completed copy will result in an error being thrown.
   *
   * Example usage:
   * ```ts
   * const url = "<url to the receipt document>";
   * const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
   * const poller = await client.beginRecognizeReceiptsFromUrl(
   *   url, {
   *     includeFieldElements: true,
   *     onProgress: (state) => { console.log(`analyzing status: ${state.status}`); }
   * });
   * const receipts = await poller.pollUntilDone();
   *  if (!receipts || receipts.length <= 0) {
   *    throw new Error("Expecting at lease one receipt in analysis result");
   *  }
   *
   * const receipt = receipts[0];
   * console.log("First receipt:");
   * const receiptTypeField = receipt.fields["ReceiptType"];
   * if (receiptTypeField.valueType === "string") {
   *   console.log(`  Receipt Type: '${receiptTypeField.value || "<missing>"}', with confidence of ${receiptTypeField.confidence}`);
   * }
   * const merchantNameField = receipt.fields["MerchantName"];
   * if (merchantNameField.valueType === "string") {
   *   console.log(`  Merchant Name: '${merchantNameField.value || "<missing>"}', with confidence of ${merchantNameField.confidence}`);
   * }
   * const transactionDate = receipt.fields["TransactionDate"];
   * if (transactionDate.valueType === "date") {
   *   console.log(`  Transaction Date: '${transactionDate.value || "<missing>"}', with confidence of ${transactionDate.confidence}`);
   * }
   * const itemsField = receipt.fields["Items"];
   * if (itemsField.valueType === "array") {
   *   for (const itemField of itemsField.value || []) {
   *     if (itemField.valueType === "object") {
   *       const itemNameField = itemField.value!["Name"];
   *       if (itemNameField.valueType === "string") {
   *         console.log(`    Item Name: '${itemNameField.value || "<missing>"}', with confidence of ${itemNameField.confidence}`);
   *       }
   *     }
   *  }
   * }
   * const totalField = receipt.fields["Total"];
   * if (totalField.valueType === "number") {
   *   console.log(`  Total: '${totalField.value || "<missing>"}', with confidence of ${totalField.confidence}`);
   * }
   * ```
   * @summary Recognizes receipt information from a given accessible url to input document
   * @param {string} receiptUrl Url to an accesssible receipt document. Supported document types include PDF, JPEG, PNG, and TIFF.
   * @param {BeginRecognizeReceiptsOptions} [options] Options to start receipt recognition operation
   */
  public async beginRecognizeReceiptsFromUrl(
    receiptUrl: string,
    options: BeginRecognizeReceiptsOptions = {}
  ): Promise<ReceiptPollerLike> {
    const analyzePollerClient: RecognizeReceiptPollerClient = {
      beginRecognize: (...args) => recognizeReceiptInternal(this.client, ...args),
      getRecognizeResult: (...args) => this.getReceipts(...args)
    };

    const poller = new BeginRecognizeReceiptPoller({
      client: analyzePollerClient,
      source: receiptUrl,
      contentType: undefined,
      ...options
    });

    await poller.poll();
    return poller;
  }

  /**
   * Retrieves result of a receipt recognition operation.
   * @private
   */
  private async getReceipts(
    resultId: string,
    options?: GetReceiptsOptions
  ): Promise<RecognizeFormResultResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormRecognizerClient-getRecognizedReceipt",
      realOptions
    );

    try {
      const result = await this.client.getAnalyzeReceiptResult(
        resultId,
        operationOptionsToRequestOptionsBase(finalOptions)
      );
      return toRecognizeFormResultResponseFromReceipt(result);
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
async function recognizeLayoutInternal(
  client: GeneratedClient,
  body: FormRecognizerRequestBody | string,
  contentType?: FormContentType,
  options?: RecognizeContentOptions,
  _modelId?: string
): Promise<AnalyzeLayoutAsyncResponseModel> {
  const realOptions = options || {};
  const { span, updatedOptions: finalOptions } = createSpan("analyzeLayoutInternal", realOptions);
  const requestBody = await toRequestBody(body);
  const requestContentType = contentType ? contentType : await getContentType(requestBody);

  try {
    if (requestContentType) {
      return await client.analyzeLayoutAsync(
        requestContentType,
        requestBody as Blob | ArrayBuffer | ArrayBufferView,
        operationOptionsToRequestOptionsBase(finalOptions)
      );
    }
    return await client.analyzeLayoutAsync("application/json", {
      fileStream: requestBody as SourcePath,
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
async function recognizeCustomFormInternal(
  client: GeneratedClient,
  body: FormRecognizerRequestBody | string,
  contentType?: FormContentType,
  options: RecognizeFormsOptions = {},
  modelId?: string
): Promise<AnalyzeWithCustomModelResponseModel> {
  const { span, updatedOptions: finalOptions } = createSpan("analyzeCustomFormInternal", {
    ...options,
    includeTextDetails: options.includeFieldElements
  });
  const requestBody = await toRequestBody(body);
  const requestContentType = contentType ? contentType : await getContentType(requestBody);

  try {
    if (requestContentType) {
      return await client.analyzeWithCustomModel(
        modelId!,
        requestContentType,
        requestBody as Blob | ArrayBuffer | ArrayBufferView,
        operationOptionsToRequestOptionsBase(finalOptions)
      );
    }
    return await client.analyzeWithCustomModel(modelId!, "application/json", {
      fileStream: requestBody as SourcePath,
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
async function recognizeReceiptInternal(
  client: GeneratedClient,
  body: FormRecognizerRequestBody | string,
  contentType?: FormContentType,
  options?: RecognizeReceiptsOptions,
  _modelId?: string
): Promise<AnalyzeReceiptAsyncResponseModel> {
  const realOptions = options || { includeFieldElements: false };
  const { span, updatedOptions: finalOptions } = createSpan("analyzeReceiptInternal", {
    ...realOptions,
    includeTextDetails: realOptions.includeFieldElements
  });
  const requestBody = await toRequestBody(body);
  const requestContentType =
    contentType !== undefined ? contentType : await getContentType(requestBody);

  try {
    if (requestContentType) {
      return await client.analyzeReceiptAsync(
        requestContentType,
        requestBody as Blob | ArrayBuffer | ArrayBufferView,
        operationOptionsToRequestOptionsBase(finalOptions)
      );
    }
    return await client.analyzeReceiptAsync("application/json", {
      fileStream: requestBody as SourcePath,
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
