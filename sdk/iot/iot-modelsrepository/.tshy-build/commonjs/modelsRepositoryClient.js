"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelsRepositoryClient = void 0;
const tslib_1 = require("tslib");
const constants_js_1 = require("./utils/constants.js");
const core_client_1 = require("@azure/core-client");
const path_js_1 = require("./utils/path.js");
const fetcherFilesystem_js_1 = require("./fetcherFilesystem.js");
const dtmiResolver_js_1 = require("./dtmiResolver.js");
const psuedoParser_js_1 = require("./psuedoParser.js");
const logger_js_1 = require("./logger.js");
const modelsRepositoryServiceClient_js_1 = require("./modelsRepositoryServiceClient.js");
const fetcherHTTP_js_1 = require("./fetcherHTTP.js");
/**
 * Initializes a new instance of the IoT Models Repository Client.
 */
class ModelsRepositoryClient {
    /**
     * The ModelsRepositoryClient constructor
     * @param options - The models repository client options that govern the behavior of the client.
     */
    constructor(options = {}) {
        this._repositoryLocation = options.repositoryLocation || constants_js_1.DEFAULT_REPOSITORY_LOCATION;
        logger_js_1.logger.info(`Client configured for repository location ${this._repositoryLocation}`);
        this._dependencyResolution =
            options.dependencyResolution ||
                this._checkDefaultDependencyResolution(!!options.repositoryLocation);
        logger_js_1.logger.info(`Client configured for dependency mode: ${this._dependencyResolution}`);
        this._fetcher = this._createFetcher(this._repositoryLocation, options);
        this._resolver = new dtmiResolver_js_1.DtmiResolver(this._fetcher);
        this._pseudoParser = new psuedoParser_js_1.PseudoParser(this._resolver);
        // Store api version here (for now). Currently doesn't do anything
        this._apiVersion = options.apiVersion || constants_js_1.DEFAULT_API_VERSION;
    }
    /**
     * improves the readability of the constructor.
     * based on a boolean returns the proper dependency resolution setting string.
     */
    _checkDefaultDependencyResolution(customRepository) {
        if (customRepository) {
            return "enabled";
        }
        else {
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
     * Configured repository location for this instance. Will be used as the endpoint to get the models from.
     */
    get repositoryLocation() {
        return this._repositoryLocation;
    }
    /**
     * Configured type of dependency resolution for this instance. Dictates how the client deals with model dependencies.
     */
    get dependencyResolution() {
        return this._dependencyResolution;
    }
    /**
     * Because of the local / remote optionality of this client, the service client
     * must be dynamically generated based on the repository location. If the provided
     * repository location is a remote location, then this private method will be used
     * to create the IoT Models Repository Service Client.
     */
    _createClient(options) {
        const pipelineOptions = tslib_1.__rest(options, []);
        if (!pipelineOptions.userAgentOptions) {
            pipelineOptions.userAgentOptions = {};
        }
        if (pipelineOptions.userAgentOptions.userAgentPrefix) {
            pipelineOptions.userAgentOptions.userAgentPrefix = `${pipelineOptions.userAgentOptions.userAgentPrefix} ${constants_js_1.DEFAULT_USER_AGENT}`;
        }
        else {
            pipelineOptions.userAgentOptions.userAgentPrefix = constants_js_1.DEFAULT_USER_AGENT;
        }
        const internalPipelineOptions = Object.assign(Object.assign({}, pipelineOptions), {
            loggingOptions: {
                logger: logger_js_1.logger.info,
            },
        });
        const pipeline = (0, core_client_1.createClientPipeline)(internalPipelineOptions);
        const client = new modelsRepositoryServiceClient_js_1.IoTModelsRepositoryServiceClient(this._repositoryLocation, { pipeline });
        return client;
    }
    /**
     * The fetcher is an abstraction necessary since this client can communicate with remote or local
     * Model Repositories based on the provided location. It will analyze the provided location based
     * on that create either an HTTP Fetcher, which uses the IoT Models Repository Service Client,
     * or a Filesystem Fetcher.
     */
    _createFetcher(location, options) {
        let locationURL;
        let fetcher;
        if ((0, path_js_1.isLocalPath)(location)) {
            // POSIX Filesystem Path or Windows Filesystem Path
            logger_js_1.logger.info(`Repository location identified as filesystem path - using FilesystemFetcher`);
            fetcher = new fetcherFilesystem_js_1.FilesystemFetcher((0, path_js_1.normalize)(location));
        }
        else {
            locationURL = new URL(location);
            const prot = locationURL.protocol;
            if (prot.includes("http") || prot.includes("https")) {
                logger_js_1.logger.info(`Repository location identified as HTTP/HTTPS endpoint - using HttpFetcher`);
                const client = this._createClient(options);
                fetcher = new fetcherHTTP_js_1.HttpFetcher(location, client);
            }
            else if (prot.includes("file")) {
                // filesystem URI
                logger_js_1.logger.info("Repository Location identified as filesystem URI - using FilesystemFetcher");
                fetcher = new fetcherFilesystem_js_1.FilesystemFetcher(location);
            }
            else if (prot === "" && location.search(/\.[a-zA-Z]{2,63}$/)) {
                // Web URL with protocol unspecified - default to HTTPS
                logger_js_1.logger.info("Repository Location identified as remote endpoint without protocol specified - using HttpFetcher");
                const fLocation = "https://" + location;
                const client = this._createClient(options);
                fetcher = new fetcherHTTP_js_1.HttpFetcher(fLocation, client);
            }
            else {
                throw new EvalError(`Unable to identify location: ${location}`);
            }
        }
        return fetcher;
    }
    async getModels(dtmis, options) {
        let modelMap;
        if (!Array.isArray(dtmis)) {
            dtmis = [dtmis];
        }
        const dependencyResolution = (options === null || options === void 0 ? void 0 : options.dependencyResolution) || this._dependencyResolution;
        if (dependencyResolution === constants_js_1.DEPENDENCY_MODE_DISABLED) {
            logger_js_1.logger.info("Getting models w/ dependency resolution mode: disabled");
            logger_js_1.logger.info(`Retreiving model(s): ${dtmis}...`);
            modelMap = await this._resolver.resolve(dtmis, false, options);
        }
        else if (dependencyResolution === constants_js_1.DEPENDENCY_MODE_ENABLED) {
            logger_js_1.logger.info(`Getting models w/ dependency resolution mode: enabled`);
            logger_js_1.logger.info(`Retreiving model(s): ${dtmis}...`);
            const baseModelMap = await this._resolver.resolve(dtmis, false, options);
            const baseModelList = Object.keys(baseModelMap).map((key) => baseModelMap[key]);
            logger_js_1.logger.info(`Retreiving model dependencies for ${dtmis}...`);
            modelMap = await this._pseudoParser.expand(baseModelList, false);
        }
        else if (dependencyResolution === constants_js_1.DEPENDENCY_MODE_TRY_FROM_EXPANDED) {
            logger_js_1.logger.info(`Getting models w/ dependency resolution mode: tryFromExpanded`);
            try {
                logger_js_1.logger.info(`Retreiving expanded model(s): ${dtmis}...`);
                modelMap = await this._resolver.resolve(dtmis, true, options);
            }
            catch (e) {
                if (e.name === "RestError" && e.code === "ResouceNotFound") {
                    logger_js_1.logger.info("Could not retrieve model(s) from expanded model DTDL - ");
                    const baseModelMap = await this._resolver.resolve(dtmis, false, options);
                    const baseModelList = Object.keys(baseModelMap).map((key) => baseModelMap[key]);
                    logger_js_1.logger.info(`Retreiving model dependencies for ${dtmis}...`);
                    modelMap = await this._pseudoParser.expand(baseModelList, true);
                }
                else {
                    throw e;
                }
            }
        }
        else {
            throw EvalError(`Invalid dependency resolution mode: ${dependencyResolution}`);
        }
        return modelMap;
    }
}
exports.ModelsRepositoryClient = ModelsRepositoryClient;
//# sourceMappingURL=modelsRepositoryClient.js.map