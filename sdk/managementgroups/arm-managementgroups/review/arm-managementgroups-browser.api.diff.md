# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -156,16 +156,16 @@
 
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
@@ -529,9 +529,10 @@
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