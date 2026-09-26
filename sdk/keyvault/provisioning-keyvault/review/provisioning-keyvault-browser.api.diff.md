# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -45,9 +45,9 @@
 // @public
 interface AccessPolicyEntry {
     applicationId?: string;
     objectId: string;
-    permissions: Permissions;
+    permissions: Permissions_2;
     tenantId: string;
 }
 
 // @public
@@ -1033,17 +1033,17 @@
 // @public
 type NetworkRuleSetView = NetworkRuleSetInput;
 
 // @public
-interface Permissions {
+interface Permissions_2 {
     certificates?: CertificatePermissions[];
     keys?: KeyPermissions[];
     secrets?: SecretPermissions[];
     storage?: StoragePermissions[];
 }
 
 // @public
-interface PermissionsInput extends InputOf<Permissions> {
+interface PermissionsInput extends InputOf<Permissions_2> {
     certificates?: InputArray<ExpressionOrValue<CertificatePermissions>, CertificatePermissions[]> | undefined;
     keys?: InputArray<ExpressionOrValue<KeyPermissions>, KeyPermissions[]> | undefined;
     secrets?: InputArray<ExpressionOrValue<SecretPermissions>, SecretPermissions[]> | undefined;
     storage?: InputArray<ExpressionOrValue<StoragePermissions>, StoragePermissions[]> | undefined;
@@ -1422,9 +1422,9 @@
         NetworkRuleSet,
         NetworkRuleSetInput,
         NetworkRuleSetView,
         networkRuleSetShape,
-        Permissions,
+        Permissions_2 as Permissions,
         PermissionsInput,
         PermissionsView,
         permissionsShape,
         PrivateEndpoint,

```