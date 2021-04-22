// Copyright (c) Microsoft.
// Licensed under the MIT license.

import * as constants from "./constants";

import { 
  GetModelsOptions, 
  IoTModelsRepositoryServiceClient, 
  ModelsRepositoryClientOptions,
  dependencyResolutionType,
  isLocalPath,
  HttpFetcher,
  FilesystemFetcher,
  PseudoParser,
  DtmiResolver,
  ResolverError,
  logger
} from "./internal";
import { createClientPipeline, InternalClientPipelineOptions } from "@azure/core-client";
import { URL } from "url";
import * as path from "path";


/**
 * Initializes a new instance of the IoT Models Repository Client.
 */
export class ModelsRepositoryClient {
  private _repositoryLocation: string;
  private _dependencyResolution: dependencyResolutionType;
  private _apiVersion: string;
  private _fetcher: any;
  private _resolver: any;
  private _pseudoParser: any;

  /**
   * The ModelsRepositoryClient constructor
   * @param options - The models repository client options that govern the behavior of the client.
   */
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


  /**
   * improves the readability of the constructor.
   * based on a boolean returns the proper dependency resolution setting string.
   */
  private _checkDefaultDependencyResolution(customRepository: boolean): dependencyResolutionType {
    if (customRepository) {
      return "enabled";
    } else {
      return "tryFromExpanded";
    }
  }

  /**
   * Though currently not relevant, can specify API Version for communicating with 
   * the service.
   */
  get apiVersion() {
    return this._apiVersion;
  }

  /**
   * Because of the local / remote optionality of this client, the service client 
   * must be dynamically generated based on the repository location. If the provided
   * repository location is a remote location, then this private method will be used
   * to create the IoT Models Repository Service Client.
   */
  private _createClient(options: any) {
    const { ...pipelineOptions } = options;

    if (!pipelineOptions.userAgentOptions) {
      pipelineOptions.userAgentOptions = {};
    }
    if (pipelineOptions.userAgentOptions.userAgentPrefix) {
      pipelineOptions.userAgentOptions.userAgentPrefix = `${pipelineOptions.userAgentOptions.userAgentPrefix} ${constants.DEFAULT_USER_AGENT}`;
    } else {
      pipelineOptions.userAgentOptions.userAgentPrefix = constants.DEFAULT_USER_AGENT;
    }

    const internalPipelineOptions: InternalClientPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info
        }
      }
    };

    const pipeline = createClientPipeline(internalPipelineOptions);
    const client = new IoTModelsRepositoryServiceClient(this._repositoryLocation, { pipeline });
    return client;
  }

  /**
   * The fetcher is an abstraction necessary since this client can communicate with remote or local
   * Model Repositories based on the provided location. It will analyze the provided location based
   * on that create either an HTTP Fetcher, which uses the IoT Models Repository Service Client,
   * or a Filesystem Fetcher.
   */
  private _createFetcher(location: string, options: any) {
    let locationURL;
    let fetcher;
    if (isLocalPath(location)) {
      // POSIX Filesystem Path or Windows Filesystem Path
      logger.info(`Repository location identified as filesystem path - using FilesystemFetcher`);
      fetcher = new FilesystemFetcher(path.normalize(location));
    } else {
      locationURL = new URL(location);
      if (locationURL.protocol in ["http", "https"]) {
        logger.info(`Repository location identified as HTTP/HTTPS endpoint - using HttpFetcher`);
        const client = this._createClient(options);
        fetcher = new HttpFetcher(location, client);
      } else if (locationURL.protocol === "file") {
        // filesystem URI
        logger.info("Repository Location identified as filesystem URI - using FilesystemFetcher");
        fetcher = new FilesystemFetcher(location);
      } else if (locationURL.protocol === "" && location.startsWith("/")) {
      } else if (locationURL.protocol === "" && location.search(/\.[a-zA-Z]{2,63}$/)) {
        // Web URL with protocol unspecified - default to HTTPS
        logger.info(
          "Repository Location identified as remote endpoint without protocol specified - using HttpFetcher"
        );
        const fLocation = "https://" + location;
        const client = this._createClient(options);
        fetcher = new HttpFetcher(fLocation, client);
      } else {
        throw new EvalError(`Unable to identify location: ${location}`);
      }
    }

    return fetcher;
  }

  /**
   * Retrieve one or more models based upon on or more provided dtmis.
   * @param {string} dtmis - one dtmi represented as a string
   * @param {GetModelsOptions} options - options to govern behavior of model getter.
   * @returns {Promise<{ [dtmi: string]: any}>} 
   */
  getModels(dtmis: string, options?: GetModelsOptions): Promise<{ [dtmi: string]: any }>;
    /**
   * Retrieve one or more models based upon on or more provided dtmis.
   * @param {string[]} dtmis - dtmi strings in an array.
   * @param {GetModelsOptions} options - options to govern behavior of model getter.
   * @returns {Promise<{ [dtmi: string]: any}>} 
   */
  getModels(dtmis: string[], options?: GetModelsOptions): Promise<{ [dtmi: string]: any }>;
  getModels(
    dtmis: string | string[],
    options?: GetModelsOptions
  ): Promise<{ [dtmi: string]: any }> {
    let modelMap;
    if (!Array.isArray(dtmis)) {
      dtmis = [dtmis];
    }

    const dependencyResolution = options?.dependencyResolution || this._dependencyResolution;

    if (dependencyResolution === constants.DEPENDENCY_MODE_DISABLED) {
      logger.info("Getting models w/ dependency resolution mode: disabled");
      logger.info(`Retreiving model(s): ${dtmis}...`);
      modelMap = this._resolver.resolve(dtmis);
    } else if (dependencyResolution === constants.DEPENDENCY_MODE_ENABLED) {
      logger.info(`Getting models w/ dependency resolution mode: enabled`);
      logger.info(`Retreiving model(s): ${dtmis}...`);
      const baseModelMap = this._resolver.resolve(dtmis);
      const baseModelList = [baseModelMap.values()];
      logger.info(`Retreiving model dependencies for ${dtmis}...`);
      modelMap = this._pseudoParser.expand(baseModelList);
    } else if (dependencyResolution === constants.DEPENDENCY_MODE_TRY_FROM_EXPANDED) {
      logger.info(`Getting models w/ dependency resolution mode: tryFromExpanded`);
      try {
        logger.info(`Retreiving expanded model(s): ${dtmis}...`);
        modelMap = this._resolver.resolve(dtmis, { expandedModel: true });
      } catch (e) {
        if (e instanceof ResolverError) {
        } else {
          Promise.reject(e);
        }
      }
    } else {
      Promise.reject(EvalError(`Invalid dependency resolution mode: ${dependencyResolution}`));
    }

    return modelMap;
  }
}
