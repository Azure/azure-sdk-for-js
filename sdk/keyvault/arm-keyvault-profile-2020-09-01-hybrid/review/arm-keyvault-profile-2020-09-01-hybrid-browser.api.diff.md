# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -13,9 +13,9 @@
 // @public
 export interface AccessPolicyEntry {
     applicationId?: string;
     objectId: string;
-    permissions: Permissions;
+    permissions: Permissions_2;
     tenantId: string;
 }
 
 // @public
@@ -320,14 +320,15 @@
 // @public
 export type OperationsListResponse = OperationListResult;
 
 // @public
-export interface Permissions {
+interface Permissions_2 {
     certificates?: CertificatePermissions[];
     keys?: KeyPermissions[];
     secrets?: SecretPermissions[];
     storage?: StoragePermissions[];
 }
+export { Permissions_2 as Permissions }
 
 // @public
 export interface PrivateEndpoint {
     readonly id?: string;

```