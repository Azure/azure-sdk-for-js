# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -477,9 +477,10 @@
     type?: "SystemAssigned";
 }
 
 // @public
-export type KeyType = "PrimaryKey" | "SecondaryKey";
+type KeyType_2 = "PrimaryKey" | "SecondaryKey";
+export { KeyType_2 as KeyType }
 
 // @public
 export interface KeyVaultProperties {
     keyName?: string;
@@ -807,9 +808,9 @@
 
 // @public
 export interface RegenerateAccessKeyParameters {
     key?: string;
-    keyType: KeyType;
+    keyType: KeyType_2;
 }
 
 // @public
 export interface Regions {

```