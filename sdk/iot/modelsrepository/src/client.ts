// Copyright (c) Microsoft.
// Licensed under the MIT license.

import * as constants from "./constants";
import {
  InternalPipelineOptions,
  createPipelineFromOptions,
  OperationOptions,
  PipelineOptions,
  ServiceClient
} from "@azure/core-http";
import { dependencyResolutionType } from "./dependencyResolutionType";
import { logger } from "./logger";
import { URL, fileURLToPath } from "url";
import { DtmiResolver, ResolverError } from "./resolver";
import { HttpFetcher } from "./httpModelFetcher";
import { FilesystemFetcher } from "./filesystemModelFetcher";
import { isLocalPath } from "./modelFetcherHelper";
import * as path from 'path';
import { PseudoParser } from "./psuedoParser";



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
  private _fetcher: any;
  private _resolver: any;
  private _pseudoParser: any;

  constructor(options?: ModelsRepositoryClientOptions) {
    this._repositoryLocation = options?.repositoryLocation || constants.DEFAULT_REPOSITORY_LOCATION;
    logger.info(`Client configured for repository location ${this._repositoryLocation}`);
    this._dependencyResolution =
      options?.dependencyResolution ||
      this._checkDefaultDependencyResolution(!!options?.repositoryLocation);
    logger.info(`Client configured for dependency mode: ${this._dependencyResolution}`);
    this._fetcher = this._createFetcher(this._repositoryLocation, options);
    this._resolver = new DtmiResolver(this._fetcher);
    this._pseudoParser = new PseudoParser(this._resolver);
    
    // Store api version here (for now). Currently doesn't do anything
    this._apiVersion = options?.apiVersion || constants.DEFAULT_API_VERSION;
  }

  private _checkDefaultDependencyResolution(customRepository: boolean) {
    if (customRepository) {
      return 'enabled';
    } else {
      return 'tryFromExpanded';
    }
  }

  get apiVersion() {
    return this._apiVersion;
  }

  private _createPipeline(options: any) {
    const { ...pipelineOptions } = options;

    if (!pipelineOptions.userAgentOptions) {
      pipelineOptions.userAgentOptions = {};
    }
    if (pipelineOptions.userAgentOptions.userAgentPrefix) {
      pipelineOptions.userAgentOptions.userAgentPrefix = `${pipelineOptions.userAgentOptions.userAgentPrefix} ${constants.DEFAULT_USER_AGENT}`;
    } else {
      pipelineOptions.userAgentOptions.userAgentPrefix = constants.DEFAULT_USER_AGENT;
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info
        }
      }
    };

    const myServiceClientOptions = createPipelineFromOptions(internalPipelineOptions);
    return new ServiceClient(undefined, myServiceClientOptions);
  }

  private _createFetcher(location: string, options: any) {
    // Return a Fetcher based upon the type of location
    let locationURL;      
    let fetcher;
    if (isLocalPath(location)) {
      const localPath = path.normalize(location);
      // POSIX Filesystem Path or Windows Filesystem Path
      logger.info(`Repository location identified as filesystem path - using FilesystemFetcher`)
      fetcher = new FilesystemFetcher(localPath);
    } else {
      locationURL = new URL(location);
      if (locationURL.protocol in ['http', 'https']) {
        logger.info(`Repository location identified as HTTP/HTTPS endpoint - using HttpFetcher`);
        const pipeline = this._createPipeline(options);
        fetcher = new HttpFetcher(location, pipeline);
      } 
      else if (locationURL.protocol === 'file') {
        // filesystem URI
        logger.info('Repository Location identified as filesystem URI - using FilesystemFetcher');
        const localPath = fileURLToPath(location);
        fetcher = new FilesystemFetcher(localPath);
      } else if (locationURL.protocol === '' && location.startsWith('/')) {
      } else if (locationURL.protocol === '' && location.search(/\.[a-zA-Z]{2,63}$/)) {
        // Web URL with protocol unspecified - default to HTTPS
        logger.info('Repository Location identified as remote endpoint without protocol specified - using HttpFetcher');
        const fLocation = 'https://' + location;
        const pipeline = this._createPipeline(options);
        fetcher = new HttpFetcher(fLocation, pipeline);
        // TODO: make the next line match a regex specified.
      } else {
        throw new EvalError(`Unable to identify location: ${location}`);
      }
    }


  }

  getModels(dtmi: string, options: any): Promise<{ [dtmi: string]: any }>;
  getModels(dtmis: string[], options: any): Promise<{ [dtmi: string]: any }>;
  getModels(dtmis: string | string[], options: any): Promise<{ [dtmi: string]: any }> {
    let modelMap;
    if (!Array.isArray(dtmis)) {
      dtmis = [dtmis];
    }

    const dependencyResolution = options.dependencyResolution || this._dependencyResolution;
    
    if (dependencyResolution === constants.DEPENDENCY_MODE_DISABLED) {
      logger.info('Getting models w/ dependency resolution mode: disabled');
      logger.info(`Retreiving model(s): ${dtmis}...`);
      modelMap = this._resolver.resolve(dtmis);
    }
    else if (dependencyResolution === constants.DEPENDENCY_MODE_ENABLED) {
      logger.info(`Getting models w/ dependency resolution mode: enabled`);
      logger.info(`Retreiving model(s): ${dtmis}...`);
      const baseModelMap = this._resolver.resolve(dtmis);
      const baseModelList = [baseModelMap.values()];
      logger.info(`Retreiving model dependencies for ${dtmis}...`);
      modelMap = this._pseudoParser.expand(baseModelList);
    }
    else if (dependencyResolution === constants.DEPENDENCY_MODE_TRY_FROM_EXPANDED) {
      logger.info(`Getting models w/ dependency resolution mode: tryFromExpanded`);
      try {
        logger.info(`Retreiving expanded model(s): ${dtmis}...`);
        modelMap = this._resolver.resolve(dtmis, {expandedModel: true});
      } catch (e) {
        if (e instanceof ResolverError) {}
        else {
          Promise.reject(e);
        }
      }
    }
    else {
      Promise.reject(EvalError(`Invalid dependency resolution mode: ${dependencyResolution}`))
    }

    return modelMap;
  }
}
