# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -592,14 +592,15 @@
 // @public
 export type CreatedByType = string;
 
 // @public
-export interface Credential extends ProxyResource {
+interface Credential_2 extends ProxyResource {
     readonly creationTime?: Date;
     description?: string;
     readonly lastModifiedTime?: Date;
     readonly userName?: string;
 }
+export { Credential_2 as Credential }
 
 // @public
 export interface CredentialCreateOrUpdateOptionalParams extends OperationOptions {
 }
@@ -632,13 +633,13 @@
 }
 
 // @public
 export interface CredentialOperations {
-    createOrUpdate: (resourceGroupName: string, automationAccountName: string, credentialName: string, parameters: CredentialCreateOrUpdateParameters, options?: CredentialCreateOrUpdateOptionalParams) => Promise<Credential>;
+    createOrUpdate: (resourceGroupName: string, automationAccountName: string, credentialName: string, parameters: CredentialCreateOrUpdateParameters, options?: CredentialCreateOrUpdateOptionalParams) => Promise<Credential_2>;
     delete: (resourceGroupName: string, automationAccountName: string, credentialName: string, options?: CredentialDeleteOptionalParams) => Promise<void>;
-    get: (resourceGroupName: string, automationAccountName: string, credentialName: string, options?: CredentialGetOptionalParams) => Promise<Credential>;
-    listByAutomationAccount: (resourceGroupName: string, automationAccountName: string, options?: CredentialListByAutomationAccountOptionalParams) => PagedAsyncIterableIterator<Credential>;
-    update: (resourceGroupName: string, automationAccountName: string, credentialName: string, parameters: CredentialUpdateParameters, options?: CredentialUpdateOptionalParams) => Promise<Credential>;
+    get: (resourceGroupName: string, automationAccountName: string, credentialName: string, options?: CredentialGetOptionalParams) => Promise<Credential_2>;
+    listByAutomationAccount: (resourceGroupName: string, automationAccountName: string, options?: CredentialListByAutomationAccountOptionalParams) => PagedAsyncIterableIterator<Credential_2>;
+    update: (resourceGroupName: string, automationAccountName: string, credentialName: string, parameters: CredentialUpdateParameters, options?: CredentialUpdateOptionalParams) => Promise<Credential_2>;
 }
 
 // @public
 export interface CredentialProperties {
@@ -1134,9 +1135,9 @@
     lastSeenDateTime?: Date;
     registeredDateTime?: Date;
     vmResourceId?: string;
     workerName?: string;
-    workerType?: WorkerType;
+    workerType?: WorkerType_2;
 }
 
 // @public
 export interface HybridRunbookWorkerCreateOrUpdateParameters {
@@ -1213,9 +1214,9 @@
     lastSeenDateTime?: Date;
     registeredDateTime?: Date;
     vmResourceId?: string;
     workerName?: string;
-    workerType?: WorkerType;
+    workerType?: WorkerType_2;
 }
 
 // @public
 export interface HybridRunbookWorkersCreateOptionalParams extends OperationOptions {
@@ -3748,9 +3749,10 @@
 // @public
 export type WindowsUpdateClasses = string;
 
 // @public
-export type WorkerType = string;
+type WorkerType_2 = string;
+export { WorkerType_2 as WorkerType }
 
 // (No @packageDocumentation comment for this package)
 
 ```

```