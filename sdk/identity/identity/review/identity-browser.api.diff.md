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
@@ -173,10 +178,11 @@
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
@@ -212,9 +218,9 @@
 
 // @public
 export class ClientSecretCredential implements TokenCredential {
     constructor(tenantId: string, clientId: string, clientSecret: string, options?: ClientSecretCredentialOptions);
-    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
+    getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null>;
 }
 
 // @public
 export interface ClientSecretCredentialOptions extends MultiTenantTokenCredentialOptions, CredentialPersistenceOptions, AuthorityValidationOptions {
@@ -263,11 +269,11 @@
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
@@ -326,9 +332,9 @@
 export type IdentityPlugin = (context: unknown) => void;
 
 // @public
 export class InteractiveBrowserCredential implements TokenCredential {
-    constructor(options: InteractiveBrowserCredentialNodeOptions | InteractiveBrowserCredentialInBrowserOptions);
+    constructor(options: InteractiveBrowserCredentialInBrowserOptions | InteractiveBrowserCredentialNodeOptions);
     authenticate(scopes: string | string[], options?: GetTokenOptions): Promise<AuthenticationRecord | undefined>;
     getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken>;
 }
 
@@ -443,15 +449,15 @@
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

```