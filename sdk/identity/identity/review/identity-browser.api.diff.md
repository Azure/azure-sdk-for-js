# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -64,13 +64,14 @@
 export interface AuthorityValidationOptions {
     disableInstanceDiscovery?: boolean;
 }
 
-// @public
+// @public (undocumented)
 export class AuthorizationCodeCredential implements TokenCredential {
     constructor(tenantId: string | "common", clientId: string, clientSecret: string, authorizationCode: string, redirectUri: string, options?: AuthorizationCodeCredentialOptions);
     constructor(tenantId: string | "common", clientId: string, authorizationCode: string, redirectUri: string, options?: AuthorizationCodeCredentialOptions);
-    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+    // (undocumented)
+    getToken(): Promise<AccessToken | null>;
 }
 
 // @public
 export interface AuthorizationCodeCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
@@ -86,10 +87,11 @@
 }
 
 // @public
 export class AzureCliCredential implements TokenCredential {
-    constructor(options?: AzureCliCredentialOptions);
-    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+    constructor();
+    // (undocumented)
+    getToken(): Promise<AccessToken | null>;
 }
 
 // @public
 export interface AzureCliCredentialOptions extends MultiTenantTokenCredentialOptions {
@@ -99,10 +101,11 @@
 }
 
 // @public
 export class AzureDeveloperCliCredential implements TokenCredential {
-    constructor(options?: AzureDeveloperCliCredentialOptions);
-    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+    constructor();
+    // (undocumented)
+    getToken(): Promise<AccessToken | null>;
 }
 
 // @public
 export interface AzureDeveloperCliCredentialOptions extends MultiTenantTokenCredentialOptions {
@@ -111,20 +114,22 @@
 }
 
 // @public
 export class AzurePipelinesCredential implements TokenCredential {
-    constructor(tenantId: string, clientId: string, serviceConnectionId: string, systemAccessToken: string, options?: AzurePipelinesCredentialOptions);
-    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+    constructor();
+    // (undocumented)
+    getToken(): Promise<AccessToken | null>;
 }
 
 // @public
 export interface AzurePipelinesCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
 }
 
 // @public
 export class AzurePowerShellCredential implements TokenCredential {
-    constructor(options?: AzurePowerShellCredentialOptions);
-    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+    constructor();
+    // (undocumented)
+    getToken(): Promise<AccessToken | null>;
 }
 
 // @public
 export interface AzurePowerShellCredentialOptions extends MultiTenantTokenCredentialOptions {
@@ -173,22 +178,22 @@
 }
 
 // @public
 export class ClientAssertionCredential implements TokenCredential {
-    constructor(tenantId: string, clientId: string, getAssertion: () => Promise<string>, options?: ClientAssertionCredentialOptions);
-    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+    constructor();
+    // (undocumented)
+    getToken(): Promise<AccessToken | null>;
 }
 
 // @public
 export interface ClientAssertionCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
 }
 
 // @public
 export class ClientCertificateCredential implements TokenCredential {
-    constructor(tenantId: string, clientId: string, certificatePath: string, options?: ClientCertificateCredentialOptions);
-    constructor(tenantId: string, clientId: string, configuration: ClientCertificatePEMCertificatePath, options?: ClientCertificateCredentialOptions);
-    constructor(tenantId: string, clientId: string, configuration: ClientCertificatePEMCertificate, options?: ClientCertificateCredentialOptions);
-    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+    constructor();
+    // (undocumented)
+    getToken(): Promise<AccessToken | null>;
 }
 
 // @public
 export interface ClientCertificateCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
@@ -212,9 +217,9 @@
 
 // @public
 export class ClientSecretCredential implements TokenCredential {
     constructor(tenantId: string, clientId: string, clientSecret: string, options?: ClientSecretCredentialOptions);
-    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
 }
 
 // @public
 export interface ClientSecretCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
@@ -236,11 +241,11 @@
 export const CredentialUnavailableErrorName = "CredentialUnavailableError";
 
 // @public
 export class DefaultAzureCredential extends ChainedTokenCredential {
-    constructor(options?: DefaultAzureCredentialClientIdOptions);
-    constructor(options?: DefaultAzureCredentialResourceIdOptions);
-    constructor(options?: DefaultAzureCredentialOptions);
+    constructor(_tokenCredentialOptions?: TokenCredentialOptions);
+    // (undocumented)
+    getToken(): Promise<AccessToken>;
 }
 
 // @public
 export interface DefaultAzureCredentialClientIdOptions extends DefaultAzureCredentialOptions {
@@ -267,11 +272,11 @@
 export function deserializeAuthenticationRecord(serializedRecord: string): AuthenticationRecord;
 
 // @public
 export class DeviceCodeCredential implements TokenCredential {
-    constructor(options?: DeviceCodeCredentialOptions);
-    authenticate(scopes: string | string[], options?: GetTokenOptions): Promise<AuthenticationRecord | undefined>;
-    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+    constructor();
+    // (undocumented)
+    getToken(): Promise<AccessToken | null>;
 }
 
 // @public
 export interface DeviceCodeCredentialOptions extends InteractiveCredentialOptions, CredentialPersistenceOptions {
@@ -291,10 +296,11 @@
 export type DeviceCodePromptCallback = (deviceCodeInfo: DeviceCodeInfo) => void;
 
 // @public
 export class EnvironmentCredential implements TokenCredential {
-    constructor(options?: EnvironmentCredentialOptions);
-    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+    constructor();
+    // (undocumented)
+    getToken(): Promise<AccessToken | null>;
 }
 
 // @public
 export interface EnvironmentCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {
@@ -330,9 +336,9 @@
 export type IdentityPlugin = (context: unknown) => void;
 
 // @public
 export class InteractiveBrowserCredential implements TokenCredential {
-    constructor(options: InteractiveBrowserCredentialNodeOptions | InteractiveBrowserCredentialInBrowserOptions);
+    constructor(options: InteractiveBrowserCredentialInBrowserOptions | InteractiveBrowserCredentialNodeOptions);
     authenticate(scopes: string | string[], options?: GetTokenOptions): Promise<AuthenticationRecord | undefined>;
     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
 }
 
@@ -361,15 +367,13 @@
 
 // @public
 export const logger: AzureLogger;
 
-// @public
+// @public (undocumented)
 export class ManagedIdentityCredential implements TokenCredential {
-    constructor(clientId: string, options?: TokenCredentialOptions);
-    constructor(options?: ManagedIdentityCredentialClientIdOptions);
-    constructor(options?: ManagedIdentityCredentialResourceIdOptions);
-    constructor(options?: ManagedIdentityCredentialObjectIdOptions);
-    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+    constructor();
+    // (undocumented)
+    getToken(): Promise<AccessToken | null>;
 }
 
 // @public
 export interface ManagedIdentityCredentialClientIdOptions extends TokenCredentialOptions {
@@ -392,12 +396,11 @@
 }
 
 // @public
 export class OnBehalfOfCredential implements TokenCredential {
-    constructor(options: OnBehalfOfCredentialCertificateOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions);
-    constructor(options: OnBehalfOfCredentialSecretOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions);
-    constructor(options: OnBehalfOfCredentialAssertionOptions & MultiTenantTokenCredentialOptions & CredentialPersistenceOptions);
-    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+    constructor();
+    // (undocumented)
+    getToken(): Promise<AccessToken | null>;
 }
 
 // @public
 export interface OnBehalfOfCredentialAssertionOptions {
@@ -447,25 +450,26 @@
         enableUnsafeSupportLogging?: boolean;
     };
 }
 
-// @public
-export function useIdentityPlugin(plugin: IdentityPlugin): void;
+// @public (undocumented)
+export function useIdentityPlugin(_plugin: unknown): void;
 
 // @public @deprecated
 export class UsernamePasswordCredential implements TokenCredential {
-    constructor(tenantId: string, clientId: string, username: string, password: string, options?: UsernamePasswordCredentialOptions);
-    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+    constructor(tenantIdOrName: string, clientId: string, username: string, password: string, options?: UsernamePasswordCredentialOptions);
+    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
 }
 
 // @public @deprecated
 export interface UsernamePasswordCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
 }
 
-// @public
+// @public @deprecated
 export class VisualStudioCodeCredential implements TokenCredential {
-    constructor(options?: VisualStudioCodeCredentialOptions);
-    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+    constructor();
+    // (undocumented)
+    getToken(): Promise<AccessToken | null>;
 }
 
 // @public
 export interface VisualStudioCodeCredentialOptions extends MultiTenantTokenCredentialOptions {
@@ -473,10 +477,10 @@
 }
 
 // @public
 export class WorkloadIdentityCredential implements TokenCredential {
-    constructor(options?: WorkloadIdentityCredentialOptions);
-    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+    constructor();
+    getToken(): Promise<AccessToken | null>;
 }
 
 // @public
 export interface WorkloadIdentityCredentialOptions extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {

```