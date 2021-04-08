// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as constants from './constants';
import {
  InternalPipelineOptions,
  createPipelineFromOptions,
  OperationOptions,
  PipelineOptions,
  ServiceClientOptions
} from "@azure/core-http";
import {dependencyResolutionType} from './dependencyResolutionType';
import {logger} from './logger';
import {modelFetcher} from './modelFetcherHandler';

export interface ModelsRepositoryClientOptions extends PipelineOptions, OperationOptions {
  repositoryLocation: string | undefined;
  dependencyResolution: dependencyResolutionType;
  apiVersion: string | undefined;
}

/**
 * Client providing APIs for Models Repository Operations
 */
export class ModelsRepositoryClient {
  private _repositoryLocation: string;
  private _dependencyResolution: string;
  private _apiVersion: string;
  private _pipeline: ServiceClientOptions;

  constructor(options?: ModelsRepositoryClientOptions) {
    this._repositoryLocation = options?.repositoryLocation || constants.DEFAULT_REPOSITORY_LOCATION;
    this._dependencyResolution = options?.dependencyResolution || this._checkDefaultDependencyResolution(!!options?.repositoryLocation);
    this._apiVersion = options?.apiVersion || constants.DEFAULT_API_VERSION;
    
    const { ...pipelineOptions } = options;

    const libInfo = `azsdk-js-ai-anomalydetector/${constants.SDK_VERSION}`;
    if (!pipelineOptions.userAgentOptions) {
      pipelineOptions.userAgentOptions = {};
    }
    if (pipelineOptions.userAgentOptions.userAgentPrefix) {
      pipelineOptions.userAgentOptions.userAgentPrefix = `${pipelineOptions.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      pipelineOptions.userAgentOptions.userAgentPrefix = libInfo;
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info
        }
      }
    };

    this._pipeline = createPipelineFromOptions(internalPipelineOptions);
  }

  get apiVersion() {
    return this._apiVersion;
  }

  private _checkDefaultDependencyResolution(customRepository: boolean) {
    if (customRepository) {
      return 'enabled';
    } else {
      return 'tryFromExpanded';
    }
  }

  getModels(dtmi: string, dependencyResolution: dependencyResolutionType): Promise<{ [dtmi: string]: any }>;
  getModels(dtmis: string[], dependencyResolution: dependencyResolutionType): Promise<{[dtmi:string]: any }>;
  getModels(dtmis: string | string[], dependencyResolution: dependencyResolutionType): Promise<{[dtmi: string]: any}> {
    if (!Array.isArray(dtmis)) {
      dtmis = [dtmis];
    }
    return modelFetcher(this._pipeline, client, dtmi, this._repositoryLocation, dependencyResolution || this._dependencyResolution);
  }


}
