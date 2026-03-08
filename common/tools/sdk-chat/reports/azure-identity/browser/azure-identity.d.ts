/// <reference types="node" />
/// <reference lib="es2020" />
// @azure/identity - Public API Surface
// Graphed by PublicApiGraphEngine.TypeScript

export declare class AuthorizationCodeCredential implements TokenCredential {
    constructor(tenantId: string | "common", clientId: string, clientSecret: string, authorizationCode: string, redirectUri: string, options?: AuthorizationCodeCredentialOptions);
    constructor(tenantId: string | "common", clientId: string, authorizationCode: string, redirectUri: string, options?: AuthorizationCodeCredentialOptions);
    getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
}

/** /** */
export declare interface AuthorizationCodeCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
}

/** Options for multi-tenant applications which allows for additionally allowed tenants. */
export declare interface MultiTenantTokenCredentialOptions extends TokenCredentialOptions {
    additionallyAllowedTenants?: string[];
}

/** Provides options to configure how the Identity library */
export declare interface AuthorityValidationOptions {
    disableInstanceDiscovery?: boolean;
}

/** This credential will use the currently logged-in user login information */
export declare class AzureCliCredential implements TokenCredential {
    constructor(_options?: AzureCliCredentialOptions);
    getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
}

/** /** */
export declare interface AzureCliCredentialOptions extends MultiTenantTokenCredentialOptions {
    tenantId?: string;
    processTimeoutInMs?: number;
    subscription?: string;
}

/** This credential will use the currently logged-in user login information */
export declare class AzureDeveloperCliCredential implements TokenCredential {
    constructor(_options?: AzureDeveloperCliCredentialOptions);
    getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
}

/** /** */
export declare interface AzureDeveloperCliCredentialOptions extends MultiTenantTokenCredentialOptions {
    tenantId?: string;
    processTimeoutInMs?: number;
}

/** Enables authentication to Microsoft Entra ID using a PEM-encoded */
export declare class AzurePipelinesCredential implements TokenCredential {
    constructor(_tenantId: string, _clientId: string, _serviceConnectionId: string, _systemAccessToken: string, _options?: AzurePipelinesCredentialOptions);
    getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
}

/** /** */
export declare interface AzurePipelinesCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
}

/** Shared configuration options for credentials that support persistent token */
export declare interface CredentialPersistenceOptions {
    tokenCachePersistenceOptions?: TokenCachePersistenceOptions;
}

/** Parameters that enable token cache persistence in the Identity credentials. */
export declare interface TokenCachePersistenceOptions {
    enabled: boolean;
    name?: string;
    unsafeAllowUnencryptedStorage?: boolean;
}

/** This credential will use the currently-logged-in user's login information via the Azure Power Shell command line tool. */
export declare class AzurePowerShellCredential implements TokenCredential {
    constructor(_options?: AzurePowerShellCredentialOptions);
    getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
}

/** /** */
export declare interface AzurePowerShellCredentialOptions extends MultiTenantTokenCredentialOptions {
    tenantId?: string;
    processTimeoutInMs?: number;
}

/** Enables multiple `TokenCredential` implementations to be tried in order until */
export declare class ChainedTokenCredential implements TokenCredential {
    constructor(sources?: TokenCredential[]);
    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
}

/** Authenticates a service principal with a JWT assertion. */
export declare class ClientAssertionCredential implements TokenCredential {
    constructor(_tenantId: string, _clientId: string, _getAssertion: () => Promise<string>, _options?: ClientAssertionCredentialOptions);
    getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
}

/** /** */
export declare interface ClientAssertionCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
}

/** Enables authentication to Microsoft Entra ID using a PEM-encoded */
export declare class ClientCertificateCredential implements TokenCredential {
    constructor(_tenantId: string, _clientId: string, _certificatePathOrConfiguration: string | ClientCertificateCredentialPEMConfiguration, _options?: ClientCertificateCredentialOptions);
    getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
}

/** /** */
export declare interface ClientCertificatePEMCertificate {
    certificate: string;
    certificatePassword?: string;
}

/** /** */
export declare interface ClientCertificatePEMCertificatePath {
    certificatePath: string;
    certificatePassword?: string;
}

/** /** */
export declare type ClientCertificateCredentialPEMConfiguration = ClientCertificatePEMCertificate | ClientCertificatePEMCertificatePath;

/** /** */
export declare interface ClientCertificateCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    sendCertificateChain?: boolean;
}

/** Enables authentication to Microsoft Entra ID using a client secret */
export declare class ClientSecretCredential implements TokenCredential {
    constructor(tenantId: string, clientId: string, clientSecret: string, options?: ClientSecretCredentialOptions);
    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
}

/** /** */
export declare interface ClientSecretCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
}

/** /** */
export declare class DefaultAzureCredential extends ChainedTokenCredential {
    constructor(_tokenCredentialOptions?: TokenCredentialOptions);
    getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken>;
}

/** Provides options to configure how the Identity library makes authentication */
export declare interface TokenCredentialOptions extends CommonClientOptions {
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

/** /** */
export declare interface DefaultAzureCredentialClientIdOptions extends DefaultAzureCredentialOptions {
    managedIdentityClientId?: string;
    workloadIdentityClientId?: string;
}

/** /** */
export declare interface DefaultAzureCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
    tenantId?: string;
    processTimeoutInMs?: number;
    requiredEnvVars?: DefaultAzureCredentialEnvVars | DefaultAzureCredentialEnvVars[];
}

/** /** */
export declare type DefaultAzureCredentialEnvVars = "AZURE_TOKEN_CREDENTIALS" | "AZURE_CLIENT_ID" | "AZURE_TENANT_ID" | "AZURE_CLIENT_SECRET" | "AZURE_CLIENT_CERTIFICATE_PATH" | "AZURE_CLIENT_CERTIFICATE_PASSWORD" | "AZURE_ADDITIONALLY_ALLOWED_TENANTS" | "AZURE_CLIENT_SEND_CERTIFICATE_CHAIN" | "AZURE_FEDERATED_TOKEN_FILE";

/** /** */
export declare interface DefaultAzureCredentialResourceIdOptions extends DefaultAzureCredentialOptions {
    managedIdentityResourceId: string;
}

/** Enables authentication to Microsoft Entra ID using a device code */
export declare class DeviceCodeCredential implements TokenCredential {
    constructor(_options?: DeviceCodeCredentialOptions);
    getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
}

/** Defines options for the InteractiveBrowserCredential class for Node.js. */
export declare interface DeviceCodeCredentialOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions {
    tenantId?: string;
    clientId?: string;
    userPromptCallback?: DeviceCodePromptCallback;
}

/** Common constructor options for the Identity credentials that requires user interaction. */
export declare interface InteractiveCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
    authenticationRecord?: AuthenticationRecord;
    disableAutomaticAuthentication?: boolean;
}

/** The record to use to find the cached tokens in the cache. */
export declare interface AuthenticationRecord {
    authority: string;
    homeAccountId: string;
    clientId: string;
    tenantId: string;
    username: string;
}

/** Defines the signature of a callback which will be passed to */
export declare type DeviceCodePromptCallback = (deviceCodeInfo: DeviceCodeInfo) => void;

/** Provides the user code and verification URI where the code must be */
export declare interface DeviceCodeInfo {
    userCode: string;
    verificationUri: string;
    message: string;
}

/** Enables authentication to Microsoft Entra ID using client secret */
export declare class EnvironmentCredential implements TokenCredential {
    constructor(_options?: EnvironmentCredentialOptions);
    getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
}

/** Enables authentication to Microsoft Entra ID depending on the available environment variables. */
export declare interface EnvironmentCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
}

/** Enables authentication to Microsoft Entra ID inside of the web browser */
export declare class InteractiveBrowserCredential implements TokenCredential {
    constructor(options: InteractiveBrowserCredentialInBrowserOptions | InteractiveBrowserCredentialNodeOptions);
    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
    authenticate(scopes: string | string[], options?: GetTokenOptions): Promise<AuthenticationRecord | undefined>;
}

/** Defines the common options for the InteractiveBrowserCredential class. */
export declare interface InteractiveBrowserCredentialInBrowserOptions extends InteractiveCredentialOptions {
    redirectUri?: string | (() => string);
    tenantId?: string;
    clientId: string;
    loginStyle?: BrowserLoginStyle;
    loginHint?: string;
}

/** (Browser-only feature) */
export declare type BrowserLoginStyle = "redirect" | "popup";

/** Defines the common options for the InteractiveBrowserCredential class. */
export declare interface InteractiveBrowserCredentialNodeOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions, BrowserCustomizationOptions, BrokerAuthOptions {
    redirectUri?: string | (() => string);
    tenantId?: string;
    clientId?: string;
    loginHint?: string;
}

/** Shared configuration options for browser customization */
export declare interface BrowserCustomizationOptions {
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

/** Configuration options for InteractiveBrowserCredential */
export declare interface BrokerAuthOptions {
    brokerOptions?: BrokerOptions;
}

export declare class ManagedIdentityCredential implements TokenCredential {
    constructor(clientId: string, options?: TokenCredentialOptions);
    constructor(options?: ManagedIdentityCredentialClientIdOptions);
    constructor(options?: ManagedIdentityCredentialResourceIdOptions);
    constructor(options?: ManagedIdentityCredentialObjectIdOptions);
    getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
}

/** /** */
export declare interface ManagedIdentityCredentialClientIdOptions extends TokenCredentialOptions {
    clientId?: string;
}

/** /** */
export declare interface ManagedIdentityCredentialResourceIdOptions extends TokenCredentialOptions {
    resourceId: string;
}

/** /** */
export declare interface ManagedIdentityCredentialObjectIdOptions extends TokenCredentialOptions {
    objectId: string;
}

/** Enables authentication to Microsoft Entra ID using the [On Behalf Of flow](https://learn.microsoft.com/entra/identity... */
export declare class OnBehalfOfCredential implements TokenCredential {
    constructor(_options: OnBehalfOfCredentialOptions);
    getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
}

/** /** */
export declare type OnBehalfOfCredentialOptions = (OnBehalfOfCredentialSecretOptions | OnBehalfOfCredentialCertificateOptions | OnBehalfOfCredentialAssertionOptions) & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions & AuthorityValidationOptions;

/** /** */
export declare interface OnBehalfOfCredentialSecretOptions {
    tenantId: string;
    clientId: string;
    clientSecret: string;
    userAssertionToken: string;
}

/** /** */
export declare interface OnBehalfOfCredentialCertificateOptions {
    tenantId: string;
    clientId: string;
    certificatePath: string;
    userAssertionToken: string;
    sendCertificateChain?: boolean;
}

/** /** */
export declare interface OnBehalfOfCredentialAssertionOptions {
    tenantId: string;
    clientId: string;
    userAssertionToken: string;
    getAssertion(): Promise<string>;
}

/** @deprecated UsernamePasswordCredential is deprecated. Use a more secure credential. See https://aka.ms/azsdk/identity/mfa for details. */
/** Enables authentication to Microsoft Entra ID with a user's */
export declare class UsernamePasswordCredential implements TokenCredential {
    constructor(tenantIdOrName: string, clientId: string, username: string, password: string, options?: UsernamePasswordCredentialOptions);
    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
}

/** @deprecated UsernamePasswordCredential is deprecated. Use a more secure credential. See https://aka.ms/azsdk/identity/mfa for details. */
/** /** */
export declare interface UsernamePasswordCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
}

/** @deprecated This credential is deprecated because the VS Code Azure Account extension on which this credential
relies has been deprecated. Users should use other dev-time credentials, such as {@link AzureCliCredential},
{@link AzureDeveloperCliCredential}, or {@link AzurePowerShellCredential} for their
local development needs. See Azure account extension deprecation notice [here](https://github.com/microsoft/vscode-azure-account/issues/964). */
/** Connects to Azure using the credential provided by the VSCode extension 'Azure Account'. */
export declare class VisualStudioCodeCredential implements TokenCredential {
    constructor(_options?: VisualStudioCodeCredentialOptions);
    getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
}

/** Provides options to configure the Visual Studio Code credential. */
export declare interface VisualStudioCodeCredentialOptions extends MultiTenantTokenCredentialOptions {
    tenantId?: string;
}

/** WorkloadIdentityCredential supports Microsoft Entra Workload ID authentication on Kubernetes. */
export declare class WorkloadIdentityCredential implements TokenCredential {
    constructor(_options?: WorkloadIdentityCredentialOptions);
    getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null>;
}

/** /** */
export declare interface WorkloadIdentityCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
    tenantId?: string;
    clientId?: string;
    tokenFilePath?: string;
    enableAzureProxy?: boolean;
}

/** /** */
export declare class AggregateAuthenticationError extends Error {
    errors: any[];
    constructor(errors: any[], errorMessage?: string);
}

/** Provides details about a failure to authenticate with Azure Active */
export declare class AuthenticationError extends Error {
    readonly statusCode: number;
    readonly errorResponse: ErrorResponse;
    constructor(statusCode: number, errorBody: object | string | undefined | null, options?: {
        cause?: unknown;
    });
}

/** See the official documentation for more details: */
export declare interface ErrorResponse {
    error: string;
    errorDescription: string;
    errorCodes?: number[];
    timestamp?: string;
    traceId?: string;
    correlationId?: string;
}

/** Error used to enforce authentication after trying to retrieve a token silently. */
export declare class AuthenticationRequiredError extends Error {
    scopes: string[];
    getTokenOptions?: GetTokenOptions;
    constructor(options: AuthenticationRequiredErrorOptions);
}

/** /** */
export declare interface AuthenticationRequiredErrorOptions {
    scopes: string[];
    getTokenOptions?: GetTokenOptions;
    message?: string;
    cause?: unknown;
}

/** This signifies that the credential that was tried in a chained credential */
export declare class CredentialUnavailableError extends Error {
    constructor(message?: string, options?: {
        cause?: unknown;
    });
}

/** Parameters when WAM broker authentication is disabled. */
export declare interface BrokerDisabledOptions {
    enabled: false;
    legacyEnableMsaPassthrough?: undefined;
    parentWindowHandle: undefined;
}

/** Parameters when WAM broker authentication is enabled. */
export declare interface BrokerEnabledOptions {
    enabled: true;
    legacyEnableMsaPassthrough?: boolean;
    parentWindowHandle: Uint8Array;
    useDefaultBrokerAccount?: boolean;
}

/** The options to configure the token provider. */
export declare interface GetBearerTokenProviderOptions {
    abortSignal?: AbortSignal;
    tracingOptions?: {
        /**
         * Tracing Context for the current request to get a token.
         */
        tracingContext?: TracingContext;
    };
}

/** A list of known Azure authority hosts */
export declare enum AzureAuthorityHosts {
    AzureChina, AzureGermany, AzureGovernment, AzurePublicCloud
}


// ============================================================================
// Dependencies
// ============================================================================

declare module "@azure/abort-controller" {

    /** Allows the request to be aborted upon firing of the "abort" event. */
    export interface AbortSignalLike {
        readonly aborted: boolean;
        addEventListener(type: "abort", listener: (this: AbortSignalLike, ev: any) => any, options?: any): void;
        removeEventListener(type: "abort", listener: (this: AbortSignalLike, ev: any) => any, options?: any): void;
    }


}

declare module "@azure/core-auth" {

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


    /** An immutable context bag of tracing values for the current operation. */
    export interface TracingContext {
        setValue(key: symbol, value: unknown): TracingContext;
        getValue(key: symbol): unknown;
        deleteValue(key: symbol): TracingContext;
    }


}

declare module "@azure/core-client" {

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


}

declare module "@azure/core-rest-pipeline" {

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


}

declare module "@azure/core-tracing" {

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


}
