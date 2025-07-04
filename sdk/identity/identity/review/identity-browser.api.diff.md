# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```
- // @public
+ // @public (undocumented)
-     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+     // (undocumented)
- }
+     getToken(): Promise<AccessToken | null>;
- 
+ }
- // @public
+ 
- export interface AuthorizationCodeCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
+ // @public
- }
+ export interface AuthorizationCodeCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
- 
+ }
- // @public
+ 
- export enum AzureAuthorityHosts {
+ // @public
-     AzureChina = "https://login.chinacloudapi.cn",
+ export enum AzureAuthorityHosts {
-     // @deprecated
+     AzureChina = "https://login.chinacloudapi.cn",
-     AzureGermany = "https://login.microsoftonline.de",
+     // @deprecated
-     AzureGovernment = "https://login.microsoftonline.us",
+     AzureGermany = "https://login.microsoftonline.de",
-     AzurePublicCloud = "https://login.microsoftonline.com"
+     AzureGovernment = "https://login.microsoftonline.us",
- }
+     AzurePublicCloud = "https://login.microsoftonline.com"
- 
+ }
- // @public
+ 
- export class AzureCliCredential implements TokenCredential {
+ // @public
-     constructor(options?: AzureCliCredentialOptions);
+ export class AzureCliCredential implements TokenCredential {
-     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+     constructor();
- }
+     // (undocumented)
- 
+     getToken(): Promise<AccessToken | null>;
- // @public
+ }
- export interface AzureCliCredentialOptions extends MultiTenantTokenCredentialOptions {
+ 
-     processTimeoutInMs?: number;
+ // @public
-     subscription?: string;
+ export interface AzureCliCredentialOptions extends MultiTenantTokenCredentialOptions {
-     tenantId?: string;
+     processTimeoutInMs?: number;
- }
+     subscription?: string;
- 
+     tenantId?: string;
- // @public
+ }
- export class AzureDeveloperCliCredential implements TokenCredential {
+ 
-     constructor(options?: AzureDeveloperCliCredentialOptions);
+ // @public
-     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+ export class AzureDeveloperCliCredential implements TokenCredential {
- }
+     constructor();
- 
+     // (undocumented)
- // @public
+     getToken(): Promise<AccessToken | null>;
- export interface AzureDeveloperCliCredentialOptions extends MultiTenantTokenCredentialOptions {
+ }
-     processTimeoutInMs?: number;
+ 
-     tenantId?: string;
+ // @public
- }
+ export interface AzureDeveloperCliCredentialOptions extends MultiTenantTokenCredentialOptions {
- 
+     processTimeoutInMs?: number;
- // @public
+     tenantId?: string;
- export class AzurePipelinesCredential implements TokenCredential {
+ }
-     constructor(tenantId: string, clientId: string, serviceConnectionId: string, systemAccessToken: string, options?: AzurePipelinesCredentialOptions);
+ 
-     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+ // @public
- }
+ export class AzurePipelinesCredential implements TokenCredential {
- 
+     constructor();
- // @public
+     // (undocumented)
- export interface AzurePipelinesCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
+     getToken(): Promise<AccessToken | null>;
- export class AzurePowerShellCredential implements TokenCredential {
+ export interface AzurePipelinesCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
-     constructor(options?: AzurePowerShellCredentialOptions);
+ }
-     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+ 
- }
+ // @public
- 
+ export class AzurePowerShellCredential implements TokenCredential {
- // @public
+     constructor();
- export interface AzurePowerShellCredentialOptions extends MultiTenantTokenCredentialOptions {
+     // (undocumented)
-     processTimeoutInMs?: number;
+     getToken(): Promise<AccessToken | null>;
-     tenantId?: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface AzurePowerShellCredentialOptions extends MultiTenantTokenCredentialOptions {
- export interface BrokerAuthOptions {
+     processTimeoutInMs?: number;
-     brokerOptions?: BrokerOptions;
+     tenantId?: string;
- export interface BrokerDisabledOptions {
+ export interface BrokerAuthOptions {
-     enabled: false;
+     brokerOptions?: BrokerOptions;
-     legacyEnableMsaPassthrough?: undefined;
+ }
-     parentWindowHandle: undefined;
+ 
- }
+ // @public
- 
+ export interface BrokerDisabledOptions {
- // @public
+     enabled: false;
- export interface BrokerEnabledOptions {
+     legacyEnableMsaPassthrough?: undefined;
-     enabled: true;
+     parentWindowHandle: undefined;
-     legacyEnableMsaPassthrough?: boolean;
+ }
-     parentWindowHandle: Uint8Array;
+ 
-     useDefaultBrokerAccount?: boolean;
+ // @public
- }
+ export interface BrokerEnabledOptions {
- 
+     enabled: true;
- // @public
+     legacyEnableMsaPassthrough?: boolean;
- export type BrokerOptions = BrokerEnabledOptions | BrokerDisabledOptions;
+     parentWindowHandle: Uint8Array;
- 
+     useDefaultBrokerAccount?: boolean;
- // @public
+ }
- export interface BrowserCustomizationOptions {
+ 
-     browserCustomizationOptions?: {
+ // @public
-         errorMessage?: string;
+ export type BrokerOptions = BrokerEnabledOptions | BrokerDisabledOptions;
-         successMessage?: string;
+ 
-     };
+ // @public
- }
+ export interface BrowserCustomizationOptions {
- 
+     browserCustomizationOptions?: {
- // @public
+         errorMessage?: string;
- export type BrowserLoginStyle = "redirect" | "popup";
+         successMessage?: string;
- 
+     };
- // @public
+ }
- export class ChainedTokenCredential implements TokenCredential {
+ 
-     constructor(...sources: TokenCredential[]);
+ // @public
-     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+ export type BrowserLoginStyle = "redirect" | "popup";
- }
+ 
- 
+ // @public
- // @public
+ export class ChainedTokenCredential implements TokenCredential {
- export class ClientAssertionCredential implements TokenCredential {
+     constructor(...sources: TokenCredential[]);
-     constructor(tenantId: string, clientId: string, getAssertion: () => Promise<string>, options?: ClientAssertionCredentialOptions);
+     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
-     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export class ClientAssertionCredential implements TokenCredential {
- export interface ClientAssertionCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
+     constructor();
- }
+     // (undocumented)
- 
+     getToken(): Promise<AccessToken | null>;
- // @public
+ }
- export class ClientCertificateCredential implements TokenCredential {
+ 
-     constructor(tenantId: string, clientId: string, certificatePath: string, options?: ClientCertificateCredentialOptions);
+ // @public
-     constructor(tenantId: string, clientId: string, configuration: ClientCertificatePEMCertificatePath, options?: ClientCertificateCredentialOptions);
+ export interface ClientAssertionCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
-     constructor(tenantId: string, clientId: string, configuration: ClientCertificatePEMCertificate, options?: ClientCertificateCredentialOptions);
+ }
-     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+ 
- }
+ // @public
- 
+ export class ClientCertificateCredential implements TokenCredential {
- // @public
+     constructor(tenantId: string, clientId: string, certificatePath: string, options?: ClientCertificateCredentialOptions);
- export interface ClientCertificateCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
+     constructor(tenantId: string, clientId: string, configuration: ClientCertificatePEMCertificatePath, options?: ClientCertificateCredentialOptions);
-     sendCertificateChain?: boolean;
+     constructor(tenantId: string, clientId: string, configuration: ClientCertificatePEMCertificate, options?: ClientCertificateCredentialOptions);
- }
+     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
- 
+ }
- // @public
+ 
- export type ClientCertificateCredentialPEMConfiguration = ClientCertificatePEMCertificate | ClientCertificatePEMCertificatePath;
+ // @public
- 
+ export interface ClientCertificateCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
- // @public
+     sendCertificateChain?: boolean;
- export interface ClientCertificatePEMCertificate {
+ }
-     certificate: string;
+ 
-     certificatePassword?: string;
+ // @public
- }
+ export type ClientCertificateCredentialPEMConfiguration = ClientCertificatePEMCertificate | ClientCertificatePEMCertificatePath;
- export interface ClientCertificatePEMCertificatePath {
+ export interface ClientCertificatePEMCertificate {
-     certificatePassword?: string;
+     certificate: string;
-     certificatePath: string;
+     certificatePassword?: string;
- export class ClientSecretCredential implements TokenCredential {
+ export interface ClientCertificatePEMCertificatePath {
-     constructor(tenantId: string, clientId: string, clientSecret: string, options?: ClientSecretCredentialOptions);
+     certificatePassword?: string;
-     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+     certificatePath: string;
- export interface ClientSecretCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
+ export class ClientSecretCredential implements TokenCredential {
- }
+     constructor(tenantId: string, clientId: string, clientSecret: string, options?: ClientSecretCredentialOptions);
- 
+     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
- // @public
+ }
- export interface CredentialPersistenceOptions {
+ 
-     tokenCachePersistenceOptions?: TokenCachePersistenceOptions;
+ // @public
- }
+ export interface ClientSecretCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
- 
+ }
- // @public
+ 
- export class CredentialUnavailableError extends Error {
+ // @public
-     constructor(message?: string, options?: {
+ export interface CredentialPersistenceOptions {
-         cause?: unknown;
+     tokenCachePersistenceOptions?: TokenCachePersistenceOptions;
-     });
+ }
- }
+ 
- 
+ // @public
- // @public
+ export class CredentialUnavailableError extends Error {
- export const CredentialUnavailableErrorName = "CredentialUnavailableError";
+     constructor(message?: string, options?: {
- 
+         cause?: unknown;
- // @public
+     });
- export class DefaultAzureCredential extends ChainedTokenCredential {
+ }
-     constructor(options?: DefaultAzureCredentialClientIdOptions);
+ 
-     constructor(options?: DefaultAzureCredentialResourceIdOptions);
+ // @public
-     constructor(options?: DefaultAzureCredentialOptions);
+ export const CredentialUnavailableErrorName = "CredentialUnavailableError";
- }
+ 
- 
+ // @public
- // @public
+ export class DefaultAzureCredential extends ChainedTokenCredential {
- export interface DefaultAzureCredentialClientIdOptions extends DefaultAzureCredentialOptions {
+     constructor(_tokenCredentialOptions?: TokenCredentialOptions);
-     managedIdentityClientId?: string;
+     // (undocumented)
-     workloadIdentityClientId?: string;
+     getToken(): Promise<AccessToken>;
- export interface DefaultAzureCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
+ export interface DefaultAzureCredentialClientIdOptions extends DefaultAzureCredentialOptions {
-     processTimeoutInMs?: number;
+     managedIdentityClientId?: string;
-     tenantId?: string;
+     workloadIdentityClientId?: string;
- export interface DefaultAzureCredentialResourceIdOptions extends DefaultAzureCredentialOptions {
+ export interface DefaultAzureCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
-     managedIdentityResourceId: string;
+     processTimeoutInMs?: number;
- }
+     tenantId?: string;
- 
+ }
- // @public
+ 
- export function deserializeAuthenticationRecord(serializedRecord: string): AuthenticationRecord;
+ // @public
- 
+ export interface DefaultAzureCredentialResourceIdOptions extends DefaultAzureCredentialOptions {
- // @public
+     managedIdentityResourceId: string;
- export class DeviceCodeCredential implements TokenCredential {
+ }
-     constructor(options?: DeviceCodeCredentialOptions);
+ 
-     authenticate(scopes: string | string[], options?: GetTokenOptions): Promise<AuthenticationRecord | undefined>;
+ // @public
-     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+ export function deserializeAuthenticationRecord(serializedRecord: string): AuthenticationRecord;
- }
+ 
- 
+ // @public
- // @public
+ export class DeviceCodeCredential implements TokenCredential {
- export interface DeviceCodeCredentialOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions {
+     constructor();
-     clientId?: string;
+     // (undocumented)
-     tenantId?: string;
+     getToken(): Promise<AccessToken | null>;
-     userPromptCallback?: DeviceCodePromptCallback;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface DeviceCodeCredentialOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions {
- export interface DeviceCodeInfo {
+     clientId?: string;
-     message: string;
+     tenantId?: string;
-     userCode: string;
+     userPromptCallback?: DeviceCodePromptCallback;
-     verificationUri: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface DeviceCodeInfo {
- export type DeviceCodePromptCallback = (deviceCodeInfo: DeviceCodeInfo) => void;
+     message: string;
- 
+     userCode: string;
- // @public
+     verificationUri: string;
- export class EnvironmentCredential implements TokenCredential {
+ }
-     constructor(options?: EnvironmentCredentialOptions);
+ 
-     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+ // @public
- }
+ export type DeviceCodePromptCallback = (deviceCodeInfo: DeviceCodeInfo) => void;
- export interface EnvironmentCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
+ export class EnvironmentCredential implements TokenCredential {
- }
+     constructor();
- 
+     // (undocumented)
- // @public
+     getToken(): Promise<AccessToken | null>;
- export interface ErrorResponse {
+ }
-     correlationId?: string;
+ 
-     error: string;
+ // @public
-     errorCodes?: number[];
+ export interface EnvironmentCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
-     errorDescription: string;
+ }
-     timestamp?: string;
+ 
-     traceId?: string;
+ // @public
- }
+ export interface ErrorResponse {
- 
+     correlationId?: string;
- // @public
+     error: string;
- export function getBearerTokenProvider(credential: TokenCredential, scopes: string | string[], options?: GetBearerTokenProviderOptions): () => Promise<string>;
+     errorCodes?: number[];
- 
+     errorDescription: string;
- // @public
+     timestamp?: string;
- export interface GetBearerTokenProviderOptions {
+     traceId?: string;
-     abortSignal?: AbortSignal;
+ }
-     tracingOptions?: {
+ 
-         tracingContext?: TracingContext;
+ // @public
-     };
+ export function getBearerTokenProvider(credential: TokenCredential, scopes: string | string[], options?: GetBearerTokenProviderOptions): () => Promise<string>;
- }
+ 
- 
+ // @public
- // @public
+ export interface GetBearerTokenProviderOptions {
- export function getDefaultAzureCredential(): TokenCredential;
+     abortSignal?: AbortSignal;
- 
+     tracingOptions?: {
- export { GetTokenOptions }
+         tracingContext?: TracingContext;
- 
+     };
- // @public
+ }
- export type IdentityPlugin = (context: unknown) => void;
+ 
- 
+ // @public
- // @public
+ export function getDefaultAzureCredential(): TokenCredential;
- export class InteractiveBrowserCredential implements TokenCredential {
+ 
-     constructor(options: InteractiveBrowserCredentialNodeOptions | InteractiveBrowserCredentialInBrowserOptions);
+ export { GetTokenOptions }
-     authenticate(scopes: string | string[], options?: GetTokenOptions): Promise<AuthenticationRecord | undefined>;
+ 
-     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+ // @public
- }
+ export type IdentityPlugin = (context: unknown) => void;
- export interface InteractiveBrowserCredentialInBrowserOptions extends InteractiveCredentialOptions {
+ export class InteractiveBrowserCredential implements TokenCredential {
-     clientId: string;
+     constructor(options: InteractiveBrowserCredentialInBrowserOptions | InteractiveBrowserCredentialNodeOptions);
-     loginHint?: string;
+     authenticate(scopes: string | string[], options?: GetTokenOptions): Promise<AuthenticationRecord | undefined>;
-     loginStyle?: BrowserLoginStyle;
+     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
-     redirectUri?: string | (() => string);
+ }
-     tenantId?: string;
+ 
- }
+ // @public
- 
+ export interface InteractiveBrowserCredentialInBrowserOptions extends InteractiveCredentialOptions {
- // @public
+     clientId: string;
- export interface InteractiveBrowserCredentialNodeOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions, BrowserCustomizationOptions, BrokerAuthOptions {
+     loginHint?: string;
-     clientId?: string;
+     loginStyle?: BrowserLoginStyle;
-     loginHint?: string;
+     redirectUri?: string | (() => string);
-     redirectUri?: string | (() => string);
+     tenantId?: string;
-     tenantId?: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface InteractiveBrowserCredentialNodeOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions, BrowserCustomizationOptions, BrokerAuthOptions {
- export interface InteractiveCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
+     clientId?: string;
-     authenticationRecord?: AuthenticationRecord;
+     loginHint?: string;
-     disableAutomaticAuthentication?: boolean;
+     redirectUri?: string | (() => string);
- }
+     tenantId?: string;
- 
+ }
- // @public
+ 
- export const logger: AzureLogger;
+ // @public
- 
+ export interface InteractiveCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
- // @public
+     authenticationRecord?: AuthenticationRecord;
- export class ManagedIdentityCredential implements TokenCredential {
+     disableAutomaticAuthentication?: boolean;
-     constructor(clientId: string, options?: TokenCredentialOptions);
+ }
-     constructor(options?: ManagedIdentityCredentialClientIdOptions);
+ 
-     constructor(options?: ManagedIdentityCredentialResourceIdOptions);
+ // @public
-     constructor(options?: ManagedIdentityCredentialObjectIdOptions);
+ export const logger: AzureLogger;
-     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+ 
- }
+ // @public
- 
+ export class ManagedIdentityCredential implements TokenCredential {
- // @public
+     constructor(clientId: string, options?: TokenCredentialOptions);
- export interface ManagedIdentityCredentialClientIdOptions extends TokenCredentialOptions {
+     constructor(options?: ManagedIdentityCredentialClientIdOptions);
-     clientId?: string;
+     constructor(options?: ManagedIdentityCredentialResourceIdOptions);
- }
+     constructor(options?: ManagedIdentityCredentialObjectIdOptions);
- 
+     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
- // @public
+ }
- export interface ManagedIdentityCredentialObjectIdOptions extends TokenCredentialOptions {
+ 
-     objectId: string;
+ // @public
- }
+ export interface ManagedIdentityCredentialClientIdOptions extends TokenCredentialOptions {
- 
+     clientId?: string;
- // @public
+ }
- export interface ManagedIdentityCredentialResourceIdOptions extends TokenCredentialOptions {
+ 
-     resourceId: string;
+ // @public
- }
+ export interface ManagedIdentityCredentialObjectIdOptions extends TokenCredentialOptions {
- 
+     objectId: string;
- // @public
+ }
- export interface MultiTenantTokenCredentialOptions extends TokenCredentialOptions {
+ 
-     additionallyAllowedTenants?: string[];
+ // @public
- }
+ export interface ManagedIdentityCredentialResourceIdOptions extends TokenCredentialOptions {
- 
+     resourceId: string;
- // @public
+ }
- export class OnBehalfOfCredential implements TokenCredential {
+ 
-     constructor(options: OnBehalfOfCredentialCertificateOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions);
+ // @public
-     constructor(options: OnBehalfOfCredentialSecretOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions);
+ export interface MultiTenantTokenCredentialOptions extends TokenCredentialOptions {
-     constructor(options: OnBehalfOfCredentialAssertionOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions);
+     additionallyAllowedTenants?: string[];
-     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export class OnBehalfOfCredential implements TokenCredential {
- export interface OnBehalfOfCredentialAssertionOptions {
+     constructor();
-     clientId: string;
+     // (undocumented)
-     getAssertion: () => Promise<string>;
+     getToken(): Promise<AccessToken | null>;
-     tenantId: string;
+ }
-     userAssertionToken: string;
+ 
- }
+ // @public
- 
+ export interface OnBehalfOfCredentialAssertionOptions {
- // @public
+     clientId: string;
- export interface OnBehalfOfCredentialCertificateOptions {
+     getAssertion: () => Promise<string>;
-     certificatePath: string;
+     tenantId: string;
-     clientId: string;
+     userAssertionToken: string;
-     sendCertificateChain?: boolean;
+ }
-     tenantId: string;
+ 
-     userAssertionToken: string;
+ // @public
- }
+ export interface OnBehalfOfCredentialCertificateOptions {
- 
+     certificatePath: string;
- // @public
+     clientId: string;
- export type OnBehalfOfCredentialOptions = (OnBehalfOfCredentialSecretOptions | OnBehalfOfCredentialCertificateOptions | OnBehalfOfCredentialAssertionOptions) & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions & AuthorityValidationOptions;
+     sendCertificateChain?: boolean;
- 
+     tenantId: string;
- // @public
+     userAssertionToken: string;
- export interface OnBehalfOfCredentialSecretOptions {
+ }
-     clientId: string;
+ 
-     clientSecret: string;
+ // @public
-     tenantId: string;
+ export type OnBehalfOfCredentialOptions = (OnBehalfOfCredentialSecretOptions | OnBehalfOfCredentialCertificateOptions | OnBehalfOfCredentialAssertionOptions) & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions & AuthorityValidationOptions;
-     userAssertionToken: string;
+ 
- }
+ // @public
- 
+ export interface OnBehalfOfCredentialSecretOptions {
- // @public
+     clientId: string;
- export function serializeAuthenticationRecord(record: AuthenticationRecord): string;
+     clientSecret: string;
- 
+     tenantId: string;
- // @public
+     userAssertionToken: string;
- export interface TokenCachePersistenceOptions {
+ }
-     enabled: boolean;
+ 
-     name?: string;
+ // @public
-     unsafeAllowUnencryptedStorage?: boolean;
+ export function serializeAuthenticationRecord(record: AuthenticationRecord): string;
- }
+ 
- 
+ // @public
- export { TokenCredential }
+ export interface TokenCachePersistenceOptions {
- 
+     enabled: boolean;
- // @public
+     name?: string;
- export interface TokenCredentialOptions extends CommonClientOptions {
+     unsafeAllowUnencryptedStorage?: boolean;
-     authorityHost?: string;
+ }
-     loggingOptions?: LogPolicyOptions & {
+ 
-         allowLoggingAccountIdentifiers?: boolean;
+ export { TokenCredential }
-         enableUnsafeSupportLogging?: boolean;
+ 
-     };
+ // @public
- }
+ export interface TokenCredentialOptions extends CommonClientOptions {
- 
+     authorityHost?: string;
- // @public
+     loggingOptions?: LogPolicyOptions & {
- export function useIdentityPlugin(plugin: IdentityPlugin): void;
+         allowLoggingAccountIdentifiers?: boolean;
- 
+         enableUnsafeSupportLogging?: boolean;
- // @public @deprecated
+     };
- export class UsernamePasswordCredential implements TokenCredential {
+ }
-     constructor(tenantId: string, clientId: string, username: string, password: string, options?: UsernamePasswordCredentialOptions);
+ 
-     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+ // @public (undocumented)
- }
+ export function useIdentityPlugin(_plugin: unknown): void;
- export interface UsernamePasswordCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
+ export class UsernamePasswordCredential implements TokenCredential {
- }
+     constructor(tenantIdOrName: string, clientId: string, username: string, password: string, options?: UsernamePasswordCredentialOptions);
- 
+     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
- // @public @deprecated
+ }
- export class VisualStudioCodeCredential implements TokenCredential {
+ 
-     constructor(options?: VisualStudioCodeCredentialOptions);
+ // @public @deprecated
-     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+ export interface UsernamePasswordCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
- export interface VisualStudioCodeCredentialOptions extends MultiTenantTokenCredentialOptions {
+ export class VisualStudioCodeCredential implements TokenCredential {
-     tenantId?: string;
+     constructor();
- }
+     // (undocumented)
- 
+     getToken(): Promise<AccessToken | null>;
- // @public
+ }
- export class WorkloadIdentityCredential implements TokenCredential {
+ 
-     constructor(options?: WorkloadIdentityCredentialOptions);
+ // @public @deprecated
-     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+ export interface VisualStudioCodeCredentialOptions extends MultiTenantTokenCredentialOptions {
- }
+     tenantId?: string;
- 
+ }
- // @public
+ 
- export interface WorkloadIdentityCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
+ // @public
-     clientId?: string;
+ export class WorkloadIdentityCredential implements TokenCredential {
-     tenantId?: string;
+     constructor(options?: WorkloadIdentityCredentialOptions);
-     tokenFilePath?: string;
+     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
- // (No @packageDocumentation comment for this package)
+ // @public
- 
+ export interface WorkloadIdentityCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
- ```
+     clientId?: string;
- 
+     tenantId?: string;
- 
+     tokenFilePath?: string;
- 
+ }
- 
+ 
- 
+ // (No @packageDocumentation comment for this package)
- 
+ 
- 
+ ```
```