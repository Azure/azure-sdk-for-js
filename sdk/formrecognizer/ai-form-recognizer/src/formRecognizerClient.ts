// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import {
  createPipelineFromOptions,
  signingPolicy,
  InternalPipelineOptions,
  isTokenCredential,
  bearerTokenAuthenticationPolicy,
  operationOptionsToRequestOptionsBase,
  AbortSignalLike,
  RestResponse
} from "@azure/core-http";
import { TokenCredential } from "@azure/identity";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { SDK_VERSION, DEFAULT_COGNITIVE_SCOPE } from "./constants";
import { logger } from "./logger";
import { createSpan } from "./tracing";
import {
  FormRecognizerClientOptions,
  FormRecognizerOperationOptions,
} from "./common";
import { CanonicalCode } from "@opentelemetry/types";

import { FormRecognizerClient as GeneratedClient } from "./generated/formRecognizerClient";
import { FormRecognizerClientAnalyzeWithCustomModelResponse as AnalyzeWithCustomModelResponseModel, ContentType } from "./generated/models";
import { CognitiveKeyCredential } from "./cognitiveKeyCredential";
import { TrainPollerClient, BeginTrainingPoller, BeginTrainingPollState } from "./lro/train/poller";
import { PollOperationState, PollerLike } from "@azure/core-lro";
import {
  ExtractPollerClient,
  BeginExtractPoller,
  BeginExtractPollState,
  ExtractOptions
} from "./lro/analyze/poller";
import {
  LabeledFormModelResponse,
  FormModelResponse,
  ExtractFormResultResponse,
  LabeledFormResultResponse,
  FormRecognizerRequestBody
} from "./models";
import { toCustomFormResultResponse, toLabeledFormResultResponse } from "./transforms";

import { FormRecognizerClientGetCustomModelsResponse as GetCustomModelsResponseModel, Model, ModelInfo } from "./generated/models";

export {
  GetCustomModelsResponseModel,
  Model,
  ModelInfo,
  //GetAnalyzeFormResultResponse,
  RestResponse
};

export { PollOperationState, PollerLike };

/**
 * Options for the list models operation.
 */
export type ListModelsOptions = FormRecognizerOperationOptions;

/**
 * Options for the get summary operation.
 */
export type GetSummaryOptions = FormRecognizerOperationOptions;

/**
 * Options for the delete model operation.
 */
export type DeleteModelOptions = FormRecognizerOperationOptions;

/**
 * Options for the get model operation.
 */
export type GetModelOptions = FormRecognizerOperationOptions;

/**
 * Options for the get model operation.
 */
export type GetLabeledModelOptions = FormRecognizerOperationOptions & {
  includeKeys?: boolean;
};

/**
 * Options for traing models
 */
export type TrainModelOptions = FormRecognizerOperationOptions & {
  prefix?: string;
  includeSubFolders?: boolean;
};

/**
 * Options for the begin training model operation.
 */
export type BeginTrainingOptions<T> = TrainModelOptions & {
  intervalInMs?: number;
  onProgress?: (state: BeginTrainingPollState<T>) => void;
  resumeFrom?: string;
};

/**
 * Options for the begin training with labels operation.
 */
export type BeginTrainingWithLabelsOptions = FormRecognizerOperationOptions & {
  prefix?: string;
  includeSubFolders?: boolean;
};

/**
 * Options for analyzing of forms
 */
export type ExtractFormsOptions = FormRecognizerOperationOptions & {
  includeTextDetails?: boolean;
};

/**
 * Options for starting analyzing form operation
 */
export type BeginExtractFormsOptions = ExtractFormsOptions & {
  intervalInMs?: number;
  onProgress?: (state: BeginExtractPollState<ExtractFormResultResponse>) => void;
  resumeFrom?: string;
};

/**
 * Options for starting analyzing form operation
 */
export type BeginExtractLabeledFormOptions = ExtractFormsOptions & {
  intervalInMs?: number;
  onProgress?: (state: BeginExtractPollState<LabeledFormResultResponse>) => void;
  resumeFrom?: string;
};

export type FormPollerLike = PollerLike<
  PollOperationState<ExtractFormResultResponse>,
  ExtractFormResultResponse
>;
export type LabeledFormPollerLike = PollerLike<
  PollOperationState<LabeledFormResultResponse>,
  LabeledFormResultResponse
>;

type GetExtractedFormsOptions = FormRecognizerOperationOptions;

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
   * Creates an instance of CustomFormRecognizerClient.
   *
   * Example usage:
   * ```ts
   * import { CustomFormRecognizerClient, CognitiveKeyCredential } from "@azure/ai-form-recognizer";
   *
   * const client = new CustomFormRecognizerClient(
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

  public async getSummary(options?: GetSummaryOptions) {
    const realOptions: ListModelsOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "CustomRecognizerClient-listCustomModels",
      realOptions
    );

    try {
      const result = await this.client.getCustomModels({
        ...operationOptionsToRequestOptionsBase(finalOptions),
        op: "summary"
      });

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

  public async deleteModel(modelId: string, options?: DeleteModelOptions): Promise<RestResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "CustomRecognizerClient-deleteModel",
      realOptions
    );

    try {
      return await this.client.deleteCustomModel(
        modelId,
        operationOptionsToRequestOptionsBase(finalOptions)
      );
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

  public async getModel(
    modelId: string,
    options: GetModelOptions = {}
  ): Promise<FormModelResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "CustomRecognizerClient-getModel",
      realOptions
    );

    try {
      const respnose = await this.client.getCustomModel(modelId, {
        ...operationOptionsToRequestOptionsBase(finalOptions),
        // Include keys is always set to true -- the service does not have a use case for includeKeys: false.
        includeKeys: true
      });
      if (respnose.modelInfo.status === "ready" && (respnose.trainResult?.averageModelAccuracy || respnose.trainResult?.fields)) {
        throw new Error(`The model ${modelId} is trained with labels.`);
      } else {
        return (respnose as unknown) as FormModelResponse;
      }
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

  public async getLabeledModel(
    modelId: string,
    options: GetLabeledModelOptions = {}
  ): Promise<LabeledFormModelResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "CustomRecognizerClient-getModel",
      realOptions
    );

    try {
      const response = await this.client.getCustomModel(
        modelId,
        operationOptionsToRequestOptionsBase(finalOptions)
      );

      if (response.modelInfo.status === "ready") {
        if (response.keys) {
          throw new Error(`The model ${modelId} is not rained with labels.`);
        }
      }

      return (response as unknown) as LabeledFormModelResponse;
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

  private async *listModelsPage(
    _settings: PageSettings,
    options: ListModelsOptions = {}
  ): AsyncIterableIterator<GetCustomModelsResponseModel> {
    let result = await this.list(options);
    yield result;

    // we should use nextLink, however, it's not supported by the generated code.
    while (result.nextLink) {
      result = await this.list(options);
      yield result;
    }
  }

  private async *listModelsAll(
    settings: PageSettings,
    options: ListModelsOptions = {}
  ): AsyncIterableIterator<ModelInfo> {
    for await (const page of this.listModelsPage(settings, options)) {
      yield* page.modelList || [];
    }
  }

  public listModels(
    options: ListModelsOptions = {}
  ): PagedAsyncIterableIterator<ModelInfo, GetCustomModelsResponseModel> {
    const iter = this.listModelsAll({}, options);

    return {
      next() {
        return iter.next();
      },

      [Symbol.asyncIterator]() {
        return this;
      },

      byPage: (settings: PageSettings = {}) => {
        return this.listModelsPage(settings, options);
      }
    };
  }

  private async list(options?: ListModelsOptions): Promise<GetCustomModelsResponseModel> {
    const realOptions: ListModelsOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "CustomRecognizerClient-list",
      realOptions
    );

    try {
      const result = await this.client.getCustomModels({
        ...operationOptionsToRequestOptionsBase(finalOptions),
        op: "full"
      });

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

  public async beginTraining(
    source: string,
    options: BeginTrainingOptions<FormModelResponse> = {}
  ): Promise<PollerLike<PollOperationState<FormModelResponse>, FormModelResponse>> {
    const trainPollerClient: TrainPollerClient<FormModelResponse> = {
      getModel: (modelId: string, options: GetModelOptions) => this.getModel(modelId, options),
      trainCustomModelInternal: (
        source: string,
        _useLabelFile?: boolean,
        options?: TrainModelOptions
      ) => trainCustomModelInternal(this.client, source, false, options)
    };

    const poller = new BeginTrainingPoller({
      client: trainPollerClient,
      source,
      intervalInMs: options.intervalInMs,
      onProgress: options.onProgress,
      resumeFrom: options.resumeFrom,
      trainModelOptions: options
    });

    await poller.poll();
    return poller;
  }

  public async beginTrainingWithLabel(
    source: string,
    options: BeginTrainingOptions<LabeledFormModelResponse> = {}
  ): Promise<PollerLike<PollOperationState<LabeledFormModelResponse>, LabeledFormModelResponse>> {
    const trainPollerClient: TrainPollerClient<LabeledFormModelResponse> = {
      getModel: (modelId: string, options: GetModelOptions) =>
        this.getLabeledModel(modelId, options),
      trainCustomModelInternal: (
        source: string,
        _useLabelFile?: boolean,
        options?: TrainModelOptions
      ) => trainCustomModelInternal(this.client, source, true, options)
    };

    const poller = new BeginTrainingPoller({
      client: trainPollerClient,
      source,
      intervalInMs: options.intervalInMs,
      onProgress: options.onProgress,
      resumeFrom: options.resumeFrom,
      trainModelOptions: options
    });

    await poller.poll();
    return poller;
  }

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
      body,
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
      "CustomRecognizerClient-getExtractedForm",
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
      "CustomRecognizerClient-getExtractedLabeledForm",
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
      body,
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
}

async function trainCustomModelInternal(
  client: GeneratedClient,
  source: string,
  useLabelFile?: boolean,
  options?: TrainModelOptions
) {
  const realOptions = options || {};
  const { span, updatedOptions: finalOptions } = createSpan(
    "trainCustomModelInternal",
    realOptions
  );

  try {
    return await client.trainCustomModelAsync(
      {
        source: source,
        sourceFilter: {
          prefix: realOptions.prefix,
          includeSubFolders: realOptions.includeSubFolders
        },
        useLabelFile
      },
      operationOptionsToRequestOptionsBase(finalOptions)
    );
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

async function analyzeCustomFormInternal(
  client: GeneratedClient,
  body: FormRecognizerRequestBody,
  contentType?: ContentType,
  options: ExtractFormsOptions = {},
  modelId?: string
): Promise<AnalyzeWithCustomModelResponseModel> {
  const { span, updatedOptions: finalOptions } = createSpan(
    "analyzeCustomFormInternal",
    options
  );
  const requestBody =
    (body as any)?.read && typeof ((body as any)?.read === "function")
      ? () => body as NodeJS.ReadableStream
      : body;
  try {
    return await client.analyzeWithCustomModel(modelId!, {
      contentType: contentType,
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
