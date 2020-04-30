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
import { CanonicalCode } from "@opentelemetry/api";
import { FormRecognizerClient as GeneratedClient } from "./generated/formRecognizerClient";
import {
  FormRecognizerClientGetCustomModelsResponse as ListModelsResponseModel,
  Model,
  ModelInfo,
  FormRecognizerClientTrainCustomModelAsyncResponse
} from "./generated/models";
import { TrainPollerClient, BeginTrainingPoller, BeginTrainingPollState } from "./lro/train/poller";
import { PollOperationState, PollerLike } from "@azure/core-lro";
import { FormRecognizerClientOptions, FormRecognizerOperationOptions } from "./common";
import { FormModelResponse, AccountProperties } from "./models";
import { createFormRecognizerAzureKeyCredentialPolicy } from "./azureKeyCredentialPolicy";
import { toFormModelResponse } from "./transforms";

export { ListModelsResponseModel, Model, ModelInfo, RestResponse };
/**
 * Options for model listing operation.
 */
export type ListModelsOptions = FormRecognizerOperationOptions;

/**
 * Options for the get account properties operation.
 */
export type GetAccountPropertiesOptions = FormRecognizerOperationOptions;

/**
 * Options for the delete model operation.
 */
export type DeleteModelOptions = FormRecognizerOperationOptions;

/**
 * Options for the get model operation.
 */
export type GetModelOptions = FormRecognizerOperationOptions;

/**
 * Options for training models
 */
export type TrainModelOptions = FormRecognizerOperationOptions & {
  prefix?: string;
  includeSubFolders?: boolean;
};

/**
 * Options for starting model training operation.
 */
export type BeginTrainingOptions<T> = TrainModelOptions & {
  intervalInMs?: number;
  onProgress?: (state: BeginTrainingPollState<T>) => void;
  resumeFrom?: string;
};

/**
 * Client class for training and managing custom form models.
 */
export class FormTrainingClient {
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
   * @param {string} endpointUrl Url to an Azure Form Recognizer service endpoint
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
   * @param {GetAccountPropertiesOptions} options Options to GetSummary operation
   */
  public async getAccountProperties(
    options?: GetAccountPropertiesOptions
  ): Promise<AccountProperties> {
    const realOptions: ListModelsOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormTrainingClient-listCustomModels",
      realOptions
    );

    try {
      const result = await this.client.getCustomModels({
        ...operationOptionsToRequestOptionsBase(finalOptions)
      });

      return {
        limit: result.summary!.limit,
        count: result.summary!.count
      };
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
   * Get detailed information about a custom model from training.
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
      const response = await this.client.getCustomModel(modelId, {
        ...operationOptionsToRequestOptionsBase(finalOptions),
        // Include keys is always set to true -- the service does not have a use case for includeKeys: false.
        includeKeys: true
      });

      return toFormModelResponse(response);
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
   * Creates and trains a custom form model.
   * This method returns a long running operation poller that allows you to wait
   * indefinitely until the copy is completed.
   * You can also cancel a copy before it is completed by calling `cancelOperation` on the poller.
   * Note that the onProgress callback will not be invoked if the operation completes in the first
   * request, and attempting to cancel a completed copy will result in an error being thrown.
   *
   * Example usage:
   * ```ts
   * const blobContainerUrl = "<url to the blob container storing training documents>";
   * const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
   * const trainingClient = client.getFormTrainingClient();
   *
   * const poller = await trainingClient.beginTraining(blobContainerUrl, {
   *   onProgress: (state) => { console.log("training status: "); console.log(state); }
   * });
   * await poller.pollUntilDone();
   * const response = poller.getResult();
   * console.log(response)
   * ```
   * @summary Creats and trains a model
   * @param {string} blobContainerUrl Accessible url to an Azure Storage Blob container storing the training documents
   * @param {BeginTrainingOptions} [options] Options to start model training operation
   */
  public async beginTraining(
    blobContainerUrl: string,
    useLabels: boolean = false,
    options: BeginTrainingOptions<FormModelResponse> = {}
  ): Promise<PollerLike<PollOperationState<FormModelResponse>, FormModelResponse>> {
    const trainPollerClient: TrainPollerClient<FormModelResponse> = {
      getModel: (modelId: string, options: GetModelOptions) => this.getModel(modelId, options),
      trainCustomModelInternal: (
        source: string,
        _useLabelFile?: boolean,
        options?: TrainModelOptions
      ) => trainCustomModelInternal(this.client, source, useLabels, options)
    };

    const poller = new BeginTrainingPoller({
      client: trainPollerClient,
      source: blobContainerUrl,
      intervalInMs: options.intervalInMs,
      onProgress: options.onProgress,
      resumeFrom: options.resumeFrom,
      trainModelOptions: options
    });

    await poller.poll();
    return poller;
  }
}

/**
 * @private
 */
async function trainCustomModelInternal(
  client: GeneratedClient,
  source: string,
  useLabelFile?: boolean,
  options?: TrainModelOptions
): Promise<FormRecognizerClientTrainCustomModelAsyncResponse> {
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
