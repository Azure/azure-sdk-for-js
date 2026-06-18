# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -2446,14 +2446,15 @@
     runId: string;
 }
 
 // @public
-export interface Credential {
+interface Credential_2 {
     additionalProperties?: Record<string, any>;
     annotations?: any[];
     description?: string;
     type: string;
 }
+export { Credential_2 as Credential }
 
 // @public
 export interface CredentialOperationsCreateOrUpdateOptionalParams extends OperationOptions {
     ifMatch?: string;
@@ -2496,9 +2497,9 @@
     properties: CredentialUnion;
 }
 
 // @public
-export type CredentialUnion = ServicePrincipalCredential | ManagedIdentityCredential | Credential;
+export type CredentialUnion = ServicePrincipalCredential | ManagedIdentityCredential | Credential_2;
 
 // @public
 export interface CustomActivity extends ExecutionActivity {
     autoUserSpecification?: any;
@@ -6679,9 +6680,9 @@
     type: "MagentoSource";
 }
 
 // @public
-export interface ManagedIdentityCredential extends Credential {
+export interface ManagedIdentityCredential extends Credential_2 {
     resourceId?: string;
     type: "ManagedIdentity";
 }
 
@@ -9604,9 +9605,9 @@
     type: "ServiceNowV2Source";
 }
 
 // @public
-export interface ServicePrincipalCredential extends Credential {
+export interface ServicePrincipalCredential extends Credential_2 {
     servicePrincipalId?: any;
     servicePrincipalKey?: AzureKeyVaultSecretReference;
     tenant?: any;
     type: "ServicePrincipal";

```