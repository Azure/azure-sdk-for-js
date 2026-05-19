# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -12,9 +12,9 @@
 // @public
 export function $delete(context: DeviceRegistryManagementContext, resourceGroupName: string, namespaceName: string, options?: CredentialsDeleteOptionalParams): PollerLike<OperationState<void>, void>;
 
 // @public
-export function createOrUpdate(context: DeviceRegistryManagementContext, resourceGroupName: string, namespaceName: string, resource: Credential, options?: CredentialsCreateOrUpdateOptionalParams): PollerLike<OperationState<Credential>, Credential>;
+export function createOrUpdate(context: DeviceRegistryManagementContext, resourceGroupName: string, namespaceName: string, resource: Credential_2, options?: CredentialsCreateOrUpdateOptionalParams): PollerLike<OperationState<Credential_2>, Credential_2>;
 
 // @public
 export interface CredentialsCreateOrUpdateOptionalParams extends OperationOptions {
     updateIntervalInMs?: number;
@@ -43,18 +43,18 @@
     updateIntervalInMs?: number;
 }
 
 // @public
-export function get(context: DeviceRegistryManagementContext, resourceGroupName: string, namespaceName: string, options?: CredentialsGetOptionalParams): Promise<Credential>;
+export function get(context: DeviceRegistryManagementContext, resourceGroupName: string, namespaceName: string, options?: CredentialsGetOptionalParams): Promise<Credential_2>;
 
 // @public
-export function listByResourceGroup(context: DeviceRegistryManagementContext, resourceGroupName: string, namespaceName: string, options?: CredentialsListByResourceGroupOptionalParams): PagedAsyncIterableIterator<Credential>;
+export function listByResourceGroup(context: DeviceRegistryManagementContext, resourceGroupName: string, namespaceName: string, options?: CredentialsListByResourceGroupOptionalParams): PagedAsyncIterableIterator<Credential_2>;
 
 // @public
 export function synchronize(context: DeviceRegistryManagementContext, resourceGroupName: string, namespaceName: string, options?: CredentialsSynchronizeOptionalParams): PollerLike<OperationState<void>, void>;
 
 // @public
-export function update(context: DeviceRegistryManagementContext, resourceGroupName: string, namespaceName: string, properties: CredentialUpdate, options?: CredentialsUpdateOptionalParams): PollerLike<OperationState<Credential>, Credential>;
+export function update(context: DeviceRegistryManagementContext, resourceGroupName: string, namespaceName: string, properties: CredentialUpdate, options?: CredentialsUpdateOptionalParams): PollerLike<OperationState<Credential_2>, Credential_2>;
 
 // (No @packageDocumentation comment for this package)
 
 ```

```