// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createPipelineFromOptions,
  InternalPipelineOptions,
  operationOptionsToRequestOptionsBase,
  AbortSignalLike,
  ServiceClientCredentials
} from "@azure/core-http";
import { KeyCredential } from "@azure/core-auth";
import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import { createSpan } from "./tracing";
import {
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
  ContentType,
  SourcePath
} from "./generated/models";
import { PollOperationState, PollerLike } from "@azure/core-lro";
import {
  RecognizePollerClient,
  BeginRecognizePoller,
  BeginRecognizePollState,
  RecognizeOptions
} from "./lro/analyze/poller";
import {
  RecognizeContentResultResponse,
  RecognizeFormResultResponse,
  RecognizeReceiptResultResponse,
  FormRecognizerRequestBody
} from "./models";
import {
  toRecognizeFormResultResponse,
  toRecognizeContentResultResponse,
  toReceiptResultResponse
} from "./transforms";
import { FormTrainingClient } from "./formTrainingClient";
import { createFormRecognizerAzureKeyCredentialPolicy } from "./azureKeyCredentialPolicy";

export { ContentType, PollOperationState, PollerLike };

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
  intervalInMs?: number;
  /**
   * Callback to progress events triggered in the content recognition Long-Running-Operation (LRO)
   */
  onProgress?: (state: BeginRecognizePollState<RecognizeContentResultResponse>) => void;
  /**
   * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
   */
  resumeFrom?: string;
};

/**
 * The Long-Running-Operation (LRO) poller that allows you to wait until form content is recognized.
 */
export type ContentPollerLike = PollerLike<
  PollOperationState<RecognizeContentResultResponse>,
  RecognizeContentResultResponse
>;

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
  includeTextDetails?: boolean;
};

/**
 * Options for starting analyzing form operation
 */
export type BeginRecognizeFormsOptions = RecognizeFormsOptions & {
  /**
   * Delay to wait until next poll, in milliseconds
   */
  intervalInMs?: number;
  /**
   * Callback to progress events triggered in the Recognize Form Long-Running-Operation (LRO)
   */
  onProgress?: (state: BeginRecognizePollState<RecognizeFormResultResponse>) => void;
  /**
   * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
   */
  resumeFrom?: string;
};

/**
 * Result type of the Recognize Form Long-Running-Operation (LRO)
 */
export type FormPollerLike = PollerLike<
  PollOperationState<RecognizeFormResultResponse>,
  RecognizeFormResultResponse
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
  includeTextDetails?: boolean;
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
  intervalInMs?: number;
  /**
   * Callback to progress events triggered in the receipt recognition Long-Running-Operation (LRO)
   */
  onProgress?: (state: BeginRecognizePollState<RecognizeReceiptResultResponse>) => void;
  /**
   * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
   */
  resumeFrom?: string;
};

/**
 * The Long-Running-Operation (LRO) poller that allows you to wait until receipt(s) are recognized.
 */
export type ReceiptPollerLike = PollerLike<
  PollOperationState<RecognizeReceiptResultResponse>,
  RecognizeReceiptResultResponse
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
   */
  private readonly credential: KeyCredential;

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
   * @param {KeyCredential} credential Used to authenticate requests to the service.
   * @param {FormRecognizerClientOptions} [options] Used to configure the Form Recognizer client.
   */
  constructor(
    endpointUrl: string,
    credential: KeyCredential,
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

    const authPolicy = createFormRecognizerAzureKeyCredentialPolicy(credential);

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

    // The contract with the generated client requires a credential, even though it is never used
    // when a pipeline is provided. Until that contract can be changed, this dummy credential will
    // throw an error if the client ever attempts to use it.
    const dummyCredential: ServiceClientCredentials = {
      signRequest() {
        throw new Error(
          "Internal error: Attempted to use credential from service client, but a pipeline was provided."
        );
      }
    };

    this.client = new GeneratedClient(dummyCredential, this.endpointUrl, pipeline);
  }

  /**
   * Creates an instance of {@link FormTrainingClient} to perform training operations
   * and to manage trained custom form models.
   */
  public getFormTrainingClient(): FormTrainingClient {
    return new FormTrainingClient(this.endpointUrl, this.credential);
  }

  /**
   * Recognizes content, including text and table structure from a form document.
   *
   * This method returns a long running operation poller that allows you to wait
   * indefinitely until the copy is completed.
   * You can also cancel a copy before it is completed by calling `cancelOperation` on the poller.
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
   * await poller.pollUntilDone();
   * const response = poller.getResult();
   *
   * console.log(response.status);
   * console.log(response.pages);
   * ```
   * @summary Recognizes content/layout information from a given document
   * @param {FormRecognizerRequestBody} data Input document
   * @param {ContentType} contentType Content type of the input. Supported types are "application/pdf", "image/jpeg", "image/png", and "image/tiff";
   * @param {BeginRecognizeContentOptions} [options] Options to start content recognition operation
   */
  public async beginRecognizeContent(
    data: FormRecognizerRequestBody,
    contentType?: ContentType,
    options: BeginRecognizeContentOptions = {}
  ): Promise<ContentPollerLike> {
    const analyzePollerClient: RecognizePollerClient<RecognizeContentResultResponse> = {
      beginRecognize: (...args) => recognizeLayoutInternal(this.client, ...args),
      getRecognizeResult: (...args) => this.getRecognizedContent(...args)
    };

    const poller = new BeginRecognizePoller<RecognizeContentResultResponse>({
      client: analyzePollerClient,
      source: data,
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
   * indefinitely until the copy is completed.
   * You can also cancel a copy before it is completed by calling `cancelOperation` on the poller.
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
   * await poller.pollUntilDone();
   * const response = poller.getResult();
   *
   * console.log(response.status);
   * console.log(response.pages);
   * ```
   * @summary Recognizes content/layout information from a url to a form document
   * @param {string} url Url to an accessible form document
ng", and "image/tiff";
   * @param {BeginRecognizeContentOptions} [options] Options to start content recognition operation
   */
  public async beginRecognizeContentFromUrl(
    documentUrl: string,
    options: BeginRecognizeContentOptions = {}
  ): Promise<ContentPollerLike> {
    const analyzePollerClient: RecognizePollerClient<RecognizeContentResultResponse> = {
      beginRecognize: (...args) => recognizeLayoutInternal(this.client, ...args),
      getRecognizeResult: (...args) => this.getRecognizedContent(...args)
    };

    const poller = new BeginRecognizePoller<RecognizeContentResultResponse>({
      client: analyzePollerClient,
      source: documentUrl,
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
   * indefinitely until the copy is completed.
   * You can also cancel a copy before it is completed by calling `cancelOperation` on the poller.
   * Note that the onProgress callback will not be invoked if the operation completes in the first
   * request, and attempting to cancel a completed copy will result in an error being thrown.
   *
   * Example usage:
   * ```ts
   * const path = "./Invoice_6.pdf";
   * const readStream = fs.createReadStream(path);
   *
   * const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
   * const poller = await client.beginRecognizeForms(modelId, readStream, "application/pdf", {
   *   onProgress: (state) => { console.log(`status: ${state.status}`); }
   * });
   * await poller.pollUntilDone();
   * const response = poller.getResult();
   * console.log(response.status);
   * ```
   * @summary Recognizes form information from a given document using a custom form model.
   * @param {string} modelId Id of the custom form model to use
   * @param {FormRecognizerRequestBody} data Input form document
   * @param {ContentType} contentType Content type of the input. Supported types are "application/pdf", "image/jpeg", "image/png", and "image/tiff";
   * @param {BeginRecognizeFormsOptions} [options] Options to start the form recognition operation
   */
  public async beginRecognizeForms(
    modelId: string,
    data: FormRecognizerRequestBody,
    contentType?: ContentType,
    options: BeginRecognizeFormsOptions = {}
  ): Promise<FormPollerLike> {
    if (!modelId) {
      throw new RangeError("Invalid model id");
    }
    const analyzePollerClient: RecognizePollerClient<RecognizeFormResultResponse> = {
      beginRecognize: (
        body: FormRecognizerRequestBody | string,
        contentType?: ContentType,
        analyzeOptions: RecognizeOptions = {},
        modelId?: string
      ) => recognizeCustomFormInternal(this.client, body, contentType, analyzeOptions, modelId!),
      getRecognizeResult: (resultId: string, options: { abortSignal?: AbortSignalLike }) =>
        this.getRecognizedForm(modelId, resultId, options)
    };

    const poller = new BeginRecognizePoller({
      client: analyzePollerClient,
      modelId,
      source: data,
      contentType,
      ...options
    });

    await poller.poll();
    return poller;
  }

  /**
   * Recognizes forms from a url to a form document using a custom form model from training.
   * This method returns a long running operation poller that allows you to wait
   * indefinitely until the copy is completed.
   * You can also cancel a copy before it is completed by calling `cancelOperation` on the poller.
   * Note that the onProgress callback will not be invoked if the operation completes in the first
   * request, and attempting to cancel a completed copy will result in an error being thrown.
   *
   * Example usage:
   * ```ts
   * const url = "<form document url>";
   *
   * const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
   * const poller = await client.beginRecognizeFormsFromUrl(modelId, url, {
   *   onProgress: (state) => { console.log(`status: ${state.status}`); }
   * });
   * await poller.pollUntilDone();
   * const response = poller.getResult();
   * console.log(response.status);
   * ```
   * @summary Recognizes form information from a url to a form document using a custom form model.
   * @param {string} modelId Id of the custom form model to use
   * @param {string} url Url to an accessible form document
   ng", and "image/tiff";
   * @param {BeginRecognizeFormsOptions} [options] Options to start the form recognition operation
   */
  public async beginRecognizeFormsFromUrl(
    modelId: string,
    documentUrl: string,
    options: BeginRecognizeFormsOptions = {}
  ): Promise<
    PollerLike<PollOperationState<RecognizeFormResultResponse>, RecognizeFormResultResponse>
  > {
    if (!modelId) {
      throw new RangeError("Invalid modelId");
    }
    const analyzePollerClient: RecognizePollerClient<RecognizeFormResultResponse> = {
      beginRecognize: (
        body: FormRecognizerRequestBody | string,
        contentType?: ContentType,
        analyzeOptions: RecognizeOptions = {},
        modelId?: string
      ) => recognizeCustomFormInternal(this.client, body, contentType, analyzeOptions, modelId!),
      getRecognizeResult: (resultId: string, options: { abortSignal?: AbortSignalLike }) =>
        this.getRecognizedForm(modelId, resultId, options)
    };

    const poller = new BeginRecognizePoller({
      client: analyzePollerClient,
      modelId,
      source: documentUrl,
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
   *
   * const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
   * const poller = await client.beginRecognizeReceipts(readStream, "image/jpeg", {
   *   onProgress: (state) => { console.log(`status: ${state.status}`); }
   * });
   *
   * await poller.pollUntilDone();
   * const response = poller.getResult();
   *
   * console.log(`Response status ${response.status}`);
   * console.log("First receipt:")
   * console.log(response.receipts[0]);
   * console.log("Items:")
   * const usReceipt = toUSReceipt(response.receipts[0]);
   * console.table(usReceipt.items, ["name", "quantity", "price", "totalPrice"]);
   * console.log("Raw 'MerchantAddress' fields:");
   * console.log(usReceipt.recognizedForm.fields["MerchantAddress"]);
   * ```
   * @summary Recognizes receipt information from a given document
   * @param {FormRecognizerRequestBody} data Input document
   * @param {ContentType} contentType Content type of the input. Supported types are "application/pdf", "image/jpeg", "image/png", and "image/tiff";
   * @param {BeginRecognizeReceiptsOptions} [options] Options to start the receipt recognition operation
   */
  public async beginRecognizeReceipts(
    data: FormRecognizerRequestBody,
    contentType?: ContentType,
    options: BeginRecognizeReceiptsOptions = {}
  ): Promise<ReceiptPollerLike> {
    const analyzePollerClient: RecognizePollerClient<RecognizeReceiptResultResponse> = {
      beginRecognize: (...args) => recognizeReceiptInternal(this.client, ...args),
      getRecognizeResult: (...args) => this.getreceipts(...args)
    };

    const poller = new BeginRecognizePoller({
      client: analyzePollerClient,
      source: data,
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
   * This method returns a long running operation poller that allows you to wait
   * indefinitely until the copy is completed.
   * You can also cancel a copy before it is completed by calling `cancelOperation` on the poller.
   * Note that the onProgress callback will not be invoked if the operation completes in the first
   * request, and attempting to cancel a completed copy will result in an error being thrown.
   *
   * Example usage:
   * ```ts
   * const receiptUrl = "<url to the receipt document>";
   * const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
   * const poller = await client.beginRecognizeReceiptsFromUrl(
   *   receiptUrl, {
   *     includeTextDetails: true,
   *     onProgress: (state) => { console.log(`analyzing status: ${state.status}`); }
   * });
   * await poller.pollUntilDone();
   * const response = poller.getResult();
   *
   * console.log(`Response status ${response.status}`);
   * console.log("First receipt:")
   * console.log(response.receipts[0]);
   * console.log("Items:")
   * const usReceipt = toUSReceipt(response.receipts[0]);
   * console.table(usReceipt.items, ["name", "quantity", "price", "totalPrice"]);
   * console.log("Raw 'MerchantAddress' fields:");
   * console.log(usReceipt.recognizedForm.fields["MerchantAddress"]);
   * ```
   * @summary Recognizes receipt information from a given accessible url to input document
   * @param {string} documentUrl url to the input receipt document
   * @param {BeginRecognizeReceiptsOptions} [options] Options to start receipt recognition operation
   */
  public async beginRecognizeReceiptsFromUrl(
    documentUrl: string,
    options: BeginRecognizeReceiptsOptions = {}
  ): Promise<ReceiptPollerLike> {
    const analyzePollerClient: RecognizePollerClient<RecognizeReceiptResultResponse> = {
      beginRecognize: (...args) => recognizeReceiptInternal(this.client, ...args),
      getRecognizeResult: (...args) => this.getreceipts(...args)
    };

    const poller = new BeginRecognizePoller({
      client: analyzePollerClient,
      source: documentUrl,
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
  private async getreceipts(
    resultId: string,
    options?: GetReceiptsOptions
  ): Promise<RecognizeReceiptResultResponse> {
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
async function recognizeLayoutInternal(
  client: GeneratedClient,
  body: FormRecognizerRequestBody | string,
  contentType?: ContentType,
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
    return await client.analyzeLayoutAsync(
      "application/json", {
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
  contentType?: ContentType,
  options: RecognizeFormsOptions = {},
  modelId?: string
): Promise<AnalyzeWithCustomModelResponseModel> {
  const { span, updatedOptions: finalOptions } = createSpan("analyzeCustomFormInternal", options);
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
    return await client.analyzeWithCustomModel(
      modelId!,
      "application/json", {
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
  contentType?: ContentType,
  options?: RecognizeReceiptsOptions,
  _modelId?: string
): Promise<AnalyzeReceiptAsyncResponseModel> {
  const realOptions = options || { includeTextDetails: false };
  const { span, updatedOptions: finalOptions } = createSpan("analyzeReceiptInternal", realOptions);
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
    return await client.analyzeReceiptAsync(
      "application/json", {
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
