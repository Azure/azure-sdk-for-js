# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -664,9 +664,10 @@
 
 export { isRestError }
 
 // @public
-export type KeyType = string;
+type KeyType_2 = string;
+export { KeyType_2 as KeyType }
 
 // @public
 export interface KeyVaultProperties {
     // (undocumented)
@@ -1299,9 +1300,9 @@
 
 // @public
 export interface RegenerateAccessKeyParameters {
     key?: string;
-    keyType: KeyType;
+    keyType: KeyType_2;
 }
 
 // @public
 export interface Resource {

```