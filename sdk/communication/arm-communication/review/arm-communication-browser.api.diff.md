# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -411,9 +411,10 @@
 
 export { isRestError }
 
 // @public
-export type KeyType = "Primary" | "Secondary";
+type KeyType_2 = "Primary" | "Secondary";
+export { KeyType_2 as KeyType }
 
 // @public
 export enum KnownActionType {
     Internal = "Internal"
@@ -623,9 +624,9 @@
 export type PublicNetworkAccess = string;
 
 // @public
 export interface RegenerateKeyParameters {
-    keyType?: KeyType;
+    keyType?: KeyType_2;
 }
 
 // @public
 export interface Resource {

```