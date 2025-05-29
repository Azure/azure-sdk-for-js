import type { dependencyResolutionType } from "./dependencyResolutionType.js";
import type { ModelsRepositoryClientOptions } from "./interfaces/modelsRepositoryClientOptions.js";
import type { GetModelsOptions } from "./interfaces/getModelsOptions.js";
/**
 * Initializes a new instance of the IoT Models Repository Client.
 */
export declare class ModelsRepositoryClient {
    private _repositoryLocation;
    private _dependencyResolution;
    private _apiVersion;
    private _fetcher;
    private _resolver;
    private _pseudoParser;
    /**
     * The ModelsRepositoryClient constructor
     * @param options - The models repository client options that govern the behavior of the client.
     */
    constructor(options?: ModelsRepositoryClientOptions);
    /**
     * improves the readability of the constructor.
     * based on a boolean returns the proper dependency resolution setting string.
     */
    private _checkDefaultDependencyResolution;
    /**
     * Though currently not relevant, can specify API Version for communicating with
     * the service.
     */
    get apiVersion(): string;
    /**
     * Configured repository location for this instance. Will be used as the endpoint to get the models from.
     */
    get repositoryLocation(): string;
    /**
     * Configured type of dependency resolution for this instance. Dictates how the client deals with model dependencies.
     */
    get dependencyResolution(): dependencyResolutionType;
    /**
     * Because of the local / remote optionality of this client, the service client
     * must be dynamically generated based on the repository location. If the provided
     * repository location is a remote location, then this private method will be used
     * to create the IoT Models Repository Service Client.
     */
    private _createClient;
    /**
     * The fetcher is an abstraction necessary since this client can communicate with remote or local
     * Model Repositories based on the provided location. It will analyze the provided location based
     * on that create either an HTTP Fetcher, which uses the IoT Models Repository Service Client,
     * or a Filesystem Fetcher.
     */
    private _createFetcher;
    /**
     * Retrieve one or more models based upon on or more provided dtmis.
     * @param dtmis - one dtmi represented as a string
     * @param options - options to govern behavior of model getter.
     */
    getModels(dtmis: string, options?: GetModelsOptions): Promise<{
        [dtmi: string]: unknown;
    }>;
    /**
     * Retrieve one or more models based upon on or more provided dtmis.
     * @param dtmis - dtmi strings in an array.
     * @param options - options to govern behavior of model getter.
     */
    getModels(dtmis: string[], options?: GetModelsOptions): Promise<{
        [dtmi: string]: unknown;
    }>;
}
//# sourceMappingURL=modelsRepositoryClient.d.ts.map