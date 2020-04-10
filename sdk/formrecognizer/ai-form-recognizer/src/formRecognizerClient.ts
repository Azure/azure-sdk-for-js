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
import { CanonicalCode } from "@opentelemetry/types";

import { FormRecognizerClient as GeneratedClient } from "./generated/formRecognizerClient";
import {
  FormRecognizerClientAnalyzeWithCustomModelResponse as AnalyzeWithCustomModelResponseModel,
  FormRecognizerClientAnalyzeLayoutAsyncResponse as AnalyzeLayoutAsyncResponseModel,
  FormRecognizerClientAnalyzeReceiptAsyncResponse as AnalyzeReceiptAsyncResponseModel,
  ContentType
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
  LabeledFormResultResponse,
  RecognizeReceiptResultResponse,
  FormRecognizerRequestBody
} from "./models";
import {
  toRecognizeFormResultResponse,
  toLabeledFormResultResponse,
  toRecognizeContentResultResponse,
  toReceiptResultResponse
} from "./transforms";
import { FormTrainingClient } from "./formTrainingClient";
import { createFormRecognizerAzureKeyCredentialPolicy } from "./azureKeyCredentialPolicy";

export { ContentType };

export { PollOperationState, PollerLike };

/**
 * Options for analyzing layout
 */
export type RecognizeContentOptions = FormRecognizerOperationOptions;

/**
 * Options for the start analyzing layout operation
 */
export type BeginRecognizeContentOptions = RecognizeContentOptions & {
  /**
   * Delay to wait until next poll, in milliseconds
   */
  intervalInMs?: number;
  /**
   * Callback to progress events triggered in the Recognize Content Long-Running-Operation (LRO)
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
 * Options for starting analyzing form operation
 */
export type BeginRecognizeLabeledFormOptions = RecognizeFormsOptions & {
  /**
   * Delay to wait until next poll, in milliseconds
   */
  intervalInMs?: number;
  /**
   * Callback to progress events triggered in the Recognize Labeled Form Long-Running-Operation (LRO)
   */
  onProgress?: (state: BeginRecognizePollState<LabeledFormResultResponse>) => void;
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
 * Result of the Recognize Labeled Form Long-Running-Operation (LRO)
 */
export type LabeledFormPollerLike = PollerLike<
  PollOperationState<LabeledFormResultResponse>,
  LabeledFormResultResponse
>;

/**
 * Options for retrieving result of Recognize Form operation
 */
type GetRecognizedFormsOptions = FormRecognizerOperationOptions;

/**
 * Options for Recognize Receipt operation
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
type GetRecognizedReceiptsOptions = FormRecognizerOperationOptions;

/**
 * Options for Begin Analyze Receipt operation
 */
export type BeginRecognizeReceiptsOptions = RecognizeReceiptsOptions & {
  /**
   * Delay to wait until next poll, in milliseconds
   */
  intervalInMs?: number;
  /**
   * Callback to progress events triggered in the Recognize Receipt Long-Running-Operation (LRO)
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
   * @param {string} endpointUrl The URL to Azure Form Recognizer service endpoint
   * @param {KeyCredential} credential Used to authenticate requests to the service.
   * @param {FormRecognizerClientOptions} [options] Used to configure the FormRecognizer client.
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
   * Creates an instance of {@link FormTrainingClient}.
   */
  public getFormTrainingClient(): FormTrainingClient {
    return new FormTrainingClient(this.endpointUrl, this.credential);
  }

  /**
   * Recognizes content, including text and table structure from documents.
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
   * const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
   * const poller = await client.beginRecognizeContent(readStream, "application/pdf", {
   *   onProgress: (state) => { console.log(`status: ${state.status}`); }
   * });
   *
   * await poller.pollUntilDone();
   * const response = poller.getResult();

   * console.log(response.status);
   * console.log(response.rawExtractedPages);
   * console.log(response.extractedLayoutPages);
   * ```
   * @summary Recognizes receipt information from a given document
   * @param {FormRecognizerRequestBody} source Input document
   * @param {contentType} Content type of the input. Supported types are "application/pdf", "image/jpeg", "image/png", and "image/tiff";
   * @param {BeginRecognizeContentOptions} [options] Options to the Begin Recognize Content operation
   */
  public async beginRecognizeContent(
    source: FormRecognizerRequestBody,
    contentType?: ContentType,
    options: BeginRecognizeContentOptions = {}
  ): Promise<ContentPollerLike> {
    const analyzePollerClient: RecognizePollerClient<RecognizeContentResultResponse> = {
      beginRecognize: (...args) => recognizeLayoutInternal(this.client, ...args),
      getRecognizeResult: (...args) => this.getRecognizedContent(...args)
    };

    const poller = new BeginRecognizePoller<RecognizeContentResultResponse>({
      client: analyzePollerClient,
      source,
      contentType,
      ...options
    });

    await poller.poll();
    return poller;
  }

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
   * @private
   */
  private async getRecognizedContent(
    resultId: string,
    options?: GetRecognizedContentResultOptions
  ) {
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
   * Recognizes name-value pairs and tables from a given document using a model from training without labels.
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
   *   const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
   *   const poller = await client.beginRecognizeForms(modelId, readStream, "application/pdf", {
   *     onProgress: (state) => { console.log(`status: ${state.status}`); }
   *   });
   *   await poller.pollUntilDone();
   *   const response = poller.getResult();
   *   console.log(response.status);
   * ```
   * @summary Recognizes form information from a given document using unlabeled model.
   * @param {string} modelId Id of the model to use
   * @param {FormRecognizerRequestBody} body Input document
   * @param {contentType} Content type of the input. Supported types are "application/pdf", "image/jpeg", "image/png", and "image/tiff";
   * @param {BeginRecognizeFormsOptions} [options] Options to the BeginRecognizeForms operation
   */
  public async beginRecognizeForms(
    modelId: string,
    body: FormRecognizerRequestBody,
    contentType?: ContentType,
    options: BeginRecognizeFormsOptions = {}
  ): Promise<FormPollerLike> {
    if (!modelId) {
      throw new RangeError("Invalid model id");
    }
    const analyzePollerClient: RecognizePollerClient<RecognizeFormResultResponse> = {
      beginRecognize: (
        body: FormRecognizerRequestBody,
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
      source: body,
      contentType,
      ...options
    });

    await poller.poll();
    return poller;
  }

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
        body: FormRecognizerRequestBody,
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
    return poller;  }

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

  private async getRecognizedLabeledForms(
    modelId: string,
    resultId: string,
    options?: GetRecognizedFormsOptions
  ): Promise<LabeledFormResultResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormRecognizerClient-getRecognizedLabeledForm",
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
   * Recognizes name-value pairs and tables from a given document using a model from training with labels.
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
   *   const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
   *   const poller = await client.beginRecognizeLabeledForms(modelId, readStream, "application/pdf", {
   *     onProgress: (state) => { console.log(`status: ${state.status}`); }
   *   });
   *   await poller.pollUntilDone();
   *   const response = poller.getResult();
   *   console.log(response.status);
   * ```
   * @summary Recognizes form information from a given document using labeled model.
   * @param {string} modelId Id of the model to use
   * @param {FormRecognizerRequestBody} body Input document
   * @param {contentType} Content type of the input. Supported types are "application/pdf", "image/jpeg", "image/png", and "image/tiff";
   * @param {BeginRecognizeLabeledFormsOptions} [options] Options to the BeginRecognizeLabeledForms operation
   */
  public async beginRecognizeLabeledForms(
    modelId: string,
    body: FormRecognizerRequestBody,
    contentType?: ContentType,
    options: BeginRecognizeLabeledFormOptions = {}
  ): Promise<LabeledFormPollerLike> {
    if (!modelId) {
      throw new RangeError("Invalid model id");
    }
    const analyzePollerClient: RecognizePollerClient<LabeledFormResultResponse> = {
      beginRecognize: (
        body: FormRecognizerRequestBody,
        contentType?: ContentType,
        analyzeOptions?: RecognizeOptions,
        modelId?: string
      ) => recognizeCustomFormInternal(this.client, body, contentType, analyzeOptions, modelId!),
      getRecognizeResult: (resultId: string, options: { abortSignal?: AbortSignalLike }) =>
        this.getRecognizedLabeledForms(modelId, resultId, options)
    };

    const poller = new BeginRecognizePoller({
      client: analyzePollerClient,
      modelId,
      source: body,
      contentType,
      ...options
    });

    await poller.poll();
    return poller;
  }

  public async beginRecognizeLabeledFormsFromUrl(
    modelId: string,
    documentUrl: string,
    options: BeginRecognizeLabeledFormOptions = {}
  ): Promise<PollerLike<PollOperationState<LabeledFormResultResponse>, LabeledFormResultResponse>> {
    if (!modelId) {
      throw new RangeError("Invalid model id");
    }
    const analyzePollerClient: RecognizePollerClient<LabeledFormResultResponse> = {
      beginRecognize: (
        body: FormRecognizerRequestBody,
        contentType?: ContentType,
        analyzeOptions?: RecognizeOptions,
        modelId?: string
      ) => recognizeCustomFormInternal(this.client, body, contentType, analyzeOptions, modelId!),
      getRecognizeResult: (resultId: string, options: { abortSignal?: AbortSignalLike }) =>
        this.getRecognizedLabeledForms(modelId, resultId, options)
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

   * const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
   * const poller = await client.beginRecognizeReceipts(readStream, "image/jpeg", {
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
   * @summary Recognizes receipt information from a given document
   * @param {FormRecognizerRequestBody} source Input document
   * @param {contentType} Content type of the input. Supported types are "application/pdf", "image/jpeg", "image/png", and "image/tiff";
   * @param {BeginRecognizeReceiptsOptions} [options] Options to the Begin Recognize Receipts operation
   */
  public async beginRecognizeReceipts(
    source: FormRecognizerRequestBody,
    contentType?: ContentType,
    options: BeginRecognizeReceiptsOptions = {}
  ): Promise<ReceiptPollerLike> {
    const analyzePollerClient: RecognizePollerClient<RecognizeReceiptResultResponse> = {
      beginRecognize: (...args) => recognizeReceiptInternal(this.client, ...args),
      getRecognizeResult: (...args) => this.getRecognizedReceipts(...args)
    };

    const poller = new BeginRecognizePoller({
      client: analyzePollerClient,
      source: source,
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
   * const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
   * const poller = await client.beginRecognizeReceiptsFromUrl(
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
   * @summary Recognizes receipt information from a given accessible url to input document
   * @param {string} documentUrl url to the input document
   * @param {BeginRecognizeReceiptsOptions} [options] Options to the Begin Recognize Receipts operation
   */
  public async beginRecognizeReceiptsFromUrl(
    documentUrl: string,
    options: BeginRecognizeReceiptsOptions = {}
  ): Promise<ReceiptPollerLike> {
    const analyzePollerClient: RecognizePollerClient<RecognizeReceiptResultResponse> = {
      beginRecognize: (...args) => recognizeReceiptInternal(this.client, ...args),
      getRecognizeResult: (...args) => this.getRecognizedReceipts(...args)
    };

    const poller = new BeginRecognizePoller({
      client: analyzePollerClient,
      source: documentUrl,
      contentType: undefined,
      ...options
    });

    await poller.poll();
    return poller;  }

  /**
   * @internal
   */
  private async getRecognizedReceipts(
    resultId: string,
    options?: GetRecognizedReceiptsOptions
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
  const requestContentType =
    contentType !== undefined ? contentType : await getContentType(requestBody);

  try {
    return await client.analyzeLayoutAsync({
      ...operationOptionsToRequestOptionsBase(finalOptions),
      contentType: requestContentType,
      fileStream: requestBody
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
  body: FormRecognizerRequestBody,
  contentType?: ContentType,
  options: RecognizeFormsOptions = {},
  modelId?: string
): Promise<AnalyzeWithCustomModelResponseModel> {
  const { span, updatedOptions: finalOptions } = createSpan("analyzeCustomFormInternal", options);
  const requestBody = await toRequestBody(body);
  const requestContentType =
    contentType !== undefined ? contentType : await getContentType(requestBody);

  try {
    return await client.analyzeWithCustomModel(modelId!, {
      ...operationOptionsToRequestOptionsBase(finalOptions),
      contentType: requestContentType,
      fileStream: requestBody
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
  body: FormRecognizerRequestBody,
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
    return await client.analyzeReceiptAsync({
      ...operationOptionsToRequestOptionsBase(finalOptions),
      contentType: requestContentType,
      fileStream: requestBody
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
