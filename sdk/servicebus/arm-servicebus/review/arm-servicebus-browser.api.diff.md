# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -241,9 +241,10 @@
 
 export { isRestError }
 
 // @public
-export type KeyType = "PrimaryKey" | "SecondaryKey";
+type KeyType_2 = "PrimaryKey" | "SecondaryKey";
+export { KeyType_2 as KeyType }
 
 // @public
 export interface KeyVaultProperties {
     // (undocumented)
@@ -900,9 +901,9 @@
 
 // @public
 export interface RegenerateAccessKeyParameters {
     key?: string;
-    keyType: KeyType;
+    keyType: KeyType_2;
 }
 
 // @public
 export interface Resource {

```