/// <reference types="node" />
/// <reference lib="es2020" />
// @azure/identity - Public API Surface
// Graphed by PublicApiGraphEngine.TypeScript

declare module "@azure/abort-controller/browser" {

    /** Allows the request to be aborted upon firing of the "abort" event. */
    export interface AbortSignalLike {
        readonly aborted: boolean;
        addEventListener(type: "abort", listener: (this: AbortSignalLike, ev: any) => any, options?: any): void;
        removeEventListener(type: "abort", listener: (this: AbortSignalLike, ev: any) => any, options?: any): void;
    }


}

declare module "@azure/core-auth/browser" {

    import { AbortSignalLike } from "@azure/abort-controller/browser";
    import { HttpMethods } from "@azure/core-util/browser";

    /** Represents a credential capable of providing an authentication token. */
    export interface TokenCredential {
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
    }


    /** Represents an access token with an expiration time. */
    export interface AccessToken {
        token: string;
        expiresOnTimestamp: number;
        refreshAfterTimestamp?: number;
        tokenType?: "Bearer" | "pop";
    }


    /** Defines options for TokenCredential.getToken. */
    export interface GetTokenOptions {
        abortSignal?: AbortSignalLike;
        requestOptions?: {
            /**
             * The number of milliseconds a request can take before automatically being terminated.
             */
            timeout?: number;
        };
        tracingOptions?: {
            /**
             * Tracing Context for the current request.
             */
            tracingContext?: TracingContext;
        };
        claims?: string;
        enableCae?: boolean;
        tenantId?: string;
        proofOfPossessionOptions?: {
            /**
             * The nonce value required for PoP token requests.
             * This is typically retrieved from the WWW-Authenticate header of a 401 challenge response.
             * This is used in combination with {@link resourceRequestUrl} and {@link resourceRequestMethod} to generate the PoP token.
             */
            nonce: string;
            /**
             * The HTTP method of the request.
             * This is used in combination with {@link resourceRequestUrl} and {@link nonce} to generate the PoP token.
             */
            resourceRequestMethod: HttpMethods;
            /**
             * The URL of the request.
             * This is used in combination with {@link resourceRequestMethod} and {@link nonce} to generate the PoP token.
             */
            resourceRequestUrl: string;
        };
    }


    /** An interface structurally compatible with OpenTelemetry. */
    export interface TracingContext {
        getValue(key: symbol): unknown;
        setValue(key: symbol, value: unknown): TracingContext;
        deleteValue(key: symbol): TracingContext;
    }


}

declare module "@azure/core-client/browser" {

    import { AbortSignalLike } from "@azure/abort-controller/browser";
    import { TokenCredential } from "@azure/core-auth/browser";
    import { PipelineOptions, HttpClient, PipelineRequest, PipelineResponse, PipelinePolicy, Pipeline, TransferProgressEvent } from "@azure/core-rest-pipeline/browser";
    import { OperationTracingOptions } from "@azure/core-tracing/browser";
    import { HttpMethods } from "@azure/core-util/browser";

    /** Initializes a new instance of the ServiceClient. */
    export class ServiceClient {
        readonly pipeline: Pipeline;
        constructor(options?: ServiceClientOptions);
        sendRequest(request: PipelineRequest): Promise<PipelineResponse>;
        sendOperationRequest<T>(operationArguments: OperationArguments, operationSpec: OperationSpec): Promise<T>;
    }


    /** The common set of options that high level clients are expected to expose. */
    export interface CommonClientOptions extends PipelineOptions {
        httpClient?: HttpClient;
        allowInsecureConnection?: boolean;
        additionalPolicies?: AdditionalPolicyConfig[];
    }


    /** Used to configure additional policies added to the pipeline at construction. */
    export interface AdditionalPolicyConfig {
        policy: PipelinePolicy;
        position: "perCall" | "perRetry";
    }


    /** Options to be provided while creating the client. */
    export interface ServiceClientOptions extends CommonClientOptions {
        /** @deprecated This property is deprecated and will be removed soon, please use endpoint instead */
        baseUri?: string;
        endpoint?: string;
        credentialScopes?: string | string[];
        requestContentType?: string;
        credential?: TokenCredential;
        pipeline?: Pipeline;
    }


    /** A collection of properties that apply to a single invocation of an operation. */
    export interface OperationArguments {
        options?: OperationOptions;
        [parameterName: string]: unknown;
    }


    /** The base options type for all operations. */
    export interface OperationOptions {
        abortSignal?: AbortSignalLike;
        requestOptions?: OperationRequestOptions;
        tracingOptions?: OperationTracingOptions;
        serializerOptions?: SerializerOptions;
        onResponse?: RawResponseCallback;
    }


    /** Options used when creating and sending HTTP requests for this operation. */
    export interface OperationRequestOptions {
        customHeaders?: {
            [key: string]: string;
        };
        timeout?: number;
        shouldDeserialize?: boolean | ((response: PipelineResponse) => boolean);
        allowInsecureConnection?: boolean;
        onUploadProgress(progress: TransferProgressEvent): void;
        onDownloadProgress(progress: TransferProgressEvent): void;
    }


    /** Options to configure serialization/de-serialization behavior. */
    export interface SerializerOptions {
        xml: XmlOptions;
        ignoreUnknownProperties?: boolean;
    }


    /** Options to govern behavior of xml parser and builder. */
    export interface XmlOptions {
        rootName?: string;
        includeRoot?: boolean;
        xmlCharKey?: string;
    }


    /** Wrapper object for http request and response. Deserialized object is stored in */
    export interface FullOperationResponse extends PipelineResponse {
        parsedHeaders?: {
            [key: string]: unknown;
        };
        parsedBody?: any;
        request: OperationRequest;
    }


    /** A specification that defines an operation. */
    export interface OperationSpec {
        readonly serializer: Serializer;
        readonly httpMethod: HttpMethods;
        readonly baseUrl?: string;
        readonly path?: string;
        readonly contentType?: string;
        readonly mediaType?: "json" | "xml" | "form" | "binary" | "multipart" | "text" | "unknown" | string;
        readonly requestBody?: OperationParameter;
        readonly isXML?: boolean;
        readonly urlParameters?: ReadonlyArray<OperationURLParameter>;
        readonly queryParameters?: ReadonlyArray<OperationQueryParameter>;
        readonly headerParameters?: ReadonlyArray<OperationParameter>;
        readonly formDataParameters?: ReadonlyArray<OperationParameter>;
        readonly responses: {
            [responseCode: string]: OperationResponseMap;
        };
    }


    /** Used to map raw response objects to final shapes. */
    export interface Serializer {
        readonly modelMappers: {
            [key: string]: any;
        };
        readonly isXML: boolean;
        /** @deprecated Removing the constraints validation on client side. */
        validateConstraints(mapper: Mapper, value: any, objectName: string): void;
        serialize(mapper: Mapper, object: any, objectName?: string, options?: SerializerOptions): any;
        deserialize(mapper: Mapper, responseBody: any, objectName: string, options?: SerializerOptions): any;
    }


    /** A common interface that all Operation parameter's extend. */
    export interface OperationParameter {
        parameterPath: ParameterPath;
        mapper: Mapper;
    }


    /** The base definition of a mapper. Can be used for XML and plain JavaScript objects. */
    export interface BaseMapper {
        xmlName?: string;
        xmlNamespace?: string;
        xmlNamespacePrefix?: string;
        xmlIsAttribute?: boolean;
        xmlIsMsText?: boolean;
        xmlElementName?: string;
        xmlIsWrapped?: boolean;
        readOnly?: boolean;
        isConstant?: boolean;
        required?: boolean;
        nullable?: boolean;
        serializedName?: string;
        type: MapperType;
        defaultValue?: any;
        constraints?: MapperConstraints;
    }


    /** The type of a simple mapper. */
    export interface SimpleMapperType {
        name: "Base64Url" | "Boolean" | "ByteArray" | "Date" | "DateTime" | "DateTimeRfc1123" | "Object" | "Stream" | "String" | "TimeSpan" | "UnixTime" | "Uuid" | "Number" | "any";
    }


    /** Helps build a mapper that describes how to map a set of properties of an object based on other mappers. */
    export interface CompositeMapperType {
        name: "Composite";
        className?: string;
        modelProperties?: {
            [propertyName: string]: Mapper;
        };
        additionalProperties?: Mapper;
        uberParent?: string;
        polymorphicDiscriminator?: PolymorphicDiscriminator;
    }


    /** Used to disambiguate discriminated type unions. */
    export interface PolymorphicDiscriminator {
        serializedName: string;
        clientName: string;
        [key: string]: string;
    }


    /** Helps build a mapper that describes how to parse a sequence of mapped values. */
    export interface SequenceMapperType {
        name: "Sequence";
        element: Mapper;
    }


    /** Helps build a mapper that describes how to parse a dictionary of mapped values. */
    export interface DictionaryMapperType {
        name: "Dictionary";
        value: Mapper;
    }


    /** Helps build a mapper that describes how to parse an enum value. */
    export interface EnumMapperType {
        name: "Enum";
        allowedValues: any[];
    }


    /** Description of various value constraints such as integer ranges and string regex. */
    export interface MapperConstraints {
        InclusiveMaximum?: number;
        ExclusiveMaximum?: number;
        InclusiveMinimum?: number;
        ExclusiveMinimum?: number;
        MaxLength?: number;
        MinLength?: number;
        Pattern?: RegExp;
        MaxItems?: number;
        MinItems?: number;
        UniqueItems?: true;
        MultipleOf?: number;
    }


    /** A mapper composed of other mappers. */
    export interface CompositeMapper extends BaseMapper {
        type: CompositeMapperType;
    }


    /** A mapper describing arrays. */
    export interface SequenceMapper extends BaseMapper {
        type: SequenceMapperType;
    }


    /** A mapper describing plain JavaScript objects used as key/value pairs. */
    export interface DictionaryMapper extends BaseMapper {
        type: DictionaryMapperType;
        headerCollectionPrefix?: string;
    }


    /** A mapper describing an enum value. */
    export interface EnumMapper extends BaseMapper {
        type: EnumMapperType;
    }


    /** A parameter for an operation that will be substituted into the operation's request URL. */
    export interface OperationURLParameter extends OperationParameter {
        skipEncoding?: boolean;
    }


    /** A parameter for an operation that will be added as a query parameter to the operation's HTTP */
    export interface OperationQueryParameter extends OperationParameter {
        skipEncoding?: boolean;
        collectionFormat?: QueryCollectionFormat;
    }


    /** An OperationResponse that can be returned from an operation request for a single status code. */
    export interface OperationResponseMap {
        headersMapper?: Mapper;
        bodyMapper?: Mapper;
        isError?: boolean;
    }


    /** A function to be called each time a response is received from the server */
    export type RawResponseCallback = (rawResponse: FullOperationResponse, flatResponse: unknown, error?: unknown) => void;


    /** Encodes how to reach a particular property on an object. */
    export type ParameterPath = string | string[] | {
        [propertyName: string]: ParameterPath;
    };


    /** Mappers are definitions of the data models used in the library. */
    export type Mapper = BaseMapper | CompositeMapper | SequenceMapper | DictionaryMapper | EnumMapper;


    /** Type of the mapper. Includes known mappers. */
    export type MapperType = SimpleMapperType | CompositeMapperType | SequenceMapperType | DictionaryMapperType | EnumMapperType;


    /** The format that will be used to join an array of values together for a query parameter value. */
    export type QueryCollectionFormat = "CSV" | "SSV" | "TSV" | "Pipes" | "Multi";


    /** A type alias for future proofing. */
    export type OperationRequest = PipelineRequest;


}

declare module "@azure/core-rest-pipeline/browser" {

    import { AbortSignalLike } from "@azure/abort-controller/browser";
    import { OperationTracingOptions } from "@azure/core-tracing/browser";
    import { HttpMethods } from "@azure/core-util/browser";
    import { Debugger } from "@azure/logger/browser";

    /** Defines options that are used to configure the HTTP pipeline for */
    export interface PipelineOptions {
        retryOptions?: PipelineRetryOptions;
        proxyOptions?: ProxySettings;
        agent?: Agent;
        tlsOptions?: TlsSettings;
        redirectOptions?: RedirectPolicyOptions;
        userAgentOptions?: UserAgentPolicyOptions;
        telemetryOptions?: TelemetryOptions;
    }


    /** Options that control how to retry failed requests. */
    export interface PipelineRetryOptions {
        maxRetries?: number;
        retryDelayInMs?: number;
        maxRetryDelayInMs?: number;
    }


    /** Options to configure a proxy for outgoing requests (Node.js only). */
    export interface ProxySettings {
        host: string;
        port: number;
        username?: string;
        password?: string;
    }


    /** An interface compatible with NodeJS's `http.Agent`. */
    export interface Agent {
        maxFreeSockets: number;
        maxSockets: number;
        requests: unknown;
        sockets: unknown;
        destroy(): void;
    }


    /** Represents a certificate for TLS authentication. */
    export interface TlsSettings {
        ca?: string | Buffer | Array<string | Buffer> | undefined;
        cert?: string | Buffer | Array<string | Buffer> | undefined;
        key?: string | Buffer | Array<Buffer | KeyObject> | undefined;
        passphrase?: string | undefined;
        pfx?: string | Buffer | Array<string | Buffer | PxfObject> | undefined;
    }


    /** An interface compatible with NodeJS's `tls.KeyObject`. */
    export interface KeyObject {
        pem: string | Buffer;
        passphrase?: string | undefined;
    }


    /** An interface compatible with NodeJS's `tls.PxfObject`. */
    export interface PxfObject {
        buf: string | Buffer;
        passphrase?: string | undefined;
    }


    /** Options for how redirect responses are handled. */
    export interface RedirectPolicyOptions {
        maxRetries?: number;
        allowCrossOriginRedirects?: boolean;
    }


    /** Options for adding user agent details to outgoing requests. */
    export interface UserAgentPolicyOptions {
        userAgentPrefix?: string;
    }


    /** Defines options that are used to configure common telemetry and tracing info */
    export interface TelemetryOptions {
        clientRequestIdHeaderName?: string;
    }


    /** The required interface for a client that makes HTTP requests */
    export interface HttpClient {
        sendRequest: SendRequest;
    }


    /** Metadata about a request being made by the pipeline. */
    export interface PipelineRequest {
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
        abortSignal?: AbortSignalLike;
        tracingOptions?: OperationTracingOptions;
        allowInsecureConnection?: boolean;
        agent?: Agent;
        enableBrowserStreams?: boolean;
        tlsSettings?: TlsSettings;
        requestOverrides?: Record<string, unknown>;
        onUploadProgress(progress: TransferProgressEvent): void;
        onDownloadProgress(progress: TransferProgressEvent): void;
    }


    /** Represents a set of HTTP headers on a request/response. */
    export interface HttpHeaders extends Iterable<[string, string]> {
        get(name: string): string | undefined;
        has(name: string): boolean;
        set(name: string, value: string | number | boolean): void;
        delete(name: string): void;
        toJSON(options?: {
            preserveCase?: boolean;
        }): RawHttpHeaders;
    }


    /** A request body consisting of multiple parts. */
    export interface MultipartRequestBody {
        parts: BodyPart[];
        boundary?: string;
    }


    /** A part of the request body in a multipart request. */
    export interface BodyPart {
        headers: HttpHeaders;
        body: ((() => ReadableStream<Uint8Array>) | (() => NodeJS.ReadableStream)) | ReadableStream<Uint8Array> | NodeJS.ReadableStream | Uint8Array | Blob;
    }


    /** Metadata about a response received by the pipeline. */
    export interface PipelineResponse {
        request: PipelineRequest;
        status: number;
        headers: HttpHeaders;
        bodyAsText?: string | null;
        blobBody?: Promise<Blob>;
        browserStreamBody?: ReadableStream<Uint8Array>;
        readableStreamBody?: NodeJS.ReadableStream;
    }


    /** A pipeline policy manipulates a request as it travels through the pipeline. */
    export interface PipelinePolicy {
        name: string;
        sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse>;
    }


    /** Options to configure the logPolicy. */
    export interface LogPolicyOptions {
        additionalAllowedHeaderNames?: string[];
        additionalAllowedQueryParameters?: string[];
        logger?: Debugger;
    }


    /** Represents a pipeline for making a HTTP request to a URL. */
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


    /** Options when adding a policy to the pipeline. */
    export interface AddPolicyOptions {
        beforePolicies?: string[];
        afterPolicies?: string[];
        afterPhase?: PipelinePhase;
        phase?: PipelinePhase;
    }


    /** A simple interface for making a pipeline request and receiving a response. */
    export type SendRequest = (request: PipelineRequest) => Promise<PipelineResponse>;


    /** A HttpHeaders collection represented as a simple JSON object. */
    export type RawHttpHeaders = {
        [headerName: string]: string;
    };


    /** Types of bodies supported on the request. */
    export type RequestBodyType = NodeJS.ReadableStream | (() => NodeJS.ReadableStream) | ReadableStream<Uint8Array> | (() => ReadableStream<Uint8Array>) | Blob | ArrayBuffer | ArrayBufferView | FormData | string | null;


    /** A simple object that provides form data, as if from a browser form. */
    export type FormDataMap = {
        [key: string]: FormDataValue | FormDataValue[];
    };


    /** Each form data entry can be a string, Blob, or a File. If you wish to pass a file with a name but do not have */
    export type FormDataValue = string | Blob | File;


    /** Fired in response to upload or download progress. */
    export type TransferProgressEvent = {
        /**
         * The number of bytes loaded so far.
         */
        loadedBytes: number;
    };


    /** Policies are executed in phases. */
    export type PipelinePhase = "Deserialize" | "Serialize" | "Retry" | "Sign";


}

declare module "@azure/core-tracing/browser" {

    import { TracingContext } from "@azure/core-auth/browser";

    /** Tracing options to set on an operation. */
    export interface OperationTracingOptions {
        tracingContext?: TracingContext;
    }


}

declare module "@azure/core-util/browser" {

    /** Supported HTTP methods to use when making requests. */
    export type HttpMethods = "GET" | "PUT" | "POST" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "TRACE";


}

declare module "@azure/logger/browser" {

    /** A log function that can be dynamically enabled and redirected. */
    export interface Debugger {
        enabled: boolean;
        namespace: string;
        destroy(): boolean;
        log(args?: any[]): void;
        extend(namespace: string): Debugger;
    }


    /** Defines the methods available on the SDK-facing logger. */
    export interface AzureLogger {
        error: Debugger;
        warning: Debugger;
        info: Debugger;
        verbose: Debugger;
    }


    /** The log levels supported by the logger. */
    export type AzureLogLevel = "verbose" | "info" | "warning" | "error";


}

declare module "@azure/msal-node" {

    /** Client network interface to send backend requests. */
    export interface INetworkModule {
        sendGetRequestAsync<T>(url: string, options?: NetworkRequestOptions, timeout?: number): Promise<NetworkResponse<T>>;
        sendPostRequestAsync<T>(url: string, options?: NetworkRequestOptions): Promise<NetworkResponse<T>>;
    }


    /** Options allowed by network request APIs. */
    export type NetworkRequestOptions = {
        headers?: Record<string, string>;
        body?: string;
    };


    export type NetworkResponse<T> = {
        headers: Record<string, string>;
        body: T;
        status: number;
    };


}

declare module "@azure/identity/browser" {

    import { AbortSignalLike } from "@azure/abort-controller/browser";
    import { TokenCredential, AccessToken, GetTokenOptions, TracingContext } from "@azure/core-auth/browser";
    import { ServiceClient, CommonClientOptions, AdditionalPolicyConfig, ServiceClientOptions, OperationArguments, OperationOptions, OperationRequestOptions, SerializerOptions, XmlOptions, FullOperationResponse, OperationSpec, Serializer, OperationParameter, BaseMapper, SimpleMapperType, CompositeMapperType, PolymorphicDiscriminator, SequenceMapperType, DictionaryMapperType, EnumMapperType, MapperConstraints, CompositeMapper, SequenceMapper, DictionaryMapper, EnumMapper, OperationURLParameter, OperationQueryParameter, OperationResponseMap, RawResponseCallback, ParameterPath, Mapper, MapperType, QueryCollectionFormat, OperationRequest } from "@azure/core-client/browser";
    import { PipelineOptions, PipelineRetryOptions, ProxySettings, Agent, TlsSettings, KeyObject, PxfObject, RedirectPolicyOptions, UserAgentPolicyOptions, TelemetryOptions, HttpClient, PipelineRequest, HttpHeaders, MultipartRequestBody, BodyPart, PipelineResponse, PipelinePolicy, LogPolicyOptions, Pipeline, AddPolicyOptions, SendRequest, RawHttpHeaders, RequestBodyType, FormDataMap, FormDataValue, TransferProgressEvent, PipelinePhase } from "@azure/core-rest-pipeline/browser";
    import { OperationTracingOptions } from "@azure/core-tracing/browser";
    import { HttpMethods } from "@azure/core-util/browser";
    import { Debugger, AzureLogger, AzureLogLevel } from "@azure/logger/browser";
    import { INetworkModule, NetworkRequestOptions, NetworkResponse } from "@azure/msal-node";

    export class AuthorizationCodeCredential implements TokenCredential {
        constructor(tenantId: string | "common", clientId: string, clientSecret: string, authorizationCode: string, redirectUri: string, options?: AuthorizationCodeCredentialOptions);
        constructor(tenantId: string | "common", clientId: string, authorizationCode: string, redirectUri: string, options?: AuthorizationCodeCredentialOptions);
        getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
    }


    /** This credential will use the currently logged-in user login information */
    export class AzureCliCredential implements TokenCredential {
        constructor(_options?: AzureCliCredentialOptions);
        getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
    }


    /** This credential will use the currently logged-in user login information */
    export class AzureDeveloperCliCredential implements TokenCredential {
        constructor(_options?: AzureDeveloperCliCredentialOptions);
        getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
    }


    /** Enables authentication to Microsoft Entra ID using a PEM-encoded */
    export class AzurePipelinesCredential implements TokenCredential {
        constructor(_tenantId: string, _clientId: string, _serviceConnectionId: string, _systemAccessToken: string, _options?: AzurePipelinesCredentialOptions);
        getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
    }


    /** This credential will use the currently-logged-in user's login information via the Azure Power Shell command line tool. */
    export class AzurePowerShellCredential implements TokenCredential {
        constructor(_options?: AzurePowerShellCredentialOptions);
        getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
    }


    /** Enables multiple `TokenCredential` implementations to be tried in order until */
    export class ChainedTokenCredential implements TokenCredential {
        constructor(sources?: TokenCredential[]);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Authenticates a service principal with a JWT assertion. */
    export class ClientAssertionCredential implements TokenCredential {
        constructor(_tenantId: string, _clientId: string, _getAssertion: () => Promise<string>, _options?: ClientAssertionCredentialOptions);
        getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
    }


    /** Enables authentication to Microsoft Entra ID using a PEM-encoded */
    export class ClientCertificateCredential implements TokenCredential {
        constructor(_tenantId: string, _clientId: string, _certificatePathOrConfiguration: string | ClientCertificateCredentialPEMConfiguration, _options?: ClientCertificateCredentialOptions);
        getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
    }


    /** Enables authentication to Microsoft Entra ID using a client secret */
    export class ClientSecretCredential implements TokenCredential {
        constructor(tenantId: string, clientId: string, clientSecret: string, options?: ClientSecretCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
    }


    /** /** */
    export class DefaultAzureCredential extends ChainedTokenCredential {
        constructor(_tokenCredentialOptions?: TokenCredentialOptions);
        getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Enables authentication to Microsoft Entra ID using a device code */
    export class DeviceCodeCredential implements TokenCredential {
        constructor(_options?: DeviceCodeCredentialOptions);
        getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
    }


    /** Enables authentication to Microsoft Entra ID using client secret */
    export class EnvironmentCredential implements TokenCredential {
        constructor(_options?: EnvironmentCredentialOptions);
        getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
    }


    /** Enables authentication to Microsoft Entra ID inside of the web browser */
    export class InteractiveBrowserCredential implements TokenCredential {
        constructor(options: InteractiveBrowserCredentialInBrowserOptions | InteractiveBrowserCredentialNodeOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
        authenticate(scopes: string | string[], options?: GetTokenOptions): Promise<AuthenticationRecord | undefined>;
    }


    export class ManagedIdentityCredential implements TokenCredential {
        constructor(clientId: string, options?: TokenCredentialOptions);
        constructor(options?: ManagedIdentityCredentialClientIdOptions);
        constructor(options?: ManagedIdentityCredentialResourceIdOptions);
        constructor(options?: ManagedIdentityCredentialObjectIdOptions);
        getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
    }


    /** Enables authentication to Microsoft Entra ID using the [On Behalf Of flow](https://learn.microsoft.com/entra/identity... */
    export class OnBehalfOfCredential implements TokenCredential {
        constructor(_options: OnBehalfOfCredentialOptions);
        getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
    }


    /** @deprecated UsernamePasswordCredential is deprecated. Use a more secure credential. See https://aka.ms/azsdk/identity/mfa for details. */
    /** Enables authentication to Microsoft Entra ID with a user's */
    export class UsernamePasswordCredential implements TokenCredential {
        constructor(tenantIdOrName: string, clientId: string, username: string, password: string, options?: UsernamePasswordCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
    }


    /** @deprecated This credential is deprecated because the VS Code Azure Account extension on which this credential
    relies has been deprecated. Users should use other dev-time credentials, such as {@link AzureCliCredential},
    {@link AzureDeveloperCliCredential}, or {@link AzurePowerShellCredential} for their
    local development needs. See Azure account extension deprecation notice [here](https://github.com/microsoft/vscode-azure-account/issues/964). */
    /** Connects to Azure using the credential provided by the VSCode extension 'Azure Account'. */
    export class VisualStudioCodeCredential implements TokenCredential {
        constructor(_options?: VisualStudioCodeCredentialOptions);
        getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
    }


    /** WorkloadIdentityCredential supports Microsoft Entra Workload ID authentication on Kubernetes. */
    export class WorkloadIdentityCredential implements TokenCredential {
        constructor(_options?: WorkloadIdentityCredentialOptions);
        getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
    }


    /** /** */
    export class AggregateAuthenticationError extends Error {
        errors: any[];
        constructor(errors: any[], errorMessage?: string);
    }


    /** Provides details about a failure to authenticate with Azure Active */
    export class AuthenticationError extends Error {
        readonly statusCode: number;
        readonly errorResponse: ErrorResponse;
        constructor(statusCode: number, errorBody: object | string | undefined | null, options?: {
            cause?: unknown;
        });
    }


    /** Error used to enforce authentication after trying to retrieve a token silently. */
    export class AuthenticationRequiredError extends Error {
        scopes: string[];
        getTokenOptions?: GetTokenOptions;
        constructor(options: AuthenticationRequiredErrorOptions);
    }


    /** This signifies that the credential that was tried in a chained credential */
    export class CredentialUnavailableError extends Error {
        constructor(message?: string, options?: {
            cause?: unknown;
        });
    }


    /** Provides options to configure how the Identity library */
    export interface AuthorityValidationOptions {
        disableInstanceDiscovery?: boolean;
    }


    /** /** */
    export interface AuthorizationCodeCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
    }


    /** /** */
    export interface AzureCliCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
        subscription?: string;
    }


    /** /** */
    export interface AzureDeveloperCliCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
    }


    /** /** */
    export interface AzurePipelinesCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    /** /** */
    export interface AzurePowerShellCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
    }


    /** Configuration options for InteractiveBrowserCredential */
    export interface BrokerAuthOptions {
        brokerOptions?: BrokerOptions;
    }


    /** Shared configuration options for browser customization */
    export interface BrowserCustomizationOptions {
        browserCustomizationOptions?: {
            /**
             * Format for error messages for display in browser
             */
            errorMessage?: string;
            /**
             * Format for success messages for display in browser
             */
            successMessage?: string;
        };
    }


    /** /** */
    export interface ClientAssertionCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    /** /** */
    export interface ClientCertificatePEMCertificate {
        certificate: string;
        certificatePassword?: string;
    }


    /** /** */
    export interface ClientCertificatePEMCertificatePath {
        certificatePath: string;
        certificatePassword?: string;
    }


    /** /** */
    export interface ClientCertificateCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
        sendCertificateChain?: boolean;
    }


    /** /** */
    export interface ClientSecretCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    /** Shared configuration options for credentials that support persistent token */
    export interface CredentialPersistenceOptions {
        tokenCachePersistenceOptions?: TokenCachePersistenceOptions;
    }


    /** /** */
    export interface DefaultAzureCredentialClientIdOptions extends DefaultAzureCredentialOptions {
        managedIdentityClientId?: string;
        workloadIdentityClientId?: string;
    }


    /** /** */
    export interface DefaultAzureCredentialResourceIdOptions extends DefaultAzureCredentialOptions {
        managedIdentityResourceId: string;
    }


    /** /** */
    export interface DefaultAzureCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
        requiredEnvVars?: DefaultAzureCredentialEnvVars | DefaultAzureCredentialEnvVars[];
    }


    /** Provides the user code and verification URI where the code must be */
    export interface DeviceCodeInfo {
        userCode: string;
        verificationUri: string;
        message: string;
    }


    /** Defines options for the InteractiveBrowserCredential class for Node.js. */
    export interface DeviceCodeCredentialOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions {
        tenantId?: string;
        clientId?: string;
        userPromptCallback?: DeviceCodePromptCallback;
    }


    /** Enables authentication to Microsoft Entra ID depending on the available environment variables. */
    export interface EnvironmentCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
    }


    /** Defines the common options for the InteractiveBrowserCredential class. */
    export interface InteractiveBrowserCredentialNodeOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions, BrowserCustomizationOptions, BrokerAuthOptions {
        redirectUri?: string | (() => string);
        tenantId?: string;
        clientId?: string;
        loginHint?: string;
    }


    /** Defines the common options for the InteractiveBrowserCredential class. */
    export interface InteractiveBrowserCredentialInBrowserOptions extends InteractiveCredentialOptions {
        redirectUri?: string | (() => string);
        tenantId?: string;
        clientId: string;
        loginStyle?: BrowserLoginStyle;
        loginHint?: string;
    }


    /** Common constructor options for the Identity credentials that requires user interaction. */
    export interface InteractiveCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        authenticationRecord?: AuthenticationRecord;
        disableAutomaticAuthentication?: boolean;
    }


    /** /** */
    export interface ManagedIdentityCredentialClientIdOptions extends TokenCredentialOptions {
        clientId?: string;
    }


    /** /** */
    export interface ManagedIdentityCredentialResourceIdOptions extends TokenCredentialOptions {
        resourceId: string;
    }


    /** /** */
    export interface ManagedIdentityCredentialObjectIdOptions extends TokenCredentialOptions {
        objectId: string;
    }


    /** Options for multi-tenant applications which allows for additionally allowed tenants. */
    export interface MultiTenantTokenCredentialOptions extends TokenCredentialOptions {
        additionallyAllowedTenants?: string[];
    }


    /** /** */
    export interface OnBehalfOfCredentialSecretOptions {
        tenantId: string;
        clientId: string;
        clientSecret: string;
        userAssertionToken: string;
    }


    /** /** */
    export interface OnBehalfOfCredentialCertificateOptions {
        tenantId: string;
        clientId: string;
        certificatePath: string;
        userAssertionToken: string;
        sendCertificateChain?: boolean;
    }


    /** /** */
    export interface OnBehalfOfCredentialAssertionOptions {
        tenantId: string;
        clientId: string;
        userAssertionToken: string;
        getAssertion(): Promise<string>;
    }


    /** @deprecated UsernamePasswordCredential is deprecated. Use a more secure credential. See https://aka.ms/azsdk/identity/mfa for details. */
    /** /** */
    export interface UsernamePasswordCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    /** Provides options to configure the Visual Studio Code credential. */
    export interface VisualStudioCodeCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
    }


    /** /** */
    export interface WorkloadIdentityCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        tenantId?: string;
        clientId?: string;
        tokenFilePath?: string;
        enableAzureProxy?: boolean;
    }


    /** See the official documentation for more details: */
    export interface ErrorResponse {
        error: string;
        errorDescription: string;
        errorCodes?: number[];
        timestamp?: string;
        traceId?: string;
        correlationId?: string;
    }


    /** /** */
    export interface AuthenticationRequiredErrorOptions {
        scopes: string[];
        getTokenOptions?: GetTokenOptions;
        message?: string;
        cause?: unknown;
    }


    /** Parameters when WAM broker authentication is disabled. */
    export interface BrokerDisabledOptions {
        enabled: false;
        legacyEnableMsaPassthrough?: undefined;
        parentWindowHandle: undefined;
    }


    /** Parameters when WAM broker authentication is enabled. */
    export interface BrokerEnabledOptions {
        enabled: true;
        legacyEnableMsaPassthrough?: boolean;
        parentWindowHandle: Uint8Array;
        useDefaultBrokerAccount?: boolean;
    }


    /** Parameters that enable token cache persistence in the Identity credentials. */
    export interface TokenCachePersistenceOptions {
        enabled: boolean;
        name?: string;
        unsafeAllowUnencryptedStorage?: boolean;
    }


    /** The record to use to find the cached tokens in the cache. */
    export interface AuthenticationRecord {
        authority: string;
        homeAccountId: string;
        clientId: string;
        tenantId: string;
        username: string;
    }


    /** Provides options to configure how the Identity library makes authentication */
    export interface TokenCredentialOptions extends CommonClientOptions {
        authorityHost?: string;
        loggingOptions?: LogPolicyOptions & {
            /**
             * Allows logging account information once the authentication flow succeeds.
             */
            allowLoggingAccountIdentifiers?: boolean;
            /**
             * Allows logging personally identifiable information for customer support.
             */
            enableUnsafeSupportLogging?: boolean;
        };
    }


    /** The options to configure the token provider. */
    export interface GetBearerTokenProviderOptions {
        abortSignal?: AbortSignal;
        tracingOptions?: {
            /**
             * Tracing Context for the current request to get a token.
             */
            tracingContext?: TracingContext;
        };
    }


    /** A list of known Azure authority hosts */
    export enum AzureAuthorityHosts {
        AzureChina, AzureGermany, AzureGovernment, AzurePublicCloud
    }


    /** /** */
    export type ClientCertificateCredentialPEMConfiguration = ClientCertificatePEMCertificate | ClientCertificatePEMCertificatePath;


    /** /** */
    export type DefaultAzureCredentialEnvVars = "AZURE_TOKEN_CREDENTIALS" | "AZURE_CLIENT_ID" | "AZURE_TENANT_ID" | "AZURE_CLIENT_SECRET" | "AZURE_CLIENT_CERTIFICATE_PATH" | "AZURE_CLIENT_CERTIFICATE_PASSWORD" | "AZURE_ADDITIONALLY_ALLOWED_TENANTS" | "AZURE_CLIENT_SEND_CERTIFICATE_CHAIN" | "AZURE_FEDERATED_TOKEN_FILE";


    /** Defines the signature of a callback which will be passed to */
    export type DeviceCodePromptCallback = (deviceCodeInfo: DeviceCodeInfo) => void;


    /** (Browser-only feature) */
    export type BrowserLoginStyle = "redirect" | "popup";


    /** /** */
    export type OnBehalfOfCredentialOptions = (OnBehalfOfCredentialSecretOptions | OnBehalfOfCredentialCertificateOptions | OnBehalfOfCredentialAssertionOptions) & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions & AuthorityValidationOptions;


    /** Parameters that enable WAM broker authentication in the InteractiveBrowserCredential. */
    export type BrokerOptions = BrokerEnabledOptions | BrokerDisabledOptions;


    /** The type of an Azure Identity plugin, a function accepting a plugin */
    export type IdentityPlugin = (context: unknown) => void;


    /** /** */
    export function getDefaultAzureCredential(): TokenCredential;


    /** Serializes an `AuthenticationRecord` into a string. */
    export function serializeAuthenticationRecord(record: AuthenticationRecord): string;


    /** Deserializes a previously serialized authentication record from a string into an object. */
    export function deserializeAuthenticationRecord(serializedRecord: string): AuthenticationRecord;


    export function useIdentityPlugin(_plugin: unknown): void;


    /** Returns a callback that provides a bearer token. */
    export function getBearerTokenProvider(credential: TokenCredential, scopes: string | string[], options?: GetBearerTokenProviderOptions): () => Promise<string>;


}

declare module "@azure/abort-controller/import" {

    /** Allows the request to be aborted upon firing of the "abort" event. */
    export interface AbortSignalLike {
        readonly aborted: boolean;
        addEventListener(type: "abort", listener: (this: AbortSignalLike, ev: any) => any, options?: any): void;
        removeEventListener(type: "abort", listener: (this: AbortSignalLike, ev: any) => any, options?: any): void;
    }


}

declare module "@azure/core-auth/import" {

    import { AbortSignalLike } from "@azure/abort-controller/import";
    import { HttpMethods } from "@azure/core-util/import";

    /** Represents a credential capable of providing an authentication token. */
    export interface TokenCredential {
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
    }


    /** Represents an access token with an expiration time. */
    export interface AccessToken {
        token: string;
        expiresOnTimestamp: number;
        refreshAfterTimestamp?: number;
        tokenType?: "Bearer" | "pop";
    }


    /** Defines options for TokenCredential.getToken. */
    export interface GetTokenOptions {
        abortSignal?: AbortSignalLike;
        requestOptions?: {
            /**
             * The number of milliseconds a request can take before automatically being terminated.
             */
            timeout?: number;
        };
        tracingOptions?: {
            /**
             * Tracing Context for the current request.
             */
            tracingContext?: TracingContext;
        };
        claims?: string;
        enableCae?: boolean;
        tenantId?: string;
        proofOfPossessionOptions?: {
            /**
             * The nonce value required for PoP token requests.
             * This is typically retrieved from the WWW-Authenticate header of a 401 challenge response.
             * This is used in combination with {@link resourceRequestUrl} and {@link resourceRequestMethod} to generate the PoP token.
             */
            nonce: string;
            /**
             * The HTTP method of the request.
             * This is used in combination with {@link resourceRequestUrl} and {@link nonce} to generate the PoP token.
             */
            resourceRequestMethod: HttpMethods;
            /**
             * The URL of the request.
             * This is used in combination with {@link resourceRequestMethod} and {@link nonce} to generate the PoP token.
             */
            resourceRequestUrl: string;
        };
    }


    /** An interface structurally compatible with OpenTelemetry. */
    export interface TracingContext {
        getValue(key: symbol): unknown;
        setValue(key: symbol, value: unknown): TracingContext;
        deleteValue(key: symbol): TracingContext;
    }


}

declare module "@azure/core-client/import" {

    import { AbortSignalLike } from "@azure/abort-controller/import";
    import { TokenCredential } from "@azure/core-auth/import";
    import { PipelineOptions, HttpClient, PipelineRequest, PipelineResponse, PipelinePolicy, Pipeline, TransferProgressEvent } from "@azure/core-rest-pipeline/import";
    import { OperationTracingOptions } from "@azure/core-tracing/import";
    import { HttpMethods } from "@azure/core-util/import";

    /** Initializes a new instance of the ServiceClient. */
    export class ServiceClient {
        readonly pipeline: Pipeline;
        constructor(options?: ServiceClientOptions);
        sendRequest(request: PipelineRequest): Promise<PipelineResponse>;
        sendOperationRequest<T>(operationArguments: OperationArguments, operationSpec: OperationSpec): Promise<T>;
    }


    /** The common set of options that high level clients are expected to expose. */
    export interface CommonClientOptions extends PipelineOptions {
        httpClient?: HttpClient;
        allowInsecureConnection?: boolean;
        additionalPolicies?: AdditionalPolicyConfig[];
    }


    /** Used to configure additional policies added to the pipeline at construction. */
    export interface AdditionalPolicyConfig {
        policy: PipelinePolicy;
        position: "perCall" | "perRetry";
    }


    /** Options to be provided while creating the client. */
    export interface ServiceClientOptions extends CommonClientOptions {
        /** @deprecated This property is deprecated and will be removed soon, please use endpoint instead */
        baseUri?: string;
        endpoint?: string;
        credentialScopes?: string | string[];
        requestContentType?: string;
        credential?: TokenCredential;
        pipeline?: Pipeline;
    }


    /** A collection of properties that apply to a single invocation of an operation. */
    export interface OperationArguments {
        options?: OperationOptions;
        [parameterName: string]: unknown;
    }


    /** The base options type for all operations. */
    export interface OperationOptions {
        abortSignal?: AbortSignalLike;
        requestOptions?: OperationRequestOptions;
        tracingOptions?: OperationTracingOptions;
        serializerOptions?: SerializerOptions;
        onResponse?: RawResponseCallback;
    }


    /** Options used when creating and sending HTTP requests for this operation. */
    export interface OperationRequestOptions {
        customHeaders?: {
            [key: string]: string;
        };
        timeout?: number;
        shouldDeserialize?: boolean | ((response: PipelineResponse) => boolean);
        allowInsecureConnection?: boolean;
        onUploadProgress(progress: TransferProgressEvent): void;
        onDownloadProgress(progress: TransferProgressEvent): void;
    }


    /** Options to configure serialization/de-serialization behavior. */
    export interface SerializerOptions {
        xml: XmlOptions;
        ignoreUnknownProperties?: boolean;
    }


    /** Options to govern behavior of xml parser and builder. */
    export interface XmlOptions {
        rootName?: string;
        includeRoot?: boolean;
        xmlCharKey?: string;
    }


    /** Wrapper object for http request and response. Deserialized object is stored in */
    export interface FullOperationResponse extends PipelineResponse {
        parsedHeaders?: {
            [key: string]: unknown;
        };
        parsedBody?: any;
        request: OperationRequest;
    }


    /** A specification that defines an operation. */
    export interface OperationSpec {
        readonly serializer: Serializer;
        readonly httpMethod: HttpMethods;
        readonly baseUrl?: string;
        readonly path?: string;
        readonly contentType?: string;
        readonly mediaType?: "json" | "xml" | "form" | "binary" | "multipart" | "text" | "unknown" | string;
        readonly requestBody?: OperationParameter;
        readonly isXML?: boolean;
        readonly urlParameters?: ReadonlyArray<OperationURLParameter>;
        readonly queryParameters?: ReadonlyArray<OperationQueryParameter>;
        readonly headerParameters?: ReadonlyArray<OperationParameter>;
        readonly formDataParameters?: ReadonlyArray<OperationParameter>;
        readonly responses: {
            [responseCode: string]: OperationResponseMap;
        };
    }


    /** Used to map raw response objects to final shapes. */
    export interface Serializer {
        readonly modelMappers: {
            [key: string]: any;
        };
        readonly isXML: boolean;
        /** @deprecated Removing the constraints validation on client side. */
        validateConstraints(mapper: Mapper, value: any, objectName: string): void;
        serialize(mapper: Mapper, object: any, objectName?: string, options?: SerializerOptions): any;
        deserialize(mapper: Mapper, responseBody: any, objectName: string, options?: SerializerOptions): any;
    }


    /** A common interface that all Operation parameter's extend. */
    export interface OperationParameter {
        parameterPath: ParameterPath;
        mapper: Mapper;
    }


    /** The base definition of a mapper. Can be used for XML and plain JavaScript objects. */
    export interface BaseMapper {
        xmlName?: string;
        xmlNamespace?: string;
        xmlNamespacePrefix?: string;
        xmlIsAttribute?: boolean;
        xmlIsMsText?: boolean;
        xmlElementName?: string;
        xmlIsWrapped?: boolean;
        readOnly?: boolean;
        isConstant?: boolean;
        required?: boolean;
        nullable?: boolean;
        serializedName?: string;
        type: MapperType;
        defaultValue?: any;
        constraints?: MapperConstraints;
    }


    /** The type of a simple mapper. */
    export interface SimpleMapperType {
        name: "Base64Url" | "Boolean" | "ByteArray" | "Date" | "DateTime" | "DateTimeRfc1123" | "Object" | "Stream" | "String" | "TimeSpan" | "UnixTime" | "Uuid" | "Number" | "any";
    }


    /** Helps build a mapper that describes how to map a set of properties of an object based on other mappers. */
    export interface CompositeMapperType {
        name: "Composite";
        className?: string;
        modelProperties?: {
            [propertyName: string]: Mapper;
        };
        additionalProperties?: Mapper;
        uberParent?: string;
        polymorphicDiscriminator?: PolymorphicDiscriminator;
    }


    /** Used to disambiguate discriminated type unions. */
    export interface PolymorphicDiscriminator {
        serializedName: string;
        clientName: string;
        [key: string]: string;
    }


    /** Helps build a mapper that describes how to parse a sequence of mapped values. */
    export interface SequenceMapperType {
        name: "Sequence";
        element: Mapper;
    }


    /** Helps build a mapper that describes how to parse a dictionary of mapped values. */
    export interface DictionaryMapperType {
        name: "Dictionary";
        value: Mapper;
    }


    /** Helps build a mapper that describes how to parse an enum value. */
    export interface EnumMapperType {
        name: "Enum";
        allowedValues: any[];
    }


    /** Description of various value constraints such as integer ranges and string regex. */
    export interface MapperConstraints {
        InclusiveMaximum?: number;
        ExclusiveMaximum?: number;
        InclusiveMinimum?: number;
        ExclusiveMinimum?: number;
        MaxLength?: number;
        MinLength?: number;
        Pattern?: RegExp;
        MaxItems?: number;
        MinItems?: number;
        UniqueItems?: true;
        MultipleOf?: number;
    }


    /** A mapper composed of other mappers. */
    export interface CompositeMapper extends BaseMapper {
        type: CompositeMapperType;
    }


    /** A mapper describing arrays. */
    export interface SequenceMapper extends BaseMapper {
        type: SequenceMapperType;
    }


    /** A mapper describing plain JavaScript objects used as key/value pairs. */
    export interface DictionaryMapper extends BaseMapper {
        type: DictionaryMapperType;
        headerCollectionPrefix?: string;
    }


    /** A mapper describing an enum value. */
    export interface EnumMapper extends BaseMapper {
        type: EnumMapperType;
    }


    /** A parameter for an operation that will be substituted into the operation's request URL. */
    export interface OperationURLParameter extends OperationParameter {
        skipEncoding?: boolean;
    }


    /** A parameter for an operation that will be added as a query parameter to the operation's HTTP */
    export interface OperationQueryParameter extends OperationParameter {
        skipEncoding?: boolean;
        collectionFormat?: QueryCollectionFormat;
    }


    /** An OperationResponse that can be returned from an operation request for a single status code. */
    export interface OperationResponseMap {
        headersMapper?: Mapper;
        bodyMapper?: Mapper;
        isError?: boolean;
    }


    /** A function to be called each time a response is received from the server */
    export type RawResponseCallback = (rawResponse: FullOperationResponse, flatResponse: unknown, error?: unknown) => void;


    /** Encodes how to reach a particular property on an object. */
    export type ParameterPath = string | string[] | {
        [propertyName: string]: ParameterPath;
    };


    /** Mappers are definitions of the data models used in the library. */
    export type Mapper = BaseMapper | CompositeMapper | SequenceMapper | DictionaryMapper | EnumMapper;


    /** Type of the mapper. Includes known mappers. */
    export type MapperType = SimpleMapperType | CompositeMapperType | SequenceMapperType | DictionaryMapperType | EnumMapperType;


    /** The format that will be used to join an array of values together for a query parameter value. */
    export type QueryCollectionFormat = "CSV" | "SSV" | "TSV" | "Pipes" | "Multi";


    /** A type alias for future proofing. */
    export type OperationRequest = PipelineRequest;


}

declare module "@azure/core-rest-pipeline/import" {

    import { AbortSignalLike } from "@azure/abort-controller/import";
    import { OperationTracingOptions } from "@azure/core-tracing/import";
    import { HttpMethods } from "@azure/core-util/import";
    import { Debugger } from "@azure/logger/import";

    /** Defines options that are used to configure the HTTP pipeline for */
    export interface PipelineOptions {
        retryOptions?: PipelineRetryOptions;
        proxyOptions?: ProxySettings;
        agent?: Agent;
        tlsOptions?: TlsSettings;
        redirectOptions?: RedirectPolicyOptions;
        userAgentOptions?: UserAgentPolicyOptions;
        telemetryOptions?: TelemetryOptions;
    }


    /** Options that control how to retry failed requests. */
    export interface PipelineRetryOptions {
        maxRetries?: number;
        retryDelayInMs?: number;
        maxRetryDelayInMs?: number;
    }


    /** Options to configure a proxy for outgoing requests (Node.js only). */
    export interface ProxySettings {
        host: string;
        port: number;
        username?: string;
        password?: string;
    }


    /** An interface compatible with NodeJS's `http.Agent`. */
    export interface Agent {
        maxFreeSockets: number;
        maxSockets: number;
        requests: unknown;
        sockets: unknown;
        destroy(): void;
    }


    /** Represents a certificate for TLS authentication. */
    export interface TlsSettings {
        ca?: string | Buffer | Array<string | Buffer> | undefined;
        cert?: string | Buffer | Array<string | Buffer> | undefined;
        key?: string | Buffer | Array<Buffer | KeyObject> | undefined;
        passphrase?: string | undefined;
        pfx?: string | Buffer | Array<string | Buffer | PxfObject> | undefined;
    }


    /** An interface compatible with NodeJS's `tls.KeyObject`. */
    export interface KeyObject {
        pem: string | Buffer;
        passphrase?: string | undefined;
    }


    /** An interface compatible with NodeJS's `tls.PxfObject`. */
    export interface PxfObject {
        buf: string | Buffer;
        passphrase?: string | undefined;
    }


    /** Options for how redirect responses are handled. */
    export interface RedirectPolicyOptions {
        maxRetries?: number;
        allowCrossOriginRedirects?: boolean;
    }


    /** Options for adding user agent details to outgoing requests. */
    export interface UserAgentPolicyOptions {
        userAgentPrefix?: string;
    }


    /** Defines options that are used to configure common telemetry and tracing info */
    export interface TelemetryOptions {
        clientRequestIdHeaderName?: string;
    }


    /** The required interface for a client that makes HTTP requests */
    export interface HttpClient {
        sendRequest: SendRequest;
    }


    /** Metadata about a request being made by the pipeline. */
    export interface PipelineRequest {
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
        abortSignal?: AbortSignalLike;
        tracingOptions?: OperationTracingOptions;
        allowInsecureConnection?: boolean;
        agent?: Agent;
        enableBrowserStreams?: boolean;
        tlsSettings?: TlsSettings;
        requestOverrides?: Record<string, unknown>;
        onUploadProgress(progress: TransferProgressEvent): void;
        onDownloadProgress(progress: TransferProgressEvent): void;
    }


    /** Represents a set of HTTP headers on a request/response. */
    export interface HttpHeaders extends Iterable<[string, string]> {
        get(name: string): string | undefined;
        has(name: string): boolean;
        set(name: string, value: string | number | boolean): void;
        delete(name: string): void;
        toJSON(options?: {
            preserveCase?: boolean;
        }): RawHttpHeaders;
    }


    /** A request body consisting of multiple parts. */
    export interface MultipartRequestBody {
        parts: BodyPart[];
        boundary?: string;
    }


    /** A part of the request body in a multipart request. */
    export interface BodyPart {
        headers: HttpHeaders;
        body: ((() => ReadableStream<Uint8Array>) | (() => NodeJS.ReadableStream)) | ReadableStream<Uint8Array> | NodeJS.ReadableStream | Uint8Array | Blob;
    }


    /** Metadata about a response received by the pipeline. */
    export interface PipelineResponse {
        request: PipelineRequest;
        status: number;
        headers: HttpHeaders;
        bodyAsText?: string | null;
        blobBody?: Promise<Blob>;
        browserStreamBody?: ReadableStream<Uint8Array>;
        readableStreamBody?: NodeJS.ReadableStream;
    }


    /** A pipeline policy manipulates a request as it travels through the pipeline. */
    export interface PipelinePolicy {
        name: string;
        sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse>;
    }


    /** Options to configure the logPolicy. */
    export interface LogPolicyOptions {
        additionalAllowedHeaderNames?: string[];
        additionalAllowedQueryParameters?: string[];
        logger?: Debugger;
    }


    /** Represents a pipeline for making a HTTP request to a URL. */
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


    /** Options when adding a policy to the pipeline. */
    export interface AddPolicyOptions {
        beforePolicies?: string[];
        afterPolicies?: string[];
        afterPhase?: PipelinePhase;
        phase?: PipelinePhase;
    }


    /** A simple interface for making a pipeline request and receiving a response. */
    export type SendRequest = (request: PipelineRequest) => Promise<PipelineResponse>;


    /** A HttpHeaders collection represented as a simple JSON object. */
    export type RawHttpHeaders = {
        [headerName: string]: string;
    };


    /** Types of bodies supported on the request. */
    export type RequestBodyType = NodeJS.ReadableStream | (() => NodeJS.ReadableStream) | ReadableStream<Uint8Array> | (() => ReadableStream<Uint8Array>) | Blob | ArrayBuffer | ArrayBufferView | FormData | string | null;


    /** A simple object that provides form data, as if from a browser form. */
    export type FormDataMap = {
        [key: string]: FormDataValue | FormDataValue[];
    };


    /** Each form data entry can be a string, Blob, or a File. If you wish to pass a file with a name but do not have */
    export type FormDataValue = string | Blob | File;


    /** Fired in response to upload or download progress. */
    export type TransferProgressEvent = {
        /**
         * The number of bytes loaded so far.
         */
        loadedBytes: number;
    };


    /** Policies are executed in phases. */
    export type PipelinePhase = "Deserialize" | "Serialize" | "Retry" | "Sign";


}

declare module "@azure/core-tracing/import" {

    import { TracingContext } from "@azure/core-auth/import";

    /** Tracing options to set on an operation. */
    export interface OperationTracingOptions {
        tracingContext?: TracingContext;
    }


}

declare module "@azure/core-util/import" {

    /** Supported HTTP methods to use when making requests. */
    export type HttpMethods = "GET" | "PUT" | "POST" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "TRACE";


}

declare module "@azure/logger/import" {

    /** A log function that can be dynamically enabled and redirected. */
    export interface Debugger {
        enabled: boolean;
        namespace: string;
        destroy(): boolean;
        log(args?: any[]): void;
        extend(namespace: string): Debugger;
    }


    /** Defines the methods available on the SDK-facing logger. */
    export interface AzureLogger {
        error: Debugger;
        warning: Debugger;
        info: Debugger;
        verbose: Debugger;
    }


    /** The log levels supported by the logger. */
    export type AzureLogLevel = "verbose" | "info" | "warning" | "error";


}

declare module "@azure/msal-node/import" {

    /** Client network interface to send backend requests. */
    export interface INetworkModule {
        sendGetRequestAsync<T>(url: string, options?: NetworkRequestOptions, timeout?: number): Promise<NetworkResponse<T>>;
        sendPostRequestAsync<T>(url: string, options?: NetworkRequestOptions): Promise<NetworkResponse<T>>;
    }


    /** Options allowed by network request APIs. */
    export type NetworkRequestOptions = {
        headers?: Record<string, string>;
        body?: string;
    };


    export type NetworkResponse<T> = {
        headers: Record<string, string>;
        body: T;
        status: number;
    };


}

declare module "@azure/identity/import" {

    import { AbortSignalLike } from "@azure/abort-controller/import";
    import { TokenCredential, AccessToken, GetTokenOptions, TracingContext } from "@azure/core-auth/import";
    import { ServiceClient, CommonClientOptions, AdditionalPolicyConfig, ServiceClientOptions, OperationArguments, OperationOptions, OperationRequestOptions, SerializerOptions, XmlOptions, FullOperationResponse, OperationSpec, Serializer, OperationParameter, BaseMapper, SimpleMapperType, CompositeMapperType, PolymorphicDiscriminator, SequenceMapperType, DictionaryMapperType, EnumMapperType, MapperConstraints, CompositeMapper, SequenceMapper, DictionaryMapper, EnumMapper, OperationURLParameter, OperationQueryParameter, OperationResponseMap, RawResponseCallback, ParameterPath, Mapper, MapperType, QueryCollectionFormat, OperationRequest } from "@azure/core-client/import";
    import { PipelineOptions, PipelineRetryOptions, ProxySettings, Agent, TlsSettings, KeyObject, PxfObject, RedirectPolicyOptions, UserAgentPolicyOptions, TelemetryOptions, HttpClient, PipelineRequest, HttpHeaders, MultipartRequestBody, BodyPart, PipelineResponse, PipelinePolicy, LogPolicyOptions, Pipeline, AddPolicyOptions, SendRequest, RawHttpHeaders, RequestBodyType, FormDataMap, FormDataValue, TransferProgressEvent, PipelinePhase } from "@azure/core-rest-pipeline/import";
    import { OperationTracingOptions } from "@azure/core-tracing/import";
    import { HttpMethods } from "@azure/core-util/import";
    import { Debugger, AzureLogger, AzureLogLevel } from "@azure/logger/import";
    import { INetworkModule, NetworkRequestOptions, NetworkResponse } from "@azure/msal-node/import";

    /** Enables authentication to Microsoft Entra ID using an authorization code */
    export class AuthorizationCodeCredential implements TokenCredential {
        constructor(tenantId: string | "common", clientId: string, clientSecret: string, authorizationCode: string, redirectUri: string, options?: AuthorizationCodeCredentialOptions);
        constructor(tenantId: string | "common", clientId: string, authorizationCode: string, redirectUri: string, options?: AuthorizationCodeCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** This credential will use the currently logged-in user login information */
    export class AzureCliCredential implements TokenCredential {
        constructor(options?: AzureCliCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Azure Developer CLI is a command-line interface tool that allows developers to create, manage, and deploy */
    export class AzureDeveloperCliCredential implements TokenCredential {
        constructor(options?: AzureDeveloperCliCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** This credential is designed to be used in Azure Pipelines with service connections */
    export class AzurePipelinesCredential implements TokenCredential {
        constructor(tenantId: string, clientId: string, serviceConnectionId: string, systemAccessToken: string, options?: AzurePipelinesCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** This credential will use the currently logged-in user information from the */
    export class AzurePowerShellCredential implements TokenCredential {
        constructor(options?: AzurePowerShellCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Enables multiple `TokenCredential` implementations to be tried in order until */
    export class ChainedTokenCredential implements TokenCredential {
        constructor(sources?: TokenCredential[]);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Authenticates a service principal with a JWT assertion. */
    export class ClientAssertionCredential implements TokenCredential {
        constructor(tenantId: string, clientId: string, getAssertion: () => Promise<string>, options?: ClientAssertionCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Enables authentication to Microsoft Entra ID using a PEM-encoded */
    export class ClientCertificateCredential implements TokenCredential {
        constructor(tenantId: string, clientId: string, certificatePath: string, options?: ClientCertificateCredentialOptions);
        constructor(tenantId: string, clientId: string, configuration: ClientCertificatePEMCertificatePath, options?: ClientCertificateCredentialOptions);
        constructor(tenantId: string, clientId: string, configuration: ClientCertificatePEMCertificate, options?: ClientCertificateCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Enables authentication to Microsoft Entra ID using a client secret */
    export class ClientSecretCredential implements TokenCredential {
        constructor(tenantId: string, clientId: string, clientSecret: string, options?: ClientSecretCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Enables authentication to Microsoft Entra ID using a device code */
    export class DeviceCodeCredential implements TokenCredential {
        constructor(options?: DeviceCodeCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
        authenticate(scopes: string | string[], options?: GetTokenOptions): Promise<AuthenticationRecord | undefined>;
    }


    /** Enables authentication to Microsoft Entra ID using a client secret or certificate. */
    export class EnvironmentCredential implements TokenCredential {
        constructor(options?: EnvironmentCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Enables authentication to Microsoft Entra ID inside of the web browser */
    export class InteractiveBrowserCredential implements TokenCredential {
        constructor(options: InteractiveBrowserCredentialNodeOptions | InteractiveBrowserCredentialInBrowserOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
        authenticate(scopes: string | string[], options?: GetTokenOptions): Promise<AuthenticationRecord | undefined>;
    }


    /** Attempts authentication using a managed identity available at the deployment environment. */
    export class ManagedIdentityCredential implements TokenCredential {
        constructor(clientId: string, options?: TokenCredentialOptions);
        constructor(options?: ManagedIdentityCredentialClientIdOptions);
        constructor(options?: ManagedIdentityCredentialResourceIdOptions);
        constructor(options?: ManagedIdentityCredentialObjectIdOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Enables authentication to Microsoft Entra ID using the [On Behalf Of flow](https://learn.microsoft.com/entra/identity... */
    export class OnBehalfOfCredential implements TokenCredential {
        constructor(options: OnBehalfOfCredentialCertificateOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions);
        constructor(options: OnBehalfOfCredentialSecretOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions);
        constructor(options: OnBehalfOfCredentialAssertionOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** @deprecated UsernamePasswordCredential is deprecated. Use a more secure credential. See https://aka.ms/azsdk/identity/mfa for details. */
    /** Enables authentication to Microsoft Entra ID with a user's */
    export class UsernamePasswordCredential implements TokenCredential {
        constructor(tenantId: string, clientId: string, username: string, password: string, options?: UsernamePasswordCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Connects to Azure using the user account signed in through the Azure Resources extension in Visual Studio Code. */
    export class VisualStudioCodeCredential implements TokenCredential {
        constructor(options?: VisualStudioCodeCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Workload Identity authentication is a feature in Azure that allows applications running on virtual machines (VMs) */
    export class WorkloadIdentityCredential implements TokenCredential {
        constructor(options?: WorkloadIdentityCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** /** */
    export class AggregateAuthenticationError extends Error {
        errors: any[];
        constructor(errors: any[], errorMessage?: string);
    }


    /** Provides details about a failure to authenticate with Azure Active */
    export class AuthenticationError extends Error {
        readonly statusCode: number;
        readonly errorResponse: ErrorResponse;
        constructor(statusCode: number, errorBody: object | string | undefined | null, options?: {
            cause?: unknown;
        });
    }


    /** Error used to enforce authentication after trying to retrieve a token silently. */
    export class AuthenticationRequiredError extends Error {
        scopes: string[];
        getTokenOptions?: GetTokenOptions;
        constructor(options: AuthenticationRequiredErrorOptions);
    }


    /** This signifies that the credential that was tried in a chained credential */
    export class CredentialUnavailableError extends Error {
        constructor(message?: string, options?: {
            cause?: unknown;
        });
    }


    /** /** */
    export class DefaultAzureCredential extends ChainedTokenCredential {
        constructor(options?: DefaultAzureCredentialClientIdOptions);
        constructor(options?: DefaultAzureCredentialResourceIdOptions);
        constructor(options?: DefaultAzureCredentialOptions);
    }


    /** Provides options to configure how the Identity library */
    export interface AuthorityValidationOptions {
        disableInstanceDiscovery?: boolean;
    }


    /** /** */
    export interface AuthorizationCodeCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
    }


    /** /** */
    export interface AzureCliCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
        subscription?: string;
    }


    /** /** */
    export interface AzureDeveloperCliCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
    }


    /** /** */
    export interface AzurePipelinesCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    /** /** */
    export interface AzurePowerShellCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
    }


    /** Configuration options for InteractiveBrowserCredential */
    export interface BrokerAuthOptions {
        brokerOptions?: BrokerOptions;
    }


    /** Shared configuration options for browser customization */
    export interface BrowserCustomizationOptions {
        browserCustomizationOptions?: {
            /**
             * Format for error messages for display in browser
             */
            errorMessage?: string;
            /**
             * Format for success messages for display in browser
             */
            successMessage?: string;
        };
    }


    /** /** */
    export interface ClientAssertionCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    /** /** */
    export interface ClientCertificatePEMCertificate {
        certificate: string;
        certificatePassword?: string;
    }


    /** /** */
    export interface ClientCertificatePEMCertificatePath {
        certificatePath: string;
        certificatePassword?: string;
    }


    /** /** */
    export interface ClientCertificateCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
        sendCertificateChain?: boolean;
    }


    /** /** */
    export interface ClientSecretCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    /** Shared configuration options for credentials that support persistent token */
    export interface CredentialPersistenceOptions {
        tokenCachePersistenceOptions?: TokenCachePersistenceOptions;
    }


    /** /** */
    export interface DefaultAzureCredentialClientIdOptions extends DefaultAzureCredentialOptions {
        managedIdentityClientId?: string;
        workloadIdentityClientId?: string;
    }


    /** /** */
    export interface DefaultAzureCredentialResourceIdOptions extends DefaultAzureCredentialOptions {
        managedIdentityResourceId: string;
    }


    /** /** */
    export interface DefaultAzureCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
        requiredEnvVars?: DefaultAzureCredentialEnvVars | DefaultAzureCredentialEnvVars[];
    }


    /** Provides the user code and verification URI where the code must be */
    export interface DeviceCodeInfo {
        userCode: string;
        verificationUri: string;
        message: string;
    }


    /** Defines options for the InteractiveBrowserCredential class for Node.js. */
    export interface DeviceCodeCredentialOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions {
        tenantId?: string;
        clientId?: string;
        userPromptCallback?: DeviceCodePromptCallback;
    }


    /** Enables authentication to Microsoft Entra ID depending on the available environment variables. */
    export interface EnvironmentCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
    }


    /** Defines the common options for the InteractiveBrowserCredential class. */
    export interface InteractiveBrowserCredentialNodeOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions, BrowserCustomizationOptions, BrokerAuthOptions {
        redirectUri?: string | (() => string);
        tenantId?: string;
        clientId?: string;
        loginHint?: string;
    }


    /** Defines the common options for the InteractiveBrowserCredential class. */
    export interface InteractiveBrowserCredentialInBrowserOptions extends InteractiveCredentialOptions {
        redirectUri?: string | (() => string);
        tenantId?: string;
        clientId: string;
        loginStyle?: BrowserLoginStyle;
        loginHint?: string;
    }


    /** Common constructor options for the Identity credentials that requires user interaction. */
    export interface InteractiveCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        authenticationRecord?: AuthenticationRecord;
        disableAutomaticAuthentication?: boolean;
    }


    /** /** */
    export interface ManagedIdentityCredentialClientIdOptions extends TokenCredentialOptions {
        clientId?: string;
    }


    /** /** */
    export interface ManagedIdentityCredentialResourceIdOptions extends TokenCredentialOptions {
        resourceId: string;
    }


    /** /** */
    export interface ManagedIdentityCredentialObjectIdOptions extends TokenCredentialOptions {
        objectId: string;
    }


    /** Options for multi-tenant applications which allows for additionally allowed tenants. */
    export interface MultiTenantTokenCredentialOptions extends TokenCredentialOptions {
        additionallyAllowedTenants?: string[];
    }


    /** /** */
    export interface OnBehalfOfCredentialSecretOptions {
        tenantId: string;
        clientId: string;
        clientSecret: string;
        userAssertionToken: string;
    }


    /** /** */
    export interface OnBehalfOfCredentialCertificateOptions {
        tenantId: string;
        clientId: string;
        certificatePath: string;
        userAssertionToken: string;
        sendCertificateChain?: boolean;
    }


    /** /** */
    export interface OnBehalfOfCredentialAssertionOptions {
        tenantId: string;
        clientId: string;
        userAssertionToken: string;
        getAssertion(): Promise<string>;
    }


    /** @deprecated UsernamePasswordCredential is deprecated. Use a more secure credential. See https://aka.ms/azsdk/identity/mfa for details. */
    /** /** */
    export interface UsernamePasswordCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    /** Provides options to configure the Visual Studio Code credential. */
    export interface VisualStudioCodeCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
    }


    /** /** */
    export interface WorkloadIdentityCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        tenantId?: string;
        clientId?: string;
        tokenFilePath?: string;
        enableAzureProxy?: boolean;
    }


    /** See the official documentation for more details: */
    export interface ErrorResponse {
        error: string;
        errorDescription: string;
        errorCodes?: number[];
        timestamp?: string;
        traceId?: string;
        correlationId?: string;
    }


    /** /** */
    export interface AuthenticationRequiredErrorOptions {
        scopes: string[];
        getTokenOptions?: GetTokenOptions;
        message?: string;
        cause?: unknown;
    }


    /** Parameters when WAM broker authentication is disabled. */
    export interface BrokerDisabledOptions {
        enabled: false;
        legacyEnableMsaPassthrough?: undefined;
        parentWindowHandle: undefined;
    }


    /** Parameters when WAM broker authentication is enabled. */
    export interface BrokerEnabledOptions {
        enabled: true;
        legacyEnableMsaPassthrough?: boolean;
        parentWindowHandle: Uint8Array;
        useDefaultBrokerAccount?: boolean;
    }


    /** Parameters that enable token cache persistence in the Identity credentials. */
    export interface TokenCachePersistenceOptions {
        enabled: boolean;
        name?: string;
        unsafeAllowUnencryptedStorage?: boolean;
    }


    /** The record to use to find the cached tokens in the cache. */
    export interface AuthenticationRecord {
        authority: string;
        homeAccountId: string;
        clientId: string;
        tenantId: string;
        username: string;
    }


    /** Provides options to configure how the Identity library makes authentication */
    export interface TokenCredentialOptions extends CommonClientOptions {
        authorityHost?: string;
        loggingOptions?: LogPolicyOptions & {
            /**
             * Allows logging account information once the authentication flow succeeds.
             */
            allowLoggingAccountIdentifiers?: boolean;
            /**
             * Allows logging personally identifiable information for customer support.
             */
            enableUnsafeSupportLogging?: boolean;
        };
    }


    /** The options to configure the token provider. */
    export interface GetBearerTokenProviderOptions {
        abortSignal?: AbortSignal;
        tracingOptions?: {
            /**
             * Tracing Context for the current request to get a token.
             */
            tracingContext?: TracingContext;
        };
    }


    /** A list of known Azure authority hosts */
    export enum AzureAuthorityHosts {
        AzureChina, AzureGermany, AzureGovernment, AzurePublicCloud
    }


    /** /** */
    export type ClientCertificateCredentialPEMConfiguration = ClientCertificatePEMCertificate | ClientCertificatePEMCertificatePath;


    /** /** */
    export type DefaultAzureCredentialEnvVars = "AZURE_TOKEN_CREDENTIALS" | "AZURE_CLIENT_ID" | "AZURE_TENANT_ID" | "AZURE_CLIENT_SECRET" | "AZURE_CLIENT_CERTIFICATE_PATH" | "AZURE_CLIENT_CERTIFICATE_PASSWORD" | "AZURE_ADDITIONALLY_ALLOWED_TENANTS" | "AZURE_CLIENT_SEND_CERTIFICATE_CHAIN" | "AZURE_FEDERATED_TOKEN_FILE";


    /** Defines the signature of a callback which will be passed to */
    export type DeviceCodePromptCallback = (deviceCodeInfo: DeviceCodeInfo) => void;


    /** (Browser-only feature) */
    export type BrowserLoginStyle = "redirect" | "popup";


    /** /** */
    export type OnBehalfOfCredentialOptions = (OnBehalfOfCredentialSecretOptions | OnBehalfOfCredentialCertificateOptions | OnBehalfOfCredentialAssertionOptions) & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions & AuthorityValidationOptions;


    /** Parameters that enable WAM broker authentication in the InteractiveBrowserCredential. */
    export type BrokerOptions = BrokerEnabledOptions | BrokerDisabledOptions;


    /** The type of an Azure Identity plugin, a function accepting a plugin */
    export type IdentityPlugin = (context: unknown) => void;


    /** /** */
    export function getDefaultAzureCredential(): TokenCredential;


    /** Serializes an `AuthenticationRecord` into a string. */
    export function serializeAuthenticationRecord(record: AuthenticationRecord): string;


    /** Deserializes a previously serialized authentication record from a string into an object. */
    export function deserializeAuthenticationRecord(serializedRecord: string): AuthenticationRecord;


    /** Extend Azure Identity with additional functionality. Pass a plugin from */
    export function useIdentityPlugin(plugin: IdentityPlugin): void;


    /** Returns a callback that provides a bearer token. */
    export function getBearerTokenProvider(credential: TokenCredential, scopes: string | string[], options?: GetBearerTokenProviderOptions): () => Promise<string>;


}

declare module "@azure/abort-controller/require" {

    /** Allows the request to be aborted upon firing of the "abort" event. */
    export interface AbortSignalLike {
        readonly aborted: boolean;
        addEventListener(type: "abort", listener: (this: AbortSignalLike, ev: any) => any, options?: any): void;
        removeEventListener(type: "abort", listener: (this: AbortSignalLike, ev: any) => any, options?: any): void;
    }


}

declare module "@azure/core-auth/require" {

    import { AbortSignalLike } from "@azure/abort-controller/require";
    import { HttpMethods } from "@azure/core-util/require";

    /** Represents a credential capable of providing an authentication token. */
    export interface TokenCredential {
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
    }


    /** Represents an access token with an expiration time. */
    export interface AccessToken {
        token: string;
        expiresOnTimestamp: number;
        refreshAfterTimestamp?: number;
        tokenType?: "Bearer" | "pop";
    }


    /** Defines options for TokenCredential.getToken. */
    export interface GetTokenOptions {
        abortSignal?: AbortSignalLike;
        requestOptions?: {
            /**
             * The number of milliseconds a request can take before automatically being terminated.
             */
            timeout?: number;
        };
        tracingOptions?: {
            /**
             * Tracing Context for the current request.
             */
            tracingContext?: TracingContext;
        };
        claims?: string;
        enableCae?: boolean;
        tenantId?: string;
        proofOfPossessionOptions?: {
            /**
             * The nonce value required for PoP token requests.
             * This is typically retrieved from the WWW-Authenticate header of a 401 challenge response.
             * This is used in combination with {@link resourceRequestUrl} and {@link resourceRequestMethod} to generate the PoP token.
             */
            nonce: string;
            /**
             * The HTTP method of the request.
             * This is used in combination with {@link resourceRequestUrl} and {@link nonce} to generate the PoP token.
             */
            resourceRequestMethod: HttpMethods;
            /**
             * The URL of the request.
             * This is used in combination with {@link resourceRequestMethod} and {@link nonce} to generate the PoP token.
             */
            resourceRequestUrl: string;
        };
    }


    /** An interface structurally compatible with OpenTelemetry. */
    export interface TracingContext {
        getValue(key: symbol): unknown;
        setValue(key: symbol, value: unknown): TracingContext;
        deleteValue(key: symbol): TracingContext;
    }


}

declare module "@azure/core-client/require" {

    import { AbortSignalLike } from "@azure/abort-controller/require";
    import { TokenCredential } from "@azure/core-auth/require";
    import { PipelineOptions, HttpClient, PipelineRequest, PipelineResponse, PipelinePolicy, Pipeline, TransferProgressEvent } from "@azure/core-rest-pipeline/require";
    import { OperationTracingOptions } from "@azure/core-tracing/require";
    import { HttpMethods } from "@azure/core-util/require";

    /** Initializes a new instance of the ServiceClient. */
    export class ServiceClient {
        readonly pipeline: Pipeline;
        constructor(options?: ServiceClientOptions);
        sendRequest(request: PipelineRequest): Promise<PipelineResponse>;
        sendOperationRequest<T>(operationArguments: OperationArguments, operationSpec: OperationSpec): Promise<T>;
    }


    /** The common set of options that high level clients are expected to expose. */
    export interface CommonClientOptions extends PipelineOptions {
        httpClient?: HttpClient;
        allowInsecureConnection?: boolean;
        additionalPolicies?: AdditionalPolicyConfig[];
    }


    /** Used to configure additional policies added to the pipeline at construction. */
    export interface AdditionalPolicyConfig {
        policy: PipelinePolicy;
        position: "perCall" | "perRetry";
    }


    /** Options to be provided while creating the client. */
    export interface ServiceClientOptions extends CommonClientOptions {
        /** @deprecated This property is deprecated and will be removed soon, please use endpoint instead */
        baseUri?: string;
        endpoint?: string;
        credentialScopes?: string | string[];
        requestContentType?: string;
        credential?: TokenCredential;
        pipeline?: Pipeline;
    }


    /** A collection of properties that apply to a single invocation of an operation. */
    export interface OperationArguments {
        options?: OperationOptions;
        [parameterName: string]: unknown;
    }


    /** The base options type for all operations. */
    export interface OperationOptions {
        abortSignal?: AbortSignalLike;
        requestOptions?: OperationRequestOptions;
        tracingOptions?: OperationTracingOptions;
        serializerOptions?: SerializerOptions;
        onResponse?: RawResponseCallback;
    }


    /** Options used when creating and sending HTTP requests for this operation. */
    export interface OperationRequestOptions {
        customHeaders?: {
            [key: string]: string;
        };
        timeout?: number;
        shouldDeserialize?: boolean | ((response: PipelineResponse) => boolean);
        allowInsecureConnection?: boolean;
        onUploadProgress(progress: TransferProgressEvent): void;
        onDownloadProgress(progress: TransferProgressEvent): void;
    }


    /** Options to configure serialization/de-serialization behavior. */
    export interface SerializerOptions {
        xml: XmlOptions;
        ignoreUnknownProperties?: boolean;
    }


    /** Options to govern behavior of xml parser and builder. */
    export interface XmlOptions {
        rootName?: string;
        includeRoot?: boolean;
        xmlCharKey?: string;
    }


    /** Wrapper object for http request and response. Deserialized object is stored in */
    export interface FullOperationResponse extends PipelineResponse {
        parsedHeaders?: {
            [key: string]: unknown;
        };
        parsedBody?: any;
        request: OperationRequest;
    }


    /** A specification that defines an operation. */
    export interface OperationSpec {
        readonly serializer: Serializer;
        readonly httpMethod: HttpMethods;
        readonly baseUrl?: string;
        readonly path?: string;
        readonly contentType?: string;
        readonly mediaType?: "json" | "xml" | "form" | "binary" | "multipart" | "text" | "unknown" | string;
        readonly requestBody?: OperationParameter;
        readonly isXML?: boolean;
        readonly urlParameters?: ReadonlyArray<OperationURLParameter>;
        readonly queryParameters?: ReadonlyArray<OperationQueryParameter>;
        readonly headerParameters?: ReadonlyArray<OperationParameter>;
        readonly formDataParameters?: ReadonlyArray<OperationParameter>;
        readonly responses: {
            [responseCode: string]: OperationResponseMap;
        };
    }


    /** Used to map raw response objects to final shapes. */
    export interface Serializer {
        readonly modelMappers: {
            [key: string]: any;
        };
        readonly isXML: boolean;
        /** @deprecated Removing the constraints validation on client side. */
        validateConstraints(mapper: Mapper, value: any, objectName: string): void;
        serialize(mapper: Mapper, object: any, objectName?: string, options?: SerializerOptions): any;
        deserialize(mapper: Mapper, responseBody: any, objectName: string, options?: SerializerOptions): any;
    }


    /** A common interface that all Operation parameter's extend. */
    export interface OperationParameter {
        parameterPath: ParameterPath;
        mapper: Mapper;
    }


    /** The base definition of a mapper. Can be used for XML and plain JavaScript objects. */
    export interface BaseMapper {
        xmlName?: string;
        xmlNamespace?: string;
        xmlNamespacePrefix?: string;
        xmlIsAttribute?: boolean;
        xmlIsMsText?: boolean;
        xmlElementName?: string;
        xmlIsWrapped?: boolean;
        readOnly?: boolean;
        isConstant?: boolean;
        required?: boolean;
        nullable?: boolean;
        serializedName?: string;
        type: MapperType;
        defaultValue?: any;
        constraints?: MapperConstraints;
    }


    /** The type of a simple mapper. */
    export interface SimpleMapperType {
        name: "Base64Url" | "Boolean" | "ByteArray" | "Date" | "DateTime" | "DateTimeRfc1123" | "Object" | "Stream" | "String" | "TimeSpan" | "UnixTime" | "Uuid" | "Number" | "any";
    }


    /** Helps build a mapper that describes how to map a set of properties of an object based on other mappers. */
    export interface CompositeMapperType {
        name: "Composite";
        className?: string;
        modelProperties?: {
            [propertyName: string]: Mapper;
        };
        additionalProperties?: Mapper;
        uberParent?: string;
        polymorphicDiscriminator?: PolymorphicDiscriminator;
    }


    /** Used to disambiguate discriminated type unions. */
    export interface PolymorphicDiscriminator {
        serializedName: string;
        clientName: string;
        [key: string]: string;
    }


    /** Helps build a mapper that describes how to parse a sequence of mapped values. */
    export interface SequenceMapperType {
        name: "Sequence";
        element: Mapper;
    }


    /** Helps build a mapper that describes how to parse a dictionary of mapped values. */
    export interface DictionaryMapperType {
        name: "Dictionary";
        value: Mapper;
    }


    /** Helps build a mapper that describes how to parse an enum value. */
    export interface EnumMapperType {
        name: "Enum";
        allowedValues: any[];
    }


    /** Description of various value constraints such as integer ranges and string regex. */
    export interface MapperConstraints {
        InclusiveMaximum?: number;
        ExclusiveMaximum?: number;
        InclusiveMinimum?: number;
        ExclusiveMinimum?: number;
        MaxLength?: number;
        MinLength?: number;
        Pattern?: RegExp;
        MaxItems?: number;
        MinItems?: number;
        UniqueItems?: true;
        MultipleOf?: number;
    }


    /** A mapper composed of other mappers. */
    export interface CompositeMapper extends BaseMapper {
        type: CompositeMapperType;
    }


    /** A mapper describing arrays. */
    export interface SequenceMapper extends BaseMapper {
        type: SequenceMapperType;
    }


    /** A mapper describing plain JavaScript objects used as key/value pairs. */
    export interface DictionaryMapper extends BaseMapper {
        type: DictionaryMapperType;
        headerCollectionPrefix?: string;
    }


    /** A mapper describing an enum value. */
    export interface EnumMapper extends BaseMapper {
        type: EnumMapperType;
    }


    /** A parameter for an operation that will be substituted into the operation's request URL. */
    export interface OperationURLParameter extends OperationParameter {
        skipEncoding?: boolean;
    }


    /** A parameter for an operation that will be added as a query parameter to the operation's HTTP */
    export interface OperationQueryParameter extends OperationParameter {
        skipEncoding?: boolean;
        collectionFormat?: QueryCollectionFormat;
    }


    /** An OperationResponse that can be returned from an operation request for a single status code. */
    export interface OperationResponseMap {
        headersMapper?: Mapper;
        bodyMapper?: Mapper;
        isError?: boolean;
    }


    /** A function to be called each time a response is received from the server */
    export type RawResponseCallback = (rawResponse: FullOperationResponse, flatResponse: unknown, error?: unknown) => void;


    /** Encodes how to reach a particular property on an object. */
    export type ParameterPath = string | string[] | {
        [propertyName: string]: ParameterPath;
    };


    /** Mappers are definitions of the data models used in the library. */
    export type Mapper = BaseMapper | CompositeMapper | SequenceMapper | DictionaryMapper | EnumMapper;


    /** Type of the mapper. Includes known mappers. */
    export type MapperType = SimpleMapperType | CompositeMapperType | SequenceMapperType | DictionaryMapperType | EnumMapperType;


    /** The format that will be used to join an array of values together for a query parameter value. */
    export type QueryCollectionFormat = "CSV" | "SSV" | "TSV" | "Pipes" | "Multi";


    /** A type alias for future proofing. */
    export type OperationRequest = PipelineRequest;


}

declare module "@azure/core-rest-pipeline/require" {

    import { AbortSignalLike } from "@azure/abort-controller/require";
    import { OperationTracingOptions } from "@azure/core-tracing/require";
    import { HttpMethods } from "@azure/core-util/require";
    import { Debugger } from "@azure/logger/require";

    /** Defines options that are used to configure the HTTP pipeline for */
    export interface PipelineOptions {
        retryOptions?: PipelineRetryOptions;
        proxyOptions?: ProxySettings;
        agent?: Agent;
        tlsOptions?: TlsSettings;
        redirectOptions?: RedirectPolicyOptions;
        userAgentOptions?: UserAgentPolicyOptions;
        telemetryOptions?: TelemetryOptions;
    }


    /** Options that control how to retry failed requests. */
    export interface PipelineRetryOptions {
        maxRetries?: number;
        retryDelayInMs?: number;
        maxRetryDelayInMs?: number;
    }


    /** Options to configure a proxy for outgoing requests (Node.js only). */
    export interface ProxySettings {
        host: string;
        port: number;
        username?: string;
        password?: string;
    }


    /** An interface compatible with NodeJS's `http.Agent`. */
    export interface Agent {
        maxFreeSockets: number;
        maxSockets: number;
        requests: unknown;
        sockets: unknown;
        destroy(): void;
    }


    /** Represents a certificate for TLS authentication. */
    export interface TlsSettings {
        ca?: string | Buffer | Array<string | Buffer> | undefined;
        cert?: string | Buffer | Array<string | Buffer> | undefined;
        key?: string | Buffer | Array<Buffer | KeyObject> | undefined;
        passphrase?: string | undefined;
        pfx?: string | Buffer | Array<string | Buffer | PxfObject> | undefined;
    }


    /** An interface compatible with NodeJS's `tls.KeyObject`. */
    export interface KeyObject {
        pem: string | Buffer;
        passphrase?: string | undefined;
    }


    /** An interface compatible with NodeJS's `tls.PxfObject`. */
    export interface PxfObject {
        buf: string | Buffer;
        passphrase?: string | undefined;
    }


    /** Options for how redirect responses are handled. */
    export interface RedirectPolicyOptions {
        maxRetries?: number;
        allowCrossOriginRedirects?: boolean;
    }


    /** Options for adding user agent details to outgoing requests. */
    export interface UserAgentPolicyOptions {
        userAgentPrefix?: string;
    }


    /** Defines options that are used to configure common telemetry and tracing info */
    export interface TelemetryOptions {
        clientRequestIdHeaderName?: string;
    }


    /** The required interface for a client that makes HTTP requests */
    export interface HttpClient {
        sendRequest: SendRequest;
    }


    /** Metadata about a request being made by the pipeline. */
    export interface PipelineRequest {
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
        abortSignal?: AbortSignalLike;
        tracingOptions?: OperationTracingOptions;
        allowInsecureConnection?: boolean;
        agent?: Agent;
        enableBrowserStreams?: boolean;
        tlsSettings?: TlsSettings;
        requestOverrides?: Record<string, unknown>;
        onUploadProgress(progress: TransferProgressEvent): void;
        onDownloadProgress(progress: TransferProgressEvent): void;
    }


    /** Represents a set of HTTP headers on a request/response. */
    export interface HttpHeaders extends Iterable<[string, string]> {
        get(name: string): string | undefined;
        has(name: string): boolean;
        set(name: string, value: string | number | boolean): void;
        delete(name: string): void;
        toJSON(options?: {
            preserveCase?: boolean;
        }): RawHttpHeaders;
    }


    /** A request body consisting of multiple parts. */
    export interface MultipartRequestBody {
        parts: BodyPart[];
        boundary?: string;
    }


    /** A part of the request body in a multipart request. */
    export interface BodyPart {
        headers: HttpHeaders;
        body: ((() => ReadableStream<Uint8Array>) | (() => NodeJS.ReadableStream)) | ReadableStream<Uint8Array> | NodeJS.ReadableStream | Uint8Array | Blob;
    }


    /** Metadata about a response received by the pipeline. */
    export interface PipelineResponse {
        request: PipelineRequest;
        status: number;
        headers: HttpHeaders;
        bodyAsText?: string | null;
        blobBody?: Promise<Blob>;
        browserStreamBody?: ReadableStream<Uint8Array>;
        readableStreamBody?: NodeJS.ReadableStream;
    }


    /** A pipeline policy manipulates a request as it travels through the pipeline. */
    export interface PipelinePolicy {
        name: string;
        sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse>;
    }


    /** Options to configure the logPolicy. */
    export interface LogPolicyOptions {
        additionalAllowedHeaderNames?: string[];
        additionalAllowedQueryParameters?: string[];
        logger?: Debugger;
    }


    /** Represents a pipeline for making a HTTP request to a URL. */
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


    /** Options when adding a policy to the pipeline. */
    export interface AddPolicyOptions {
        beforePolicies?: string[];
        afterPolicies?: string[];
        afterPhase?: PipelinePhase;
        phase?: PipelinePhase;
    }


    /** A simple interface for making a pipeline request and receiving a response. */
    export type SendRequest = (request: PipelineRequest) => Promise<PipelineResponse>;


    /** A HttpHeaders collection represented as a simple JSON object. */
    export type RawHttpHeaders = {
        [headerName: string]: string;
    };


    /** Types of bodies supported on the request. */
    export type RequestBodyType = NodeJS.ReadableStream | (() => NodeJS.ReadableStream) | ReadableStream<Uint8Array> | (() => ReadableStream<Uint8Array>) | Blob | ArrayBuffer | ArrayBufferView | FormData | string | null;


    /** A simple object that provides form data, as if from a browser form. */
    export type FormDataMap = {
        [key: string]: FormDataValue | FormDataValue[];
    };


    /** Each form data entry can be a string, Blob, or a File. If you wish to pass a file with a name but do not have */
    export type FormDataValue = string | Blob | File;


    /** Fired in response to upload or download progress. */
    export type TransferProgressEvent = {
        /**
         * The number of bytes loaded so far.
         */
        loadedBytes: number;
    };


    /** Policies are executed in phases. */
    export type PipelinePhase = "Deserialize" | "Serialize" | "Retry" | "Sign";


}

declare module "@azure/core-tracing/require" {

    import { TracingContext } from "@azure/core-auth/require";

    /** Tracing options to set on an operation. */
    export interface OperationTracingOptions {
        tracingContext?: TracingContext;
    }


}

declare module "@azure/core-util/require" {

    /** Supported HTTP methods to use when making requests. */
    export type HttpMethods = "GET" | "PUT" | "POST" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "TRACE";


}

declare module "@azure/logger/require" {

    /** A log function that can be dynamically enabled and redirected. */
    export interface Debugger {
        enabled: boolean;
        namespace: string;
        destroy(): boolean;
        log(args?: any[]): void;
        extend(namespace: string): Debugger;
    }


    /** Defines the methods available on the SDK-facing logger. */
    export interface AzureLogger {
        error: Debugger;
        warning: Debugger;
        info: Debugger;
        verbose: Debugger;
    }


    /** The log levels supported by the logger. */
    export type AzureLogLevel = "verbose" | "info" | "warning" | "error";


}

declare module "@azure/msal-node/require" {

    /** Client network interface to send backend requests. */
    export interface INetworkModule {
        sendGetRequestAsync<T>(url: string, options?: NetworkRequestOptions, timeout?: number): Promise<NetworkResponse<T>>;
        sendPostRequestAsync<T>(url: string, options?: NetworkRequestOptions): Promise<NetworkResponse<T>>;
    }


    /** Options allowed by network request APIs. */
    export type NetworkRequestOptions = {
        headers?: Record<string, string>;
        body?: string;
    };


    export type NetworkResponse<T> = {
        headers: Record<string, string>;
        body: T;
        status: number;
    };


}

declare module "@azure/identity/require" {

    import { AbortSignalLike } from "@azure/abort-controller/require";
    import { TokenCredential, AccessToken, GetTokenOptions, TracingContext } from "@azure/core-auth/require";
    import { ServiceClient, CommonClientOptions, AdditionalPolicyConfig, ServiceClientOptions, OperationArguments, OperationOptions, OperationRequestOptions, SerializerOptions, XmlOptions, FullOperationResponse, OperationSpec, Serializer, OperationParameter, BaseMapper, SimpleMapperType, CompositeMapperType, PolymorphicDiscriminator, SequenceMapperType, DictionaryMapperType, EnumMapperType, MapperConstraints, CompositeMapper, SequenceMapper, DictionaryMapper, EnumMapper, OperationURLParameter, OperationQueryParameter, OperationResponseMap, RawResponseCallback, ParameterPath, Mapper, MapperType, QueryCollectionFormat, OperationRequest } from "@azure/core-client/require";
    import { PipelineOptions, PipelineRetryOptions, ProxySettings, Agent, TlsSettings, KeyObject, PxfObject, RedirectPolicyOptions, UserAgentPolicyOptions, TelemetryOptions, HttpClient, PipelineRequest, HttpHeaders, MultipartRequestBody, BodyPart, PipelineResponse, PipelinePolicy, LogPolicyOptions, Pipeline, AddPolicyOptions, SendRequest, RawHttpHeaders, RequestBodyType, FormDataMap, FormDataValue, TransferProgressEvent, PipelinePhase } from "@azure/core-rest-pipeline/require";
    import { OperationTracingOptions } from "@azure/core-tracing/require";
    import { HttpMethods } from "@azure/core-util/require";
    import { Debugger, AzureLogger, AzureLogLevel } from "@azure/logger/require";
    import { INetworkModule, NetworkRequestOptions, NetworkResponse } from "@azure/msal-node/require";

    /** Enables authentication to Microsoft Entra ID using an authorization code */
    export class AuthorizationCodeCredential implements TokenCredential {
        constructor(tenantId: string | "common", clientId: string, clientSecret: string, authorizationCode: string, redirectUri: string, options?: AuthorizationCodeCredentialOptions);
        constructor(tenantId: string | "common", clientId: string, authorizationCode: string, redirectUri: string, options?: AuthorizationCodeCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** This credential will use the currently logged-in user login information */
    export class AzureCliCredential implements TokenCredential {
        constructor(options?: AzureCliCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Azure Developer CLI is a command-line interface tool that allows developers to create, manage, and deploy */
    export class AzureDeveloperCliCredential implements TokenCredential {
        constructor(options?: AzureDeveloperCliCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** This credential is designed to be used in Azure Pipelines with service connections */
    export class AzurePipelinesCredential implements TokenCredential {
        constructor(tenantId: string, clientId: string, serviceConnectionId: string, systemAccessToken: string, options?: AzurePipelinesCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** This credential will use the currently logged-in user information from the */
    export class AzurePowerShellCredential implements TokenCredential {
        constructor(options?: AzurePowerShellCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Enables multiple `TokenCredential` implementations to be tried in order until */
    export class ChainedTokenCredential implements TokenCredential {
        constructor(sources?: TokenCredential[]);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Authenticates a service principal with a JWT assertion. */
    export class ClientAssertionCredential implements TokenCredential {
        constructor(tenantId: string, clientId: string, getAssertion: () => Promise<string>, options?: ClientAssertionCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Enables authentication to Microsoft Entra ID using a PEM-encoded */
    export class ClientCertificateCredential implements TokenCredential {
        constructor(tenantId: string, clientId: string, certificatePath: string, options?: ClientCertificateCredentialOptions);
        constructor(tenantId: string, clientId: string, configuration: ClientCertificatePEMCertificatePath, options?: ClientCertificateCredentialOptions);
        constructor(tenantId: string, clientId: string, configuration: ClientCertificatePEMCertificate, options?: ClientCertificateCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Enables authentication to Microsoft Entra ID using a client secret */
    export class ClientSecretCredential implements TokenCredential {
        constructor(tenantId: string, clientId: string, clientSecret: string, options?: ClientSecretCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Enables authentication to Microsoft Entra ID using a device code */
    export class DeviceCodeCredential implements TokenCredential {
        constructor(options?: DeviceCodeCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
        authenticate(scopes: string | string[], options?: GetTokenOptions): Promise<AuthenticationRecord | undefined>;
    }


    /** Enables authentication to Microsoft Entra ID using a client secret or certificate. */
    export class EnvironmentCredential implements TokenCredential {
        constructor(options?: EnvironmentCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Enables authentication to Microsoft Entra ID inside of the web browser */
    export class InteractiveBrowserCredential implements TokenCredential {
        constructor(options: InteractiveBrowserCredentialNodeOptions | InteractiveBrowserCredentialInBrowserOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
        authenticate(scopes: string | string[], options?: GetTokenOptions): Promise<AuthenticationRecord | undefined>;
    }


    /** Attempts authentication using a managed identity available at the deployment environment. */
    export class ManagedIdentityCredential implements TokenCredential {
        constructor(clientId: string, options?: TokenCredentialOptions);
        constructor(options?: ManagedIdentityCredentialClientIdOptions);
        constructor(options?: ManagedIdentityCredentialResourceIdOptions);
        constructor(options?: ManagedIdentityCredentialObjectIdOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Enables authentication to Microsoft Entra ID using the [On Behalf Of flow](https://learn.microsoft.com/entra/identity... */
    export class OnBehalfOfCredential implements TokenCredential {
        constructor(options: OnBehalfOfCredentialCertificateOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions);
        constructor(options: OnBehalfOfCredentialSecretOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions);
        constructor(options: OnBehalfOfCredentialAssertionOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** @deprecated UsernamePasswordCredential is deprecated. Use a more secure credential. See https://aka.ms/azsdk/identity/mfa for details. */
    /** Enables authentication to Microsoft Entra ID with a user's */
    export class UsernamePasswordCredential implements TokenCredential {
        constructor(tenantId: string, clientId: string, username: string, password: string, options?: UsernamePasswordCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Connects to Azure using the user account signed in through the Azure Resources extension in Visual Studio Code. */
    export class VisualStudioCodeCredential implements TokenCredential {
        constructor(options?: VisualStudioCodeCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Workload Identity authentication is a feature in Azure that allows applications running on virtual machines (VMs) */
    export class WorkloadIdentityCredential implements TokenCredential {
        constructor(options?: WorkloadIdentityCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** /** */
    export class AggregateAuthenticationError extends Error {
        errors: any[];
        constructor(errors: any[], errorMessage?: string);
    }


    /** Provides details about a failure to authenticate with Azure Active */
    export class AuthenticationError extends Error {
        readonly statusCode: number;
        readonly errorResponse: ErrorResponse;
        constructor(statusCode: number, errorBody: object | string | undefined | null, options?: {
            cause?: unknown;
        });
    }


    /** Error used to enforce authentication after trying to retrieve a token silently. */
    export class AuthenticationRequiredError extends Error {
        scopes: string[];
        getTokenOptions?: GetTokenOptions;
        constructor(options: AuthenticationRequiredErrorOptions);
    }


    /** This signifies that the credential that was tried in a chained credential */
    export class CredentialUnavailableError extends Error {
        constructor(message?: string, options?: {
            cause?: unknown;
        });
    }


    /** /** */
    export class DefaultAzureCredential extends ChainedTokenCredential {
        constructor(options?: DefaultAzureCredentialClientIdOptions);
        constructor(options?: DefaultAzureCredentialResourceIdOptions);
        constructor(options?: DefaultAzureCredentialOptions);
    }


    /** Provides options to configure how the Identity library */
    export interface AuthorityValidationOptions {
        disableInstanceDiscovery?: boolean;
    }


    /** /** */
    export interface AuthorizationCodeCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
    }


    /** /** */
    export interface AzureCliCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
        subscription?: string;
    }


    /** /** */
    export interface AzureDeveloperCliCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
    }


    /** /** */
    export interface AzurePipelinesCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    /** /** */
    export interface AzurePowerShellCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
    }


    /** Configuration options for InteractiveBrowserCredential */
    export interface BrokerAuthOptions {
        brokerOptions?: BrokerOptions;
    }


    /** Shared configuration options for browser customization */
    export interface BrowserCustomizationOptions {
        browserCustomizationOptions?: {
            /**
             * Format for error messages for display in browser
             */
            errorMessage?: string;
            /**
             * Format for success messages for display in browser
             */
            successMessage?: string;
        };
    }


    /** /** */
    export interface ClientAssertionCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    /** /** */
    export interface ClientCertificatePEMCertificate {
        certificate: string;
        certificatePassword?: string;
    }


    /** /** */
    export interface ClientCertificatePEMCertificatePath {
        certificatePath: string;
        certificatePassword?: string;
    }


    /** /** */
    export interface ClientCertificateCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
        sendCertificateChain?: boolean;
    }


    /** /** */
    export interface ClientSecretCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    /** Shared configuration options for credentials that support persistent token */
    export interface CredentialPersistenceOptions {
        tokenCachePersistenceOptions?: TokenCachePersistenceOptions;
    }


    /** /** */
    export interface DefaultAzureCredentialClientIdOptions extends DefaultAzureCredentialOptions {
        managedIdentityClientId?: string;
        workloadIdentityClientId?: string;
    }


    /** /** */
    export interface DefaultAzureCredentialResourceIdOptions extends DefaultAzureCredentialOptions {
        managedIdentityResourceId: string;
    }


    /** /** */
    export interface DefaultAzureCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
        requiredEnvVars?: DefaultAzureCredentialEnvVars | DefaultAzureCredentialEnvVars[];
    }


    /** Provides the user code and verification URI where the code must be */
    export interface DeviceCodeInfo {
        userCode: string;
        verificationUri: string;
        message: string;
    }


    /** Defines options for the InteractiveBrowserCredential class for Node.js. */
    export interface DeviceCodeCredentialOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions {
        tenantId?: string;
        clientId?: string;
        userPromptCallback?: DeviceCodePromptCallback;
    }


    /** Enables authentication to Microsoft Entra ID depending on the available environment variables. */
    export interface EnvironmentCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
    }


    /** Defines the common options for the InteractiveBrowserCredential class. */
    export interface InteractiveBrowserCredentialNodeOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions, BrowserCustomizationOptions, BrokerAuthOptions {
        redirectUri?: string | (() => string);
        tenantId?: string;
        clientId?: string;
        loginHint?: string;
    }


    /** Defines the common options for the InteractiveBrowserCredential class. */
    export interface InteractiveBrowserCredentialInBrowserOptions extends InteractiveCredentialOptions {
        redirectUri?: string | (() => string);
        tenantId?: string;
        clientId: string;
        loginStyle?: BrowserLoginStyle;
        loginHint?: string;
    }


    /** Common constructor options for the Identity credentials that requires user interaction. */
    export interface InteractiveCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        authenticationRecord?: AuthenticationRecord;
        disableAutomaticAuthentication?: boolean;
    }


    /** /** */
    export interface ManagedIdentityCredentialClientIdOptions extends TokenCredentialOptions {
        clientId?: string;
    }


    /** /** */
    export interface ManagedIdentityCredentialResourceIdOptions extends TokenCredentialOptions {
        resourceId: string;
    }


    /** /** */
    export interface ManagedIdentityCredentialObjectIdOptions extends TokenCredentialOptions {
        objectId: string;
    }


    /** Options for multi-tenant applications which allows for additionally allowed tenants. */
    export interface MultiTenantTokenCredentialOptions extends TokenCredentialOptions {
        additionallyAllowedTenants?: string[];
    }


    /** /** */
    export interface OnBehalfOfCredentialSecretOptions {
        tenantId: string;
        clientId: string;
        clientSecret: string;
        userAssertionToken: string;
    }


    /** /** */
    export interface OnBehalfOfCredentialCertificateOptions {
        tenantId: string;
        clientId: string;
        certificatePath: string;
        userAssertionToken: string;
        sendCertificateChain?: boolean;
    }


    /** /** */
    export interface OnBehalfOfCredentialAssertionOptions {
        tenantId: string;
        clientId: string;
        userAssertionToken: string;
        getAssertion(): Promise<string>;
    }


    /** @deprecated UsernamePasswordCredential is deprecated. Use a more secure credential. See https://aka.ms/azsdk/identity/mfa for details. */
    /** /** */
    export interface UsernamePasswordCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    /** Provides options to configure the Visual Studio Code credential. */
    export interface VisualStudioCodeCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
    }


    /** /** */
    export interface WorkloadIdentityCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        tenantId?: string;
        clientId?: string;
        tokenFilePath?: string;
        enableAzureProxy?: boolean;
    }


    /** See the official documentation for more details: */
    export interface ErrorResponse {
        error: string;
        errorDescription: string;
        errorCodes?: number[];
        timestamp?: string;
        traceId?: string;
        correlationId?: string;
    }


    /** /** */
    export interface AuthenticationRequiredErrorOptions {
        scopes: string[];
        getTokenOptions?: GetTokenOptions;
        message?: string;
        cause?: unknown;
    }


    /** Parameters when WAM broker authentication is disabled. */
    export interface BrokerDisabledOptions {
        enabled: false;
        legacyEnableMsaPassthrough?: undefined;
        parentWindowHandle: undefined;
    }


    /** Parameters when WAM broker authentication is enabled. */
    export interface BrokerEnabledOptions {
        enabled: true;
        legacyEnableMsaPassthrough?: boolean;
        parentWindowHandle: Uint8Array;
        useDefaultBrokerAccount?: boolean;
    }


    /** Parameters that enable token cache persistence in the Identity credentials. */
    export interface TokenCachePersistenceOptions {
        enabled: boolean;
        name?: string;
        unsafeAllowUnencryptedStorage?: boolean;
    }


    /** The record to use to find the cached tokens in the cache. */
    export interface AuthenticationRecord {
        authority: string;
        homeAccountId: string;
        clientId: string;
        tenantId: string;
        username: string;
    }


    /** Provides options to configure how the Identity library makes authentication */
    export interface TokenCredentialOptions extends CommonClientOptions {
        authorityHost?: string;
        loggingOptions?: LogPolicyOptions & {
            /**
             * Allows logging account information once the authentication flow succeeds.
             */
            allowLoggingAccountIdentifiers?: boolean;
            /**
             * Allows logging personally identifiable information for customer support.
             */
            enableUnsafeSupportLogging?: boolean;
        };
    }


    /** The options to configure the token provider. */
    export interface GetBearerTokenProviderOptions {
        abortSignal?: AbortSignal;
        tracingOptions?: {
            /**
             * Tracing Context for the current request to get a token.
             */
            tracingContext?: TracingContext;
        };
    }


    /** A list of known Azure authority hosts */
    export enum AzureAuthorityHosts {
        AzureChina, AzureGermany, AzureGovernment, AzurePublicCloud
    }


    /** /** */
    export type ClientCertificateCredentialPEMConfiguration = ClientCertificatePEMCertificate | ClientCertificatePEMCertificatePath;


    /** /** */
    export type DefaultAzureCredentialEnvVars = "AZURE_TOKEN_CREDENTIALS" | "AZURE_CLIENT_ID" | "AZURE_TENANT_ID" | "AZURE_CLIENT_SECRET" | "AZURE_CLIENT_CERTIFICATE_PATH" | "AZURE_CLIENT_CERTIFICATE_PASSWORD" | "AZURE_ADDITIONALLY_ALLOWED_TENANTS" | "AZURE_CLIENT_SEND_CERTIFICATE_CHAIN" | "AZURE_FEDERATED_TOKEN_FILE";


    /** Defines the signature of a callback which will be passed to */
    export type DeviceCodePromptCallback = (deviceCodeInfo: DeviceCodeInfo) => void;


    /** (Browser-only feature) */
    export type BrowserLoginStyle = "redirect" | "popup";


    /** /** */
    export type OnBehalfOfCredentialOptions = (OnBehalfOfCredentialSecretOptions | OnBehalfOfCredentialCertificateOptions | OnBehalfOfCredentialAssertionOptions) & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions & AuthorityValidationOptions;


    /** Parameters that enable WAM broker authentication in the InteractiveBrowserCredential. */
    export type BrokerOptions = BrokerEnabledOptions | BrokerDisabledOptions;


    /** The type of an Azure Identity plugin, a function accepting a plugin */
    export type IdentityPlugin = (context: unknown) => void;


    /** /** */
    export function getDefaultAzureCredential(): TokenCredential;


    /** Serializes an `AuthenticationRecord` into a string. */
    export function serializeAuthenticationRecord(record: AuthenticationRecord): string;


    /** Deserializes a previously serialized authentication record from a string into an object. */
    export function deserializeAuthenticationRecord(serializedRecord: string): AuthenticationRecord;


    /** Extend Azure Identity with additional functionality. Pass a plugin from */
    export function useIdentityPlugin(plugin: IdentityPlugin): void;


    /** Returns a callback that provides a bearer token. */
    export function getBearerTokenProvider(credential: TokenCredential, scopes: string | string[], options?: GetBearerTokenProviderOptions): () => Promise<string>;


}

declare module "@azure/abort-controller" {

    /** Allows the request to be aborted upon firing of the "abort" event. */
    export interface AbortSignalLike {
        readonly aborted: boolean;
        addEventListener(type: "abort", listener: (this: AbortSignalLike, ev: any) => any, options?: any): void;
        removeEventListener(type: "abort", listener: (this: AbortSignalLike, ev: any) => any, options?: any): void;
    }


}

declare module "@azure/core-auth" {

    import { AbortSignalLike } from "@azure/abort-controller";
    import { HttpMethods } from "@azure/core-util";

    /** Represents a credential capable of providing an authentication token. */
    export interface TokenCredential {
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
    }


    /** Represents an access token with an expiration time. */
    export interface AccessToken {
        token: string;
        expiresOnTimestamp: number;
        refreshAfterTimestamp?: number;
        tokenType?: "Bearer" | "pop";
    }


    /** Defines options for TokenCredential.getToken. */
    export interface GetTokenOptions {
        abortSignal?: AbortSignalLike;
        requestOptions?: {
            /**
             * The number of milliseconds a request can take before automatically being terminated.
             */
            timeout?: number;
        };
        tracingOptions?: {
            /**
             * Tracing Context for the current request.
             */
            tracingContext?: TracingContext;
        };
        claims?: string;
        enableCae?: boolean;
        tenantId?: string;
        proofOfPossessionOptions?: {
            /**
             * The nonce value required for PoP token requests.
             * This is typically retrieved from the WWW-Authenticate header of a 401 challenge response.
             * This is used in combination with {@link resourceRequestUrl} and {@link resourceRequestMethod} to generate the PoP token.
             */
            nonce: string;
            /**
             * The HTTP method of the request.
             * This is used in combination with {@link resourceRequestUrl} and {@link nonce} to generate the PoP token.
             */
            resourceRequestMethod: HttpMethods;
            /**
             * The URL of the request.
             * This is used in combination with {@link resourceRequestMethod} and {@link nonce} to generate the PoP token.
             */
            resourceRequestUrl: string;
        };
    }


    /** An interface structurally compatible with OpenTelemetry. */
    export interface TracingContext {
        getValue(key: symbol): unknown;
        setValue(key: symbol, value: unknown): TracingContext;
        deleteValue(key: symbol): TracingContext;
    }


}

declare module "@azure/core-client" {

    import { AbortSignalLike } from "@azure/abort-controller";
    import { TokenCredential } from "@azure/core-auth";
    import { PipelineOptions, HttpClient, PipelineRequest, PipelineResponse, PipelinePolicy, Pipeline, TransferProgressEvent } from "@azure/core-rest-pipeline";
    import { OperationTracingOptions } from "@azure/core-tracing";
    import { HttpMethods } from "@azure/core-util";

    /** Initializes a new instance of the ServiceClient. */
    export class ServiceClient {
        readonly pipeline: Pipeline;
        constructor(options?: ServiceClientOptions);
        sendRequest(request: PipelineRequest): Promise<PipelineResponse>;
        sendOperationRequest<T>(operationArguments: OperationArguments, operationSpec: OperationSpec): Promise<T>;
    }


    /** The common set of options that high level clients are expected to expose. */
    export interface CommonClientOptions extends PipelineOptions {
        httpClient?: HttpClient;
        allowInsecureConnection?: boolean;
        additionalPolicies?: AdditionalPolicyConfig[];
    }


    /** Used to configure additional policies added to the pipeline at construction. */
    export interface AdditionalPolicyConfig {
        policy: PipelinePolicy;
        position: "perCall" | "perRetry";
    }


    /** Options to be provided while creating the client. */
    export interface ServiceClientOptions extends CommonClientOptions {
        /** @deprecated This property is deprecated and will be removed soon, please use endpoint instead */
        baseUri?: string;
        endpoint?: string;
        credentialScopes?: string | string[];
        requestContentType?: string;
        credential?: TokenCredential;
        pipeline?: Pipeline;
    }


    /** A collection of properties that apply to a single invocation of an operation. */
    export interface OperationArguments {
        options?: OperationOptions;
        [parameterName: string]: unknown;
    }


    /** The base options type for all operations. */
    export interface OperationOptions {
        abortSignal?: AbortSignalLike;
        requestOptions?: OperationRequestOptions;
        tracingOptions?: OperationTracingOptions;
        serializerOptions?: SerializerOptions;
        onResponse?: RawResponseCallback;
    }


    /** Options used when creating and sending HTTP requests for this operation. */
    export interface OperationRequestOptions {
        customHeaders?: {
            [key: string]: string;
        };
        timeout?: number;
        shouldDeserialize?: boolean | ((response: PipelineResponse) => boolean);
        allowInsecureConnection?: boolean;
        onUploadProgress(progress: TransferProgressEvent): void;
        onDownloadProgress(progress: TransferProgressEvent): void;
    }


    /** Options to configure serialization/de-serialization behavior. */
    export interface SerializerOptions {
        xml: XmlOptions;
        ignoreUnknownProperties?: boolean;
    }


    /** Options to govern behavior of xml parser and builder. */
    export interface XmlOptions {
        rootName?: string;
        includeRoot?: boolean;
        xmlCharKey?: string;
    }


    /** Wrapper object for http request and response. Deserialized object is stored in */
    export interface FullOperationResponse extends PipelineResponse {
        parsedHeaders?: {
            [key: string]: unknown;
        };
        parsedBody?: any;
        request: OperationRequest;
    }


    /** A specification that defines an operation. */
    export interface OperationSpec {
        readonly serializer: Serializer;
        readonly httpMethod: HttpMethods;
        readonly baseUrl?: string;
        readonly path?: string;
        readonly contentType?: string;
        readonly mediaType?: "json" | "xml" | "form" | "binary" | "multipart" | "text" | "unknown" | string;
        readonly requestBody?: OperationParameter;
        readonly isXML?: boolean;
        readonly urlParameters?: ReadonlyArray<OperationURLParameter>;
        readonly queryParameters?: ReadonlyArray<OperationQueryParameter>;
        readonly headerParameters?: ReadonlyArray<OperationParameter>;
        readonly formDataParameters?: ReadonlyArray<OperationParameter>;
        readonly responses: {
            [responseCode: string]: OperationResponseMap;
        };
    }


    /** Used to map raw response objects to final shapes. */
    export interface Serializer {
        readonly modelMappers: {
            [key: string]: any;
        };
        readonly isXML: boolean;
        /** @deprecated Removing the constraints validation on client side. */
        validateConstraints(mapper: Mapper, value: any, objectName: string): void;
        serialize(mapper: Mapper, object: any, objectName?: string, options?: SerializerOptions): any;
        deserialize(mapper: Mapper, responseBody: any, objectName: string, options?: SerializerOptions): any;
    }


    /** A common interface that all Operation parameter's extend. */
    export interface OperationParameter {
        parameterPath: ParameterPath;
        mapper: Mapper;
    }


    /** The base definition of a mapper. Can be used for XML and plain JavaScript objects. */
    export interface BaseMapper {
        xmlName?: string;
        xmlNamespace?: string;
        xmlNamespacePrefix?: string;
        xmlIsAttribute?: boolean;
        xmlIsMsText?: boolean;
        xmlElementName?: string;
        xmlIsWrapped?: boolean;
        readOnly?: boolean;
        isConstant?: boolean;
        required?: boolean;
        nullable?: boolean;
        serializedName?: string;
        type: MapperType;
        defaultValue?: any;
        constraints?: MapperConstraints;
    }


    /** The type of a simple mapper. */
    export interface SimpleMapperType {
        name: "Base64Url" | "Boolean" | "ByteArray" | "Date" | "DateTime" | "DateTimeRfc1123" | "Object" | "Stream" | "String" | "TimeSpan" | "UnixTime" | "Uuid" | "Number" | "any";
    }


    /** Helps build a mapper that describes how to map a set of properties of an object based on other mappers. */
    export interface CompositeMapperType {
        name: "Composite";
        className?: string;
        modelProperties?: {
            [propertyName: string]: Mapper;
        };
        additionalProperties?: Mapper;
        uberParent?: string;
        polymorphicDiscriminator?: PolymorphicDiscriminator;
    }


    /** Used to disambiguate discriminated type unions. */
    export interface PolymorphicDiscriminator {
        serializedName: string;
        clientName: string;
        [key: string]: string;
    }


    /** Helps build a mapper that describes how to parse a sequence of mapped values. */
    export interface SequenceMapperType {
        name: "Sequence";
        element: Mapper;
    }


    /** Helps build a mapper that describes how to parse a dictionary of mapped values. */
    export interface DictionaryMapperType {
        name: "Dictionary";
        value: Mapper;
    }


    /** Helps build a mapper that describes how to parse an enum value. */
    export interface EnumMapperType {
        name: "Enum";
        allowedValues: any[];
    }


    /** Description of various value constraints such as integer ranges and string regex. */
    export interface MapperConstraints {
        InclusiveMaximum?: number;
        ExclusiveMaximum?: number;
        InclusiveMinimum?: number;
        ExclusiveMinimum?: number;
        MaxLength?: number;
        MinLength?: number;
        Pattern?: RegExp;
        MaxItems?: number;
        MinItems?: number;
        UniqueItems?: true;
        MultipleOf?: number;
    }


    /** A mapper composed of other mappers. */
    export interface CompositeMapper extends BaseMapper {
        type: CompositeMapperType;
    }


    /** A mapper describing arrays. */
    export interface SequenceMapper extends BaseMapper {
        type: SequenceMapperType;
    }


    /** A mapper describing plain JavaScript objects used as key/value pairs. */
    export interface DictionaryMapper extends BaseMapper {
        type: DictionaryMapperType;
        headerCollectionPrefix?: string;
    }


    /** A mapper describing an enum value. */
    export interface EnumMapper extends BaseMapper {
        type: EnumMapperType;
    }


    /** A parameter for an operation that will be substituted into the operation's request URL. */
    export interface OperationURLParameter extends OperationParameter {
        skipEncoding?: boolean;
    }


    /** A parameter for an operation that will be added as a query parameter to the operation's HTTP */
    export interface OperationQueryParameter extends OperationParameter {
        skipEncoding?: boolean;
        collectionFormat?: QueryCollectionFormat;
    }


    /** An OperationResponse that can be returned from an operation request for a single status code. */
    export interface OperationResponseMap {
        headersMapper?: Mapper;
        bodyMapper?: Mapper;
        isError?: boolean;
    }


    /** A function to be called each time a response is received from the server */
    export type RawResponseCallback = (rawResponse: FullOperationResponse, flatResponse: unknown, error?: unknown) => void;


    /** Encodes how to reach a particular property on an object. */
    export type ParameterPath = string | string[] | {
        [propertyName: string]: ParameterPath;
    };


    /** Mappers are definitions of the data models used in the library. */
    export type Mapper = BaseMapper | CompositeMapper | SequenceMapper | DictionaryMapper | EnumMapper;


    /** Type of the mapper. Includes known mappers. */
    export type MapperType = SimpleMapperType | CompositeMapperType | SequenceMapperType | DictionaryMapperType | EnumMapperType;


    /** The format that will be used to join an array of values together for a query parameter value. */
    export type QueryCollectionFormat = "CSV" | "SSV" | "TSV" | "Pipes" | "Multi";


    /** A type alias for future proofing. */
    export type OperationRequest = PipelineRequest;


}

declare module "@azure/core-rest-pipeline" {

    import { AbortSignalLike } from "@azure/abort-controller";
    import { OperationTracingOptions } from "@azure/core-tracing";
    import { HttpMethods } from "@azure/core-util";
    import { Debugger } from "@azure/logger";

    /** Defines options that are used to configure the HTTP pipeline for */
    export interface PipelineOptions {
        retryOptions?: PipelineRetryOptions;
        proxyOptions?: ProxySettings;
        agent?: Agent;
        tlsOptions?: TlsSettings;
        redirectOptions?: RedirectPolicyOptions;
        userAgentOptions?: UserAgentPolicyOptions;
        telemetryOptions?: TelemetryOptions;
    }


    /** Options that control how to retry failed requests. */
    export interface PipelineRetryOptions {
        maxRetries?: number;
        retryDelayInMs?: number;
        maxRetryDelayInMs?: number;
    }


    /** Options to configure a proxy for outgoing requests (Node.js only). */
    export interface ProxySettings {
        host: string;
        port: number;
        username?: string;
        password?: string;
    }


    /** An interface compatible with NodeJS's `http.Agent`. */
    export interface Agent {
        maxFreeSockets: number;
        maxSockets: number;
        requests: unknown;
        sockets: unknown;
        destroy(): void;
    }


    /** Represents a certificate for TLS authentication. */
    export interface TlsSettings {
        ca?: string | Buffer | Array<string | Buffer> | undefined;
        cert?: string | Buffer | Array<string | Buffer> | undefined;
        key?: string | Buffer | Array<Buffer | KeyObject> | undefined;
        passphrase?: string | undefined;
        pfx?: string | Buffer | Array<string | Buffer | PxfObject> | undefined;
    }


    /** An interface compatible with NodeJS's `tls.KeyObject`. */
    export interface KeyObject {
        pem: string | Buffer;
        passphrase?: string | undefined;
    }


    /** An interface compatible with NodeJS's `tls.PxfObject`. */
    export interface PxfObject {
        buf: string | Buffer;
        passphrase?: string | undefined;
    }


    /** Options for how redirect responses are handled. */
    export interface RedirectPolicyOptions {
        maxRetries?: number;
        allowCrossOriginRedirects?: boolean;
    }


    /** Options for adding user agent details to outgoing requests. */
    export interface UserAgentPolicyOptions {
        userAgentPrefix?: string;
    }


    /** Defines options that are used to configure common telemetry and tracing info */
    export interface TelemetryOptions {
        clientRequestIdHeaderName?: string;
    }


    /** The required interface for a client that makes HTTP requests */
    export interface HttpClient {
        sendRequest: SendRequest;
    }


    /** Metadata about a request being made by the pipeline. */
    export interface PipelineRequest {
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
        abortSignal?: AbortSignalLike;
        tracingOptions?: OperationTracingOptions;
        allowInsecureConnection?: boolean;
        agent?: Agent;
        enableBrowserStreams?: boolean;
        tlsSettings?: TlsSettings;
        requestOverrides?: Record<string, unknown>;
        onUploadProgress(progress: TransferProgressEvent): void;
        onDownloadProgress(progress: TransferProgressEvent): void;
    }


    /** Represents a set of HTTP headers on a request/response. */
    export interface HttpHeaders extends Iterable<[string, string]> {
        get(name: string): string | undefined;
        has(name: string): boolean;
        set(name: string, value: string | number | boolean): void;
        delete(name: string): void;
        toJSON(options?: {
            preserveCase?: boolean;
        }): RawHttpHeaders;
    }


    /** A request body consisting of multiple parts. */
    export interface MultipartRequestBody {
        parts: BodyPart[];
        boundary?: string;
    }


    /** A part of the request body in a multipart request. */
    export interface BodyPart {
        headers: HttpHeaders;
        body: ((() => ReadableStream<Uint8Array>) | (() => NodeJS.ReadableStream)) | ReadableStream<Uint8Array> | NodeJS.ReadableStream | Uint8Array | Blob;
    }


    /** Metadata about a response received by the pipeline. */
    export interface PipelineResponse {
        request: PipelineRequest;
        status: number;
        headers: HttpHeaders;
        bodyAsText?: string | null;
        blobBody?: Promise<Blob>;
        browserStreamBody?: ReadableStream<Uint8Array>;
        readableStreamBody?: NodeJS.ReadableStream;
    }


    /** A pipeline policy manipulates a request as it travels through the pipeline. */
    export interface PipelinePolicy {
        name: string;
        sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse>;
    }


    /** Options to configure the logPolicy. */
    export interface LogPolicyOptions {
        additionalAllowedHeaderNames?: string[];
        additionalAllowedQueryParameters?: string[];
        logger?: Debugger;
    }


    /** Represents a pipeline for making a HTTP request to a URL. */
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


    /** Options when adding a policy to the pipeline. */
    export interface AddPolicyOptions {
        beforePolicies?: string[];
        afterPolicies?: string[];
        afterPhase?: PipelinePhase;
        phase?: PipelinePhase;
    }


    /** A simple interface for making a pipeline request and receiving a response. */
    export type SendRequest = (request: PipelineRequest) => Promise<PipelineResponse>;


    /** A HttpHeaders collection represented as a simple JSON object. */
    export type RawHttpHeaders = {
        [headerName: string]: string;
    };


    /** Types of bodies supported on the request. */
    export type RequestBodyType = NodeJS.ReadableStream | (() => NodeJS.ReadableStream) | ReadableStream<Uint8Array> | (() => ReadableStream<Uint8Array>) | Blob | ArrayBuffer | ArrayBufferView | FormData | string | null;


    /** A simple object that provides form data, as if from a browser form. */
    export type FormDataMap = {
        [key: string]: FormDataValue | FormDataValue[];
    };


    /** Each form data entry can be a string, Blob, or a File. If you wish to pass a file with a name but do not have */
    export type FormDataValue = string | Blob | File;


    /** Fired in response to upload or download progress. */
    export type TransferProgressEvent = {
        /**
         * The number of bytes loaded so far.
         */
        loadedBytes: number;
    };


    /** Policies are executed in phases. */
    export type PipelinePhase = "Deserialize" | "Serialize" | "Retry" | "Sign";


}

declare module "@azure/core-tracing" {

    import { TracingContext } from "@azure/core-auth";

    /** Tracing options to set on an operation. */
    export interface OperationTracingOptions {
        tracingContext?: TracingContext;
    }


}

declare module "@azure/core-util" {

    /** Supported HTTP methods to use when making requests. */
    export type HttpMethods = "GET" | "PUT" | "POST" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "TRACE";


}

declare module "@azure/logger" {

    /** A log function that can be dynamically enabled and redirected. */
    export interface Debugger {
        enabled: boolean;
        namespace: string;
        destroy(): boolean;
        log(args?: any[]): void;
        extend(namespace: string): Debugger;
    }


    /** Defines the methods available on the SDK-facing logger. */
    export interface AzureLogger {
        error: Debugger;
        warning: Debugger;
        info: Debugger;
        verbose: Debugger;
    }


    /** The log levels supported by the logger. */
    export type AzureLogLevel = "verbose" | "info" | "warning" | "error";


}

declare module "@azure/identity/workerd" {

    import { AbortSignalLike } from "@azure/abort-controller";
    import { TokenCredential, AccessToken, GetTokenOptions, TracingContext } from "@azure/core-auth";
    import { ServiceClient, CommonClientOptions, AdditionalPolicyConfig, ServiceClientOptions, OperationArguments, OperationOptions, OperationRequestOptions, SerializerOptions, XmlOptions, FullOperationResponse, OperationSpec, Serializer, OperationParameter, BaseMapper, SimpleMapperType, CompositeMapperType, PolymorphicDiscriminator, SequenceMapperType, DictionaryMapperType, EnumMapperType, MapperConstraints, CompositeMapper, SequenceMapper, DictionaryMapper, EnumMapper, OperationURLParameter, OperationQueryParameter, OperationResponseMap, RawResponseCallback, ParameterPath, Mapper, MapperType, QueryCollectionFormat, OperationRequest } from "@azure/core-client";
    import { PipelineOptions, PipelineRetryOptions, ProxySettings, Agent, TlsSettings, KeyObject, PxfObject, RedirectPolicyOptions, UserAgentPolicyOptions, TelemetryOptions, HttpClient, PipelineRequest, HttpHeaders, MultipartRequestBody, BodyPart, PipelineResponse, PipelinePolicy, LogPolicyOptions, Pipeline, AddPolicyOptions, SendRequest, RawHttpHeaders, RequestBodyType, FormDataMap, FormDataValue, TransferProgressEvent, PipelinePhase } from "@azure/core-rest-pipeline";
    import { OperationTracingOptions } from "@azure/core-tracing";
    import { HttpMethods } from "@azure/core-util";
    import { Debugger, AzureLogger, AzureLogLevel } from "@azure/logger";
    import { INetworkModule, NetworkRequestOptions, NetworkResponse } from "@azure/msal-node";

    /** Enables authentication to Microsoft Entra ID using an authorization code */
    export class AuthorizationCodeCredential implements TokenCredential {
        constructor(tenantId: string | "common", clientId: string, clientSecret: string, authorizationCode: string, redirectUri: string, options?: AuthorizationCodeCredentialOptions);
        constructor(tenantId: string | "common", clientId: string, authorizationCode: string, redirectUri: string, options?: AuthorizationCodeCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** This credential will use the currently logged-in user login information */
    export class AzureCliCredential implements TokenCredential {
        constructor(options?: AzureCliCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Azure Developer CLI is a command-line interface tool that allows developers to create, manage, and deploy */
    export class AzureDeveloperCliCredential implements TokenCredential {
        constructor(options?: AzureDeveloperCliCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** This credential is designed to be used in Azure Pipelines with service connections */
    export class AzurePipelinesCredential implements TokenCredential {
        constructor(tenantId: string, clientId: string, serviceConnectionId: string, systemAccessToken: string, options?: AzurePipelinesCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** This credential will use the currently logged-in user information from the */
    export class AzurePowerShellCredential implements TokenCredential {
        constructor(options?: AzurePowerShellCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Enables multiple `TokenCredential` implementations to be tried in order until */
    export class ChainedTokenCredential implements TokenCredential {
        constructor(sources?: TokenCredential[]);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Authenticates a service principal with a JWT assertion. */
    export class ClientAssertionCredential implements TokenCredential {
        constructor(tenantId: string, clientId: string, getAssertion: () => Promise<string>, options?: ClientAssertionCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Enables authentication to Microsoft Entra ID using a PEM-encoded */
    export class ClientCertificateCredential implements TokenCredential {
        constructor(tenantId: string, clientId: string, certificatePath: string, options?: ClientCertificateCredentialOptions);
        constructor(tenantId: string, clientId: string, configuration: ClientCertificatePEMCertificatePath, options?: ClientCertificateCredentialOptions);
        constructor(tenantId: string, clientId: string, configuration: ClientCertificatePEMCertificate, options?: ClientCertificateCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Enables authentication to Microsoft Entra ID using a client secret */
    export class ClientSecretCredential implements TokenCredential {
        constructor(tenantId: string, clientId: string, clientSecret: string, options?: ClientSecretCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Enables authentication to Microsoft Entra ID using a device code */
    export class DeviceCodeCredential implements TokenCredential {
        constructor(options?: DeviceCodeCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
        authenticate(scopes: string | string[], options?: GetTokenOptions): Promise<AuthenticationRecord | undefined>;
    }


    /** Enables authentication to Microsoft Entra ID using a client secret or certificate. */
    export class EnvironmentCredential implements TokenCredential {
        constructor(options?: EnvironmentCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Enables authentication to Microsoft Entra ID inside of the web browser */
    export class InteractiveBrowserCredential implements TokenCredential {
        constructor(options: InteractiveBrowserCredentialNodeOptions | InteractiveBrowserCredentialInBrowserOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
        authenticate(scopes: string | string[], options?: GetTokenOptions): Promise<AuthenticationRecord | undefined>;
    }


    /** Attempts authentication using a managed identity available at the deployment environment. */
    export class ManagedIdentityCredential implements TokenCredential {
        constructor(clientId: string, options?: TokenCredentialOptions);
        constructor(options?: ManagedIdentityCredentialClientIdOptions);
        constructor(options?: ManagedIdentityCredentialResourceIdOptions);
        constructor(options?: ManagedIdentityCredentialObjectIdOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Enables authentication to Microsoft Entra ID using the [On Behalf Of flow](https://learn.microsoft.com/entra/identity... */
    export class OnBehalfOfCredential implements TokenCredential {
        constructor(options: OnBehalfOfCredentialCertificateOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions);
        constructor(options: OnBehalfOfCredentialSecretOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions);
        constructor(options: OnBehalfOfCredentialAssertionOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** @deprecated UsernamePasswordCredential is deprecated. Use a more secure credential. See https://aka.ms/azsdk/identity/mfa for details. */
    /** Enables authentication to Microsoft Entra ID with a user's */
    export class UsernamePasswordCredential implements TokenCredential {
        constructor(tenantId: string, clientId: string, username: string, password: string, options?: UsernamePasswordCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Connects to Azure using the user account signed in through the Azure Resources extension in Visual Studio Code. */
    export class VisualStudioCodeCredential implements TokenCredential {
        constructor(options?: VisualStudioCodeCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** Workload Identity authentication is a feature in Azure that allows applications running on virtual machines (VMs) */
    export class WorkloadIdentityCredential implements TokenCredential {
        constructor(options?: WorkloadIdentityCredentialOptions);
        getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    }


    /** /** */
    export class AggregateAuthenticationError extends Error {
        errors: any[];
        constructor(errors: any[], errorMessage?: string);
    }


    /** Provides details about a failure to authenticate with Azure Active */
    export class AuthenticationError extends Error {
        readonly statusCode: number;
        readonly errorResponse: ErrorResponse;
        constructor(statusCode: number, errorBody: object | string | undefined | null, options?: {
            cause?: unknown;
        });
    }


    /** Error used to enforce authentication after trying to retrieve a token silently. */
    export class AuthenticationRequiredError extends Error {
        scopes: string[];
        getTokenOptions?: GetTokenOptions;
        constructor(options: AuthenticationRequiredErrorOptions);
    }


    /** This signifies that the credential that was tried in a chained credential */
    export class CredentialUnavailableError extends Error {
        constructor(message?: string, options?: {
            cause?: unknown;
        });
    }


    /** /** */
    export class DefaultAzureCredential extends ChainedTokenCredential {
        constructor(options?: DefaultAzureCredentialClientIdOptions);
        constructor(options?: DefaultAzureCredentialResourceIdOptions);
        constructor(options?: DefaultAzureCredentialOptions);
    }


    /** Provides options to configure how the Identity library */
    export interface AuthorityValidationOptions {
        disableInstanceDiscovery?: boolean;
    }


    /** /** */
    export interface AuthorizationCodeCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
    }


    /** /** */
    export interface AzureCliCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
        subscription?: string;
    }


    /** /** */
    export interface AzureDeveloperCliCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
    }


    /** /** */
    export interface AzurePipelinesCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    /** /** */
    export interface AzurePowerShellCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
    }


    /** Configuration options for InteractiveBrowserCredential */
    export interface BrokerAuthOptions {
        brokerOptions?: BrokerOptions;
    }


    /** Shared configuration options for browser customization */
    export interface BrowserCustomizationOptions {
        browserCustomizationOptions?: {
            /**
             * Format for error messages for display in browser
             */
            errorMessage?: string;
            /**
             * Format for success messages for display in browser
             */
            successMessage?: string;
        };
    }


    /** /** */
    export interface ClientAssertionCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    /** /** */
    export interface ClientCertificatePEMCertificate {
        certificate: string;
        certificatePassword?: string;
    }


    /** /** */
    export interface ClientCertificatePEMCertificatePath {
        certificatePath: string;
        certificatePassword?: string;
    }


    /** /** */
    export interface ClientCertificateCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
        sendCertificateChain?: boolean;
    }


    /** /** */
    export interface ClientSecretCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    /** Shared configuration options for credentials that support persistent token */
    export interface CredentialPersistenceOptions {
        tokenCachePersistenceOptions?: TokenCachePersistenceOptions;
    }


    /** /** */
    export interface DefaultAzureCredentialClientIdOptions extends DefaultAzureCredentialOptions {
        managedIdentityClientId?: string;
        workloadIdentityClientId?: string;
    }


    /** /** */
    export interface DefaultAzureCredentialResourceIdOptions extends DefaultAzureCredentialOptions {
        managedIdentityResourceId: string;
    }


    /** /** */
    export interface DefaultAzureCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
        requiredEnvVars?: DefaultAzureCredentialEnvVars | DefaultAzureCredentialEnvVars[];
    }


    /** Provides the user code and verification URI where the code must be */
    export interface DeviceCodeInfo {
        userCode: string;
        verificationUri: string;
        message: string;
    }


    /** Defines options for the InteractiveBrowserCredential class for Node.js. */
    export interface DeviceCodeCredentialOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions {
        tenantId?: string;
        clientId?: string;
        userPromptCallback?: DeviceCodePromptCallback;
    }


    /** Enables authentication to Microsoft Entra ID depending on the available environment variables. */
    export interface EnvironmentCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
    }


    /** Defines the common options for the InteractiveBrowserCredential class. */
    export interface InteractiveBrowserCredentialNodeOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions, BrowserCustomizationOptions, BrokerAuthOptions {
        redirectUri?: string | (() => string);
        tenantId?: string;
        clientId?: string;
        loginHint?: string;
    }


    /** Defines the common options for the InteractiveBrowserCredential class. */
    export interface InteractiveBrowserCredentialInBrowserOptions extends InteractiveCredentialOptions {
        redirectUri?: string | (() => string);
        tenantId?: string;
        clientId: string;
        loginStyle?: BrowserLoginStyle;
        loginHint?: string;
    }


    /** Common constructor options for the Identity credentials that requires user interaction. */
    export interface InteractiveCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        authenticationRecord?: AuthenticationRecord;
        disableAutomaticAuthentication?: boolean;
    }


    /** /** */
    export interface ManagedIdentityCredentialClientIdOptions extends TokenCredentialOptions {
        clientId?: string;
    }


    /** /** */
    export interface ManagedIdentityCredentialResourceIdOptions extends TokenCredentialOptions {
        resourceId: string;
    }


    /** /** */
    export interface ManagedIdentityCredentialObjectIdOptions extends TokenCredentialOptions {
        objectId: string;
    }


    /** Options for multi-tenant applications which allows for additionally allowed tenants. */
    export interface MultiTenantTokenCredentialOptions extends TokenCredentialOptions {
        additionallyAllowedTenants?: string[];
    }


    /** /** */
    export interface OnBehalfOfCredentialSecretOptions {
        tenantId: string;
        clientId: string;
        clientSecret: string;
        userAssertionToken: string;
    }


    /** /** */
    export interface OnBehalfOfCredentialCertificateOptions {
        tenantId: string;
        clientId: string;
        certificatePath: string;
        userAssertionToken: string;
        sendCertificateChain?: boolean;
    }


    /** /** */
    export interface OnBehalfOfCredentialAssertionOptions {
        tenantId: string;
        clientId: string;
        userAssertionToken: string;
        getAssertion(): Promise<string>;
    }


    /** @deprecated UsernamePasswordCredential is deprecated. Use a more secure credential. See https://aka.ms/azsdk/identity/mfa for details. */
    /** /** */
    export interface UsernamePasswordCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    /** Provides options to configure the Visual Studio Code credential. */
    export interface VisualStudioCodeCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
    }


    /** /** */
    export interface WorkloadIdentityCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        tenantId?: string;
        clientId?: string;
        tokenFilePath?: string;
        enableAzureProxy?: boolean;
    }


    /** See the official documentation for more details: */
    export interface ErrorResponse {
        error: string;
        errorDescription: string;
        errorCodes?: number[];
        timestamp?: string;
        traceId?: string;
        correlationId?: string;
    }


    /** /** */
    export interface AuthenticationRequiredErrorOptions {
        scopes: string[];
        getTokenOptions?: GetTokenOptions;
        message?: string;
        cause?: unknown;
    }


    /** Parameters when WAM broker authentication is disabled. */
    export interface BrokerDisabledOptions {
        enabled: false;
        legacyEnableMsaPassthrough?: undefined;
        parentWindowHandle: undefined;
    }


    /** Parameters when WAM broker authentication is enabled. */
    export interface BrokerEnabledOptions {
        enabled: true;
        legacyEnableMsaPassthrough?: boolean;
        parentWindowHandle: Uint8Array;
        useDefaultBrokerAccount?: boolean;
    }


    /** Parameters that enable token cache persistence in the Identity credentials. */
    export interface TokenCachePersistenceOptions {
        enabled: boolean;
        name?: string;
        unsafeAllowUnencryptedStorage?: boolean;
    }


    /** The record to use to find the cached tokens in the cache. */
    export interface AuthenticationRecord {
        authority: string;
        homeAccountId: string;
        clientId: string;
        tenantId: string;
        username: string;
    }


    /** Provides options to configure how the Identity library makes authentication */
    export interface TokenCredentialOptions extends CommonClientOptions {
        authorityHost?: string;
        loggingOptions?: LogPolicyOptions & {
            /**
             * Allows logging account information once the authentication flow succeeds.
             */
            allowLoggingAccountIdentifiers?: boolean;
            /**
             * Allows logging personally identifiable information for customer support.
             */
            enableUnsafeSupportLogging?: boolean;
        };
    }


    /** The options to configure the token provider. */
    export interface GetBearerTokenProviderOptions {
        abortSignal?: AbortSignal;
        tracingOptions?: {
            /**
             * Tracing Context for the current request to get a token.
             */
            tracingContext?: TracingContext;
        };
    }


    /** A list of known Azure authority hosts */
    export enum AzureAuthorityHosts {
        AzureChina, AzureGermany, AzureGovernment, AzurePublicCloud
    }


    /** /** */
    export type ClientCertificateCredentialPEMConfiguration = ClientCertificatePEMCertificate | ClientCertificatePEMCertificatePath;


    /** /** */
    export type DefaultAzureCredentialEnvVars = "AZURE_TOKEN_CREDENTIALS" | "AZURE_CLIENT_ID" | "AZURE_TENANT_ID" | "AZURE_CLIENT_SECRET" | "AZURE_CLIENT_CERTIFICATE_PATH" | "AZURE_CLIENT_CERTIFICATE_PASSWORD" | "AZURE_ADDITIONALLY_ALLOWED_TENANTS" | "AZURE_CLIENT_SEND_CERTIFICATE_CHAIN" | "AZURE_FEDERATED_TOKEN_FILE";


    /** Defines the signature of a callback which will be passed to */
    export type DeviceCodePromptCallback = (deviceCodeInfo: DeviceCodeInfo) => void;


    /** (Browser-only feature) */
    export type BrowserLoginStyle = "redirect" | "popup";


    /** /** */
    export type OnBehalfOfCredentialOptions = (OnBehalfOfCredentialSecretOptions | OnBehalfOfCredentialCertificateOptions | OnBehalfOfCredentialAssertionOptions) & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions & AuthorityValidationOptions;


    /** Parameters that enable WAM broker authentication in the InteractiveBrowserCredential. */
    export type BrokerOptions = BrokerEnabledOptions | BrokerDisabledOptions;


    /** The type of an Azure Identity plugin, a function accepting a plugin */
    export type IdentityPlugin = (context: unknown) => void;


    /** /** */
    export function getDefaultAzureCredential(): TokenCredential;


    /** Serializes an `AuthenticationRecord` into a string. */
    export function serializeAuthenticationRecord(record: AuthenticationRecord): string;


    /** Deserializes a previously serialized authentication record from a string into an object. */
    export function deserializeAuthenticationRecord(serializedRecord: string): AuthenticationRecord;


    /** Extend Azure Identity with additional functionality. Pass a plugin from */
    export function useIdentityPlugin(plugin: IdentityPlugin): void;


    /** Returns a callback that provides a bearer token. */
    export function getBearerTokenProvider(credential: TokenCredential, scopes: string | string[], options?: GetBearerTokenProviderOptions): () => Promise<string>;


}

