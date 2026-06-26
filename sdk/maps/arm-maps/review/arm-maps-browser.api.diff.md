# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -224,9 +224,10 @@
 
 export { isRestError }
 
 // @public
-export type KeyType = string;
+type KeyType_2 = string;
+export { KeyType_2 as KeyType }
 
 // @public
 export type Kind = string;
 
@@ -394,9 +395,9 @@
 }
 
 // @public
 export interface MapsKeySpecification {
-    keyType: KeyType;
+    keyType: KeyType_2;
 }
 
 // @public
 export interface MapsListOperationsOptionalParams extends OperationOptions {

```