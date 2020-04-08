// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import {
  createPipelineFromOptions,
  InternalPipelineOptions,
  operationOptionsToRequestOptionsBase,
  RestResponse,
  ServiceClientCredentials
} from "@azure/core-http";
import { KeyCredential } from "@azure/core-auth";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import { createSpan } from "./tracing";
import { CanonicalCode } from "@opentelemetry/types";
import { FormRecognizerClient as GeneratedClient } from "./generated/formRecognizerClient";
import {
  FormRecognizerClientGetCustomModelsResponse as ListModelsResponseModel,
  Model,
  ModelInfo
} from "./generated/models";
import { TrainPollerClient, BeginTrainingPoller, BeginTrainingPollState } from "./lro/train/poller";
import { PollOperationState, PollerLike } from "@azure/core-lro";
import { FormRecognizerClientOptions, FormRecognizerOperationOptions } from "./common";
import { LabeledFormModelResponse, FormModelResponse } from "./models";
import { createFormRecognizerAzureKeyCredentialPolicy } from "./azureKeyCredentialPolicy";

export { ListModelsResponseModel, Model, ModelInfo, RestResponse };
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
 * Client class for Form training operations and Form model management.
 */
export class FormTrainingClient {
  /**
   * The URL to Azure Form Recognizer service endpoint
   */
  public readonly endpointUrl: string;

  /**
   * @internal
   * @ignore
   * A reference to the auto-generated FormRecognizer HTTP client.
   */
  private readonly client: GeneratedClient;

  /**
   * Creates an instance of FormTrainingClient.
   *
   * Example usage:
   * ```ts
   * import {FormTrainingClient, AzureKeyCredential } from "@azure/ai-form-recognizer";
   *
   * const client = new FormTrainingClient(
   *    "<service endpoint>",
   *    new AzureKeyCredential("<api key>")
   * );
   * ```
   * @param {string} endpointUrl The URL to Azure Form Recognizer service endpoint
   * @param {AzureKeyCredential} credential Used to authenticate requests to the service.
   * @param {FormRecognizerClientOptions} [options] Used to configure the client.
   */
  constructor(
    endpointUrl: string,
    credential: KeyCredential,
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
   * Retrieves summary information about the cognitive service account
   *
   * @param {GetSummaryOptions} options Options to GetSummary operation
   */
  public async getSummary(options?: GetSummaryOptions) {
    const realOptions: ListModelsOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormTrainingClient-listCustomModels",
      realOptions
    );

    try {
      const result = await this.client.getCustomModels({
        ...operationOptionsToRequestOptionsBase(finalOptions)
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

  /**
   * Mark model for deletion. Model artifacts will be permanently removed within 48 hours.
   *
   * @param {string} modelId Id of the model to mark for deletion
   * @param {DeleteModelOptions} options Options to the Delete Model operation
   */
  public async deleteModel(modelId: string, options?: DeleteModelOptions): Promise<RestResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormTrainingClient-deleteModel",
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

  /**
   * Get detailed information about a model from unsupervised training.
   *
   * @param {string} modelId Id of the model to get information
   * @param {GetModelOptions} options Options to the Get Model operation
   */
  public async getModel(
    modelId: string,
    options: GetModelOptions = {}
  ): Promise<FormModelResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormTrainingClient-getModel",
      realOptions
    );

    try {
      const respnose = await this.client.getCustomModel(modelId, {
        ...operationOptionsToRequestOptionsBase(finalOptions),
        // Include keys is always set to true -- the service does not have a use case for includeKeys: false.
        includeKeys: true
      });
      if (
        respnose.modelInfo.status === "ready" &&
        (respnose.trainResult?.averageModelAccuracy || respnose.trainResult?.fields)
      ) {
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

  /**
   * Get detailed information about a model from supervised training using labels.
   *
   * @param {string} modelId Id of the model to get information
   * @param {GetModelOptions} options Options to the Get Labeled Model operation
   */
  public async getLabeledModel(
    modelId: string,
    options: GetLabeledModelOptions = {}
  ): Promise<LabeledFormModelResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormTrainingClient-getLabeledModel",
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
  ): AsyncIterableIterator<ListModelsResponseModel> {
    let result = await this.list(options);
    yield result;

    while (result.nextLink) {
      result = await this.listNextPage(result.nextLink, options);
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

  /**
   * Returns an async iterable iterator to list information about all models in the cognitive service account.
   *
   * .byPage() returns an async iterable iterator to list the blobs in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * const client = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));
   * const result = client.listModels();
   * let i = 1;
   * for await (const model of result) {
   *   console.log(`model ${i++}:`);
   *   console.log(model);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let i = 1;
   * let iter = client.listModels();
   * let modelItem = await iter.next();
   * while (!modelItem.done) {
   *   console.log(`model ${i++}: ${modelItem.value}`);
   *   modelItem = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   *  let i = 1;
   *  for await (const response of client.listModels().byPage()) {
   *    for (const modelInfo of response.modelList!) {
   *      console.log(`model ${i++}: ${modelInfo.modelId}`);
   *    }
   *  }
   * ```
   *
   * @param {ListModelOptions} options Options to the List Models operation
   */
  public listModels(
    options: ListModelsOptions = {}
  ): PagedAsyncIterableIterator<ModelInfo, ListModelsResponseModel> {
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

  private async list(options?: ListModelsOptions): Promise<ListModelsResponseModel> {
    const realOptions: ListModelsOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormTrainingClient-list",
      realOptions
    );

    try {
      const result = await this.client.listCustomModels({
        ...operationOptionsToRequestOptionsBase(finalOptions)
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

  private async listNextPage(
    nextLink: string,
    options?: ListModelsOptions
  ): Promise<ListModelsResponseModel> {
    const realOptions: ListModelsOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormTrainingClient-listNextPage",
      realOptions
    );

    try {
      const result = await this.client.listCustomModelsNext(nextLink, {
        ...operationOptionsToRequestOptionsBase(finalOptions)
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

  /**
   * Creates and trains a model without using labels (i.e., unsupervised).
   * This method returns a long running operation poller that allows you to wait
   * indefinitely until the copy is completed.
   * You can also cancel a copy before it is completed by calling `cancelOperation` on the poller.
   * Note that the onProgress callback will not be invoked if the operation completes in the first
   * request, and attempting to cancel a completed copy will result in an error being thrown.
   *
   * Example usage:
   * ```ts
   *   const dataSourceUri = process.env["DOCUMENT_SOURCE"] || "<url/path to the training documents>";
   *   const client = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));
   *
   *   const poller = await client.beginTraining(dataSourceUri, {
   *     onProgress: (state) => { console.log(`training status: ${state.status}`); }
   *   });
   *   await poller.pollUntilDone();
   *   const response = poller.getResult();
   *   console.log(response.modelInfo.modelId);
   * ```
   * @summary Creats and trains a model
   * @param {string} source Accessible Uri to an Azure Storage Blob container storing the training documents
   * @param {BeginTrainingOptions} [options] Options to the BeginTraining operation
   */
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

  /**
   * Creates and trains a model using labels (i.e., supervised).
   * This method returns a long running operation poller that allows you to wait
   * indefinitely until the copy is completed.
   * You can also cancel a copy before it is completed by calling `cancelOperation` on the poller.
   * Note that the onProgress callback will not be invoked if the operation completes in the first
   * request, and attempting to cancel a completed copy will result in an error being thrown.
   *
   * Example usage:
   * ```ts
   *   const dataSourceUri = process.env["DOCUMENT_SOURCE"] || "<url/path to the training documents>";
   *   const client = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));
   *
   *   const poller = await client.beginTrainingWithLabel(dataSourceUri, {
   *     onProgress: (state) => { console.log(`training status: ${state.status}`); }
   *   });
   *   await poller.pollUntilDone();
   *   const response = poller.getResult();
   *   console.log(response.modelInfo.modelId);
   * ```
   * @summary Creats and trains a model
   * @param {string} source Accessible Uri to an Azure Storage Blob container storing the training documents and label files
   * @param {BeginTrainingOptions} [options] Options to the BeginTraining operation
   */
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
    const requestBody = {
      source: source,
      sourceFilter: {
        prefix: realOptions.prefix,
        includeSubFolders: realOptions.includeSubFolders
      },
      useLabelFile
    };
    return await client.trainCustomModelAsync(
      requestBody,
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
