# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -143,25 +143,25 @@
     children?: EntityHierarchyItem[];
     displayName?: string;
     readonly id?: string;
     readonly name?: string;
-    permissions?: Permissions;
+    permissions?: Permissions_2;
     readonly type?: string;
 }
 
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
 
@@ -601,9 +601,10 @@
     parentGroupId?: string;
 }
 
 // @public
-export type Permissions = string;
+type Permissions_2 = string;
+export { Permissions_2 as Permissions }
 
 // @public
 export type Reason = "Invalid" | "AlreadyExists";
 

```