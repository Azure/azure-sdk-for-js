import type { KeepAliveOptions, ExtendedServiceClientOptions } from "@azure/core-http-compat";
import { CompatResponse as HttpOperationResponse, RequestPolicy as IHttpClient, HttpHeadersLike as HttpHeaders, RequestPolicy, RequestPolicyFactory, RequestPolicyOptionsLike as RequestPolicyOptions, WebResourceLike as WebResource } from "@azure/core-http-compat";
import type { ProxySettings as ProxyOptions, UserAgentPolicyOptions as UserAgentOptions } from "@azure/core-rest-pipeline";
import { RequestBodyType as HttpRequestBody } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";
import type { StorageRetryOptions } from "./StorageRetryPolicyFactory.js";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential.js";
import { AnonymousCredential } from "./credentials/AnonymousCredential.js";
import { StorageOAuthScopes } from "./utils/constants.js";
export { StorageOAuthScopes, IHttpClient, HttpHeaders, HttpRequestBody, HttpOperationResponse, WebResource, RequestPolicyFactory, RequestPolicy, RequestPolicyOptions, };
/**
 * A subset of `@azure/core-http` ServiceClientOptions
 */
export interface ServiceClientOptions {
    /**
     * Optional. Configures the HTTP client to send requests and receive responses.
     */
    httpClient?: IHttpClient;
    /**
     * Optional. Overrides the default policy factories.
     */
    requestPolicyFactories?: RequestPolicyFactory[] | ((defaultRequestPolicyFactories: RequestPolicyFactory[]) => void | RequestPolicyFactory[]);
}
/**
 * Option interface for Pipeline constructor.
 */
export interface PipelineOptions {
    /**
     * Optional. Configures the HTTP client to send requests and receive responses.
     */
    httpClient?: IHttpClient;
}
/**
 * An interface for the {@link Pipeline} class containing HTTP request policies.
 * You can create a default Pipeline by calling {@link newPipeline}.
 * Or you can create a Pipeline with your own policies by the constructor of Pipeline.
 *
 * Refer to {@link newPipeline} and provided policies before implementing your
 * customized Pipeline.
 */
export interface PipelineLike {
    /**
     * A list of chained request policy factories.
     */
    readonly factories: RequestPolicyFactory[];
    /**
     * Configures pipeline logger and HTTP client.
     */
    readonly options: PipelineOptions;
    /**
     * Transfer Pipeline object to ServiceClientOptions object which is required by
     * ServiceClient constructor.
     *
     * @returns The ServiceClientOptions object from this Pipeline.
     */
    toServiceClientOptions(): ServiceClientOptions;
}
/**
 * A helper to decide if a given argument satisfies the Pipeline contract
 * @param pipeline - An argument that may be a Pipeline
 * @returns true when the argument satisfies the Pipeline contract
 */
export declare function isPipelineLike(pipeline: unknown): pipeline is PipelineLike;
/**
 * A Pipeline class containing HTTP request policies.
 * You can create a default Pipeline by calling {@link newPipeline}.
 * Or you can create a Pipeline with your own policies by the constructor of Pipeline.
 *
 * Refer to {@link newPipeline} and provided policies before implementing your
 * customized Pipeline.
 */
export declare class Pipeline implements PipelineLike {
    /**
     * A list of chained request policy factories.
     */
    readonly factories: RequestPolicyFactory[];
    /**
     * Configures pipeline logger and HTTP client.
     */
    readonly options: PipelineOptions;
    /**
     * Creates an instance of Pipeline. Customize HTTPClient by implementing IHttpClient interface.
     *
     * @param factories -
     * @param options -
     */
    constructor(factories: RequestPolicyFactory[], options?: PipelineOptions);
    /**
     * Transfer Pipeline object to ServiceClientOptions object which is required by
     * ServiceClient constructor.
     *
     * @returns The ServiceClientOptions object from this Pipeline.
     */
    toServiceClientOptions(): ServiceClientOptions;
}
/**
 * Options interface for the {@link newPipeline} function.
 */
export interface StoragePipelineOptions {
    /**
     * Options to configure a proxy for outgoing requests.
     */
    proxyOptions?: ProxyOptions;
    /**
     * Options for adding user agent details to outgoing requests.
     */
    userAgentOptions?: UserAgentOptions;
    /**
     * Configures the built-in retry policy behavior.
     */
    retryOptions?: StorageRetryOptions;
    /**
     * Keep alive configurations. Default keep-alive is enabled.
     */
    keepAliveOptions?: KeepAliveOptions;
    /**
     * Configures the HTTP client to send requests and receive responses.
     */
    httpClient?: IHttpClient;
    /**
     * The audience used to retrieve an AAD token.
     * By default, audience 'https://storage.azure.com/.default' will be used.
     */
    audience?: string | string[];
}
/**
 * Creates a new Pipeline object with Credential provided.
 *
 * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
 * @param pipelineOptions - Optional. Options.
 * @returns A new Pipeline object.
 */
export declare function newPipeline(credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
export declare function getCoreClientOptions(pipeline: PipelineLike): ExtendedServiceClientOptions;
export declare function getCredentialFromPipeline(pipeline: PipelineLike): StorageSharedKeyCredential | AnonymousCredential | TokenCredential;
//# sourceMappingURL=Pipeline.d.ts.map