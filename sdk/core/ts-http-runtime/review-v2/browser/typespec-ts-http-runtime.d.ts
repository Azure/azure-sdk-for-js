/// <reference lib="esnext" />
// @typespec/ts-http-runtime - Public API Surface
// Graphed by PublicApiGraphEngine.TypeScript

declare module "@typespec/ts-http-runtime" { // 0.3.6

    /** This error is thrown when an asynchronous operation has been aborted.
    Check for this error by testing the `name` that the name property of the
    error matches `"AbortError"`. */
    export class AbortError extends Error {
        constructor(message?: string);
    }


    // Reachable via: RetryInformation → RestError
    // Reachable via: RetryModifiers → RestError
    // Reachable via: RetryStrategy → RestError
    /** A custom error type for failed pipeline requests. */
    export class RestError extends Error {
        static readonly REQUEST_SEND_ERROR: string;
        static readonly PARSE_ERROR: string;
        code?: string;
        statusCode?: number;
        request?: PipelineRequest;
        response?: PipelineResponse;
        details?: unknown;
        constructor(message: string, options?: RestErrorOptions);
    }


    // Reachable via: OAuth2TokenCredential → GetOAuth2TokenOptions
    /** Options used when creating and sending get OAuth 2 requests for this operation. */
    export interface GetOAuth2TokenOptions {
        abortSignal?: AbortSignal;
    }


    // Reachable via: BearerTokenCredential → GetBearerTokenOptions
    /** Options used when creating and sending get bearer token requests for this operation. */
    export interface GetBearerTokenOptions {
        abortSignal?: AbortSignal;
    }


    // Reachable via: ClientCredential → OAuth2TokenCredential
    // Reachable via: ClientOptions → OAuth2TokenCredential
    /** Credential for OAuth2 authentication flows. */
    export interface OAuth2TokenCredential<TFlows extends OAuth2Flow> {
        getOAuth2Token(flows: TFlows[], options?: GetOAuth2TokenOptions): Promise<string>;
    }


    // Reachable via: ClientCredential → BearerTokenCredential
    // Reachable via: ClientOptions → BearerTokenCredential
    /** Credential for Bearer token authentication. */
    export interface BearerTokenCredential {
        getBearerToken(options?: GetBearerTokenOptions): Promise<string>;
    }


    // Reachable via: ClientCredential → BasicCredential
    // Reachable via: ClientOptions → BasicCredential
    /** Credential for HTTP Basic authentication.
    Provides username and password for basic authentication headers. */
    export interface BasicCredential {
        username: string;
        password: string;
    }


    // Reachable via: ClientCredential → ApiKeyCredential
    // Reachable via: ClientOptions → ApiKeyCredential
    /** Credential for API Key authentication.
    Provides an API key that will be used in the request headers. */
    export interface ApiKeyCredential {
        key: string;
    }


    // Reachable via: AdditionalPolicyConfig → AuthorizationCodeFlow
    // Reachable via: AuthScheme → AuthorizationCodeFlow
    // Reachable via: Client → AuthorizationCodeFlow
    // Reachable via: ClientCredential → AuthorizationCodeFlow
    // Reachable via: ClientOptions → AuthorizationCodeFlow
    // Reachable via: FullOperationResponse → AuthorizationCodeFlow
    // Reachable via: HttpClient → AuthorizationCodeFlow
    // Reachable via: HttpResponse → AuthorizationCodeFlow
    // Reachable via: OAuth2AuthScheme → AuthorizationCodeFlow
    // Reachable via: OAuth2Flow → AuthorizationCodeFlow
    // Reachable via: OAuth2TokenCredential → AuthorizationCodeFlow
    // Reachable via: OperationOptions → AuthorizationCodeFlow
    // Reachable via: PathUnchecked → AuthorizationCodeFlow
    // Reachable via: PathUncheckedResponse → AuthorizationCodeFlow
    // Reachable via: Pipeline → AuthorizationCodeFlow
    // Reachable via: PipelinePolicy → AuthorizationCodeFlow
    // Reachable via: PipelineRequest → AuthorizationCodeFlow
    // Reachable via: PipelineRequestOptions → AuthorizationCodeFlow
    // Reachable via: PipelineResponse → AuthorizationCodeFlow
    // Reachable via: RawResponseCallback → AuthorizationCodeFlow
    // Reachable via: ResourceMethods → AuthorizationCodeFlow
    // Reachable via: RestError → AuthorizationCodeFlow
    // Reachable via: RestErrorOptions → AuthorizationCodeFlow
    // Reachable via: RetryInformation → AuthorizationCodeFlow
    // Reachable via: RetryModifiers → AuthorizationCodeFlow
    // Reachable via: RetryStrategy → AuthorizationCodeFlow
    // Reachable via: SendRequest → AuthorizationCodeFlow
    // Reachable via: StreamableMethod → AuthorizationCodeFlow
    /** Represents OAuth2 Authorization Code flow configuration. */
    export interface AuthorizationCodeFlow {
        kind: "authorizationCode";
        authorizationUrl: string;
        tokenUrl: string;
        refreshUrl?: string;
        scopes?: string[];
    }


    // Reachable via: AdditionalPolicyConfig → ClientCredentialsFlow
    // Reachable via: AuthScheme → ClientCredentialsFlow
    // Reachable via: Client → ClientCredentialsFlow
    // Reachable via: ClientCredential → ClientCredentialsFlow
    // Reachable via: ClientOptions → ClientCredentialsFlow
    // Reachable via: FullOperationResponse → ClientCredentialsFlow
    // Reachable via: HttpClient → ClientCredentialsFlow
    // Reachable via: HttpResponse → ClientCredentialsFlow
    // Reachable via: OAuth2AuthScheme → ClientCredentialsFlow
    // Reachable via: OAuth2Flow → ClientCredentialsFlow
    // Reachable via: OAuth2TokenCredential → ClientCredentialsFlow
    // Reachable via: OperationOptions → ClientCredentialsFlow
    // Reachable via: PathUnchecked → ClientCredentialsFlow
    // Reachable via: PathUncheckedResponse → ClientCredentialsFlow
    // Reachable via: Pipeline → ClientCredentialsFlow
    // Reachable via: PipelinePolicy → ClientCredentialsFlow
    // Reachable via: PipelineRequest → ClientCredentialsFlow
    // Reachable via: PipelineRequestOptions → ClientCredentialsFlow
    // Reachable via: PipelineResponse → ClientCredentialsFlow
    // Reachable via: RawResponseCallback → ClientCredentialsFlow
    // Reachable via: ResourceMethods → ClientCredentialsFlow
    // Reachable via: RestError → ClientCredentialsFlow
    // Reachable via: RestErrorOptions → ClientCredentialsFlow
    // Reachable via: RetryInformation → ClientCredentialsFlow
    // Reachable via: RetryModifiers → ClientCredentialsFlow
    // Reachable via: RetryStrategy → ClientCredentialsFlow
    // Reachable via: SendRequest → ClientCredentialsFlow
    // Reachable via: StreamableMethod → ClientCredentialsFlow
    /** Represents OAuth2 Client Credentials flow configuration. */
    export interface ClientCredentialsFlow {
        kind: "clientCredentials";
        tokenUrl: string;
        refreshUrl?: string[];
        scopes?: string[];
    }


    // Reachable via: AdditionalPolicyConfig → ImplicitFlow
    // Reachable via: AuthScheme → ImplicitFlow
    // Reachable via: Client → ImplicitFlow
    // Reachable via: ClientCredential → ImplicitFlow
    // Reachable via: ClientOptions → ImplicitFlow
    // Reachable via: FullOperationResponse → ImplicitFlow
    // Reachable via: HttpClient → ImplicitFlow
    // Reachable via: HttpResponse → ImplicitFlow
    // Reachable via: OAuth2AuthScheme → ImplicitFlow
    // Reachable via: OAuth2Flow → ImplicitFlow
    // Reachable via: OAuth2TokenCredential → ImplicitFlow
    // Reachable via: OperationOptions → ImplicitFlow
    // Reachable via: PathUnchecked → ImplicitFlow
    // Reachable via: PathUncheckedResponse → ImplicitFlow
    // Reachable via: Pipeline → ImplicitFlow
    // Reachable via: PipelinePolicy → ImplicitFlow
    // Reachable via: PipelineRequest → ImplicitFlow
    // Reachable via: PipelineRequestOptions → ImplicitFlow
    // Reachable via: PipelineResponse → ImplicitFlow
    // Reachable via: RawResponseCallback → ImplicitFlow
    // Reachable via: ResourceMethods → ImplicitFlow
    // Reachable via: RestError → ImplicitFlow
    // Reachable via: RestErrorOptions → ImplicitFlow
    // Reachable via: RetryInformation → ImplicitFlow
    // Reachable via: RetryModifiers → ImplicitFlow
    // Reachable via: RetryStrategy → ImplicitFlow
    // Reachable via: SendRequest → ImplicitFlow
    // Reachable via: StreamableMethod → ImplicitFlow
    /** Represents OAuth2 Implicit flow configuration. */
    export interface ImplicitFlow {
        kind: "implicit";
        authorizationUrl: string;
        refreshUrl?: string;
        scopes?: string[];
    }


    // Reachable via: AdditionalPolicyConfig → PasswordFlow
    // Reachable via: AuthScheme → PasswordFlow
    // Reachable via: Client → PasswordFlow
    // Reachable via: ClientCredential → PasswordFlow
    // Reachable via: ClientOptions → PasswordFlow
    // Reachable via: FullOperationResponse → PasswordFlow
    // Reachable via: HttpClient → PasswordFlow
    // Reachable via: HttpResponse → PasswordFlow
    // Reachable via: OAuth2AuthScheme → PasswordFlow
    // Reachable via: OAuth2Flow → PasswordFlow
    // Reachable via: OAuth2TokenCredential → PasswordFlow
    // Reachable via: OperationOptions → PasswordFlow
    // Reachable via: PathUnchecked → PasswordFlow
    // Reachable via: PathUncheckedResponse → PasswordFlow
    // Reachable via: Pipeline → PasswordFlow
    // Reachable via: PipelinePolicy → PasswordFlow
    // Reachable via: PipelineRequest → PasswordFlow
    // Reachable via: PipelineRequestOptions → PasswordFlow
    // Reachable via: PipelineResponse → PasswordFlow
    // Reachable via: RawResponseCallback → PasswordFlow
    // Reachable via: ResourceMethods → PasswordFlow
    // Reachable via: RestError → PasswordFlow
    // Reachable via: RestErrorOptions → PasswordFlow
    // Reachable via: RetryInformation → PasswordFlow
    // Reachable via: RetryModifiers → PasswordFlow
    // Reachable via: RetryStrategy → PasswordFlow
    // Reachable via: SendRequest → PasswordFlow
    // Reachable via: StreamableMethod → PasswordFlow
    /** Represents OAuth2 Password flow configuration. */
    export interface PasswordFlow {
        kind: "password";
        tokenUrl: string;
        refreshUrl?: string;
        scopes?: string[];
    }


    // Reachable via: AdditionalPolicyConfig → BasicAuthScheme
    // Reachable via: AuthScheme → BasicAuthScheme
    // Reachable via: Client → BasicAuthScheme
    // Reachable via: ClientOptions → BasicAuthScheme
    // Reachable via: FullOperationResponse → BasicAuthScheme
    // Reachable via: HttpClient → BasicAuthScheme
    // Reachable via: HttpResponse → BasicAuthScheme
    // Reachable via: OperationOptions → BasicAuthScheme
    // Reachable via: PathUnchecked → BasicAuthScheme
    // Reachable via: PathUncheckedResponse → BasicAuthScheme
    // Reachable via: Pipeline → BasicAuthScheme
    // Reachable via: PipelinePolicy → BasicAuthScheme
    // Reachable via: PipelineRequest → BasicAuthScheme
    // Reachable via: PipelineRequestOptions → BasicAuthScheme
    // Reachable via: PipelineResponse → BasicAuthScheme
    // Reachable via: RawResponseCallback → BasicAuthScheme
    // Reachable via: ResourceMethods → BasicAuthScheme
    // Reachable via: RestError → BasicAuthScheme
    // Reachable via: RestErrorOptions → BasicAuthScheme
    // Reachable via: RetryInformation → BasicAuthScheme
    // Reachable via: RetryModifiers → BasicAuthScheme
    // Reachable via: RetryStrategy → BasicAuthScheme
    // Reachable via: SendRequest → BasicAuthScheme
    // Reachable via: StreamableMethod → BasicAuthScheme
    /** Represents HTTP Basic authentication scheme.
    Basic authentication scheme requires a username and password to be provided with each request.
    The credentials are encoded using Base64 and included in the Authorization header. */
    export interface BasicAuthScheme {
        kind: "http";
        scheme: "basic";
    }


    // Reachable via: AdditionalPolicyConfig → BearerAuthScheme
    // Reachable via: AuthScheme → BearerAuthScheme
    // Reachable via: Client → BearerAuthScheme
    // Reachable via: ClientOptions → BearerAuthScheme
    // Reachable via: FullOperationResponse → BearerAuthScheme
    // Reachable via: HttpClient → BearerAuthScheme
    // Reachable via: HttpResponse → BearerAuthScheme
    // Reachable via: OperationOptions → BearerAuthScheme
    // Reachable via: PathUnchecked → BearerAuthScheme
    // Reachable via: PathUncheckedResponse → BearerAuthScheme
    // Reachable via: Pipeline → BearerAuthScheme
    // Reachable via: PipelinePolicy → BearerAuthScheme
    // Reachable via: PipelineRequest → BearerAuthScheme
    // Reachable via: PipelineRequestOptions → BearerAuthScheme
    // Reachable via: PipelineResponse → BearerAuthScheme
    // Reachable via: RawResponseCallback → BearerAuthScheme
    // Reachable via: ResourceMethods → BearerAuthScheme
    // Reachable via: RestError → BearerAuthScheme
    // Reachable via: RestErrorOptions → BearerAuthScheme
    // Reachable via: RetryInformation → BearerAuthScheme
    // Reachable via: RetryModifiers → BearerAuthScheme
    // Reachable via: RetryStrategy → BearerAuthScheme
    // Reachable via: SendRequest → BearerAuthScheme
    // Reachable via: StreamableMethod → BearerAuthScheme
    /** Represents HTTP Bearer authentication scheme.
    Bearer authentication scheme requires a bearer token to be provided with each request.
    The token is included in the Authorization header with the "Bearer" prefix. */
    export interface BearerAuthScheme {
        kind: "http";
        scheme: "bearer";
    }


    // Reachable via: AdditionalPolicyConfig → NoAuthAuthScheme
    // Reachable via: AuthScheme → NoAuthAuthScheme
    // Reachable via: Client → NoAuthAuthScheme
    // Reachable via: ClientOptions → NoAuthAuthScheme
    // Reachable via: FullOperationResponse → NoAuthAuthScheme
    // Reachable via: HttpClient → NoAuthAuthScheme
    // Reachable via: HttpResponse → NoAuthAuthScheme
    // Reachable via: OperationOptions → NoAuthAuthScheme
    // Reachable via: PathUnchecked → NoAuthAuthScheme
    // Reachable via: PathUncheckedResponse → NoAuthAuthScheme
    // Reachable via: Pipeline → NoAuthAuthScheme
    // Reachable via: PipelinePolicy → NoAuthAuthScheme
    // Reachable via: PipelineRequest → NoAuthAuthScheme
    // Reachable via: PipelineRequestOptions → NoAuthAuthScheme
    // Reachable via: PipelineResponse → NoAuthAuthScheme
    // Reachable via: RawResponseCallback → NoAuthAuthScheme
    // Reachable via: ResourceMethods → NoAuthAuthScheme
    // Reachable via: RestError → NoAuthAuthScheme
    // Reachable via: RestErrorOptions → NoAuthAuthScheme
    // Reachable via: RetryInformation → NoAuthAuthScheme
    // Reachable via: RetryModifiers → NoAuthAuthScheme
    // Reachable via: RetryStrategy → NoAuthAuthScheme
    // Reachable via: SendRequest → NoAuthAuthScheme
    // Reachable via: StreamableMethod → NoAuthAuthScheme
    /** Represents an endpoint or operation that requires no authentication. */
    export interface NoAuthAuthScheme {
        kind: "noAuth";
    }


    // Reachable via: AdditionalPolicyConfig → ApiKeyAuthScheme
    // Reachable via: AuthScheme → ApiKeyAuthScheme
    // Reachable via: Client → ApiKeyAuthScheme
    // Reachable via: ClientOptions → ApiKeyAuthScheme
    // Reachable via: FullOperationResponse → ApiKeyAuthScheme
    // Reachable via: HttpClient → ApiKeyAuthScheme
    // Reachable via: HttpResponse → ApiKeyAuthScheme
    // Reachable via: OperationOptions → ApiKeyAuthScheme
    // Reachable via: PathUnchecked → ApiKeyAuthScheme
    // Reachable via: PathUncheckedResponse → ApiKeyAuthScheme
    // Reachable via: Pipeline → ApiKeyAuthScheme
    // Reachable via: PipelinePolicy → ApiKeyAuthScheme
    // Reachable via: PipelineRequest → ApiKeyAuthScheme
    // Reachable via: PipelineRequestOptions → ApiKeyAuthScheme
    // Reachable via: PipelineResponse → ApiKeyAuthScheme
    // Reachable via: RawResponseCallback → ApiKeyAuthScheme
    // Reachable via: ResourceMethods → ApiKeyAuthScheme
    // Reachable via: RestError → ApiKeyAuthScheme
    // Reachable via: RestErrorOptions → ApiKeyAuthScheme
    // Reachable via: RetryInformation → ApiKeyAuthScheme
    // Reachable via: RetryModifiers → ApiKeyAuthScheme
    // Reachable via: RetryStrategy → ApiKeyAuthScheme
    // Reachable via: SendRequest → ApiKeyAuthScheme
    // Reachable via: StreamableMethod → ApiKeyAuthScheme
    /** Represents API Key authentication scheme.
    API Key authentication requires a key to be provided with each request.
    The key can be provided in different locations: query parameter, header, or cookie. */
    export interface ApiKeyAuthScheme {
        kind: "apiKey";
        apiKeyLocation: "query" | "header" | "cookie";
        name: string;
    }


    // Reachable via: AdditionalPolicyConfig → OAuth2AuthScheme
    // Reachable via: AuthScheme → OAuth2AuthScheme
    // Reachable via: Client → OAuth2AuthScheme
    // Reachable via: ClientOptions → OAuth2AuthScheme
    // Reachable via: FullOperationResponse → OAuth2AuthScheme
    // Reachable via: HttpClient → OAuth2AuthScheme
    // Reachable via: HttpResponse → OAuth2AuthScheme
    // Reachable via: OperationOptions → OAuth2AuthScheme
    // Reachable via: PathUnchecked → OAuth2AuthScheme
    // Reachable via: PathUncheckedResponse → OAuth2AuthScheme
    // Reachable via: Pipeline → OAuth2AuthScheme
    // Reachable via: PipelinePolicy → OAuth2AuthScheme
    // Reachable via: PipelineRequest → OAuth2AuthScheme
    // Reachable via: PipelineRequestOptions → OAuth2AuthScheme
    // Reachable via: PipelineResponse → OAuth2AuthScheme
    // Reachable via: RawResponseCallback → OAuth2AuthScheme
    // Reachable via: ResourceMethods → OAuth2AuthScheme
    // Reachable via: RestError → OAuth2AuthScheme
    // Reachable via: RestErrorOptions → OAuth2AuthScheme
    // Reachable via: RetryInformation → OAuth2AuthScheme
    // Reachable via: RetryModifiers → OAuth2AuthScheme
    // Reachable via: RetryStrategy → OAuth2AuthScheme
    // Reachable via: SendRequest → OAuth2AuthScheme
    // Reachable via: StreamableMethod → OAuth2AuthScheme
    /** Represents OAuth2 authentication scheme with specified flows */
    export interface OAuth2AuthScheme<TFlows extends OAuth2Flow[]> {
        kind: "oauth2";
        flows: TFlows;
    }


    // Reachable via: Client → FullOperationResponse
    // Reachable via: OperationOptions → FullOperationResponse
    // Reachable via: PathUnchecked → FullOperationResponse
    // Reachable via: RawResponseCallback → FullOperationResponse
    // Reachable via: RequestParameters → FullOperationResponse
    // Reachable via: ResourceMethods → FullOperationResponse
    /** Wrapper object for http request and response. Deserialized object is stored in
    the `parsedBody` property when the response body is received in JSON. */
    export interface FullOperationResponse extends PipelineResponse {
        rawHeaders?: RawHttpHeaders;
        parsedBody?: RequestBodyType;
        request: PipelineRequest;
    }


    /** The base options type for all operations. */
    export interface OperationOptions {
        abortSignal?: AbortSignal;
        requestOptions?: OperationRequestOptions;
        onResponse?: RawResponseCallback;
    }


    // Reachable via: OperationOptions → OperationRequestOptions
    /** Options used when creating and sending HTTP requests for this operation. */
    export interface OperationRequestOptions {
        headers?: RawHttpHeadersInput;
        timeout?: number;
        onUploadProgress?: (progress: TransferProgressEvent) => void;
        onDownloadProgress?: (progress: TransferProgressEvent) => void;
        allowInsecureConnection?: boolean;
        skipUrlEncoding?: boolean;
    }


    /** Shape of a Rest Level Client */
    export interface Client {
        pipeline: Pipeline;
        path: Function;
        pathUnchecked: PathUnchecked;
    }


    // Reachable via: Client → ResourceMethods
    // Reachable via: PathUnchecked → ResourceMethods
    /** Defines the methods that can be called on a resource */
    export interface ResourceMethods<TResponse = PromiseLike<PathUncheckedResponse>> {
        get(options?: RequestParameters): TResponse;
        post(options?: RequestParameters): TResponse;
        put(options?: RequestParameters): TResponse;
        patch(options?: RequestParameters): TResponse;
        delete(options?: RequestParameters): TResponse;
        head(options?: RequestParameters): TResponse;
        options(options?: RequestParameters): TResponse;
        trace(options?: RequestParameters): TResponse;
    }


    // Reachable via: ClientOptions → AdditionalPolicyConfig
    /** Used to configure additional policies added to the pipeline at construction. */
    export interface AdditionalPolicyConfig {
        policy: PipelinePolicy;
        position: "perCall" | "perRetry";
    }


    // Reachable via: PathParameters → PathParameterWithOptions
    /** An object that can be passed as a path parameter, allowing for additional options to be set relating to how the parameter is encoded. */
    export interface PathParameterWithOptions {
        value: string | number;
        allowReserved?: boolean;
    }


    // Reachable via: ClientOptions → PipelineOptions
    /** Defines options that are used to configure the HTTP pipeline for
    an SDK client. */
    export interface PipelineOptions {
        retryOptions?: PipelineRetryOptions;
        proxyOptions?: ProxySettings;
        agent?: Agent;
        tlsOptions?: TlsSettings;
        redirectOptions?: RedirectPolicyOptions;
        userAgentOptions?: UserAgentPolicyOptions;
        telemetryOptions?: TelemetryOptions;
    }


    // Reachable via: ClientOptions → TelemetryOptions
    // Reachable via: PipelineOptions → TelemetryOptions
    /** Defines options that are used to configure common telemetry and tracing info */
    export interface TelemetryOptions {
        clientRequestIdHeaderName?: string;
    }


    // Reachable via: AdditionalPolicyConfig → HttpHeaders
    // Reachable via: BodyPart → HttpHeaders
    // Reachable via: Client → HttpHeaders
    // Reachable via: ClientOptions → HttpHeaders
    // Reachable via: FullOperationResponse → HttpHeaders
    // Reachable via: HttpClient → HttpHeaders
    // Reachable via: HttpResponse → HttpHeaders
    // Reachable via: OperationOptions → HttpHeaders
    // Reachable via: PathUnchecked → HttpHeaders
    // Reachable via: PathUncheckedResponse → HttpHeaders
    // Reachable via: Pipeline → HttpHeaders
    // Reachable via: PipelinePolicy → HttpHeaders
    // Reachable via: PipelineRequest → HttpHeaders
    // Reachable via: PipelineRequestOptions → HttpHeaders
    // Reachable via: PipelineResponse → HttpHeaders
    // Reachable via: RawResponseCallback → HttpHeaders
    // Reachable via: ResourceMethods → HttpHeaders
    // Reachable via: RestError → HttpHeaders
    // Reachable via: RestErrorOptions → HttpHeaders
    // Reachable via: RetryInformation → HttpHeaders
    // Reachable via: RetryModifiers → HttpHeaders
    // Reachable via: RetryStrategy → HttpHeaders
    // Reachable via: SendRequest → HttpHeaders
    // Reachable via: StreamableMethod → HttpHeaders
    /** Represents a set of HTTP headers on a request/response.
    Header names are treated as case insensitive. */
    export interface HttpHeaders extends Iterable<[string, string]> {
        get(name: string): string | undefined;
        has(name: string): boolean;
        set(name: string, value: string | number | boolean): void;
        delete(name: string): void;
        toJSON(options?: {
            preserveCase?: boolean;
        }): RawHttpHeaders;
    }


    // Reachable via: AdditionalPolicyConfig → BodyPart
    // Reachable via: Client → BodyPart
    // Reachable via: ClientOptions → BodyPart
    // Reachable via: FullOperationResponse → BodyPart
    // Reachable via: HttpClient → BodyPart
    // Reachable via: HttpResponse → BodyPart
    // Reachable via: MultipartRequestBody → BodyPart
    // Reachable via: OperationOptions → BodyPart
    // Reachable via: PathUnchecked → BodyPart
    // Reachable via: PathUncheckedResponse → BodyPart
    // Reachable via: Pipeline → BodyPart
    // Reachable via: PipelinePolicy → BodyPart
    // Reachable via: PipelineRequest → BodyPart
    // Reachable via: PipelineRequestOptions → BodyPart
    // Reachable via: PipelineResponse → BodyPart
    // Reachable via: RawResponseCallback → BodyPart
    // Reachable via: ResourceMethods → BodyPart
    // Reachable via: RestError → BodyPart
    // Reachable via: RestErrorOptions → BodyPart
    // Reachable via: RetryInformation → BodyPart
    // Reachable via: RetryModifiers → BodyPart
    // Reachable via: RetryStrategy → BodyPart
    // Reachable via: SendRequest → BodyPart
    // Reachable via: StreamableMethod → BodyPart
    /** A part of the request body in a multipart request. */
    export interface BodyPart {
        headers: HttpHeaders;
        body: ((() => WebReadableStream<Uint8Array>) | (() => NodeReadableStream)) | WebReadableStream<Uint8Array> | NodeReadableStream | Uint8Array | Blob;
    }


    // Reachable via: AdditionalPolicyConfig → MultipartRequestBody
    // Reachable via: Client → MultipartRequestBody
    // Reachable via: ClientOptions → MultipartRequestBody
    // Reachable via: FullOperationResponse → MultipartRequestBody
    // Reachable via: HttpClient → MultipartRequestBody
    // Reachable via: HttpResponse → MultipartRequestBody
    // Reachable via: OperationOptions → MultipartRequestBody
    // Reachable via: PathUnchecked → MultipartRequestBody
    // Reachable via: PathUncheckedResponse → MultipartRequestBody
    // Reachable via: Pipeline → MultipartRequestBody
    // Reachable via: PipelinePolicy → MultipartRequestBody
    // Reachable via: PipelineRequest → MultipartRequestBody
    // Reachable via: PipelineRequestOptions → MultipartRequestBody
    // Reachable via: PipelineResponse → MultipartRequestBody
    // Reachable via: RawResponseCallback → MultipartRequestBody
    // Reachable via: ResourceMethods → MultipartRequestBody
    // Reachable via: RestError → MultipartRequestBody
    // Reachable via: RestErrorOptions → MultipartRequestBody
    // Reachable via: RetryInformation → MultipartRequestBody
    // Reachable via: RetryModifiers → MultipartRequestBody
    // Reachable via: RetryStrategy → MultipartRequestBody
    // Reachable via: SendRequest → MultipartRequestBody
    // Reachable via: StreamableMethod → MultipartRequestBody
    /** A request body consisting of multiple parts. */
    export interface MultipartRequestBody {
        parts: BodyPart[];
        boundary?: string;
    }


    // Reachable via: AdditionalPolicyConfig → Agent
    // Reachable via: Client → Agent
    // Reachable via: ClientOptions → Agent
    // Reachable via: FullOperationResponse → Agent
    // Reachable via: HttpClient → Agent
    // Reachable via: HttpResponse → Agent
    // Reachable via: OperationOptions → Agent
    // Reachable via: PathUnchecked → Agent
    // Reachable via: PathUncheckedResponse → Agent
    // Reachable via: Pipeline → Agent
    // Reachable via: PipelineOptions → Agent
    // Reachable via: PipelinePolicy → Agent
    // Reachable via: PipelineRequest → Agent
    // Reachable via: PipelineResponse → Agent
    // Reachable via: RawResponseCallback → Agent
    // Reachable via: ResourceMethods → Agent
    // Reachable via: RestError → Agent
    // Reachable via: RestErrorOptions → Agent
    // Reachable via: RetryInformation → Agent
    // Reachable via: RetryModifiers → Agent
    // Reachable via: RetryStrategy → Agent
    // Reachable via: SendRequest → Agent
    // Reachable via: StreamableMethod → Agent
    /** An interface compatible with NodeJS's `http.Agent`.
    We want to avoid publicly re-exporting the actual interface,
    since it might vary across runtime versions. */
    export interface Agent {
        maxFreeSockets: number;
        maxSockets: number;
        requests: unknown;
        sockets: unknown;
        destroy(): void;
    }


    // Reachable via: AdditionalPolicyConfig → PipelineRequest
    // Reachable via: Client → PipelineRequest
    // Reachable via: ClientOptions → PipelineRequest
    // Reachable via: FullOperationResponse → PipelineRequest
    // Reachable via: HttpClient → PipelineRequest
    // Reachable via: HttpResponse → PipelineRequest
    // Reachable via: OperationOptions → PipelineRequest
    // Reachable via: PathUnchecked → PipelineRequest
    // Reachable via: PathUncheckedResponse → PipelineRequest
    // Reachable via: Pipeline → PipelineRequest
    // Reachable via: PipelinePolicy → PipelineRequest
    // Reachable via: PipelineResponse → PipelineRequest
    // Reachable via: RawResponseCallback → PipelineRequest
    // Reachable via: ResourceMethods → PipelineRequest
    // Reachable via: RestError → PipelineRequest
    // Reachable via: RestErrorOptions → PipelineRequest
    // Reachable via: RetryInformation → PipelineRequest
    // Reachable via: RetryModifiers → PipelineRequest
    // Reachable via: RetryStrategy → PipelineRequest
    // Reachable via: SendRequest → PipelineRequest
    // Reachable via: StreamableMethod → PipelineRequest
    /** Metadata about a request being made by the pipeline. */
    export interface PipelineRequest {
        authSchemes?: AuthScheme[];
        url: string;
        method: HttpMethods;
        headers: HttpHeaders;
        timeout: number;
        withCredentials: boolean;
        requestId: string;
        body?: RequestBodyType;
        multipartBody?: MultipartRequestBody;
        formData?: FormDataMap;
        streamResponseStatusCodes?: Set<number>;
        proxySettings?: ProxySettings;
        disableKeepAlive?: boolean;
        abortSignal?: AbortSignal;
        onUploadProgress?: (progress: TransferProgressEvent) => void;
        onDownloadProgress?: (progress: TransferProgressEvent) => void;
        allowInsecureConnection?: boolean;
        agent?: Agent;
        enableBrowserStreams?: boolean;
        tlsSettings?: TlsSettings;
        requestOverrides?: Record<string, unknown>;
    }


    // Reachable via: AdditionalPolicyConfig → PipelineResponse
    // Reachable via: Client → PipelineResponse
    // Reachable via: ClientOptions → PipelineResponse
    // Reachable via: FullOperationResponse → PipelineResponse
    // Reachable via: HttpClient → PipelineResponse
    // Reachable via: OperationOptions → PipelineResponse
    // Reachable via: PathUnchecked → PipelineResponse
    // Reachable via: Pipeline → PipelineResponse
    // Reachable via: PipelinePolicy → PipelineResponse
    // Reachable via: RawResponseCallback → PipelineResponse
    // Reachable via: RequestParameters → PipelineResponse
    // Reachable via: ResourceMethods → PipelineResponse
    // Reachable via: RestError → PipelineResponse
    // Reachable via: RestErrorOptions → PipelineResponse
    // Reachable via: RetryInformation → PipelineResponse
    // Reachable via: RetryModifiers → PipelineResponse
    // Reachable via: RetryStrategy → PipelineResponse
    // Reachable via: SendRequest → PipelineResponse
    /** Metadata about a response received by the pipeline. */
    export interface PipelineResponse {
        request: PipelineRequest;
        status: number;
        headers: HttpHeaders;
        bodyAsText?: string | null;
        blobBody?: Promise<Blob>;
        browserStreamBody?: WebReadableStream<Uint8Array>;
        readableStreamBody?: NodeReadableStream;
    }


    // Reachable via: ClientOptions → HttpClient
    // Reachable via: Pipeline → HttpClient
    /** The required interface for a client that makes HTTP requests
    on behalf of a pipeline. */
    export interface HttpClient {
        sendRequest: SendRequest;
    }


    // Reachable via: AdditionalPolicyConfig → ProxySettings
    // Reachable via: Client → ProxySettings
    // Reachable via: ClientOptions → ProxySettings
    // Reachable via: FullOperationResponse → ProxySettings
    // Reachable via: HttpClient → ProxySettings
    // Reachable via: HttpResponse → ProxySettings
    // Reachable via: OperationOptions → ProxySettings
    // Reachable via: PathUnchecked → ProxySettings
    // Reachable via: PathUncheckedResponse → ProxySettings
    // Reachable via: Pipeline → ProxySettings
    // Reachable via: PipelineOptions → ProxySettings
    // Reachable via: PipelinePolicy → ProxySettings
    // Reachable via: PipelineRequest → ProxySettings
    // Reachable via: PipelineRequestOptions → ProxySettings
    // Reachable via: PipelineResponse → ProxySettings
    // Reachable via: RawResponseCallback → ProxySettings
    // Reachable via: ResourceMethods → ProxySettings
    // Reachable via: RestError → ProxySettings
    // Reachable via: RestErrorOptions → ProxySettings
    // Reachable via: RetryInformation → ProxySettings
    // Reachable via: RetryModifiers → ProxySettings
    // Reachable via: RetryStrategy → ProxySettings
    // Reachable via: SendRequest → ProxySettings
    // Reachable via: StreamableMethod → ProxySettings
    /** Options to configure a proxy for outgoing requests (Node.js only). */
    export interface ProxySettings {
        host: string;
        port: number;
        username?: string;
        password?: string;
    }


    // Reachable via: ClientOptions → PipelineRetryOptions
    // Reachable via: DefaultRetryPolicyOptions → PipelineRetryOptions
    // Reachable via: PipelineOptions → PipelineRetryOptions
    /** Options that control how to retry failed requests. */
    export interface PipelineRetryOptions {
        maxRetries?: number;
        retryDelayInMs?: number;
        maxRetryDelayInMs?: number;
    }


    // Reachable via: AdditionalPolicyConfig → TlsSettings
    // Reachable via: Client → TlsSettings
    // Reachable via: ClientOptions → TlsSettings
    // Reachable via: FullOperationResponse → TlsSettings
    // Reachable via: HttpClient → TlsSettings
    // Reachable via: HttpResponse → TlsSettings
    // Reachable via: OperationOptions → TlsSettings
    // Reachable via: PathUnchecked → TlsSettings
    // Reachable via: PathUncheckedResponse → TlsSettings
    // Reachable via: Pipeline → TlsSettings
    // Reachable via: PipelineOptions → TlsSettings
    // Reachable via: PipelinePolicy → TlsSettings
    // Reachable via: PipelineRequest → TlsSettings
    // Reachable via: PipelineResponse → TlsSettings
    // Reachable via: RawResponseCallback → TlsSettings
    // Reachable via: ResourceMethods → TlsSettings
    // Reachable via: RestError → TlsSettings
    // Reachable via: RestErrorOptions → TlsSettings
    // Reachable via: RetryInformation → TlsSettings
    // Reachable via: RetryModifiers → TlsSettings
    // Reachable via: RetryStrategy → TlsSettings
    // Reachable via: SendRequest → TlsSettings
    // Reachable via: StreamableMethod → TlsSettings
    /** Represents a certificate for TLS authentication. */
    export interface TlsSettings {
        ca?: string | NodeBuffer | Array<string | NodeBuffer> | undefined;
        cert?: string | NodeBuffer | Array<string | NodeBuffer> | undefined;
        key?: string | NodeBuffer | Array<NodeBuffer | KeyObject> | undefined;
        passphrase?: string | undefined;
        pfx?: string | NodeBuffer | Array<string | NodeBuffer | PxfObject> | undefined;
    }


    // Reachable via: AdditionalPolicyConfig → KeyObject
    // Reachable via: Client → KeyObject
    // Reachable via: ClientOptions → KeyObject
    // Reachable via: FullOperationResponse → KeyObject
    // Reachable via: HttpClient → KeyObject
    // Reachable via: HttpResponse → KeyObject
    // Reachable via: OperationOptions → KeyObject
    // Reachable via: PathUnchecked → KeyObject
    // Reachable via: PathUncheckedResponse → KeyObject
    // Reachable via: Pipeline → KeyObject
    // Reachable via: PipelineOptions → KeyObject
    // Reachable via: PipelinePolicy → KeyObject
    // Reachable via: PipelineRequest → KeyObject
    // Reachable via: PipelineResponse → KeyObject
    // Reachable via: RawResponseCallback → KeyObject
    // Reachable via: ResourceMethods → KeyObject
    // Reachable via: RestError → KeyObject
    // Reachable via: RestErrorOptions → KeyObject
    // Reachable via: RetryInformation → KeyObject
    // Reachable via: RetryModifiers → KeyObject
    // Reachable via: RetryStrategy → KeyObject
    // Reachable via: SendRequest → KeyObject
    // Reachable via: StreamableMethod → KeyObject
    // Reachable via: TlsSettings → KeyObject
    /** An interface compatible with NodeJS's `tls.KeyObject`.
    We want to avoid publicly re-exporting the actual interface,
    since it might vary across runtime versions. */
    export interface KeyObject {
        pem: string | NodeBuffer;
        passphrase?: string | undefined;
    }


    // Reachable via: AdditionalPolicyConfig → PxfObject
    // Reachable via: Client → PxfObject
    // Reachable via: ClientOptions → PxfObject
    // Reachable via: FullOperationResponse → PxfObject
    // Reachable via: HttpClient → PxfObject
    // Reachable via: HttpResponse → PxfObject
    // Reachable via: OperationOptions → PxfObject
    // Reachable via: PathUnchecked → PxfObject
    // Reachable via: PathUncheckedResponse → PxfObject
    // Reachable via: Pipeline → PxfObject
    // Reachable via: PipelineOptions → PxfObject
    // Reachable via: PipelinePolicy → PxfObject
    // Reachable via: PipelineRequest → PxfObject
    // Reachable via: PipelineResponse → PxfObject
    // Reachable via: RawResponseCallback → PxfObject
    // Reachable via: ResourceMethods → PxfObject
    // Reachable via: RestError → PxfObject
    // Reachable via: RestErrorOptions → PxfObject
    // Reachable via: RetryInformation → PxfObject
    // Reachable via: RetryModifiers → PxfObject
    // Reachable via: RetryStrategy → PxfObject
    // Reachable via: SendRequest → PxfObject
    // Reachable via: StreamableMethod → PxfObject
    // Reachable via: TlsSettings → PxfObject
    /** An interface compatible with NodeJS's `tls.PxfObject`.
    We want to avoid publicly re-exporting the actual interface,
    since it might vary across runtime versions. */
    export interface PxfObject {
        buf: string | NodeBuffer;
        passphrase?: string | undefined;
    }


    // Reachable via: ClientOptions → Debugger
    // Reachable via: LogPolicyOptions → Debugger
    // Reachable via: LoggerContext → Debugger
    // Reachable via: RetryPolicyOptions → Debugger
    // Reachable via: RetryStrategy → Debugger
    // Reachable via: TypeSpecRuntimeClientLogger → Debugger
    // Reachable via: TypeSpecRuntimeLogger → Debugger
    /** A log function that can be dynamically enabled and redirected. */
    export interface Debugger {
        enabled: boolean;
        namespace: string;
        destroy(): boolean;
        log(...args: any[]): void;
        extend(namespace: string): Debugger;
        (...args: any[]): void;
    }


    // Reachable via: RetryPolicyOptions → TypeSpecRuntimeLogger
    // Reachable via: RetryStrategy → TypeSpecRuntimeLogger
    /** Defines the methods available on the SDK-facing logger. */
    export interface TypeSpecRuntimeLogger {
        error: Debugger;
        warning: Debugger;
        info: Debugger;
        verbose: Debugger;
    }


    // Reachable via: Pipeline → AddPolicyOptions
    /** Options when adding a policy to the pipeline.
    Used to express dependencies on other policies. */
    export interface AddPolicyOptions {
        beforePolicies?: string[];
        afterPolicies?: string[];
        afterPhase?: PipelinePhase;
        phase?: PipelinePhase;
    }


    // Reachable via: AdditionalPolicyConfig → PipelinePolicy
    // Reachable via: Client → PipelinePolicy
    // Reachable via: ClientOptions → PipelinePolicy
    // Reachable via: Pipeline → PipelinePolicy
    /** A pipeline policy manipulates a request as it travels through the pipeline.
    It is conceptually a middleware that is allowed to modify the request before
    it is made as well as the response when it is received. */
    export interface PipelinePolicy {
        name: string;
        sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse>;
    }


    // Reachable via: Client → Pipeline
    // Reachable via: ClientOptions → Pipeline
    /** Represents a pipeline for making a HTTP request to a URL.
    Pipelines can have multiple policies to manage manipulating each request
    before and after it is made to the server. */
    export interface Pipeline {
        addPolicy(policy: PipelinePolicy, options?: AddPolicyOptions): void;
        removePolicy(options: {
            name?: string;
            phase?: PipelinePhase;
        }): PipelinePolicy[];
        sendRequest(httpClient: HttpClient, request: PipelineRequest): Promise<PipelineResponse>;
        getOrderedPolicies(): PipelinePolicy[];
        clone(): Pipeline;
    }


    /** Settings to initialize a request.
    Almost equivalent to Partial<PipelineRequest>, but url is mandatory. */
    export interface PipelineRequestOptions {
        url: string;
        method?: HttpMethods;
        headers?: HttpHeaders;
        timeout?: number;
        withCredentials?: boolean;
        requestId?: string;
        body?: RequestBodyType;
        multipartBody?: MultipartRequestBody;
        formData?: FormDataMap;
        streamResponseStatusCodes?: Set<number>;
        enableBrowserStreams?: boolean;
        proxySettings?: ProxySettings;
        disableKeepAlive?: boolean;
        abortSignal?: AbortSignal;
        onUploadProgress?: (progress: TransferProgressEvent) => void;
        onDownloadProgress?: (progress: TransferProgressEvent) => void;
        allowInsecureConnection?: boolean;
        authSchemes?: AuthScheme[];
        requestOverrides?: Record<string, unknown>;
    }


    // Reachable via: ClientOptions → LogPolicyOptions
    /** Options to configure the logPolicy. */
    export interface LogPolicyOptions {
        additionalAllowedHeaderNames?: string[];
        additionalAllowedQueryParameters?: string[];
        logger?: Debugger;
    }


    // Reachable via: ClientOptions → RedirectPolicyOptions
    // Reachable via: PipelineOptions → RedirectPolicyOptions
    /** Options for how redirect responses are handled. */
    export interface RedirectPolicyOptions {
        maxRetries?: number;
        allowCrossOriginRedirects?: boolean;
    }


    /** Options that control how to retry failed requests. */
    export interface SystemErrorRetryPolicyOptions {
        maxRetries?: number;
        retryDelayInMs?: number;
        maxRetryDelayInMs?: number;
    }


    /** Options that control how to retry failed requests. */
    export interface ThrottlingRetryPolicyOptions {
        maxRetries?: number;
    }


    // Reachable via: ClientOptions → UserAgentPolicyOptions
    // Reachable via: PipelineOptions → UserAgentPolicyOptions
    /** Options for adding user agent details to outgoing requests. */
    export interface UserAgentPolicyOptions {
        userAgentPrefix?: string;
    }


    // Reachable via: RestError → RestErrorOptions
    /** The options supported by RestError. */
    export interface RestErrorOptions {
        code?: string;
        statusCode?: number;
        request?: PipelineRequest;
        response?: PipelineResponse;
    }


    // Reachable via: ClientOptions → ClientCredential
    /** Union type of all supported authentication credentials. */
    export type ClientCredential = OAuth2TokenCredential<OAuth2Flow> | BearerTokenCredential | BasicCredential | ApiKeyCredential;


    // Reachable via: AdditionalPolicyConfig → OAuth2Flow
    // Reachable via: AuthScheme → OAuth2Flow
    // Reachable via: Client → OAuth2Flow
    // Reachable via: ClientCredential → OAuth2Flow
    // Reachable via: ClientOptions → OAuth2Flow
    // Reachable via: FullOperationResponse → OAuth2Flow
    // Reachable via: HttpClient → OAuth2Flow
    // Reachable via: HttpResponse → OAuth2Flow
    // Reachable via: OAuth2AuthScheme → OAuth2Flow
    // Reachable via: OAuth2TokenCredential → OAuth2Flow
    // Reachable via: OperationOptions → OAuth2Flow
    // Reachable via: PathUnchecked → OAuth2Flow
    // Reachable via: PathUncheckedResponse → OAuth2Flow
    // Reachable via: Pipeline → OAuth2Flow
    // Reachable via: PipelinePolicy → OAuth2Flow
    // Reachable via: PipelineRequest → OAuth2Flow
    // Reachable via: PipelineRequestOptions → OAuth2Flow
    // Reachable via: PipelineResponse → OAuth2Flow
    // Reachable via: RawResponseCallback → OAuth2Flow
    // Reachable via: ResourceMethods → OAuth2Flow
    // Reachable via: RestError → OAuth2Flow
    // Reachable via: RestErrorOptions → OAuth2Flow
    // Reachable via: RetryInformation → OAuth2Flow
    // Reachable via: RetryModifiers → OAuth2Flow
    // Reachable via: RetryStrategy → OAuth2Flow
    // Reachable via: SendRequest → OAuth2Flow
    // Reachable via: StreamableMethod → OAuth2Flow
    /** Union type of all supported OAuth2 flows */
    export type OAuth2Flow = AuthorizationCodeFlow | ClientCredentialsFlow | ImplicitFlow | PasswordFlow;


    // Reachable via: AdditionalPolicyConfig → AuthScheme
    // Reachable via: Client → AuthScheme
    // Reachable via: ClientOptions → AuthScheme
    // Reachable via: FullOperationResponse → AuthScheme
    // Reachable via: HttpClient → AuthScheme
    // Reachable via: HttpResponse → AuthScheme
    // Reachable via: OperationOptions → AuthScheme
    // Reachable via: PathUnchecked → AuthScheme
    // Reachable via: PathUncheckedResponse → AuthScheme
    // Reachable via: Pipeline → AuthScheme
    // Reachable via: PipelinePolicy → AuthScheme
    // Reachable via: PipelineRequest → AuthScheme
    // Reachable via: PipelineRequestOptions → AuthScheme
    // Reachable via: PipelineResponse → AuthScheme
    // Reachable via: RawResponseCallback → AuthScheme
    // Reachable via: ResourceMethods → AuthScheme
    // Reachable via: RestError → AuthScheme
    // Reachable via: RestErrorOptions → AuthScheme
    // Reachable via: RetryInformation → AuthScheme
    // Reachable via: RetryModifiers → AuthScheme
    // Reachable via: RetryStrategy → AuthScheme
    // Reachable via: SendRequest → AuthScheme
    // Reachable via: StreamableMethod → AuthScheme
    /** Union type of all supported authentication schemes */
    export type AuthScheme = BasicAuthScheme | BearerAuthScheme | NoAuthAuthScheme | ApiKeyAuthScheme | OAuth2AuthScheme<OAuth2Flow[]>;


    // Reachable via: Client → RequestParameters
    // Reachable via: PathUnchecked → RequestParameters
    // Reachable via: ResourceMethods → RequestParameters
    /** Shape of the default request parameters, this may be overridden by the specific
    request types to provide strong types */
    export type RequestParameters = {
        /**
         * Headers to send along with the request
         */
        headers?: RawHttpHeadersInput;
        /**
         * Sets the accept header to send to the service
         * defaults to 'application/json'. If also a header "accept" is set
         * this property will take precedence.
         */
        accept?: string;
        /**
         * Body to send with the request
         */
        body?: unknown;
        /**
         * Query parameters to send with the request
         */
        queryParameters?: Record<string, unknown>;
        /**
         * Set an explicit content-type to send with the request. If also a header "content-type" is set
         * this property will take precedence.
         */
        contentType?: string;
        /** Set to true if the request is sent over HTTP instead of HTTPS */
        allowInsecureConnection?: boolean;
        /** Set to true if you want to skip encoding the path parameters */
        skipUrlEncoding?: boolean;
        /**
         * Path parameters for custom the base url
         */
        pathParameters?: Record<string, any>;
        /**
         * The number of milliseconds a request can take before automatically being terminated.
         */
        timeout?: number;
        /**
         * Callback which fires upon upload progress.
         */
        onUploadProgress?: (progress: TransferProgressEvent) => void;
        /**
         * Callback which fires upon download progress.
         */
        onDownloadProgress?: (progress: TransferProgressEvent) => void;
        /**
         * The signal which can be used to abort requests.
         */
        abortSignal?: AbortSignal;
        /**
         * A function to be called each time a response is received from the server
         * while performing the requested operation.
         * May be called multiple times.
         */
        onResponse?: RawResponseCallback;
    };


    // Reachable via: Client → RawResponseCallback
    // Reachable via: OperationOptions → RawResponseCallback
    // Reachable via: PathUnchecked → RawResponseCallback
    // Reachable via: RequestParameters → RawResponseCallback
    // Reachable via: ResourceMethods → RawResponseCallback
    /** A function to be called each time a response is received from the server
    while performing the requested operation.
    May be called multiple times. */
    export type RawResponseCallback = (rawResponse: FullOperationResponse, error?: unknown) => void;


    // Reachable via: Client → PathUncheckedResponse
    // Reachable via: PathUnchecked → PathUncheckedResponse
    // Reachable via: ResourceMethods → PathUncheckedResponse
    // Reachable via: StreamableMethod → PathUncheckedResponse
    /** Type to use with pathUnchecked, overrides the body type to any to allow flexibility */
    export type PathUncheckedResponse = HttpResponse & {
        body: any;
    };


    // Reachable via: Client → HttpNodeStreamResponse
    // Reachable via: PathUnchecked → HttpNodeStreamResponse
    // Reachable via: StreamableMethod → HttpNodeStreamResponse
    /** Http Response which body is a NodeJS stream object */
    export type HttpNodeStreamResponse = HttpResponse & {
        /**
         * Streamable body
         */
        body?: NodeReadableStream;
    };


    // Reachable via: Client → HttpBrowserStreamResponse
    // Reachable via: PathUnchecked → HttpBrowserStreamResponse
    // Reachable via: StreamableMethod → HttpBrowserStreamResponse
    /** Http Response which body is a NodeJS stream object */
    export type HttpBrowserStreamResponse = HttpResponse & {
        /**
         * Streamable body
         */
        body?: WebReadableStream<Uint8Array>;
    };


    // Reachable via: Client → StreamableMethod
    // Reachable via: PathUnchecked → StreamableMethod
    /** Defines the type for a method that supports getting the response body as
    a raw stream */
    export type StreamableMethod<TResponse = PathUncheckedResponse> = PromiseLike<TResponse> & {
        /**
         * Returns the response body as a NodeJS stream. Only available in Node-like environments.
         */
        asNodeStream: () => Promise<HttpNodeStreamResponse>;
        /**
         * Returns the response body as a browser (Web) stream. Only available in the browser. If you require a Web Stream of the response in Node, consider using the
         * `Readable.toWeb` Node API on the result of `asNodeStream`.
         */
        asBrowserStream: () => Promise<HttpBrowserStreamResponse>;
    };


    // Reachable via: Client → PathUnchecked
    /** Defines the signature for pathUnchecked. */
    export type PathUnchecked = <TPath extends string>(path: TPath, ...args: PathParameters<TPath>) => ResourceMethods<StreamableMethod>;


    /** General options that a Rest Level Client can take */
    export type ClientOptions = PipelineOptions & {
        /**
         * List of authentication schemes supported by the client.
         * These schemes define how the client can authenticate requests.
         */
        authSchemes?: AuthScheme[];
        /**
         * The credential used to authenticate requests.
         * Must be compatible with one of the specified authentication schemes.
         */
        credential?: ClientCredential;
        /**
         * Endpoint for the client
         */
        endpoint?: string;
        /**
         * Options for setting a custom apiVersion.
         */
        apiVersion?: string;
        /**
         * Option to allow calling http (insecure) endpoints
         */
        allowInsecureConnection?: boolean;
        /**
         * Additional policies to include in the HTTP pipeline.
         */
        additionalPolicies?: AdditionalPolicyConfig[];
        /**
         * Specify a custom HttpClient when making requests.
         */
        httpClient?: HttpClient;
        /**
         * Options to configure request/response logging.
         */
        loggingOptions?: LogPolicyOptions;
        /**
         * Pipeline to use for the client. If not provided, a default pipeline will be created using the options provided.
         * Use with caution -- when setting this option, all client options that are used in the creation of the default pipeline
         * will be ignored.
         */
        pipeline?: Pipeline;
    };


    // Reachable via: Client → HttpResponse
    // Reachable via: HttpBrowserStreamResponse → HttpResponse
    // Reachable via: HttpNodeStreamResponse → HttpResponse
    // Reachable via: PathUnchecked → HttpResponse
    // Reachable via: PathUncheckedResponse → HttpResponse
    // Reachable via: ResourceMethods → HttpResponse
    // Reachable via: StreamableMethod → HttpResponse
    /** Represents the shape of an HttpResponse */
    export type HttpResponse = {
        /**
         * The request that generated this response.
         */
        request: PipelineRequest;
        /**
         * The HTTP response headers.
         */
        headers: RawHttpHeaders;
        /**
         * Parsed body
         */
        body: unknown;
        /**
         * The HTTP status code of the response.
         */
        status: string;
    };


    // Reachable via: Client → PathParameters
    // Reachable via: PathUnchecked → PathParameters
    /** Helper type used to detect parameters in a path template
    text surrounded by \{\} will be considered a path parameter */
    export type PathParameters<TRoute extends string> = TRoute extends `${infer _Head}/{${infer _Param}}${infer Tail}` ? [
        pathParameter: string | number | PathParameterWithOptions,
        ...pathParameters: PathParameters<Tail>
    ] : [
    ];


    // Reachable via: AdditionalPolicyConfig → RawHttpHeaders
    // Reachable via: BodyPart → RawHttpHeaders
    // Reachable via: Client → RawHttpHeaders
    // Reachable via: ClientOptions → RawHttpHeaders
    // Reachable via: FullOperationResponse → RawHttpHeaders
    // Reachable via: HttpClient → RawHttpHeaders
    // Reachable via: HttpHeaders → RawHttpHeaders
    // Reachable via: HttpResponse → RawHttpHeaders
    // Reachable via: OperationOptions → RawHttpHeaders
    // Reachable via: PathUnchecked → RawHttpHeaders
    // Reachable via: PathUncheckedResponse → RawHttpHeaders
    // Reachable via: Pipeline → RawHttpHeaders
    // Reachable via: PipelinePolicy → RawHttpHeaders
    // Reachable via: PipelineRequest → RawHttpHeaders
    // Reachable via: PipelineRequestOptions → RawHttpHeaders
    // Reachable via: PipelineResponse → RawHttpHeaders
    // Reachable via: RawResponseCallback → RawHttpHeaders
    // Reachable via: RequestParameters → RawHttpHeaders
    // Reachable via: ResourceMethods → RawHttpHeaders
    // Reachable via: RestError → RawHttpHeaders
    // Reachable via: RestErrorOptions → RawHttpHeaders
    // Reachable via: RetryInformation → RawHttpHeaders
    // Reachable via: RetryModifiers → RawHttpHeaders
    // Reachable via: RetryStrategy → RawHttpHeaders
    // Reachable via: SendRequest → RawHttpHeaders
    // Reachable via: StreamableMethod → RawHttpHeaders
    /** A HttpHeaders collection represented as a simple JSON object. */
    export type RawHttpHeaders = {
        [headerName: string]: string;
    };


    // Reachable via: Client → RawHttpHeadersInput
    // Reachable via: OperationOptions → RawHttpHeadersInput
    // Reachable via: OperationRequestOptions → RawHttpHeadersInput
    // Reachable via: PathUnchecked → RawHttpHeadersInput
    // Reachable via: RequestParameters → RawHttpHeadersInput
    // Reachable via: ResourceMethods → RawHttpHeadersInput
    /** A HttpHeaders collection for input, represented as a simple JSON object. */
    export type RawHttpHeadersInput = Record<string, string | number | boolean>;


    // Reachable via: AdditionalPolicyConfig → RequestBodyType
    // Reachable via: Client → RequestBodyType
    // Reachable via: ClientOptions → RequestBodyType
    // Reachable via: FullOperationResponse → RequestBodyType
    // Reachable via: HttpClient → RequestBodyType
    // Reachable via: HttpResponse → RequestBodyType
    // Reachable via: OperationOptions → RequestBodyType
    // Reachable via: PathUnchecked → RequestBodyType
    // Reachable via: PathUncheckedResponse → RequestBodyType
    // Reachable via: Pipeline → RequestBodyType
    // Reachable via: PipelinePolicy → RequestBodyType
    // Reachable via: PipelineRequest → RequestBodyType
    // Reachable via: PipelineRequestOptions → RequestBodyType
    // Reachable via: PipelineResponse → RequestBodyType
    // Reachable via: RawResponseCallback → RequestBodyType
    // Reachable via: RequestParameters → RequestBodyType
    // Reachable via: ResourceMethods → RequestBodyType
    // Reachable via: RestError → RequestBodyType
    // Reachable via: RestErrorOptions → RequestBodyType
    // Reachable via: RetryInformation → RequestBodyType
    // Reachable via: RetryModifiers → RequestBodyType
    // Reachable via: RetryStrategy → RequestBodyType
    // Reachable via: SendRequest → RequestBodyType
    // Reachable via: StreamableMethod → RequestBodyType
    /** Types of bodies supported on the request.
    NodeJS.ReadableStream and () =\> NodeJS.ReadableStream is Node only.
    Blob, ReadableStream<Uint8Array>, and () =\> ReadableStream<Uint8Array> are browser only. */
    export type RequestBodyType = NodeReadableStream | (() => NodeReadableStream) | WebReadableStream<Uint8Array> | (() => WebReadableStream<Uint8Array>) | Blob | ArrayBuffer | ArrayBufferView | FormData | string | null;


    // Reachable via: ClientOptions → SendRequest
    // Reachable via: HttpClient → SendRequest
    // Reachable via: Pipeline → SendRequest
    // Reachable via: PipelinePolicy → SendRequest
    /** A simple interface for making a pipeline request and receiving a response. */
    export type SendRequest = (request: PipelineRequest) => Promise<PipelineResponse>;


    // Reachable via: AdditionalPolicyConfig → TransferProgressEvent
    // Reachable via: Client → TransferProgressEvent
    // Reachable via: ClientOptions → TransferProgressEvent
    // Reachable via: FullOperationResponse → TransferProgressEvent
    // Reachable via: HttpClient → TransferProgressEvent
    // Reachable via: HttpResponse → TransferProgressEvent
    // Reachable via: OperationOptions → TransferProgressEvent
    // Reachable via: OperationRequestOptions → TransferProgressEvent
    // Reachable via: PathUnchecked → TransferProgressEvent
    // Reachable via: PathUncheckedResponse → TransferProgressEvent
    // Reachable via: Pipeline → TransferProgressEvent
    // Reachable via: PipelinePolicy → TransferProgressEvent
    // Reachable via: PipelineRequest → TransferProgressEvent
    // Reachable via: PipelineRequestOptions → TransferProgressEvent
    // Reachable via: PipelineResponse → TransferProgressEvent
    // Reachable via: RawResponseCallback → TransferProgressEvent
    // Reachable via: RequestParameters → TransferProgressEvent
    // Reachable via: ResourceMethods → TransferProgressEvent
    // Reachable via: RestError → TransferProgressEvent
    // Reachable via: RestErrorOptions → TransferProgressEvent
    // Reachable via: RetryInformation → TransferProgressEvent
    // Reachable via: RetryModifiers → TransferProgressEvent
    // Reachable via: RetryStrategy → TransferProgressEvent
    // Reachable via: SendRequest → TransferProgressEvent
    // Reachable via: StreamableMethod → TransferProgressEvent
    /** Fired in response to upload or download progress. */
    export type TransferProgressEvent = {
        /**
         * The number of bytes loaded so far.
         */
        loadedBytes: number;
    };


    // Reachable via: AdditionalPolicyConfig → HttpMethods
    // Reachable via: Client → HttpMethods
    // Reachable via: ClientOptions → HttpMethods
    // Reachable via: FullOperationResponse → HttpMethods
    // Reachable via: HttpClient → HttpMethods
    // Reachable via: HttpResponse → HttpMethods
    // Reachable via: OperationOptions → HttpMethods
    // Reachable via: PathUnchecked → HttpMethods
    // Reachable via: PathUncheckedResponse → HttpMethods
    // Reachable via: Pipeline → HttpMethods
    // Reachable via: PipelinePolicy → HttpMethods
    // Reachable via: PipelineRequest → HttpMethods
    // Reachable via: PipelineRequestOptions → HttpMethods
    // Reachable via: PipelineResponse → HttpMethods
    // Reachable via: RawResponseCallback → HttpMethods
    // Reachable via: ResourceMethods → HttpMethods
    // Reachable via: RestError → HttpMethods
    // Reachable via: RestErrorOptions → HttpMethods
    // Reachable via: RetryInformation → HttpMethods
    // Reachable via: RetryModifiers → HttpMethods
    // Reachable via: RetryStrategy → HttpMethods
    // Reachable via: SendRequest → HttpMethods
    // Reachable via: StreamableMethod → HttpMethods
    /** Supported HTTP methods to use when making requests. */
    export type HttpMethods = "GET" | "PUT" | "POST" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "TRACE";


    // Reachable via: AdditionalPolicyConfig → FormDataValue
    // Reachable via: Client → FormDataValue
    // Reachable via: ClientOptions → FormDataValue
    // Reachable via: FormDataMap → FormDataValue
    // Reachable via: FullOperationResponse → FormDataValue
    // Reachable via: HttpClient → FormDataValue
    // Reachable via: HttpResponse → FormDataValue
    // Reachable via: OperationOptions → FormDataValue
    // Reachable via: PathUnchecked → FormDataValue
    // Reachable via: PathUncheckedResponse → FormDataValue
    // Reachable via: Pipeline → FormDataValue
    // Reachable via: PipelinePolicy → FormDataValue
    // Reachable via: PipelineRequest → FormDataValue
    // Reachable via: PipelineRequestOptions → FormDataValue
    // Reachable via: PipelineResponse → FormDataValue
    // Reachable via: RawResponseCallback → FormDataValue
    // Reachable via: ResourceMethods → FormDataValue
    // Reachable via: RestError → FormDataValue
    // Reachable via: RestErrorOptions → FormDataValue
    // Reachable via: RetryInformation → FormDataValue
    // Reachable via: RetryModifiers → FormDataValue
    // Reachable via: RetryStrategy → FormDataValue
    // Reachable via: SendRequest → FormDataValue
    // Reachable via: StreamableMethod → FormDataValue
    /** Each form data entry can be a string, Blob, or a File. If you wish to pass a file with a name but do not have
    access to the File class, you can use the createFile helper to create one. */
    export type FormDataValue = string | Blob | File;


    // Reachable via: AdditionalPolicyConfig → FormDataMap
    // Reachable via: Client → FormDataMap
    // Reachable via: ClientOptions → FormDataMap
    // Reachable via: FullOperationResponse → FormDataMap
    // Reachable via: HttpClient → FormDataMap
    // Reachable via: HttpResponse → FormDataMap
    // Reachable via: OperationOptions → FormDataMap
    // Reachable via: PathUnchecked → FormDataMap
    // Reachable via: PathUncheckedResponse → FormDataMap
    // Reachable via: Pipeline → FormDataMap
    // Reachable via: PipelinePolicy → FormDataMap
    // Reachable via: PipelineRequest → FormDataMap
    // Reachable via: PipelineRequestOptions → FormDataMap
    // Reachable via: PipelineResponse → FormDataMap
    // Reachable via: RawResponseCallback → FormDataMap
    // Reachable via: ResourceMethods → FormDataMap
    // Reachable via: RestError → FormDataMap
    // Reachable via: RestErrorOptions → FormDataMap
    // Reachable via: RetryInformation → FormDataMap
    // Reachable via: RetryModifiers → FormDataMap
    // Reachable via: RetryStrategy → FormDataMap
    // Reachable via: SendRequest → FormDataMap
    // Reachable via: StreamableMethod → FormDataMap
    /** A simple object that provides form data, as if from a browser form. */
    export type FormDataMap = {
        [key: string]: FormDataValue | FormDataValue[];
    };


    // Reachable via: LoggerContext → TypeSpecRuntimeLogLevel
    /** The log levels supported by the logger.
    The log levels in order of most verbose to least verbose are:
    - verbose
    - info
    - warning
    - error */
    export type TypeSpecRuntimeLogLevel = "verbose" | "info" | "warning" | "error";


    // Reachable via: LoggerContext → TypeSpecRuntimeClientLogger
    /** A TypeSpecRuntimeClientLogger is a function that can log to an appropriate severity level. */
    export type TypeSpecRuntimeClientLogger = Debugger;


    // Reachable via: AddPolicyOptions → PipelinePhase
    // Reachable via: Pipeline → PipelinePhase
    /** Policies are executed in phases.
    The execution order is:
    1. Serialize Phase
    2. Policies not in a phase
    3. Deserialize Phase
    4. Retry Phase
    5. Sign Phase */
    export type PipelinePhase = "Deserialize" | "Serialize" | "Retry" | "Sign";


    // Reachable via: BodyPart → NodeReadableStream
    // Reachable via: HttpNodeStreamResponse → NodeReadableStream
    // Reachable via: PipelineResponse → NodeReadableStream
    // Reachable via: RequestBodyType → NodeReadableStream
    /** `NodeJS.ReadableStream` is not available in the browser. */
    export type NodeReadableStream = never;


    // Reachable via: KeyObject → NodeBuffer
    // Reachable via: PxfObject → NodeBuffer
    // Reachable via: TlsSettings → NodeBuffer
    /** `Buffer` is not available in the browser. */
    export type NodeBuffer = never;


    // Reachable via: AdditionalPolicyConfig → WebReadableStream
    // Reachable via: BodyPart → WebReadableStream
    // Reachable via: Client → WebReadableStream
    // Reachable via: ClientOptions → WebReadableStream
    // Reachable via: FullOperationResponse → WebReadableStream
    // Reachable via: HttpBrowserStreamResponse → WebReadableStream
    // Reachable via: HttpClient → WebReadableStream
    // Reachable via: HttpResponse → WebReadableStream
    // Reachable via: MultipartRequestBody → WebReadableStream
    // Reachable via: OperationOptions → WebReadableStream
    // Reachable via: PathUnchecked → WebReadableStream
    // Reachable via: PathUncheckedResponse → WebReadableStream
    // Reachable via: Pipeline → WebReadableStream
    // Reachable via: PipelinePolicy → WebReadableStream
    // Reachable via: PipelineRequest → WebReadableStream
    // Reachable via: PipelineRequestOptions → WebReadableStream
    // Reachable via: PipelineResponse → WebReadableStream
    // Reachable via: RawResponseCallback → WebReadableStream
    // Reachable via: RequestBodyType → WebReadableStream
    // Reachable via: RequestParameters → WebReadableStream
    // Reachable via: ResourceMethods → WebReadableStream
    // Reachable via: RestError → WebReadableStream
    // Reachable via: RestErrorOptions → WebReadableStream
    // Reachable via: RetryInformation → WebReadableStream
    // Reachable via: RetryModifiers → WebReadableStream
    // Reachable via: RetryStrategy → WebReadableStream
    // Reachable via: SendRequest → WebReadableStream
    // Reachable via: StreamableMethod → WebReadableStream
    /** Re-export of the Web `ReadableStream` for use in platform-neutral code. */
    export type WebReadableStream<R = any> = ReadableStream<R>;


    /** The supported character encoding type */
    export type EncodingType = "utf-8" | "base64" | "base64url" | "hex";


    /** Creates a client with a default pipeline */
    export function getClient(endpoint: string, clientOptions?: ClientOptions): Client;


    /** Helper function to convert OperationOptions to RequestParameters */
    export function operationOptionsToRequestParameters(options: OperationOptions): RequestParameters;


    /** Creates a rest error from a PathUnchecked response */
    export function createRestError(response: PathUncheckedResponse): RestError;


    /** Creates a rest error from an error message and a PathUnchecked response */
    export function createRestError(message: string, response: PathUncheckedResponse): RestError;


    /** Create the correct HttpClient for the current environment. */
    export function createDefaultHttpClient(): HttpClient;


    /** Creates an object that satisfies the `HttpHeaders` interface. */
    export function createHttpHeaders(rawHeaders?: RawHttpHeadersInput): HttpHeaders;


    /** Retrieves the currently specified log level. */
    export function setLogLevel(logLevel?: TypeSpecRuntimeLogLevel): void;


    /** Retrieves the currently specified log level. */
    export function getLogLevel(): TypeSpecRuntimeLogLevel | undefined;


    /** Creates a totally empty pipeline.
    Useful for testing or creating a custom one. */
    export function createEmptyPipeline(): Pipeline;


    /** Creates a new pipeline request with the given options.
    This method is to allow for the easy setting of default values and not required. */
    export function createPipelineRequest(options: PipelineRequestOptions): PipelineRequest;


    /** Typeguard for RestError */
    export function isRestError(e: unknown): e is RestError;


    /** The helper that transforms bytes with specific character encoding into string */
    export function uint8ArrayToString(bytes: Uint8Array, format: EncodingType): string;


    /** The helper that transforms string to specific character encoded bytes array. */
    export function stringToUint8Array(value: string, format: EncodingType): Uint8Array;


}

declare module "@typespec/ts-http-runtime/internal/logger" { // 0.3.6

    import type { TypeSpecRuntimeLogLevel, Debugger, TypeSpecRuntimeClientLogger, TypeSpecRuntimeLogger } from "@typespec/ts-http-runtime";

    /** todo doc */
    export interface LoggerContext {
        logger: TypeSpecRuntimeClientLogger;
        setLogLevel(logLevel?: TypeSpecRuntimeLogLevel): void;
        getLogLevel(): TypeSpecRuntimeLogLevel | undefined;
    }


    /** Option for creating a TypeSpecRuntimeLoggerContext. */
    export interface CreateLoggerContextOptions {
        logLevelEnvVarName: string;
        namespace: string;
    }


    /** Creates a logger context base on the provided options. */
    export function createLoggerContext(options: CreateLoggerContextOptions): LoggerContext;


}

declare module "@typespec/ts-http-runtime/internal/policies" { // 0.3.6

    import type { PipelineRetryOptions, TypeSpecRuntimeLogger, Debugger, PipelineResponse, PipelineRequest, AuthScheme, BasicAuthScheme, BearerAuthScheme, NoAuthAuthScheme, ApiKeyAuthScheme, OAuth2AuthScheme, OAuth2Flow, AuthorizationCodeFlow, ClientCredentialsFlow, ImplicitFlow, PasswordFlow, HttpMethods, HttpHeaders, RawHttpHeaders, RequestBodyType, WebReadableStream, MultipartRequestBody, BodyPart, FormDataMap, FormDataValue, ProxySettings, TransferProgressEvent, Agent, TlsSettings, KeyObject, PxfObject, RestError, PipelinePolicy, LogPolicyOptions, RedirectPolicyOptions, SystemErrorRetryPolicyOptions, ThrottlingRetryPolicyOptions, UserAgentPolicyOptions } from "@typespec/ts-http-runtime";

    /** Options that control how to retry failed requests. */
    export interface DefaultRetryPolicyOptions extends PipelineRetryOptions {
    }


    /** Options that control how to retry failed requests. */
    export interface ExponentialRetryPolicyOptions {
        maxRetries?: number;
        retryDelayInMs?: number;
        maxRetryDelayInMs?: number;
    }


    /** /**
     * Options to the {@link retryPolicy} */
    export interface RetryPolicyOptions {
        maxRetries?: number;
        logger?: TypeSpecRuntimeLogger;
    }


    // Reachable via: RetryStrategy → RetryInformation
    /** Information provided to the retry strategy about the current progress of the retry policy. */
    export interface RetryInformation {
        response?: PipelineResponse;
        responseError?: RestError;
        retryCount: number;
    }


    // Reachable via: RetryStrategy → RetryModifiers
    /** Properties that can modify the behavior of the retry policy. */
    export interface RetryModifiers {
        skipStrategy?: boolean;
        redirectTo?: string;
        retryAfterInMs?: number;
        errorToThrow?: RestError;
    }


    /** A retry strategy is intended to define whether to retry or not, and how to retry. */
    export interface RetryStrategy {
        name: string;
        logger?: TypeSpecRuntimeLogger;
        retry(state: RetryInformation): RetryModifiers;
    }


    /** Gets a pipeline policy that sets http.agent */
    export function agentPolicy(agent?: Agent): PipelinePolicy;


    /** decompressResponsePolicy is not supported in the browser and attempting
    to use it will raise an error. */
    export function decompressResponsePolicy(): PipelinePolicy;


    /** A policy that retries according to three strategies:
    - When the server sends a 429 response with a Retry-After header.
    - When there are errors in the underlying transport layer (e.g. DNS lookup failures).
    - Or otherwise if the outgoing request fails, it will retry with an exponentially increasing delay. */
    export function defaultRetryPolicy(options?: DefaultRetryPolicyOptions): PipelinePolicy;


    /** A policy that attempts to retry requests while introducing an exponentially increasing delay. */
    export function exponentialRetryPolicy(options?: ExponentialRetryPolicyOptions): PipelinePolicy;


    /** A policy that encodes FormData on the request into the body. */
    export function formDataPolicy(): PipelinePolicy;


    /** A policy that logs all requests and responses. */
    export function logPolicy(options?: LogPolicyOptions): PipelinePolicy;


    /** Pipeline policy for multipart requests */
    export function multipartPolicy(): PipelinePolicy;


    export function getDefaultProxySettings(_proxyUrl?: string): ProxySettings | undefined;


    /** proxyPolicy is not supported in the browser and attempting
    to use it will raise an error. */
    export function proxyPolicy(_proxySettings?: ProxySettings, _options?: {
        customNoProxyList?: string[];
    }): PipelinePolicy;


    /** A policy to follow Location headers from the server in order
    to support server-side redirection.
    In the browser, this policy is not used. */
    export function redirectPolicy(options?: RedirectPolicyOptions): PipelinePolicy;


    /** retryPolicy is a generic policy to enable retrying requests when certain conditions are met */
    export function retryPolicy(strategies: RetryStrategy[], options?: RetryPolicyOptions): PipelinePolicy;


    /** A retry policy that specifically seeks to handle errors in the
    underlying transport layer (e.g. DNS lookup failures) rather than
    retryable error codes from the server itself. */
    export function systemErrorRetryPolicy(options?: SystemErrorRetryPolicyOptions): PipelinePolicy;


    /** A policy that retries when the server sends a 429 response with a Retry-After header.

    To learn more, please refer to
    https://learn.microsoft.com/azure/azure-resource-manager/resource-manager-request-limits,
    https://learn.microsoft.com/azure/azure-subscription-service-limits and
    https://learn.microsoft.com/azure/virtual-machines/troubleshooting/troubleshooting-throttling-errors */
    export function throttlingRetryPolicy(options?: ThrottlingRetryPolicyOptions): PipelinePolicy;


    /** Gets a pipeline policy that adds the client certificate to the HttpClient agent for authentication. */
    export function tlsPolicy(tlsSettings?: TlsSettings): PipelinePolicy;


    /** A policy that sets the User-Agent header (or equivalent) to reflect
    the library version. */
    export function userAgentPolicy(options?: UserAgentPolicyOptions): PipelinePolicy;


}

declare module "@typespec/ts-http-runtime/internal/util" { // 0.3.6

    /** A utility class to sanitize objects for logging. */
    export class Sanitizer {
        constructor({ additionalAllowedHeaderNames: allowedHeaderNames, additionalAllowedQueryParameters: allowedQueryParameters, }?: SanitizerOptions);
        sanitize(obj: unknown): string;
        sanitizeUrl(value: string): string;
    }


    // Reachable via: Sanitizer → SanitizerOptions
    /** Sanitizer options */
    export interface SanitizerOptions {
        additionalAllowedHeaderNames?: string[];
        additionalAllowedQueryParameters?: string[];
    }


    /** A generic shape for a plain JS object. */
    export type UnknownObject = {
        [s: string]: unknown;
    };


    /** Calculates the delay interval for retry attempts using exponential delay with jitter. */
    export function calculateRetryDelay(retryAttempt: number, config: {
        retryDelayInMs: number;
        maxRetryDelayInMs: number;
    }): {
        retryAfterInMs: number;
    };


    /** Typeguard for an error object shape (has name and message) */
    export function isError(e: unknown): e is Error;


    /** Helper to determine when an input is a generic JS object. */
    export function isObject(input: unknown): input is UnknownObject;


    /** Returns a random integer value between a lower and upper bound,
    inclusive of both bounds.
    Note that this uses Math.random and isn't secure. If you need to use
    this for any kind of security purpose, find a better source of random. */
    export function getRandomIntegerInclusive(min: number, max: number): number;


    /** Generates a SHA-256 HMAC signature. */
    export function computeSha256Hmac(key: string, stringToSign: string, encoding: "base64" | "hex"): Promise<string>;


    /** Generates a SHA-256 hash. */
    export function computeSha256Hash(content: string, encoding: "base64" | "hex"): Promise<string>;


    /** Generated Universally Unique Identifier */
    export function randomUUID(): string;


}

