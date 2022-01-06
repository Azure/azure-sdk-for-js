// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DEFAULT_API_VERSION,
  DEFAULT_REPOSITORY_LOCATION,
  DEFAULT_USER_AGENT,
  DEPENDENCY_MODE_DISABLED,
  DEPENDENCY_MODE_ENABLED,
  DEPENDENCY_MODE_TRY_FROM_EXPANDED,
} from "./utils/constants";
import { createClientPipeline, InternalClientPipelineOptions } from "@azure/core-client";
import { Fetcher } from "./fetcherAbstract";
import { URL } from "./utils/url";
import { isLocalPath, normalize } from "./utils/path";
import { FilesystemFetcher } from "./fetcherFilesystem";
import { dependencyResolutionType } from "./dependencyResolutionType";
import { DtmiResolver } from "./dtmiResolver";
import { PseudoParser } from "./psuedoParser";
import { ModelsRepositoryClientOptions } from "./interfaces/modelsRepositoryClientOptions";
import { logger } from "./logger";
import { IoTModelsRepositoryServiceClient } from "./modelsRepositoryServiceClient";
import { HttpFetcher } from "./fetcherHTTP";
import { GetModelsOptions } from "./interfaces/getModelsOptions";
import { DTDL } from "./psuedoDtdl";

/**
 * Initializes a new instance of the IoT Models Repository Client.
 */
export class ModelsRepositoryClient {
  private _repositoryLocation: string;
  private _dependencyResolution: dependencyResolutionType;
  private _apiVersion: string;
  private _fetcher: Fetcher;
  private _resolver: DtmiResolver;
  private _pseudoParser: PseudoParser;

  /**
   * The ModelsRepositoryClient constructor
   * @param options - The models repository client options that govern the behavior of the client.
   */
  constructor(options: ModelsRepositoryClientOptions = {}) {
    this._repositoryLocation = options.repositoryLocation || DEFAULT_REPOSITORY_LOCATION;
    logger.info(`Client configured for repository location ${this._repositoryLocation}`);
    this._dependencyResolution =
      options.dependencyResolution ||
      this._checkDefaultDependencyResolution(!!options.repositoryLocation);
    logger.info(`Client configured for dependency mode: ${this._dependencyResolution}`);
    this._fetcher = this._createFetcher(this._repositoryLocation, options);
    this._resolver = new DtmiResolver(this._fetcher);
    this._pseudoParser = new PseudoParser(this._resolver);

    // Store api version here (for now). Currently doesn't do anything
    this._apiVersion = options.apiVersion || DEFAULT_API_VERSION;
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
  get apiVersion(): string {
    return this._apiVersion;
  }

  /**
   * Configured repository location for this instance. Will be used as the endpoint to get the models from.
   */
  get repositoryLocation(): string {
    return this._repositoryLocation;
  }

  /**
   * Configured type of dependency resolution for this instance. Dictates how the client deals with model dependencies.
   */
  get dependencyResolution(): dependencyResolutionType {
    return this._dependencyResolution;
  }

  /**
   * Because of the local / remote optionality of this client, the service client
   * must be dynamically generated based on the repository location. If the provided
   * repository location is a remote location, then this private method will be used
   * to create the IoT Models Repository Service Client.
   */
  private _createClient(options: ModelsRepositoryClientOptions): IoTModelsRepositoryServiceClient {
    const { ...pipelineOptions } = options;

    if (!pipelineOptions.userAgentOptions) {
      pipelineOptions.userAgentOptions = {};
    }
    if (pipelineOptions.userAgentOptions.userAgentPrefix) {
      pipelineOptions.userAgentOptions.userAgentPrefix = `${pipelineOptions.userAgentOptions.userAgentPrefix} ${DEFAULT_USER_AGENT}`;
    } else {
      pipelineOptions.userAgentOptions.userAgentPrefix = DEFAULT_USER_AGENT;
    }

    const internalPipelineOptions: InternalClientPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
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
  private _createFetcher(location: string, options: ModelsRepositoryClientOptions): Fetcher {
    let locationURL;
    let fetcher;
    if (isLocalPath(location)) {
      // POSIX Filesystem Path or Windows Filesystem Path
      logger.info(`Repository location identified as filesystem path - using FilesystemFetcher`);
      fetcher = new FilesystemFetcher(normalize(location));
    } else {
      locationURL = new URL(location);
      const prot = locationURL.protocol;
      if (prot.includes("http") || prot.includes("https")) {
        logger.info(`Repository location identified as HTTP/HTTPS endpoint - using HttpFetcher`);
        const client = this._createClient(options);
        fetcher = new HttpFetcher(location, client);
      } else if (prot.includes("file")) {
        // filesystem URI
        logger.info("Repository Location identified as filesystem URI - using FilesystemFetcher");
        fetcher = new FilesystemFetcher(location);
      } else if (prot === "" && location.search(/\.[a-zA-Z]{2,63}$/)) {
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
   * @param dtmis - one dtmi represented as a string
   * @param options - options to govern behavior of model getter.
   */
  async getModels(dtmis: string, options?: GetModelsOptions): Promise<{ [dtmi: string]: unknown }>;
  /**
   * Retrieve one or more models based upon on or more provided dtmis.
   * @param dtmis - dtmi strings in an array.
   * @param options - options to govern behavior of model getter.
   */
  async getModels(
    dtmis: string[],
    options?: GetModelsOptions
  ): Promise<{ [dtmi: string]: unknown }>;
  async getModels(
    dtmis: string | string[],
    options?: GetModelsOptions
  ): Promise<{ [dtmi: string]: unknown }> {
    let modelMap: { [dtmi: string]: unknown };
    if (!Array.isArray(dtmis)) {
      dtmis = [dtmis];
    }

    const dependencyResolution = options?.dependencyResolution || this._dependencyResolution;

    if (dependencyResolution === DEPENDENCY_MODE_DISABLED) {
      logger.info("Getting models w/ dependency resolution mode: disabled");
      logger.info(`Retreiving model(s): ${dtmis}...`);
      modelMap = await this._resolver.resolve(dtmis, false, options);
    } else if (dependencyResolution === DEPENDENCY_MODE_ENABLED) {
      logger.info(`Getting models w/ dependency resolution mode: enabled`);
      logger.info(`Retreiving model(s): ${dtmis}...`);
      const baseModelMap = await this._resolver.resolve(dtmis, false, options);
      const baseModelList = Object.keys(baseModelMap).map((key) => baseModelMap[key]);
      logger.info(`Retreiving model dependencies for ${dtmis}...`);
      modelMap = await this._pseudoParser.expand(baseModelList, false);
    } else if (dependencyResolution === DEPENDENCY_MODE_TRY_FROM_EXPANDED) {
      logger.info(`Getting models w/ dependency resolution mode: tryFromExpanded`);
      try {
        logger.info(`Retreiving expanded model(s): ${dtmis}...`);
        modelMap = await this._resolver.resolve(dtmis, true, options);
      } catch (e) {
        if (e.name === "RestError" && e.code === "ResouceNotFound") {
          logger.info("Could not retrieve model(s) from expanded model DTDL - ");
          const baseModelMap: { [dtmi: string]: unknown } = await this._resolver.resolve(
            dtmis,
            false,
            options
          );
          const baseModelList = Object.keys(baseModelMap).map((key) => baseModelMap[key]);
          logger.info(`Retreiving model dependencies for ${dtmis}...`);
          modelMap = await this._pseudoParser.expand(baseModelList as DTDL[], true);
        } else {
          throw e;
        }
      }
    } else {
      throw EvalError(`Invalid dependency resolution mode: ${dependencyResolution}`);
    }

    return modelMap;
  }
}
