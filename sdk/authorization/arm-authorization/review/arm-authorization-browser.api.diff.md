# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -1117,9 +1117,9 @@
     globalAdministrator: GlobalAdministrator;
     // (undocumented)
     operations: Operations;
     // (undocumented)
-    permissions: Permissions;
+    permissions: Permissions_2;
     // (undocumented)
     providerOperationsMetadataOperations: ProviderOperationsMetadataOperations;
     // (undocumented)
     roleAssignments: RoleAssignments;
@@ -1839,12 +1839,13 @@
     value?: Permission[];
 }
 
 // @public
-export interface Permissions {
+interface Permissions_2 {
     listForResource(resourceGroupName: string, resourceProviderNamespace: string, parentResourcePath: string, resourceType: string, resourceName: string, options?: PermissionsListForResourceOptionalParams): PagedAsyncIterableIterator<Permission>;
     listForResourceGroup(resourceGroupName: string, options?: PermissionsListForResourceGroupOptionalParams): PagedAsyncIterableIterator<Permission>;
 }
+export { Permissions_2 as Permissions }
 
 // @public
 export interface PermissionsListForResourceGroupNextOptionalParams extends coreClient.OperationOptions {
 }

```