// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import {
  createPipelineFromOptions,
  InternalPipelineOptions,
  isTokenCredential,
  bearerTokenAuthenticationPolicy,
  operationOptionsToRequestOptionsBase,
  RestResponse
} from "@azure/core-http";
import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import "@azure/core-paging";
import {
  SDK_VERSION,
  DEFAULT_COGNITIVE_SCOPE,
  FormRecognizerLoggingAllowedHeaderNames,
  FormRecognizerLoggingAllowedQueryParameters
} from "./constants";
import { logger } from "./logger";
import { createSpan } from "./tracing";
import { SpanStatusCode } from "@azure/core-tracing";
import { GeneratedClient } from "./generated/generatedClient";
import {
  GeneratedClientGetCustomModelCopyResultResponse as GetCustomModelCopyResultResponseModel,
  GeneratedClientCopyCustomModelResponse as CopyCustomModelResponseModel,
  GeneratedClientTrainCustomModelAsyncResponse,
  CopyAuthorizationResult,
  GeneratedClientComposeCustomModelsAsyncResponse
} from "./generated/models";
import { TrainPollerClient, BeginTrainingPoller } from "./lro/train/poller";
import { PollOperationState, PollerLike } from "@azure/core-lro";
import { FormRecognizerClientOptions, FormRecognizerOperationOptions } from "./common";
import {
  FormModelResponse,
  AccountProperties,
  CustomFormModel,
  CustomFormModelInfo,
  CopyAuthorization,
  ListCustomModelsResponse,
  OperationStatus,
  ModelStatus
} from "./models";
import { createFormRecognizerAzureKeyCredentialPolicy } from "./azureKeyCredentialPolicy";
import { toFormModelResponse } from "./transforms";
import { CopyModelPollerClient, BeginCopyModelPoller } from "./lro/copy/poller";
import { FormRecognizerClient } from "./formRecognizerClient";

export { RestResponse };

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
 * Options for the generate copy model authorization operation.
 */
export type GetCopyAuthorizationOptions = FormRecognizerOperationOptions;

/**
 * Options for the copy custom model operation.
 */
export type CopyModelOptions = FormRecognizerOperationOptions;

/**
 * Options for the get copy model result operation.
 */
export type GetCopyModelResultOptions = FormRecognizerOperationOptions;

/**
 * The status of a copy model operation
 */
export type CopyModelOperationState = PollOperationState<CustomFormModel> & {
  /**
   * A string representing the current status of the operation.
   */
  status: OperationStatus;
};

/**
 * Options for configuring long-running operations.
 */
export interface FormTrainingPollOperationOptions<TState extends PollOperationState<unknown>> {
  /**
   * Interval (in milliseconds) between requests for status updates on the operation.
   */
  updateIntervalInMs?: number;
  /**
   * Progress handler. The Poller will call this handler with the operation state
   * after polling.
   */
  onProgress?: (state: TState) => void;
  /**
   * State of a previously-serialized poller to resume an operation.
   *
   * The state can be obtained from a poller using `poller.toString()`.
   */
  resumeFrom?: string;
}

/**
 * Options for begin copy model operation
 */
export type BeginCopyModelOptions = FormRecognizerOperationOptions &
  FormTrainingPollOperationOptions<CopyModelOperationState>;

/**
 * Options for training models
 */
export type TrainingFileFilter = FormRecognizerOperationOptions & {
  prefix?: string;
  includeSubfolders?: boolean;
};

/**
 * The status of a form training operation
 */
export type TrainingOperationState = PollOperationState<CustomFormModelInfo> & {
  /**
   * A string representing the current status of the operation.
   */
  status: ModelStatus;
};

/**
 * Options for starting model training operation.
 */
export type BeginTrainingOptions = TrainingFileFilter &
  FormTrainingPollOperationOptions<TrainingOperationState> & {
    /**
     * An optional name to associate with the model
     */
    modelName?: string;
  };

/**
 * Options for creating a composed model from submodels.
 */
export type BeginCreateComposedModelOptions = FormRecognizerOperationOptions &
  FormTrainingPollOperationOptions<TrainingOperationState> & {
    /**
     * An optional name to associate with the composed model.
     *
     * Individual models that are part of the composition will retain their original names.
     */
    modelName?: string;
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
   */
  private readonly credential: TokenCredential | KeyCredential;

  /**
   * @internal
   */
  private readonly clientOptions: FormRecognizerClientOptions;

  /**
   * @internal
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
   * @param endpointUrl - Url to an Azure Form Recognizer service endpoint
   * @param credential - Used to authenticate requests to the service.
   * @param options - Used to configure the client.
   */
  constructor(
    endpointUrl: string,
    credential: TokenCredential | KeyCredential,
    options: FormRecognizerClientOptions = {}
  ) {
    this.endpointUrl = endpointUrl;
    this.credential = credential;
    this.clientOptions = options;
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
   * Retrieves summary information about the cognitive service account
   *
   * @param options - Options to GetSummary operation
   */
  public async getAccountProperties(
    options?: GetAccountPropertiesOptions
  ): Promise<AccountProperties> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormTrainingClient-listCustomModels",
      realOptions
    );

    try {
      const result = await this.client.getCustomModels({
        ...operationOptionsToRequestOptionsBase(finalOptions)
      });

      return {
        customModelLimit: result.summary!.limit,
        customModelCount: result.summary!.count
      };
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates an instance of {@link FormTrainingClient} to perform training operations
   * and to manage trained custom form models.
   */
  public getFormRecognizerClient(): FormRecognizerClient {
    return new FormRecognizerClient(this.endpointUrl, this.credential, this.clientOptions);
  }

  /**
   * Mark model for deletion. Model artifacts will be permanently removed within 48 hours.
   *
   * @param modelId - Id of the model to mark for deletion
   * @param options - Options to the Delete Model operation
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
        code: SpanStatusCode.ERROR,
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
   * @param modelId - Id of the model to get information
   * @param options - Options to the Get Model operation
   */
  public async getCustomModel(
    modelId: string,
    options: GetModelOptions = {}
  ): Promise<FormModelResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormTrainingClient-getCustomModel",
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
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async *listModelsPage(
    settings: PageSettings,
    options: ListModelsOptions = {}
  ): AsyncIterableIterator<ListCustomModelsResponse> {
    let result: ListCustomModelsResponse;
    if (settings.continuationToken) {
      result = await this.listNextPage(settings.continuationToken, options);
    } else {
      result = await this.list(options);
    }
    yield result;

    while (result.nextLink) {
      result = await this.listNextPage(result.nextLink, options);
      yield result;
    }
  }

  private async *listModelsAll(
    settings: PageSettings,
    options: ListModelsOptions = {}
  ): AsyncIterableIterator<CustomFormModelInfo> {
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
   * const result = client.listCustomModels();
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
   * let iter = client.listCustomModels();
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
   *  for await (const response of client.listCustomModels().byPage()) {
   *    for (const modelInfo of response.modelList!) {
   *      console.log(`model ${i++}: ${modelInfo.modelId}`);
   *    }
   *  }
   * ```
   *
   * @param options - Options to the List Models operation
   */
  public listCustomModels(
    options: ListModelsOptions = {}
  ): PagedAsyncIterableIterator<CustomFormModelInfo, ListCustomModelsResponse> {
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

  private async list(options?: ListModelsOptions): Promise<ListCustomModelsResponse> {
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
        code: SpanStatusCode.ERROR,
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
  ): Promise<ListCustomModelsResponse> {
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
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates and trains a custom form model.
   *
   * If the `useTrainingLabels` parameter is set to `true`, then the operation will search
   * for label files in addition to the training documents, and it will create a labeled
   * model with the field names specified by the labels. Otherwise, it will create an
   * unlabeled model automatically that returns generated field names for the items it
   * determines are fields within the document structure.
   *
   * This method returns a long-running operation poller that allows you to wait
   * indefinitely until the operation is completed.
   *
   * Notes:
   * - The onProgress callback will not be invoked if the operation completes in the first
   *   request, and attempting to cancel a completed copy will result in an error being thrown.
   * - Even when the training operation fails, a model is still created in the Azure Form
   *   Recognizer resource.
   *
   * Example usage:
   * ```ts
   * const trainingFilesUrl = "<url to the blob container storing training documents>";
   * const trainingClient = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));
   *
   * const poller = await trainingClient.beginTraining(trainingFilesUrl, false, {
   *   onProgress: (state) => { console.log("training status: "); console.log(state); }
   * });
   * const model = await poller.pollUntilDone();
   * ```
   *
   * Creates and trains a custom form model.
   * @param trainingFilesUrl - Accessible url to an Azure Storage Blob container storing the training documents and optional label files
   * @param useTrainingLabels - Specifies whether or not to search for and train using label files
   * @param options - Options to start the model training operation
   */
  public async beginTraining(
    trainingFilesUrl: string,
    useTrainingLabels: boolean,
    options: BeginTrainingOptions = {}
  ): Promise<PollerLike<TrainingOperationState, CustomFormModel>> {
    const trainPollerClient: TrainPollerClient = {
      getCustomModel: (modelId: string, optionsParam: GetModelOptions) =>
        this.getCustomModel(modelId, optionsParam),
      trainCustomModelInternal: (
        source: string | string[],
        _useLabelFile?: boolean,
        optionsParam?: BeginTrainingOptions
      ) => trainCustomModelInternal(this.client, source as string, useTrainingLabels, optionsParam)
    };

    const poller = new BeginTrainingPoller({
      client: trainPollerClient,
      trainingInputs: trainingFilesUrl,
      updateIntervalInMs: options.updateIntervalInMs,
      onProgress: options.onProgress,
      resumeFrom: options.resumeFrom,
      trainModelOptions: options
    });

    await poller.poll();
    return poller;
  }

  /**
   * Combines pre-existing models with labels into a single composed model.
   *
   * The composed model will contain copies of all of its input submodels, and it will
   * choose (using a machine learning algorithm) the most appropriate of its input models
   * to use during form recognition.
   *
   * This method returns a long-running operation poller that allows you to wait
   * indefinitely until the operation is completed.
   *
   * Notes:
   * - Only labeled models can be composed. Attempting to compose an unlabeled model will
   *   result in an error.
   * - the onProgress callback will not be invoked if the operation completes in the first
   *   request, and attempting to cancel a completed copy will result in an error being thrown.
   * - evena when the training operation fails, a model is still created in the Azure Form
   *   Recognizer resource.
   *
   * Example usage:
   * ```ts
   * const modelIds = ["<model ID 1>", "<model ID 2>", "<model ID 3>"];
   * const trainingClient = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));
   *
   * const poller = await trainingClient.beginCreateComposedModel(modelIds, {
   *   modelName: "<optional name for the composed model>",
   *   onProgress: (state) => { console.log("training status: "); console.log(state); }
   * });
   * const composedModel = await poller.pollUntilDone();
   * ```
   *
   * Combines pre-existing models with labels into a single composed model.
   * @param modelIds - An array of model IDs within the Form Recognizer resouce to compose
   * @param options - Options to start the create composed model operation
   */
  public async beginCreateComposedModel(
    modelIds: string[],
    options: BeginCreateComposedModelOptions
  ): Promise<PollerLike<TrainingOperationState, CustomFormModel>> {
    const composePollerClient: TrainPollerClient = {
      getCustomModel: (modelId, optionsParam) => this.getCustomModel(modelId, optionsParam),
      trainCustomModelInternal: (
        sources: string | string[],
        _?: boolean,
        optionsParam?: BeginTrainingOptions
      ) => composeModelInternal(this.client, sources as string[], optionsParam)
    };

    const poller = new BeginTrainingPoller({
      client: composePollerClient,
      trainingInputs: modelIds,
      updateIntervalInMs: options.updateIntervalInMs,
      onProgress: options.onProgress,
      resumeFrom: options.resumeFrom,
      trainModelOptions: options
    });

    await poller.poll();
    return poller;
  }

  /**
   * Generate an authorization for copying a custom model into this Azure Form Recognizer resource.
   *
   * This method should be called on a client that is authenticated using the target resource (where the
   * model will be copied to) credentials, and the output can be passed as the `target` parameter to the
   * `beginCopyModel` method of a source client.
   *
   * The required `resourceId` and `resourceRegion` are properties of an Azure Form Recognizer resource and their values can be found in the Azure Portal.
   *
   * @param resourceId - Id of the Azure Form Recognizer resource where a custom model will be copied to
   * @param resourceRegion - Location of the Azure Form Recognizer resource, must be a valid region name supported by Azure Cognitive Services. See https://aka.ms/azsdk/cognitiveservices/regionalavailability for information about the regional availability of Azure Cognitive Services.
   * @param options - Options to get copy authorization operation
   * @returns The authorization to copy a custom model
   */
  public async getCopyAuthorization(
    resourceId: string,
    resourceRegion: string,
    options: GetCopyAuthorizationOptions = {}
  ): Promise<CopyAuthorization> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormTrainingClient-getCopyAuthorization",
      options
    );

    try {
      const response = (await this.client.generateModelCopyAuthorization(
        operationOptionsToRequestOptionsBase(finalOptions)
      )) as CopyAuthorizationResult;
      return {
        resourceId: resourceId,
        resourceRegion: resourceRegion,
        expiresOn: new Date(response.expirationDateTimeTicks * 1000), // Convert to ms
        modelId: response.modelId,
        accessToken: response.accessToken
      };
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Copies a custom model from this resource (the source) to the specified target Form Recognizer resource.
   * This method returns a long running operation poller that allows you to wait
   * indefinitely until the operation is completed.
   * Note that the onProgress callback will not be invoked if the operation completes in the first
   * request, and attempting to cancel a completed copy will result in an error being thrown.
   *
   * Example usage:
   * ```ts
   * const targetClient = new FormTrainingClient(targetEndpoint, new AzureKeyCredential(targetApiKey));
   * const authorization = await targetClient.getCopyAuthorization(targetResourceId, targetResourceRegion);
   *
   * const sourceClient = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));
   * const poller = await sourceClient.beginCopyModel(sourceModelId, authorization, {
   *   onProgress: (state) => {
   *     console.log(`Copy model status: ${state.status}`);
   *   }
   * });
   * const result = await poller.pollUntilDone();
   * ```
   * Copies custom model to target resource
   * @param modelId - Id of the custom model in this resource to be copied to the target Form Recognizer resource
   * @param target - Copy authorization produced by calling `targetTrainingClient.getCopyAuthorization()`
   * @param options - Options to copy model operation
   */
  public async beginCopyModel(
    modelId: string,
    target: CopyAuthorization,
    options: BeginCopyModelOptions = {}
  ): Promise<PollerLike<CopyModelOperationState, CustomFormModelInfo>> {
    const copyModelClient: CopyModelPollerClient = {
      beginCopyModel: (...args) => this.beginCopyModelInternal(...args),
      getCopyModelResult: (...args) => this.getCopyModelResult(...args)
    };

    const poller = new BeginCopyModelPoller({
      client: copyModelClient,
      modelId,
      targetResourceId: target.resourceId,
      targetResourceRegion: target.resourceRegion,
      copyAuthorization: target,
      onProgress: options.onProgress,
      resumeFrom: options.resumeFrom,
      ...options
    });

    await poller.poll();
    return poller;
  }

  private async beginCopyModelInternal(
    modelId: string,
    copyAuthorization: CopyAuthorization,
    options: BeginCopyModelOptions = {}
  ): Promise<CopyCustomModelResponseModel> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormTrainingClient-beginCopyModelInternal",
      options
    );

    try {
      return await this.client.copyCustomModel(
        modelId,
        {
          targetResourceId: copyAuthorization.resourceId,
          targetResourceRegion: copyAuthorization.resourceRegion,
          copyAuthorization: {
            modelId: copyAuthorization.modelId,
            accessToken: copyAuthorization.accessToken,
            expirationDateTimeTicks: copyAuthorization.expiresOn.getTime() / 1000
          }
        },
        operationOptionsToRequestOptionsBase(finalOptions)
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async getCopyModelResult(
    modelId: string,
    resultId: string,
    options: GetCopyModelResultOptions = {}
  ): Promise<GetCustomModelCopyResultResponseModel> {
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormTrainingClient-getCopyModelResult",
      options
    );

    try {
      return await this.client.getCustomModelCopyResult(
        modelId,
        resultId,
        operationOptionsToRequestOptionsBase(finalOptions)
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
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
async function composeModelInternal(
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  client: GeneratedClient,
  modelIds: string[],
  options?: BeginCreateComposedModelOptions
): Promise<GeneratedClientComposeCustomModelsAsyncResponse> {
  const { span, updatedOptions: finalOptions } = createSpan("composeModelInternal", options ?? {});

  try {
    return client.composeCustomModelsAsync(
      {
        modelIds,
        modelName: options?.modelName
      },
      operationOptionsToRequestOptionsBase(finalOptions)
    );
  } catch (e) {
    span.setStatus({
      code: SpanStatusCode.ERROR,
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
async function trainCustomModelInternal(
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  client: GeneratedClient,
  source: string,
  useLabelFile?: boolean,
  options?: BeginTrainingOptions
): Promise<GeneratedClientTrainCustomModelAsyncResponse> {
  const realOptions = options || {};
  const { span, updatedOptions: finalOptions } = createSpan(
    "trainCustomModelInternal",
    realOptions
  );

  try {
    return client.trainCustomModelAsync(
      {
        source: source,
        modelName: options?.modelName,
        sourceFilter: {
          prefix: realOptions.prefix,
          includeSubfolders: realOptions.includeSubfolders
        },
        useLabelFile
      },
      operationOptionsToRequestOptionsBase(finalOptions)
    );
  } catch (e) {
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: e.message
    });
    throw e;
  } finally {
    span.end();
  }
}
