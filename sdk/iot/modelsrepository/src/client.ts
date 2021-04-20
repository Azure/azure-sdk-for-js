// Copyright (c) Microsoft.
// Licensed under the MIT license.

import * as constants from "./constants";

import { createClientPipeline, InternalClientPipelineOptions } from "@azure/core-client";
import { dependencyResolutionType } from "./dependencyResolutionType";
import { logger } from "./logger";
import { URL } from "url";
import { DtmiResolver, ResolverError } from "./resolver";
import { HttpFetcher } from "./httpModelFetcher";
import { FilesystemFetcher } from "./filesystemModelFetcher";
import { isLocalPath } from "./modelFetcherHelper";
import * as path from "path";
import { PseudoParser } from "./psuedoParser";
import { MyServiceClient } from "./serviceClient";

/**
 * This is the ModelsRepositoryClient Library for Javascript.
 * 
 * @remarks
 * This ModelsRepositoryClient is built around getting DTDL Models from a user-specified
 * location. The two main variables are the repositoryLocation, which is a path or URI to either a remote
 * or local repository where the models are located, and the dtmis, which can be one or more dtmis that 
 * will be mapped to specific models contained in the repository location that the user wishes to get.
 * 
 * @example
 * Inline code:
 * ```typescript
 * import lib
 * import {ModelsRepositoryClient} from "../../../src";
 *
 * const repositoryEndpoint = "devicemodels.azure.com";
 * const dtmi = process.argv[2] || "dtmi:azure:DeviceManagement:DeviceInformation;1";
 * 
 * console.log(repositoryEndpoint, dtmi);
 * 
 * async function main() {
 *   const client = new ModelsRepositoryClient({repositoryLocation: repositoryEndpoint});
 *   const result = await client.getModels(dtmi, {dependencyResolution: 'tryFromExpanded'});
 *   console.log(result);
 * }
 * 
 * main().catch((err) => {
 *   console.error("The sample encountered an error:", err);
 * });
 *
 * ```
 * 
 * @packageDocumentation
 */

import * as resolver from "@azure/iot-modelsrepository-resolver";

const repositoryEndpoint = "devicemodels.azure.com";
const dtmi = process.argv[2] || "dtmi:azure:DeviceManagement:DeviceInformation;1";

console.log(repositoryEndpoint, dtmi);

async function main() {
  const result = await resolver.resolve(dtmi, repositoryEndpoint);
  console.log(result);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});


export interface ModelsRepositoryClientOptions extends InternalClientPipelineOptions {
  repositoryLocation?: string;
  apiVersion?: string;
  dependencyResolution?: dependencyResolutionType;
}

/**
 * Client providing APIs for Models Repository Operations
 */
export class ModelsRepositoryClient {
  private _repositoryLocation: string;
  private _dependencyResolution: dependencyResolutionType;
  private _apiVersion: string;
  private _fetcher: any;
  private _resolver: any;
  private _pseudoParser: any;
  client: any;

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
      return "enabled";
    } else {
      return "tryFromExpanded";
    }
  }

  get apiVersion() {
    return this._apiVersion;
  }

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
    const client = new MyServiceClient(this._repositoryLocation, { pipeline });
    return client;
  }

  private _createFetcher(location: string, options: any) {
    // Return a Fetcher based upon the type of location
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
        // TODO: make the next line match a regex specified.
      } else {
        throw new EvalError(`Unable to identify location: ${location}`);
      }
    }

    return fetcher;
  }

  getModels(dtmi: string, options?: getModelsOptions): Promise<{ [dtmi: string]: any }>;
  getModels(dtmis: string[], options?: getModelsOptions): Promise<{ [dtmi: string]: any }>;
  getModels(
    dtmis: string | string[],
    options?: getModelsOptions
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

interface getModelsOptions {
  dependencyResolution: dependencyResolutionType;
}
