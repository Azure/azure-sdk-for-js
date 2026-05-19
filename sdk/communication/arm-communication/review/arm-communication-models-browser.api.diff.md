# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -179,9 +179,10 @@
     error?: ErrorDetail;
 }
 
 // @public
-export type KeyType = "Primary" | "Secondary";
+type KeyType_2 = "Primary" | "Secondary";
+export { KeyType_2 as KeyType }
 
 // @public
 export enum KnownActionType {
     Internal = "Internal"
@@ -370,9 +371,9 @@
 export type PublicNetworkAccess = string;
 
 // @public
 export interface RegenerateKeyParameters {
-    keyType?: KeyType;
+    keyType?: KeyType_2;
 }
 
 // @public
 export interface Resource {

```