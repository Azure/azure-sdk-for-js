# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -14,9 +14,9 @@
 // @public
 export interface AccessPolicyEntry {
     applicationId?: string;
     objectId: string;
-    permissions: Permissions;
+    permissions: Permissions_2;
     tenantId: string;
 }

 // @public
@@ -1139,17 +1139,18 @@
 // @public
 export type NetworkRuleSetView = NetworkRuleSetInput;

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
-export interface PermissionsInput extends InputOf<Permissions> {
+export interface PermissionsInput extends InputOf<Permissions_2> {
     certificates?: InputArray<ExpressionOrValue<CertificatePermissions>, CertificatePermissions[]> | undefined;
     keys?: InputArray<ExpressionOrValue<KeyPermissions>, KeyPermissions[]> | undefined;
     secrets?: InputArray<ExpressionOrValue<SecretPermissions>, SecretPermissions[]> | undefined;
     storage?: InputArray<ExpressionOrValue<StoragePermissions>, StoragePermissions[]> | undefined;

```
