# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -231,9 +231,10 @@
     };
 }
 
 // @public
-export type KeyType = "PrimaryKey" | "SecondaryKey";
+type KeyType_2 = "PrimaryKey" | "SecondaryKey";
+export { KeyType_2 as KeyType }
 
 // @public
 export interface KeyVaultProperties {
     // (undocumented)
@@ -829,9 +830,9 @@
 
 // @public
 export interface RegenerateAccessKeyParameters {
     key?: string;
-    keyType: KeyType;
+    keyType: KeyType_2;
 }
 
 // @public
 export interface Resource {

```