# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -178,9 +178,10 @@
 
 export { isRestError }
 
 // @public
-export type KeyType = string;
+type KeyType_2 = string;
+export { KeyType_2 as KeyType }
 
 // @public
 export enum KnownAccessRights {
     Listen = "Listen",
@@ -513,9 +514,9 @@
 
 // @public
 export interface RegenerateAccessKeyParameters {
     key?: string;
-    keyType: KeyType;
+    keyType: KeyType_2;
 }
 
 // @public (undocumented)
 export class RelayAPI {

```