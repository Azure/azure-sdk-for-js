# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -150,32 +150,32 @@
 // @public
 export interface EntityInfo {
     displayName?: string;
     readonly id?: string;
-    inheritedPermissions?: Permissions;
+    inheritedPermissions?: Permissions_2;
     readonly name?: string;
     numberOfChildGroups?: number;
     numberOfChildren?: number;
     numberOfDescendants?: number;
     parent?: EntityParentGroupInfo;
     parentDisplayNameChain?: string[];
     parentNameChain?: string[];
-    permissions?: Permissions;
+    permissions?: Permissions_2;
     tenantId?: string;
     readonly type?: string;
 }
 
 // @public
 export interface EntityInfoProperties {
     displayName?: string;
-    inheritedPermissions?: Permissions;
+    inheritedPermissions?: Permissions_2;
     numberOfChildGroups?: number;
     numberOfChildren?: number;
     numberOfDescendants?: number;
     parent?: EntityParentGroupInfo;
     parentDisplayNameChain?: string[];
     parentNameChain?: string[];
-    permissions?: Permissions;
+    permissions?: Permissions_2;
     tenantId?: string;
 }
 
 // @public
@@ -539,9 +539,10 @@
     parentGroupId?: string;
 }
 
 // @public
-export type Permissions = "noaccess" | "view" | "edit" | "delete";
+type Permissions_2 = "noaccess" | "view" | "edit" | "delete";
+export { Permissions_2 as Permissions }
 
 // @public
 export interface ProxyResource extends Resource {
 }

```