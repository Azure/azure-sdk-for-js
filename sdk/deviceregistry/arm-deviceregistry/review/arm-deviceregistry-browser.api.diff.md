# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -388,11 +388,12 @@
 // @public
 export type CreatedByType = string;
 
 // @public
-export interface Credential extends TrackedResource {
+interface Credential_2 extends TrackedResource {
     properties?: CredentialProperties;
 }
+export { Credential_2 as Credential }
 
 // @public
 export interface CredentialCreateOrUpdate extends TrackedResource {
     properties?: CredentialPropertiesCreateOrUpdate;
@@ -426,14 +427,14 @@
 }
 
 // @public
 export interface CredentialsOperations {
-    createOrUpdate: (resourceGroupName: string, namespaceName: string, resource: CredentialCreateOrUpdate, options?: CredentialsCreateOrUpdateOptionalParams) => PollerLike<OperationState<Credential>, Credential>;
+    createOrUpdate: (resourceGroupName: string, namespaceName: string, resource: CredentialCreateOrUpdate, options?: CredentialsCreateOrUpdateOptionalParams) => PollerLike<OperationState<Credential_2>, Credential_2>;
     delete: (resourceGroupName: string, namespaceName: string, options?: CredentialsDeleteOptionalParams) => PollerLike<OperationState<void>, void>;
-    get: (resourceGroupName: string, namespaceName: string, options?: CredentialsGetOptionalParams) => Promise<Credential>;
-    listByResourceGroup: (resourceGroupName: string, namespaceName: string, options?: CredentialsListByResourceGroupOptionalParams) => PagedAsyncIterableIterator<Credential>;
+    get: (resourceGroupName: string, namespaceName: string, options?: CredentialsGetOptionalParams) => Promise<Credential_2>;
+    listByResourceGroup: (resourceGroupName: string, namespaceName: string, options?: CredentialsListByResourceGroupOptionalParams) => PagedAsyncIterableIterator<Credential_2>;
     synchronize: (resourceGroupName: string, namespaceName: string, options?: CredentialsSynchronizeOptionalParams) => PollerLike<OperationState<void>, void>;
-    update: (resourceGroupName: string, namespaceName: string, properties: CredentialUpdate, options?: CredentialsUpdateOptionalParams) => PollerLike<OperationState<Credential>, Credential>;
+    update: (resourceGroupName: string, namespaceName: string, properties: CredentialUpdate, options?: CredentialsUpdateOptionalParams) => PollerLike<OperationState<Credential_2>, Credential_2>;
 }
 
 // @public
 export interface CredentialsSynchronizeOptionalParams extends OperationOptions {

```