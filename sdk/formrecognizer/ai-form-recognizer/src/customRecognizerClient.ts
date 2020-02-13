// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineOptions,
  createPipelineFromOptions,
  signingPolicy,
  InternalPipelineOptions,
  isTokenCredential,
  bearerTokenAuthenticationPolicy,
  operationOptionsToRequestOptionsBase,
  OperationOptions
} from "@azure/core-http";
import { TokenCredential } from "@azure/identity";
import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import { GetCustomModelsResponse, Model } from "./generated/models";
import { createSpan } from "./tracing";
import { CanonicalCode } from "@opentelemetry/types";

import { FormRecognizerClient as GeneratedClient } from "./generated/formRecognizerClient";
import { CognitiveKeyCredential } from "./cognitiveKeyCredential";
import { TrainPollerClient, StartTrainingPoller, StartTrainingPollState } from './lro/train/poller';
import { PollOperationState, PollerLike } from '@azure/core-lro';

const DEFAULT_COGNITIVE_SCOPE = "https://cognitiveservices.azure.com/.default";

/**
 * Client options used to configure FormRecognizer API requests.
 */
export interface FormRecognizerClientOptions extends PipelineOptions {}

/**
 * Options common to all form recognizer operations.
 */
export interface FormRecognizerOperationOptions extends OperationOptions {}

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

export type TrainCustomModelOptions = FormRecognizerOperationOptions & {
  prefix?: string;
  includeSubFolders?: boolean;
}

/**
 * Options for the start training operation.
 */
export type StartTrainingOptions = TrainCustomModelOptions & {
  intervalInMs?: number;
  onProgress?: (state: StartTrainingPollState) => void;
  resumeFrom?: string;
}

/**
 * Options for the start training with labels operation.
 */
export type StartTrainingWithLabelsOptions = FormRecognizerOperationOptions & {
  prefix?: string;
  includeSubFolders?: boolean;
}

/**
 * Client class for interacting with Azure Form Recognizer.
 */
export class CustomRecognizerClient {
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

  public async getSummary(
    options?: GetSummaryOptions
  ) {
    const realOptions: ListModelsOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormRecognizerClient-listCustomModels",
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

  public async deleteModel(
    modelId: string,
    options?: DeleteModelOptions) {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormRecognizerClient-deleteModel",
      realOptions
    );

    try {
      return await this.client.deleteCustomModel(modelId, finalOptions);
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

  public async getModel(modelId: string, options: GetModelOptions){
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormRecognizerClient-getModel",
      realOptions
    );

    try {
      return await this.client.getCustomModel(modelId, finalOptions);
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

  public async listModels(
    options?: ListModelsOptions
  ): Promise<GetCustomModelsResponse> {
    const realOptions: ListModelsOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormRecognizerClient-listModels",
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

  public async trainCustomModelInternal(source: string, useLabelFile?: boolean, options?: TrainCustomModelOptions) {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "FormRecognizerClient-startTraining",
      realOptions
    );

    try {
      return await this.client.trainCustomModelAsync({
        source: source,
        sourceFilter: finalOptions,
        useLabelFile
      }, finalOptions);
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
    source:string,
    options: StartTrainingOptions = {}
  ): Promise<PollerLike<PollOperationState<Model>, Model>> {
    const trainPollerClient: TrainPollerClient = {
      getModel: (...args) => this.getModel(...args),
      trainCustomModelInternal: (...args) => this.trainCustomModelInternal(...args)
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
}
