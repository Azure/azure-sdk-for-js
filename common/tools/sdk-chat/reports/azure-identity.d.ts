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


    /** An immutable context bag of tracing values for the current operation. */
    export interface TracingContext {
        setValue(key: symbol, value: unknown): TracingContext;
        getValue(key: symbol): unknown;
        deleteValue(key: symbol): TracingContext;
    }


}

declare module "@azure/core-client/browser" {

    import { PipelineOptions, HttpClient, PipelinePolicy } from "@azure/core-rest-pipeline/browser";

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


}

declare module "@azure/identity/browser" {

    import { AbortSignalLike } from "@azure/abort-controller/browser";
    import { TokenCredential, AccessToken, GetTokenOptions, TracingContext } from "@azure/core-auth/browser";
    import { CommonClientOptions, AdditionalPolicyConfig } from "@azure/core-client/browser";
    import { PipelineOptions, PipelineRetryOptions, ProxySettings, Agent, TlsSettings, KeyObject, PxfObject, RedirectPolicyOptions, UserAgentPolicyOptions, TelemetryOptions, HttpClient, PipelineRequest, HttpHeaders, MultipartRequestBody, BodyPart, PipelineResponse, PipelinePolicy, LogPolicyOptions, SendRequest, RawHttpHeaders, RequestBodyType, FormDataMap, FormDataValue, TransferProgressEvent } from "@azure/core-rest-pipeline/browser";
    import { OperationTracingOptions } from "@azure/core-tracing/browser";
    import { HttpMethods } from "@azure/core-util/browser";
    import { Debugger } from "@azure/logger/browser";

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


    // Reachable via: DefaultAzureCredential → ChainedTokenCredential
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


    // Reachable via: AuthorizationCodeCredential → AuthorityValidationOptions
    // Reachable via: AuthorizationCodeCredentialOptions → AuthorityValidationOptions
    // Reachable via: AzurePipelinesCredentialOptions → AuthorityValidationOptions
    // Reachable via: ClientAssertionCredentialOptions → AuthorityValidationOptions
    // Reachable via: ClientCertificateCredentialOptions → AuthorityValidationOptions
    // Reachable via: ClientSecretCredentialOptions → AuthorityValidationOptions
    // Reachable via: DefaultAzureCredentialOptions → AuthorityValidationOptions
    // Reachable via: EnvironmentCredentialOptions → AuthorityValidationOptions
    // Reachable via: InteractiveCredentialOptions → AuthorityValidationOptions
    // Reachable via: OnBehalfOfCredentialOptions → AuthorityValidationOptions
    // Reachable via: UsernamePasswordCredentialOptions → AuthorityValidationOptions
    // Reachable via: WorkloadIdentityCredentialOptions → AuthorityValidationOptions
    /** Provides options to configure how the Identity library */
    export interface AuthorityValidationOptions {
        disableInstanceDiscovery?: boolean;
    }


    // Reachable via: AuthorizationCodeCredential → AuthorizationCodeCredentialOptions
    /** /** */
    export interface AuthorizationCodeCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
    }


    // Reachable via: AzureCliCredential → AzureCliCredentialOptions
    /** /** */
    export interface AzureCliCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
        subscription?: string;
    }


    // Reachable via: AzureDeveloperCliCredential → AzureDeveloperCliCredentialOptions
    /** /** */
    export interface AzureDeveloperCliCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
    }


    // Reachable via: AzurePipelinesCredential → AzurePipelinesCredentialOptions
    /** /** */
    export interface AzurePipelinesCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    // Reachable via: AzurePowerShellCredential → AzurePowerShellCredentialOptions
    /** /** */
    export interface AzurePowerShellCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
    }


    // Reachable via: InteractiveBrowserCredential → BrokerAuthOptions
    // Reachable via: InteractiveBrowserCredentialNodeOptions → BrokerAuthOptions
    /** Configuration options for InteractiveBrowserCredential */
    export interface BrokerAuthOptions {
        brokerOptions?: BrokerOptions;
    }


    // Reachable via: InteractiveBrowserCredential → BrowserCustomizationOptions
    // Reachable via: InteractiveBrowserCredentialNodeOptions → BrowserCustomizationOptions
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


    // Reachable via: ClientAssertionCredential → ClientAssertionCredentialOptions
    /** /** */
    export interface ClientAssertionCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    // Reachable via: ClientCertificateCredential → ClientCertificatePEMCertificate
    // Reachable via: ClientCertificateCredentialPEMConfiguration → ClientCertificatePEMCertificate
    /** /** */
    export interface ClientCertificatePEMCertificate {
        certificate: string;
        certificatePassword?: string;
    }


    // Reachable via: ClientCertificateCredential → ClientCertificatePEMCertificatePath
    // Reachable via: ClientCertificateCredentialPEMConfiguration → ClientCertificatePEMCertificatePath
    /** /** */
    export interface ClientCertificatePEMCertificatePath {
        certificatePath: string;
        certificatePassword?: string;
    }


    // Reachable via: ClientCertificateCredential → ClientCertificateCredentialOptions
    /** /** */
    export interface ClientCertificateCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
        sendCertificateChain?: boolean;
    }


    // Reachable via: ClientSecretCredential → ClientSecretCredentialOptions
    /** /** */
    export interface ClientSecretCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    // Reachable via: AzurePipelinesCredential → CredentialPersistenceOptions
    // Reachable via: AzurePipelinesCredentialOptions → CredentialPersistenceOptions
    // Reachable via: ClientAssertionCredentialOptions → CredentialPersistenceOptions
    // Reachable via: ClientCertificateCredentialOptions → CredentialPersistenceOptions
    // Reachable via: ClientSecretCredentialOptions → CredentialPersistenceOptions
    // Reachable via: DeviceCodeCredentialOptions → CredentialPersistenceOptions
    // Reachable via: InteractiveBrowserCredentialNodeOptions → CredentialPersistenceOptions
    // Reachable via: OnBehalfOfCredential → CredentialPersistenceOptions
    // Reachable via: OnBehalfOfCredentialOptions → CredentialPersistenceOptions
    // Reachable via: UsernamePasswordCredentialOptions → CredentialPersistenceOptions
    /** Shared configuration options for credentials that support persistent token */
    export interface CredentialPersistenceOptions {
        tokenCachePersistenceOptions?: TokenCachePersistenceOptions;
    }


    // Reachable via: DefaultAzureCredential → DefaultAzureCredentialClientIdOptions
    /** /** */
    export interface DefaultAzureCredentialClientIdOptions extends DefaultAzureCredentialOptions {
        managedIdentityClientId?: string;
        workloadIdentityClientId?: string;
    }


    // Reachable via: DefaultAzureCredential → DefaultAzureCredentialResourceIdOptions
    /** /** */
    export interface DefaultAzureCredentialResourceIdOptions extends DefaultAzureCredentialOptions {
        managedIdentityResourceId: string;
    }


    // Reachable via: DefaultAzureCredential → DefaultAzureCredentialOptions
    // Reachable via: DefaultAzureCredentialClientIdOptions → DefaultAzureCredentialOptions
    // Reachable via: DefaultAzureCredentialResourceIdOptions → DefaultAzureCredentialOptions
    /** /** */
    export interface DefaultAzureCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
        requiredEnvVars?: DefaultAzureCredentialEnvVars | DefaultAzureCredentialEnvVars[];
    }


    // Reachable via: DeviceCodeCredential → DeviceCodeInfo
    // Reachable via: DeviceCodePromptCallback → DeviceCodeInfo
    /** Provides the user code and verification URI where the code must be */
    export interface DeviceCodeInfo {
        userCode: string;
        verificationUri: string;
        message: string;
    }


    // Reachable via: DeviceCodeCredential → DeviceCodeCredentialOptions
    /** Defines options for the InteractiveBrowserCredential class for Node.js. */
    export interface DeviceCodeCredentialOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions {
        tenantId?: string;
        clientId?: string;
        userPromptCallback?: DeviceCodePromptCallback;
    }


    // Reachable via: EnvironmentCredential → EnvironmentCredentialOptions
    /** Enables authentication to Microsoft Entra ID depending on the available environment variables. */
    export interface EnvironmentCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
    }


    // Reachable via: InteractiveBrowserCredential → InteractiveBrowserCredentialNodeOptions
    /** Defines the common options for the InteractiveBrowserCredential class. */
    export interface InteractiveBrowserCredentialNodeOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions, BrowserCustomizationOptions, BrokerAuthOptions {
        redirectUri?: string | (() => string);
        tenantId?: string;
        clientId?: string;
        loginHint?: string;
    }


    // Reachable via: InteractiveBrowserCredential → InteractiveBrowserCredentialInBrowserOptions
    /** Defines the common options for the InteractiveBrowserCredential class. */
    export interface InteractiveBrowserCredentialInBrowserOptions extends InteractiveCredentialOptions {
        redirectUri?: string | (() => string);
        tenantId?: string;
        clientId: string;
        loginStyle?: BrowserLoginStyle;
        loginHint?: string;
    }


    // Reachable via: DeviceCodeCredential → InteractiveCredentialOptions
    // Reachable via: DeviceCodeCredentialOptions → InteractiveCredentialOptions
    // Reachable via: InteractiveBrowserCredentialInBrowserOptions → InteractiveCredentialOptions
    // Reachable via: InteractiveBrowserCredentialNodeOptions → InteractiveCredentialOptions
    /** Common constructor options for the Identity credentials that requires user interaction. */
    export interface InteractiveCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        authenticationRecord?: AuthenticationRecord;
        disableAutomaticAuthentication?: boolean;
    }


    // Reachable via: ManagedIdentityCredential → ManagedIdentityCredentialClientIdOptions
    /** /** */
    export interface ManagedIdentityCredentialClientIdOptions extends TokenCredentialOptions {
        clientId?: string;
    }


    // Reachable via: ManagedIdentityCredential → ManagedIdentityCredentialResourceIdOptions
    /** /** */
    export interface ManagedIdentityCredentialResourceIdOptions extends TokenCredentialOptions {
        resourceId: string;
    }


    // Reachable via: ManagedIdentityCredential → ManagedIdentityCredentialObjectIdOptions
    /** /** */
    export interface ManagedIdentityCredentialObjectIdOptions extends TokenCredentialOptions {
        objectId: string;
    }


    // Reachable via: AuthorizationCodeCredential → MultiTenantTokenCredentialOptions
    // Reachable via: AuthorizationCodeCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: AzureCliCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: AzureDeveloperCliCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: AzurePipelinesCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: AzurePowerShellCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: ClientAssertionCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: ClientCertificateCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: ClientSecretCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: DefaultAzureCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: EnvironmentCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: InteractiveCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: OnBehalfOfCredential → MultiTenantTokenCredentialOptions
    // Reachable via: OnBehalfOfCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: UsernamePasswordCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: VisualStudioCodeCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: WorkloadIdentityCredentialOptions → MultiTenantTokenCredentialOptions
    /** Options for multi-tenant applications which allows for additionally allowed tenants. */
    export interface MultiTenantTokenCredentialOptions extends TokenCredentialOptions {
        additionallyAllowedTenants?: string[];
    }


    // Reachable via: OnBehalfOfCredential → OnBehalfOfCredentialSecretOptions
    // Reachable via: OnBehalfOfCredentialOptions → OnBehalfOfCredentialSecretOptions
    /** /** */
    export interface OnBehalfOfCredentialSecretOptions {
        tenantId: string;
        clientId: string;
        clientSecret: string;
        userAssertionToken: string;
    }


    // Reachable via: OnBehalfOfCredential → OnBehalfOfCredentialCertificateOptions
    // Reachable via: OnBehalfOfCredentialOptions → OnBehalfOfCredentialCertificateOptions
    /** /** */
    export interface OnBehalfOfCredentialCertificateOptions {
        tenantId: string;
        clientId: string;
        certificatePath: string;
        userAssertionToken: string;
        sendCertificateChain?: boolean;
    }


    // Reachable via: OnBehalfOfCredential → OnBehalfOfCredentialAssertionOptions
    // Reachable via: OnBehalfOfCredentialOptions → OnBehalfOfCredentialAssertionOptions
    /** /** */
    export interface OnBehalfOfCredentialAssertionOptions {
        tenantId: string;
        clientId: string;
        userAssertionToken: string;
        getAssertion(): Promise<string>;
    }


    // Reachable via: UsernamePasswordCredential → UsernamePasswordCredentialOptions
    /** @deprecated UsernamePasswordCredential is deprecated. Use a more secure credential. See https://aka.ms/azsdk/identity/mfa for details. */
    /** /** */
    export interface UsernamePasswordCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    // Reachable via: VisualStudioCodeCredential → VisualStudioCodeCredentialOptions
    /** Provides options to configure the Visual Studio Code credential. */
    export interface VisualStudioCodeCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
    }


    // Reachable via: WorkloadIdentityCredential → WorkloadIdentityCredentialOptions
    /** /** */
    export interface WorkloadIdentityCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        tenantId?: string;
        clientId?: string;
        tokenFilePath?: string;
        enableAzureProxy?: boolean;
    }


    // Reachable via: AuthenticationError → ErrorResponse
    /** See the official documentation for more details: */
    export interface ErrorResponse {
        error: string;
        errorDescription: string;
        errorCodes?: number[];
        timestamp?: string;
        traceId?: string;
        correlationId?: string;
    }


    // Reachable via: AuthenticationRequiredError → AuthenticationRequiredErrorOptions
    /** /** */
    export interface AuthenticationRequiredErrorOptions {
        scopes: string[];
        getTokenOptions?: GetTokenOptions;
        message?: string;
        cause?: unknown;
    }


    // Reachable via: BrokerAuthOptions → BrokerDisabledOptions
    // Reachable via: BrokerOptions → BrokerDisabledOptions
    /** Parameters when WAM broker authentication is disabled. */
    export interface BrokerDisabledOptions {
        enabled: false;
        legacyEnableMsaPassthrough?: undefined;
        parentWindowHandle: undefined;
    }


    // Reachable via: BrokerAuthOptions → BrokerEnabledOptions
    // Reachable via: BrokerOptions → BrokerEnabledOptions
    /** Parameters when WAM broker authentication is enabled. */
    export interface BrokerEnabledOptions {
        enabled: true;
        legacyEnableMsaPassthrough?: boolean;
        parentWindowHandle: Uint8Array;
        useDefaultBrokerAccount?: boolean;
    }


    // Reachable via: AzurePipelinesCredential → TokenCachePersistenceOptions
    // Reachable via: CredentialPersistenceOptions → TokenCachePersistenceOptions
    /** Parameters that enable token cache persistence in the Identity credentials. */
    export interface TokenCachePersistenceOptions {
        enabled: boolean;
        name?: string;
        unsafeAllowUnencryptedStorage?: boolean;
    }


    // Reachable via: DeviceCodeCredential → AuthenticationRecord
    // Reachable via: InteractiveBrowserCredential → AuthenticationRecord
    // Reachable via: InteractiveCredentialOptions → AuthenticationRecord
    /** The record to use to find the cached tokens in the cache. */
    export interface AuthenticationRecord {
        authority: string;
        homeAccountId: string;
        clientId: string;
        tenantId: string;
        username: string;
    }


    // Reachable via: DefaultAzureCredential → TokenCredentialOptions
    // Reachable via: ManagedIdentityCredential → TokenCredentialOptions
    // Reachable via: ManagedIdentityCredentialClientIdOptions → TokenCredentialOptions
    // Reachable via: ManagedIdentityCredentialObjectIdOptions → TokenCredentialOptions
    // Reachable via: ManagedIdentityCredentialResourceIdOptions → TokenCredentialOptions
    // Reachable via: MultiTenantTokenCredentialOptions → TokenCredentialOptions
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


    // Reachable via: ClientCertificateCredential → ClientCertificateCredentialPEMConfiguration
    /** /** */
    export type ClientCertificateCredentialPEMConfiguration = ClientCertificatePEMCertificate | ClientCertificatePEMCertificatePath;


    // Reachable via: DefaultAzureCredential → DefaultAzureCredentialEnvVars
    // Reachable via: DefaultAzureCredentialClientIdOptions → DefaultAzureCredentialEnvVars
    // Reachable via: DefaultAzureCredentialOptions → DefaultAzureCredentialEnvVars
    /** /** */
    export type DefaultAzureCredentialEnvVars = "AZURE_TOKEN_CREDENTIALS" | "AZURE_CLIENT_ID" | "AZURE_TENANT_ID" | "AZURE_CLIENT_SECRET" | "AZURE_CLIENT_CERTIFICATE_PATH" | "AZURE_CLIENT_CERTIFICATE_PASSWORD" | "AZURE_ADDITIONALLY_ALLOWED_TENANTS" | "AZURE_CLIENT_SEND_CERTIFICATE_CHAIN" | "AZURE_FEDERATED_TOKEN_FILE";


    // Reachable via: DeviceCodeCredential → DeviceCodePromptCallback
    // Reachable via: DeviceCodeCredentialOptions → DeviceCodePromptCallback
    /** Defines the signature of a callback which will be passed to */
    export type DeviceCodePromptCallback = (deviceCodeInfo: DeviceCodeInfo) => void;


    // Reachable via: InteractiveBrowserCredential → BrowserLoginStyle
    // Reachable via: InteractiveBrowserCredentialInBrowserOptions → BrowserLoginStyle
    /** (Browser-only feature) */
    export type BrowserLoginStyle = "redirect" | "popup";


    // Reachable via: OnBehalfOfCredential → OnBehalfOfCredentialOptions
    /** /** */
    export type OnBehalfOfCredentialOptions = (OnBehalfOfCredentialSecretOptions | OnBehalfOfCredentialCertificateOptions | OnBehalfOfCredentialAssertionOptions) & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions & AuthorityValidationOptions;


    // Reachable via: BrokerAuthOptions → BrokerOptions
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


    /** An immutable context bag of tracing values for the current operation. */
    export interface TracingContext {
        setValue(key: symbol, value: unknown): TracingContext;
        getValue(key: symbol): unknown;
        deleteValue(key: symbol): TracingContext;
    }


}

declare module "@azure/core-client/import" {

    import { PipelineOptions, HttpClient, PipelinePolicy } from "@azure/core-rest-pipeline/import";

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


}

declare module "@azure/identity/import" {

    import { AbortSignalLike } from "@azure/abort-controller/import";
    import { TokenCredential, AccessToken, GetTokenOptions, TracingContext } from "@azure/core-auth/import";
    import { CommonClientOptions, AdditionalPolicyConfig } from "@azure/core-client/import";
    import { PipelineOptions, PipelineRetryOptions, ProxySettings, Agent, TlsSettings, KeyObject, PxfObject, RedirectPolicyOptions, UserAgentPolicyOptions, TelemetryOptions, HttpClient, PipelineRequest, HttpHeaders, MultipartRequestBody, BodyPart, PipelineResponse, PipelinePolicy, LogPolicyOptions, SendRequest, RawHttpHeaders, RequestBodyType, FormDataMap, FormDataValue, TransferProgressEvent } from "@azure/core-rest-pipeline/import";
    import { OperationTracingOptions } from "@azure/core-tracing/import";
    import { HttpMethods } from "@azure/core-util/import";
    import { Debugger } from "@azure/logger/import";

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


    // Reachable via: DefaultAzureCredential → ChainedTokenCredential
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


    // Reachable via: AuthorizationCodeCredential → AuthorityValidationOptions
    // Reachable via: AuthorizationCodeCredentialOptions → AuthorityValidationOptions
    // Reachable via: AzurePipelinesCredentialOptions → AuthorityValidationOptions
    // Reachable via: ClientAssertionCredentialOptions → AuthorityValidationOptions
    // Reachable via: ClientCertificateCredentialOptions → AuthorityValidationOptions
    // Reachable via: ClientSecretCredentialOptions → AuthorityValidationOptions
    // Reachable via: DefaultAzureCredentialOptions → AuthorityValidationOptions
    // Reachable via: EnvironmentCredentialOptions → AuthorityValidationOptions
    // Reachable via: InteractiveCredentialOptions → AuthorityValidationOptions
    // Reachable via: OnBehalfOfCredentialOptions → AuthorityValidationOptions
    // Reachable via: UsernamePasswordCredentialOptions → AuthorityValidationOptions
    // Reachable via: WorkloadIdentityCredentialOptions → AuthorityValidationOptions
    /** Provides options to configure how the Identity library */
    export interface AuthorityValidationOptions {
        disableInstanceDiscovery?: boolean;
    }


    // Reachable via: AuthorizationCodeCredential → AuthorizationCodeCredentialOptions
    /** /** */
    export interface AuthorizationCodeCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
    }


    // Reachable via: AzureCliCredential → AzureCliCredentialOptions
    /** /** */
    export interface AzureCliCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
        subscription?: string;
    }


    // Reachable via: AzureDeveloperCliCredential → AzureDeveloperCliCredentialOptions
    /** /** */
    export interface AzureDeveloperCliCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
    }


    // Reachable via: AzurePipelinesCredential → AzurePipelinesCredentialOptions
    /** /** */
    export interface AzurePipelinesCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    // Reachable via: AzurePowerShellCredential → AzurePowerShellCredentialOptions
    /** /** */
    export interface AzurePowerShellCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
    }


    // Reachable via: InteractiveBrowserCredential → BrokerAuthOptions
    // Reachable via: InteractiveBrowserCredentialNodeOptions → BrokerAuthOptions
    /** Configuration options for InteractiveBrowserCredential */
    export interface BrokerAuthOptions {
        brokerOptions?: BrokerOptions;
    }


    // Reachable via: InteractiveBrowserCredential → BrowserCustomizationOptions
    // Reachable via: InteractiveBrowserCredentialNodeOptions → BrowserCustomizationOptions
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


    // Reachable via: ClientAssertionCredential → ClientAssertionCredentialOptions
    /** /** */
    export interface ClientAssertionCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    // Reachable via: ClientCertificateCredential → ClientCertificatePEMCertificate
    // Reachable via: ClientCertificateCredentialPEMConfiguration → ClientCertificatePEMCertificate
    /** /** */
    export interface ClientCertificatePEMCertificate {
        certificate: string;
        certificatePassword?: string;
    }


    // Reachable via: ClientCertificateCredential → ClientCertificatePEMCertificatePath
    // Reachable via: ClientCertificateCredentialPEMConfiguration → ClientCertificatePEMCertificatePath
    /** /** */
    export interface ClientCertificatePEMCertificatePath {
        certificatePath: string;
        certificatePassword?: string;
    }


    // Reachable via: ClientCertificateCredential → ClientCertificateCredentialOptions
    /** /** */
    export interface ClientCertificateCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
        sendCertificateChain?: boolean;
    }


    // Reachable via: ClientSecretCredential → ClientSecretCredentialOptions
    /** /** */
    export interface ClientSecretCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    // Reachable via: AzurePipelinesCredential → CredentialPersistenceOptions
    // Reachable via: AzurePipelinesCredentialOptions → CredentialPersistenceOptions
    // Reachable via: ClientAssertionCredentialOptions → CredentialPersistenceOptions
    // Reachable via: ClientCertificateCredentialOptions → CredentialPersistenceOptions
    // Reachable via: ClientSecretCredentialOptions → CredentialPersistenceOptions
    // Reachable via: DeviceCodeCredentialOptions → CredentialPersistenceOptions
    // Reachable via: InteractiveBrowserCredentialNodeOptions → CredentialPersistenceOptions
    // Reachable via: OnBehalfOfCredential → CredentialPersistenceOptions
    // Reachable via: OnBehalfOfCredentialOptions → CredentialPersistenceOptions
    // Reachable via: UsernamePasswordCredentialOptions → CredentialPersistenceOptions
    /** Shared configuration options for credentials that support persistent token */
    export interface CredentialPersistenceOptions {
        tokenCachePersistenceOptions?: TokenCachePersistenceOptions;
    }


    // Reachable via: DefaultAzureCredential → DefaultAzureCredentialClientIdOptions
    /** /** */
    export interface DefaultAzureCredentialClientIdOptions extends DefaultAzureCredentialOptions {
        managedIdentityClientId?: string;
        workloadIdentityClientId?: string;
    }


    // Reachable via: DefaultAzureCredential → DefaultAzureCredentialResourceIdOptions
    /** /** */
    export interface DefaultAzureCredentialResourceIdOptions extends DefaultAzureCredentialOptions {
        managedIdentityResourceId: string;
    }


    // Reachable via: DefaultAzureCredential → DefaultAzureCredentialOptions
    // Reachable via: DefaultAzureCredentialClientIdOptions → DefaultAzureCredentialOptions
    // Reachable via: DefaultAzureCredentialResourceIdOptions → DefaultAzureCredentialOptions
    /** /** */
    export interface DefaultAzureCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
        requiredEnvVars?: DefaultAzureCredentialEnvVars | DefaultAzureCredentialEnvVars[];
    }


    // Reachable via: DeviceCodeCredential → DeviceCodeInfo
    // Reachable via: DeviceCodePromptCallback → DeviceCodeInfo
    /** Provides the user code and verification URI where the code must be */
    export interface DeviceCodeInfo {
        userCode: string;
        verificationUri: string;
        message: string;
    }


    // Reachable via: DeviceCodeCredential → DeviceCodeCredentialOptions
    /** Defines options for the InteractiveBrowserCredential class for Node.js. */
    export interface DeviceCodeCredentialOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions {
        tenantId?: string;
        clientId?: string;
        userPromptCallback?: DeviceCodePromptCallback;
    }


    // Reachable via: EnvironmentCredential → EnvironmentCredentialOptions
    /** Enables authentication to Microsoft Entra ID depending on the available environment variables. */
    export interface EnvironmentCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
    }


    // Reachable via: InteractiveBrowserCredential → InteractiveBrowserCredentialNodeOptions
    /** Defines the common options for the InteractiveBrowserCredential class. */
    export interface InteractiveBrowserCredentialNodeOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions, BrowserCustomizationOptions, BrokerAuthOptions {
        redirectUri?: string | (() => string);
        tenantId?: string;
        clientId?: string;
        loginHint?: string;
    }


    // Reachable via: InteractiveBrowserCredential → InteractiveBrowserCredentialInBrowserOptions
    /** Defines the common options for the InteractiveBrowserCredential class. */
    export interface InteractiveBrowserCredentialInBrowserOptions extends InteractiveCredentialOptions {
        redirectUri?: string | (() => string);
        tenantId?: string;
        clientId: string;
        loginStyle?: BrowserLoginStyle;
        loginHint?: string;
    }


    // Reachable via: DeviceCodeCredential → InteractiveCredentialOptions
    // Reachable via: DeviceCodeCredentialOptions → InteractiveCredentialOptions
    // Reachable via: InteractiveBrowserCredentialInBrowserOptions → InteractiveCredentialOptions
    // Reachable via: InteractiveBrowserCredentialNodeOptions → InteractiveCredentialOptions
    /** Common constructor options for the Identity credentials that requires user interaction. */
    export interface InteractiveCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        authenticationRecord?: AuthenticationRecord;
        disableAutomaticAuthentication?: boolean;
    }


    // Reachable via: ManagedIdentityCredential → ManagedIdentityCredentialClientIdOptions
    /** /** */
    export interface ManagedIdentityCredentialClientIdOptions extends TokenCredentialOptions {
        clientId?: string;
    }


    // Reachable via: ManagedIdentityCredential → ManagedIdentityCredentialResourceIdOptions
    /** /** */
    export interface ManagedIdentityCredentialResourceIdOptions extends TokenCredentialOptions {
        resourceId: string;
    }


    // Reachable via: ManagedIdentityCredential → ManagedIdentityCredentialObjectIdOptions
    /** /** */
    export interface ManagedIdentityCredentialObjectIdOptions extends TokenCredentialOptions {
        objectId: string;
    }


    // Reachable via: AuthorizationCodeCredential → MultiTenantTokenCredentialOptions
    // Reachable via: AuthorizationCodeCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: AzureCliCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: AzureDeveloperCliCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: AzurePipelinesCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: AzurePowerShellCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: ClientAssertionCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: ClientCertificateCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: ClientSecretCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: DefaultAzureCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: EnvironmentCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: InteractiveCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: OnBehalfOfCredential → MultiTenantTokenCredentialOptions
    // Reachable via: OnBehalfOfCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: UsernamePasswordCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: VisualStudioCodeCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: WorkloadIdentityCredentialOptions → MultiTenantTokenCredentialOptions
    /** Options for multi-tenant applications which allows for additionally allowed tenants. */
    export interface MultiTenantTokenCredentialOptions extends TokenCredentialOptions {
        additionallyAllowedTenants?: string[];
    }


    // Reachable via: OnBehalfOfCredential → OnBehalfOfCredentialSecretOptions
    // Reachable via: OnBehalfOfCredentialOptions → OnBehalfOfCredentialSecretOptions
    /** /** */
    export interface OnBehalfOfCredentialSecretOptions {
        tenantId: string;
        clientId: string;
        clientSecret: string;
        userAssertionToken: string;
    }


    // Reachable via: OnBehalfOfCredential → OnBehalfOfCredentialCertificateOptions
    // Reachable via: OnBehalfOfCredentialOptions → OnBehalfOfCredentialCertificateOptions
    /** /** */
    export interface OnBehalfOfCredentialCertificateOptions {
        tenantId: string;
        clientId: string;
        certificatePath: string;
        userAssertionToken: string;
        sendCertificateChain?: boolean;
    }


    // Reachable via: OnBehalfOfCredential → OnBehalfOfCredentialAssertionOptions
    // Reachable via: OnBehalfOfCredentialOptions → OnBehalfOfCredentialAssertionOptions
    /** /** */
    export interface OnBehalfOfCredentialAssertionOptions {
        tenantId: string;
        clientId: string;
        userAssertionToken: string;
        getAssertion(): Promise<string>;
    }


    // Reachable via: UsernamePasswordCredential → UsernamePasswordCredentialOptions
    /** @deprecated UsernamePasswordCredential is deprecated. Use a more secure credential. See https://aka.ms/azsdk/identity/mfa for details. */
    /** /** */
    export interface UsernamePasswordCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    // Reachable via: VisualStudioCodeCredential → VisualStudioCodeCredentialOptions
    /** Provides options to configure the Visual Studio Code credential. */
    export interface VisualStudioCodeCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
    }


    // Reachable via: WorkloadIdentityCredential → WorkloadIdentityCredentialOptions
    /** /** */
    export interface WorkloadIdentityCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        tenantId?: string;
        clientId?: string;
        tokenFilePath?: string;
        enableAzureProxy?: boolean;
    }


    // Reachable via: AuthenticationError → ErrorResponse
    /** See the official documentation for more details: */
    export interface ErrorResponse {
        error: string;
        errorDescription: string;
        errorCodes?: number[];
        timestamp?: string;
        traceId?: string;
        correlationId?: string;
    }


    // Reachable via: AuthenticationRequiredError → AuthenticationRequiredErrorOptions
    /** /** */
    export interface AuthenticationRequiredErrorOptions {
        scopes: string[];
        getTokenOptions?: GetTokenOptions;
        message?: string;
        cause?: unknown;
    }


    // Reachable via: BrokerAuthOptions → BrokerDisabledOptions
    // Reachable via: BrokerOptions → BrokerDisabledOptions
    /** Parameters when WAM broker authentication is disabled. */
    export interface BrokerDisabledOptions {
        enabled: false;
        legacyEnableMsaPassthrough?: undefined;
        parentWindowHandle: undefined;
    }


    // Reachable via: BrokerAuthOptions → BrokerEnabledOptions
    // Reachable via: BrokerOptions → BrokerEnabledOptions
    /** Parameters when WAM broker authentication is enabled. */
    export interface BrokerEnabledOptions {
        enabled: true;
        legacyEnableMsaPassthrough?: boolean;
        parentWindowHandle: Uint8Array;
        useDefaultBrokerAccount?: boolean;
    }


    // Reachable via: AzurePipelinesCredential → TokenCachePersistenceOptions
    // Reachable via: CredentialPersistenceOptions → TokenCachePersistenceOptions
    /** Parameters that enable token cache persistence in the Identity credentials. */
    export interface TokenCachePersistenceOptions {
        enabled: boolean;
        name?: string;
        unsafeAllowUnencryptedStorage?: boolean;
    }


    // Reachable via: DeviceCodeCredential → AuthenticationRecord
    // Reachable via: InteractiveBrowserCredential → AuthenticationRecord
    // Reachable via: InteractiveCredentialOptions → AuthenticationRecord
    /** The record to use to find the cached tokens in the cache. */
    export interface AuthenticationRecord {
        authority: string;
        homeAccountId: string;
        clientId: string;
        tenantId: string;
        username: string;
    }


    // Reachable via: DefaultAzureCredential → TokenCredentialOptions
    // Reachable via: ManagedIdentityCredential → TokenCredentialOptions
    // Reachable via: ManagedIdentityCredentialClientIdOptions → TokenCredentialOptions
    // Reachable via: ManagedIdentityCredentialObjectIdOptions → TokenCredentialOptions
    // Reachable via: ManagedIdentityCredentialResourceIdOptions → TokenCredentialOptions
    // Reachable via: MultiTenantTokenCredentialOptions → TokenCredentialOptions
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


    // Reachable via: ClientCertificateCredential → ClientCertificateCredentialPEMConfiguration
    /** /** */
    export type ClientCertificateCredentialPEMConfiguration = ClientCertificatePEMCertificate | ClientCertificatePEMCertificatePath;


    // Reachable via: DefaultAzureCredential → DefaultAzureCredentialEnvVars
    // Reachable via: DefaultAzureCredentialClientIdOptions → DefaultAzureCredentialEnvVars
    // Reachable via: DefaultAzureCredentialOptions → DefaultAzureCredentialEnvVars
    /** /** */
    export type DefaultAzureCredentialEnvVars = "AZURE_TOKEN_CREDENTIALS" | "AZURE_CLIENT_ID" | "AZURE_TENANT_ID" | "AZURE_CLIENT_SECRET" | "AZURE_CLIENT_CERTIFICATE_PATH" | "AZURE_CLIENT_CERTIFICATE_PASSWORD" | "AZURE_ADDITIONALLY_ALLOWED_TENANTS" | "AZURE_CLIENT_SEND_CERTIFICATE_CHAIN" | "AZURE_FEDERATED_TOKEN_FILE";


    // Reachable via: DeviceCodeCredential → DeviceCodePromptCallback
    // Reachable via: DeviceCodeCredentialOptions → DeviceCodePromptCallback
    /** Defines the signature of a callback which will be passed to */
    export type DeviceCodePromptCallback = (deviceCodeInfo: DeviceCodeInfo) => void;


    // Reachable via: InteractiveBrowserCredential → BrowserLoginStyle
    // Reachable via: InteractiveBrowserCredentialInBrowserOptions → BrowserLoginStyle
    /** (Browser-only feature) */
    export type BrowserLoginStyle = "redirect" | "popup";


    // Reachable via: OnBehalfOfCredential → OnBehalfOfCredentialOptions
    /** /** */
    export type OnBehalfOfCredentialOptions = (OnBehalfOfCredentialSecretOptions | OnBehalfOfCredentialCertificateOptions | OnBehalfOfCredentialAssertionOptions) & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions & AuthorityValidationOptions;


    // Reachable via: BrokerAuthOptions → BrokerOptions
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


    /** An immutable context bag of tracing values for the current operation. */
    export interface TracingContext {
        setValue(key: symbol, value: unknown): TracingContext;
        getValue(key: symbol): unknown;
        deleteValue(key: symbol): TracingContext;
    }


}

declare module "@azure/core-client/require" {

    import { PipelineOptions, HttpClient, PipelinePolicy } from "@azure/core-rest-pipeline/require";

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


}

declare module "@azure/identity/require" {

    import { AbortSignalLike } from "@azure/abort-controller/require";
    import { TokenCredential, AccessToken, GetTokenOptions, TracingContext } from "@azure/core-auth/require";
    import { CommonClientOptions, AdditionalPolicyConfig } from "@azure/core-client/require";
    import { PipelineOptions, PipelineRetryOptions, ProxySettings, Agent, TlsSettings, KeyObject, PxfObject, RedirectPolicyOptions, UserAgentPolicyOptions, TelemetryOptions, HttpClient, PipelineRequest, HttpHeaders, MultipartRequestBody, BodyPart, PipelineResponse, PipelinePolicy, LogPolicyOptions, SendRequest, RawHttpHeaders, RequestBodyType, FormDataMap, FormDataValue, TransferProgressEvent } from "@azure/core-rest-pipeline/require";
    import { OperationTracingOptions } from "@azure/core-tracing/require";
    import { HttpMethods } from "@azure/core-util/require";
    import { Debugger } from "@azure/logger/require";

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


    // Reachable via: DefaultAzureCredential → ChainedTokenCredential
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


    // Reachable via: AuthorizationCodeCredential → AuthorityValidationOptions
    // Reachable via: AuthorizationCodeCredentialOptions → AuthorityValidationOptions
    // Reachable via: AzurePipelinesCredentialOptions → AuthorityValidationOptions
    // Reachable via: ClientAssertionCredentialOptions → AuthorityValidationOptions
    // Reachable via: ClientCertificateCredentialOptions → AuthorityValidationOptions
    // Reachable via: ClientSecretCredentialOptions → AuthorityValidationOptions
    // Reachable via: DefaultAzureCredentialOptions → AuthorityValidationOptions
    // Reachable via: EnvironmentCredentialOptions → AuthorityValidationOptions
    // Reachable via: InteractiveCredentialOptions → AuthorityValidationOptions
    // Reachable via: OnBehalfOfCredentialOptions → AuthorityValidationOptions
    // Reachable via: UsernamePasswordCredentialOptions → AuthorityValidationOptions
    // Reachable via: WorkloadIdentityCredentialOptions → AuthorityValidationOptions
    /** Provides options to configure how the Identity library */
    export interface AuthorityValidationOptions {
        disableInstanceDiscovery?: boolean;
    }


    // Reachable via: AuthorizationCodeCredential → AuthorizationCodeCredentialOptions
    /** /** */
    export interface AuthorizationCodeCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
    }


    // Reachable via: AzureCliCredential → AzureCliCredentialOptions
    /** /** */
    export interface AzureCliCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
        subscription?: string;
    }


    // Reachable via: AzureDeveloperCliCredential → AzureDeveloperCliCredentialOptions
    /** /** */
    export interface AzureDeveloperCliCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
    }


    // Reachable via: AzurePipelinesCredential → AzurePipelinesCredentialOptions
    /** /** */
    export interface AzurePipelinesCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    // Reachable via: AzurePowerShellCredential → AzurePowerShellCredentialOptions
    /** /** */
    export interface AzurePowerShellCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
    }


    // Reachable via: InteractiveBrowserCredential → BrokerAuthOptions
    // Reachable via: InteractiveBrowserCredentialNodeOptions → BrokerAuthOptions
    /** Configuration options for InteractiveBrowserCredential */
    export interface BrokerAuthOptions {
        brokerOptions?: BrokerOptions;
    }


    // Reachable via: InteractiveBrowserCredential → BrowserCustomizationOptions
    // Reachable via: InteractiveBrowserCredentialNodeOptions → BrowserCustomizationOptions
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


    // Reachable via: ClientAssertionCredential → ClientAssertionCredentialOptions
    /** /** */
    export interface ClientAssertionCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    // Reachable via: ClientCertificateCredential → ClientCertificatePEMCertificate
    // Reachable via: ClientCertificateCredentialPEMConfiguration → ClientCertificatePEMCertificate
    /** /** */
    export interface ClientCertificatePEMCertificate {
        certificate: string;
        certificatePassword?: string;
    }


    // Reachable via: ClientCertificateCredential → ClientCertificatePEMCertificatePath
    // Reachable via: ClientCertificateCredentialPEMConfiguration → ClientCertificatePEMCertificatePath
    /** /** */
    export interface ClientCertificatePEMCertificatePath {
        certificatePath: string;
        certificatePassword?: string;
    }


    // Reachable via: ClientCertificateCredential → ClientCertificateCredentialOptions
    /** /** */
    export interface ClientCertificateCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
        sendCertificateChain?: boolean;
    }


    // Reachable via: ClientSecretCredential → ClientSecretCredentialOptions
    /** /** */
    export interface ClientSecretCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    // Reachable via: AzurePipelinesCredential → CredentialPersistenceOptions
    // Reachable via: AzurePipelinesCredentialOptions → CredentialPersistenceOptions
    // Reachable via: ClientAssertionCredentialOptions → CredentialPersistenceOptions
    // Reachable via: ClientCertificateCredentialOptions → CredentialPersistenceOptions
    // Reachable via: ClientSecretCredentialOptions → CredentialPersistenceOptions
    // Reachable via: DeviceCodeCredentialOptions → CredentialPersistenceOptions
    // Reachable via: InteractiveBrowserCredentialNodeOptions → CredentialPersistenceOptions
    // Reachable via: OnBehalfOfCredential → CredentialPersistenceOptions
    // Reachable via: OnBehalfOfCredentialOptions → CredentialPersistenceOptions
    // Reachable via: UsernamePasswordCredentialOptions → CredentialPersistenceOptions
    /** Shared configuration options for credentials that support persistent token */
    export interface CredentialPersistenceOptions {
        tokenCachePersistenceOptions?: TokenCachePersistenceOptions;
    }


    // Reachable via: DefaultAzureCredential → DefaultAzureCredentialClientIdOptions
    /** /** */
    export interface DefaultAzureCredentialClientIdOptions extends DefaultAzureCredentialOptions {
        managedIdentityClientId?: string;
        workloadIdentityClientId?: string;
    }


    // Reachable via: DefaultAzureCredential → DefaultAzureCredentialResourceIdOptions
    /** /** */
    export interface DefaultAzureCredentialResourceIdOptions extends DefaultAzureCredentialOptions {
        managedIdentityResourceId: string;
    }


    // Reachable via: DefaultAzureCredential → DefaultAzureCredentialOptions
    // Reachable via: DefaultAzureCredentialClientIdOptions → DefaultAzureCredentialOptions
    // Reachable via: DefaultAzureCredentialResourceIdOptions → DefaultAzureCredentialOptions
    /** /** */
    export interface DefaultAzureCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
        requiredEnvVars?: DefaultAzureCredentialEnvVars | DefaultAzureCredentialEnvVars[];
    }


    // Reachable via: DeviceCodeCredential → DeviceCodeInfo
    // Reachable via: DeviceCodePromptCallback → DeviceCodeInfo
    /** Provides the user code and verification URI where the code must be */
    export interface DeviceCodeInfo {
        userCode: string;
        verificationUri: string;
        message: string;
    }


    // Reachable via: DeviceCodeCredential → DeviceCodeCredentialOptions
    /** Defines options for the InteractiveBrowserCredential class for Node.js. */
    export interface DeviceCodeCredentialOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions {
        tenantId?: string;
        clientId?: string;
        userPromptCallback?: DeviceCodePromptCallback;
    }


    // Reachable via: EnvironmentCredential → EnvironmentCredentialOptions
    /** Enables authentication to Microsoft Entra ID depending on the available environment variables. */
    export interface EnvironmentCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
    }


    // Reachable via: InteractiveBrowserCredential → InteractiveBrowserCredentialNodeOptions
    /** Defines the common options for the InteractiveBrowserCredential class. */
    export interface InteractiveBrowserCredentialNodeOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions, BrowserCustomizationOptions, BrokerAuthOptions {
        redirectUri?: string | (() => string);
        tenantId?: string;
        clientId?: string;
        loginHint?: string;
    }


    // Reachable via: InteractiveBrowserCredential → InteractiveBrowserCredentialInBrowserOptions
    /** Defines the common options for the InteractiveBrowserCredential class. */
    export interface InteractiveBrowserCredentialInBrowserOptions extends InteractiveCredentialOptions {
        redirectUri?: string | (() => string);
        tenantId?: string;
        clientId: string;
        loginStyle?: BrowserLoginStyle;
        loginHint?: string;
    }


    // Reachable via: DeviceCodeCredential → InteractiveCredentialOptions
    // Reachable via: DeviceCodeCredentialOptions → InteractiveCredentialOptions
    // Reachable via: InteractiveBrowserCredentialInBrowserOptions → InteractiveCredentialOptions
    // Reachable via: InteractiveBrowserCredentialNodeOptions → InteractiveCredentialOptions
    /** Common constructor options for the Identity credentials that requires user interaction. */
    export interface InteractiveCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        authenticationRecord?: AuthenticationRecord;
        disableAutomaticAuthentication?: boolean;
    }


    // Reachable via: ManagedIdentityCredential → ManagedIdentityCredentialClientIdOptions
    /** /** */
    export interface ManagedIdentityCredentialClientIdOptions extends TokenCredentialOptions {
        clientId?: string;
    }


    // Reachable via: ManagedIdentityCredential → ManagedIdentityCredentialResourceIdOptions
    /** /** */
    export interface ManagedIdentityCredentialResourceIdOptions extends TokenCredentialOptions {
        resourceId: string;
    }


    // Reachable via: ManagedIdentityCredential → ManagedIdentityCredentialObjectIdOptions
    /** /** */
    export interface ManagedIdentityCredentialObjectIdOptions extends TokenCredentialOptions {
        objectId: string;
    }


    // Reachable via: AuthorizationCodeCredential → MultiTenantTokenCredentialOptions
    // Reachable via: AuthorizationCodeCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: AzureCliCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: AzureDeveloperCliCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: AzurePipelinesCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: AzurePowerShellCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: ClientAssertionCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: ClientCertificateCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: ClientSecretCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: DefaultAzureCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: EnvironmentCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: InteractiveCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: OnBehalfOfCredential → MultiTenantTokenCredentialOptions
    // Reachable via: OnBehalfOfCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: UsernamePasswordCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: VisualStudioCodeCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: WorkloadIdentityCredentialOptions → MultiTenantTokenCredentialOptions
    /** Options for multi-tenant applications which allows for additionally allowed tenants. */
    export interface MultiTenantTokenCredentialOptions extends TokenCredentialOptions {
        additionallyAllowedTenants?: string[];
    }


    // Reachable via: OnBehalfOfCredential → OnBehalfOfCredentialSecretOptions
    // Reachable via: OnBehalfOfCredentialOptions → OnBehalfOfCredentialSecretOptions
    /** /** */
    export interface OnBehalfOfCredentialSecretOptions {
        tenantId: string;
        clientId: string;
        clientSecret: string;
        userAssertionToken: string;
    }


    // Reachable via: OnBehalfOfCredential → OnBehalfOfCredentialCertificateOptions
    // Reachable via: OnBehalfOfCredentialOptions → OnBehalfOfCredentialCertificateOptions
    /** /** */
    export interface OnBehalfOfCredentialCertificateOptions {
        tenantId: string;
        clientId: string;
        certificatePath: string;
        userAssertionToken: string;
        sendCertificateChain?: boolean;
    }


    // Reachable via: OnBehalfOfCredential → OnBehalfOfCredentialAssertionOptions
    // Reachable via: OnBehalfOfCredentialOptions → OnBehalfOfCredentialAssertionOptions
    /** /** */
    export interface OnBehalfOfCredentialAssertionOptions {
        tenantId: string;
        clientId: string;
        userAssertionToken: string;
        getAssertion(): Promise<string>;
    }


    // Reachable via: UsernamePasswordCredential → UsernamePasswordCredentialOptions
    /** @deprecated UsernamePasswordCredential is deprecated. Use a more secure credential. See https://aka.ms/azsdk/identity/mfa for details. */
    /** /** */
    export interface UsernamePasswordCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    // Reachable via: VisualStudioCodeCredential → VisualStudioCodeCredentialOptions
    /** Provides options to configure the Visual Studio Code credential. */
    export interface VisualStudioCodeCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
    }


    // Reachable via: WorkloadIdentityCredential → WorkloadIdentityCredentialOptions
    /** /** */
    export interface WorkloadIdentityCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        tenantId?: string;
        clientId?: string;
        tokenFilePath?: string;
        enableAzureProxy?: boolean;
    }


    // Reachable via: AuthenticationError → ErrorResponse
    /** See the official documentation for more details: */
    export interface ErrorResponse {
        error: string;
        errorDescription: string;
        errorCodes?: number[];
        timestamp?: string;
        traceId?: string;
        correlationId?: string;
    }


    // Reachable via: AuthenticationRequiredError → AuthenticationRequiredErrorOptions
    /** /** */
    export interface AuthenticationRequiredErrorOptions {
        scopes: string[];
        getTokenOptions?: GetTokenOptions;
        message?: string;
        cause?: unknown;
    }


    // Reachable via: BrokerAuthOptions → BrokerDisabledOptions
    // Reachable via: BrokerOptions → BrokerDisabledOptions
    /** Parameters when WAM broker authentication is disabled. */
    export interface BrokerDisabledOptions {
        enabled: false;
        legacyEnableMsaPassthrough?: undefined;
        parentWindowHandle: undefined;
    }


    // Reachable via: BrokerAuthOptions → BrokerEnabledOptions
    // Reachable via: BrokerOptions → BrokerEnabledOptions
    /** Parameters when WAM broker authentication is enabled. */
    export interface BrokerEnabledOptions {
        enabled: true;
        legacyEnableMsaPassthrough?: boolean;
        parentWindowHandle: Uint8Array;
        useDefaultBrokerAccount?: boolean;
    }


    // Reachable via: AzurePipelinesCredential → TokenCachePersistenceOptions
    // Reachable via: CredentialPersistenceOptions → TokenCachePersistenceOptions
    /** Parameters that enable token cache persistence in the Identity credentials. */
    export interface TokenCachePersistenceOptions {
        enabled: boolean;
        name?: string;
        unsafeAllowUnencryptedStorage?: boolean;
    }


    // Reachable via: DeviceCodeCredential → AuthenticationRecord
    // Reachable via: InteractiveBrowserCredential → AuthenticationRecord
    // Reachable via: InteractiveCredentialOptions → AuthenticationRecord
    /** The record to use to find the cached tokens in the cache. */
    export interface AuthenticationRecord {
        authority: string;
        homeAccountId: string;
        clientId: string;
        tenantId: string;
        username: string;
    }


    // Reachable via: DefaultAzureCredential → TokenCredentialOptions
    // Reachable via: ManagedIdentityCredential → TokenCredentialOptions
    // Reachable via: ManagedIdentityCredentialClientIdOptions → TokenCredentialOptions
    // Reachable via: ManagedIdentityCredentialObjectIdOptions → TokenCredentialOptions
    // Reachable via: ManagedIdentityCredentialResourceIdOptions → TokenCredentialOptions
    // Reachable via: MultiTenantTokenCredentialOptions → TokenCredentialOptions
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


    // Reachable via: ClientCertificateCredential → ClientCertificateCredentialPEMConfiguration
    /** /** */
    export type ClientCertificateCredentialPEMConfiguration = ClientCertificatePEMCertificate | ClientCertificatePEMCertificatePath;


    // Reachable via: DefaultAzureCredential → DefaultAzureCredentialEnvVars
    // Reachable via: DefaultAzureCredentialClientIdOptions → DefaultAzureCredentialEnvVars
    // Reachable via: DefaultAzureCredentialOptions → DefaultAzureCredentialEnvVars
    /** /** */
    export type DefaultAzureCredentialEnvVars = "AZURE_TOKEN_CREDENTIALS" | "AZURE_CLIENT_ID" | "AZURE_TENANT_ID" | "AZURE_CLIENT_SECRET" | "AZURE_CLIENT_CERTIFICATE_PATH" | "AZURE_CLIENT_CERTIFICATE_PASSWORD" | "AZURE_ADDITIONALLY_ALLOWED_TENANTS" | "AZURE_CLIENT_SEND_CERTIFICATE_CHAIN" | "AZURE_FEDERATED_TOKEN_FILE";


    // Reachable via: DeviceCodeCredential → DeviceCodePromptCallback
    // Reachable via: DeviceCodeCredentialOptions → DeviceCodePromptCallback
    /** Defines the signature of a callback which will be passed to */
    export type DeviceCodePromptCallback = (deviceCodeInfo: DeviceCodeInfo) => void;


    // Reachable via: InteractiveBrowserCredential → BrowserLoginStyle
    // Reachable via: InteractiveBrowserCredentialInBrowserOptions → BrowserLoginStyle
    /** (Browser-only feature) */
    export type BrowserLoginStyle = "redirect" | "popup";


    // Reachable via: OnBehalfOfCredential → OnBehalfOfCredentialOptions
    /** /** */
    export type OnBehalfOfCredentialOptions = (OnBehalfOfCredentialSecretOptions | OnBehalfOfCredentialCertificateOptions | OnBehalfOfCredentialAssertionOptions) & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions & AuthorityValidationOptions;


    // Reachable via: BrokerAuthOptions → BrokerOptions
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


    /** An immutable context bag of tracing values for the current operation. */
    export interface TracingContext {
        setValue(key: symbol, value: unknown): TracingContext;
        getValue(key: symbol): unknown;
        deleteValue(key: symbol): TracingContext;
    }


}

declare module "@azure/core-client" {

    import { PipelineOptions, HttpClient, PipelinePolicy } from "@azure/core-rest-pipeline";

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


}

declare module "@azure/identity/workerd" {

    import { AbortSignalLike } from "@azure/abort-controller";
    import { TokenCredential, AccessToken, GetTokenOptions, TracingContext } from "@azure/core-auth";
    import { CommonClientOptions, AdditionalPolicyConfig } from "@azure/core-client";
    import { PipelineOptions, PipelineRetryOptions, ProxySettings, Agent, TlsSettings, KeyObject, PxfObject, RedirectPolicyOptions, UserAgentPolicyOptions, TelemetryOptions, HttpClient, PipelineRequest, HttpHeaders, MultipartRequestBody, BodyPart, PipelineResponse, PipelinePolicy, LogPolicyOptions, SendRequest, RawHttpHeaders, RequestBodyType, FormDataMap, FormDataValue, TransferProgressEvent } from "@azure/core-rest-pipeline";
    import { OperationTracingOptions } from "@azure/core-tracing";
    import { HttpMethods } from "@azure/core-util";
    import { Debugger } from "@azure/logger";

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


    // Reachable via: DefaultAzureCredential → ChainedTokenCredential
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


    // Reachable via: AuthorizationCodeCredential → AuthorityValidationOptions
    // Reachable via: AuthorizationCodeCredentialOptions → AuthorityValidationOptions
    // Reachable via: AzurePipelinesCredentialOptions → AuthorityValidationOptions
    // Reachable via: ClientAssertionCredentialOptions → AuthorityValidationOptions
    // Reachable via: ClientCertificateCredentialOptions → AuthorityValidationOptions
    // Reachable via: ClientSecretCredentialOptions → AuthorityValidationOptions
    // Reachable via: DefaultAzureCredentialOptions → AuthorityValidationOptions
    // Reachable via: EnvironmentCredentialOptions → AuthorityValidationOptions
    // Reachable via: InteractiveCredentialOptions → AuthorityValidationOptions
    // Reachable via: OnBehalfOfCredentialOptions → AuthorityValidationOptions
    // Reachable via: UsernamePasswordCredentialOptions → AuthorityValidationOptions
    // Reachable via: WorkloadIdentityCredentialOptions → AuthorityValidationOptions
    /** Provides options to configure how the Identity library */
    export interface AuthorityValidationOptions {
        disableInstanceDiscovery?: boolean;
    }


    // Reachable via: AuthorizationCodeCredential → AuthorizationCodeCredentialOptions
    /** /** */
    export interface AuthorizationCodeCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
    }


    // Reachable via: AzureCliCredential → AzureCliCredentialOptions
    /** /** */
    export interface AzureCliCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
        subscription?: string;
    }


    // Reachable via: AzureDeveloperCliCredential → AzureDeveloperCliCredentialOptions
    /** /** */
    export interface AzureDeveloperCliCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
    }


    // Reachable via: AzurePipelinesCredential → AzurePipelinesCredentialOptions
    /** /** */
    export interface AzurePipelinesCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    // Reachable via: AzurePowerShellCredential → AzurePowerShellCredentialOptions
    /** /** */
    export interface AzurePowerShellCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
    }


    // Reachable via: InteractiveBrowserCredential → BrokerAuthOptions
    // Reachable via: InteractiveBrowserCredentialNodeOptions → BrokerAuthOptions
    /** Configuration options for InteractiveBrowserCredential */
    export interface BrokerAuthOptions {
        brokerOptions?: BrokerOptions;
    }


    // Reachable via: InteractiveBrowserCredential → BrowserCustomizationOptions
    // Reachable via: InteractiveBrowserCredentialNodeOptions → BrowserCustomizationOptions
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


    // Reachable via: ClientAssertionCredential → ClientAssertionCredentialOptions
    /** /** */
    export interface ClientAssertionCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    // Reachable via: ClientCertificateCredential → ClientCertificatePEMCertificate
    // Reachable via: ClientCertificateCredentialPEMConfiguration → ClientCertificatePEMCertificate
    /** /** */
    export interface ClientCertificatePEMCertificate {
        certificate: string;
        certificatePassword?: string;
    }


    // Reachable via: ClientCertificateCredential → ClientCertificatePEMCertificatePath
    // Reachable via: ClientCertificateCredentialPEMConfiguration → ClientCertificatePEMCertificatePath
    /** /** */
    export interface ClientCertificatePEMCertificatePath {
        certificatePath: string;
        certificatePassword?: string;
    }


    // Reachable via: ClientCertificateCredential → ClientCertificateCredentialOptions
    /** /** */
    export interface ClientCertificateCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
        sendCertificateChain?: boolean;
    }


    // Reachable via: ClientSecretCredential → ClientSecretCredentialOptions
    /** /** */
    export interface ClientSecretCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    // Reachable via: AzurePipelinesCredential → CredentialPersistenceOptions
    // Reachable via: AzurePipelinesCredentialOptions → CredentialPersistenceOptions
    // Reachable via: ClientAssertionCredentialOptions → CredentialPersistenceOptions
    // Reachable via: ClientCertificateCredentialOptions → CredentialPersistenceOptions
    // Reachable via: ClientSecretCredentialOptions → CredentialPersistenceOptions
    // Reachable via: DeviceCodeCredentialOptions → CredentialPersistenceOptions
    // Reachable via: InteractiveBrowserCredentialNodeOptions → CredentialPersistenceOptions
    // Reachable via: OnBehalfOfCredential → CredentialPersistenceOptions
    // Reachable via: OnBehalfOfCredentialOptions → CredentialPersistenceOptions
    // Reachable via: UsernamePasswordCredentialOptions → CredentialPersistenceOptions
    /** Shared configuration options for credentials that support persistent token */
    export interface CredentialPersistenceOptions {
        tokenCachePersistenceOptions?: TokenCachePersistenceOptions;
    }


    // Reachable via: DefaultAzureCredential → DefaultAzureCredentialClientIdOptions
    /** /** */
    export interface DefaultAzureCredentialClientIdOptions extends DefaultAzureCredentialOptions {
        managedIdentityClientId?: string;
        workloadIdentityClientId?: string;
    }


    // Reachable via: DefaultAzureCredential → DefaultAzureCredentialResourceIdOptions
    /** /** */
    export interface DefaultAzureCredentialResourceIdOptions extends DefaultAzureCredentialOptions {
        managedIdentityResourceId: string;
    }


    // Reachable via: DefaultAzureCredential → DefaultAzureCredentialOptions
    // Reachable via: DefaultAzureCredentialClientIdOptions → DefaultAzureCredentialOptions
    // Reachable via: DefaultAzureCredentialResourceIdOptions → DefaultAzureCredentialOptions
    /** /** */
    export interface DefaultAzureCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        tenantId?: string;
        processTimeoutInMs?: number;
        requiredEnvVars?: DefaultAzureCredentialEnvVars | DefaultAzureCredentialEnvVars[];
    }


    // Reachable via: DeviceCodeCredential → DeviceCodeInfo
    // Reachable via: DeviceCodePromptCallback → DeviceCodeInfo
    /** Provides the user code and verification URI where the code must be */
    export interface DeviceCodeInfo {
        userCode: string;
        verificationUri: string;
        message: string;
    }


    // Reachable via: DeviceCodeCredential → DeviceCodeCredentialOptions
    /** Defines options for the InteractiveBrowserCredential class for Node.js. */
    export interface DeviceCodeCredentialOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions {
        tenantId?: string;
        clientId?: string;
        userPromptCallback?: DeviceCodePromptCallback;
    }


    // Reachable via: EnvironmentCredential → EnvironmentCredentialOptions
    /** Enables authentication to Microsoft Entra ID depending on the available environment variables. */
    export interface EnvironmentCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
    }


    // Reachable via: InteractiveBrowserCredential → InteractiveBrowserCredentialNodeOptions
    /** Defines the common options for the InteractiveBrowserCredential class. */
    export interface InteractiveBrowserCredentialNodeOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions, BrowserCustomizationOptions, BrokerAuthOptions {
        redirectUri?: string | (() => string);
        tenantId?: string;
        clientId?: string;
        loginHint?: string;
    }


    // Reachable via: InteractiveBrowserCredential → InteractiveBrowserCredentialInBrowserOptions
    /** Defines the common options for the InteractiveBrowserCredential class. */
    export interface InteractiveBrowserCredentialInBrowserOptions extends InteractiveCredentialOptions {
        redirectUri?: string | (() => string);
        tenantId?: string;
        clientId: string;
        loginStyle?: BrowserLoginStyle;
        loginHint?: string;
    }


    // Reachable via: DeviceCodeCredential → InteractiveCredentialOptions
    // Reachable via: DeviceCodeCredentialOptions → InteractiveCredentialOptions
    // Reachable via: InteractiveBrowserCredentialInBrowserOptions → InteractiveCredentialOptions
    // Reachable via: InteractiveBrowserCredentialNodeOptions → InteractiveCredentialOptions
    /** Common constructor options for the Identity credentials that requires user interaction. */
    export interface InteractiveCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        authenticationRecord?: AuthenticationRecord;
        disableAutomaticAuthentication?: boolean;
    }


    // Reachable via: ManagedIdentityCredential → ManagedIdentityCredentialClientIdOptions
    /** /** */
    export interface ManagedIdentityCredentialClientIdOptions extends TokenCredentialOptions {
        clientId?: string;
    }


    // Reachable via: ManagedIdentityCredential → ManagedIdentityCredentialResourceIdOptions
    /** /** */
    export interface ManagedIdentityCredentialResourceIdOptions extends TokenCredentialOptions {
        resourceId: string;
    }


    // Reachable via: ManagedIdentityCredential → ManagedIdentityCredentialObjectIdOptions
    /** /** */
    export interface ManagedIdentityCredentialObjectIdOptions extends TokenCredentialOptions {
        objectId: string;
    }


    // Reachable via: AuthorizationCodeCredential → MultiTenantTokenCredentialOptions
    // Reachable via: AuthorizationCodeCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: AzureCliCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: AzureDeveloperCliCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: AzurePipelinesCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: AzurePowerShellCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: ClientAssertionCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: ClientCertificateCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: ClientSecretCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: DefaultAzureCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: EnvironmentCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: InteractiveCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: OnBehalfOfCredential → MultiTenantTokenCredentialOptions
    // Reachable via: OnBehalfOfCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: UsernamePasswordCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: VisualStudioCodeCredentialOptions → MultiTenantTokenCredentialOptions
    // Reachable via: WorkloadIdentityCredentialOptions → MultiTenantTokenCredentialOptions
    /** Options for multi-tenant applications which allows for additionally allowed tenants. */
    export interface MultiTenantTokenCredentialOptions extends TokenCredentialOptions {
        additionallyAllowedTenants?: string[];
    }


    // Reachable via: OnBehalfOfCredential → OnBehalfOfCredentialSecretOptions
    // Reachable via: OnBehalfOfCredentialOptions → OnBehalfOfCredentialSecretOptions
    /** /** */
    export interface OnBehalfOfCredentialSecretOptions {
        tenantId: string;
        clientId: string;
        clientSecret: string;
        userAssertionToken: string;
    }


    // Reachable via: OnBehalfOfCredential → OnBehalfOfCredentialCertificateOptions
    // Reachable via: OnBehalfOfCredentialOptions → OnBehalfOfCredentialCertificateOptions
    /** /** */
    export interface OnBehalfOfCredentialCertificateOptions {
        tenantId: string;
        clientId: string;
        certificatePath: string;
        userAssertionToken: string;
        sendCertificateChain?: boolean;
    }


    // Reachable via: OnBehalfOfCredential → OnBehalfOfCredentialAssertionOptions
    // Reachable via: OnBehalfOfCredentialOptions → OnBehalfOfCredentialAssertionOptions
    /** /** */
    export interface OnBehalfOfCredentialAssertionOptions {
        tenantId: string;
        clientId: string;
        userAssertionToken: string;
        getAssertion(): Promise<string>;
    }


    // Reachable via: UsernamePasswordCredential → UsernamePasswordCredentialOptions
    /** @deprecated UsernamePasswordCredential is deprecated. Use a more secure credential. See https://aka.ms/azsdk/identity/mfa for details. */
    /** /** */
    export interface UsernamePasswordCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
    }


    // Reachable via: VisualStudioCodeCredential → VisualStudioCodeCredentialOptions
    /** Provides options to configure the Visual Studio Code credential. */
    export interface VisualStudioCodeCredentialOptions extends MultiTenantTokenCredentialOptions {
        tenantId?: string;
    }


    // Reachable via: WorkloadIdentityCredential → WorkloadIdentityCredentialOptions
    /** /** */
    export interface WorkloadIdentityCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
        tenantId?: string;
        clientId?: string;
        tokenFilePath?: string;
        enableAzureProxy?: boolean;
    }


    // Reachable via: AuthenticationError → ErrorResponse
    /** See the official documentation for more details: */
    export interface ErrorResponse {
        error: string;
        errorDescription: string;
        errorCodes?: number[];
        timestamp?: string;
        traceId?: string;
        correlationId?: string;
    }


    // Reachable via: AuthenticationRequiredError → AuthenticationRequiredErrorOptions
    /** /** */
    export interface AuthenticationRequiredErrorOptions {
        scopes: string[];
        getTokenOptions?: GetTokenOptions;
        message?: string;
        cause?: unknown;
    }


    // Reachable via: BrokerAuthOptions → BrokerDisabledOptions
    // Reachable via: BrokerOptions → BrokerDisabledOptions
    /** Parameters when WAM broker authentication is disabled. */
    export interface BrokerDisabledOptions {
        enabled: false;
        legacyEnableMsaPassthrough?: undefined;
        parentWindowHandle: undefined;
    }


    // Reachable via: BrokerAuthOptions → BrokerEnabledOptions
    // Reachable via: BrokerOptions → BrokerEnabledOptions
    /** Parameters when WAM broker authentication is enabled. */
    export interface BrokerEnabledOptions {
        enabled: true;
        legacyEnableMsaPassthrough?: boolean;
        parentWindowHandle: Uint8Array;
        useDefaultBrokerAccount?: boolean;
    }


    // Reachable via: AzurePipelinesCredential → TokenCachePersistenceOptions
    // Reachable via: CredentialPersistenceOptions → TokenCachePersistenceOptions
    /** Parameters that enable token cache persistence in the Identity credentials. */
    export interface TokenCachePersistenceOptions {
        enabled: boolean;
        name?: string;
        unsafeAllowUnencryptedStorage?: boolean;
    }


    // Reachable via: DeviceCodeCredential → AuthenticationRecord
    // Reachable via: InteractiveBrowserCredential → AuthenticationRecord
    // Reachable via: InteractiveCredentialOptions → AuthenticationRecord
    /** The record to use to find the cached tokens in the cache. */
    export interface AuthenticationRecord {
        authority: string;
        homeAccountId: string;
        clientId: string;
        tenantId: string;
        username: string;
    }


    // Reachable via: DefaultAzureCredential → TokenCredentialOptions
    // Reachable via: ManagedIdentityCredential → TokenCredentialOptions
    // Reachable via: ManagedIdentityCredentialClientIdOptions → TokenCredentialOptions
    // Reachable via: ManagedIdentityCredentialObjectIdOptions → TokenCredentialOptions
    // Reachable via: ManagedIdentityCredentialResourceIdOptions → TokenCredentialOptions
    // Reachable via: MultiTenantTokenCredentialOptions → TokenCredentialOptions
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


    // Reachable via: ClientCertificateCredential → ClientCertificateCredentialPEMConfiguration
    /** /** */
    export type ClientCertificateCredentialPEMConfiguration = ClientCertificatePEMCertificate | ClientCertificatePEMCertificatePath;


    // Reachable via: DefaultAzureCredential → DefaultAzureCredentialEnvVars
    // Reachable via: DefaultAzureCredentialClientIdOptions → DefaultAzureCredentialEnvVars
    // Reachable via: DefaultAzureCredentialOptions → DefaultAzureCredentialEnvVars
    /** /** */
    export type DefaultAzureCredentialEnvVars = "AZURE_TOKEN_CREDENTIALS" | "AZURE_CLIENT_ID" | "AZURE_TENANT_ID" | "AZURE_CLIENT_SECRET" | "AZURE_CLIENT_CERTIFICATE_PATH" | "AZURE_CLIENT_CERTIFICATE_PASSWORD" | "AZURE_ADDITIONALLY_ALLOWED_TENANTS" | "AZURE_CLIENT_SEND_CERTIFICATE_CHAIN" | "AZURE_FEDERATED_TOKEN_FILE";


    // Reachable via: DeviceCodeCredential → DeviceCodePromptCallback
    // Reachable via: DeviceCodeCredentialOptions → DeviceCodePromptCallback
    /** Defines the signature of a callback which will be passed to */
    export type DeviceCodePromptCallback = (deviceCodeInfo: DeviceCodeInfo) => void;


    // Reachable via: InteractiveBrowserCredential → BrowserLoginStyle
    // Reachable via: InteractiveBrowserCredentialInBrowserOptions → BrowserLoginStyle
    /** (Browser-only feature) */
    export type BrowserLoginStyle = "redirect" | "popup";


    // Reachable via: OnBehalfOfCredential → OnBehalfOfCredentialOptions
    /** /** */
    export type OnBehalfOfCredentialOptions = (OnBehalfOfCredentialSecretOptions | OnBehalfOfCredentialCertificateOptions | OnBehalfOfCredentialAssertionOptions) & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions & AuthorityValidationOptions;


    // Reachable via: BrokerAuthOptions → BrokerOptions
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

