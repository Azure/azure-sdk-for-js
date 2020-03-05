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
  HttpRequestBody,
  AbortSignalLike
} from "@azure/core-http";
import { TokenCredential } from "@azure/identity";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { SDK_VERSION, DEFAULT_COGNITIVE_SCOPE } from "./constants";
import { logger } from "./logger";
import { createSpan } from "./tracing";
import { FormRecognizerClientOptions, FormRecognizerOperationOptions, SupportedContentType } from "./common";
import { CanonicalCode } from "@opentelemetry/types";

import { FormRecognizerClient as GeneratedClient } from "./generated/formRecognizerClient";
import { CognitiveKeyCredential } from "./cognitiveKeyCredential";
import { TrainPollerClient, StartTrainingPoller, StartTrainingPollState } from "./lro/train/poller";
import { PollOperationState, PollerLike } from "@azure/core-lro";
import { StartAnalyzePollerOptions, AnalyzePollerClient, StartAnalyzePoller, AnalyzeOptions } from './lro/analyze/poller';
import { LabeledFormModelResponse, CustomFormModelResponse } from './models';

import {
  GetCustomModelsResponse,
  Model,
  ModelInfo,
  GetAnalyzeFormResultResponse
} from "./generated/models";

export {
  GetCustomModelsResponse,
  Model,
  ModelInfo,
  GetAnalyzeFormResultResponse
}

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
export type GetModelOptions = FormRecognizerOperationOptions & {
  includeKeys?: boolean;
};

export type TrainCustomModelOptions = FormRecognizerOperationOptions & {
  prefix?: string;
  includeSubFolders?: boolean;
};

export type ExtractCustomFormOptions = FormRecognizerOperationOptions & {
  includeTextDetails?: boolean;
};

/**
 * Options for the start training operation.
 */
export type StartTrainingOptions = TrainCustomModelOptions & {
  intervalInMs?: number;
  onProgress?: (state: StartTrainingPollState) => void;
  resumeFrom?: string;
};

/**
 * Options for the start training with labels operation.
 */
export type StartTrainingWithLabelsOptions = FormRecognizerOperationOptions & {
  prefix?: string;
  includeSubFolders?: boolean;
};

export type GetExtractedCustomFormOptions = FormRecognizerOperationOptions;

/**
 * Client class for interacting with Azure Form Recognizer.
 */
export class CustomFormRecognizerClient {
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

  public async deleteModel(modelId: string, options?: DeleteModelOptions) {
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

  public async getModel(modelId: string, options: GetModelOptions)
  : Promise<LabeledFormModelResponse | CustomFormModelResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "CustomRecognizerClient-getModel",
      realOptions
    );

    try {
      const respnose = await this.client.getCustomModel(
        modelId,
        operationOptionsToRequestOptionsBase(finalOptions)
      );
      if (respnose.trainResult?.averageModelAccuracy || respnose.trainResult?.fields) {
        return { kind: "labeled", ...respnose }
      } else {
        return { kind: "unlabeled", ...respnose }
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

  private async *listModelsPage(_settings: PageSettings, options: ListModelsOptions = {}): AsyncIterableIterator<GetCustomModelsResponse> {
    let result = await this.list(options);
    yield result;

    // we should use nextLink, however, it's not supported by the generated code.
    while (!result.nextLink) {
      result = await this.list(options);
      yield result;
    }
  }

  public async *listModelsAll(settings: PageSettings, options: ListModelsOptions = {}): AsyncIterableIterator<ModelInfo> {
    for await (const page of this.listModelsPage(settings, options)) {
      yield* page.modelList || [];
    }
  }

  public listModels(options: ListModelsOptions = {}): PagedAsyncIterableIterator<ModelInfo, GetCustomModelsResponse> {
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
    }
  }

  private async list(options?: ListModelsOptions): Promise<GetCustomModelsResponse> {
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

  public async startTraining(
    source: string,
    options: StartTrainingOptions = {}
  ): Promise<PollerLike<PollOperationState<Model>, Model>> {
    const trainPollerClient: TrainPollerClient = {
      getModel: (...args) => this.getModel(...args),
      trainCustomModelInternal: (
        source: string,
        useLabelFile?: boolean,
        options?: TrainCustomModelOptions
      ) => trainCustomModelInternal(this.client, source, useLabelFile, options)
    };

    const poller = new StartTrainingPoller({
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

  public async extractCustomForm(
    modelId: string,
    body: HttpRequestBody,
    contentType: string,
    options: StartAnalyzePollerOptions<GetAnalyzeFormResultResponse>
  ): Promise<PollerLike<PollOperationState<GetAnalyzeFormResultResponse>, GetAnalyzeFormResultResponse>> {
    if (!modelId) {
      throw new RangeError("Invalid modelId")
    }
    const analyzePollerClient: AnalyzePollerClient<GetAnalyzeFormResultResponse> = {
      startAnalyze: (body: HttpRequestBody, contentType: SupportedContentType, analyzeOptions: AnalyzeOptions, modelId?: string) =>
       analyzeCustomFormInternal(this.client, body, contentType, analyzeOptions, modelId!),
      getAnalyzeResult: (resultId: string,
        options: { abortSignal?: AbortSignalLike }) => this.getExtractedCustomForm(modelId, resultId, options)
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

  public async extractCustomFormFromUrl(
    modelId: string,
    imageSourceUrl: string,
    options: StartAnalyzePollerOptions<GetAnalyzeFormResultResponse>
  ): Promise<PollerLike<PollOperationState<GetAnalyzeFormResultResponse>, GetAnalyzeFormResultResponse>> {
    if (!modelId) {
      throw new RangeError("Invalid modelId")
    }
    const body = JSON.stringify({
      source: imageSourceUrl
    });
    const analyzePollerClient: AnalyzePollerClient<GetAnalyzeFormResultResponse> = {
      startAnalyze: (body: HttpRequestBody, contentType: SupportedContentType, analyzeOptions: AnalyzeOptions, modelId?: string) =>
       analyzeCustomFormInternal(this.client, body, contentType, analyzeOptions, modelId!),
      getAnalyzeResult: (resultId: string,
        options: { abortSignal?: AbortSignalLike }) => this.getExtractedCustomForm(modelId, resultId, options)
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

  private async getExtractedCustomForm(
    modelId: string,
    resultId: string,
    options?: GetExtractedCustomFormOptions
  ) {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "CustomRecognizerClient-getExtractedCustomFormResult",
      realOptions
    );

    try {
      const result = await this.client.getAnalyzeFormResult(
        modelId,
        resultId,
        operationOptionsToRequestOptionsBase(finalOptions)
      );
      return result; // TODO: transform to custom form result response defined in model.ts
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

async function trainCustomModelInternal(
  client: GeneratedClient,
  source: string,
  useLabelFile?: boolean,
  options?: TrainCustomModelOptions
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
          prefix: "",
          includeSubFolders: false
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
  body: HttpRequestBody,
  contentType: string,
  options: ExtractCustomFormOptions,
  modelId: string
) {
  const realOptions = options || {};
  const { span, updatedOptions: finalOptions } = createSpan(
    "analyzeCustomFormInternal",
    realOptions
  );
  const customHeaders: { [key: string]: string } =
    finalOptions.requestOptions?.customHeaders || {};
  customHeaders["Content-Type"] = contentType;
  try {
    return await client.analyzeWithCustomModel(modelId, {
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