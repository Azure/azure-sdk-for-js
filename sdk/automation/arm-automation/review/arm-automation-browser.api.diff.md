# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -594,14 +594,15 @@
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
 export interface CredentialCreateOrUpdateParameters {
     description?: string;
@@ -634,13 +635,13 @@
 }
 
 // @public
 export interface CredentialOperationsOperations {
-    createOrUpdate: (resourceGroupName: string, automationAccountName: string, credentialName: string, parameters: CredentialCreateOrUpdateParameters, options?: CredentialOperationsCreateOrUpdateOptionalParams) => Promise<Credential>;
+    createOrUpdate: (resourceGroupName: string, automationAccountName: string, credentialName: string, parameters: CredentialCreateOrUpdateParameters, options?: CredentialOperationsCreateOrUpdateOptionalParams) => Promise<Credential_2>;
     delete: (resourceGroupName: string, automationAccountName: string, credentialName: string, options?: CredentialOperationsDeleteOptionalParams) => Promise<void>;
-    get: (resourceGroupName: string, automationAccountName: string, credentialName: string, options?: CredentialOperationsGetOptionalParams) => Promise<Credential>;
-    listByAutomationAccount: (resourceGroupName: string, automationAccountName: string, options?: CredentialOperationsListByAutomationAccountOptionalParams) => PagedAsyncIterableIterator<Credential>;
-    update: (resourceGroupName: string, automationAccountName: string, credentialName: string, parameters: CredentialUpdateParameters, options?: CredentialOperationsUpdateOptionalParams) => Promise<Credential>;
+    get: (resourceGroupName: string, automationAccountName: string, credentialName: string, options?: CredentialOperationsGetOptionalParams) => Promise<Credential_2>;
+    listByAutomationAccount: (resourceGroupName: string, automationAccountName: string, options?: CredentialOperationsListByAutomationAccountOptionalParams) => PagedAsyncIterableIterator<Credential_2>;
+    update: (resourceGroupName: string, automationAccountName: string, credentialName: string, parameters: CredentialUpdateParameters, options?: CredentialOperationsUpdateOptionalParams) => Promise<Credential_2>;
 }
 
 // @public
 export interface CredentialOperationsUpdateOptionalParams extends OperationOptions {
@@ -1140,9 +1141,9 @@
     lastSeenDateTime?: Date;
     registeredDateTime?: Date;
     vmResourceId?: string;
     workerName?: string;
-    workerType?: WorkerType;
+    workerType?: WorkerType_2;
 }
 
 // @public
 export interface HybridRunbookWorkerCreateOrUpdateParameters {
@@ -1219,9 +1220,9 @@
     lastSeenDateTime?: Date;
     registeredDateTime?: Date;
     vmResourceId?: string;
     workerName?: string;
-    workerType?: WorkerType;
+    workerType?: WorkerType_2;
 }
 
 // @public
 export interface HybridRunbookWorkersCreateOptionalParams extends OperationOptions {
@@ -3758,9 +3759,10 @@
 // @public
 export type WindowsUpdateClasses = string;
 
 // @public
-export type WorkerType = string;
+type WorkerType_2 = string;
+export { WorkerType_2 as WorkerType }
 
 // (No @packageDocumentation comment for this package)
 
 ```

```